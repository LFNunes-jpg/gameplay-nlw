import { Pressable, StyleSheet, type PressableProps } from 'react-native';
import { Feather } from '@expo/vector-icons';

import { theme } from '../global/theme';

export function ButtonSettings(props: PressableProps) {
  return (
    <Pressable
      accessibilityLabel="Configurações"
      style={({ pressed }) => [styles.container, pressed && styles.pressed]}
      {...props}
    >
      <Feather name="settings" size={22} color={theme.colors.heading} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 48,
    height: 48,
    borderRadius: 8,
    backgroundColor: theme.colors.surface,
    borderWidth: 1,
    borderColor: theme.colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pressed: { opacity: 0.85 },
});
