# Supabase setup

1. Create a project at [supabase.com](https://supabase.com).
2. In **Project Settings → API** copy:
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **service_role** key (under "Project API keys") → `SUPABASE_SERVICE_ROLE_KEY`
3. Add those to your `.env` (see root `.env.example`).
4. Run the initial schema and seed in the Supabase **SQL Editor**:
   - Open **SQL Editor** in the dashboard.
   - Paste and run the contents of `migrations/20260220000000_initial_schema.sql`.

This creates the tables and seeds the two admin users (sohailfigma@gmail.com / sohail@123 and admin@123 / Mandy&Angela).
