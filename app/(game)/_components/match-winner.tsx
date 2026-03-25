"use client";

import Image from "next/image";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { clearMatchState, getWinnerTeam, isMatchConcluded } from "./match-data";
import { MatchLoading } from "./match-ui";
import { useMatchSession } from "./use-match-session";

export function MatchWinner() {
  const router = useRouter();
  const { state } = useMatchSession();

  useEffect(() => {
    if (state && !isMatchConcluded(state)) {
      router.replace("/start-game/match");
    }
  }, [router, state]);

  if (!state) {
    return <MatchLoading message="Loading the final scoreboard..." />;
  }

  if (!isMatchConcluded(state)) {
    return <MatchLoading message="Wrapping up the current match..." />;
  }

  const winner = getWinnerTeam(state);

  return (
    <div className="relative left-1/2 right-1/2 ml-[-50vw] mr-[-50vw] min-h-[620px] w-screen overflow-hidden bg-white sm:min-h-[780px] lg:min-h-[860px]">
      <div className="pointer-events-none absolute inset-0">
        <Image
          src="/congratulationsbg.png"
          alt=""
          fill
          priority
          className="object-fill object-center"
          sizes="100vw"
        />
      </div>

      <div className="relative z-10 flex min-h-[620px] items-start justify-center px-4 py-10 text-center sm:min-h-[780px] sm:px-6 sm:py-12 lg:min-h-[860px] lg:px-10">
        <div className="mx-auto max-w-5xl">
          <h1 className="mt-10 text-3xl font-semibold text-slate-700 sm:mt-14 sm:text-5xl lg:text-6xl">
            {winner ? "Congratulations on the win" : "The match ended in a tie"}
          </h1>
          <p className="mt-5 text-5xl font-black tracking-[-0.05em] text-[#FF0099] sm:mt-6 sm:text-7xl lg:text-8xl">
            {winner ? winner.name : "Draw"}
          </p>

          <div className="mx-auto mt-10 grid max-w-xl gap-5 sm:mt-14 sm:grid-cols-2 sm:gap-6">
            <div className="overflow-hidden rounded-[22px] border border-slate-200 bg-white shadow-[0_18px_40px_rgba(15,23,42,0.1)]">
              <div className="bg-[#2D2D2D] px-5 py-3 text-sm font-semibold text-white">
                {state.teams.left.name}
              </div>
              <div className="bg-[#9CD441] px-5 py-7 text-4xl font-bold text-white sm:py-8 sm:text-5xl">
                {state.teams.left.score}
              </div>
            </div>

            <div className="overflow-hidden rounded-[22px] border border-slate-200 bg-white shadow-[0_18px_40px_rgba(15,23,42,0.1)]">
              <div className="bg-[#2D2D2D] px-5 py-3 text-sm font-semibold text-white">
                {state.teams.right.name}
              </div>
              <div className="bg-[#FF1D25] px-5 py-7 text-4xl font-bold text-white sm:py-8 sm:text-5xl">
                {state.teams.right.score}
              </div>
            </div>
          </div>

          <div className="mt-12 flex items-center justify-center gap-4">
            <button
              type="button"
              onClick={() => {
                clearMatchState();
                router.push("/start-game");
              }}
              className="inline-flex items-center justify-center rounded-full bg-[#FF0099] px-8 py-4 text-lg font-semibold text-white shadow-[0_18px_36px_rgba(255,0,153,0.2)]"
            >
              Play again
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
