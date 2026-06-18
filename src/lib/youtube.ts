/* URL YouTube condivisi da scheda brano e player. */
import type { Song } from "../data/types";

export function ytSearchUrl(song: Pick<Song, "q">): string {
  return "https://www.youtube.com/results?search_query=" + encodeURIComponent(song.q);
}

export function ytWatchUrl(song: Pick<Song, "q" | "yt">): string {
  return song.yt ? "https://www.youtube.com/watch?v=" + song.yt : ytSearchUrl(song);
}
