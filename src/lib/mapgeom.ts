/* Geometria condivisa delle mappe concettuali (porta maps.js). */
import { clip } from "./content";

/** Schiarisce un colore esadecimale verso il bianco (fattore f, 0..1). */
export function shade(hex: string, f: number): string {
  try {
    const c = hex.replace("#", "");
    const r = parseInt(c.substr(0, 2), 16);
    const g = parseInt(c.substr(2, 2), 16);
    const b = parseInt(c.substr(4, 2), 16);
    const mix = (v: number) => Math.round(v + (255 - v) * f);
    return `rgb(${mix(r)},${mix(g)},${mix(b)})`;
  } catch {
    return hex;
  }
}

export interface NodeShape {
  w: number;
  h: number;
  rx: number;
  /** righe di testo già posizionate (dy relativo a y) */
  lines: { text: string; dy: number }[];
}

/** Calcola dimensioni del rettangolo e righe di testo di un nodo. */
export function nodeShape(label: string, hub = false): NodeShape {
  const w = hub ? 150 : 148;
  const h = hub ? 38 : 34;
  const rx = hub ? 18 : 9;
  const words = label.split(" ");
  let l1 = label;
  let l2 = "";
  if (label.length > 18) {
    const mid = Math.ceil(words.length / 2);
    l1 = words.slice(0, mid).join(" ");
    l2 = words.slice(mid).join(" ");
  }
  const lines = l2
    ? [
        { text: clip(l1, 20), dy: -2 },
        { text: clip(l2, 20), dy: 12 },
      ]
    : [{ text: clip(l1, 22), dy: 4 }];
  return { w, h, rx, lines };
}
