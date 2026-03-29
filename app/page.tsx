import type { Metadata } from "next";

import { LandingSections } from "./(marketing)/_components/landing-sections";
import { MarketingShell } from "./(marketing)/_components/marketing-shell";

export const metadata: Metadata = {
  title: "Sureli Landing",
  description: "Marketing landing page for Sureli trivia.",
};

export default function HomePage() {
  return (
    <MarketingShell>
      <LandingSections />
    </MarketingShell>
  );
}
