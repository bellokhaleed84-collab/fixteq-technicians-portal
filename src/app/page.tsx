import Image from "next/image";
import Link from "next/link";

const VALUE_PROPS = [
  {
    title: "Verified pros only",
    body: "Every profile on Crafteey is reviewed before it goes live. Real ID, real proof of skill — no strangers showing up unvetted.",
  },
  {
    title: "No bidding wars",
    body: "Work comes to you already priced. No racing to underbid ten other people for the same job.",
  },
  {
    title: "Get paid on time",
    body: "Jobs are tracked from start to finish, so payment doesn't depend on chasing a client after the work is done.",
  },
];

const TRADES = ["Plumbing", "Painting", "Electrical", "Carpentry", "Tiling", "AC Repair", "Masonry", "Welding"];

const HOW_IT_WORKS = [
  {
    step: "01",
    title: "Apply and get verified",
    body: "Submit your NIN, a school certificate, and a few photos of past work. Our team reviews every application by hand.",
  },
  {
    step: "02",
    title: "Go online",
    body: "Once approved, flip on availability whenever you're ready to take jobs — nothing lands in your queue until you're online.",
  },
  {
    step: "03",
    title: "Get dispatched, get paid",
    body: "Accept a job at a price that's already set. Do the work, mark it complete, and payment follows — no invoicing, no chasing.",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-concrete">
      <header className="flex items-center justify-between px-6 py-5 sm:px-12">
        <span className="font-display font-semibold text-xl text-ink tracking-tight">Crafteey</span>
        <Link href="/login" className="text-sm font-semibold text-steel hover:text-ink transition-colors">
          Sign In
        </Link>
      </header>

      {/* Hero — full-bleed photo, centered message, single entrance animation */}
      <section className="relative isolate min-h-[560px] sm:min-h-[680px] px-6 py-16 sm:px-12 flex flex-col items-center justify-center text-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/hero-technicians.png"
            alt="Technicians working — plumber, painter, carpenter, and electrician on a job"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-ink/80 via-ink/55 to-ink/80" />
        </div>

        <div className="animate-hero-in relative z-10 max-w-2xl">
          <span className="inline-flex items-center gap-2 text-sm font-semibold text-signal mb-6">
            Now onboarding in Lagos
          </span>
          <h1 className="font-display font-semibold text-4xl sm:text-6xl text-white leading-[1.08]">
            Steady work for vetted painters, plumbers &amp; electricians
          </h1>
          <p className="text-white/75 text-base sm:text-lg mt-5 max-w-xl mx-auto leading-relaxed">
            Crafteey sends real jobs straight to your phone. Get verified once, then get
            dispatched — no bidding wars, no chasing clients for payment.
          </p>
          <div className="mt-9 flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/register"
              className="rounded-md bg-signal px-7 py-3.5 text-sm font-semibold text-ink text-center hover:bg-signal/90 transition-colors"
            >
              Join Crafteey
            </Link>
            <Link
              href="/login"
              className="rounded-md border border-white/30 px-7 py-3.5 text-sm font-semibold text-white text-center hover:bg-white/10 transition-colors"
            >
              Sign In
            </Link>
          </div>
        </div>
      </section>

      {/* Value props */}
      <section className="px-6 py-16 sm:px-12 bg-ink">
        <h2 className="font-display font-semibold text-2xl sm:text-3xl text-white mb-10 max-w-md">
          Built for people who do real work
        </h2>
        <div className="grid gap-4 sm:grid-cols-3 max-w-5xl">
          {VALUE_PROPS.map((item) => (
            <div
              key={item.title}
              className="rounded-md border border-white/10 bg-white/[0.03] p-6 border-l-4 border-l-signal"
            >
              <h3 className="font-semibold text-white text-base mb-2">{item.title}</h3>
              <p className="text-white/60 text-sm leading-relaxed">{item.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Why we exist — company story, gives the page real substance */}
      <section className="px-6 py-16 sm:px-12">
        <div className="max-w-2xl">
          <h2 className="font-display font-semibold text-2xl sm:text-3xl text-ink mb-6">
            Why Crafteey exists
          </h2>
          <div className="space-y-4 text-steel text-base leading-relaxed">
            <p>
              Skilled tradespeople in Lagos have always been in demand — but finding
              consistent, fairly-paid work has usually meant word of mouth, informal
              referrals, and a lot of unpaid time between jobs. On the other side,
              clients hiring a plumber or electrician off a phone number shared in a
              group chat have no real way to know who they&apos;re letting into their home.
            </p>
            <p>
              Crafteey exists to close that gap. We verify every technician&apos;s
              identity and track record before they ever appear in a client&apos;s search,
              and in return, we send them real, already-priced jobs instead of leaving
              them to compete on price in a bidding war. It&apos;s a more serious way to
              run a trade business — for the people doing the work, and the people
              hiring them.
            </p>
          </div>
        </div>
      </section>

      {/* How it works — genuinely sequential, so numbering earns its place */}
      <section className="px-6 py-16 sm:px-12 bg-ink">
        <h2 className="font-display font-semibold text-2xl sm:text-3xl text-white mb-10 max-w-md">
          How it works
        </h2>
        <div className="grid gap-8 sm:grid-cols-3 max-w-5xl">
          {HOW_IT_WORKS.map((item) => (
            <div key={item.step}>
              <span className="font-display text-sm font-semibold text-signal">{item.step}</span>
              <h3 className="font-semibold text-white text-base mt-2 mb-2">{item.title}</h3>
              <p className="text-white/60 text-sm leading-relaxed">{item.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Trades supported */}
      <section className="px-6 py-16 sm:px-12">
        <h2 className="font-display font-semibold text-2xl sm:text-3xl text-ink mb-8">
          Trades we&apos;re onboarding
        </h2>
        <div className="flex flex-wrap gap-2.5 max-w-2xl">
          {TRADES.map((trade) => (
            <span
              key={trade}
              className="rounded-md border border-steel/25 bg-panel px-4 py-2 text-sm font-medium text-steel"
            >
              {trade}
            </span>
          ))}
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="px-6 py-16 sm:px-12">
        <div className="max-w-xl rounded-lg bg-ink p-10 sm:p-12">
          <h2 className="font-display font-semibold text-2xl sm:text-3xl text-white mb-3">
            Ready to get started?
          </h2>
          <p className="text-white/60 mb-7 leading-relaxed">
            Registration takes a few minutes. You&apos;ll need your NIN, a school certificate,
            and a few photos of past work.
          </p>
          <Link
            href="/register"
            className="inline-block rounded-md bg-signal px-7 py-3.5 text-sm font-semibold text-ink hover:bg-signal/90 transition-colors"
          >
            Register Now
          </Link>
        </div>
      </section>

      <footer className="px-6 py-10 sm:px-12">
        <div className="flex flex-wrap gap-6 mb-4">
          <a href="#" className="text-sm text-steel hover:text-ink transition-colors">About</a>
          <a href="#" className="text-sm text-steel hover:text-ink transition-colors">Contact</a>
          <a href="#" className="text-sm text-steel hover:text-ink transition-colors">Privacy Policy</a>
          <a href="#" className="text-sm text-steel hover:text-ink transition-colors">Terms of Service</a>
        </div>
        <p className="text-xs text-steel/70">
          © {new Date().getFullYear()} Crafteey Technologies. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
