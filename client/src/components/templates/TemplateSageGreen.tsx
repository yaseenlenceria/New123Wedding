import { useState, useRef } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { MapPin, Heart, Shirt, Bus, Hotel, Gift, ChevronDown } from "lucide-react";
import {
  EnvelopeOpening, FloatingRing, Particles, Countdown, MusicButton,
  FadeSection, StaggerChildren, staggerItem, LetterByLetter, SectionHeading,
  Ornament, RsvpSection, ClosingSection, DetailCard, formatWeddingDate, getEventIcon,
  type TemplateProps,
} from "./shared";

import sageHeroImg from "@/assets/images/sage-hero.jpg";
import sageCoupleImg from "@/assets/images/sage-couple.jpg";
import sageBotanicalImg from "@/assets/images/sage-botanical.jpg";
import venueImg from "@/assets/images/venue.jpg";

export default function TemplateSageGreen({ order, theme }: TemplateProps) {
  const [envelopeOpen, setEnvelopeOpen] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.8], [1, 0.96]);
  const heroImgY = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const { scrollYProgress: pageProgress } = useScroll();

  const details = order.weddingDetails || {} as any;
  const content = order.generatedContent || {} as any;
  const names = details.coupleNames || "Couple";
  const nameParts = names.split(/\s*[&]\s*/);
  const welcomeMsg = typeof content.welcomeMessage === "object"
    ? (content.welcomeMessage as any).title || ""
    : content.welcomeMessage || "";

  return (
    <div className={`min-h-screen ${theme.bg} overflow-x-hidden selection:bg-current/10`} data-testid="template-sage-green">
      <AnimatePresence>
        {!envelopeOpen && <EnvelopeOpening theme={theme} onOpen={() => setEnvelopeOpen(true)} />}
      </AnimatePresence>
      {envelopeOpen && <FloatingRing theme={theme} scrollProgress={pageProgress} />}
      <MusicButton musicLink={details.musicLink} theme={theme} envelopeOpen={envelopeOpen} />

      <motion.section
        ref={heroRef}
        style={{ opacity: heroOpacity, scale: heroScale }}
        className="min-h-screen relative flex flex-col items-center justify-center overflow-hidden"
        data-testid="section-hero"
      >
        <motion.div className="absolute inset-0 z-0" style={{ y: heroImgY }}>
          <img src={sageHeroImg} alt="" className="w-full h-full object-cover" data-testid="img-hero" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#2d3a1e]/70 via-[#2d3a1e]/50 to-[#f7f3eb]" />
        </motion.div>
        <Particles color={theme.particleColor} count={10} />
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={envelopeOpen ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 0.3, duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
          className="text-center max-w-xl mx-auto relative z-10 px-6"
        >
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={envelopeOpen ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.5, duration: 1 }}
            className={`${theme.scriptFont} text-white/80 text-xs md:text-sm tracking-[0.5em] uppercase mb-8`}
          >
            Together With Their Families
          </motion.p>
          <h1 className={`${theme.headingFont} text-white text-6xl md:text-8xl leading-none tracking-tight`} data-testid="text-couple-names">
            {envelopeOpen && <LetterByLetter text={nameParts[0]?.trim() || ""} delay={1} />}
          </h1>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={envelopeOpen ? { scaleX: 1 } : {}}
            transition={{ delay: 1.5, duration: 0.8 }}
            className="flex items-center justify-center gap-4 my-4"
          >
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-white/40" />
            <span className={`${theme.scriptFont} text-white/70 text-3xl`}>&amp;</span>
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-white/40" />
          </motion.div>
          <h1 className={`${theme.headingFont} text-white text-6xl md:text-8xl leading-none tracking-tight`} data-testid="text-couple-names">
            {envelopeOpen && <LetterByLetter text={nameParts[1]?.trim() || "Partner"} delay={1.6} />}
          </h1>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={envelopeOpen ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 2.2, duration: 1 }}
            className="mt-10 space-y-2"
          >
            <p className={`${theme.bodyFont} text-white/70 text-base md:text-lg tracking-wider`} data-testid="text-wedding-date">
              {details.weddingDate ? formatWeddingDate(details.weddingDate) : "Date To Be Announced"}
            </p>
            <p className={`${theme.bodyFont} text-white/50 text-sm`}>{details.venue}</p>
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

      <section className={`py-24 md:py-32 px-6 ${theme.bg}`} data-testid="section-countdown">
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
        <section className={`py-20 md:py-28 px-6 ${theme.bgSecondary} relative`} data-testid="section-story">
          <div className="max-w-5xl mx-auto">
            <SectionHeading title="Our Story" subtitle="A Love Letter" theme={theme} />
            <FadeSection delay={0.15}>
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div className="relative rounded-3xl overflow-hidden aspect-[3/4]">
                  <img src={sageCoupleImg} alt="Our love story" className="w-full h-full object-cover" data-testid="img-couple" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#2d3a1e]/40 to-transparent" />
                </div>
                <div className={`${theme.glass} rounded-3xl p-8 md:p-10`}>
                  <Heart className={`w-8 h-8 ${theme.accent} opacity-30 mb-6`} />
                  <p className={`${theme.bodyFont} ${theme.textSecondary} text-sm md:text-base leading-[2] whitespace-pre-line`}>
                    {content.ourStory}
                  </p>
                </div>
              </div>
            </FadeSection>
          </div>
        </section>
      )}

      <section className="relative overflow-hidden">
        <div className="relative h-[50vh] md:h-[60vh]">
          <img src={sageBotanicalImg} alt="Botanical details" className="w-full h-full object-cover" data-testid="img-botanical" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#f7f3eb]/80 via-transparent to-[#eee8da]/80" />
          <div className="absolute inset-0 flex items-center justify-center">
            <FadeSection className="text-center px-6">
              <p className={`${theme.scriptFont} ${theme.accent} text-sm tracking-[0.4em] uppercase mb-3`}>
                {details.weddingDate ? formatWeddingDate(details.weddingDate) : ""}
              </p>
              <h2 className={`${theme.headingFont} ${theme.text} text-4xl md:text-6xl`}>Save the Date</h2>
            </FadeSection>
          </div>
        </div>
      </section>

      <section className={`py-24 md:py-32 px-6 ${theme.bgSecondary}`} data-testid="section-venue">
        <div className="max-w-5xl mx-auto">
          <SectionHeading title={details.venue || "The Venue"} subtitle="Celebrate With Us" theme={theme} />
          <FadeSection delay={0.15}>
            <div className="grid md:grid-cols-5 gap-6">
              <div className="md:col-span-3 rounded-3xl overflow-hidden aspect-video relative">
                <img src={venueImg} alt={details.venue} className="w-full h-full object-cover" data-testid="img-venue" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#2d3a1e]/30 to-transparent" />
                {details.googleMapsUrl && (
                  <a
                    href={details.googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`absolute bottom-5 left-5 inline-flex items-center gap-2 px-5 py-2.5 rounded-full ${theme.buttonBg} ${theme.buttonText} text-xs ${theme.bodyFont} tracking-widest uppercase shadow-lg`}
                    data-testid="link-maps-venue"
                  >
                    <MapPin className="w-3.5 h-3.5" /> Open in Maps
                  </a>
                )}
              </div>
              <div className="md:col-span-2 flex flex-col justify-center space-y-6">
                {details.venueAddress && (
                  <div className={`${theme.glass} rounded-2xl p-6`}>
                    <p className={`${theme.scriptFont} ${theme.accent} text-[10px] tracking-[0.3em] uppercase mb-2`}>Address</p>
                    <p className={`${theme.bodyFont} ${theme.text} text-sm`}>{details.venueAddress}</p>
                  </div>
                )}
                {content.venueDetails && (
                  <div className={`${theme.glass} rounded-2xl p-6`}>
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
                    <motion.div key={i} variants={staggerItem} className="flex items-start gap-5" data-testid={`timeline-item-${i}`}>
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
        <div className="max-w-5xl mx-auto relative z-10">
          <SectionHeading title="Gallery" subtitle="Captured Moments" theme={theme} />
          <StaggerChildren className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {[sageHeroImg, sageCoupleImg, sageBotanicalImg, venueImg].map((img, i) => (
              <motion.div
                key={i}
                variants={staggerItem}
                className={`${i === 0 ? "md:col-span-2 md:row-span-2 aspect-square" : "aspect-square"} rounded-2xl overflow-hidden relative group`}
                data-testid={`gallery-item-${i}`}
              >
                <img src={img} alt={`Gallery ${i + 1}`} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-[#2d3a1e]/10 group-hover:bg-[#2d3a1e]/0 transition-colors duration-500" />
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
