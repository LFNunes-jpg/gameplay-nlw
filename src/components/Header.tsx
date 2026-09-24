import type { ReactNode } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { theme } from '../global/theme';

type Props = {
  title: string;
  action?: ReactNode; // ícone opcional à direita (ex.: compartilhar)
};

export function Header({ title, action }: Props) {
  const { goBack } = useNavigation();
  const { top } = useSafeAreaInsets();

  return (
    <LinearGradient
      colors={[theme.colors.surfaceDark, theme.colors.surface]}
      style={[styles.container, { paddingTop: top, height: top + 56 }]}
    >
      <Pressable onPress={goBack} hitSlop={12} accessibilityLabel="Voltar">
        <Feather name="arrow-left" size={24} color={theme.colors.heading} />
      </Pressable>

      <Text style={styles.title}>{title}</Text>

      {/* Mantém o título centralizado mesmo quando não há ação à direita */}
      {action ? <View>{action}</View> : <View style={styles.placeholder} />}
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
  },
  title: { flex: 1, textAlign: 'center', fontFamily: theme.fonts.title700, fontSize: 20, color: theme.colors.heading },
  placeholder: { width: 24 },
});
