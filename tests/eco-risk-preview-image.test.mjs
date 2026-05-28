import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";

function read(filePath) {
  return fs.readFileSync(new URL(`../${filePath}`, import.meta.url), "utf8");
}

test("homepage eco risk project uses the roadmap preview image", () => {
  const source = read("src/components/ai-bento.tsx");

  assert.match(source, /src="\/images\/projects\/eco-risk-roadmap-preview\.jpg"/);
  assert.match(source, /alt="重大工程生态风险技术路线图预览"/);
});

test("eco risk roadmap preview image is published with project images", () => {
  assert.equal(
    fs.existsSync(new URL("../public/images/projects/eco-risk-roadmap-preview.jpg", import.meta.url)),
    true,
  );
});
