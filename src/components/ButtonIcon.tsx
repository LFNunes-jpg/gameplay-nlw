import { ActivityIndicator, Pressable, StyleSheet, Text, View, type PressableProps } from 'react-native';
import { Fontisto } from '@expo/vector-icons';

import { theme } from '../global/theme';

type Props = PressableProps & {
  title: string;
  loading?: boolean;
};

// Botão com o ícone do Discord à esquerda (Login e "Entrar na partida").
export function ButtonIcon({ title, loading = false, disabled, ...rest }: Props) {
  return (
    <Pressable
      disabled={disabled || loading}
      style={({ pressed }) => [styles.container, pressed && styles.pressed]}
      {...rest}
    >
      <View style={styles.iconWrapper}>
        {loading ? (
          <ActivityIndicator color={theme.colors.heading} />
        ) : (
          <Fontisto name="discord" size={20} color={theme.colors.heading} />
        )}
      </View>
      <Text style={styles.title}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 8,
    backgroundColor: theme.colors.primary,
    overflow: 'hidden',
  },
  pressed: { opacity: 0.85 },
  iconWrapper: {
    width: 56,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRightWidth: 1,
    borderRightColor: theme.colors.primaryDark,
  },
  title: { flex: 1, textAlign: 'center', fontFamily: theme.fonts.text500, fontSize: 15, color: theme.colors.heading },
});
