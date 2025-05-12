import satori from "satori";
import { Resvg } from "@resvg/resvg-js";
import { readFileSync } from "fs";
import { html } from "satori-html";

export const prerender = false;

export async function GET({ params }: { params: { title: string } }) {
  const title = decodeURIComponent(params.title || "Em Dinh Blog");

  const markup = html(`
    <div style="font-size: 48px; background: white; padding: 40px; width: 1200px; height: 630px; display: flex; flex-direction: column; justify-content: center;">
      <strong style="color: #6C63FF">${title}</strong>
      <p style="font-size: 24px; margin-top: 20px;">emdinh.dev</p>
    </div>
  `);

  const svg = await satori(markup, {
    width: 1200,
    height: 630,
    fonts: [
      {
        name: "Geist",
        data: readFileSync("./public/fonts/Geist.woff2"),
        style: "normal",
      },
    ],
  });

  const resvg = new Resvg(svg);
  const png = resvg.render().asPng();

  return new Response(png, {
    headers: {
      "Content-Type": "image/png",
    },
  });
}
