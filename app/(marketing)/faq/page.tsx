import type { Metadata } from "next";

import { FaqSections } from "../_components/faq-sections";

export const metadata: Metadata = {
  title: "FAQ",
  description: "Frequently asked questions about Sureli.",
};

export default function FaqPage() {
  return <FaqSections />;
}
