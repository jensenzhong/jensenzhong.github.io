import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";

function read(filePath) {
  return fs.readFileSync(new URL(`../${filePath}`, import.meta.url), "utf8");
}

test("eco risk portfolio hero uses the roadmap image instead of the Word2Vec semantic SVG", () => {
  const html = read("public/eco-risk-portfolio/portfolio.html");

  assert.match(html, /<img src="\/images\/projects\/eco-risk-roadmap-preview\.jpg" alt="重大工程生态风险技术路线图">/);
  assert.doesNotMatch(html, /fig6_risk_semantic_space_nature\.svg" alt="风险语义空间"/);
});
