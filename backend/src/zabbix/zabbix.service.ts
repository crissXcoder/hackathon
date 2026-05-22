import { Injectable, Logger, HttpException, HttpStatus } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

interface JsonRpcRequest {
  jsonrpc: '2.0';
  method: string;
  params: unknown;
  id: number;
  auth?: string | null;
}

interface JsonRpcResponse<T> {
  jsonrpc: '2.0';
  result?: T;
  error?: {
    code: number;
    message: string;
    data?: unknown;
  };
  id: number;
}

interface ZabbixHostResult {
  hostid: string;
  name: string;
  status: string;
  interfaces: Array<{ ip: string }>;
}

interface ZabbixItemResult {
  itemid: string;
  name: string;
  value_type: string;
  key_: string;
}

interface ZabbixHistoryResult {
  itemid: string;
  clock: string;
  value: string;
}

@Injectable()
export class ZabbixService {
  private readonly logger = new Logger(ZabbixService.name);
  private authToken: string | null = null;
  private readonly apiUrl: string;

  constructor(
    private readonly configService: ConfigService,
    private readonly httpService: HttpService,
  ) {
    const url = this.configService.get<string>('ZABBIX_URL');
    if (!url) {
      throw new Error('ZABBIX_URL is not defined in environment variables');
    }
    // Clean trailing slash and ensure it targets api_jsonrpc.php
    const cleanUrl = url.endsWith('/') ? url.slice(0, -1) : url;
    this.apiUrl = cleanUrl.endsWith('api_jsonrpc.php')
      ? cleanUrl
      : `${cleanUrl}/api_jsonrpc.php`;
  }

  async authenticate(): Promise<string> {
    const user = this.configService.get<string>('ZABBIX_USER');
    const password = this.configService.get<string>('ZABBIX_PASSWORD');

    if (!user || !password) {
      throw new Error(
        'Zabbix credentials (ZABBIX_USER or ZABBIX_PASSWORD) are not configured',
      );
    }

    const payload: JsonRpcRequest = {
      jsonrpc: '2.0',
      method: 'user.login',
      params: {
        username: user,
        password,
      },
      id: 1,
    };

    this.logger.log(`Authenticating with Zabbix user: ${user}`);
    try {
      const response = await firstValueFrom(
        this.httpService.post<JsonRpcResponse<string>>(this.apiUrl, payload, {
          headers: {
            'Content-Type': 'application/json-rpc',
          },
        }),
      );

      const data = response.data as JsonRpcResponse<string>;
      if (data.error) {
        const errorDataStr = data.error.data
          ? JSON.stringify(data.error.data)
          : '';
        this.logger.error(
          `Zabbix Authentication failed: ${data.error.message} - ${errorDataStr}`,
        );
        throw new HttpException(
          `Zabbix Authentication Error: ${data.error.message} (${errorDataStr})`,
          HttpStatus.BAD_GATEWAY,
        );
      }

      if (!data.result) {
        throw new HttpException(
          'Zabbix API response did not contain an authentication token',
          HttpStatus.BAD_GATEWAY,
        );
      }

      this.authToken = data.result;
      this.logger.log('Successfully authenticated. Token cached.');
      return this.authToken as string;
    } catch (error: unknown) {
      if (error instanceof HttpException) {
        throw error;
      }
      const errorMsg = error instanceof Error ? error.message : String(error);
      this.logger.error(
        `HTTP Request failed for Zabbix authentication: ${errorMsg}`,
      );
      const status =
        error && typeof error === 'object' && 'response' in error
          ? ((error as { response?: { status?: number } }).response?.status ??
            HttpStatus.SERVICE_UNAVAILABLE)
          : HttpStatus.SERVICE_UNAVAILABLE;
      throw new HttpException(
        `Zabbix Authentication HTTP Request Failed: ${errorMsg}`,
        status,
      );
    }
  }

  async getHosts(): Promise<
    Array<{ hostid: string; name: string; status: string; ip: string }>
  > {
    const results = await this.request<ZabbixHostResult[]>('host.get', {
      output: ['hostid', 'name', 'status'],
      selectInterfaces: ['ip'],
    });

    return results.map((host) => ({
      hostid: host.hostid,
      name: host.name,
      status: host.status,
      ip: host.interfaces && host.interfaces.length > 0 ? host.interfaces[0].ip : 'N/A',
    }));
  }

  async getItems(
    hostId: string,
  ): Promise<Array<{ itemid: string; name: string; value_type: number; key_: string }>> {
    const results = await this.request<ZabbixItemResult[]>('item.get', {
      output: ['itemid', 'name', 'value_type', 'key_'],
      hostids: hostId,
    });

    const cpuRegex = /cpu|processor/i;
    const memRegex = /memory|ram/i;
    const tempRegex = /temp|thermal/i;

    const filtered = results.filter(
      (item) =>
        cpuRegex.test(item.name) ||
        cpuRegex.test(item.key_) ||
        memRegex.test(item.name) ||
        memRegex.test(item.key_) ||
        tempRegex.test(item.name) ||
        tempRegex.test(item.key_),
    );

    return filtered.map((item) => ({
      itemid: item.itemid,
      name: item.name,
      value_type: Number(item.value_type),
      key_: item.key_,
    }));
  }

  async getHistory(
    itemId: string,
    valueType: number,
  ): Promise<Array<{ itemid: string; clock: number; value: string }>> {
    const results = await this.request<ZabbixHistoryResult[]>('history.get', {
      output: ['itemid', 'clock', 'value'],
      history: valueType,
      itemids: itemId,
      sortfield: 'clock',
      sortorder: 'DESC',
      limit: 1,
    });

    return results.map((hist) => ({
      itemid: hist.itemid,
      clock: Number(hist.clock),
      value: hist.value,
    }));
  }

  async request<T>(method: string, params: unknown): Promise<T> {
    return this.executeRequestWithRetry<T>(method, params, true);
  }

  clearCache(): void {
    this.authToken = null;
    this.logger.log('Zabbix authentication token cache cleared');
  }

  getCachedToken(): string | null {
    return this.authToken;
  }

  private async executeRequestWithRetry<T>(
    method: string,
    params: unknown,
    allowRetry: boolean,
  ): Promise<T> {
    if (!this.authToken) {
      this.logger.log('No auth token cached. Invoking authenticate()...');
      await this.authenticate();
    }

    const payload: JsonRpcRequest = {
      jsonrpc: '2.0',
      method,
      params,
      id: Date.now(),
    };

    try {
      const response = await firstValueFrom(
        this.httpService.post<JsonRpcResponse<T>>(this.apiUrl, payload, {
          headers: {
            'Content-Type': 'application/json-rpc',
            Authorization: `Bearer ${this.authToken}`,
          },
        }),
      );

      const data = response.data as JsonRpcResponse<T>;

      if (data.error) {
        const errMessage = data.error.message;
        const errData = data.error.data ? JSON.stringify(data.error.data) : '';
        this.logger.warn(`Zabbix JSON-RPC error: ${errMessage} (${errData})`);

        const isSessionError =
          errMessage.toLowerCase().includes('session') ||
          errData.toLowerCase().includes('session') ||
          errMessage.toLowerCase().includes('not logged in') ||
          (data.error.code === -32602 && errData.includes('Session'));

        if (isSessionError && allowRetry) {
          this.logger.warn(
            'Zabbix session expired/invalid. Invalidate token and retry once...',
          );
          this.authToken = null;
          return this.executeRequestWithRetry<T>(method, params, false);
        }

        throw new HttpException(
          `Zabbix JSON-RPC Error: ${errMessage} (${errData})`,
          HttpStatus.BAD_GATEWAY,
        );
      }

      if (data.result === undefined) {
        throw new HttpException(
          'Zabbix JSON-RPC response result is undefined',
          HttpStatus.BAD_GATEWAY,
        );
      }

      return data.result;
    } catch (error: unknown) {
      if (error instanceof HttpException) {
        throw error;
      }

      const isHttpAuthError =
        error &&
        typeof error === 'object' &&
        'response' in error &&
        (error as { response?: { status?: number } }).response?.status === 401;

      if (isHttpAuthError && allowRetry) {
        this.logger.warn(
          'HTTP 401 Unauthorized. Invalidate token and retry once...',
        );
        this.authToken = null;
        return this.executeRequestWithRetry<T>(method, params, false);
      }

      const errorMsg = error instanceof Error ? error.message : String(error);
      const status =
        error && typeof error === 'object' && 'response' in error
          ? ((error as { response?: { status?: number } }).response?.status ??
            HttpStatus.SERVICE_UNAVAILABLE)
          : HttpStatus.SERVICE_UNAVAILABLE;

      throw new HttpException(`Zabbix Request Failed: ${errorMsg}`, status);
    }
  }
}
