import { permanentRedirect } from "next/navigation";

export default function LegacyFundingApplicationsPage() {
  permanentRedirect("/services/loan-funding-application-support");
}
