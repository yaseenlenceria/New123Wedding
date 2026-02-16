import { motion } from "framer-motion";
import { type ReactNode } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

interface WizardLayoutProps {
  children: ReactNode;
  title: string;
  subtitle?: string;
  step: number;
  totalSteps: number;
  onBack?: () => void;
  isLoading?: boolean;
}

export function WizardLayout({ children, title, subtitle, step, totalSteps, onBack, isLoading }: WizardLayoutProps) {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-4xl space-y-8">
        <div className="flex items-center justify-between">
          {onBack ? (
            <Button variant="ghost" size="sm" onClick={onBack} disabled={isLoading} className="text-muted-foreground hover:text-foreground">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back
            </Button>
          ) : (
            <div className="w-20" /> /* Spacer */
          )}
          
          <div className="flex items-center space-x-2">
            {Array.from({ length: totalSteps }).map((_, i) => (
              <div
                key={i}
                className={`h-2 rounded-full transition-all duration-300 ${
                  i + 1 === step ? "w-8 bg-primary" : i + 1 < step ? "w-2 bg-primary/40" : "w-2 bg-muted"
                }`}
              />
            ))}
          </div>
          
          <div className="w-20 text-right text-sm font-medium text-muted-foreground">
            Step {step} of {totalSteps}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-2"
        >
          <h1 className="text-3xl font-display font-bold tracking-tight text-foreground sm:text-4xl">
            {title}
          </h1>
          {subtitle && <p className="text-lg text-muted-foreground max-w-2xl mx-auto">{subtitle}</p>}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-card rounded-2xl shadow-xl border border-border/50 p-6 md:p-8"
        >
          {children}
        </motion.div>
      </div>
    </div>
  );
}
