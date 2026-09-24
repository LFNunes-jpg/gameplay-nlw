import { StyleSheet, View, type ViewStyle } from 'react-native';

import { theme } from '../global/theme';

export function ListDivider({ style }: { style?: ViewStyle }) {
  return <View style={[styles.container, style]} />;
}

const styles = StyleSheet.create({ container: { height: 1, backgroundColor: theme.colors.surface } });
