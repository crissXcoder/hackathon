import axios from "axios";

/**
 * Axios instance for Zabbix proxy endpoints exposed by the NestJS backend.
 * Base: http://localhost:3000/zabbix
 */
export const apiClient = axios.create({
  baseURL: "http://localhost:3000/zabbix",
  timeout: 8_000,
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use(
  (config) => config,
  (error) => Promise.reject(error),
);

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (axios.isAxiosError(error)) {
      const status = error.response?.status;
      const message = error.response?.data?.message ?? error.message;
      return Promise.reject(new Error(`[${status ?? "NET"}] ${message}`));
    }
    return Promise.reject(error);
  },
);

export interface DevicePeak {
  timestamp: string;
  value: number;
}

export interface DeviceDetailResponse {
  id: string;
  name: string;
  status: "critical" | "warning" | "ok";
  temperature: number;
  cpu: number;
  memory: number;
  ip?: string;
  peaksCount: number;
  peaks: DevicePeak[];
}

export const getDeviceDetail = async (id: string): Promise<DeviceDetailResponse> => {
  const { data } = await apiClient.get<DeviceDetailResponse>(`/device/${id}`);
  return data;
};

export const diagnoseDevice = async (id: string) => {
  const { data } = await axios.post(`http://localhost:3000/ai/diagnose/${id}`);
  return data;
};
