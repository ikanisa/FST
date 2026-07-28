import { permanentRedirect } from "next/navigation";

export default function LegacyTaxVatPage() {
  permanentRedirect("/services/taxation");
}
