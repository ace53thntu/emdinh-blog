export async function GET({ request }: { request: Request }) {
  try {
    // Try to fetch the actual pagefind.js content
    const response = await fetch(new URL("/pagefind/pagefind.js", request.url).toString());

    if (response.ok) {
      const content = await response.text();
      return new Response(content, {
        headers: {
          "content-type": "application/javascript",
        },
      });
    }
  } catch (error) {
    console.error("Error fetching pagefind.js:", error);
  }

  // Fallback to a simple implementation that won't break the UI
  return new Response(
    `
    export const search = (query) => {
      console.warn("Using fallback pagefind implementation");
      return Promise.resolve({ results: [] });
    };
  `,
    {
      headers: {
        "content-type": "application/javascript",
      },
    }
  );
}
