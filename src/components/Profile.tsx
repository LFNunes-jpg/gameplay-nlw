import { Pressable, StyleSheet, Text, View } from 'react-native';

import { UserAvatar } from './UserAvatar';
import { theme } from '../global/theme';

type Props = { name: string; onPress?: () => void };

// Saudação do topo da Home. Tocar no perfil abre o "Deseja sair?".
export function Profile({ name, onPress }: Props) {
  const firstName = name.trim().split(/\s+/)[0];

  return (
    <Pressable style={styles.container} onPress={onPress} accessibilityLabel="Perfil">
      <View style={styles.avatar}>
        <UserAvatar name={name} />
      </View>

      <View>
        <Text style={styles.greeting} numberOfLines={1}>
          Olá, <Text style={styles.username}>{firstName}</Text>
        </Text>
        <Text style={styles.message}>Hoje é dia de vitória</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: { flexDirection: 'row', alignItems: 'center', flexShrink: 1 },
  avatar: { marginRight: 12 },
  greeting: { fontFamily: theme.fonts.title500, fontSize: 24, color: theme.colors.heading },
  username: { fontFamily: theme.fonts.title700 },
  message: { fontFamily: theme.fonts.text400, fontSize: 13, color: theme.colors.subtitle },
});
