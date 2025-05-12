import satori from "satori";
import { Resvg } from "@resvg/resvg-js";
import { readFileSync } from "fs";
import { html } from "satori-html";

export const prerender = false;

export async function GET({ params }: { params: { title: string } }) {
  const title = decodeURIComponent(params.title || "Em Dinh Blog");

  // More complex layout that mimics the website design
  const markup = html(`
    <div style="
      display: flex;
      flex-direction: column;
      width: 1200px;
      height: 630px;
      background: linear-gradient(135deg, #9953F3 0%, #7C3AED 100%);
      color: white;
      padding: 60px;
      font-family: 'Inter';
      position: relative;
      overflow: hidden;
    ">
      <!-- Background elements mimicking site design -->
      <div style="
        position: absolute;
        width: 400px;
        height: 400px;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.1);
        top: -100px;
        right: -100px;
        filter: blur(40px);
      "></div>
      <div style="
        position: absolute;
        width: 300px;
        height: 300px;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.1);
        bottom: -50px;
        left: 200px;
        filter: blur(40px);
      "></div>
      
      <!-- Content with layout similar to the actual page -->
      <div style="
        display: flex;
        flex-direction: column;
        z-index: 10;
        height: 100%;
        justify-content: center;
      ">
        <h1 style="
          font-size: 72px;
          font-weight: bold;
          margin: 0;
          margin-bottom: 20px;
          line-height: 1.1;
        ">${title}</h1>
        
        <div style="
          display: flex;
          align-items: center;
          margin-top: 20px;
        ">
          <div style="
            width: 40px;
            height: 40px;
            border-radius: 50%;
            background: white;
            margin-right: 15px;
          "></div>
          <p style="
            font-size: 24px;
            opacity: 0.9;
          ">emdinh.dev</p>
        </div>
      </div>
      
      <!-- Footer element -->
      <div style="
        position: absolute;
        bottom: 40px;
        right: 60px;
        font-size: 18px;
        opacity: 0.8;
      ">Generated on ${new Date().toLocaleDateString()}</div>
    </div>
  `);

  const svg = await satori(markup, {
    width: 1200,
    height: 630,
    fonts: [
      {
        name: "Inter",
        data: readFileSync("./public/fonts/Inter_18pt-Regular.ttf"),
        style: "normal",
      },
    ],
  });

  const resvg = new Resvg(svg);
  const png = resvg.render().asPng();

  return new Response(png, {
    headers: {
      "Content-Type": "image/png",
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
}
