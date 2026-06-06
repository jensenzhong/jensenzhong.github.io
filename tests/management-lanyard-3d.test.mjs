import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";

function read(filePath) {
  return fs.readFileSync(new URL(`../${filePath}`, import.meta.url), "utf8");
}

test("management section renders the interactive 3D lanyard badge", () => {
  const source = read("src/components/portfolio.tsx");

  assert.match(source, /@\/components\/lanyard-3d\/lanyard/);
  assert.match(source, /<Lanyard\b/);
  assert.doesNotMatch(source, /@\/components\/lanyard-badge/);
  assert.doesNotMatch(source, /<LanyardBadge\s*\/>/);
});

test("3D lanyard badge uses the custom badge-card texture", () => {
  const source = read("src/components/lanyard-3d/lanyard.tsx");

  assert.match(source, /badgeCardTextureUrl/);
  assert.match(source, /\/assets\/badge-card\.png/);
  assert.match(source, /RoundedRectMesh/);
  assert.match(source, /meshBasicMaterial/);
  assert.match(source, /useRopeJoint/);
  assert.match(source, /useSphericalJoint/);
  assert.match(source, /setNextKinematicTranslation/);
  assert.match(source, /scale=\{2\.925\}/);
  assert.match(source, /const themeOrange = "#ff9f43"/);
  assert.match(source, /color=\{themeOrange\}/);
  assert.match(source, /useMap/);
  assert.match(source, /map=\{texture\}/);
  assert.match(source, /\/assets\/lanyard\/lanyard\.png/);
  assert.match(source, /position=\{\[1, 0, 0\]\}/);
  assert.match(source, /0\.5/);
});

test("custom lanyard badge textures are published", () => {
  assert.equal(
    fs.existsSync(new URL("../public/assets/badge-card.png", import.meta.url)),
    true,
  );
  assert.equal(
    fs.existsSync(new URL("../public/assets/badge-card.svg", import.meta.url)),
    true,
  );
  assert.equal(
    fs.existsSync(new URL("../public/assets/profile.jpg", import.meta.url)),
    true,
  );
});

test("custom lanyard badge SVG follows the orange theme", () => {
  const source = read("public/assets/badge-card.svg");

  assert.match(source, /#ff9f43/);
  assert.match(source, /#f97316/);
  assert.match(source, /#c96a10/);
  assert.doesNotMatch(source, /#0717b8/);
  assert.doesNotMatch(source, /#1459d9/);
});
