import { useRef, useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Background } from '../components/Background';
import { Button } from '../components/Button';
import { Header } from '../components/Header';
import { Input } from '../components/Input';
import { KeyboardAwareScrollView } from '../components/KeyboardAwareScrollView';
import { theme } from '../global/theme';
import { useAuth } from '../hooks/auth';
import { AuthError } from '../services/auth';
import { isValidEmail } from '../utils/validators';

type Errors = { name?: string; email?: string; password?: string; confirm?: string; form?: string };

export function SignUp() {
  const { signUp } = useAuth();
  const { bottom } = useSafeAreaInsets();
  const emailRef = useRef<TextInput>(null);
  const passwordRef = useRef<TextInput>(null);
  const confirmRef = useRef<TextInput>(null);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [errors, setErrors] = useState<Errors>({});
  const [loading, setLoading] = useState(false);

  function validate(): Errors {
    const result: Errors = {};
    if (name.trim().length < 2) result.name = 'Informe seu nome (mínimo 2 letras).';
    if (!isValidEmail(email)) result.email = 'Informe um e-mail válido.';
    if (password.length < 6) result.password = 'A senha precisa ter pelo menos 6 caracteres.';
    if (confirm !== password) result.confirm = 'As senhas não conferem.';
    return result;
  }

  async function handleSignUp() {
    const nextErrors = validate();
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;

    setLoading(true);
    try {
      await signUp({ name, email, password });
      // Conta criada e já logada: as rotas trocam sozinhas para a Home.
    } catch (error) {
      setErrors({ form: error instanceof AuthError ? error.message : 'Não foi possível criar a conta. Tente novamente.' });
      setLoading(false);
    }
  }

  return (
    <Background>
      <Header title="Criar conta" />

      <KeyboardAwareScrollView contentContainerStyle={styles.content} bottomInset={bottom + 32}>
          <Text style={styles.subtitle}>Crie sua conta para agendar partidas com seus amigos.</Text>

          <Input
            label="Nome"
            placeholder="Como quer ser chamado"
            autoCapitalize="words"
            autoComplete="name"
            returnKeyType="next"
            value={name}
            onChangeText={setName}
            onSubmitEditing={() => emailRef.current?.focus()}
            error={errors.name}
          />
          <Input
            label="E-mail"
            placeholder="voce@email.com"
            keyboardType="email-address"
            autoComplete="email"
            returnKeyType="next"
            inputRef={emailRef}
            value={email}
            onChangeText={setEmail}
            onSubmitEditing={() => passwordRef.current?.focus()}
            error={errors.email}
          />
          <Input
            label="Senha"
            placeholder="Mínimo 6 caracteres"
            secureTextEntry
            returnKeyType="next"
            inputRef={passwordRef}
            value={password}
            onChangeText={setPassword}
            onSubmitEditing={() => confirmRef.current?.focus()}
            error={errors.password}
          />
          <Input
            label="Confirmar senha"
            placeholder="Repita a senha"
            secureTextEntry
            returnKeyType="done"
            inputRef={confirmRef}
            value={confirm}
            onChangeText={setConfirm}
            onSubmitEditing={handleSignUp}
            error={errors.confirm}
          />

          {!!errors.form && <Text style={styles.formError}>{errors.form}</Text>}

          <View style={styles.button}>
            <Button title="Criar conta" loading={loading} onPress={handleSignUp} />
          </View>
      </KeyboardAwareScrollView>
    </Background>
  );
}

const styles = StyleSheet.create({
  content: { paddingHorizontal: 24, paddingTop: 32 },
  subtitle: { fontFamily: theme.fonts.text400, fontSize: 14, lineHeight: 22, color: theme.colors.subtitle, marginBottom: 24 },
  formError: { fontFamily: theme.fonts.text400, fontSize: 13, color: theme.colors.primary, textAlign: 'center', marginBottom: 12 },
  button: { marginTop: 8 },
});
