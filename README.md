# CandelaConstruction — Enterprise EPC Pipeline Transmission Platform

> **High-Performance Infrastructure & Cross-Country Gas Pipeline Management Ecosystem**  
> Built with **Next.js 15 (App Router) + TypeScript + Tailwind CSS**, integrated with a **Spring Boot 3.3 Multi-Module Microservices Cluster** and backed by a relational **PostgreSQL Database** on Port `5433`.

---

## 🏗 High-Level System Architecture Layout

```
                                  ╔═══════════════════════════════════════════╗
                                  ║         CLIENT INTERFACE LAYER            ║
                                  ╚═══════════════════════════════════════════╝
                                       │                                 │
                                       ▼                                 ▼
                     ┌──────────────────────────────────┐   ┌──────────────────────────────────┐
                     │    Public Web Application SPA    │   │     Protected Admin Console      │
                     │      http://localhost:3000/      │   │   http://localhost:3000/admin    │
                     │  (Home, Services, Projects,      │   │  (Cryptographic Scrypt Auth,     │
                     │   SCADA Sim, Calculator, RFQ)    │   │   Break-Glass Master Key, CRUD)  │
                     └────────────────┬─────────────────┘   └────────────────┬─────────────────┘
                                      │                                      │
                                      ▼                                      ▼
             ╔═════════════════════════════════════════════════════════════════════════════════════╗
             ║                   NEXT.js FULLSTACK MIDDLEWARE & API LAYER                          ║
             ║                                (Port 3000)                                          ║
             ╠═════════════════════════════════════════════════════════════════════════════════════╣
             ║  • Route Handlers: /api/settings, /api/clients, /api/hse, /api/fleet, /api/news    ║
             ║  • Admin Dispatcher: /api/admin/[module] (Projects, Services, Fleet, RFQs, etc.)    ║
             ║  • Cryptographic Auth: /api/admin/auth (Scrypt, HMAC Cookie, Emergency Recovery)   ║
             ║  • Microservices Client: lib/api.ts (Reverse Gateway Router with Resilient Fallback)║
             ╚═════════════════════════════════════════════════════════════════════════════════════╝
                                       │                                 │
                 Direct Pool Query     │                                 │ REST / HTTP Proxy
                 (pg / lib/db.ts)      │                                 │ (lib/api.ts)
                                       │                                 ▼
                                       │                ╔═════════════════════════════════╗
                                       │                ║    SPRING BOOT API GATEWAY      ║
                                       │                ║           Port 8080             ║
                                       │                ╚════════════════┬════════════════╝
                                       │                                 │
                                       │          ┌──────────────────────┼──────────────────────┐
                                       │          │                      │                      │
                                       │          ▼                      ▼                      ▼
                                       │  ┌───────────────┐      ┌───────────────┐      ┌───────────────┐
                                       │  │project-service│      │  tendering-   │      │  operations-  │
                                       │  │   (Port 8081) │      │    service    │      │    service    │
                                       │  ├───────────────┤      │  (Port 8082)  │      │  (Port 8083)  │
                                       │  │• EPC Projects │      ├───────────────┤      ├───────────────┤
                                       │  │• Capabilities │      │• RFQ Engine   │      │• SCADA Stream │
                                       │  │• Heavy Fleet  │      │• ASME B31.8   │      │• ESD Emergency│
                                       │  │• State Corridors     │  Estimator    │      │• Valve Resets │
                                       │  └───────┬───────┘      └───────┬───────┘      └───────┬───────┘
                                       │          │                      │                      │
                                       │          │                      │      ┌───────────────┘
                                       │          │                      ▼      ▼
                                       │          │              ┌───────────────┐
                                       │          │              │hr-news-service│
                                       │          │              │  (Port 8084)  │
                                       │          │              ├───────────────┤
                                       │          │              │• Job Openings │
                                       │          │              │• Applications │
                                       │          │              │• Press Room   │
                                       │          │              └───────┬───────┘
                                       │          │                      │
                                       ▼          ▼                      ▼
                     ╔═════════════════════════════════════════════════════════════╗
                     ║              POSTGRESQL RELATIONAL DATABASE                 ║
                     ║                Database: GasPipeline (Port 5433)            ║
                     ╠═════════════════════════════════════════════════════════════╣
                     ║  • admin_auth (Scrypt Hashes, Salts, Session Version, Keys) ║
                     ║  • site_settings (24x7 Control Room, Codes, Safe Hours, etc)║
                     ║  • projects & project_scope (Cross-Country, HDD, CGD, Plant)║
                     ║  • services & service_bullets (ASME B31.8, API 1104, QA/QC) ║
                     ║  • equipment (HDD Rigs, Pipelayers, Internal Clamps, Fleet) ║
                     ║  • clients (Tier-1 PSUs: GAIL, IOCL, ONGC, HPCL, BPCL)      ║
                     ║  • hse_stats (LTI-Free Safe Hours, TRIR, Safety Audits)     ║
                     ║  • rfq_submissions & job_applications (Inboxes)             ║
                     ║  • corporate_news & leadership_team                         ║
                     ╚═════════════════════════════════════════════════════════════╝
```

---

## 🧩 Architectural Layers in Detail

### 1. Frontend & Client Presentation Layer (`pipeline-construction-site`)
- **Technology Stack**: Next.js 15.5 (App Router), React 19, TypeScript, Vanilla CSS + Tailwind utility tokens, Lucide icons.
- **Public Corridors & Modules**:
  - `/` (Home): Executive hero with pulsating 24x7 emergency hotline, ASME/PNGRB compliance badges, real-time SCADA telemetry terminal, ASME B31.8 pipeline tonnage & cost calculator, North Bihar Corridor showcase, measurable advantages.
  - `/about`: Company profile, quality policy, and Executive Governance board.
  - `/services`: Technical execution capabilities (Cross-Country, HDD River Crossings, CGD Networks, Hydrotesting, Cathodic Protection).
  - `/projects` & `/projects/[slug]`: Dynamic case studies with technical specs, pipe diameters, wall thickness, and execution highlights.
  - `/capabilities`: Owned heavy machinery fleet, automated welding spreads, GIS alignment survey data.
  - `/hse`: Health, Safety & Environmental governance, 28.4M LTI-free hours metric, ISO certifications (9001, 14001, 45001).
  - `/clients`: Tier-1 energy partners and sector segmentation.
  - `/careers`: Career listings with live candidate application modal.
  - `/news`: Corporate press releases, statutory notices, and commissioning updates.
  - `/contact`: Direct communication lines, spread base locations, and commercial tender RFP intake.

---

### 2. Administrative Console & Security Governance (`/admin`)
- **Cryptographic Security Layer (`lib/auth.ts`)**:
  - **Salted Scrypt Key Derivation**: Passwords and keys hashed with 32-byte cryptographically secure random salts and 64-byte key lengths.
  - **Timing-Attack Resistance**: `crypto.timingSafeEqual` prevents side-channel timing analysis.
  - **Tamper-Proof Session Tokens**: HMAC-SHA256 signed tokens stored in `HttpOnly`, `SameSite=Lax` cookies (`candela_admin_token`).
  - **Session Version Invalidation**: Passwords and tokens embed a monotonic `session_version`. Rotating the password immediately bumps the version in PostgreSQL, **terminating all active sessions across all devices**.
  - **Break-Glass Master Recovery Key**: High-entropy offline emergency key (`CANDELA-REC-XXXX-XXXX-XXXX-XXXX`). Can override any compromise, kick out all logged-in users, and reset access.
- **Admin Capabilities**:
  - Manage **Global Settings** (24x7 Control Room hotline, safety hours, ISO badges, Hero headlines, taglines).
  - Manage **About Us & Executive Governance** (Leadership team profiles, mission statements).
  - Manage **EPC Projects & Technical Scopes** (Add, edit, delete projects and gallery).
  - Manage **Machinery Fleet & Equipment** (Pipe layers, HDD rigs, cold bending machines).
  - Manage **HSE Metrics** (Safe man-hours, audits, TRIR).
  - Manage **Energy Clients, News & Releases, RFQ Tenders, and Job Applications**.

---

### 3. Spring Boot Microservices Ecosystem (`pipeline-construction-Microservices`)
Built with **Spring Boot 3.3.3 + Java 17**, structured into independent domain services coordinated by an API Gateway:

| Microservice | Port | Domain Responsibilities | Key REST Endpoints |
|:---|:---:|:---|:---|
| **`api-gateway`** | **8080** | Central ingress router, reverse proxy, CORS policy, rate limiting, and unified ecosystem health monitor. | `GET /api/gateway/health`<br>`GET /api/gateway/info` |
| **`project-service`** | **8081** | Manages EPC project portfolio, technical pipeline specs, owned fleet machinery, and state footprints. | `GET /api/projects`<br>`GET /api/projects/{slug}`<br>`GET /api/services`<br>`GET /api/fleet`<br>`GET /api/stats`<br>`GET /api/states` |
| **`tendering-service`** | **8082** | RFQ commercial intake pipeline (generates `RFQ-2026-XXXX`) and ASME B31.8 engineering estimation engine. | `POST /api/rfq`<br>`POST /api/calculator/estimate` |
| **`operations-service`**| **8083** | Real-time SCADA telemetry simulation (stations SV-01 to SV-04), live jitter, emergency ESD valve trip & reset commands. | `GET /api/scada/telemetry`<br>`POST /api/scada/trip`<br>`POST /api/scada/reset`<br>`GET /api/scada/logs`<br>`GET /api/hse` |
| **`hr-news-service`** | **8084** | Talent recruitment, job application intake (`APP-2026-XXXX`), and corporate press releases. | `GET /api/careers`<br>`POST /api/careers/apply`<br>`GET /api/news` |

---

### 4. PostgreSQL Database Layer (`GasPipeline` on Port `5433`)
The single source of truth for dynamic enterprise records:

| Table | Primary Columns | Purpose |
|:---|:---|:---|
| `admin_auth` | `id`, `password_hash`, `password_salt`, `master_recovery_hash`, `master_recovery_salt`, `session_version`, `failed_attempts`, `locked_until`, `last_login`, `last_password_change` | Stores salted cryptographic Scrypt credentials, session versioning, and break-glass recovery hashes. |
| `site_settings` | `id`, `company_name`, `tagline`, `control_room_hotline`, `compliance_codes`, `safe_hours`, `iso_badges`, `hero_headline`, `hero_subtitle`, `contact_email`, `contact_phone`, `primary_address`, `spread_locations` | Global company contact, compliance numbers, top bar alert badges, and corridor metadata. |
| `projects` | `id`, `slug`, `title`, `cat`, `tag`, `diameter`, `length`, `pressure`, `location`, `state`, `client`, `status`, `scope_of_work`, `challenges` | EPC project portfolio across Cross-Country, HDD, CGD, and Plant Piping. |
| `services` | `id`, `n`, `title`, `slug`, `standard`, `color`, `text`, `bullets`, `specifications` | Pipeline engineering disciplines adhering to ASME B31.8 / API 1104. |
| `equipment` | `id`, `name`, `category`, `capacity`, `count_units`, `standard_spec`, `status` | Owned heavy machinery inventory (HDD rigs, internal line-up clamps). |
| `clients` | `id`, `name`, `logo_text`, `sector`, `badge` | PSU & Private energy operators (GAIL, IOCL, ONGC, etc.). |
| `hse_stats` | `id`, `safe_man_hours`, `lti_free_days`, `pipeline_km_tested`, `air_safety_audits`, `training_hours`, `trir` | Real-time safety audit and regulatory compliance tracking. |
| `rfq_submissions` | `id`, `reference_no`, `company_name`, `contact_person`, `email`, `phone`, `diameter`, `length`, `details`, `created_at` | Inward commercial tender inquiries submitted from public portal. |
| `job_applications` | `id`, `application_no`, `job_id`, `candidate_name`, `email`, `phone`, `experience_years`, `cover_letter`, `created_at` | Talent recruitment applications submitted online. |
| `corporate_news` | `id`, `title`, `category`, `date`, `read_time`, `excerpt`, `content` | Corporate press releases and project milestone notifications. |
| `leadership_team` | `id`, `name`, `role`, `department`, `bio`, `avatar_url` | Executive board and key management personnel. |

---

## 🔄 Integration & Data Flow Workflows

### Workflow A: Public Read Flow (Resilient Microservices-First)
```
[User Browser]
      │
      ▼
[Next.js Page (e.g. /projects or /)]
      │
      ├──> Calls Spring Boot API Gateway (http://localhost:8080/api/projects)
      │       ├── If Gateway UP: Returns microservice-processed JSON
      │       └── If Gateway Offline: Fallback to Next.js Internal DB Route (/api/projects)
      │                                   └── Queries PostgreSQL (GasPipeline:5433) directly
      ▼
[Rendered Responsive UI with Zero Downtime]
```

### Workflow B: Admin Live Mutation Flow
```
[Authorized Admin on /admin]
      │
      ▼ (Submits Form: e.g., Update HSE Hours, Add New Project, Edit Hotline)
[POST / PUT / DELETE to /api/admin/[module]]
      │
      ▼ (Verifies Server-Side HTTP-Only Cookie Session Version)
[PostgreSQL Database (GasPipeline:5433)]
      │ (Transaction Commits & Updates Database Record)
      ▼
[Instant Cache Revalidation]
      │
      ▼
[Public Pages Immediately Display Updated Data Across All Devices]
```

### Workflow C: Break-Glass Emergency Account Recovery Flow
```
[Compromised or Locked Admin Screen]
      │
      ▼ (Enters Master Recovery Key: CANDELA-REC-XXXX-...)
[POST /api/admin/auth action="recover"]
      │
      ▼ (Verifies Scrypt Hash of Master Key)
[PostgreSQL admin_auth Table]
      │
      ├── 1. Increments session_version = session_version + 1
      │      (Invalidates every other active browser token across the world)
      ├── 2. Re-hashes and updates admin password with new salt
      └── 3. Issues fresh HTTP-Only Cookie to Master Key holder
      ▼
[Master Key User Regains Full Control; Intruders are Instantly Kicked Out]
```

---

## ⚡ Port & Networking Directory

| Component | Port | Network Interface | Protocol |
|:---|:---:|:---|:---:|
| **Next.js Web Frontend & Admin Portal** | `3000` | `http://localhost:3000` | HTTP / REST |
| **Spring Boot API Gateway** | `8080` | `http://localhost:8080` | HTTP / REST |
| **Project Microservice** | `8081` | `http://localhost:8081` | HTTP / REST |
| **Tendering Microservice** | `8082` | `http://localhost:8082` | HTTP / REST |
| **Operations (SCADA) Microservice** | `8083` | `http://localhost:8083` | HTTP / REST |
| **HR & News Microservice** | `8084` | `http://localhost:8084` | HTTP / REST |
| **PostgreSQL Database (`GasPipeline`)** | `5433` | `localhost:5433` | TCP / PG Wire |

---

## 🚀 Step-by-Step Running Guide

### 1. Start the PostgreSQL Database
Ensure PostgreSQL is active on port `5433`:
```bash
# Verify connection
PGPASSWORD=9906 psql -h localhost -p 5433 -U postgres -d GasPipeline -c "\dt"
```

### 2. Start the Spring Boot Microservices Cluster
```bash
cd /Users/arjunyadav/Downloads/pipeline-construction-Microservices

# Build jars (if needed)
./mvnw clean package -DskipTests

# Start all 5 microservices in background
./start-all.sh

# Verify health status
curl http://localhost:8080/api/gateway/health
```

### 3. Start the Next.js Frontend
```bash
cd /Users/arjunyadav/Downloads/pipeline-construction-site

npm install
npm run dev
```

Visit the application at:
- **Public Portal**: [http://localhost:3000](http://localhost:3000)
- **Admin Console**: [http://localhost:3000/admin](http://localhost:3000/admin)

---

## 🔐 Administrative Credentials

| Credential | Value | Description |
|:---|:---|:---|
| **Default Password** | `CandelaAdmin#2026!` | Primary password for `/admin`. Can be updated in the portal. |
| **Master Recovery Key** | `CANDELA-REC-3F62-BCD5-7FC9-46A7` | Break-glass override key. Terminates all other sessions and restores access. |

---

## 🛠 Engineering Standards & Compliance
- **Pipeline Design**: ASME B31.8 (Gas Transmission & Distribution Systems)
- **Welding & NDT**: API 1104 / ASME Section IX
- **Quality & Safety**: ISO 9001:2015, ISO 14001:2015, ISO 45001:2018
- **Regulatory Framework**: PNGRB (Petroleum and Natural Gas Regulatory Board)
