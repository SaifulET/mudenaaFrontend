"use client";

import { useRouter } from "next/navigation";

import { BoardFooterScores, MatchLoading } from "./match-ui";
import { getMatchQuestion, selectCurrentQuestion, toggleActiveTeam } from "./match-data";
import { useMatchSession } from "./use-match-session";

export function MatchBoard() {
  const router = useRouter();
  const { state, commit } = useMatchSession();

  if (!state) {
    return <MatchLoading message="Loading the game board..." />;
  }

  const activeTeam = state.teams[state.activeTeam];

  function handleQuestionSelect(questionId: string) {
    commit((currentState) => selectCurrentQuestion(currentState, questionId));
    router.push(`/start-game/match/question?questionId=${questionId}`);
  }

  return (
    <div className="bg-[linear-gradient(180deg,#ffffff_0%,#fff8fc_100%)] px-4 py-8 sm:px-6 sm:py-10 lg:px-10">
      <div className="mx-auto max-w-[1120px]">
        <div className="flex flex-col items-center gap-3 text-center">
          <button
            type="button"
            onClick={() => commit((currentState) => toggleActiveTeam(currentState))}
            className="inline-flex items-center justify-center rounded-full bg-[#FF0099] px-5 py-2.5 text-sm font-semibold text-white shadow-[0_14px_28px_rgba(255,0,153,0.2)] sm:px-6 sm:text-base"
          >
            Team role: {activeTeam.name}
          </button>
        </div>

        <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
          {state.categories.map((category) => (
            <div key={category.slug} className="min-w-0">
              <CategoryPreviewCard
                title={category.title}
                fallbackClassName={category.coverClassName}
              />

              <div className="mt-3 grid grid-cols-2 gap-2">
                {category.questionIds.map((questionId) => {
                  const question = getMatchQuestion(state, questionId);

                  if (!question) {
                    return null;
                  }

                  return (
                    <button
                      key={question.id}
                      type="button"
                      onClick={() => handleQuestionSelect(question.id)}
                      disabled={question.used}
                      className={`rounded-xl border px-2 py-2.5 text-sm font-black sm:text-base ${
                        question.used
                          ? "cursor-not-allowed border-slate-200 bg-slate-100 text-slate-300"
                          : "border-[#FFB7E2] bg-[#FFE7F5] text-[#FF0099] hover:-translate-y-0.5 hover:shadow-[0_10px_20px_rgba(255,0,153,0.14)]"
                      }`}
                    >
                      {question.point}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        <BoardFooterScores state={state} />
      </div>
    </div>
  );
}

type ArtworkKind =
  | "music"
  | "games"
  | "culture"
  | "sports"
  | "geography"
  | "science"
  | "generic";

type CategoryPreviewTheme = {
  artwork: ArtworkKind;
  shellClassName: string;
};

function CategoryPreviewCard({
  title,
  fallbackClassName,
}: {
  title: string;
  fallbackClassName: string;
}) {
  const theme = getCategoryPreviewTheme(title, fallbackClassName);

  return (
    <div className="overflow-hidden rounded-[12px] bg-slate-950 shadow-[0_14px_28px_rgba(15,23,42,0.14)]">
      <div className={`relative h-[124px] overflow-hidden ${theme.shellClassName}`}>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.28),transparent_35%),linear-gradient(180deg,rgba(15,23,42,0.08)_0%,rgba(15,23,42,0.38)_100%)]" />

        <div className="absolute inset-0">
          <CategoryArtwork kind={theme.artwork} title={title} />
        </div>
      </div>

      <div className="bg-[#FF0099] px-3 py-2 text-center text-xs font-extrabold uppercase tracking-[0.14em] text-white sm:text-sm">
        {title}
      </div>
    </div>
  );
}

function getCategoryPreviewTheme(
  title: string,
  fallbackClassName: string,
): CategoryPreviewTheme {
  const normalizedTitle = title.trim().toLowerCase();

  if (normalizedTitle.includes("music")) {
    return {
      artwork: "music",
      shellClassName: "bg-[linear-gradient(140deg,#171717_5%,#9f1239_52%,#fb7185_100%)]",
    };
  }

  if (
    normalizedTitle.includes("game") ||
    normalizedTitle.includes("gaming") ||
    normalizedTitle.includes("arcade")
  ) {
    return {
      artwork: "games",
      shellClassName: "bg-[linear-gradient(145deg,#172554_0%,#2563eb_45%,#f43f5e_100%)]",
    };
  }

  if (
    normalizedTitle.includes("pop") ||
    normalizedTitle.includes("movie") ||
    normalizedTitle.includes("culture") ||
    normalizedTitle.includes("friend")
  ) {
    return {
      artwork: "culture",
      shellClassName: "bg-[linear-gradient(145deg,#0f172a_0%,#1d4ed8_38%,#fb7185_100%)]",
    };
  }

  if (
    normalizedTitle.includes("sport") ||
    normalizedTitle.includes("wwe") ||
    normalizedTitle.includes("wrestling")
  ) {
    return {
      artwork: "sports",
      shellClassName: "bg-[linear-gradient(145deg,#052e16_0%,#16a34a_45%,#facc15_100%)]",
    };
  }

  if (
    normalizedTitle.includes("geo") ||
    normalizedTitle.includes("travel") ||
    normalizedTitle.includes("world")
  ) {
    return {
      artwork: "geography",
      shellClassName: "bg-[linear-gradient(145deg,#0f172a_0%,#0f766e_42%,#38bdf8_100%)]",
    };
  }

  if (
    normalizedTitle.includes("science") ||
    normalizedTitle.includes("tech") ||
    normalizedTitle.includes("mobile")
  ) {
    return {
      artwork: "science",
      shellClassName: "bg-[linear-gradient(145deg,#111827_0%,#0891b2_42%,#a855f7_100%)]",
    };
  }

  return {
    artwork: "generic",
    shellClassName: fallbackClassName,
  };
}

function CategoryArtwork({
  kind,
  title,
}: {
  kind: ArtworkKind;
  title: string;
}) {
  switch (kind) {
    case "music":
      return (
        <svg viewBox="0 0 320 220" className="h-full w-full" aria-hidden="true">
          <circle cx="65" cy="54" r="54" fill="rgba(255,255,255,0.14)" />
          <circle cx="270" cy="30" r="30" fill="rgba(255,255,255,0.12)" />
          <path d="M0 165 95 110 165 155 250 96 320 138V220H0Z" fill="rgba(15,23,42,0.42)" />
          <rect x="150" y="38" width="16" height="95" rx="8" fill="white" />
          <rect x="128" y="24" width="60" height="54" rx="30" fill="white" />
          <rect x="138" y="34" width="40" height="34" rx="17" fill="rgba(244,63,94,0.34)" />
          <path d="M88 34 42 110" stroke="rgba(255,255,255,0.32)" strokeWidth="18" strokeLinecap="round" />
          <path d="M232 28 278 112" stroke="rgba(255,255,255,0.28)" strokeWidth="18" strokeLinecap="round" />
        </svg>
      );
    case "games":
      return (
        <svg viewBox="0 0 320 220" className="h-full w-full" aria-hidden="true">
          <circle cx="62" cy="38" r="38" fill="rgba(255,255,255,0.14)" />
          <path d="M64 150c0-30 24-54 54-54h84c30 0 54 24 54 54 0 18-14 32-32 32-16 0-24-10-32-20l-8-10h-48l-8 10c-8 10-16 20-32 20-18 0-32-14-32-32Z" fill="white" />
          <rect x="104" y="124" width="34" height="10" rx="5" fill="#2563eb" />
          <rect x="116" y="112" width="10" height="34" rx="5" fill="#2563eb" />
          <circle cx="208" cy="126" r="10" fill="#f43f5e" />
          <circle cx="236" cy="146" r="10" fill="#fb7185" />
          <rect x="184" y="150" width="28" height="10" rx="5" fill="#1e293b" opacity="0.32" />
          <rect x="108" y="150" width="28" height="10" rx="5" fill="#1e293b" opacity="0.32" />
          <path d="M0 172 70 130 144 160 228 120 320 165V220H0Z" fill="rgba(15,23,42,0.34)" />
        </svg>
      );
    case "culture":
      return (
        <svg viewBox="0 0 320 220" className="h-full w-full" aria-hidden="true">
          <circle cx="278" cy="42" r="42" fill="rgba(255,255,255,0.16)" />
          <rect x="72" y="58" width="176" height="104" rx="18" fill="white" />
          <path d="M72 90h176" stroke="#1d4ed8" strokeWidth="18" />
          <path d="m112 58 22 32" stroke="#fb7185" strokeWidth="14" />
          <path d="m168 58 22 32" stroke="#fb7185" strokeWidth="14" />
          <path d="m224 58 22 32" stroke="#fb7185" strokeWidth="14" />
          <path d="M0 182 88 136 174 164 250 126 320 168V220H0Z" fill="rgba(15,23,42,0.34)" />
        </svg>
      );
    case "sports":
      return (
        <svg viewBox="0 0 320 220" className="h-full w-full" aria-hidden="true">
          <circle cx="66" cy="40" r="40" fill="rgba(255,255,255,0.14)" />
          <path d="M105 153c14-30 30-55 50-75 18 9 32 21 42 37-13 7-24 18-31 32-7 14-10 30-8 47h-53c-3-15-3-28 0-41Z" fill="white" />
          <path d="M154 78c20-13 39-18 57-16 7 18 7 38 0 59-15-3-32-1-48 7-16 7-30 18-41 32l-27-46c15-15 35-28 59-36Z" fill="rgba(255,255,255,0.78)" />
          <path d="M26 92h268" stroke="#fb7185" strokeWidth="10" strokeLinecap="round" />
          <path d="M0 182 74 146 156 174 254 128 320 170V220H0Z" fill="rgba(15,23,42,0.32)" />
        </svg>
      );
    case "geography":
      return (
        <svg viewBox="0 0 320 220" className="h-full w-full" aria-hidden="true">
          <circle cx="232" cy="50" r="52" fill="rgba(255,255,255,0.14)" />
          <path d="M48 168 124 86 180 138 230 102 288 168V220H48Z" fill="white" />
          <path d="M0 190 64 146 134 176 214 132 320 184V220H0Z" fill="rgba(15,23,42,0.32)" />
          <path d="M110 64c0-18 14-32 32-32s32 14 32 32c0 31-32 60-32 60s-32-29-32-60Z" fill="#fb7185" />
          <circle cx="142" cy="64" r="12" fill="white" />
        </svg>
      );
    case "science":
      return (
        <svg viewBox="0 0 320 220" className="h-full w-full" aria-hidden="true">
          <circle cx="68" cy="42" r="42" fill="rgba(255,255,255,0.14)" />
          <rect x="106" y="56" width="108" height="108" rx="18" fill="white" />
          <rect x="126" y="76" width="68" height="68" rx="16" fill="rgba(168,85,247,0.18)" />
          <path d="M106 94H84M106 126H74M106 156H84M214 94h22M214 126h32M214 156h22M144 56V34M176 56V24M144 164v22M176 164v32" stroke="white" strokeWidth="10" strokeLinecap="round" />
          <circle cx="160" cy="110" r="12" fill="#0891b2" />
          <path d="M0 186 80 144 156 174 246 130 320 172V220H0Z" fill="rgba(15,23,42,0.34)" />
        </svg>
      );
    case "generic":
      return (
        <svg viewBox="0 0 320 220" className="h-full w-full" aria-hidden="true">
          <circle cx="248" cy="36" r="36" fill="rgba(255,255,255,0.14)" />
          <rect x="64" y="52" width="192" height="120" rx="26" fill="rgba(255,255,255,0.18)" />
          <rect x="86" y="74" width="148" height="76" rx="20" fill="white" />
          <path d="M0 188 82 148 166 176 250 132 320 176V220H0Z" fill="rgba(15,23,42,0.3)" />
          <text
            x="160"
            y="118"
            fill="#1e293b"
            fontSize="24"
            fontWeight="700"
            textAnchor="middle"
            style={{ textTransform: "uppercase", letterSpacing: "0.22em" }}
          >
            {getCategoryBadge(title)}
          </text>
        </svg>
      );
  }
}

function getCategoryBadge(title: string) {
  return title
    .split(" ")
    .slice(0, 2)
    .map((word) => word[0]?.toUpperCase() ?? "")
    .join("");
}
