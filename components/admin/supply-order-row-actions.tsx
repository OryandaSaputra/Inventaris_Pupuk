"use client";

import Link from "next/link";
import { Eye, PencilLine, Trash2 } from "lucide-react";
import { useFormStatus } from "react-dom";
import { deleteSupplyOrderAction } from "@/lib/actions/admin";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

function DeleteActionButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      aria-label="Hapus pasokan"
      title="Hapus"
      disabled={pending}
      className={cn(
        buttonVariants({ variant: "outline", size: "icon" }),
        "h-9 w-9 shrink-0 rounded-xl border-rose-200/80 bg-rose-500/10 text-rose-800 hover:bg-rose-500/15",
      )}
    >
      <Trash2 className="h-4 w-4" />
    </button>
  );
}

export function SupplyOrderRowActions({ id }: { id: string }) {
  const deleteAction = deleteSupplyOrderAction.bind(null, id);

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

      <form
        action={deleteAction}
        className="inline-flex shrink-0"
        onSubmit={(event) => {
          const confirmed = window.confirm(
            "Hapus data pasokan ini? Tindakan ini juga akan menghapus data penerimaan yang terkait.",
          );

          if (!confirmed) {
            event.preventDefault();
          }
        }}
      >
        <DeleteActionButton />
      </form>
    </div>
  );
}