<div align="center">

# සැළලිහිණි සංදේශය · The Starling's Message

An interactive, Neon Blue 3D reading experience for **Salalihini Sandeshaya**, the fifteenth-century Sinhala messenger poem by Thotagamuwe Sri Rahula—built by **Poorna Thalisha** for students and the community.

[![Code License: MIT](https://img.shields.io/badge/Code-MIT-00e5ff.svg)](./LICENSE)
[![Content License: CC BY-SA 4.0](https://img.shields.io/badge/Content-CC%20BY--SA%204.0-38bdf8.svg)](./LICENSE-CONTENT.md)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-00e5ff.svg)](./CONTRIBUTING.md)
[![Code of Conduct](https://img.shields.io/badge/Contributor%20Covenant-2.1-0284c7.svg)](./CODE_OF_CONDUCT.md)

[Read Verse 1](/) · [3D Route Map](/map) · [20 Sections](/journey) · [About the Poem](/about) · [Developer](/developer)

</div>

## Why this exists

*Salalihini Sandeshaya* (c. 1450) is one of the best-loved works of Sinhala literature, yet its compressed Elu vocabulary can feel intimidating without a clear companion guide. This project pairs all **111 verses** with plain modern Sinhala and plain English explanations inside a calm, procedural 3D world that follows the starling from Kotte to Kelaniya.

## Features

- **All 111 Verses in Elu Sinhala**: Sourced from Sinhala Wikibooks / e-Pothgula, paired with modern Sinhala and English learner explanations.
- **Neon Blue 3D Sky & Valley**: Procedural low-poly landmarks, water ripples, and a faceted starling that glides across the viewport without external model or texture files.
- **Interactive 3D Route Map (`/map`)**: Height-field terrain from Jayawardhanapura Kotte to Kelaniya with 11 landmarks, a 1–111 verse scrubber, and three camera modes (*Overview*, *Follow*, *Free*).
- **Honest "General sense" Badges**: Dense verses with layered classical puns are openly marked.
- **Zero-Error GitHub & Vercel Setup**: Pre-configured with `.npmrc` (`legacy-peer-deps=true`) and clean Next.js App Router static generation.

## Quick start

Requires **Node.js >= 20.9.0** (Node 22 recommended; see `.nvmrc`). Google Fonts are fetched on the first build.

| Command | Description |
| --- | --- |
| `npm install` | Install dependencies (uses `.npmrc` `legacy-peer-deps=true`) |
| `npm run dev` | Start local development server with Turbopack |
| `npm run build` | Build static and dynamic routes for production / Vercel |
| `npm run start` | Run the production server |
| `npm run lint` | Run ESLint across `src/` |
| `npm run typecheck` | Run `next typegen && tsc --noEmit` |

## How it is built

- **Framework**: Next.js (App Router, TypeScript), React 19, Tailwind CSS 4
- **3D & Motion**: `three`, `@react-three/fiber`, `@react-three/postprocessing`, `motion`
- **Content structure**:
  - `src/data/poem.json` — Original Elu Sinhala lines for verses 1–111
  - `src/data/meanings-1.ts` .. `meanings-4.ts` — Plain Sinhala (`si`), English (`en`), and optional `note`
  - `src/data/sections.ts` — The 20 traditional sections and their theme/silhouette mappings
  - `src/data/developer.ts` — Developer profile (`Poorna Thalisha`, `https://github.com/Poorna-bot`)

## Contributing

You do not have to write code to help! Reviewing a single verse explanation in Sinhala or English is one of the highest-value contributions you can make. See [CONTRIBUTING.md](./CONTRIBUTING.md) and [docs/content-style-guide.md](./docs/content-style-guide.md).

## Ideas for the future

- Review of dense verses by scholars of classical Elu Sinhala
- A **human** recitation recording of the 111 verses (synthetic text-to-speech voices were tested and were not good enough for the *samudraghosa* metre of Elu verse)
- Word-by-word traditional *sannaya* glosses
- Companion sites for the other classic *sandesa* poems (*Mayura*, *Tisara*, *Gira*, *Hansa*, *Kokila*)
- Offline PWA support and automated visual regression tests

## Credits and licences

Code is licensed under the [MIT License](./LICENSE) (`Copyright (c) 2026 Poorna Thalisha and Salalihini Sandeshaya contributors`). Poem text and explanations are licensed under [CC BY-SA 4.0](./LICENSE-CONTENT.md). See [CREDITS.md](./CREDITS.md) for full source attributions.
