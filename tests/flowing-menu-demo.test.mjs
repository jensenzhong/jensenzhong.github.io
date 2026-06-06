import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";

function read(filePath) {
  return fs.readFileSync(new URL(`../${filePath}`, import.meta.url), "utf8");
}

test("flowing menu component is a reusable client component with gsap marquee controls", () => {
  const source = read("src/components/flowing-menu/flowing-menu.tsx");
  const styles = read("src/components/flowing-menu/flowing-menu.module.css");

  assert.match(source, /"use client"/);
  assert.match(source, /import \{ gsap \} from "gsap"/);
  assert.match(source, /type FlowingMenuItem/);
  assert.match(source, /speed = 15/);
  assert.match(source, /textColor = "#fff"/);
  assert.match(source, /marqueeBgColor = "#fff"/);
  assert.match(source, /findClosestEdge/);
  assert.match(source, /repeat: -1/);
  assert.match(source, /aria-hidden="true"/);
  assert.match(source, /Array\.from\(\{ length: repetitions \}/);

  assert.match(styles, /\.menuWrap/);
  assert.match(styles, /\.menuItem/);
  assert.match(styles, /\.marquee/);
  assert.match(styles, /transform: translate3d\(0, 101%, 0\)/);
  assert.match(styles, /font-family: Georgia/);
  assert.match(styles, /border-radius: 32px/);
  assert.match(styles, /@media \(max-width: 720px\)/);
});

test("flowing menu demo page mirrors the React Bits example structure", () => {
  const page = read("src/app/flowing-menu-demo/page.tsx");

  assert.match(page, /FlowingMenu/);
  assert.match(page, /Mojave/);
  assert.match(page, /Sonoma/);
  assert.match(page, /Monterey/);
  assert.match(page, /Sequoia/);
  assert.match(page, /height: "100vh"/);
  assert.match(page, /borderRadius: "32px"/);
  assert.match(page, /speed=\{15\}/);
  assert.match(page, /marqueeBgColor="#ffffff"/);
  assert.doesNotMatch(page, /Flowing Menu/);
});
