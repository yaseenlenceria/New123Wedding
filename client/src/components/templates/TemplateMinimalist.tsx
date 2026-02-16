import { useState, useRef } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { MapPin, Shirt, Bus, Hotel, Gift, ChevronDown } from "lucide-react";
import {
  EnvelopeOpening, FloatingRing, Particles, Countdown, MusicButton,
  FadeSection, StaggerChildren, staggerItem, LetterByLetter,
  Ornament, RsvpSection, ClosingSection, DetailCard, formatWeddingDate, getEventIcon,
  type TemplateProps,
} from "./shared";
import { BlurRevealImage, FloatingLights } from "./shared";

import minimalHeroImg from "@/assets/images/minimal-hero.jpg";
import ringsImg from "@/assets/images/rings.jpg";
import flowersImg from "@/assets/images/flowers.jpg";
import venueImg from "@/assets/images/venue.jpg";
import whiteBouquetImg from "@assets/8808cb9958bbe5ba81f82905575b3c045dfdc801_1771243555625.jpg";
import eucalyptusImg from "@assets/5051562e495ce42b8dbad1fbb98ab124932722f5_1771243555625.jpg";

export default function TemplateMinimalist({ order, theme }: TemplateProps) {
  const [envelopeOpen, setEnvelopeOpen] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const { scrollYProgress: pageProgress } = useScroll();

  const details = order.weddingDetails || {} as any;
  const content = order.generatedContent || {} as any;
  const names = details.coupleNames || "Couple";
  const nameParts = names.split(/\s*[&]\s*/);
  const welcomeMsg = typeof content.welcomeMessage === "object"
    ? (content.welcomeMessage as any).title || ""
    : content.welcomeMessage || "";

  return (
    <div className={`min-h-screen ${theme.bg} overflow-x-hidden selection:bg-current/10`} data-testid="template-minimalist">
      <AnimatePresence>
        {!envelopeOpen && <EnvelopeOpening theme={theme} onOpen={() => setEnvelopeOpen(true)} />}
      </AnimatePresence>
      {envelopeOpen && <FloatingRing theme={theme} scrollProgress={pageProgress} />}
      <MusicButton musicLink={details.musicLink} theme={theme} envelopeOpen={envelopeOpen} />

      <motion.section
        ref={heroRef}
        style={{ opacity: heroOpacity }}
        className="h-screen flex flex-col justify-end pb-20 md:pb-28 px-8 md:px-20 relative"
        data-testid="section-hero"
      >
        <Particles color={theme.particleColor} count={6} />
        <FloatingLights color="rgba(100,95,85,0.06)" count={4} spread={false} />
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={envelopeOpen ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5, duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-10 space-y-2"
        >
          <motion.p
            initial={{ opacity: 0 }}
            animate={envelopeOpen ? { opacity: 1 } : {}}
            transition={{ delay: 0.3, duration: 1 }}
            className={`${theme.bodyFont} ${theme.textSecondary} text-xs tracking-[0.5em] uppercase mb-6`}
          >
            The Wedding Of
          </motion.p>
          <h1 className={`${theme.headingFont} ${theme.text} text-7xl md:text-[10rem] leading-[0.85] tracking-tighter`} data-testid="text-couple-names">
            {envelopeOpen && <LetterByLetter text={nameParts[0]?.trim() || ""} delay={0.8} />}
          </h1>
          <h1 className={`${theme.headingFont} ${theme.text} text-7xl md:text-[10rem] leading-[0.85] tracking-tighter`} data-testid="text-couple-names">
            {envelopeOpen && (
              <>
                <span className={`${theme.scriptFont} ${theme.textSecondary} text-3xl md:text-5xl tracking-normal mr-4`}>&amp;</span>
                <LetterByLetter text={nameParts[1]?.trim() || "Partner"} delay={1.4} />
              </>
            )}
          </h1>
          <motion.div
            initial={{ opacity: 0 }}
            animate={envelopeOpen ? { opacity: 1 } : {}}
            transition={{ delay: 2.2, duration: 1 }}
            className="flex flex-col md:flex-row md:items-center gap-4 md:gap-8 text-lg pt-8"
          >
            <p className={`${theme.bodyFont} ${theme.textSecondary}`} data-testid="text-wedding-date">
              {details.weddingDate ? formatWeddingDate(details.weddingDate) : "Date TBA"}
            </p>
            <span className={`hidden md:block w-1.5 h-1.5 rounded-full ${theme.text} opacity-30`} />
            <p className={`${theme.bodyFont} ${theme.textSecondary}`}>{details.venue}</p>
          </motion.div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={envelopeOpen ? { opacity: 1 } : {}}
          transition={{ delay: 3, duration: 1 }}
          className="absolute bottom-8 right-8 md:right-20"
        >
          <ChevronDown className={`w-5 h-5 ${theme.textSecondary} opacity-40 animate-scroll-hint`} />
        </motion.div>
      </motion.section>

      <section className="w-full h-[70vh] md:h-[80vh] relative overflow-hidden" data-testid="section-countdown">
        <BlurRevealImage src={minimalHeroImg} alt="Wedding moment" className="w-full h-full [&_img]:grayscale" data-testid="img-hero" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#faf9f6]/20 to-[#faf9f6]/40" />
      </section>

      <section className={`py-28 md:py-40 px-6 ${theme.bg} relative`}>
        <FloatingLights color="rgba(120,115,105,0.05)" count={3} spread={false} />
        <div className="max-w-sm mx-auto text-center relative z-10">
          <FadeSection>
            <p className={`${theme.bodyFont} ${theme.textSecondary} text-xs tracking-[0.5em] uppercase mb-6`}>Counting Down</p>
          </FadeSection>
          <FadeSection delay={0.2}>
            <Countdown targetDate={details.weddingDate || "2027-12-31"} theme={theme} />
          </FadeSection>
          {welcomeMsg && (
            <FadeSection delay={0.4}>
              <p className={`${theme.bodyFont} ${theme.textSecondary} mt-12 text-lg md:text-xl leading-relaxed font-light`}>
                {welcomeMsg}
              </p>
            </FadeSection>
          )}
        </div>
      </section>

      {content.ourStory && (
        <section className={`py-28 md:py-40 px-8 md:px-20 ${theme.bgSecondary} relative`} data-testid="section-story">
          <FloatingLights color="rgba(100,95,85,0.04)" count={3} />
          <div className="max-w-6xl mx-auto grid md:grid-cols-12 gap-12 md:gap-20 relative z-10">
            <div className="md:col-span-3">
              <FadeSection>
                <p className={`${theme.bodyFont} ${theme.textSecondary} text-xs tracking-[0.5em] uppercase sticky top-32`}>Our Story</p>
              </FadeSection>
            </div>
            <div className="md:col-span-9">
              <FadeSection delay={0.15}>
                <p className={`${theme.bodyFont} ${theme.text} text-xl md:text-3xl leading-relaxed font-light whitespace-pre-line`}>
                  {content.ourStory}
                </p>
              </FadeSection>
            </div>
          </div>
        </section>
      )}

      <section className="grid md:grid-cols-2" data-testid="section-venue">
        <div className="relative aspect-square overflow-hidden">
          <BlurRevealImage src={ringsImg} alt="Wedding rings" className="w-full h-full" data-testid="img-rings" />
        </div>
        <div className={`${theme.bg} flex items-center justify-center p-12 md:p-20`}>
          <FadeSection className="max-w-sm">
            <p className={`${theme.bodyFont} ${theme.textSecondary} text-xs tracking-[0.5em] uppercase mb-6`}>The Venue</p>
            <h2 className={`${theme.headingFont} ${theme.text} text-4xl md:text-5xl mb-6 tracking-tight`}>{details.venue || "Our Venue"}</h2>
            {details.venueAddress && (
              <p className={`${theme.bodyFont} ${theme.textSecondary} text-sm mb-4`}>{details.venueAddress}</p>
            )}
            {content.venueDetails && (
              <p className={`${theme.bodyFont} ${theme.textSecondary} text-sm leading-relaxed mb-6 opacity-70`}>{content.venueDetails}</p>
            )}
            {details.googleMapsUrl && (
              <a
                href={details.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center gap-2 ${theme.text} text-xs ${theme.bodyFont} tracking-widest uppercase border-b border-current pb-1`}
                data-testid="link-maps-venue"
              >
                <MapPin className="w-3 h-3" /> View Map
              </a>
            )}
          </FadeSection>
        </div>
      </section>

      {details.agenda && details.agenda.length > 0 && (
        <section className={`py-24 md:py-32 ${theme.bgSecondary}`} data-testid="section-schedule">
          <div className="max-w-4xl mx-auto px-8 md:px-20">
            <FadeSection>
              <p className={`${theme.bodyFont} ${theme.textSecondary} text-xs tracking-[0.5em] uppercase mb-10`}>Schedule</p>
            </FadeSection>
            {content.agendaIntro && (
              <FadeSection>
                <p className={`${theme.bodyFont} ${theme.textSecondary} text-sm mb-12 opacity-70 max-w-md`}>{content.agendaIntro}</p>
              </FadeSection>
            )}
            <StaggerChildren className="space-y-0 divide-y divide-[#d5d0c8]/30">
              {details.agenda.map((item: { time: string; event: string }, i: number) => {
                const Icon = getEventIcon(item.event);
                return (
                  <motion.div
                    key={i}
                    variants={staggerItem}
                    className="flex items-center gap-6 py-6 md:py-8"
                    data-testid={`timeline-item-${i}`}
                  >
                    <Icon className={`w-5 h-5 ${theme.textSecondary} opacity-40 flex-shrink-0`} />
                    <p className={`${theme.bodyFont} ${theme.textSecondary} text-sm w-24 flex-shrink-0 tracking-wider`}>{item.time}</p>
                    <p className={`${theme.headingFont} ${theme.text} text-xl md:text-2xl`}>{item.event}</p>
                  </motion.div>
                );
              })}
            </StaggerChildren>
          </div>
        </section>
      )}

      {(details.dressCode || details.transportation || details.accommodation || details.registryLinks) && (
        <section className={`py-24 md:py-32 px-8 md:px-20 ${theme.bg}`} data-testid="section-details">
          <div className="max-w-lg mx-auto">
            <FadeSection>
              <p className={`${theme.bodyFont} ${theme.textSecondary} text-xs tracking-[0.5em] uppercase mb-10`}>Details</p>
            </FadeSection>
            <StaggerChildren className="grid grid-cols-2 gap-4">
              {details.dressCode && <motion.div variants={staggerItem}><DetailCard icon={Shirt} title="Dress Code" value={details.dressCode} theme={theme} /></motion.div>}
              {details.transportation && <motion.div variants={staggerItem}><DetailCard icon={Bus} title="Transportation" value={details.transportation} theme={theme} /></motion.div>}
              {details.accommodation && <motion.div variants={staggerItem}><DetailCard icon={Hotel} title="Accommodation" value={details.accommodation} theme={theme} /></motion.div>}
              {details.registryLinks && <motion.div variants={staggerItem}><DetailCard icon={Gift} title="Registry" value="View Registry" link={details.registryLinks} theme={theme} /></motion.div>}
            </StaggerChildren>
          </div>
        </section>
      )}

      <section className="grid grid-cols-2 md:grid-cols-3" data-testid="section-gallery">
        {[minimalHeroImg, ringsImg, whiteBouquetImg, flowersImg, venueImg, eucalyptusImg].map((img, i) => (
          <div key={i} className="relative aspect-square overflow-hidden group" data-testid={`gallery-item-${i}`}>
            <img src={img} alt={`Gallery ${i + 1}`} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105" />
          </div>
        ))}
      </section>

      <RsvpSection theme={theme} content={content} details={details} />
      <ClosingSection theme={theme} content={content} details={details} />
    </div>
  );
}
