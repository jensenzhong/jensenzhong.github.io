import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";

function read(filePath) {
  return fs.readFileSync(new URL(`../${filePath}`, import.meta.url), "utf8");
}

test("business elite award card uses the finance forecast summary and certificate link", () => {
  const source = read("src/components/reading.tsx");

  assert.match(
    source,
    /基于瑞贝卡公司开展系统性财务分析与商业策略研究，从资产质量、盈利能力与运营效率等维度构建分析框架，并结合行业趋势提出优化商业模式、拓展国内市场及供应链升级等策略，最终完成三年财务预测与可执行落地方案设计。我主要负责财务预测部分/,
  );
  assert.match(
    source,
    /href:\s*"\/images\/awards\/business-elite-accounting-national-second-prize-2024\.jpg"/,
  );
});

test("business elite award certificate asset is published", () => {
  assert.equal(
    fs.existsSync(
      new URL(
        "../public/images/awards/business-elite-accounting-national-second-prize-2024.jpg",
        import.meta.url,
      ),
    ),
    true,
  );
});
