import { useCallback } from 'react';
import { View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import * as SplashScreen from 'expo-splash-screen';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Inter_400Regular, Inter_500Medium } from '@expo-google-fonts/inter';
import { Rajdhani_500Medium, Rajdhani_700Bold } from '@expo-google-fonts/rajdhani';
import { useFonts } from 'expo-font';

import { AppointmentsProvider } from './src/hooks/appointments';
import { AuthProvider } from './src/hooks/auth';
import { Routes } from './src/routes';
import { theme } from './src/global/theme';

// Mantém a splash visível até as fontes carregarem (evita "piscar" com fonte padrão).
SplashScreen.preventAutoHideAsync();

export default function App() {
  const [fontsLoaded] = useFonts({ Inter_400Regular, Inter_500Medium, Rajdhani_500Medium, Rajdhani_700Bold });

  const onLayout = useCallback(() => {
    if (fontsLoaded) SplashScreen.hideAsync();
  }, [fontsLoaded]);

  if (!fontsLoaded) return null;

  return (
    <SafeAreaProvider>
      <View style={{ flex: 1, backgroundColor: theme.colors.background }} onLayout={onLayout}>
        <StatusBar style="light" />
        <AuthProvider>
          <AppointmentsProvider>
            <Routes />
          </AppointmentsProvider>
        </AuthProvider>
      </View>
    </SafeAreaProvider>
  );
}
