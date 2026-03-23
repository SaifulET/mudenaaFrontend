import type { Metadata } from "next";

import { AboutSections } from "../_components/about-sections";

export const metadata: Metadata = {
  title: "About Sureli",
  description: "About Sureli and contact information.",
};

export default function AboutPage() {
  return <AboutSections />;
}
