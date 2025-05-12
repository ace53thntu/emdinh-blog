declare module "mermaid" {
  interface MermaidConfig {
    startOnLoad?: boolean;
    securityLevel?: "strict" | "loose" | "antiscript";
    theme?: "default" | "forest" | "dark" | "neutral";
    themeVariables?: {
      [key: string]: string;
    };
    [key: string]: any;
  }

  interface Mermaid {
    initialize: (config: MermaidConfig) => void;
    run: () => void;
  }

  const mermaid: Mermaid;
  export default mermaid;
}
