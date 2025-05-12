import satori from "satori";
import { Resvg } from "@resvg/resvg-js";
import { readFileSync, writeFileSync, mkdirSync, existsSync } from "fs";
import { html } from "satori-html";
import * as globModule from "glob";
import path from "path";

// Make sure the output directory exists
const OG_IMAGE_DIR = "./public/og";
if (!existsSync(OG_IMAGE_DIR)) {
  mkdirSync(OG_IMAGE_DIR, { recursive: true });
}

async function generateOGImage(title: string, outputPath: string) {
  console.log(`Generating OG image for: ${title}`);

  // Simplified markup to avoid Satori rendering issues
  const markup = html(`
    <div style="
      display: flex;
      flex-direction: column;
      width: 1200px; 
      height: 630px; 
      background: linear-gradient(135deg, #FF3C3C 0%, #FF6666 100%);
      color: white;
      padding: 80px;
    ">
      <div style="
        display: flex;
        flex-direction: column;
        flex-grow: 1;
        justify-content: center;
      ">
        <h1 style="
          font-size: 70px;
          font-weight: 700;
          margin: 0;
        ">${title}</h1>
        
        <p style="
          font-size: 32px;
          margin-top: 20px;
          opacity: 0.9;
        ">emdinh.dev</p>
      </div>
    </div>
  `);

  const svg = await satori(markup, {
    width: 1200,
    height: 630,
    fonts: [
      {
        name: "Inter",
        data: readFileSync("./public/fonts/GeistMono-SemiBold.ttf"),
        style: "normal",
      },
    ],
  });

  const resvg = new Resvg(svg);
  const pngBuffer = resvg.render().asPng();

  // Save the image - fix the type issue with Buffer
  writeFileSync(outputPath, new Uint8Array(pngBuffer));
  console.log(`Saved OG image to: ${outputPath}`);
}

async function main() {
  try {
    // Create the output directory if it doesn't exist
    if (!existsSync(OG_IMAGE_DIR)) {
      mkdirSync(OG_IMAGE_DIR, { recursive: true });
    }

    // Generate default OG image for the home page
    await generateOGImage("Em Dinh Blog", path.join(OG_IMAGE_DIR, "home.png"));

    // Find all content pages to generate OG images for
    const contentFiles = [
      ...globModule.sync("./src/pages/**/*.astro"),
      ...globModule.sync("./src/content/posts/**/*.md"),
      ...globModule.sync("./src/content/projects/**/*.md"),
    ];

    // Process each file to extract its title and generate an OG image
    for (const file of contentFiles) {
      // Skip index and layout files
      if (file.includes("index.astro") || file.includes("Layout.astro")) {
        continue;
      }

      try {
        // Extract the filename (without extension) as the title
        const basename = path.basename(file, path.extname(file));

        // For .md files, try to extract the title from frontmatter
        let title = basename.replace(/-/g, " ");
        if (file.endsWith(".md")) {
          const content = readFileSync(file, "utf-8");
          const titleMatch = content.match(/title: ["'](.+?)["']/);
          if (titleMatch && titleMatch[1]) {
            title = titleMatch[1];
          }
        }

        // Generate a slug for the filename
        const slug = basename.toLowerCase().replace(/\s+/g, "-");
        const outputPath = path.join(OG_IMAGE_DIR, `${slug}.png`);

        // Generate the OG image
        await generateOGImage(title, outputPath);
      } catch (error) {
        console.error(`Error processing file ${file}:`, error);
      }
    }

    console.log("✅ All OG images generated successfully!");
  } catch (error) {
    console.error("Error generating OG images:", error);
    process.exit(1);
  }
}

main();
