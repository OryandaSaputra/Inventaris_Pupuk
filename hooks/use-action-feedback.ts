"use client";

import { useEffect, useRef } from "react";
import type { ActionState } from "@/lib/actions/shared";
import { useAppLoading } from "@/components/providers/app-loading-provider";
import { showErrorToast, showSuccessToast } from "@/lib/feedback/sweet-alert";

type UseActionFeedbackOptions = {
  pending: boolean;
  state: ActionState;
  loadingMessage: string;
  loadingDescription?: string;
  successTitle?: string;
  errorTitle?: string;
  notifyOnValidationError?: boolean;
};

export function useActionFeedback({
  pending,
  state,
  loadingMessage,
  loadingDescription,
  successTitle = "Berhasil",
  errorTitle = "Proses gagal",
  notifyOnValidationError = false,
}: UseActionFeedbackOptions) {
  const { hideLoading, showLoading } = useAppLoading();
  const loadingIdRef = useRef<string | null>(null);
  const handledMessageRef = useRef<string>("");

  useEffect(() => {
    if (pending) {
      if (!loadingIdRef.current) {
        loadingIdRef.current = showLoading({
          message: loadingMessage,
          description: loadingDescription,
        });
      }

      return;
    }

    if (loadingIdRef.current) {
      hideLoading(loadingIdRef.current);
      loadingIdRef.current = null;
    }
  }, [hideLoading, loadingDescription, loadingMessage, pending, showLoading]);

  useEffect(() => {
    return () => {
      if (loadingIdRef.current) {
        hideLoading(loadingIdRef.current);
      }
    };
  }, [hideLoading]);

  useEffect(() => {
    if (!state.message) {
      return;
    }

    const handledKey = `${state.success}:${state.message}`;

    if (handledMessageRef.current === handledKey) {
      return;
    }

    handledMessageRef.current = handledKey;

    const hasValidationErrors = Boolean(
      state.errors && Object.keys(state.errors).length > 0,
    );

    if (!state.success && hasValidationErrors && !notifyOnValidationError) {
      return;
    }

    if (state.success) {
      void showSuccessToast(state.message, successTitle, {
        timer: 2000,
      });
      return;
    }

    void showErrorToast(state.message, errorTitle, {
      timer: 2600,
    });
  }, [errorTitle, notifyOnValidationError, state, successTitle]);
}