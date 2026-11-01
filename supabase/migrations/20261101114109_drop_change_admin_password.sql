/*
# Drop change_admin_password function

1. Summary
- Removes the database function that let the admin change the dashboard password from the website.
- The admin password itself is not changed by this migration. It stays as it was before the change.

2. Modified objects
- Function `public.change_admin_password(text, text)` is dropped if it exists.

3. Security
- No tables, policies, or grants are changed.
- The existing password check function and the stored password hash are untouched.

4. Notes
- Uses IF EXISTS, so re-running this migration is safe.
*/

DROP FUNCTION IF EXISTS public.change_admin_password(text, text);
