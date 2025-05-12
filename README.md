# emdinh-blog

A personal blog built with Astro, inspired by the terminal-aesthetic of [Spectre](https://github.com/louisescher/spectre).

## Features

- ⚡️ 100/100 Lighthouse performance
- 📱 Responsive design for all screen sizes
- ♿ Fully accessible
- 🔍 Type-safe content using Astro content collections
- 🔎 Search functionality powered by [pagefind](https://pagefind.app)
- 📝 Markdown and MDX support with code highlighting
- 🖼️ Automatic OG image generation
- 🗺️ Auto-generated sitemap
- 📊 Mermaid diagram support
- 🚀 Deployed on Vercel

## Getting Started

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Build for production
pnpm build

# Generate OG images
pnpm generate-og
```

## Project Structure

```
/
├── public/          # Static assets
├── src/
│   ├── assets/      # Images and other assets
│   ├── components/  # UI components
│   ├── content/     # Blog posts and other content
│   ├── layouts/     # Page layouts
│   ├── pages/       # Page components
│   └── styles/      # Global styles
└── package/         # Custom Astro integration
```

## Tech Stack

- [Astro](https://astro.build) - Web framework
- [MDX](https://mdxjs.com) - Markdown with JSX
- [Pagefind](https://pagefind.app) - Search functionality
- [Shiki](https://shiki.matsu.io) - Code highlighting
- [Mermaid](https://mermaid.js.org) - Diagrams
- [Satori](https://github.com/vercel/satori) - OG image generation

## License

MIT

---

*"Where code meets creativity, a terminal-inspired blog emerges from the digital shadows."* - Inspired by Spectre