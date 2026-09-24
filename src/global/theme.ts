/**
 * Design tokens do protótipo (valores amostrados direto das telas do Figma).
 * Todo estilo do app consome estes valores — nenhuma cor/fonte "solta" nos componentes.
 */
export const theme = {
  colors: {
    primary: '#E51C44', // botões, ícones de destaque, "Anfitrião"
    primaryDark: '#991F36', // divisória do botão Discord
    on: '#32BD50', // "Visitante" e "Disponível"

    heading: '#DDE3F0', // títulos e textos principais
    subtitle: '#ABB1CC', // textos secundários

    background: '#0E1647',
    backgroundEnd: '#0A1033',
    surface: '#1D2766', // inputs, categoria selecionada, divisórias
    surfaceDark: '#1A235B', // cards de categoria / topo do header
    border: '#202C78', // bordas de cards e inputs
    checkboxOff: '#111B4B',
    sheet: '#0C1340', // fundo dos modais (bottom sheet)
    outline: '#3A4BC0', // borda do botão secundário
  },
  fonts: {
    title500: 'Rajdhani_500Medium',
    title700: 'Rajdhani_700Bold',
    text400: 'Inter_400Regular',
    text500: 'Inter_500Medium',
  },
} as const;
