# Copilot Instructions for equippdlife

## Project Overview

This is a Next.js app for the "Equippd" website, focused on devotional content. The codebase uses the Next.js App Router and TypeScript. Content is managed via MDX files in `src/content/posts/` and rendered through custom components.

## Key Architecture & Patterns

- **App Router Structure:** Pages and layouts are organized under `src/app/`, with nested routes for features like devotions (`src/app/devotions/`).
- **MDX Content:** Devotional posts are written in MDX and loaded from `src/content/posts/`. Use utilities in `src/lib/posts.ts` to fetch and parse posts.
- **Component Usage:** Shared UI components (e.g., `Button.tsx`, `Header.tsx`) live in `src/components/`. Sidebar and layout components for devotions are in `src/app/devotions/`.
- **Dynamic Routing:** Slug-based dynamic routes for individual devotionals are handled in `src/app/devotions/[slug]/page.tsx`.

## Developer Workflows

- **Start Dev Server:**
  ```bash
  npm run dev
  # or: yarn dev, pnpm dev, bun dev
  ```
- **Edit Content:**
  - Add new devotionals as `.mdx` files in `src/content/posts/`.
  - Update sidebar or layouts in `src/app/devotions/`.
- **TypeScript:**
  - All code is TypeScript. Follow strict typing conventions.
- **Styling:**
  - Global styles in `src/app/globals.css`. Use CSS modules or global CSS as needed.

## Conventions & Patterns

- **File Naming:**
  - Use lowercase for folders, PascalCase for components.
- **MDX Integration:**
  - Posts are imported and rendered using utilities in `src/lib/posts.ts`.
- **Layout Composition:**
  - Use Next.js layout files (`layout.tsx`) for shared UI across routes.
- **Sidebar Navigation:**
  - Devotions sidebar is managed in `DevotionsSidebar.tsx`.

## External Integrations

- **Fonts:** Uses `next/font` for optimized font loading (Geist).
- **Deployment:** Deploy via Vercel. See Next.js deployment docs for details.

## Examples

- To add a new devotional:
  1. Create a new `.mdx` file in `src/content/posts/`.
  2. Ensure it is discoverable via utilities in `src/lib/posts.ts`.
  3. Sidebar will auto-update if coded to read all posts.
- To customize layout for devotions:
  - Edit `src/app/devotions/layout.tsx` and related sidebar/component files.

## References

- Main entry: `src/app/page.tsx`
- Devotions: `src/app/devotions/`
- Content: `src/content/posts/`
- Utilities: `src/lib/posts.ts`
- Components: `src/components/`

---

For questions or unclear conventions, review `README.md` or ask for clarification.
