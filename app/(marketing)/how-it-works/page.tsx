import type { Metadata } from "next";

import { HowItWorksSections } from "../_components/how-it-works-sections";

export const metadata: Metadata = {
  title: "How Sureli Works",
  description: "Walkthrough of the Sureli trivia game flow.",
};

export default function HowItWorksPage() {
  return <HowItWorksSections />;
}
