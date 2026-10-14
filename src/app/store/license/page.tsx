import { redirect } from "next/navigation";

export default function LicensePortalPage() {
  redirect("/contact?inquiryType=enterprise-licensing");
}
