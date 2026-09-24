import * as Crypto from 'expo-crypto';

import type { UserProps } from '../types';
import { normalizeEmail } from '../utils/validators';
import { getItem, removeItem, setItem, STORAGE_KEYS } from './storage';

type StoredUser = UserProps & { salt: string; hash: string };

export class AuthError extends Error {}

// A senha nunca é salva em texto puro: guardamos só o hash SHA-256 (senha + salt aleatório).
// Obs.: tudo fica no aparelho. Em um app real isso seria feito por um servidor (API).
const hashPassword = (password: string, salt: string) =>
  Crypto.digestStringAsync(Crypto.CryptoDigestAlgorithm.SHA256, salt + password);

const toPublicUser = ({ id, name, email }: StoredUser): UserProps => ({ id, name, email });

const loadUsers = () => getItem<StoredUser[]>(STORAGE_KEYS.users, []);

export async function registerUser(data: { name: string; email: string; password: string }): Promise<UserProps> {
  const users = await loadUsers();
  const email = normalizeEmail(data.email);

  if (users.some((user) => user.email === email)) {
    throw new AuthError('Este e-mail já está cadastrado.');
  }

  const salt = Crypto.randomUUID();
  const user: StoredUser = {
    id: Crypto.randomUUID(),
    name: data.name.trim(),
    email,
    salt,
    hash: await hashPassword(data.password, salt),
  };

  await setItem(STORAGE_KEYS.users, [...users, user]);
  await setItem(STORAGE_KEYS.session, user.id);
  return toPublicUser(user);
}

export async function loginUser(data: { email: string; password: string }): Promise<UserProps> {
  const users = await loadUsers();
  const user = users.find((item) => item.email === normalizeEmail(data.email));

  // Mesma mensagem para e-mail inexistente e senha errada (não revela quais e-mails existem).
  if (!user || (await hashPassword(data.password, user.salt)) !== user.hash) {
    throw new AuthError('E-mail ou senha incorretos.');
  }

  await setItem(STORAGE_KEYS.session, user.id);
  return toPublicUser(user);
}

// Login "com Discord" simulado: cria (na primeira vez) e entra numa conta de demonstração.
export async function loginDiscordDemo(): Promise<UserProps> {
  const email = 'tiago@discord.demo';
  const users = await loadUsers();
  const existing = users.find((user) => user.email === email);

  if (existing) {
    await setItem(STORAGE_KEYS.session, existing.id);
    return toPublicUser(existing);
  }
  return registerUser({ name: 'Tiago', email, password: Crypto.randomUUID() });
}

export async function restoreSession(): Promise<UserProps | null> {
  const userId = await getItem<string | null>(STORAGE_KEYS.session, null);
  if (!userId) return null;
  const users = await loadUsers();
  const user = users.find((item) => item.id === userId);
  return user ? toPublicUser(user) : null;
}

export const clearSession = () => removeItem(STORAGE_KEYS.session);

// Exclui a conta: remove o usuário, as partidas dele e encerra a sessão.
export async function deleteUser(userId: string): Promise<void> {
  const users = await loadUsers();
  await setItem(
    STORAGE_KEYS.users,
    users.filter((user) => user.id !== userId),
  );
  await removeItem(STORAGE_KEYS.appointments(userId));
  await clearSession();
}
