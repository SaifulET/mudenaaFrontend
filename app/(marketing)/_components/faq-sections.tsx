"use client";

import { useState } from "react";

import { faqItems } from "./marketing-data";

export function FaqSections() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="px-4 pb-12 pt-14 sm:px-6 lg:px-[256px] lg:pb-16 lg:pt-20">
      <div className="">
        <header className="text-center">
          <h1 className="font-normal text-[60px] leading-[60px] tracking-[-1.5px] align-middle">
            Frequently Asked <span className="text-[#FF0099]">Questions</span>
          </h1>
          <p className="mx-auto mt-5 max-w-3xl text-lg leading-8 text-slate-400">
            Everything you need to know about playing Sureli.
          </p>
        </header>

        <div className="mt-14 space-y-4">
          {faqItems.map((item, index) => {
            const isOpen = openIndex === index;

            return (
              <article
                key={item.question}
                className={`overflow-hidden rounded-3xl border bg-white transition ${
                  isOpen
                    ? "border-slate-400 shadow-[0_14px_36px_rgba(15,23,42,0.08)]"
                    : "border-slate-200 shadow-[0_8px_20px_rgba(15,23,42,0.04)]"
                }`}
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? -1 : index)}
                  className="flex w-full items-center justify-between gap-4 px-6 py-6 text-left sm:px-8"
                  aria-expanded={isOpen}
                >
                  <span className="text-lg font-semibold text-slate-900 sm:text-xl">
                    {item.question}
                  </span>
                  <span
                    className={`inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-slate-500 transition ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  >
                    <ChevronIcon />
                  </span>
                </button>

                {isOpen ? (
                  <div className="px-6 pb-6 sm:px-8 sm:pb-8">
                    <p className="max-w-4xl text-base leading-8 text-slate-400">
                      {item.answer}
                    </p>
                  </div>
                ) : null}
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function ChevronIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}
