/* Punto d'accesso ai dati del corso: prende l'oggetto grezzo, costruisce gli
   indici e le relazioni derivate (porta la logica del vecchio core.js) ed espone
   un'API tipizzata usata da pagine e componenti. */
import { DATA } from "./raw";
import type { Area, Topic, Song, ConceptMap } from "./types";

export const meta = DATA.meta;
export const areas: Area[] = DATA.areas;
export const topics: Topic[] = DATA.topics;
export const songs: Song[] = DATA.songs;
export const maps: ConceptMap[] = DATA.maps ?? [];

export const areaById: Record<string, Area> = {};
export const topicById: Record<string, Topic> = {};
export const songById: Record<string, Song> = {};

for (const a of areas) areaById[a.id] = a;
for (const t of topics) topicById[t.id] = t;
for (const s of songs) songById[s.id] = s;

// Decennio derivato + aggancio brani ↔ argomenti (come nel vecchio core.js).
for (const s of songs) s.decade = s.year ? `${Math.floor(s.year / 10) * 10}s` : "—";
for (const t of topics) if (!t.songs) t.songs = [];
for (const s of songs) {
  if (s.topic && topicById[s.topic]) topicById[s.topic].songs!.push(s.id);
}

export const topicsOfArea = (areaId: string): Topic[] =>
  topics.filter((t) => t.area === areaId);
