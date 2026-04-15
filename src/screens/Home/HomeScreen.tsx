import { router } from 'expo-router';
import React from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { theme } from '../../constants/theme';
import { Button } from '../../components/common/Button';

// Decorative floating "star" dots for the background
function Stars() {
  const dots = [
    { top: 60, left: 30, size: 3 },
    { top: 90, left: 180, size: 2 },
    { top: 140, left: 320, size: 4 },
    { top: 200, left: 80, size: 2 },
    { top: 250, left: 260, size: 3 },
    { top: 310, left: 150, size: 2 },
    { top: 380, left: 340, size: 3 },
    { top: 420, left: 50, size: 2 },
    { top: 480, left: 200, size: 4 },
    { top: 540, left: 310, size: 2 },
    { top: 600, left: 100, size: 3 },
    { top: 650, left: 250, size: 2 },
    { top: 700, left: 370, size: 3 },
  ];

  return (
    <>
      {dots.map((d, i) => (
        <View
          key={i}
          style={{
            position: 'absolute',
            top: d.top,
            left: d.left,
            width: d.size,
            height: d.size,
            borderRadius: d.size,
            backgroundColor: theme.colors.star,
            opacity: 0.5 + Math.random() * 0.5,
          }}
        />
      ))}
    </>
  );
}

export function HomeScreen() {
  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <Stars />

        {/* Logo area */}
        <View style={styles.logoSection}>
          <Text style={styles.emoji}>🕵️</Text>
          <Text style={styles.title}>IMPOSTOR</Text>
          <Text style={styles.titleAccent}>WHO?</Text>
          <Text style={styles.subtitle}>The social deduction party game</Text>
        </View>

        {/* Buttons */}
        <View style={styles.buttonSection}>
          <Button
            label="🎮  Classic Mode"
            onPress={() => router.push('/setup')}
            variant="primary"
            style={styles.mainButton}
          />

          <View style={styles.onlineWrapper}>
            <Button
              label="🌐  Online Mode"
              onPress={() => {}}
              variant="disabled"
              disabled
              style={styles.mainButton}
            />
            <View style={styles.badge}>
              <Text style={styles.badgeText}>COMING SOON</Text>
            </View>
          </View>
        </View>

        {/* Footer */}
        <Text style={styles.footer}>Pass the phone · Find the impostor</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: theme.spacing.xl,
    paddingVertical: theme.spacing.xxl,
    overflow: 'hidden',
  },
  logoSection: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    gap: 6,
  },
  emoji: {
    fontSize: 80,
    marginBottom: 8,
  },
  title: {
    fontSize: 48,
    fontWeight: theme.fontWeight.black,
    color: theme.colors.text,
    letterSpacing: 4,
    lineHeight: 52,
  },
  titleAccent: {
    fontSize: 64,
    fontWeight: theme.fontWeight.black,
    color: theme.colors.accent,
    letterSpacing: 6,
    lineHeight: 68,
    textShadowColor: theme.colors.accentGlow,
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 20,
  },
  subtitle: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.textMuted,
    letterSpacing: 1.5,
    textTransform: 'uppercase',
    marginTop: 8,
  },
  buttonSection: {
    width: '100%',
    gap: theme.spacing.md,
    marginBottom: theme.spacing.lg,
  },
  mainButton: {
    width: '100%',
  },
  onlineWrapper: {
    position: 'relative',
  },
  badge: {
    position: 'absolute',
    top: -10,
    right: 16,
    backgroundColor: theme.colors.accent,
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: theme.radius.round,
  },
  badgeText: {
    fontSize: 9,
    fontWeight: theme.fontWeight.black,
    color: theme.colors.background,
    letterSpacing: 1,
  },
  footer: {
    fontSize: theme.fontSize.xs,
    color: theme.colors.textDim,
    letterSpacing: 1.2,
    textTransform: 'uppercase',
  },
});
