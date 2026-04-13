"use client";

import {
  createContext,
  Suspense,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { LoadingScreen } from "@/components/ui/loading-screen";

type LoadingOptions = {
  id?: string;
  message?: string;
  description?: string;
};

type LoadingEntry = Required<Pick<LoadingOptions, "message" | "description">> & {
  id: string;
  order: number;
};

type AppLoadingContextValue = {
  isLoading: boolean;
  showLoading: (options?: LoadingOptions) => string;
  hideLoading: (id: string) => void;
  withLoading: <T>(
    task: () => Promise<T>,
    options?: LoadingOptions,
  ) => Promise<T>;
};

const DEFAULT_MESSAGE = "Memproses permintaan...";
const DEFAULT_DESCRIPTION =
  "Mohon tunggu sebentar, sistem sedang menyiapkan data terbaru.";
const ROUTE_LOADING_ID = "__route_loading__";

// Maximum time (ms) route loading is allowed to stay active
const ROUTE_LOADING_MAX_DURATION = 8000;
// Delay (ms) after pathname changes before hiding route loading
const ROUTE_LOADING_HIDE_DELAY = 200;

const AppLoadingContext = createContext<AppLoadingContextValue | null>(null);

function buildLoadingId() {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }

  return `loading-${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

function RouteLoadingEvents({
  hideLoading,
}: {
  hideLoading: (id: string) => void;
}) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const initialRenderRef = useRef(true);
  // Track the last pathname to detect actual navigation
  const prevPathnameRef = useRef(pathname);

  useEffect(() => {
    // Skip the very first render — no navigation has happened yet
    if (initialRenderRef.current) {
      initialRenderRef.current = false;
      prevPathnameRef.current = pathname;
      return;
    }

    // Hide loading whenever pathname or searchParams change (route settled)
    const timer = window.setTimeout(() => {
      hideLoading(ROUTE_LOADING_ID);
    }, ROUTE_LOADING_HIDE_DELAY);

    prevPathnameRef.current = pathname;

    return () => window.clearTimeout(timer);
  }, [hideLoading, pathname, searchParams]);

  return null;
}

export function AppLoadingProvider({ children }: { children: ReactNode }) {
  const [entries, setEntries] = useState<Record<string, LoadingEntry>>({});
  const orderRef = useRef(0);

  const showLoading = useCallback((options: LoadingOptions = {}) => {
    const id = options.id ?? buildLoadingId();

    setEntries((current) => ({
      ...current,
      [id]: {
        id,
        message: options.message ?? DEFAULT_MESSAGE,
        description: options.description ?? DEFAULT_DESCRIPTION,
        order: ++orderRef.current,
      },
    }));

    return id;
  }, []);

  const hideLoading = useCallback((id: string) => {
    setEntries((current) => {
      if (!current[id]) {
        return current;
      }

      const next = { ...current };
      delete next[id];
      return next;
    });
  }, []);

  const withLoading = useCallback<AppLoadingContextValue["withLoading"]>(
    async (task, options) => {
      const id = showLoading(options);

      try {
        return await task();
      } finally {
        hideLoading(id);
      }
    },
    [hideLoading, showLoading],
  );

  const activeEntry = useMemo(() => {
    const values = Object.values(entries);

    if (values.length === 0) {
      return null;
    }

    return values.sort((left, right) => right.order - left.order)[0] ?? null;
  }, [entries]);

  // Handle link clicks to trigger route loading indicator
  useEffect(() => {
    const handleDocumentClick = (event: MouseEvent) => {
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      ) {
        return;
      }

      const target = event.target;

      if (!(target instanceof Element)) {
        return;
      }

      const anchor = target.closest("a[href]") as HTMLAnchorElement | null;

      if (!anchor) {
        return;
      }

      if (anchor.target && anchor.target !== "_self") {
        return;
      }

      if (anchor.hasAttribute("download")) {
        return;
      }

      const href = anchor.getAttribute("href");

      if (
        !href ||
        href.startsWith("#") ||
        href.startsWith("mailto:") ||
        href.startsWith("tel:") ||
        href.startsWith("javascript:")
      ) {
        return;
      }

      const nextUrl = new URL(anchor.href, window.location.href);
      const currentUrl = new URL(window.location.href);

      if (nextUrl.origin !== currentUrl.origin) {
        return;
      }

      if (
        nextUrl.pathname === currentUrl.pathname &&
        nextUrl.search === currentUrl.search
      ) {
        return;
      }

      showLoading({
        id: ROUTE_LOADING_ID,
        message: "Membuka menu...",
        description: "Menyiapkan halaman berikutnya dengan tampilan terbaru.",
      });
    };

    const handlePopState = () => {
      showLoading({
        id: ROUTE_LOADING_ID,
        message: "Memuat navigasi...",
        description: "Sistem sedang menyesuaikan tampilan sesuai halaman tujuan.",
      });
    };

    document.addEventListener("click", handleDocumentClick, true);
    window.addEventListener("popstate", handlePopState);

    return () => {
      document.removeEventListener("click", handleDocumentClick, true);
      window.removeEventListener("popstate", handlePopState);
    };
  }, [showLoading]);

  // Hard cap: route loading must not run longer than ROUTE_LOADING_MAX_DURATION
  useEffect(() => {
    if (!entries[ROUTE_LOADING_ID]) {
      return;
    }

    const fallbackTimer = window.setTimeout(() => {
      hideLoading(ROUTE_LOADING_ID);
    }, ROUTE_LOADING_MAX_DURATION);

    return () => window.clearTimeout(fallbackTimer);
  }, [entries, hideLoading]);

  const value = useMemo<AppLoadingContextValue>(
    () => ({
      isLoading: Boolean(activeEntry),
      showLoading,
      hideLoading,
      withLoading,
    }),
    [activeEntry, hideLoading, showLoading, withLoading],
  );

  return (
    <AppLoadingContext.Provider value={value}>
      <Suspense fallback={null}>
        <RouteLoadingEvents hideLoading={hideLoading} />
      </Suspense>

      {children}

      {activeEntry ? (
        <LoadingScreen
          message={activeEntry.message}
          description={activeEntry.description}
        />
      ) : null}
    </AppLoadingContext.Provider>
  );
}

export function useAppLoading() {
  const context = useContext(AppLoadingContext);

  if (!context) {
    throw new Error("useAppLoading harus digunakan di dalam AppLoadingProvider.");
  }

  return context;
}