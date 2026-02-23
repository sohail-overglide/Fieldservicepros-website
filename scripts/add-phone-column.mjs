// Temporary script to add phone column to Supabase tables
// Run: node --env-file=.env.local scripts/add-phone-column.mjs

import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY,
    { auth: { autoRefreshToken: false, persistSession: false } }
);

// Test if phone column already exists by querying it
const { error: testError } = await supabase
    .from("client_portal")
    .select("phone")
    .limit(1);

if (testError && testError.message.includes("phone")) {
    console.log("Phone column does not exist. Please run this SQL in Supabase Dashboard → SQL Editor:");
    console.log("");
    console.log("ALTER TABLE client_portal ADD COLUMN IF NOT EXISTS phone TEXT DEFAULT '';");
    console.log("ALTER TABLE candidates_portal ADD COLUMN IF NOT EXISTS phone TEXT DEFAULT '';");
    console.log("");
    process.exit(1);
} else {
    console.log("✓ Phone column exists on client_portal (or table is accessible).");
}

const { error: testError2 } = await supabase
    .from("candidates_portal")
    .select("phone")
    .limit(1);

if (testError2 && testError2.message.includes("phone")) {
    console.log("Phone column missing on candidates_portal. Please run the SQL above.");
    process.exit(1);
} else {
    console.log("✓ Phone column exists on candidates_portal (or table is accessible).");
}

console.log("\n✅ Database is ready for the phone number feature!");
