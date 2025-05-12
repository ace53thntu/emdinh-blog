export async function GET() {
  return new Response(`
    export async function search() { 
      return { 
        results: [],
        metadata: { title: "Fallback Search" } 
      }; 
    }
  `, {
    headers: {
      "content-type": "application/javascript",
    },
  });
}
