import { Pool } from "pg";

const pool = new Pool({
  host: process.env.PGHOST || "localhost",
  port: Number(process.env.PGPORT) || 5433,
  user: process.env.PGUSER || "postgres",
  password: process.env.PGPASSWORD || "9906",
  database: process.env.PGDATABASE || "GasPipeline",
});

async function run() {
  const site = await import("../data/site.ts");

  const aboutContent = {
    heritage: {
      eyebrow: "OUR HERITAGE",
      title: "Three Decades of Engineering Excellence",
      p1: "Founded in 1994, CandelaConstruction Private Limited began as a specialized pipeline engineering consultancy and has grown into a premier pan-India EPC contractor capable of mobilizing multiple heavy mechanized spreads simultaneously.",
      p2: "We have successfully constructed and charged over 3,850 kilometers of transmission pipelines operating up to ANSI Class 900 pressure ratings (120 Bar). Our company-owned equipment fleet includes 350-ton Vermeer HDD rigs, Caterpillar 587T sidebooms, and CRC-Evans automatic dual-torch welding systems.",
      assetOwnership: "100%",
      assetOwnershipSub: "No third-party rig dependency",
      hydrotestRecord: "Zero Failure",
      hydrotestRecordSub: "100% first-time pressure pass",
    },
    vision: {
      eyebrow: "OUR VISION",
      title: "To Be India's Most Trusted Energy Infrastructure Partner",
      desc: "We aspire to engineer, construct, and safeguard the pipelines that deliver clean natural gas and vital hydrocarbons to every industrial corridor, power generation plant, and domestic household in the nation with zero harm to human life and the natural environment.",
    },
    mission: {
      eyebrow: "OUR MISSION",
      title: "Precision Engineering, Zero Rework, Absolute Safety",
      desc: "To deploy industry-leading trenchless technology, automated welding systems, and digital quality oversight to execute high-pressure pipelines ahead of client schedules, while setting the benchmark for environmental restoration and worker health.",
    },
    pillars: [
      {
        title: "Turnkey EPC Execution",
        desc: "End-to-end delivery from route cadastral survey and design to hydrostatic commissioning and nitrogen inerting.",
      },
      {
        title: "Complex Terrain Capability",
        desc: "Proven mastery over basalt hard rock Deccan plateaus, tidal river estuaries, desert sands, and congested urban zones.",
      },
      {
        title: "Strict Code Compliance",
        desc: "Execution strictly governed by ASME B31.8, API 1104, PNGRB T4S, and OISD-141 regulations.",
      },
    ],
    governance: {
      eyebrow: "EXECUTIVE GOVERNANCE",
      title: "Seasoned Leadership With Decades of EPC Experience",
      desc: "Our board and technical directors combine veteran energy utility experience with specialized geotechnical and metallurgical expertise.",
    },
    leadership: site.leadershipTeam,
    whyChooseUs: site.whyChooseUsPillars,
  };

  const capabilitiesContent = {
    capability_02: {
      eyebrow: "CAPABILITY 02",
      title: "Advanced Construction & Inspection Technologies",
      desc: "Integrating robotics, laser guidance, gyroscopic drill tracking, and digital NDT to eliminate human error.",
      cards: [
        {
          title: "Automated Mechanized Welding",
          icon: "Cpu",
          desc: "Dual-torch external GMAW/FCAW systems with microprocessor-controlled wave pulsing and internal pneumatic copper shoes. Achieves cycle times of under 5 minutes per 42\" joint with less than 0.5% repair rate.",
        },
        {
          title: "Gyroscopic HDD Steering Tools",
          icon: "Wrench",
          desc: "Real-time optical gyroscopic guidance systems unaffected by riverbed magnetic interference or overhead high-voltage power corridors. Delivers 2+ KM continuous pilot holes with ±15cm exit accuracy.",
        },
        {
          title: "Automated Ultrasonic Testing (AUT)",
          icon: "ShieldCheck",
          desc: "Zone-discrimination Phased Array Ultrasonic Testing (PAUT) and Time of Flight Diffraction (TOFD) crawlers. Immediate digital imaging and millimeter-precision defect sizing on girth welds.",
        },
      ],
    },
    capability_03: {
      eyebrow: "CAPABILITY 03",
      title: "Certified Technical Manpower & Field Spreads",
      desc: "Over 1,200 trained professionals comprising ASNT Level-III inspectors, coded 6G welders, HDD rig pilots, and safety directors.",
      counters: [
        { count: "120+", label: "Coded 6G Welders", sub: "API 1104 Certified" },
        { count: "45+", label: "NDT Level-II/III Experts", sub: "PAUT & TOFD Certified" },
        { count: "60+", label: "HSE & Safety Officers", sub: "NEBOSH / IOSH Certified" },
        { count: "28+", label: "Senior Spread Managers", sub: "Cross-Country Certified" },
      ],
    },
    capability_04: {
      eyebrow: "CAPABILITY 04",
      title: "Turnkey Pre-Commissioning & Testing Spreads",
      desc: "Statutory pipeline integrity testing utilizing high-volume fill spreads, positive displacement pressurization pumps, and deadweight electronic pressure-temperature logging.",
      cards: [
        {
          title: "High-Pressure Hydrostatic Testing Spreads",
          desc: "Statutory 24-hour holds up to 150 bar with dual-probe electronic deadweight testers (0.01 bar precision) calibrated to international metrological standards.",
        },
        {
          title: "High-Volume Oil-Free Air Drying Spreads",
          desc: "Continuous desiccant air drying spreads reducing internal pipe atmosphere dew point down to -40°C, preventing hydrate formation during charging.",
        },
        {
          title: "Electronic Geometric Pigging (EGP Caliper)",
          desc: "Multi-channel caliper geometric pigging runs with digital odometers detecting internal ovality, dents, and mill anomalies with millimeter accuracy.",
        },
      ],
    },
  };

  const homeContent = {
    aboutCompany: {
      eyebrow: "ABOUT CANDELACONSTRUCTION",
      title: "Engineering India's Energy Arteries With Uncompromising Rigor",
      desc: "From concept to commissioning, CandelaConstruction Private Limited delivers turnkey pipeline infrastructure for national utilities, private operators, and city gas networks — Trust delivered.",
      storyP1: "Established in 1994, CandelaConstruction has grown from a specialized pipeline engineering team into one of India's most capable pipeline EPC contractors. We operate across tough topographies — from the rocky Deccan traps and desert dunes of Rajasthan to complex perennial river crossings in North Bihar and congested city gas corridors.",
      storyP2: "Our core execution model relies on company-owned heavy equipment, in-house technical engineering, and strict compliance with ASME B31.8, API 1104, and PNGRB standards. We maintain zero tolerance for safety shortcuts.",
      pill1Val: "3,850+ KM",
      pill1Label: "Pipeline Laid Across India",
      pill2Val: "180+",
      pill2Label: "Major HDD River Crossings",
      pill3Val: "28.4M",
      pill3Label: "Safe Man-Hours (LTI-Free)",
      pill4Val: "100%",
      pill4Label: "Weld Inspection Integrity",
    },
    servicesSection: {
      eyebrow: "CORE CAPABILITIES & SERVICES",
      title: "End-to-End Pipeline EPC Infrastructure Solutions",
      desc: "Specialized engineering, mechanized construction, and pre-commissioning services executed under strict international engineering codes.",
    },
    projectsSection: {
      eyebrow: "LANDMARK EXECUTION DOSSIER",
      title: "Featured High-Pressure Pipeline Infrastructure Spreads",
      desc: "Case studies demonstrating our technical mastery over high-pressure steel trunklines, riverbed crossings, and urban city gas networks.",
    },
    corridorSection: {
      eyebrow: "NORTH BIHAR PIPELINE EXECUTION CORRIDOR",
      title: "Regional Operations: Chapra (Saran) to Muzaffarpur, Samastipur & Vaishali",
      desc: "Explore our high-pressure gas transmission spreads, river HDD crossings, and city gas networks deployed across strategic sub-districts from Saran to Muzaffarpur, Samastipur, and Vaishali.",
    },
    processSection: {
      eyebrow: "EXECUTION METHODOLOGY & LIFECYCLE",
      title: "12-Step Mechanized Pipeline Construction Process",
      desc: "From cadastral survey and right-of-way clearing to hydrostatic testing and nitrogen commissioning — our disciplined, sequential engineering workflow.",
    },
    hseSection: {
      eyebrow: "HSE & QUALITY MANAGEMENT",
      title: "Zero Compromise on Human Life, Quality & Environment",
      desc: "Our operations adhere to the highest international safety standards. With 28.4 million safe man-hours without Lost Time Injury (LTI), safety is our core operational value.",
    },
    whyUsSection: {
      eyebrow: "MEASURABLE VALUE PROPOSITIONS",
      title: "Why Public Utilities & Energy Majors Choose Us",
      desc: "Proven capabilities, world-class equipment ownership, and our hallmark pledge — 'Trust delivered.' — ensuring projects are completed safely and on schedule.",
    },
  };

  const regionalBases = [
    {
      district: "Saran (Chapra)",
      baseName: "Chapra Sadar Central Spreads Hub",
      address: "Industrial Growth Corridor, NH-19 Bypass, Chapra, Saran, Bihar - 841301",
      coordinator: "Vikramaditya Roy (Spread In-Charge)",
      phone: "+91 94310 11001",
      status: "Active Spreads & Logistics Camp",
    },
    {
      district: "Vaishali (Hajipur)",
      baseName: "Hajipur Industrial Complex Hub",
      address: "Plot 42, Hajipur Industrial Estate, Vaishali, Bihar - 844102",
      coordinator: "Sunil K. Verma (HDD Site Pilot)",
      phone: "+91 94310 22002",
      status: "Gandak River HDD Operations Camp",
    },
    {
      district: "Muzaffarpur",
      baseName: "Kanti Energy & Transmission Hub",
      address: "Near Kanti Thermal Complex, NH-28 Highway, Muzaffarpur, Bihar - 843130",
      coordinator: "Dharmendra Nath (Welding Inspector)",
      phone: "+91 94310 33003",
      status: "Automated Welding & PAUT QA Yard",
    },
    {
      district: "Samastipur",
      baseName: "Samastipur City Gate Station Spreads Base",
      address: "Tajpur Road, Near CGS Terminal, Samastipur, Bihar - 848101",
      coordinator: "Manoj P. Mishra (Site Engineer)",
      phone: "+91 94310 44004",
      status: "Spur Line & City Gas Base",
    },
  ];

  await pool.query(
    `UPDATE site_settings
     SET about_content = $1,
         capabilities_content = $2,
         home_content = $3,
         regional_bases = $4
     WHERE id = 'default';`,
    [
      JSON.stringify(aboutContent),
      JSON.stringify(capabilitiesContent),
      JSON.stringify(homeContent),
      JSON.stringify(regionalBases),
    ]
  );

  console.log("Successfully seeded site_settings with rich JSONB contents!");
  await pool.end();
}

run().catch(console.error);
