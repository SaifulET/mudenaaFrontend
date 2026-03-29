import Image from "next/image";
import Link from "next/link";

import { gameRules, whyPlayCards } from "./marketing-data";

export function LandingSections() {
  return (
    <>
      <HeroSection />
      <WhyPlaySection />
      <GameRulesSection />
      <RatingBand />
    </>
  );
}

function HeroSection() {
  return (
    <section className="px-4 pb-18 pt-20 text-center sm:px-6 sm:pb-24 sm:pt-24 lg:px-10 lg:pb-28 lg:pt-28">
      <div className="mx-auto max-w-[860px]">
        <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-500 shadow-[0_0_0_1px_rgba(15,23,42,0.02)] sm:text-xs">
          <span className="inline-flex h-4 w-4 items-center justify-center rounded-full bg-slate-100 text-[9px] text-slate-600">
            O
          </span>
          The ultimate social trivia game
        </div>

        <h1 className="mt-10 text-5xl font-semibold tracking-[-0.05em] text-slate-900 sm:text-6xl lg:text-[72px] lg:leading-[1.02]">
          Challenge Your Friends.
          <span className="block text-[#FF0099]">Prove Your Knowledge.</span>
        </h1>

        <p className="mx-auto mt-6 max-w-[700px] text-sm leading-7 text-slate-500 sm:text-base sm:leading-8">
          Sureli is the fast-paced trivia game that turns any hangout into an epic battle
          of wits. Perfect for college parties and family game nights.
        </p>

        <Link
          href="/start-game"
          className="mt-10 inline-flex min-w-[200px] items-center justify-center rounded-full bg-[#FF0099] px-8 py-4 text-sm font-semibold text-white shadow-[0_0_0_1px_rgba(255,0,153,0.08),0_14px_30px_rgba(255,0,153,0.18)] transition hover:-translate-y-0.5 sm:min-w-[240px] sm:text-base"
        >
          Start a Game
          <span className="ml-2 text-base">&rarr;</span>
        </Link>
      </div>
    </section>
  );
}

function WhyPlaySection() {
  return (
    <section className="px-4 py-12 sm:px-6 lg:px-10 lg:py-16">
      <div className="mx-auto max-w-[1120px]">
        <SectionHeading
          title="Why Play Sureli?"
          description="Fast, fun, and designed for social moments that matter."
        />

        <div className="mt-12 grid gap-5 lg:grid-cols-3">
          {whyPlayCards.map((card) => (
            <article
              key={card.title}
              className="rounded-[22px] bg-[#FFF0F8] px-6 py-8 text-center shadow-[0_0_0_1px_rgba(255,0,153,0.05)]"
            >
              <div className="mx-auto inline-flex h-12 w-12 items-center justify-center rounded-full bg-[#FF0099] text-white shadow-[0_10px_24px_rgba(255,0,153,0.16)]">
                <FeatureIcon kind={card.icon} />
              </div>
              <h3 className="mt-5 text-lg font-semibold text-slate-900">{card.title}</h3>
              <p className="mx-auto mt-3 max-w-[250px] text-sm leading-6 text-slate-500">
                {card.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function GameRulesSection() {
  return (
    <section className="px-4 py-12 sm:px-6 lg:px-10 lg:py-16">
      <div className="mx-auto max-w-[1120px]">
        <SectionHeading
          title="Game Rules"
          description="Fast, fun, and designed for social moments that matter."
        />

        <div className="mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {gameRules.map((rule, index) => {
            const theme = getRuleTheme(index);

            return (
              <article
                key={rule.title}
                className="flex items-center gap-4 rounded-[18px] bg-white px-4 py-3 shadow-[0_10px_30px_rgba(15,23,42,0.06)] ring-1 ring-slate-100"
              >
                <div className={`relative h-14 w-14 shrink-0 overflow-hidden rounded-2xl ${theme.shellClassName}`}>
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.16)_0%,rgba(15,23,42,0.18)_100%)]" />
                  <div className="absolute inset-0">
                    <RuleArtwork kind={theme.artwork} />
                  </div>
                </div>
                <div className="min-w-0">
                  <h3 className="truncate text-sm font-semibold text-slate-900">{rule.title}</h3>
                  <p className="mt-1 text-xs leading-5 text-slate-400">
                    Split into teams and compete head-to-head in fast-paced trivia tests.
                  </p>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function RatingBand() {
  return (
    <section className="mt-8 bg-[#FFF0F8] px-4 py-8 sm:px-6 lg:px-10">
      <div className="mx-auto grid max-w-[1120px] gap-6 lg:grid-cols-[1.2fr_auto_auto] lg:items-center lg:gap-10">
        <div className="flex items-center gap-5">
          <Image src="/navlogo.png" alt="Sureli" width={56} height={56} className="h-14 w-14" />
          <div>
            <div className="flex items-center gap-1 text-[#FF9B26]">
              {Array.from({ length: 5 }).map((_, index) => (
                <StarIcon key={index} />
              ))}
            </div>
            <p className="mt-2 text-2xl font-medium text-slate-900 sm:text-3xl">
              Rating: 5 - 33 Review
            </p>
          </div>
        </div>

        <StoreButton platform="App Store" />
        <StoreButton platform="Google Play" />
      </div>
    </section>
  );
}

function SectionHeading({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="text-center">
      <h2 className="text-4xl font-semibold tracking-[-0.04em] text-slate-900 sm:text-5xl">
        {title}
      </h2>
      <p className="mt-3 text-sm text-slate-400 sm:text-base">{description}</p>
    </div>
  );
}

function StoreButton({ platform }: { platform: "App Store" | "Google Play" }) {
  return (
    <div className="inline-flex min-h-[72px] min-w-[220px] items-center justify-center rounded-xl bg-black px-6 py-4 text-white shadow-[0_10px_24px_rgba(15,23,42,0.20)]">
      <div className="text-center">
        <p className="text-[10px] uppercase tracking-[0.16em] text-white/70">
          Download on the
        </p>
        <p className="mt-1 text-2xl font-semibold">{platform}</p>
      </div>
    </div>
  );
}

function FeatureIcon({ kind }: { kind: "users" | "bolt" | "trophy" }) {
  if (kind === "users") {
    return (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M16 21v-2a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v2" />
        <circle cx="9.5" cy="7" r="3" />
        <path d="M22 21v-2a4 4 0 0 0-3-3.9" />
        <path d="M16 3.1a3 3 0 0 1 0 5.8" />
      </svg>
    );
  }

  if (kind === "bolt") {
    return (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M13 2 4 14h6l-1 8 9-12h-6l1-8Z" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M8 21h8" />
      <path d="M12 17v4" />
      <path d="M7 4h10v4a5 5 0 0 1-10 0V4Z" />
      <path d="M17 5h2a2 2 0 0 1 2 2 4 4 0 0 1-4 4" />
      <path d="M7 5H5a2 2 0 0 0-2 2 4 4 0 0 0 4 4" />
    </svg>
  );
}

function StarIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden="true">
      <path d="m12 2.5 2.9 5.9 6.5 1-4.7 4.6 1.1 6.5L12 17.4 6.2 20.5l1.1-6.5L2.6 9.4l6.5-1L12 2.5Z" />
    </svg>
  );
}

function getRuleTheme(index: number) {
  const themes = [
    {
      artwork: "player" as const,
      shellClassName: "bg-[linear-gradient(145deg,#7c2d12_0%,#fb7185_100%)]",
    },
    {
      artwork: "challenge" as const,
      shellClassName: "bg-[linear-gradient(145deg,#0f766e_0%,#22c55e_100%)]",
    },
    {
      artwork: "music" as const,
      shellClassName: "bg-[linear-gradient(145deg,#0f172a_0%,#ec4899_100%)]",
    },
    {
      artwork: "field" as const,
      shellClassName: "bg-[linear-gradient(145deg,#166534_0%,#84cc16_100%)]",
    },
    {
      artwork: "medal" as const,
      shellClassName: "bg-[linear-gradient(145deg,#475569_0%,#d1d5db_100%)]",
    },
    {
      artwork: "crown" as const,
      shellClassName: "bg-[linear-gradient(145deg,#b45309_0%,#facc15_100%)]",
    },
  ] as const;

  return themes[index % themes.length];
}

function RuleArtwork({
  kind,
}: {
  kind: "player" | "challenge" | "music" | "field" | "medal" | "crown";
}) {
  switch (kind) {
    case "player":
      return (
        <svg viewBox="0 0 80 80" className="h-full w-full" aria-hidden="true">
          <circle cx="40" cy="26" r="12" fill="rgba(255,255,255,0.85)" />
          <path d="M20 64c5-14 14-22 20-22s15 8 20 22" fill="rgba(255,255,255,0.72)" />
        </svg>
      );
    case "challenge":
      return (
        <svg viewBox="0 0 80 80" className="h-full w-full" aria-hidden="true">
          <rect x="18" y="18" width="44" height="44" rx="12" fill="rgba(255,255,255,0.78)" />
          <path d="M30 40h20M40 30v20" stroke="#0f766e" strokeWidth="5" strokeLinecap="round" />
        </svg>
      );
    case "music":
      return (
        <svg viewBox="0 0 80 80" className="h-full w-full" aria-hidden="true">
          <rect x="38" y="18" width="6" height="28" rx="3" fill="rgba(255,255,255,0.85)" />
          <circle cx="32" cy="52" r="8" fill="rgba(255,255,255,0.75)" />
          <circle cx="48" cy="48" r="8" fill="rgba(255,255,255,0.75)" />
        </svg>
      );
    case "field":
      return (
        <svg viewBox="0 0 80 80" className="h-full w-full" aria-hidden="true">
          <rect x="10" y="18" width="60" height="44" rx="10" fill="rgba(255,255,255,0.16)" />
          <path d="M10 62h60" stroke="rgba(255,255,255,0.9)" strokeWidth="3" />
          <path d="M40 18v44" stroke="rgba(255,255,255,0.3)" strokeWidth="3" />
          <circle cx="40" cy="40" r="10" fill="none" stroke="rgba(255,255,255,0.35)" strokeWidth="3" />
        </svg>
      );
    case "medal":
      return (
        <svg viewBox="0 0 80 80" className="h-full w-full" aria-hidden="true">
          <path d="M28 14h10l6 16H34z" fill="rgba(255,255,255,0.75)" />
          <path d="M42 14h10l-6 16H36z" fill="rgba(255,255,255,0.55)" />
          <circle cx="40" cy="48" r="14" fill="rgba(255,255,255,0.88)" />
        </svg>
      );
    case "crown":
      return (
        <svg viewBox="0 0 80 80" className="h-full w-full" aria-hidden="true">
          <path d="M18 56 24 26l16 14 16-14 6 30Z" fill="rgba(255,255,255,0.82)" />
          <path d="M18 56h44" stroke="rgba(255,255,255,0.95)" strokeWidth="4" strokeLinecap="round" />
        </svg>
      );
  }
}
