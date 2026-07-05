import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";

function read(filePath) {
  return fs.readFileSync(new URL(`../${filePath}`, import.meta.url), "utf8");
}

test("site metadata uses the profile avatar for browser tab icons", () => {
  const source = read("src/app/layout.tsx");

  assert.match(source, /icon:\s*\[\s*\{\s*url:\s*"\/favicon\.ico"/);
  assert.match(source, /url:\s*"\/icon-32\.png"/);
  assert.match(source, /shortcut:\s*"\/favicon\.ico"/);
  assert.match(source, /apple:\s*"\/apple-touch-icon\.png"/);
});

test("avatar favicon assets are published", () => {
  for (const filePath of [
    "public/favicon.ico",
    "public/icon-32.png",
    "public/icon-192.png",
    "public/apple-touch-icon.png",
  ]) {
    assert.equal(fs.existsSync(new URL(`../${filePath}`, import.meta.url)), true, filePath);
  }
});
