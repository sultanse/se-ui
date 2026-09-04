import assert from "node:assert/strict"
import { existsSync, readFileSync } from "node:fs"

const packageJson = JSON.parse(
  readFileSync(new URL("../package.json", import.meta.url))
)

assert.ok(
  existsSync(new URL("../package", import.meta.url)),
  "package source directory is missing"
)
assert.equal(
  existsSync(new URL("../src", import.meta.url)),
  false,
  "legacy src directory must not exist"
)
assert.ok(
  existsSync(new URL("../playground/App.tsx", import.meta.url)),
  "playground App entry is missing"
)
assert.ok(
  existsSync(new URL("../playground/main.tsx", import.meta.url)),
  "playground main entry is missing"
)
assert.ok(
  existsSync(new URL("../playground/index.html", import.meta.url)),
  "playground HTML entry is missing"
)
assert.equal(
  existsSync(new URL("../package/App.tsx", import.meta.url)),
  false,
  "App must not be part of the published package source"
)
assert.equal(
  existsSync(new URL("../package/main.tsx", import.meta.url)),
  false,
  "main must not be part of the published package source"
)
assert.equal(
  existsSync(new URL("../index.html", import.meta.url)),
  false,
  "the site HTML entry must live in playground"
)

assert.notEqual(packageJson.private, true, "the library must be publishable")
assert.deepEqual(
  packageJson.dependencies ?? {},
  {},
  "the published package must not install transitive dependencies"
)
assert.equal(
  packageJson.dependencies?.react,
  undefined,
  "React must not be bundled as a dependency"
)
assert.equal(
  packageJson.dependencies?.["react-dom"],
  undefined,
  "React DOM must not be bundled as a dependency"
)
assert.ok(packageJson.peerDependencies.react, "React must be a peer dependency")
assert.ok(
  packageJson.peerDependencies["react-dom"],
  "React DOM must be a peer dependency"
)
assert.equal(packageJson.exports["."], undefined, "package root must not be importable")
assert.equal(packageJson.exports["./index.css"], "./dist/style.css")
assert.equal(packageJson.exports["./index"], null, "internal index must not be importable")
assert.equal(
  packageJson.scripts["site:dev"],
  "vite --config playground/vite.config.ts",
  "site:dev must run the playground Vite config"
)
assert.equal(
  packageJson.scripts["site:build"],
  "tsc -p playground/tsconfig.json --noEmit && vite build --config playground/vite.config.ts",
  "site:build must typecheck and build the playground"
)
assert.equal(packageJson.exports["./*"].types, "./dist/components/ui/*.d.ts")
assert.equal(packageJson.exports["./*"].import, "./dist/entries/*.js")
assert.equal(packageJson.exports["./*"].require, "./dist/entries/*.cjs")
assert.ok(
  existsSync(new URL("../dist/entries/button.js", import.meta.url)),
  "Button ESM entry is missing"
)
assert.ok(
  existsSync(new URL("../dist/entries/button.cjs", import.meta.url)),
  "Button CommonJS entry is missing"
)
assert.ok(
  existsSync(new URL("../dist/style.css", import.meta.url)),
  "Stylesheet is missing"
)
