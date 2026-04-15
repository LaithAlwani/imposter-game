# Impostor Game – AI Development Guide (CLAUDE.md)

## 📌 Project Overview

This is a mobile-first social deduction game inspired by "Impostor Who?" and Among Us.

Players:

* Receive a secret role (Crew or Impostor)
* Most players get a word
* Impostor does NOT know the word
* Players give clues and vote

---

## 🧱 Tech Stack

* React Native (Expo)
* TypeScript
* Zustand (state management)
* React Navigation
* AsyncStorage (future use)
* AI integration (future)

---

## 📁 Project Structure (STRICT)

All code MUST follow this structure:

src/
app/
navigation/
screens/
Home/
GameSetup/
RoleReveal/
ClueRound/
Voting/
Results/
components/
common/
game/
features/
game/
players/
categories/
ai/
store/
services/
utils/
constants/
types/

---

## 🚫 Rules (MANDATORY)

1. DO NOT put business logic inside screens

2. Screens must remain thin (UI only)

3. ALL logic goes into:

   * features/
   * store/
   * services/

4. Use TypeScript for ALL files

5. Avoid inline styles (use StyleSheet or reusable components)

6. Keep components small and reusable

7. No hardcoding values inside components (use constants/)

---

## 🧠 State Management (Zustand)

Global game state must live in:

src/store/gameStore.ts

State must include:

* players
* word
* category
* difficulty

Game actions:

* setPlayers
* setGameConfig
* setWord
* assignImpostor

---

## 🎮 Game Flow (STRICT)

1. HomeScreen
2. GameSetupScreen
3. RoleRevealScreen
4. ClueRoundScreen
5. VotingScreen
6. ResultsScreen

Navigation must follow this exact order.

---

## 👥 Player Model

type Player = {
name: string
isImpostor: boolean
}

---

## 🎯 Game Rules

* At least 3 players required
* 1 impostor minimum
* Word is hidden from impostor
* All others see the same word

---

## 🧩 Features

### 1. Word Generator

Location:
src/features/game/wordGenerator.ts

Rules:

* Words are grouped by category
* Difficulty levels: 1–5
* Must return random word from list

---

### 2. Categories System

Categories must support:

* Free categories
* Locked (paid) categories

Structure:
type Category = {
name: string
isLocked: boolean
}

---

### 3. AI Integration (FUTURE)

Location:
src/services/aiService.ts

Responsibilities:

* Generate words by category
* Adjust difficulty level
* Cache results locally

DO NOT call AI directly from screens.

---

## 🧭 Navigation Rules

* Use React Navigation (Native Stack)
* No navigation logic inside components
* Navigation must be triggered from screens only

---

## 🎨 UI Rules

* Clean, minimal UI
* Centered layouts for now
* Use consistent spacing
* Reusable buttons from components/common

---

## 🔐 Monetization (Future)

* Some categories must be locked
* Unlock via:

  * One-time purchase
  * Subscription (future)

---

## ⚡ Performance Rules

* Avoid unnecessary re-renders
* Use memoization where needed
* Keep state minimal

---

## 🧪 Testing (Future)

* Logic in features/ must be testable
* Avoid tight coupling

---

## 🚀 Future Expansion

The app must be built with scalability for:

* Online multiplayer
* Real-time gameplay
* Voice chat
* AI-generated content
* User accounts

---

## ❗ IMPORTANT DEVELOPMENT PRINCIPLES

* Think modular
* Think scalable
* Think reusable
* DO NOT hack features together

---

## ✅ Example Responsibilities

Screens:

* Display UI
* Handle navigation

Store:

* Manage global game state

Features:

* Game logic (word selection, rules)

Services:

* External APIs (AI, backend)

Components:

* Reusable UI

---

## 🛑 Common Mistakes to Avoid

* Mixing UI and logic
* Hardcoding words inside screens
* Managing state locally instead of store
* Duplicating components
* Breaking folder structure

---

## 📌 Final Rule

If unsure:
👉 Put logic in features/
👉 Put shared state in store/
👉 Keep UI clean

---
