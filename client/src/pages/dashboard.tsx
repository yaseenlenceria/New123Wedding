import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { useQuery, useMutation } from "@tanstack/react-query";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Sparkles, ArrowRight, ArrowLeft, Plus, Trash2, MapPin, Clock, Calendar, Shirt, Bus, Hotel, Gift, Music, CheckCircle2, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { themes, type TemplateName, type ThemeConfig } from "@/lib/themes";
import type { Order } from "@shared/schema";

const steps = [
  { label: "Choose Style", icon: Heart },
  { label: "Your Details", icon: Calendar },
  { label: "The Day", icon: Clock },
  { label: "Generate", icon: Sparkles },
];

export default function DashboardPage() {
  const [, setLocation] = useLocation();
  const orderId = localStorage.getItem("orderId");
  const [step, setStep] = useState(0);
  const { toast } = useToast();

  useEffect(() => {
    if (!orderId) setLocation("/");
  }, [orderId, setLocation]);

  const { data: order, isLoading } = useQuery<Order>({
    queryKey: ["/api/orders", orderId],
    enabled: !!orderId,
  });

  const updateMutation = useMutation({
    mutationFn: (data: Record<string, unknown>) => apiRequest("PUT", `/api/orders/${orderId}`, data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["/api/orders", orderId] }),
  });

  const generateMutation = useMutation({
    mutationFn: () => apiRequest("POST", `/api/orders/${orderId}/generate`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/orders", orderId] });
      setLocation("/preview");
    },
    onError: () => toast({ title: "Generation failed", description: "Please try again.", variant: "destructive" }),
  });

  if (isLoading || !order) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#faf8f4]">
        <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 2 }}>
          <Heart className="w-8 h-8 text-[#c9a94e]" />
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#faf8f4] relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#e8dcc8]/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#d4c5a9]/15 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-2xl mx-auto px-4 py-8">
        <div className="flex items-center justify-center gap-2 mb-2">
          {steps.map((s, i) => (
            <div key={i} className="flex items-center gap-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs transition-all duration-500 ${
                i === step ? "bg-[#2a2520] text-white scale-110" :
                i < step ? "bg-[#c9a94e] text-white" :
                "bg-[#e8dcc8] text-[#8a7a68]"
              }`}>
                {i < step ? <CheckCircle2 className="w-4 h-4" /> : <s.icon className="w-4 h-4" />}
              </div>
              {i < steps.length - 1 && <div className={`w-8 h-0.5 transition-all duration-500 ${i < step ? "bg-[#c9a94e]" : "bg-[#e0d5c0]"}`} />}
            </div>
          ))}
        </div>
        <p className="text-center text-sm text-[#8a7a68] font-body mb-2">{steps[step].label}</p>

        {order.generatedContent && (
          <div className="text-center mb-6">
            <Button
              data-testid="button-view-preview"
              onClick={() => setLocation("/preview")}
              variant="outline"
              className="gap-2 font-body text-xs border-[#c9a94e]/30 text-[#8a7030]"
            >
              <Eye className="w-3.5 h-3.5" /> View Your Wedding Site
            </Button>
          </div>
        )}

        <AnimatePresence mode="wait">
          {step === 0 && (
            <StepChooseStyle
              key="style"
              selected={order.template as TemplateName | undefined}
              onSelect={async (t) => {
                await updateMutation.mutateAsync({ template: t });
                setStep(1);
              }}
            />
          )}
          {step === 1 && (
            <StepDetails
              key="details"
              order={order}
              onNext={async (details) => {
                await updateMutation.mutateAsync({ weddingDetails: { ...(order.weddingDetails || {}), ...details } });
                setStep(2);
              }}
              onBack={() => setStep(0)}
            />
          )}
          {step === 2 && (
            <StepAgenda
              key="agenda"
              order={order}
              onNext={async (data) => {
                await updateMutation.mutateAsync({ weddingDetails: { ...(order.weddingDetails || {}), ...data } });
                setStep(3);
              }}
              onBack={() => setStep(1)}
            />
          )}
          {step === 3 && (
            <StepGenerate
              key="generate"
              loading={generateMutation.isPending}
              onGenerate={() => generateMutation.mutate()}
              onBack={() => setStep(2)}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function TemplateMiniPreview({ theme }: { theme: ThemeConfig }) {
  return (
    <div className={`w-full h-full ${theme.bg} rounded-xl p-4 flex flex-col items-center justify-center text-center`}>
      <p className={`${theme.scriptFont} ${theme.accent} text-[8px] tracking-[0.3em] uppercase mb-1 opacity-70`}>Together With Their Families</p>
      <p className={`${theme.headingFont} ${theme.text} text-sm leading-tight`}>Emma</p>
      <p className={`${theme.scriptFont} ${theme.accent} text-[10px] my-0.5`}>&amp;</p>
      <p className={`${theme.headingFont} ${theme.text} text-sm leading-tight`}>Lucas</p>
      <div className={`w-6 h-px mt-2 bg-gradient-to-r ${theme.gradient}`} />
      <p className={`${theme.textSecondary} text-[7px] mt-1.5 font-body`}>June 22, 2027</p>
    </div>
  );
}

function StepChooseStyle({ selected, onSelect }: { selected?: TemplateName; onSelect: (t: TemplateName) => void }) {
  const templateList = Object.values(themes);

  return (
    <motion.div initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }} transition={{ duration: 0.5 }}>
      <div className="text-center mb-8">
        <h2 className="font-display text-3xl text-[#2a2520] mb-2">Choose Your Style</h2>
        <p className="font-body text-[#8a7a68]">Each theme tells your story differently</p>
      </div>
      <div className="grid grid-cols-1 gap-4">
        {templateList.map((theme, i) => (
          <motion.button
            key={theme.id}
            data-testid={`button-template-${theme.id}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            onClick={() => onSelect(theme.id)}
            className={`relative overflow-hidden rounded-2xl text-left transition-all duration-500 group ${
              selected === theme.id ? "ring-2 ring-[#c9a94e] shadow-lg" : "shadow-sm"
            }`}
          >
            <div className={`absolute inset-0 ${theme.bg}`} />
            <div className="relative z-10 flex items-center gap-4 p-4">
              <div className="w-24 h-28 flex-shrink-0 rounded-xl overflow-hidden border border-white/10 shadow-inner transition-transform duration-500 group-hover:scale-105">
                <TemplateMiniPreview theme={theme} />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className={`text-base font-display ${theme.text} mb-0.5`}>{theme.name}</h3>
                <p className={`text-xs font-body ${theme.textSecondary} mb-2`}>{theme.tagline}</p>
                <div className="flex gap-1.5">
                  <div className={`w-4 h-4 rounded-full ${theme.buttonBg} shadow-sm`} />
                  <div className={`w-4 h-4 rounded-full ${theme.bg} border ${theme.glassBorder}`} />
                  <div className={`w-4 h-4 rounded-full ${theme.bgSecondary}`} />
                </div>
              </div>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
                selected === theme.id ? `${theme.buttonBg}` : "bg-white/20"
              }`}>
                <Heart className={`w-3.5 h-3.5 ${selected === theme.id ? theme.buttonText : theme.textSecondary}`} />
              </div>
            </div>
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
}

function StepDetails({ order, onNext, onBack }: { order: Order; onNext: (d: Record<string, string>) => void; onBack: () => void }) {
  const d = order.weddingDetails || {} as any;
  const [form, setForm] = useState({
    coupleNames: d.coupleNames || "",
    weddingDate: d.weddingDate || "",
    weddingTime: d.weddingTime || "",
    venue: d.venue || "",
    venueAddress: d.venueAddress || "",
    googleMapsUrl: d.googleMapsUrl || "",
    loveStory: d.loveStory || "",
    dressCode: d.dressCode || "",
    transportation: d.transportation || "",
    accommodation: d.accommodation || "",
    registryLinks: d.registryLinks || "",
    musicLink: d.musicLink || "",
  });

  const update = (key: string, val: string) => setForm((f) => ({ ...f, [key]: val }));
  const valid = form.coupleNames && form.weddingDate && form.venue;

  return (
    <motion.div initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }} transition={{ duration: 0.4 }}>
      <div className="text-center mb-8">
        <h2 className="font-display text-3xl text-[#2a2520] mb-2">Tell Us About You</h2>
        <p className="font-body text-[#8a7a68]">Let's start with your love story...</p>
      </div>

      <div className="space-y-5">
        <GlassField label="Couple Names" icon={<Heart className="w-4 h-4" />} required>
          <Input data-testid="input-couple-names" value={form.coupleNames} onChange={(e) => update("coupleNames", e.target.value)} placeholder="Emma & Lucas" className="bg-transparent border-0 focus-visible:ring-0 text-lg font-body" />
        </GlassField>

        <div className="grid grid-cols-2 gap-4">
          <GlassField label="Wedding Date" icon={<Calendar className="w-4 h-4" />} required>
            <Input data-testid="input-wedding-date" type="date" value={form.weddingDate} onChange={(e) => update("weddingDate", e.target.value)} className="bg-transparent border-0 focus-visible:ring-0 font-body" />
          </GlassField>
          <GlassField label="Time" icon={<Clock className="w-4 h-4" />}>
            <Input data-testid="input-wedding-time" type="time" value={form.weddingTime} onChange={(e) => update("weddingTime", e.target.value)} className="bg-transparent border-0 focus-visible:ring-0 font-body" />
          </GlassField>
        </div>

        <GlassField label="Venue" icon={<MapPin className="w-4 h-4" />} required>
          <Input data-testid="input-venue" value={form.venue} onChange={(e) => update("venue", e.target.value)} placeholder="The Grand Estate" className="bg-transparent border-0 focus-visible:ring-0 font-body" />
        </GlassField>

        <GlassField label="Venue Address" icon={<MapPin className="w-4 h-4" />}>
          <Input data-testid="input-venue-address" value={form.venueAddress} onChange={(e) => update("venueAddress", e.target.value)} placeholder="123 Elegance Lane, Paris" className="bg-transparent border-0 focus-visible:ring-0 font-body" />
        </GlassField>

        <GlassField label="Google Maps Link" icon={<MapPin className="w-4 h-4" />}>
          <Input data-testid="input-maps-url" value={form.googleMapsUrl} onChange={(e) => update("googleMapsUrl", e.target.value)} placeholder="https://maps.google.com/..." className="bg-transparent border-0 focus-visible:ring-0 font-body" />
        </GlassField>

        <GlassField label="Your Love Story" icon={<Heart className="w-4 h-4" />}>
          <Textarea data-testid="input-love-story" value={form.loveStory} onChange={(e) => update("loveStory", e.target.value)} placeholder="How did you meet? What makes your love special?" className="bg-transparent border-0 focus-visible:ring-0 font-body resize-none min-h-[100px]" />
        </GlassField>

        <div className="grid grid-cols-2 gap-4">
          <GlassField label="Dress Code" icon={<Shirt className="w-4 h-4" />}>
            <Input data-testid="input-dress-code" value={form.dressCode} onChange={(e) => update("dressCode", e.target.value)} placeholder="Black Tie" className="bg-transparent border-0 focus-visible:ring-0 font-body" />
          </GlassField>
          <GlassField label="Music Link" icon={<Music className="w-4 h-4" />}>
            <Input data-testid="input-music" value={form.musicLink} onChange={(e) => update("musicLink", e.target.value)} placeholder="Spotify/YouTube link" className="bg-transparent border-0 focus-visible:ring-0 font-body" />
          </GlassField>
        </div>

        <GlassField label="Transportation" icon={<Bus className="w-4 h-4" />}>
          <Input data-testid="input-transportation" value={form.transportation} onChange={(e) => update("transportation", e.target.value)} placeholder="Shuttle available from downtown" className="bg-transparent border-0 focus-visible:ring-0 font-body" />
        </GlassField>

        <GlassField label="Accommodation" icon={<Hotel className="w-4 h-4" />}>
          <Input data-testid="input-accommodation" value={form.accommodation} onChange={(e) => update("accommodation", e.target.value)} placeholder="Room block at The Grand Hotel" className="bg-transparent border-0 focus-visible:ring-0 font-body" />
        </GlassField>

        <GlassField label="Wedding Registry" icon={<Gift className="w-4 h-4" />}>
          <Input data-testid="input-registry" value={form.registryLinks} onChange={(e) => update("registryLinks", e.target.value)} placeholder="Registry link" className="bg-transparent border-0 focus-visible:ring-0 font-body" />
        </GlassField>
      </div>

      <div className="flex gap-3 mt-8">
        <Button data-testid="button-back-style" onClick={onBack} variant="outline" className="flex-1 h-12 font-body gap-2">
          <ArrowLeft className="w-4 h-4" /> Back
        </Button>
        <Button data-testid="button-next-agenda" onClick={() => onNext(form)} disabled={!valid} className="flex-1 h-12 bg-[#2a2520] text-white font-body gap-2">
          Continue <ArrowRight className="w-4 h-4" />
        </Button>
      </div>
    </motion.div>
  );
}

function StepAgenda({ order, onNext, onBack }: { order: Order; onNext: (d: Record<string, unknown>) => void; onBack: () => void }) {
  const existing = order.weddingDetails?.agenda || [];
  const [agenda, setAgenda] = useState<{ time: string; event: string }[]>(
    existing.length > 0 ? existing : [
      { time: "4:00 PM", event: "Wedding Ceremony" },
      { time: "5:00 PM", event: "Cocktail Hour" },
      { time: "6:30 PM", event: "Dinner Reception" },
      { time: "9:00 PM", event: "Dance & Celebration" },
    ]
  );

  const [mealOptions, setMealOptions] = useState<string[]>(
    order.weddingDetails?.guestMealOptions || ["Beef", "Chicken", "Fish", "Vegetarian"]
  );

  const addItem = () => setAgenda([...agenda, { time: "", event: "" }]);
  const removeItem = (i: number) => setAgenda(agenda.filter((_, idx) => idx !== i));
  const updateItem = (i: number, key: string, val: string) => setAgenda(agenda.map((a, idx) => idx === i ? { ...a, [key]: val } : a));

  return (
    <motion.div initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }} transition={{ duration: 0.4 }}>
      <div className="text-center mb-8">
        <h2 className="font-display text-3xl text-[#2a2520] mb-2">Plan The Day</h2>
        <p className="font-body text-[#8a7a68]">Outline the moments that matter</p>
      </div>

      <div className="space-y-3">
        {agenda.map((item, i) => (
          <div key={i} className="flex gap-2 items-center">
            <div className="flex-1 bg-white/70 backdrop-blur-xl rounded-xl p-3 border border-[#e8dcc8]/50 flex gap-2">
              <Input value={item.time} onChange={(e) => updateItem(i, "time", e.target.value)} placeholder="4:00 PM" className="bg-transparent border-0 focus-visible:ring-0 font-body w-28 flex-shrink-0" />
              <Input value={item.event} onChange={(e) => updateItem(i, "event", e.target.value)} placeholder="Event name" className="bg-transparent border-0 focus-visible:ring-0 font-body flex-1" />
            </div>
            {agenda.length > 1 && (
              <Button size="icon" variant="ghost" onClick={() => removeItem(i)}>
                <Trash2 className="w-4 h-4 text-[#a09080]" />
              </Button>
            )}
          </div>
        ))}
        <Button data-testid="button-add-agenda" onClick={addItem} variant="outline" className="w-full gap-2 font-body border-dashed border-[#c9a94e]/40 text-[#8a7a68]">
          <Plus className="w-4 h-4" /> Add Event
        </Button>
      </div>

      <div className="mt-8">
        <h3 className="font-display text-lg text-[#2a2520] mb-3">Guest Meal Options</h3>
        <div className="flex flex-wrap gap-2">
          {mealOptions.map((m, i) => (
            <div key={i} className="bg-white/70 backdrop-blur-xl rounded-lg px-3 py-1.5 border border-[#e8dcc8]/50 flex items-center gap-2">
              <span className="font-body text-sm text-[#4a3a28]">{m}</span>
              <button onClick={() => setMealOptions(mealOptions.filter((_, idx) => idx !== i))} className="text-[#a09080]">
                <Trash2 className="w-3 h-3" />
              </button>
            </div>
          ))}
          <button
            onClick={() => {
              const opt = prompt("Add meal option:");
              if (opt) setMealOptions([...mealOptions, opt]);
            }}
            className="bg-white/40 backdrop-blur-xl rounded-lg px-3 py-1.5 border border-dashed border-[#c9a94e]/40 text-sm text-[#8a7a68] font-body"
          >
            + Add
          </button>
        </div>
      </div>

      <div className="flex gap-3 mt-8">
        <Button data-testid="button-back-details" onClick={onBack} variant="outline" className="flex-1 h-12 font-body gap-2">
          <ArrowLeft className="w-4 h-4" /> Back
        </Button>
        <Button data-testid="button-next-generate" onClick={() => onNext({ agenda, guestMealOptions: mealOptions })} className="flex-1 h-12 bg-[#2a2520] text-white font-body gap-2">
          Continue <ArrowRight className="w-4 h-4" />
        </Button>
      </div>
    </motion.div>
  );
}

function StepGenerate({ loading, onGenerate, onBack }: { loading: boolean; onGenerate: () => void; onBack: () => void }) {
  const messages = [
    "Writing your love story...",
    "Designing your special day...",
    "Adding the finishing touches...",
    "Making it beautiful...",
  ];
  const [msgIdx, setMsgIdx] = useState(0);

  useEffect(() => {
    if (!loading) return;
    const interval = setInterval(() => setMsgIdx((i) => (i + 1) % messages.length), 3000);
    return () => clearInterval(interval);
  }, [loading]);

  return (
    <motion.div initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }} transition={{ duration: 0.4 }} className="text-center">
      <div className="mb-8">
        <h2 className="font-display text-3xl text-[#2a2520] mb-2">Ready to Create Magic?</h2>
        <p className="font-body text-[#8a7a68]">Our AI will craft a beautiful, personalized wedding website just for you</p>
      </div>

      <div className="bg-white/70 backdrop-blur-xl rounded-2xl p-10 border border-[#e8dcc8]/50 mb-8">
        {loading ? (
          <div className="space-y-6">
            <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 3, ease: "linear" }}>
              <Sparkles className="w-12 h-12 text-[#c9a94e] mx-auto" />
            </motion.div>
            <AnimatePresence mode="wait">
              <motion.p key={msgIdx} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="font-body text-lg text-[#6a5a48]">
                {messages[msgIdx]}
              </motion.p>
            </AnimatePresence>
          </div>
        ) : (
          <div className="space-y-4">
            <Heart className="w-12 h-12 text-[#c9a94e] mx-auto" />
            <p className="font-body text-[#6a5a48]">Everything looks perfect. Let's bring your vision to life.</p>
          </div>
        )}
      </div>

      <div className="flex gap-3">
        <Button data-testid="button-back-agenda" onClick={onBack} disabled={loading} variant="outline" className="flex-1 h-12 font-body gap-2">
          <ArrowLeft className="w-4 h-4" /> Back
        </Button>
        <Button data-testid="button-generate" onClick={onGenerate} disabled={loading} className="flex-1 h-14 bg-gradient-to-r from-[#c9a94e] to-[#8a7030] text-white font-body text-lg gap-2 rounded-xl">
          {loading ? "Creating..." : "Generate Website"}
          <Sparkles className="w-5 h-5" />
        </Button>
      </div>
    </motion.div>
  );
}

function GlassField({ label, icon, required, children }: { label: string; icon?: React.ReactNode; required?: boolean; children: React.ReactNode }) {
  return (
    <div className="bg-white/70 backdrop-blur-xl rounded-xl p-3 border border-[#e8dcc8]/50">
      <div className="flex items-center gap-2 mb-1 px-1">
        {icon && <span className="text-[#c9a94e]">{icon}</span>}
        <span className="text-xs font-body text-[#8a7a68] tracking-wide uppercase">{label}{required && " *"}</span>
      </div>
      {children}
    </div>
  );
}
