import { redirect } from "next/navigation";
import { ADMIN_ROUTES } from "@/lib/routes";

export default function MasterDataIndexPage() {
  redirect(ADMIN_ROUTES.masterData.gardens);
}