"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import { categoryCards } from "@/app/(marketing)/_components/marketing-data";
import {
  buildMatchState,
  saveMatchState,
  type AidId,
} from "./match-data";

type LibraryGame = {
  id: string;
  name: string;
  categories: string[];
  playerCount: number;
};

type PackOption = {
  id: string;
  label: string;
  price: string;
  accentClassName: string;
};

const defaultAidSelection: AidId[] = ["hint", "swap", "call"];

const seedGames: LibraryGame[] = [
  {
    id: "maserati",
    name: "Maserati",
    categories: ["Music Legends", "Video Games", "Pop Culture", "Sports Icons", "Geography"],
    playerCount: 4,
  },
  {
    id: "mercedes",
    name: "Mercedes",
    categories: ["Science & Tech", "Music Legends", "Geography", "Video Games", "Pop Culture"],
    playerCount: 4,
  },
  {
    id: "porsche",
    name: "Porsche",
    categories: ["Pop Culture", "Sports Icons", "Science & Tech", "Geography", "Music Legends"],
    playerCount: 4,
  },
  {
    id: "jaguar",
    name: "Jaguar",
    categories: ["Video Games", "Music Legends", "Science & Tech", "Pop Culture", "Sports Icons"],
    playerCount: 4,
  },
  {
    id: "ford",
    name: "Ford",
    categories: ["Geography", "Science & Tech", "Pop Culture", "Music Legends", "Sports Icons"],
    playerCount: 4,
  },
  {
    id: "dodge",
    name: "Dodge",
    categories: ["Music Legends", "Geography", "Sports Icons", "Video Games", "Science & Tech"],
    playerCount: 4,
  },
  {
    id: "lexus",
    name: "Lexus",
    categories: ["Science & Tech", "Sports Icons", "Geography", "Pop Culture", "Video Games"],
    playerCount: 4,
  },
  {
    id: "buick",
    name: "Buick",
    categories: ["Pop Culture", "Geography", "Music Legends", "Science & Tech", "Sports Icons"],
    playerCount: 4,
  },
];

const packOptions: PackOption[] = [
  {
    id: "pack-10",
    label: "KWD 19 - 10 games",
    price: "KWD 19.00",
    accentClassName: "bg-[linear-gradient(135deg,#ff5f8b_0%,#ff5f8b_100%)]",
  },
  {
    id: "pack-5",
    label: "KWD 10 - 5 games",
    price: "KWD 10.00",
    accentClassName: "bg-[linear-gradient(135deg,#8b5cf6_0%,#a78bfa_100%)]",
  },
  {
    id: "pack-2",
    label: "KWD 4.5 - Two games",
    price: "KWD 4.50",
    accentClassName: "bg-[linear-gradient(135deg,#10b981_0%,#34d399_100%)]",
  },
  {
    id: "pack-1",
    label: "KWD 2.5 - One game",
    price: "KWD 2.50",
    accentClassName: "bg-[linear-gradient(135deg,#ff2f92_0%,#f43f8f_100%)]",
  },
];

export function StartGameDashboard() {
  const router = useRouter();
  const [games] = useState<LibraryGame[]>(seedGames);
  const [categorySearch, setCategorySearch] = useState("");
  const [nameSearch, setNameSearch] = useState("");
  const [isBuyModalOpen, setIsBuyModalOpen] = useState(false);
  const [selectedPackId, setSelectedPackId] = useState(packOptions[0].id);
  const [discountCode, setDiscountCode] = useState("");
  const [activeGame, setActiveGame] = useState<LibraryGame | null>(null);
  const [teamA, setTeamA] = useState("Hasan");
  const [teamB, setTeamB] = useState("Mahmmud");

  const filteredGames = useMemo(() => {
    const normalizedCategorySearch = categorySearch.trim().toLowerCase();
    const normalizedNameSearch = nameSearch.trim().toLowerCase();

    return games.filter((game) => {
      const matchesCategory =
        normalizedCategorySearch.length === 0
          ? true
          : game.categories.some((category) =>
              category.toLowerCase().includes(normalizedCategorySearch),
            );

      const matchesName =
        normalizedNameSearch.length === 0
          ? true
          : game.name.toLowerCase().includes(normalizedNameSearch);

      return matchesCategory && matchesName;
    });
  }, [categorySearch, games, nameSearch]);

  const selectedPack =
    packOptions.find((pack) => pack.id === selectedPackId) ?? packOptions[0];

  function openPlayModal(game: LibraryGame) {
    setActiveGame(game);
    setTeamA("Hasan");
    setTeamB("Mahmmud");
  }

  function handleStartMatch() {
    if (!activeGame) {
      return;
    }

    const matchState = buildMatchState({
      gameName: activeGame.name,
      teamA,
      teamB,
      categories: activeGame.categories,
      timePerQuestion: 15,
      aidSelections: {
        left: defaultAidSelection,
        right: defaultAidSelection,
      },
    });

    saveMatchState(matchState);
    router.push("/start-game/match");
  }

  return (
    <>
      <div className="bg-[linear-gradient(180deg,#ffffff_0%,#fff7fb_100%)] px-4 pb-8 pt-2 sm:px-6 sm:pb-10 sm:pt-3 lg:px-10">
        <div className="flex flex-wrap items-center justify-start gap-4 pb-3 sm:pb-4">
          <button
            type="button"
            onClick={() => setIsBuyModalOpen(true)}
            className="inline-flex items-center gap-2 rounded-full bg-[#FF0099] px-5 py-3 text-sm font-semibold text-white shadow-[0_14px_28px_rgba(255,0,153,0.18)]"
          >
            Buy a new game
            <span className="text-base">+</span>
          </button>
        </div>

        <div className="mx-auto max-w-[1260px]">
          <section className="pt-8 text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
              <span className="inline-flex h-4 w-4 items-center justify-center rounded-full border border-slate-300 text-[10px]">
                O
              </span>
              The ultimate social trivia game
            </div>

            <h1 className="mx-auto mt-8 max-w-4xl text-3xl font-semibold leading-tight text-slate-900 sm:text-5xl lg:text-6xl">
              An interactive group that tests
              <span className="block text-[#FF0099]">your knowledge and culture</span>
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-sm text-slate-500 sm:text-lg">
              New game to create a new game, press. My games to retrieve previous games, press.
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <button
                type="button"
                onClick={() => setIsBuyModalOpen(true)}
                className="inline-flex min-w-44 items-center justify-center gap-2 rounded-full bg-black px-8 py-4 text-base font-semibold text-white"
              >
                New Game
                <span>&rarr;</span>
              </button>

              <a
                href="#my-games"
                className="inline-flex min-w-44 items-center justify-center gap-2 rounded-full bg-[#FF0099] px-8 py-4 text-base font-semibold text-white"
              >
                My Game
                <span>&rarr;</span>
              </a>
            </div>
          </section>

          <section id="my-games" className="mt-14">
            <h2 className="text-center text-3xl font-semibold text-slate-900 sm:text-4xl">My games</h2>

            <div className="mt-10 grid gap-4 lg:grid-cols-[1fr_auto_1fr] lg:items-center">
              <SearchField
                value={categorySearch}
                onChange={setCategorySearch}
                placeholder="Search by category name"
              />

              <button
                type="button"
                onClick={() => setIsBuyModalOpen(true)}
                className="inline-flex h-14 items-center justify-center gap-2 rounded-2xl bg-[#FF0099] px-8 text-base font-semibold text-white shadow-[0_12px_24px_rgba(255,0,153,0.18)]"
              >
                Buy a new game
              </button>

              <SearchField
                value={nameSearch}
                onChange={setNameSearch}
                placeholder="Search by name"
              />
            </div>

            <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
              {filteredGames.map((game) => (
                <GameCard key={game.id} game={game} onPlay={() => openPlayModal(game)} />
              ))}
            </div>

            {filteredGames.length === 0 ? (
              <div className="mt-8 rounded-[28px] border border-dashed border-slate-200 bg-white px-6 py-14 text-center text-slate-500">
                No games matched your search. Try a different game name or category.
              </div>
            ) : null}

            <div className="mt-10 flex items-center justify-center gap-2 text-sm font-semibold text-slate-400">
              <button
                type="button"
                className="rounded-full bg-slate-100 px-4 py-2"
                aria-hidden="true"
              >
                Next
              </button>
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-[#FF0099] text-white">
                1
              </span>
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-slate-300 text-slate-700">
                2
              </span>
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-slate-300 text-slate-700">
                3
              </span>
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-slate-300 text-slate-700">
                4
              </span>
              <button
                type="button"
                className="rounded-full bg-slate-100 px-4 py-2"
                aria-hidden="true"
              >
                Prev
              </button>
            </div>
          </section>
        </div>
      </div>

      {isBuyModalOpen ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/55 px-4 py-8 backdrop-blur-sm">
          <div className="max-h-[90vh] w-full max-w-[420px] overflow-y-auto rounded-[34px] bg-white p-5 shadow-[0_26px_80px_rgba(15,23,42,0.28)] sm:p-6">
            <h3 className="text-3xl font-semibold tracking-[-0.04em] text-[#40203B] sm:text-4xl">
              Select Your Pack
            </h3>
            <p className="mt-2 text-lg text-[#9A6E8C]">
              Choose the best energy for your session.
            </p>

            <div className="mt-8 space-y-4">
              {packOptions.map((pack) => {
                const isSelected = selectedPack.id === pack.id;

                return (
                  <button
                    key={pack.id}
                    type="button"
                    onClick={() => setSelectedPackId(pack.id)}
                    className={`flex w-full items-center justify-between rounded-[22px] px-5 py-4 text-left text-xl font-semibold text-white transition sm:px-6 sm:py-5 sm:text-2xl ${
                      pack.accentClassName
                    } ${isSelected ? "ring-4 ring-[#1D4ED8]/18" : ""}`}
                  >
                    <span>{pack.label}</span>
                  </button>
                );
              })}
            </div>

            <div className="mt-6 flex h-16 items-center gap-3 rounded-[18px] border border-[#F5DDE9] bg-white px-4">
              <span className="inline-flex rounded-full bg-[#FFF1F6] px-3 py-1 text-sm font-semibold text-[#FF4A99]">
                + addition
              </span>
              <input
                value={discountCode}
                onChange={(event) => setDiscountCode(event.target.value)}
                placeholder="discount code"
                className="w-full bg-transparent text-base text-slate-700 outline-none placeholder:text-slate-300"
              />
            </div>

            <button
              type="button"
              onClick={() => {
                setIsBuyModalOpen(false);
                router.push("/start-game/new");
              }}
              className="mt-8 flex h-16 w-full items-center justify-center gap-3 rounded-[22px] bg-[#2442B2] px-6 text-xl font-semibold text-white shadow-[0_18px_40px_rgba(36,66,178,0.22)] sm:text-3xl"
            >
              {selectedPack.price} - Pay now
              <span className="text-base">▣</span>
            </button>
          </div>
        </div>
      ) : null}

      {activeGame ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-cover bg-center px-4 py-8"
          style={{ backgroundImage: "url('/bgofmodal.png')" }}
        >
          <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-[28px] bg-white p-5 shadow-[0_20px_50px_rgba(15,23,42,0.28)] sm:p-8">
            <div className="flex items-start justify-between gap-4">
              <div className="w-full text-center">
                <h3 className="text-2xl font-semibold text-slate-900 sm:text-3xl">
                  Specify team information
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setActiveGame(null)}
                className="text-2xl leading-none text-slate-400 transition hover:text-slate-700"
                aria-label="Close"
              >
                ×
              </button>
            </div>

            <div className="mt-6 space-y-5 sm:mt-8 sm:space-y-6">
              <Field label="Game Name">
                <input
                  value={activeGame.name}
                  readOnly
                  className="h-14 w-full rounded-xl border border-slate-300 bg-slate-50 px-4 text-base text-slate-500 outline-none"
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

              <div className="pt-2 text-center">
                <button
                  type="button"
                  onClick={handleStartMatch}
                  disabled={!teamA.trim() || !teamB.trim()}
                  className="inline-flex min-w-56 items-center justify-center rounded-xl bg-[#FF0099] px-8 py-4 text-xl font-semibold text-white shadow-[0_12px_24px_rgba(255,0,153,0.18)] transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-slate-400 disabled:shadow-none"
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

function SearchField({
  value,
  onChange,
  placeholder,
}: {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
}) {
  return (
    <label className="flex h-14 items-center gap-3 rounded-full border border-slate-200 bg-white px-4 shadow-[0_0_0_1px_rgba(15,23,42,0.02),0_10px_28px_rgba(15,23,42,0.05)]">
      <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-[#FF0099] text-white">
        <SearchIcon />
      </span>
      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="h-full w-full bg-transparent text-base text-slate-700 outline-none placeholder:text-slate-400"
      />
    </label>
  );
}

function GameCard({
  game,
  onPlay,
}: {
  game: LibraryGame;
  onPlay: () => void;
}) {
  return (
    <article className="overflow-hidden rounded-[24px] border border-slate-200 bg-white shadow-[0_16px_34px_rgba(15,23,42,0.06)]">
      <div className="bg-[#FF0099] px-5 pb-5 pt-4 text-center text-white">
        <div className="flex justify-end">
          <span className="rounded-full bg-[#22C55E] px-3 py-1 text-[11px] font-semibold">
            {game.playerCount} Number of plays
          </span>
        </div>
        <h3 className="mt-3 text-3xl font-semibold">{game.name}</h3>
        <button
          type="button"
          onClick={onPlay}
          className="mt-4 inline-flex rounded-2xl bg-white px-6 py-2 text-xl font-semibold text-slate-800 shadow-[0_10px_20px_rgba(15,23,42,0.08)]"
        >
          Play
        </button>
      </div>

      <div className="grid grid-cols-3 gap-2 p-2">
        {game.categories.slice(0, 6).map((category, index) => (
          <div key={`${game.id}-${category}-${index}`} className="space-y-1">
            <div className="relative h-24 overflow-hidden rounded-md">
              <Image
                src="/category.svg"
                alt={category}
                fill
                className="object-cover"
                sizes="150px"
              />
            </div>
            <div className="rounded-[4px] bg-[#FF7A1A] px-2 py-1 text-center text-[10px] font-semibold uppercase text-white">
              {toShortCategoryLabel(category)}
            </div>
          </div>
        ))}
      </div>
    </article>
  );
}

function toShortCategoryLabel(category: string) {
  const matchingCategory = categoryCards.find((item) => item.title === category);

  if (matchingCategory) {
    return matchingCategory.title.length > 10
      ? matchingCategory.title.slice(0, 10)
      : matchingCategory.title;
  }

  return category.length > 10 ? category.slice(0, 10) : category;
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

function SearchIcon() {
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
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.5-3.5" />
    </svg>
  );
}
