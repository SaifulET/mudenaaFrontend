import Link from "next/link";

import { helperCards, howItWorksSteps } from "./marketing-data";

export function HowItWorksSections() {
  return (
    <section className="">
      <div className="">
        <header className="text-center  px-4 pb-10 pt-14 sm:px-6 lg:px-[208px] lg:pb-16 lg:pt-20">
          <h1 className="text-5xl font-semibold tracking-[-0.05em] text-slate-900 sm:text-6xl">
            How <span className="text-[#FF0099]">Sureli</span> Works
          </h1>
          <p className=" mt-5  text-lg leading-8 text-slate-400">
            Get started in minutes. No apps to download, no complicated setup, just
            pure trivia fun.
          </p>
        </header>

        <div className=" space-y-7 px-4 pb-10 sm:px-6 lg:px-[208px] lg:pb-16">
          {howItWorksSteps.map((step) => (
            <article
              key={step.number}
              className="grid gap-5 rounded-[30px] bg-white p-4 shadow-[0_0_0_1px_rgba(15,23,42,0.04),0_14px_40px_rgba(15,23,42,0.06)] sm:grid-cols-[auto_auto_1fr] sm:items-center sm:p-6"
            >
              <div className="inline-flex h-20 w-20 items-center justify-center rounded-2xl bg-slate-100 text-slate-500">
                <StepIcon kind={step.icon} />
              </div>

              <div className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 text-sm font-semibold text-slate-500">
                {step.number}
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-slate-900">{step.title}</h2>
                <p className="mt-2 text-base leading-7 text-slate-400">{step.description}</p>
              </div>
            </article>
          ))}
        </div>

        <section className="text-center px-4 pb-10 pt-14 sm:px-6 lg:px-[80px] lg:pb-16 lg:pt-20">
          <h2 className="text-4xl pb-[16px] font-semibold tracking-[-0.04em] text-slate-900">
            Power-Ups & Helpers
          </h2>
          <p className=" text-lg text-slate-400">
            Each team gets special abilities to use strategically during the game.
          </p>

          <div className="mt-14 grid gap-8 md:grid-cols-2 xl:grid-cols-4">
            {helperCards.map((card) => (
              <article key={card.title} className="text-center">
                <div className="mx-auto inline-flex h-16 w-16 items-center justify-center text-slate-700">
                  <HelperIcon kind={card.icon} />
                </div>
                <h3 className="mt-5 text-2xl font-semibold text-slate-900">{card.title}</h3>
                <p className="mt-3 text-base leading-7 text-slate-400 px-[30px]">{card.description}</p>
              </article>
            ))}
          </div>

          <Link
            href="/start-game"
            className="mt-14 inline-flex min-w-64 items-center justify-center rounded-2xl bg-[#FF0099] px-8 py-4 text-base font-semibold text-white shadow-[0_0_0_1px_rgba(255,0,153,0.08),0_12px_24px_rgba(255,0,153,0.18)] transition hover:-translate-y-0.5"
          >
            Start Playing Now
            <span className="ml-2">&rarr;</span>
          </Link>
        </section>
      </div>
    </section>
  );
}

function StepIcon({
  kind,
}: {
  kind: "users" | "menu" | "play" | "crown";
}) {
  if (kind === "users") {
    return (
      <svg viewBox="0 0 24 24" className="h-8 w-8" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M16 21v-2a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v2" />
        <circle cx="9.5" cy="7" r="3" />
        <path d="M22 21v-2a4 4 0 0 0-3-3.9" />
        <path d="M16 3.1a3 3 0 0 1 0 5.8" />
      </svg>
    );
  }

  if (kind === "menu") {
    return (
      <svg viewBox="0 0 24 24" className="h-8 w-8" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M5 7h14" />
        <path d="M5 12h14" />
        <path d="M5 17h14" />
      </svg>
    );
  }

  if (kind === "play") {
    return (
      <svg viewBox="0 0 24 24" className="h-8 w-8" fill="none" stroke="currentColor" strokeWidth="1.8">
        <circle cx="12" cy="12" r="8" />
        <path d="m10 9 5 3-5 3V9Z" fill="currentColor" stroke="none" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" className="h-8 w-8" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M12 3 9 8H4l2 4-1 5 7-3 7 3-1-5 2-4h-5l-3-5Z" />
    </svg>
  );
}

function HelperIcon({
  kind,
}: {
  kind: "dice" | "phone" | "bolt" | "hint";
}) {
  if (kind === "dice") {
    return (
      <svg viewBox="0 0 24 24" className="h-9 w-9" fill="none" stroke="currentColor" strokeWidth="1.8">
        <rect x="5" y="5" width="14" height="14" rx="2" />
        <circle cx="9" cy="9" r="1" fill="currentColor" stroke="none" />
        <circle cx="15" cy="15" r="1" fill="currentColor" stroke="none" />
      </svg>
    );
  }

  if (kind === "phone") {
    return (
      <svg viewBox="0 0 24 24" className="h-9 w-9" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M22 16.9v3a2 2 0 0 1-2.2 2A19.8 19.8 0 0 1 3.1 5.2 2 2 0 0 1 5.1 3h3a2 2 0 0 1 2 1.7l.4 2.8a2 2 0 0 1-.6 1.8l-2 2a16 16 0 0 0 5.9 5.9l2-2a2 2 0 0 1 1.8-.6l2.8.4A2 2 0 0 1 22 16.9Z" />
      </svg>
    );
  }

  if (kind === "bolt") {
    return (
      <svg viewBox="0 0 24 24" className="h-9 w-9" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M13 2 4 14h6l-1 8 9-12h-6l1-8Z" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" className="h-9 w-9" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M9 18h6" />
      <path d="M10 22h4" />
      <path d="M12 2a7 7 0 0 0-4 12.7V17a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-2.3A7 7 0 0 0 12 2Z" />
    </svg>
  );
}
