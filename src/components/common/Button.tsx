import React from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  ViewStyle,
} from 'react-native';
import { theme } from '../../constants/theme';

type Variant = 'primary' | 'crew' | 'impostor' | 'ghost' | 'disabled';

type Props = {
  label: string;
  onPress: () => void;
  variant?: Variant;
  style?: ViewStyle;
  disabled?: boolean;
};

const variantStyles: Record<Variant, { bg: string; border: string; text: string; glow: string }> = {
  primary: {
    bg: theme.colors.primary,
    border: theme.colors.primaryDark,
    text: theme.colors.text,
    glow: theme.colors.primaryGlow,
  },
  crew: {
    bg: theme.colors.crew,
    border: theme.colors.crewDark,
    text: '#0D0B1E',
    glow: theme.colors.crewGlow,
  },
  impostor: {
    bg: theme.colors.impostor,
    border: theme.colors.impostorDark,
    text: theme.colors.text,
    glow: theme.colors.impostorGlow,
  },
  ghost: {
    bg: 'transparent',
    border: theme.colors.cardBorder,
    text: theme.colors.textMuted,
    glow: 'transparent',
  },
  disabled: {
    bg: theme.colors.comingSoon,
    border: theme.colors.comingSoonBorder,
    text: theme.colors.textDim,
    glow: 'transparent',
  },
};

export function Button({ label, onPress, variant = 'primary', style, disabled = false }: Props) {
  const v = variantStyles[disabled ? 'disabled' : variant];

  return (
    <Pressable
      onPress={disabled ? undefined : onPress}
      style={({ pressed }) => [
        styles.base,
        {
          backgroundColor: v.bg,
          borderColor: v.border,
          opacity: pressed ? 0.82 : 1,
          shadowColor: v.glow !== 'transparent' ? v.glow : '#000',
          shadowOpacity: v.glow !== 'transparent' ? 0.7 : 0.3,
        },
        style,
      ]}
    >
      <Text style={[styles.label, { color: v.text }]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: theme.radius.round,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 14,
    elevation: 8,
  },
  label: {
    fontSize: theme.fontSize.md,
    fontWeight: theme.fontWeight.black,
    letterSpacing: 1.4,
    textTransform: 'uppercase',
  },
});
