import type { ReactNode } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Button } from './Button';
import { ModalView } from './ModalView';
import { theme } from '../global/theme';

type Props = {
  visible: boolean;
  title: ReactNode;
  description?: string;
  cancelLabel?: string;
  confirmLabel?: string;
  loading?: boolean;
  onCancel: () => void;
  onConfirm: () => void;
};

// Modal de confirmação (Não / Sim), no estilo do frame "Sair" do Figma.
// Usado para sair da conta e para excluir a conta.
export function ConfirmModal({
  visible,
  title,
  description,
  cancelLabel = 'Não',
  confirmLabel = 'Sim',
  loading = false,
  onCancel,
  onConfirm,
}: Props) {
  const { bottom } = useSafeAreaInsets();

  return (
    <ModalView visible={visible} closeModal={loading ? () => {} : onCancel}>
      <View style={[styles.content, { paddingBottom: bottom + 24 }]}>
        <Text style={styles.title}>{title}</Text>
        {!!description && <Text style={styles.description}>{description}</Text>}

        <View style={styles.buttons}>
          <View style={styles.button}>
            <Button title={cancelLabel} variant="outline" disabled={loading} onPress={onCancel} />
          </View>
          <View style={styles.button}>
            <Button title={confirmLabel} loading={loading} onPress={onConfirm} />
          </View>
        </View>
      </View>
    </ModalView>
  );
}

const styles = StyleSheet.create({
  content: { paddingHorizontal: 24, paddingTop: 40 },
  title: { textAlign: 'center', fontFamily: theme.fonts.title700, fontSize: 18, color: theme.colors.heading },
  description: {
    textAlign: 'center',
    fontFamily: theme.fonts.text400,
    fontSize: 14,
    lineHeight: 22,
    color: theme.colors.subtitle,
    marginTop: 12,
  },
  buttons: { flexDirection: 'row', marginTop: 32, gap: 8 },
  button: { flex: 1 },
});
