import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";

const bilibiliUrl =
  "https://www.bilibili.com/video/BV11XeFz2EXW/?share_source=copy_web&vd_source=a1d078e9508719259cc9e8c9a8c69072";

function read(filePath) {
  return fs.readFileSync(new URL(`../${filePath}`, import.meta.url), "utf8");
}

test("homepage miniapp card links to bilibili instead of local demo video", () => {
  const source = read("src/components/ai-bento.tsx");

  assert.match(source, new RegExp(bilibiliUrl.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
  assert.doesNotMatch(source, /\/images\/miniapp\/demo\.mp4/);
});

test("xiaohong ai static page no longer embeds the local demo video", () => {
  const source = read("public/xiaohong-ai/xiaohong-ai.html");

  assert.match(source, new RegExp(bilibiliUrl.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
  assert.doesNotMatch(source, /\/images\/miniapp\/demo\.mp4/);
  assert.doesNotMatch(source, /id="defenseVideo"/);
});

test("cleanup removes the local demo assets and internal workflow templates", () => {
  assert.equal(fs.existsSync(new URL("../public/images/miniapp/demo.mp4", import.meta.url)), false);
  assert.equal(fs.existsSync(new URL("../src/data/小程序页面照片/小程序演示视频.mp4", import.meta.url)), false);
  assert.equal(fs.existsSync(new URL("../public/xiaohong-ai/.spec-workflow", import.meta.url)), false);
});
