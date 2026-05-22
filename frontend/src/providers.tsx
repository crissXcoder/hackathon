"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";

/**
 * QueryClient factory isolated per-request (avoids shared state between users in SSR).
 * staleTime: 30s default — queries can override per feature (e.g. polling every 5s).
 * gcTime: 5min — keeps inactive cache alive for navigation performance.
 */
function makeQueryClient(): QueryClient {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 1_000 * 30,      // 30s — override per query for aggressive polling
        gcTime: 1_000 * 60 * 5,    // 5min garbage collection
        retry: 2,
        refetchOnWindowFocus: true,
      },
    },
  });
}

let browserQueryClient: QueryClient | undefined;

function getQueryClient(): QueryClient {
  if (typeof window === "undefined") {
    // Server: always new client
    return makeQueryClient();
  }
  // Browser: singleton — avoids recreating on re-render
  if (!browserQueryClient) {
    browserQueryClient = makeQueryClient();
  }
  return browserQueryClient;
}

interface ProvidersProps {
  children: React.ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  // useState ensures QueryClient is not recreated per render in client
  const [queryClient] = useState(() => getQueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
}
