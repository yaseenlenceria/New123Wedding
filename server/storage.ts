import { orders, type Order, type InsertOrder, type WeddingDetails } from "@shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";

export interface IStorage {
  getOrder(id: number): Promise<Order | undefined>;
  getOrderByAccessCode(accessCode: string): Promise<Order | undefined>;
  createOrder(order: InsertOrder): Promise<Order>;
  updateOrder(id: number, updates: Partial<InsertOrder>): Promise<Order>;
}

export class DatabaseStorage implements IStorage {
  async getOrder(id: number): Promise<Order | undefined> {
    const [order] = await db.select().from(orders).where(eq(orders.id, id));
    return order;
  }

  async getOrderByAccessCode(accessCode: string): Promise<Order | undefined> {
    const [order] = await db.select().from(orders).where(eq(orders.accessCode, accessCode));
    return order;
  }

  async createOrder(insertOrder: InsertOrder): Promise<Order> {
    const [order] = await db.insert(orders).values(insertOrder).returning();
    return order;
  }

  async updateOrder(id: number, updates: Partial<InsertOrder>): Promise<Order> {
    const [order] = await db.update(orders)
      .set(updates)
      .where(eq(orders.id, id))
      .returning();
    return order;
  }
}

export const storage = new DatabaseStorage();
