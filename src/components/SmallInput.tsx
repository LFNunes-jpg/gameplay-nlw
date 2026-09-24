import { StyleSheet, TextInput, type TextInputProps } from 'react-native';

import { useKeyboardAware } from './KeyboardAwareScrollView';
import { theme } from '../global/theme';

// Campo de 2 dígitos usado em "Dia e mês" e "Horário".
export function SmallInput({ onFocus, ...rest }: TextInputProps) {
  const { ensureVisible } = useKeyboardAware();

  return (
    <TextInput
      style={styles.container}
      keyboardType="numeric"
      maxLength={2}
      selectionColor={theme.colors.primary}
      onFocus={(event) => {
        ensureVisible();
        onFocus?.(event);
      }}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    width: 48,
    height: 48,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: theme.colors.border,
    backgroundColor: theme.colors.surface,
    color: theme.colors.heading,
    fontFamily: theme.fonts.text400,
    fontSize: 15,
    textAlign: 'center',
  },
});
