import { Pressable, StyleSheet, type PressableProps } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { theme } from '../global/theme';

export function ButtonAdd(props: PressableProps) {
  return (
    <Pressable
      accessibilityLabel="Agendar partida"
      style={({ pressed }) => [styles.container, pressed && styles.pressed]}
      {...props}
    >
      <MaterialCommunityIcons name="plus" size={24} color={theme.colors.heading} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 48,
    height: 48,
    borderRadius: 8,
    backgroundColor: theme.colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pressed: { opacity: 0.85 },
});
