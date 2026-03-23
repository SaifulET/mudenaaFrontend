"use client";

import { useState } from "react";
import type { InputHTMLAttributes } from "react";

import { InputField } from "./auth-primitives";

type PasswordFieldProps = {
  label: string;
  rightLabel?: string;
  rightHref?: string;
} & Omit<InputHTMLAttributes<HTMLInputElement>, "type" | "size" | "icon" | "trailingIcon">;

export function PasswordField({
  label,
  rightLabel,
  rightHref,
  ...props
}: PasswordFieldProps) {
  const [visible, setVisible] = useState(false);

  return (
    <InputField
      {...props}
      label={label}
      type={visible ? "text" : "password"}
      icon="lock"
      rightLabel={rightLabel}
      rightHref={rightHref}
      trailingIcon={
        <button
          type="button"
          onClick={(event) => {
            event.preventDefault();
            event.stopPropagation();
            setVisible((current) => !current);
          }}
          aria-label={visible ? "Hide password" : "Show password"}
          aria-pressed={visible}
          className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-[#FFF0F8] text-slate-500 shadow-[0_0_0_1px_rgba(255,0,153,0.08)] transition hover:text-[#FF0099]"
        >
          {visible ? <EyeOffIcon /> : <EyeIcon />}
        </button>
      }
    />
  );
}

function EyeIcon() {
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
      <path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6S2 12 2 12Z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

function EyeOffIcon() {
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
      <path d="m3 3 18 18" />
      <path d="M10.6 10.7a3 3 0 0 0 4.2 4.2" />
      <path d="M9.9 5.1A10.9 10.9 0 0 1 12 5c6.5 0 10 7 10 7a17.6 17.6 0 0 1-4.1 4.8" />
      <path d="M6.2 6.3A18.2 18.2 0 0 0 2 12s3.5 7 10 7a10 10 0 0 0 5.2-1.5" />
    </svg>
  );
}
