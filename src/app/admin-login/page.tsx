"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function AdminLoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Invalid credentials");
        return;
      }

      router.push("/admin-portal");
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#f7f7f7] px-4">
      <div className="w-full max-w-sm">
        <div className="mb-8 flex justify-center">
          <Image
            src="/logo.png"
            alt="FieldService Pros"
            width={160}
            height={40}
            className="h-12 w-auto"
          />
        </div>

        <div className="rounded-3xl border border-gray-100 bg-white p-8 shadow-sm">
          <h1 className="mb-1 text-xl font-semibold tracking-tight text-[#0a0a0a]">
            Admin Portal
          </h1>
          <p className="mb-7 text-sm text-gray-500">
            Sign in to manage waitlist submissions.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="username"
                className="mb-1.5 block text-xs font-medium text-gray-500"
              >
                Email Address
              </label>
              <input
                id="username"
                type="email"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="admin@example.com"
                className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-[#0a0a0a] outline-none transition-colors placeholder:text-gray-400 focus:border-[#0a0a0a]"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="mb-1.5 block text-xs font-medium text-gray-500"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-[#0a0a0a] outline-none transition-colors placeholder:text-gray-400 focus:border-[#0a0a0a]"
              />
            </div>

            {error && (
              <p className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="mt-2 w-full cursor-pointer rounded-full bg-[#019446] py-3 text-sm font-medium text-white transition-colors hover:bg-[#017a3b] disabled:opacity-60"
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
