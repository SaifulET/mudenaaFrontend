"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import { categoryCards, categoryFilters } from "@/app/(marketing)/_components/marketing-data";
import { StartGameShell } from "./start-game-shell";

type CategoryFilter = (typeof categoryFilters)[number];
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

const CATEGORY_SELECTION_LIMIT = 6;

export function StartGameCategories() {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState<CategoryFilter>("All");
  const [selectedTitles, setSelectedTitles] = useState<string[]>([]);

  const visibleCards = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();

    return categoryCards.filter((card) => {
      const matchesFilter =
        activeFilter === "All" ? true : card.category === activeFilter;
      const matchesSearch =
        normalizedSearch.length === 0
          ? true
          : `${card.title} ${card.category} ${card.searchTerms.join(" ")}`
              .toLowerCase()
              .includes(normalizedSearch);

      return matchesFilter && matchesSearch;
    });
  }, [activeFilter, search]);

  function toggleSelection(title: string) {
    setSelectedTitles((current) => {
      if (current.includes(title)) {
        return current.filter((item) => item !== title);
      }

      if (current.length >= CATEGORY_SELECTION_LIMIT) {
        return current;
      }

      return [...current, title];
    });
  }

  function handleNextStep() {
    const params = new URLSearchParams({
      gameName: "",
      teamA: "Hasan",
      teamB: "Mahmmud",
      membersA: "2",
      membersB: "2",
      categories: selectedTitles.join(","),
    });

    router.push(`/start-game/settings?${params.toString()}`);
  }

  return (
    <StartGameShell
      title="Choose Categories"
      subtitle="Each team picks 3 categories."
      steps={[
        { number: 1, label: "Categories", status: "current" },
        { number: 2, label: "Team", status: "upcoming" },
        { number: 3, label: "Play Game", status: "upcoming" },
      ]}
    >
      <div className="pb-6 sm:pb-8">
        <label className="flex h-14 items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 shadow-[0_0_0_1px_rgba(15,23,42,0.02)] sm:px-5">
          <SearchIcon />
          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search categories..."
            className="h-full w-full bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400 sm:text-base"
          />
        </label>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
        {categoryFilters.map((filter) => {
          const isActive = filter === activeFilter;

          return (
            <button
              key={filter}
              type="button"
              onClick={() => setActiveFilter(filter)}
              className={`rounded-full px-5 py-2 text-xs font-semibold transition sm:text-sm ${
                isActive
                  ? "bg-[#FF0099] text-white shadow-[0_10px_24px_rgba(255,0,153,0.18)]"
                  : "bg-slate-100 text-slate-600 hover:text-[#FF0099]"
              }`}
            >
              {filter}
            </button>
          );
        })}
      </div>

      <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {visibleCards.map((card) => {
          const isSelected = selectedTitles.includes(card.title);
          const theme = getCategoryPreviewTheme(card.title);

          return (
            <button
              key={card.title}
              type="button"
              onClick={() => toggleSelection(card.title)}
              className={`overflow-hidden rounded-[18px] border bg-white text-left shadow-[0_12px_30px_rgba(15,23,42,0.05)] transition ${
                isSelected
                  ? "border-[#FF0099] shadow-[0_0_0_1px_rgba(255,0,153,0.16),0_16px_34px_rgba(255,0,153,0.14)]"
                  : "border-slate-200 hover:-translate-y-1"
              }`}
            >
              <div className="relative h-40 w-full overflow-hidden sm:h-44">
                <div className={`absolute inset-0 ${theme.shellClassName}`} />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.24),transparent_35%),linear-gradient(180deg,rgba(15,23,42,0.08)_0%,rgba(15,23,42,0.38)_100%)]" />
                <div className="absolute inset-0">
                  <CategoryArtwork kind={theme.artwork} title={card.title} />
                </div>
                {isSelected ? (
                  <span className="absolute right-3 top-3 rounded-full bg-[#FF0099] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-white">
                    Selected
                  </span>
                ) : null}
              </div>
              <div className="flex items-center justify-between gap-3 px-5 py-4">
                <h3 className="text-base font-semibold text-slate-900 sm:text-lg">
                  {card.title}
                </h3>
                <span
                  className={`inline-flex h-5 w-5 items-center justify-center rounded-full ${
                    isSelected ? "bg-[#FF0099] text-white" : "bg-slate-100 text-transparent"
                  }`}
                >
                  <SelectionCheckIcon />
                </span>
              </div>
            </button>
          );
        })}
      </div>

      <div className="mt-12 border-t border-slate-200 pt-8">
        <div className="flex flex-col items-stretch justify-between gap-4 sm:flex-row sm:items-center">
          <Link
            href="/start-game"
            className="inline-flex items-center gap-2 rounded-2xl bg-slate-100 px-6 py-3 text-base font-semibold text-slate-600 transition hover:text-slate-900"
          >
            <span>&larr;</span>
            Back
          </Link>

          <button
            type="button"
            onClick={handleNextStep}
            disabled={selectedTitles.length !== CATEGORY_SELECTION_LIMIT}
            className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#FF0099] px-8 py-3 text-base font-semibold text-white shadow-[0_12px_24px_rgba(255,0,153,0.18)] transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-slate-400 disabled:shadow-none"
          >
            Next Step
            <span>&rarr;</span>
          </button>
        </div>
      </div>
    </StartGameShell>
  );
}

function SearchIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5 text-slate-400"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.5-3.5" />
    </svg>
  );
}

function SelectionCheckIcon() {
  return (
    <svg
      viewBox="0 0 16 16"
      className="h-3 w-3"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="m3.5 8.2 2.3 2.3 4.7-5.1" />
    </svg>
  );
}

function getCategoryPreviewTheme(title: string): CategoryPreviewTheme {
  const normalizedTitle = title.trim().toLowerCase();

  if (normalizedTitle.includes("music")) {
    return {
      artwork: "music",
      shellClassName: "bg-[linear-gradient(140deg,#171717_5%,#9f1239_52%,#fb7185_100%)]",
    };
  }

  if (normalizedTitle.includes("game") || normalizedTitle.includes("gaming")) {
    return {
      artwork: "games",
      shellClassName: "bg-[linear-gradient(145deg,#172554_0%,#2563eb_45%,#f43f5e_100%)]",
    };
  }

  if (
    normalizedTitle.includes("pop") ||
    normalizedTitle.includes("movie") ||
    normalizedTitle.includes("culture")
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
      shellClassName: "bg-[linear-gradient(145deg,#0f172a_0%,#7c3aed_42%,#ec4899_100%)]",
    };
  }

  if (normalizedTitle.includes("science") || normalizedTitle.includes("tech")) {
    return {
      artwork: "science",
      shellClassName: "bg-[linear-gradient(145deg,#111827_0%,#d1d5db_42%,#f97316_100%)]",
    };
  }

  return {
    artwork: "generic",
    shellClassName: "bg-[linear-gradient(145deg,#0f172a_0%,#334155_42%,#94a3b8_100%)]",
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
          <circle cx="250" cy="40" r="34" fill="rgba(255,255,255,0.12)" />
          <path d="M0 178 86 118 168 170 256 112 320 150V220H0Z" fill="rgba(15,23,42,0.38)" />
          <rect x="158" y="44" width="16" height="98" rx="8" fill="white" />
          <rect x="132" y="28" width="66" height="52" rx="26" fill="white" />
          <rect x="142" y="38" width="46" height="32" rx="16" fill="rgba(244,63,94,0.28)" />
        </svg>
      );
    case "games":
      return (
        <svg viewBox="0 0 320 220" className="h-full w-full" aria-hidden="true">
          <path d="M70 146c0-31 25-56 56-56h68c31 0 56 25 56 56 0 18-15 32-32 32-16 0-25-9-33-20l-7-9h-36l-7 9c-8 11-17 20-33 20-17 0-32-14-32-32Z" fill="white" />
          <rect x="104" y="118" width="34" height="10" rx="5" fill="#2563eb" />
          <rect x="116" y="106" width="10" height="34" rx="5" fill="#2563eb" />
          <circle cx="200" cy="120" r="9" fill="#f43f5e" />
          <circle cx="226" cy="140" r="9" fill="#fb7185" />
        </svg>
      );
    case "culture":
      return (
        <svg viewBox="0 0 320 220" className="h-full w-full" aria-hidden="true">
          <rect x="74" y="56" width="176" height="104" rx="18" fill="white" />
          <path d="M74 88h176" stroke="#1d4ed8" strokeWidth="18" />
          <path d="m112 56 22 32" stroke="#fb7185" strokeWidth="14" />
          <path d="m168 56 22 32" stroke="#fb7185" strokeWidth="14" />
          <path d="m224 56 22 32" stroke="#fb7185" strokeWidth="14" />
        </svg>
      );
    case "sports":
      return (
        <svg viewBox="0 0 320 220" className="h-full w-full" aria-hidden="true">
          <rect x="34" y="34" width="252" height="136" rx="16" fill="rgba(255,255,255,0.1)" />
          <path d="M34 170h252" stroke="rgba(255,255,255,0.88)" strokeWidth="4" />
          <path d="M94 34v136M226 34v136" stroke="rgba(255,255,255,0.16)" strokeWidth="3" />
          <circle cx="160" cy="102" r="28" fill="none" stroke="rgba(255,255,255,0.28)" strokeWidth="4" />
        </svg>
      );
    case "geography":
      return (
        <svg viewBox="0 0 320 220" className="h-full w-full" aria-hidden="true">
          <rect x="76" y="44" width="168" height="132" fill="rgba(255,255,255,0.14)" />
          <path d="M76 88h168M76 132h168" stroke="rgba(255,255,255,0.16)" strokeWidth="4" />
          <path d="M120 44v132M164 44v132M208 44v132" stroke="rgba(255,255,255,0.16)" strokeWidth="4" />
          <rect x="98" y="66" width="124" height="88" fill="rgba(255,255,255,0.32)" />
        </svg>
      );
    case "science":
      return (
        <svg viewBox="0 0 320 220" className="h-full w-full" aria-hidden="true">
          <rect x="116" y="42" width="34" height="112" rx="14" fill="white" />
          <rect x="176" y="62" width="18" height="92" rx="9" fill="rgba(255,255,255,0.92)" />
          <path d="M116 118h34" stroke="#f97316" strokeWidth="12" />
          <path d="M176 132h18" stroke="#f97316" strokeWidth="10" />
        </svg>
      );
    case "generic":
      return (
        <div className="flex h-full w-full items-center justify-center text-3xl font-black uppercase tracking-[0.2em] text-white/80">
          {title
            .split(" ")
            .slice(0, 2)
            .map((word) => word[0])
            .join("")}
        </div>
      );
  }
}
