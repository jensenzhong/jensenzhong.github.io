import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";

function read(filePath) {
  return fs.readFileSync(new URL(`../${filePath}`, import.meta.url), "utf8");
}

test("life section uses draggable photo cards over the quote", () => {
  const source = read("src/components/personal-sections.tsx");

  assert.match(source, /DraggableCardBody/);
  assert.match(source, /DraggableCardContainer/);
  assert.match(source, /Life & Moments/);
  assert.match(source, /生活碎片/);
  assert.match(source, /爱弹吉他/);
  assert.match(source, /爱踢足球/);
  assert.match(source, /测量实习/);
  assert.match(source, /大一排球赛/);
  assert.match(source, /哈尔滨路演/);
  assert.match(source, /十五运会/);
  assert.match(source, /玩玩脑机/);
  assert.match(source, /Tomorrow is another day/);
  assert.match(source, /Gone with the Wind/);
  assert.match(source, /Margaret Mitchell/);
  assert.match(source, /lifePhotos/);
  assert.match(source, /\/images\/life\/life-01\.webp/);
  assert.match(source, /\/images\/life\/life-08\.webp/);
  assert.match(source, /text-neutral-300/);
  assert.match(source, /overflow-clip/);
  assert.match(source, /left-\[20%\] top-14/);
  assert.match(source, /left-\[42%\] top-8/);
  assert.match(source, /lg:w-72/);
  assert.match(source, /lg:h-80/);
  assert.match(source, /w-44/);
  assert.match(source, /h-52/);
  assert.doesNotMatch(source, /逛逛江门/);
  assert.doesNotMatch(source, /\/images\/life\/life-05\.(jpg|webp)/);
  assert.doesNotMatch(source, /兴趣爱好/);
  assert.doesNotMatch(source, /const hobbies =/);
});

test("draggable card component supports toss-out physics", () => {
  const source = read("src/components/ui/draggable-card.tsx");

  assert.match(source, /"use client"/);
  assert.match(source, /useVelocity/);
  assert.match(source, /dragMomentum/);
  assert.match(source, /dragElastic/);
  assert.match(source, /window\.innerWidth \* 1\.15/);
  assert.match(source, /window\.innerHeight \* 1\.15/);
  assert.match(source, /flyAway/);
  assert.match(source, /onTap/);
  assert.match(source, /hasFlownAway/);
  assert.match(source, /stiffness: 38/);
  assert.match(source, /damping: 18/);
  assert.match(source, /whileTap/);
  assert.match(source, /pointer-events-none absolute inset-0 bg-white/);
});

test("life photos are copied and optimized in the public directory", () => {
  for (let index = 1; index <= 13; index += 1) {
    if (index === 5) continue;

    const name = String(index).padStart(2, "0");
    assert.equal(
      fs.existsSync(new URL(`../public/images/life/life-${name}.webp`, import.meta.url)),
      true,
    );
  }

  assert.equal(
    fs.existsSync(new URL("../public/images/life/life-05.jpg", import.meta.url)),
    false,
  );
  assert.equal(
    fs.existsSync(new URL("../public/images/life/life-05.webp", import.meta.url)),
    false,
  );
});
