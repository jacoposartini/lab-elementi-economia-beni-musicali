// @ts-check
import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

// GitHub Pages "project page": il sito vive sotto /<repo>/.
// Se in futuro userai un dominio custom, metti site:"https://tuodominio" e base:"/".
export default defineConfig({
  site: "https://jacoposartini.github.io",
  base: "/lab-elementi-economia-beni-musicali",
  trailingSlash: "ignore",
  build: { format: "directory" },
  integrations: [sitemap()],
});
