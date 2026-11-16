import { redirect } from "next/navigation";
import { getServerSession } from "@/lib/referral/session";

export default async function PortalLayout({ children }: { children: React.ReactNode }) {
  const user = await getServerSession();
  if (user?.role !== "admin") redirect("/admin/login");
  return children;
}
