"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { useEffect, useState } from "react";

import { DEMO_SESSION_STORAGE_KEY, type DemoSession } from "@/lib/demo-session";
import { marketingNavItems, quickLinks, supportLinks } from "./marketing-data";

export function MarketingShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [currentHash, setCurrentHash] = useState("");
  const [session, setSession] = useState<DemoSession | null>(null);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  useEffect(() => {
    const updateHash = () => {
      setCurrentHash(window.location.hash);
    };

    updateHash();
    window.addEventListener("hashchange", updateHash);

    return () => {
      window.removeEventListener("hashchange", updateHash);
    };
  }, []);

  useEffect(() => {
    const syncSession = () => {
      const rawValue = window.localStorage.getItem(DEMO_SESSION_STORAGE_KEY);

      if (!rawValue) {
        setSession(null);
        return;
      }

      try {
        setSession(JSON.parse(rawValue) as DemoSession);
      } catch {
        setSession(null);
      }
    };

    syncSession();
    window.addEventListener("storage", syncSession);

    return () => {
      window.removeEventListener("storage", syncSession);
    };
  }, [pathname]);

  const hideReadyToPlayPaths = [
    "/how-it-works",
    "/categories",
    "/faq",
    "/about",
    "/profile",
    "/privacy-policy",
  ];
  const showReadyToPlay =
    !hideReadyToPlayPaths.includes(pathname) && !pathname.startsWith("/start-game");
  const readyToPlayHref = "/start-game";
  const isLandingRoute = pathname === "/" || pathname === "/landing";
  const showProfileNav = Boolean(session) && !isLandingRoute;
  const isStartGameRoute = pathname.startsWith("/start-game");
  const profileInitials = `${session?.firstName?.slice(0, 1) ?? ""}${session?.lastName?.slice(0, 1) ?? ""}`.toUpperCase();

  return (
    <div className="min-h-screen bg-white text-slate-900">
      <header className="sticky top-0 z-30 bg-white/90 px-3 py-3 backdrop-blur sm:px-6 sm:py-4 lg:px-10">
        <div className="mx-auto flex w-full items-center justify-between gap-3 rounded-full border border-white/80 bg-white/95 px-3 py-2.5 shadow-[0_0_0_1px_rgba(15,23,42,0.03),0_12px_26px_rgba(15,23,42,0.06)] sm:gap-4 sm:px-6 sm:py-3">
          <Link href="/" className="shrink-0">
            <Image
              src="/navlogo.png"
              alt="Sureli"
              width={44}
              height={44}
              priority
              className="h-9 w-9 sm:h-11 sm:w-11"
            />
          </Link>

          <nav className="hidden items-center gap-6 text-sm font-semibold text-slate-700 lg:flex">
            {marketingNavItems.map((item) => (
              <Link
                key={`${item.href}-${item.label}`}
                href={item.href}
                className={`transition hover:text-[#FF0099] ${
                  isActiveNavItem(pathname, currentHash, item.href)
                    ? "text-[#FF0099]"
                    : "text-slate-700"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2 sm:gap-3">
            <button
              type="button"
              onClick={() => setIsMobileNavOpen((currentValue) => !currentValue)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 text-slate-700 transition hover:border-[#FF0099] hover:text-[#FF0099] lg:hidden"
              aria-label="Toggle navigation menu"
              aria-expanded={isMobileNavOpen}
            >
              <MobileMenuIcon open={isMobileNavOpen} />
            </button>
            {showProfileNav ? (
              <Link href="/profile" className="inline-flex">
                <span className="inline-flex h-9 w-9 items-center justify-center overflow-hidden rounded-full bg-[linear-gradient(135deg,#dbeafe_0%,#f5f3ff_100%)] text-xs font-black text-slate-800 shadow-[0_10px_20px_rgba(15,23,42,0.12)] ring-2 ring-white sm:h-11 sm:w-11 sm:text-sm">
                  {session?.avatarUrl ? (
                    <Image
                      src={session.avatarUrl}
                      alt={`${session.firstName} ${session.lastName}`}
                      width={44}
                      height={44}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    profileInitials || "SU"
                  )}
                </span>
              </Link>
            ) : (
              <Link
                href="/sign-in"
                className="hidden text-sm font-semibold text-slate-700 transition hover:text-[#FF0099] sm:inline"
              >
                Log In
              </Link>
            )}
            <Link
              href={readyToPlayHref}
              className="inline-flex items-center justify-center overflow-hidden rounded-full bg-[#FF0099] px-3 py-2 text-xs font-semibold text-white shadow-[0_0_0_1px_rgba(255,0,153,0.08),0_10px_24px_rgba(255,0,153,0.18)] transition hover:-translate-y-0.5 hover:shadow-[0_0_0_1px_rgba(255,0,153,0.12),0_14px_28px_rgba(255,0,153,0.22)] sm:px-5 sm:py-2.5 sm:text-sm"
            >
              Start a Game
            </Link>
          </div>
        </div>

        {isMobileNavOpen ? (
          <div className="mt-3 rounded-[28px] border border-white/80 bg-white/95 p-4 shadow-[0_0_0_1px_rgba(15,23,42,0.03),0_12px_26px_rgba(15,23,42,0.06)] lg:hidden">
            <nav className="flex flex-col gap-2 text-sm font-semibold text-slate-700">
              {marketingNavItems.map((item) => (
                <Link
                  key={`mobile-${item.href}-${item.label}`}
                  href={item.href}
                  onClick={() => setIsMobileNavOpen(false)}
                  className={`rounded-2xl px-4 py-3 transition hover:bg-[#FFF1F8] hover:text-[#FF0099] ${
                    isActiveNavItem(pathname, currentHash, item.href)
                      ? "bg-[#FFF1F8] text-[#FF0099]"
                      : "text-slate-700"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
        ) : null}
      </header>

      <main>{children}</main>

      {showReadyToPlay ? (
        <section
          id="ready-to-play"
          className="mt-20 bg-[#EAF1FB] px-4 py-20 text-center sm:px-6 lg:px-10"
        >
          <div className="mx-auto max-w-3xl">
            <h2 className="text-4xl font-semibold tracking-[-0.03em] text-slate-900 sm:text-5xl">
              Ready to Play?
            </h2>
            <p className="mt-4 text-lg text-slate-500">
              Gather your friends, pick your categories, and let the trivia showdown begin.
            </p>
            <Link
              href="/start-game"
              className="mt-8 inline-flex min-w-64 items-center justify-center rounded-full bg-[#FF0099] px-8 py-4 text-base font-semibold uppercase tracking-[0.18em] text-white shadow-[0_0_0_1px_rgba(255,0,153,0.08),0_12px_24px_rgba(255,0,153,0.18)] transition hover:-translate-y-0.5"
            >
              Start A Game Now
            </Link>
          </div>
        </section>
      ) : null}

      <footer className="bg-white px-4 pb-8 pt-12 sm:px-6 sm:pt-14 lg:px-[80px]">
        <div
          className={`${
            isStartGameRoute ? "mx-auto max-w-[1120px]" : ""
          } grid gap-10 border-b border-slate-200 pb-12 text-slate-500 sm:pb-14 lg:grid-cols-[1.4fr_1fr_1fr_1fr]`}
        >
          <div className="">
            <div className="inline-flex rounded-md bg-[#FF0099] px-4 py-2 text-sm font-semibold text-white">
              SURELI
            </div>
            <p className="mt-6 text-base leading-8">
              The ultimate social trivia game for friends and family. Challenge your
              knowledge!
            </p>
          </div>

          <FooterLinkColumn title="Quick Links" links={quickLinks} />
          <FooterLinkColumn title="Support" links={supportLinks} />

          <div>
            <h3 className="text-lg font-semibold text-slate-900">Follow Us</h3>
            <div className="mt-6 flex items-center gap-4">
              <SocialLink label="Instagram">
                <InstagramIcon />
              </SocialLink>
              <SocialLink label="X">
                <XIcon />
              </SocialLink>
              <SocialLink label="YouTube">
                <YouTubeIcon />
              </SocialLink>
            </div>
          </div>
        </div>

        <p className="pt-8 text-center text-sm text-slate-400">
          &copy; 2025 Sureli. All rights reserved.
        </p>
      </footer>
    </div>
  );
}

function isActiveNavItem(pathname: string, currentHash: string, href: string) {
  if (href === "/") {
    return (pathname === "/" || pathname === "/landing") && currentHash === "";
  }

  if (href === "/how-it-works") {
    return pathname === "/how-it-works";
  }

  if (href === "/categories") {
    return pathname === "/categories";
  }

  if (href === "/faq") {
    return pathname === "/faq";
  }

  if (href === "/about") {
    return pathname === "/about";
  }

  const [hrefPath, hrefHash = ""] = href.split("#");
  return pathname === hrefPath && currentHash === `#${hrefHash}`;
}

function FooterLinkColumn({
  title,
  links,
}: {
  title: string;
  links: Array<{ href: string; label: string }>;
}) {
  return (
    <div>
      <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
      <div className="mt-6 flex flex-col gap-4">
        {links.map((link) => (
          <Link
            key={`${link.href}-${link.label}`}
            href={link.href}
            className="text-base transition hover:text-[#FF0099]"
          >
            {link.label}
          </Link>
        ))}
      </div>
    </div>
  );
}

function SocialLink({
  children,
  label,
}: {
  children: ReactNode;
  label: string;
}) {
  return (
    <a
      href="#"
      aria-label={label}
      className="inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-slate-200 text-slate-700 transition hover:border-[#FF0099] hover:text-[#FF0099]"
    >
      {children}
    </a>
  );
}

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function XIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M4 4 20 20" />
      <path d="M20 4 4 20" />
    </svg>
  );
}

function YouTubeIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor" aria-hidden="true">
      <path d="M21.6 7.2a2.9 2.9 0 0 0-2-2C17.8 4.7 12 4.7 12 4.7s-5.8 0-7.6.5a2.9 2.9 0 0 0-2 2A31.4 31.4 0 0 0 2 12a31.4 31.4 0 0 0 .4 4.8 2.9 2.9 0 0 0 2 2c1.8.5 7.6.5 7.6.5s5.8 0 7.6-.5a2.9 2.9 0 0 0 2-2A31.4 31.4 0 0 0 22 12a31.4 31.4 0 0 0-.4-4.8ZM10 15.5v-7l6 3.5-6 3.5Z" />
    </svg>
  );
}

function MobileMenuIcon({ open }: { open: boolean }) {
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
      {open ? (
        <>
          <path d="M6 6 18 18" />
          <path d="M18 6 6 18" />
        </>
      ) : (
        <>
          <path d="M4 7h16" />
          <path d="M4 12h16" />
          <path d="M4 17h16" />
        </>
      )}
    </svg>
  );
}
