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
  membersA,
  membersB,
  categories,
}: {
  gameName?: string;
  teamA: string;
  teamB: string;
  membersA: number;
  membersB: number;
  categories: string[];
}) {
  const router = useRouter();
  const [draftGameName, setDraftGameName] = useState(gameName ?? "");
  const [draftTeamA, setDraftTeamA] = useState(teamA || "Hasan");
  const [draftTeamB, setDraftTeamB] = useState(teamB || "Mahmmud");
  const [draftMembersA, setDraftMembersA] = useState(Math.max(1, membersA || 2));
  const [draftMembersB, setDraftMembersB] = useState(Math.max(1, membersB || 2));
  const [timePerQuestion, setTimePerQuestion] = useState<(typeof timeOptions)[number]>(15);
  const [selectedAidsA, setSelectedAidsA] = useState<AidId[]>(["hint", "swap", "call"]);
  const [selectedAidsB, setSelectedAidsB] = useState<AidId[]>(["hint", "call", "double"]);

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

  const canStartMatch =
    draftTeamA.trim().length > 0 &&
    draftTeamB.trim().length > 0 &&
    selectedAidsA.length === 3 &&
    selectedAidsB.length === 3;

  const teamNames = useMemo(
    () => ({
      left: draftTeamA || "Hasan",
      right: draftTeamB || "Mahmmud",
    }),
    [draftTeamA, draftTeamB],
  );

  function handleStartMatch() {
    if (!canStartMatch) {
      return;
    }

    const matchState = buildMatchState({
      gameName: draftGameName,
      teamA: draftTeamA,
      teamB: draftTeamB,
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
        { number: 1, label: "Categories", status: "complete" },
        { number: 2, label: "Team", status: "current" },
        { number: 3, label: "Play Game", status: "upcoming" },
      ]}
    >
      <div className="mx-auto max-w-[980px]">
        <section>
          <p className="text-sm font-medium text-slate-700">Time per Question</p>
          <div className="mt-3 grid grid-cols-2 overflow-hidden rounded-2xl bg-slate-100 p-1.5 sm:grid-cols-4">
            {timeOptions.map((option) => {
              const isActive = timePerQuestion === option;

              return (
                <button
                  key={option}
                  type="button"
                  onClick={() => setTimePerQuestion(option)}
                  className={`rounded-xl px-4 py-4 text-sm font-semibold transition sm:text-base ${
                    isActive
                      ? "bg-slate-900 text-white shadow-[0_10px_20px_rgba(15,23,42,0.18)]"
                      : "text-slate-500 hover:text-slate-900"
                  }`}
                >
                  {option}s
                </button>
              );
            })}
          </div>
        </section>

        <section className="mt-8">
          <FieldLabel label="Game Name" />
          <input
            value={draftGameName}
            onChange={(event) => setDraftGameName(event.target.value)}
            placeholder="Specific game name"
            className="mt-2 h-12 w-full rounded-lg border border-slate-300 px-4 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-[#FF0099] sm:h-14 sm:text-base"
          />
        </section>

        <section className="mt-6 grid gap-6 sm:grid-cols-2">
          <div>
            <FieldLabel label="Team A" />
            <input
              value={draftTeamA}
              onChange={(event) => setDraftTeamA(event.target.value)}
              placeholder="Team name"
              className="mt-2 h-12 w-full rounded-lg border border-slate-300 px-4 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-[#FF0099] sm:h-14 sm:text-base"
            />
          </div>

          <div>
            <FieldLabel label="Team B" />
            <input
              value={draftTeamB}
              onChange={(event) => setDraftTeamB(event.target.value)}
              placeholder="Team name"
              className="mt-2 h-12 w-full rounded-lg border border-slate-300 px-4 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-[#FF0099] sm:h-14 sm:text-base"
            />
          </div>
        </section>

        <section className="mt-6 grid gap-6 sm:grid-cols-2">
          <CounterField
            label="Team Member"
            value={draftMembersA}
            onChange={setDraftMembersA}
          />
          <CounterField
            label="Team Member"
            value={draftMembersB}
            onChange={setDraftMembersB}
          />
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
            href="/start-game/new"
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
    </StartGameShell>
  );
}

function FieldLabel({ label }: { label: string }) {
  return (
    <p className="text-center text-sm font-semibold text-slate-800">{label}</p>
  );
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
