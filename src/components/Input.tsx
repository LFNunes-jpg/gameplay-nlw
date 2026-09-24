import { useState, type Ref } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View, type TextInputProps } from 'react-native';
import { Feather } from '@expo/vector-icons';

import { useKeyboardAware } from './KeyboardAwareScrollView';
import { theme } from '../global/theme';

type Props = TextInputProps & {
  label: string;
  error?: string;
  inputRef?: Ref<TextInput>;
};

// Campo de formulário com rótulo, mensagem de erro e (se for senha) botão de mostrar/ocultar.
export function Input({ label, error, inputRef, secureTextEntry, onFocus, ...rest }: Props) {
  const [hidden, setHidden] = useState(true);
  const { ensureVisible } = useKeyboardAware();

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>

      <View style={[styles.field, !!error && styles.fieldError]}>
        <TextInput
          ref={inputRef}
          style={styles.input}
          placeholderTextColor={theme.colors.subtitle}
          selectionColor={theme.colors.primary}
          autoCapitalize="none"
          autoCorrect={false}
          secureTextEntry={secureTextEntry && hidden}
          onFocus={(event) => {
            ensureVisible();
            onFocus?.(event);
          }}
          {...rest}
        />

        {secureTextEntry && (
          <Pressable onPress={() => setHidden((value) => !value)} hitSlop={10} accessibilityLabel="Mostrar ou ocultar senha">
            <Feather name={hidden ? 'eye' : 'eye-off'} size={18} color={theme.colors.subtitle} />
          </Pressable>
        )}
      </View>

      {!!error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { width: '100%', marginBottom: 16 },
  label: { fontFamily: theme.fonts.title700, fontSize: 16, color: theme.colors.heading, marginBottom: 8 },
  field: {
    height: 52,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: theme.colors.border,
    backgroundColor: theme.colors.surface,
  },
  fieldError: { borderColor: theme.colors.primary },
  input: { flex: 1, height: '100%', fontFamily: theme.fonts.text400, fontSize: 15, color: theme.colors.heading },
  error: { fontFamily: theme.fonts.text400, fontSize: 12, color: theme.colors.primary, marginTop: 6 },
});
