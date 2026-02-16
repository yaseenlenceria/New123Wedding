import { useState, useRef } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { MapPin, Heart, Shirt, Bus, Hotel, Gift, ChevronDown } from "lucide-react";
import {
  EnvelopeOpening, FloatingRing, Particles, Countdown, MusicButton,
  FadeSection, StaggerChildren, staggerItem, LetterByLetter, SectionHeading,
  Ornament, RsvpSection, ClosingSection, DetailCard, formatWeddingDate, getEventIcon,
  type TemplateProps, BlurRevealImage, FloatingLights, FloatingDecor,
} from "./shared";

import oldMoneyHeroImg from "@/assets/images/oldmoney-hero.jpg";
import oldMoneyTableImg from "@/assets/images/oldmoney-table.jpg";
import ringsImg from "@/assets/images/rings.jpg";
import flowersImg from "@/assets/images/flowers.jpg";
import rosesBackgroundImg from "@assets/705bc7f41429871f2378cf8a260146ed7b12bf7c_1771243555627.jpg";
import mossAgateRingImg from "@assets/0f63d8b56ab62900e7e7d1737446cf224840ef13_1771243555623.webp";
import bridesmaidsImg from "@assets/40220817f765def8d09492c4a0d562b82296009c_1771243555627.jpg";

export default function TemplateOldMoney({ order, theme }: TemplateProps) {
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
    <div className={`min-h-screen ${theme.bg} overflow-x-hidden selection:bg-current/10`} data-testid="template-old-money">
      <AnimatePresence>
        {!envelopeOpen && <EnvelopeOpening theme={theme} onOpen={() => setEnvelopeOpen(true)} />}
      </AnimatePresence>
      {envelopeOpen && <FloatingRing theme={theme} scrollProgress={pageProgress} />}
      <MusicButton musicLink={details.musicLink} theme={theme} envelopeOpen={envelopeOpen} />

      <motion.section
        ref={heroRef}
        style={{ opacity: heroOpacity }}
        className="min-h-screen relative flex flex-col items-center justify-center px-6"
        data-testid="section-hero"
      >
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-8 md:inset-16 border border-[#c9a94e]/15" />
          <div className="absolute top-6 left-6 md:top-14 md:left-14 w-12 h-12 md:w-20 md:h-20 border-t border-l border-[#c9a94e]/30" />
          <div className="absolute top-6 right-6 md:top-14 md:right-14 w-12 h-12 md:w-20 md:h-20 border-t border-r border-[#c9a94e]/30" />
          <div className="absolute bottom-6 left-6 md:bottom-14 md:left-14 w-12 h-12 md:w-20 md:h-20 border-b border-l border-[#c9a94e]/30" />
          <div className="absolute bottom-6 right-6 md:bottom-14 md:right-14 w-12 h-12 md:w-20 md:h-20 border-b border-r border-[#c9a94e]/30" />
        </div>
        <Particles color={theme.particleColor} count={12} />
        <FloatingLights color="rgba(201,169,78,0.08)" count={6} />

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={envelopeOpen ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 0.3, duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
          className="text-center max-w-xl mx-auto relative z-10"
        >
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={envelopeOpen ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.5, duration: 1 }}
            className={`${theme.scriptFont} ${theme.accent} text-xs md:text-sm tracking-[0.5em] uppercase mb-6`}
          >
            The Wedding Of
          </motion.p>
          <h1 className={`${theme.headingFont} ${theme.text} text-6xl md:text-8xl leading-none tracking-tight`} data-testid="text-couple-names">
            {envelopeOpen && <LetterByLetter text={nameParts[0]?.trim() || ""} delay={1} />}
          </h1>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={envelopeOpen ? { scaleX: 1 } : {}}
            transition={{ delay: 1.5, duration: 0.8 }}
            className="flex items-center justify-center gap-6 my-5"
          >
            <div className={`h-px w-20 bg-gradient-to-r from-transparent ${theme.gradient}`} />
            <svg width="24" height="24" viewBox="0 0 24 24" className={`${theme.accent} opacity-50`}>
              <path d="M12 2L14.5 8.5L21 12L14.5 15.5L12 22L9.5 15.5L3 12L9.5 8.5Z" fill="currentColor" />
            </svg>
            <div className={`h-px w-20 bg-gradient-to-l from-transparent ${theme.gradient}`} />
          </motion.div>
          <h1 className={`${theme.headingFont} ${theme.text} text-6xl md:text-8xl leading-none tracking-tight`} data-testid="text-couple-names">
            {envelopeOpen && <LetterByLetter text={nameParts[1]?.trim() || "Partner"} delay={1.6} />}
          </h1>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={envelopeOpen ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 2.2, duration: 1 }}
            className="mt-10 space-y-3"
          >
            <Ornament theme={theme} />
            <p className={`${theme.bodyFont} ${theme.textSecondary} text-base md:text-lg tracking-wider mt-4 italic`} data-testid="text-wedding-date">
              {details.weddingDate ? formatWeddingDate(details.weddingDate) : "Date To Be Announced"}
            </p>
            <p className={`${theme.bodyFont} ${theme.textSecondary} text-sm opacity-60 tracking-widest uppercase`}>{details.venue}</p>
          </motion.div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={envelopeOpen ? { opacity: 1 } : {}}
          transition={{ delay: 3, duration: 1 }}
          className="absolute bottom-10"
        >
          <ChevronDown className={`w-5 h-5 ${theme.textSecondary} opacity-40 animate-scroll-hint`} />
        </motion.div>
      </motion.section>

      <section className="relative h-[50vh] md:h-[60vh] overflow-hidden" data-testid="section-countdown">
        <BlurRevealImage src={oldMoneyHeroImg} alt="Grand venue" className="w-full h-full" data-testid="img-hero" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#070f20]/60 via-transparent to-[#070f20]/80" />
        <FloatingLights color="rgba(201,169,78,0.1)" count={5} />
        <div className="absolute inset-0 flex items-center justify-center">
          <FadeSection className="text-center px-6">
            <p className={`${theme.scriptFont} text-[#c9a94e]/70 text-sm tracking-[0.4em] uppercase mb-3`}>Counting Down</p>
            <Countdown targetDate={details.weddingDate || "2027-12-31"} theme={theme} />
            {welcomeMsg && (
              <p className={`${theme.bodyFont} text-[#e8dcc8]/60 mt-8 text-sm italic max-w-sm mx-auto`}>
                &ldquo;{welcomeMsg}&rdquo;
              </p>
            )}
          </FadeSection>
        </div>
      </section>

      {content.ourStory && (
        <section className={`py-24 md:py-32 px-6 ${theme.bg} relative`} data-testid="section-story">
          <Particles color={theme.particleColor} count={8} />
          <FloatingLights color="rgba(201,169,78,0.05)" count={4} />
          <div className="max-w-4xl mx-auto relative z-10">
            <SectionHeading title="Our Story" subtitle="A Love Letter" theme={theme} />
            <FadeSection delay={0.15}>
              <div className="grid md:grid-cols-12 gap-8 items-start">
                <div className="md:col-span-5">
                  <div className="relative rounded-2xl overflow-hidden aspect-[3/4] border border-[#c9a94e]/10">
                    <BlurRevealImage src={mossAgateRingImg} alt="Wedding rings" className="w-full h-full" data-testid="img-rings" />
                  </div>
                </div>
                <div className="md:col-span-7">
                  <div className={`border border-[#c9a94e]/12 rounded-2xl p-8 md:p-12`}>
                    <svg width="40" height="40" viewBox="0 0 40 40" className="text-[#c9a94e] opacity-20 mb-6">
                      <path d="M10 20C10 14.5 13.5 10 18 8L19 10C15.5 12 13.5 15 13.5 18H18V28H10V20Z" fill="currentColor" />
                      <path d="M24 20C24 14.5 27.5 10 32 8L33 10C29.5 12 27.5 15 27.5 18H32V28H24V20Z" fill="currentColor" />
                    </svg>
                    <p className={`${theme.bodyFont} ${theme.textSecondary} text-sm md:text-base leading-[2.2] whitespace-pre-line`}>
                      {content.ourStory}
                    </p>
                    <Ornament theme={theme} className="mt-8" />
                  </div>
                </div>
              </div>
            </FadeSection>
          </div>
        </section>
      )}

      <section className={`py-24 md:py-32 px-6 ${theme.bgSecondary}`} data-testid="section-venue">
        <div className="max-w-4xl mx-auto">
          <SectionHeading title={details.venue || "The Venue"} subtitle="Celebrate With Us" theme={theme} />
          <FadeSection delay={0.15}>
            <div className="rounded-2xl overflow-hidden border border-[#c9a94e]/10">
              <div className="relative h-64 md:h-80">
                <BlurRevealImage src={oldMoneyTableImg} alt={details.venue} className="w-full h-full" data-testid="img-venue" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0e1830] to-transparent" />
                {details.googleMapsUrl && (
                  <a
                    href={details.googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`absolute bottom-5 right-5 inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#c9a94e] text-[#070f20] text-xs ${theme.bodyFont} tracking-widest uppercase shadow-lg`}
                    data-testid="link-maps-venue"
                  >
                    <MapPin className="w-3.5 h-3.5" /> View Map
                  </a>
                )}
              </div>
              <div className="p-8 md:p-10 grid md:grid-cols-2 gap-6">
                {details.venueAddress && (
                  <div>
                    <p className={`${theme.scriptFont} ${theme.accent} text-[10px] tracking-[0.3em] uppercase mb-2`}>Address</p>
                    <p className={`${theme.bodyFont} ${theme.text} text-sm`}>{details.venueAddress}</p>
                  </div>
                )}
                {content.venueDetails && (
                  <div>
                    <p className={`${theme.bodyFont} ${theme.textSecondary} text-sm leading-relaxed`}>{content.venueDetails}</p>
                  </div>
                )}
              </div>
            </div>
          </FadeSection>
        </div>
      </section>

      {details.agenda && details.agenda.length > 0 && (
        <section className={`py-24 md:py-32 px-6 ${theme.bg}`} data-testid="section-schedule">
          <div className="max-w-3xl mx-auto">
            <SectionHeading title="The Day" subtitle="Schedule" theme={theme} />
            {content.agendaIntro && (
              <FadeSection>
                <p className={`${theme.bodyFont} ${theme.textSecondary} text-center text-sm mb-12 opacity-80`}>{content.agendaIntro}</p>
              </FadeSection>
            )}
            <StaggerChildren className="grid md:grid-cols-2 gap-5">
              {details.agenda.map((item: { time: string; event: string }, i: number) => {
                const Icon = getEventIcon(item.event);
                return (
                  <motion.div
                    key={i}
                    variants={staggerItem}
                    className="border border-[#c9a94e]/12 rounded-2xl p-6 text-center"
                    data-testid={`timeline-item-${i}`}
                  >
                    <div className="w-14 h-14 rounded-full mx-auto mb-4 flex items-center justify-center border border-[#c9a94e]/20">
                      <Icon className={`w-6 h-6 ${theme.accent}`} />
                    </div>
                    <p className={`${theme.scriptFont} ${theme.accent} text-[10px] tracking-[0.3em] uppercase mb-2`}>{item.time}</p>
                    <p className={`${theme.headingFont} ${theme.text} text-xl`}>{item.event}</p>
                  </motion.div>
                );
              })}
            </StaggerChildren>
          </div>
        </section>
      )}

      {(details.dressCode || details.transportation || details.accommodation || details.registryLinks) && (
        <section className={`py-24 md:py-32 px-6 ${theme.bgSecondary}`} data-testid="section-details">
          <div className="max-w-lg mx-auto">
            <SectionHeading title="Details" subtitle="Good to Know" theme={theme} />
            <StaggerChildren className="grid grid-cols-2 gap-4">
              {details.dressCode && <motion.div variants={staggerItem}><DetailCard icon={Shirt} title="Dress Code" value={details.dressCode} theme={theme} /></motion.div>}
              {details.transportation && <motion.div variants={staggerItem}><DetailCard icon={Bus} title="Transportation" value={details.transportation} theme={theme} /></motion.div>}
              {details.accommodation && <motion.div variants={staggerItem}><DetailCard icon={Hotel} title="Accommodation" value={details.accommodation} theme={theme} /></motion.div>}
              {details.registryLinks && <motion.div variants={staggerItem}><DetailCard icon={Gift} title="Registry" value="View Registry" link={details.registryLinks} theme={theme} /></motion.div>}
            </StaggerChildren>
          </div>
        </section>
      )}

      <section className={`py-24 md:py-32 px-6 ${theme.bg} relative`} data-testid="section-gallery">
        <Particles color={theme.particleColor} count={6} />
        <FloatingLights color="rgba(201,169,78,0.04)" count={3} />
        <div className="max-w-4xl mx-auto relative z-10">
          <SectionHeading title="Gallery" subtitle="Captured Moments" theme={theme} />
          <StaggerChildren className="grid grid-cols-3 gap-3 md:gap-4">
            {[oldMoneyHeroImg, mossAgateRingImg, rosesBackgroundImg, oldMoneyTableImg, bridesmaidsImg, flowersImg].map((img, i) => (
              <motion.div
                key={i}
                variants={staggerItem}
                className={`${i === 0 ? "col-span-2 row-span-2 aspect-[4/3]" : "aspect-square"} rounded-2xl overflow-hidden relative group border border-[#c9a94e]/8`}
                data-testid={`gallery-item-${i}`}
              >
                <img src={img} alt={`Gallery ${i + 1}`} className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-[#070f20]/20 group-hover:bg-[#070f20]/5 transition-colors duration-500" />
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
