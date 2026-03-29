import type { ReactNode } from "react";

type Step = {
  number: number;
  label: string;
  status: "complete" | "current" | "upcoming";
};

export function StartGameShell({
  title,
  subtitle,
  steps,
  children,
}: {
  title: string;
  subtitle?: string;
  steps: Step[];
  children: ReactNode;
}) {
  return (
    <div className="bg-white px-4 pb-12 pt-6 sm:px-6 sm:pb-16 sm:pt-10 lg:px-10">
      <div className="mx-auto max-w-[1120px]">
        <header className="text-center">
          <h1 className="font-sans text-3xl font-semibold leading-[38px] text-slate-900 sm:text-4xl sm:leading-[45px]">
            Start a New Game
          </h1>
        </header>

        <Stepper steps={steps} />

        <section className="mt-10 rounded-[28px] border border-slate-100 bg-white px-0 py-2 sm:mt-12 sm:px-4 sm:py-4 lg:px-6">
          <div className="pb-7 text-center sm:pb-8">
            <h2 className="text-[30px] font-semibold leading-[38px] text-slate-900 sm:text-[36px] sm:leading-[45px]">
              {title}
            </h2>
            {subtitle ? (
              <p className="mt-1 text-base text-slate-400 sm:text-lg">{subtitle}</p>
            ) : null}
          </div>

          <div>{children}</div>
        </section>
      </div>
    </div>
  );
}

function Stepper({ steps }: { steps: Step[] }) {
  return (
    <div className="mx-auto mt-8 flex max-w-[960px] gap-3 overflow-x-auto pb-2 sm:mt-10 sm:items-center sm:justify-between sm:overflow-visible sm:pb-0">
      {steps.map((step, index) => (
        <div key={step.number} className="flex min-w-fit flex-1 items-center gap-3">
          <div className="flex min-w-fit items-center gap-2 sm:gap-3">
            <span
              className={`inline-flex h-7 w-7 items-center justify-center rounded-full text-xs font-semibold ${
                step.status === "complete"
                  ? "bg-emerald-500 text-white"
                  : step.status === "current"
                    ? "bg-emerald-500 text-white"
                  : "bg-slate-100 text-slate-400"
              }`}
            >
              {step.status === "complete" ? <StepCheckIcon /> : step.number}
            </span>
            <span
              className={`whitespace-nowrap text-sm font-medium ${
                step.status === "upcoming" ? "text-slate-400" : "text-slate-700"
              }`}
            >
              {step.label}
            </span>
          </div>

          {index < steps.length - 1 ? (
            <span
              className={`hidden h-px flex-1 sm:block ${
                step.status === "upcoming" ? "bg-slate-200" : "bg-emerald-400"
              }`}
            />
          ) : null}
        </div>
      ))}
    </div>
  );
}

function StepCheckIcon() {
  return (
    <svg
      viewBox="0 0 16 16"
      className="h-3.5 w-3.5"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="m3.5 8.2 2.3 2.3 4.7-5.1" />
    </svg>
  );
}
