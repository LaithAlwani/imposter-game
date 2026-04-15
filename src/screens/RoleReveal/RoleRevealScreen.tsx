import { router } from 'expo-router';
import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { theme } from '../../constants/theme';
import { Button } from '../../components/common/Button';
import { useGameStore } from '../../store/gameStore';

// ── Pass screen (before player taps to reveal) ─────────────────────────────

type PassScreenProps = {
  playerName: string;
  onReveal: () => void;
};

function PassScreen({ playerName, onReveal }: PassScreenProps) {
  return (
    <View style={styles.centered}>
      <View style={styles.passCard}>
        <Text style={styles.passEmoji}>📱</Text>
        <Text style={styles.passInstruction}>Pass the phone to</Text>
        <Text style={styles.passPlayerName}>{playerName}</Text>
        <Text style={styles.passSub}>When ready, tap below</Text>
      </View>

      <Button
        label="👁  Reveal My Role"
        onPress={onReveal}
        variant="primary"
        style={styles.revealBtn}
      />
    </View>
  );
}

// ── Role card (crew) ───────────────────────────────────────────────────────

type CrewCardProps = {
  word: string;
  onDone: () => void;
};

function CrewCard({ word, onDone }: CrewCardProps) {
  return (
    <View style={styles.centered}>
      <View style={[styles.roleCard, styles.crewCard]}>
        <Text style={styles.roleEmoji}>👷</Text>
        <Text style={[styles.roleTitle, { color: theme.colors.crew }]}>
          CREW MEMBER
        </Text>
        <View style={styles.divider} />
        <Text style={styles.wordLabel}>The word is</Text>
        <Text style={[styles.wordText, { color: theme.colors.crew }]}>
          {word}
        </Text>
        <Text style={styles.roleHint}>
          Give clues without saying the word!
        </Text>
      </View>

      <Button
        label="✅  Got it!"
        onPress={onDone}
        variant="crew"
        style={styles.revealBtn}
      />
    </View>
  );
}

// ── Role card (impostor) ───────────────────────────────────────────────────

type ImpostorCardProps = {
  hint: string;
  onDone: () => void;
};

function ImpostorCard({ hint, onDone }: ImpostorCardProps) {
  return (
    <View style={styles.centered}>
      <View style={[styles.roleCard, styles.impostorCard]}>
        <Text style={styles.roleEmoji}>🕵️</Text>
        <Text style={[styles.roleTitle, { color: theme.colors.impostor }]}>
          IMPOSTOR
        </Text>
        <View style={[styles.divider, { backgroundColor: theme.colors.impostor + '55' }]} />
        <Text style={styles.wordLabel}>Your hint</Text>
        <Text style={[styles.hintText, { color: theme.colors.impostor }]}>
          "{hint}"
        </Text>
        <Text style={styles.roleHint}>
          Blend in — don't get caught!
        </Text>
      </View>

      <Button
        label="✅  Got it!"
        onPress={onDone}
        variant="impostor"
        style={styles.revealBtn}
      />
    </View>
  );
}

// ── All done screen ────────────────────────────────────────────────────────

type AllDoneProps = {
  impostorCount: number;
};

function AllDoneScreen({ impostorCount }: AllDoneProps) {
  function handlePlayAgain() {
    router.replace('/setup');
  }

  function handleHome() {
    router.replace('/');
  }

  return (
    <View style={styles.centered}>
      <View style={styles.doneCard}>
        <Text style={styles.doneEmoji}>🎮</Text>
        <Text style={styles.doneTitle}>All Roles Revealed!</Text>
        <Text style={styles.doneSub}>
          {impostorCount === 1
            ? 'One impostor is hiding among you…'
            : `${impostorCount} impostors are hiding among you…`}
        </Text>
        <Text style={styles.doneTip}>
          Take turns giving one-word clues.{'\n'}Then vote for who you think is the impostor!
        </Text>
      </View>

      <View style={styles.doneButtons}>
        <Button
          label="🏠  Home"
          onPress={handleHome}
          variant="ghost"
          style={styles.doneBtn}
        />
        <Button
          label="🔁  Play Again"
          onPress={handlePlayAgain}
          variant="primary"
          style={styles.doneBtn}
        />
      </View>
    </View>
  );
}

// ── Main screen ────────────────────────────────────────────────────────────

type RevealPhase = 'pass' | 'revealed';

export function RoleRevealScreen() {
  const players = useGameStore((s) => s.players);
  const word = useGameStore((s) => s.word);
  const impostorHints = useGameStore((s) => s.impostorHints);
  const impostorCount = useGameStore((s) => s.impostorCount);
  const currentRevealIndex = useGameStore((s) => s.currentRevealIndex);
  const advanceReveal = useGameStore((s) => s.advanceReveal);

  const [phase, setPhase] = useState<RevealPhase>('pass');

  const allDone = currentRevealIndex >= players.length;

  // Progress indicator dots
  const progress = (
    <View style={styles.progressRow}>
      {players.map((_, i) => (
        <View
          key={i}
          style={[
            styles.progressDot,
            i < currentRevealIndex && styles.progressDotDone,
            i === currentRevealIndex && styles.progressDotCurrent,
          ]}
        />
      ))}
    </View>
  );

  function handleReveal() {
    setPhase('revealed');
  }

  function handleDone() {
    advanceReveal();
    setPhase('pass');
  }

  if (allDone) {
    return (
      <SafeAreaView style={styles.safe}>
        <AllDoneScreen impostorCount={impostorCount} />
      </SafeAreaView>
    );
  }

  const currentPlayer = players[currentRevealIndex];
  const isImpostor = currentPlayer.isImpostor;
  const hint = impostorHints[currentRevealIndex] ?? '';

  return (
    <SafeAreaView style={styles.safe}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerLabel}>
          Player {currentRevealIndex + 1} of {players.length}
        </Text>
        {progress}
      </View>

      {phase === 'pass' && (
        <PassScreen
          playerName={currentPlayer.name}
          onReveal={handleReveal}
        />
      )}

      {phase === 'revealed' && isImpostor && (
        <ImpostorCard hint={hint} onDone={handleDone} />
      )}

      {phase === 'revealed' && !isImpostor && (
        <CrewCard word={word} onDone={handleDone} />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  header: {
    alignItems: 'center',
    paddingTop: theme.spacing.md,
    paddingHorizontal: theme.spacing.lg,
    gap: theme.spacing.sm,
  },
  headerLabel: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.textMuted,
    letterSpacing: 1.5,
    textTransform: 'uppercase',
    fontWeight: theme.fontWeight.semibold,
  },
  progressRow: {
    flexDirection: 'row',
    gap: 6,
    flexWrap: 'wrap',
    justifyContent: 'center',
    maxWidth: 300,
  },
  progressDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: theme.colors.surface,
    borderWidth: 1,
    borderColor: theme.colors.cardBorder,
  },
  progressDotDone: {
    backgroundColor: theme.colors.primary,
    borderColor: theme.colors.primary,
  },
  progressDotCurrent: {
    backgroundColor: theme.colors.accent,
    borderColor: theme.colors.accent,
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  centered: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: theme.spacing.lg,
    gap: theme.spacing.xl,
  },
  // Pass card
  passCard: {
    backgroundColor: theme.colors.card,
    borderRadius: theme.radius.xl,
    borderWidth: 1.5,
    borderColor: theme.colors.cardBorder,
    padding: theme.spacing.xxl,
    alignItems: 'center',
    width: '100%',
    gap: theme.spacing.sm,
    ...theme.shadow.lg,
  },
  passEmoji: {
    fontSize: 56,
    marginBottom: theme.spacing.sm,
  },
  passInstruction: {
    fontSize: theme.fontSize.md,
    color: theme.colors.textMuted,
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  passPlayerName: {
    fontSize: theme.fontSize.xxl,
    fontWeight: theme.fontWeight.black,
    color: theme.colors.text,
    letterSpacing: 1,
  },
  passSub: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.textDim,
    marginTop: theme.spacing.xs,
  },
  // Role card (shared)
  roleCard: {
    borderRadius: theme.radius.xl,
    borderWidth: 2,
    padding: theme.spacing.xxl,
    alignItems: 'center',
    width: '100%',
    gap: theme.spacing.sm,
    ...theme.shadow.lg,
  },
  crewCard: {
    backgroundColor: theme.colors.card,
    borderColor: theme.colors.crew + '55',
    shadowColor: theme.colors.crewGlow,
  },
  impostorCard: {
    backgroundColor: theme.colors.card,
    borderColor: theme.colors.impostor + '55',
    shadowColor: theme.colors.impostorGlow,
  },
  roleEmoji: {
    fontSize: 56,
    marginBottom: theme.spacing.sm,
  },
  roleTitle: {
    fontSize: theme.fontSize.xl,
    fontWeight: theme.fontWeight.black,
    letterSpacing: 3,
  },
  divider: {
    width: '60%',
    height: 1.5,
    backgroundColor: theme.colors.crew + '55',
    marginVertical: theme.spacing.sm,
  },
  wordLabel: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.textMuted,
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  wordText: {
    fontSize: 40,
    fontWeight: theme.fontWeight.black,
    letterSpacing: 2,
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 18,
  },
  hintText: {
    fontSize: theme.fontSize.lg,
    fontWeight: theme.fontWeight.bold,
    textAlign: 'center',
    lineHeight: 30,
    fontStyle: 'italic',
    paddingHorizontal: theme.spacing.md,
  },
  roleHint: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.textDim,
    textAlign: 'center',
    marginTop: theme.spacing.xs,
  },
  revealBtn: {
    width: '100%',
  },
  // All done
  doneCard: {
    backgroundColor: theme.colors.card,
    borderRadius: theme.radius.xl,
    borderWidth: 1.5,
    borderColor: theme.colors.primary + '55',
    padding: theme.spacing.xxl,
    alignItems: 'center',
    width: '100%',
    gap: theme.spacing.sm,
    ...theme.shadow.lg,
  },
  doneEmoji: {
    fontSize: 64,
    marginBottom: theme.spacing.sm,
  },
  doneTitle: {
    fontSize: theme.fontSize.xxl,
    fontWeight: theme.fontWeight.black,
    color: theme.colors.text,
    letterSpacing: 1,
  },
  doneSub: {
    fontSize: theme.fontSize.md,
    color: theme.colors.impostor,
    fontWeight: theme.fontWeight.semibold,
    textAlign: 'center',
  },
  doneTip: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.textMuted,
    textAlign: 'center',
    lineHeight: 22,
    marginTop: theme.spacing.sm,
  },
  doneButtons: {
    flexDirection: 'row',
    gap: theme.spacing.md,
    width: '100%',
  },
  doneBtn: {
    flex: 1,
  },
});
