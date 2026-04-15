import { create } from 'zustand';
import { Difficulty, GameConfig, Player } from '../types';
import { generateWord } from '../features/game/wordGenerator';
import {
  assignImpostorHints,
  buildPlayers,
  pickImpostorIndices,
} from '../features/game/roleAssigner';

type GameStore = {
  // ── Config ──────────────────────────────────────────────────────
  playerCount: number;
  impostorCount: number;
  difficulty: Difficulty;
  category: string;

  // ── Active game ─────────────────────────────────────────────────
  players: Player[];
  word: string;
  /** playerIndex → hint string (only populated for impostors) */
  impostorHints: Record<number, string>;
  currentRevealIndex: number;
  isGameStarted: boolean;

  // ── Hint history (avoids repeating same hint for same word) ─────
  usedHintsPerWord: Record<string, number[]>;

  // ── Actions ─────────────────────────────────────────────────────
  setupGame: (config: GameConfig) => void;
  advanceReveal: () => void;
  resetGame: () => void;
};

export const useGameStore = create<GameStore>((set, get) => ({
  // defaults
  playerCount: 4,
  impostorCount: 1,
  difficulty: 1,
  category: '',
  players: [],
  word: '',
  impostorHints: {},
  currentRevealIndex: 0,
  isGameStarted: false,
  usedHintsPerWord: {},

  setupGame(config: GameConfig) {
    const { playerCount, impostorCount, difficulty, category } = config;
    const { usedHintsPerWord } = get();

    const wordEntry = generateWord(difficulty, category);
    const impostorIndices = pickImpostorIndices(playerCount, impostorCount);
    const players = buildPlayers(playerCount, impostorIndices);

    const previouslyUsed = usedHintsPerWord[wordEntry.word] ?? [];
    const { impostorHints, newlyUsedIndices } = assignImpostorHints(
      wordEntry,
      impostorIndices,
      previouslyUsed,
    );

    // Merge newly used indices, cap list at hint count to avoid unbounded growth
    const merged = Array.from(
      new Set([...previouslyUsed, ...newlyUsedIndices]),
    );
    const capped =
      merged.length >= wordEntry.hints.length ? [] : merged;

    set({
      playerCount,
      impostorCount,
      difficulty,
      category: category ?? '',
      players,
      word: wordEntry.word,
      impostorHints,
      currentRevealIndex: 0,
      isGameStarted: true,
      usedHintsPerWord: {
        ...usedHintsPerWord,
        [wordEntry.word]: capped,
      },
    });
  },

  advanceReveal() {
    set((state) => ({
      currentRevealIndex: state.currentRevealIndex + 1,
    }));
  },

  resetGame() {
    set({
      players: [],
      word: '',
      impostorHints: {},
      currentRevealIndex: 0,
      isGameStarted: false,
    });
  },
}));
