import Image from "next/image";
import Link from "next/link";
import type { InputHTMLAttributes, ReactNode } from "react";

type AuthPanelProps = {
  title: string;
  description: string;
  children: ReactNode;
  badge?: ReactNode;
  align?: "center" | "left";
  width?: "compact" | "regular" | "wide";
};

type InputFieldProps = {
  label: string;
  placeholder?: string;
  icon?: "user" | "email" | "lock";
  rightLabel?: string;
  rightHref?: string;
  trailingIcon?: ReactNode;
  errorText?: string;
} & Omit<InputHTMLAttributes<HTMLInputElement>, "size">;

export function AuthPanel({
  title,
  description,
  children,
  badge,
  align = "center",
  width = "regular",
}: AuthPanelProps) {
  const maxWidthClass =
    width === "compact"
      ? "max-w-xl"
      : width === "wide"
        ? "max-w-4xl"
        : "max-w-2xl";

  return (
    <section
      className={`flex w-full ${maxWidthClass} flex-col ${
        align === "center" ? "items-center text-center" : "items-start text-left"
      }`}
    >
      {badge ? <div className="mb-6">{badge}</div> : null}
      <h1 className="font-[family-name:var(--font-geist-sans)] text-4xl font-semibold tracking-[-0.03em] text-slate-900 sm:text-5xl">
        {title}
      </h1>
      <p className="mt-3 max-w-2xl text-base leading-7 text-slate-500 sm:text-lg">
        {description}
      </p>
      <div className="mt-8 w-full rounded-[32px] border border-white/70 bg-white/88 p-6 shadow-[0_0_0_1px_rgba(255,255,255,0.6),0_18px_44px_rgba(15,23,42,0.08)] backdrop-blur sm:p-8">
        {children}
      </div>
    </section>
  );
}

export function InputField({
  label,
  placeholder,
  icon,
  rightLabel,
  rightHref,
  trailingIcon,
  errorText,
  type = "text",
  ...props
}: InputFieldProps) {
  return (
    <label className="block">
      <span className="mb-2 flex items-center justify-between gap-4 text-sm font-semibold text-slate-700">
        <span>{label}</span>
        {rightLabel && rightHref ? (
          <Link href={rightHref} className="text-xs text-[#FF0099] transition hover:opacity-80">
            {rightLabel}
          </Link>
        ) : null}
      </span>
      <span className="flex h-14 items-center gap-3 overflow-hidden rounded-2xl border border-[#FF0099]/12 bg-[#FF0099]/[0.03] px-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.6)] transition focus-within:border-[#FF0099]/40">
        <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#FFF0F8] text-[#FF0099] shadow-[0_0_0_1px_rgba(255,0,153,0.08)]">
          {icon ? <FieldIcon icon={icon} /> : null}
        </span>
        <input
          type={type}
          placeholder={placeholder}
          className="h-full w-full bg-transparent text-base text-slate-800 outline-none placeholder:text-slate-400 autofill:shadow-[inset_0_0_0_1000px_rgba(255,0,153,0.03)] autofill:[-webkit-text-fill-color:#1e293b]"
          {...props}
        />
        {trailingIcon ? <span className="shrink-0 text-slate-500">{trailingIcon}</span> : null}
      </span>
      {errorText ? <span className="mt-2 block text-sm text-[#FF0099]">{errorText}</span> : null}
    </label>
  );
}

export function PrimaryButton({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <button
      type="button"
      className={`${primaryActionClassName} ${className}`}
    >
      {children}
    </button>
  );
}

export const primaryActionClassName =
  "inline-flex h-14 w-full items-center justify-center overflow-hidden rounded-2xl bg-[#FF0099] px-6 text-base font-semibold text-white shadow-[0_0_0_1px_rgba(255,0,153,0.08),0_12px_24px_rgba(255,0,153,0.16)] transition hover:-translate-y-0.5 hover:shadow-[0_0_0_1px_rgba(255,0,153,0.10),0_16px_30px_rgba(255,0,153,0.20)]";

export function Divider({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-4 text-sm text-slate-400">
      <span className="h-px flex-1 bg-slate-200" />
      <span>{label}</span>
      <span className="h-px flex-1 bg-slate-200" />
    </div>
  );
}

export function GoogleButton({ label }: { label: string }) {
  return (
    <button
      type="button"
      className="inline-flex h-14 w-full items-center justify-center gap-3 rounded-2xl border border-slate-200 bg-white px-6 text-base font-semibold text-slate-700 transition hover:border-[#FF0099]/35 hover:text-[#FF0099]"
    >
      <GoogleIcon />
      {label}
    </button>
  );
}

export function CheckboxRow({
  label,
  action,
}: {
  label: string;
  action?: ReactNode;
}) {
  return (
    <div className="flex items-center justify-between gap-3 text-sm text-slate-500">
      <label className="flex items-center gap-3">
        <input
          type="checkbox"
          className="h-4 w-4 rounded border border-slate-300 accent-[#FF0099]"
        />
        <span>{label}</span>
      </label>
      {action}
    </div>
  );
}

export function InlineLink({
  href,
  children,
  className = "",
}: {
  href: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <Link href={href} className={`font-semibold text-[#FF0099] transition hover:opacity-80 ${className}`}>
      {children}
    </Link>
  );
}

export function OtpPreview({ values }: { values: string[] }) {
  return (
    <div className="grid w-full max-w-sm grid-cols-4 gap-4 sm:max-w-md sm:gap-5">
      {values.map((value, index) => (
        <div
          key={`${value}-${index}`}
          className="flex aspect-square items-center justify-center rounded-2xl border border-[#FF0099]/35 bg-white text-4xl font-semibold tracking-[0.08em] text-slate-800 shadow-[0_12px_28px_rgba(255,0,153,0.09)]"
        >
          {value}
        </div>
      ))}
    </div>
  );
}

export function TopBadge() {
  return (
    <div className="relative inline-flex h-24 w-24 items-center justify-center overflow-hidden rounded-[28px] bg-[#FFE5F4] shadow-[0_0_0_1px_rgba(255,0,153,0.06),0_12px_28px_rgba(255,0,153,0.10)]">
      <div className="absolute inset-3 rounded-[22px] bg-white" />
      <Image
        src="/topoftheWelcome.png"
        alt=""
        width={34}
        height={34}
        aria-hidden="true"
        className="relative"
      />
    </div>
  );
}

function FieldIcon({ icon }: { icon: "user" | "email" | "lock" }) {
  if (icon === "user") {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-5 w-5"
        aria-hidden="true"
      >
        <path d="M20 21a8 8 0 0 0-16 0" />
        <circle cx="12" cy="8" r="4" />
      </svg>
    );
  }

  if (icon === "email") {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-5 w-5"
        aria-hidden="true"
      >
        <path d="M4 6h16v12H4z" />
        <path d="m4 8 8 6 8-6" />
      </svg>
    );
  }

  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-5 w-5"
      aria-hidden="true"
    >
      <rect x="5" y="11" width="14" height="10" rx="2" />
      <path d="M8 11V8a4 4 0 0 1 8 0v3" />
    </svg>
  );
}

function GoogleIcon() {
  return (
    <svg viewBox="0 0 48 48" className="h-5 w-5" aria-hidden="true">
      <path
        fill="#FFC107"
        d="M43.6 20.5H42V20H24v8h11.3C33.6 32.7 29.2 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3 0 5.7 1.1 7.8 3l5.7-5.7C34.1 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.4-.4-3.5Z"
      />
      <path
        fill="#FF3D00"
        d="M6.3 14.7 12.9 19C14.7 14.7 18.9 12 24 12c3 0 5.7 1.1 7.8 3l5.7-5.7C34.1 6.1 29.3 4 24 4 16.3 4 9.6 8.3 6.3 14.7Z"
      />
      <path
        fill="#4CAF50"
        d="M24 44c5.1 0 9.8-2 13.3-5.2l-6.1-5.2C29.1 35.1 26.7 36 24 36c-5.2 0-9.6-3.3-11.3-8l-6.5 5C9.5 39.5 16.2 44 24 44Z"
      />
      <path
        fill="#1976D2"
        d="M43.6 20.5H42V20H24v8h11.3c-1 2.9-3 5.2-5.9 6.8l6.1 5.2C39.1 36.7 44 31 44 24c0-1.3-.1-2.4-.4-3.5Z"
      />
    </svg>
  );
}
