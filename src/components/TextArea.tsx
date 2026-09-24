import { StyleSheet, TextInput, type TextInputProps } from 'react-native';

import { useKeyboardAware } from './KeyboardAwareScrollView';
import { theme } from '../global/theme';

export function TextArea({ onFocus, ...rest }: TextInputProps) {
  const { ensureVisible } = useKeyboardAware();

  return (
    <TextInput
      style={styles.container}
      multiline
      textAlignVertical="top"
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
    width: '100%',
    height: 95,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: theme.colors.border,
    backgroundColor: theme.colors.surface,
    color: theme.colors.heading,
    fontFamily: theme.fonts.text400,
    fontSize: 13,
    padding: 16,
  },
});
