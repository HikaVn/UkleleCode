import { UKULELE_CHORDS, SIMPLIFIED_CHORDS, CAPO_SUGGESTIONS } from "../data/chords.js";

/**
 * Parse a chord name into its root and suffix.
 * e.g. "Am7" → { root: "A", suffix: "m7" }
 *      "F#m" → { root: "F#", suffix: "m" }
 *      "Bb7" → { root: "Bb", suffix: "7" }
 */
export function parseChord(chord) {
  const match = chord.match(/^([A-G][#b]?)(.*)/);
  if (!match) return null;
  return { root: match[1], suffix: match[2] };
}

/**
 * Normalise enharmonic equivalents to the key stored in the dictionary.
 * Flats are kept; only double-accidentals are stripped.
 */
function normalise(root) {
  const map = {
    "Cb": "B",
    "E#": "F",
    "B#": "C",
    "Fb": "E",
  };
  return map[root] ?? root;
}

/**
 * Convert a single guitar chord name to a ukulele chord.
 * Returns { ukChord, fingering, simplified }.
 */
export function convertChord(chord) {
  const trimmed = chord.trim();
  if (!trimmed) return null;

  // Check if a simplified substitution exists first
  const simplified = SIMPLIFIED_CHORDS[trimmed];
  const lookupChord = simplified ?? trimmed;

  // Direct lookup
  let fingering = UKULELE_CHORDS[lookupChord];

  // If not found, try normalising enharmonics
  if (!fingering) {
    const parsed = parseChord(lookupChord);
    if (parsed) {
      const normRoot = normalise(parsed.root);
      const normChord = normRoot + parsed.suffix;
      fingering = UKULELE_CHORDS[normChord];
    }
  }

  return {
    original: trimmed,
    ukChord: simplified ?? trimmed,
    fingering: fingering ?? "—",
    simplified: !!simplified,
    found: !!fingering,
  };
}

/**
 * Parse the input text into individual chord tokens.
 * Lines are preserved so multi-line chord sheets stay readable.
 */
export function parseInput(text) {
  return text
    .split("\n")
    .map((line) =>
      line
        .trim()
        .split(/\s+/)
        .filter(Boolean)
    )
    .filter((line) => line.length > 0);
}

/**
 * Detect the probable key from a flat list of chord names.
 * Simple heuristic: the first major or minor chord is used as the key root.
 */
export function detectKey(chords) {
  if (!chords.length) return null;

  // Prefer the first chord that looks like a simple major or minor root
  for (const chord of chords) {
    const parsed = parseChord(chord);
    if (!parsed) continue;
    // If it's major (no suffix) or minor
    if (parsed.suffix === "" || parsed.suffix === "m") {
      return parsed.root;
    }
  }
  // Fall back to root of first chord
  const first = parseChord(chords[0]);
  return first ? first.root : null;
}

/**
 * Suggest a capo position for the detected key.
 * Returns { capo, playKey } or null if no suggestion.
 */
export function suggestCapo(key) {
  if (!key) return null;
  return CAPO_SUGGESTIONS[key] ?? null;
}

/**
 * Convert an entire chord sheet (raw text) to ukulele chords.
 * Returns { lines, key, capoSuggestion }.
 */
export function convertSheet(text) {
  const lines = parseInput(text);
  const allChords = lines.flat();

  // Convert each chord
  const convertedLines = lines.map((line) => line.map(convertChord));

  const key = detectKey(allChords);
  const capoSuggestion = suggestCapo(key);

  return { lines: convertedLines, key, capoSuggestion };
}
