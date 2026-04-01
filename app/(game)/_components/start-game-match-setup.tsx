"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import { AidIcon } from "./aid-icon";
import {
  aidDefinitions,
  buildMatchState,
  saveMatchState,
  type AidId,
} from "./match-data";
import type { LibraryGame } from "./start-game-library";

export function StartGameMatchSetup({ game }: { game: LibraryGame }) {
  const router = useRouter();
  const [teamA, setTeamA] = useState("Hasan");
  const [teamB, setTeamB] = useState("Mahmmud");
  const [membersA, setMembersA] = useState(2);
  const [membersB, setMembersB] = useState(2);
  const [selectedAidsA, setSelectedAidsA] = useState<AidId[]>(["hint", "swap", "call"]);
  const [selectedAidsB, setSelectedAidsB] = useState<AidId[]>(["hint", "call", "double"]);

  const canStartMatch =
    teamA.trim().length > 0 &&
    teamB.trim().length > 0 &&
    selectedAidsA.length === 3 &&
    selectedAidsB.length === 3;

  const teamNames = useMemo(
    () => ({
      left: teamA || "Hasan",
      right: teamB || "Mahmmud",
    }),
    [teamA, teamB],
  );

  function handleStartMatch() {
    if (!canStartMatch) {
      return;
    }

    const matchState = buildMatchState({
      gameName: game.name,
      teamA,
      teamB,
      categories: game.categories,
      timePerQuestion: 15,
      aidSelections: {
        left: selectedAidsA,
        right: selectedAidsB,
      },
    });

    saveMatchState(matchState);
    router.push("/start-game/match");
  }

  return (
    <div className="bg-white px-4 pb-12 pt-8 sm:px-6 sm:pb-16 sm:pt-10 lg:px-10">
      <div className="mx-auto max-w-[940px]">
        <header className="text-center">
          <h1 className="text-4xl font-medium tracking-[-0.04em] text-slate-900 sm:text-5xl">
            Start Game
          </h1>
        </header>

        <section className="mt-14 grid gap-6 sm:grid-cols-2">
          <div>
            <FieldLabel label="Team A" />
            <input
              value={teamA}
              onChange={(event) => setTeamA(event.target.value)}
              placeholder="Team name"
              className="mt-2 h-12 w-full rounded-lg border border-slate-300 px-4 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-[#FF0099] sm:h-14 sm:text-base"
            />
          </div>

          <div>
            <FieldLabel label="Team B" />
            <input
              value={teamB}
              onChange={(event) => setTeamB(event.target.value)}
              placeholder="Team name"
              className="mt-2 h-12 w-full rounded-lg border border-slate-300 px-4 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-[#FF0099] sm:h-14 sm:text-base"
            />
          </div>
        </section>

        <section className="mt-6 grid gap-6 sm:grid-cols-2">
          <CounterField label="Team Member" value={membersA} onChange={setMembersA} />
          <CounterField label="Team Member" value={membersB} onChange={setMembersB} />
        </section>

        <section className="mt-8">
          <p className="text-sm font-medium text-slate-700">Each team chooses 3 aids</p>

          <div className="mt-7 grid gap-8 lg:grid-cols-[1fr_auto_1fr] lg:items-center">
            <AidSelector
              teamName={teamNames.left}
              selectedAids={selectedAidsA}
              onToggle={(aidId) => setSelectedAidsA((current) => toggleAid(current, aidId))}
            />

            <div className="mx-auto inline-flex h-14 w-14 items-center justify-center rounded-full bg-slate-900 text-lg font-semibold text-white shadow-[0_12px_24px_rgba(15,23,42,0.2)] sm:h-16 sm:w-16 sm:text-xl">
              VS
            </div>

            <AidSelector
              teamName={teamNames.right}
              selectedAids={selectedAidsB}
              onToggle={(aidId) => setSelectedAidsB((current) => toggleAid(current, aidId))}
            />
          </div>
        </section>

        <div className="mt-14 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <Link
            href="/start-game"
            className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 transition hover:text-slate-900 sm:text-base"
          >
            <span>&larr;</span>
            Back
          </Link>

          <button
            type="button"
            onClick={handleStartMatch}
            disabled={!canStartMatch}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#FF0099] px-8 py-4 text-sm font-semibold text-white shadow-[0_12px_24px_rgba(255,0,153,0.18)] transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-slate-400 disabled:shadow-none sm:text-base"
          >
            Start Match
            <span>&rarr;</span>
          </button>
        </div>
      </div>
    </div>
  );
}

function FieldLabel({ label }: { label: string }) {
  return <p className="text-center text-sm font-semibold text-slate-800">{label}</p>;
}

function CounterField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: number;
  onChange: (value: number) => void;
}) {
  return (
    <div>
      <FieldLabel label={label} />
      <div className="mt-2 flex h-12 items-center justify-between rounded-lg bg-slate-100 px-2 sm:h-14">
        <CounterButton onClick={() => onChange(Math.max(1, value - 1))}>-</CounterButton>
        <span className="text-2xl font-semibold text-slate-900">{value}</span>
        <CounterButton onClick={() => onChange(value + 1)}>+</CounterButton>
      </div>
    </div>
  );
}

function CounterButton({
  children,
  onClick,
}: {
  children: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-white text-xl font-medium text-slate-500 shadow-[0_0_0_1px_rgba(15,23,42,0.05)] transition hover:text-slate-900 sm:h-9 sm:w-9"
    >
      {children}
    </button>
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
        <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-slate-500 sm:h-9 sm:w-9">
          <PlayerIcon />
        </span>
        <span className="text-sm font-semibold text-slate-900 sm:text-base">{teamName}</span>
      </div>

      <div className="mt-5 grid grid-cols-4 gap-4">
        {aidDefinitions.map((aid) => {
          const isSelected = selectedAids.includes(aid.id);

          return (
            <button
              key={aid.id}
              type="button"
              onClick={() => onToggle(aid.id)}
              className={`flex h-12 items-center justify-center rounded-xl border-2 transition sm:h-14 ${
                isSelected
                  ? "border-[#FF0099] bg-white text-slate-900 shadow-[0_8px_18px_rgba(255,0,153,0.12)]"
                  : "border-slate-200 bg-white text-slate-400 hover:border-[#FF0099]/40 hover:text-slate-700"
              }`}
              aria-label={aid.label}
              title={aid.label}
            >
              <AidIcon aidId={aid.id} className="h-5 w-5 sm:h-6 sm:w-6" />
            </button>
          );
        })}
      </div>
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
      className="h-4 w-4 sm:h-5 sm:w-5"
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
