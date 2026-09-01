"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const STATS = [
  { value: "500+", label: "Verified professionals" },
  { value: "8", label: "Trades covered" },
  { value: "< 2 hrs", label: "Avg. dispatch time" },
  { value: "4.8/5", label: "Average client rating" },
];

const HOW_IT_WORKS = [
  {
    title: "Apply and get verified",
    body: "Submit your NIN, a school certificate, and photos of past work. Our team checks every application by hand before you're allowed onto the platform.",
  },
  {
    title: "Go online when you're free",
    body: "Flip one switch in the app. You're only sent jobs while you're online, in your trade, close to where you already are.",
  },
  {
    title: "Get dispatched and paid",
    body: "Accept the job, do the work, mark it complete. Payment is tracked from the moment the job is posted, so you're never left chasing a client for money.",
  },
];

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
  {
    title: "Work close to home",
    body: "Jobs are matched to your base area first. Less time on the road, more time earning.",
  },
];

const TRADES = ["Plumbing", "Painting", "Electrical", "Carpentry", "Tiling", "AC Repair", "Masonry", "Welding"];

const TESTIMONIALS = [
  {
    quote:
      "I used to lose half my week bidding for jobs I'd never get. Now the work just shows up, already priced, in my area.",
    name: "Tunde A.",
    role: "Electrician, Lagos",
  },
  {
    quote:
      "The vetting was strict — certificate, NIN, photos of old jobs. Annoying at first, but it means clients actually trust me when I arrive.",
    name: "Blessing O.",
    role: "Painter, Ogun",
  },
  {
    quote:
      "Getting paid used to be the hardest part of the job. With Crafteey the money is tracked from day one, so I'm not the one following up.",
    name: "Chidi N.",
    role: "Plumber, Lagos",
  },
];

const FAQS = [
  {
    q: "What do I need to apply?",
    a: "Your National Identification Number, a photo of your NIN slip or card, a school certificate, and at least three photos of past work. Most applicants finish the form in under ten minutes.",
  },
  {
    q: "How long does verification take?",
    a: "Usually 24 to 48 hours. Our team reviews every application individually rather than approving automatically, so a busy day can push it slightly past that.",
  },
  {
    q: "Do I have to be online all the time?",
    a: "No. You choose when you're online and able to receive jobs. Go offline any time — for a few hours, a day, or longer — and you simply won't be sent anything until you switch back.",
  },
  {
    q: "How does payment work?",
    a: "Every job's price is set before you accept it, and payment is tracked against the job from the moment it's posted. Once you mark a job complete, it moves into your payout record.",
  },
  {
    q: "Which areas does Crafteey currently cover?",
    a: "We're onboarding technicians across Lagos and Ogun state first, with more areas planned as the verified technician base grows.",
  },
];

function CheckIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`shrink-0 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-slate-200 py-5">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between gap-4 text-left"
        aria-expanded={open}
      >
        <span className="font-semibold text-slate-900">{q}</span>
        <span className="text-slate-400">
          <ChevronIcon open={open} />
        </span>
      </button>
      {open && <p className="mt-3 text-sm text-slate-500 leading-relaxed max-w-2xl">{a}</p>}
    </div>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-50">
      <style jsx global>{`
        @keyframes fadeUp {
          from {
            opacity: 0;
            transform: translateY(14px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .hero-in {
          animation: fadeUp 0.7s ease-out both;
        }
        @media (prefers-reduced-motion: reduce) {
          .hero-in {
            animation: none;
          }
        }
      `}</style>

      <header className="flex items-center justify-between px-6 py-5 sm:px-12">
        <span className="font-bold text-xl text-slate-900 tracking-tight">Crafteey</span>
        <Link href="/login" className="text-sm font-semibold text-slate-700 hover:text-slate-900">
          Sign In
        </Link>
      </header>

      {/* Hero */}
      <section className="relative isolate min-h-[560px] sm:min-h-[680px] px-6 pt-10 pb-16 sm:px-12 sm:pt-16 sm:pb-24 flex flex-col justify-center text-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/hero-technicians.png"
            alt="Technicians working — plumber, painter, carpenter, and electrician on a job"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/40 to-black/10" />
        </div>

        <div className="relative z-10 max-w-3xl mx-auto">
          <h1
            className="hero-in font-bold text-4xl sm:text-6xl text-white leading-[1.1] drop-shadow-[0_2px_12px_rgba(0,0,0,0.6)]"
            style={{ animationDelay: "0ms" }}
          >
            Steady work for vetted painters, plumbers & electricians
          </h1>
          <p
            className="hero-in text-slate-100 text-lg mt-5 max-w-xl mx-auto leading-relaxed drop-shadow-[0_1px_6px_rgba(0,0,0,0.6)]"
            style={{ animationDelay: "120ms" }}
          >
            Crafteey sends real jobs straight to your phone. Get verified once, then get
            dispatched — no bidding wars, no chasing clients for payment.
          </p>
          <div
            className="hero-in mt-8 flex flex-col sm:flex-row gap-3 justify-center items-center"
            style={{ animationDelay: "220ms" }}
          >
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

      {/* Trust stats strip */}
      <section className="border-y border-slate-200 bg-white px-6 py-8 sm:px-12">
        <div className="max-w-5xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8 text-center">
          {STATS.map((s) => (
            <div key={s.label}>
              <p className="font-bold text-2xl sm:text-3xl text-slate-900">{s.value}</p>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="px-6 py-16 sm:px-12">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-bold text-2xl sm:text-3xl text-slate-900 text-center mb-3">
            How Crafteey works
          </h2>
          <p className="text-slate-500 text-center max-w-xl mx-auto mb-12">
            Three steps between where you are now and your next paid job.
          </p>
          <div className="grid gap-8 sm:grid-cols-3">
            {HOW_IT_WORKS.map((step, i) => (
              <div key={step.title} className="relative pl-4 border-l-2 border-slate-200 sm:border-l-0 sm:pl-0">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-900 text-white text-sm font-bold mb-4">
                  {i + 1}
                </span>
                <h3 className="font-semibold text-slate-900 text-lg mb-2">{step.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{step.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Value props */}
      <section className="px-6 py-16 sm:px-12 bg-slate-900">
        <h2 className="font-bold text-2xl sm:text-3xl text-white text-center mb-12">
          Built for people who do real work
        </h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 max-w-6xl mx-auto">
          {VALUE_PROPS.map((item) => (
            <div key={item.title} className="rounded-2xl bg-slate-800/60 border border-slate-700/50 p-6">
              <h3 className="font-semibold text-white text-lg mb-2">{item.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">{item.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Trades supported */}
      <section className="px-6 py-16 sm:px-12 text-center">
        <h2 className="font-bold text-2xl sm:text-3xl text-slate-900 mb-3">
          Trades we're onboarding
        </h2>
        <p className="text-slate-500 max-w-xl mx-auto mb-8">
          Each trade is reviewed by people who understand the work, not a generic checklist.
        </p>
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

      {/* About */}
      <section className="px-6 py-16 sm:px-12 bg-white">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-bold text-2xl sm:text-3xl text-slate-900 mb-6">
            Why we built Crafteey
          </h2>
          <div className="space-y-5 text-slate-600 leading-relaxed">
            <p>
              Skilled trades in Nigeria run on word of mouth. If your plumber is good,
              he's booked for weeks; if you've never used one before, you're rolling the
              dice on a name from a WhatsApp group. Crafteey exists to close that gap —
              for clients who want to know who's showing up, and for technicians who are
              tired of being judged by a phone call instead of their work.
            </p>
            <p>
              Every technician on the platform goes through the same process: identity
              verification against a National Identification Number, a school certificate
              on file, and photographic proof of past jobs. Applications are reviewed by
              people, not approved automatically, because a certificate can be faked in a
              way a careful human reviewer is less likely to miss.
            </p>
            <p>
              Once approved, technicians aren't left to fend for themselves in a bidding
              free-for-all. Jobs arrive already priced and matched to trade and location,
              and payment is tracked from the moment a job is posted — not negotiated
              after the fact, on the client's doorstep.
            </p>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="px-6 py-16 sm:px-12 bg-slate-50">
        <h2 className="font-bold text-2xl sm:text-3xl text-slate-900 text-center mb-12">
          What technicians are saying
        </h2>
        <div className="grid gap-6 sm:grid-cols-3 max-w-6xl mx-auto">
          {TESTIMONIALS.map((t) => (
            <div key={t.name} className="rounded-2xl bg-white border border-slate-100 shadow-sm p-6">
              <p className="text-slate-700 text-sm leading-relaxed mb-5">"{t.quote}"</p>
              <p className="text-sm font-semibold text-slate-900">{t.name}</p>
              <p className="text-xs text-slate-400">{t.role}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="px-6 py-16 sm:px-12 bg-white">
        <div className="max-w-2xl mx-auto">
          <h2 className="font-bold text-2xl sm:text-3xl text-slate-900 text-center mb-10">
            Common questions
          </h2>
          <div>
            {FAQS.map((f) => (
              <FaqItem key={f.q} q={f.q} a={f.a} />
            ))}
          </div>
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
          <ul className="mt-6 flex flex-wrap justify-center gap-x-6 gap-y-2 text-xs text-slate-400">
            <li className="flex items-center gap-1.5">
              <span className="text-emerald-400"><CheckIcon /></span>
              No listing fees
            </li>
            <li className="flex items-center gap-1.5">
              <span className="text-emerald-400"><CheckIcon /></span>
              Jobs matched to your trade
            </li>
            <li className="flex items-center gap-1.5">
              <span className="text-emerald-400"><CheckIcon /></span>
              Tracked payouts
            </li>
          </ul>
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