import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";
import OpenAI from "openai";
import AdmZip from "adm-zip";

const openai = new OpenAI({
  apiKey: process.env.AI_INTEGRATIONS_OPENAI_API_KEY,
  baseURL: process.env.AI_INTEGRATIONS_OPENAI_BASE_URL,
});

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {

  app.post(api.auth.login.path, async (req, res) => {
    try {
      const { accessCode } = api.auth.login.input.parse(req.body);
      const order = await storage.getOrderByAccessCode(accessCode);
      if (!order) return res.status(401).json({ message: "Invalid access code" });
      res.json(order);
    } catch (error) {
      res.status(400).json({ message: "Invalid input" });
    }
  });

  app.get(api.orders.get.path, async (req, res) => {
    const id = parseInt(req.params.id);
    const order = await storage.getOrder(id);
    if (!order) return res.status(404).json({ message: "Order not found" });
    res.json(order);
  });

  app.put(api.orders.update.path, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const updates = api.orders.update.input.parse(req.body);
      const order = await storage.updateOrder(id, updates);
      res.json(order);
    } catch (error) {
      res.status(400).json({ message: "Invalid input" });
    }
  });

  app.post(api.orders.generate.path, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const order = await storage.getOrder(id);
      if (!order || !order.weddingDetails) return res.status(400).json({ message: "Invalid order or missing details" });

      const details = order.weddingDetails;
      const prompt = `
        You are a professional wedding website copywriter. Generate content for a wedding website inspired by high-end vertical mobile invitations.
        Details:
        - Couple: ${details.coupleNames}
        - Date: ${details.weddingDate} at ${details.weddingTime || 'TBA'}
        - Venue: ${details.venue} (${details.venueAddress || 'Address TBA'})
        - Love Story: ${details.loveStory || "Write a romantic intro about destiny and shared dreams."}
        - Tone: ${order.template === 'old_money' ? 'Classic, Formal, Sophisticated' : 'Modern, Warm, Elegant'}

        Return ONLY a JSON object:
        - welcomeMessage: Short, catchy (e.g., "The Beginning of Forever")
        - ourStory: 2 short, beautiful paragraphs.
        - venueDetails: Descriptive blurb about the location.
        - rsvpMessage: Urgent but polite CTA.
        - seoTitle: Professional SEO title.
        - seoDescription: Elegant meta description.
        - schemaMarkup: Stringified JSON-LD WeddingEvent.
        - agendaIntro: Short line introducing the schedule.
        - detailsIntro: Short line introducing dress code and logistics.
        - closingMessage: A warm, emotional closing thank-you message.
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
      res.status(500).json({ message: "Generation failed" });
    }
  });

  app.get(api.orders.download.path, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const order = await storage.getOrder(id);
      if (!order) return res.status(404).json({ message: "Order not found" });

      const zip = new AdmZip();
      const html = `<!DOCTYPE html><html><head><title>${order.generatedContent?.seoTitle}</title></head><body><h1>${order.weddingDetails?.coupleNames}</h1><p>${order.generatedContent?.welcomeMessage}</p></body></html>`;
      zip.addFile("index.html", Buffer.from(html, "utf8"));
      res.set('Content-Type', 'application/zip');
      res.set('Content-Disposition', `attachment; filename=wedding.zip`);
      res.send(zip.toBuffer());
    } catch (error) {
      res.status(500).json({ message: "Download failed" });
    }
  });

  if (process.env.NODE_ENV !== "production") {
    const demo = await storage.getOrderByAccessCode("DEMO123");
    if (!demo) {
      await storage.createOrder({
        etsyOrderId: "DEMO-001",
        accessCode: "DEMO123",
        status: "pending",
        template: "sage_green",
        weddingDetails: {
          coupleNames: "Emma & Lucas",
          weddingDate: "2024-06-22",
          weddingTime: "16:00",
          venue: "Opera Castle",
          venueAddress: "123 Elegance Lane, Paris",
          googleMapsUrl: "https://maps.google.com",
          loveStory: "From a shared glance to a lifetime of love.",
          agenda: [
            { time: "4:00 PM", event: "Wedding Ceremony" },
            { time: "5:30 PM", event: "Cocktail Hour" },
            { time: "7:00 PM", event: "Dinner & Reception" }
          ]
        }
      });
    }
  }

  return httpServer;
}
