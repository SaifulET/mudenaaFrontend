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
    <div className="min-h-screen bg-white px-4 py-8 sm:px-6 sm:py-10 lg:px-[128px]">
      <div className="">
        <header className="text-center">
          <h1 className="font-sans text-3xl font-semibold leading-[38px] sm:text-4xl sm:leading-[45px]">
            Start a New Game
          </h1>
        </header>

        <Stepper steps={steps} />

        <section className="bg-white px-0 py-6 sm:p-8 lg:p-10">
          <div className="pb-[28px] text-center sm:pb-[32px]">
            <h2 className="text-[30px] font-semibold leading-[38px] text-slate-900 sm:text-[36px] sm:leading-[45px]">
              {title}
            </h2>
            {subtitle ? (
              <p className="text-base text-slate-400 sm:text-lg">{subtitle}</p>
            ) : null}
          </div>

          <div className="">{children}</div>
        </section>
      </div>
    </div>
  );
}

function Stepper({ steps }: { steps: Step[] }) {
  return (
    <div className="mx-auto mt-8 flex max-w-5xl gap-3 overflow-x-auto pb-2 sm:mt-10 sm:items-center sm:justify-between sm:overflow-visible sm:pb-0">
      {steps.map((step, index) => (
        <div key={step.number} className="flex min-w-fit flex-1 items-center gap-3">
          <div className="flex min-w-fit items-center gap-2 sm:gap-3">
            <span
              className={`inline-flex h-8 w-8 items-center justify-center rounded-full text-sm font-semibold ${
                step.status === "complete"
                  ? "bg-emerald-500 text-white"
                  : step.status === "current"
                    ? "bg-emerald-500 text-white"
                    : "bg-slate-100 text-slate-400"
              }`}
            >
              {step.status === "complete" ? "✓" : step.number}
            </span>
            <span
              className={`whitespace-nowrap text-sm font-semibold ${
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
