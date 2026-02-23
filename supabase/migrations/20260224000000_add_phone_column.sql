-- Add optional phone column to both portal tables
ALTER TABLE client_portal ADD COLUMN IF NOT EXISTS phone TEXT DEFAULT '';
ALTER TABLE candidates_portal ADD COLUMN IF NOT EXISTS phone TEXT DEFAULT '';
