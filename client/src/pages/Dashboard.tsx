import { useEffect, useState } from "react";
import { useRoute, useLocation } from "wouter";
import { useOrder, useUpdateOrder, useGenerateWebsite } from "@/hooks/use-orders";
import { WizardLayout } from "@/components/WizardLayout";
import { TemplateCard } from "@/components/TemplateCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Wand2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// Step 1: Template Selection
const templates = [
  {
    id: "sage_green",
    name: "Sage Green",
    description: "Natural, organic, and grounded. Perfect for outdoor weddings.",
    // Unsplash: Wedding table setting with greenery
    imageUrl: "https://images.unsplash.com/photo-1519225421980-715cb0202128?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: "old_money",
    name: "Old Money",
    description: "Classic, timeless elegance with navy and cream tones.",
    // Unsplash: Elegant wedding invitation flatlay
    imageUrl: "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: "minimalist",
    name: "Minimalist",
    description: "Clean lines, plenty of whitespace, modern typography.",
    // Unsplash: Minimal modern wedding decor
    imageUrl: "https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: "luxury_gold",
    name: "Luxury Gold",
    description: "Opulent, sophisticated, with shimmering gold accents.",
    // Unsplash: Gold wedding details
    imageUrl: "https://images.unsplash.com/photo-1522673607200-1645062cd495?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: "botanical",
    name: "Botanical",
    description: "Soft pastels and floral illustrations for a romantic vibe.",
    // Unsplash: Pink flowers wedding bouquet
    imageUrl: "https://images.unsplash.com/photo-1525258946800-98cfd641d0de?auto=format&fit=crop&q=80&w=800",
  },
];

export default function Dashboard() {
  const [match, params] = useRoute("/dashboard/:id");
  const [, setLocation] = useLocation();
  const id = params ? parseInt(params.id) : undefined;
  
  const { data: order, isLoading } = useOrder(id);
  const { mutate: updateOrder, isPending: isUpdating } = useUpdateOrder();
  const { mutate: generateWebsite, isPending: isGenerating } = useGenerateWebsite();
  const { toast } = useToast();

  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<any>({});

  // Initialize form data when order loads
  useEffect(() => {
    if (order) {
      if (order.status === "completed" && order.generatedContent) {
        setLocation(`/preview/${order.id}`);
      }
      setFormData(order.weddingDetails || {});
    }
  }, [order, setLocation]);

  if (isLoading || !order) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="w-12 h-12 animate-spin text-primary" />
      </div>
    );
  }

  const handleNext = () => {
    if (step === 1 && !order.template) {
      toast({ variant: "destructive", title: "Please select a template" });
      return;
    }
    setStep(s => s + 1);
  };

  const handleBack = () => {
    setStep(s => s - 1);
  };

  const handleUpdateDetails = (key: string, value: any) => {
    setFormData((prev: any) => ({ ...prev, [key]: value }));
  };

  const saveDetails = async () => {
    updateOrder({ 
      id: order.id, 
      data: { weddingDetails: formData } 
    }, {
      onSuccess: () => {
        handleGenerate();
      },
      onError: () => {
        toast({ variant: "destructive", title: "Failed to save details" });
      }
    });
  };

  const handleGenerate = () => {
    generateWebsite(order.id, {
      onSuccess: () => {
        toast({ title: "Website Generated!", description: "Redirecting to preview..." });
        setLocation(`/preview/${order.id}`);
      },
      onError: () => {
        toast({ variant: "destructive", title: "Generation failed", description: "Please try again." });
      }
    });
  };

  // --- STEP 1: TEMPLATE SELECTION ---
  if (step === 1) {
    return (
      <WizardLayout 
        title="Choose Your Aesthetic" 
        subtitle="Select a template that matches your wedding vibe. You can customize colors later."
        step={1} 
        totalSteps={3}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {templates.map((t) => (
            <TemplateCard
              key={t.id}
              {...t}
              selected={order.template === t.id}
              onSelect={() => updateOrder({ id: order.id, data: { template: t.id } })}
            />
          ))}
        </div>
        
        <div className="mt-8 flex justify-end">
          <Button onClick={handleNext} size="lg" className="px-8" disabled={isUpdating}>
            Continue
          </Button>
        </div>
      </WizardLayout>
    );
  }

  // --- STEP 2: WEDDING DETAILS ---
  if (step === 2) {
    return (
      <WizardLayout
        title="Tell Us Your Story"
        subtitle="Our AI will use these details to write your welcome message, story, and schedule."
        step={2}
        totalSteps={3}
        onBack={handleBack}
      >
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label>Couple Names (e.g., "Sarah & James")</Label>
              <Input 
                value={formData.coupleNames || ""} 
                onChange={e => handleUpdateDetails("coupleNames", e.target.value)}
                placeholder="Names"
              />
            </div>
            <div className="space-y-2">
              <Label>Wedding Date</Label>
              <Input 
                type="date"
                value={formData.weddingDate || ""} 
                onChange={e => handleUpdateDetails("weddingDate", e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Venue Name & Location</Label>
            <Input 
              value={formData.venue || ""} 
              onChange={e => handleUpdateDetails("venue", e.target.value)}
              placeholder="e.g. The Grand Hotel, New York"
            />
          </div>

          <div className="space-y-2">
            <Label>Our Love Story (Key points)</Label>
            <Textarea 
              value={formData.loveStory || ""} 
              onChange={e => handleUpdateDetails("loveStory", e.target.value)}
              placeholder="How you met, the proposal, what you love about each other..."
              className="min-h-[120px]"
            />
            <p className="text-xs text-muted-foreground">Don't worry about grammar. AI will rewrite this beautifully.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label>Dress Code (Optional)</Label>
              <Input 
                value={formData.dressCode || ""} 
                onChange={e => handleUpdateDetails("dressCode", e.target.value)}
                placeholder="e.g. Black Tie Optional"
              />
            </div>
            <div className="space-y-2">
              <Label>Registry Link (Optional)</Label>
              <Input 
                value={formData.registryLinks || ""} 
                onChange={e => handleUpdateDetails("registryLinks", e.target.value)}
                placeholder="https://zola.com/..."
              />
            </div>
          </div>

          <div className="mt-8 flex justify-end">
            <Button onClick={handleNext} size="lg" className="px-8">
              Review & Generate
            </Button>
          </div>
        </div>
      </WizardLayout>
    );
  }

  // --- STEP 3: GENERATE ---
  return (
    <WizardLayout
      title="Ready to Create Magic?"
      subtitle="We'll generate a custom website based on your details and selected theme."
      step={3}
      totalSteps={3}
      onBack={handleBack}
    >
      <div className="flex flex-col items-center justify-center py-12 space-y-6">
        {isGenerating || isUpdating ? (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center space-y-4"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full animate-pulse" />
              <Wand2 className="w-16 h-16 text-primary relative z-10 animate-bounce" />
            </div>
            <h3 className="text-2xl font-display font-bold">Weaving your story...</h3>
            <p className="text-muted-foreground max-w-sm mx-auto">
              Our AI is writing your love story, formatting your schedule, and polishing your design.
            </p>
          </motion.div>
        ) : (
          <div className="text-center space-y-6 max-w-md mx-auto">
            <div className="p-6 bg-muted/30 rounded-full w-24 h-24 mx-auto flex items-center justify-center">
              <Wand2 className="w-10 h-10 text-primary" />
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-bold">One click away</h3>
              <p className="text-muted-foreground">
                Click the button below to generate your personalized wedding website. You can still edit everything in the preview.
              </p>
            </div>
            <Button 
              onClick={saveDetails} 
              size="lg" 
              className="w-full text-lg h-14 shadow-lg shadow-primary/20"
            >
              Generate Website
            </Button>
          </div>
        )}
      </div>
    </WizardLayout>
  );
}
