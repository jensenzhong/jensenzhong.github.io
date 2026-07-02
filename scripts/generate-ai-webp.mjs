import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";
import { pathToFileURL } from "node:url";

const root = process.cwd();

// AI & Project Lab 区块用到的图片清单(源文件为 png/jpg)
// 每项: key(资源键) -> 源图相对路径
const sources = [
  // 小程序截图(5张,扇形动画)
  { key: "miniappConnection", src: "public/images/miniapp/connection.png" },
  { key: "miniappAssessmentEntry", src: "public/images/miniapp/assessment-entry.png" },
  { key: "miniappHome", src: "public/images/miniapp/home.png" },
  { key: "miniappTeacher", src: "public/images/miniapp/teacher.png" },
  { key: "miniappPioneer", src: "public/images/miniapp/pioneer.png" },
  // 项目预览图(6张)
  { key: "projectFederated", src: "public/images/projects/federated-learning-preview.png" },
  { key: "projectFire", src: "public/images/projects/fire-protection-preview.png" },
  { key: "projectDorm", src: "public/images/projects/smartdorm-preview.jpg" },
  { key: "projectRisk", src: "public/images/projects/construction-safety-rag-preview.webp" },
  { key: "projectLiterature", src: "public/images/projects/literature-analysis-preview.png" },
  { key: "projectEco", src: "public/images/projects/eco-risk-roadmap-preview.jpg" },
];

// 项目预览图最大宽度(小程序截图本身尺寸小,按原图缩放即可)
const PROJECT_MAX_WIDTH = 1280;
const MINIAPP_MAX_WIDTH = 480;

function getMaxWidth(src) {
  return src.includes("/miniapp/") ? MINIAPP_MAX_WIDTH : PROJECT_MAX_WIDTH;
}

async function fileExists(p) {
  try {
    await fs.access(p);
    return true;
  } catch {
    return false;
  }
}

async function processOne(item) {
  const absSrc = path.join(root, item.src);
  if (!(await fileExists(absSrc))) {
    console.warn(`[跳过] 源文件不存在: ${item.src}`);
    return null;
  }

  // 目标 webp 路径(同目录,扩展名换 .webp)
  const parsed = path.parse(item.src);
  const webpRel = `${path.dirname(item.src)}/${parsed.name}.webp`;
  const absWebp = path.join(root, webpRel);

  const maxWidth = getMaxWidth(item.src);

  // 源图已是 webp 时,避免输入输出同名;否则生成 webp(质量82,有损)
  if (parsed.ext.toLowerCase() !== ".webp") {
    await sharp(absSrc, { limitInputPixels: false })
      .resize({ width: maxWidth, height: maxWidth, fit: "inside", withoutEnlargement: true })
      .webp({ quality: 82 })
      .toFile(absWebp);
  }

  const beforeStat = await fs.stat(absSrc);
  const afterStat = await fs.stat(absWebp);

  // 2. 生成 20px 模糊缩略图 base64 (blur placeholder)
  const blurBuffer = await sharp(absWebp)
    .resize({ width: 20 })
    .webp({ quality: 30 })
    .toBuffer();
  const blurDataURL = `data:image/webp;base64,${blurBuffer.toString("base64")}`;

  return {
    key: item.key,
    src: webpRel.replace(/^public/, ""),
    blurDataURL,
    before: beforeStat.size,
    after: afterStat.size,
  };
}

async function main() {
  const results = [];
  for (const item of sources) {
    const r = await processOne(item);
    if (r) results.push(r);
  }

  // 输出 TS 模块 src/data/ai-image-assets.ts
  const lines = [
    "// 自动生成,请勿手动编辑 (npm run gen:ai-webp)",
    "// AI & Project Lab 区块图片资源: webp 路径 + blur 模糊占位符",
    "",
    "export const aiImageAssets = {",
  ];
  for (const r of results) {
    lines.push(
      `  ${r.key}: { src: "${r.src}", blurDataURL: "${r.blurDataURL}" },`
    );
  }
  lines.push("} as const;");
  lines.push("");
  lines.push("export type AiImageKey = keyof typeof aiImageAssets;");
  lines.push("");

  const outPath = path.join(root, "src/data/ai-image-assets.ts");
  await fs.writeFile(outPath, lines.join("\n"), "utf8");

  // 汇总
  const totalBefore = results.reduce((s, r) => s + r.before, 0);
  const totalAfter = results.reduce((s, r) => s + r.after, 0);
  console.log("=== AI 区块图片 WebP 转换完成 ===");
  console.log(`处理: ${results.length} 张`);
  console.log(
    `体积: ${(totalBefore / 1024).toFixed(0)}KB -> ${(totalAfter / 1024).toFixed(0)}KB (降 ${(
      (1 - totalAfter / totalBefore) * 100
    ).toFixed(0)}%)`
  );
  console.log(`输出模块: src/data/ai-image-assets.ts`);
  results.forEach((r) => {
    console.log(
      `  ${r.key}: ${(r.before / 1024).toFixed(0)}KB -> ${(r.after / 1024).toFixed(0)}KB`
    );
  });
}

if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
}
