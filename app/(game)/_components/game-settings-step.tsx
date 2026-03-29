"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import { AidIcon } from "./aid-icon";
import { StartGameShell } from "./start-game-shell";
import {
  aidDefinitions,
  buildMatchState,
  saveMatchState,
  type AidId,
} from "./match-data";

const timeOptions = [10, 15, 20, 30] as const;

export function GameSettingsStep({
  gameName,
  teamA,
  teamB,
  categories,
}: {
  gameName?: string;
  teamA: string;
  teamB: string;
  categories: string[];
}) {
  const router = useRouter();
  const [timePerQuestion, setTimePerQuestion] = useState<(typeof timeOptions)[number]>(15);
  const [selectedAidsA, setSelectedAidsA] = useState<AidId[]>(["hint"]);
  const [selectedAidsB, setSelectedAidsB] = useState<AidId[]>(["hint"]);

  const canStartMatch = selectedAidsA.length === 3 && selectedAidsB.length === 3;
  const selectedCategories =
    categories.length > 0
      ? categories
      : [
          "Music Legends",
          "Video Games",
          "Pop Culture",
          "Sports Icons",
          "Geography",
          "Science & Tech",
        ];

  const teamNames = useMemo(
    () => ({
      left: teamA || "Hasan",
      right: teamB || "Mahmmud",
    }),
    [teamA, teamB],
  );

  function handleStartMatch() {
    const matchState = buildMatchState({
      gameName,
      teamA,
      teamB,
      categories: selectedCategories,
      timePerQuestion,
      aidSelections: {
        left: selectedAidsA,
        right: selectedAidsB,
      },
    });

    saveMatchState(matchState);
    router.push("/start-game/match");
  }

  return (
    <StartGameShell
      title="Game Settings"
      steps={[
        { number: 1, label: "Teams", status: "complete" },
        { number: 2, label: "Categories", status: "complete" },
        { number: 3, label: "Play Game", status: "current" },
      ]}
    >
      <div>
        <section>
          <h3 className="text-lg font-semibold text-slate-900">Time per Question</h3>
          <div className="mt-4 grid grid-cols-2 overflow-hidden rounded-2xl bg-slate-100 p-1 sm:grid-cols-4">
            {timeOptions.map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => setTimePerQuestion(option)}
                className={`rounded-xl px-4 py-4 text-base font-semibold transition ${
                  timePerQuestion === option
                    ? "bg-slate-900 text-white shadow-[0_10px_20px_rgba(15,23,42,0.18)]"
                    : "text-slate-500 hover:text-slate-900"
                }`}
              >
                {option}s
              </button>
            ))}
          </div>
        </section>

        <section className="mt-12">
          <h3 className="text-lg font-semibold text-slate-900">
            Each team chooses 3 aids
          </h3>

          <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_auto_1fr] lg:items-center">
            <AidSelector
              teamName={teamNames.left}
              selectedAids={selectedAidsA}
              onToggle={(aidId) => setSelectedAidsA((current) => toggleAid(current, aidId))}
            />

            <div className="mx-auto inline-flex h-16 w-16 items-center justify-center rounded-full bg-slate-900 text-2xl font-semibold text-white shadow-[0_12px_24px_rgba(15,23,42,0.24)]">
              VS
            </div>

            <AidSelector
              teamName={teamNames.right}
              selectedAids={selectedAidsB}
              onToggle={(aidId) => setSelectedAidsB((current) => toggleAid(current, aidId))}
            />
          </div>
        </section>

        <div className="mt-14 border-t border-slate-200 pt-8">
          <div className="flex flex-col items-stretch justify-between gap-4 sm:flex-row sm:items-center">
            <Link
              href="/start-game/new"
              className="inline-flex items-center gap-2 text-base font-semibold text-slate-600 transition hover:text-slate-900"
            >
              <span>&larr;</span>
              Back
            </Link>

            <button
              type="button"
              onClick={handleStartMatch}
              disabled={!canStartMatch}
              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#FF0099] px-8 py-4 text-base font-semibold text-white shadow-[0_12px_24px_rgba(255,0,153,0.18)] transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-slate-400 disabled:shadow-none"
            >
              Start Match
              <span>&rarr;</span>
            </button>
          </div>
        </div>
      </div>
    </StartGameShell>
  );
}

function AidSelector({
  teamName,
  selectedAids,
  onToggle,
}: {
  teamName: string;
  selectedAids: AidId[];
  onToggle: (aidId: AidId) => void;
}) {
  return (
    <div>
      <div className="flex items-center gap-3">
        <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-slate-500">
          <PlayerIcon />
        </span>
        <span className="text-lg font-semibold text-slate-900">{teamName}</span>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
        {aidDefinitions.map((aid) => {
          const isSelected = selectedAids.includes(aid.id);

          return (
            <button
              key={aid.id}
              type="button"
              onClick={() => onToggle(aid.id)}
              className={`flex aspect-square items-center justify-center rounded-2xl border-2 text-2xl transition ${
                isSelected
                  ? "border-[#FF0099] bg-white "
                  : "border-slate-200 bg-white text-slate-400 hover:border-[#FF0099]/40"
              }`}
              aria-label={aid.label}
              title={aid.label}
            >
              <AidIcon aidId={aid.id} className="h-8 w-8" />
            </button>
          );
        })}
      </div>

      <p className="mt-4 text-sm text-slate-400">
        {selectedAids.length}/3 aids selected
      </p>
    </div>
  );
}

function toggleAid(current: AidId[], aidId: AidId) {
  if (current.includes(aidId)) {
    return current.filter((item) => item !== aidId);
  }

  if (current.length >= 3) {
    return current;
  }

  return [...current, aidId];
}

function PlayerIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M20 21a8 8 0 0 0-16 0" />
      <circle cx="12" cy="8" r="4" />
    </svg>
  );
}
