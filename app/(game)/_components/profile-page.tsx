"use client";

import Image from "next/image";
import { useEffect, useId, useRef, useState } from "react";
import { useRouter } from "next/navigation";

import { DEMO_SESSION_STORAGE_KEY, defaultDemoSession, type DemoSession } from "@/lib/demo-session";

export function ProfilePage() {
  const router = useRouter();
  const dateInputRef = useRef<HTMLInputElement>(null);
  const avatarInputRef = useRef<HTMLInputElement>(null);
  const [activeTab, setActiveTab] = useState<"profile" | "password">("profile");
  const [profile, setProfile] = useState<DemoSession>(() => {
    if (typeof window === "undefined") {
      return defaultDemoSession;
    }

    const rawValue = window.localStorage.getItem(DEMO_SESSION_STORAGE_KEY);

    if (!rawValue) {
      return defaultDemoSession;
    }

    try {
      return JSON.parse(rawValue) as DemoSession;
    } catch {
      return defaultDemoSession;
    }
  });

  useEffect(() => {
    const rawValue = window.localStorage.getItem(DEMO_SESSION_STORAGE_KEY);

    if (!rawValue) {
      router.replace("/sign-in");
    }
  }, [router]);

  function saveProfile(nextProfile: DemoSession) {
    window.localStorage.setItem(DEMO_SESSION_STORAGE_KEY, JSON.stringify(nextProfile));
    setProfile(nextProfile);
  }

  function openDatePicker() {
    const input = dateInputRef.current as HTMLInputElement | null;

    if (!input) {
      return;
    }

    input.focus();

    if (typeof input.showPicker === "function") {
      input.showPicker();
      return;
    }

    input.click();
  }

  function handleDateChange(value: string) {
    if (!value) {
      const nextProfile = { ...profile, dateOfBirth: "" };
      setProfile(nextProfile);
      return;
    }

    const [year, month, day] = value.split("-");
    const formattedValue = `${day}/${month}/${year}`;
    setProfile((current) => ({ ...current, dateOfBirth: formattedValue }));
  }

  function handleAvatarChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      const avatarUrl = typeof reader.result === "string" ? reader.result : "";
      const nextProfile = { ...profile, avatarUrl };
      saveProfile(nextProfile);
    };

    reader.readAsDataURL(file);
    event.target.value = "";
  }

  return (
    <div className="px-4 py-8 sm:px-6 sm:py-10 lg:px-10">
      <div className="mx-auto max-w-[1180px]">
        <div className="mx-auto flex w-full max-w-[420px] flex-wrap rounded-[28px] bg-[#D7DEE9] p-1 sm:w-fit sm:flex-nowrap sm:rounded-full">
          <button
            type="button"
            onClick={() => setActiveTab("profile")}
            className={`flex-1 rounded-full px-6 py-3 text-sm font-semibold transition sm:px-8 sm:text-base ${
              activeTab === "profile"
                ? "bg-[#1E293B] text-white shadow-[0_10px_18px_rgba(15,23,42,0.16)]"
                : "text-slate-800"
            }`}
          >
            Profile
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("password")}
            className={`flex-1 rounded-full px-6 py-3 text-sm font-semibold transition sm:px-8 sm:text-base ${
              activeTab === "password"
                ? "bg-[#1E293B] text-white shadow-[0_10px_18px_rgba(15,23,42,0.16)]"
                : "text-slate-800"
            }`}
          >
            Change password
          </button>
        </div>

        {activeTab === "profile" ? (
          <div className="mt-10 grid gap-10 lg:mt-14 lg:grid-cols-[minmax(0,1fr)_340px]">
            <section className="order-2 grid gap-6 md:grid-cols-2 lg:order-1">
              <ProfileInput
                label="First Name (Arabic)"
                value={profile.firstName}
                onChange={(value) => setProfile((current) => ({ ...current, firstName: value }))}
              />
              <ProfileInput
                label="Last Name (Arabic)"
                value={profile.lastName}
                onChange={(value) => setProfile((current) => ({ ...current, lastName: value }))}
              />
              <ProfileInput
                label="Mobile Number"
                value={profile.phone}
                onChange={(value) => setProfile((current) => ({ ...current, phone: value }))}
              />
              <ProfileInput
                label="Email Address"
                value={profile.email}
                onChange={(value) => setProfile((current) => ({ ...current, email: value }))}
              />
              <ProfileInput
                label="Date of Birth"
                value={profile.dateOfBirth}
                onChange={(value) => setProfile((current) => ({ ...current, dateOfBirth: value }))}
                icon="calendar"
                dateInputRef={dateInputRef}
                onDateIconClick={openDatePicker}
                onDateChange={handleDateChange}
              />

              <div className="md:col-span-2 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    saveProfile(profile);
                  }}
                  className="inline-flex min-w-56 items-center justify-center rounded-2xl bg-[#FF0099] px-8 py-4 text-lg font-semibold text-white shadow-[0_12px_24px_rgba(255,0,153,0.18)] sm:text-xl"
                >
                  Save changes
                </button>
              </div>
            </section>

            <aside className="order-1 flex flex-col items-center text-center lg:order-2">
              <div className="relative">
                <div className="flex h-36 w-36 items-center justify-center rounded-full bg-[radial-gradient(circle_at_top,#f8f4ef_0%,#d8dce6_42%,#9ca3af_100%)] shadow-[0_18px_40px_rgba(15,23,42,0.14)] ring-4 ring-white sm:h-44 sm:w-44">
                  {profile.avatarUrl ? (
                    <div className="relative h-28 w-28 overflow-hidden rounded-full sm:h-36 sm:w-36">
                      <Image
                        src={profile.avatarUrl}
                        alt={`${profile.firstName} ${profile.lastName}`}
                        fill
                        sizes="144px"
                        className="object-cover"
                      />
                    </div>
                  ) : (
                    <div className="flex h-28 w-28 items-center justify-center rounded-full bg-[linear-gradient(135deg,#dbeafe_0%,#e5e7eb_45%,#f5f5f4_100%)] text-4xl font-black text-slate-700 sm:h-36 sm:w-36 sm:text-5xl">
                      {profile.firstName.slice(0, 1)}
                      {profile.lastName.slice(0, 1)}
                    </div>
                  )}
                </div>
                <input
                  ref={avatarInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleAvatarChange}
                />
                <button
                  type="button"
                  onClick={() => avatarInputRef.current?.click()}
                  className="absolute bottom-1 right-1 inline-flex h-11 w-11 items-center justify-center rounded-full bg-[#FF0099] text-white shadow-[0_12px_24px_rgba(255,0,153,0.22)] sm:bottom-3 sm:right-3 sm:h-12 sm:w-12"
                  aria-label="Change avatar"
                >
                  <CameraIcon />
                </button>
              </div>

              <h2 className="mt-6 text-3xl font-semibold text-slate-900 sm:mt-8 sm:text-4xl">
                {profile.firstName} {profile.lastName}
              </h2>
              <p className="mt-2 text-lg text-slate-500">{profile.email}</p>

              <button
                type="button"
                onClick={() => {
                  window.localStorage.removeItem(DEMO_SESSION_STORAGE_KEY);
                  router.push("/sign-in");
                }}
                className="mt-8 inline-flex items-center gap-3 rounded-2xl border border-[#FFCADF] px-6 py-4 text-xl font-semibold text-[#FF0099]"
              >
                <LogoutIcon />
                Sign out
              </button>
            </aside>
          </div>
        ) : (
          <section className="mx-auto mt-10 max-w-xl sm:mt-14">
            <div className="space-y-6">
              <PasswordInput label="Current password" />
              <PasswordInput label="New Password" />
              <PasswordInput label="Confirm password" />

              <button
                type="button"
                className="mt-4 inline-flex h-16 w-full items-center justify-center rounded-2xl bg-[#FF0099] px-8 text-xl font-semibold text-white shadow-[0_12px_24px_rgba(255,0,153,0.18)]"
              >
                change password
              </button>
            </div>
          </section>
        )}
      </div>
    </div>
  );
}

function ProfileInput({
  label,
  value,
  onChange,
  icon,
  dateInputRef,
  onDateIconClick,
  onDateChange,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  icon?: "calendar";
  dateInputRef?: React.RefObject<HTMLInputElement | null>;
  onDateIconClick?: () => void;
  onDateChange?: (value: string) => void;
}) {
  const dateInputId = useId();

  return (
    <label className="block">
      <span className="mb-3 block text-lg font-semibold text-slate-700">{label}</span>
      <span className="relative flex h-16 items-center justify-between rounded-2xl border border-slate-200 bg-white px-4 text-lg text-slate-800 shadow-[0_0_0_1px_rgba(15,23,42,0.02),0_10px_24px_rgba(15,23,42,0.04)]">
        <input
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className="h-full w-full bg-transparent outline-none"
        />
        {icon === "calendar" ? (
          <>
            <input
              id={dateInputId}
              ref={dateInputRef}
              type="date"
              className="pointer-events-none absolute right-0 top-0 h-full w-16 opacity-0"
              onChange={(event) => onDateChange?.(event.target.value)}
              tabIndex={-1}
              aria-hidden="true"
            />
            <button
              type="button"
              onClick={onDateIconClick}
              className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-slate-400 transition hover:bg-slate-50 hover:text-slate-500"
              aria-label={`Select ${label}`}
            >
              <CalendarIcon />
            </button>
          </>
        ) : null}
      </span>
    </label>
  );
}

function PasswordInput({ label }: { label: string }) {
  return (
    <label className="block">
      <span className="mb-3 block text-sm font-semibold text-slate-500">{label}</span>
      <span className="flex h-14 items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 shadow-[0_0_0_1px_rgba(15,23,42,0.02),0_10px_24px_rgba(15,23,42,0.04)]">
        <LockIcon />
        <input
          type="password"
          placeholder={label}
          className="h-full w-full bg-transparent text-base text-slate-800 outline-none placeholder:text-slate-300"
        />
      </span>
    </label>
  );
}

function CalendarIcon() {
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
      <rect x="3" y="4" width="18" height="18" rx="2" />
      <path d="M16 2v4" />
      <path d="M8 2v4" />
      <path d="M3 10h18" />
    </svg>
  );
}

function CameraIcon() {
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
      <path d="M4 7h4l2-2h4l2 2h4v12H4z" />
      <circle cx="12" cy="13" r="3.5" />
    </svg>
  );
}

function LockIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5 text-slate-300"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="5" y="11" width="14" height="10" rx="2" />
      <path d="M8 11V8a4 4 0 0 1 8 0v3" />
    </svg>
  );
}

function LogoutIcon() {
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
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
      <path d="M16 17l5-5-5-5" />
      <path d="M21 12H9" />
    </svg>
  );
}
