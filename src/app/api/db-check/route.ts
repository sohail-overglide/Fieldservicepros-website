import { NextResponse } from "next/server";
import { getSupabase } from "@/lib/supabase";

/** GET /api/db-check — Verify Supabase connection. */
export async function GET() {
  try {
    const supabase = getSupabase();
    const { data, error } = await supabase
      .from("admin_users")
      .select("id")
      .limit(1);

    if (error) {
      return NextResponse.json(
        { connected: false, error: error.message, code: error.code },
        { status: 502 }
      );
    }

    return NextResponse.json({
      connected: true,
      message: "Supabase database connected successfully",
      tables_reachable: true,
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json(
      { connected: false, error: message },
      { status: 500 }
    );
  }
}
