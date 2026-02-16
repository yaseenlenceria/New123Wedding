export type TemplateName = "sage_green" | "old_money" | "minimalist" | "luxury_gold" | "botanical";

export interface ThemeConfig {
  id: TemplateName;
  name: string;
  tagline: string;
  bg: string;
  bgSecondary: string;
  text: string;
  textSecondary: string;
  accent: string;
  accentHex: string;
  accentText: string;
  glass: string;
  glassBorder: string;
  headingFont: string;
  bodyFont: string;
  scriptFont: string;
  gradient: string;
  cardBg: string;
  timelineLine: string;
  buttonBg: string;
  buttonText: string;
  envelopeBg: string;
  envelopeFlap: string;
  sealColor: string;
  ringColor: string;
  particleColor: string;
}

export const themes: Record<TemplateName, ThemeConfig> = {
  sage_green: {
    id: "sage_green",
    name: "Sage Green Botanical",
    tagline: "Nature's Tender Embrace",
    bg: "bg-[#f7f3eb]",
    bgSecondary: "bg-[#eee8da]",
    text: "text-[#2d3a1e]",
    textSecondary: "text-[#6b7a55]",
    accent: "text-[#7a8b5c]",
    accentHex: "#7a8b5c",
    accentText: "text-[#f7f3eb]",
    glass: "bg-[#f7f3eb]/60 backdrop-blur-2xl border border-[#b8c4a0]/25",
    glassBorder: "border-[#b8c4a0]/25",
    headingFont: "font-display",
    bodyFont: "font-body",
    scriptFont: "font-script",
    gradient: "from-[#7a8b5c]/60 to-[#4a5d23]/60",
    cardBg: "bg-[#e8e2d0]/50",
    timelineLine: "bg-[#7a8b5c]/20",
    buttonBg: "bg-[#7a8b5c]",
    buttonText: "text-white",
    envelopeBg: "#e8e2d0",
    envelopeFlap: "#d4ccb8",
    sealColor: "#7a8b5c",
    ringColor: "#b8c4a0",
    particleColor: "#7a8b5c",
  },
  old_money: {
    id: "old_money",
    name: "Champagne Gold Elegance",
    tagline: "Timeless Sophistication",
    bg: "bg-[#070f20]",
    bgSecondary: "bg-[#0e1830]",
    text: "text-[#e8dcc8]",
    textSecondary: "text-[#9a8e78]",
    accent: "text-[#c9a94e]",
    accentHex: "#c9a94e",
    accentText: "text-[#070f20]",
    glass: "bg-[#0e1830]/50 backdrop-blur-2xl border border-[#c9a94e]/12",
    glassBorder: "border-[#c9a94e]/12",
    headingFont: "font-display",
    bodyFont: "font-body",
    scriptFont: "font-script",
    gradient: "from-[#c9a94e]/60 to-[#8a7030]/60",
    cardBg: "bg-[#12203d]/50",
    timelineLine: "bg-[#c9a94e]/15",
    buttonBg: "bg-[#c9a94e]",
    buttonText: "text-[#070f20]",
    envelopeBg: "#1a2540",
    envelopeFlap: "#0e1830",
    sealColor: "#c9a94e",
    ringColor: "#c9a94e",
    particleColor: "#c9a94e",
  },
  minimalist: {
    id: "minimalist",
    name: "Ivory & Cream Minimal",
    tagline: "Less Is Everything",
    bg: "bg-[#faf9f6]",
    bgSecondary: "bg-[#f2f0eb]",
    text: "text-[#1a1a1a]",
    textSecondary: "text-[#7a7a7a]",
    accent: "text-[#3a3a3a]",
    accentHex: "#3a3a3a",
    accentText: "text-[#faf9f6]",
    glass: "bg-[#ffffff]/50 backdrop-blur-2xl border border-[#d5d0c8]/30",
    glassBorder: "border-[#d5d0c8]/30",
    headingFont: "font-display",
    bodyFont: "font-body",
    scriptFont: "font-script",
    gradient: "from-[#1a1a1a]/40 to-[#6a6a6a]/40",
    cardBg: "bg-[#f0eeea]/60",
    timelineLine: "bg-[#1a1a1a]/10",
    buttonBg: "bg-[#1a1a1a]",
    buttonText: "text-white",
    envelopeBg: "#f0eeea",
    envelopeFlap: "#e5e2dc",
    sealColor: "#8a8070",
    ringColor: "#c0b8a8",
    particleColor: "#b0a890",
  },
  luxury_gold: {
    id: "luxury_gold",
    name: "Dusty Rose Romantic",
    tagline: "Blushing Romance",
    bg: "bg-[#fdf2ef]",
    bgSecondary: "bg-[#f5e5e0]",
    text: "text-[#3d2422]",
    textSecondary: "text-[#8a6560]",
    accent: "text-[#c07060]",
    accentHex: "#c07060",
    accentText: "text-[#fdf2ef]",
    glass: "bg-[#fdf2ef]/55 backdrop-blur-2xl border border-[#d4a8a0]/20",
    glassBorder: "border-[#d4a8a0]/20",
    headingFont: "font-display",
    bodyFont: "font-body",
    scriptFont: "font-script",
    gradient: "from-[#c07060]/60 to-[#904840]/60",
    cardBg: "bg-[#f0ddd8]/50",
    timelineLine: "bg-[#c07060]/18",
    buttonBg: "bg-[#c07060]",
    buttonText: "text-white",
    envelopeBg: "#f0ddd8",
    envelopeFlap: "#e5ccc6",
    sealColor: "#c07060",
    ringColor: "#d4a8a0",
    particleColor: "#c07060",
  },
  botanical: {
    id: "botanical",
    name: "Black & Gold Royal",
    tagline: "Grand Celebration",
    bg: "bg-[#0a0a0a]",
    bgSecondary: "bg-[#141414]",
    text: "text-[#e8dcc8]",
    textSecondary: "text-[#8a8070]",
    accent: "text-[#d4af37]",
    accentHex: "#d4af37",
    accentText: "text-[#0a0a0a]",
    glass: "bg-[#141414]/60 backdrop-blur-2xl border border-[#d4af37]/10",
    glassBorder: "border-[#d4af37]/10",
    headingFont: "font-display",
    bodyFont: "font-body",
    scriptFont: "font-script",
    gradient: "from-[#d4af37]/60 to-[#8a7020]/60",
    cardBg: "bg-[#1a1a1a]/60",
    timelineLine: "bg-[#d4af37]/15",
    buttonBg: "bg-[#d4af37]",
    buttonText: "text-[#0a0a0a]",
    envelopeBg: "#1a1a0f",
    envelopeFlap: "#0f0f08",
    sealColor: "#d4af37",
    ringColor: "#d4af37",
    particleColor: "#d4af37",
  },
};
