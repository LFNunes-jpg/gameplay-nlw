import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Background } from '../components/Background';
import { Button } from '../components/Button';
import { CategoryList } from '../components/CategoryList';
import { GuildModal } from '../components/GuildModal';
import { GuildSelect } from '../components/GuildSelect';
import { Header } from '../components/Header';
import { KeyboardAwareScrollView } from '../components/KeyboardAwareScrollView';
import { SmallInput } from '../components/SmallInput';
import { TextArea } from '../components/TextArea';
import { theme } from '../global/theme';
import { useAppointments } from '../hooks/appointments';
import type { GuildProps } from '../types';
import { isValidDayMonth, isValidTime, pad } from '../utils/validators';

export function AppointmentCreate() {
  const navigation = useNavigation();
  const { bottom } = useSafeAreaInsets();
  const { addAppointment } = useAppointments();

  // Estados da tela (frames "Agendar", "Categoria selecionada" e "Servidor selecionado")
  const [category, setCategory] = useState('');
  const [guild, setGuild] = useState<GuildProps | null>(null);
  const [guildModalVisible, setGuildModalVisible] = useState(false);
  const [day, setDay] = useState('');
  const [month, setMonth] = useState('');
  const [hour, setHour] = useState('');
  const [minute, setMinute] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);

  // Tocar na categoria já escolhida desmarca (volta ao estado anterior).
  function handleCategorySelect(categoryId: string) {
    setCategory((current) => (current === categoryId ? '' : categoryId));
  }

  function handleGuildSelect(selected: GuildProps) {
    setGuild(selected);
    setGuildModalVisible(false);
  }

  function validate(): string {
    if (!category) return 'Escolha uma categoria.';
    if (!guild) return 'Selecione um servidor.';
    if (!isValidDayMonth(Number(day), Number(month))) return 'Informe um dia e mês válidos (ex.: 18 / 06).';
    if (!isValidTime(Number(hour), Number(minute))) return 'Informe um horário válido (ex.: 21 : 00).';
    if (!description.trim()) return 'Escreva uma descrição para a partida.';
    return '';
  }

  async function handleSave() {
    const message = validate();
    setError(message);
    if (message || !guild) return;

    setSaving(true);
    await addAppointment({
      guild,
      categoryId: category,
      date: `${pad(day)}/${pad(month)} às ${pad(hour)}:${pad(minute)}h`,
      description: description.trim(),
    });
    navigation.navigate('Home'); // a nova partida já aparece no topo da lista
  }

  return (
    <Background>
      <Header title="Agendar partida" />

      <KeyboardAwareScrollView bottomInset={bottom + 24}>
          <Text style={[styles.label, styles.padded, styles.firstLabel]}>Categoria</Text>
          <CategoryList hasCheckBox categorySelected={category} setCategory={handleCategorySelect} />

          <View style={[styles.padded, styles.section]}>
            <GuildSelect guild={guild} onPress={() => setGuildModalVisible(true)} />
          </View>

          <View style={[styles.padded, styles.section, styles.dateRow]}>
            <View>
              <Text style={styles.label}>Dia e mês</Text>
              <View style={styles.inputs}>
                <SmallInput value={day} onChangeText={setDay} />
                <Text style={styles.divider}>/</Text>
                <SmallInput value={month} onChangeText={setMonth} />
              </View>
            </View>

            <View>
              <Text style={[styles.label, styles.alignRight]}>Horário</Text>
              <View style={styles.inputs}>
                <SmallInput value={hour} onChangeText={setHour} />
                <Text style={styles.divider}>:</Text>
                <SmallInput value={minute} onChangeText={setMinute} />
              </View>
            </View>
          </View>

          <View style={[styles.padded, styles.section]}>
            <View style={styles.descriptionHeader}>
              <Text style={styles.label}>Descrição</Text>
              <Text style={styles.limit}>Max 100 caracteres</Text>
            </View>
            <TextArea maxLength={100} value={description} onChangeText={setDescription} />
          </View>

          <View style={[styles.padded, styles.submit]}>
            {!!error && <Text style={styles.error}>{error}</Text>}
            <Button title="Agendar" loading={saving} onPress={handleSave} />
          </View>
      </KeyboardAwareScrollView>

      <GuildModal
        visible={guildModalVisible}
        closeModal={() => setGuildModalVisible(false)}
        onSelect={handleGuildSelect}
      />
    </Background>
  );
}

const styles = StyleSheet.create({
  padded: { paddingHorizontal: 24 },
  section: { marginTop: 32 },
  label: { fontFamily: theme.fonts.title700, fontSize: 18, color: theme.colors.heading },
  firstLabel: { marginTop: 32, marginBottom: 12 },
  alignRight: { textAlign: 'right' },
  dateRow: { flexDirection: 'row', justifyContent: 'space-between' },
  inputs: { flexDirection: 'row', alignItems: 'center', marginTop: 12 },
  divider: { width: 12, textAlign: 'center', fontFamily: theme.fonts.text400, fontSize: 15, color: theme.colors.subtitle },
  descriptionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  limit: { fontFamily: theme.fonts.text400, fontSize: 13, color: theme.colors.subtitle },
  submit: { marginTop: 32 },
  error: { fontFamily: theme.fonts.text400, fontSize: 13, color: theme.colors.primary, textAlign: 'center', marginBottom: 12 },
});
