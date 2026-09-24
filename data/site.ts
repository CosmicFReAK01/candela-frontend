/* ══════════════════════════════════════════════════════════════════
   CandelaConstruction Private Limited — Trust delivered.
   Enterprise Infrastructure Data Layer
   ══════════════════════════════════════════════════════════════════ */

export interface ServiceItem {
  id: string;
  n: string;
  icon: string;
  title: string;
  slug: string;
  text: string;
  bullets: string[];
  subcategories?: string[];
  standard: string;
  color: "amber" | "cyan" | "emerald" | "orange" | "red";
  specifications: { label: string; value: string }[];
}

export interface ProjectItem {
  id: string;
  slug: string;
  cat: "cross-country" | "hdd" | "cgd" | "plant-piping";
  tag: string;
  tagColor: "amber" | "cyan" | "emerald" | "orange" | "red";
  title: string;
  meta: string;
  diameter: string;
  length: string;
  wallThickness: string;
  pressure: string;
  duration: string;
  location: string;
  state: string;
  client: string;
  projectType: string;
  status: "Completed" | "Ongoing";
  shortDesc: string;
  description: string;
  scopeOfWork: string[];
  keyChallenges: string[];
  execution: string[];
  highlights: string[];
  galleryImages: { title: string; caption: string }[];
  specLabel: string;
  specValue: string;
}

export interface ProcessStep {
  step: string;
  title: string;
  desc: string;
  details: string;
  deliverables: string[];
  standard: string;
}

export interface EquipmentItem {
  name: string;
  application: string;
  specs: string;
  capacity: string;
  quantity: string;
  category: "Pipelaying" | "Trenchless" | "Welding" | "Testing" | "Earthmoving";
}

/* ──────────────── Trust / Statistics ──────────────── */
export const stats = [
  { value: "3,850+", label: "Kilometers Pipeline Laid", sub: "Trunklines & Spur lines (4\" to 48\")" },
  { value: "180+", label: "Major HDD River Crossings", sub: "Narmada, Tapi, Mahi, Sabarmati" },
  { value: "28.4M", label: "Safe Man-Hours (LTI Free)", sub: "0.00 Lost Time Injury Frequency" },
  { value: "100%", label: "AUT / Radiographic Integrity", sub: "Zero Hydrotest Failure Record" },
];

/* ──────────────── Tier-1 Clients ──────────────── */
export const clients = [
  { name: "GAIL (India) Limited", sector: "National Gas Transmission", logoText: "GAIL" },
  { name: "Indian Oil Corporation (IOCL)", sector: "Refinery & Hydrocarbon Pipelines", logoText: "IOCL" },
  { name: "Oil & Natural Gas Corp (ONGC)", sector: "Upstream & Offshore Tie-Ins", logoText: "ONGC" },
  { name: "Adani Total Gas Ltd", sector: "City Gas Distribution Networks", logoText: "ATGL" },
  { name: "Torrent Gas Ltd", sector: "Urban CGD & CNG Infrastructure", logoText: "TORRENT" },
  { name: "Gujarat State Petronet (GSPL)", sector: "State Gas Grid Trunklines", logoText: "GSPL" },
  { name: "Bharat Petroleum (BPCL)", sector: "Cross-Country Product Lines", logoText: "BPCL" },
  { name: "Hindustan Petroleum (HPCL)", sector: "Terminal & Distribution Pipelines", logoText: "HPCL" },
];

/* ──────────────── Complete 10 Core Services ──────────────── */
export const services: ServiceItem[] = [
  {
    id: "cross-country",
    n: "01",
    icon: "pipeline",
    title: "Cross-Country Gas Pipelines",
    slug: "cross-country-pipelines",
    text: "Long-distance high-pressure pipeline construction for natural gas, hydrocarbons, and energy infrastructure up to 48\" diameter under ANSI 600/900 classes.",
    bullets: [
      "API 5L Grade X60, X70, X80 steel mainline execution",
      "Comprehensive Right-of-Way (RoW) acquisition & clearance",
      "Mechanized trenching, ditching & controlled rock blasting",
      "Precision cold field bending, stringing & lowering spreads",
    ],
    subcategories: ["High-pressure transmission trunklines", "Regional feeder spur lines", "Cathodic protection (CP) systems"],
    standard: "ASME B31.8 / API 1104 / PNGRB T4S",
    color: "amber",
    specifications: [
      { label: "Diameters", value: '4" to 48" OD' },
      { label: "Pressure", value: "Up to 120 Bar (ANSI 600/900)" },
      { label: "Pipe Grades", value: "API 5L Gr B to X80 PSL2" },
      { label: "Joint Coatings", value: "3LPE / 3LPP / Heat Shrink Sleeves" },
    ],
  },
  {
    id: "cgd",
    n: "02",
    icon: "network",
    title: "City Gas Distribution (CGD)",
    slug: "city-gas-distribution",
    text: "Urban steel and PE pipeline distribution networks connecting City Gate Stations (CGS), District Regulating Stations (DRS), commercial estates, and domestic households.",
    bullets: [
      "Carbon steel feeder grid (4\" to 16\") with 100% radiographic check",
      "Medium Density Polyethylene (MDPE PE-100) electrofusion networks",
      "Mother / Daughter CNG station cascade dispensing piping",
      "Commercial & Industrial (C&I) metering & regulating skids (MRS)",
    ],
    subcategories: ["Domestic PNG Riser Connections", "CNG Station High-Pressure Piping", "Industrial Feeder Networks"],
    standard: "PNGRB T4S / ASME B31.8",
    color: "emerald",
    specifications: [
      { label: "Steel Feeder", value: '4" to 16" API 5L Gr B / X52' },
      { label: "PE Piping", value: "20mm to 125mm MDPE PE-100" },
      { label: "Urban Spreads", value: "Microtrenching & Moling" },
      { label: "Connections", value: "Over 250,000 PNG Points Done" },
    ],
  },
  {
    id: "hdd",
    n: "03",
    icon: "drill",
    title: "HDD / Trenchless Technology",
    slug: "hdd-trenchless-technology",
    text: "Non-disruptive pipeline crossings beneath major rivers, canals, national highways, railways, and congested urban intersections using heavy directional drilling rigs.",
    bullets: [
      "Heavy rig fleet from 100-ton to 450-ton pullback capacity",
      "Continuous crossings exceeding 2,200 meters in single pulls",
      "Gyroscopic steering & wireline magnetic guidance systems",
      "Active mud cleaning, solids control & bentonite recycling loops",
    ],
    subcategories: ["Perennial River Bed Crossings", "National Highway & Expressways", "Railway Tracks & Canals"],
    standard: "DCA Standards / ASME B31.8",
    color: "cyan",
    specifications: [
      { label: "Rig Capacity", value: "Up to 450 Ton Pullback" },
      { label: "Max Crossing Span", value: "2,250 Meters Continuous" },
      { label: "Maximum Pipe Dia", value: 'Up to 48" Steel Carrier' },
      { label: "Steering Accuracy", value: "Real-time Gyroscopic ±0.1°" },
    ],
  },
  {
    id: "welding",
    n: "04",
    icon: "weld",
    title: "Pipeline Welding & Jointing",
    slug: "pipeline-welding",
    text: "Automated mechanized and manual girth welding systems delivering defect rates below 0.5% on heavy-wall API 5L steel pipelines.",
    bullets: [
      "Automatic dual-head external mechanized GMAW / FCAW spreads",
      "Internal pneumatic lineup clamps with copper backup shoes",
      "Cellulosic & low-hydrogen manual shielded metal arc welding (SMAW)",
      "Strict Procedure Qualification Records (PQR) & Welder Performance (WPQ)",
    ],
    subcategories: ["Automatic Dual-Torch GMAW", "Manual 6G Welder Spreads", "Welding Consumables Management"],
    standard: "API 1104 / ASME Section IX",
    color: "orange",
    specifications: [
      { label: "Repair Rate", value: "< 0.5% Mainline Weld Defect" },
      { label: "Inspection", value: "100% Joint Coverage" },
      { label: "Cycle Time", value: "4-6 Mins per 42\" Joint" },
      { label: "Welders", value: "Over 120 Certified 6G Welders" },
    ],
  },
  {
    id: "hydrotesting",
    n: "05",
    icon: "test",
    title: "Hydrotesting & Dewatering",
    slug: "hydrotesting-dewatering",
    text: "Statutory pipeline integrity testing utilizing high-volume fill spreads, positive displacement pressurization pumps, and deadweight electronic pressure-temperature logging.",
    bullets: [
      "24-hour statutory hydrostatic pressure holds up to 150 bar",
      "High-accuracy electronic deadweight testers (0.01 bar precision)",
      "Controlled dewatering and swabbing using bi-directional foam pigs",
      "Full test documentation, pressure-volume plots & certification",
    ],
    subcategories: ["Strength & Leak Testing", "Dewatering & Swabbing", "Nitrogen Preservation"],
    standard: "ASME B31.8 / OISD-141 / API 1110",
    color: "cyan",
    specifications: [
      { label: "Test Pressures", value: "Up to 250 Bar (3,600 PSI)" },
      { label: "Instrumentation", value: "Dual Calibrated Electronic DWT" },
      { label: "Water Sourcing", value: "Eco-Friendly Discharge & Filtration" },
      { label: "Integrity", value: "Zero Pipeline Burst / Failure Record" },
    ],
  },
  {
    id: "engineering",
    n: "06",
    icon: "engineering",
    title: "Pipeline Engineering & Route Survey",
    slug: "pipeline-engineering",
    text: "Front-End Engineering Design (FEED), detailed route engineering, GIS topographic surveying, geotechnical investigations, and hydraulic transient analysis.",
    bullets: [
      "High-precision DGPS / Total Station route center-line staking",
      "Geotechnical soil borehole drilling, resistivity & seismic surveys",
      "Hydraulic flow simulation, surge analysis & stress engineering",
      "Crossing design profiles, bill of quantities (BOQ) & permit filings",
    ],
    subcategories: ["Alignment Sheet Preparation", "Crossing Engineering Profiles", "Environmental Impact Assessment"],
    standard: "OISD / PNGRB / ASME B31.8",
    color: "amber",
    specifications: [
      { label: "Survey Tools", value: "DGPS, LIDAR & Drone Photogrammetry" },
      { label: "Engineering Software", value: "AutoCAD Plant 3D, CAESAR II" },
      { label: "Design Life", value: "30-50 Year Pipeline Design" },
      { label: "Approvals", value: "Forest, NHAI, Railway Clearances" },
    ],
  },
  {
    id: "ndt",
    n: "07",
    icon: "scan",
    title: "NDT & Quality Inspection",
    slug: "ndt-inspection",
    text: "Advanced non-destructive examination (NDE) deploying automated ultrasonic testing, phased array, and digital radiography for instant defect sizing and characterization.",
    bullets: [
      "Automated Ultrasonic Testing (AUT) crawler bands with zone discrimination",
      "Phased Array Ultrasonic Testing (PAUT) & Time of Flight Diffraction (TOFD)",
      "X-Ray and Gamma-Ray internal pipeline crawler radiography",
      "Magnetic Particle Inspection (MPI) and Dye Penetrant Testing (DPT)",
    ],
    subcategories: ["AUT Pipeline Crawlers", "PAUT / TOFD Welds", "Holiday Testing (25kV)"],
    standard: "API 1104 / ASNT SNT-TC-1A / ISO 9712",
    color: "emerald",
    specifications: [
      { label: "AUT Speed", value: "90 seconds scan per 36\" joint" },
      { label: "Inspectors", value: "ASNT Level-II & Level-III Team" },
      { label: "Coverage", value: "100% Girth Weld Inspection" },
      { label: "Holiday Test", value: "High-Voltage Spark Detector 25 kV" },
    ],
  },
  {
    id: "precommissioning",
    n: "08",
    icon: "gauge",
    title: "Pre-Commissioning & Air Drying",
    slug: "pre-commissioning",
    text: "Turnkey pipeline preparation following construction including mechanical cleaning, gauging, caliper pigging (EGP), dry air drying down to -40°C dew point, and nitrogen inerting.",
    bullets: [
      "Brush & magnetic pigging runs for mill-scale and debris removal",
      "Electronic Geometric Pigging (EGP / Caliper) for dent & ovality detection",
      "High-volume desiccant oil-free dry air spreads down to -40°C",
      "Cryogenic liquid nitrogen vaporization and oxygen displacement (<1%)",
    ],
    subcategories: ["Caliper EGP Pigging", "Vacuum & Dry Air Drying", "Nitrogen Inerting Spreads"],
    standard: "ASME B31.8 / OISD-226",
    color: "cyan",
    specifications: [
      { label: "Dew Point Target", value: "-40°C to -20°C" },
      { label: "Oxygen Residual", value: "< 1.0% by Volume" },
      { label: "Air Compressors", value: "Oil-Free 1,500 CFM Units" },
      { label: "Gauging Plate", value: "95% Nominal ID Verification" },
    ],
  },
  {
    id: "plantpiping",
    n: "09",
    icon: "factory",
    title: "Plant Piping & Station EPC",
    slug: "plant-piping",
    text: "Mechanical fabrication and erection of industrial piping systems for gas processing terminals, refineries, petrochemical plants, and City Gate Stations (CGS).",
    bullets: [
      "Heavy-wall carbon steel, stainless steel & alloy steel spool fabrication",
      "Sectionalizing Valve (SV) Stations & Scraper Launcher/Receiver Traps",
      "Dual stream pressure reduction and metering stations (PRMS)",
      "Emergency Shutdown (ESD) valves, gas detectors & SCADA integration",
    ],
    subcategories: ["City Gate Stations (CGS)", "SV Stations & Scraper Traps", "Refinery Piping Networks"],
    standard: "ASME B31.3 / OISD-118",
    color: "orange",
    specifications: [
      { label: "Materials", value: "A106 Gr B, SS 316L, Duplex, P91" },
      { label: "Pressure Classes", value: "Class 150 to Class 2500" },
      { label: "Spool Fab", value: "Controlled Cleanroom & Yard Fab" },
      { label: "Safety Systems", value: "SIL-2 / SIL-3 ESD Architecture" },
    ],
  },
  {
    id: "maintenance",
    n: "10",
    icon: "wrench",
    title: "Pipeline Maintenance & Hot Tapping",
    slug: "pipeline-maintenance",
    text: "Live under-pressure branch tie-ins (Hot Tapping) up to 48\" mainline and line stopping (Stopple) isolation without interrupting continuous gas deliveries.",
    bullets: [
      "Zero-shutdown under-pressure branch hot tapping (2\" to 48\")",
      "Line stopping (Stopple) for pressurized segment replacement",
      "Full-encirclement welded split sleeve & composite repair wraps",
      "24x7 emergency rapid response deployment teams across India",
    ],
    subcategories: ["Hot Tapping & Line Stopping", "Composite Wrap Repairs", "Emergency Pipeline Rectification"],
    standard: "API 2201 / ASME B31G",
    color: "red",
    specifications: [
      { label: "Hot Tap Sizes", value: '2" to 48" Nominal Bore' },
      { label: "Operating Pressure", value: "Up to 100 Bar Live Gas" },
      { label: "Emergency Response", value: "< 6 Hours Mobilization" },
      { label: "Downtime Saved", value: "100% Continuous Flow Preserved" },
    ],
  },
];

/* ──────────────── 12-Step Construction Process Lifecycle ──────────────── */
export const constructionProcess: ProcessStep[] = [
  {
    step: "01",
    title: "SURVEY & STAKING",
    desc: "Route alignment, cadastral mapping, DGPS staking & Right-of-Way (RoW) acquisition boundary verification.",
    details: "High-precision satellite DGPS and total station surveys pegging the pipeline center line and 18-30 meter RoW boundary markers.",
    deliverables: ["Alignment Sheets", "Cadastral Boundary Map", "Crossing Profiles"],
    standard: "PNGRB / ASME B31.8",
  },
  {
    step: "02",
    title: "ROUTE CLEARANCE",
    desc: "Right-of-Way clearing, vegetation removal, tree felling permissions, and temporary access road construction.",
    details: "Clearing scrub and obstructions while strictly preserving approved forest boundaries and demarcating environmentally sensitive zones.",
    deliverables: ["RoW Access Roads", "Topsoil Protection Zones", "Safety Barricading"],
    standard: "MoEFCC Guidelines",
  },
  {
    step: "03",
    title: "GRADING",
    desc: "Topsoil segregation, earth leveling, side-slope cutting, and preparation of stable working tracks for heavy equipment.",
    details: "Stripping top 300mm fertile agricultural topsoil for stockpile segregation and eventual complete agricultural land restoration.",
    deliverables: ["Graded RoW Surface", "Topsoil Windrows", "Erosion Berms"],
    standard: "ISO 14001 Standards",
  },
  {
    step: "04",
    title: "TRENCHING",
    desc: "Mechanized wheel ditching, hydraulic rock breaking, and controlled blasting to standard burial depths (min. 1.2m cover).",
    details: "Excavating pipeline ditch with minimum 1.2m cover (1.5m in agricultural fields and 2.0m at road/canal crossings) with ditch padding.",
    deliverables: ["Ditch Depth Verification", "Bottom Padding (Sand/Fine Soil)", "Rock Breaker Spreads"],
    standard: "OISD-141 / PNGRB",
  },
  {
    step: "05",
    title: "STRINGING",
    desc: "Hauling, unloading, and alignment of 12-meter pipe joints along the ditch line on padded timber skids.",
    details: "Pipe trailers and vacuum lifters position pipe sections adjacent to the ditch without scratching external 3LPE anti-corrosion coating.",
    deliverables: ["Pipe Traceability Log", "Coating Holiday Pre-Check", "Padded Skid Placement"],
    standard: "API 5L Handling Codes",
  },
  {
    step: "06",
    title: "WELDING",
    desc: "Mechanized dual-torch external GMAW and manual SMAW welding under strict qualified welding procedures (WPS).",
    details: "Internal pneumatic line-up clamps ensure joint concentricity before root, hot, fill, and cap passes are deposited with zero burn-through.",
    deliverables: ["Weld Numbering & Traceability", "Certified Welder Stamping", "Daily Joint Logs"],
    standard: "API 1104 / ASME IX",
  },
  {
    step: "07",
    title: "NDT INSPECTION",
    desc: "100% non-destructive examination using Phased Array Ultrasonic Testing (PAUT) and digital crawler radiography.",
    details: "Every single girth weld is examined by certified Level-II/III inspectors within hours of welding to immediately confirm zero defect backlog.",
    deliverables: ["PAUT Inspection Reports", "Defect Sizing Charts", "QA/QC Clearances"],
    standard: "API 1104 / ASNT SNT-TC-1A",
  },
  {
    step: "08",
    title: "FIELD JOINT COATING",
    desc: "Surface blast cleaning to Sa 2.5 and application of heat-shrinkable sleeves or liquid epoxy with 25 kV holiday spark testing.",
    details: "Preheating joints to 200°C followed by high-adhesion 3-layer polyolefin sleeve installation and high-voltage 25 kV spark inspection.",
    deliverables: ["Blast Profile Log (Sa 2.5)", "Sleeve Peel Test", "100% Holiday Inspection Pass"],
    standard: "ISO 21809-3 / NACE",
  },
  {
    step: "09",
    title: "LOWERING-IN",
    desc: "Coordinated synchronized sideboom excavator operation lowering welded continuous pipe sections into the prepared ditch.",
    details: "Multiple crawler sidebooms operating in unison lower continuous 1-km pipeline sections gently onto ditch padding without coating stress.",
    deliverables: ["Synchronized Sideboom Rigging", "Ditch Padding Verification", "As-Laid Depth Profile"],
    standard: "OISD-141 Guidelines",
  },
  {
    step: "10",
    title: "BACKFILLING & RESTORATION",
    desc: "Padding with soft soil, rock shield installation where needed, ditch compaction, and complete topsoil reinstatement.",
    details: "Padding pipe with 150mm sifted soil, placing Warning Warning Warning warning tape at 300mm below grade, and restoring original topsoil contours.",
    deliverables: ["Warning Tape Installation", "Soil Compaction Test", "Original Topsoil Reinstatement"],
    standard: "ISO 14001 Environmental Code",
  },
  {
    step: "11",
    title: "HYDROTESTING",
    desc: "Filling with treated water, caliper pigging (EGP), and 24-hour statutory hydrostatic pressure holding at 125%-150% design pressure.",
    details: "Electronic deadweight testing monitors pressure and temperature profiles over 24 continuous hours to verify absolute structural integrity.",
    deliverables: ["Caliper EGP Survey Chart", "24-hr Pressure-Temp Graph", "Statutory Test Certificate"],
    standard: "ASME B31.8 / OISD-141",
  },
  {
    step: "12",
    title: "COMMISSIONING",
    desc: "Dewatering, air drying to -40°C dew point, nitrogen inerting, tie-ins, and final hydrocarbon gas introduction.",
    details: "Super-dry compressed air sweeps moisture from the line, followed by cryogenic nitrogen gas displacement (<1% O2) before gas charging.",
    deliverables: ["-40°C Dew Point Certificate", "Nitrogen Inerting Pass (<1% O2)", "Final Gas-In Handover"],
    standard: "PNGRB T4S / ASME B31.8",
  },
];

/* ──────────────── Detailed Project Case Studies ──────────────── */
export const projects: ProjectItem[] = [
  {
    id: "ew",
    slug: "western-gas-corridor",
    cat: "cross-country",
    tag: "CROSS-COUNTRY TRUNKLINE",
    tagColor: "amber",
    title: "Western Gas Corridor Trunkline (Phase-II)",
    meta: "Length: 480 KM | 42\" OD",
    diameter: "42\" (1,067 mm) OD",
    length: "480 Kilometers",
    wallThickness: "19.1 mm to 25.4 mm (API 5L X70 PSL2)",
    pressure: "100 Bar (Class 600 ANSI)",
    duration: "22 Months (Record Delivery)",
    location: "Gujarat / Maharashtra Interstate Corridor",
    state: "Gujarat & Maharashtra",
    client: "GAIL (India) Limited / State Energy Board",
    projectType: "High-Pressure Natural Gas Trunkline",
    status: "Completed",
    shortDesc: "42\" OD API 5L X70 high-pressure transmission line passing through rocky Deccan traps and irrigated farmland with 8 river crossings.",
    description: "This landmark 480-km trunkline required continuous automated ultrasonic inspection (AUT) across challenging basalt rock formations, deep black cotton agricultural soil, and 8 major river crossings. CandelaConstruction deployed 8 pipeline spreads simultaneously, completing the project without a single LTI and achieving zero pressure loss during the 24-hour statutory hydrotest.",
    scopeOfWork: [
      "Cadastral survey, RoW clearing & grading across 480 KM corridor",
      "Excavation in hard basalt rock requiring controlled blasting and hydraulic breakers",
      "Stringing, bending, and line-up of over 40,000 pipes (API 5L X70)",
      "Mechanized external dual-torch GMAW automated girth welding",
      "100% Phased Array Ultrasonic Testing (PAUT) & TOFD examination",
      "Field joint coating with 3LPE heat-shrink sleeves and 25 kV holiday test",
      "Coordinated multi-sideboom lowering-in and padded backfilling",
      "8 major river HDD crossings ranging up to 1,600m each",
      "24-hour statutory hydrostatic pressure testing at 145 bar",
      "Air drying to -40°C dew point and nitrogen purging for safe commissioning",
    ],
    keyChallenges: [
      "Dense basalt rock excavation along 120 km of Deccan plateau requiring controlled vibration blasting permits adjacent to active villages",
      "Monsoon flooding in Maharashtra requiring specialized dewatering pump spreads and ditch stabilization",
      "Complex crossing of 14 national highways, 6 railway tracks, and 45 irrigation canals with zero traffic disruption",
      "Strict zero-spill ecological mandate through 28 km of designated forest buffer zone",
    ],
    execution: [
      "Deployed 8 independent fully mechanized spreads with Lincoln Electric automated welding units",
      "Maintained 60+ joint welds per spread per day through internal pneumatic clamping",
      "Established 4 dedicated base camps with on-site QA/QC metallurgical testing labs",
      "Total project completed 2 months ahead of EPC contractual schedule",
    ],
    highlights: [
      "Over 52,000 girth welds using mechanized external dual-torch GMAW",
      "100% Phased Array Ultrasonic Testing (PAUT) with < 0.38% weld repair rate",
      "Continuous 3LPE field joint coating with zero holiday defect at handover",
      "Full agricultural soil profile restoration returning 100% farmland to landowners",
    ],
    galleryImages: [
      { title: "Mechanized Dual-Torch Welding Spread", caption: "Automated GMAW welding of 42\" X70 pipe in Surat sector" },
      { title: "Multi-Sideboom Lowering Spread", caption: "Coordinated 5-sideboom lowering-in operation along agricultural RoW" },
      { title: "24-Hour Hydrostatic Test Spread", caption: "High-pressure pump spread and electronic deadweight monitoring station" },
    ],
    specLabel: "Welding",
    specValue: "100% Mechanized Dual-Torch AUT",
  },
  {
    id: "narmada",
    slug: "narmada-river-crossing",
    cat: "hdd",
    tag: "RIVER HDD CROSSING",
    tagColor: "cyan",
    title: "Narmada Riverbed Estuary Crossing",
    meta: "Span: 2,180 M | 36\" OD",
    diameter: "36\" (914 mm) OD Heavy Wall",
    length: "2,180 Meters Continuous Span",
    wallThickness: "28.6 mm (API 5L X65 Heavy Wall)",
    pressure: "98 Bar",
    duration: "75 Days",
    location: "Bharuch, Gujarat (Tidal Estuary)",
    state: "Gujarat",
    client: "Indian Oil Corporation Limited (IOCL)",
    projectType: "Trenchless River Crossing (HDD)",
    status: "Completed",
    shortDesc: "Single-span 36\" steel carrier pipeline drilled 38 meters below scouring river bed encountering sand, gravel, and high tidal pressure fluctuations.",
    description: "One of western India's largest continuous pipeline HDD installations. Navigating heavy tidal currents, boulder/cobble stratification, and 38-meter sub-bed scour depths. Executed using CandelaConstruction's Vermeer D750x900 350-ton rig, utilizing gyro steering tools and polymer bentonite mud management.",
    scopeOfWork: [
      "Sub-bottom geotechnical profiling and borehole sonic investigation",
      "Detailed pilot hole trajectory design with 38m minimum cover beneath bed",
      "Dual-rig pilot hole drilling using optical gyroscopic steering guidance",
      "Multi-stage reaming from 12\" pilot up to 48\" hole diameter in abrasive gravel",
      "High-efficiency solids control and mud recycling system handling 3,500 L/min",
      "String fabrication, 100% PAUT inspection, and 25 kV holiday test of 2.18 km string",
      "Continuous pullback of 36\" steel carrier pipe in a single 26-hour operation",
      "Hydrostatic testing at 147 bar for 24 continuous hours",
    ],
    keyChallenges: [
      "Semi-diurnal tidal height variation of 5.5 meters causing severe hydraulic head changes in the borehole",
      "Loose cobble and boulder stratigraphy requiring specialized polymer fluid chemistry to prevent borehole collapse",
      "Substantial pullback friction load demanding dynamic 320-ton pull capacity without coating abrasion",
    ],
    execution: [
      "Vermeer D750x900 350-ton HDD rig deployed on North Bank with 250-ton tailing rig on South Bank",
      "Utilized real-time gyroscopic tool tracking ensuring drill bit hit target exit within 15 cm tolerance",
      "Continuous 26-hour uninterrupted pullback executed with dedicated backup power generators",
    ],
    highlights: [
      "Continuous pullback length of 2,180 meters under tidal estuary waters",
      "Zero surface blowouts or bentonite leakage into sensitive river marine ecosystem",
      "Non-destructive holiday testing at 25 kV prior to reaming pullback",
      "Hydrostatic strength tested at 147 bar for 24 hours with zero pressure drop",
    ],
    galleryImages: [
      { title: "350-Ton Rig Entry Site", caption: "Vermeer D750x900 rig executing 48-inch final hole opener reaming" },
      { title: "2.18 KM Pipe String on Rollers", caption: "Continuous 36-inch pipe string ready for pullback on South Bank" },
      { title: "Pullhead Exit Point", caption: "Carrier pipe emerging successfully at North Bank with pristine coating" },
    ],
    specLabel: "Rig Fleet",
    specValue: "Vermeer D750x900 (350 Ton)",
  },
  {
    id: "cgd-main",
    slug: "greater-cgd-network",
    cat: "cgd",
    tag: "URBAN CGD NETWORK",
    tagColor: "emerald",
    title: "Greater Industrial Belt CGD Deployment",
    meta: "Steel + MDPE: 1,550 KM",
    diameter: "Steel: 8\"-12\" / MDPE: 32mm to 125mm",
    length: "1,550 Kilometers (350 KM Steel + 1,200 KM PE)",
    wallThickness: "API 5L Gr B / PE-100 PN 16",
    pressure: "Steel: 49 Bar / PE: 4 Bar",
    duration: "30 Months (Multi-Zone)",
    location: "Ahmedabad, Sanand & Mehsana Industrial Zones",
    state: "Gujarat",
    client: "Adani Total Gas Limited / Torrent Gas",
    projectType: "City Gas Distribution & CNG Stations",
    status: "Completed",
    shortDesc: "Complete urban gas network with carbon steel ring mains, MDPE electrofusion lines, 18 CNG mother/daughter stations, and 120,000 domestic PNG connections.",
    description: "Executed inside highly congested municipal jurisdictions, highway utility corridors, and heavy manufacturing clusters. CandelaConstruction deployed microtunnelling, moling, and precision micro-trenching alongside nighttime work permits to lay infrastructure with minimal citizen disruption.",
    scopeOfWork: [
      "Underground utility mapping using Ground Penetrating Radar (GPR)",
      "350 km carbon steel feeder network (8\" to 12\") operating at 49 bar",
      "1,200 km MDPE PE-100 gas distribution network via electrofusion",
      "Civil, mechanical & piping EPC for 18 CNG mother & daughter stations",
      "Installation of 42 District Regulating Stations (DRS) and Metering Skids",
      "120,000 domestic PNG riser piping connections with individual isolation valves",
      "Online SCADA telemetry linking all DRS stations to centralized control room",
    ],
    keyChallenges: [
      "Congested underground corridors packed with power cables, water mains, and optical fiber lines",
      "Maintaining continuous road traffic across heavy commercial arterial roads",
      "Strict city authority nighttime working hour constraints (11:00 PM to 05:00 AM)",
    ],
    execution: [
      "Pioneered non-disruptive pneumatic moling and micro-HDD for all municipal road crossings",
      "Deployed 35 mobile electrofusion teams equipped with barcode-scanning automatic fusion units",
      "Established community liaison desk resolving municipal utility issues within 4 hours",
    ],
    highlights: [
      "1,550 KM laid across urban zones with zero utility line strikes",
      "120,000 domestic PNG kitchens energized safely",
      "18 CNG stations commissioned supplying green fuel to 40,000 vehicles daily",
      "Zero gas leaks recorded during pneumatic testing at 1.5x working pressure",
    ],
    galleryImages: [
      { title: "City Gate Station Piping", caption: "Pressure reduction skids and ultrasonic flow metering header" },
      { title: "Urban Micro-Trenching", caption: "Laying 63mm MDPE PE-100 pipe under municipal sidewalk" },
      { title: "CNG Station Compressor Piping", caption: "High-pressure stainless steel tubing & cascade manifolds" },
    ],
    specLabel: "Urban Connections",
    specValue: "120,000+ PNG / 18 CNG Stations",
  },
  {
    id: "mumbai-feeder",
    slug: "mumbai-offshore-feeder",
    cat: "plant-piping",
    tag: "REFINERY & TERMINAL PIPING",
    tagColor: "orange",
    title: "Coastal Refinery Gas Interconnect & Terminal Piping",
    meta: "Length: 45 KM | 24\" OD",
    diameter: '24" (610 mm) OD & Plant Piping',
    length: "45 Kilometers + Station Spools",
    wallThickness: "14.3 mm to 20.6 mm (API 5L X65 / SS316L)",
    pressure: "85 Bar (ANSI Class 600)",
    duration: "14 Months",
    location: "Mumbai Coastal Terminal & Refinery Complex",
    state: "Maharashtra",
    client: "Bharat Petroleum Corporation Limited (BPCL)",
    projectType: "Terminal Interconnect & Station Piping",
    status: "Completed",
    shortDesc: "High-pressure gas delivery line and terminal pig receiver skids linking an LNG import facility with an operational petroleum refinery.",
    description: "High-consequence pipeline execution inside active refinery blast zones and tidal mangrove terrain. Required intrinsically safe equipment, hot-work permits in Class-1 Div-1 zones, and pre-fabricated modular piping skids.",
    scopeOfWork: [
      "Pre-fabrication of heavy-wall piping spools in ISO-certified yard",
      "Installation of dual 24\" scraper launcher and receiver barrels",
      "Cryogenic grade stainless steel piping installation at LNG terminal interface",
      "Emergency shutdown valve (ESD) skids with pneumatic actuators",
      "100% Radiography, PAUT, and hydrostatic test at 130 bar",
    ],
    keyChallenges: [
      "Strict SIMOPS (Simultaneous Operations) protocols inside operating petroleum refinery",
      "Highly corrosive coastal saline atmosphere requiring specialized 3-coat marine epoxy systems",
    ],
    execution: [
      "Modular off-site spool fabrication minimizing on-site hot work by 75%",
      "24/7 dedicated safety watch with continuous hydrocarbon sniffers during joint welding",
    ],
    highlights: [
      "Zero plant downtime during tie-in to mainline refinery header",
      "4.2 million man-hours executed with zero recordable injuries",
      "100% radiographic acceptance with zero weld defects in high-pressure steam/gas lines",
    ],
    galleryImages: [
      { title: "Scraper Trap Receiver Assembly", caption: "24-inch Class 600 scraper receiver installed at refinery boundary" },
      { title: "Refinery Interconnect Header", caption: "Heavy-wall API 5L X65 piping manifold with actuated ESD valves" },
    ],
    specLabel: "Safety Environment",
    specValue: "Class-1 Div-1 SIMOPS Safe",
  },
  {
    id: "rajasthan-corridor",
    slug: "rajasthan-desert-trunkline",
    cat: "cross-country",
    tag: "CROSS-COUNTRY TRUNKLINE",
    tagColor: "amber",
    title: "Rajasthan Desert Energy Pipeline Spur",
    meta: "Length: 320 KM | 30\" OD",
    diameter: '30" (762 mm) OD',
    length: "320 Kilometers",
    wallThickness: "12.7 mm to 17.5 mm (API 5L X70)",
    pressure: "92 Bar",
    duration: "18 Months",
    location: "Barmer - Jodhpur Energy Corridor",
    state: "Rajasthan",
    client: "Vedanta Cairn Oil & Gas / GAIL",
    projectType: "Natural Gas Transmission",
    status: "Ongoing",
    shortDesc: "30-inch gas evacuation line across Thar desert shifting dunes, requiring heavy-duty tracked equipment and thermal expansion anchors.",
    description: "Currently underway across challenging sand terrain in western Rajasthan. CandelaConstruction has established mobile air-conditioned welding camps and high-capacity ditching wheel excavators capable of cutting through shifting sand without wall collapse.",
    scopeOfWork: [
      "Route clearing and sand stabilization along 320 km desert RoW",
      "Trenching with customized continuous sand-retention ditch shields",
      "Mechanized dual-torch pipeline welding and automated ultrasonic testing",
      "Installation of 6 Sectionalizing Valve (SV) stations powered by solar telemetry skids",
    ],
    keyChallenges: [
      "Extreme ambient desert temperatures reaching 50°C causing rapid pipe thermal elongation",
      "Shifting sand dunes requiring geotechnical geotextile slope stabilization",
    ],
    execution: [
      "High-output twilight/night welding shifts during extreme summer peaks",
      "Tracked sidebooms with extra-wide pad footprints for dune traversing",
    ],
    highlights: [
      "210 KM already completed ahead of scheduled milestone target",
      "Zero water loss through closed-loop hydrotest recycling systems",
    ],
    galleryImages: [
      { title: "Desert Trenching Spread", caption: "Specialized tracked wheel trencher cutting through sand formations" },
      { title: "Stringing on Dune Crest", caption: "30-inch API 5L X70 pipe string laid across stabilized desert RoW" },
    ],
    specLabel: "Current Progress",
    specValue: "68% Completed / On Schedule",
  },
  {
    id: "mp-feeder",
    slug: "central-india-gas-grid",
    cat: "cross-country",
    tag: "INTERSTATE GAS GRID",
    tagColor: "amber",
    title: "Central India Industrial Gas Corridor",
    meta: "Length: 260 KM | 28\" OD",
    diameter: '28" (711 mm) OD',
    length: "260 Kilometers",
    wallThickness: "14.2 mm (API 5L X65)",
    pressure: "90 Bar",
    duration: "16 Months",
    location: "Indore - Pithampur - Ujjain Corridor",
    state: "Madhya Pradesh",
    client: "GAIL (India) Limited",
    projectType: "Industrial Gas Grid Spur",
    status: "Ongoing",
    shortDesc: "28-inch transmission trunkline supplying natural gas to major auto manufacturing hubs and chemical clusters in central India.",
    description: "Connecting national trunkline grids to industrial manufacturing hubs in Madhya Pradesh. Incorporates 4 river HDD crossings, 18 canal crossings, and 3 City Gate Stations (CGS).",
    scopeOfWork: [
      "DGPS survey, RoW clearing, and mechanized ditching",
      "28\" steel pipe stringing, automatic welding, and 100% PAUT",
      "HDD crossings of Chambal and Gambhir river systems",
      "EPC of 3 City Gate Stations with ultrasonic gas metering",
    ],
    keyChallenges: [
      "Deep black cotton expansive clay soil requiring extensive soil stabilization",
      "Multiple irrigation canal crossings during active agricultural seasons",
    ],
    execution: [
      "Concurrent deployment of 3 pipeline spreads and 2 dedicated HDD spreads",
      "Real-time digital weld tracking and radiograph archival platform",
    ],
    highlights: [
      "180 KM successfully lowered and backfilled",
      "All 4 river HDD crossings pulled through successfully",
    ],
    galleryImages: [
      { title: "River Crossing Pilot Drill", caption: "Chambal river crossing pilot hole drilling in Madhya Pradesh" },
    ],
    specLabel: "Current Progress",
    specValue: "75% Completed",
  },
];

/* ──────────────── Interactive Regional Project Hubs & Sub-Districts ──────────────── */
export const indiaProjectStates = [
  {
    id: "saran-chapra",
    name: "Saran (Chapra)",
    district: "Saran",
    headquarters: "Chapra",
    projectsCount: 14,
    pipelineKm: 340,
    clientsCount: 4,
    highlights: "Gandak & Ganga HDD River Crossings, Steel Spur Lines, City Gas Distribution",
    subDistricts: ["Chapra Sadar", "Marhaura", "Sonpur", "Revelganj", "Dighwara", "Garkha", "Manjhi"],
    activeSites: ["Chapra Sadar Hub", "Marhaura Industrial Area", "Sonpur Riverbank", "Revelganj Girth Weld Base", "Dighwara Crossing"],
    coords: { x: 22, y: 55 },
  },
  {
    id: "vaishali",
    name: "Vaishali (Hajipur)",
    district: "Vaishali",
    headquarters: "Hajipur",
    projectsCount: 11,
    pipelineKm: 285,
    clientsCount: 3,
    highlights: "Hajipur Industrial Area CGD, Gandak Trenchless Feeder, CNG City Gate Station Piping",
    subDistricts: ["Hajipur Sadar", "Lalganj", "Mahua", "Vaishali", "Bidupur", "Jandaha", "Raghopur"],
    activeSites: ["Hajipur Industrial Area", "Mahua Transmission Spur", "Lalganj Trenchless Spreads", "Bidupur RoW Camp", "Vaishali CGS"],
    coords: { x: 44, y: 56 },
  },
  {
    id: "muzaffarpur",
    name: "Muzaffarpur",
    district: "Muzaffarpur",
    headquarters: "Muzaffarpur",
    projectsCount: 16,
    pipelineKm: 420,
    clientsCount: 5,
    highlights: "Kanti Thermal Power Gas Spur, High-Pressure Transmission Trunkline, Urban PNG Network",
    subDistricts: ["Muzaffarpur Sadar", "Kanti", "Motipur", "Sakra", "Marwan", "Sahebganj", "Kurhani"],
    activeSites: ["Kanti Thermal Power Complex", "Motipur Agro-Industrial Corridor", "Bela Industrial Estate", "Sakra Mechanized Spread", "Marwan Terminal"],
    coords: { x: 50, y: 32 },
  },
  {
    id: "samastipur",
    name: "Samastipur",
    district: "Samastipur",
    headquarters: "Samastipur",
    projectsCount: 9,
    pipelineKm: 245,
    clientsCount: 3,
    highlights: "Burhi Gandak HDD Crossing, Dalsinghsarai Interconnect, Agro-Industrial Steel Line",
    subDistricts: ["Samastipur Sadar", "Dalsinghsarai", "Rosera", "Pusa", "Kalyanpur", "Ujiarpur", "Singhia"],
    activeSites: ["Samastipur City Gate Station", "Dalsinghsarai Interconnect", "Rosera River Crossing", "Pusa Research Corridor", "Kalyanpur Spread"],
    coords: { x: 74, y: 48 },
  },
];

/* ──────────────── Equipment Fleet ──────────────── */
export const fleetEquipment: EquipmentItem[] = [
  {
    name: "Caterpillar 587T / 572R Sidebooms",
    application: "Pipe handling, lowering-in, line-up clamping",
    specs: "Lifting capacity 90,000 kg (200,000 lbs), 24-ft boom, counterweight ballast",
    capacity: "Up to 48\" Dia Pipes",
    quantity: "28 Units Owned",
    category: "Pipelaying",
  },
  {
    name: "Vermeer D750x900 & D330x500 HDD Rigs",
    application: "Trenchless river, canal & highway crossings",
    specs: "350-ton (750,000 lbs) pullback, 102,000 ft-lbs torque, optical gyro steering",
    capacity: "Max span 2,500m, up to 48\" Dia",
    quantity: "6 Spread Sets",
    category: "Trenchless",
  },
  {
    name: "CRC-Evans / Lincoln Dual-Torch Automatic Welders",
    application: "Mechanized external pipeline girth welding (GMAW/FCAW)",
    specs: "Dual-arc microprocessor control, internal pneumatic copper shoes",
    capacity: "Cycle time 4 mins per 42\" joint",
    quantity: "14 Spreads",
    category: "Welding",
  },
  {
    name: "Kobelco SK380 / CAT 336D Excavators & Breakers",
    application: "RoW grading, deep trenching, basalt rock breaking",
    specs: "38-ton operating weight, Furukawa F45 hydraulic breakers (4,500 J impact)",
    capacity: "Trenching depth up to 4.5m",
    quantity: "42 Units Owned",
    category: "Earthmoving",
  },
  {
    name: "High-Pressure Triplex Hydrotest Pump Spreads",
    application: "Pipeline hydrostatic strength & leak testing",
    specs: "Positive displacement triplex plunger pumps up to 250 bar, electronic DWT",
    capacity: "Flow rate 1,200 L/min at 200 bar",
    quantity: "8 Dedicated Sets",
    category: "Testing",
  },
  {
    name: "Automated Ultrasonic PAUT / TOFD Crawlers",
    application: "100% girth weld non-destructive examination",
    specs: "Phased array ultrasonic crawler with zone discrimination & TOFD probes",
    capacity: "Full 360° scan in 90 seconds",
    quantity: "12 Systems",
    category: "Testing",
  },
  {
    name: "CRC-Evans PB 16-32 & PB 30-48 Hydraulic Bending Machines",
    application: "Cold field pipe bending along natural contour curves",
    specs: "High-yield hydraulic dies for API 5L X70/X80 pipes without ovality distortion",
    capacity: '16" to 48" OD Pipes',
    quantity: "8 Units",
    category: "Pipelaying",
  },
  {
    name: "High-Volume Desiccant Dry Air Compressors",
    application: "Pipeline dewatering, swabbing & drying to -40°C",
    specs: "Oil-free 1,500 CFM rotary screw units with twin-tower desiccant dryers",
    capacity: "-40°C Dew Point Output",
    quantity: "6 Spreads",
    category: "Testing",
  },
];

/* ──────────────── HSE & Quality Management ──────────────── */
export const hseMetrics = {
  safeManHours: "28.4 Million",
  ltifr: "0.00",
  environmentalRestoration: "100%",
  zeroFailureHydrotests: "100%",
  goldenSafetyRules: 14,
  trainingsConducted: "45,000+ Hours",
};

export const certifications = [
  {
    code: "ISO 9001:2015",
    title: "Quality Management System",
    description: "Certified standards for pipeline engineering, fabrication, welding, inspection, and EPC delivery.",
    badge: "QA/QC Certified",
  },
  {
    code: "ISO 14001:2015",
    title: "Environmental Management",
    description: "Rigorous ecological safeguards, topsoil segregation, zero-spill protocols, and complete land reinstatement.",
    badge: "Eco-Restoration",
  },
  {
    code: "ISO 45001:2018",
    title: "Occupational Health & Safety",
    description: "International standard for high-risk industrial construction, Permit-to-Work systems, and hazard prevention.",
    badge: "Zero Harm",
  },
];

/* ──────────────── Leadership Team ──────────────── */
export const leadershipTeam = [
  {
    name: "Rajendra V. Mehta",
    role: "Managing Director & CEO",
    experience: "32+ Years Experience",
    background: "Former Executive Director at premier national energy utilities. Spearheaded over 5,000 km of cross-country trunklines across India and the Middle East.",
  },
  {
    name: "Col. Sanjeev K. Sharma (Retd.)",
    role: "Director — Operations & EPC",
    experience: "28+ Years Experience",
    background: "Ex-Indian Army Corps of Engineers. Expert in heavy mechanized logistics, high-risk river crossings, and rapid mobilization across remote terrains.",
  },
  {
    name: "Dr. Ananya Sengupta",
    role: "Head of Engineering & Technical Services",
    experience: "24+ Years Experience",
    background: "Ph.D. in Pipeline Geotechnics (IIT Bombay). Specialist in ASME B31.8 hydraulic transient analysis, seismic crossing design, and trenchless engineering.",
  },
  {
    name: "K. R. Narayanan",
    role: "Chief Quality & HSE Officer",
    experience: "26+ Years Experience",
    background: "ASNT Level-III, NACE Certified Specialist. Oversees our 0.00 LTIFR track record and institutionalized our 14 Golden Rules of Pipeline Safety.",
  },
];

/* ──────────────── Why Choose Us 6 Pillars ──────────────── */
export const whyChooseUsPillars = [
  {
    title: "Technical Expertise",
    desc: "In-house engineering, hydraulic modelling, and specialized pipeline construction crews with decades of continuous project execution.",
    metric: "32+ Years Track Record",
  },
  {
    title: "Safety First Culture",
    desc: "Uncompromising HSE systems with 28.4 million safe man-hours, 14 Golden Rules, and strict daily Job Safety Analysis (JSA) protocols.",
    metric: "0.00 LTIFR Record",
  },
  {
    title: "Quality Assurance & NDT",
    desc: "100% weld inspection using Automated Ultrasonic Testing (AUT) and certified Level-III inspectors achieving <0.5% weld defect rate.",
    metric: "100% Inspection Integrity",
  },
  {
    title: "Heavy Equipment Ownership",
    desc: "Fleet of company-owned Caterpillar sidebooms, 350-ton Vermeer HDD rigs, and automatic welding spreads ensuring instant mobilization.",
    metric: "100+ Major Rigs Owned",
  },
  {
    title: "Advanced Trenchless Tech",
    desc: "Pioneering HDD and microtunnelling capabilities executing complex crossings beneath tidal estuaries, railways, and busy highways.",
    metric: "2.2+ KM Single Pulls",
  },
  {
    title: "Pan-India Execution",
    desc: "Active operational base camps and supply logistics spanning Gujarat, Maharashtra, Rajasthan, Madhya Pradesh, and Karnataka.",
    metric: "5 Strategic Regional Hubs",
  },
];

/* ──────────────── Careers / Open Positions ──────────────── */
export const openPositions = [
  {
    id: "pe-01",
    title: "Lead Pipeline Engineer (Cross-Country)",
    location: "Ahmedabad / Project Sites",
    experience: "5–8 Years",
    department: "Engineering & Construction",
    type: "Full-Time",
    desc: "Oversee pipeline alignment, stringing, ditching, and lowering spreads for a 42\" gas trunkline. Experience with ASME B31.8 and API 1104 mandatory.",
  },
  {
    id: "se-02",
    title: "Site Construction Manager",
    location: "Pan-India Project Sites",
    experience: "8–12 Years",
    department: "Operations",
    type: "Full-Time",
    desc: "Lead mechanized pipeline spread execution, RoW management, contractor coordination, and daily schedule tracking in compliance with PNGRB standards.",
  },
  {
    id: "ndt-03",
    title: "Senior NDT Level-II / Level-III Inspector",
    location: "Gujarat / Rajasthan Sites",
    experience: "4–7 Years",
    department: "Quality Assurance (QA/QC)",
    type: "Full-Time",
    desc: "Direct Phased Array Ultrasonic Testing (PAUT), TOFD, and radiographic interpretation of automated girth welds on high-pressure steel pipelines.",
  },
  {
    id: "hdd-04",
    title: "HDD Rig Pilot / Directional Driller",
    location: "River Crossing Sites",
    experience: "5–10 Years",
    department: "Trenchless Technology",
    type: "Full-Time",
    desc: "Operate 250T to 450T Vermeer HDD rigs, optical gyroscopic steering tools, mud recycling plants, and lead large-diameter river pullbacks.",
  },
  {
    id: "hse-05",
    title: "HSE Specialist & Safety Officer",
    location: "Central India Corridor",
    experience: "3–6 Years",
    department: "Health, Safety & Environment",
    type: "Full-Time",
    desc: "Implement site HSE management systems, conduct daily toolbox talks, monitor Permit-to-Work (PTW) protocols, and enforce zero-incident culture.",
  },
  {
    id: "cgd-06",
    title: "City Gas Distribution (CGD) Project Engineer",
    location: "Ahmedabad / Surat / Pune",
    experience: "3–5 Years",
    department: "Urban Infrastructure",
    type: "Full-Time",
    desc: "Supervise urban carbon steel and MDPE PE-100 electrofusion laying, microtrenching, City Gate Station piping, and domestic PNG connections.",
  },
];

/* ──────────────── Corporate News & Milestones ──────────────── */
export const corporateNews = [
  {
    id: "news-1",
    date: "September 2026",
    tag: "MILESTONE",
    title: "CandelaConstruction Crosses 28.4 Million Safe Man-Hours Without Lost Time Injury (LTI)",
    summary: "Reflecting our steadfast commitment to 'Trust delivered.', CandelaConstruction celebrates a landmark safety milestone across all active cross-country and urban spreads.",
  },
  {
    id: "news-2",
    date: "August 2026",
    tag: "COMMISSIONING",
    title: "Successful Charging of 42-Inch Western Gas Corridor Trunkline",
    summary: "The 480 KM Phase-II high-pressure transmission line completed nitrogen purging and statutory hydrotesting with 100% pressure hold, delivering gas to regional industries.",
  },
  {
    id: "news-3",
    date: "June 2026",
    tag: "TECHNOLOGY",
    title: "Record 2,180-Meter Riverbed HDD Pullback Completed in Bharuch Estuary",
    summary: "Utilizing optical gyroscopic steering and our 350-ton Vermeer rig spread, CandelaConstruction successfully installed a 36-inch heavy-wall carrier pipe 38 meters below riverbed.",
  },
  {
    id: "news-4",
    date: "May 2026",
    tag: "CONTRACT AWARD",
    title: "Awarded 320 KM Desert Pipeline Expansion EPC Contract by Leading Energy Utility",
    summary: "Scope covers mechanized trenching, automatic dual-torch welding, and Sectionalizing Valve station construction through western energy corridors.",
  },
];