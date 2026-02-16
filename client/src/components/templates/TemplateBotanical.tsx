import { useState, useRef } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { MapPin, Heart, Shirt, Bus, Hotel, Gift, ChevronDown, Crown } from "lucide-react";
import {
  EnvelopeOpening, FloatingRing, Particles, Countdown, MusicButton,
  FadeSection, StaggerChildren, staggerItem, LetterByLetter, SectionHeading,
  Ornament, RsvpSection, ClosingSection, DetailCard, formatWeddingDate, getEventIcon,
  type TemplateProps,
} from "./shared";
import { BlurRevealImage, FloatingLights, FloatingDecor } from "./shared";
import mossAgateRingImg from "@assets/0f63d8b56ab62900e7e7d1737446cf224840ef13_1771243555623.webp";
import dustyBouquetImg from "@assets/182a00f228298a9dcb6d438e87f8bc4320b19902_1771243555624.jpg";
import greeneryFrameImg from "@assets/0873873003f17f8893ffa029c4e8fc8b2f19527f_1771243555627.png";
import whiteBouquetImg from "@assets/8808cb9958bbe5ba81f82905575b3c045dfdc801_1771243555625.jpg";

import royalHeroImg from "@/assets/images/royal-hero.jpg";
import royalCakeImg from "@/assets/images/royal-cake.jpg";
import ringsImg from "@/assets/images/rings.jpg";
import flowersImg from "@/assets/images/flowers.jpg";

export default function TemplateBotanical({ order, theme }: TemplateProps) {
  const [envelopeOpen, setEnvelopeOpen] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const heroImgY = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const { scrollYProgress: pageProgress } = useScroll();

  const details = order.weddingDetails || {} as any;
  const content = order.generatedContent || {} as any;
  const names = details.coupleNames || "Couple";
  const nameParts = names.split(/\s*[&]\s*/);
  const welcomeMsg = typeof content.welcomeMessage === "object"
    ? (content.welcomeMessage as any).title || ""
    : content.welcomeMessage || "";

  return (
    <div className={`min-h-screen ${theme.bg} overflow-x-hidden selection:bg-current/10`} data-testid="template-botanical">
      <AnimatePresence>
        {!envelopeOpen && <EnvelopeOpening theme={theme} onOpen={() => setEnvelopeOpen(true)} />}
      </AnimatePresence>
      {envelopeOpen && <FloatingRing theme={theme} scrollProgress={pageProgress} />}
      <MusicButton musicLink={details.musicLink} theme={theme} envelopeOpen={envelopeOpen} />

      <motion.section
        ref={heroRef}
        style={{ opacity: heroOpacity }}
        className="min-h-screen relative flex flex-col items-center justify-center overflow-hidden"
        data-testid="section-hero"
      >
        <motion.div className="absolute inset-0 z-0" style={{ y: heroImgY }}>
          <img src={royalHeroImg} alt="" className="w-full h-full object-cover" data-testid="img-hero" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a]/80 via-[#0a0a0a]/60 to-[#0a0a0a]" />
        </motion.div>
        <Particles color={theme.particleColor} count={18} />
        <FloatingLights color="rgba(212,175,55,0.08)" count={8} />
        <FloatingDecor src={greeneryFrameImg} className="w-32 h-32 md:w-48 md:h-48 -top-4 -left-4 opacity-15 z-0" delay={1.5} amplitude={8} />
        <FloatingDecor src={greeneryFrameImg} className="w-28 h-28 md:w-40 md:h-40 -bottom-4 -right-4 opacity-10 z-0 rotate-180" delay={3} amplitude={10} />

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={envelopeOpen ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 0.3, duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
          className="text-center max-w-2xl mx-auto relative z-10 px-6"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={envelopeOpen ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.5, duration: 1 }}
            className="mb-8"
          >
            <Crown className="w-8 h-8 text-[#d4af37]/50 mx-auto mb-4" />
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="h-px w-12 bg-gradient-to-r from-transparent to-[#d4af37]/30" />
              <p className={`${theme.scriptFont} text-[#d4af37]/70 text-xs md:text-sm tracking-[0.5em] uppercase`}>
                Request the Honour of Your Presence
              </p>
              <div className="h-px w-12 bg-gradient-to-l from-transparent to-[#d4af37]/30" />
            </div>
          </motion.div>

          <h1 className={`${theme.headingFont} text-[#e8dcc8] text-7xl md:text-9xl leading-none tracking-tight`} data-testid="text-couple-names">
            {envelopeOpen && <LetterByLetter text={nameParts[0]?.trim() || ""} delay={1} />}
          </h1>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={envelopeOpen ? { scaleX: 1 } : {}}
            transition={{ delay: 1.5, duration: 0.8 }}
            className="flex items-center justify-center gap-6 my-6"
          >
            <div className="h-px w-24 bg-gradient-to-r from-transparent to-[#d4af37]/40" />
            <span className={`${theme.scriptFont} text-[#d4af37] text-4xl`}>&amp;</span>
            <div className="h-px w-24 bg-gradient-to-l from-transparent to-[#d4af37]/40" />
          </motion.div>
          <h1 className={`${theme.headingFont} text-[#e8dcc8] text-7xl md:text-9xl leading-none tracking-tight`} data-testid="text-couple-names">
            {envelopeOpen && <LetterByLetter text={nameParts[1]?.trim() || "Partner"} delay={1.6} />}
          </h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={envelopeOpen ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 2.2, duration: 1 }}
            className="mt-12 space-y-3"
          >
            <p className={`${theme.bodyFont} text-[#d4af37]/60 text-base md:text-lg tracking-wider`} data-testid="text-wedding-date">
              {details.weddingDate ? formatWeddingDate(details.weddingDate) : "Date To Be Announced"}
            </p>
            <p className={`${theme.bodyFont} text-[#8a8070] text-sm tracking-widest uppercase`}>{details.venue}</p>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={envelopeOpen ? { opacity: 1 } : {}}
          transition={{ delay: 3, duration: 1 }}
          className="absolute bottom-10 z-10"
        >
          <ChevronDown className="w-5 h-5 text-[#d4af37]/30 animate-scroll-hint" />
        </motion.div>
      </motion.section>

      <section className={`py-28 md:py-36 px-6 ${theme.bg} relative`} data-testid="section-countdown">
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <motion.div
            animate={{ scale: [0.9, 1.1, 0.9], opacity: [0.02, 0.05, 0.02] }}
            transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
            className="w-[500px] h-[500px] rounded-full bg-gradient-to-r from-[#d4af37]/20 to-transparent blur-3xl"
          />
          <FloatingLights color="rgba(212,175,55,0.06)" count={5} />
        </div>
        <div className="max-w-lg mx-auto text-center relative z-10">
          <FadeSection>
            <Crown className={`w-6 h-6 ${theme.accent} opacity-30 mx-auto mb-4`} />
            <h2 className={`${theme.headingFont} ${theme.text} text-3xl md:text-4xl mb-2`}>The Grand Celebration Awaits</h2>
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
        <section className={`py-24 md:py-32 px-6 ${theme.bgSecondary} relative`} data-testid="section-story">
          <Particles color={theme.particleColor} count={10} />
          <FloatingLights color="rgba(212,175,55,0.04)" count={4} />
          <div className="max-w-5xl mx-auto relative z-10">
            <SectionHeading title="Our Story" subtitle="A Royal Love" theme={theme} />
            <FadeSection delay={0.15}>
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div className="order-2 md:order-1">
                  <div className="border border-[#d4af37]/10 rounded-2xl p-8 md:p-12">
                    <svg width="40" height="40" viewBox="0 0 40 40" className="text-[#d4af37] opacity-15 mb-6">
                      <path d="M10 20C10 14.5 13.5 10 18 8L19 10C15.5 12 13.5 15 13.5 18H18V28H10V20Z" fill="currentColor" />
                      <path d="M24 20C24 14.5 27.5 10 32 8L33 10C29.5 12 27.5 15 27.5 18H32V28H24V20Z" fill="currentColor" />
                    </svg>
                    <p className={`${theme.bodyFont} ${theme.textSecondary} text-sm md:text-base leading-[2.2] whitespace-pre-line`}>
                      {content.ourStory}
                    </p>
                    <Ornament theme={theme} className="mt-8" />
                  </div>
                </div>
                <div className="order-1 md:order-2 relative">
                  <div className="rounded-2xl overflow-hidden aspect-[3/4] border border-[#d4af37]/10">
                    <BlurRevealImage src={dustyBouquetImg} alt="Celebration" className="w-full h-full" data-testid="img-celebration" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/30 to-transparent" />
                  </div>
                </div>
              </div>
            </FadeSection>
          </div>
        </section>
      )}

      <section className="relative h-[40vh] md:h-[50vh] overflow-hidden">
        <BlurRevealImage src={mossAgateRingImg} alt="Wedding rings" className="w-full h-full" data-testid="img-rings" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a]/80 via-[#0a0a0a]/40 to-[#0a0a0a]/80" />
        <div className="absolute inset-0 flex items-center justify-center">
          <FadeSection className="text-center px-6">
            <p className={`${theme.scriptFont} text-[#d4af37]/60 text-sm tracking-[0.4em] uppercase mb-3`}>
              Two Souls, One Crown
            </p>
            <h2 className={`${theme.headingFont} text-[#e8dcc8] text-4xl md:text-6xl tracking-tight`}>Forever Begins</h2>
          </FadeSection>
        </div>
      </section>

      <section className={`py-24 md:py-32 px-6 ${theme.bg}`} data-testid="section-venue">
        <div className="max-w-4xl mx-auto">
          <SectionHeading title={details.venue || "The Venue"} subtitle="A Grand Setting" theme={theme} />
          <FadeSection delay={0.15}>
            <div className="border border-[#d4af37]/10 rounded-2xl overflow-hidden">
              <div className="relative h-72 md:h-96">
                <BlurRevealImage src={royalHeroImg} alt={details.venue} className="w-full h-full" data-testid="img-venue" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent" />
                {details.googleMapsUrl && (
                  <a
                    href={details.googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute bottom-5 left-1/2 -translate-x-1/2 inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#d4af37] text-[#0a0a0a] text-xs font-body tracking-widest uppercase shadow-lg"
                    data-testid="link-maps-venue"
                  >
                    <MapPin className="w-3.5 h-3.5" /> View Location
                  </a>
                )}
              </div>
              <div className="p-8 md:p-10 text-center space-y-4">
                {details.venueAddress && (
                  <p className={`${theme.bodyFont} ${theme.text} text-sm tracking-wide`}>{details.venueAddress}</p>
                )}
                {content.venueDetails && (
                  <p className={`${theme.bodyFont} ${theme.textSecondary} text-sm leading-relaxed max-w-lg mx-auto`}>{content.venueDetails}</p>
                )}
              </div>
            </div>
          </FadeSection>
        </div>
      </section>

      {details.agenda && details.agenda.length > 0 && (
        <section className={`py-24 md:py-32 px-6 ${theme.bgSecondary}`} data-testid="section-schedule">
          <div className="max-w-3xl mx-auto">
            <SectionHeading title="The Grand Day" subtitle="Royal Schedule" theme={theme} />
            {content.agendaIntro && (
              <FadeSection>
                <p className={`${theme.bodyFont} ${theme.textSecondary} text-center text-sm mb-12 opacity-80`}>{content.agendaIntro}</p>
              </FadeSection>
            )}
            <div className="relative">
              <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-[#d4af37]/20 via-[#d4af37]/10 to-transparent" />
              <StaggerChildren className="space-y-8">
                {details.agenda.map((item: { time: string; event: string }, i: number) => {
                  const Icon = getEventIcon(item.event);
                  const isLeft = i % 2 === 0;
                  return (
                    <motion.div
                      key={i}
                      variants={staggerItem}
                      className={`flex items-center gap-6 ${isLeft ? "md:flex-row" : "md:flex-row-reverse"}`}
                      data-testid={`timeline-item-${i}`}
                    >
                      <div className={`flex-1 ${isLeft ? "md:text-right" : "md:text-left"}`}>
                        <div className={`border border-[#d4af37]/10 rounded-2xl p-5 inline-block ${isLeft ? "md:ml-auto" : "md:mr-auto"}`}>
                          <p className={`${theme.scriptFont} ${theme.accent} text-[10px] tracking-[0.3em] uppercase mb-1`}>{item.time}</p>
                          <p className={`${theme.headingFont} ${theme.text} text-xl`}>{item.event}</p>
                        </div>
                      </div>
                      <div className="relative z-10 w-12 h-12 rounded-full border border-[#d4af37]/20 flex items-center justify-center flex-shrink-0 bg-[#0a0a0a]">
                        <Icon className={`w-5 h-5 ${theme.accent}`} />
                      </div>
                      <div className="flex-1 hidden md:block" />
                    </motion.div>
                  );
                })}
              </StaggerChildren>
            </div>
          </div>
        </section>
      )}

      {(details.dressCode || details.transportation || details.accommodation || details.registryLinks) && (
        <section className={`py-24 md:py-32 px-6 ${theme.bg}`} data-testid="section-details">
          <div className="max-w-lg mx-auto">
            <SectionHeading title="Royal Details" subtitle="For Our Guests" theme={theme} />
            <StaggerChildren className="grid grid-cols-2 gap-4">
              {details.dressCode && <motion.div variants={staggerItem}><DetailCard icon={Shirt} title="Dress Code" value={details.dressCode} theme={theme} /></motion.div>}
              {details.transportation && <motion.div variants={staggerItem}><DetailCard icon={Bus} title="Transportation" value={details.transportation} theme={theme} /></motion.div>}
              {details.accommodation && <motion.div variants={staggerItem}><DetailCard icon={Hotel} title="Accommodation" value={details.accommodation} theme={theme} /></motion.div>}
              {details.registryLinks && <motion.div variants={staggerItem}><DetailCard icon={Gift} title="Registry" value="View Registry" link={details.registryLinks} theme={theme} /></motion.div>}
            </StaggerChildren>
          </div>
        </section>
      )}

      <section className={`py-24 md:py-32 px-6 ${theme.bgSecondary} relative`} data-testid="section-gallery">
        <Particles color={theme.particleColor} count={8} />
        <FloatingLights color="rgba(212,175,55,0.04)" count={4} />
        <div className="max-w-5xl mx-auto relative z-10">
          <SectionHeading title="Gallery" subtitle="Royal Moments" theme={theme} />
          <StaggerChildren className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[royalHeroImg, dustyBouquetImg, mossAgateRingImg, whiteBouquetImg, flowersImg, royalCakeImg].map((img, i) => (
              <motion.div
                key={i}
                variants={staggerItem}
                className={`${i === 0 ? "col-span-2 row-span-2 aspect-square" : "aspect-square"} rounded-2xl overflow-hidden relative group border border-[#d4af37]/8`}
                data-testid={`gallery-item-${i}`}
              >
                <img src={img} alt={`Gallery ${i + 1}`} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-[#0a0a0a]/20 group-hover:bg-[#0a0a0a]/5 transition-colors duration-500" />
              </motion.div>
            ))}
          </StaggerChildren>
        </div>
      </section>

      <RsvpSection theme={theme} content={content} details={details} />
      <ClosingSection theme={theme} content={content} details={details} />
    </div>
  );
}
