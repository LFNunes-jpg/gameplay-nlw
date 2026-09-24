import { StyleSheet, Text, View } from 'react-native';

import { theme } from '../global/theme';

type Props = { title: string; subtitle: string };

export function ListHeader({ title, subtitle }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subtitle}>{subtitle}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 24 },
  title: { fontFamily: theme.fonts.title700, fontSize: 18, color: theme.colors.heading },
  subtitle: { fontFamily: theme.fonts.text400, fontSize: 13, color: theme.colors.subtitle },
});
