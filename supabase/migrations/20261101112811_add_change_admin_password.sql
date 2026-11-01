/*
# Add secure admin password change

1. New Functions
- `change_admin_password(p_current text, p_new text) RETURNS boolean`
  - Checks the current password with the existing verifier.
  - If it matches, stores a bcrypt hash of the new password and returns true.
  - If it does not match, changes nothing and returns false.
  - Rejects new passwords shorter than 8 characters.

2. Security
- SECURITY DEFINER with a fixed search_path.
- EXECUTE revoked from PUBLIC, anon, and authenticated.
- EXECUTE granted only to service_role, so only the admin edge function can call it.
- The plain-text password is never stored; only the bcrypt hash is written.

3. Notes
- No tables or existing data are changed.
- Safe to re-run: the function is created with CREATE OR REPLACE.
*/

CREATE OR REPLACE FUNCTION public.change_admin_password(p_current text, p_new text)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, extensions
AS $$
BEGIN
  IF NOT public.verify_admin_password(p_current) THEN
    RETURN false;
  END IF;

  IF p_new IS NULL OR length(p_new) < 8 THEN
    RAISE EXCEPTION 'password_too_short' USING ERRCODE = 'check_violation';
  END IF;

  UPDATE public.admin_credentials
  SET password_hash = extensions.crypt(p_new, extensions.gen_salt('bf')),
      updated_at = now()
  WHERE id = 1;

  RETURN true;
END;
$$;

REVOKE EXECUTE ON FUNCTION public.change_admin_password(text, text) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.change_admin_password(text, text) TO service_role;
