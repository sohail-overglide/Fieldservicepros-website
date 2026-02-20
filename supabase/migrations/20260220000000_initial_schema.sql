-- FieldService Pros: initial schema and admin seed
-- Run this in Supabase Dashboard → SQL Editor (or via Supabase CLI)

-- Enable bcrypt hashing for admin passwords (compatible with Node bcrypt.compareSync)
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- Client portal: early access signups (I'm Hiring)
CREATE TABLE IF NOT EXISTS client_portal (
  id BIGSERIAL PRIMARY KEY,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL,
  company_name TEXT DEFAULT '',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Candidates portal: early access signups (I'm a Technician)
CREATE TABLE IF NOT EXISTS candidates_portal (
  id BIGSERIAL PRIMARY KEY,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Admin users for /admin-login (credentials verified in app with bcrypt)
CREATE TABLE IF NOT EXISTS admin_users (
  id BIGSERIAL PRIMARY KEY,
  username TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Seed admin users (bcrypt hashes; Node bcrypt.compareSync will verify these)
INSERT INTO admin_users (username, password_hash)
VALUES
  ('sohailfigma@gmail.com', crypt('sohail@123', gen_salt('bf'))),
  ('admin@123', crypt('Mandy&Angela', gen_salt('bf')))
ON CONFLICT (username) DO NOTHING;

-- Optional: RLS policies if you ever use anon key from client (we use service role in API only)
ALTER TABLE client_portal ENABLE ROW LEVEL SECURITY;
ALTER TABLE candidates_portal ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

-- Service role bypasses RLS; these policies allow no direct client access (API uses service role)
CREATE POLICY "No direct client access" ON client_portal FOR ALL USING (false);
CREATE POLICY "No direct client access" ON candidates_portal FOR ALL USING (false);
CREATE POLICY "No direct client access" ON admin_users FOR ALL USING (false);
