// Run: node --env-file=.env.local scripts/run-migration.mjs

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

const sql = `
ALTER TABLE client_portal ADD COLUMN IF NOT EXISTS phone TEXT DEFAULT '';
ALTER TABLE candidates_portal ADD COLUMN IF NOT EXISTS phone TEXT DEFAULT '';
`;

// Use the pg-meta query endpoint
const res = await fetch(`${url}/pg/query`, {
    method: "POST",
    headers: {
        "apikey": key,
        "Authorization": `Bearer ${key}`,
        "Content-Type": "application/json",
    },
    body: JSON.stringify({ query: sql }),
});

if (res.ok) {
    const data = await res.json();
    console.log("✅ Migration succeeded!");
    console.log(JSON.stringify(data, null, 2));
} else {
    const text = await res.text();
    console.log(`Status: ${res.status}`);
    console.log(`Response: ${text}`);

    // Try alternative approach via the SQL endpoint
    console.log("\nTrying alternative approach...");
    const res2 = await fetch(`${url}/rest/v1/rpc/`, {
        method: "POST",
        headers: {
            "apikey": key,
            "Authorization": `Bearer ${key}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ query: sql }),
    });
    console.log(`Alt status: ${res2.status}`);
    console.log(`Alt response: ${await res2.text()}`);
}
