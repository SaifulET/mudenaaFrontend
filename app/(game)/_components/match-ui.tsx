"use client";

import type { ReactNode } from "react";

import { AidIcon } from "./aid-icon";
import {
  aidDefinitions,
  canUseAid,
  type AidId,
  type MatchState,
  type TeamMatchState,
} from "./match-data";

export function MatchLoading({ message = "Loading match..." }: { message?: string }) {
  return (
    <div className="mx-auto flex min-h-[50vh] max-w-4xl items-center justify-center px-4 py-16 sm:px-6 lg:px-10">
      <div className="rounded-[36px] border border-[#FFD0EB] bg-white px-8 py-12 text-center ">
        <div className="flex justify-center">
          <SureliBadge compact />
        </div>
        <p className="mt-6 text-lg font-semibold text-slate-900">{message}</p>
        <p className="mt-2 text-sm text-slate-500">Preparing the next round for your teams.</p>
      </div>
    </div>
  );
}

export function SureliBadge({ compact = false }: { compact?: boolean }) {
  return (
    <div
      className={`inline-flex items-center justify-center rounded-[18px] bg-[#FF0099] text-center font-black uppercase leading-none text-white  ${
        compact ? "h-16 w-16 text-lg" : "h-22 w-22 text-2xl"
      }`}
    >
      <span>
        SUR
        <br />
        ELI
      </span>
    </div>
  );
}

export function AidPills({
  team,
  selectable = false,
  selectedAid = "none",
  onSelect,
  variant = "icon",
}: {
  team: TeamMatchState;
  selectable?: boolean;
  selectedAid?: AidId | "none";
  onSelect?: (aidId: AidId | "none") => void;
  variant?: "icon" | "chip";
}) {
  const visibleAids = aidDefinitions.filter((aid) => team.selectedAids.includes(aid.id));

  if (selectable && variant === "icon") {
    return (
      <div className="flex flex-wrap items-center gap-3">
      

        {visibleAids.map((aid) => {
          const available = canUseAid(team, aid.id);
          const isSelected = selectedAid === aid.id;

          return (
            <button
              key={`${team.id}-${aid.id}`}
              type="button"
              onClick={() => onSelect?.(aid.id)}
              disabled={!available}
              title={aid.label}
              className={`inline-flex h-12 w-12 items-center justify-center rounded-full border transition ${
                isSelected
                  ? "border-[#FF0099] bg-[#FF0099] text-white "
                  : available
                    ? "border-[#90A7C6] bg-white text-[#667A9B] hover:border-[#FF0099] hover:text-[#FF0099]"
                    : "border-slate-200 bg-slate-100 text-slate-300"
              }`}
            >
              <AidIcon aidId={aid.id} className="h-5 w-5" />
            </button>
          );
        })}
      </div>
    );
  }

  if (selectable || variant === "chip") {
    return (
      <div className="flex flex-wrap gap-3">
        {visibleAids.map((aid) => {
          const available = canUseAid(team, aid.id);
          const isSelected = selectedAid === aid.id;

          return (
            <button
              key={`${team.id}-${aid.id}`}
              type="button"
              onClick={() => onSelect?.(aid.id)}
              disabled={selectable ? !available : true}
              className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold ${
                selectable
                  ? isSelected
                    ? "border-[#FF0099] bg-[#FF0099] text-white"
                    : available
                      ? "border-slate-200 bg-white text-slate-700 hover:border-[#FF0099] hover:text-[#FF0099]"
                      : "border-slate-200 bg-slate-100 text-slate-300"
                  : available
                    ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                    : "border-slate-200 bg-slate-100 text-slate-400"
              }`}
            >
              <span className="inline-flex h-7 w-7 items-center justify-center rounded-full  text-slate-900">
                <AidIcon aidId={aid.id} className="h-3.5 w-3.5" />
              </span>
            </button>
          );
        })}
      </div>
    );
  }

  return (
    <div className="flex flex-wrap items-center justify-center gap-3">
      {visibleAids.map((aid) => {
        const available = canUseAid(team, aid.id);

        return (
          <div
            key={`${team.id}-${aid.id}`}
            title={aid.label}
            className={`inline-flex h-12 w-12 items-center justify-center rounded-full border text-sm font-bold  ${
              available
                ? "border-[#90A7C6] bg-white text-[#667A9B]"
                : "border-slate-200 bg-slate-100 text-slate-300 "
            }`}
          >
            <AidIcon aidId={aid.id} className="h-5 w-5" />
          </div>
        );
      })}
    </div>
  );
}

export function TeamScoreCard({
  team,
  active = false,
  children,
}: {
  team: TeamMatchState;
  active?: boolean;
  children?: ReactNode;
}) {
  return (
    <div
      className={`rounded-[28px] border bg-white px-5 py-4 ${
        active ? "border-[#FF6DBE]" : "border-slate-200"
      }`}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-[#FFF1F6] text-[#FF4A99]">
            <PlayerBadgeIcon />
          </span>
          <span className="text-sm font-semibold text-slate-800">{team.name}</span>
        </div>

        <div className="text-3xl font-black leading-none text-[#FF5A00]">
          {team.score}
        </div>
      </div>

      <div className="mt-4">
        <AidPills team={team} variant="icon" />
      </div>

      {children ? <div className="mt-6">{children}</div> : null}
    </div>
  );
}

export function MatchSidebar({
  state,
  title,
}: {
  state: MatchState;
  title?: string;
}) {
  return (
    <aside className="space-y-4 sm:space-y-6">
      {title ? <h2 className="text-xl font-semibold text-slate-800 sm:text-2xl">{title}</h2> : null}
      <TeamScoreCard team={state.teams.right} active={state.activeTeam === "right"} />
      <TeamScoreCard team={state.teams.left} active={state.activeTeam === "left"} />
      <div className="flex justify-center">
        <div className="inline-flex items-center justify-center rounded-[4px] bg-[#FF0099] px-4 py-2.5 text-2xl font-black uppercase tracking-[-0.03em] text-white sm:px-5 sm:py-3 sm:text-3xl">
          SURELI
        </div>
      </div>
    </aside>
  );
}

export function BoardFooterScores({ state }: { state: MatchState }) {
  return (
    <section className="mt-10 rounded-[14px] bg-[#ECEEF3] px-4 py-5 sm:mt-12 sm:px-8 sm:py-6">
      <div className="grid gap-6 lg:grid-cols-[1fr_auto_1fr] lg:items-center">
        <FooterTeamPanel
          team={state.teams.left}
          active={state.activeTeam === "left"}
          align="left"
        />
        <div className="flex justify-center">
          <div className="inline-flex items-center justify-center rounded-[4px] bg-[#FF0099] px-4 py-2.5 text-2xl font-black uppercase tracking-[-0.03em] text-white sm:px-5 sm:py-3 sm:text-3xl">
            SURELI
          </div>
        </div>
        <FooterTeamPanel
          team={state.teams.right}
          active={state.activeTeam === "right"}
          align="right"
        />
      </div>
    </section>
  );
}

function FooterTeamPanel({
  team,
  active,
  align,
}: {
  team: TeamMatchState;
  active: boolean;
  align: "left" | "right";
}) {
  const scoreControls =
    align === "left" ? (
      <>
        <ScoreControlButton tone="minus" />
        <ScoreControlButton tone="plus" />
        <div className="rounded-xl bg-[#172554] px-4 py-3 text-3xl font-black leading-none text-white sm:px-5 sm:text-4xl">
          {team.score}
        </div>
      </>
    ) : (
      <>
        <ScoreControlButton tone="minus" />
        <ScoreControlButton tone="plus" />
        <div className="rounded-xl bg-[#172554] px-4 py-3 text-3xl font-black leading-none text-white sm:px-5 sm:text-4xl">
          {team.score}
        </div>
      </>
    );

  return (
    <div className="rounded-[28px] bg-transparent px-1 py-1">
      <div className={`mx-auto w-full max-w-[420px] ${align === "right" ? "lg:text-right" : ""}`}>
        <div
          className={`mx-auto w-fit min-w-[160px] rounded-full px-5 py-2 text-center text-lg font-bold text-white sm:min-w-[180px] sm:px-6 sm:text-xl ${
            active ? "bg-[#FF0099]" : "bg-[#E32676]"
          }`}
        >
          {team.name}
        </div>

        <div
          className={`mt-4 flex flex-col gap-4 lg:flex-row lg:items-center ${
            align === "right" ? "lg:flex-row-reverse" : ""
          }`}
        >
          <div className={`flex flex-wrap items-center justify-center gap-3 ${align === "right" ? "lg:justify-start" : "lg:justify-start"}`}>
            {scoreControls}
          </div>

          <div className="min-w-0 flex-1">
            <p className="mb-3 text-center text-sm font-semibold text-slate-700">Assistance</p>
            <AidPills team={team} variant="icon" />
          </div>
        </div>
      </div>
    </div>
  );
}

function ScoreControlButton({ tone }: { tone: "minus" | "plus" }) {
  return (
    <button
      type="button"
      aria-hidden="true"
      tabIndex={-1}
      className={`inline-flex h-10 w-10 items-center justify-center rounded-lg text-2xl font-bold text-white ${
        tone === "minus" ? "bg-[#EF4444]" : "bg-[#16A34A]"
      }`}
    >
      {tone === "minus" ? "-" : "+"}
    </button>
  );
}

function PlayerBadgeIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-4 w-4"
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
