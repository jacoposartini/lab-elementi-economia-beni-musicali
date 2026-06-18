/* Tipi dei contenuti del corso. Sostituiscono il vecchio oggetto non tipizzato
   window.DATA: ora un campo sbagliato è segnalato da `astro check` a build-time. */

export interface Textbook {
  author: string;
  title: string;
  publisher?: string;
  note?: string;
  link?: string;
}

export interface Meta {
  course: string;
  courseLink?: string;
  prof: string;
  university: string;
  textbook?: Textbook;
  sources?: string[];
}

export interface Area {
  id: string;
  title: string;
  icon?: string;
  color: string;
  short?: string;
  desc?: string;
}

/* Blocchi del corpo di un argomento. `x` è stringa per p/h/quote/note/song,
   array di stringhe per ul. */
export type Block =
  | { t: "h"; x: string }
  | { t: "p"; x: string }
  | { t: "ul"; x: string[] }
  | { t: "quote"; x: string; cite?: string }
  | { t: "note"; x: string }
  | { t: "song"; x: string };

export interface Topic {
  id: string;
  area: string;
  title: string;
  lead?: string;
  body?: Block[];
  keywords?: string[];
  related?: string[];
  /** popolato a runtime in course.ts dagli id dei brani che puntano qui */
  songs?: string[];
}

export interface Song {
  id: string;
  title: string;
  artist?: string;
  year?: number;
  genre?: string;
  country?: string;
  topic?: string;
  q: string;
  yt?: string;
  /** derivato in course.ts dall'anno (es. "1960s") */
  decade?: string;
}

export interface MapNode {
  id: string;
  label: string;
  col: number;
  row: number;
  topic?: string;
  area?: string;
  color?: string;
  hub?: boolean;
}

export interface MapEdge {
  a: string;
  b: string;
  label?: string;
}

export interface ConceptMap {
  id: string;
  title: string;
  desc?: string;
  nodes: MapNode[];
  edges?: MapEdge[];
}

export interface RawData {
  meta: Meta;
  areas: Area[];
  songs: Song[];
  topics: Topic[];
  maps?: ConceptMap[];
}
