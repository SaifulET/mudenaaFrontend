"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import { categoryCards, categoryFilters } from "@/app/(marketing)/_components/marketing-data";
import { StartGameShell } from "./start-game-shell";

type CategoryFilter = (typeof categoryFilters)[number];

export function StartGameCategories() {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState<CategoryFilter>("All");
  const [selectedTitles, setSelectedTitles] = useState<string[]>([
    "Pop Culture",
    "Music Legends",
  ]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [gameName, setGameName] = useState("");
  const [teamA, setTeamA] = useState("Hasan");
  const [teamB, setTeamB] = useState("Mahmmud");
  const [membersA, setMembersA] = useState(2);
  const [membersB, setMembersB] = useState(2);

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

      if (current.length >= 3) {
        return current;
      }

      return [...current, title];
    });
  }

  function handleStartPlaying() {
    const params = new URLSearchParams({
      gameName,
      teamA,
      teamB,
      membersA: String(membersA),
      membersB: String(membersB),
      categories: selectedTitles.join(","),
    });

    router.push(`/start-game/settings?${params.toString()}`);
  }

  return (
    <>
      <StartGameShell
        title="Choose Categories"
        subtitle="Each team picks 3 categories."
        steps={[
          { number: 1, label: "Teams", status: "complete" },
          { number: 2, label: "Categories", status: "current" },
          { number: 3, label: "Play Game", status: "upcoming" },
        ]}
      >
        <div className="mx-auto max-w-4xl">
          <label className="flex h-16 items-center gap-3 rounded-2xl border border-slate-200 bg-white px-5 shadow-[0_0_0_1px_rgba(15,23,42,0.02),0_10px_28px_rgba(15,23,42,0.05)]">
            <SearchIcon />
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search categories..."
              className="h-full w-full bg-transparent text-base text-slate-700 outline-none placeholder:text-slate-400"
            />
          </label>
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          {categoryFilters.map((filter) => {
            const isActive = filter === activeFilter;

            return (
              <button
                key={filter}
                type="button"
                onClick={() => setActiveFilter(filter)}
                className={`rounded-full px-5 py-2.5 text-sm font-semibold transition ${
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

        <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {visibleCards.map((card) => {
            const isSelected = selectedTitles.includes(card.title);

            return (
              <button
                key={card.title}
                type="button"
                onClick={() => toggleSelection(card.title)}
                className={`overflow-hidden rounded-[26px] border bg-white text-left shadow-[0_12px_30px_rgba(15,23,42,0.05)] transition hover:-translate-y-1 ${
                  isSelected
                    ? "border-[#FF0099] shadow-[0_0_0_1px_rgba(255,0,153,0.16),0_16px_34px_rgba(255,0,153,0.14)]"
                    : "border-slate-200"
                }`}
              >
                <div className="relative h-56 w-full">
                  <Image
                    src="/category.svg"
                    alt={card.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1280px) 50vw, 33vw"
                  />
                  {isSelected ? (
                    <span className="absolute right-4 top-4 rounded-full bg-[#FF0099] px-3 py-1 text-xs font-semibold text-white">
                      Selected
                    </span>
                  ) : null}
                </div>
                <div className="flex items-center justify-between gap-4 px-6 py-5">
                  <div>
                    <h3 className="text-2xl font-semibold text-slate-900">
                      {card.title}
                    </h3>
                  </div>
                  {isSelected ? (
                    <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-[#FF0099] text-xs text-white">
                      ✓
                    </span>
                  ) : null}
                </div>
              </button>
            );
          })}
        </div>

        <div className="mt-12 border-t border-slate-200 pt-8">
          <div className="flex items-center justify-between gap-4">
            <Link
              href="/categories"
              className="inline-flex items-center gap-2 rounded-2xl bg-slate-100 px-6 py-4 text-base font-semibold text-slate-600 transition hover:text-slate-900"
            >
              <span>&larr;</span>
              Back
            </Link>

            <button
              type="button"
              onClick={() => setIsModalOpen(true)}
              disabled={selectedTitles.length !== 3}
              className="inline-flex items-center gap-2 rounded-2xl bg-[#FF0099] px-8 py-4 text-base font-semibold text-white shadow-[0_12px_24px_rgba(255,0,153,0.18)] transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-slate-400 disabled:shadow-none"
            >
              Next Step
              <span>&rarr;</span>
            </button>
          </div>
        </div>
      </StartGameShell>

      {isModalOpen ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[linear-gradient(90deg,#951516_0%,#9c1d1a_48%,#ab6824_52%,#b56f2b_100%)]/95 px-4 py-8">
          <div className="w-full max-w-2xl rounded-[28px] bg-white p-6 shadow-[0_20px_50px_rgba(15,23,42,0.28)] sm:p-8">
            <div className="flex items-start justify-between gap-4">
              <div className="w-full text-center">
                <h3 className="text-3xl font-semibold text-slate-900">
                  Specify team information
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="text-2xl text-slate-400 transition hover:text-slate-700"
                aria-label="Close"
              >
                ×
              </button>
            </div>

            <div className="mt-8 space-y-6">
              <Field label="Game Name">
                <input
                  value={gameName}
                  onChange={(event) => setGameName(event.target.value)}
                  placeholder="Specific game name"
                  className="h-14 w-full rounded-xl border border-slate-300 px-4 text-base outline-none focus:border-[#FF0099]"
                />
              </Field>

              <div className="grid gap-6 sm:grid-cols-2">
                <Field label="First Team">
                  <input
                    value={teamA}
                    onChange={(event) => setTeamA(event.target.value)}
                    placeholder="Team name"
                    className="h-14 w-full rounded-xl border border-slate-300 px-4 text-base outline-none focus:border-[#FF0099]"
                  />
                </Field>

                <Field label="Second team">
                  <input
                    value={teamB}
                    onChange={(event) => setTeamB(event.target.value)}
                    placeholder="Team name"
                    className="h-14 w-full rounded-xl border border-slate-300 px-4 text-base outline-none focus:border-[#FF0099]"
                  />
                </Field>
              </div>

              <div className="grid gap-6 sm:grid-cols-2">
                <CounterField
                  label="Team Member"
                  value={membersA}
                  onChange={setMembersA}
                />
                <CounterField
                  label="Team Member"
                  value={membersB}
                  onChange={setMembersB}
                />
              </div>

              <div className="pt-2 text-center">
                <button
                  type="button"
                  onClick={handleStartPlaying}
                  className="inline-flex min-w-56 items-center justify-center rounded-xl bg-[#FF0099] px-8 py-4 text-xl font-semibold text-white shadow-[0_12px_24px_rgba(255,0,153,0.18)] transition hover:-translate-y-0.5"
                >
                  Start playing
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-3 block text-center text-base font-semibold text-slate-700">
        {label}
      </span>
      {children}
    </label>
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
    <Field label={label}>
      <div className="flex h-14 items-center justify-between rounded-xl border border-slate-200 bg-slate-50 px-3">
        <button
          type="button"
          onClick={() => onChange(Math.max(1, value - 1))}
          className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-white text-slate-500 shadow-[0_0_0_1px_rgba(15,23,42,0.05)]"
        >
          −
        </button>
        <span className="text-3xl font-semibold text-slate-900">{value}</span>
        <button
          type="button"
          onClick={() => onChange(value + 1)}
          className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-white text-slate-500 shadow-[0_0_0_1px_rgba(15,23,42,0.05)]"
        >
          +
        </button>
      </div>
    </Field>
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
