import { WordEntry } from '../types';

// Hints are single words the impostor can use as a clue during the game.
// They hint at the concept broadly without giving the word away directly.

export const WORD_BANK: WordEntry[] = [
  // ─── ANIMALS ──────────────────────────────────────────────────────
  {
    word: 'Elephant',
    hints: ['Heavy', 'Grey', 'Ancient', 'Herd', 'Loud'],
    difficulty: 1,
    category: 'animals',
  },
  {
    word: 'Penguin',
    hints: ['Formal', 'Cold', 'Waddling', 'Icy', 'Aquatic'],
    difficulty: 1,
    category: 'animals',
  },
  {
    word: 'Giraffe',
    hints: ['Tall', 'Spotted', 'Graceful', 'Savanna', 'Yellow'],
    difficulty: 1,
    category: 'animals',
  },
  {
    word: 'Chameleon',
    hints: ['Colorful', 'Hidden', 'Sticky', 'Slow', 'Forest'],
    difficulty: 3,
    category: 'animals',
  },
  {
    word: 'Platypus',
    hints: ['Odd', 'Venomous', 'Aquatic', 'Furry', 'Rare'],
    difficulty: 4,
    category: 'animals',
  },
  {
    word: 'Axolotl',
    hints: ['Gills', 'Pink', 'Watery', 'Alien', 'Unique'],
    difficulty: 5,
    category: 'animals',
  },

  // ─── FOOD ─────────────────────────────────────────────────────────
  {
    word: 'Pizza',
    hints: ['Round', 'Cheesy', 'Crispy', 'Delivery', 'Italian'],
    difficulty: 1,
    category: 'food',
  },
  {
    word: 'Sushi',
    hints: ['Fresh', 'Wrapped', 'Delicate', 'Japanese', 'Raw'],
    difficulty: 2,
    category: 'food',
  },
  {
    word: 'Croissant',
    hints: ['Flaky', 'Buttery', 'Crescent', 'Warm', 'French'],
    difficulty: 3,
    category: 'food',
  },
  {
    word: 'Tiramisu',
    hints: ['Creamy', 'Coffee', 'Layered', 'Sweet', 'Italian'],
    difficulty: 4,
    category: 'food',
  },
  {
    word: 'Baklava',
    hints: ['Sticky', 'Crispy', 'Nutty', 'Golden', 'Syrupy'],
    difficulty: 4,
    category: 'food',
  },
  {
    word: 'Pho',
    hints: ['Steamy', 'Fragrant', 'Herby', 'Warm', 'Vietnamese'],
    difficulty: 5,
    category: 'food',
  },

  // ─── SPORTS ───────────────────────────────────────────────────────
  {
    word: 'Football',
    hints: ['Grass', 'Teamwork', 'Kicked', 'Loud', 'Fast'],
    difficulty: 1,
    category: 'sports',
  },
  {
    word: 'Basketball',
    hints: ['Tall', 'Indoor', 'Bouncy', 'Swift', 'Orange'],
    difficulty: 1,
    category: 'sports',
  },
  {
    word: 'Chess',
    hints: ['Strategy', 'Quiet', 'Royal', 'Slow', 'Checkered'],
    difficulty: 2,
    category: 'sports',
  },
  {
    word: 'Surfing',
    hints: ['Waves', 'Balance', 'Salty', 'Wild', 'Thrilling'],
    difficulty: 2,
    category: 'sports',
  },
  {
    word: 'Fencing',
    hints: ['Masked', 'Precise', 'Swift', 'Electric', 'Elegant'],
    difficulty: 4,
    category: 'sports',
  },
  {
    word: 'Curling',
    hints: ['Icy', 'Sweeping', 'Precise', 'Cold', 'Strategic'],
    difficulty: 4,
    category: 'sports',
  },

  // ─── TECHNOLOGY ───────────────────────────────────────────────────
  {
    word: 'Smartphone',
    hints: ['Pocket', 'Connected', 'Glowing', 'Smart', 'Touchable'],
    difficulty: 1,
    category: 'technology',
  },
  {
    word: 'Drone',
    hints: ['Flying', 'Remote', 'Buzzing', 'Aerial', 'Camera'],
    difficulty: 2,
    category: 'technology',
  },
  {
    word: 'Blockchain',
    hints: ['Digital', 'Secure', 'Distributed', 'Encrypted', 'Immutable'],
    difficulty: 4,
    category: 'technology',
  },
  {
    word: 'Quantum Computer',
    hints: ['Cold', 'Complex', 'Powerful', 'Futuristic', 'Unstable'],
    difficulty: 5,
    category: 'technology',
  },

  // ─── NATURE ───────────────────────────────────────────────────────
  {
    word: 'Volcano',
    hints: ['Fiery', 'Rumbling', 'Smoking', 'Explosive', 'Molten'],
    difficulty: 2,
    category: 'nature',
  },
  {
    word: 'Aurora',
    hints: ['Colorful', 'Dancing', 'Arctic', 'Magical', 'Glowing'],
    difficulty: 3,
    category: 'nature',
  },
  {
    word: 'Quicksand',
    hints: ['Sinking', 'Tricky', 'Wet', 'Dangerous', 'Soft'],
    difficulty: 3,
    category: 'nature',
  },
  {
    word: 'Bioluminescence',
    hints: ['Glowing', 'Oceanic', 'Natural', 'Mysterious', 'Blue'],
    difficulty: 5,
    category: 'nature',
  },

  // ─── OBJECTS ──────────────────────────────────────────────────────
  {
    word: 'Umbrella',
    hints: ['Rainy', 'Protective', 'Folding', 'Handy', 'Round'],
    difficulty: 1,
    category: 'objects',
  },
  {
    word: 'Hourglass',
    hints: ['Sandy', 'Narrow', 'Ticking', 'Ancient', 'Symmetrical'],
    difficulty: 2,
    category: 'objects',
  },
  {
    word: 'Kaleidoscope',
    hints: ['Colorful', 'Spinning', 'Patterns', 'Mirrored', 'Tubular'],
    difficulty: 3,
    category: 'objects',
  },
  {
    word: 'Periscope',
    hints: ['Hidden', 'Viewing', 'Long', 'Submerged', 'Clever'],
    difficulty: 4,
    category: 'objects',
  },
];

export const CATEGORIES = [
  { id: 'animals', name: 'Animals', isLocked: false },
  { id: 'food', name: 'Food', isLocked: false },
  { id: 'sports', name: 'Sports', isLocked: false },
  { id: 'technology', name: 'Technology', isLocked: false },
  { id: 'nature', name: 'Nature', isLocked: false },
  { id: 'objects', name: 'Objects', isLocked: false },
] as const;
