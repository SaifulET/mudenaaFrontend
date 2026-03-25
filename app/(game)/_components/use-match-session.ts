"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { loadMatchState, saveMatchState, type MatchState } from "./match-data";

export function useMatchSession() {
  const router = useRouter();
  const [state, setState] = useState<MatchState | null>(null);

  useEffect(() => {
    const frameId = window.requestAnimationFrame(() => {
      const storedState = loadMatchState();

      if (!storedState) {
        router.replace("/start-game");
        return;
      }

      setState(storedState);
    });

    return () => {
      window.cancelAnimationFrame(frameId);
    };
  }, [router]);

  function commit(updater: (currentState: MatchState) => MatchState) {
    setState((currentState) => {
      if (!currentState) {
        return currentState;
      }

      const nextState = updater(currentState);
      saveMatchState(nextState);
      return nextState;
    });
  }

  return {
    state,
    isReady: state !== null,
    commit,
  };
}
