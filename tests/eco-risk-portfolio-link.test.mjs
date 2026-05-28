import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";

function read(filePath) {
  return fs.readFileSync(new URL(`../${filePath}`, import.meta.url), "utf8");
}

test("homepage eco risk project points to the published static detail page", () => {
  const source = read("src/components/ai-bento.tsx");

  assert.match(source, /title:\s*"重大工程生态风险识别与预测算法"/);
  assert.match(source, /status:\s*"点击打开详情页"/);
  assert.match(source, /detailHref:\s*"\/eco-risk-portfolio\/portfolio\.html"/);
});

test("eco risk static portfolio files are published under public", () => {
  assert.equal(
    fs.existsSync(new URL("../public/eco-risk-portfolio/portfolio.html", import.meta.url)),
    true,
  );
  assert.equal(
    fs.existsSync(
      new URL(
        "../public/eco-risk-portfolio/关键词_bertopic/nature_redraw/fig6_risk_semantic_space_nature.svg",
        import.meta.url,
      ),
    ),
    true,
  );
  assert.equal(
    fs.existsSync(
      new URL(
        "../public/eco-risk-portfolio/关键词_bertopic/enhanced_figures/fig6_semantic_expansion_network.svg",
        import.meta.url,
      ),
    ),
    true,
  );
});
