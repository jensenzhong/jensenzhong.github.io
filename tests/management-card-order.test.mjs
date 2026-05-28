import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";

function read(filePath) {
  return fs.readFileSync(new URL(`../${filePath}`, import.meta.url), "utf8");
}

test("management bento cards show investment analysis before BIM", () => {
  const source = read("src/components/portfolio.tsx");

  const investmentIndex = source.indexOf('name: "房地产投资分析"');
  const bimIndex = source.indexOf('name: "BIM技术应用"');

  assert.notEqual(investmentIndex, -1);
  assert.notEqual(bimIndex, -1);
  assert.ok(investmentIndex < bimIndex);
});

test("management bento cards keep staggered desktop spans", () => {
  const source = read("src/components/portfolio.tsx");
  const featuresBlock = source.slice(
    source.indexOf("const features = ["),
    source.indexOf("const toolGroups = ["),
  );

  const spans = [...featuresBlock.matchAll(/className: "([^"]+)"/g)].map(
    (match) => match[1],
  );

  assert.deepEqual(spans, [
    "col-span-3 lg:col-span-1",
    "col-span-3 lg:col-span-2",
    "col-span-3 lg:col-span-2",
    "col-span-3 lg:col-span-1",
  ]);
});
