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
    <div className="min-h-screen bg-slate-50">
      <header className="flex items-center justify-between px-6 py-5 sm:px-12">
        <span className="font-bold text-xl text-slate-900 tracking-tight">Crafteey</span>
        <Link href="/login" className="text-sm font-semibold text-slate-700 hover:text-slate-900">
          Sign In
        </Link>
      </header>

      {/* Hero — background photo with text sitting directly on it */}
      <section className="relative isolate min-h-[560px] sm:min-h-[680px] px-6 pt-10 pb-16 sm:px-12 sm:pt-16 sm:pb-24 flex flex-col justify-center text-center overflow-hidden">
        {/* Background image */}
        <div className="absolute inset-0">
          <Image
            src="/hero-technicians.png"
            alt="Technicians working — plumber, painter, carpenter, and electrician on a job"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          {/* Subtle dark gradient, strongest in the center where the text sits,
              so the photo stays vivid at the edges. */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/40 to-black/10" />
        </div>

        <div className="relative z-10 max-w-3xl mx-auto">
          <h1 className="font-bold text-4xl sm:text-6xl text-white leading-[1.1] drop-shadow-[0_2px_12px_rgba(0,0,0,0.6)]">
            Steady work for vetted painters, plumbers & electricians
          </h1>
          <p className="text-slate-100 text-lg mt-5 max-w-xl mx-auto leading-relaxed drop-shadow-[0_1px_6px_rgba(0,0,0,0.6)]">
            Crafteey sends real jobs straight to your phone. Get verified once, then get
            dispatched — no bidding wars, no chasing clients for payment.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center items-center">
            <Link
              href="/register"
              className="w-full sm:w-auto rounded-xl bg-slate-900 px-8 py-3.5 text-sm font-semibold text-white shadow-lg shadow-black/30 hover:bg-slate-800 transition-colors text-center"
            >
              Join Crafteey
            </Link>
            <Link
              href="/login"
              className="w-full sm:w-auto rounded-xl border border-white/40 bg-white/90 backdrop-blur-sm px-8 py-3.5 text-sm font-semibold text-slate-900 hover:bg-white transition-colors text-center"
            >
              Sign In
            </Link>
          </div>
        </div>
      </section>

      {/* Value props */}
      <section className="px-6 py-16 sm:px-12 bg-slate-900">
        <h2 className="font-bold text-2xl sm:text-3xl text-white text-center mb-12">
          Built for people who do real work
        </h2>
        <div className="grid gap-6 sm:grid-cols-3 max-w-5xl mx-auto">
          {VALUE_PROPS.map((item) => (
            <div
              key={item.title}
              className="rounded-2xl bg-slate-800/60 border border-slate-700/50 p-6"
            >
              <h3 className="font-semibold text-white text-lg mb-2">{item.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">{item.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Trades supported */}
      <section className="px-6 py-16 sm:px-12 text-center">
        <h2 className="font-bold text-2xl sm:text-3xl text-slate-900 mb-8">
          Trades we're onboarding
        </h2>
        <div className="flex flex-wrap gap-3 justify-center max-w-2xl mx-auto">
          {TRADES.map((trade) => (
            <span
              key={trade}
              className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm"
            >
              {trade}
            </span>
          ))}
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="px-6 py-16 sm:px-12 text-center">
        <div className="max-w-xl mx-auto rounded-3xl bg-gradient-to-br from-slate-900 to-slate-800 p-10 sm:p-12">
          <h2 className="font-bold text-2xl sm:text-3xl text-white mb-3">
            Ready to get started?
          </h2>
          <p className="text-slate-400 mb-7">
            Registration takes a few minutes. You'll need your NIN, a school certificate,
            and a few photos of past work.
          </p>
          <Link
            href="/register"
            className="inline-block rounded-xl bg-amber-500 px-8 py-3.5 text-sm font-semibold text-slate-900 hover:bg-amber-400 transition-colors"
          >
            Register Now
          </Link>
        </div>
      </section>

      <footer className="px-6 py-10 sm:px-12 text-center">
        <div className="flex flex-wrap justify-center gap-6 mb-4">
          <a href="#" className="text-sm text-slate-500 hover:text-slate-700">About</a>
          <a href="#" className="text-sm text-slate-500 hover:text-slate-700">Contact</a>
          <a href="#" className="text-sm text-slate-500 hover:text-slate-700">Privacy Policy</a>
          <a href="#" className="text-sm text-slate-500 hover:text-slate-700">Terms of Service</a>
        </div>
        <p className="text-xs text-slate-400">
          © {new Date().getFullYear()} Crafteey Technologies. All rights reserved.
        </p>
      </footer>
    </div>
  );
}