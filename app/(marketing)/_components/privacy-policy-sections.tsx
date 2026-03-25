const policySections: Array<{
  title: string;
  description: string;
  icon: "user" | "lock" | "spark";
  items?: string[];
}> = [
  {
    title: "Information We Collect",
    description:
      "We collect information that you provide directly to us when creating an account or participating in challenges. This includes:",
    icon: "user" as const,
    items: [
      "Account details (username, email address, and profile picture)",
      "Game performance statistics and trivia history",
      "Device information (browser type, operating system, and IP address)",
      "Communications with our support team",
    ],
  },
  {
    title: "How We Use Your Information",
    description:
      "We use your information to keep Sureli running smoothly, personalize your sessions, and improve the game experience for everyone.",
    icon: "spark" as const,
    items: [
      "Create and manage your player profile",
      "Track scores, subscriptions, and purchased game packs",
      "Recommend relevant categories and game experiences",
      "Send account updates, payment confirmations, and support responses",
    ],
  },
  {
    title: "Data Security",
    description:
      "We implement robust security measures to protect your data. This includes end-to-end encryption for sensitive data transfers and regular security audits of our infrastructure. While no method of transmission over the internet is 100% secure, we strive to use commercially acceptable means to protect your personal information.",
    icon: "lock" as const,
  },
] as const;

export function PrivacyPolicySections() {
  return (
    <section className="px-4 pb-10 pt-8 sm:px-6 sm:pb-12 sm:pt-10 lg:px-10 lg:pb-16 lg:pt-14">
      <div className="mx-auto max-w-[860px]">
        <header className="text-center">
          <h1 className="text-[34px] font-semibold tracking-[-0.04em] text-slate-900 sm:text-4xl lg:text-5xl">
            Privacy Policy
          </h1>
          <p className="mt-5 text-left text-base leading-8 text-slate-600 sm:mt-6 sm:text-lg sm:leading-9">
            At Sureli, your privacy is our top priority. This Privacy Policy outlines
            how we collect, use, and safeguard your personal information when you use
            our trivia platform. We are committed to transparency and ensuring that
            your gaming experience is both fun and secure.
          </p>
        </header>

        <div className="mt-10 space-y-10 sm:mt-12 sm:space-y-12">
          {policySections.map((section) => (
            <article key={section.title}>
              <div className="flex items-start gap-3 sm:items-center">
                <span className="mt-0.5 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-[#FFF1F8] text-[#FF0099] sm:mt-0">
                  <PolicyIcon kind={section.icon} />
                </span>
                <h2 className="text-[22px] leading-8 font-semibold text-slate-900 sm:text-[24px]">
                  {section.title}
                </h2>
              </div>

              <p className="mt-4 text-base leading-8 text-slate-600 sm:mt-5 sm:text-lg sm:leading-9">
                {section.description}
              </p>

              {section.items ? (
                <ul className="mt-4 space-y-2.5 pl-5 text-base leading-8 text-slate-600 marker:text-slate-400 sm:mt-5 sm:space-y-3 sm:text-lg">
                  {section.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              ) : null}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function PolicyIcon({ kind }: { kind: "user" | "lock" | "spark" }) {
  if (kind === "user") {
    return (
      <svg
        viewBox="0 0 24 24"
        className="h-4 w-4"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M16 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
        <circle cx="10" cy="7" r="3" />
      </svg>
    );
  }

  if (kind === "spark") {
    return (
      <svg
        viewBox="0 0 24 24"
        className="h-4 w-4"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="m12 3 1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8L12 3Z" />
      </svg>
    );
  }

  return (
    <svg
      viewBox="0 0 24 24"
      className="h-4 w-4"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="5" y="11" width="14" height="10" rx="2" />
      <path d="M8 11V8a4 4 0 0 1 8 0v3" />
    </svg>
  );
}
