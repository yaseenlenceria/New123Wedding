import { useState } from "react";
import { useLocation } from "wouter";
import { useLogin } from "@/hooks/use-orders";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Loader2, HeartHandshake } from "lucide-react";
import { motion } from "framer-motion";

export default function Login() {
  const [accessCode, setAccessCode] = useState("");
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const { mutate, isPending } = useLogin();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!accessCode.trim()) return;

    mutate(accessCode, {
      onSuccess: (order) => {
        toast({
          title: "Welcome back!",
          description: "Let's continue building your dream wedding website.",
        });
        setLocation(`/dashboard/${order.id}`);
      },
      onError: (error) => {
        toast({
          variant: "destructive",
          title: "Access Denied",
          description: error.message,
        });
      },
    });
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background p-4 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
        <div className="absolute -top-[20%] -right-[10%] w-[600px] h-[600px] rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute -bottom-[20%] -left-[10%] w-[500px] h-[500px] rounded-full bg-accent/30 blur-3xl" />
      </div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="bg-card border border-border/50 shadow-xl rounded-2xl p-8 md:p-10 space-y-8 backdrop-blur-sm">
          <div className="text-center space-y-2">
            <div className="flex justify-center mb-6">
              <div className="bg-primary/5 p-4 rounded-full">
                <HeartHandshake className="w-10 h-10 text-primary" />
              </div>
            </div>
            <h1 className="text-3xl font-display font-bold">Wedding Access</h1>
            <p className="text-muted-foreground">
              Enter the unique access code from your Etsy order to begin customizing your site.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Input
                type="text"
                placeholder="Enter Access Code (e.g. WED-1234)"
                value={accessCode}
                onChange={(e) => setAccessCode(e.target.value)}
                className="h-12 text-center text-lg tracking-widest uppercase font-mono placeholder:normal-case placeholder:font-sans placeholder:tracking-normal"
                disabled={isPending}
              />
            </div>
            <Button 
              type="submit" 
              className="w-full h-12 text-lg font-medium transition-all hover:scale-[1.02]" 
              disabled={isPending || !accessCode}
            >
              {isPending ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Verifying...
                </>
              ) : (
                "Start Customizing"
              )}
            </Button>
          </form>

          <div className="text-center">
            <a href="#" className="text-xs text-muted-foreground hover:text-primary underline underline-offset-4">
              Where do I find my code?
            </a>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
