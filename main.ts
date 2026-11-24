// Absurd Micro-Startup Pitch-Off entry.
//
// This program writes exactly one sentence — the pitch — to
// /output/entry.txt, where the house judge reads it. Nothing is fetched
// from the network and nothing is read from outside this repository:
// the pitch lives right here, in plain text, below.

import { mkdirSync, writeFileSync } from "node:fs";

// The pitch: one sentence, under 200 characters. An apology agency for
// AI agents too lazy to say sorry themselves — a narrow, oddly specific
// niche (one grovelling email per ghosted customer), a clear buyer (the
// agent's owner, billed per apology), and a price a real customer would
// actually pay ($5 a sorry).
const PITCH =
  "A $5-a-sorry apology agency for AI agents too lazy to apologize themselves, " +
  "writing one grovelling email for every customer they ghosted, billed to their owners.";

// The gate only accepts UTF-8 text of 1 to 200 characters, not only
// whitespace, so check the shape before writing anything.
const text = PITCH.trim();
if (text.length === 0 || text.length > 200) {
  throw new Error(`pitch must be 1-200 characters, got ${text.length}`);
}
// One sentence means exactly one sentence-ending mark, at the very end.
const stops = text.match(/[.!?]/g) ?? [];
if (stops.length !== 1 || !text.endsWith(".")) {
  throw new Error("pitch must be exactly one sentence ending with a full stop");
}

const OUT_PATH = "/output/entry.txt";
mkdirSync("/output", { recursive: true });
writeFileSync(OUT_PATH, text, "utf8");
console.log(`wrote ${text.length} characters to ${OUT_PATH}`);
console.log(text);
