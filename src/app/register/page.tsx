"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { createUserWithEmailAndPassword, deleteUser } from "firebase/auth";
import { auth } from "@/lib/firebase/clientApp";

type Step1Data = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
};

type Step2Data = {
  nin: string;
  ninDocument: File | null;
};

type Step3Data = {
  category: string;
  yearsExperience: string;
  baseArea: string;
  certificate: File | null;
  workProof: File[];
};

const STEPS = [
  { label: "Account" },
  { label: "Verification" },
  { label: "Portfolio" },
];

const TRADE_OPTIONS = [
  "Plumber",
  "Electrician",
  "Carpenter",
  "Painter",
  "Mason",
  "AC Technician",
  "Generator Technician",
  "Other",
];

export default function RegisterPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [step1, setStep1] = useState<Step1Data>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const [step2, setStep2] = useState<Step2Data>({ nin: "", ninDocument: null });
  const [step3, setStep3] = useState<Step3Data>({
    category: "",
    yearsExperience: "",
    baseArea: "",
    certificate: null,
    workProof: [],
  });

  function validateStep1(): string | null {
    if (!step1.firstName || !step1.lastName || !step1.email || !step1.phone || !step1.password || !step1.confirmPassword) {
      return "Please fill in all fields.";
    }
    if (!step1.email.includes("@")) return "Please enter a valid email address.";
    if (step1.password.length < 6) return "Password must be at least 6 characters.";
    if (step1.password !== step1.confirmPassword) return "Passwords do not match.";
    return null;
  }

  function validateStep2(): string | null {
    if (!/^\d{11}$/.test(step2.nin)) return "Enter a valid 11-digit NIN.";
    if (!step2.ninDocument) return "Upload a photo of your NIN slip or card.";
    return null;
  }

  function validateStep3(): string | null {
    if (!step3.category) return "Select your trade.";
    if (!step3.yearsExperience || Number(step3.yearsExperience) < 0) return "Enter your years of experience.";
    if (!step3.baseArea) return "Enter your base area.";
    if (!step3.certificate) return "Upload your school certificate.";
    if (step3.workProof.length < 3) return "Upload at least 3 photos of past work.";
    return null;
  }

  function handleNext() {
    setError(null);
    const validationError = step === 1 ? validateStep1() : validateStep2();
    if (validationError) {
      setError(validationError);
      return;
    }
    setStep((s) => s + 1);
  }

  function handleBack() {
    setError(null);
    setStep((s) => s - 1);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    const validationError = validateStep3();
    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);
    let createdUser = null;

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, step1.email, step1.password);
      createdUser = userCredential.user;
      const idToken = await createdUser.getIdToken();

      // TODO(file uploads): upload step2.ninDocument, step3.certificate, and
      // step3.workProof to Firebase Storage and use the real download URLs
      // here instead of these placeholders.
      const idDocumentUrl = "PENDING_UPLOAD";
      const portfolioUrls = step3.workProof.map((_, i) => `PENDING_UPLOAD_${i}`);

      const res = await fetch("/api/technicians", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${idToken}`,
        },
        body: JSON.stringify({
          name: `${step1.firstName} ${step1.lastName}`,
          email: step1.email,
          phone: step1.phone,
          categories: [step3.category],
          yearsExperience: Number(step3.yearsExperience),
          baseArea: step3.baseArea,
          idDocumentUrl,
          portfolioUrls,
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Failed to create technician profile");
      }

      router.push("/dashboard");
    } catch (err: any) {
      // Roll back the Firebase account if profile creation failed, so we
      // don't leave an orphaned auth user with no matching Mongo profile.
      if (createdUser) {
        await deleteUser(createdUser).catch(() => {});
      }
      if (err.code === "auth/email-already-in-use") {
        setError("An account with this email already exists.");
      } else {
        setError(err.message || "Something went wrong. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-slate-950 flex">
      {/* Left panel — brand story, hidden on small screens */}
      <div className="hidden lg:flex lg:w-2/5 flex-col justify-between p-12 bg-gradient-to-br from-slate-900 via-slate-950 to-black relative overflow-hidden">
        <div className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-amber-500/10 blur-3xl" />
        <div className="absolute bottom-0 left-0 h-64 w-64 rounded-full bg-amber-400/5 blur-3xl" />

        <div className="relative">
          <span className="font-bold text-2xl text-white tracking-tight">Crafteey</span>
        </div>

        <div className="relative space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-4 py-1.5 text-xs font-semibold text-amber-400">
            Now onboarding
          </div>
          <h1 className="text-4xl font-bold text-white leading-tight">
            A few steps.<br />Real verification.<br />Real work after.
          </h1>
          <p className="text-slate-400 text-base leading-relaxed max-w-sm">
            We check every applicant properly, so clients can trust who shows up —
            and so you get taken seriously too.
          </p>
        </div>

        <p className="relative text-xs text-slate-600">
          © {new Date().getFullYear()} Crafteey Technologies
        </p>
      </div>

      {/* Right panel — the wizard */}
      <div className="flex-1 flex items-center justify-center p-4 sm:p-8 bg-slate-50">
        <div className="w-full max-w-md">
          <div className="lg:hidden text-center mb-6">
            <span className="font-bold text-2xl text-slate-900 tracking-tight">Crafteey</span>
          </div>

          {/* Step indicator */}
          <div className="flex items-center justify-center gap-2 mb-6">
            {STEPS.map((s, i) => {
              const num = i + 1;
              const isActive = num === step;
              const isDone = num < step;
              return (
                <div key={s.label} className="flex items-center gap-2">
                  <div
                    className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold transition-colors ${
                      isDone
                        ? "bg-emerald-500 text-white"
                        : isActive
                          ? "bg-slate-900 text-white"
                          : "bg-slate-200 text-slate-500"
                    }`}
                  >
                    {isDone ? "✓" : num}
                  </div>
                  {num < STEPS.length && (
                    <div className={`h-0.5 w-8 ${isDone ? "bg-emerald-500" : "bg-slate-200"}`} />
                  )}
                </div>
              );
            })}
          </div>
          <p className="text-center text-xs font-semibold text-slate-500 mb-6 uppercase tracking-wide">
            Step {step} of 3 — {STEPS[step - 1].label}
          </p>

          <div className="bg-white rounded-2xl shadow-xl shadow-slate-900/5 border border-slate-100 p-8">
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="rounded-xl border-l-4 border-red-500 bg-red-50 px-4 py-3">
                  <p className="text-sm font-medium text-red-700">{error}</p>
                </div>
              )}

              {step === 1 && (
                <>
                  <div>
                    <h2 className="text-xl font-bold text-slate-900">Create your account</h2>
                    <p className="text-slate-500 text-sm mt-1">Let's start with the basics.</p>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1.5">First name</label>
                      <input
                        type="text"
                        autoComplete="given-name"
                        className="block w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500/40 focus:border-amber-500"
                        value={step1.firstName}
                        onChange={(e) => setStep1({ ...step1, firstName: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1.5">Last name</label>
                      <input
                        type="text"
                        autoComplete="family-name"
                        className="block w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500/40 focus:border-amber-500"
                        value={step1.lastName}
                        onChange={(e) => setStep1({ ...step1, lastName: e.target.value })}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">Email address</label>
                    <input
                      type="email"
                      autoComplete="email"
                      className="block w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500/40 focus:border-amber-500"
                      value={step1.email}
                      onChange={(e) => setStep1({ ...step1, email: e.target.value })}
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">Phone number</label>
                    <input
                      type="tel"
                      autoComplete="tel"
                      placeholder="e.g. 0803 123 4567"
                      className="block w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500/40 focus:border-amber-500"
                      value={step1.phone}
                      onChange={(e) => setStep1({ ...step1, phone: e.target.value })}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1.5">Password</label>
                      <input
                        type="password"
                        autoComplete="new-password"
                        className="block w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500/40 focus:border-amber-500"
                        value={step1.password}
                        onChange={(e) => setStep1({ ...step1, password: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1.5">Confirm</label>
                      <input
                        type="password"
                        autoComplete="new-password"
                        className="block w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500/40 focus:border-amber-500"
                        value={step1.confirmPassword}
                        onChange={(e) => setStep1({ ...step1, confirmPassword: e.target.value })}
                      />
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={handleNext}
                    className="w-full rounded-xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-slate-900/20 hover:bg-slate-800 transition-colors"
                  >
                    Continue
                  </button>
                </>
              )}

              {step === 2 && (
                <>
                  <div>
                    <h2 className="text-xl font-bold text-slate-900">Identity verification</h2>
                    <p className="text-slate-500 text-sm mt-1">We need your NIN to confirm who you are.</p>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                      National Identification Number (NIN)
                    </label>
                    <input
                      type="text"
                      inputMode="numeric"
                      maxLength={11}
                      placeholder="11-digit NIN"
                      className="block w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500/40 focus:border-amber-500"
                      value={step2.nin}
                      onChange={(e) => setStep2({ ...step2, nin: e.target.value.replace(/\D/g, "") })}
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                      NIN slip or card (photo)
                    </label>
                    <label className="flex flex-col items-center justify-center gap-1 rounded-xl border-2 border-dashed border-slate-300 bg-slate-50 px-4 py-6 text-center cursor-pointer hover:border-amber-400 transition-colors">
                      <input
                        type="file"
                        accept="image/*,application/pdf"
                        className="hidden"
                        onChange={(e) => setStep2({ ...step2, ninDocument: e.target.files?.[0] ?? null })}
                      />
                      {step2.ninDocument ? (
                        <span className="text-sm font-medium text-emerald-600">✓ {step2.ninDocument.name}</span>
                      ) : (
                        <>
                          <span className="text-sm font-semibold text-slate-700">Tap to upload</span>
                          <span className="text-xs text-slate-400">Photo or PDF</span>
                        </>
                      )}
                    </label>
                  </div>

                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={handleBack}
                      className="flex-1 rounded-xl border border-slate-300 px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-100 transition-colors"
                    >
                      Back
                    </button>
                    <button
                      type="button"
                      onClick={handleNext}
                      className="flex-1 rounded-xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-slate-900/20 hover:bg-slate-800 transition-colors"
                    >
                      Continue
                    </button>
                  </div>
                </>
              )}

              {step === 3 && (
                <>
                  <div>
                    <h2 className="text-xl font-bold text-slate-900">Qualifications & work</h2>
                    <p className="text-slate-500 text-sm mt-1">
                      Tell us your trade, and show us your certificate and past work.
                    </p>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">Trade</label>
                    <select
                      className="block w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500/40 focus:border-amber-500"
                      value={step3.category}
                      onChange={(e) => setStep3({ ...step3, category: e.target.value })}
                    >
                      <option value="">Select your trade</option>
                      {TRADE_OPTIONS.map((t) => (
                        <option key={t} value={t}>
                          {t}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                        Years of experience
                      </label>
                      <input
                        type="number"
                        min={0}
                        className="block w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500/40 focus:border-amber-500"
                        value={step3.yearsExperience}
                        onChange={(e) => setStep3({ ...step3, yearsExperience: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1.5">Base area</label>
                      <input
                        type="text"
                        placeholder="e.g. Ikeja, Lagos"
                        className="block w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500/40 focus:border-amber-500"
                        value={step3.baseArea}
                        onChange={(e) => setStep3({ ...step3, baseArea: e.target.value })}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                      School certificate
                    </label>
                    <label className="flex flex-col items-center justify-center gap-1 rounded-xl border-2 border-dashed border-slate-300 bg-slate-50 px-4 py-6 text-center cursor-pointer hover:border-amber-400 transition-colors">
                      <input
                        type="file"
                        accept="image/*,application/pdf"
                        className="hidden"
                        onChange={(e) => setStep3({ ...step3, certificate: e.target.files?.[0] ?? null })}
                      />
                      {step3.certificate ? (
                        <span className="text-sm font-medium text-emerald-600">✓ {step3.certificate.name}</span>
                      ) : (
                        <>
                          <span className="text-sm font-semibold text-slate-700">Tap to upload</span>
                          <span className="text-xs text-slate-400">Photo or PDF</span>
                        </>
                      )}
                    </label>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                      Proof of past work ({step3.workProof.length}/3 minimum)
                    </label>
                    <label className="flex flex-col items-center justify-center gap-1 rounded-xl border-2 border-dashed border-slate-300 bg-slate-50 px-4 py-6 text-center cursor-pointer hover:border-amber-400 transition-colors">
                      <input
                        type="file"
                        accept="image/*"
                        multiple
                        className="hidden"
                        onChange={(e) =>
                          setStep3({ ...step3, workProof: [...step3.workProof, ...Array.from(e.target.files ?? [])] })
                        }
                      />
                      <span className="text-sm font-semibold text-slate-700">Tap to add photos</span>
                      <span className="text-xs text-slate-400">At least 3 photos</span>
                    </label>
                    {step3.workProof.length > 0 && (
                      <div className="mt-2 flex flex-wrap gap-2">
                        {step3.workProof.map((file, i) => (
                          <span
                            key={i}
                            className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600"
                          >
                            {file.name}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={handleBack}
                      className="flex-1 rounded-xl border border-slate-300 px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-100 transition-colors"
                    >
                      Back
                    </button>
                    <button
                      type="submit"
                      disabled={loading}
                      className="flex-1 rounded-xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-slate-900/20 hover:bg-slate-800 transition-colors disabled:opacity-50"
                    >
                      {loading ? "Submitting..." : "Submit application"}
                    </button>
                  </div>
                </>
              )}
            </form>

            {step === 1 && (
              <p className="mt-6 text-center text-sm text-slate-500">
                Already have an account?{" "}
                <Link href="/login" className="font-semibold text-slate-900 underline underline-offset-2">
                  Sign in
                </Link>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}