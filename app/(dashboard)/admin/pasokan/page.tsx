import { redirect } from "next/navigation";
import { ADMIN_ROUTES } from "@/lib/routes";

export default function AdminSupplyPage() {
  redirect(ADMIN_ROUTES.supply.input);
}