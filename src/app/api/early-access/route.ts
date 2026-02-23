import { NextRequest, NextResponse } from "next/server";
import { getSupabase } from "@/lib/supabase";

export async function POST(req: NextRequest) {
  try {
    const { userType, firstName, lastName, email, phone, company } = await req.json();

    if (!firstName || !lastName || !email || !userType) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const supabase = getSupabase();
    if (userType === "hiring") {
      const { error } = await supabase.from("client_portal").insert({
        first_name: firstName.trim(),
        last_name: lastName.trim(),
        email: email.trim(),
        phone: (phone || "").trim(),
        company_name: (company || "").trim(),
      });
      if (error) throw error;
    } else {
      const { error } = await supabase.from("candidates_portal").insert({
        first_name: firstName.trim(),
        last_name: lastName.trim(),
        email: email.trim(),
        phone: (phone || "").trim(),
      });
      if (error) throw error;
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
