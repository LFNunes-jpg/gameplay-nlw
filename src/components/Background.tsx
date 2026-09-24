import type { ReactNode } from 'react';
import { StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import { theme } from '../global/theme';

type Props = { children: ReactNode };

// Fundo padrão de todas as telas. Fica sólido até ~1/3 da tela para os banners
// (que "derretem" no fundo com um gradiente) casarem sem emenda.
export function Background({ children }: Props) {
  return (
    <LinearGradient
      style={styles.container}
      colors={[theme.colors.background, theme.colors.background, theme.colors.backgroundEnd]}
      locations={[0, 0.35, 1]}
    >
      {children}
    </LinearGradient>
  );
}

const styles = StyleSheet.create({ container: { flex: 1 } });
