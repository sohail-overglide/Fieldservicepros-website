import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    const { userType, firstName, lastName, email, company } = await req.json();

    if (!firstName || !lastName || !email || !userType) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const db = getDb();

    if (userType === "hiring") {
      db.prepare(
        "INSERT INTO client_portal (first_name, last_name, email, company_name) VALUES (?, ?, ?, ?)"
      ).run(firstName.trim(), lastName.trim(), email.trim(), (company || "").trim());
    } else {
      db.prepare(
        "INSERT INTO candidates_portal (first_name, last_name, email) VALUES (?, ?, ?)"
      ).run(firstName.trim(), lastName.trim(), email.trim());
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Early access submission error:", error);
    return NextResponse.json(
      { error: "Failed to save submission" },
      { status: 500 }
    );
  }
}
