"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { categoryCards } from "@/app/(marketing)/_components/marketing-data";
import { AidIcon } from "./aid-icon";
import {
  aidDefinitions,
  buildMatchState,
  saveMatchState,
  type AidId,
} from "./match-data";

const timeOptions = [10, 15, 20, 30] as const;
const defaultCategories = categoryCards.slice(0, 6).map((card) => card.title);
const defaultAidSelection: AidId[] = ["hint", "swap", "call"];

type StepStatus = "complete" | "current" | "upcoming";

export function StartGameCategories() {
  const router = useRouter();
  const [gameName, setGameName] = useState("");
  const [teamA, setTeamA] = useState("Hasan");
  const [teamB, setTeamB] = useState("Mahmmud");
  const [membersA, setMembersA] = useState(2);
  const [membersB, setMembersB] = useState(2);
  const [timePerQuestion, setTimePerQuestion] = useState<(typeof timeOptions)[number]>(15);
  const [selectedAidsA, setSelectedAidsA] = useState<AidId[]>(defaultAidSelection);
  const [selectedAidsB, setSelectedAidsB] = useState<AidId[]>(defaultAidSelection);

  const canStartMatch =
    teamA.trim().length > 0 &&
    teamB.trim().length > 0 &&
    selectedAidsA.length === 3 &&
    selectedAidsB.length === 3;

  function handleStartMatch() {
    if (!canStartMatch) {
      return;
    }

    const matchState = buildMatchState({
      gameName,
      teamA,
      teamB,
      categories: defaultCategories,
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
    <div className="bg-white px-4 pb-12 pt-8 sm:px-6 sm:pb-16 sm:pt-10 lg:px-10">
      <div className="mx-auto max-w-[940px]">
        <header className="text-center">
          <h1 className="text-4xl font-medium tracking-[-0.04em] text-slate-900 sm:text-5xl">
            Start a New Game
          </h1>
        </header>

        <SetupStepper
          steps={[
            { number: 1, label: "Categories", status: "complete" },
            { number: 2, label: "Team", status: "current" },
            { number: 3, label: "Play Game", status: "upcoming" },
          ]}
        />

        <section className="mt-12">
          <h2 className="text-center text-[40px] font-medium tracking-[-0.04em] text-slate-900 sm:text-[48px]">
            Game Settings
          </h2>

          <div className="mt-10">
            <p className="text-sm font-semibold text-slate-700">Time per Question</p>
            <div className="mt-3 grid grid-cols-2 overflow-hidden rounded-2xl bg-slate-100 p-1.5 sm:grid-cols-4">
              {timeOptions.map((option) => {
                const isActive = option === timePerQuestion;

                return (
                  <button
                    key={option}
                    type="button"
                    onClick={() => setTimePerQuestion(option)}
                    className={`rounded-xl px-4 py-4 text-sm font-semibold transition sm:text-base ${
                      isActive
                        ? "bg-slate-900 text-white shadow-[0_10px_24px_rgba(15,23,42,0.2)]"
                        : "text-slate-500 hover:text-slate-900"
                    }`}
                  >
                    {option}s
                  </button>
                );
              })}
            </div>
          </div>

          <div className="mt-8">
            <FieldLabel label="Game Name" centered />
            <input
              value={gameName}
              onChange={(event) => setGameName(event.target.value)}
              placeholder="Specific game name"
              className="mt-2 h-12 w-full rounded-lg border border-slate-300 px-4 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-[#FF0099] sm:h-14 sm:text-base"
            />
          </div>

          <div className="mt-6 grid gap-5 sm:grid-cols-2">
            <div>
              <FieldLabel label="Team A" centered />
              <input
                value={teamA}
                onChange={(event) => setTeamA(event.target.value)}
                placeholder="Team name"
                className="mt-2 h-12 w-full rounded-lg border border-slate-300 px-4 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-[#FF0099] sm:h-14 sm:text-base"
              />
            </div>

            <div>
              <FieldLabel label="Team B" centered />
              <input
                value={teamB}
                onChange={(event) => setTeamB(event.target.value)}
                placeholder="Team name"
                className="mt-2 h-12 w-full rounded-lg border border-slate-300 px-4 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-[#FF0099] sm:h-14 sm:text-base"
              />
            </div>
          </div>

          <div className="mt-6 grid gap-5 sm:grid-cols-2">
            <MemberCounter
              label="Team Member"
              value={membersA}
              onChange={setMembersA}
            />
            <MemberCounter
              label="Team Member"
              value={membersB}
              onChange={setMembersB}
            />
          </div>

          <p className="mt-8 text-sm font-medium text-slate-500">
            Each team chooses 3 aids
          </p>

          <div className="mt-7 grid gap-8 lg:grid-cols-[1fr_auto_1fr] lg:items-center">
            <AidChoiceGroup
              teamName={teamA || "Hasan"}
              selectedAids={selectedAidsA}
              onToggle={(aidId) => setSelectedAidsA((current) => toggleAid(current, aidId))}
            />

            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-slate-900 text-lg font-semibold text-white shadow-[0_12px_24px_rgba(15,23,42,0.18)] sm:h-16 sm:w-16 sm:text-xl">
              VS
            </div>

            <AidChoiceGroup
              teamName={teamB || "Mahmmud"}
              selectedAids={selectedAidsB}
              onToggle={(aidId) => setSelectedAidsB((current) => toggleAid(current, aidId))}
            />
          </div>

          <div className="mt-12 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
            <Link
              href="/start-game"
              className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 transition hover:text-slate-900 sm:text-base"
            >
              <span aria-hidden="true">&larr;</span>
              Back
            </Link>

            <button
              type="button"
              onClick={handleStartMatch}
              disabled={!canStartMatch}
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-[#FF0099] px-7 py-3 text-sm font-semibold text-white shadow-[0_12px_24px_rgba(255,0,153,0.2)] transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-slate-400 disabled:shadow-none sm:min-h-14 sm:px-10 sm:text-base"
            >
              Start Match
              <span aria-hidden="true">&rarr;</span>
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}

function SetupStepper({
  steps,
}: {
  steps: Array<{ number: number; label: string; status: StepStatus }>;
}) {
  return (
    <div className="mx-auto mt-10 flex max-w-[840px] items-center justify-between gap-2 sm:mt-12 sm:gap-4">
      {steps.map((step, index) => (
        <div key={step.number} className="flex min-w-0 flex-1 items-center gap-2 sm:gap-4">
          <div className="flex min-w-0 items-center gap-2 sm:gap-3">
            <span
              className={`inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[11px] font-semibold sm:h-7 sm:w-7 sm:text-xs ${
                step.status === "upcoming"
                  ? "bg-slate-100 text-slate-400"
                  : "bg-emerald-500 text-white"
              }`}
            >
              {step.status === "complete" ? <StepCheckIcon /> : step.number}
            </span>
            <span
              className={`truncate text-[11px] font-medium sm:text-sm ${
                step.status === "upcoming" ? "text-slate-400" : "text-slate-600"
              }`}
            >
              {step.label}
            </span>
          </div>

          {index < steps.length - 1 ? (
            <span
              className={`hidden h-px flex-1 sm:block ${
                step.status === "upcoming" ? "bg-slate-200" : "bg-emerald-400"
              }`}
            />
          ) : null}
        </div>
      ))}
    </div>
  );
}

function FieldLabel({
  label,
  centered = false,
}: {
  label: string;
  centered?: boolean;
}) {
  return (
    <p
      className={`text-xs font-semibold uppercase tracking-[0.04em] text-slate-700 sm:text-sm ${
        centered ? "text-center" : ""
      }`}
    >
      {label}
    </p>
  );
}

function MemberCounter({
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
      <FieldLabel label={label} centered />
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
      className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-white text-xl font-medium text-slate-500 shadow-[0_0_0_1px_rgba(15,23,42,0.04)] transition hover:text-slate-900 sm:h-9 sm:w-9"
    >
      {children}
    </button>
  );
}

function AidChoiceGroup({
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

      <div className="mt-5 grid grid-cols-4 gap-3 sm:gap-4">
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
                  : "border-slate-200 bg-white text-slate-400 hover:border-[#FF0099]/35 hover:text-slate-700"
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

function StepCheckIcon() {
  return (
    <svg
      viewBox="0 0 16 16"
      className="h-3.5 w-3.5"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="m3.5 8.2 2.3 2.3 4.7-5.1" />
    </svg>
  );
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
