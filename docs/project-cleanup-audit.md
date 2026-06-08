# Project Cleanup Audit

Date: 2026-06-08

## Cleanup Policy

This cleanup used a conservative policy: remove local build output, logs, caches, screenshots, and duplicate demo dependencies while preserving published portfolio pages and any source files that may still contain useful content.

## Preserved Published Content

These `public` directories are treated as published portfolio detail pages and were not deleted:

- `public/federated-learning-portfolio`
- `public/literature-fire-portfolio`
- `public/intrinsic-fire-protection`
- `public/smartdorm-ai-portfolio`
- `public/construction-safety-rag`
- `public/eco-risk-portfolio`
- `public/images/projects`

## Cleaned Local Artifacts

The following local-only artifacts were removed or reduced:

- Next/build outputs: `.next`, `out`, `output`
- Playwright records: `.playwright-cli`, `.playwright-mcp`
- Root logs and screenshots: `*.log`, `full-page.png`, `ai-section-*.png`, `ai-hover-effect.png`, `reference-badge.png`
- TypeScript cache: `tsconfig.tsbuildinfo`
- Lanyard demo duplicate dependencies and builds: `lanyard-react-demo/**/node_modules`, `lanyard-react-demo/**/dist`, `lanyard-react-demo-archive-*/**/node_modules`, `lanyard-react-demo-archive-*/**/dist`
- Demo logs and screenshots in `lanyard-react-demo*` and `welkin-badge-demo`

## Conservatively Preserved

These items remain because they may still be useful or need product confirmation:

- `public/assets/lanyard/lanyard-orange.png`: untracked lanyard asset, not deleted until the final card asset choice is confirmed.
- `lanyard-react-demo`, `lanyard-react-demo-archive-20260529-005900`, `welkin-badge-demo`: source/demo shells kept, with generated dependencies and images removed.
- `.worktrees/mobile-portrait`: active Git worktree registered by `git worktree list`, so it was not removed.
- `public/intrinsic-fire-protection/poster.pdf`: large published asset, retained as part of the static portfolio.

## Suspected Unused Source Candidates

These files are not currently reached from the main homepage import graph or are only used by demo routes. They should be reviewed before deletion:

- `src/components/federated-learning.tsx`
- `src/components/lanyard-badge.tsx`
- `src/components/ui/dock.tsx`
- `src/components/ui/dynamic-halo.tsx`
- `src/data/works.ts`
- `src/components/music.tsx`
- `src/components/movies.tsx`

`music.tsx` and `movies.tsx` require special care because sitemap and scroll-glow copy still mention those sections while the homepage no longer mounts them.

## Asset Review Candidates

- `public/images/life` contains both `.jpg` and `.webp` variants. The current homepage primarily uses the first eight `.webp` files.
- Several large static portfolio assets may be candidates for compression or external hosting, especially `public/intrinsic-fire-protection/poster.pdf`.
- Static public assets should not be deleted solely because TypeScript source does not import them; many are referenced inside standalone HTML pages.
