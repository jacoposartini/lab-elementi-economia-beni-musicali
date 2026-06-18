/* Costruzione URL consapevole del `base` di GitHub Pages.
   In locale base = "/", in produzione "/lab-elementi-economia-beni-musicali".
   Usare sempre href("topic/x") invece di stringhe assolute scritte a mano. */
const BASE = import.meta.env.BASE_URL.replace(/\/$/, "");

export function href(path = ""): string {
  const clean = path.replace(/^\//, "");
  return clean ? `${BASE}/${clean}` : `${BASE}/`;
}
