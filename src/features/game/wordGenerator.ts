import { WORD_BANK } from '../../constants/words';
import { Difficulty, WordEntry } from '../../types';

function shuffle<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export function generateWord(
  difficulty: Difficulty,
  category?: string,
): WordEntry {
  let pool = WORD_BANK;

  if (category) {
    pool = pool.filter((w) => w.category === category);
  }

  // Try exact difficulty match first, then widen by ±1
  let candidates = pool.filter((w) => w.difficulty === difficulty);
  if (candidates.length === 0) {
    candidates = pool.filter(
      (w) => Math.abs(w.difficulty - difficulty) <= 1,
    );
  }
  if (candidates.length === 0) {
    candidates = pool;
  }

  const shuffled = shuffle(candidates);
  return shuffled[0];
}
