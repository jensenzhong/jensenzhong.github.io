import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";

function read(filePath) {
  return fs.readFileSync(new URL(`../${filePath}`, import.meta.url), "utf8");
}

test("experience section uses the four volunteer and practice stories", () => {
  const source = read("src/components/personal-sections.tsx");

  assert.match(source, /"use client"/);
  assert.match(source, /AnimatePresence/);
  assert.match(source, /motion\./);
  assert.match(source, /activeExperience/);
  assert.match(source, /aria-label="上一段经历"/);
  assert.match(source, /aria-label="下一段经历"/);
  assert.match(source, /scale-\[0\.92\]/);
  assert.match(source, /max-w-6xl/);
  assert.match(source, /gap-20/);
  assert.match(source, /text-xl font-normal/);
  assert.doesNotMatch(source, /activeExperience\.highlights/);

  for (const title of [
    "十五运会志愿者",
    "古浪古韵风华队",
    "小红船实践队",
    "岭南兴潮突击队",
  ]) {
    assert.match(source, new RegExp(title));
  }

  for (const imagePath of [
    "/images/experiences/national-games-volunteer.webp",
    "/images/experiences/gulang-team.webp",
    "/images/experiences/xiaohong-practice.webp",
    "/images/experiences/lingnan-commando.webp",
  ]) {
    assert.match(source, new RegExp(imagePath.replaceAll("/", "\\/")));
  }

  assert.match(source, /广州大学优秀志愿者/);
  assert.match(source, /让红色种子播撒在他们的心中/);
  assert.match(source, /一轴两翼三激活/);
  assert.match(source, /学院优秀社会实践调研团队/);
});

test("experience section is presented as volunteer service with award-style heading typography", () => {
  const sectionSource = read("src/components/personal-sections.tsx");
  const navSource = read("src/components/navbar.tsx");

  assert.match(navSource, /label: "志愿服务"/);
  assert.doesNotMatch(navSource, /label: "个人经历"/);
  assert.match(sectionSource, /Volunteer Service/);
  assert.match(sectionSource, />\s*志愿服务\s*</);
  assert.match(
    sectionSource,
    /className="font-serif text-5xl tracking-tight text-\[#1d1a18\] md:text-7xl"/,
  );
  assert.doesNotMatch(sectionSource, /我个人经历/);
});

test("experience photos are stored inside the project public directory", () => {
  for (const imagePath of [
    "public/images/experiences/national-games-volunteer.webp",
    "public/images/experiences/gulang-team.webp",
    "public/images/experiences/xiaohong-practice.webp",
    "public/images/experiences/lingnan-commando.webp",
  ]) {
    assert.equal(fs.existsSync(new URL(`../${imagePath}`, import.meta.url)), true);
  }
});
