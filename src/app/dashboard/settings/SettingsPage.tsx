"use client";

import { CHECKLIST } from "../DashboardPage";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";

export function SettingsPage({ technician }: { technician: any }) {
  const { signOut } = useAuth();
  const router = useRouter();

  const firstName = technician.name?.split(" ")[0] ?? "";
  const lastName = technician.name?.split(" ").slice(1).join(" ") ?? "";
  const tradeLabel = (technician.categories ?? []).join(", ");

  async function handleSignOut() {
    await signOut();
    router.push("/login");
  }

  return (
    <>
      <div className="rounded-md border border-steel/15 bg-panel p-5">
        <div className="flex items-center gap-3">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-ink text-white text-lg font-bold">
            {firstName.charAt(0)}
            {lastName.charAt(0)}
          </div>
          <div>
            <p className="text-sm font-bold text-ink">
              {firstName} {lastName}
            </p>
            <span className="inline-block mt-1 rounded bg-signal/15 px-2.5 py-0.5 text-[11px] font-semibold text-signal">
              {tradeLabel}
            </span>
          </div>
        </div>

        <div className="mt-5 space-y-3 border-t border-steel/10 pt-4">
          <SettingsRow label="Email" value={technician.email} />
          <SettingsRow label="Phone" value={technician.phone} />
          <SettingsRow
            label="Trade"
            value={tradeLabel}
            hint="Set during verification — contact support to change this."
          />
          <SettingsRow label="Base area" value={technician.baseArea} />
        </div>
      </div>

      <div className="rounded-md border border-steel/15 bg-panel p-5">
        <p className="text-sm font-bold text-ink mb-1">Verification</p>
        <p className="text-xs text-steel mb-3">All documents verified and approved.</p>
        <div className="space-y-2.5">
          {CHECKLIST.map((item) => (
            <div key={item.label} className="flex items-center gap-2.5">
              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-500 text-white text-xs">
                ✓
              </span>
              <span className="text-sm text-ink">{item.label}</span>
            </div>
          ))}
        </div>
      </div>

      <button
        type="button"
        onClick={handleSignOut}
        className="block w-full rounded-md border border-steel/25 px-4 py-3 text-center text-sm font-semibold text-ink hover:bg-steel/5 transition-colors"
      >
        Sign out
      </button>
    </>
  );
}

function SettingsRow({ label, value, hint }: { label: string; value?: string; hint?: string }) {
  return (
    <div className="flex items-center justify-between gap-3">
      <div>
        <p className="text-xs font-semibold text-steel">{label}</p>
        {hint && <p className="text-[11px] text-steel/70 mt-0.5">{hint}</p>}
      </div>
      <p className="text-sm font-medium text-ink text-right">{value ?? "—"}</p>
    </div>
  );
}
