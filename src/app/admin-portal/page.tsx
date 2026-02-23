"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  Download,
  Copy,
  Check,
  LogOut,
  Users,
  Briefcase,
  RefreshCw,
} from "lucide-react";

type ClientRow = {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  company_name: string;
  created_at: string;
};

type CandidateRow = {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  created_at: string;
};

type Tab = "clients" | "candidates";

function formatDate(dt: string) {
  return new Date(dt).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function rowToText(row: Record<string, unknown>, keys: string[]) {
  return keys.map((k) => String(row[k] ?? "")).join("\t");
}

function toCSV(
  rows: Record<string, unknown>[],
  keys: string[],
  headers: string[]
) {
  const lines = [headers.join(",")];
  for (const row of rows) {
    lines.push(
      keys
        .map((k) => `"${String(row[k] ?? "").replace(/"/g, '""')}"`)
        .join(",")
    );
  }
  return lines.join("\n");
}

export default function AdminPortalPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<Tab>("clients");
  const [clients, setClients] = useState<ClientRow[]>([]);
  const [candidates, setCandidates] = useState<CandidateRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [copiedRowId, setCopiedRowId] = useState<number | null>(null);
  const [copiedAll, setCopiedAll] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const fetchData = useCallback(async (showRefresh = false) => {
    if (showRefresh) setRefreshing(true);
    else setLoading(true);

    try {
      const [clientRes, candidateRes] = await Promise.all([
        fetch("/api/admin/clients"),
        fetch("/api/admin/candidates"),
      ]);

      if (clientRes.ok) {
        const d = await clientRes.json();
        setClients(d.clients ?? []);
      }
      if (candidateRes.ok) {
        const d = await candidateRes.json();
        setCandidates(d.candidates ?? []);
      }
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleLogout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin-login");
  };

  const copyRow = (row: Record<string, unknown>, keys: string[], id: number) => {
    navigator.clipboard.writeText(rowToText(row, keys));
    setCopiedRowId(id);
    setTimeout(() => setCopiedRowId(null), 1800);
  };

  const copyAll = (rows: Record<string, unknown>[], keys: string[]) => {
    const text = rows.map((r) => rowToText(r, keys)).join("\n");
    navigator.clipboard.writeText(text);
    setCopiedAll(true);
    setTimeout(() => setCopiedAll(false), 1800);
  };

  const downloadCSV = (
    rows: Record<string, unknown>[],
    keys: string[],
    headers: string[],
    filename: string
  ) => {
    const csv = toCSV(rows, keys, headers);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  const clientKeys = ["id", "first_name", "last_name", "email", "phone", "company_name", "created_at"];
  const clientHeaders = ["ID", "First Name", "Last Name", "Email", "Phone No.", "Company", "Joined"];
  const candidateKeys = ["id", "first_name", "last_name", "email", "phone", "created_at"];
  const candidateHeaders = ["ID", "First Name", "Last Name", "Email", "Phone No.", "Joined"];

  const activeRows =
    activeTab === "clients"
      ? (clients as unknown as Record<string, unknown>[])
      : (candidates as unknown as Record<string, unknown>[]);
  const activeKeys = activeTab === "clients" ? clientKeys : candidateKeys;
  const activeHeaders = activeTab === "clients" ? clientHeaders : candidateHeaders;
  const csvFilename =
    activeTab === "clients" ? "client-portal.csv" : "candidates-portal.csv";

  const copyKeys = activeKeys.filter((k) => k !== "id");

  return (
    <div className="flex h-screen overflow-hidden bg-[#f7f7f7]">
      {/* ── Sidebar ── */}
      <aside className="flex w-60 shrink-0 flex-col border-r border-gray-100 bg-white">
        <div className="flex h-16 items-center border-b border-gray-100 px-5">
          <Image
            src="/logo.png"
            alt="FieldService Pros"
            width={130}
            height={32}
            className="h-10 w-auto"
          />
        </div>

        <nav className="flex-1 space-y-0.5 p-3">
          <p className="mb-2 px-3 pt-1 text-[10px] font-semibold uppercase tracking-widest text-gray-400">
            Portals
          </p>
          <button
            onClick={() => setActiveTab("clients")}
            className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors ${activeTab === "clients"
                ? "bg-[#019446]/10 text-[#019446]"
                : "text-gray-500 hover:bg-gray-50 hover:text-[#0a0a0a]"
              }`}
          >
            <Briefcase size={15} />
            Clients
            {clients.length > 0 && (
              <span
                className={`ml-auto rounded-full px-2 py-0.5 text-[10px] font-semibold ${activeTab === "clients"
                    ? "bg-[#019446]/15 text-[#019446]"
                    : "bg-gray-100 text-gray-500"
                  }`}
              >
                {clients.length}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab("candidates")}
            className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors ${activeTab === "candidates"
                ? "bg-[#019446]/10 text-[#019446]"
                : "text-gray-500 hover:bg-gray-50 hover:text-[#0a0a0a]"
              }`}
          >
            <Users size={15} />
            Candidates
            {candidates.length > 0 && (
              <span
                className={`ml-auto rounded-full px-2 py-0.5 text-[10px] font-semibold ${activeTab === "candidates"
                    ? "bg-[#019446]/15 text-[#019446]"
                    : "bg-gray-100 text-gray-500"
                  }`}
              >
                {candidates.length}
              </span>
            )}
          </button>
        </nav>

        <div className="border-t border-gray-100 p-3">
          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-gray-500 transition-colors hover:bg-red-50 hover:text-red-500"
          >
            <LogOut size={15} />
            Sign Out
          </button>
        </div>
      </aside>

      {/* ── Main ── */}
      <main className="flex flex-1 flex-col overflow-hidden">
        {/* Top bar */}
        <div className="flex h-16 shrink-0 items-center justify-between border-b border-gray-100 bg-white px-8">
          <div>
            <h1 className="text-sm font-semibold text-[#0a0a0a]">
              {activeTab === "clients" ? "Client Portal" : "Candidates Portal"}
            </h1>
            <p className="text-xs text-gray-400">
              {loading
                ? "Loading..."
                : `${activeRows.length} ${activeRows.length === 1 ? "entry" : "entries"
                }`}
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={() => fetchData(true)}
              disabled={refreshing}
              className="flex items-center gap-1.5 rounded-xl border border-gray-200 bg-white px-3 py-2 text-xs font-medium text-gray-500 transition-colors hover:border-gray-300 hover:text-[#0a0a0a] disabled:opacity-50"
              title="Refresh data"
            >
              <RefreshCw
                size={13}
                className={refreshing ? "animate-spin" : ""}
              />
              Refresh
            </button>

            <button
              onClick={() => copyAll(activeRows, copyKeys)}
              disabled={activeRows.length === 0}
              className="flex items-center gap-1.5 rounded-xl border border-gray-200 bg-white px-3 py-2 text-xs font-medium text-[#0a0a0a] transition-colors hover:border-gray-300 disabled:opacity-40"
            >
              {copiedAll ? (
                <Check size={13} className="text-[#019446]" />
              ) : (
                <Copy size={13} />
              )}
              {copiedAll ? "Copied!" : "Copy All"}
            </button>

            <button
              onClick={() =>
                downloadCSV(activeRows, activeKeys, activeHeaders, csvFilename)
              }
              disabled={activeRows.length === 0}
              className="flex items-center gap-1.5 rounded-xl bg-[#019446] px-4 py-2 text-xs font-medium text-white transition-colors hover:bg-[#017a3b] disabled:opacity-40"
            >
              <Download size={13} />
              Download CSV
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-auto p-8">
          {loading ? (
            <div className="flex h-48 items-center justify-center">
              <div className="flex flex-col items-center gap-3">
                <div className="h-6 w-6 animate-spin rounded-full border-2 border-gray-200 border-t-[#019446]" />
                <p className="text-sm text-gray-400">Loading data...</p>
              </div>
            </div>
          ) : activeRows.length === 0 ? (
            <div className="flex h-48 flex-col items-center justify-center gap-2 rounded-2xl border border-dashed border-gray-200 bg-white">
              <p className="text-sm font-medium text-[#0a0a0a]">
                No entries yet
              </p>
              <p className="text-xs text-gray-400">
                Submissions will appear here once users sign up.
              </p>
            </div>
          ) : (
            <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-100">
                      {activeHeaders.map((h) => (
                        <th
                          key={h}
                          className="bg-gray-50/80 px-5 py-3.5 text-left text-[11px] font-semibold uppercase tracking-wider text-gray-400"
                        >
                          {h}
                        </th>
                      ))}
                      <th className="bg-gray-50/80 px-5 py-3.5 text-right text-[11px] font-semibold uppercase tracking-wider text-gray-400">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {activeRows.map((row) => {
                      const id = row.id as number;
                      return (
                        <tr
                          key={id}
                          className="group transition-colors hover:bg-gray-50/60"
                        >
                          {activeKeys.map((key) => (
                            <td
                              key={key}
                              className="px-5 py-4 text-sm text-[#0a0a0a]"
                            >
                              {key === "id" ? (
                                <span className="text-xs text-gray-400">
                                  #{String(row[key])}
                                </span>
                              ) : key === "created_at" ? (
                                <span className="text-xs text-gray-500">
                                  {formatDate(String(row[key]))}
                                </span>
                              ) : (
                                String(row[key] ?? "—")
                              )}
                            </td>
                          ))}
                          <td className="px-5 py-4 text-right">
                            <button
                              onClick={() => copyRow(row, copyKeys, id)}
                              className="inline-flex items-center gap-1.5 rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-medium text-gray-500 opacity-0 transition-all group-hover:opacity-100 hover:border-gray-300 hover:text-[#0a0a0a]"
                            >
                              {copiedRowId === id ? (
                                <>
                                  <Check size={11} className="text-[#019446]" />
                                  Copied
                                </>
                              ) : (
                                <>
                                  <Copy size={11} />
                                  Copy
                                </>
                              )}
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
