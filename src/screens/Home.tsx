import { useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Appointment } from '../components/Appointment';
import { Background } from '../components/Background';
import { ButtonAdd } from '../components/ButtonAdd';
import { CategoryList } from '../components/CategoryList';
import { ListHeader } from '../components/ListHeader';
import { Profile } from '../components/Profile';
import { ButtonSettings } from '../components/ButtonSettings';
import { theme } from '../global/theme';
import { ConfirmModal } from '../components/ConfirmModal';
import { useAppointments } from '../hooks/appointments';
import { useAuth } from '../hooks/auth';

export function Home() {
  const navigation = useNavigation();
  const { top, bottom } = useSafeAreaInsets();
  const { user } = useAuth();
  const { appointments, removeAppointment } = useAppointments();
  const [category, setCategory] = useState('');
  const [toDelete, setToDelete] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);

  // Tocar na categoria ativa de novo remove o filtro.
  function handleCategorySelect(categoryId: string) {
    setCategory((current) => (current === categoryId ? '' : categoryId));
  }

  const filtered = category ? appointments.filter((item) => item.categoryId === category) : appointments;

  return (
    <Background>
      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: bottom + 24 }}
        ListHeaderComponent={
          <View>
            <View style={[styles.header, { marginTop: top + 10 }]}>
              <Profile name={user?.name ?? ''} onPress={() => navigation.navigate('Settings')} />
              <View style={styles.actions}>
                <ButtonSettings onPress={() => navigation.navigate('Settings')} />
                <ButtonAdd onPress={() => navigation.navigate('AppointmentCreate')} />
              </View>
            </View>

            <View style={styles.categories}>
              <CategoryList categorySelected={category} setCategory={handleCategorySelect} />
            </View>

            <View style={styles.listHeader}>
              <ListHeader title="Partidas agendadas" subtitle={`Total ${filtered.length}`} />
            </View>

            {filtered.length > 0 && <Text style={styles.hint}>Segure uma partida para excluí-la</Text>}
          </View>
        }
        ListEmptyComponent={<Text style={styles.empty}>Nenhuma partida por aqui ainda.</Text>}
        renderItem={({ item }) => (
          <Appointment
            data={item}
            onPress={() => navigation.navigate('AppointmentDetails', { appointmentId: item.id })}
            onLongPress={() => setToDelete(item.id)}
          />
        )}
      />

      <ConfirmModal
        visible={!!toDelete}
        title="Excluir partida agendada?"
        description="Essa ação não pode ser desfeita."
        cancelLabel="Cancelar"
        confirmLabel="Excluir"
        loading={deleting}
        onCancel={() => setToDelete(null)}
        onConfirm={async () => {
          if (!toDelete) return;
          setDeleting(true);
          await removeAppointment(toDelete);
          setDeleting(false);
          setToDelete(null);
        }}
      />
    </Background>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 24,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  actions: { flexDirection: 'row', gap: 8, marginLeft: 12 },
  categories: { marginTop: 40 },
  listHeader: { marginTop: 40, marginBottom: 24 },
  empty: { textAlign: 'center', fontFamily: theme.fonts.text400, fontSize: 14, color: theme.colors.subtitle, marginTop: 24 },
  hint: { paddingHorizontal: 24, fontFamily: theme.fonts.text400, fontSize: 12, color: theme.colors.subtitle, marginBottom: 16 },
});
