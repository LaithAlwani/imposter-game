import { router } from 'expo-router';
import React, { useState } from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { theme } from '../../constants/theme';
import { Button } from '../../components/common/Button';
import { getMaxImpostors } from '../../features/game/impostorLimits';
import { useGameStore } from '../../store/gameStore';
import { Difficulty } from '../../types';

const MIN_PLAYERS = 3;
const MAX_PLAYERS = 50;

// ── Stepper ────────────────────────────────────────────────────────────────

type StepperProps = {
  label: string;
  emoji: string;
  value: number;
  onDecrement: () => void;
  onIncrement: () => void;
  canDecrement: boolean;
  canIncrement: boolean;
};

function Stepper({
  label,
  emoji,
  value,
  onDecrement,
  onIncrement,
  canDecrement,
  canIncrement,
}: StepperProps) {
  return (
    <View style={styles.stepperCard}>
      <Text style={styles.stepperLabel}>
        {emoji}  {label}
      </Text>
      <View style={styles.stepperRow}>
        <Pressable
          onPress={canDecrement ? onDecrement : undefined}
          style={({ pressed }) => [
            styles.stepBtn,
            !canDecrement && styles.stepBtnDisabled,
            pressed && canDecrement && styles.stepBtnPressed,
          ]}
        >
          <Text style={[styles.stepBtnText, !canDecrement && styles.stepBtnTextDisabled]}>
            −
          </Text>
        </Pressable>

        <View style={styles.stepValue}>
          <Text style={styles.stepValueText}>{value}</Text>
        </View>

        <Pressable
          onPress={canIncrement ? onIncrement : undefined}
          style={({ pressed }) => [
            styles.stepBtn,
            !canIncrement && styles.stepBtnDisabled,
            pressed && canIncrement && styles.stepBtnPressed,
          ]}
        >
          <Text style={[styles.stepBtnText, !canIncrement && styles.stepBtnTextDisabled]}>
            +
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

// ── Difficulty Picker ──────────────────────────────────────────────────────

const DIFFICULTY_LABELS: Record<Difficulty, string> = {
  1: 'Easy',
  2: 'Medium',
  3: 'Hard',
  4: 'Expert',
  5: 'Insane',
};

const DIFFICULTY_COLORS: Record<Difficulty, string> = {
  1: '#00E5A0',
  2: '#4EC9FF',
  3: '#FFD700',
  4: '#FF8C42',
  5: '#FF3366',
};

type DifficultyPickerProps = {
  value: Difficulty;
  onChange: (d: Difficulty) => void;
};

function DifficultyPicker({ value, onChange }: DifficultyPickerProps) {
  return (
    <View style={styles.diffCard}>
      <Text style={styles.stepperLabel}>⚡  Difficulty</Text>
      <View style={styles.diffRow}>
        {([1, 2, 3, 4, 5] as Difficulty[]).map((d) => {
          const active = value === d;
          return (
            <Pressable
              key={d}
              onPress={() => onChange(d)}
              style={({ pressed }) => [
                styles.diffBtn,
                active && {
                  backgroundColor: DIFFICULTY_COLORS[d],
                  borderColor: DIFFICULTY_COLORS[d],
                },
                pressed && !active && styles.diffBtnPressed,
              ]}
            >
              <Text
                style={[
                  styles.diffBtnNum,
                  active && { color: '#0D0B1E' },
                ]}
              >
                {d}
              </Text>
              <Text
                style={[
                  styles.diffBtnLabel,
                  active && { color: '#0D0B1E' },
                ]}
              >
                {DIFFICULTY_LABELS[d]}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

// ── Screen ─────────────────────────────────────────────────────────────────

export function GameSetupScreen() {
  const setupGame = useGameStore((s) => s.setupGame);

  const [playerCount, setPlayerCount] = useState(4);
  const [impostorCount, setImpostorCount] = useState(1);
  const [difficulty, setDifficulty] = useState<Difficulty>(1);

  const maxImpostors = getMaxImpostors(playerCount);

  function handlePlayerDecrement() {
    const next = Math.max(MIN_PLAYERS, playerCount - 1);
    setPlayerCount(next);
    const newMax = getMaxImpostors(next);
    if (impostorCount > newMax) {
      setImpostorCount(newMax);
    }
  }

  function handlePlayerIncrement() {
    setPlayerCount(Math.min(MAX_PLAYERS, playerCount + 1));
  }

  function handleStart() {
    setupGame({ playerCount, impostorCount, difficulty });
    router.push('/role-reveal');
  }

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <Pressable onPress={() => router.back()} style={styles.backBtn}>
            <Text style={styles.backBtnText}>← Back</Text>
          </Pressable>
          <Text style={styles.title}>Game Setup</Text>
          <View style={styles.headerSpacer} />
        </View>

        {/* Controls */}
        <View style={styles.controls}>
          <Stepper
            label="Players"
            emoji="👥"
            value={playerCount}
            onDecrement={handlePlayerDecrement}
            onIncrement={handlePlayerIncrement}
            canDecrement={playerCount > MIN_PLAYERS}
            canIncrement={playerCount < MAX_PLAYERS}
          />

          <Stepper
            label="Impostors"
            emoji="🕵️"
            value={impostorCount}
            onDecrement={() => setImpostorCount(Math.max(1, impostorCount - 1))}
            onIncrement={() =>
              setImpostorCount(Math.min(maxImpostors, impostorCount + 1))
            }
            canDecrement={impostorCount > 1}
            canIncrement={impostorCount < maxImpostors}
          />

          <DifficultyPicker value={difficulty} onChange={setDifficulty} />
        </View>

        {/* Summary */}
        <View style={styles.summary}>
          <Text style={styles.summaryText}>
            {playerCount - impostorCount} crew{' '}
            <Text style={styles.summaryVs}>vs</Text>{' '}
            <Text style={styles.summaryImpostor}>
              {impostorCount} impostor{impostorCount > 1 ? 's' : ''}
            </Text>
          </Text>
        </View>

        {/* Start */}
        <Button
          label="🚀  Start Game"
          onPress={handleStart}
          variant="primary"
          style={styles.startBtn}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  scroll: {
    padding: theme.spacing.lg,
    paddingBottom: theme.spacing.xxxl,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.xl,
  },
  backBtn: {
    padding: theme.spacing.sm,
  },
  backBtnText: {
    color: theme.colors.textMuted,
    fontSize: theme.fontSize.md,
    fontWeight: theme.fontWeight.semibold,
  },
  title: {
    flex: 1,
    textAlign: 'center',
    fontSize: theme.fontSize.xl,
    fontWeight: theme.fontWeight.black,
    color: theme.colors.text,
    letterSpacing: 1.5,
  },
  headerSpacer: {
    width: 60,
  },
  controls: {
    gap: theme.spacing.md,
  },
  // Stepper
  stepperCard: {
    backgroundColor: theme.colors.card,
    borderRadius: theme.radius.lg,
    borderWidth: 1.5,
    borderColor: theme.colors.cardBorder,
    padding: theme.spacing.lg,
    gap: theme.spacing.md,
    ...theme.shadow.md,
  },
  stepperLabel: {
    fontSize: theme.fontSize.md,
    fontWeight: theme.fontWeight.bold,
    color: theme.colors.textMuted,
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  stepperRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: theme.spacing.lg,
  },
  stepBtn: {
    width: 52,
    height: 52,
    borderRadius: theme.radius.round,
    backgroundColor: theme.colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    ...theme.shadow.sm,
  },
  stepBtnDisabled: {
    backgroundColor: theme.colors.surface,
    shadowOpacity: 0,
    elevation: 0,
  },
  stepBtnPressed: {
    opacity: 0.75,
  },
  stepBtnText: {
    fontSize: 26,
    fontWeight: theme.fontWeight.bold,
    color: theme.colors.text,
    lineHeight: 30,
    marginTop: -2,
  },
  stepBtnTextDisabled: {
    color: theme.colors.textDim,
  },
  stepValue: {
    minWidth: 80,
    alignItems: 'center',
  },
  stepValueText: {
    fontSize: theme.fontSize.xxxl,
    fontWeight: theme.fontWeight.black,
    color: theme.colors.text,
  },
  // Difficulty
  diffCard: {
    backgroundColor: theme.colors.card,
    borderRadius: theme.radius.lg,
    borderWidth: 1.5,
    borderColor: theme.colors.cardBorder,
    padding: theme.spacing.lg,
    gap: theme.spacing.md,
    ...theme.shadow.md,
  },
  diffRow: {
    flexDirection: 'row',
    gap: theme.spacing.sm,
  },
  diffBtn: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 10,
    borderRadius: theme.radius.md,
    borderWidth: 2,
    borderColor: theme.colors.cardBorder,
    backgroundColor: theme.colors.surface,
    gap: 4,
  },
  diffBtnPressed: {
    opacity: 0.7,
  },
  diffBtnNum: {
    fontSize: theme.fontSize.lg,
    fontWeight: theme.fontWeight.black,
    color: theme.colors.text,
  },
  diffBtnLabel: {
    fontSize: 9,
    fontWeight: theme.fontWeight.bold,
    color: theme.colors.textMuted,
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
  // Summary
  summary: {
    alignItems: 'center',
    paddingVertical: theme.spacing.xl,
  },
  summaryText: {
    fontSize: theme.fontSize.lg,
    fontWeight: theme.fontWeight.semibold,
    color: theme.colors.textMuted,
  },
  summaryVs: {
    color: theme.colors.textDim,
  },
  summaryImpostor: {
    color: theme.colors.impostor,
    fontWeight: theme.fontWeight.black,
  },
  startBtn: {
    width: '100%',
  },
});
