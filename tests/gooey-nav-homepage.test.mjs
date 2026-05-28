import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";

function read(filePath) {
  return fs.readFileSync(new URL(`../${filePath}`, import.meta.url), "utf8");
}

test("navbar exposes the five requested liquid glass destinations", () => {
  const source = read("src/components/navbar.tsx");

  for (const label of ["AI能力", "工程专业", "荣誉奖项", "志愿服务", "生活碎片"]) {
    assert.match(source, new RegExp(label));
  }
  assert.doesNotMatch(source, /个人经历/);
  assert.doesNotMatch(source, /我的生活/);
  assert.doesNotMatch(source, /兴趣爱好/);

  for (const href of ["#ai", "#management", "#awards", "#experience", "#hobbies"]) {
    assert.match(source, new RegExp(`href:\\s*"${href}"`));
  }

  assert.match(source, /LiquidGlassNav/);
  assert.match(source, /layoutId="liquid-nav-pill"/);
  assert.match(source, /bg-slate-900\/12/);
  assert.match(source, /bg-\[#ff9f43\]\/45/);
  assert.match(source, /text-\[#ff9f43\]/);
  assert.match(source, /scale-105/);
  assert.doesNotMatch(source, /@\/components\/ui\/dock/);
  assert.doesNotMatch(source, /GooeyNav/);
  assert.doesNotMatch(source, /gooey-nav-filter/);
  assert.doesNotMatch(source, /feGaussianBlur/);
});

test("navbar keeps an orange palette with center and side contrast", () => {
  const navbar = read("src/components/navbar.tsx");
  const languageToggle = read("src/components/language-provider.tsx");

  assert.match(navbar, /text-\[#c96a10\]/);
  assert.match(navbar, /text-\[#ff9f43\]/);
  assert.match(navbar, /text-\[#f2a85b\]/);
  assert.match(navbar, /hover:text-\[#c96a10\]/);
  assert.doesNotMatch(navbar, /text-slate-800/);
  assert.doesNotMatch(navbar, /text-slate-400/);

  assert.match(languageToggle, /bg-\[#ff9f43\]/);
  assert.match(languageToggle, /text-\[#f2a85b\]/);
  assert.match(languageToggle, /hover:text-\[#c96a10\]/);
});

test("homepage removes music and movies and renders experience and life sections", () => {
  const page = read("src/app/page.tsx");
  const reading = read("src/components/reading.tsx");

  assert.doesNotMatch(page, /@\/components\/music/);
  assert.doesNotMatch(page, /@\/components\/movies/);
  assert.doesNotMatch(page, /<Music\s*\/>/);
  assert.doesNotMatch(page, /<Movies\s*\/>/);

  assert.match(reading, /id="awards"/);
  assert.match(page, /<Experience\s*\/>/);
  assert.match(page, /<Hobbies\s*\/>/);
});

test("development server is fixed to 127.0.0.1", () => {
  const packageJson = JSON.parse(read("package.json"));

  assert.equal(packageJson.scripts.dev, "next dev -H 127.0.0.1");
});
