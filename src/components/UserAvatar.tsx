import { StyleSheet, Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import { theme } from '../global/theme';
import { getInitials } from '../utils/validators';

type Props = { name: string; size?: number };

// Avatar com as iniciais do nome (usuários não têm foto neste protótipo).
export function UserAvatar({ name, size = 48 }: Props) {
  return (
    <LinearGradient
      colors={[theme.colors.primary, '#5B2A9E']}
      style={[styles.container, { width: size, height: size }]}
    >
      <Text style={[styles.initials, { fontSize: size * 0.42 }]}>{getInitials(name)}</Text>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { borderRadius: 8, alignItems: 'center', justifyContent: 'center' },
  initials: { fontFamily: theme.fonts.title700, color: theme.colors.heading },
});
