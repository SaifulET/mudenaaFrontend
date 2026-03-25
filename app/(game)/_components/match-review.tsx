"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

import { AidPills, MatchLoading, MatchSidebar } from "./match-ui";
import {
  endMatchNow,
  getCurrentQuestion,
  isMatchConcluded,
  scoreCurrentRound,
  type AidId,
  type TeamId,
} from "./match-data";
import { useMatchSession } from "./use-match-session";

export function MatchReview() {
  const router = useRouter();
  const { state, commit } = useMatchSession();
  const [selectedWinner, setSelectedWinner] = useState<TeamId | "none" | null>(null);
  const [selectedAid, setSelectedAid] = useState<AidId | "none">("none");

  if (!state) {
    return <MatchLoading message="Loading the review screen..." />;
  }

  const matchState = state;
  const question = getCurrentQuestion(state);

  if (!question) {
    return <MatchLoading message="Preparing the next round..." />;
  }

  const selectedTeam =
    selectedWinner && selectedWinner !== "none" ? matchState.teams[selectedWinner] : null;

  function handleWinnerSelection(value: TeamId | "none") {
    setSelectedWinner(value);
    setSelectedAid("none");
  }

  function handleUpdateScore() {
    if (!selectedWinner) {
      return;
    }

    const nextStateSnapshot = scoreCurrentRound(matchState, {
      winner: selectedWinner === "none" ? null : selectedWinner,
      usedAid: selectedWinner === "none" || selectedAid === "none" ? null : selectedAid,
    });

    commit(() => nextStateSnapshot);

    if (isMatchConcluded(nextStateSnapshot)) {
      router.push("/start-game/match/winner");
      return;
    }

    router.push("/start-game/match");
  }

  function handleEndGame() {
    if (!selectedWinner) {
      return;
    }

    const updatedState = scoreCurrentRound(matchState, {
      winner: selectedWinner === "none" ? null : selectedWinner,
      usedAid: selectedWinner === "none" || selectedAid === "none" ? null : selectedAid,
    });

    const endedState = endMatchNow(updatedState);
    commit(() => endedState);
    router.push("/start-game/match/winner");
  }

  return (
    <div className="bg-[linear-gradient(180deg,#ffffff_0%,#fff8fc_100%)] px-4 py-8 sm:px-6 sm:py-10 lg:px-10">
      <div className="mx-auto grid max-w-[1320px] gap-6 lg:grid-cols-[minmax(0,1fr)_320px] lg:gap-8">
        <section className="rounded-[38px] border-[3px] border-[#FF1A9B] bg-white p-5 sm:p-8 lg:p-10">
          <div className="text-center">
            <h1 className="mt-4 text-2xl font-semibold text-slate-900 sm:mt-6 sm:text-4xl lg:text-5xl">
              Which team answered correctly?
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-base text-slate-500 sm:text-lg">
              Select the winning team for this round, then choose whether they used one of their saved aids.
            </p>
          </div>

      

          <div className="mx-auto mt-10 max-w-3xl">
            <div className="grid gap-4 sm:grid-cols-2">
              <button
                type="button"
                onClick={() => handleWinnerSelection("left")}
                className={`rounded-2xl px-6 py-4 text-xl font-semibold sm:py-5 sm:text-2xl ${
                  selectedWinner === "left"
                    ? "bg-[#FF0099] text-white "
                    : "bg-slate-100 text-slate-700"
                }`}
              >
                {matchState.teams.left.name}
              </button>

              <button
                type="button"
                onClick={() => handleWinnerSelection("right")}
                className={`rounded-2xl px-6 py-4 text-xl font-semibold sm:py-5 sm:text-2xl ${
                  selectedWinner === "right"
                    ? "bg-[#FF0099] text-white "
                    : "bg-slate-100 text-slate-700"
                }`}
              >
                {matchState.teams.right.name}
              </button>
            </div>

            <button
              type="button"
              onClick={() => handleWinnerSelection("none")}
              className={`mt-4 w-full rounded-2xl px-6 py-4 text-xl font-semibold sm:py-5 sm:text-2xl ${
                selectedWinner === "none"
                  ? "bg-slate-900 text-white"
                  : "bg-slate-200 text-slate-600"
              }`}
            >
              No one
            </button>
          </div>

          {selectedTeam ? (
            <div className="mt-10 rounded-[28px] border border-slate-200 bg-white px-6 py-6">
              <h3 className="text-lg font-semibold text-slate-900">
                Used aid 
              </h3>
             
              <div className="mt-5">
                <AidPills
                  team={selectedTeam}
                  selectable
                  selectedAid={selectedAid}
                  onSelect={setSelectedAid}
                  variant="icon"
                />
              </div>
            </div>
          ) : null}

          <div className="mt-10 flex flex-col items-stretch justify-between gap-4 sm:flex-row sm:flex-wrap sm:items-center">
            <Link
              href="/start-game/match/question"
              className="inline-flex items-center rounded-2xl bg-slate-100 px-5 py-3 text-sm font-semibold text-slate-600"
            >
              Return to the answer
            </Link>

            <div className="flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-center">
              <button
                type="button"
                onClick={handleEndGame}
                disabled={!selectedWinner}
                className="inline-flex items-center justify-center rounded-2xl bg-slate-900 px-6 py-4 text-base font-semibold text-white shadow-[0_14px_28px_rgba(15,23,42,0.18)] disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-slate-400"
              >
                End game now
              </button>

              <button
                type="button"
                onClick={handleUpdateScore}
                disabled={!selectedWinner}
                className="inline-flex items-center justify-center rounded-2xl bg-[#FF0099] px-8 py-4 text-lg font-semibold text-white  disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-slate-400 disabled:shadow-none"
              >
                Update score
              </button>
            </div>
          </div>
        </section>

        <MatchSidebar state={matchState} title="Scoreboard" />
      </div>
    </div>
  );
}
