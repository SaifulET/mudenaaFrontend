"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { MatchLoading, MatchSidebar } from "./match-ui";
import { getCurrentQuestion, getMatchQuestion, selectCurrentQuestion } from "./match-data";
import { useMatchSession } from "./use-match-session";

export function MatchQuestion() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { state, commit } = useMatchSession();
  const requestedQuestionId = searchParams.get("questionId");

  useEffect(() => {
    if (!state) {
      return;
    }

    const targetQuestion =
      (requestedQuestionId ? getMatchQuestion(state, requestedQuestionId) : null) ??
      getCurrentQuestion(state);

    if (!targetQuestion || targetQuestion.used) {
      router.replace("/start-game/match");
      return;
    }

    if (requestedQuestionId && requestedQuestionId !== state.currentQuestionId) {
      commit((currentState) => selectCurrentQuestion(currentState, requestedQuestionId));
    }
  }, [commit, requestedQuestionId, router, state]);

  if (!state) {
    return <MatchLoading message="Loading the question..." />;
  }

  const question = getMatchQuestion(state, requestedQuestionId ?? "") ?? getCurrentQuestion(state);

  if (!question) {
    return <MatchLoading message="Finding the question..." />;
  }

  return (
    <div className="bg-[linear-gradient(180deg,#ffffff_0%,#fff7fb_100%)] px-4 py-8 sm:px-6 sm:py-10 lg:px-10">
      <div className="mx-auto grid max-w-[1320px] gap-6 lg:grid-cols-[minmax(0,1fr)_320px] lg:gap-8">
        <section className="overflow-hidden rounded-[38px] border-[3px] border-[#FF0099] bg-white shadow-[0_22px_55px_rgba(15,23,42,0.12)]">
          <div className="flex flex-col gap-4 bg-[#212331] px-4 py-4 text-white sm:flex-row sm:flex-wrap sm:items-center sm:justify-between sm:px-5">
            <div className="inline-flex items-center justify-center rounded-md bg-[#98A4B4] px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-white">
              VAR
            </div>

            <QuestionTimer key={question.id} initialTime={state.timePerQuestion} />

            <span className="inline-flex rounded-full bg-black px-4 py-3 text-sm font-semibold text-white">
              points{question.point}
            </span>
          </div>

          <div className="px-4 py-6 sm:px-8 sm:py-8">
            <h1 className="mx-auto max-w-4xl text-center text-2xl font-semibold leading-tight text-slate-900 sm:text-4xl lg:text-5xl">
              {question.prompt}
            </h1>

            <div className="mt-8 rounded-[28px] bg-[linear-gradient(135deg,#0f172a_0%,#1f2937_55%,#374151_100%)] p-4 shadow-[0_18px_36px_rgba(15,23,42,0.2)] sm:p-6">
              <div className="rounded-[24px] border border-white/10 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.16),transparent_45%)] px-6 py-14 text-center text-white">
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-white/70">
                  Visual clue
                </p>
                <h2 className="mt-5 text-3xl font-semibold sm:text-4xl lg:text-5xl">{question.visualTitle}</h2>
                <p className="mx-auto mt-4 max-w-2xl text-base text-white/75 sm:text-lg">
                  {question.visualHint}
                </p>
              </div>
            </div>

            <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
              <button
                type="button"
                onClick={() => router.push("/start-game/match/review")}
                className="inline-flex w-full items-center justify-center rounded-2xl bg-[#2F7D32] px-8 py-4 text-lg font-semibold text-white shadow-[0_14px_28px_rgba(47,125,50,0.22)] sm:w-auto"
              >
                Answer
              </button>

              <span className="inline-flex rounded-2xl bg-[#FF0099] px-5 py-3 text-sm font-semibold uppercase tracking-[0.16em] text-white">
                {question.categoryTitle}
              </span>
            </div>
          </div>
        </section>

        <MatchSidebar state={state} />
      </div>
    </div>
  );
}

function formatTimer(totalSeconds: number) {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

function QuestionTimer({ initialTime }: { initialTime: number }) {
  const [timeLeft, setTimeLeft] = useState(initialTime);
  const [isRunning, setIsRunning] = useState(true);

  useEffect(() => {
    if (!isRunning || timeLeft <= 0) {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      setTimeLeft((currentValue) => Math.max(0, currentValue - 1));
    }, 1000);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [isRunning, timeLeft]);

  return (
    <div className="flex items-center justify-center gap-3 sm:gap-6">
      <button
        type="button"
        onClick={() => setIsRunning((currentValue) => !currentValue)}
        className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-base font-semibold sm:h-11 sm:w-11 sm:text-lg"
      >
        {isRunning ? "II" : ">"}
      </button>

      <div className="text-center">
        <p className="text-3xl font-black tracking-[0.18em] sm:text-4xl sm:tracking-[0.22em]">{formatTimer(timeLeft)}</p>
      </div>

      <button
        type="button"
        onClick={() => {
          setTimeLeft(initialTime);
          setIsRunning(true);
        }}
        className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-base font-semibold sm:h-11 sm:w-11 sm:text-lg"
      >
        R
      </button>
    </div>
  );
}
