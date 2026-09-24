import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Background } from '../components/Background';
import { ConfirmModal } from '../components/ConfirmModal';
import { Header } from '../components/Header';
import { ListDivider } from '../components/ListDivider';
import { UserAvatar } from '../components/UserAvatar';
import { theme } from '../global/theme';
import { useAuth } from '../hooks/auth';

type Option = {
  icon: keyof typeof Feather.glyphMap;
  label: string;
  danger?: boolean;
  onPress: () => void;
};

export function Settings() {
  const { user, signOut, deleteAccount } = useAuth();
  const { bottom } = useSafeAreaInsets();
  const [logoutVisible, setLogoutVisible] = useState(false);
  const [deleteVisible, setDeleteVisible] = useState(false);
  const [deleting, setDeleting] = useState(false);

  async function handleDelete() {
    setDeleting(true);
    try {
      await deleteAccount(); // remove a conta; sem usuário, as rotas voltam para o Login
    } catch {
      setDeleting(false);
    }
  }

  const options: Option[] = [
    { icon: 'log-out', label: 'Sair da conta', onPress: () => setLogoutVisible(true) },
    { icon: 'trash-2', label: 'Excluir conta', danger: true, onPress: () => setDeleteVisible(true) },
  ];

  return (
    <Background>
      <Header title="Configurações" />

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: bottom + 24 }}>
        <View style={styles.profile}>
          <UserAvatar name={user?.name ?? ''} size={64} />
          <View style={styles.profileInfo}>
            <Text style={styles.name} numberOfLines={1}>
              {user?.name}
            </Text>
            <Text style={styles.email} numberOfLines={1}>
              {user?.email}
            </Text>
          </View>
        </View>

        <Text style={styles.section}>Conta</Text>
        <ListDivider style={styles.divider} />

        {options.map((option) => (
          <View key={option.label}>
            <Pressable style={({ pressed }) => [styles.row, pressed && styles.pressed]} onPress={option.onPress}>
              <Feather name={option.icon} size={20} color={option.danger ? theme.colors.primary : theme.colors.heading} />
              <Text style={[styles.label, option.danger && styles.danger]}>{option.label}</Text>
              <Feather name="chevron-right" size={18} color={theme.colors.subtitle} />
            </Pressable>
            <ListDivider style={styles.divider} />
          </View>
        ))}
      </ScrollView>

      <ConfirmModal
        visible={logoutVisible}
        title={
          <>
            Deseja sair do Game<Text style={styles.highlight}>Play</Text>?
          </>
        }
        onCancel={() => setLogoutVisible(false)}
        onConfirm={() => {
          setLogoutVisible(false);
          signOut(); // limpa a sessão; as rotas voltam para o Login
        }}
      />

      <ConfirmModal
        visible={deleteVisible}
        title="Excluir sua conta?"
        description="Sua conta e todas as suas partidas serão apagadas deste aparelho. Essa ação não pode ser desfeita."
        cancelLabel="Cancelar"
        confirmLabel="Excluir"
        loading={deleting}
        onCancel={() => setDeleteVisible(false)}
        onConfirm={handleDelete}
      />
    </Background>
  );
}

const styles = StyleSheet.create({
  profile: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 24, paddingTop: 32, marginBottom: 40 },
  profileInfo: { flex: 1, marginLeft: 16 },
  name: { fontFamily: theme.fonts.title700, fontSize: 24, color: theme.colors.heading },
  email: { fontFamily: theme.fonts.text400, fontSize: 13, color: theme.colors.subtitle },
  section: { fontFamily: theme.fonts.title700, fontSize: 18, color: theme.colors.heading, paddingHorizontal: 24, marginBottom: 16 },
  divider: { marginLeft: 24, backgroundColor: theme.colors.border },
  row: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 24, paddingVertical: 18 },
  pressed: { opacity: 0.7 },
  label: { flex: 1, marginLeft: 16, fontFamily: theme.fonts.text500, fontSize: 15, color: theme.colors.heading },
  danger: { color: theme.colors.primary },
  highlight: { color: theme.colors.primary },
});
