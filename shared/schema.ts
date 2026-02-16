import { pgTable, text, serial, jsonb, timestamp, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const orders = pgTable("orders", {
  id: serial("id").primaryKey(),
  etsyOrderId: varchar("etsy_order_id").notNull().unique(),
  accessCode: varchar("access_code").notNull().unique(),
  status: text("status", { enum: ["pending", "completed"] }).default("pending").notNull(),
  template: text("template", { enum: ["sage_green", "old_money", "minimalist", "luxury_gold", "botanical"] }),
  weddingDetails: jsonb("wedding_details").$type<{
    coupleNames: string;
    weddingDate: string;
    weddingTime?: string;
    venue: string;
    venueAddress?: string;
    googleMapsUrl?: string;
    dressCode?: string;
    loveStory?: string;
    registryLinks?: string;
    musicLink?: string;
    rsvpDeadline?: string;
    rsvpQuestions?: string[];
    guestMealOptions?: string[];
    language?: string;
    customColors?: string;
    agenda?: { time: string; event: string }[];
    accommodation?: string;
    transportation?: string;
    galleryImages?: string[];
  }>(),
  generatedContent: jsonb("generated_content").$type<{
    welcomeMessage: string;
    ourStory: string;
    venueDetails: string;
    rsvpMessage: string;
    seoTitle: string;
    seoDescription: string;
    schemaMarkup: string;
    agendaIntro?: string;
    detailsIntro?: string;
    closingMessage?: string;
  }>(),
  domain: varchar("domain"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertOrderSchema = createInsertSchema(orders).omit({ 
  id: true, 
  createdAt: true,
});

export const weddingDetailsSchema = z.object({
  coupleNames: z.string().min(1, "Couple names are required"),
  weddingDate: z.string().min(1, "Wedding date is required"),
  weddingTime: z.string().optional(),
  venue: z.string().min(1, "Venue is required"),
  venueAddress: z.string().optional(),
  googleMapsUrl: z.string().optional(),
  dressCode: z.string().optional(),
  loveStory: z.string().optional(),
  registryLinks: z.string().optional(),
  musicLink: z.string().optional(),
  rsvpDeadline: z.string().optional(),
  rsvpQuestions: z.array(z.string()).optional(),
  guestMealOptions: z.array(z.string()).optional(),
  language: z.string().optional(),
  customColors: z.string().optional(),
  agenda: z.array(z.object({ time: z.string(), event: z.string() })).optional(),
  accommodation: z.string().optional(),
  transportation: z.string().optional(),
  galleryImages: z.array(z.string()).optional(),
});

export type Order = typeof orders.$inferSelect;
export type InsertOrder = z.infer<typeof insertOrderSchema>;
export type WeddingDetails = z.infer<typeof weddingDetailsSchema>;

export * from "./models/chat";
