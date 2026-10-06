-- =============================================================================
-- Candela Construction — Supabase Security Hardening & Optimization
-- =============================================================================
-- Fixes Supabase Database Linter warnings:
--   0014 extension_in_public                              (uuid-ossp)
--   0028 anon_security_definer_function_executable        (rls_auto_enable)
--   0029 authenticated_security_definer_function_executable (rls_auto_enable)
-- Plus defense-in-depth hardening and FK / sort indexes.
--
-- WHY THIS IS SAFE: the Next.js app connects directly via `pg` as the table
-- owner (`postgres`), which bypasses RLS. Nothing uses the Supabase REST /
-- GraphQL API, so the `anon` and `authenticated` roles need zero access.
--
-- Idempotent: safe to run multiple times. Run in Supabase SQL Editor.
-- =============================================================================

BEGIN;

-- -----------------------------------------------------------------------------
-- 1. Move uuid-ossp out of `public` (lint 0014)
-- -----------------------------------------------------------------------------
CREATE SCHEMA IF NOT EXISTS extensions;
GRANT USAGE ON SCHEMA extensions TO postgres, service_role;

-- Switch UUID defaults to built-in gen_random_uuid() (PG13+): no extension
-- dependency, and faster than uuid_generate_v4().
DO $$
DECLARE r record;
BEGIN
  FOR r IN
    SELECT table_name, column_name
    FROM information_schema.columns
    WHERE table_schema = 'public'
      AND column_default ILIKE '%uuid_generate_v4()%'
  LOOP
    EXECUTE format(
      'ALTER TABLE public.%I ALTER COLUMN %I SET DEFAULT gen_random_uuid()',
      r.table_name, r.column_name
    );
  END LOOP;
END $$;

DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM pg_extension e
    JOIN pg_namespace n ON n.oid = e.extnamespace
    WHERE e.extname = 'uuid-ossp' AND n.nspname = 'public'
  ) THEN
    ALTER EXTENSION "uuid-ossp" SET SCHEMA extensions;
  END IF;
END $$;

-- -----------------------------------------------------------------------------
-- 2. Lock down SECURITY DEFINER function rls_auto_enable (lints 0028 / 0029)
--    It is an event-trigger helper; trigger execution does not need EXECUTE
--    grants, so revoking them keeps auto-RLS working while removing the
--    /rest/v1/rpc/rls_auto_enable endpoint exposure.
-- -----------------------------------------------------------------------------
DO $$
BEGIN
  IF to_regprocedure('public.rls_auto_enable()') IS NOT NULL THEN
    REVOKE EXECUTE ON FUNCTION public.rls_auto_enable() FROM PUBLIC, anon, authenticated;
  END IF;
END $$;

-- Revoke EXECUTE on every function in public from API roles, and make it the
-- default for functions created in the future.
REVOKE EXECUTE ON ALL FUNCTIONS IN SCHEMA public FROM PUBLIC, anon, authenticated;
ALTER DEFAULT PRIVILEGES IN SCHEMA public REVOKE EXECUTE ON FUNCTIONS FROM PUBLIC;
ALTER DEFAULT PRIVILEGES IN SCHEMA public REVOKE EXECUTE ON FUNCTIONS FROM anon, authenticated;

-- -----------------------------------------------------------------------------
-- 3. Enable RLS on every public table (deny-by-default for API roles)
--    No policies are created on purpose: anon/authenticated get nothing.
--    The owner (`postgres`, used by the app) bypasses RLS. Do NOT use FORCE.
-- -----------------------------------------------------------------------------
DO $$
DECLARE r record;
BEGIN
  FOR r IN SELECT tablename FROM pg_tables WHERE schemaname = 'public' LOOP
    EXECUTE format('ALTER TABLE public.%I ENABLE ROW LEVEL SECURITY', r.tablename);
  END LOOP;
END $$;

-- -----------------------------------------------------------------------------
-- 4. Remove Data API privileges (protects admin_auth hashes, enquiries PII)
-- -----------------------------------------------------------------------------
REVOKE ALL ON ALL TABLES    IN SCHEMA public FROM anon, authenticated;
REVOKE ALL ON ALL SEQUENCES IN SCHEMA public FROM anon, authenticated;
ALTER DEFAULT PRIVILEGES IN SCHEMA public REVOKE ALL ON TABLES    FROM anon, authenticated;
ALTER DEFAULT PRIVILEGES IN SCHEMA public REVOKE ALL ON SEQUENCES FROM anon, authenticated;

-- -----------------------------------------------------------------------------
-- 5. Performance: index unindexed foreign keys (lint 0001) + ORDER BY columns
-- -----------------------------------------------------------------------------
-- Foreign keys (used by json_agg sub-selects on every projects/services request)
CREATE INDEX IF NOT EXISTS idx_project_scope_project_id         ON public.project_scope (project_id);
CREATE INDEX IF NOT EXISTS idx_project_execution_project_id     ON public.project_execution (project_id);
CREATE INDEX IF NOT EXISTS idx_project_challenges_project_id    ON public.project_challenges (project_id);
CREATE INDEX IF NOT EXISTS idx_project_highlights_project_id    ON public.project_highlights (project_id);
CREATE INDEX IF NOT EXISTS idx_service_bullets_service_id       ON public.service_bullets (service_id);
CREATE INDEX IF NOT EXISTS idx_service_subcategories_service_id ON public.service_subcategories (service_id);
CREATE INDEX IF NOT EXISTS idx_client_approvals_client_id       ON public.client_approvals (client_id);
CREATE INDEX IF NOT EXISTS idx_equipment_deployments_equipment  ON public.equipment_deployments (equipment_id);
CREATE INDEX IF NOT EXISTS idx_fleet_equipment_category_id      ON public.fleet_equipment (category_id);
CREATE INDEX IF NOT EXISTS idx_tender_enquiries_target_district ON public.tender_enquiries (target_district_id);

-- Sort columns used by admin dashboard / public pages
CREATE INDEX IF NOT EXISTS idx_rfq_enquiries_created_at      ON public.rfq_enquiries (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_job_applications_applied_at   ON public.job_applications (applied_at DESC);
CREATE INDEX IF NOT EXISTS idx_hse_metrics_recorded_date     ON public.hse_metrics (recorded_date DESC);

-- -----------------------------------------------------------------------------
-- 6. Primary keys on child list tables (lint 0004 no_primary_key)
--    App inserts always name columns, so a surrogate identity id is non-breaking.
-- -----------------------------------------------------------------------------
DO $$
DECLARE t text;
BEGIN
  FOREACH t IN ARRAY ARRAY['project_scope','project_challenges','project_highlights',
                           'project_execution','service_bullets','service_subcategories']
  LOOP
    IF to_regclass('public.' || t) IS NOT NULL AND NOT EXISTS (
      SELECT 1 FROM pg_constraint WHERE conrelid = ('public.' || t)::regclass AND contype = 'p'
    ) THEN
      EXECUTE format(
        'ALTER TABLE public.%I ADD COLUMN IF NOT EXISTS id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY', t);
    END IF;
  END LOOP;
END $$;

COMMIT;

-- Refresh planner statistics after index changes (public tables only)
DO $$
DECLARE r record;
BEGIN
  FOR r IN SELECT tablename FROM pg_tables WHERE schemaname = 'public' LOOP
    EXECUTE format('ANALYZE public.%I', r.tablename);
  END LOOP;
END $$;

-- =============================================================================
-- VERIFICATION (run separately; all should return 0 rows / expected values)
-- =============================================================================
-- Extension location (expect: extensions)
--   SELECT e.extname, n.nspname FROM pg_extension e
--   JOIN pg_namespace n ON n.oid = e.extnamespace WHERE e.extname = 'uuid-ossp';
--
-- API roles must NOT be able to execute rls_auto_enable (expect: false, false)
--   SELECT has_function_privilege('anon', 'public.rls_auto_enable()', 'EXECUTE'),
--          has_function_privilege('authenticated', 'public.rls_auto_enable()', 'EXECUTE');
--
-- Tables without RLS (expect: 0 rows)
--   SELECT tablename FROM pg_tables WHERE schemaname = 'public' AND NOT rowsecurity;
--
-- Tables still readable by anon (expect: 0 rows)
--   SELECT table_name FROM information_schema.role_table_grants
--   WHERE table_schema = 'public' AND grantee IN ('anon', 'authenticated');
--
-- Table owners (expect: postgres — the app's role, which bypasses RLS)
--   SELECT tablename, tableowner FROM pg_tables WHERE schemaname = 'public';
