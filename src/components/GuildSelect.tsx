import { Image, Pressable, StyleSheet, Text, View, type PressableProps } from 'react-native';
import { Feather } from '@expo/vector-icons';

import { theme } from '../global/theme';
import type { GuildProps } from '../types';

type Props = PressableProps & { guild: GuildProps | null };

// Linha "Servidor" da tela de agendamento, com dois estados: vazio e selecionado.
export function GuildSelect({ guild, ...rest }: Props) {
  return (
    <Pressable style={({ pressed }) => [styles.container, pressed && styles.pressed]} {...rest}>
      {guild ? (
        <Image source={guild.icon} style={styles.icon} />
      ) : (
        <View style={styles.placeholder} />
      )}

      <View style={styles.content}>
        {guild ? (
          <>
            <Text style={styles.name}>{guild.name}</Text>
            <Text style={styles.game}>{guild.game}</Text>
          </>
        ) : (
          <Text style={styles.empty}>Selecione um servidor</Text>
        )}
      </View>

      <Feather name="chevron-right" size={18} color={theme.colors.heading} style={styles.arrow} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 68,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: theme.colors.border,
    overflow: 'hidden',
  },
  pressed: { opacity: 0.8 },
  icon: { width: 64, height: 68, borderRadius: 8 },
  placeholder: {
    width: 64,
    height: 68,
    backgroundColor: theme.colors.surface,
    borderRightWidth: 1,
    borderRightColor: theme.colors.border,
  },
  content: { flex: 1, justifyContent: 'center', marginLeft: 20 },
  name: { fontFamily: theme.fonts.title700, fontSize: 18, color: theme.colors.heading },
  game: { fontFamily: theme.fonts.text400, fontSize: 13, color: theme.colors.subtitle },
  empty: { fontFamily: theme.fonts.title700, fontSize: 18, color: theme.colors.heading, textAlign: 'center' },
  arrow: { marginRight: 24 },
});
