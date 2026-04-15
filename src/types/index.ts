export type Difficulty = 1 | 2 | 3 | 4 | 5;

export type Player = {
  name: string;
  isImpostor: boolean;
};

export type Category = {
  id: string;
  name: string;
  isLocked: boolean;
};

export type WordEntry = {
  word: string;
  hints: string[];
  difficulty: Difficulty;
  category: string;
};

export type GameConfig = {
  playerCount: number;
  impostorCount: number;
  difficulty: Difficulty;
  category?: string;
};
