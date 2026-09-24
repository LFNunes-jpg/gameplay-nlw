import { FlatList, Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ListDivider } from './ListDivider';
import { ModalView } from './ModalView';
import { guilds } from '../data/guilds';
import { theme } from '../global/theme';
import type { GuildProps } from '../types';

type Props = {
  visible: boolean;
  closeModal: () => void;
  onSelect: (guild: GuildProps) => void;
};

// Lista "Selecione um servidor" (frame do Figma).
export function GuildModal({ visible, closeModal, onSelect }: Props) {
  const { bottom } = useSafeAreaInsets();

  return (
    <ModalView visible={visible} closeModal={closeModal} height="86%" showHandle>
      <FlatList
        data={guilds}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: bottom + 16 }}
        ItemSeparatorComponent={() => <ListDivider style={styles.divider} />}
        ListHeaderComponent={<ListDivider style={styles.divider} />}
        renderItem={({ item }) => (
          <Pressable style={({ pressed }) => [styles.row, pressed && styles.pressed]} onPress={() => onSelect(item)}>
            <Image source={item.icon} style={styles.icon} />

            <View style={styles.content}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.role}>{item.owner ? 'Administrador' : 'Convidado'}</Text>
            </View>

            <Feather name="chevron-right" size={18} color={theme.colors.heading} />
          </Pressable>
        )}
      />
    </ModalView>
  );
}

const styles = StyleSheet.create({
  divider: { marginVertical: 12, marginLeft: 24, backgroundColor: theme.colors.border },
  row: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 24 },
  pressed: { opacity: 0.7 },
  icon: { width: 64, height: 68, borderRadius: 8 },
  content: { flex: 1, marginLeft: 20 },
  name: { fontFamily: theme.fonts.title700, fontSize: 18, color: theme.colors.heading },
  role: { fontFamily: theme.fonts.text400, fontSize: 13, color: theme.colors.subtitle },
});
