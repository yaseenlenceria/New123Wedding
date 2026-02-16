import { z } from 'zod';
import { insertOrderSchema, orders, weddingDetailsSchema } from './schema';

export const errorSchemas = {
  validation: z.object({
    message: z.string(),
    field: z.string().optional(),
  }),
  notFound: z.object({
    message: z.string(),
  }),
  internal: z.object({
    message: z.string(),
  }),
  unauthorized: z.object({
    message: z.string(),
  }),
};

export const api = {
  auth: {
    login: {
      method: 'POST' as const,
      path: '/api/login' as const,
      input: z.object({
        accessCode: z.string(),
      }),
      responses: {
        200: z.custom<typeof orders.$inferSelect>(),
        401: errorSchemas.unauthorized,
      },
    },
  },
  orders: {
    get: {
      method: 'GET' as const,
      path: '/api/orders/:id' as const,
      responses: {
        200: z.custom<typeof orders.$inferSelect>(),
        404: errorSchemas.notFound,
      },
    },
    update: {
      method: 'PUT' as const,
      path: '/api/orders/:id' as const,
      input: z.object({
        template: z.enum(["sage_green", "old_money", "minimalist", "luxury_gold", "botanical"]).optional(),
        weddingDetails: weddingDetailsSchema.partial().optional(),
      }),
      responses: {
        200: z.custom<typeof orders.$inferSelect>(),
        404: errorSchemas.notFound,
      },
    },
    generate: {
      method: 'POST' as const,
      path: '/api/orders/:id/generate' as const,
      responses: {
        200: z.custom<typeof orders.$inferSelect>(),
        400: errorSchemas.internal, // Generation failed
      },
    },
    download: {
      method: 'GET' as const,
      path: '/api/orders/:id/download' as const,
      responses: {
        // Zip file download
        200: z.any(),
      },
    }
  },
};

export function buildUrl(path: string, params?: Record<string, string | number>): string {
  let url = path;
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (url.includes(`:${key}`)) {
        url = url.replace(`:${key}`, String(value));
      }
    });
  }
  return url;
}
