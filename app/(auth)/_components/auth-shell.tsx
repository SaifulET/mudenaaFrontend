import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";

type AuthShellProps = {
  children: ReactNode;
};

const navItems = [
  { href: "/sign-in", label: "Sign In" },
  { href: "/sign-up", label: "Create Account" },
  { href: "/forgot-password", label: "Recover" },
  { href: "/verify-otp", label: "Verify OTP" },
  { href: "/reset-password", label: "New Password" },
];

const ornaments = [
  {
    src: "/topleftcreateaccountBgIcon.png",
    alt: "",
    width: 86,
    height: 86,
    className: "left-[3%] top-16 hidden opacity-12 md:block lg:left-[4%]",
  },
  {
    src: "/middleleftcreateaccountBgicon.png",
    alt: "",
    width: 72,
    height: 72,
    className:
      "bottom-44 left-[18%] hidden opacity-12 md:block lg:left-[20%] lg:bottom-52",
  },
  {
    src: "/middlerightcreateaccountBgicon.png",
    alt: "",
    width: 54,
    height: 54,
    className:
      "right-[4%] top-[35%] hidden opacity-12 md:block lg:right-[6%]",
  },
  {
    src: "/bottomrightcreateaccountBgicon.png",
    alt: "",
    width: 86,
    height: 86,
    className:
      "bottom-28 right-[5%] hidden opacity-12 md:block lg:right-[6%] lg:bottom-32",
  },
];

export function AuthShell({ children }: AuthShellProps) {
  return (
    <div className="relative flex min-h-screen flex-col overflow-hidden bg-white text-slate-900">
      <header className="relative z-20 px-4 pt-4 sm:px-6 lg:px-10">
        <div className="flex w-full items-center justify-between gap-4 rounded-full border border-white/70 bg-white/90 px-4 py-3  sm:px-6">
          <Link href="/sign-in" className="shrink-0">
            <Image
              src="/navlogo.png"
              alt="Sureli"
              width={44}
              height={44}
              priority
            />
          </Link>

          <nav className="hidden items-center gap-5 text-sm font-medium text-slate-600 lg:flex">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="transition hover:text-[#FF0099]"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href="/sign-in"
              className="hidden text-sm font-semibold text-slate-700 transition hover:text-[#FF0099] sm:inline"
            >
              Log In
            </Link>
            <Link
              href="/sign-up"
              className="inline-flex items-center justify-center overflow-hidden rounded-full bg-[#FF0099] px-4 py-2 text-sm font-semibold text-white shadow-[0_0_0_1px_rgba(255,0,153,0.08),0_10px_24px_rgba(255,0,153,0.18)] transition hover:-translate-y-0.5 hover:shadow-[0_0_0_1px_rgba(255,0,153,0.12),0_14px_28px_rgba(255,0,153,0.22)]"
            >
              Start a Game
            </Link>
          </div>
        </div>
      </header>

      <main className="relative flex flex-1 items-center justify-center bg-[#F8FAFC] px-4 py-10 sm:px-6 lg:px-10">
        {ornaments.map((ornament, index) => (
          <Image
            key={ornament.src}
            src={ornament.src}
            alt={ornament.alt}
            width={ornament.width}
            height={ornament.height}
            aria-hidden="true"
            className={`auth-float absolute ${ornament.className}`}
            style={{ animationDelay: `${index * 1.1}s` }}
          />
        ))}

        <div className="relative z-10 flex w-full max-w-7xl flex-1 items-center justify-center">
          {children}
        </div>
      </main>

      <footer className="relative z-20 px-4 pb-4 sm:px-6 lg:px-10">
        <div className="flex w-full items-center justify-between gap-4 rounded-full border border-white/80 bg-white/90 px-4 py-3 shadow-[0_0_0_1px_rgba(15,23,42,0.03),0_10px_26px_rgba(15,23,42,0.06)] backdrop-blur sm:px-6">
          <div className="flex items-center gap-3 text-sm font-semibold text-slate-500">
            <Image src="/navlogo.png" alt="" width={28} height={28} aria-hidden="true" />
            <span>Sureli 2024</span>
          </div>

          <div className="hidden items-center gap-6 text-sm text-slate-500 sm:flex">
            <Link href="/forgot-password" className="transition hover:text-[#FF0099]">
              Privacy Policy
            </Link>
            <Link href="/reset-password" className="transition hover:text-[#FF0099]">
              Terms of Service
            </Link>
          </div>

          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center overflow-hidden rounded-full border border-[#FF0099]/15 bg-white text-slate-500 shadow-[0_0_0_1px_rgba(255,0,153,0.04),0_8px_18px_rgba(255,0,153,0.10)] transition hover:text-[#FF0099]"
            aria-label="Share"
          >
            <ShareIcon className="h-4 w-4" />
          </button>
        </div>
      </footer>
    </div>
  );
}

function ShareIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <circle cx="18" cy="5" r="3" />
      <circle cx="6" cy="12" r="3" />
      <circle cx="18" cy="19" r="3" />
      <path d="M8.6 13.5 15.4 17.5" />
      <path d="M15.4 6.5 8.6 10.5" />
    </svg>
  );
}
