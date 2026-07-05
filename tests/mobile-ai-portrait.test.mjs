import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";

function read(filePath) {
  return fs.readFileSync(new URL(`../${filePath}`, import.meta.url), "utf8");
}

test("AI grid has a portrait fallback that renders content without waiting for viewport animation", () => {
  const source = read("src/components/ai-bento.tsx");

  assert.match(source, /useIsPortraitViewport/);
  assert.match(source, /isPortraitViewport\s*\?\s*\{[\s\S]*initial:\s*false[\s\S]*animate:\s*"visible"/);
  assert.match(source, /whileInView:\s*"visible"/);
  assert.match(source, /viewport:\s*\{\s*once:\s*true,\s*margin:\s*"-80px"\s*\}/);
});

test("AI entry animation keeps card shells visible before client viewport motion runs", () => {
  const source = read("src/components/ai-bento.tsx");
  const variantsStart = source.indexOf("const containerVariants");
  const variantsEnd = source.indexOf("function useCountUp", variantsStart);
  const variantsBlock = source.slice(variantsStart, variantsEnd);

  assert.match(variantsBlock, /hidden:\s*\{\s*opacity:\s*1,\s*y:\s*12\s*\}/);
  assert.doesNotMatch(variantsBlock, /hidden:\s*\{\s*opacity:\s*0/);
});

test("AI phone preview uses tighter portrait dimensions and fan offsets", () => {
  const source = read("src/components/ai-bento.tsx");

  assert.match(source, /h-\[330px\]\s+w-\[174px\]/);
  assert.match(source, /min-\[390px\]:h-\[360px\]\s+min-\[390px\]:w-\[190px\]/);
  assert.match(source, /min-h-\[390px\]/);
  assert.match(source, /min-\[390px\]:min-h-\[440px\]/);
  assert.match(source, /const compactExpandedFan = \[[\s\S]*x:\s*-78[\s\S]*x:\s*78/);
});

test("hero card has portrait-only shrink classes without changing desktop sizing", () => {
  const source = read("src/components/hero.tsx");

  assert.match(source, /max-md:portrait:scale-\[0\.82\]/);
  assert.match(source, /max-md:portrait:w-\[min\(360px,calc\(100vw-2\.5rem\)\)\]/);
  assert.match(source, /max-md:portrait:text-\[clamp\(32px,10vw,44px\)\]/);
  assert.match(source, /md:w-\[450px\]/);
});

test("hero display name uses one smaller size and no cursor without changing card width", () => {
  const source = read("src/components/hero.tsx");

  assert.doesNotMatch(source, /isEnglishDisplayName/);
  assert.doesNotMatch(source, /animate-pulse bg-\[#ff9f43\]/);
  assert.match(source, /text-\[clamp\(40px,12vw,60px\)\] max-md:portrait:text-\[clamp\(32px,10vw,44px\)\] md:text-\[60px\]/);
  assert.match(source, /className="w-\[min\(100%,360px\)\] h-1\.5 bg-slate-900/);
  assert.match(source, /md:w-\[450px\]/);
});

test("AI showcase adds portrait-only scale-down classes for narrow phones", () => {
  const source = read("src/components/ai-bento.tsx");

  assert.match(source, /max-md:portrait:h-\[300px\]\s+max-md:portrait:w-\[158px\]/);
  assert.match(source, /max-md:portrait:min-h-\[350px\]/);
});

test("lanyard badge does not emit invalid SVG circle cx or cy values", () => {
  const source = read("src/components/lanyard-badge.tsx");

  assert.doesNotMatch(source, /style=\{\{\s*cx:\s*ropePath,\s*cy:\s*ropePath\s*\}\}/);
  assert.doesNotMatch(source, /\bTrendingUp\b/);
});
