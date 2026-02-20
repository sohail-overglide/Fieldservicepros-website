import { NextResponse } from "next/server";
import { getDb } from "@/lib/db";

export async function GET() {
  try {
    const db = getDb();
    const clients = db
      .prepare("SELECT * FROM client_portal ORDER BY created_at DESC")
      .all();
    return NextResponse.json({ clients });
  } catch (error) {
    console.error("Clients fetch error:", error);
    return NextResponse.json(
      { error: "Failed to fetch clients" },
      { status: 500 }
    );
  }
}
