import Image from "next/image";
import Link from "next/link";

import {
  abilityCards,
  gameRules,
  whyPlayCards,
} from "./marketing-data";

export function LandingSections() {
  return (
    <>
      <HeroSection />
      <WhyPlaySection />
      <GameRulesSection />
      <RatingBand />
      <AbilitiesSection />
    </>
  );
}

function HeroSection() {
  return (
    <section className="px-4 pb-16 pt-18 text-center sm:px-6 lg:px-[192px] lg:pb-[100px] lg:pt-[170px]">
      <div className="">
        <div className="mx-auto inline-flex items-center gap-2 rounded-full bg-slate-100 px-4 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-slate-600">
          <span className="inline-flex h-4 w-4 items-center justify-center rounded-full bg-white text-[10px] text-slate-700">
            O
          </span>
          The ultimate social trivia game
        </div>

        <h1 className="mt-8 text-5xl font-semibold tracking-[-0.05em] text-slate-900 sm:text-6xl lg:text-7xl">
          Challenge Your Friends.
          <span className="block text-[#FF0099]">Prove Your Knowledge.</span>
        </h1>

        <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-slate-500 sm:text-xl">
          Sureli is the fast-paced trivia game that turns any hangout into an epic
          battle of wits. Perfect for college parties and family game nights.
        </p>

        <Link
          href="/start-game"
          className="mt-10 inline-flex min-w-72 items-center justify-center rounded-full bg-[#FF0099] px-8 py-4 text-lg font-semibold text-white shadow-[0_0_0_1px_rgba(255,0,153,0.08),0_14px_30px_rgba(255,0,153,0.18)] transition hover:-translate-y-0.5"
        >
          Start a Game
          <span className="ml-2 text-xl">&rarr;</span>
        </Link>
      </div>
    </section>
  );
}

function WhyPlaySection() {
  return (
    <section id="how-it-works" className="px-4 py-12 sm:px-6 lg:px-[80px] lg:py-20">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          title="Why Play Sureli?"
          description="Fast, fun, and designed for social moments that matter."
        />

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {whyPlayCards.map((card) => (
            <article
              key={card.title}
              className="rounded-[28px] bg-[#FFF0F8] px-8 py-10 text-center shadow-[0_0_0_1px_rgba(255,0,153,0.05)]"
            >
              <div className="mx-auto inline-flex h-14 w-14 items-center justify-center rounded-full bg-[#FF0099] text-white shadow-[0_12px_28px_rgba(255,0,153,0.18)]">
                <FeatureIcon kind={card.icon} />
              </div>
              <h3 className="mt-6 text-2xl font-semibold text-slate-900">{card.title}</h3>
              <p className="mt-4 text-base leading-7 text-slate-500">{card.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function GameRulesSection() {
  return (
    <section id="categories" className="px-4 py-12 sm:px-6 lg:px-[192px] lg:py-20">
      <div className=" overflow-hidden rounded-[40px]  bg-white ">
        <div className="relative overflow-hidden ">
          <div className="absolute inset-0 opacity-[0.06]">
           
          </div>

          <div className="relative">
            <SectionHeading
              title="Game Rules"
              description="Fast, fun, and designed for social moments that matter."
            />

            <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {gameRules.map((rule) => (
                <article
                  key={rule.title}
                  className="flex items-start gap-4 rounded-3xl bg-white/90 p-4 shadow-[0_10px_30px_rgba(15,23,42,0.06)]"
                >
                  <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-2xl">
                    <Image
                      src={rule.image}
                      alt={rule.title}
                      fill
                      className="object-cover"
                      sizes="80px"
                    />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900">{rule.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-slate-500">{rule.description}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function RatingBand() {
  return (
    <section className=" py-4 ">
      <div className=" grid  gap-8 bg-[#FFF0F8] px-6 py-8 lg:grid-cols-[1.3fr_1fr_1fr] lg:px-[78px]">
        <div className="flex items-center gap-5">
          <Image src="/navlogo.png" alt="Sureli" width={54} height={54} />
          <div>
            <div className="flex items-center gap-1 text-[#FF9B26]">
              {Array.from({ length: 5 }).map((_, index) => (
                <StarIcon key={index} />
              ))}
            </div>
            <p className="mt-2 text-3xl font-medium text-slate-900">Rating: 5 - 33 Review</p>
          </div>
        </div>

        <StoreButton platform="App Store" />
        <StoreButton platform="Google Play" />
      </div>
    </section>
  );
}

function AbilitiesSection() {
  return (
    <section id="faq" className="px-4 py-12 sm:px-6 lg:px-[80px] lg:py-20">
      <div className="">
        <SectionHeading
          title="Game Abilities"
          description="Fast, fun, and designed for social moments that matter."
        />

        <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {abilityCards.map((card) => (
            <article
              key={card.title}
              className="rounded-[28px] bg-[#FFF0F8] px-7 py-9 text-center shadow-[0_0_0_1px_rgba(255,0,153,0.05)]"
            >
              <div className="relative mx-auto h-20 w-20 overflow-hidden rounded-full">
                <Image
                  src="/Backgroundofabilities.svg"
                  alt={card.title}
                  fill
                  className="object-cover"
                  sizes="80px"
                />
              </div>
              <h3 className="mt-6 text-xl font-semibold text-slate-900">{card.title}</h3>
              <p className="mt-4 text-base leading-7 text-slate-500">{card.description}</p>
            </article>
          ))}
        </div>
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
    <div id={title === "Game Abilities" ? "about" : undefined} className="text-center">
      <h2 className="text-4xl font-semibold tracking-[-0.04em] text-slate-900 sm:text-5xl">
        {title}
      </h2>
      <p className="mt-4 text-base text-slate-400 sm:text-lg">{description}</p>
    </div>
  );
}

function StoreButton({ platform }: { platform: "App Store" | "Google Play" }) {
  return (
    <div className="inline-flex min-h-20 items-center justify-center rounded-2xl bg-black px-6 py-4 text-white shadow-[0_10px_24px_rgba(15,23,42,0.20)]">
      <div className="text-center">
        <p className="text-xs uppercase tracking-[0.16em] text-white/70">
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
      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M16 21v-2a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v2" />
        <circle cx="9.5" cy="7" r="3" />
        <path d="M22 21v-2a4 4 0 0 0-3-3.9" />
        <path d="M16 3.1a3 3 0 0 1 0 5.8" />
      </svg>
    );
  }

  if (kind === "bolt") {
    return (
      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M13 2 4 14h6l-1 8 9-12h-6l1-8Z" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2">
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
