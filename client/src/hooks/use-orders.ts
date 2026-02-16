import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api, buildUrl } from "@shared/routes";
import { type InsertOrder, type WeddingDetails } from "@shared/schema";
import { z } from "zod";

// Helper to validate and fetch
async function fetchAndValidate<T>(url: string, schema: z.ZodType<T>) {
  const res = await fetch(url, { credentials: "include" });
  if (!res.ok) {
    if (res.status === 404) return null;
    throw new Error(`Failed to fetch: ${res.statusText}`);
  }
  const data = await res.json();
  return schema.parse(data);
}

// Login Mutation
export function useLogin() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (accessCode: string) => {
      const res = await fetch(api.auth.login.path, {
        method: api.auth.login.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ accessCode }),
        credentials: "include",
      });
      
      if (!res.ok) {
        if (res.status === 401) throw new Error("Invalid access code");
        throw new Error("Login failed");
      }
      
      const data = await res.json();
      return api.auth.login.responses[200].parse(data);
    },
    onSuccess: (data) => {
      // Invalidate queries to ensure fresh data
      queryClient.invalidateQueries({ queryKey: [api.orders.get.path, data.id] });
    },
  });
}

// Get Order
export function useOrder(id: number | undefined) {
  return useQuery({
    queryKey: [api.orders.get.path, id],
    queryFn: async () => {
      if (!id) return null;
      const url = buildUrl(api.orders.get.path, { id });
      return fetchAndValidate(url, api.orders.get.responses[200]);
    },
    enabled: !!id,
  });
}

// Update Order (Template or Details)
export function useUpdateOrder() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, data }: { id: number; data: Partial<{ template: string; weddingDetails: Partial<WeddingDetails> }> }) => {
      const url = buildUrl(api.orders.update.path, { id });
      const validatedInput = api.orders.update.input.parse(data);
      
      const res = await fetch(url, {
        method: api.orders.update.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(validatedInput),
        credentials: "include",
      });

      if (!res.ok) throw new Error("Failed to update order");
      
      const responseData = await res.json();
      return api.orders.update.responses[200].parse(responseData);
    },
    onSuccess: (data) => {
      queryClient.setQueryData([api.orders.get.path, data.id], data);
    },
  });
}

// Generate Website
export function useGenerateWebsite() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: number) => {
      const url = buildUrl(api.orders.generate.path, { id });
      const res = await fetch(url, {
        method: api.orders.generate.method,
        credentials: "include",
      });

      if (!res.ok) throw new Error("Failed to generate website");
      
      const data = await res.json();
      return api.orders.generate.responses[200].parse(data);
    },
    onSuccess: (data) => {
      queryClient.setQueryData([api.orders.get.path, data.id], data);
    },
  });
}
