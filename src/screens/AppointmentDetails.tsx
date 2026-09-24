import { Alert, FlatList, Image, Linking, Pressable, Share, StyleSheet, Text, View } from 'react-native';
import { useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { Fontisto } from '@expo/vector-icons';
import { useNavigation, useRoute, type RouteProp } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Background } from '../components/Background';
import { ConfirmModal } from '../components/ConfirmModal';
import { ButtonIcon } from '../components/ButtonIcon';
import { Header } from '../components/Header';
import { ListDivider } from '../components/ListDivider';
import { ListHeader } from '../components/ListHeader';
import { Member } from '../components/Member';
import { otherMembers } from '../data/appointments';
import { useAppointments } from '../hooks/appointments';
import { useAuth } from '../hooks/auth';
import type { MemberProps } from '../types';
import { theme } from '../global/theme';
import type { RootStackParamList } from '../routes';

const DISCORD_URL = 'https://discord.com'; // no app real seria o convite do servidor

export function AppointmentDetails() {
  const { params } = useRoute<RouteProp<RootStackParamList, 'AppointmentDetails'>>();
  const { bottom } = useSafeAreaInsets();
  const { user } = useAuth();
  const { appointments, removeAppointment } = useAppointments();
  const navigation = useNavigation();
  const [deleteVisible, setDeleteVisible] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const appointment = appointments.find((item) => item.id === params.appointmentId) ?? appointments[0];

  // O primeiro jogador é o próprio usuário logado; os demais são de exemplo.
  const members: MemberProps[] = [{ id: 'me', name: user?.name ?? 'Você', status: 'available' }, ...otherMembers];

  if (!appointment) return null;

  function handleShare() {
    Share.share({ message: `Junte-se ao servidor ${appointment.guild.name} — ${appointment.date}: ${DISCORD_URL}` });
  }

  function handleOpenDiscord() {
    Linking.openURL(DISCORD_URL).catch(() => Alert.alert('Erro', 'Não foi possível abrir o Discord.'));
  }

  return (
    <Background>
      <Header
        title="Detalhes"
        action={
          appointment.isOwner ? (
            <View style={styles.headerActions}>
              <Pressable onPress={() => setDeleteVisible(true)} hitSlop={12} accessibilityLabel="Excluir partida">
                <Fontisto name="trash" size={18} color={theme.colors.primary} />
              </Pressable>
              <Pressable onPress={handleShare} hitSlop={12} accessibilityLabel="Compartilhar">
                <Fontisto name="share" size={20} color={theme.colors.primary} />
              </Pressable>
            </View>
          ) : undefined
        }
      />

      <View style={styles.banner}>
        <Image source={require('../assets/banner-guild.png')} style={styles.bannerImage} resizeMode="cover" />
        <LinearGradient
          colors={['rgba(14,22,71,0.1)', 'rgba(14,22,71,0.55)', theme.colors.background]}
          locations={[0, 0.4, 0.64]}
          style={styles.bannerFade}
        />

        <View style={styles.bannerContent}>
          <Text style={styles.title}>{appointment.guild.name}</Text>
          <Text style={styles.subtitle}>{appointment.description}</Text>
        </View>
      </View>

      <View style={styles.listHeader}>
        <ListHeader title="Jogadores" subtitle={`Total ${members.length}`} />
      </View>

      <FlatList
        data={members}
        keyExtractor={(item) => item.id}
        style={styles.members}
        contentContainerStyle={styles.membersContent}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => <ListDivider style={styles.divider} />}
        renderItem={({ item }) => <Member data={item} />}
      />

      <View style={[styles.footer, { paddingBottom: bottom + 8 }]}>
        <ButtonIcon title="Entrar na partida" onPress={handleOpenDiscord} />
      </View>

      <ConfirmModal
        visible={deleteVisible}
        title="Excluir partida agendada?"
        description="Essa ação não pode ser desfeita."
        cancelLabel="Cancelar"
        confirmLabel="Excluir"
        loading={deleting}
        onCancel={() => setDeleteVisible(false)}
        onConfirm={async () => {
          setDeleting(true);
          await removeAppointment(appointment.id);
          setDeleting(false);
          setDeleteVisible(false);
          navigation.goBack();
        }}
      />
    </Background>
  );
}

const styles = StyleSheet.create({
  headerActions: { flexDirection: 'row', alignItems: 'center', gap: 20 },
  banner: { width: '100%', height: 232, justifyContent: 'flex-end' },
  bannerImage: { position: 'absolute', top: 0, width: '100%', height: 150 },
  bannerFade: StyleSheet.absoluteFill,
  bannerContent: { paddingHorizontal: 24, marginBottom: 24 },
  title: { fontFamily: theme.fonts.title700, fontSize: 28, color: theme.colors.heading },
  subtitle: { fontFamily: theme.fonts.text400, fontSize: 13, lineHeight: 21, color: theme.colors.heading, marginTop: 8 },
  listHeader: { marginTop: 27 },
  members: { marginTop: 27 },
  membersContent: { paddingLeft: 24 },
  divider: { marginVertical: 12, marginLeft: 64 },
  footer: { paddingHorizontal: 24, paddingTop: 16 },
});
