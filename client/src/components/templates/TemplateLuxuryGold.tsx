import { useState, useRef } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { MapPin, Heart, Shirt, Bus, Hotel, Gift, ChevronDown } from "lucide-react";
import {
  EnvelopeOpening, FloatingRing, Particles, Countdown, MusicButton,
  FadeSection, StaggerChildren, staggerItem, LetterByLetter, SectionHeading,
  Ornament, RsvpSection, ClosingSection, DetailCard, formatWeddingDate, getEventIcon,
  type TemplateProps,
} from "./shared";
import { BlurRevealImage, FloatingLights, FloatingDecor } from "./shared";

import roseHeroImg from "@/assets/images/rose-hero.jpg";
import roseBouquetImg from "@/assets/images/rose-bouquet.jpg";
import flowersImg from "@/assets/images/flowers.jpg";
import venueImg from "@/assets/images/venue.jpg";
import pinkBouquetImg from "@assets/ca6c2fb2693f2ac29b66421237360afadcbbc2b8_1771243555624.webp";
import blushBouquetImg from "@assets/6e1b0f4e62cbdd7fa2155ab6bf64a0bf1d85cc2c_1771243555624.jpg";
import rosesBackgroundImg from "@assets/705bc7f41429871f2378cf8a260146ed7b12bf7c_(1)_1771243555626.jpg";
import floralCorner2Img from "@assets/c42b7ccbf2784a855a1a2e6c34d9d8a948b06606_(1)_1771243555627.png";

export default function TemplateLuxuryGold({ order, theme }: TemplateProps) {
  const [envelopeOpen, setEnvelopeOpen] = useState(false);
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
    ? (content.welcomeMessage as any).title || ""
    : content.welcomeMessage || "";

  return (
    <div className={`min-h-screen ${theme.bg} overflow-x-hidden selection:bg-current/10`} data-testid="template-luxury-gold">
      <AnimatePresence>
        {!envelopeOpen && <EnvelopeOpening theme={theme} onOpen={() => setEnvelopeOpen(true)} />}
      </AnimatePresence>
      {envelopeOpen && <FloatingRing theme={theme} scrollProgress={pageProgress} />}
      <MusicButton musicLink={details.musicLink} theme={theme} envelopeOpen={envelopeOpen} />

      <motion.section
        ref={heroRef}
        style={{ opacity: heroOpacity, scale: heroScale }}
        className="min-h-screen relative flex items-center justify-center overflow-hidden"
        data-testid="section-hero"
      >
        <div className="absolute inset-0">
          <BlurRevealImage src={rosesBackgroundImg} alt="" className="w-full h-full" data-testid="img-hero" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#3d2422]/50 via-[#3d2422]/30 to-[#fdf2ef]" />
        </div>
        <Particles color={theme.particleColor} count={15} />
        <FloatingLights color="rgba(192,112,96,0.1)" count={7} />
        <FloatingDecor src={floralCorner2Img} className="w-24 h-24 md:w-32 md:h-32 bottom-24 left-4 opacity-20 z-0" delay={2} amplitude={10} />

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={envelopeOpen ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 0.3, duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
          className="text-center max-w-xl mx-auto relative z-10 px-6"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={envelopeOpen ? { opacity: 1 } : {}}
            transition={{ delay: 0.5, duration: 1 }}
            className="mb-8"
          >
            <Heart className="w-8 h-8 text-white/50 mx-auto mb-4" />
            <p className={`${theme.scriptFont} text-white/70 text-xs md:text-sm tracking-[0.5em] uppercase`}>
              Together With Their Families
            </p>
          </motion.div>

          <h1 className={`${theme.headingFont} text-white text-5xl md:text-7xl leading-none tracking-tight`} data-testid="text-couple-names">
            {envelopeOpen && <LetterByLetter text={nameParts[0]?.trim() || ""} delay={1} />}
          </h1>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={envelopeOpen ? { scaleX: 1 } : {}}
            transition={{ delay: 1.5, duration: 0.8 }}
            className="my-5"
          >
            <svg width="120" height="20" viewBox="0 0 120 20" className="mx-auto text-white/40">
              <path d="M0 10 Q30 0 60 10 Q90 20 120 10" fill="none" stroke="currentColor" strokeWidth="0.5" />
              <circle cx="60" cy="10" r="3" fill="currentColor" opacity="0.4" />
            </svg>
          </motion.div>
          <h1 className={`${theme.headingFont} text-white text-5xl md:text-7xl leading-none tracking-tight`} data-testid="text-couple-names">
            {envelopeOpen && <LetterByLetter text={nameParts[1]?.trim() || "Partner"} delay={1.6} />}
          </h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={envelopeOpen ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 2.2, duration: 1 }}
            className="mt-10"
          >
            <p className={`${theme.bodyFont} text-white/60 text-base md:text-lg tracking-wider`} data-testid="text-wedding-date">
              {details.weddingDate ? formatWeddingDate(details.weddingDate) : "Date To Be Announced"}
            </p>
            <p className={`${theme.bodyFont} text-white/40 text-sm mt-2`}>{details.venue}</p>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={envelopeOpen ? { opacity: 1 } : {}}
          transition={{ delay: 3, duration: 1 }}
          className="absolute bottom-10 z-10"
        >
          <ChevronDown className="w-5 h-5 text-white/40 animate-scroll-hint" />
        </motion.div>
      </motion.section>

      <section className={`py-24 md:py-32 px-6 ${theme.bg} relative`} data-testid="section-countdown">
        <FloatingLights color="rgba(192,112,96,0.06)" count={4} spread={false} />
        <div className="max-w-lg mx-auto text-center relative z-10">
          <FadeSection>
            <p className={`${theme.scriptFont} ${theme.accent} text-xs tracking-[0.4em] uppercase mb-4`}>Counting Down To</p>
            <h2 className={`${theme.headingFont} ${theme.text} text-3xl md:text-4xl mb-2`}>Our Forever</h2>
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
        <section className={`py-20 md:py-28 px-6 ${theme.bgSecondary} relative`} data-testid="section-story">
          <Particles color={theme.particleColor} count={6} />
          <FloatingLights color="rgba(192,112,96,0.05)" count={4} />
          <div className="max-w-5xl mx-auto relative z-10">
            <SectionHeading title="Our Story" subtitle="A Love Story" theme={theme} />
            <FadeSection delay={0.15}>
              <div className="grid md:grid-cols-5 gap-8 items-center">
                <div className="md:col-span-3 space-y-6">
                  <div className={`${theme.glass} rounded-3xl p-8 md:p-10`}>
                    <Heart className={`w-8 h-8 ${theme.accent} opacity-30 mb-6`} />
                    <p className={`${theme.bodyFont} ${theme.textSecondary} text-sm md:text-base leading-[2] whitespace-pre-line`}>
                      {content.ourStory}
                    </p>
                  </div>
                </div>
                <div className="md:col-span-2">
                  <div className="relative rounded-[2rem] overflow-hidden aspect-[3/4]">
                    <BlurRevealImage src={pinkBouquetImg} alt="Wedding flowers" className="w-full h-full" data-testid="img-flowers" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#c07060]/20 to-transparent" />
                  </div>
                </div>
              </div>
            </FadeSection>
          </div>
        </section>
      )}

      <section className="relative overflow-hidden">
        <div className="relative h-[40vh] md:h-[50vh]">
          <BlurRevealImage src={blushBouquetImg} alt="Floral decoration" className="w-full h-full" data-testid="img-floral" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#fdf2ef]/90 via-[#fdf2ef]/50 to-[#fdf2ef]/90" />
          <div className="absolute inset-0 flex items-center justify-center">
            <FadeSection className="text-center px-6">
              <Heart className={`w-10 h-10 ${theme.accent} opacity-40 mx-auto mb-4`} />
              <p className={`${theme.scriptFont} ${theme.accent} text-sm tracking-[0.3em] uppercase`}>
                Two hearts, one love
              </p>
            </FadeSection>
          </div>
        </div>
      </section>

      <section className={`py-24 md:py-32 px-6 ${theme.bg}`} data-testid="section-venue">
        <div className="max-w-5xl mx-auto">
          <SectionHeading title={details.venue || "The Venue"} subtitle="Where We Celebrate" theme={theme} />
          <FadeSection delay={0.15}>
            <div className="rounded-[2rem] overflow-hidden">
              <div className="relative h-72 md:h-96">
                <BlurRevealImage src={venueImg} alt={details.venue} className="w-full h-full" data-testid="img-venue" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#fdf2ef] via-transparent to-transparent" />
                {details.googleMapsUrl && (
                  <a
                    href={details.googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`absolute bottom-5 left-1/2 -translate-x-1/2 inline-flex items-center gap-2 px-6 py-3 rounded-full ${theme.buttonBg} ${theme.buttonText} text-xs ${theme.bodyFont} tracking-widest uppercase shadow-lg`}
                    data-testid="link-maps-venue"
                  >
                    <MapPin className="w-3.5 h-3.5" /> View Location
                  </a>
                )}
              </div>
              <div className="p-8 md:p-10 text-center space-y-4">
                {details.venueAddress && (
                  <p className={`${theme.bodyFont} ${theme.text} text-sm`}>{details.venueAddress}</p>
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
          <div className="max-w-lg mx-auto">
            <SectionHeading title="The Day" subtitle="Our Timeline" theme={theme} />
            {content.agendaIntro && (
              <FadeSection>
                <p className={`${theme.bodyFont} ${theme.textSecondary} text-center text-sm mb-10 opacity-80`}>{content.agendaIntro}</p>
              </FadeSection>
            )}
            <StaggerChildren className="space-y-4">
              {details.agenda.map((item: { time: string; event: string }, i: number) => {
                const Icon = getEventIcon(item.event);
                return (
                  <motion.div
                    key={i}
                    variants={staggerItem}
                    className={`${theme.glass} rounded-[1.5rem] p-6 flex items-center gap-5`}
                    data-testid={`timeline-item-${i}`}
                  >
                    <div className="w-12 h-12 rounded-full flex items-center justify-center bg-[#c07060]/10 flex-shrink-0">
                      <Icon className={`w-5 h-5 ${theme.accent}`} />
                    </div>
                    <div className="flex-1">
                      <p className={`${theme.headingFont} ${theme.text} text-lg`}>{item.event}</p>
                      <p className={`${theme.scriptFont} ${theme.accent} text-xs tracking-wider mt-0.5`}>{item.time}</p>
                    </div>
                  </motion.div>
                );
              })}
            </StaggerChildren>
          </div>
        </section>
      )}

      {(details.dressCode || details.transportation || details.accommodation || details.registryLinks) && (
        <section className={`py-24 md:py-32 px-6 ${theme.bg}`} data-testid="section-details">
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

      <section className={`py-24 md:py-32 px-6 ${theme.bgSecondary} relative`} data-testid="section-gallery">
        <Particles color={theme.particleColor} count={6} />
        <FloatingLights color="rgba(192,112,96,0.04)" count={3} />
        <div className="max-w-5xl mx-auto relative z-10">
          <SectionHeading title="Gallery" subtitle="Moments of Joy" theme={theme} />
          <StaggerChildren className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {[rosesBackgroundImg, pinkBouquetImg, blushBouquetImg, roseHeroImg, venueImg, flowersImg].map((img, i) => (
              <motion.div
                key={i}
                variants={staggerItem}
                className={`${i === 1 ? "md:col-span-1 md:row-span-2 aspect-[3/4]" : "aspect-square"} rounded-[1.5rem] overflow-hidden relative group`}
                data-testid={`gallery-item-${i}`}
              >
                <img src={img} alt={`Gallery ${i + 1}`} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-[#c07060]/10 group-hover:bg-[#c07060]/0 transition-colors duration-500" />
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
