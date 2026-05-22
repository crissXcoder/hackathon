import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { getDeviceDetail, type DeviceDetailResponse } from "../services/api";

export const DEVICE_DETAIL_QUERY_KEY = (id: string) => ["device", id] as const;

export function useDeviceDetail(id: string) {
  const queryClient = useQueryClient();

  useEffect(() => {
    // SSE — backend emite JSON del dispositivo directamente cada 3s
    const eventSource = new EventSource(`http://localhost:3000/zabbix/device/${id}/stream`, {
      withCredentials: true,
    });

    eventSource.onmessage = (event) => {
      try {
        // Backend serializa el objeto directamente: data: JSON.stringify(detail)
        const payload = JSON.parse(event.data) as DeviceDetailResponse;
        if (payload) {
          queryClient.setQueryData<DeviceDetailResponse>(DEVICE_DETAIL_QUERY_KEY(id), payload);
        }
      } catch (err) {
        console.error("Error parsing SSE data", err);
      }
    };

    eventSource.onerror = () => {
      // SSE reconnects automatically; close on unmount handles cleanup
      console.warn("SSE connection error — browser will retry automatically");
    };

    return () => {
      eventSource.close();
    };
  }, [id, queryClient]);

  return useQuery<DeviceDetailResponse, Error>({
    queryKey: DEVICE_DETAIL_QUERY_KEY(id),
    queryFn: () => getDeviceDetail(id),
    staleTime: 1000 * 60,
  });
}
