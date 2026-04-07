"use client";

import type { SweetAlertIcon, SweetAlertOptions } from "sweetalert2";

let swalPromise: Promise<typeof import("sweetalert2").default> | null = null;

function mergeCustomClass(
  base: SweetAlertOptions["customClass"],
  extra: SweetAlertOptions["customClass"],
): SweetAlertOptions["customClass"] {
  return {
    ...(base ?? {}),
    ...(extra ?? {}),
  };
}

async function getSwal() {
  if (!swalPromise) {
    swalPromise = import("sweetalert2").then((module) => module.default);
  }

  return swalPromise;
}

function buildModalOptions(options: SweetAlertOptions): SweetAlertOptions {
  return {
    buttonsStyling: false,
    confirmButtonText: "OK",
    backdrop: "rgba(2, 8, 23, 0.78)",
    allowOutsideClick: true,
    customClass: mergeCustomClass(
      {
        container: "app-swal-container",
        popup: "app-swal-popup",
        title: "app-swal-title",
        htmlContainer: "app-swal-html",
        actions: "app-swal-actions",
        confirmButton: "app-swal-confirm-button",
        cancelButton: "app-swal-cancel-button",
      },
      options.customClass,
    ),
    ...options,
  };
}

function buildCenterNoticeOptions(options: SweetAlertOptions): SweetAlertOptions {
  return {
    toast: false,
    position: "center",
    timer: 2200,
    timerProgressBar: false,
    showConfirmButton: false,
    showCloseButton: false,
    allowOutsideClick: false,
    allowEscapeKey: true,
    backdrop: "rgba(2, 8, 23, 0.68)",
    customClass: mergeCustomClass(
      {
        container: "app-swal-container",
        popup: "app-swal-center-toast",
        icon: "app-swal-center-toast-icon",
        title: "app-swal-center-toast-title",
        htmlContainer: "app-swal-center-toast-html",
      },
      options.customClass,
    ),
    ...options,
  };
}

async function showCenterNotice(
  icon: SweetAlertIcon,
  title: string,
  text: string,
  options?: SweetAlertOptions,
) {
  const Swal = await getSwal();

  await Swal.fire(
    buildCenterNoticeOptions({
      icon,
      title,
      text,
      ...options,
    }),
  );
}

export async function showSuccessToast(
  text: string,
  title = "Berhasil",
  options?: SweetAlertOptions,
) {
  await showCenterNotice("success", title, text, options);
}

export async function showErrorToast(
  text: string,
  title = "Proses gagal",
  options?: SweetAlertOptions,
) {
  await showCenterNotice("error", title, text, {
    timer: 2800,
    ...options,
  });
}

export async function confirmDialog(options: {
  title: string;
  text: string;
  confirmButtonText?: string;
  cancelButtonText?: string;
  icon?: SweetAlertIcon;
  danger?: boolean;
}) {
  const Swal = await getSwal();
  const result = await Swal.fire(
    buildModalOptions({
      icon: options.icon ?? "question",
      title: options.title,
      text: options.text,
      showCancelButton: true,
      reverseButtons: true,
      focusCancel: true,
      confirmButtonText: options.confirmButtonText ?? "Ya, lanjutkan",
      cancelButtonText: options.cancelButtonText ?? "Batal",
      customClass: {
        confirmButton: options.danger
          ? "app-swal-confirm-button app-swal-confirm-danger"
          : "app-swal-confirm-button",
      },
    }),
  );

  return result.isConfirmed;
}

export async function confirmDelete(options?: {
  title?: string;
  text?: string;
  confirmButtonText?: string;
}) {
  return confirmDialog({
    title: options?.title ?? "Hapus data ini?",
    text:
      options?.text ??
      "Data yang sudah dihapus tidak dapat dikembalikan. Pastikan tindakan ini memang diperlukan.",
    confirmButtonText: options?.confirmButtonText ?? "Ya, hapus",
    cancelButtonText: "Batal",
    icon: "warning",
    danger: true,
  });
}