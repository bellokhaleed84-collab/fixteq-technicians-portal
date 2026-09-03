"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase/clientApp";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function mapFirebaseError(code: string): string {
    switch (code) {
      case "auth/invalid-credential":
      case "auth/wrong-password":
      case "auth/user-not-found":
        return "Incorrect email or password.";
      case "auth/too-many-requests":
        return "Too many attempts. Please try again shortly.";
      case "auth/invalid-email":
        return "Please enter a valid email address.";
      default:
        return "Login failed. Please check your credentials.";
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }
    if (!email.includes("@")) {
      setError("Please enter a valid email address");
      return;
    }

    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push("/dashboard");
    } catch (err: any) {
      setError(mapFirebaseError(err.code));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-ink flex">
      {/* Left panel — brand story, hidden on small screens */}
      <div className="hidden lg:flex lg:w-2/5 flex-col justify-between p-12 bg-ink relative overflow-hidden">
        <div className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-signal/10 blur-3xl" />
        <div className="absolute bottom-0 left-0 h-64 w-64 rounded-full bg-signal/5 blur-3xl" />

        <div className="relative">
          <span className="font-display font-semibold text-2xl text-white tracking-tight">Crafteey</span>
        </div>

        <div className="relative space-y-4">
          <h1 className="font-display font-semibold text-4xl text-white leading-tight">
            Welcome back.<br />Your next job is waiting.
          </h1>
          <p className="text-white/60 text-base leading-relaxed max-w-sm">
            Go online, get dispatched, get paid. Sign in to check your queue.
          </p>
        </div>

        <p className="relative text-xs text-white/30">
          © {new Date().getFullYear()} Crafteey Technologies
        </p>
      </div>

      {/* Right panel — the form */}
      <div className="flex-1 flex items-center justify-center p-4 sm:p-8 bg-concrete">
        <div className="w-full max-w-md">
          <div className="lg:hidden text-center mb-8">
            <span className="font-display font-semibold text-2xl text-ink tracking-tight">Crafteey</span>
          </div>

          <div className="bg-panel rounded-2xl shadow-xl shadow-ink/5 border border-steel/10 p-8">
            <div className="mb-8">
              <h2 className="font-display font-semibold text-2xl text-ink">Welcome back</h2>
              <p className="text-steel text-sm mt-1">Sign in to your Crafteey account</p>
            </div>

            {error && (
              <div className="mb-5 rounded-xl border-l-4 border-red-500 bg-red-50 px-4 py-3">
                <p className="text-sm font-medium text-red-700">{error}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-xs font-semibold text-ink mb-1.5">
                  Email address
                </label>
                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="block w-full rounded-xl border border-steel/20 bg-concrete px-3.5 py-2.5 text-sm text-ink placeholder-steel/60 focus:outline-none focus:ring-2 focus:ring-signal/40 focus:border-signal transition-colors"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label htmlFor="password" className="block text-xs font-semibold text-ink">
                    Password
                  </label>
                  <a href="#" className="text-xs font-medium text-steel hover:text-ink">
                    Forgot password?
                  </a>
                </div>
                <input
                  id="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="block w-full rounded-xl border border-steel/20 bg-concrete px-3.5 py-2.5 text-sm text-ink placeholder-steel/60 focus:outline-none focus:ring-2 focus:ring-signal/40 focus:border-signal transition-colors"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <label htmlFor="remember-me" className="flex items-center gap-2.5">
                <input
                  id="remember-me"
                  type="checkbox"
                  className="h-4 w-4 rounded border-steel/30 text-signal focus:ring-signal/40"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                <span className="text-sm text-steel">Remember me</span>
              </label>

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-xl bg-ink px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-ink/20 transition-all hover:bg-ink/90 hover:shadow-signal/10 disabled:opacity-50 disabled:pointer-events-none"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <span className="h-3.5 w-3.5 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                    Signing in...
                  </span>
                ) : (
                  "Sign in"
                )}
              </button>
            </form>

            <p className="mt-6 text-center text-sm text-steel">
              Don&apos;t have an account?{" "}
              <Link href="/register" className="font-semibold text-ink underline underline-offset-2">
                Sign up
              </Link>
            </p>
          </div>

          <p className="lg:hidden text-center text-xs text-steel/70 mt-6">
            © {new Date().getFullYear()} Crafteey Technologies
          </p>
        </div>
      </div>
    </div>
  );
}
