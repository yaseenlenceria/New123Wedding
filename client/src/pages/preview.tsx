import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Download, ExternalLink, Share2, ArrowLeft, Eye, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import WeddingTemplate from "@/components/wedding-template";
import { themes, type TemplateName } from "@/lib/themes";
import { useToast } from "@/hooks/use-toast";
import type { Order } from "@shared/schema";

export default function PreviewPage() {
  const [, setLocation] = useLocation();
  const orderId = localStorage.getItem("orderId");
  const [showControls, setShowControls] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    if (!orderId) setLocation("/dashboard");
  }, [orderId, setLocation]);

  const { data: order, isLoading } = useQuery<Order>({
    queryKey: ["/api/orders", orderId],
    enabled: !!orderId,
  });

  useEffect(() => {
    if (order && !order.generatedContent) {
      setLocation("/dashboard");
    }
  }, [order, setLocation]);

  if (isLoading || !order || !order.generatedContent) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#faf8f4]">
        <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 2 }}>
          <Heart className="w-8 h-8 text-[#c9a94e]" />
        </motion.div>
      </div>
    );
  }

  const theme = themes[(order.template as TemplateName) || "sage_green"];

  async function handleDownload() {
    try {
      const res = await fetch(`/api/orders/${orderId}/download`);
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "wedding-website.zip";
      a.click();
      URL.revokeObjectURL(url);
      toast({ title: "Downloaded!", description: "Your wedding website files are ready." });
    } catch {
      toast({ title: "Download failed", variant: "destructive" });
    }
  }

  function handleShare() {
    const url = window.location.origin + `/wedding/${orderId}`;
    if (navigator.share) {
      navigator.share({ title: `${order!.weddingDetails?.coupleNames}'s Wedding`, url });
    } else {
      navigator.clipboard.writeText(url);
      toast({ title: "Link copied!", description: "Wedding link copied to clipboard." });
    }
  }

  return (
    <div className="relative">
      <AnimatePresence>
        {showControls && (
          <motion.div
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -100, opacity: 0 }}
            className="fixed top-0 left-0 right-0 z-[60] bg-white/80 backdrop-blur-xl border-b border-[#e8dcc8]/50"
          >
            <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between gap-3 flex-wrap">
              <div className="flex items-center gap-3">
                <Button data-testid="button-back-dashboard" onClick={() => setLocation("/dashboard")} variant="ghost" size="icon">
                  <ArrowLeft className="w-4 h-4" />
                </Button>
                <div>
                  <p className="text-sm font-display text-[#2a2520]">{order.weddingDetails?.coupleNames}</p>
                  <p className="text-xs text-[#8a7a68] font-body">{theme.name}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button data-testid="button-change-template" onClick={() => setLocation("/dashboard")} variant="outline" className="gap-2 font-body text-xs">
                  <Home className="w-3.5 h-3.5" /> Change Style
                </Button>
                <Button data-testid="button-share" onClick={handleShare} variant="outline" className="gap-2 font-body text-xs">
                  <Share2 className="w-3.5 h-3.5" /> Share
                </Button>
                <Button data-testid="button-download" onClick={handleDownload} variant="outline" className="gap-2 font-body text-xs">
                  <Download className="w-3.5 h-3.5" /> Download
                </Button>
                <Button data-testid="button-live-link" onClick={() => window.open(`/wedding/${orderId}`, '_blank')} className="gap-2 bg-[#2a2520] text-white font-body text-xs">
                  <ExternalLink className="w-3.5 h-3.5" /> Live Link
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setShowControls(!showControls)}
        className="fixed bottom-4 right-4 z-[60] w-10 h-10 rounded-full bg-[#2a2520] text-white flex items-center justify-center shadow-lg"
        data-testid="button-toggle-controls"
      >
        <Eye className="w-4 h-4" />
      </button>

      <div className={showControls ? "pt-14" : ""}>
        <WeddingTemplate order={order} theme={theme} />
      </div>
    </div>
  );
}
