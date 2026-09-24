-- =========================================================================
-- CandelaConstruction Static Data Ingestion Script
-- Target Database: PostgreSQL (GasPipeline port 5433)
-- Generated automatically from data/site.ts
-- =========================================================================

BEGIN;

-- Clear previous seeded entries
DELETE FROM project_scope;
DELETE FROM project_challenges;
DELETE FROM project_execution;
DELETE FROM project_highlights;
DELETE FROM projects;

DELETE FROM service_bullets;
DELETE FROM service_subcategories;
DELETE FROM services;

DELETE FROM equipment;
DELETE FROM corporate_news;
DELETE FROM job_positions;
DELETE FROM state_footprints;
DELETE FROM sub_districts;
DELETE FROM district_corridors;

INSERT INTO projects (id, slug, cat, tag, tag_color, title, meta, diameter, length, wall_thickness, pressure, duration, location, state, client, project_type, status, short_desc, description, spec_label, spec_value)
VALUES ('ew', 'western-gas-corridor', 'cross-country', 'CROSS-COUNTRY TRUNKLINE', 'amber', 'Western Gas Corridor Trunkline (Phase-II)', 'Length: 480 KM | 42" OD', '42" (1,067 mm) OD', '480 Kilometers', '19.1 mm to 25.4 mm (API 5L X70 PSL2)', '100 Bar (Class 600 ANSI)', '22 Months (Record Delivery)', 'Gujarat / Maharashtra Interstate Corridor', 'Gujarat & Maharashtra', 'GAIL (India) Limited / State Energy Board', 'High-Pressure Natural Gas Trunkline', 'Completed', '42" OD API 5L X70 high-pressure transmission line passing through rocky Deccan traps and irrigated farmland with 8 river crossings.', 'This landmark 480-km trunkline required continuous automated ultrasonic inspection (AUT) across challenging basalt rock formations, deep black cotton agricultural soil, and 8 major river crossings. CandelaConstruction deployed 8 pipeline spreads simultaneously, completing the project without a single LTI and achieving zero pressure loss during the 24-hour statutory hydrotest.', 'Welding', '100% Mechanized Dual-Torch AUT');
INSERT INTO project_scope (project_id, scope_item) VALUES ('ew', 'Cadastral survey, RoW clearing & grading across 480 KM corridor');
INSERT INTO project_scope (project_id, scope_item) VALUES ('ew', 'Excavation in hard basalt rock requiring controlled blasting and hydraulic breakers');
INSERT INTO project_scope (project_id, scope_item) VALUES ('ew', 'Stringing, bending, and line-up of over 40,000 pipes (API 5L X70)');
INSERT INTO project_scope (project_id, scope_item) VALUES ('ew', 'Mechanized external dual-torch GMAW automated girth welding');
INSERT INTO project_scope (project_id, scope_item) VALUES ('ew', '100% Phased Array Ultrasonic Testing (PAUT) & TOFD examination');
INSERT INTO project_scope (project_id, scope_item) VALUES ('ew', 'Field joint coating with 3LPE heat-shrink sleeves and 25 kV holiday test');
INSERT INTO project_scope (project_id, scope_item) VALUES ('ew', 'Coordinated multi-sideboom lowering-in and padded backfilling');
INSERT INTO project_scope (project_id, scope_item) VALUES ('ew', '8 major river HDD crossings ranging up to 1,600m each');
INSERT INTO project_scope (project_id, scope_item) VALUES ('ew', '24-hour statutory hydrostatic pressure testing at 145 bar');
INSERT INTO project_scope (project_id, scope_item) VALUES ('ew', 'Air drying to -40°C dew point and nitrogen purging for safe commissioning');
INSERT INTO project_challenges (project_id, challenge_item) VALUES ('ew', 'Dense basalt rock excavation along 120 km of Deccan plateau requiring controlled vibration blasting permits adjacent to active villages');
INSERT INTO project_challenges (project_id, challenge_item) VALUES ('ew', 'Monsoon flooding in Maharashtra requiring specialized dewatering pump spreads and ditch stabilization');
INSERT INTO project_challenges (project_id, challenge_item) VALUES ('ew', 'Complex crossing of 14 national highways, 6 railway tracks, and 45 irrigation canals with zero traffic disruption');
INSERT INTO project_challenges (project_id, challenge_item) VALUES ('ew', 'Strict zero-spill ecological mandate through 28 km of designated forest buffer zone');
INSERT INTO project_execution (project_id, execution_item) VALUES ('ew', 'Deployed 8 independent fully mechanized spreads with Lincoln Electric automated welding units');
INSERT INTO project_execution (project_id, execution_item) VALUES ('ew', 'Maintained 60+ joint welds per spread per day through internal pneumatic clamping');
INSERT INTO project_execution (project_id, execution_item) VALUES ('ew', 'Established 4 dedicated base camps with on-site QA/QC metallurgical testing labs');
INSERT INTO project_execution (project_id, execution_item) VALUES ('ew', 'Total project completed 2 months ahead of EPC contractual schedule');
INSERT INTO project_highlights (project_id, highlight_item) VALUES ('ew', 'Over 52,000 girth welds using mechanized external dual-torch GMAW');
INSERT INTO project_highlights (project_id, highlight_item) VALUES ('ew', '100% Phased Array Ultrasonic Testing (PAUT) with < 0.38% weld repair rate');
INSERT INTO project_highlights (project_id, highlight_item) VALUES ('ew', 'Continuous 3LPE field joint coating with zero holiday defect at handover');
INSERT INTO project_highlights (project_id, highlight_item) VALUES ('ew', 'Full agricultural soil profile restoration returning 100% farmland to landowners');
INSERT INTO projects (id, slug, cat, tag, tag_color, title, meta, diameter, length, wall_thickness, pressure, duration, location, state, client, project_type, status, short_desc, description, spec_label, spec_value)
VALUES ('narmada', 'narmada-river-crossing', 'hdd', 'RIVER HDD CROSSING', 'cyan', 'Narmada Riverbed Estuary Crossing', 'Span: 2,180 M | 36" OD', '36" (914 mm) OD Heavy Wall', '2,180 Meters Continuous Span', '28.6 mm (API 5L X65 Heavy Wall)', '98 Bar', '75 Days', 'Bharuch, Gujarat (Tidal Estuary)', 'Gujarat', 'Indian Oil Corporation Limited (IOCL)', 'Trenchless River Crossing (HDD)', 'Completed', 'Single-span 36" steel carrier pipeline drilled 38 meters below scouring river bed encountering sand, gravel, and high tidal pressure fluctuations.', 'One of western India''s largest continuous pipeline HDD installations. Navigating heavy tidal currents, boulder/cobble stratification, and 38-meter sub-bed scour depths. Executed using CandelaConstruction''s Vermeer D750x900 350-ton rig, utilizing gyro steering tools and polymer bentonite mud management.', 'Rig Fleet', 'Vermeer D750x900 (350 Ton)');
INSERT INTO project_scope (project_id, scope_item) VALUES ('narmada', 'Sub-bottom geotechnical profiling and borehole sonic investigation');
INSERT INTO project_scope (project_id, scope_item) VALUES ('narmada', 'Detailed pilot hole trajectory design with 38m minimum cover beneath bed');
INSERT INTO project_scope (project_id, scope_item) VALUES ('narmada', 'Dual-rig pilot hole drilling using optical gyroscopic steering guidance');
INSERT INTO project_scope (project_id, scope_item) VALUES ('narmada', 'Multi-stage reaming from 12" pilot up to 48" hole diameter in abrasive gravel');
INSERT INTO project_scope (project_id, scope_item) VALUES ('narmada', 'High-efficiency solids control and mud recycling system handling 3,500 L/min');
INSERT INTO project_scope (project_id, scope_item) VALUES ('narmada', 'String fabrication, 100% PAUT inspection, and 25 kV holiday test of 2.18 km string');
INSERT INTO project_scope (project_id, scope_item) VALUES ('narmada', 'Continuous pullback of 36" steel carrier pipe in a single 26-hour operation');
INSERT INTO project_scope (project_id, scope_item) VALUES ('narmada', 'Hydrostatic testing at 147 bar for 24 continuous hours');
INSERT INTO project_challenges (project_id, challenge_item) VALUES ('narmada', 'Semi-diurnal tidal height variation of 5.5 meters causing severe hydraulic head changes in the borehole');
INSERT INTO project_challenges (project_id, challenge_item) VALUES ('narmada', 'Loose cobble and boulder stratigraphy requiring specialized polymer fluid chemistry to prevent borehole collapse');
INSERT INTO project_challenges (project_id, challenge_item) VALUES ('narmada', 'Substantial pullback friction load demanding dynamic 320-ton pull capacity without coating abrasion');
INSERT INTO project_execution (project_id, execution_item) VALUES ('narmada', 'Vermeer D750x900 350-ton HDD rig deployed on North Bank with 250-ton tailing rig on South Bank');
INSERT INTO project_execution (project_id, execution_item) VALUES ('narmada', 'Utilized real-time gyroscopic tool tracking ensuring drill bit hit target exit within 15 cm tolerance');
INSERT INTO project_execution (project_id, execution_item) VALUES ('narmada', 'Continuous 26-hour uninterrupted pullback executed with dedicated backup power generators');
INSERT INTO project_highlights (project_id, highlight_item) VALUES ('narmada', 'Continuous pullback length of 2,180 meters under tidal estuary waters');
INSERT INTO project_highlights (project_id, highlight_item) VALUES ('narmada', 'Zero surface blowouts or bentonite leakage into sensitive river marine ecosystem');
INSERT INTO project_highlights (project_id, highlight_item) VALUES ('narmada', 'Non-destructive holiday testing at 25 kV prior to reaming pullback');
INSERT INTO project_highlights (project_id, highlight_item) VALUES ('narmada', 'Hydrostatic strength tested at 147 bar for 24 hours with zero pressure drop');
INSERT INTO projects (id, slug, cat, tag, tag_color, title, meta, diameter, length, wall_thickness, pressure, duration, location, state, client, project_type, status, short_desc, description, spec_label, spec_value)
VALUES ('cgd-main', 'greater-cgd-network', 'cgd', 'URBAN CGD NETWORK', 'emerald', 'Greater Industrial Belt CGD Deployment', 'Steel + MDPE: 1,550 KM', 'Steel: 8"-12" / MDPE: 32mm to 125mm', '1,550 Kilometers (350 KM Steel + 1,200 KM PE)', 'API 5L Gr B / PE-100 PN 16', 'Steel: 49 Bar / PE: 4 Bar', '30 Months (Multi-Zone)', 'Ahmedabad, Sanand & Mehsana Industrial Zones', 'Gujarat', 'Adani Total Gas Limited / Torrent Gas', 'City Gas Distribution & CNG Stations', 'Completed', 'Complete urban gas network with carbon steel ring mains, MDPE electrofusion lines, 18 CNG mother/daughter stations, and 120,000 domestic PNG connections.', 'Executed inside highly congested municipal jurisdictions, highway utility corridors, and heavy manufacturing clusters. CandelaConstruction deployed microtunnelling, moling, and precision micro-trenching alongside nighttime work permits to lay infrastructure with minimal citizen disruption.', 'Urban Connections', '120,000+ PNG / 18 CNG Stations');
INSERT INTO project_scope (project_id, scope_item) VALUES ('cgd-main', 'Underground utility mapping using Ground Penetrating Radar (GPR)');
INSERT INTO project_scope (project_id, scope_item) VALUES ('cgd-main', '350 km carbon steel feeder network (8" to 12") operating at 49 bar');
INSERT INTO project_scope (project_id, scope_item) VALUES ('cgd-main', '1,200 km MDPE PE-100 gas distribution network via electrofusion');
INSERT INTO project_scope (project_id, scope_item) VALUES ('cgd-main', 'Civil, mechanical & piping EPC for 18 CNG mother & daughter stations');
INSERT INTO project_scope (project_id, scope_item) VALUES ('cgd-main', 'Installation of 42 District Regulating Stations (DRS) and Metering Skids');
INSERT INTO project_scope (project_id, scope_item) VALUES ('cgd-main', '120,000 domestic PNG riser piping connections with individual isolation valves');
INSERT INTO project_scope (project_id, scope_item) VALUES ('cgd-main', 'Online SCADA telemetry linking all DRS stations to centralized control room');
INSERT INTO project_challenges (project_id, challenge_item) VALUES ('cgd-main', 'Congested underground corridors packed with power cables, water mains, and optical fiber lines');
INSERT INTO project_challenges (project_id, challenge_item) VALUES ('cgd-main', 'Maintaining continuous road traffic across heavy commercial arterial roads');
INSERT INTO project_challenges (project_id, challenge_item) VALUES ('cgd-main', 'Strict city authority nighttime working hour constraints (11:00 PM to 05:00 AM)');
INSERT INTO project_execution (project_id, execution_item) VALUES ('cgd-main', 'Pioneered non-disruptive pneumatic moling and micro-HDD for all municipal road crossings');
INSERT INTO project_execution (project_id, execution_item) VALUES ('cgd-main', 'Deployed 35 mobile electrofusion teams equipped with barcode-scanning automatic fusion units');
INSERT INTO project_execution (project_id, execution_item) VALUES ('cgd-main', 'Established community liaison desk resolving municipal utility issues within 4 hours');
INSERT INTO project_highlights (project_id, highlight_item) VALUES ('cgd-main', '1,550 KM laid across urban zones with zero utility line strikes');
INSERT INTO project_highlights (project_id, highlight_item) VALUES ('cgd-main', '120,000 domestic PNG kitchens energized safely');
INSERT INTO project_highlights (project_id, highlight_item) VALUES ('cgd-main', '18 CNG stations commissioned supplying green fuel to 40,000 vehicles daily');
INSERT INTO project_highlights (project_id, highlight_item) VALUES ('cgd-main', 'Zero gas leaks recorded during pneumatic testing at 1.5x working pressure');
INSERT INTO projects (id, slug, cat, tag, tag_color, title, meta, diameter, length, wall_thickness, pressure, duration, location, state, client, project_type, status, short_desc, description, spec_label, spec_value)
VALUES ('mumbai-feeder', 'mumbai-offshore-feeder', 'plant-piping', 'REFINERY & TERMINAL PIPING', 'orange', 'Coastal Refinery Gas Interconnect & Terminal Piping', 'Length: 45 KM | 24" OD', '24" (610 mm) OD & Plant Piping', '45 Kilometers + Station Spools', '14.3 mm to 20.6 mm (API 5L X65 / SS316L)', '85 Bar (ANSI Class 600)', '14 Months', 'Mumbai Coastal Terminal & Refinery Complex', 'Maharashtra', 'Bharat Petroleum Corporation Limited (BPCL)', 'Terminal Interconnect & Station Piping', 'Completed', 'High-pressure gas delivery line and terminal pig receiver skids linking an LNG import facility with an operational petroleum refinery.', 'High-consequence pipeline execution inside active refinery blast zones and tidal mangrove terrain. Required intrinsically safe equipment, hot-work permits in Class-1 Div-1 zones, and pre-fabricated modular piping skids.', 'Safety Environment', 'Class-1 Div-1 SIMOPS Safe');
INSERT INTO project_scope (project_id, scope_item) VALUES ('mumbai-feeder', 'Pre-fabrication of heavy-wall piping spools in ISO-certified yard');
INSERT INTO project_scope (project_id, scope_item) VALUES ('mumbai-feeder', 'Installation of dual 24" scraper launcher and receiver barrels');
INSERT INTO project_scope (project_id, scope_item) VALUES ('mumbai-feeder', 'Cryogenic grade stainless steel piping installation at LNG terminal interface');
INSERT INTO project_scope (project_id, scope_item) VALUES ('mumbai-feeder', 'Emergency shutdown valve (ESD) skids with pneumatic actuators');
INSERT INTO project_scope (project_id, scope_item) VALUES ('mumbai-feeder', '100% Radiography, PAUT, and hydrostatic test at 130 bar');
INSERT INTO project_challenges (project_id, challenge_item) VALUES ('mumbai-feeder', 'Strict SIMOPS (Simultaneous Operations) protocols inside operating petroleum refinery');
INSERT INTO project_challenges (project_id, challenge_item) VALUES ('mumbai-feeder', 'Highly corrosive coastal saline atmosphere requiring specialized 3-coat marine epoxy systems');
INSERT INTO project_execution (project_id, execution_item) VALUES ('mumbai-feeder', 'Modular off-site spool fabrication minimizing on-site hot work by 75%');
INSERT INTO project_execution (project_id, execution_item) VALUES ('mumbai-feeder', '24/7 dedicated safety watch with continuous hydrocarbon sniffers during joint welding');
INSERT INTO project_highlights (project_id, highlight_item) VALUES ('mumbai-feeder', 'Zero plant downtime during tie-in to mainline refinery header');
INSERT INTO project_highlights (project_id, highlight_item) VALUES ('mumbai-feeder', '4.2 million man-hours executed with zero recordable injuries');
INSERT INTO project_highlights (project_id, highlight_item) VALUES ('mumbai-feeder', '100% radiographic acceptance with zero weld defects in high-pressure steam/gas lines');
INSERT INTO projects (id, slug, cat, tag, tag_color, title, meta, diameter, length, wall_thickness, pressure, duration, location, state, client, project_type, status, short_desc, description, spec_label, spec_value)
VALUES ('rajasthan-corridor', 'rajasthan-desert-trunkline', 'cross-country', 'CROSS-COUNTRY TRUNKLINE', 'amber', 'Rajasthan Desert Energy Pipeline Spur', 'Length: 320 KM | 30" OD', '30" (762 mm) OD', '320 Kilometers', '12.7 mm to 17.5 mm (API 5L X70)', '92 Bar', '18 Months', 'Barmer - Jodhpur Energy Corridor', 'Rajasthan', 'Vedanta Cairn Oil & Gas / GAIL', 'Natural Gas Transmission', 'Ongoing', '30-inch gas evacuation line across Thar desert shifting dunes, requiring heavy-duty tracked equipment and thermal expansion anchors.', 'Currently underway across challenging sand terrain in western Rajasthan. CandelaConstruction has established mobile air-conditioned welding camps and high-capacity ditching wheel excavators capable of cutting through shifting sand without wall collapse.', 'Current Progress', '68% Completed / On Schedule');
INSERT INTO project_scope (project_id, scope_item) VALUES ('rajasthan-corridor', 'Route clearing and sand stabilization along 320 km desert RoW');
INSERT INTO project_scope (project_id, scope_item) VALUES ('rajasthan-corridor', 'Trenching with customized continuous sand-retention ditch shields');
INSERT INTO project_scope (project_id, scope_item) VALUES ('rajasthan-corridor', 'Mechanized dual-torch pipeline welding and automated ultrasonic testing');
INSERT INTO project_scope (project_id, scope_item) VALUES ('rajasthan-corridor', 'Installation of 6 Sectionalizing Valve (SV) stations powered by solar telemetry skids');
INSERT INTO project_challenges (project_id, challenge_item) VALUES ('rajasthan-corridor', 'Extreme ambient desert temperatures reaching 50°C causing rapid pipe thermal elongation');
INSERT INTO project_challenges (project_id, challenge_item) VALUES ('rajasthan-corridor', 'Shifting sand dunes requiring geotechnical geotextile slope stabilization');
INSERT INTO project_execution (project_id, execution_item) VALUES ('rajasthan-corridor', 'High-output twilight/night welding shifts during extreme summer peaks');
INSERT INTO project_execution (project_id, execution_item) VALUES ('rajasthan-corridor', 'Tracked sidebooms with extra-wide pad footprints for dune traversing');
INSERT INTO project_highlights (project_id, highlight_item) VALUES ('rajasthan-corridor', '210 KM already completed ahead of scheduled milestone target');
INSERT INTO project_highlights (project_id, highlight_item) VALUES ('rajasthan-corridor', 'Zero water loss through closed-loop hydrotest recycling systems');
INSERT INTO projects (id, slug, cat, tag, tag_color, title, meta, diameter, length, wall_thickness, pressure, duration, location, state, client, project_type, status, short_desc, description, spec_label, spec_value)
VALUES ('mp-feeder', 'central-india-gas-grid', 'cross-country', 'INTERSTATE GAS GRID', 'amber', 'Central India Industrial Gas Corridor', 'Length: 260 KM | 28" OD', '28" (711 mm) OD', '260 Kilometers', '14.2 mm (API 5L X65)', '90 Bar', '16 Months', 'Indore - Pithampur - Ujjain Corridor', 'Madhya Pradesh', 'GAIL (India) Limited', 'Industrial Gas Grid Spur', 'Ongoing', '28-inch transmission trunkline supplying natural gas to major auto manufacturing hubs and chemical clusters in central India.', 'Connecting national trunkline grids to industrial manufacturing hubs in Madhya Pradesh. Incorporates 4 river HDD crossings, 18 canal crossings, and 3 City Gate Stations (CGS).', 'Current Progress', '75% Completed');
INSERT INTO project_scope (project_id, scope_item) VALUES ('mp-feeder', 'DGPS survey, RoW clearing, and mechanized ditching');
INSERT INTO project_scope (project_id, scope_item) VALUES ('mp-feeder', '28" steel pipe stringing, automatic welding, and 100% PAUT');
INSERT INTO project_scope (project_id, scope_item) VALUES ('mp-feeder', 'HDD crossings of Chambal and Gambhir river systems');
INSERT INTO project_scope (project_id, scope_item) VALUES ('mp-feeder', 'EPC of 3 City Gate Stations with ultrasonic gas metering');
INSERT INTO project_challenges (project_id, challenge_item) VALUES ('mp-feeder', 'Deep black cotton expansive clay soil requiring extensive soil stabilization');
INSERT INTO project_challenges (project_id, challenge_item) VALUES ('mp-feeder', 'Multiple irrigation canal crossings during active agricultural seasons');
INSERT INTO project_execution (project_id, execution_item) VALUES ('mp-feeder', 'Concurrent deployment of 3 pipeline spreads and 2 dedicated HDD spreads');
INSERT INTO project_execution (project_id, execution_item) VALUES ('mp-feeder', 'Real-time digital weld tracking and radiograph archival platform');
INSERT INTO project_highlights (project_id, highlight_item) VALUES ('mp-feeder', '180 KM successfully lowered and backfilled');
INSERT INTO project_highlights (project_id, highlight_item) VALUES ('mp-feeder', 'All 4 river HDD crossings pulled through successfully');
INSERT INTO services (id, n, icon, title, slug, text, standard, color)
VALUES ('cross-country', '01', 'pipeline', 'Cross-Country Gas Pipelines', 'cross-country-pipelines', 'Long-distance high-pressure pipeline construction for natural gas, hydrocarbons, and energy infrastructure up to 48" diameter under ANSI 600/900 classes.', 'ASME B31.8 / API 1104 / PNGRB T4S', 'amber');
INSERT INTO service_bullets (service_id, bullet) VALUES ('cross-country', 'API 5L Grade X60, X70, X80 steel mainline execution');
INSERT INTO service_bullets (service_id, bullet) VALUES ('cross-country', 'Comprehensive Right-of-Way (RoW) acquisition & clearance');
INSERT INTO service_bullets (service_id, bullet) VALUES ('cross-country', 'Mechanized trenching, ditching & controlled rock blasting');
INSERT INTO service_bullets (service_id, bullet) VALUES ('cross-country', 'Precision cold field bending, stringing & lowering spreads');
INSERT INTO service_subcategories (service_id, subcategory) VALUES ('cross-country', 'High-pressure transmission trunklines');
INSERT INTO service_subcategories (service_id, subcategory) VALUES ('cross-country', 'Regional feeder spur lines');
INSERT INTO service_subcategories (service_id, subcategory) VALUES ('cross-country', 'Cathodic protection (CP) systems');
INSERT INTO services (id, n, icon, title, slug, text, standard, color)
VALUES ('cgd', '02', 'network', 'City Gas Distribution (CGD)', 'city-gas-distribution', 'Urban steel and PE pipeline distribution networks connecting City Gate Stations (CGS), District Regulating Stations (DRS), commercial estates, and domestic households.', 'PNGRB T4S / ASME B31.8', 'emerald');
INSERT INTO service_bullets (service_id, bullet) VALUES ('cgd', 'Carbon steel feeder grid (4" to 16") with 100% radiographic check');
INSERT INTO service_bullets (service_id, bullet) VALUES ('cgd', 'Medium Density Polyethylene (MDPE PE-100) electrofusion networks');
INSERT INTO service_bullets (service_id, bullet) VALUES ('cgd', 'Mother / Daughter CNG station cascade dispensing piping');
INSERT INTO service_bullets (service_id, bullet) VALUES ('cgd', 'Commercial & Industrial (C&I) metering & regulating skids (MRS)');
INSERT INTO service_subcategories (service_id, subcategory) VALUES ('cgd', 'Domestic PNG Riser Connections');
INSERT INTO service_subcategories (service_id, subcategory) VALUES ('cgd', 'CNG Station High-Pressure Piping');
INSERT INTO service_subcategories (service_id, subcategory) VALUES ('cgd', 'Industrial Feeder Networks');
INSERT INTO services (id, n, icon, title, slug, text, standard, color)
VALUES ('hdd', '03', 'drill', 'HDD / Trenchless Technology', 'hdd-trenchless-technology', 'Non-disruptive pipeline crossings beneath major rivers, canals, national highways, railways, and congested urban intersections using heavy directional drilling rigs.', 'DCA Standards / ASME B31.8', 'cyan');
INSERT INTO service_bullets (service_id, bullet) VALUES ('hdd', 'Heavy rig fleet from 100-ton to 450-ton pullback capacity');
INSERT INTO service_bullets (service_id, bullet) VALUES ('hdd', 'Continuous crossings exceeding 2,200 meters in single pulls');
INSERT INTO service_bullets (service_id, bullet) VALUES ('hdd', 'Gyroscopic steering & wireline magnetic guidance systems');
INSERT INTO service_bullets (service_id, bullet) VALUES ('hdd', 'Active mud cleaning, solids control & bentonite recycling loops');
INSERT INTO service_subcategories (service_id, subcategory) VALUES ('hdd', 'Perennial River Bed Crossings');
INSERT INTO service_subcategories (service_id, subcategory) VALUES ('hdd', 'National Highway & Expressways');
INSERT INTO service_subcategories (service_id, subcategory) VALUES ('hdd', 'Railway Tracks & Canals');
INSERT INTO services (id, n, icon, title, slug, text, standard, color)
VALUES ('welding', '04', 'weld', 'Pipeline Welding & Jointing', 'pipeline-welding', 'Automated mechanized and manual girth welding systems delivering defect rates below 0.5% on heavy-wall API 5L steel pipelines.', 'API 1104 / ASME Section IX', 'orange');
INSERT INTO service_bullets (service_id, bullet) VALUES ('welding', 'Automatic dual-head external mechanized GMAW / FCAW spreads');
INSERT INTO service_bullets (service_id, bullet) VALUES ('welding', 'Internal pneumatic lineup clamps with copper backup shoes');
INSERT INTO service_bullets (service_id, bullet) VALUES ('welding', 'Cellulosic & low-hydrogen manual shielded metal arc welding (SMAW)');
INSERT INTO service_bullets (service_id, bullet) VALUES ('welding', 'Strict Procedure Qualification Records (PQR) & Welder Performance (WPQ)');
INSERT INTO service_subcategories (service_id, subcategory) VALUES ('welding', 'Automatic Dual-Torch GMAW');
INSERT INTO service_subcategories (service_id, subcategory) VALUES ('welding', 'Manual 6G Welder Spreads');
INSERT INTO service_subcategories (service_id, subcategory) VALUES ('welding', 'Welding Consumables Management');
INSERT INTO services (id, n, icon, title, slug, text, standard, color)
VALUES ('hydrotesting', '05', 'test', 'Hydrotesting & Dewatering', 'hydrotesting-dewatering', 'Statutory pipeline integrity testing utilizing high-volume fill spreads, positive displacement pressurization pumps, and deadweight electronic pressure-temperature logging.', 'ASME B31.8 / OISD-141 / API 1110', 'cyan');
INSERT INTO service_bullets (service_id, bullet) VALUES ('hydrotesting', '24-hour statutory hydrostatic pressure holds up to 150 bar');
INSERT INTO service_bullets (service_id, bullet) VALUES ('hydrotesting', 'High-accuracy electronic deadweight testers (0.01 bar precision)');
INSERT INTO service_bullets (service_id, bullet) VALUES ('hydrotesting', 'Controlled dewatering and swabbing using bi-directional foam pigs');
INSERT INTO service_bullets (service_id, bullet) VALUES ('hydrotesting', 'Full test documentation, pressure-volume plots & certification');
INSERT INTO service_subcategories (service_id, subcategory) VALUES ('hydrotesting', 'Strength & Leak Testing');
INSERT INTO service_subcategories (service_id, subcategory) VALUES ('hydrotesting', 'Dewatering & Swabbing');
INSERT INTO service_subcategories (service_id, subcategory) VALUES ('hydrotesting', 'Nitrogen Preservation');
INSERT INTO services (id, n, icon, title, slug, text, standard, color)
VALUES ('engineering', '06', 'engineering', 'Pipeline Engineering & Route Survey', 'pipeline-engineering', 'Front-End Engineering Design (FEED), detailed route engineering, GIS topographic surveying, geotechnical investigations, and hydraulic transient analysis.', 'OISD / PNGRB / ASME B31.8', 'amber');
INSERT INTO service_bullets (service_id, bullet) VALUES ('engineering', 'High-precision DGPS / Total Station route center-line staking');
INSERT INTO service_bullets (service_id, bullet) VALUES ('engineering', 'Geotechnical soil borehole drilling, resistivity & seismic surveys');
INSERT INTO service_bullets (service_id, bullet) VALUES ('engineering', 'Hydraulic flow simulation, surge analysis & stress engineering');
INSERT INTO service_bullets (service_id, bullet) VALUES ('engineering', 'Crossing design profiles, bill of quantities (BOQ) & permit filings');
INSERT INTO service_subcategories (service_id, subcategory) VALUES ('engineering', 'Alignment Sheet Preparation');
INSERT INTO service_subcategories (service_id, subcategory) VALUES ('engineering', 'Crossing Engineering Profiles');
INSERT INTO service_subcategories (service_id, subcategory) VALUES ('engineering', 'Environmental Impact Assessment');
INSERT INTO services (id, n, icon, title, slug, text, standard, color)
VALUES ('ndt', '07', 'scan', 'NDT & Quality Inspection', 'ndt-inspection', 'Advanced non-destructive examination (NDE) deploying automated ultrasonic testing, phased array, and digital radiography for instant defect sizing and characterization.', 'API 1104 / ASNT SNT-TC-1A / ISO 9712', 'emerald');
INSERT INTO service_bullets (service_id, bullet) VALUES ('ndt', 'Automated Ultrasonic Testing (AUT) crawler bands with zone discrimination');
INSERT INTO service_bullets (service_id, bullet) VALUES ('ndt', 'Phased Array Ultrasonic Testing (PAUT) & Time of Flight Diffraction (TOFD)');
INSERT INTO service_bullets (service_id, bullet) VALUES ('ndt', 'X-Ray and Gamma-Ray internal pipeline crawler radiography');
INSERT INTO service_bullets (service_id, bullet) VALUES ('ndt', 'Magnetic Particle Inspection (MPI) and Dye Penetrant Testing (DPT)');
INSERT INTO service_subcategories (service_id, subcategory) VALUES ('ndt', 'AUT Pipeline Crawlers');
INSERT INTO service_subcategories (service_id, subcategory) VALUES ('ndt', 'PAUT / TOFD Welds');
INSERT INTO service_subcategories (service_id, subcategory) VALUES ('ndt', 'Holiday Testing (25kV)');
INSERT INTO services (id, n, icon, title, slug, text, standard, color)
VALUES ('precommissioning', '08', 'gauge', 'Pre-Commissioning & Air Drying', 'pre-commissioning', 'Turnkey pipeline preparation following construction including mechanical cleaning, gauging, caliper pigging (EGP), dry air drying down to -40°C dew point, and nitrogen inerting.', 'ASME B31.8 / OISD-226', 'cyan');
INSERT INTO service_bullets (service_id, bullet) VALUES ('precommissioning', 'Brush & magnetic pigging runs for mill-scale and debris removal');
INSERT INTO service_bullets (service_id, bullet) VALUES ('precommissioning', 'Electronic Geometric Pigging (EGP / Caliper) for dent & ovality detection');
INSERT INTO service_bullets (service_id, bullet) VALUES ('precommissioning', 'High-volume desiccant oil-free dry air spreads down to -40°C');
INSERT INTO service_bullets (service_id, bullet) VALUES ('precommissioning', 'Cryogenic liquid nitrogen vaporization and oxygen displacement (<1%)');
INSERT INTO service_subcategories (service_id, subcategory) VALUES ('precommissioning', 'Caliper EGP Pigging');
INSERT INTO service_subcategories (service_id, subcategory) VALUES ('precommissioning', 'Vacuum & Dry Air Drying');
INSERT INTO service_subcategories (service_id, subcategory) VALUES ('precommissioning', 'Nitrogen Inerting Spreads');
INSERT INTO services (id, n, icon, title, slug, text, standard, color)
VALUES ('plantpiping', '09', 'factory', 'Plant Piping & Station EPC', 'plant-piping', 'Mechanical fabrication and erection of industrial piping systems for gas processing terminals, refineries, petrochemical plants, and City Gate Stations (CGS).', 'ASME B31.3 / OISD-118', 'orange');
INSERT INTO service_bullets (service_id, bullet) VALUES ('plantpiping', 'Heavy-wall carbon steel, stainless steel & alloy steel spool fabrication');
INSERT INTO service_bullets (service_id, bullet) VALUES ('plantpiping', 'Sectionalizing Valve (SV) Stations & Scraper Launcher/Receiver Traps');
INSERT INTO service_bullets (service_id, bullet) VALUES ('plantpiping', 'Dual stream pressure reduction and metering stations (PRMS)');
INSERT INTO service_bullets (service_id, bullet) VALUES ('plantpiping', 'Emergency Shutdown (ESD) valves, gas detectors & SCADA integration');
INSERT INTO service_subcategories (service_id, subcategory) VALUES ('plantpiping', 'City Gate Stations (CGS)');
INSERT INTO service_subcategories (service_id, subcategory) VALUES ('plantpiping', 'SV Stations & Scraper Traps');
INSERT INTO service_subcategories (service_id, subcategory) VALUES ('plantpiping', 'Refinery Piping Networks');
INSERT INTO services (id, n, icon, title, slug, text, standard, color)
VALUES ('maintenance', '10', 'wrench', 'Pipeline Maintenance & Hot Tapping', 'pipeline-maintenance', 'Live under-pressure branch tie-ins (Hot Tapping) up to 48" mainline and line stopping (Stopple) isolation without interrupting continuous gas deliveries.', 'API 2201 / ASME B31G', 'red');
INSERT INTO service_bullets (service_id, bullet) VALUES ('maintenance', 'Zero-shutdown under-pressure branch hot tapping (2" to 48")');
INSERT INTO service_bullets (service_id, bullet) VALUES ('maintenance', 'Line stopping (Stopple) for pressurized segment replacement');
INSERT INTO service_bullets (service_id, bullet) VALUES ('maintenance', 'Full-encirclement welded split sleeve & composite repair wraps');
INSERT INTO service_bullets (service_id, bullet) VALUES ('maintenance', '24x7 emergency rapid response deployment teams across India');
INSERT INTO service_subcategories (service_id, subcategory) VALUES ('maintenance', 'Hot Tapping & Line Stopping');
INSERT INTO service_subcategories (service_id, subcategory) VALUES ('maintenance', 'Composite Wrap Repairs');
INSERT INTO service_subcategories (service_id, subcategory) VALUES ('maintenance', 'Emergency Pipeline Rectification');
INSERT INTO equipment (name, application, capacity, units, make)
VALUES ('Caterpillar 587T / 572R Sidebooms', 'Pipe handling, lowering-in, line-up clamping', 'Up to 48" Dia Pipes', '28 Units Owned', 'Lifting capacity 90,000 kg (200,000 lbs), 24-ft boom, counterweight ballast');
INSERT INTO equipment (name, application, capacity, units, make)
VALUES ('Vermeer D750x900 & D330x500 HDD Rigs', 'Trenchless river, canal & highway crossings', 'Max span 2,500m, up to 48" Dia', '6 Spread Sets', '350-ton (750,000 lbs) pullback, 102,000 ft-lbs torque, optical gyro steering');
INSERT INTO equipment (name, application, capacity, units, make)
VALUES ('CRC-Evans / Lincoln Dual-Torch Automatic Welders', 'Mechanized external pipeline girth welding (GMAW/FCAW)', 'Cycle time 4 mins per 42" joint', '14 Spreads', 'Dual-arc microprocessor control, internal pneumatic copper shoes');
INSERT INTO equipment (name, application, capacity, units, make)
VALUES ('Kobelco SK380 / CAT 336D Excavators & Breakers', 'RoW grading, deep trenching, basalt rock breaking', 'Trenching depth up to 4.5m', '42 Units Owned', '38-ton operating weight, Furukawa F45 hydraulic breakers (4,500 J impact)');
INSERT INTO equipment (name, application, capacity, units, make)
VALUES ('High-Pressure Triplex Hydrotest Pump Spreads', 'Pipeline hydrostatic strength & leak testing', 'Flow rate 1,200 L/min at 200 bar', '8 Dedicated Sets', 'Positive displacement triplex plunger pumps up to 250 bar, electronic DWT');
INSERT INTO equipment (name, application, capacity, units, make)
VALUES ('Automated Ultrasonic PAUT / TOFD Crawlers', '100% girth weld non-destructive examination', 'Full 360° scan in 90 seconds', '12 Systems', 'Phased array ultrasonic crawler with zone discrimination & TOFD probes');
INSERT INTO equipment (name, application, capacity, units, make)
VALUES ('CRC-Evans PB 16-32 & PB 30-48 Hydraulic Bending Machines', 'Cold field pipe bending along natural contour curves', '16" to 48" OD Pipes', '8 Units', 'High-yield hydraulic dies for API 5L X70/X80 pipes without ovality distortion');
INSERT INTO equipment (name, application, capacity, units, make)
VALUES ('High-Volume Desiccant Dry Air Compressors', 'Pipeline dewatering, swabbing & drying to -40°C', '-40°C Dew Point Output', '6 Spreads', 'Oil-free 1,500 CFM rotary screw units with twin-tower desiccant dryers');
INSERT INTO corporate_news (id, title, date, category, read_time, excerpt, content)
VALUES ('news-1', 'CandelaConstruction Crosses 28.4 Million Safe Man-Hours Without Lost Time Injury (LTI)', 'September 2026', 'MILESTONE', '3 min read', 'Reflecting our steadfast commitment to ''Trust delivered.'', CandelaConstruction celebrates a landmark safety milestone across all active cross-country and urban spreads.', 'Reflecting our steadfast commitment to ''Trust delivered.'', CandelaConstruction celebrates a landmark safety milestone across all active cross-country and urban spreads.');
INSERT INTO corporate_news (id, title, date, category, read_time, excerpt, content)
VALUES ('news-2', 'Successful Charging of 42-Inch Western Gas Corridor Trunkline', 'August 2026', 'COMMISSIONING', '3 min read', 'The 480 KM Phase-II high-pressure transmission line completed nitrogen purging and statutory hydrotesting with 100% pressure hold, delivering gas to regional industries.', 'The 480 KM Phase-II high-pressure transmission line completed nitrogen purging and statutory hydrotesting with 100% pressure hold, delivering gas to regional industries.');
INSERT INTO corporate_news (id, title, date, category, read_time, excerpt, content)
VALUES ('news-3', 'Record 2,180-Meter Riverbed HDD Pullback Completed in Bharuch Estuary', 'June 2026', 'TECHNOLOGY', '3 min read', 'Utilizing optical gyroscopic steering and our 350-ton Vermeer rig spread, CandelaConstruction successfully installed a 36-inch heavy-wall carrier pipe 38 meters below riverbed.', 'Utilizing optical gyroscopic steering and our 350-ton Vermeer rig spread, CandelaConstruction successfully installed a 36-inch heavy-wall carrier pipe 38 meters below riverbed.');
INSERT INTO corporate_news (id, title, date, category, read_time, excerpt, content)
VALUES ('news-4', 'Awarded 320 KM Desert Pipeline Expansion EPC Contract by Leading Energy Utility', 'May 2026', 'CONTRACT AWARD', '3 min read', 'Scope covers mechanized trenching, automatic dual-torch welding, and Sectionalizing Valve station construction through western energy corridors.', 'Scope covers mechanized trenching, automatic dual-torch welding, and Sectionalizing Valve station construction through western energy corridors.');
INSERT INTO job_positions (id, title, department, location, experience, type, job_desc)
VALUES ('pe-01', 'Lead Pipeline Engineer (Cross-Country)', 'Engineering & Construction', 'Ahmedabad / Project Sites', '5–8 Years', 'Full-Time', 'Oversee pipeline alignment, stringing, ditching, and lowering spreads for a 42" gas trunkline. Experience with ASME B31.8 and API 1104 mandatory.');
INSERT INTO job_positions (id, title, department, location, experience, type, job_desc)
VALUES ('se-02', 'Site Construction Manager', 'Operations', 'Pan-India Project Sites', '8–12 Years', 'Full-Time', 'Lead mechanized pipeline spread execution, RoW management, contractor coordination, and daily schedule tracking in compliance with PNGRB standards.');
INSERT INTO job_positions (id, title, department, location, experience, type, job_desc)
VALUES ('ndt-03', 'Senior NDT Level-II / Level-III Inspector', 'Quality Assurance (QA/QC)', 'Gujarat / Rajasthan Sites', '4–7 Years', 'Full-Time', 'Direct Phased Array Ultrasonic Testing (PAUT), TOFD, and radiographic interpretation of automated girth welds on high-pressure steel pipelines.');
INSERT INTO job_positions (id, title, department, location, experience, type, job_desc)
VALUES ('hdd-04', 'HDD Rig Pilot / Directional Driller', 'Trenchless Technology', 'River Crossing Sites', '5–10 Years', 'Full-Time', 'Operate 250T to 450T Vermeer HDD rigs, optical gyroscopic steering tools, mud recycling plants, and lead large-diameter river pullbacks.');
INSERT INTO job_positions (id, title, department, location, experience, type, job_desc)
VALUES ('hse-05', 'HSE Specialist & Safety Officer', 'Health, Safety & Environment', 'Central India Corridor', '3–6 Years', 'Full-Time', 'Implement site HSE management systems, conduct daily toolbox talks, monitor Permit-to-Work (PTW) protocols, and enforce zero-incident culture.');
INSERT INTO job_positions (id, title, department, location, experience, type, job_desc)
VALUES ('cgd-06', 'City Gas Distribution (CGD) Project Engineer', 'Urban Infrastructure', 'Ahmedabad / Surat / Pune', '3–5 Years', 'Full-Time', 'Supervise urban carbon steel and MDPE PE-100 electrofusion laying, microtrenching, City Gate Station piping, and domestic PNG connections.');
INSERT INTO state_footprints (id, name, projects, km, status)
VALUES ('saran-chapra', 'Saran (Chapra)', 14, 340, 'Active Operations');
INSERT INTO district_corridors (id, slug, district_name, state_name, regional_hub, total_pipeline_laid_km, active_spreads_count, hdd_rigs_deployed, is_active)
VALUES (uuid_generate_v4(), 'saran-chapra', 'Saran (Chapra)', 'Bihar', 'Chapra Sadar Hub', 340, 14, 4, true)
ON CONFLICT (slug) DO UPDATE SET
  district_name = EXCLUDED.district_name,
  regional_hub = EXCLUDED.regional_hub,
  total_pipeline_laid_km = EXCLUDED.total_pipeline_laid_km,
  active_spreads_count = EXCLUDED.active_spreads_count;
INSERT INTO sub_districts (id, district_id, sub_district_name, block_type, corridor_km, terrain_classification)
SELECT uuid_generate_v4(), id, 'Chapra Sadar', 'Tehsil', 45.0, 'Alluvial Plain / RoW'
FROM district_corridors WHERE slug = 'saran-chapra';
INSERT INTO sub_districts (id, district_id, sub_district_name, block_type, corridor_km, terrain_classification)
SELECT uuid_generate_v4(), id, 'Marhaura', 'Tehsil', 45.0, 'Alluvial Plain / RoW'
FROM district_corridors WHERE slug = 'saran-chapra';
INSERT INTO sub_districts (id, district_id, sub_district_name, block_type, corridor_km, terrain_classification)
SELECT uuid_generate_v4(), id, 'Sonpur', 'Tehsil', 45.0, 'Alluvial Plain / RoW'
FROM district_corridors WHERE slug = 'saran-chapra';
INSERT INTO sub_districts (id, district_id, sub_district_name, block_type, corridor_km, terrain_classification)
SELECT uuid_generate_v4(), id, 'Revelganj', 'Tehsil', 45.0, 'Alluvial Plain / RoW'
FROM district_corridors WHERE slug = 'saran-chapra';
INSERT INTO sub_districts (id, district_id, sub_district_name, block_type, corridor_km, terrain_classification)
SELECT uuid_generate_v4(), id, 'Dighwara', 'Tehsil', 45.0, 'Alluvial Plain / RoW'
FROM district_corridors WHERE slug = 'saran-chapra';
INSERT INTO sub_districts (id, district_id, sub_district_name, block_type, corridor_km, terrain_classification)
SELECT uuid_generate_v4(), id, 'Garkha', 'Tehsil', 45.0, 'Alluvial Plain / RoW'
FROM district_corridors WHERE slug = 'saran-chapra';
INSERT INTO sub_districts (id, district_id, sub_district_name, block_type, corridor_km, terrain_classification)
SELECT uuid_generate_v4(), id, 'Manjhi', 'Tehsil', 45.0, 'Alluvial Plain / RoW'
FROM district_corridors WHERE slug = 'saran-chapra';
INSERT INTO state_footprints (id, name, projects, km, status)
VALUES ('vaishali', 'Vaishali (Hajipur)', 11, 285, 'Active Operations');
INSERT INTO district_corridors (id, slug, district_name, state_name, regional_hub, total_pipeline_laid_km, active_spreads_count, hdd_rigs_deployed, is_active)
VALUES (uuid_generate_v4(), 'vaishali', 'Vaishali (Hajipur)', 'Bihar', 'Hajipur Industrial Area', 285, 11, 4, true)
ON CONFLICT (slug) DO UPDATE SET
  district_name = EXCLUDED.district_name,
  regional_hub = EXCLUDED.regional_hub,
  total_pipeline_laid_km = EXCLUDED.total_pipeline_laid_km,
  active_spreads_count = EXCLUDED.active_spreads_count;
INSERT INTO sub_districts (id, district_id, sub_district_name, block_type, corridor_km, terrain_classification)
SELECT uuid_generate_v4(), id, 'Hajipur Sadar', 'Tehsil', 45.0, 'Alluvial Plain / RoW'
FROM district_corridors WHERE slug = 'vaishali';
INSERT INTO sub_districts (id, district_id, sub_district_name, block_type, corridor_km, terrain_classification)
SELECT uuid_generate_v4(), id, 'Lalganj', 'Tehsil', 45.0, 'Alluvial Plain / RoW'
FROM district_corridors WHERE slug = 'vaishali';
INSERT INTO sub_districts (id, district_id, sub_district_name, block_type, corridor_km, terrain_classification)
SELECT uuid_generate_v4(), id, 'Mahua', 'Tehsil', 45.0, 'Alluvial Plain / RoW'
FROM district_corridors WHERE slug = 'vaishali';
INSERT INTO sub_districts (id, district_id, sub_district_name, block_type, corridor_km, terrain_classification)
SELECT uuid_generate_v4(), id, 'Vaishali', 'Tehsil', 45.0, 'Alluvial Plain / RoW'
FROM district_corridors WHERE slug = 'vaishali';
INSERT INTO sub_districts (id, district_id, sub_district_name, block_type, corridor_km, terrain_classification)
SELECT uuid_generate_v4(), id, 'Bidupur', 'Tehsil', 45.0, 'Alluvial Plain / RoW'
FROM district_corridors WHERE slug = 'vaishali';
INSERT INTO sub_districts (id, district_id, sub_district_name, block_type, corridor_km, terrain_classification)
SELECT uuid_generate_v4(), id, 'Jandaha', 'Tehsil', 45.0, 'Alluvial Plain / RoW'
FROM district_corridors WHERE slug = 'vaishali';
INSERT INTO sub_districts (id, district_id, sub_district_name, block_type, corridor_km, terrain_classification)
SELECT uuid_generate_v4(), id, 'Raghopur', 'Tehsil', 45.0, 'Alluvial Plain / RoW'
FROM district_corridors WHERE slug = 'vaishali';
INSERT INTO state_footprints (id, name, projects, km, status)
VALUES ('muzaffarpur', 'Muzaffarpur', 16, 420, 'Active Operations');
INSERT INTO district_corridors (id, slug, district_name, state_name, regional_hub, total_pipeline_laid_km, active_spreads_count, hdd_rigs_deployed, is_active)
VALUES (uuid_generate_v4(), 'muzaffarpur', 'Muzaffarpur', 'Bihar', 'Kanti Thermal Power Complex', 420, 16, 4, true)
ON CONFLICT (slug) DO UPDATE SET
  district_name = EXCLUDED.district_name,
  regional_hub = EXCLUDED.regional_hub,
  total_pipeline_laid_km = EXCLUDED.total_pipeline_laid_km,
  active_spreads_count = EXCLUDED.active_spreads_count;
INSERT INTO sub_districts (id, district_id, sub_district_name, block_type, corridor_km, terrain_classification)
SELECT uuid_generate_v4(), id, 'Muzaffarpur Sadar', 'Tehsil', 45.0, 'Alluvial Plain / RoW'
FROM district_corridors WHERE slug = 'muzaffarpur';
INSERT INTO sub_districts (id, district_id, sub_district_name, block_type, corridor_km, terrain_classification)
SELECT uuid_generate_v4(), id, 'Kanti', 'Tehsil', 45.0, 'Alluvial Plain / RoW'
FROM district_corridors WHERE slug = 'muzaffarpur';
INSERT INTO sub_districts (id, district_id, sub_district_name, block_type, corridor_km, terrain_classification)
SELECT uuid_generate_v4(), id, 'Motipur', 'Tehsil', 45.0, 'Alluvial Plain / RoW'
FROM district_corridors WHERE slug = 'muzaffarpur';
INSERT INTO sub_districts (id, district_id, sub_district_name, block_type, corridor_km, terrain_classification)
SELECT uuid_generate_v4(), id, 'Sakra', 'Tehsil', 45.0, 'Alluvial Plain / RoW'
FROM district_corridors WHERE slug = 'muzaffarpur';
INSERT INTO sub_districts (id, district_id, sub_district_name, block_type, corridor_km, terrain_classification)
SELECT uuid_generate_v4(), id, 'Marwan', 'Tehsil', 45.0, 'Alluvial Plain / RoW'
FROM district_corridors WHERE slug = 'muzaffarpur';
INSERT INTO sub_districts (id, district_id, sub_district_name, block_type, corridor_km, terrain_classification)
SELECT uuid_generate_v4(), id, 'Sahebganj', 'Tehsil', 45.0, 'Alluvial Plain / RoW'
FROM district_corridors WHERE slug = 'muzaffarpur';
INSERT INTO sub_districts (id, district_id, sub_district_name, block_type, corridor_km, terrain_classification)
SELECT uuid_generate_v4(), id, 'Kurhani', 'Tehsil', 45.0, 'Alluvial Plain / RoW'
FROM district_corridors WHERE slug = 'muzaffarpur';
INSERT INTO state_footprints (id, name, projects, km, status)
VALUES ('samastipur', 'Samastipur', 9, 245, 'Active Operations');
INSERT INTO district_corridors (id, slug, district_name, state_name, regional_hub, total_pipeline_laid_km, active_spreads_count, hdd_rigs_deployed, is_active)
VALUES (uuid_generate_v4(), 'samastipur', 'Samastipur', 'Bihar', 'Samastipur City Gate Station', 245, 9, 4, true)
ON CONFLICT (slug) DO UPDATE SET
  district_name = EXCLUDED.district_name,
  regional_hub = EXCLUDED.regional_hub,
  total_pipeline_laid_km = EXCLUDED.total_pipeline_laid_km,
  active_spreads_count = EXCLUDED.active_spreads_count;
INSERT INTO sub_districts (id, district_id, sub_district_name, block_type, corridor_km, terrain_classification)
SELECT uuid_generate_v4(), id, 'Samastipur Sadar', 'Tehsil', 45.0, 'Alluvial Plain / RoW'
FROM district_corridors WHERE slug = 'samastipur';
INSERT INTO sub_districts (id, district_id, sub_district_name, block_type, corridor_km, terrain_classification)
SELECT uuid_generate_v4(), id, 'Dalsinghsarai', 'Tehsil', 45.0, 'Alluvial Plain / RoW'
FROM district_corridors WHERE slug = 'samastipur';
INSERT INTO sub_districts (id, district_id, sub_district_name, block_type, corridor_km, terrain_classification)
SELECT uuid_generate_v4(), id, 'Rosera', 'Tehsil', 45.0, 'Alluvial Plain / RoW'
FROM district_corridors WHERE slug = 'samastipur';
INSERT INTO sub_districts (id, district_id, sub_district_name, block_type, corridor_km, terrain_classification)
SELECT uuid_generate_v4(), id, 'Pusa', 'Tehsil', 45.0, 'Alluvial Plain / RoW'
FROM district_corridors WHERE slug = 'samastipur';
INSERT INTO sub_districts (id, district_id, sub_district_name, block_type, corridor_km, terrain_classification)
SELECT uuid_generate_v4(), id, 'Kalyanpur', 'Tehsil', 45.0, 'Alluvial Plain / RoW'
FROM district_corridors WHERE slug = 'samastipur';
INSERT INTO sub_districts (id, district_id, sub_district_name, block_type, corridor_km, terrain_classification)
SELECT uuid_generate_v4(), id, 'Ujiarpur', 'Tehsil', 45.0, 'Alluvial Plain / RoW'
FROM district_corridors WHERE slug = 'samastipur';
INSERT INTO sub_districts (id, district_id, sub_district_name, block_type, corridor_km, terrain_classification)
SELECT uuid_generate_v4(), id, 'Singhia', 'Tehsil', 45.0, 'Alluvial Plain / RoW'
FROM district_corridors WHERE slug = 'samastipur';

COMMIT;
