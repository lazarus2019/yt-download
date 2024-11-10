import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { PropsWithChildren } from 'react';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { StoreProvider } from './StoreProvider';

const CACHE_TIME = 5 * 60 * 1000; // 5mins
const STALE_TIME = 3 * 60 * 1000; // 3mins

// setup react query client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      gcTime: CACHE_TIME,
      staleTime: STALE_TIME,
      refetchOnWindowFocus: false,
      retry: 2,
    },
  },
});

export const AppProvider = ({ children }: PropsWithChildren) => {
  return (
    <QueryClientProvider client={queryClient}>
      <StoreProvider>{children}</StoreProvider>

      {import.meta.env.MODE === 'development' && (
        <ReactQueryDevtools initialIsOpen />
      )}
    </QueryClientProvider>
  );
};
