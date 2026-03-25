export function AboutSections() {
  return (
    <section className="px-4 pb-12 pt-14 sm:px-6 lg:px-[160px] lg:pb-16 lg:pt-20">
      <div className="">
        <header className="text-center">
          <h1 className="font-normal text-[60px] leading-[60px] tracking-[-1.5px] align-middle">
            About <span className="text-[#FF0099]">Sureli</span>
          </h1>
          <p className="mx-auto mt-5 max-w-3xl text-lg leading-8 text-slate-400">
            We&apos;re on a mission to make every hangout unforgettable.
          </p>
        </header>

        <section className="mt-12 rounded-[30px] border border-slate-200 bg-white p-6 shadow-[0_10px_30px_rgba(15,23,42,0.05)] sm:p-8">
          <div className="flex items-start gap-4">
            <div className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-slate-100 text-slate-500">
              <HeartIcon />
            </div>
            <div>
              <h2 className="text-3xl font-semibold text-slate-900">Our Story</h2>
              <p className="mt-4 text-lg leading-9 text-slate-500">
                Sureli is a platform dedicated to fostering creativity and collaboration.
                Our mission is to provide tools that empower individuals to bring
                their ideas to life. We believe that everyone has a unique voice and
                that technology should be a bridge, not a barrier, to expressing it.
              </p>
            </div>
          </div>
        </section>

        <section className="mt-14">
          <h2 className="text-4xl font-semibold tracking-[-0.04em] text-slate-900">
            Get in Touch
          </h2>

          <div className="mt-6 rounded-[30px] border border-slate-200 bg-white p-6 shadow-[0_10px_30px_rgba(15,23,42,0.05)] sm:p-8">
            <div className="flex items-start gap-4">
              <div className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-slate-100 text-slate-500">
                <MessageIcon />
              </div>
              <div className="w-full">
                <h3 className="text-2xl font-semibold text-slate-900">
                  We&apos;d love to hear from you!
                </h3>

                <form className="mt-6 space-y-4">
                  <TextInput placeholder="Enter Your Name" />
                  <TextInput type="email" placeholder="Email" />

                  <div className="relative">
                    <select className="h-14 w-full appearance-none rounded-2xl border border-slate-200 bg-slate-50 px-4 pr-12 text-base text-slate-700 outline-none transition focus:border-[#FF0099]">
                      <option>Kuwait(+965)</option>
                      <option>Bangladesh(+880)</option>
                      <option>United States(+1)</option>
                    </select>
                    <span className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-slate-400">
                      <ChevronIcon />
                    </span>
                  </div>

                  <TextInput type="tel" placeholder="Telephone Number" />

                  <textarea
                    placeholder="Your Message"
                    rows={7}
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 text-base text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-[#FF0099]"
                  />

                  <div className="pt-4 text-center">
                    <button
                      type="button"
                      className="inline-flex min-w-64 items-center justify-center rounded-2xl bg-[#FF0099] px-8 py-4 text-2xl font-semibold text-white shadow-[0_0_0_1px_rgba(255,0,153,0.08),0_12px_24px_rgba(255,0,153,0.18)] transition hover:-translate-y-0.5"
                    >
                      Send
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <button
              type="button"
              className="inline-flex h-14 items-center justify-center gap-3 rounded-2xl bg-slate-100 px-6 text-base font-semibold text-slate-700 transition hover:text-[#FF0099]"
            >
              <TwitterIcon />
              Follow on Twitter
            </button>
            <button
              type="button"
              className="inline-flex h-14 items-center justify-center gap-3 rounded-2xl bg-slate-100 px-6 text-base font-semibold text-slate-700 transition hover:text-[#FF0099]"
            >
              <DiscordIcon />
              Join Discord
            </button>
          </div>
        </section>
      </div>
    </section>
  );
}

function TextInput({
  placeholder,
  type = "text",
}: {
  placeholder: string;
  type?: string;
}) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      className="h-14 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 text-base text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-[#FF0099]"
    />
  );
}

function HeartIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-6 w-6"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="m12 21-1.6-1.5C5 14.6 2 11.8 2 8.3 2 5.5 4.2 3.5 7 3.5c1.6 0 3.1.8 4 2.1.9-1.3 2.4-2.1 4-2.1 2.8 0 5 2 5 4.8 0 3.5-3 6.3-8.4 11.2L12 21Z" />
    </svg>
  );
}

function MessageIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-6 w-6"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2Z" />
    </svg>
  );
}

function ChevronIcon() {
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
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

function TwitterIcon() {
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
      <path d="M18 5h3l-7 7 8 7h-6l-5-4-4 4H4l8-8-8-6h6l4 3 4-3Z" />
    </svg>
  );
}

function DiscordIcon() {
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
      <path d="M8.5 8.5A13.6 13.6 0 0 1 12 8c1.2 0 2.4.2 3.5.5" />
      <path d="M8 15c1.2.8 2.6 1.2 4 1.2S14.8 15.8 16 15" />
      <path d="M7 5.5 5 18l3.5-2.5" />
      <path d="M17 5.5 19 18l-3.5-2.5" />
      <path d="M8 18h8" />
      <circle cx="9.5" cy="12" r="1" fill="currentColor" stroke="none" />
      <circle cx="14.5" cy="12" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}
