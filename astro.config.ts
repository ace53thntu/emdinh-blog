import { defineConfig } from "astro/config";

import expressiveCode from "astro-expressive-code";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import spectre from "./package/src";

import vercel from "@astrojs/vercel";
import { spectreDark } from "./src/ec-theme";

// https://astro.build/config
export default defineConfig({
  site: "https://emdinh.dev",
  output: "static",
  integrations: [
    expressiveCode({
      themes: [spectreDark],
    }),
    mdx(),
    sitemap(),
    spectre({
      name: "Spectre",
      openGraph: {
        home: {
          title: "Spectre",
          description: "A minimalistic theme for Astro.",
        },
        blog: {
          title: "Blog",
          description: "News and guides for Spectre.",
        },
        projects: {
          title: "Projects",
        },
      },
      giscus: {
        repository: "ace53thntu/emdinh-blog",
        repositoryId: "R_kgDOOoButw",
        category: "General",
        categoryId: "DIC_kwDOOoBut84CqBIS",
        mapping: "pathname",
        strict: true,
        reactionsEnabled: true,
        emitMetadata: false,
        lang: "en",
      },
    }),
  ],
  adapter: vercel({
    webAnalytics: {
      enabled: true,
    },
    imageService: true,
  }),
});
