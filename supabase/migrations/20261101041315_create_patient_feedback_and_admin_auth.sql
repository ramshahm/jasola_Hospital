/*
# Create patient feedback inbox and admin password check

1. New Tables
- `patient_feedback`: private feedback submitted by patients who rated the hospital 1-3 stars.
  - `id` (uuid, primary key)
  - `patient_name` (text, required, max 120 characters)
  - `phone` (text, required, max 20 characters)
  - `rating` (smallint, required, 1 to 3 only)
  - `feedback_text` (text, required, max 2000 characters)
  - `is_resolved` (boolean, defaults to false)
  - `resolved_at` (timestamptz, set when marked resolved)
  - `created_at` (timestamptz, defaults to now)
- `admin_credentials`: holds the hashed admin password. Never readable by the website.

2. Security
- RLS enabled on both tables.
- Website visitors (anon) can only INSERT feedback, and only with a 1-3 star rating that is unresolved.
- Visitors cannot read, edit, or delete any feedback.
- `admin_credentials` has no grants to website roles at all.
- `verify_admin_password` checks a password against the stored hash. It is callable only by the server-side function that runs with the service role.

3. Important Notes
- Admin reads and resolutions go through the `admin-feedback` edge function, which verifies the password first.
- Passwords are stored with bcrypt via pgcrypto, never in plain text.
*/

CREATE EXTENSION IF NOT EXISTS pgcrypto WITH SCHEMA extensions;

CREATE TABLE IF NOT EXISTS patient_feedback (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_name text NOT NULL CHECK (char_length(patient_name) BETWEEN 1 AND 120),
  phone text NOT NULL CHECK (char_length(phone) BETWEEN 6 AND 20),
  rating smallint NOT NULL CHECK (rating BETWEEN 1 AND 3),
  feedback_text text NOT NULL CHECK (char_length(feedback_text) BETWEEN 1 AND 2000),
  is_resolved boolean NOT NULL DEFAULT false,
  resolved_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS patient_feedback_created_at_idx ON patient_feedback (created_at DESC);

ALTER TABLE patient_feedback ENABLE ROW LEVEL SECURITY;

GRANT INSERT ON patient_feedback TO anon, authenticated;
GRANT SELECT, UPDATE ON patient_feedback TO service_role;

DROP POLICY IF EXISTS "anon_insert_low_rating_feedback" ON patient_feedback;
CREATE POLICY "anon_insert_low_rating_feedback" ON patient_feedback
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (rating BETWEEN 1 AND 3 AND is_resolved = false AND resolved_at IS NULL);

CREATE TABLE IF NOT EXISTS admin_credentials (
  id smallint PRIMARY KEY DEFAULT 1 CHECK (id = 1),
  password_hash text NOT NULL,
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE admin_credentials ENABLE ROW LEVEL SECURITY;

REVOKE ALL ON admin_credentials FROM PUBLIC, anon, authenticated;

CREATE OR REPLACE FUNCTION public.verify_admin_password(p_password text)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public, extensions
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.admin_credentials
    WHERE password_hash = extensions.crypt(p_password, password_hash)
  );
$$;

REVOKE EXECUTE ON FUNCTION public.verify_admin_password(text) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.verify_admin_password(text) TO service_role;
