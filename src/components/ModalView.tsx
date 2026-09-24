import type { ReactNode } from 'react';
import { Modal, Pressable, StyleSheet, View, type DimensionValue } from 'react-native';

import { theme } from '../global/theme';

type Props = {
  visible: boolean;
  closeModal: () => void;
  children: ReactNode;
  height?: DimensionValue; // sem altura definida, o modal se ajusta ao conteúdo
  showHandle?: boolean;
};

// Bottom sheet genérico: usado no "Deseja sair?" e na lista de servidores.
export function ModalView({ visible, closeModal, children, height, showHandle = false }: Props) {
  return (
    <Modal transparent animationType="slide" visible={visible} statusBarTranslucent onRequestClose={closeModal}>
      <View style={styles.overlay}>
        {/* Tocar fora do modal fecha */}
        <Pressable style={StyleSheet.absoluteFill} onPress={closeModal} accessibilityLabel="Fechar" />

        <View style={[styles.sheet, height !== undefined && { height }]}>
          {showHandle && <View style={styles.handle} />}
          {children}
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: { flex: 1, justifyContent: 'flex-end', backgroundColor: 'rgba(6,10,32,0.85)' },
  sheet: { backgroundColor: theme.colors.sheet, borderTopLeftRadius: 8, borderTopRightRadius: 8 },
  handle: {
    alignSelf: 'center',
    width: 40,
    height: 2,
    borderRadius: 1,
    backgroundColor: theme.colors.outline,
    marginTop: 12,
    marginBottom: 32,
  },
});
