"use client";

import Image from "next/image";
import { useMemo, useState } from "react";

import { categoryCards, categoryFilters } from "./marketing-data";

type CategoryFilter = (typeof categoryFilters)[number];

export function CategoriesSections() {
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

      if (current.length >= 3) {
        return current;
      }

      return [...current, title];
    });
  }

  return (
    <section className="px-4 pb-10 pt-14 sm:px-6 lg:px-10 lg:pb-16 lg:pt-20 lg:px-[80px]">
      <div className="">
        <header className="text-center">
          <h1 className=" font-normal text-[60px] leading-[60px] tracking-[-1.5px] align-middle">
            Browse <span className="text-[#FF0099]">Categories</span>
          </h1>
          <p className=" mt-5  text-lg leading-8 text-slate-400">
            Explore our collection of trivia categories. Each team picks 3 during the
            game!
          </p>
        </header>

        <div className="mt-10 lg:px-[273px]">
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

        <div className="mt-6 flex flex-wrap items-center justify-center gap-3 ">
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

       

        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-5 lg:px-[50px] xl:px-[200px]">
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
                </div>
                <div className="flex items-center justify-between gap-4 px-6 py-5">
                  <div>
                    <h3 className="font-bold text-[18px] leading-[28px] tracking-[0px] align-middle">
                      {card.title}
                    </h3>
                   
                  </div>
                 
                </div>
              </button>
            );
          })}
        </div>

        {visibleCards.length === 0 ? (
          <div className="mt-10 rounded-[24px] border border-dashed border-slate-200 px-6 py-12 text-center">
            <h3 className="text-2xl font-semibold text-slate-900">
              No category found
            </h3>
            <p className="mt-3 text-base text-slate-400">
              Try another keyword or switch the active filter.
            </p>
          </div>
        ) : null}
      </div>
    </section>
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
