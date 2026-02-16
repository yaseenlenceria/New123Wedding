import { useState } from "react";
import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { Heart, ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

export default function LoginPage() {
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [, setLocation] = useLocation();
  const { toast } = useToast();

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    if (!code.trim()) return;
    setLoading(true);
    try {
      const res = await apiRequest("POST", "/api/login", { accessCode: code.trim() });
      const order = await res.json();
      localStorage.setItem("orderId", String(order.id));
      setLocation("/dashboard");
    } catch {
      toast({ title: "Invalid code", description: "Please check your access code and try again.", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-[#faf8f4]">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#e8dcc8]/30 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-[#d4c5a9]/20 rounded-full blur-3xl" />
        <div className="absolute top-1/3 right-1/3 w-64 h-64 bg-[#c9a94e]/10 rounded-full blur-3xl" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 w-full max-w-md mx-4"
      >
        <div className="text-center mb-10">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
            className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#f0ebe0] mb-6"
          >
            <Heart className="w-7 h-7 text-[#c9a94e]" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="font-display text-4xl text-[#2a2520] mb-3"
          >
            Welcome
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="font-body text-[#8a7a68] text-lg"
          >
            Enter your access code to begin
          </motion.p>
        </div>

        <motion.form
          onSubmit={handleLogin}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.6 }}
          className="space-y-6"
        >
          <div className="bg-white/70 backdrop-blur-xl rounded-2xl p-8 border border-[#e8dcc8]/50 shadow-lg">
            <label className="block text-sm font-body text-[#6a5a48] mb-2 tracking-wide uppercase">
              Access Code
            </label>
            <Input
              data-testid="input-access-code"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="e.g. DEMO123"
              className="text-center text-xl tracking-[0.3em] font-mono bg-[#faf8f4]/80 border-[#e0d5c0] focus:border-[#c9a94e] focus:ring-[#c9a94e]/20 h-14"
            />
            <p className="text-xs text-[#a09080] mt-3 text-center font-body">
              You received this code after your Etsy purchase
            </p>
          </div>

          <Button
            data-testid="button-login"
            type="submit"
            disabled={loading || !code.trim()}
            className="w-full h-14 bg-[#2a2520] text-white rounded-xl text-base font-body tracking-wide gap-2"
          >
            {loading ? (
              <Sparkles className="w-5 h-5 animate-spin" />
            ) : (
              <>
                Begin Your Journey
                <ArrowRight className="w-5 h-5" />
              </>
            )}
          </Button>
        </motion.form>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="text-center text-xs text-[#b0a090] mt-8 font-body"
        >
          Crafted with love for your special day
        </motion.p>
      </motion.div>
    </div>
  );
}
