# GamePlay — protótipo (NLW Together)

Telas: Login, Cadastro, Home, Detalhes do servidor, Agendar (com seleção de servidor) e Configurações (sair e excluir conta). É possível excluir uma partida agendada segurando o card na Home ou pelo ícone de lixeira em Detalhes.
Stack: React Native + Expo + TypeScript + React Navigation.

## Rodar
    npm install
    npx expo start      # abra no Expo Go (celular) ou pressione a / i para emulador

## Estrutura
- `src/global/theme.ts`  cores e fontes (tokens do Figma)
- `src/components/`      componentes reutilizáveis (Category, Appointment, Header, ButtonIcon...)
- `src/screens/`         SignIn, Home, AppointmentDetails, AppointmentCreate
- `src/routes/`          navegação (native stack, tipada)
- `src/data/`            dados mock
- `src/assets/`          imagens recortadas do Figma
- `src/hooks/`           contextos: autenticação e partidas
- `src/services/`        login/cadastro (hash de senha) e armazenamento local (AsyncStorage)
- `src/utils/`           validações e formatação

## Observações
- Contas e partidas ficam salvas só no aparelho (AsyncStorage); não há servidor.
- O ícone do Dota 2 (`src/assets/dota2.png`) é provisório: troque pelo arquivo oficial mantendo o nome.
