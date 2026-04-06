import { redirect } from "next/navigation";
import { ADMIN_ROUTES } from "@/lib/routes";

export default function GardenInformationRedirectPage() {
  redirect(ADMIN_ROUTES.masterData.gardens);
}