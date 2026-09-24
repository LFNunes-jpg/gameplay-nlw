import { Image, Pressable, StyleSheet, Text, View, type PressableProps } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import { theme } from '../global/theme';
import type { CategoryProps } from '../types';

type Props = PressableProps & {
  category: CategoryProps;
  checked?: boolean;
  hasCheckBox?: boolean; // o quadradinho do canto só existe na tela de agendamento
};

export function Category({ category, checked = false, hasCheckBox = false, ...rest }: Props) {
  // Na tela de agendamento, categorias não escolhidas ficam "apagadas".
  const dimmed = hasCheckBox && !checked;

  return (
    <Pressable {...rest} style={[styles.wrapper, dimmed && styles.dimmed]} accessibilityState={{ selected: checked }}>
      <LinearGradient
        colors={checked ? [theme.colors.surface, theme.colors.surface] : [theme.colors.surfaceDark, theme.colors.surface]}
        style={[styles.card, checked && styles.cardChecked]}
      >
        {hasCheckBox && <View style={[styles.checkbox, checked && styles.checkboxChecked]} />}

        <Image source={category.icon} style={styles.icon} />
        <Text style={styles.title}>{category.title}</Text>
      </LinearGradient>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  wrapper: { width: 104, height: 120, marginRight: 8 },
  dimmed: { opacity: 0.5 },
  card: {
    flex: 1,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: theme.colors.border,
    alignItems: 'center',
    paddingTop: 13,
  },
  cardChecked: { borderColor: '#2E3AA6' },
  checkbox: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 10,
    height: 10,
    borderRadius: 2,
    backgroundColor: theme.colors.checkboxOff,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  checkboxChecked: { backgroundColor: theme.colors.primary, borderColor: theme.colors.primary },
  icon: { width: 60, height: 60, marginBottom: 8 },
  title: { fontFamily: theme.fonts.title700, fontSize: 15, lineHeight: 20, color: theme.colors.heading },
});
