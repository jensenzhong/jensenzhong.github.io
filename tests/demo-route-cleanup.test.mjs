import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";

test("standalone lanyard demo route is removed while flowing menu demo remains", () => {
  assert.equal(
    fs.existsSync(new URL("../src/app/lanyard-demo/page.tsx", import.meta.url)),
    false,
  );
  assert.equal(
    fs.existsSync(new URL("../src/app/flowing-menu-demo/page.tsx", import.meta.url)),
    true,
  );
});
