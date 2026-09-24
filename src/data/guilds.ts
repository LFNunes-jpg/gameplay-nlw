import type { GuildProps } from '../types';

// Servidores que aparecem na lista "Selecione um servidor" (frame do Figma).
export const guilds: GuildProps[] = [
  { id: '1', name: 'Lendários', game: 'Dota 2', icon: require('../assets/dota2.png'), owner: true },
  { id: '2', name: 'Rumo ao topo', game: 'Counter-Strike: GO', icon: require('../assets/csgo.png'), owner: true },
  { id: '3', name: 'Bora queimar tudo', game: 'Apex Legends', icon: require('../assets/apex.png'), owner: false },
  { id: '4', name: 'Yeah, Boy', game: 'Red Dead Redemption 2', icon: require('../assets/rdr.png'), owner: false },
  { id: '5', name: 'Valorosos', game: 'Valorant', icon: require('../assets/valorant.png'), owner: false },
  { id: '6', name: 'Rolezão Monstro', game: 'Grand Theft Auto V', icon: require('../assets/gta.png'), owner: false },
  { id: '7', name: 'Construtores', game: 'Minecraft', icon: require('../assets/minecraft.png'), owner: false },
];

export const findGuild = (id: string) => guilds.find((guild) => guild.id === id) as GuildProps;
