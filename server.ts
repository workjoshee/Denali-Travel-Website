import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Proxy route for image generation
  app.post("/api/generate-image", async (req, res) => {
    try {
      const { prompt, model, size } = req.body;
      
      if (!process.env.GEMINI_API_KEY) {
        return res.status(500).json({ error: "GEMINI_API_KEY is not set" });
      }

      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      
      // We pass the size directly in the prompt if not supported in config.
      // E.g., user requested 1K, 2K, 4K for pro-image-preview
      const sizePrompt = size ? ` in ${size} resolution` : '';
      const finalPrompt = prompt + sizePrompt;

      const response = await ai.models.generateImages({
        model: model || "gemini-3.1-flash-image-preview",
        prompt: finalPrompt,
        config: {
          numberOfImages: 1,
          outputMimeType: "image/jpeg",
          aspectRatio: "16:9",
        },
      });

      if (response.generatedImages && response.generatedImages.length > 0) {
        res.json({ imageBase64: response.generatedImages[0].image.imageBytes });
      } else {
        res.status(500).json({ error: "No image generated" });
      }
    } catch (error) {
      console.error("Error generating image:", error);
      res.status(500).json({ error: "Failed to generate image" });
    }
  });

  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
