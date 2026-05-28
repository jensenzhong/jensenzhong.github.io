import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";

function read(filePath) {
  return fs.readFileSync(new URL(`../${filePath}`, import.meta.url), "utf8");
}

test("BIM management card uses a hover background image and a real detail link", () => {
  const source = read("src/components/portfolio.tsx");
  const bimStart = source.indexOf('name: "BIM');
  const bimEnd = source.indexOf("  {", bimStart + 1);
  const bimBlock = source.slice(bimStart, bimEnd);

  assert.notEqual(bimStart, -1);
  assert.match(bimBlock, /imageBackground:\s*\{/);
  assert.match(bimBlock, /src:\s*"\/images\/management\/bim-hover\.png"/);
  assert.doesNotMatch(bimBlock, /href:\s*"#"/);
});

test("BentoCard renders optional image backgrounds behind floating content", () => {
  const source = read("src/components/ui/bento-grid.tsx");

  assert.match(source, /imageBackground/);
  assert.match(source, /group-hover:opacity-100/);
  assert.match(source, /pointer-events-none absolute inset-0/);
});

test("BIM hover background asset is published", () => {
  assert.equal(
    fs.existsSync(
      new URL("../public/images/management/bim-hover.png", import.meta.url),
    ),
    true,
  );
});
