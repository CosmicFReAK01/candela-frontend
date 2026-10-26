-- =========================================================================
-- Candela Construction - Supabase Security Linter Remediation Script
-- Fixes:
-- 1. WARN: Revoke EXECUTE on public.rls_auto_enable() from anon & authenticated
-- 2. INFO: Implement explicit RLS policies on all 27 public tables
-- =========================================================================

BEGIN;

-- -------------------------------------------------------------------------
-- PART 1: Secure public.rls_auto_enable() Event Trigger Function
-- -------------------------------------------------------------------------
REVOKE EXECUTE ON FUNCTION public.rls_auto_enable() FROM PUBLIC;
REVOKE EXECUTE ON FUNCTION public.rls_auto_enable() FROM anon;
REVOKE EXECUTE ON FUNCTION public.rls_auto_enable() FROM authenticated;
GRANT EXECUTE ON FUNCTION public.rls_auto_enable() TO postgres, service_role;

-- -------------------------------------------------------------------------
-- PART 2: Public Read-Only Tables (Allow Public SELECT, Admin FULL)
-- -------------------------------------------------------------------------

DO $$
DECLARE
  public_read_tables text[] := ARRAY[
    'projects',
    'project_scope',
    'project_challenges',
    'project_execution',
    'project_highlights',
    'services',
    'service_bullets',
    'service_subcategories',
    'equipment',
    'equipment_categories',
    'equipment_deployments',
    'fleet_equipment',
    'corporate_news',
    'job_positions',
    'executive_leadership',
    'media_assets',
    'clients',
    'client_approvals',
    'state_footprints',
    'sub_districts',
    'district_corridors',
    'site_settings',
    'hse_metrics'
  ];
  tbl text;
BEGIN
  FOREACH tbl IN ARRAY public_read_tables LOOP
    -- Drop any old conflicting policy if existing
    EXECUTE format('DROP POLICY IF EXISTS "Public Read Access" ON public.%I', tbl);
    EXECUTE format('DROP POLICY IF EXISTS "Service Role Full Access" ON public.%I', tbl);

    -- Allow anyone (anon + authenticated) to view public content
    EXECUTE format('CREATE POLICY "Public Read Access" ON public.%I FOR SELECT TO anon, authenticated USING (true)', tbl);

    -- Allow service_role full control for backend / admin operations
    EXECUTE format('CREATE POLICY "Service Role Full Access" ON public.%I FOR ALL TO service_role USING (true) WITH CHECK (true)', tbl);
  END LOOP;
END $$;

-- -------------------------------------------------------------------------
-- PART 3: Public Submission Tables (Allow Public INSERT, Admin FULL)
-- Non-permissive WITH CHECK clauses enforce data integrity and satisfy lint 0024
-- -------------------------------------------------------------------------

-- 1. job_applications
DROP POLICY IF EXISTS "Allow Public Application Submissions" ON public.job_applications;
DROP POLICY IF EXISTS "Service Role Full Access" ON public.job_applications;

CREATE POLICY "Allow Public Application Submissions" 
  ON public.job_applications 
  FOR INSERT 
  TO anon, authenticated 
  WITH CHECK (
    name IS NOT NULL AND length(trim(name)) > 0 AND
    email IS NOT NULL AND length(trim(email)) > 3
  );

CREATE POLICY "Service Role Full Access" 
  ON public.job_applications 
  FOR ALL 
  TO service_role 
  USING (true) 
  WITH CHECK (true);

-- 2. rfq_enquiries
DROP POLICY IF EXISTS "Allow Public RFQ Submissions" ON public.rfq_enquiries;
DROP POLICY IF EXISTS "Service Role Full Access" ON public.rfq_enquiries;

CREATE POLICY "Allow Public RFQ Submissions" 
  ON public.rfq_enquiries 
  FOR INSERT 
  TO anon, authenticated 
  WITH CHECK (
    company_name IS NOT NULL AND length(trim(company_name)) > 0 AND
    email IS NOT NULL AND length(trim(email)) > 3
  );

CREATE POLICY "Service Role Full Access" 
  ON public.rfq_enquiries 
  FOR ALL 
  TO service_role 
  USING (true) 
  WITH CHECK (true);

-- 3. tender_enquiries
DROP POLICY IF EXISTS "Allow Public Tender Submissions" ON public.tender_enquiries;
DROP POLICY IF EXISTS "Service Role Full Access" ON public.tender_enquiries;

CREATE POLICY "Allow Public Tender Submissions" 
  ON public.tender_enquiries 
  FOR INSERT 
  TO anon, authenticated 
  WITH CHECK (
    company_name IS NOT NULL AND length(trim(company_name)) > 0 AND
    email IS NOT NULL AND length(trim(email)) > 3
  );

CREATE POLICY "Service Role Full Access" 
  ON public.tender_enquiries 
  FOR ALL 
  TO service_role 
  USING (true) 
  WITH CHECK (true);

-- -------------------------------------------------------------------------
-- PART 4: Sensitive Authentication Table (Admin / Service Role ONLY)
-- -------------------------------------------------------------------------

DROP POLICY IF EXISTS "Service Role Only" ON public.admin_auth;
CREATE POLICY "Service Role Only" 
  ON public.admin_auth 
  FOR ALL 
  TO service_role 
  USING (true) 
  WITH CHECK (true);

COMMIT;
