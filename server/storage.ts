import { orders, type Order, type InsertOrder, type WeddingDetails } from "@shared/schema";
import { db, hasDatabase } from "./db";
import { eq } from "drizzle-orm";

export interface IStorage {
  getOrder(id: number): Promise<Order | undefined>;
  getOrderByAccessCode(accessCode: string): Promise<Order | undefined>;
  createOrder(order: InsertOrder): Promise<Order>;
  updateOrder(id: number, updates: Partial<InsertOrder>): Promise<Order>;
}

export class DatabaseStorage implements IStorage {
  async getOrder(id: number): Promise<Order | undefined> {
    const [order] = await db!.select().from(orders).where(eq(orders.id, id));
    return order;
  }

  async getOrderByAccessCode(accessCode: string): Promise<Order | undefined> {
    const [order] = await db!.select().from(orders).where(eq(orders.accessCode, accessCode));
    return order;
  }

  async createOrder(insertOrder: InsertOrder): Promise<Order> {
    const [order] = await db!.insert(orders).values(insertOrder).returning();
    return order;
  }

  async updateOrder(id: number, updates: Partial<InsertOrder>): Promise<Order> {
    const [order] = await db!.update(orders)
      .set(updates)
      .where(eq(orders.id, id))
      .returning();
    return order;
  }
}

export class MemoryStorage implements IStorage {
  private nextId = 1;
  private orders = new Map<number, Order>();

  async getOrder(id: number): Promise<Order | undefined> {
    return this.orders.get(id);
  }

  async getOrderByAccessCode(accessCode: string): Promise<Order | undefined> {
    let found: Order | undefined = undefined;
    this.orders.forEach((order) => {
      if (!found && order.accessCode === accessCode) {
        found = order;
      }
    });
    return found;
  }

  async createOrder(insertOrder: InsertOrder): Promise<Order> {
    const id = this.nextId++;
    const order: Order = {
      id,
      etsyOrderId: insertOrder.etsyOrderId,
      accessCode: insertOrder.accessCode,
      status: insertOrder.status ?? "pending",
      template: insertOrder.template ?? null,
      weddingDetails: (insertOrder.weddingDetails as WeddingDetails) ?? null,
      generatedContent: (insertOrder.generatedContent as any) ?? null,
      domain: insertOrder.domain ?? null,
      createdAt: new Date(),
    };
    this.orders.set(id, order);
    return order;
  }

  async updateOrder(id: number, updates: Partial<InsertOrder>): Promise<Order> {
    const existing = this.orders.get(id);
    if (!existing) {
      throw new Error("Order not found");
    }

    const updated: Order = {
      ...existing,
      ...updates,
      template: updates.template ?? existing.template,
      weddingDetails: (updates.weddingDetails as WeddingDetails) ?? existing.weddingDetails,
      generatedContent: (updates.generatedContent as any) ?? existing.generatedContent,
      domain: updates.domain ?? existing.domain,
      status: (updates.status as Order["status"]) ?? existing.status,
    };

    this.orders.set(id, updated);
    return updated;
  }
}

export const storage = hasDatabase ? new DatabaseStorage() : new MemoryStorage();
