import { NavigationContainer, DarkTheme, type Theme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { theme } from '../global/theme';
import { useAuth } from '../hooks/auth';
import { SignIn } from '../screens/SignIn';
import { SignUp } from '../screens/SignUp';
import { Home } from '../screens/Home';
import { AppointmentDetails } from '../screens/AppointmentDetails';
import { AppointmentCreate } from '../screens/AppointmentCreate';
import { Settings } from '../screens/Settings';

export type RootStackParamList = {
  SignIn: undefined;
  SignUp: undefined;
  Home: undefined;
  AppointmentDetails: { appointmentId: string };
  AppointmentCreate: undefined;
  Settings: undefined;
};

declare global {
  // Deixa useNavigation() tipado em todo o app.
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

const Stack = createNativeStackNavigator<RootStackParamList>();

// Cada tela desenha o próprio <Background />, então o container fica transparente.
const navigationTheme: Theme = {
  ...DarkTheme,
  colors: { ...DarkTheme.colors, background: theme.colors.background },
};

export function Routes() {
  const { user, loading } = useAuth();

  // Enquanto verifica se há sessão salva, mantém a tela em branco (a splash ainda cobre).
  if (loading) return null;

  return (
    <NavigationContainer theme={navigationTheme}>
      <Stack.Navigator screenOptions={{ headerShown: false, animation: 'fade' }}>
        {user ? (
          // Área logada
          <>
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="AppointmentDetails" component={AppointmentDetails} />
            <Stack.Screen name="AppointmentCreate" component={AppointmentCreate} />
            <Stack.Screen name="Settings" component={Settings} />
          </>
        ) : (
          // Área pública
          <>
            <Stack.Screen name="SignIn" component={SignIn} />
            <Stack.Screen name="SignUp" component={SignUp} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
