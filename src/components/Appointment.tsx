import { Image, Pressable, StyleSheet, Text, View, type PressableProps } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { theme } from '../global/theme';
import { categories } from '../data/categories';
import type { AppointmentProps } from '../types';

type Props = PressableProps & { data: AppointmentProps; onLongPress?: () => void };

export function Appointment({ data, onLongPress, ...rest }: Props) {
  const { guild, date, categoryId, isOwner } = data;
  const category = categories.find((item) => item.id === categoryId);
  const roleColor = isOwner ? theme.colors.primary : theme.colors.on;

  return (
    <Pressable style={({ pressed }) => [styles.container, pressed && styles.pressed]} {...rest}>
      <Image source={guild.icon} style={styles.icon} />

      <View style={styles.content}>
        <View style={styles.row}>
          <Text style={styles.title} numberOfLines={1}>
            {guild.name}
          </Text>
          <Text style={styles.category}>{category?.label}</Text>
        </View>

        <View style={styles.row}>
          <View style={styles.info}>
            <MaterialCommunityIcons name="calendar-blank" size={16} color={theme.colors.primary} />
            <Text style={styles.date}>{date}</Text>
          </View>

          <View style={styles.info}>
            <MaterialCommunityIcons name="account" size={16} color={roleColor} />
            <Text style={[styles.role, { color: roleColor }]}>{isOwner ? 'Anfitrião' : 'Visitante'}</Text>
          </View>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: { flexDirection: 'row', paddingLeft: 24, marginBottom: 32 },
  pressed: { opacity: 0.7 },
  icon: { width: 64, height: 68, borderRadius: 8 },
  // A divisória é a borda inferior do conteúdo: começa depois do ícone e vai até a borda da tela.
  content: {
    flex: 1,
    marginLeft: 20,
    height: 69,
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.surface,
  },
  row: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingRight: 24 },
  title: { flex: 1, fontFamily: theme.fonts.title700, fontSize: 18, color: theme.colors.heading, marginBottom: 8 },
  category: { fontFamily: theme.fonts.text400, fontSize: 13, color: theme.colors.subtitle, marginBottom: 8 },
  info: { flexDirection: 'row', alignItems: 'center' },
  date: { fontFamily: theme.fonts.text500, fontSize: 13, color: theme.colors.heading, marginLeft: 8 },
  role: { fontFamily: theme.fonts.text500, fontSize: 13, marginLeft: 6 },
});
