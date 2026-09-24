import { Image, StyleSheet, Text, View } from 'react-native';

import { UserAvatar } from './UserAvatar';
import { theme } from '../global/theme';
import type { MemberProps } from '../types';

export function Member({ data }: { data: MemberProps }) {
  const isAvailable = data.status === 'available';
  const color = isAvailable ? theme.colors.on : theme.colors.primary;

  return (
    <View style={styles.container}>
      {data.avatar ? (
        <Image source={data.avatar} style={styles.avatar} />
      ) : (
        <View style={styles.avatar}>
          <UserAvatar name={data.name} />
        </View>
      )}

      <View>
        <Text style={styles.name}>{data.name}</Text>
        <View style={styles.status}>
          <View style={[styles.dot, { backgroundColor: color }]} />
          <Text style={styles.statusText}>{isAvailable ? 'Disponível' : 'Ocupado'}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flexDirection: 'row', alignItems: 'center' },
  avatar: { width: 48, height: 48, borderRadius: 8, marginRight: 16 },
  name: { fontFamily: theme.fonts.title700, fontSize: 18, color: theme.colors.heading },
  status: { flexDirection: 'row', alignItems: 'center', marginTop: 2 },
  dot: { width: 8, height: 8, borderRadius: 4, marginRight: 9 },
  statusText: { fontFamily: theme.fonts.text400, fontSize: 13, color: theme.colors.subtitle },
});
