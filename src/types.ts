import type { ImageSourcePropType } from 'react-native';

export type CategoryProps = {
  id: string;
  title: string; // nome completo (cards de categoria)
  label: string; // nome curto (lista de partidas)
  icon: ImageSourcePropType;
};

export type GuildProps = {
  id: string;
  name: string;
  game: string;
  icon: ImageSourcePropType;
  owner: boolean; // papel do usuário no servidor (Administrador / Convidado)
};

export type MemberProps = {
  id: string;
  name: string;
  avatar?: ImageSourcePropType; // sem avatar → mostra as iniciais
  status: 'available' | 'busy';
};

export type AppointmentProps = {
  id: string;
  guild: GuildProps;
  categoryId: string;
  date: string; // "18/06 às 21:00h"
  description: string;
  isOwner: boolean; // true = "Anfitrião", false = "Visitante"
};

export type UserProps = {
  id: string;
  name: string;
  email: string;
};
