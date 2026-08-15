import { QueryClient } from "@tanstack/react-query";
import { createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";

export const getRouter = () => {
  // Reference/list data is cached: a page fetches on mount only when its data
  // is missing or older than the stale window, instead of on every visit.
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 5 * 60_000,
        gcTime: 30 * 60_000,
        refetchOnMount: false,
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
      },
    },
  });


  const router = createRouter({
    routeTree,
    context: { queryClient },
    scrollRestoration: true,
    defaultPreloadStaleTime: 0,
    // Preload the route chunk as soon as a link is hovered/focused, so clicking
    // a nav item renders instantly instead of showing a blank gap.
    defaultPreload: "intent",
    defaultPreloadDelay: 50,
    // Show a spinner immediately instead of an empty screen while a chunk loads.
    defaultPendingMs: 150,
    defaultPendingMinMs: 0,
    defaultPendingComponent: () => (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="h-6 w-6 animate-spin rounded-full border-2 border-muted border-t-primary" />
      </div>
    ),
  });

  return router;
};
