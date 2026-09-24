--
-- PostgreSQL database dump
--


-- Dumped from database version 18.3
-- Dumped by pg_dump version 18.3

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: uuid-ossp; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA public;


--
-- Name: EXTENSION "uuid-ossp"; Type: COMMENT; Schema: -; Owner: -
--

COMMENT ON EXTENSION "uuid-ossp" IS 'generate universally unique identifiers (UUIDs)';


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: admin_auth; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.admin_auth (
    id character varying(50) DEFAULT 'default'::character varying NOT NULL,
    password_hash text NOT NULL,
    password_salt text NOT NULL,
    master_recovery_hash text NOT NULL,
    master_recovery_salt text NOT NULL,
    session_version integer DEFAULT 1 NOT NULL,
    failed_attempts integer DEFAULT 0 NOT NULL,
    locked_until timestamp with time zone,
    last_login timestamp with time zone,
    last_password_change timestamp with time zone,
    updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP
);


--
-- Name: client_approvals; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.client_approvals (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    client_id uuid NOT NULL,
    standard_code character varying(64) NOT NULL,
    approved_scope text NOT NULL,
    valid_until date NOT NULL
);


--
-- Name: clients; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.clients (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    code character varying(32) NOT NULL,
    name character varying(255) NOT NULL,
    sector character varying(128) NOT NULL,
    logo_url character varying(512),
    is_tier1 boolean DEFAULT true,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP
);


--
-- Name: corporate_news; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.corporate_news (
    id character varying(255) NOT NULL,
    category character varying(255),
    content character varying(4000),
    date character varying(255),
    excerpt character varying(1000),
    read_time character varying(255),
    title character varying(255)
);


--
-- Name: district_corridors; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.district_corridors (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    slug character varying(64) NOT NULL,
    district_name character varying(128) NOT NULL,
    state_name character varying(64) DEFAULT 'Bihar'::character varying NOT NULL,
    regional_hub character varying(128) NOT NULL,
    total_pipeline_laid_km numeric(8,2) DEFAULT 0.00 NOT NULL,
    active_spreads_count integer DEFAULT 0 NOT NULL,
    hdd_rigs_deployed integer DEFAULT 0 NOT NULL,
    is_active boolean DEFAULT true NOT NULL,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP
);


--
-- Name: equipment; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.equipment (
    name character varying(255) NOT NULL,
    application character varying(255),
    capacity character varying(255),
    make character varying(255),
    units character varying(255),
    category character varying(100),
    specs text,
    quantity character varying(100)
);


--
-- Name: equipment_categories; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.equipment_categories (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    category_name character varying(128) NOT NULL,
    description text
);


--
-- Name: equipment_deployments; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.equipment_deployments (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    spread_camp_id uuid NOT NULL,
    equipment_id uuid NOT NULL,
    units_deployed integer DEFAULT 1 NOT NULL,
    mobilized_date date NOT NULL,
    demobilized_date date
);


--
-- Name: fleet_equipment; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.fleet_equipment (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    category_id uuid NOT NULL,
    model_name character varying(128) NOT NULL,
    manufacturer character varying(128) NOT NULL,
    application character varying(255) NOT NULL,
    capacity_specs character varying(255) NOT NULL,
    quantity_owned integer DEFAULT 1 NOT NULL,
    status character varying(32) DEFAULT 'ACTIVE'::character varying NOT NULL,
    CONSTRAINT fleet_equipment_status_check CHECK (((status)::text = ANY ((ARRAY['ACTIVE'::character varying, 'MAINTENANCE'::character varying, 'RESERVED'::character varying])::text[])))
);


--
-- Name: hse_metrics; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.hse_metrics (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    recorded_date date NOT NULL,
    safe_man_hours numeric(10,2) NOT NULL,
    ltifr numeric(4,2) DEFAULT 0.00,
    environmental_restoration_pct numeric(5,2) DEFAULT 100.00,
    golden_rules_count integer DEFAULT 14,
    training_hours integer NOT NULL
);


--
-- Name: job_applications; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.job_applications (
    id bigint NOT NULL,
    application_ref character varying(255) NOT NULL,
    applied_at timestamp(6) without time zone,
    email character varying(255),
    experience character varying(255),
    location character varying(255),
    name character varying(255),
    phone character varying(255),
    position_title character varying(255),
    status character varying(255),
    admin_notes text
);


--
-- Name: job_applications_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

ALTER TABLE public.job_applications ALTER COLUMN id ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public.job_applications_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: job_positions; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.job_positions (
    id character varying(255) NOT NULL,
    department character varying(255),
    job_desc character varying(2000),
    experience character varying(255),
    location character varying(255),
    title character varying(255),
    type character varying(255)
);


--
-- Name: project_challenges; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.project_challenges (
    project_id character varying(255) NOT NULL,
    challenge_item character varying(1000)
);


--
-- Name: project_execution; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.project_execution (
    project_id character varying(255) NOT NULL,
    execution_item character varying(1000)
);


--
-- Name: project_highlights; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.project_highlights (
    project_id character varying(255) NOT NULL,
    highlight_item character varying(1000)
);


--
-- Name: project_scope; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.project_scope (
    project_id character varying(255) NOT NULL,
    scope_item character varying(1000)
);


--
-- Name: projects; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.projects (
    id character varying(255) NOT NULL,
    cat character varying(255),
    client character varying(255),
    description character varying(5000),
    diameter character varying(255),
    duration character varying(255),
    length character varying(255),
    location character varying(255),
    meta character varying(255),
    pressure character varying(255),
    project_type character varying(255),
    short_desc character varying(2000),
    slug character varying(255) NOT NULL,
    spec_label character varying(255),
    spec_value character varying(255),
    state character varying(255),
    status character varying(255),
    tag character varying(255),
    tag_color character varying(255),
    title character varying(255),
    wall_thickness character varying(255)
);


--
-- Name: rfq_enquiries; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.rfq_enquiries (
    id bigint NOT NULL,
    approx_length character varying(255),
    company_name character varying(255) NOT NULL,
    contact_person character varying(255),
    created_at timestamp(6) without time zone,
    description character varying(2000),
    diameter character varying(255),
    email character varying(255) NOT NULL,
    location character varying(255),
    phone character varying(255),
    project_type character varying(255),
    reference_no character varying(255) NOT NULL,
    status character varying(255),
    admin_notes text
);


--
-- Name: rfq_enquiries_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

ALTER TABLE public.rfq_enquiries ALTER COLUMN id ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public.rfq_enquiries_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: service_bullets; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.service_bullets (
    service_id character varying(255) NOT NULL,
    bullet character varying(1000)
);


--
-- Name: service_subcategories; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.service_subcategories (
    service_id character varying(255) NOT NULL,
    subcategory character varying(500)
);


--
-- Name: services; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.services (
    id character varying(255) NOT NULL,
    color character varying(255),
    icon character varying(255),
    n character varying(255),
    slug character varying(255) NOT NULL,
    standard character varying(255),
    text character varying(2000),
    title character varying(255)
);


--
-- Name: site_settings; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.site_settings (
    id character varying(64) DEFAULT 'default'::character varying NOT NULL,
    company_name character varying(255) DEFAULT 'CandelaConstruction Private Limited'::character varying NOT NULL,
    tagline character varying(255) DEFAULT 'Trust delivered.'::character varying NOT NULL,
    control_room_hotline character varying(100) DEFAULT '1800-180-9999'::character varying NOT NULL,
    compliance_codes character varying(255) DEFAULT 'PNGRB / ASME B31.8 / API 1104'::character varying NOT NULL,
    safe_hours character varying(100) DEFAULT '28.4M LTI-Free Safe Hours'::character varying NOT NULL,
    iso_badges character varying(255) DEFAULT 'ISO 9001:2015, ISO 14001, ISO 45001'::character varying NOT NULL,
    contact_email character varying(150) DEFAULT 'tenders@candelaconstruction.com'::character varying NOT NULL,
    emergency_phone character varying(100) DEFAULT '+91 1800-180-9999'::character varying NOT NULL,
    office_address text DEFAULT 'Candela Tower, Corporate Corridor, SG Highway, Ahmedabad, Gujarat - 380054'::text NOT NULL,
    hero_title text DEFAULT 'Building the Infrastructure Behind India''s Energy Future'::text NOT NULL,
    hero_subtitle text DEFAULT 'Specialized pipeline construction, engineering and infrastructure solutions for natural gas, hydrocarbons and industrial applications.'::text NOT NULL,
    updated_at timestamp with time zone DEFAULT now(),
    about_content jsonb,
    capabilities_content jsonb,
    home_content jsonb,
    regional_bases jsonb
);


--
-- Name: state_footprints; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.state_footprints (
    id character varying(255) NOT NULL,
    km integer NOT NULL,
    name character varying(255),
    projects integer NOT NULL,
    status character varying(255)
);


--
-- Name: sub_districts; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.sub_districts (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    district_id uuid NOT NULL,
    sub_district_name character varying(128) NOT NULL,
    block_type character varying(64) DEFAULT 'Tehsil'::character varying NOT NULL,
    corridor_km numeric(8,2) DEFAULT 0.00 NOT NULL,
    terrain_classification character varying(64) NOT NULL,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP
);


--
-- Name: tender_enquiries; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.tender_enquiries (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    reference_number character varying(32) NOT NULL,
    company_name character varying(255) NOT NULL,
    contact_name character varying(128) NOT NULL,
    email character varying(255) NOT NULL,
    phone character varying(32) NOT NULL,
    project_type character varying(64) NOT NULL,
    approx_length_km numeric(8,2),
    pipe_diameter character varying(64),
    target_district_id uuid,
    scope_description text NOT NULL,
    document_url character varying(512),
    bid_status character varying(32) DEFAULT 'PENDING'::character varying NOT NULL,
    submitted_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT tender_enquiries_bid_status_check CHECK (((bid_status)::text = ANY ((ARRAY['PENDING'::character varying, 'ESTIMATION_IN_PROGRESS'::character varying, 'BID_SUBMITTED'::character varying, 'WON'::character varying, 'DECLINED'::character varying])::text[])))
);


--
-- Data for Name: admin_auth; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.admin_auth VALUES ('default', '18a7c992c51c5905c8069316254044ca3f637e126280f2fdc496fc69344bbbc9b0d80bf248d999ee927787ed3c1cd5d37a35a1fb2bc589888165e05e0aaf4b5a', '64a749ffe61484d2c15a71e72ee5febe5568115ad35e084b157f911fcf155816', '5df3c58ff52bd2e4f950ceccacf2f2a57bc3c802298ae3d4fcb0c45aa43a0f883ce23763141def11291a5323b4b05e97e5efc4fe60a2059ee2f18951e49f83fa', '3d5d1fd48e2604f8fa2ef92de3178391517f20ede8fd008338c52c448850e5e8', 3, 0, NULL, '2026-09-19 17:31:52.827474+05:30', '2026-09-19 03:50:25.180699+05:30', '2026-09-19 03:44:54.386683+05:30');


--
-- Data for Name: client_approvals; Type: TABLE DATA; Schema: public; Owner: -
--



--
-- Data for Name: clients; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.clients VALUES ('954ab4cb-1350-49b4-816a-ee1d5b0163a0', 'GAIL', 'GAIL (India) Limited', 'National Gas Transmission', '/logos/gail.png', true, '2026-09-19 00:58:37.322414+05:30');
INSERT INTO public.clients VALUES ('fcf5c9d7-9b0b-45f3-8b32-8ee68d0a3ed9', 'IOCL', 'Indian Oil Corporation (IOCL)', 'Refinery & Hydrocarbon Pipelines', '/logos/iocl.png', true, '2026-09-19 00:58:37.322414+05:30');
INSERT INTO public.clients VALUES ('d1990851-37a7-44cf-8a11-acea67ab6bad', 'ONGC', 'Oil & Natural Gas Corp (ONGC)', 'Upstream & Offshore Tie-Ins', '/logos/ongc.png', true, '2026-09-19 00:58:37.322414+05:30');
INSERT INTO public.clients VALUES ('b9e9da4e-3d81-4318-ae72-ac7f9165fb7c', 'ATGL', 'Adani Total Gas Ltd', 'City Gas Distribution Networks', '/logos/adani.png', true, '2026-09-19 00:58:37.322414+05:30');
INSERT INTO public.clients VALUES ('78b4582e-650a-48c3-b741-85a26d046251', 'TORRENT', 'Torrent Gas Ltd', 'Urban CGD & CNG Infrastructure', '/logos/torrent.png', true, '2026-09-19 00:58:37.322414+05:30');
INSERT INTO public.clients VALUES ('a797057a-9dcc-4d62-ab85-943f1d169c63', 'GSPL', 'Gujarat State Petronet (GSPL)', 'State Gas Grid Trunklines', '/logos/gspl.png', true, '2026-09-19 00:58:37.322414+05:30');
INSERT INTO public.clients VALUES ('6e67ea10-c83e-41f7-81c8-57c9a252ff4a', 'BPCL', 'Bharat Petroleum (BPCL)', 'Cross-Country Product Lines', '/logos/bpcl.png', true, '2026-09-19 00:58:37.322414+05:30');
INSERT INTO public.clients VALUES ('99b0e3a1-a9c0-4eda-b9e5-58d85bb3e4f7', 'HPCL', 'Hindustan Petroleum (HPCL)', 'Terminal & Distribution Pipelines', '/logos/hpcl.png', true, '2026-09-19 00:58:37.322414+05:30');


--
-- Data for Name: corporate_news; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.corporate_news VALUES ('news-1', 'MILESTONE', 'Reflecting our steadfast commitment to ''Trust delivered.'', CandelaConstruction celebrates a landmark safety milestone across all active cross-country and urban spreads.', 'September 2026', 'Reflecting our steadfast commitment to ''Trust delivered.'', CandelaConstruction celebrates a landmark safety milestone across all active cross-country and urban spreads.', '3 min read', 'CandelaConstruction Crosses 28.4 Million Safe Man-Hours Without Lost Time Injury (LTI)');
INSERT INTO public.corporate_news VALUES ('news-2', 'COMMISSIONING', 'The 480 KM Phase-II high-pressure transmission line completed nitrogen purging and statutory hydrotesting with 100% pressure hold, delivering gas to regional industries.', 'August 2026', 'The 480 KM Phase-II high-pressure transmission line completed nitrogen purging and statutory hydrotesting with 100% pressure hold, delivering gas to regional industries.', '3 min read', 'Successful Charging of 42-Inch Western Gas Corridor Trunkline');
INSERT INTO public.corporate_news VALUES ('news-3', 'TECHNOLOGY', 'Utilizing optical gyroscopic steering and our 350-ton Vermeer rig spread, CandelaConstruction successfully installed a 36-inch heavy-wall carrier pipe 38 meters below riverbed.', 'June 2026', 'Utilizing optical gyroscopic steering and our 350-ton Vermeer rig spread, CandelaConstruction successfully installed a 36-inch heavy-wall carrier pipe 38 meters below riverbed.', '3 min read', 'Record 2,180-Meter Riverbed HDD Pullback Completed in Bharuch Estuary');
INSERT INTO public.corporate_news VALUES ('news-4', 'CONTRACT AWARD', 'Scope covers mechanized trenching, automatic dual-torch welding, and Sectionalizing Valve station construction through western energy corridors.', 'May 2026', 'Scope covers mechanized trenching, automatic dual-torch welding, and Sectionalizing Valve station construction through western energy corridors.', '3 min read', 'Awarded 320 KM Desert Pipeline Expansion EPC Contract by Leading Energy Utility');


--
-- Data for Name: district_corridors; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.district_corridors VALUES ('db6883c1-7a04-44d5-bd69-35d6c4478620', 'saran-chapra', 'Saran (Chapra)', 'Bihar', 'Chapra Sadar Hub', 340.00, 14, 4, true, '2026-09-19 00:05:13.052003+05:30');
INSERT INTO public.district_corridors VALUES ('d1e23d16-d44a-4ab3-a562-ff8c127818c2', 'vaishali', 'Vaishali (Hajipur)', 'Bihar', 'Hajipur Industrial Area', 285.00, 11, 4, true, '2026-09-19 00:05:13.052003+05:30');
INSERT INTO public.district_corridors VALUES ('63c48f17-6b97-49eb-8dff-e5b461cf36ba', 'muzaffarpur', 'Muzaffarpur', 'Bihar', 'Kanti Thermal Power Complex', 420.00, 16, 4, true, '2026-09-19 00:05:13.052003+05:30');
INSERT INTO public.district_corridors VALUES ('e3a0433f-2ef2-4a64-b7cb-8247ee1a24f3', 'samastipur', 'Samastipur', 'Bihar', 'Samastipur City Gate Station', 245.00, 9, 4, true, '2026-09-19 00:05:13.052003+05:30');


--
-- Data for Name: equipment; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.equipment VALUES ('Vermeer D750x900 & D330x500 HDD Rigs', 'Trenchless river, canal & highway crossings', 'Max span 2,500m, up to 48" Dia', '350-ton (750,000 lbs) pullback, 102,000 ft-lbs torque, optical gyro steering', '6 Spread Sets', 'Trenchless', '350-ton (750,000 lbs) pullback, 102,000 ft-lbs torque, optical gyro steering', '6 Spread Sets');
INSERT INTO public.equipment VALUES ('CRC-Evans / Lincoln Dual-Torch Automatic Welders', 'Mechanized external pipeline girth welding (GMAW/FCAW)', 'Cycle time 4 mins per 42" joint', 'Dual-arc microprocessor control, internal pneumatic copper shoes', '14 Spreads', 'Welding', 'Dual-arc microprocessor control, internal pneumatic copper shoes', '14 Spreads');
INSERT INTO public.equipment VALUES ('Kobelco SK380 / CAT 336D Excavators & Breakers', 'RoW grading, deep trenching, basalt rock breaking', 'Trenching depth up to 4.5m', '38-ton operating weight, Furukawa F45 hydraulic breakers (4,500 J impact)', '42 Units Owned', 'Earthmoving', '38-ton operating weight, Furukawa F45 hydraulic breakers (4,500 J impact)', '42 Units Owned');
INSERT INTO public.equipment VALUES ('Caterpillar 587T / 572R Sidebooms', 'Pipe handling, lowering-in, line-up clamping', 'Up to 48" Dia Pipes', 'Lifting capacity 90,000 kg (200,000 lbs), 24-ft boom, counterweight ballast', '30 Units Owned', 'Pipelaying', 'Lifting capacity 90,000 kg (200,000 lbs), 24-ft boom, counterweight ballast', '30 Units Owned');
INSERT INTO public.equipment VALUES ('High-Pressure Triplex Hydrotest Pump Spreads', 'Pipeline hydrostatic strength & leak testing', 'Flow rate 1,200 L/min at 200 bar', 'Positive displacement triplex plunger pumps up to 250 bar, electronic DWT', '8 Dedicated Sets', 'Testing', 'Positive displacement triplex plunger pumps up to 250 bar, electronic DWT', '8 Dedicated Sets');
INSERT INTO public.equipment VALUES ('CRC-Evans PB 16-32 & PB 30-48 Hydraulic Bending Machines', 'Cold field pipe bending along natural contour curves', '16" to 48" OD Pipes', 'High-yield hydraulic dies for API 5L X70/X80 pipes without ovality distortion', '8 Units', 'Heavy Machinery', 'High-yield hydraulic dies for API 5L X70/X80 pipes without ovality distortion', '8 Units');
INSERT INTO public.equipment VALUES ('High-Volume Desiccant Dry Air Compressors', 'Pipeline dewatering, swabbing & drying to -40°C', '-40°C Dew Point Output', 'Oil-free 1,500 CFM rotary screw units with twin-tower desiccant dryers', '6 Spreads', 'Heavy Machinery', 'Oil-free 1,500 CFM rotary screw units with twin-tower desiccant dryers', '6 Spreads');
INSERT INTO public.equipment VALUES ('Automated Ultrasonic PAUT / TOFD Crawlers', '100% girth weld non-destructive examination', 'Full 360° scan in 90 seconds', 'Phased array ultrasonic crawler with zone discrimination & TOFD probes', '12 Systems', 'Testing', 'Phased array ultrasonic crawler with zone discrimination & TOFD probes', '12 Systems');


--
-- Data for Name: equipment_categories; Type: TABLE DATA; Schema: public; Owner: -
--



--
-- Data for Name: equipment_deployments; Type: TABLE DATA; Schema: public; Owner: -
--



--
-- Data for Name: fleet_equipment; Type: TABLE DATA; Schema: public; Owner: -
--



--
-- Data for Name: hse_metrics; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.hse_metrics VALUES ('a9d7a8c6-088e-4d6a-80c1-a458f1180339', '2026-09-19', 28400000.00, 0.00, 100.00, 14, 42000);


--
-- Data for Name: job_applications; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.job_applications VALUES (1, 'APP-2026-4315', '2026-09-18 21:26:32.582251', 'vikram.aditya@outlook.com', '8 Years', 'Vadodara, Gujarat', 'Vikram Aditya', '+91 98111 22334', 'Senior Pipeline Engineer', 'RECEIVED', NULL);
INSERT INTO public.job_applications VALUES (3, 'APP-2026-9469', '2026-09-19 02:34:10.280001', 'candela@gmail.com', '5', 'ballia', 'Arjun Yadav', '+919264940046', 'Lead Pipeline Engineer (Cross-Country)', 'RECEIVED', NULL);


--
-- Data for Name: job_positions; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.job_positions VALUES ('pe-01', 'Engineering & Construction', 'Oversee pipeline alignment, stringing, ditching, and lowering spreads for a 42" gas trunkline. Experience with ASME B31.8 and API 1104 mandatory.', '5–8 Years', 'Ahmedabad / Project Sites', 'Lead Pipeline Engineer (Cross-Country)', 'Full-Time');
INSERT INTO public.job_positions VALUES ('se-02', 'Operations', 'Lead mechanized pipeline spread execution, RoW management, contractor coordination, and daily schedule tracking in compliance with PNGRB standards.', '8–12 Years', 'Pan-India Project Sites', 'Site Construction Manager', 'Full-Time');
INSERT INTO public.job_positions VALUES ('ndt-03', 'Quality Assurance (QA/QC)', 'Direct Phased Array Ultrasonic Testing (PAUT), TOFD, and radiographic interpretation of automated girth welds on high-pressure steel pipelines.', '4–7 Years', 'Gujarat / Rajasthan Sites', 'Senior NDT Level-II / Level-III Inspector', 'Full-Time');
INSERT INTO public.job_positions VALUES ('hdd-04', 'Trenchless Technology', 'Operate 250T to 450T Vermeer HDD rigs, optical gyroscopic steering tools, mud recycling plants, and lead large-diameter river pullbacks.', '5–10 Years', 'River Crossing Sites', 'HDD Rig Pilot / Directional Driller', 'Full-Time');
INSERT INTO public.job_positions VALUES ('hse-05', 'Health, Safety & Environment', 'Implement site HSE management systems, conduct daily toolbox talks, monitor Permit-to-Work (PTW) protocols, and enforce zero-incident culture.', '3–6 Years', 'Central India Corridor', 'HSE Specialist & Safety Officer', 'Full-Time');
INSERT INTO public.job_positions VALUES ('cgd-06', 'Urban Infrastructure', 'Supervise urban carbon steel and MDPE PE-100 electrofusion laying, microtrenching, City Gate Station piping, and domestic PNG connections.', '3–5 Years', 'Ahmedabad / Surat / Pune', 'City Gas Distribution (CGD) Project Engineer', 'Full-Time');


--
-- Data for Name: project_challenges; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.project_challenges VALUES ('ew', 'Dense basalt rock excavation along 120 km of Deccan plateau requiring controlled vibration blasting permits adjacent to active villages');
INSERT INTO public.project_challenges VALUES ('ew', 'Monsoon flooding in Maharashtra requiring specialized dewatering pump spreads and ditch stabilization');
INSERT INTO public.project_challenges VALUES ('ew', 'Complex crossing of 14 national highways, 6 railway tracks, and 45 irrigation canals with zero traffic disruption');
INSERT INTO public.project_challenges VALUES ('ew', 'Strict zero-spill ecological mandate through 28 km of designated forest buffer zone');
INSERT INTO public.project_challenges VALUES ('narmada', 'Semi-diurnal tidal height variation of 5.5 meters causing severe hydraulic head changes in the borehole');
INSERT INTO public.project_challenges VALUES ('narmada', 'Loose cobble and boulder stratigraphy requiring specialized polymer fluid chemistry to prevent borehole collapse');
INSERT INTO public.project_challenges VALUES ('narmada', 'Substantial pullback friction load demanding dynamic 320-ton pull capacity without coating abrasion');
INSERT INTO public.project_challenges VALUES ('cgd-main', 'Congested underground corridors packed with power cables, water mains, and optical fiber lines');
INSERT INTO public.project_challenges VALUES ('cgd-main', 'Maintaining continuous road traffic across heavy commercial arterial roads');
INSERT INTO public.project_challenges VALUES ('cgd-main', 'Strict city authority nighttime working hour constraints (11:00 PM to 05:00 AM)');
INSERT INTO public.project_challenges VALUES ('mumbai-feeder', 'Strict SIMOPS (Simultaneous Operations) protocols inside operating petroleum refinery');
INSERT INTO public.project_challenges VALUES ('mumbai-feeder', 'Highly corrosive coastal saline atmosphere requiring specialized 3-coat marine epoxy systems');
INSERT INTO public.project_challenges VALUES ('rajasthan-corridor', 'Extreme ambient desert temperatures reaching 50°C causing rapid pipe thermal elongation');
INSERT INTO public.project_challenges VALUES ('rajasthan-corridor', 'Shifting sand dunes requiring geotechnical geotextile slope stabilization');
INSERT INTO public.project_challenges VALUES ('mp-feeder', 'Deep black cotton expansive clay soil requiring extensive soil stabilization');
INSERT INTO public.project_challenges VALUES ('mp-feeder', 'Multiple irrigation canal crossings during active agricultural seasons');


--
-- Data for Name: project_execution; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.project_execution VALUES ('ew', 'Deployed 8 independent fully mechanized spreads with Lincoln Electric automated welding units');
INSERT INTO public.project_execution VALUES ('ew', 'Maintained 60+ joint welds per spread per day through internal pneumatic clamping');
INSERT INTO public.project_execution VALUES ('ew', 'Established 4 dedicated base camps with on-site QA/QC metallurgical testing labs');
INSERT INTO public.project_execution VALUES ('ew', 'Total project completed 2 months ahead of EPC contractual schedule');
INSERT INTO public.project_execution VALUES ('narmada', 'Vermeer D750x900 350-ton HDD rig deployed on North Bank with 250-ton tailing rig on South Bank');
INSERT INTO public.project_execution VALUES ('narmada', 'Utilized real-time gyroscopic tool tracking ensuring drill bit hit target exit within 15 cm tolerance');
INSERT INTO public.project_execution VALUES ('narmada', 'Continuous 26-hour uninterrupted pullback executed with dedicated backup power generators');
INSERT INTO public.project_execution VALUES ('cgd-main', 'Pioneered non-disruptive pneumatic moling and micro-HDD for all municipal road crossings');
INSERT INTO public.project_execution VALUES ('cgd-main', 'Deployed 35 mobile electrofusion teams equipped with barcode-scanning automatic fusion units');
INSERT INTO public.project_execution VALUES ('cgd-main', 'Established community liaison desk resolving municipal utility issues within 4 hours');
INSERT INTO public.project_execution VALUES ('mumbai-feeder', 'Modular off-site spool fabrication minimizing on-site hot work by 75%');
INSERT INTO public.project_execution VALUES ('mumbai-feeder', '24/7 dedicated safety watch with continuous hydrocarbon sniffers during joint welding');
INSERT INTO public.project_execution VALUES ('rajasthan-corridor', 'High-output twilight/night welding shifts during extreme summer peaks');
INSERT INTO public.project_execution VALUES ('rajasthan-corridor', 'Tracked sidebooms with extra-wide pad footprints for dune traversing');
INSERT INTO public.project_execution VALUES ('mp-feeder', 'Concurrent deployment of 3 pipeline spreads and 2 dedicated HDD spreads');
INSERT INTO public.project_execution VALUES ('mp-feeder', 'Real-time digital weld tracking and radiograph archival platform');


--
-- Data for Name: project_highlights; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.project_highlights VALUES ('ew', 'Over 52,000 girth welds using mechanized external dual-torch GMAW');
INSERT INTO public.project_highlights VALUES ('ew', '100% Phased Array Ultrasonic Testing (PAUT) with < 0.38% weld repair rate');
INSERT INTO public.project_highlights VALUES ('ew', 'Continuous 3LPE field joint coating with zero holiday defect at handover');
INSERT INTO public.project_highlights VALUES ('ew', 'Full agricultural soil profile restoration returning 100% farmland to landowners');
INSERT INTO public.project_highlights VALUES ('narmada', 'Continuous pullback length of 2,180 meters under tidal estuary waters');
INSERT INTO public.project_highlights VALUES ('narmada', 'Zero surface blowouts or bentonite leakage into sensitive river marine ecosystem');
INSERT INTO public.project_highlights VALUES ('narmada', 'Non-destructive holiday testing at 25 kV prior to reaming pullback');
INSERT INTO public.project_highlights VALUES ('narmada', 'Hydrostatic strength tested at 147 bar for 24 hours with zero pressure drop');
INSERT INTO public.project_highlights VALUES ('cgd-main', '1,550 KM laid across urban zones with zero utility line strikes');
INSERT INTO public.project_highlights VALUES ('cgd-main', '120,000 domestic PNG kitchens energized safely');
INSERT INTO public.project_highlights VALUES ('cgd-main', '18 CNG stations commissioned supplying green fuel to 40,000 vehicles daily');
INSERT INTO public.project_highlights VALUES ('cgd-main', 'Zero gas leaks recorded during pneumatic testing at 1.5x working pressure');
INSERT INTO public.project_highlights VALUES ('mumbai-feeder', 'Zero plant downtime during tie-in to mainline refinery header');
INSERT INTO public.project_highlights VALUES ('mumbai-feeder', '4.2 million man-hours executed with zero recordable injuries');
INSERT INTO public.project_highlights VALUES ('mumbai-feeder', '100% radiographic acceptance with zero weld defects in high-pressure steam/gas lines');
INSERT INTO public.project_highlights VALUES ('rajasthan-corridor', '210 KM already completed ahead of scheduled milestone target');
INSERT INTO public.project_highlights VALUES ('rajasthan-corridor', 'Zero water loss through closed-loop hydrotest recycling systems');
INSERT INTO public.project_highlights VALUES ('mp-feeder', '180 KM successfully lowered and backfilled');
INSERT INTO public.project_highlights VALUES ('mp-feeder', 'All 4 river HDD crossings pulled through successfully');


--
-- Data for Name: project_scope; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.project_scope VALUES ('ew', 'Cadastral survey, RoW clearing & grading across 480 KM corridor');
INSERT INTO public.project_scope VALUES ('ew', 'Excavation in hard basalt rock requiring controlled blasting and hydraulic breakers');
INSERT INTO public.project_scope VALUES ('ew', 'Stringing, bending, and line-up of over 40,000 pipes (API 5L X70)');
INSERT INTO public.project_scope VALUES ('ew', 'Mechanized external dual-torch GMAW automated girth welding');
INSERT INTO public.project_scope VALUES ('ew', '100% Phased Array Ultrasonic Testing (PAUT) & TOFD examination');
INSERT INTO public.project_scope VALUES ('ew', 'Field joint coating with 3LPE heat-shrink sleeves and 25 kV holiday test');
INSERT INTO public.project_scope VALUES ('ew', 'Coordinated multi-sideboom lowering-in and padded backfilling');
INSERT INTO public.project_scope VALUES ('ew', '8 major river HDD crossings ranging up to 1,600m each');
INSERT INTO public.project_scope VALUES ('ew', '24-hour statutory hydrostatic pressure testing at 145 bar');
INSERT INTO public.project_scope VALUES ('ew', 'Air drying to -40°C dew point and nitrogen purging for safe commissioning');
INSERT INTO public.project_scope VALUES ('narmada', 'Sub-bottom geotechnical profiling and borehole sonic investigation');
INSERT INTO public.project_scope VALUES ('narmada', 'Detailed pilot hole trajectory design with 38m minimum cover beneath bed');
INSERT INTO public.project_scope VALUES ('narmada', 'Dual-rig pilot hole drilling using optical gyroscopic steering guidance');
INSERT INTO public.project_scope VALUES ('narmada', 'Multi-stage reaming from 12" pilot up to 48" hole diameter in abrasive gravel');
INSERT INTO public.project_scope VALUES ('narmada', 'High-efficiency solids control and mud recycling system handling 3,500 L/min');
INSERT INTO public.project_scope VALUES ('narmada', 'String fabrication, 100% PAUT inspection, and 25 kV holiday test of 2.18 km string');
INSERT INTO public.project_scope VALUES ('narmada', 'Continuous pullback of 36" steel carrier pipe in a single 26-hour operation');
INSERT INTO public.project_scope VALUES ('narmada', 'Hydrostatic testing at 147 bar for 24 continuous hours');
INSERT INTO public.project_scope VALUES ('cgd-main', 'Underground utility mapping using Ground Penetrating Radar (GPR)');
INSERT INTO public.project_scope VALUES ('cgd-main', '350 km carbon steel feeder network (8" to 12") operating at 49 bar');
INSERT INTO public.project_scope VALUES ('cgd-main', '1,200 km MDPE PE-100 gas distribution network via electrofusion');
INSERT INTO public.project_scope VALUES ('cgd-main', 'Civil, mechanical & piping EPC for 18 CNG mother & daughter stations');
INSERT INTO public.project_scope VALUES ('cgd-main', 'Installation of 42 District Regulating Stations (DRS) and Metering Skids');
INSERT INTO public.project_scope VALUES ('cgd-main', '120,000 domestic PNG riser piping connections with individual isolation valves');
INSERT INTO public.project_scope VALUES ('cgd-main', 'Online SCADA telemetry linking all DRS stations to centralized control room');
INSERT INTO public.project_scope VALUES ('mumbai-feeder', 'Pre-fabrication of heavy-wall piping spools in ISO-certified yard');
INSERT INTO public.project_scope VALUES ('mumbai-feeder', 'Installation of dual 24" scraper launcher and receiver barrels');
INSERT INTO public.project_scope VALUES ('mumbai-feeder', 'Cryogenic grade stainless steel piping installation at LNG terminal interface');
INSERT INTO public.project_scope VALUES ('mumbai-feeder', 'Emergency shutdown valve (ESD) skids with pneumatic actuators');
INSERT INTO public.project_scope VALUES ('mumbai-feeder', '100% Radiography, PAUT, and hydrostatic test at 130 bar');
INSERT INTO public.project_scope VALUES ('rajasthan-corridor', 'Route clearing and sand stabilization along 320 km desert RoW');
INSERT INTO public.project_scope VALUES ('rajasthan-corridor', 'Trenching with customized continuous sand-retention ditch shields');
INSERT INTO public.project_scope VALUES ('rajasthan-corridor', 'Mechanized dual-torch pipeline welding and automated ultrasonic testing');
INSERT INTO public.project_scope VALUES ('rajasthan-corridor', 'Installation of 6 Sectionalizing Valve (SV) stations powered by solar telemetry skids');
INSERT INTO public.project_scope VALUES ('mp-feeder', 'DGPS survey, RoW clearing, and mechanized ditching');
INSERT INTO public.project_scope VALUES ('mp-feeder', '28" steel pipe stringing, automatic welding, and 100% PAUT');
INSERT INTO public.project_scope VALUES ('mp-feeder', 'HDD crossings of Chambal and Gambhir river systems');
INSERT INTO public.project_scope VALUES ('mp-feeder', 'EPC of 3 City Gate Stations with ultrasonic gas metering');
INSERT INTO public.project_scope VALUES ('proj-mu7d361k', 'Cadastral survey and RoW grading');
INSERT INTO public.project_scope VALUES ('proj-mu7d361k', 'Mechanized dual-torch automatic girth welding');
INSERT INTO public.project_scope VALUES ('proj-mu7d361k', '100% PAUT / AUT inspection and holiday check');
INSERT INTO public.project_scope VALUES ('proj-mu7d361k', '24-hour statutory hydrostatic pressure test');


--
-- Data for Name: projects; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.projects VALUES ('narmada', 'hdd', 'Indian Oil Corporation Limited (IOCL)', 'One of western India''s largest continuous pipeline HDD installations. Navigating heavy tidal currents, boulder/cobble stratification, and 38-meter sub-bed scour depths. Executed using CandelaConstruction''s Vermeer D750x900 350-ton rig, utilizing gyro steering tools and polymer bentonite mud management.', '36" (914 mm) OD Heavy Wall', '75 Days', '2,180 Meters Continuous Span', 'Bharuch, Gujarat (Tidal Estuary)', 'Span: 2,180 M | 36" OD', '98 Bar', 'Trenchless River Crossing (HDD)', 'Single-span 36" steel carrier pipeline drilled 38 meters below scouring river bed encountering sand, gravel, and high tidal pressure fluctuations.', 'narmada-river-crossing', 'Rig Fleet', 'Vermeer D750x900 (350 Ton)', 'Gujarat', 'Completed', 'RIVER HDD CROSSING', 'cyan', 'Narmada Riverbed Estuary Crossing', '28.6 mm (API 5L X65 Heavy Wall)');
INSERT INTO public.projects VALUES ('cgd-main', 'cgd', 'Adani Total Gas Limited / Torrent Gas', 'Executed inside highly congested municipal jurisdictions, highway utility corridors, and heavy manufacturing clusters. CandelaConstruction deployed microtunnelling, moling, and precision micro-trenching alongside nighttime work permits to lay infrastructure with minimal citizen disruption.', 'Steel: 8"-12" / MDPE: 32mm to 125mm', '30 Months (Multi-Zone)', '1,550 Kilometers (350 KM Steel + 1,200 KM PE)', 'Ahmedabad, Sanand & Mehsana Industrial Zones', 'Steel + MDPE: 1,550 KM', 'Steel: 49 Bar / PE: 4 Bar', 'City Gas Distribution & CNG Stations', 'Complete urban gas network with carbon steel ring mains, MDPE electrofusion lines, 18 CNG mother/daughter stations, and 120,000 domestic PNG connections.', 'greater-cgd-network', 'Urban Connections', '120,000+ PNG / 18 CNG Stations', 'Gujarat', 'Completed', 'URBAN CGD NETWORK', 'emerald', 'Greater Industrial Belt CGD Deployment', 'API 5L Gr B / PE-100 PN 16');
INSERT INTO public.projects VALUES ('mumbai-feeder', 'plant-piping', 'Bharat Petroleum Corporation Limited (BPCL)', 'High-consequence pipeline execution inside active refinery blast zones and tidal mangrove terrain. Required intrinsically safe equipment, hot-work permits in Class-1 Div-1 zones, and pre-fabricated modular piping skids.', '24" (610 mm) OD & Plant Piping', '14 Months', '45 Kilometers + Station Spools', 'Mumbai Coastal Terminal & Refinery Complex', 'Length: 45 KM | 24" OD', '85 Bar (ANSI Class 600)', 'Terminal Interconnect & Station Piping', 'High-pressure gas delivery line and terminal pig receiver skids linking an LNG import facility with an operational petroleum refinery.', 'mumbai-offshore-feeder', 'Safety Environment', 'Class-1 Div-1 SIMOPS Safe', 'Maharashtra', 'Completed', 'REFINERY & TERMINAL PIPING', 'orange', 'Coastal Refinery Gas Interconnect & Terminal Piping', '14.3 mm to 20.6 mm (API 5L X65 / SS316L)');
INSERT INTO public.projects VALUES ('rajasthan-corridor', 'cross-country', 'Vedanta Cairn Oil & Gas / GAIL', 'Currently underway across challenging sand terrain in western Rajasthan. CandelaConstruction has established mobile air-conditioned welding camps and high-capacity ditching wheel excavators capable of cutting through shifting sand without wall collapse.', '30" (762 mm) OD', '18 Months', '320 Kilometers', 'Barmer - Jodhpur Energy Corridor', 'Length: 320 KM | 30" OD', '92 Bar', 'Natural Gas Transmission', '30-inch gas evacuation line across Thar desert shifting dunes, requiring heavy-duty tracked equipment and thermal expansion anchors.', 'rajasthan-desert-trunkline', 'Current Progress', '68% Completed / On Schedule', 'Rajasthan', 'Ongoing', 'CROSS-COUNTRY TRUNKLINE', 'amber', 'Rajasthan Desert Energy Pipeline Spur', '12.7 mm to 17.5 mm (API 5L X70)');
INSERT INTO public.projects VALUES ('mp-feeder', 'cross-country', 'GAIL (India) Limited', 'Connecting national trunkline grids to industrial manufacturing hubs in Madhya Pradesh. Incorporates 4 river HDD crossings, 18 canal crossings, and 3 City Gate Stations (CGS).', '28" (711 mm) OD', '16 Months', '260 Kilometers', 'Indore - Pithampur - Ujjain Corridor', 'Length: 260 KM | 28" OD', '90 Bar', 'Industrial Gas Grid Spur', '28-inch transmission trunkline supplying natural gas to major auto manufacturing hubs and chemical clusters in central India.', 'central-india-gas-grid', 'Current Progress', '75% Completed', 'Madhya Pradesh', 'Ongoing', 'INTERSTATE GAS GRID', 'amber', 'Central India Industrial Gas Corridor', '14.2 mm (API 5L X65)');
INSERT INTO public.projects VALUES ('ew', 'cross-country', 'GAIL (India) Limited / State Energy Board', 'This landmark 480-km trunkline required continuous automated ultrasonic inspection (AUT) across challenging basalt rock formations, deep black cotton agricultural soil, and 8 major river crossings. CandelaConstruction deployed 8 pipeline spreads simultaneously, completing the project without a single LTI and achieving zero pressure loss during the 24-hour statutory hydrotest.', '42" (1,067 mm) OD', '22 Months (Record Delivery)', '480 Kilometers', 'Gujarat / Maharashtra Interstate Corridor', 'Length: 480 KM | 42" OD', '100 Bar (Class 600 ANSI)', 'High-Pressure Natural Gas Trunkline', '42" OD API 5L X70 high-pressure transmission line passing through rocky Deccan traps and irrigated farmland with 8 river crossings.', 'western-gas-corridor', 'Welding', '100% Mechanized Dual-Torch AUT', 'Gujarat & Maharashtra', 'Completed', 'CROSS-COUNTRY TRUNKLINE', 'amber', 'Western Gas Corridor Trunkline (Phase-II)', '19.1 mm to 25.4 mm (API 5L X70 PSL2)');
INSERT INTO public.projects VALUES ('proj-mu7d361k', 'cross-country', 'Indian Oil Corporation Limited', 'equipment that are used in the distribution of the gas-pipeline', '42" (1,067 mm) OD', '', '10 Kilometers', 'NORTH EAST BIHAR (SARAN)', 'Length: 10 Kilometers | 42" (1,067 mm) OD', '100 Bar (Class 600 ANSI)', '', 'Distribution of gas pipe line across the chapra sub distric saran ', 'iocl-gas-pipeline-distribution', 'Welding', '100% PAUT / AUT', 'Bihar', 'Active Operations', 'CROSS-COUNTRY TRUNKLINE', 'amber', 'IOCL GAS PIPELINE DISTRIBUTION', '');
INSERT INTO public.projects VALUES ('proj-mu8asgmv', 'plant-piping', 'SBI-INB', 'USE CASE NEED TO UPDATE THE VALUE AND VALIDATE THE SYSTEM BEFORE DOOING ANY CHANGE', '34', '60 Days', '5000', 'UP', 'Length: 5000 | 34', '', '', 'THIS PROJECT IS FOR BANK PURPOSE', 'eMudhra', 'Welding', '100% PAUT / AUT', '', 'Tendering', 'CROSS-COUNTRY TRUNKLINE', 'amber', 'EMUDHRA', '');


--
-- Data for Name: rfq_enquiries; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.rfq_enquiries VALUES (1, '320', 'GAIL India Limited', 'Rajesh Sharma', '2026-09-18 21:26:32.416833', 'Natural gas transmission trunkline.', '36"', 'rsharma@gail.co.in', 'Gujarat to Rajasthan', '+91 98765 43210', 'CROSS_COUNTRY_GAS', 'RFQ-2026-7242', 'PENDING_REVIEW', NULL);
INSERT INTO public.rfq_enquiries VALUES (3, '100 KM', 'bbcl', 'Arjun Yadav', '2026-09-19 02:33:05.046916', 'soil/train', '24 OD / 36', 'candela@gmail.com', 'Purvanchal ', '+919264940046', 'Cross Country Pipeline', 'RFQ-2026-1193', 'PENDING_REVIEW', NULL);
INSERT INTO public.rfq_enquiries VALUES (4, '400 KM', 'BBCL ', 'Arjun Yadav', '2026-09-19 17:30:00.37038', 'soil/train', '24 od', 'candela@gmail.com', 'Purvanchal', '+919264940046', 'Hydrotesting', 'RFQ-2026-9405', 'PENDING_REVIEW', NULL);


--
-- Data for Name: service_bullets; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.service_bullets VALUES ('cross-country', 'API 5L Grade X60, X70, X80 steel mainline execution');
INSERT INTO public.service_bullets VALUES ('cross-country', 'Comprehensive Right-of-Way (RoW) acquisition & clearance');
INSERT INTO public.service_bullets VALUES ('cross-country', 'Mechanized trenching, ditching & controlled rock blasting');
INSERT INTO public.service_bullets VALUES ('cross-country', 'Precision cold field bending, stringing & lowering spreads');
INSERT INTO public.service_bullets VALUES ('cgd', 'Carbon steel feeder grid (4" to 16") with 100% radiographic check');
INSERT INTO public.service_bullets VALUES ('cgd', 'Medium Density Polyethylene (MDPE PE-100) electrofusion networks');
INSERT INTO public.service_bullets VALUES ('cgd', 'Mother / Daughter CNG station cascade dispensing piping');
INSERT INTO public.service_bullets VALUES ('cgd', 'Commercial & Industrial (C&I) metering & regulating skids (MRS)');
INSERT INTO public.service_bullets VALUES ('hdd', 'Heavy rig fleet from 100-ton to 450-ton pullback capacity');
INSERT INTO public.service_bullets VALUES ('hdd', 'Continuous crossings exceeding 2,200 meters in single pulls');
INSERT INTO public.service_bullets VALUES ('hdd', 'Gyroscopic steering & wireline magnetic guidance systems');
INSERT INTO public.service_bullets VALUES ('hdd', 'Active mud cleaning, solids control & bentonite recycling loops');
INSERT INTO public.service_bullets VALUES ('welding', 'Automatic dual-head external mechanized GMAW / FCAW spreads');
INSERT INTO public.service_bullets VALUES ('welding', 'Internal pneumatic lineup clamps with copper backup shoes');
INSERT INTO public.service_bullets VALUES ('welding', 'Cellulosic & low-hydrogen manual shielded metal arc welding (SMAW)');
INSERT INTO public.service_bullets VALUES ('welding', 'Strict Procedure Qualification Records (PQR) & Welder Performance (WPQ)');
INSERT INTO public.service_bullets VALUES ('hydrotesting', '24-hour statutory hydrostatic pressure holds up to 150 bar');
INSERT INTO public.service_bullets VALUES ('hydrotesting', 'High-accuracy electronic deadweight testers (0.01 bar precision)');
INSERT INTO public.service_bullets VALUES ('hydrotesting', 'Controlled dewatering and swabbing using bi-directional foam pigs');
INSERT INTO public.service_bullets VALUES ('hydrotesting', 'Full test documentation, pressure-volume plots & certification');
INSERT INTO public.service_bullets VALUES ('engineering', 'High-precision DGPS / Total Station route center-line staking');
INSERT INTO public.service_bullets VALUES ('engineering', 'Geotechnical soil borehole drilling, resistivity & seismic surveys');
INSERT INTO public.service_bullets VALUES ('engineering', 'Hydraulic flow simulation, surge analysis & stress engineering');
INSERT INTO public.service_bullets VALUES ('engineering', 'Crossing design profiles, bill of quantities (BOQ) & permit filings');
INSERT INTO public.service_bullets VALUES ('ndt', 'Automated Ultrasonic Testing (AUT) crawler bands with zone discrimination');
INSERT INTO public.service_bullets VALUES ('ndt', 'Phased Array Ultrasonic Testing (PAUT) & Time of Flight Diffraction (TOFD)');
INSERT INTO public.service_bullets VALUES ('ndt', 'X-Ray and Gamma-Ray internal pipeline crawler radiography');
INSERT INTO public.service_bullets VALUES ('ndt', 'Magnetic Particle Inspection (MPI) and Dye Penetrant Testing (DPT)');
INSERT INTO public.service_bullets VALUES ('precommissioning', 'Brush & magnetic pigging runs for mill-scale and debris removal');
INSERT INTO public.service_bullets VALUES ('precommissioning', 'Electronic Geometric Pigging (EGP / Caliper) for dent & ovality detection');
INSERT INTO public.service_bullets VALUES ('precommissioning', 'High-volume desiccant oil-free dry air spreads down to -40°C');
INSERT INTO public.service_bullets VALUES ('precommissioning', 'Cryogenic liquid nitrogen vaporization and oxygen displacement (<1%)');
INSERT INTO public.service_bullets VALUES ('plantpiping', 'Heavy-wall carbon steel, stainless steel & alloy steel spool fabrication');
INSERT INTO public.service_bullets VALUES ('plantpiping', 'Sectionalizing Valve (SV) Stations & Scraper Launcher/Receiver Traps');
INSERT INTO public.service_bullets VALUES ('plantpiping', 'Dual stream pressure reduction and metering stations (PRMS)');
INSERT INTO public.service_bullets VALUES ('plantpiping', 'Emergency Shutdown (ESD) valves, gas detectors & SCADA integration');
INSERT INTO public.service_bullets VALUES ('maintenance', 'Zero-shutdown under-pressure branch hot tapping (2" to 48")');
INSERT INTO public.service_bullets VALUES ('maintenance', 'Line stopping (Stopple) for pressurized segment replacement');
INSERT INTO public.service_bullets VALUES ('maintenance', 'Full-encirclement welded split sleeve & composite repair wraps');
INSERT INTO public.service_bullets VALUES ('maintenance', '24x7 emergency rapid response deployment teams across India');


--
-- Data for Name: service_subcategories; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.service_subcategories VALUES ('cross-country', 'High-pressure transmission trunklines');
INSERT INTO public.service_subcategories VALUES ('cross-country', 'Regional feeder spur lines');
INSERT INTO public.service_subcategories VALUES ('cross-country', 'Cathodic protection (CP) systems');
INSERT INTO public.service_subcategories VALUES ('cgd', 'Domestic PNG Riser Connections');
INSERT INTO public.service_subcategories VALUES ('cgd', 'CNG Station High-Pressure Piping');
INSERT INTO public.service_subcategories VALUES ('cgd', 'Industrial Feeder Networks');
INSERT INTO public.service_subcategories VALUES ('hdd', 'Perennial River Bed Crossings');
INSERT INTO public.service_subcategories VALUES ('hdd', 'National Highway & Expressways');
INSERT INTO public.service_subcategories VALUES ('hdd', 'Railway Tracks & Canals');
INSERT INTO public.service_subcategories VALUES ('welding', 'Automatic Dual-Torch GMAW');
INSERT INTO public.service_subcategories VALUES ('welding', 'Manual 6G Welder Spreads');
INSERT INTO public.service_subcategories VALUES ('welding', 'Welding Consumables Management');
INSERT INTO public.service_subcategories VALUES ('hydrotesting', 'Strength & Leak Testing');
INSERT INTO public.service_subcategories VALUES ('hydrotesting', 'Dewatering & Swabbing');
INSERT INTO public.service_subcategories VALUES ('hydrotesting', 'Nitrogen Preservation');
INSERT INTO public.service_subcategories VALUES ('engineering', 'Alignment Sheet Preparation');
INSERT INTO public.service_subcategories VALUES ('engineering', 'Crossing Engineering Profiles');
INSERT INTO public.service_subcategories VALUES ('engineering', 'Environmental Impact Assessment');
INSERT INTO public.service_subcategories VALUES ('ndt', 'AUT Pipeline Crawlers');
INSERT INTO public.service_subcategories VALUES ('ndt', 'PAUT / TOFD Welds');
INSERT INTO public.service_subcategories VALUES ('ndt', 'Holiday Testing (25kV)');
INSERT INTO public.service_subcategories VALUES ('precommissioning', 'Caliper EGP Pigging');
INSERT INTO public.service_subcategories VALUES ('precommissioning', 'Vacuum & Dry Air Drying');
INSERT INTO public.service_subcategories VALUES ('precommissioning', 'Nitrogen Inerting Spreads');
INSERT INTO public.service_subcategories VALUES ('plantpiping', 'City Gate Stations (CGS)');
INSERT INTO public.service_subcategories VALUES ('plantpiping', 'SV Stations & Scraper Traps');
INSERT INTO public.service_subcategories VALUES ('plantpiping', 'Refinery Piping Networks');
INSERT INTO public.service_subcategories VALUES ('maintenance', 'Hot Tapping & Line Stopping');
INSERT INTO public.service_subcategories VALUES ('maintenance', 'Composite Wrap Repairs');
INSERT INTO public.service_subcategories VALUES ('maintenance', 'Emergency Pipeline Rectification');


--
-- Data for Name: services; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.services VALUES ('cross-country', 'amber', 'pipeline', '01', 'cross-country-pipelines', 'ASME B31.8 / API 1104 / PNGRB T4S', 'Long-distance high-pressure pipeline construction for natural gas, hydrocarbons, and energy infrastructure up to 48" diameter under ANSI 600/900 classes.', 'Cross-Country Gas Pipelines');
INSERT INTO public.services VALUES ('cgd', 'emerald', 'network', '02', 'city-gas-distribution', 'PNGRB T4S / ASME B31.8', 'Urban steel and PE pipeline distribution networks connecting City Gate Stations (CGS), District Regulating Stations (DRS), commercial estates, and domestic households.', 'City Gas Distribution (CGD)');
INSERT INTO public.services VALUES ('hdd', 'cyan', 'drill', '03', 'hdd-trenchless-technology', 'DCA Standards / ASME B31.8', 'Non-disruptive pipeline crossings beneath major rivers, canals, national highways, railways, and congested urban intersections using heavy directional drilling rigs.', 'HDD / Trenchless Technology');
INSERT INTO public.services VALUES ('welding', 'orange', 'weld', '04', 'pipeline-welding', 'API 1104 / ASME Section IX', 'Automated mechanized and manual girth welding systems delivering defect rates below 0.5% on heavy-wall API 5L steel pipelines.', 'Pipeline Welding & Jointing');
INSERT INTO public.services VALUES ('hydrotesting', 'cyan', 'test', '05', 'hydrotesting-dewatering', 'ASME B31.8 / OISD-141 / API 1110', 'Statutory pipeline integrity testing utilizing high-volume fill spreads, positive displacement pressurization pumps, and deadweight electronic pressure-temperature logging.', 'Hydrotesting & Dewatering');
INSERT INTO public.services VALUES ('engineering', 'amber', 'engineering', '06', 'pipeline-engineering', 'OISD / PNGRB / ASME B31.8', 'Front-End Engineering Design (FEED), detailed route engineering, GIS topographic surveying, geotechnical investigations, and hydraulic transient analysis.', 'Pipeline Engineering & Route Survey');
INSERT INTO public.services VALUES ('ndt', 'emerald', 'scan', '07', 'ndt-inspection', 'API 1104 / ASNT SNT-TC-1A / ISO 9712', 'Advanced non-destructive examination (NDE) deploying automated ultrasonic testing, phased array, and digital radiography for instant defect sizing and characterization.', 'NDT & Quality Inspection');
INSERT INTO public.services VALUES ('precommissioning', 'cyan', 'gauge', '08', 'pre-commissioning', 'ASME B31.8 / OISD-226', 'Turnkey pipeline preparation following construction including mechanical cleaning, gauging, caliper pigging (EGP), dry air drying down to -40°C dew point, and nitrogen inerting.', 'Pre-Commissioning & Air Drying');
INSERT INTO public.services VALUES ('plantpiping', 'orange', 'factory', '09', 'plant-piping', 'ASME B31.3 / OISD-118', 'Mechanical fabrication and erection of industrial piping systems for gas processing terminals, refineries, petrochemical plants, and City Gate Stations (CGS).', 'Plant Piping & Station EPC');
INSERT INTO public.services VALUES ('maintenance', 'red', 'wrench', '10', 'pipeline-maintenance', 'API 2201 / ASME B31G', 'Live under-pressure branch tie-ins (Hot Tapping) up to 48" mainline and line stopping (Stopple) isolation without interrupting continuous gas deliveries.', 'Pipeline Maintenance & Hot Tapping');


--
-- Data for Name: site_settings; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.site_settings VALUES ('default', 'CandelaConstruction Private Limited', 'Trust delivered.', '1800-180-9999', 'PNGRB / ASME B31.8 / API 1104', '28.4M LTI-Free Safe Hours', 'ISO 9001:2015, ISO 14001, ISO 45001', 'tenders@candelaconstruction.com', '+91 1800-180-9999', 'Candela Tower, Corporate Corridor, SG Highway, Ahmedabad, Gujarat - 380054', 'Building the Infrastructure Behind India''s Energy Future', 'Specialized pipeline construction, engineering and infrastructure solutions for natural gas, hydrocarbons and industrial applications.', '2026-09-19 03:20:24.922861+05:30', '{"vision": {"desc": "We aspire to engineer, construct, and safeguard the pipelines that deliver clean natural gas and vital hydrocarbons to every industrial corridor, power generation plant, and domestic household in the nation with zero harm to human life and the natural environment.", "title": "To Be India''s Most Trusted Energy Infrastructure Partner", "eyebrow": "OUR VISION"}, "mission": {"desc": "To deploy industry-leading trenchless technology, automated welding systems, and digital quality oversight to execute high-pressure pipelines ahead of client schedules, while setting the benchmark for environmental restoration and worker health.", "title": "Precision Engineering, Zero Rework, Absolute Safety", "eyebrow": "OUR MISSION"}, "pillars": [{"desc": "End-to-end delivery from route cadastral survey and design to hydrostatic commissioning and nitrogen inerting.", "title": "Turnkey EPC Execution"}, {"desc": "Proven mastery over basalt hard rock Deccan plateaus, tidal river estuaries, desert sands, and congested urban zones.", "title": "Complex Terrain Capability"}, {"desc": "Execution strictly governed by ASME B31.8, API 1104, PNGRB T4S, and OISD-141 regulations.", "title": "Strict Code Compliance"}], "heritage": {"p1": "Founded in 1994, CandelaConstruction Private Limited began as a specialized pipeline engineering consultancy and has grown into a premier pan-India EPC contractor capable of mobilizing multiple heavy mechanized spreads simultaneously.", "p2": "We have successfully constructed and charged over 3,850 kilometers of transmission pipelines operating up to ANSI Class 900 pressure ratings (120 Bar). Our company-owned equipment fleet includes 350-ton Vermeer HDD rigs, Caterpillar 587T sidebooms, and CRC-Evans automatic dual-torch welding systems.", "title": "Three Decades of Engineering Excellence", "eyebrow": "OUR HERITAGE", "assetOwnership": "100%", "hydrotestRecord": "Zero Failure", "assetOwnershipSub": "No third-party rig dependency", "hydrotestRecordSub": "100% first-time pressure pass"}, "governance": {"desc": "Our board of directors and technical steering committee enforce rigorous fiduciary accountability, statutory code compliance, and environmental stewardship across all pan-India operations.", "title": "Seasoned Leadership & Corporate Governance Council", "eyebrow": "EXECUTIVE GOVERNANCE", "framework": [{"code": "GOV-01", "desc": "Full adherence to PNGRB T4S, ASME B31.8, API 1104, and OISD-141 regulations overseen directly by dedicated Quality Committees.", "title": "Statutory & Technical Compliance Charter"}, {"code": "GOV-02", "desc": "Every engineer, contractor, and welder holds immediate, penalty-free authority to halt operations if safety or environmental standards are breached.", "title": "Board-Mandated Stop-Work Authority"}, {"code": "GOV-03", "desc": "Engagement of accredited inspection agencies (TUV, DNV, Lloyd''s Register, EIL) for mandatory pre-weld, NDT, and hydrotest validations.", "title": "Independent Third-Party Quality Audits"}, {"code": "GOV-04", "desc": "Zero-tolerance anti-corruption policy with end-to-end digital audit trails for public sector and private operator tender submissions.", "title": "Anti-Bribery, Ethics & Transparent Procurement"}]}, "leadership": [{"name": "Prabhat Yadav", "role": "Managing Director & CEO", "background": "Former Executive Director at premier national energy utilities. Spearheaded over 5,000 km of cross-country trunklines across India and the Middle East.", "experience": ""}, {"name": "Upender N. Yadav", "role": "Director — Operations & EPC", "background": "Expert in heavy mechanized logistics, high-risk river crossings, and rapid mobilization across remote terrains.", "experience": "28+ Years Experience"}, {"name": "Arjun Yadav", "role": "Head of Engineering & Technical Services", "background": "B.Tech in Information Technology . Specialist in ASME B31.8 hydraulic transient analysis, seismic crossing design, and trenchless engineering.", "experience": "24+ Years Experience"}, {"name": "K. R. Narayanan", "role": "Chief Quality & HSE Officer", "background": "ASNT Level-III, NACE Certified Specialist. Oversees our 0.00 LTIFR track record and institutionalized our 14 Golden Rules of Pipeline Safety.", "experience": "26+ Years Experience"}], "whyChooseUs": [{"desc": "In-house engineering, hydraulic modelling, and specialized pipeline construction crews with decades of continuous project execution.", "title": "Technical Expertise", "metric": "32+ Years Track Record"}, {"desc": "Uncompromising HSE systems with 28.4 million safe man-hours, 14 Golden Rules, and strict daily Job Safety Analysis (JSA) protocols.", "title": "Safety First Culture", "metric": "0.00 LTIFR Record"}, {"desc": "100% weld inspection using Automated Ultrasonic Testing (AUT) and certified Level-III inspectors achieving <0.5% weld defect rate.", "title": "Quality Assurance & NDT", "metric": "100% Inspection Integrity"}, {"desc": "Fleet of company-owned Caterpillar sidebooms, 350-ton Vermeer HDD rigs, and automatic welding spreads ensuring instant mobilization.", "title": "Heavy Equipment Ownership", "metric": "100+ Major Rigs Owned"}, {"desc": "Pioneering HDD and microtunnelling capabilities executing complex crossings beneath tidal estuaries, railways, and busy highways.", "title": "Advanced Trenchless Tech", "metric": "2.2+ KM Single Pulls"}, {"desc": "Active operational base camps and supply logistics spanning Gujarat, Maharashtra, Rajasthan, Madhya Pradesh, and Karnataka.", "title": "Pan-India Execution", "metric": "5 Strategic Regional Hubs"}]}', '{"capability_02": {"desc": "Integrating robotics, laser guidance, gyroscopic drill tracking, and digital NDT to eliminate human error.", "cards": [{"desc": "Dual-torch external GMAW/FCAW systems with microprocessor-controlled wave pulsing and internal pneumatic copper shoes. Achieves cycle times of under 5 minutes per 42\" joint with less than 0.5% repair rate.", "icon": "Cpu", "title": "Automated Mechanized Welding"}, {"desc": "Real-time optical gyroscopic guidance systems unaffected by riverbed magnetic interference or overhead high-voltage power corridors. Delivers 2+ KM continuous pilot holes with ±15cm exit accuracy.", "icon": "Wrench", "title": "Gyroscopic HDD Steering Tools"}, {"desc": "Zone-discrimination Phased Array Ultrasonic Testing (PAUT) and Time of Flight Diffraction (TOFD) crawlers. Immediate digital imaging and millimeter-precision defect sizing on girth welds.", "icon": "ShieldCheck", "title": "Automated Ultrasonic Testing (AUT)"}], "title": "Advanced Construction & Inspection Technologies", "eyebrow": "CAPABILITY 02"}, "capability_03": {"desc": "Over 1,200 trained professionals comprising ASNT Level-III inspectors, coded 6G welders, HDD rig pilots, and safety directors.", "title": "Certified Technical Manpower & Field Spreads", "eyebrow": "CAPABILITY 03", "counters": [{"sub": "API 1104 Certified", "count": "150+", "label": "Coded 6G Welders"}, {"sub": "PAUT & TOFD Certified", "count": "50+", "label": "NDT Level-II/III Experts"}, {"sub": "NEBOSH / IOSH Certified", "count": "100+", "label": "HSE & Safety Officers"}, {"sub": "Cross-Country Certified", "count": "80+", "label": "Senior Spread Managers"}]}, "capability_04": {"desc": "Statutory pipeline integrity testing utilizing high-volume fill spreads, positive displacement pressurization pumps, and deadweight electronic pressure-temperature logging.", "cards": [{"desc": "Statutory 24-hour holds up to 150 bar with dual-probe electronic deadweight testers (0.01 bar precision) calibrated to international metrological standards.", "title": "High-Pressure Hydrostatic Testing Spreads"}, {"desc": "Continuous desiccant air drying spreads reducing internal pipe atmosphere dew point down to -40°C, preventing hydrate formation during charging.", "title": "High-Volume Oil-Free Air Drying Spreads"}, {"desc": "Multi-channel caliper geometric pigging runs with digital odometers detecting internal ovality, dents, and mill anomalies with millimeter accuracy.", "title": "Electronic Geometric Pigging (EGP Caliper)"}], "title": "Turnkey Pre-Commissioning & Testing Spreads", "eyebrow": "CAPABILITY 04"}}', '{"hero": {"title": "Building the Infrastructure Behind India''s Energy Future."}, "hseSection": {"desc": "Our operations adhere to the highest international safety standards. With 28.4 million safe man-hours without Lost Time Injury (LTI), safety is our core operational value.", "title": "Zero Compromise on Human Life, Quality & Environment", "eyebrow": "HSE & QUALITY MANAGEMENT"}, "aboutCompany": {"desc": "From concept to commissioning, CandelaConstruction Private Limited delivers turnkey pipeline infrastructure for national utilities, private operators, and city gas networks — Trust delivered.", "title": "Engineering India''s Energy Arteries With Uncompromising Rigor", "eyebrow": "ABOUT CANDELA-CONSTRUCTION", "storyP1": "Established in 1994, CandelaConstruction has grown from a specialized pipeline engineering team into one of India''s most capable pipeline EPC contractors. We operate across tough topographies — from the rocky Deccan traps and desert dunes of Rajasthan to complex perennial river crossings in North Bihar and congested city gas corridors.", "storyP2": "Our core execution model relies on company-owned heavy equipment, in-house technical engineering, and strict compliance with ASME B31.8, API 1104, and PNGRB standards. We maintain zero tolerance for safety shortcuts.", "pill1Val": "3,850+ KM", "pill2Val": "180+", "pill3Val": "28.4M", "pill4Val": "100%", "pill1Label": "Pipeline Laid Across India", "pill2Label": "Major HDD River Crossings", "pill3Label": "Safe Man-Hours (LTI-Free)", "pill4Label": "Weld Inspection Integrity"}, "whyUsSection": {"desc": "Proven capabilities, world-class equipment ownership, and our hallmark pledge — ''Trust delivered.'' — ensuring projects are completed safely and on schedule.", "title": "Why Public Utilities & Energy Majors Choose Us", "eyebrow": "MEASURABLE VALUE PROPOSITIONS"}, "processSection": {"desc": "From cadastral survey and right-of-way clearing to hydrostatic testing and nitrogen commissioning — our disciplined, sequential engineering workflow.", "title": "12-Step Mechanized Pipeline Construction Process", "eyebrow": "EXECUTION METHODOLOGY & LIFECYCLE"}, "corridorSection": {"desc": "Explore our high-pressure gas transmission spreads, river HDD crossings, and city gas networks deployed across strategic sub-districts from Saran to Muzaffarpur, Samastipur, and Vaishali.", "title": "Regional Operations: Chapra (Saran) to Muzaffarpur, Samastipur & Vaishali", "eyebrow": "NORTH BIHAR PIPELINE EXECUTION CORRIDOR"}, "projectsSection": {"desc": "Case studies demonstrating our technical mastery over high-pressure steel trunklines, riverbed crossings, and urban city gas networks.", "title": "Featured High-Pressure Pipeline Infrastructure Spreads", "eyebrow": "LANDMARK EXECUTION DOSSIER"}, "servicesSection": {"desc": "Specialized engineering, mechanized construction, and pre-commissioning services executed under strict international engineering codes.", "title": "End-to-End Pipeline EPC Infrastructure Solutions", "eyebrow": "CORE CAPABILITIES & SERVICES"}}', '[{"phone": "+91 94310 11001", "status": "Active Spreads & Logistics Camp", "address": "Industrial Growth Corridor, NH-19 Bypass, Chapra, Saran, Bihar - 841301", "baseName": "Chapra Sadar Central Spreads Hub", "district": "Saran (Chapra)", "coordinator": "Vikramaditya Roy (Spread In-Charge)"}, {"phone": "+91 94310 22002", "status": "Gandak River HDD Operations Camp", "address": "Plot 42, Hajipur Industrial Estate, Vaishali, Bihar - 844102", "baseName": "Hajipur Industrial Complex Hub", "district": "Vaishali (Hajipur)", "coordinator": "Sunil K. Verma (HDD Site Pilot)"}, {"phone": "+91 94310 33003", "status": "Automated Welding & PAUT QA Yard", "address": "Near Kanti Thermal Complex, NH-28 Highway, Muzaffarpur, Bihar - 843130", "baseName": "Kanti Energy & Transmission Hub", "district": "Muzaffarpur", "coordinator": "Dharmendra Nath (Welding Inspector)"}, {"phone": "+91 94310 44004", "status": "Spur Line & City Gas Base", "address": "Tajpur Road, Near CGS Terminal, Samastipur, Bihar - 848101", "baseName": "Samastipur City Gate Station Spreads Base", "district": "Samastipur", "coordinator": "Manoj P. Mishra (Site Engineer)"}]');


--
-- Data for Name: state_footprints; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.state_footprints VALUES ('saran-chapra', 340, 'Saran (Chapra)', 14, 'Active Operations');
INSERT INTO public.state_footprints VALUES ('vaishali', 285, 'Vaishali (Hajipur)', 11, 'Active Operations');
INSERT INTO public.state_footprints VALUES ('muzaffarpur', 420, 'Muzaffarpur', 16, 'Active Operations');
INSERT INTO public.state_footprints VALUES ('samastipur', 245, 'Samastipur', 9, 'Active Operations');


--
-- Data for Name: sub_districts; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.sub_districts VALUES ('0cb8d6b8-9a6e-4ddc-80ce-f740ef38ac54', 'db6883c1-7a04-44d5-bd69-35d6c4478620', 'Chapra Sadar', 'Tehsil', 45.00, 'Alluvial Plain / RoW', '2026-09-19 00:05:13.052003+05:30');
INSERT INTO public.sub_districts VALUES ('24ce5dde-e73c-426b-a273-0be56769ca5a', 'db6883c1-7a04-44d5-bd69-35d6c4478620', 'Marhaura', 'Tehsil', 45.00, 'Alluvial Plain / RoW', '2026-09-19 00:05:13.052003+05:30');
INSERT INTO public.sub_districts VALUES ('81cb7ac8-4c18-40ae-9e7a-cf4faa0d2159', 'db6883c1-7a04-44d5-bd69-35d6c4478620', 'Sonpur', 'Tehsil', 45.00, 'Alluvial Plain / RoW', '2026-09-19 00:05:13.052003+05:30');
INSERT INTO public.sub_districts VALUES ('984e0d1a-65a3-45b6-b005-27beded25690', 'db6883c1-7a04-44d5-bd69-35d6c4478620', 'Revelganj', 'Tehsil', 45.00, 'Alluvial Plain / RoW', '2026-09-19 00:05:13.052003+05:30');
INSERT INTO public.sub_districts VALUES ('074a2283-b008-40a4-a5ef-4058ef81b0fd', 'db6883c1-7a04-44d5-bd69-35d6c4478620', 'Dighwara', 'Tehsil', 45.00, 'Alluvial Plain / RoW', '2026-09-19 00:05:13.052003+05:30');
INSERT INTO public.sub_districts VALUES ('c9391b1e-2ac9-454d-a3fb-dd352a89d4d9', 'db6883c1-7a04-44d5-bd69-35d6c4478620', 'Garkha', 'Tehsil', 45.00, 'Alluvial Plain / RoW', '2026-09-19 00:05:13.052003+05:30');
INSERT INTO public.sub_districts VALUES ('975fb649-6337-4520-86c4-508219060d99', 'db6883c1-7a04-44d5-bd69-35d6c4478620', 'Manjhi', 'Tehsil', 45.00, 'Alluvial Plain / RoW', '2026-09-19 00:05:13.052003+05:30');
INSERT INTO public.sub_districts VALUES ('d5d1748e-649c-4eb1-9fe5-8d612c13e9c0', 'd1e23d16-d44a-4ab3-a562-ff8c127818c2', 'Hajipur Sadar', 'Tehsil', 45.00, 'Alluvial Plain / RoW', '2026-09-19 00:05:13.052003+05:30');
INSERT INTO public.sub_districts VALUES ('12bab574-de3b-4cea-8939-baad7a0ecfa9', 'd1e23d16-d44a-4ab3-a562-ff8c127818c2', 'Lalganj', 'Tehsil', 45.00, 'Alluvial Plain / RoW', '2026-09-19 00:05:13.052003+05:30');
INSERT INTO public.sub_districts VALUES ('328bb327-09a0-4677-a825-bd5d4c8d170d', 'd1e23d16-d44a-4ab3-a562-ff8c127818c2', 'Mahua', 'Tehsil', 45.00, 'Alluvial Plain / RoW', '2026-09-19 00:05:13.052003+05:30');
INSERT INTO public.sub_districts VALUES ('81c42e4c-020a-46b2-9db0-e7474e0bbb38', 'd1e23d16-d44a-4ab3-a562-ff8c127818c2', 'Vaishali', 'Tehsil', 45.00, 'Alluvial Plain / RoW', '2026-09-19 00:05:13.052003+05:30');
INSERT INTO public.sub_districts VALUES ('008d148e-692e-473c-bdc8-78e6944226d9', 'd1e23d16-d44a-4ab3-a562-ff8c127818c2', 'Bidupur', 'Tehsil', 45.00, 'Alluvial Plain / RoW', '2026-09-19 00:05:13.052003+05:30');
INSERT INTO public.sub_districts VALUES ('e91fa99b-2aae-4305-a4b3-cf43dac65f2f', 'd1e23d16-d44a-4ab3-a562-ff8c127818c2', 'Jandaha', 'Tehsil', 45.00, 'Alluvial Plain / RoW', '2026-09-19 00:05:13.052003+05:30');
INSERT INTO public.sub_districts VALUES ('633dcce6-014f-4079-a2a2-ad3d2dc78f2f', 'd1e23d16-d44a-4ab3-a562-ff8c127818c2', 'Raghopur', 'Tehsil', 45.00, 'Alluvial Plain / RoW', '2026-09-19 00:05:13.052003+05:30');
INSERT INTO public.sub_districts VALUES ('d5c5dcb9-dda9-4ec2-b9c9-a89ee51edf16', '63c48f17-6b97-49eb-8dff-e5b461cf36ba', 'Muzaffarpur Sadar', 'Tehsil', 45.00, 'Alluvial Plain / RoW', '2026-09-19 00:05:13.052003+05:30');
INSERT INTO public.sub_districts VALUES ('1354c38e-8bce-4944-b25d-6503cd0fb735', '63c48f17-6b97-49eb-8dff-e5b461cf36ba', 'Kanti', 'Tehsil', 45.00, 'Alluvial Plain / RoW', '2026-09-19 00:05:13.052003+05:30');
INSERT INTO public.sub_districts VALUES ('ff9718cd-9604-4308-938f-34e5aeb0dbb1', '63c48f17-6b97-49eb-8dff-e5b461cf36ba', 'Motipur', 'Tehsil', 45.00, 'Alluvial Plain / RoW', '2026-09-19 00:05:13.052003+05:30');
INSERT INTO public.sub_districts VALUES ('cbf27697-0140-4c81-bbab-9839a3ef6122', '63c48f17-6b97-49eb-8dff-e5b461cf36ba', 'Sakra', 'Tehsil', 45.00, 'Alluvial Plain / RoW', '2026-09-19 00:05:13.052003+05:30');
INSERT INTO public.sub_districts VALUES ('e4313ae7-9c38-49ef-a8e6-a2df6a69402c', '63c48f17-6b97-49eb-8dff-e5b461cf36ba', 'Marwan', 'Tehsil', 45.00, 'Alluvial Plain / RoW', '2026-09-19 00:05:13.052003+05:30');
INSERT INTO public.sub_districts VALUES ('1a2cc189-ec0b-4d4e-84e6-7ca17f3bb9ec', '63c48f17-6b97-49eb-8dff-e5b461cf36ba', 'Sahebganj', 'Tehsil', 45.00, 'Alluvial Plain / RoW', '2026-09-19 00:05:13.052003+05:30');
INSERT INTO public.sub_districts VALUES ('d5fa268a-da3a-4d7f-9626-521788942f76', '63c48f17-6b97-49eb-8dff-e5b461cf36ba', 'Kurhani', 'Tehsil', 45.00, 'Alluvial Plain / RoW', '2026-09-19 00:05:13.052003+05:30');
INSERT INTO public.sub_districts VALUES ('0edcf961-a158-4adf-84c0-ef5580c90ec1', 'e3a0433f-2ef2-4a64-b7cb-8247ee1a24f3', 'Samastipur Sadar', 'Tehsil', 45.00, 'Alluvial Plain / RoW', '2026-09-19 00:05:13.052003+05:30');
INSERT INTO public.sub_districts VALUES ('5c3aea61-736a-4cdd-8356-536d9f917e7e', 'e3a0433f-2ef2-4a64-b7cb-8247ee1a24f3', 'Dalsinghsarai', 'Tehsil', 45.00, 'Alluvial Plain / RoW', '2026-09-19 00:05:13.052003+05:30');
INSERT INTO public.sub_districts VALUES ('21b6c7e6-36e6-4eed-92cd-fb9bab0f125b', 'e3a0433f-2ef2-4a64-b7cb-8247ee1a24f3', 'Rosera', 'Tehsil', 45.00, 'Alluvial Plain / RoW', '2026-09-19 00:05:13.052003+05:30');
INSERT INTO public.sub_districts VALUES ('cc729008-4977-4d30-a071-ccdfd82f6c67', 'e3a0433f-2ef2-4a64-b7cb-8247ee1a24f3', 'Pusa', 'Tehsil', 45.00, 'Alluvial Plain / RoW', '2026-09-19 00:05:13.052003+05:30');
INSERT INTO public.sub_districts VALUES ('52944482-3d1e-4ec2-86f9-c9f11148b9c8', 'e3a0433f-2ef2-4a64-b7cb-8247ee1a24f3', 'Kalyanpur', 'Tehsil', 45.00, 'Alluvial Plain / RoW', '2026-09-19 00:05:13.052003+05:30');
INSERT INTO public.sub_districts VALUES ('f296a604-7ffd-4221-af8f-c3c198e675e9', 'e3a0433f-2ef2-4a64-b7cb-8247ee1a24f3', 'Ujiarpur', 'Tehsil', 45.00, 'Alluvial Plain / RoW', '2026-09-19 00:05:13.052003+05:30');
INSERT INTO public.sub_districts VALUES ('269736bb-7940-467c-9dea-b80d6070e1b7', 'e3a0433f-2ef2-4a64-b7cb-8247ee1a24f3', 'Singhia', 'Tehsil', 45.00, 'Alluvial Plain / RoW', '2026-09-19 00:05:13.052003+05:30');


--
-- Data for Name: tender_enquiries; Type: TABLE DATA; Schema: public; Owner: -
--



--
-- Name: job_applications_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.job_applications_id_seq', 3, true);


--
-- Name: rfq_enquiries_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.rfq_enquiries_id_seq', 4, true);


--
-- Name: admin_auth admin_auth_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.admin_auth
    ADD CONSTRAINT admin_auth_pkey PRIMARY KEY (id);


--
-- Name: client_approvals client_approvals_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.client_approvals
    ADD CONSTRAINT client_approvals_pkey PRIMARY KEY (id);


--
-- Name: clients clients_code_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.clients
    ADD CONSTRAINT clients_code_key UNIQUE (code);


--
-- Name: clients clients_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.clients
    ADD CONSTRAINT clients_pkey PRIMARY KEY (id);


--
-- Name: corporate_news corporate_news_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.corporate_news
    ADD CONSTRAINT corporate_news_pkey PRIMARY KEY (id);


--
-- Name: district_corridors district_corridors_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.district_corridors
    ADD CONSTRAINT district_corridors_pkey PRIMARY KEY (id);


--
-- Name: district_corridors district_corridors_slug_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.district_corridors
    ADD CONSTRAINT district_corridors_slug_key UNIQUE (slug);


--
-- Name: equipment_categories equipment_categories_category_name_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.equipment_categories
    ADD CONSTRAINT equipment_categories_category_name_key UNIQUE (category_name);


--
-- Name: equipment_categories equipment_categories_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.equipment_categories
    ADD CONSTRAINT equipment_categories_pkey PRIMARY KEY (id);


--
-- Name: equipment_deployments equipment_deployments_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.equipment_deployments
    ADD CONSTRAINT equipment_deployments_pkey PRIMARY KEY (id);


--
-- Name: equipment equipment_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.equipment
    ADD CONSTRAINT equipment_pkey PRIMARY KEY (name);


--
-- Name: fleet_equipment fleet_equipment_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.fleet_equipment
    ADD CONSTRAINT fleet_equipment_pkey PRIMARY KEY (id);


--
-- Name: hse_metrics hse_metrics_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.hse_metrics
    ADD CONSTRAINT hse_metrics_pkey PRIMARY KEY (id);


--
-- Name: job_applications job_applications_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.job_applications
    ADD CONSTRAINT job_applications_pkey PRIMARY KEY (id);


--
-- Name: job_positions job_positions_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.job_positions
    ADD CONSTRAINT job_positions_pkey PRIMARY KEY (id);


--
-- Name: projects projects_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.projects
    ADD CONSTRAINT projects_pkey PRIMARY KEY (id);


--
-- Name: rfq_enquiries rfq_enquiries_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.rfq_enquiries
    ADD CONSTRAINT rfq_enquiries_pkey PRIMARY KEY (id);


--
-- Name: services services_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.services
    ADD CONSTRAINT services_pkey PRIMARY KEY (id);


--
-- Name: site_settings site_settings_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.site_settings
    ADD CONSTRAINT site_settings_pkey PRIMARY KEY (id);


--
-- Name: state_footprints state_footprints_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.state_footprints
    ADD CONSTRAINT state_footprints_pkey PRIMARY KEY (id);


--
-- Name: sub_districts sub_districts_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.sub_districts
    ADD CONSTRAINT sub_districts_pkey PRIMARY KEY (id);


--
-- Name: tender_enquiries tender_enquiries_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.tender_enquiries
    ADD CONSTRAINT tender_enquiries_pkey PRIMARY KEY (id);


--
-- Name: tender_enquiries tender_enquiries_reference_number_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.tender_enquiries
    ADD CONSTRAINT tender_enquiries_reference_number_key UNIQUE (reference_number);


--
-- Name: job_applications uk3frro82yf8eo1x3vj48xkqfoe; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.job_applications
    ADD CONSTRAINT uk3frro82yf8eo1x3vj48xkqfoe UNIQUE (application_ref);


--
-- Name: projects ukcxqk67qijm09gpgig8a997mb0; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.projects
    ADD CONSTRAINT ukcxqk67qijm09gpgig8a997mb0 UNIQUE (slug);


--
-- Name: rfq_enquiries ukd45f8n3xf1mqyvlwyar0iul8t; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.rfq_enquiries
    ADD CONSTRAINT ukd45f8n3xf1mqyvlwyar0iul8t UNIQUE (reference_no);


--
-- Name: services ukgnenm2itqjotnod9yfan1e9in; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.services
    ADD CONSTRAINT ukgnenm2itqjotnod9yfan1e9in UNIQUE (slug);


--
-- Name: idx_equipment_deployments_camp; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_equipment_deployments_camp ON public.equipment_deployments USING btree (spread_camp_id);


--
-- Name: idx_sub_districts_district_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_sub_districts_district_id ON public.sub_districts USING btree (district_id);


--
-- Name: idx_tenders_status; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_tenders_status ON public.tender_enquiries USING btree (bid_status);


--
-- Name: client_approvals client_approvals_client_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.client_approvals
    ADD CONSTRAINT client_approvals_client_id_fkey FOREIGN KEY (client_id) REFERENCES public.clients(id) ON DELETE CASCADE;


--
-- Name: equipment_deployments equipment_deployments_equipment_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.equipment_deployments
    ADD CONSTRAINT equipment_deployments_equipment_id_fkey FOREIGN KEY (equipment_id) REFERENCES public.fleet_equipment(id);


--
-- Name: project_execution fkag7nyt18ov2gc3spdthe1kc7y; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.project_execution
    ADD CONSTRAINT fkag7nyt18ov2gc3spdthe1kc7y FOREIGN KEY (project_id) REFERENCES public.projects(id);


--
-- Name: project_scope fkb500ye1415j0arx8our273jhh; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.project_scope
    ADD CONSTRAINT fkb500ye1415j0arx8our273jhh FOREIGN KEY (project_id) REFERENCES public.projects(id) ON DELETE CASCADE;


--
-- Name: service_bullets fkfdpv7hvhik8n0hfais1d2farm; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.service_bullets
    ADD CONSTRAINT fkfdpv7hvhik8n0hfais1d2farm FOREIGN KEY (service_id) REFERENCES public.services(id) ON DELETE CASCADE;


--
-- Name: service_subcategories fkjhfa6mvea0pyojlbvigs98u57; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.service_subcategories
    ADD CONSTRAINT fkjhfa6mvea0pyojlbvigs98u57 FOREIGN KEY (service_id) REFERENCES public.services(id);


--
-- Name: project_challenges fkllhxry3034ju3fdakqw2np1dy; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.project_challenges
    ADD CONSTRAINT fkllhxry3034ju3fdakqw2np1dy FOREIGN KEY (project_id) REFERENCES public.projects(id);


--
-- Name: project_highlights fkm2xvw0l8n5l70hn57egfpqcpa; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.project_highlights
    ADD CONSTRAINT fkm2xvw0l8n5l70hn57egfpqcpa FOREIGN KEY (project_id) REFERENCES public.projects(id);


--
-- Name: fleet_equipment fleet_equipment_category_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.fleet_equipment
    ADD CONSTRAINT fleet_equipment_category_id_fkey FOREIGN KEY (category_id) REFERENCES public.equipment_categories(id);


--
-- Name: sub_districts sub_districts_district_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.sub_districts
    ADD CONSTRAINT sub_districts_district_id_fkey FOREIGN KEY (district_id) REFERENCES public.district_corridors(id) ON DELETE CASCADE;


--
-- Name: tender_enquiries tender_enquiries_target_district_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.tender_enquiries
    ADD CONSTRAINT tender_enquiries_target_district_id_fkey FOREIGN KEY (target_district_id) REFERENCES public.district_corridors(id) ON DELETE SET NULL;


--
-- PostgreSQL database dump complete
--


