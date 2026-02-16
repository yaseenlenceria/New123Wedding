import { useQuery } from "@tanstack/react-query";
import { useParams } from "wouter";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import WeddingTemplate from "@/components/wedding-template";
import { themes, type TemplateName } from "@/lib/themes";
import type { Order } from "@shared/schema";

export default function PublicWeddingPage() {
  const params = useParams<{ id: string }>();

  const { data: order, isLoading, error } = useQuery<Order>({
    queryKey: ["/api/orders", params.id],
    enabled: !!params.id,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#faf8f4]">
        <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 2 }}>
          <Heart className="w-8 h-8 text-[#c9a94e]" />
        </motion.div>
      </div>
    );
  }

  if (error || !order || !order.generatedContent) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#faf8f4]">
        <div className="text-center">
          <Heart className="w-12 h-12 text-[#e0d5c0] mx-auto mb-4" />
          <h1 className="font-display text-2xl text-[#2a2520] mb-2">Wedding Not Found</h1>
          <p className="font-body text-[#8a7a68]">This link may not be active yet.</p>
        </div>
      </div>
    );
  }

  const theme = themes[(order.template as TemplateName) || "sage_green"];

  return <WeddingTemplate order={order} theme={theme} />;
}
