import type { AppointmentProps, MemberProps } from '../types';
import { findGuild } from './guilds';

// Partidas iniciais (as do Figma). Todo usuário novo começa com elas; as que ele
// agendar entram no topo da lista e ficam salvas no aparelho.
export const seedAppointments: AppointmentProps[] = [
  {
    id: 'seed-1',
    guild: findGuild('1'),
    categoryId: '1',
    date: '18/06 às 21:00h',
    description: 'É hoje que vamos chegar ao Immortal sem perder uma partida da md10',
    isOwner: true,
  },
  {
    id: 'seed-2',
    guild: findGuild('4'),
    categoryId: '3',
    date: '23/06 às 19:00h',
    description: 'Vamos cavalgar, roubar um trem e dar risada. Sem pressão, só diversão.',
    isOwner: false,
  },
  {
    id: 'seed-3',
    guild: findGuild('2'),
    categoryId: '2',
    date: '20/06 às 09:00h',
    description: 'Treino de mira e duelos 1x1 logo cedo. Quem perder paga o café.',
    isOwner: true,
  },
  {
    id: 'seed-4',
    guild: findGuild('3'),
    categoryId: '1',
    date: '20/06 às 14:20h',
    description: 'Squad fechado para subir de rank até o Predator nesta temporada.',
    isOwner: true,
  },
  {
    id: 'seed-5',
    guild: findGuild('5'),
    categoryId: '3',
    date: '19/06 às 22:00h',
    description: 'Partidas casuais de Valorant para fechar a semana.',
    isOwner: true,
  },
  // O Figma mostra "Total 6", mas só 5 itens aparecem na tela: este é um item de exemplo.
  {
    id: 'seed-6',
    guild: findGuild('1'),
    categoryId: '1',
    date: '27/06 às 20:30h',
    description: 'Só mais uma partida... (a gente sabe que não é só uma).',
    isOwner: false,
  },
];

// Os outros jogadores são de exemplo; o primeiro da lista é sempre o usuário logado.
export const otherMembers: MemberProps[] = [
  { id: 'm2', name: 'Rodrigo Gonçalves', avatar: require('../assets/member2.png'), status: 'busy' },
  { id: 'm3', name: 'Diego Fernandes', avatar: require('../assets/member3.png'), status: 'busy' },
];
