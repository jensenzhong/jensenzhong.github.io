import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";

function read(filePath) {
  return fs.readFileSync(new URL(`../${filePath}`, import.meta.url), "utf8");
}

test("management section uses the interactive 3D lanyard profile badge", () => {
  const source = `${read("src/components/portfolio.tsx")}\n${read("src/components/lanyard-3d/lanyard.tsx")}`;

  assert.match(source, /@\/components\/lanyard-3d\/lanyard/);
  assert.match(
    source,
    /<Lanyard position=\{\[0, 0, 24\]\} gravity=\{\[0, -40, 0\]\} fov=\{20\}/,
  );
  assert.match(source, /badgeCardTextureUrl = "\/assets\/badge-card\.png"/);
  assert.match(source, /cardModelUrl = "\/assets\/lanyard\/card\.glb"/);
  assert.match(source, /lanyardTextureUrl = "\/assets\/lanyard\/lanyard\.png"/);
  assert.doesNotMatch(source, /@\/components\/lanyard-badge/);
  assert.doesNotMatch(source, /<LanyardBadge/);
});

test("management lanyard keeps the orange theme and fixed hook-to-rope relationship", () => {
  const source = read("src/components/lanyard-3d/lanyard.tsx");

  assert.match(source, /const hookTopAnchor: Vector3Tuple = \[0, 2\.04, 0\]/);
  assert.match(source, /useSphericalJoint\(j3 as BodyRef, card as BodyRef/);
  assert.match(source, /hookTopAnchor/);
  assert.match(source, /const themeOrange = "#ff9f43"/);
  assert.match(source, /const themeOrangeDark = "#c96a10"/);
  assert.match(source, /color=\{themeOrange\}/);
  assert.match(source, /color=\{themeOrangeDark\}/);
});

test("management lanyard is draggable, has a dynamic rope, and is portrait optimized", () => {
  const source = read("src/components/lanyard-3d/lanyard.tsx");
  const styles = read("src/components/lanyard-3d/lanyard.module.css");

  assert.match(source, /"use client"/);
  assert.match(source, /setNextKinematicTranslation/);
  assert.match(source, /onPointerDown/);
  assert.match(source, /useRopeJoint/);
  assert.match(source, /MeshLineMaterial/);
  assert.match(source, /lineWidth=\{isMobile \? 0\.56 : 1\}/);
  assert.match(source, /cameraPosition = isMobile \? \[0, 0, 21\]/);
  assert.match(source, /cameraFov = isMobile \? 19 : fov/);
  assert.match(styles, /height: 520px/);
  assert.doesNotMatch(source, /tool-marquee/);
  assert.doesNotMatch(source, /Tool Stack/);
});

test("management bento grid uses the four requested engineering module names", () => {
  const source = read("src/components/portfolio.tsx");

  for (const text of ["BIM技术应用", "房地产投资分析", "工程造价", "工程测量"]) {
    assert.match(source, new RegExp(`name:\\s*"${text}"`));
  }

  for (const oldText of [
    "Product Roadmap",
    "System Analysis",
    "Risk Management",
    "Agile Transformation",
  ]) {
    assert.doesNotMatch(source, new RegExp(oldText));
  }
});

test("profile avatar asset is published for the lanyard badge", () => {
  assert.equal(
    fs.existsSync(
      new URL("../public/images/profile/zhong-zhengshen-avatar.webp", import.meta.url),
    ),
    true,
  );
});
