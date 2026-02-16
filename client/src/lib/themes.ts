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
}

export const themes: Record<TemplateName, ThemeConfig> = {
  sage_green: {
    id: "sage_green",
    name: "Sage Green Botanical",
    tagline: "Nature's Embrace",
    bg: "bg-[#f5f0e8]",
    bgSecondary: "bg-[#eae5d6]",
    text: "text-[#3d4a2e]",
    textSecondary: "text-[#6b7a5a]",
    accent: "text-[#7a8b5c]",
    accentText: "text-[#f5f0e8]",
    glass: "bg-[#f5f0e8]/70 backdrop-blur-xl border border-[#c5c0a8]/30",
    glassBorder: "border-[#c5c0a8]/30",
    headingFont: "font-display",
    bodyFont: "font-body",
    scriptFont: "font-script",
    gradient: "from-[#7a8b5c] to-[#4a5d23]",
    cardBg: "bg-[#eae5d6]/80",
    timelineLine: "bg-[#7a8b5c]/30",
    buttonBg: "bg-[#7a8b5c]",
    buttonText: "text-white",
  },
  old_money: {
    id: "old_money",
    name: "Old Money",
    tagline: "Timeless Elegance",
    bg: "bg-[#0a1628]",
    bgSecondary: "bg-[#111f3a]",
    text: "text-[#e8dcc8]",
    textSecondary: "text-[#a09580]",
    accent: "text-[#c9a94e]",
    accentText: "text-[#0a1628]",
    glass: "bg-[#0a1628]/60 backdrop-blur-xl border border-[#c9a94e]/15",
    glassBorder: "border-[#c9a94e]/15",
    headingFont: "font-display",
    bodyFont: "font-body",
    scriptFont: "font-script",
    gradient: "from-[#c9a94e] to-[#8a7030]",
    cardBg: "bg-[#111f3a]/70",
    timelineLine: "bg-[#c9a94e]/25",
    buttonBg: "bg-[#c9a94e]",
    buttonText: "text-[#0a1628]",
  },
  minimalist: {
    id: "minimalist",
    name: "Minimal Ivory",
    tagline: "Pure & Simple",
    bg: "bg-[#faf9f6]",
    bgSecondary: "bg-[#f0eeea]",
    text: "text-[#1a1a1a]",
    textSecondary: "text-[#6b6b6b]",
    accent: "text-[#1a1a1a]",
    accentText: "text-[#faf9f6]",
    glass: "bg-[#faf9f6]/70 backdrop-blur-xl border border-[#d5d0c8]/40",
    glassBorder: "border-[#d5d0c8]/40",
    headingFont: "font-display",
    bodyFont: "font-body",
    scriptFont: "font-script",
    gradient: "from-[#1a1a1a] to-[#4a4a4a]",
    cardBg: "bg-[#f0eeea]/80",
    timelineLine: "bg-[#1a1a1a]/15",
    buttonBg: "bg-[#1a1a1a]",
    buttonText: "text-white",
  },
  luxury_gold: {
    id: "luxury_gold",
    name: "Blush Romance",
    tagline: "Blushing Beauty",
    bg: "bg-[#fdf2f0]",
    bgSecondary: "bg-[#f8e8e4]",
    text: "text-[#4a2c2a]",
    textSecondary: "text-[#8a6a68]",
    accent: "text-[#c4826e]",
    accentText: "text-[#fdf2f0]",
    glass: "bg-[#fdf2f0]/70 backdrop-blur-xl border border-[#e0b8b0]/30",
    glassBorder: "border-[#e0b8b0]/30",
    headingFont: "font-display",
    bodyFont: "font-body",
    scriptFont: "font-script",
    gradient: "from-[#c4826e] to-[#a05a48]",
    cardBg: "bg-[#f8e8e4]/80",
    timelineLine: "bg-[#c4826e]/25",
    buttonBg: "bg-[#c4826e]",
    buttonText: "text-white",
  },
  botanical: {
    id: "botanical",
    name: "Emerald & Gold",
    tagline: "Grand Celebration",
    bg: "bg-[#0d2818]",
    bgSecondary: "bg-[#143520]",
    text: "text-[#e8dcc8]",
    textSecondary: "text-[#a0b090]",
    accent: "text-[#d4af37]",
    accentText: "text-[#0d2818]",
    glass: "bg-[#0d2818]/60 backdrop-blur-xl border border-[#d4af37]/15",
    glassBorder: "border-[#d4af37]/15",
    headingFont: "font-display",
    bodyFont: "font-body",
    scriptFont: "font-script",
    gradient: "from-[#d4af37] to-[#8a7020]",
    cardBg: "bg-[#143520]/70",
    timelineLine: "bg-[#d4af37]/25",
    buttonBg: "bg-[#d4af37]",
    buttonText: "text-[#0d2818]",
  },
};
