"use client";

import { useRouter } from "next/navigation";

import { primaryActionClassName } from "./auth-primitives";
import { DEMO_SESSION_STORAGE_KEY, defaultDemoSession } from "@/lib/demo-session";

export function SignInSubmitButton() {
  const router = useRouter();

  return (
    <button
      type="button"
      onClick={() => {
        window.localStorage.setItem(
          DEMO_SESSION_STORAGE_KEY,
          JSON.stringify(defaultDemoSession),
        );
        router.push("/start-game");
      }}
      className={primaryActionClassName}
    >
      Sign In
    </button>
  );
}
