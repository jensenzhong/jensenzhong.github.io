import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";

function read(filePath) {
  return fs.readFileSync(new URL(`../${filePath}`, import.meta.url), "utf8");
}

test("intrinsic fire protection landing page keeps both local demo videos", () => {
  const source = read("public/intrinsic-fire-protection/index.html");

  assert.match(source, /src="layer1-risk-video\.mp4"/);
  assert.match(source, /src="layer2-complete-video\.mp4"/);
  assert.equal(
    fs.existsSync(new URL("../public/intrinsic-fire-protection/layer1-risk-video.mp4", import.meta.url)),
    true,
  );
  assert.equal(
    fs.existsSync(new URL("../public/intrinsic-fire-protection/layer2-complete-video.mp4", import.meta.url)),
    true,
  );
});

test("intrinsic fire protection poster uses a published image instead of pdf", () => {
  const source = read("public/intrinsic-fire-protection/index.html");

  assert.match(source, /data-lightbox-type="image"/);
  assert.match(source, /data-lightbox-src="images\/course-poster\.png"/);
  assert.match(source, /<img src="images\/course-poster\.png"/);
  assert.doesNotMatch(source, /poster\.pdf/);
  assert.equal(
    fs.existsSync(new URL("../public/intrinsic-fire-protection/images/course-poster.png", import.meta.url)),
    true,
  );
});
