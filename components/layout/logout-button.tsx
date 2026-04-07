"use client";

import { useState } from "react";
import { LogOut, Loader2 } from "lucide-react";
import { signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { confirmDialog } from "@/lib/feedback/sweet-alert";
import { useAppLoading } from "@/components/providers/app-loading-provider";

export function LogoutButton() {
  const { showLoading, hideLoading } = useAppLoading();
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleLogout() {
    const confirmed = await confirmDialog({
      title: "Keluar dari akun?",
      text: "Anda akan keluar dari dashboard dan harus login kembali untuk mengakses sistem.",
      confirmButtonText: "Ya, logout",
      cancelButtonText: "Batal",
      icon: "warning",
      danger: true,
    });

    if (!confirmed) {
      return;
    }

    setIsSubmitting(true);

    const loadingId = showLoading({
      message: "Sedang logout...",
      description: "Menutup sesi Anda dan mengarahkan kembali ke halaman login.",
    });

    try {
      await signOut({
        callbackUrl: "/login",
        redirect: true,
      });
    } finally {
      hideLoading(loadingId);
      setIsSubmitting(false);
    }
  }

  return (
    <Button
      variant="outline"
      type="button"
      onClick={handleLogout}
      disabled={isSubmitting}
      className="w-full rounded-[1rem] sm:w-auto"
    >
      {isSubmitting ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Logout...
        </>
      ) : (
        <>
          <LogOut className="mr-2 h-4 w-4" />
          Logout
        </>
      )}
    </Button>
  );
}