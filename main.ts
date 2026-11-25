import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

// Entry point: reads the one-line Monday review from entry.txt next to
// this file and writes it, unchanged, to the output directory.
// The gate requires 1-200 characters and a single line, so both are
// checked here before anything is written.
const botDir =
  process.env.MAKEFUN_BOT_DIR ?? dirname(fileURLToPath(import.meta.url));
const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";

const line = readFileSync(join(botDir, "entry.txt"), "utf8").trim();

if (line.length === 0 || line.length > 200) {
  throw new Error(`entry must be 1-200 characters, got ${line.length}`);
}
if (line.includes("\n")) {
  throw new Error("entry must be a single line");
}

mkdirSync(outputDir, { recursive: true });
writeFileSync(join(outputDir, "entry.txt"), line, "utf8");
