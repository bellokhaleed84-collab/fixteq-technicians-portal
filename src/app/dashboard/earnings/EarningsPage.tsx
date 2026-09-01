"use client";

import { formatNaira, type Payout } from "../DashboardPage";

// ── Earnings page ────────────────────────────────────────────────────────
// Split into its own folder so future bugs/changes here stay isolated from
// the rest of the dashboard. Shares formatNaira + Payout with the main file.

export function EarningsPage({
  pendingPayout,
  payouts,
}: {
  pendingPayout: number;
  payouts: Payout[];
}) {
  return (
    <>
      <div className="rounded-2xl bg-slate-900 p-5">
        <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">
          Available for payout
        </p>
        <p className="text-2xl font-bold text-white mt-1">{formatNaira(pendingPayout)}</p>
        <button
          type="button"
          disabled={pendingPayout === 0}
          className="w-full mt-4 rounded-xl bg-amber-500 px-4 py-2.5 text-sm font-semibold text-slate-900 hover:bg-amber-400 transition-colors disabled:opacity-40 disabled:pointer-events-none"
        >
          Request payout
        </button>
      </div>

      <div>
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-400 mb-2 px-1">
          Payout history
        </p>
        <div className="rounded-2xl bg-white border border-slate-100 shadow-sm divide-y divide-slate-100">
          {payouts.map((p) => (
            <div key={p.id} className="flex items-center justify-between px-4 py-3">
              <div>
                <p className="text-sm font-semibold text-slate-900">{formatNaira(p.amount)}</p>
                <p className="text-xs text-slate-400">{p.date}</p>
              </div>
              <span className="rounded-full bg-emerald-100 px-2.5 py-1 text-[11px] font-semibold text-emerald-700">
                Paid
              </span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}