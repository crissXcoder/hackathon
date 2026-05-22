import { useState, useEffect } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "@/services/api";

// ── Types ─────────────────────────────────────────────────────────────────────

export type DeviceStatus = "up" | "down" | "unknown";

export interface NetworkDevice {
  id: string;
  name: string;
  status: DeviceStatus;
  ip: string;
  lastCheck: string;
  availability?: number;
  metrics?: {
    temperature: string;
    cpuUsage: string;
    memoryUsage: string;
  };
}

export interface PaginatedResponse {
  items: NetworkDevice[];
  total: number;
}

// ── Query key ─────────────────────────────────────────────────────────────────

export const NETWORK_HEALTH_KEY = ["network", "health"] as const;

// ── Fetcher ───────────────────────────────────────────────────────────────────

async function fetchNetworkHealth(page: number, limit: number): Promise<PaginatedResponse> {
  const { data } = await apiClient.get<PaginatedResponse>("/health", {
    params: { page, limit },
  });
  return data;
}

// ── Hook ──────────────────────────────────────────────────────────────────────

export interface UseNetworkHealthResult {
  devices: NetworkDevice[];
  isLoading: boolean;
  isFetching: boolean;
  isError: boolean;
  errorMessage: string | null;
  total: number;
  upCount: number;
  downCount: number;
  unknownCount: number;
  page: number;
  setPage: (page: number) => void;
  totalPages: number;
}

const PAGE_SIZE = 8;

export function useNetworkHealth(): UseNetworkHealthResult {
  const [page, setPage] = useState(1);
  const queryClient = useQueryClient();

  const { data, isLoading, isFetching, isError, error } = useQuery<
    PaginatedResponse,
    Error
  >({
    queryKey: [NETWORK_HEALTH_KEY, page],
    queryFn: () => fetchNetworkHealth(page, PAGE_SIZE),
    staleTime: 0,
    retry: 2,
  });

  useEffect(() => {
    // Nos suscribimos al endpoint SSE del backend para recibir la simulación en tiempo real
    const eventSource = new EventSource("http://localhost:3000/zabbix/stream");
    
    eventSource.onmessage = (event) => {
      try {
        const payload = JSON.parse(event.data);
        if (payload.metrics) {
          queryClient.setQueryData<PaginatedResponse>([NETWORK_HEALTH_KEY, page], () => {
            return {
              items: payload.metrics.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE),
              total: payload.metrics.length
            };
          });
        }
      } catch (err) {
        console.error("Error procesando los datos de la simulación SSE", err);
      }
    };

    return () => {
      eventSource.close();
    };
  }, [page, queryClient]);

  const devices = data?.items ?? [];
  const total = data?.total ?? 0;
  const totalPages = Math.ceil(total / PAGE_SIZE);

  const upCount = devices.filter((d) => d.status === "up").length;
  const downCount = devices.filter((d) => d.status === "down").length;
  const unknownCount = devices.filter((d) => d.status === "unknown").length;

  return {
    devices,
    isLoading,
    isFetching,
    isError,
    errorMessage: isError && error ? error.message : null,
    total,
    upCount,
    downCount,
    unknownCount,
    page,
    setPage,
    totalPages,
  };
}
