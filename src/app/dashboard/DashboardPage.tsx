"use client";

import Link from "next/link";
import { useState, useEffect, useCallback } from "react";
import { EarningsPage } from "./earnings/EarningsPage";
import { SettingsPage } from "./settings/SettingsPage";
import { useAuth } from "@/contexts/AuthContext";

// ── Types ────────────────────────────────────────────────────────────────

export type JobStatus = "new" | "accepted" | "completed";

export type Job = {
  _id: string;
  technicianUid: string | null;
  category: string;
  clientName: string;
  clientPhone: string;
  address: string;
  scheduledFor: string;
  price: number;
  description: string;
  status: JobStatus;
  completedAt?: string;
};

export type Payout = {
  id: string;
  date: string;
  amount: number;
  status: "paid" | "processing";
};

type Page = "queue" | "earnings" | "settings";

// ── Helpers ──────────────────────────────────────────────────────────────

export function formatNaira(amount: number) {
  return `₦${amount.toLocaleString("en-NG")}`;
}

function mapsUrl(address: string) {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
}

function telUrl(phone: string) {
  return `tel:${phone.replace(/\s/g, "")}`;
}

const STATUS_STYLES: Record<JobStatus, string> = {
  new: "bg-amber-100 text-amber-700",
  accepted: "bg-blue-100 text-blue-700",
  completed: "bg-emerald-100 text-emerald-700",
};

const STATUS_LABEL: Record<JobStatus, string> = {
  new: "New",
  accepted: "Accepted",
  completed: "Completed",
};

export const CHECKLIST = [
  { label: "Account details", done: true },
  { label: "Identity verification (NIN)", done: true },
  { label: "School certificate", done: true },
  { label: "Proof of past work", done: true },
];

// ── Page ─────────────────────────────────────────────────────────────────

export default function DashboardPage() {
  const { user, technician, loading, getIdToken } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <p className="text-sm text-slate-400">Loading...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <div className="text-center">
          <p className="text-sm text-slate-500 mb-4">You need to sign in to view your dashboard.</p>
          <Link href="/login" className="text-sm font-semibold text-slate-900 underline">
            Sign in
          </Link>
        </div>
      </div>
    );
  }

  if (!technician) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <div className="text-center max-w-sm">
          <p className="text-sm text-slate-500 mb-4">
            We couldn't find an application on file for this account.
          </p>
          <Link href="/register" className="text-sm font-semibold text-slate-900 underline">
            Start your application
          </Link>
        </div>
      </div>
    );
  }

  if (technician.status === "pending") {
    return <PendingState technician={technician} />;
  }

  if (technician.status !== "approved") {
    // rejected, suspended, blacklisted
    return <RejectedState />;
  }

  return <ApprovedDashboard technician={technician} getIdToken={getIdToken} />;
}

// ── Rejected ─────────────────────────────────────────────────────────────

function RejectedState() {
  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 text-center">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-red-100">
          <span className="text-red-600 text-2xl">✕</span>
        </div>
        <h1 className="text-xl font-bold text-slate-900 mb-2">Application not approved</h1>
        <p className="text-slate-500 text-sm mb-6">
          Your application didn't meet our verification requirements this time. Contact
          support if you think this is a mistake.
        </p>
        <Link
          href="#"
          className="inline-block rounded-xl bg-slate-900 px-6 py-3 text-sm font-semibold text-white hover:bg-slate-800 transition-colors"
        >
          Contact Support
        </Link>
      </div>
    </div>
  );
}

// ── Pending ──────────────────────────────────────────────────────────────

function PendingState({ technician }: { technician: any }) {
  const firstName = technician.name?.split(" ")[0] ?? "there";
  const submittedAt = technician.createdAt ? new Date(technician.createdAt) : new Date();

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-xl shadow-slate-900/10 border border-slate-100 p-8 text-center">
          <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full border-4 border-amber-400 bg-amber-50">
            <span className="text-amber-500 text-2xl animate-pulse">⏳</span>
          </div>

          <h1 className="text-xl font-bold text-slate-900">Thanks, {firstName}</h1>
          <p className="text-slate-500 text-sm mt-2 mb-6">
            Your application is under review. This usually takes 24–48 hours. We'll notify
            you the moment it's ready.
          </p>

          <div className="text-left rounded-xl border border-slate-200 bg-slate-50 p-4 space-y-2.5">
            {CHECKLIST.map((item) => (
              <div key={item.label} className="flex items-center gap-2.5">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-500 text-white text-xs">
                  ✓
                </span>
                <span className="text-sm text-slate-700">{item.label}</span>
              </div>
            ))}
          </div>

          <p className="text-xs text-slate-400 mt-6">
            Submitted{" "}
            {submittedAt.toLocaleDateString(undefined, {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </p>
        </div>

        <p className="text-center mt-6">
          <Link href="#" className="text-sm font-medium text-slate-400 hover:text-slate-300">
            Sign out
          </Link>
        </p>
      </div>
    </div>
  );
}

// ── Approved dashboard ───────────────────────────────────────────────────

function ApprovedDashboard({
  technician,
  getIdToken,
}: {
  technician: any;
  getIdToken: () => Promise<string | null>;
}) {
  const [isOnline, setIsOnline] = useState(true);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [jobsLoading, setJobsLoading] = useState(true);
  const [page, setPage] = useState<Page>("queue");
  const [selectedJobId, setSelectedJobId] = useState<string | null>(null);

  const firstName = technician.name?.split(" ")[0] ?? "";
  const tradeLabel = (technician.categories ?? []).join(", ");

  const fetchJobs = useCallback(async () => {
    const token = await getIdToken();
    if (!token) return;
    const res = await fetch("/api/jobs", { headers: { Authorization: `Bearer ${token}` } });
    if (res.ok) {
      const data = await res.json();
      setJobs(data.map((j: any) => ({ ...j, _id: j._id.toString() })));
    }
    setJobsLoading(false);
  }, [getIdToken]);

  useEffect(() => {
    fetchJobs();
  }, [fetchJobs]);

  const selectedJob = jobs.find((j) => j._id === selectedJobId) ?? null;

  const newJobs = jobs.filter((j) => j.status === "new");
  const activeJobs = jobs.filter((j) => j.status === "accepted");
  const completedJobs = jobs.filter((j) => j.status === "completed");

  const earningsThisWeek = completedJobs.reduce((sum, j) => sum + j.price, 0);
  const pendingPayout = activeJobs.reduce((sum, j) => sum + j.price, 0);

  const payouts: Payout[] = completedJobs.map((j) => ({
    id: j._id,
    date: j.completedAt ?? "",
    amount: j.price,
    status: "paid",
  }));

  async function respondToJob(id: string, accept: boolean) {
    const token = await getIdToken();
    if (!token) return;
    await fetch(`/api/jobs/${id}/respond`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify({ accept }),
    });
    if (!accept) setSelectedJobId(null);
    await fetchJobs();
  }

  async function completeJob(id: string) {
    const token = await getIdToken();
    if (!token) return;
    await fetch(`/api/jobs/${id}/complete`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
    });
    await fetchJobs();
  }

  if (selectedJob) {
    return (
      <JobDetailPage
        job={selectedJob}
        onBack={() => setSelectedJobId(null)}
        onRespond={respondToJob}
        onComplete={completeJob}
      />
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="sticky top-0 z-10 bg-white border-b border-slate-100">
        <div className="max-w-2xl mx-auto px-4 py-4 flex items-center justify-between">
          <span className="font-bold text-xl text-slate-900 tracking-tight">Crafteey</span>
          <div className="flex items-center gap-3">
            <div className="text-right">
              <p className="text-sm font-semibold text-slate-900 leading-tight">{firstName}</p>
              <p className="text-xs text-slate-400 leading-tight">{tradeLabel}</p>
            </div>
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-900 text-white text-sm font-bold">
              {firstName.charAt(0)}
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-6 pb-28 space-y-6">
        {page === "queue" &&
          (jobsLoading ? (
            <p className="text-sm text-slate-400 text-center py-10">Loading jobs...</p>
          ) : (
            <QueuePage
              isOnline={isOnline}
              onToggleOnline={() => setIsOnline((v) => !v)}
              earningsThisWeek={earningsThisWeek}
              pendingPayout={pendingPayout}
              completedCount={completedJobs.length}
              activeJobs={[...newJobs, ...activeJobs]}
              completedJobs={completedJobs}
              isOnlineGate={isOnline}
              onSelectJob={setSelectedJobId}
            />
          ))}

        {page === "earnings" && (
          <EarningsPage pendingPayout={pendingPayout} payouts={payouts} />
        )}

        {page === "settings" && <SettingsPage technician={technician} />}
      </main>

      <BottomNav page={page} onChange={setPage} newJobCount={newJobs.length} />
    </div>
  );
}

// ── Bottom nav ───────────────────────────────────────────────────────────

function BottomNav({
  page,
  onChange,
  newJobCount,
}: {
  page: Page;
  onChange: (p: Page) => void;
  newJobCount: number;
}) {
  const items: { id: Page; label: string; icon: (active: boolean) => React.ReactNode; badge?: number }[] = [
    { id: "queue", label: "Job queue", icon: (a) => <QueueIcon active={a} />, badge: newJobCount },
    { id: "earnings", label: "Earnings", icon: (a) => <WalletIcon active={a} /> },
    { id: "settings", label: "Settings", icon: (a) => <SettingsIcon active={a} /> },
  ];

  return (
    <nav className="fixed bottom-0 inset-x-0 z-10 bg-white border-t border-slate-100 pb-[env(safe-area-inset-bottom)]">
      <div className="max-w-2xl mx-auto grid grid-cols-3">
        {items.map((item) => {
          const active = page === item.id;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onChange(item.id)}
              className="relative flex flex-col items-center gap-1 py-2.5"
            >
              {item.icon(active)}
              <span
                className={`text-[11px] font-semibold ${
                  active ? "text-slate-900" : "text-slate-400"
                }`}
              >
                {item.label}
              </span>
              {!!item.badge && (
                <span className="absolute top-1.5 right-1/2 translate-x-4 rounded-full bg-amber-500 px-1.5 py-0.5 text-[9px] font-bold text-white">
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
}

function QueueIcon({ active }: { active: boolean }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={active ? "#0f172a" : "#94a3b8"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="16" rx="2" />
      <path d="M3 9h18" />
      <path d="M8 14h.01M12 14h4" />
    </svg>
  );
}

function WalletIcon({ active }: { active: boolean }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={active ? "#0f172a" : "#94a3b8"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 7H5a2 2 0 0 1 0-4h13v4" />
      <path d="M4 7v11a2 2 0 0 0 2 2h14v-6" />
      <path d="M17 14h.01" />
      <path d="M14 12h6v4h-6a2 2 0 0 1 0-4Z" />
    </svg>
  );
}

function SettingsIcon({ active }: { active: boolean }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={active ? "#0f172a" : "#94a3b8"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1Z" />
    </svg>
  );
}

function BackIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0f172a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M19 12H5" />
      <path d="M12 19l-7-7 7-7" />
    </svg>
  );
}

function PinIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.362 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.338 1.85.573 2.81.7A2 2 0 0 1 22 16.92Z" />
    </svg>
  );
}

function MessageIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2Z" />
    </svg>
  );
}

// ── Queue page ───────────────────────────────────────────────────────────

function QueuePage({
  isOnline,
  onToggleOnline,
  earningsThisWeek,
  pendingPayout,
  completedCount,
  activeJobs,
  completedJobs,
  isOnlineGate,
  onSelectJob,
}: {
  isOnline: boolean;
  onToggleOnline: () => void;
  earningsThisWeek: number;
  pendingPayout: number;
  completedCount: number;
  activeJobs: Job[];
  completedJobs: Job[];
  isOnlineGate: boolean;
  onSelectJob: (id: string) => void;
}) {
  const [subTab, setSubTab] = useState<"active" | "history">("active");

  const visibleActiveJobs = activeJobs.filter(
    (j) => j.status !== "new" || isOnlineGate
  );

  return (
    <>
      <div className="rounded-2xl bg-white border border-slate-100 shadow-xl shadow-slate-900/5 p-5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span
            className={`h-2.5 w-2.5 rounded-full ${isOnline ? "bg-emerald-500" : "bg-slate-300"}`}
          />
          <div>
            <p className="text-sm font-bold text-slate-900">
              {isOnline ? "You're online" : "You're offline"}
            </p>
            <p className="text-xs text-slate-400">
              {isOnline ? "You can receive new job requests" : "Go online to start receiving jobs"}
            </p>
          </div>
        </div>
        <button
          type="button"
          role="switch"
          aria-checked={isOnline}
          onClick={onToggleOnline}
          className={`relative h-7 w-12 shrink-0 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-amber-500/40 ${
            isOnline ? "bg-emerald-500" : "bg-slate-200"
          }`}
        >
          <span
            className={`absolute top-0.5 h-6 w-6 rounded-full bg-white shadow transition-transform ${
              isOnline ? "translate-x-5" : "translate-x-0.5"
            }`}
          />
        </button>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <StatCard label="This week" value={formatNaira(earningsThisWeek)} />
        <StatCard label="Pending payout" value={formatNaira(pendingPayout)} />
        <StatCard label="Jobs done" value={String(completedCount)} />
      </div>

      <div className="flex gap-1 rounded-xl bg-slate-100 p-1">
        <SubTabButton active={subTab === "active"} onClick={() => setSubTab("active")}>
          Active
        </SubTabButton>
        <SubTabButton active={subTab === "history"} onClick={() => setSubTab("history")}>
          History
        </SubTabButton>
      </div>

      {subTab === "active" ? (
        visibleActiveJobs.length === 0 ? (
          <EmptyState
            title={isOnlineGate ? "No jobs right now" : "You're offline"}
            body={
              isOnlineGate
                ? "Stay online and new requests will show up here."
                : "Go online above to start receiving job requests."
            }
          />
        ) : (
          <div className="space-y-3">
            {visibleActiveJobs.map((job) => (
              <JobCard key={job._id} job={job} onSelect={onSelectJob} />
            ))}
          </div>
        )
      ) : completedJobs.length === 0 ? (
        <EmptyState title="No completed jobs yet" body="Jobs you finish will show up here." />
      ) : (
        <div className="space-y-3">
          {completedJobs.map((job) => (
            <JobCard key={job._id} job={job} onSelect={onSelectJob} />
          ))}
        </div>
      )}
    </>
  );
}

function SubTabButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex-1 rounded-lg px-3 py-2 text-sm font-semibold transition-colors ${
        active ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-700"
      }`}
    >
      {children}
    </button>
  );
}

function EmptyState({ title, body }: { title: string; body: string }) {
  return (
    <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-8 text-center">
      <p className="text-sm font-semibold text-slate-700">{title}</p>
      <p className="text-xs text-slate-400 mt-1">{body}</p>
    </div>
  );
}

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl bg-white border border-slate-100 shadow-sm p-4">
      <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">
        {label}
      </p>
      <p className="text-lg font-bold text-slate-900 mt-1">{value}</p>
    </div>
  );
}

function JobCard({ job, onSelect }: { job: Job; onSelect: (id: string) => void }) {
  return (
    <button
      type="button"
      onClick={() => onSelect(job._id)}
      className="w-full text-left rounded-2xl bg-white border border-slate-100 shadow-sm p-4 hover:border-slate-200 transition-colors"
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-bold text-slate-900">{job.clientName}</p>
          <p className="text-xs text-slate-400">{job.address}</p>
        </div>
        <span
          className={`shrink-0 rounded-full px-2.5 py-1 text-[11px] font-semibold ${STATUS_STYLES[job.status]}`}
        >
          {STATUS_LABEL[job.status]}
        </span>
      </div>

      <p className="text-sm text-slate-600 mt-3">{job.description}</p>

      <div className="flex items-center justify-between mt-3 text-xs text-slate-500">
        <span>{job.status === "completed" ? `Completed ${job.completedAt}` : job.scheduledFor}</span>
        <span className="font-bold text-slate-900">{formatNaira(job.price)}</span>
      </div>
    </button>
  );
}

// ── Job detail page ──────────────────────────────────────────────────────

function JobDetailPage({
  job,
  onBack,
  onRespond,
  onComplete,
}: {
  job: Job;
  onBack: () => void;
  onRespond: (id: string, accept: boolean) => void;
  onComplete: (id: string) => void;
}) {
  return (
    <div className="min-h-screen bg-slate-50">
      <header className="sticky top-0 z-10 bg-white border-b border-slate-100">
        <div className="max-w-2xl mx-auto px-4 py-4 flex items-center gap-3">
          <button
            type="button"
            onClick={onBack}
            aria-label="Back"
            className="flex h-9 w-9 items-center justify-center rounded-full hover:bg-slate-100 transition-colors -ml-1.5"
          >
            <BackIcon />
          </button>
          <h1 className="text-base font-bold text-slate-900">Job details</h1>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-6 space-y-4">
        <div className="rounded-2xl bg-white border border-slate-100 shadow-sm p-5">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-base font-bold text-slate-900">{job.clientName}</p>
              <p className="text-xs text-slate-400 mt-0.5">{job.category}</p>
            </div>
            <span
              className={`shrink-0 rounded-full px-2.5 py-1 text-[11px] font-semibold ${STATUS_STYLES[job.status]}`}
            >
              {STATUS_LABEL[job.status]}
            </span>
          </div>

          <p className="text-sm text-slate-600 mt-4">{job.description}</p>

          <div className="grid grid-cols-2 gap-3 mt-4 pt-4 border-t border-slate-100">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">
                {job.status === "completed" ? "Completed" : "Scheduled"}
              </p>
              <p className="text-sm font-medium text-slate-900 mt-0.5">
                {job.status === "completed" ? job.completedAt : job.scheduledFor}
              </p>
            </div>
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">
                Payout
              </p>
              <p className="text-sm font-bold text-slate-900 mt-0.5">{formatNaira(job.price)}</p>
            </div>
          </div>
        </div>

        <div className="rounded-2xl bg-white border border-slate-100 shadow-sm p-5">
          <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-400 mb-2">
            Location
          </p>
          <div className="flex items-start gap-2 text-slate-700">
            <span className="text-slate-400 mt-0.5">
              <PinIcon />
            </span>
            <p className="text-sm">{job.address}</p>
          </div>
          <a
            href={mapsUrl(job.address)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-3 text-sm font-semibold text-slate-900 underline underline-offset-2"
          >
            Get directions
          </a>
        </div>

        <div className="rounded-2xl bg-white border border-slate-100 shadow-sm p-5">
          <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-400 mb-3">
            Contact client
          </p>
          <div className="flex gap-2">
            <a
              href={telUrl(job.clientPhone)}
              className="flex-1 flex items-center justify-center gap-2 rounded-xl border border-slate-300 px-3 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
            >
              <PhoneIcon />
              Call
            </a>
            <button
              type="button"
              disabled
              title="Messaging is coming soon"
              className="flex-1 flex items-center justify-center gap-2 rounded-xl border border-slate-200 px-3 py-2.5 text-sm font-semibold text-slate-400 cursor-not-allowed"
            >
              <MessageIcon />
              Message
            </button>
          </div>
        </div>

        {job.status === "new" && (
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => onRespond(job._id, false)}
              className="flex-1 rounded-xl border border-slate-300 px-3 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
            >
              Decline
            </button>
            <button
              type="button"
              onClick={() => onRespond(job._id, true)}
              className="flex-1 rounded-xl bg-slate-900 px-3 py-3 text-sm font-semibold text-white hover:bg-slate-800 transition-colors"
            >
              Accept
            </button>
          </div>
        )}

        {job.status === "accepted" && (
          <button
            type="button"
            onClick={() => onComplete(job._id)}
            className="w-full rounded-xl bg-emerald-500 px-3 py-3 text-sm font-semibold text-white hover:bg-emerald-600 transition-colors"
          >
            Mark as complete
          </button>
        )}
      </main>
    </div>
  );
}
