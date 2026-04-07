"use client";

import {
  createContext,
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

const AppLoadingContext = createContext<AppLoadingContextValue | null>(null);

function buildLoadingId() {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }

  return `loading-${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

export function AppLoadingProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [entries, setEntries] = useState<Record<string, LoadingEntry>>({});
  const orderRef = useRef(0);
  const initialRenderRef = useRef(true);

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

  useEffect(() => {
    if (initialRenderRef.current) {
      initialRenderRef.current = false;
      return;
    }

    const timer = window.setTimeout(() => {
      hideLoading(ROUTE_LOADING_ID);
    }, 180);

    return () => window.clearTimeout(timer);
  }, [hideLoading, pathname, searchParams]);

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

  useEffect(() => {
    if (!entries[ROUTE_LOADING_ID]) {
      return;
    }

    const fallbackTimer = window.setTimeout(() => {
      hideLoading(ROUTE_LOADING_ID);
    }, 15000);

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