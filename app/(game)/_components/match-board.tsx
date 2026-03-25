"use client";

import Image from "next/image";
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
      <div className="mx-auto max-w-[1320px]">
        <div className="flex flex-col items-center gap-4 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-400">
            {state.gameName}
          </p>
          <button
            type="button"
            onClick={() => commit((currentState) => toggleActiveTeam(currentState))}
            className="inline-flex items-center justify-center rounded-full bg-[#FF0099] px-6 py-3 text-base font-semibold text-white shadow-[0_18px_36px_rgba(255,0,153,0.2)] sm:px-8 sm:py-4 sm:text-lg"
          >
            Team role: {activeTeam.name}
          </button>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {state.categories.map((category) => (
            <div key={category.slug}>
              <div
                className={`relative flex min-h-[210px] flex-col justify-between overflow-hidden rounded-[24px] px-5 py-5 text-white shadow-[0_20px_42px_rgba(15,23,42,0.15)] ${category.coverClassName}`}
              >
                <Image
                  src="/Background.png"
                  alt=""
                  fill
                  className="object-cover opacity-15 mix-blend-screen"
                  sizes="(max-width: 1280px) 50vw, 20vw"
                />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.32),transparent_40%),radial-gradient(circle_at_bottom_right,rgba(0,0,0,0.24),transparent_45%)]" />

                <div className="relative">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/80">
                    {category.eyebrow}
                  </p>
                </div>

                <div className="relative">
                  <div className="text-[70px] font-black leading-none text-white/15">
                    {getCategoryMonogram(category.title)}
                  </div>
                <div className="-mt-1 rounded-[18px] bg-[#FF0099] px-4 py-4 text-center text-xl font-extrabold uppercase tracking-[0.08em] text-white sm:text-2xl">
                    {category.title}
                  </div>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-3">
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
                      className={`rounded-2xl border px-4 py-4 text-xl font-black sm:text-2xl ${
                        question.used
                          ? "cursor-not-allowed border-slate-200 bg-slate-100 text-slate-300"
                          : "border-[#FF99D6] bg-[#FFE4F4] text-[#FF0099] hover:-translate-y-0.5 hover:shadow-[0_12px_24px_rgba(255,0,153,0.14)]"
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

function getCategoryMonogram(title: string) {
  return title
    .split(" ")
    .slice(0, 2)
    .map((word) => word[0])
    .join("");
}
