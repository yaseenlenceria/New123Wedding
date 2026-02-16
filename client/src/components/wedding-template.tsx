import { useState, useEffect, useRef, useCallback } from "react";
import type { ReactNode } from "react";
import { motion, useInView, useScroll, useTransform, useSpring, AnimatePresence } from "framer-motion";
import { MapPin, Clock, ChevronDown, Pause, Heart, Shirt, Bus, Hotel, Gift, UtensilsCrossed, PartyPopper, Church, GlassWater, Send, Sparkles, Volume2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { type ThemeConfig } from "@/lib/themes";
import type { Order } from "@shared/schema";

function Ornament({ theme, className = "" }: { theme: ThemeConfig; className?: string }) {
  return (
    <div className={`flex items-center justify-center gap-3 ${className}`}>
      <div className={`h-px w-12 bg-gradient-to-r from-transparent ${theme.gradient}`} />
      <svg width="14" height="14" viewBox="0 0 16 16" className={`${theme.accent} opacity-40`}>
        <path d="M8 0L9.8 6.2L16 8L9.8 9.8L8 16L6.2 9.8L0 8L6.2 6.2Z" fill="currentColor" />
      </svg>
      <div className={`h-px w-12 bg-gradient-to-l from-transparent ${theme.gradient}`} />
    </div>
  );
}

function FadeSection({ children, className = "", delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function StaggerChildren({ children, className = "" }: { children: ReactNode; className?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={{ visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } } }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

const staggerItem = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

function LetterByLetter({ text, className = "", delay = 0 }: { text: string; className?: string; delay?: number }) {
  return (
    <span className={className} aria-label={text}>
      {text.split("").map((char, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: delay + i * 0.05, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="inline-block"
          style={{ whiteSpace: char === " " ? "pre" : undefined }}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </span>
  );
}

function SectionHeading({ title, subtitle, theme }: { title: string; subtitle?: string; theme: ThemeConfig }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <div ref={ref} className="text-center mb-10">
      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className={`${theme.scriptFont} ${theme.accent} text-xs tracking-[0.4em] uppercase mb-3 opacity-80`}
        >
          {subtitle}
        </motion.p>
      )}
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.9, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        className={`${theme.headingFont} ${theme.text} text-3xl md:text-5xl leading-snug`}
      >
        {title}
      </motion.h2>
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ delay: 0.3, duration: 0.6 }}
      >
        <Ornament theme={theme} className="mt-5" />
      </motion.div>
    </div>
  );
}

function AnimatedCounter({ value, theme }: { value: number; theme: ThemeConfig }) {
  return (
    <AnimatePresence mode="popLayout">
      <motion.span
        key={value}
        initial={{ y: 20, opacity: 0, scale: 0.8 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        exit={{ y: -20, opacity: 0, scale: 0.8 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        className={`block text-3xl md:text-4xl ${theme.headingFont} ${theme.text} tabular-nums`}
      >
        {String(value).padStart(2, "0")}
      </motion.span>
    </AnimatePresence>
  );
}

function Countdown({ targetDate, theme }: { targetDate: string; theme: ThemeConfig }) {
  const [time, setTime] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const update = () => {
      const diff = new Date(targetDate).getTime() - Date.now();
      if (diff <= 0) return;
      setTime({
        days: Math.floor(diff / 86400000),
        hours: Math.floor((diff % 86400000) / 3600000),
        minutes: Math.floor((diff % 3600000) / 60000),
        seconds: Math.floor((diff % 60000) / 1000),
      });
    };
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, [targetDate]);

  const units = [
    { label: "Days", value: time.days },
    { label: "Hours", value: time.hours },
    { label: "Minutes", value: time.minutes },
    { label: "Seconds", value: time.seconds },
  ];

  return (
    <StaggerChildren className="flex justify-center gap-3 md:gap-5">
      {units.map((u) => (
        <motion.div
          key={u.label}
          variants={staggerItem}
          className={`${theme.glass} rounded-2xl px-4 py-4 md:px-6 md:py-5 min-w-[72px] md:min-w-[90px] text-center`}
        >
          <AnimatedCounter value={u.value} theme={theme} />
          <span className={`text-[9px] md:text-[10px] uppercase tracking-[0.25em] ${theme.textSecondary} mt-1 block`}>{u.label}</span>
        </motion.div>
      ))}
    </StaggerChildren>
  );
}

function getEventIcon(event: string) {
  const lower = event.toLowerCase();
  if (lower.includes("ceremon")) return Church;
  if (lower.includes("cocktail")) return GlassWater;
  if (lower.includes("dinner") || lower.includes("reception")) return UtensilsCrossed;
  if (lower.includes("dance") || lower.includes("party") || lower.includes("celebrat")) return PartyPopper;
  return Clock;
}

function formatWeddingDate(dateStr: string) {
  try {
    return new Date(dateStr + "T12:00:00").toLocaleDateString("en-US", {
      weekday: "long", year: "numeric", month: "long", day: "numeric",
    });
  } catch { return dateStr; }
}

function Particles({ color, count = 20 }: { color: string; count?: number }) {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {Array.from({ length: count }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: Math.random() * 3 + 1,
            height: Math.random() * 3 + 1,
            backgroundColor: color,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            opacity: Math.random() * 0.3 + 0.05,
          }}
          animate={{
            y: [0, -(Math.random() * 80 + 30)],
            x: [0, (Math.random() - 0.5) * 40],
            opacity: [Math.random() * 0.2 + 0.05, 0],
          }}
          transition={{
            duration: Math.random() * 6 + 4,
            repeat: Infinity,
            delay: Math.random() * 5,
            ease: "easeOut",
          }}
        />
      ))}
    </div>
  );
}

function FloatingRing({ theme, scrollProgress }: { theme: ThemeConfig; scrollProgress: any }) {
  const x = useTransform(scrollProgress, [0, 0.2, 0.4, 0.6, 0.8, 1], [0, 30, -20, 25, -15, 0]);
  const y = useTransform(scrollProgress, [0, 1], [0, -60]);
  const rotate = useTransform(scrollProgress, [0, 1], [0, 25]);
  const smoothX = useSpring(x, { stiffness: 40, damping: 25 });
  const smoothY = useSpring(y, { stiffness: 40, damping: 25 });
  const smoothRotate = useSpring(rotate, { stiffness: 40, damping: 25 });

  return (
    <motion.div
      className="fixed z-40 pointer-events-none"
      style={{
        right: "5%",
        top: "40%",
        x: smoothX,
        y: smoothY,
        rotate: smoothRotate,
      }}
    >
      <svg width="50" height="50" viewBox="0 0 60 60" className="opacity-[0.12] md:opacity-[0.15]" style={{ filter: "blur(0.5px)" }}>
        <circle cx="30" cy="30" r="22" fill="none" stroke={theme.ringColor} strokeWidth="3" />
        <circle cx="30" cy="30" r="18" fill="none" stroke={theme.ringColor} strokeWidth="1" opacity="0.4" />
        <circle cx="30" cy="12" r="3" fill={theme.ringColor} opacity="0.6" />
      </svg>
    </motion.div>
  );
}

function EnvelopeOpening({ theme, onOpen }: { theme: ThemeConfig; onOpen: () => void }) {
  const [phase, setPhase] = useState<"sealed" | "cracking" | "opening" | "done">("sealed");

  const handleOpen = useCallback(() => {
    if (phase !== "sealed") return;
    setPhase("cracking");
    setTimeout(() => setPhase("opening"), 800);
    setTimeout(() => {
      setPhase("done");
      onOpen();
    }, 2200);
  }, [phase, onOpen]);

  useEffect(() => {
    const handler = () => handleOpen();
    window.addEventListener("scroll", handler, { once: true, passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, [handleOpen]);

  if (phase === "done") return null;

  return (
    <motion.div
      className={`fixed inset-0 z-[100] flex items-center justify-center ${theme.bg}`}
      animate={phase === "opening" ? { opacity: 0 } : { opacity: 1 }}
      transition={{ duration: 1, delay: phase === "opening" ? 0.8 : 0 }}
      style={{ cursor: phase === "sealed" ? "pointer" : "default", pointerEvents: phase === "opening" ? "none" : "auto" }}
      onClick={handleOpen}
      data-testid="envelope-overlay"
    >
      <Particles color={theme.particleColor} count={15} />

      <div className="relative">
        <motion.div
          className="relative w-72 h-48 md:w-96 md:h-64 rounded-md overflow-visible"
          style={{ perspective: "800px" }}
        >
          <div
            className="absolute inset-0 rounded-md shadow-2xl"
            style={{ backgroundColor: theme.envelopeBg, border: `1px solid ${theme.ringColor}20` }}
          />

          <div className="absolute inset-0 flex items-center justify-center z-10">
            <div className="text-center px-8">
              <p className={`${theme.scriptFont} ${theme.accent} text-xs tracking-[0.4em] uppercase mb-2 opacity-70`}>You are invited</p>
              <p className={`${theme.headingFont} ${theme.text} text-xl md:text-2xl`}>Open to reveal</p>
            </div>
          </div>

          <motion.div
            className="absolute -top-[1px] left-0 right-0 origin-top"
            style={{
              height: "55%",
              clipPath: "polygon(0 0, 50% 100%, 100% 0)",
              backgroundColor: theme.envelopeFlap,
              border: `1px solid ${theme.ringColor}15`,
              transformStyle: "preserve-3d",
            }}
            animate={
              phase === "cracking" ? { rotateX: -30 } :
              phase === "opening" ? { rotateX: -180 } :
              { rotateX: 0 }
            }
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          />

          <motion.div
            className="absolute left-1/2 top-[30%] -translate-x-1/2 -translate-y-1/2 z-20"
            animate={
              phase === "cracking" ? { scale: [1, 1.15, 0.9], rotate: [0, 5, -3], opacity: [1, 1, 0.6] } :
              phase === "opening" ? { scale: 0, opacity: 0, y: -40 } :
              { scale: [1, 1.03, 1] }
            }
            transition={
              phase === "sealed" ? { repeat: Infinity, duration: 3, ease: "easeInOut" } :
              { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
            }
          >
            <div className="relative">
              <svg width="56" height="56" viewBox="0 0 56 56">
                <circle cx="28" cy="28" r="26" fill={theme.sealColor} opacity="0.9" />
                <circle cx="28" cy="28" r="22" fill="none" stroke={theme.envelopeBg} strokeWidth="0.5" opacity="0.3" />
                <circle cx="28" cy="28" r="13" fill="none" stroke={theme.envelopeBg} strokeWidth="1.5" opacity="0.25" />
                <circle cx="22" cy="26" r="5" fill="none" stroke={theme.envelopeBg} strokeWidth="1.2" opacity="0.5" />
                <circle cx="34" cy="26" r="5" fill="none" stroke={theme.envelopeBg} strokeWidth="1.2" opacity="0.5" />
                <path d="M22 31 Q28 36 34 31" fill="none" stroke={theme.envelopeBg} strokeWidth="0.8" opacity="0.3" />
              </svg>
              {phase === "cracking" && (
                <motion.div
                  className="absolute inset-0"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <svg width="56" height="56" viewBox="0 0 56 56" className="absolute inset-0">
                    <path d="M20 10 L24 20 L18 28 L26 34 L22 46" fill="none" stroke={theme.envelopeBg} strokeWidth="1.5" opacity="0.6" />
                    <path d="M36 8 L32 18 L38 26 L30 32 L34 44" fill="none" stroke={theme.envelopeBg} strokeWidth="1" opacity="0.4" />
                  </svg>
                </motion.div>
              )}
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          className="absolute -bottom-1 left-1/2 -translate-x-1/2"
          animate={phase === "opening" ? { opacity: 1, scale: 1.5 } : { opacity: 0 }}
          transition={{ duration: 1.2 }}
        >
          <div
            className="w-40 h-40 rounded-full blur-3xl"
            style={{ backgroundColor: theme.ringColor, opacity: 0.2 }}
          />
        </motion.div>
      </div>

      <motion.p
        className={`absolute bottom-16 ${theme.bodyFont} ${theme.textSecondary} text-xs tracking-[0.3em] uppercase`}
        animate={{ opacity: [0.3, 0.8, 0.3] }}
        transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
      >
        {phase === "sealed" ? "Tap or scroll to open" : ""}
      </motion.p>
    </motion.div>
  );
}

export default function WeddingTemplate({ order, theme }: { order: Order; theme: ThemeConfig }) {
  const [musicPlaying, setMusicPlaying] = useState(false);
  const [rsvpSubmitted, setRsvpSubmitted] = useState(false);
  const [envelopeOpen, setEnvelopeOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.8], [1, 0.96]);

  const { scrollYProgress: pageProgress } = useScroll();

  const details = order.weddingDetails || {} as any;
  const content = order.generatedContent || {} as any;
  const names = details.coupleNames || "Couple";
  const nameParts = names.split(/\s*[&]\s*/);
  const welcomeMsg = typeof content.welcomeMessage === "object"
    ? (content.welcomeMessage as any).title || (content.welcomeMessage as any).subtitle || ""
    : content.welcomeMessage || "";

  return (
    <div ref={containerRef} className={`min-h-screen ${theme.bg} overflow-x-hidden selection:bg-current/10`}>
      <AnimatePresence>
        {!envelopeOpen && (
          <EnvelopeOpening theme={theme} onOpen={() => setEnvelopeOpen(true)} />
        )}
      </AnimatePresence>

      {envelopeOpen && <FloatingRing theme={theme} scrollProgress={pageProgress} />}

      {details.musicLink && envelopeOpen && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, type: "spring" }}
          onClick={() => setMusicPlaying(!musicPlaying)}
          className={`fixed top-5 right-5 z-50 w-11 h-11 rounded-full ${theme.glass} flex items-center justify-center shadow-lg`}
          data-testid="button-music"
        >
          {musicPlaying ? <Pause className={`w-4 h-4 ${theme.accent}`} /> : <Volume2 className={`w-4 h-4 ${theme.accent}`} />}
        </motion.button>
      )}

      <motion.section
        ref={heroRef}
        style={{ opacity: heroOpacity, scale: heroScale }}
        className={`min-h-screen flex flex-col items-center justify-center px-6 relative ${theme.bg}`}
      >
        <Particles color={theme.particleColor} count={12} />

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={envelopeOpen ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 0.3, duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
          className="text-center max-w-xl mx-auto relative z-10"
        >
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={envelopeOpen ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.5, duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className={`${theme.scriptFont} ${theme.accent} text-xs md:text-sm tracking-[0.5em] uppercase mb-8`}
          >
            Together With Their Families
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={envelopeOpen ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.8, duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <h1 className={`${theme.headingFont} ${theme.text} text-6xl md:text-8xl leading-none tracking-tight`}>
              {envelopeOpen && <LetterByLetter text={nameParts[0]?.trim() || ""} delay={1} />}
            </h1>
            <motion.div
              initial={{ scaleX: 0 }}
              animate={envelopeOpen ? { scaleX: 1 } : {}}
              transition={{ delay: 1.5, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="flex items-center justify-center gap-4 my-4"
            >
              <div className={`h-px w-16 bg-gradient-to-r from-transparent ${theme.gradient}`} />
              <span className={`${theme.scriptFont} ${theme.accent} text-3xl`}>&amp;</span>
              <div className={`h-px w-16 bg-gradient-to-l from-transparent ${theme.gradient}`} />
            </motion.div>
            <h1 className={`${theme.headingFont} ${theme.text} text-6xl md:text-8xl leading-none tracking-tight`}>
              {envelopeOpen && <LetterByLetter text={nameParts[1]?.trim() || "Partner"} delay={1.6} />}
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={envelopeOpen ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 2.2, duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="mt-10 space-y-2"
          >
            <Ornament theme={theme} />
            <p className={`${theme.bodyFont} ${theme.textSecondary} text-base md:text-lg tracking-wider mt-4`}>
              {details.weddingDate ? formatWeddingDate(details.weddingDate) : "Date To Be Announced"}
            </p>
            <p className={`${theme.bodyFont} ${theme.textSecondary} text-sm opacity-70`}>{details.venue}</p>
          </motion.div>

          {details.googleMapsUrl && (
            <motion.a
              href={details.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 10 }}
              animate={envelopeOpen ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 2.6, duration: 0.8 }}
              className={`inline-flex items-center gap-2 px-6 py-2.5 rounded-full ${theme.glass} ${theme.textSecondary} text-xs ${theme.bodyFont} tracking-widest uppercase mt-8`}
              data-testid="link-maps-hero"
            >
              <MapPin className="w-3.5 h-3.5" /> View Location
            </motion.a>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={envelopeOpen ? { opacity: 1 } : {}}
          transition={{ delay: 3, duration: 1 }}
          className="absolute bottom-10"
        >
          <div className="flex flex-col items-center gap-2">
            <span className={`${theme.bodyFont} ${theme.textSecondary} text-[10px] tracking-[0.3em] uppercase opacity-50`}>Scroll</span>
            <ChevronDown className={`w-5 h-5 ${theme.textSecondary} opacity-40 animate-scroll-hint`} />
          </div>
        </motion.div>
      </motion.section>

      <section className={`py-24 md:py-32 px-6 ${theme.bgSecondary}`}>
        <div className="max-w-lg mx-auto text-center">
          <FadeSection>
            <p className={`${theme.scriptFont} ${theme.accent} text-xs tracking-[0.4em] uppercase mb-4`}>Counting Down To</p>
            <h2 className={`${theme.headingFont} ${theme.text} text-3xl md:text-4xl mb-2`}>Forever Begins</h2>
            <Ornament theme={theme} className="mb-10" />
          </FadeSection>
          <FadeSection delay={0.2}>
            <Countdown targetDate={details.weddingDate || "2027-12-31"} theme={theme} />
          </FadeSection>
          {welcomeMsg && (
            <FadeSection delay={0.4}>
              <p className={`${theme.bodyFont} ${theme.textSecondary} mt-10 text-sm md:text-base leading-relaxed italic max-w-sm mx-auto`}>
                &ldquo;{welcomeMsg}&rdquo;
              </p>
            </FadeSection>
          )}
        </div>
      </section>

      {content.ourStory && (
        <section className={`py-24 md:py-32 px-6 ${theme.bg} relative`}>
          <Particles color={theme.particleColor} count={8} />
          <div className="max-w-lg mx-auto relative z-10">
            <SectionHeading title="Our Story" subtitle="A Love Letter" theme={theme} />
            <FadeSection delay={0.15}>
              <div className={`${theme.glass} rounded-3xl p-8 md:p-12`}>
                <Heart className={`w-8 h-8 ${theme.accent} opacity-30 mx-auto mb-6`} />
                <p className={`${theme.bodyFont} ${theme.textSecondary} text-sm md:text-base leading-[2] text-center whitespace-pre-line`}>
                  {content.ourStory}
                </p>
              </div>
            </FadeSection>
          </div>
        </section>
      )}

      <section className={`py-24 md:py-32 px-6 ${theme.bgSecondary}`}>
        <div className="max-w-lg mx-auto">
          <SectionHeading title={details.venue || "The Venue"} subtitle="Celebrate With Us" theme={theme} />
          <FadeSection delay={0.15}>
            <div className={`${theme.glass} rounded-3xl overflow-hidden`}>
              <div className={`h-56 ${theme.bgSecondary} relative flex items-center justify-center`}>
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.div
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                  >
                    <MapPin className={`w-16 h-16 ${theme.textSecondary} opacity-15`} />
                  </motion.div>
                </div>
                {details.googleMapsUrl && (
                  <a
                    href={details.googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`relative z-10 inline-flex items-center gap-2 px-5 py-2.5 rounded-full ${theme.buttonBg} ${theme.buttonText} text-xs ${theme.bodyFont} tracking-widest uppercase shadow-lg`}
                    data-testid="link-maps-venue"
                  >
                    <MapPin className="w-3.5 h-3.5" /> Open in Maps
                  </a>
                )}
              </div>
              <div className="p-8 text-center space-y-4">
                {details.venueAddress && (
                  <p className={`${theme.bodyFont} ${theme.textSecondary} text-sm tracking-wide`}>{details.venueAddress}</p>
                )}
                {content.venueDetails && (
                  <p className={`${theme.bodyFont} ${theme.textSecondary} text-sm leading-relaxed opacity-80`}>{content.venueDetails}</p>
                )}
              </div>
            </div>
          </FadeSection>
        </div>
      </section>

      {details.agenda && details.agenda.length > 0 && (
        <section className={`py-24 md:py-32 px-6 ${theme.bg}`}>
          <div className="max-w-lg mx-auto">
            <SectionHeading title="The Day" subtitle="Schedule" theme={theme} />
            {content.agendaIntro && (
              <FadeSection>
                <p className={`${theme.bodyFont} ${theme.textSecondary} text-center text-sm mb-10 opacity-80`}>{content.agendaIntro}</p>
              </FadeSection>
            )}
            <div className="relative">
              <div className={`absolute left-[23px] top-4 bottom-4 w-px ${theme.timelineLine}`} />
              <StaggerChildren className="space-y-5">
                {details.agenda.map((item: { time: string; event: string }, i: number) => {
                  const Icon = getEventIcon(item.event);
                  return (
                    <motion.div key={i} variants={staggerItem} className="flex items-start gap-5 pl-0">
                      <div className={`relative z-10 w-12 h-12 rounded-full ${theme.glass} flex items-center justify-center flex-shrink-0 shadow-sm`}>
                        <Icon className={`w-5 h-5 ${theme.accent}`} />
                      </div>
                      <div className={`flex-1 ${theme.glass} rounded-2xl p-5 shadow-sm`}>
                        <p className={`${theme.scriptFont} ${theme.accent} text-[10px] tracking-[0.3em] uppercase mb-1`}>{item.time}</p>
                        <p className={`${theme.headingFont} ${theme.text} text-lg`}>{item.event}</p>
                      </div>
                    </motion.div>
                  );
                })}
              </StaggerChildren>
            </div>
          </div>
        </section>
      )}

      {(details.dressCode || details.transportation || details.accommodation || details.registryLinks) && (
        <section className={`py-24 md:py-32 px-6 ${theme.bgSecondary}`}>
          <div className="max-w-lg mx-auto">
            <SectionHeading title="Details" subtitle="Good to Know" theme={theme} />
            {content.detailsIntro && (
              <FadeSection>
                <p className={`${theme.bodyFont} ${theme.textSecondary} text-center text-sm mb-10 opacity-80`}>{content.detailsIntro}</p>
              </FadeSection>
            )}
            <StaggerChildren className="grid grid-cols-2 gap-4">
              {details.dressCode && (
                <motion.div variants={staggerItem}>
                  <DetailCard icon={Shirt} title="Dress Code" value={details.dressCode} theme={theme} />
                </motion.div>
              )}
              {details.transportation && (
                <motion.div variants={staggerItem}>
                  <DetailCard icon={Bus} title="Transportation" value={details.transportation} theme={theme} />
                </motion.div>
              )}
              {details.accommodation && (
                <motion.div variants={staggerItem}>
                  <DetailCard icon={Hotel} title="Accommodation" value={details.accommodation} theme={theme} />
                </motion.div>
              )}
              {details.registryLinks && (
                <motion.div variants={staggerItem}>
                  <DetailCard icon={Gift} title="Registry" value="View Registry" link={details.registryLinks} theme={theme} />
                </motion.div>
              )}
            </StaggerChildren>
          </div>
        </section>
      )}

      <section className={`py-24 md:py-32 px-6 ${theme.bg} relative`}>
        <Particles color={theme.particleColor} count={6} />
        <div className="max-w-lg mx-auto relative z-10">
          <SectionHeading title="Gallery" subtitle="Captured Moments" theme={theme} />
          <StaggerChildren className="grid grid-cols-2 gap-3">
            {[1, 2, 3, 4].map((i) => (
              <motion.div
                key={i}
                variants={staggerItem}
                whileHover={{ scale: 1.03, y: -4 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className={`aspect-square rounded-2xl ${theme.glass} flex items-center justify-center cursor-pointer shadow-sm`}
              >
                <Heart className={`w-8 h-8 ${theme.textSecondary} opacity-15`} />
              </motion.div>
            ))}
          </StaggerChildren>
          <FadeSection delay={0.3}>
            <p className={`${theme.bodyFont} ${theme.textSecondary} text-center text-xs mt-5 opacity-50`}>
              Photos will be added closer to the celebration
            </p>
          </FadeSection>
        </div>
      </section>

      <section className={`py-24 md:py-32 px-6 ${theme.bgSecondary}`}>
        <div className="max-w-lg mx-auto text-center">
          <FadeSection>
            <p className={`${theme.scriptFont} ${theme.accent} text-xs tracking-[0.4em] uppercase mb-4`}>Kindly</p>
            <h2 className={`${theme.headingFont} ${theme.text} text-5xl md:text-7xl mb-2 tracking-tight`}>RSVP</h2>
            <Ornament theme={theme} className="mb-4" />
            <p className={`${theme.bodyFont} ${theme.textSecondary} text-sm mb-10 max-w-sm mx-auto`}>
              {content.rsvpMessage || "We would be honored by your presence. Please let us know if you can join us."}
            </p>
          </FadeSection>

          <FadeSection delay={0.2}>
            {rsvpSubmitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.85, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ type: "spring", stiffness: 200, damping: 20 }}
                className={`${theme.glass} rounded-3xl p-10 md:p-14`}
              >
                <motion.div
                  animate={{ scale: [1, 1.15, 1], rotate: [0, 5, -5, 0] }}
                  transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                >
                  <Sparkles className={`w-14 h-14 ${theme.accent} mx-auto mb-6`} />
                </motion.div>
                <h3 className={`${theme.headingFont} ${theme.text} text-3xl mb-3`}>Thank You</h3>
                <p className={`${theme.bodyFont} ${theme.textSecondary} text-sm`}>
                  We can&apos;t wait to celebrate with you
                </p>
              </motion.div>
            ) : (
              <div className={`${theme.glass} rounded-3xl p-7 md:p-10 text-left space-y-5`}>
                <div>
                  <label className={`text-[10px] ${theme.textSecondary} ${theme.bodyFont} uppercase tracking-[0.2em] block mb-1.5`}>Full Name</label>
                  <Input data-testid="input-rsvp-name" className={`bg-transparent ${theme.glassBorder} ${theme.text} ${theme.bodyFont} h-12 rounded-xl`} placeholder="Your name" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className={`text-[10px] ${theme.textSecondary} ${theme.bodyFont} uppercase tracking-[0.2em] block mb-1.5`}>Number of Guests</label>
                    <Input data-testid="input-rsvp-guests" type="number" min={1} max={5} defaultValue={1} className={`bg-transparent ${theme.glassBorder} ${theme.text} ${theme.bodyFont} h-12 rounded-xl`} />
                  </div>
                  <div>
                    <label className={`text-[10px] ${theme.textSecondary} ${theme.bodyFont} uppercase tracking-[0.2em] block mb-1.5`}>Meal Preference</label>
                    <select data-testid="select-rsvp-meal" className={`w-full rounded-xl px-3 h-12 bg-transparent ${theme.text} ${theme.bodyFont} border ${theme.glassBorder} text-sm`}>
                      {(details.guestMealOptions || ["Beef", "Chicken", "Vegetarian"]).map((m: string) => (
                        <option key={m} value={m}>{m}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div>
                  <label className={`text-[10px] ${theme.textSecondary} ${theme.bodyFont} uppercase tracking-[0.2em] block mb-1.5`}>Song Request</label>
                  <Input data-testid="input-rsvp-song" className={`bg-transparent ${theme.glassBorder} ${theme.text} ${theme.bodyFont} h-12 rounded-xl`} placeholder="What should we dance to?" />
                </div>
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button
                    data-testid="button-rsvp-submit"
                    onClick={() => setRsvpSubmitted(true)}
                    className={`w-full h-14 ${theme.buttonBg} ${theme.buttonText} ${theme.bodyFont} tracking-widest uppercase text-xs gap-2 rounded-xl shadow-lg`}
                  >
                    <Send className="w-4 h-4" /> Send RSVP
                  </Button>
                </motion.div>
              </div>
            )}
          </FadeSection>
        </div>
      </section>

      <section className={`py-28 md:py-40 px-6 ${theme.bg} text-center relative overflow-hidden`}>
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <motion.div
            animate={{ scale: [0.9, 1.1, 0.9], opacity: [0.03, 0.06, 0.03] }}
            transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
            className={`w-96 h-96 rounded-full bg-gradient-to-r ${theme.gradient} blur-3xl`}
          />
        </div>

        <FadeSection className="relative z-10">
          <Ornament theme={theme} className="mb-8" />
          <p className={`${theme.scriptFont} ${theme.accent} text-xs tracking-[0.5em] uppercase mb-6`}>
            With Love &amp; Joy
          </p>
          <h2 className={`${theme.headingFont} ${theme.text} text-4xl md:text-6xl mb-5 tracking-tight`}>{names}</h2>
          <p className={`${theme.bodyFont} ${theme.textSecondary} text-sm leading-relaxed max-w-xs mx-auto opacity-80`}>
            {content.closingMessage || "Thank you for being part of our journey. We cannot wait to celebrate this beautiful chapter with you."}
          </p>
          <motion.div
            className="mt-10"
            animate={{ y: [0, -6, 0] }}
            transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
          >
            <Heart className={`w-6 h-6 mx-auto ${theme.accent}`} />
          </motion.div>
          {details.weddingDate && (
            <p className={`${theme.bodyFont} ${theme.textSecondary} text-xs mt-10 opacity-40 tracking-widest uppercase`}>
              {formatWeddingDate(details.weddingDate)}
            </p>
          )}
        </FadeSection>
      </section>
    </div>
  );
}

function DetailCard({ icon: Icon, title, value, link, theme }: { icon: any; title: string; value: string; link?: string; theme: ThemeConfig }) {
  const inner = (
    <div className={`${theme.glass} rounded-2xl p-5 text-center h-full shadow-sm`}>
      <div className={`w-10 h-10 rounded-full mx-auto mb-3 flex items-center justify-center ${theme.cardBg}`}>
        <Icon className={`w-5 h-5 ${theme.accent}`} />
      </div>
      <p className={`${theme.scriptFont} ${theme.accent} text-[9px] tracking-[0.3em] uppercase mb-1.5`}>{title}</p>
      <p className={`${theme.bodyFont} ${theme.text} text-sm`}>{value}</p>
    </div>
  );

  if (link) {
    return <a href={link} target="_blank" rel="noopener noreferrer" data-testid={`link-${title.toLowerCase().replace(/\s/g, "-")}`}>{inner}</a>;
  }
  return inner;
}
