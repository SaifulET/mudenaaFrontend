import type { Metadata } from "next";

import { LandingSections } from "../_components/landing-sections";

export const metadata: Metadata = {
  title: "Sureli Landing",
  description: "Marketing landing page for Sureli trivia.",
};

export default function LandingPage() {
  return <LandingSections />;
}
