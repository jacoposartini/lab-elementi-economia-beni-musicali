/* Helper di contenuto puri (porta components.js / parte di core.js):
   escape HTML, riferimenti inline [[song|topic]] e **grassetto**, testo piatto
   dei blocchi per la ricerca. Restituiscono stringhe, usate con set:html. */
import type { Block } from "../data/types";
import { href } from "./links";

const ESC: Record<string, string> = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
};

export function esc(s: string | undefined): string {
  return (s || "").replace(/[&<>"]/g, (c) => ESC[c]);
}

export function clip(s: string, n: number): string {
  return s.length > n ? s.slice(0, n - 1) + "…" : s;
}

/** Converte [[song:id|label]] / [[topic:id|label]] e **testo** in HTML
 *  (su testo già escapato). I link ai brani invocano il player globale. */
export function inlineRefs(s: string): string {
  let out = esc(s);
  out = out.replace(
    /\[\[song:([a-z0-9_-]+)\|([^\]]+)\]\]/gi,
    (_m, id, lbl) =>
      `<a href="javascript:void(0)" onclick="LAB.play('${id}')">▶ ${lbl}</a>`,
  );
  out = out.replace(
    /\[\[topic:([a-z0-9_-]+)\|([^\]]+)\]\]/gi,
    (_m, id, lbl) => `<a href="${href("topic/" + id)}">${lbl}</a>`,
  );
  out = out.replace(/\*\*([^*]+)\*\*/g, "<b>$1</b>");
  return out;
}

/** Testo piatto dei blocchi, usato da ricerca e snippet. */
export function blocksText(blocks?: Block[]): string {
  return (blocks || [])
    .map((b) => (Array.isArray(b.x) ? b.x.join(" ") : typeof b.x === "string" ? b.x : ""))
    .join(" ");
}
