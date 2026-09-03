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

export default function Home() {
  return (
    <div className="min-h-screen bg-concrete">
      <header className="flex items-center justify-between px-6 py-5 sm:px-12">
        <span className="font-display font-semibold text-xl text-ink tracking-tight">Crafteey</span>
        <Link href="/login" className="text-sm font-semibold text-steel hover:text-ink transition-colors">
          Sign In
        </Link>
      </header>

      {/* Hero — split panel: bold ink block carries the message, photo carries the proof */}
      <section className="grid sm:grid-cols-2">
        <div className="order-2 sm:order-1 bg-ink px-6 py-14 sm:px-12 sm:py-20 flex flex-col justify-center">
          <span className="inline-flex items-center gap-2 text-sm font-semibold text-signal mb-6">
            Now onboarding in Lagos
          </span>
          <h1 className="font-display font-semibold text-4xl sm:text-5xl text-white leading-[1.08] max-w-md">
            Steady work for vetted painters, plumbers &amp; electricians
          </h1>
          <p className="text-white/70 text-base mt-5 max-w-sm leading-relaxed">
            Crafteey sends real jobs straight to your phone. Get verified once, then get
            dispatched — no bidding wars, no chasing clients for payment.
          </p>
          <div className="mt-9 flex flex-col sm:flex-row gap-3">
            <Link
              href="/register"
              className="rounded-md bg-signal px-7 py-3.5 text-sm font-semibold text-ink text-center hover:bg-signal/90 transition-colors"
            >
              Join Crafteey
            </Link>
            <Link
              href="/login"
              className="rounded-md border border-white/25 px-7 py-3.5 text-sm font-semibold text-white text-center hover:bg-white/5 transition-colors"
            >
              Sign In
            </Link>
          </div>
        </div>

        <div className="order-1 sm:order-2 relative min-h-[280px] sm:min-h-0">
          <Image
            src="/hero-technicians.png"
            alt="Technicians working — plumber, painter, carpenter, and electrician on a job"
            fill
            priority
            sizes="(min-width: 640px) 50vw, 100vw"
            className="object-cover"
          />
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
