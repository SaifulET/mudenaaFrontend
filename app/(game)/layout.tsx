import type { ReactNode } from "react";

import { MarketingShell } from "../(marketing)/_components/marketing-shell";

export default function GameLayout({ children }: { children: ReactNode }) {
  return <MarketingShell>{children}</MarketingShell>;
}
