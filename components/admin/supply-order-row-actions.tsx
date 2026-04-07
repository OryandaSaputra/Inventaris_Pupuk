"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, PencilLine, Trash2 } from "lucide-react";
import { deleteSupplyOrderAction } from "@/lib/actions/admin";
import { useAppLoading } from "@/components/providers/app-loading-provider";
import { buttonVariants } from "@/components/ui/button";
import {
  confirmDelete,
  showErrorToast,
  showSuccessToast,
} from "@/lib/feedback/sweet-alert";
import { cn } from "@/lib/utils";

export function SupplyOrderRowActions({ id }: { id: string }) {
  const router = useRouter();
  const { withLoading } = useAppLoading();
  const [isDeleting, setIsDeleting] = useState(false);

  async function handleDelete() {
    const confirmed = await confirmDelete({
      title: "Hapus data pasokan ini?",
      text: "Tindakan ini juga akan menghapus data penerimaan yang terhubung dengan kontrak pasokan ini.",
      confirmButtonText: "Ya, hapus pasokan",
    });

    if (!confirmed) {
      return;
    }

    setIsDeleting(true);

    try {
      // Memberikan argumen new FormData() dan menambahkan type assertion as any 
      // untuk mencegah error "Property does not exist on type 'void'"
      const result = (await withLoading(
        () => deleteSupplyOrderAction(id, new FormData()),
        {
          message: "Menghapus data pasokan...",
          description:
            "Mohon tunggu sebentar, sistem sedang menghapus kontrak dan data turunannya.",
        },
      )) as any;

      // Menggunakan fallback jika result undefined/void untuk menghindari runtime error
      if (result && result.success === false) {
        void showErrorToast(result.message || "Terjadi kesalahan", "Gagal menghapus pasokan");
        return;
      }

      void showSuccessToast(result?.message || "Data pasokan berhasil dihapus", "Pasokan dihapus");
      router.refresh();
    } finally {
      setIsDeleting(false);
    }
  }

  return (
    <div className="flex min-w-[132px] flex-nowrap items-center justify-end gap-2 whitespace-nowrap">
      <Link
        href={`/admin/pasokan/${id}`}
        aria-label="Lihat detail pasokan"
        title="Detail"
        className={cn(
          buttonVariants({ variant: "outline", size: "icon" }),
          "h-9 w-9 shrink-0 rounded-xl border-white/65 bg-white/75 text-slate-700 hover:bg-white/85",
        )}
      >
        <Eye className="h-4 w-4" />
      </Link>

      <Link
        href={`/admin/pasokan/${id}/edit`}
        aria-label="Edit pasokan"
        title="Edit"
        className={cn(
          buttonVariants({ variant: "outline", size: "icon" }),
          "h-9 w-9 shrink-0 rounded-xl border-emerald-200/80 bg-emerald-500/10 text-emerald-800 hover:bg-emerald-500/15",
        )}
      >
        <PencilLine className="h-4 w-4" />
      </Link>

      <button
        type="button"
        aria-label="Hapus pasokan"
        title="Hapus"
        disabled={isDeleting}
        onClick={() => {
          void handleDelete();
        }}
        className={cn(
          buttonVariants({ variant: "outline", size: "icon" }),
          "h-9 w-9 shrink-0 rounded-xl border-rose-200/80 bg-rose-500/10 text-rose-800 hover:bg-rose-500/15",
        )}
      >
        <Trash2 className="h-4 w-4" />
      </button>
    </div>
  );
}