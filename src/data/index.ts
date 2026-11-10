import poemData from "./poem.json";
import { MEANINGS_1 } from "./meanings-1";
import { MEANINGS_2 } from "./meanings-2";
import { MEANINGS_3 } from "./meanings-3";
import { MEANINGS_4 } from "./meanings-4";
import { SECTIONS, getSectionForVerse } from "./sections";
import { RawVerse, VerseData, VerseMeaning } from "./types";

export * from "./types";
export { SECTIONS, getSectionForVerse };

export const TOTAL_VERSES = 111;

/**
 * Verses whose compressed Elu wordplay, double meanings (slesha), or archaic
 * compounds are dense enough that the plain paraphrase conveys the general sense.
 */
export const APPROXIMATE = new Set<number>([
  1, 5, 14, 26, 34, 38, 49, 54, 57, 69, 79, 81, 83, 86, 97,
]);

const MEANING_MAP = new Map<number, VerseMeaning>();
for (const m of [...MEANINGS_1, ...MEANINGS_2, ...MEANINGS_3, ...MEANINGS_4]) {
  MEANING_MAP.set(m.n, m);
}

const RAW_VERSES = poemData as RawVerse[];

export const ALL_VERSES: VerseData[] = RAW_VERSES.map((v) => {
  const meaning = MEANING_MAP.get(v.n);
  return {
    n: v.n,
    lines: v.lines,
    si: meaning?.si ?? "",
    en: meaning?.en ?? "",
    note: meaning?.note,
    approximate: APPROXIMATE.has(v.n),
    section: getSectionForVerse(v.n),
  };
});

export function parseVerseNumber(raw: string | number | undefined | null): number | null {
  if (raw === undefined || raw === null) return null;
  const str = String(raw).trim();
  if (!/^\d+$/.test(str)) return null;
  const num = Number(str);
  if (!Number.isInteger(num) || num < 1 || num > TOTAL_VERSES) return null;
  return num;
}

export function getVerse(n: number): VerseData | null {
  if (!Number.isInteger(n) || n < 1 || n > TOTAL_VERSES) return null;
  return ALL_VERSES[n - 1] ?? null;
}
