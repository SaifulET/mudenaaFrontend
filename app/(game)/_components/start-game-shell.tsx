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
    <div className="min-h-screen bg-white px-4 py-10 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-6xl">
        <header className="text-center">
          <h1 className="text-5xl font-semibold tracking-[-0.05em] text-slate-900 sm:text-6xl">
            Start a New Game
          </h1>
        </header>

        <Stepper steps={steps} />

        <section className="mt-14 rounded-[36px] bg-white p-6 shadow-[0_0_0_1px_rgba(15,23,42,0.05),0_20px_50px_rgba(15,23,42,0.06)] sm:p-8 lg:p-10">
          <div className="text-center">
            <h2 className="text-4xl font-semibold tracking-[-0.04em] text-slate-900 sm:text-5xl">
              {title}
            </h2>
            {subtitle ? (
              <p className="mt-4 text-lg text-slate-400">{subtitle}</p>
            ) : null}
          </div>

          <div className="mt-10">{children}</div>
        </section>
      </div>
    </div>
  );
}

function Stepper({ steps }: { steps: Step[] }) {
  return (
    <div className="mx-auto mt-10 flex max-w-5xl items-center justify-between gap-3">
      {steps.map((step, index) => (
        <div key={step.number} className="flex flex-1 items-center gap-3">
          <div className="flex items-center gap-3">
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
              className={`text-sm font-semibold ${
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
