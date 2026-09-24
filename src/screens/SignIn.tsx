import { useRef, useState } from 'react';
import { Image, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Background } from '../components/Background';
import { Button } from '../components/Button';
import { ButtonIcon } from '../components/ButtonIcon';
import { Input } from '../components/Input';
import { KeyboardAwareScrollView } from '../components/KeyboardAwareScrollView';
import { theme } from '../global/theme';
import { useAuth } from '../hooks/auth';
import { AuthError } from '../services/auth';
import { isValidEmail } from '../utils/validators';

export function SignIn() {
  const navigation = useNavigation();
  const { signIn, signInWithDiscord } = useAuth();
  const { top, bottom } = useSafeAreaInsets();
  const passwordRef = useRef<TextInput>(null);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{ email?: string; password?: string; form?: string }>({});
  const [loading, setLoading] = useState(false);
  const [discordLoading, setDiscordLoading] = useState(false);

  async function handleSignIn() {
    const nextErrors: typeof errors = {};
    if (!isValidEmail(email)) nextErrors.email = 'Informe um e-mail válido.';
    if (!password) nextErrors.password = 'Informe sua senha.';
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;

    setLoading(true);
    try {
      await signIn({ email, password });
      // Não precisa navegar: ao definir o usuário, as rotas trocam sozinhas para a Home.
    } catch (error) {
      setErrors({ form: error instanceof AuthError ? error.message : 'Não foi possível entrar. Tente novamente.' });
      setLoading(false);
    }
  }

  async function handleDiscord() {
    setDiscordLoading(true);
    try {
      await signInWithDiscord();
    } catch {
      setErrors({ form: 'Não foi possível entrar com o Discord.' });
      setDiscordLoading(false);
    }
  }

  return (
    <Background>
      <KeyboardAwareScrollView contentContainerStyle={{ paddingTop: top + 16 }} bottomInset={bottom + 32}>
          <View style={styles.banner}>
            <Image source={require('../assets/banner-login.png')} style={styles.image} />
            <LinearGradient colors={['rgba(14,22,71,0)', theme.colors.background]} style={styles.fade} />
          </View>

          <View style={styles.content}>
            <Text style={styles.title}>{'Conecte-se\ne organize suas\njogatinas'}</Text>
            <Text style={styles.subtitle}>{'Crie grupos para jogar seus games\nfavoritos com seus amigos'}</Text>

            <View style={styles.form}>
              <Input
                label="E-mail"
                placeholder="voce@email.com"
                keyboardType="email-address"
                autoComplete="email"
                textContentType="emailAddress"
                returnKeyType="next"
                value={email}
                onChangeText={setEmail}
                onSubmitEditing={() => passwordRef.current?.focus()}
                error={errors.email}
              />
              <Input
                label="Senha"
                placeholder="Sua senha"
                secureTextEntry
                autoComplete="password"
                textContentType="password"
                returnKeyType="done"
                inputRef={passwordRef}
                value={password}
                onChangeText={setPassword}
                onSubmitEditing={handleSignIn}
                error={errors.password}
              />

              {!!errors.form && <Text style={styles.formError}>{errors.form}</Text>}

              <Button title="Entrar" loading={loading} onPress={handleSignIn} />
            </View>

            <View style={styles.separator}>
              <View style={styles.line} />
              <Text style={styles.or}>ou</Text>
              <View style={styles.line} />
            </View>

            <ButtonIcon title="Entrar com Discord" loading={discordLoading} onPress={handleDiscord} />

            <View style={styles.footer}>
              <Text style={styles.footerText}>Ainda não tem conta? </Text>
              <Pressable onPress={() => navigation.navigate('SignUp')} hitSlop={8}>
                <Text style={styles.link}>Criar conta</Text>
              </Pressable>
            </View>
          </View>
      </KeyboardAwareScrollView>
    </Background>
  );
}

const styles = StyleSheet.create({
  // A ilustração é cortada embaixo para sobrar espaço ao formulário.
  banner: { height: 220, overflow: 'hidden' },
  image: { width: '100%', height: 296 },
  fade: { position: 'absolute', left: 0, right: 0, bottom: 0, height: 100 },
  content: { paddingHorizontal: 24, alignItems: 'center' },
  title: {
    textAlign: 'center',
    fontFamily: theme.fonts.title700,
    fontSize: 34,
    lineHeight: 36,
    color: theme.colors.heading,
  },
  subtitle: {
    textAlign: 'center',
    fontFamily: theme.fonts.text400,
    fontSize: 14,
    lineHeight: 22,
    color: theme.colors.subtitle,
    marginTop: 12,
    marginBottom: 28,
  },
  form: { width: '100%' },
  formError: { fontFamily: theme.fonts.text400, fontSize: 13, color: theme.colors.primary, marginBottom: 12, textAlign: 'center' },
  separator: { width: '100%', flexDirection: 'row', alignItems: 'center', marginVertical: 20 },
  line: { flex: 1, height: 1, backgroundColor: theme.colors.surface },
  or: { fontFamily: theme.fonts.text400, fontSize: 13, color: theme.colors.subtitle, marginHorizontal: 12 },
  footer: { flexDirection: 'row', marginTop: 24 },
  footerText: { fontFamily: theme.fonts.text400, fontSize: 14, color: theme.colors.subtitle },
  link: { fontFamily: theme.fonts.text500, fontSize: 14, color: theme.colors.primary },
});
