import { useQuery } from "@tanstack/react-query";
import { getDeviceDetail, type DeviceDetailResponse } from "../services/api";

export const DEVICE_DETAIL_QUERY_KEY = (id: string) => ["device", id] as const;

export function useDeviceDetail(id: string) {
  return useQuery<DeviceDetailResponse, Error>({
    queryKey: DEVICE_DETAIL_QUERY_KEY(id),
    queryFn: () => getDeviceDetail(id),
    staleTime: 1000 * 60, // 1 minute stale time as per rules
  });
}
