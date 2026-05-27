import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";
import { pathToFileURL } from "node:url";

const root = process.cwd();
const minBytes = 300 * 1024;
export const targets = [
  "public/images/miniapp",
  "public/images/projects",
  "public/xiaohong-ai/assets/images",
  "public/intrinsic-fire-protection/images",
  "public/literature-fire-portfolio/assets/deck",
];

export function normalizeRelativePath(filePath) {
  return filePath.replaceAll("\\", "/");
}

export function getCompressionProfile(relativePath) {
  const normalized = normalizeRelativePath(relativePath);

  if (normalized.includes("public/literature-fire-portfolio/assets/deck/full-ppt/")) {
    return {
      maxWidth: 3840,
      maxHeight: 2160,
      jpegQuality: 68,
      pngQuality: 70,
    };
  }

  if (normalized.endsWith("public/xiaohong-ai/assets/images/exhibition-board.jpg")) {
    return {
      maxWidth: 2200,
      maxHeight: 4950,
      jpegQuality: 64,
      pngQuality: 68,
    };
  }

  if (
    normalized.includes("public/intrinsic-fire-protection/images/") ||
    normalized.includes("public/images/projects/")
  ) {
    return {
      maxWidth: 1920,
      maxHeight: 1920,
      jpegQuality: 70,
      pngQuality: 70,
    };
  }

  if (normalized.includes("public/xiaohong-ai/assets/images/")) {
    return {
      maxWidth: 1600,
      maxHeight: 1600,
      jpegQuality: 72,
      pngQuality: 72,
    };
  }

  return {
    maxWidth: 1920,
    maxHeight: 1920,
    jpegQuality: 74,
    pngQuality: 74,
  };
}

async function walk(dir) {
  try {
    const entries = await fs.readdir(dir, { withFileTypes: true });
    const files = await Promise.all(
      entries.map(async (entry) => {
        const fullPath = path.join(dir, entry.name);
        if (entry.isDirectory()) return walk(fullPath);
        return [fullPath];
      })
    );

    return files.flat();
  } catch (error) {
    if (error && typeof error === "object" && "code" in error && error.code === "ENOENT") {
      return [];
    }

    throw error;
  }
}

async function compressImage(filePath) {
  const stat = await fs.stat(filePath);
  if (stat.size < minBytes) return null;

  const ext = path.extname(filePath).toLowerCase();
  const relativePath = normalizeRelativePath(path.relative(root, filePath));
  const profile = getCompressionProfile(relativePath);
  const image = sharp(filePath, { animated: false, limitInputPixels: false }).resize({
    width: profile.maxWidth,
    height: profile.maxHeight,
    fit: "inside",
    withoutEnlargement: true,
  });
  const meta = await image.metadata();

  if (ext === ".jpg" || ext === ".jpeg") {
    await image.jpeg({ quality: profile.jpegQuality, mozjpeg: true }).toFile(`${filePath}.tmp`);
  } else if (ext === ".png") {
    await image
      .png({
        compressionLevel: 9,
        effort: 10,
        palette: true,
        quality: profile.pngQuality,
      })
      .toFile(`${filePath}.tmp`);
  } else {
    return null;
  }

  const tmpPath = `${filePath}.tmp`;
  const compressedStat = await fs.stat(tmpPath);

  if (compressedStat.size < stat.size) {
    await fs.rename(tmpPath, filePath);
    return {
      filePath,
      before: stat.size,
      after: compressedStat.size,
    };
  }

  await fs.rm(tmpPath, { force: true });
  return null;
}

async function main() {
  const files = (
    await Promise.all(
      targets.map(async (target) => {
        const fullTarget = path.join(root, target);
        return walk(fullTarget);
      })
    )
  )
    .flat()
    .filter((filePath) => /\.(png|jpe?g)$/i.test(filePath));

  const results = [];
  for (const filePath of files) {
    const result = await compressImage(filePath);
    if (result) results.push(result);
  }

  const summary = results.reduce(
    (acc, item) => {
      acc.before += item.before;
      acc.after += item.after;
      return acc;
    },
    { before: 0, after: 0 }
  );

  console.log(
    JSON.stringify(
      {
        processed: results.length,
        bytesSaved: summary.before - summary.after,
        files: results.map((item) => ({
          filePath: normalizeRelativePath(path.relative(root, item.filePath)),
          before: item.before,
          after: item.after,
        })),
      },
      null,
      2
    )
  );
}

if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
}
