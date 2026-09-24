import { ActivityIndicator, Pressable, StyleSheet, Text, type PressableProps } from 'react-native';

import { theme } from '../global/theme';

type Props = PressableProps & {
  title: string;
  variant?: 'primary' | 'outline';
  loading?: boolean;
};

export function Button({ title, variant = 'primary', loading = false, disabled, style: _style, ...rest }: Props) {
  return (
    <Pressable
      disabled={disabled || loading}
      style={({ pressed }) => [styles.container, variant === 'outline' && styles.outline, pressed && styles.pressed]}
      {...rest}
    >
      {loading ? (
        <ActivityIndicator color={theme.colors.heading} />
      ) : (
        <Text style={styles.title}>{title}</Text>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 56,
    borderRadius: 8,
    backgroundColor: theme.colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  outline: { backgroundColor: 'transparent', borderWidth: 1, borderColor: theme.colors.outline },
  pressed: { opacity: 0.85 },
  title: { fontFamily: theme.fonts.text500, fontSize: 15, color: theme.colors.heading },
});
