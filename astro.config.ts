import { defineConfig } from "astro/config";

import expressiveCode from "astro-expressive-code";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import spectre from "./package/src";
import rehypeMermaid from "rehype-mermaid";

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
    mdx({
      syntaxHighlight: {
        type: "shiki",
        excludeLangs: ["mermaid", "math"],
      },
      rehypePlugins: [
        [
          rehypeMermaid,
          {
            strategy: "img-svg",
            mermaidConfig: {
              theme: "dark",
            },
          },
        ],
      ],
    }),
    sitemap(),
    spectre({
      name: "Em Dinh",
      openGraph: {
        home: {
          title: "Em Dinh | Software Engineer",
          description:
            "Personal blog and portfolio of Em Dinh, sharing thoughts and experiences on software development, web technologies, and more.",
        },
        blog: {
          title: "Blog | Em Dinh",
          description: "Technical articles, tutorials, and insights on software development and web technologies.",
        },
        projects: {
          title: "Projects | Em Dinh",
          description: "Showcase of personal and professional software projects and contributions.",
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
    imageService: true,
  }),
});
