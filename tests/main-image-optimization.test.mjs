import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";

function read(filePath) {
  return fs.readFileSync(new URL(`../${filePath}`, import.meta.url), "utf8");
}

function sizeKb(filePath) {
  return fs.statSync(new URL(`../${filePath}`, import.meta.url)).size / 1024;
}

test("homepage components use optimized webp images for heavy visual assets", () => {
  const personalSections = read("src/components/personal-sections.tsx");
  const portfolio = read("src/components/portfolio.tsx");
  const hero = read("src/components/hero.tsx");
  const aiBento = read("src/components/ai-bento.tsx");
  const lanyard = read("src/components/lanyard-badge.tsx");

  for (const imagePath of [
    "/images/experiences/national-games-volunteer.webp",
    "/images/experiences/gulang-team.webp",
    "/images/experiences/xiaohong-practice.webp",
    "/images/experiences/lingnan-commando.webp",
  ]) {
    assert.match(personalSections, new RegExp(imagePath.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
  }

  for (const imagePath of [
    "/images/management/real-estate.webp",
    "/images/management/bim-hover.webp",
    "/images/management/cost.webp",
    "/images/management/survey.webp",
  ]) {
    assert.match(portfolio, new RegExp(imagePath.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
  }

  assert.match(hero, /\/images\/social_photo\.webp/);
  assert.match(aiBento, /\/images\/social_photo\.webp/);
  assert.match(lanyard, /\/images\/profile\/zhong-zhengshen-avatar\.webp/);
});

test("optimized homepage image files exist and stay below mobile-friendly size limits", () => {
  const limits = new Map([
    ["public/images/experiences/national-games-volunteer.webp", 500],
    ["public/images/experiences/gulang-team.webp", 300],
    ["public/images/experiences/xiaohong-practice.webp", 350],
    ["public/images/experiences/lingnan-commando.webp", 350],
    ["public/images/management/real-estate.webp", 300],
    ["public/images/management/bim-hover.webp", 450],
    ["public/images/management/cost.webp", 500],
    ["public/images/management/survey.webp", 500],
    ["public/images/profile/zhong-zhengshen-avatar.webp", 160],
    ["public/images/social_photo.webp", 180],
  ]);

  for (const [filePath, limitKb] of limits) {
    assert.equal(fs.existsSync(new URL(`../${filePath}`, import.meta.url)), true, filePath);
    assert.ok(sizeKb(filePath) <= limitKb, `${filePath} is ${Math.round(sizeKb(filePath))}KB`);
  }
});

test("unused life jpg originals are compressed so the static export is not dominated by raw photos", () => {
  for (let index = 1; index <= 18; index += 1) {
    if (index === 5) continue;

    const filePath = `public/images/life/life-${String(index).padStart(2, "0")}.jpg`;
    assert.ok(sizeKb(filePath) <= 800, `${filePath} is ${Math.round(sizeKb(filePath))}KB`);
  }
});
