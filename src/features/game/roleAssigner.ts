import { Player, WordEntry } from '../../types';

function shuffle<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

/** Randomly picks `impostorCount` unique player indices. */
export function pickImpostorIndices(
  playerCount: number,
  impostorCount: number,
): number[] {
  const indices = Array.from({ length: playerCount }, (_, i) => i);
  return shuffle(indices).slice(0, impostorCount);
}

/** Builds the full player array with isImpostor flags set. */
export function buildPlayers(
  playerCount: number,
  impostorIndices: number[],
): Player[] {
  const set = new Set(impostorIndices);
  return Array.from({ length: playerCount }, (_, i) => ({
    name: `Player ${i + 1}`,
    isImpostor: set.has(i),
  }));
}

/**
 * Assigns a unique hint to each impostor from the word's hint list.
 *
 * Rules:
 *  - Prefer hints that haven't been used in previous games (via `usedIndices`).
 *  - Each impostor in the current game gets a *different* hint.
 *  - If there are not enough fresh hints, recycle from the full list.
 *
 * Returns a map of playerIndex → hintString, plus the hint indices consumed
 * so the store can persist them for future deduplication.
 */
export function assignImpostorHints(
  wordEntry: WordEntry,
  impostorIndices: number[],
  usedIndices: number[],
): {
  impostorHints: Record<number, string>;
  newlyUsedIndices: number[];
} {
  const { hints } = wordEntry;
  const allIndices = hints.map((_, i) => i);

  // Prefer unused hints; fall back to full list if needed
  const fresh = allIndices.filter((i) => !usedIndices.includes(i));
  const pool = fresh.length >= impostorIndices.length ? fresh : allIndices;
  const shuffled = shuffle(pool);

  const impostorHints: Record<number, string> = {};
  const newlyUsedIndices: number[] = [];

  impostorIndices.forEach((playerIdx, slot) => {
    const hintIdx = shuffled[slot % shuffled.length];
    impostorHints[playerIdx] = hints[hintIdx];
    newlyUsedIndices.push(hintIdx);
  });

  return { impostorHints, newlyUsedIndices };
}
