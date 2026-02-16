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
    venue: string;
    dressCode?: string;
    loveStory?: string;
    registryLinks?: string;
    musicLink?: string;
    rsvpQuestions?: string[];
    guestMealOptions?: string[];
    language?: string;
    customColors?: string;
  }>(),
  generatedContent: jsonb("generated_content").$type<{
    welcomeMessage: string;
    ourStory: string;
    venueDetails: string;
    rsvpMessage: string;
    seoTitle: string;
    seoDescription: string;
    schemaMarkup: string;
  }>(),
  domain: varchar("domain"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertOrderSchema = createInsertSchema(orders).omit({ 
  id: true, 
  createdAt: true,
  status: true 
});

export const weddingDetailsSchema = z.object({
  coupleNames: z.string().min(1, "Couple names are required"),
  weddingDate: z.string().min(1, "Wedding date is required"),
  venue: z.string().min(1, "Venue is required"),
  dressCode: z.string().optional(),
  loveStory: z.string().optional(),
  registryLinks: z.string().optional(),
  musicLink: z.string().optional(),
  rsvpQuestions: z.array(z.string()).optional(),
  guestMealOptions: z.array(z.string()).optional(),
  language: z.string().optional(),
  customColors: z.string().optional(),
});

export type Order = typeof orders.$inferSelect;
export type InsertOrder = z.infer<typeof insertOrderSchema>;
export type WeddingDetails = z.infer<typeof weddingDetailsSchema>;
