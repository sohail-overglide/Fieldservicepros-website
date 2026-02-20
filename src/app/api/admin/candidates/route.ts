import { NextResponse } from "next/server";
import { getDb } from "@/lib/db";

export async function GET() {
  try {
    const db = getDb();
    const candidates = db
      .prepare("SELECT * FROM candidates_portal ORDER BY created_at DESC")
      .all();
    return NextResponse.json({ candidates });
  } catch (error) {
    console.error("Candidates fetch error:", error);
    return NextResponse.json(
      { error: "Failed to fetch candidates" },
      { status: 500 }
    );
  }
}
