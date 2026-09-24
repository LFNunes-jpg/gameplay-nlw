import AsyncStorage from '@react-native-async-storage/async-storage';

// Chaves usadas no armazenamento local do aparelho.
export const STORAGE_KEYS = {
  users: '@gameplay:users',
  session: '@gameplay:session',
  appointments: (userId: string) => `@gameplay:appointments:${userId}`,
};

export async function getItem<T>(key: string, fallback: T): Promise<T> {
  try {
    const raw = await AsyncStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

export async function setItem<T>(key: string, value: T): Promise<void> {
  await AsyncStorage.setItem(key, JSON.stringify(value));
}

export async function removeItem(key: string): Promise<void> {
  await AsyncStorage.removeItem(key);
}
