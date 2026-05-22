import { Test, TestingModule } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { ZabbixService } from './zabbix.service';
import { of, throwError } from 'rxjs';
import { AxiosResponse } from 'axios';
import { HttpException } from '@nestjs/common';

describe('ZabbixService', () => {
  let service: ZabbixService;

  const mockHttpService = {
    post: jest.fn(),
  };

  const mockConfigService = {
    get: jest.fn((key: string) => {
      if (key === 'ZABBIX_URL') return 'http://localhost/zabbix';
      if (key === 'ZABBIX_USER') return 'Admin';
      if (key === 'ZABBIX_PASSWORD') return 'zabbix';
      return null;
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ZabbixService,
        { provide: ConfigService, useValue: mockConfigService },
        { provide: HttpService, useValue: mockHttpService },
      ],
    }).compile();

    service = module.get<ZabbixService>(ZabbixService);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('authenticate', () => {
    it('should successfully authenticate and return token', async () => {
      const mockResponse = {
        data: {
          jsonrpc: '2.0',
          result: 'mock-token-123',
          id: 1,
        },
        status: 200,
        statusText: 'OK',
        headers: {},
        config: {},
      } as unknown as AxiosResponse;

      mockHttpService.post.mockReturnValue(of(mockResponse));

      const token = await service.authenticate();

      expect(token).toBe('mock-token-123');
      expect(service.getCachedToken()).toBe('mock-token-123');
      expect(mockHttpService.post).toHaveBeenCalledTimes(1);
    });

    it('should throw HttpException when Zabbix returns an API error', async () => {
      const mockResponse = {
        data: {
          jsonrpc: '2.0',
          error: {
            code: -32602,
            message: 'Invalid params.',
            data: 'Incorrect username or password.',
          },
          id: 1,
        },
        status: 200,
        statusText: 'OK',
        headers: {},
        config: {},
      } as unknown as AxiosResponse;

      mockHttpService.post.mockReturnValue(of(mockResponse));

      await expect(service.authenticate()).rejects.toThrow(HttpException);
      expect(service.getCachedToken()).toBeNull();
    });
  });

  describe('request with caching and auto-renewal', () => {
    it('should authenticate first if no token cached, then execute request', async () => {
      const mockAuthResponse = {
        data: { jsonrpc: '2.0', result: 'auth-token', id: 1 },
        status: 200,
        statusText: 'OK',
        headers: {},
        config: {},
      } as unknown as AxiosResponse;

      const mockDataResponse = {
        data: {
          jsonrpc: '2.0',
          result: [{ hostid: '10084', host: 'Zabbix server' }],
          id: 2,
        },
        status: 200,
        statusText: 'OK',
        headers: {},
        config: {},
      } as unknown as AxiosResponse;

      mockHttpService.post
        .mockReturnValueOnce(of(mockAuthResponse))
        .mockReturnValueOnce(of(mockDataResponse));

      const result = await service.request<
        Array<{ hostid: string; host: string }>
      >('host.get', { output: 'extend' });

      expect(result).toEqual([{ hostid: '10084', host: 'Zabbix server' }]);
      expect(mockHttpService.post).toHaveBeenCalledTimes(2);
      expect(service.getCachedToken()).toBe('auth-token');
    });

    it('should use cached token for subsequent requests without re-authenticating', async () => {
      service.clearCache();
      const mockAuthResponse = {
        data: { jsonrpc: '2.0', result: 'auth-token', id: 1 },
        status: 200,
        statusText: 'OK',
        headers: {},
        config: {},
      } as unknown as AxiosResponse;
      mockHttpService.post.mockReturnValueOnce(of(mockAuthResponse));
      await service.authenticate();

      const mockDataResponse = {
        data: { jsonrpc: '2.0', result: 'some-data', id: 2 },
        status: 200,
        statusText: 'OK',
        headers: {},
        config: {},
      } as unknown as AxiosResponse;
      mockHttpService.post.mockReturnValueOnce(of(mockDataResponse));

      const result = await service.request<string>('some.method', {});
      expect(result).toBe('some-data');
      expect(mockHttpService.post).toHaveBeenCalledTimes(2);
    });

    it('should auto-renew token and retry request if session is expired', async () => {
      service.clearCache();
      const mockAuthResponse = {
        data: { jsonrpc: '2.0', result: 'new-valid-token', id: 1 },
        status: 200,
        statusText: 'OK',
        headers: {},
        config: {},
      } as unknown as AxiosResponse;
      mockHttpService.post.mockReturnValueOnce(of(mockAuthResponse));
      await service.authenticate();

      const mockSessionErrorResponse = {
        data: {
          jsonrpc: '2.0',
          error: {
            code: -32500,
            message: 'Application error.',
            data: 'Session expired.',
          },
          id: 2,
        },
        status: 200,
        statusText: 'OK',
        headers: {},
        config: {},
      } as unknown as AxiosResponse;

      const mockReAuthResponse = {
        data: { jsonrpc: '2.0', result: 'fresh-token', id: 3 },
        status: 200,
        statusText: 'OK',
        headers: {},
        config: {},
      } as unknown as AxiosResponse;

      const mockSuccessDataResponse = {
        data: { jsonrpc: '2.0', result: 'success-data', id: 4 },
        status: 200,
        statusText: 'OK',
        headers: {},
        config: {},
      } as unknown as AxiosResponse;

      mockHttpService.post
        .mockReturnValueOnce(of(mockSessionErrorResponse))
        .mockReturnValueOnce(of(mockReAuthResponse))
        .mockReturnValueOnce(of(mockSuccessDataResponse));

      const result = await service.request<string>('some.method', {});

      expect(result).toBe('success-data');
      expect(service.getCachedToken()).toBe('fresh-token');
      expect(mockHttpService.post).toHaveBeenCalledTimes(4);
    });

    it('should auto-renew token and retry request on HTTP 401 Unauthorized', async () => {
      service.clearCache();
      const mockAuthResponse = {
        data: { jsonrpc: '2.0', result: 'old-token', id: 1 },
        status: 200,
        statusText: 'OK',
        headers: {},
        config: {},
      } as unknown as AxiosResponse;
      mockHttpService.post.mockReturnValueOnce(of(mockAuthResponse));
      await service.authenticate();

      const mockHttp401Error = {
        response: {
          status: 401,
        },
        message: 'Request failed with status code 401',
      };

      const mockReAuthResponse = {
        data: { jsonrpc: '2.0', result: 'fresh-http-token', id: 3 },
        status: 200,
        statusText: 'OK',
        headers: {},
        config: {},
      } as unknown as AxiosResponse;

      const mockSuccessDataResponse = {
        data: { jsonrpc: '2.0', result: 'ok-data', id: 4 },
        status: 200,
        statusText: 'OK',
        headers: {},
        config: {},
      } as unknown as AxiosResponse;

      mockHttpService.post
        .mockReturnValueOnce(throwError(() => mockHttp401Error))
        .mockReturnValueOnce(of(mockReAuthResponse))
        .mockReturnValueOnce(of(mockSuccessDataResponse));

      const result = await service.request<string>('some.method', {});

      expect(result).toBe('ok-data');
      expect(service.getCachedToken()).toBe('fresh-http-token');
      expect(mockHttpService.post).toHaveBeenCalledTimes(4);
    });
  });

  describe('monitoring data retrieval methods', () => {
    beforeEach(() => {
      // Accessing private property in test to inject mocked state without using 'any'
      (service as unknown as { authToken: string | null }).authToken =
        'pre-set-valid-token';
    });

    describe('getHosts', () => {
      it('should return filtered list of hosts', async () => {
        const mockHostsResponse = {
          data: {
            jsonrpc: '2.0',
            result: [
              { hostid: '1', name: 'Server A', status: '0', interfaces: [{ ip: '192.168.1.1' }], extra: 'ignored' },
              { hostid: '2', name: 'Server B', status: '1', interfaces: [], extra: 'ignored' },
            ],
            id: 1,
          },
          status: 200,
          statusText: 'OK',
          headers: {},
          config: {},
        } as unknown as AxiosResponse;

        mockHttpService.post.mockReturnValueOnce(of(mockHostsResponse));

        const result = await service.getHosts();

        expect(result).toEqual([
          { hostid: '1', name: 'Server A', status: '0', ip: '192.168.1.1' },
          { hostid: '2', name: 'Server B', status: '1', ip: 'N/A' },
        ]);
        expect(mockHttpService.post).toHaveBeenCalledTimes(1);
        expect(mockHttpService.post).toHaveBeenCalledWith(
          expect.any(String),
          expect.objectContaining({
            method: 'host.get',
            params: {
              output: ['hostid', 'name', 'status'],
              selectInterfaces: ['ip'],
            },
          }),
          expect.any(Object),
        );
      });
    });

    describe('getItems', () => {
      it('should search specific names and return item ID, name and numeric value type', async () => {
        const mockItemsResponse = {
          data: {
            jsonrpc: '2.0',
            result: [
              { itemid: '101', name: 'CPU utilization', value_type: '3', key_: 'system.cpu.util' },
              { itemid: '102', name: 'Temperature', value_type: '0', key_: 'sensor.temp' },
            ],
            id: 1,
          },
          status: 200,
          statusText: 'OK',
          headers: {},
          config: {},
        } as unknown as AxiosResponse;

        mockHttpService.post.mockReturnValueOnce(of(mockItemsResponse));

        const result = await service.getItems('host-123');

        expect(result).toEqual([
          { itemid: '101', name: 'CPU utilization', value_type: 3, key_: 'system.cpu.util' },
          { itemid: '102', name: 'Temperature', value_type: 0, key_: 'sensor.temp' },
        ]);
        expect(mockHttpService.post).toHaveBeenCalledWith(
          expect.any(String),
          expect.objectContaining({
            method: 'item.get',
            params: {
              output: ['itemid', 'name', 'value_type', 'key_'],
              hostids: 'host-123',
            },
          }),
          expect.any(Object),
        );
      });
    });

    describe('getHistory', () => {
      it('should request history endpoint with limit 1 sorted DESC', async () => {
        const mockHistoryResponse = {
          data: {
            jsonrpc: '2.0',
            result: [{ itemid: '101', clock: '1716300000', value: '45.5' }],
            id: 1,
          },
          status: 200,
          statusText: 'OK',
          headers: {},
          config: {},
        } as unknown as AxiosResponse;

        mockHttpService.post.mockReturnValueOnce(of(mockHistoryResponse));

        const result = await service.getHistory('101', 0);

        expect(result).toEqual([
          { itemid: '101', clock: 1716300000, value: '45.5' },
        ]);
        expect(mockHttpService.post).toHaveBeenCalledWith(
          expect.any(String),
          expect.objectContaining({
            method: 'history.get',
            params: {
              output: ['itemid', 'clock', 'value'],
              history: 0,
              itemids: '101',
              sortfield: 'clock',
              sortorder: 'DESC',
              limit: 1,
            },
          }),
          expect.any(Object),
        );
      });
    });

    describe('Error conversion to HttpException', () => {
      it('should throw HttpException when a JSON-RPC error is returned', async () => {
        const mockRpcError = {
          data: {
            jsonrpc: '2.0',
            error: {
              code: -32602,
              message: 'Invalid params.',
              data: 'Cannot search that.',
            },
            id: 1,
          },
          status: 200,
          statusText: 'OK',
          headers: {},
          config: {},
        } as unknown as AxiosResponse;

        mockHttpService.post.mockReturnValueOnce(of(mockRpcError));

        await expect(service.getHosts()).rejects.toThrow(HttpException);
      });

      it('should throw HttpException when Axios network error occurs', async () => {
        const mockNetworkError = {
          response: {
            status: 502,
          },
          message: 'Bad Gateway',
        };

        mockHttpService.post.mockReturnValueOnce(
          throwError(() => mockNetworkError),
        );

        await expect(service.getHosts()).rejects.toThrow(HttpException);
      });
    });
  });
});
