import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { Keyboard, ScrollView, TextInput, type ScrollViewProps } from 'react-native';

type KeyboardAwareContextData = { ensureVisible: () => void };

const KeyboardAwareContext = createContext<KeyboardAwareContextData>({ ensureVisible: () => {} });

// Os campos de texto chamam isto ao receber foco (fora de um KeyboardAwareScrollView não faz nada).
export const useKeyboardAware = () => useContext(KeyboardAwareContext);

type Props = ScrollViewProps & {
  bottomInset?: number; // espaço extra no fim da rolagem (ex.: área segura inferior)
};

/**
 * ScrollView que impede o teclado de cobrir o campo em foco:
 *  1. guarda a posição do topo do teclado quando ele abre;
 *  2. acrescenta ao fim do conteúdo o espaço do teclado (assim dá para rolar até o último campo);
 *  3. mede o campo focado e, se ele ficar atrás do teclado, rola só o necessário.
 * Funciona igual em Android e iOS (não depende de KeyboardAvoidingView).
 */
export function KeyboardAwareScrollView({ children, contentContainerStyle, bottomInset = 0, ...rest }: Props) {
  const scrollRef = useRef<ScrollView>(null);
  const scrollY = useRef(0);
  const keyboardTop = useRef<number | null>(null);
  const [keyboardHeight, setKeyboardHeight] = useState(0);

  const ensureVisible = useCallback(() => {
    const top = keyboardTop.current;
    if (top === null) return; // teclado fechado: o keyboardDidShow cuida disso quando abrir

    // Pequeno atraso para o layout já ter recebido o espaço extra do teclado.
    setTimeout(() => {
      const input = TextInput.State.currentlyFocusedInput?.();
      input?.measure((_x, _y, _width, height, _pageX, pageY) => {
        const overlap = pageY + height + 32 - top;
        if (overlap > 0) scrollRef.current?.scrollTo({ y: scrollY.current + overlap, animated: true });
      });
    }, 80);
  }, []);

  useEffect(() => {
    const show = Keyboard.addListener('keyboardDidShow', (event) => {
      keyboardTop.current = event.endCoordinates.screenY;
      setKeyboardHeight(event.endCoordinates.height);
      ensureVisible();
    });
    const hide = Keyboard.addListener('keyboardDidHide', () => {
      keyboardTop.current = null;
      setKeyboardHeight(0);
    });
    return () => {
      show.remove();
      hide.remove();
    };
  }, [ensureVisible]);

  const value = useMemo(() => ({ ensureVisible }), [ensureVisible]);

  return (
    <KeyboardAwareContext.Provider value={value}>
      <ScrollView
        ref={scrollRef}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="on-drag"
        scrollEventThrottle={16}
        onScroll={(event) => {
          scrollY.current = event.nativeEvent.contentOffset.y;
        }}
        contentContainerStyle={[contentContainerStyle, { paddingBottom: bottomInset + keyboardHeight }]}
        {...rest}
      >
        {children}
      </ScrollView>
    </KeyboardAwareContext.Provider>
  );
}
