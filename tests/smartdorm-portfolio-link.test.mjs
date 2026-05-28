import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";

function read(filePath) {
  return fs.readFileSync(new URL(`../${filePath}`, import.meta.url), "utf8");
}

test("homepage smartdorm project points to the published static detail page", () => {
  const source = read("src/components/ai-bento.tsx");

  assert.match(
    source,
    /title:\s*"SmartDorm\.AI-基于AI赋能的宿舍运维管理系统demo"/,
  );
  assert.match(source, /status:\s*"点击打开详情页"/);
  assert.match(
    source,
    /detailHref:\s*"\/smartdorm-ai-portfolio\/index\.html"/,
  );
});

test("homepage smartdorm project uses the published preview image", () => {
  const source = read("src/components/ai-bento.tsx");

  assert.match(source, /src="\/images\/projects\/smartdorm-preview\.jpg"/);
  assert.equal(
    fs.existsSync(
      new URL("../public/images/projects/smartdorm-preview.jpg", import.meta.url),
    ),
    true,
  );
});

test("smartdorm static portfolio files are published under public", () => {
  assert.equal(
    fs.existsSync(
      new URL("../public/smartdorm-ai-portfolio/index.html", import.meta.url),
    ),
    true,
  );
  assert.equal(
    fs.existsSync(
      new URL("../public/smartdorm-ai-portfolio/demo.html", import.meta.url),
    ),
    true,
  );
});
