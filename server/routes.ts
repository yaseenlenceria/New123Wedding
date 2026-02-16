import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";
import OpenAI from "openai";
import AdmZip from "adm-zip";

// Initialize OpenAI client using Replit AI Integrations environment variables
const openai = new OpenAI({
  apiKey: process.env.AI_INTEGRATIONS_OPENAI_API_KEY,
  baseURL: process.env.AI_INTEGRATIONS_OPENAI_BASE_URL,
});

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {

  // Login
  app.post(api.auth.login.path, async (req, res) => {
    try {
      const { accessCode } = api.auth.login.input.parse(req.body);
      const order = await storage.getOrderByAccessCode(accessCode);
      
      if (!order) {
        return res.status(401).json({ message: "Invalid access code" });
      }

      res.json(order);
    } catch (error) {
       if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Invalid input" });
      } else {
        res.status(500).json({ message: "Internal server error" });
      }
    }
  });

  // Get Order
  app.get(api.orders.get.path, async (req, res) => {
    const id = parseInt(req.params.id);
    const order = await storage.getOrder(id);
    if (!order) return res.status(404).json({ message: "Order not found" });
    res.json(order);
  });

  // Update Order
  app.put(api.orders.update.path, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const updates = api.orders.update.input.parse(req.body);
      
      const order = await storage.updateOrder(id, updates);
      res.json(order);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Invalid input" });
      } else {
        res.status(500).json({ message: "Internal server error" });
      }
    }
  });

  // Generate Content
  app.post(api.orders.generate.path, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const order = await storage.getOrder(id);
      if (!order) return res.status(404).json({ message: "Order not found" });
      if (!order.weddingDetails) return res.status(400).json({ message: "Wedding details missing" });

      const details = order.weddingDetails;
      
      const prompt = `
        You are a professional wedding website copywriter. Generate content for a wedding website based on these details:
        - Couple: ${details.coupleNames}
        - Date: ${details.weddingDate}
        - Venue: ${details.venue}
        - Love Story: ${details.loveStory || "Not provided, write a generic romantic intro"}
        - Dress Code: ${details.dressCode || "Not specified"}
        - Tone: ${order.template === 'old_money' ? 'Formal, sophisticated' : order.template === 'botanical' ? 'Whimsical, natural' : 'Modern, welcoming'}

        Return ONLY a JSON object with the following fields:
        - welcomeMessage: A warm welcome title and subtitle.
        - ourStory: A 2-paragraph engaging story about the couple.
        - venueDetails: A description of the venue and directions.
        - rsvpMessage: A call to action for RSVP.
        - seoTitle: A title tag for SEO (e.g., "Sarah & John's Wedding - Oct 12").
        - seoDescription: A meta description.
        - schemaMarkup: JSON-LD schema for a WeddingEvent (as a stringified JSON string).
      `;

      const response = await openai.chat.completions.create({
        model: "gpt-5.1",
        messages: [{ role: "user", content: prompt }],
        response_format: { type: "json_object" },
      });

      const content = JSON.parse(response.choices[0].message.content || "{}");

      const updatedOrder = await storage.updateOrder(id, {
        generatedContent: content,
        status: "completed"
      });

      res.json(updatedOrder);

    } catch (error) {
      console.error("Generation error:", error);
      res.status(500).json({ message: "Failed to generate content" });
    }
  });

  // Download ZIP
  app.get(api.orders.download.path, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const order = await storage.getOrder(id);
      if (!order) return res.status(404).json({ message: "Order not found" });

      const zip = new AdmZip();
      
      // Basic HTML template construction based on selected theme
      const htmlContent = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <title>${order.generatedContent?.seoTitle || 'Wedding Website'}</title>
            <meta name="description" content="${order.generatedContent?.seoDescription}">
            <script type="application/ld+json">
              ${order.generatedContent?.schemaMarkup}
            </script>
            <style>
                body { font-family: sans-serif; line-height: 1.6; color: #333; max-width: 800px; margin: 0 auto; padding: 20px; }
                h1 { text-align: center; color: ${order.template === 'sage_green' ? '#4a5d23' : '#333'}; }
                .section { margin: 40px 0; }
            </style>
        </head>
        <body>
            <header class="section">
                <h1>${order.weddingDetails?.coupleNames}</h1>
                <p style="text-align: center">${order.generatedContent?.welcomeMessage}</p>
            </header>
            <main>
                <section class="section">
                    <h2>Our Story</h2>
                    <p>${order.generatedContent?.ourStory}</p>
                </section>
                <section class="section">
                    <h2>The Wedding</h2>
                    <p><strong>Date:</strong> ${order.weddingDetails?.weddingDate}</p>
                    <p><strong>Venue:</strong> ${order.weddingDetails?.venue}</p>
                    <p>${order.generatedContent?.venueDetails}</p>
                </section>
                 <section class="section">
                    <h2>RSVP</h2>
                    <p>${order.generatedContent?.rsvpMessage}</p>
                </section>
            </main>
        </body>
        </html>
      `;

      zip.addFile("index.html", Buffer.from(htmlContent, "utf8"));
      
      const downloadName = `${order.weddingDetails?.coupleNames.replace(/\s+/g, '_')}_Wedding.zip`;
      const data = zip.toBuffer();

      res.set('Content-Type', 'application/zip');
      res.set('Content-Disposition', `attachment; filename=${downloadName}`);
      res.set('Content-Length', String(data.length));
      res.send(data);

    } catch (error) {
      console.error("Download error:", error);
      res.status(500).json({ message: "Failed to generate download" });
    }
  });

  // Seed Data
  if (process.env.NODE_ENV !== "production") {
    const existing = await storage.getOrderByAccessCode("DEMO123");
    if (!existing) {
      await storage.createOrder({
        etsyOrderId: "ETSY-99999",
        accessCode: "DEMO123",
        status: "pending",
        template: "sage_green",
        weddingDetails: {
           coupleNames: "Emma & James",
           weddingDate: "2024-10-15",
           venue: "The Grand Estate",
           loveStory: "We met at a coffee shop...",
        }
      });
      console.log("Seeded demo order: Code DEMO123");
    }
  }

  return httpServer;
}
