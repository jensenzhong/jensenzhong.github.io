import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";

function read(filePath) {
  return fs.readFileSync(new URL(`../${filePath}`, import.meta.url), "utf8");
}

test("management section uses a compact lanyard profile badge", () => {
  const source = `${read("src/components/portfolio.tsx")}\n${read("src/components/lanyard-badge.tsx")}`;

  for (const text of [
    "lanyard-card",
    "/images/profile/zhong-zhengshen-avatar.jpg",
    "钟政燊",
    "中共党员",
    "GPA 3.88/4.00",
    "排名 1/112",
    "工程管理专业",
    "元宇宙智能决策与人机器交互微专业",
    "Python",
    "SQL",
    "HTML",
    "Coze",
    "N8N",
    "Dify",
    "Revit",
    "AutoCAD",
    "广联达",
    "Cursor",
    "即时设计",
    "Lovart",
  ]) {
    assert.match(source, new RegExp(text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
  }

  assert.match(source, /<LanyardBadge/);
  assert.doesNotMatch(source, /工程结构（99）/);
  assert.doesNotMatch(source, /数据库技术与Python程序设计（98）/);
});

test("management lanyard uses a restrained gray-white card without a duplicated section title", () => {
  const source = `${read("src/components/portfolio.tsx")}\n${read("src/components/lanyard-badge.tsx")}`;

  assert.match(source, /bg-\[rgb\(225,225,225\)\]/);
  assert.match(source, /lanyard-ring/);
  assert.doesNotMatch(source, /Metallic sheen/i);
  assert.doesNotMatch(source, /via-\[#cbd5e1\]/);
  assert.doesNotMatch(source, />工程专业信息</);
});

test("management lanyard is draggable, has a dynamic rope, and removes the tool carousel", () => {
  const source = read("src/components/lanyard-badge.tsx");

  assert.match(source, /"use client"/);
  assert.match(source, /drag/);
  assert.match(source, /motion\.path/);
  assert.match(source, /h-28 w-28/);
  assert.match(source, /bg-\[rgb\(225,225,225\)\]/);
  assert.match(source, /endY = 86 \+ dy/);
  assert.match(source, /top-\[84px\]/);
  assert.match(source, /top-\[-18px\]/);
  assert.match(source, /z-10 w-full/);
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
      new URL("../public/images/profile/zhong-zhengshen-avatar.jpg", import.meta.url),
    ),
    true,
  );
});
