# Repository Guidelines

## Project Structure & Module Organization

`package/` is the published React component library. Reusable primitives live in
`package/components/ui/`; shared helpers are in `package/lib/`, hooks in
`package/hooks/`, and library-wide CSS in `package/index.css`. Keep the public
barrel exports in `package/index.ts` aligned with added components.

`playground/` is the local Vite application used to demonstrate the library; it
must not contain publishable source. Build configuration is in `vite.config.ts`,
and `scripts/assert-package.mjs` checks the package layout and output contract.

## Build, Test, and Development Commands

- `bun install` installs the locked development dependencies.
- `bun run dev` (or `bun run site:dev`) starts the playground locally.
- `bun run build` typechecks the library and creates publishable files in `dist/`.
- `bun run site:build` typechecks and builds the playground.
- `bun run lint` runs ESLint across TypeScript and TSX files.
- `bun run typecheck` runs TypeScript without emitting files.
- `bun run test` validates the package structure and expected build artifacts;
  run `bun run build` first when `dist/` is absent or stale.

## Coding Style & Naming Conventions

Write TypeScript and React TSX with two-space indentation, double quotes, no
semicolons, trailing commas where valid, and an 80-character print width.
Prettier (including its Tailwind class sorter) is authoritative: run
`bun run format` before submitting formatted changes. Use kebab-case filenames
for UI modules (for example, `message-scroller.tsx`), PascalCase React component
names, and the `@/` alias for imports rooted at `package/`.

## Testing Guidelines

There is no component-test suite or coverage threshold currently. For every
change, run `bun run lint`, `bun run typecheck`, and the relevant build command.
When changing exports, publishing, or source layout, also run `bun run build`
followed by `bun run test`. Add focused tests alongside a new test framework if
behavior becomes complex enough to require regression coverage.

## Commit & Pull Request Guidelines

Use concise Conventional Commit-style subjects, as in `feat: build publishable
component library`; use `fix:`, `docs:`, or `chore:` when appropriate. Keep each
commit narrowly scoped. Pull requests should explain the user-visible change,
link the related issue when one exists, list verification commands, and include
playground screenshots for visual component changes.
