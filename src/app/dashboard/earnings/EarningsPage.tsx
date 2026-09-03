"use client";

import { formatNaira, type Payout } from "../DashboardPage";

export function EarningsPage({
  pendingPayout,
  payouts,
}: {
  pendingPayout: number;
  payouts: Payout[];
}) {
  return (
    <>
      <div className="rounded-md bg-ink p-5">
        <p className="text-[11px] font-semibold text-white/50">
          Available for payout
        </p>
        <p className="font-display text-2xl font-semibold text-white mt-1">{formatNaira(pendingPayout)}</p>
        <button
          type="button"
          disabled={pendingPayout === 0}
          className="w-full mt-4 rounded-md bg-signal px-4 py-2.5 text-sm font-semibold text-ink hover:bg-signal/90 transition-colors disabled:opacity-40 disabled:pointer-events-none"
        >
          Request payout
        </button>
      </div>

      <div>
        <p className="text-xs font-semibold text-steel mb-2 px-1">
          Payout history
        </p>
        <div className="rounded-md border border-steel/15 bg-panel divide-y divide-steel/10">
          {payouts.map((p) => (
            <div key={p.id} className="flex items-center justify-between px-4 py-3">
              <div>
                <p className="text-sm font-semibold text-ink">{formatNaira(p.amount)}</p>
                <p className="text-xs text-steel">{p.date}</p>
              </div>
              <span className="rounded bg-emerald-100 px-2.5 py-1 text-[11px] font-semibold text-emerald-700">
                Paid
              </span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
