import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";

function read(filePath) {
  return fs.readFileSync(new URL(`../${filePath}`, import.meta.url), "utf8");
}

test("reading award float animation uses scoped gsap media cleanup and reduced motion", () => {
  const source = read("src/components/reading.tsx");

  assert.match(source, /gsap\.matchMedia\(\)/);
  assert.match(source, /prefers-reduced-motion: reduce/);
  assert.match(source, /reduceMotion/);
  assert.match(source, /gsap\.set\(".award-float-inner", \{ y: 0 \}\)/);
  assert.match(source, /mm\?\.revert\(\)/);
  assert.match(source, /ctx\.revert\(\)/);
  assert.match(source, /tweensRef\.current = \[\]/);
});
