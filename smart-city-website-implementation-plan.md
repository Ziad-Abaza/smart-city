---
noteId: "fdcb03107cae11f18fb3a5d196575577"
tags: []

---

# Smart City 2026 — Official Website
## Architecture & Implementation Plan

---

## 1. Repository Analysis Summary

This plan is grounded entirely in what exists in the repository. No feature, achievement, or technology below is invented.

### 1.1 What the repository actually contains

**Documentation (`Data/*.md`)** — these are thesis chapters and are the authoritative source for all written content:
| File | Chapter | Module |
|---|---|---|
| `Data/smart-car.md` | Ch.4 — Hybrid Autonomous Navigation and Contextual Decision-Making | Smart Car |
| `Data/smart-home.md` | Ch.4 — Smart Home Subsystem Architecture | Smart Home |
| `Data/Indoor-Localization.md` | Ch.5 — Wi-Fi RSSI-Based Indoor Localization System | Indoor Localization |
| `Data/chatbot.md` | Ch.6 — BATU AI Assistant (Production-Grade RAG System) | AI Assistant / Chatbot |
| `Data/charging-area.md` | Ch.7 — AI-Driven Autonomous Charging Station System | Charging Area |
| `Data/parking.md` | Ch.9 — Computer Vision-Based Smart Parking System | Parking |
| `Data/design.md` | Ch.9 (physical) — Physical Maquette Engineering & Architectural Aesthetics | Physical Model / Digital Twin |
| `Data/web-platform.md` | Ch.11 — Centralized Smart City Web Platform & Command Control Dashboard | Web Platform / Control Center |
| `Data/team.xlsx` | Team roster (spreadsheet — needs parsing at build time) | Team page |

**Source code (`Code/*.xml` → unpacked modules)**:
- **Smart Car** — Raspberry Pi 5, behavioral-cloning deep learning navigation, ArUco marker detection, autonomous mission system (`autonomous_navigation/`, `ArUco/`, `training/`, `launcher/`), own `README.md`, `ARCHITECTURE.md` docs (`ARUCO_MISSION_SYSTEM_ARCHITECTURE.md`, `LAUNCHER_IMPLEMENTATION_PLAN.md`, `USER_GUIDE.md`, `ORGANIZATION.md`).
- **Smart Home** — Voice assistant + face recognition (`voice_assistant/`, `face_recognition/`, `core/`, `ui/`), own `README.md` plus module-level READMEs (`core/README.md`, `data/README.md`, `face_recognition/README.md`, `scripts/README.md`, `voice_assistant/README.md`, `Arduino/README.md`, `config/README.md`), architecture blueprints (`Smart_Voice_Assistant_Architecture_Blueprint.md`, `Persistent_Memory_Extension_Blueprint.md`, `Real_World_Tools_Extension_Blueprint.md`, `ui/docs/UI_ARCHITECTURE.md`).
- **Indoor Localization** — Wi-Fi RSSI fingerprinting, ESP32 firmware (`esp/`), Flask server (`app.py`, `server.py`, `map.py`), web templates (`templates/index.html`, `templates/map.html`).
- **Parking** — YOLO/OpenCV occupancy detection (`Main.py`, `Model.py`, `Slot.py`, `Stream.py`, `Drawer.py`), own `README.md`.
- **Charging Area** — YOLO classification model training runs (`runs/classify/train*`), own `README.md` ("charging-area-using-yolo").
- **Chatbot (BATU AI Assistant)** — Full production RAG system: TypeScript/Node backend (`src/rag/`, `src/services/`, `src/routes/`), Docker deployment (`Dockerfile`, `docker-compose.yml`), admin panel (`public/admin.html`), docs (`ARCHITECTURE.md`, `BATU_RAG_REDESIGN.md`, `SECURITY.md`), own `README.md`.

**3D assets (`3D/`)**:
- `3D/charging-area/charging-area.gltf` (+ `data.bin`, `polished beech.jpg` texture)
- `3D/smart-home/smart-home.gltf` (+ `data.bin`, `polished oak.jpg` texture)
- `3D/3D_Projects_Viewer.html` — an existing standalone Arabic-language 3D viewer page (RTL), useful as a functional reference for how the two glTF models should be loaded/displayed.

**Images (`images/`)**: `charging-area.jpg`, `charging-area-2.png`, `chatbot.png`, `indoor-localization.png`, `parking.jpg`, `simulator.jpg`, `smart-car.png`, `smart-home.jpg`, `smart-home-face-reg.png`, `smart-home-voice-assistant-listining.jpeg`, `smart-home-voice-assistant-speking.jpeg`, `smart-city-poster.jpg`, `map.json` (geodata, not an image), plus team-member portraits (`dr.El-Gohary.jpg`, `dr.osama(1/2/3).jpg`, `eng.fayoumi(1/2).png`).

**No module exists in the repo for**: live camera feeds, live sensor telemetry, real database, authentication, or a CMS. These are explicitly out of scope for this frontend-only phase and will be represented with **clearly labeled placeholder/demo data**, per the brief.

### 1.2 Naming convention used going forward
The six technical modules are referred to consistently as: **Smart Car**, **Smart Home**, **Indoor Localization**, **Parking**, **Charging Area**, **AI Assistant (Chatbot)** — plus two cross-cutting subsystems: **Physical Maquette / Digital Twin** (`design.md`) and **Web Platform / Control Center** (`web-platform.md`), which describes the very site being built here.

---

## 2. Technology Decision

### Chosen stack: **Next.js 14 (App Router) + TypeScript + Tailwind CSS + MDX + Framer Motion + React Three Fiber**

**Why Next.js over the alternatives:**

| Requirement | Why Next.js wins |
|---|---|
| SEO-friendly | App Router gives file-based static generation (SSG) + metadata API out of the box — critical since this is a public showcase/portfolio site that must rank and preview well when shared. |
| Documentation portal + README explorer | MDX support is first-class in Next.js (`@next/mdx` / `next-mdx-remote`), letting every repo `README.md` and `Data/*.md` chapter render with syntax highlighting, TOCs, and anchors without a separate docs engine. |
| Scalable, component-based | App Router's route groups (`(marketing)`, `(docs)`, `(control-center)`) map naturally onto the site's very distinct sections (marketing pages vs. dense docs vs. dashboard UI) while sharing one design system. |
| Backend-ready later | API routes / Route Handlers (`app/api/**`) can absorb a real backend later (auth, live telemetry, GitHub sync, CMS) with zero change to page components — they already fetch from a `lib/api/*` abstraction seeded with mock data. |
| 3D viewer | React Three Fiber + `@react-three/drei` is the standard React-idiomatic way to load `.gltf` files (both `charging-area.gltf` and `smart-home.gltf` load directly with `useGLTF`), and integrates cleanly with Next's client components. |
| Dark mode | `next-themes` + Tailwind's `dark:` variant gives a persisted, flash-free, OS-aware dark mode — necessary for a "native, not inverted" feel. |
| Motion | Framer Motion is the de facto standard for the Apple/Linear/Vercel-style subtle motion language requested. |
| Team data | `Data/team.xlsx` is parsed once at build time (`xlsx`/`SheetJS` in a small Node script) into a static JSON consumed by the Team page — no runtime dependency. |

Rejected: Astro (weaker for the highly interactive Control Center dashboard), plain Vite/React (would need to hand-roll routing, SSG, and metadata), Nuxt/Vue (repository and target audience — recruiters/professors used to modern JS ecosystems — favor React), Express-serving-SPA (loses SSG/SEO benefits for no gain since backend comes later anyway).

### Supporting libraries
- `tailwindcss`, `@tailwindcss/typography` (for rendered Markdown/MDX)
- `framer-motion` (motion/animation)
- `next-themes` (dark mode)
- `lucide-react` (icon system)
- `@react-three/fiber`, `@react-three/drei`, `three` (3D viewer)
- `next-mdx-remote` or `contentlayer2` (docs/README rendering) — plan uses `next-mdx-remote` for simplicity/independence between tasks
- `rehype-pretty-code` or `shiki` (code syntax highlighting + copy buttons)
- `xlsx` (build-time parse of `Data/team.xlsx`)
- `recharts` (Control Center demo charts/statistics)
- `zustand` (light global state: theme extras, command palette, mock live-data ticking)

---

## 3. Site Architecture

```
app/
  (marketing)/
    page.tsx                     → Home
    about/page.tsx                → About
    gallery/page.tsx              → Project Gallery
    team/page.tsx                 → Team
    research/page.tsx             → Research
  modules/
    page.tsx                      → Modules index (grid of 6 cards)
    [slug]/page.tsx                → Module detail (data-driven, one route for all 6)
  docs/
    layout.tsx                     → Docs shell (left nav + search + TOC)
    page.tsx                       → Docs landing
    [...slug]/page.tsx             → Renders any README / chapter as MDX
  repo-explorer/
    page.tsx                       → Frontend-only GitHub-style file tree
  viewer-3d/
    page.tsx                       → 3D model viewer (charging-area / smart-home)
  control-center/
    layout.tsx                     → Control Center shell (sidebar + topbar)
    page.tsx                       → System overview
    [module]/page.tsx              → Per-module live-style panel (mock data)
  api/
    modules/route.ts               → Serves modules.json (future: DB)
    telemetry/route.ts              → Serves mock telemetry (future: live socket/API)
    repo-tree/route.ts              → Serves repo-structure.json (future: GitHub API)
  layout.tsx                        → Root layout (theme, fonts, nav, footer)
  globals.css

components/
  layout/            (Navbar, Footer, Sidebar, CommandPalette)
  ui/                (Button, Card, Badge, Tabs, Tooltip, GlassPanel, StatCard — shadcn-style primitives)
  home/              (Hero, StatsStrip, FeaturedModules, LatestAchievements)
  modules/           (ModuleCard, ModuleHero, TechBadgeList, ModuleTabs)
  docs/              (DocsSidebar, DocsSearch, TableOfContents, CodeBlock, MarkdownRenderer)
  repo-explorer/     (FileTree, FileIcon, LanguageBadge, RepoStatsBar)
  viewer-3d/         (ModelCanvas, ModelSwitcher, PlaceholderModel)
  control-center/    (StatusGrid, ModuleStatusCard, AlertFeed, MapPlaceholder, CameraFeedPlaceholder, MetricChart)
  gallery/           (GalleryGrid, Lightbox, PlaceholderBadge)
  shared/            (SectionHeading, PlaceholderNotice, AnimatedCounter, FadeInView)

content/
  docs/              (MDX copies of every README.md discovered in the repo, organized by module)
  chapters/          (MDX copies of Data/*.md, one per module + design + web-platform)

data/
  modules.ts         (typed registry: id, name, summary(from chapters), stack, images, docs links, 3D flag)
  team.json          (generated at build time from Data/team.xlsx)
  repo-tree.json     (static snapshot of the repository directory structure)
  mock/
    telemetry.ts       (Control Center mock metrics/status generators)
    gallery.ts         (image manifest incl. placeholder flags)

lib/
  api/               (fetch wrappers — swap-ready for real backend: getModules(), getTelemetry(), getRepoTree())
  markdown/          (MDX/remark/rehype pipeline config, shared by docs + chapters)
  theme/             (next-themes config, CSS variable tokens)
  utils/             (cn(), slugify(), date formatting, etc.)

public/
  models/            (charging-area.gltf + smart-home.gltf + bin + textures, copied from 3D/)
  images/            (copied from images/, plus /placeholders/* clearly marked demo assets)
```

### Design tokens (dark-native)
- Base surfaces use true near-black (`#0A0B0E`) rather than inverted white, with layered elevation via subtle 1–2% lightness steps and soft borders (`rgba(255,255,255,.06)`), consistent with the Vercel/Linear look.
- Accent: a single confident gradient accent (cyan→indigo) used sparingly for CTAs, active states, and Control Center status.
- Typography: one geometric sans (e.g., Geist/Inter) for UI, one monospace (e.g., Geist Mono/JetBrains Mono) for code and telemetry numbers.
- Motion: 150–250ms ease-out for hovers, staggered fade/slide-up on scroll reveals, no gratuitous parallax.

### Data flow / future backend integration points
Every dynamic section reads through `lib/api/*`, which currently returns static/mock data but has the exact shape a future REST/GraphQL API would return (`getModules()`, `getTelemetry(moduleId)`, `getRepoTree()`, `getGalleryImages()`, `getTeam()`). Swapping mock implementations for real `fetch()` calls later requires touching only `lib/api/*`, never the components.

---

## 4. Placeholder Policy (applied site-wide)
Every placeholder is visually marked with a small `PlaceholderNotice`/`PlaceholderBadge` component (dashed border + "Demo Data" or "Placeholder" tag) so it can never be mistaken for real telemetry or content. Applies to: live camera feeds, live map, live vehicle/parking/charging/localization status, commit history, GitHub stats, and any image explicitly missing from the repo.

---

## 5. Task Breakdown (≈4 hours, sequential, independent, low merge-conflict)

Each task is scoped to its own files/folders to minimize overlap. Tasks are ordered so later tasks depend only on earlier, already-completed scaffolding (never on files another parallel task is simultaneously editing).

---

### Task 01 — Project Scaffold & Design System Foundation
- **Goal:** Initialize the Next.js 14 + TypeScript + Tailwind project with dark-mode theming, fonts, global layout shell, and base UI primitives.
- **Estimated time:** 35 min
- **Files to create:** `package.json`, `tsconfig.json`, `tailwind.config.ts`, `postcss.config.js`, `app/layout.tsx`, `app/globals.css`, `lib/theme/*`, `lib/utils/cn.ts`, `components/ui/Button.tsx`, `components/ui/Card.tsx`, `components/ui/Badge.tsx`, `components/ui/GlassPanel.tsx`, `components/shared/PlaceholderNotice.tsx`, `components/layout/Navbar.tsx`, `components/layout/Footer.tsx`
- **Files to modify:** none (greenfield)
- **Dependencies:** none
- **Deliverables:** Running `next dev` shows an empty themed shell with working navbar/footer and dark/light toggle.
- **Acceptance criteria:** Dark mode persists across reload, no FOUC; Tailwind tokens (colors, spacing, radii) defined in config; base primitives are typed and reusable; lint/build passes.

---

### Task 02 — Content Data Layer (Modules Registry, Team Parser, Repo Tree, Gallery Manifest)
- **Goal:** Build the typed static data layer that every page consumes, sourced strictly from the repository content identified in Section 1.
- **Estimated time:** 40 min
- **Files to create:** `data/modules.ts`, `data/repo-tree.json`, `data/mock/gallery.ts`, `scripts/parse-team-xlsx.ts`, `data/team.json` (generated output), `lib/api/modules.ts`, `lib/api/team.ts`, `lib/api/gallery.ts`, `lib/api/repo-tree.ts`
- **Files to modify:** `package.json` (add a `prebuild`/`parse-team` script)
- **Dependencies:** Task 01 (uses `lib/utils`); requires `Data/team.xlsx`, `Data/*.md`, image list, and directory structure from the repository (already extracted in Section 1).
- **Deliverables:** `data/modules.ts` contains all 6 modules + 2 subsystems, each with: id, title, one-paragraph summary (paraphrased from the corresponding `Data/*.md` chapter — never copied verbatim), tech stack tags, associated images, associated doc paths, associated source paths, has3DModel flag. `data/team.json` generated from the xlsx. `data/repo-tree.json` mirrors the real directory structure from Section 1.1.
- **Acceptance criteria:** All data is traceable to a real repository file (no fabricated content); xlsx parser runs without error and produces valid JSON; `lib/api/*` functions are the only place components should import data from.

---

### Task 03 — Home Page
- **Goal:** Build the interactive Home page (hero, mission/vision snippet, stats strip, featured modules, latest achievements).
- **Estimated time:** 30 min
- **Files to create:** `app/(marketing)/page.tsx`, `components/home/Hero.tsx`, `components/home/StatsStrip.tsx`, `components/home/FeaturedModules.tsx`, `components/home/LatestAchievements.tsx`, `components/shared/AnimatedCounter.tsx`, `components/shared/FadeInView.tsx`
- **Files to modify:** none
- **Dependencies:** Task 01 (design system), Task 02 (`lib/api/modules.ts` for featured modules)
- **Deliverables:** A cinematic, Apple/Linear-style landing page pulling real module names/summaries from the data layer.
- **Acceptance criteria:** Scroll-reveal animations run once, respect `prefers-reduced-motion`; all copy is sourced from Section 1 data (no invented statistics — stats strip uses counts derivable from the repo, e.g. "6 modules", "2 3D models", "8 documentation chapters"); responsive at 375px–1920px.

---

### Task 04 — About, Research, Team, Gallery Pages
- **Goal:** Build the four remaining marketing/informational pages.
- **Estimated time:** 35 min
- **Files to create:** `app/(marketing)/about/page.tsx`, `app/(marketing)/research/page.tsx`, `app/(marketing)/team/page.tsx`, `app/(marketing)/gallery/page.tsx`, `components/gallery/GalleryGrid.tsx`, `components/gallery/Lightbox.tsx`, `components/gallery/PlaceholderBadge.tsx`
- **Files to modify:** none
- **Dependencies:** Task 01, Task 02 (`lib/api/team.ts`, `lib/api/gallery.ts`)
- **Deliverables:** About page synthesizes the project's objectives/architecture from `Data/web-platform.md` and `Data/design.md`; Research page reflects the thesis-chapter structure (Ch.4–Ch.11) as the research/methodology narrative; Team page renders parsed `team.json` (with placeholder avatar fallback where a portrait file isn't confidently mapped); Gallery renders every real image from `images/` with any genuinely missing shot marked as a placeholder.
- **Acceptance criteria:** No fabricated achievements/awards; every claim traces to a `Data/*.md` chapter; gallery lightbox is keyboard-accessible; team cards handle missing photos gracefully.

---

### Task 05 — Modules Section (Index + Dynamic Detail Page)
- **Goal:** Build the modules index grid and the single dynamic `[slug]` detail template used by all 6 modules.
- **Estimated time:** 40 min
- **Files to create:** `app/modules/page.tsx`, `app/modules/[slug]/page.tsx`, `components/modules/ModuleCard.tsx`, `components/modules/ModuleHero.tsx`, `components/modules/TechBadgeList.tsx`, `components/modules/ModuleTabs.tsx` (Overview / Features / Architecture / Technologies / Media / Docs / Source)
- **Files to modify:** none
- **Dependencies:** Task 01, Task 02
- **Deliverables:** Visiting `/modules/smart-car`, `/modules/smart-home`, `/modules/indoor-localization`, `/modules/parking`, `/modules/charging-area`, `/modules/ai-assistant` each renders correctly from `data/modules.ts`, including a "View 3D Model" CTA on Smart Home and Charging Area (the two with real glTF assets) and "View Documentation" / "View Source Structure" CTAs linking into the Docs portal and Repo Explorer.
- **Acceptance criteria:** `generateStaticParams` pre-renders all module slugs; each tab shows real content or an explicit "documentation not yet available" placeholder — never invented text; page is fully responsive and dark-mode correct.

---

### Task 06 — Documentation Portal & README Explorer
- **Goal:** Build the MDX-powered docs shell (left nav, search-ready, TOC, code highlighting, copy buttons) and ingest every real README/chapter as content.
- **Estimated time:** 45 min
- **Files to create:** `app/docs/layout.tsx`, `app/docs/page.tsx`, `app/docs/[...slug]/page.tsx`, `components/docs/DocsSidebar.tsx`, `components/docs/DocsSearch.tsx`, `components/docs/TableOfContents.tsx`, `components/docs/CodeBlock.tsx`, `components/docs/MarkdownRenderer.tsx`, `lib/markdown/mdx-config.ts`, `content/docs/*` (MDX copies of every module README identified in Section 1.1), `content/chapters/*` (MDX copies of all `Data/*.md`)
- **Files to modify:** none
- **Dependencies:** Task 01; content sourced directly from repository files (Section 1.1)
- **Deliverables:** A Docusaurus/Stripe-Docs-style portal where the left nav is grouped by module ("Smart Car", "Smart Home", "Indoor Localization", "Parking", "Charging Area", "AI Assistant", "Web Platform", "Physical Maquette"), each showing its real README(s) and thesis chapter with working TOC, anchor links, and copy-to-clipboard code blocks.
- **Acceptance criteria:** Every README discovered in Section 1.1 is represented; code fences render with syntax highlighting + copy button; search input is present and wired to a client-side filter over doc titles/headings (full-text search can be a `// TODO: backend search` stub); no content deviates from source files.

---

### Task 07 — Repository Explorer & 3D Model Viewer
- **Goal:** Build the frontend-only GitHub-style file tree explorer and the glTF 3D viewer for the two real models.
- **Estimated time:** 35 min
- **Files to create:** `app/repo-explorer/page.tsx`, `components/repo-explorer/FileTree.tsx`, `components/repo-explorer/FileIcon.tsx`, `components/repo-explorer/LanguageBadge.tsx`, `components/repo-explorer/RepoStatsBar.tsx`, `app/viewer-3d/page.tsx`, `components/viewer-3d/ModelCanvas.tsx`, `components/viewer-3d/ModelSwitcher.tsx`, `public/models/` (copy `3D/charging-area/*` and `3D/smart-home/*` here)
- **Files to modify:** none
- **Dependencies:** Task 01, Task 02 (`data/repo-tree.json`)
- **Deliverables:** Repo Explorer renders the real directory structure with language badges (Python, TypeScript, C++/Arduino, Markdown, etc.) and a stats bar with counts computed from `repo-tree.json`; commit history area is a clearly labeled placeholder. 3D Viewer loads `charging-area.gltf` and `smart-home.gltf` via `useGLTF`/`<Canvas>` with orbit controls, referencing the existing `3D/3D_Projects_Viewer.html` as behavioral reference (camera framing, lighting) but rebuilt as a proper React component.
- **Acceptance criteria:** File tree matches the real structure from Section 1.1 (no invented files); language badges are derived from real file extensions; both glTF models load without console errors and are interactively orbit/zoomable; a graceful fallback/placeholder mesh shows if a model fails to load.

---

### Task 08 — Control Center (Mock-Data Dashboard)
- **Goal:** Build the futuristic Control Center monitoring interface with per-module status panels, all backed by clearly-labeled mock/demo data.
- **Estimated time:** 40 min
- **Files to create:** `app/control-center/layout.tsx`, `app/control-center/page.tsx`, `app/control-center/[module]/page.tsx`, `components/control-center/StatusGrid.tsx`, `components/control-center/ModuleStatusCard.tsx`, `components/control-center/AlertFeed.tsx`, `components/control-center/MapPlaceholder.tsx`, `components/control-center/CameraFeedPlaceholder.tsx`, `components/control-center/MetricChart.tsx`, `data/mock/telemetry.ts`, `lib/api/telemetry.ts`
- **Files to modify:** none
- **Dependencies:** Task 01, Task 02 (module registry for the 6 module panels)
- **Deliverables:** `/control-center` overview shows system-wide status tiles (Smart Car, Smart Home, Indoor Localization, Parking, Charging Area, AI Assistant) with mock live-updating numbers (simulated tick via `setInterval`/Zustand store), an alerts feed, and a map/camera placeholder panel per module (e.g., parking occupancy chart, charging station status, localization position-on-map placeholder, smart home sensor states, smart car mission telemetry, AI assistant query volume).
- **Acceptance criteria:** Every non-derivable metric is visibly tagged "Demo Data"/"Simulated"; `lib/api/telemetry.ts` is the single seam a future WebSocket/REST integration would replace; charts render responsively; no real credentials or endpoints are referenced.

---

### Task 09 — Cross-Linking, SEO Metadata, and Final Polish Pass
- **Goal:** Wire cross-links between Modules ↔ Docs ↔ Repo Explorer ↔ Control Center ↔ 3D Viewer, add per-route SEO metadata, and do a final responsive/animation/accessibility pass.
- **Estimated time:** 30 min
- **Files to create:** `app/sitemap.ts`, `app/robots.ts`
- **Files to modify:** `app/layout.tsx` (root metadata/OpenGraph), each `app/**/page.tsx` created in Tasks 03–08 (add `generateMetadata`/`export const metadata`), `components/layout/Navbar.tsx` (final nav links), `components/modules/ModuleTabs.tsx` (wire real cross-links to docs slugs and repo-explorer paths)
- **Dependencies:** Tasks 01–08 (all routes must exist first)
- **Deliverables:** Every page has a title/description/OG image; navbar links to all sections; module detail pages deep-link correctly into docs and repo-explorer; sitemap/robots present for SEO.
- **Acceptance criteria:** `next build` succeeds with no type errors; Lighthouse SEO ≥ 95 on Home; all internal links resolve (no 404s); dark mode and reduced-motion verified across every route; final visual QA against the Apple/Linear/Stripe reference bar from the brief.

---

## 6. Explicit Non-Goals for This Phase (Deferred to Backend Integration)
- Real authentication/authorization (Control Center will later gate write-actions behind it).
- Live camera/telemetry/WebSocket feeds (currently mocked in `lib/api/telemetry.ts`).
- Real GitHub API sync for the Repo Explorer's commit history (currently a static snapshot).
- CMS-backed content editing (Docs/Chapters currently ship as MDX files in `content/`).
- Full-text/documentation search backend (client-side filter stub only).

Each of these has a named, isolated seam (`lib/api/*`) specifically so the next engineering phase can implement them without touching page or component code.
