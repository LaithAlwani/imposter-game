/**
 * Returns the maximum number of impostors allowed for a given player count.
 *
 * Scale:
 *  3–5  players  → 1  impostor  (too small for more)
 *  6–9  players  → 2  impostors
 *  10–14 players → 3  impostors
 *  15–19 players → 4  impostors
 *  20–29 players → 5  impostors
 *  30–39 players → 6  impostors
 *  40–49 players → 7  impostors
 *  50   players  → 8  impostors
 *
 * Rule of thumb: keep crew at least 2× impostors so crew can still win.
 */
export function getMaxImpostors(playerCount: number): number {
  if (playerCount >= 40) return 7;
  if (playerCount >= 30) return 6;
  if (playerCount >= 20) return 5;
  if (playerCount >= 15) return 4;
  if (playerCount >= 10) return 3;
  if (playerCount >= 6) return 2;
  return 1;
}
