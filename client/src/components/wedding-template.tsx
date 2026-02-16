import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { MapPin, Clock, ChevronDown, Music, Pause, Heart, Shirt, Bus, Hotel, Gift, Users, UtensilsCrossed, PartyPopper, Church, GlassWater, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { type ThemeConfig } from "@/lib/themes";
import type { Order } from "@shared/schema";

function Section({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.section>
  );
}

function SectionTitle({ title, subtitle, theme }: { title: string; subtitle?: string; theme: ThemeConfig }) {
  return (
    <div className="text-center mb-8">
      <p className={`${theme.scriptFont} ${theme.accent} text-sm tracking-[0.3em] uppercase mb-2`}>{subtitle || "The"}</p>
      <h2 className={`${theme.headingFont} ${theme.text} text-3xl md:text-4xl`}>{title}</h2>
      <div className={`w-12 h-px mx-auto mt-4 bg-gradient-to-r ${theme.gradient}`} />
    </div>
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
    { label: "Mins", value: time.minutes },
    { label: "Secs", value: time.seconds },
  ];

  return (
    <div className="flex justify-center gap-3">
      {units.map((u) => (
        <div key={u.label} className={`${theme.glass} rounded-xl px-4 py-3 min-w-[70px] text-center`}>
          <motion.span
            key={u.value}
            initial={{ scale: 1.1, opacity: 0.7 }}
            animate={{ scale: 1, opacity: 1 }}
            className={`block text-2xl md:text-3xl ${theme.headingFont} ${theme.text} tabular-nums`}
          >
            {String(u.value).padStart(2, "0")}
          </motion.span>
          <span className={`text-[10px] uppercase tracking-[0.2em] ${theme.textSecondary}`}>{u.label}</span>
        </div>
      ))}
    </div>
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

export default function WeddingTemplate({ order, theme }: { order: Order; theme: ThemeConfig }) {
  const [musicPlaying, setMusicPlaying] = useState(false);
  const [rsvpSubmitted, setRsvpSubmitted] = useState(false);
  const details = order.weddingDetails || {} as any;
  const content = order.generatedContent || {} as any;
  const names = details.coupleNames || "Couple";
  const nameParts = names.split(/\s*[&]\s*/);

  return (
    <div className={`min-h-screen ${theme.bg} overflow-x-hidden`}>
      {details.musicLink && (
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          onClick={() => setMusicPlaying(!musicPlaying)}
          className={`fixed top-4 right-4 z-50 w-10 h-10 rounded-full ${theme.glass} flex items-center justify-center`}
          data-testid="button-music"
        >
          {musicPlaying ? <Pause className={`w-4 h-4 ${theme.accent}`} /> : <Music className={`w-4 h-4 ${theme.accent}`} />}
        </motion.button>
      )}

      {/* 1. HERO */}
      <section className={`min-h-screen flex flex-col items-center justify-center px-6 relative ${theme.bg}`}>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.2 }} className="text-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className={`${theme.scriptFont} ${theme.accent} text-base tracking-[0.4em] uppercase mb-6`}
          >
            Together with their families
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="mb-6"
          >
            <h1 className={`${theme.headingFont} ${theme.text} text-5xl md:text-7xl leading-tight`}>
              {nameParts[0]?.trim()}
            </h1>
            <p className={`${theme.scriptFont} ${theme.accent} text-2xl my-2`}>&</p>
            <h1 className={`${theme.headingFont} ${theme.text} text-5xl md:text-7xl leading-tight`}>
              {nameParts[1]?.trim() || "Partner"}
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="space-y-3"
          >
            <div className={`w-16 h-px mx-auto bg-gradient-to-r ${theme.gradient}`} />
            <p className={`${theme.bodyFont} ${theme.textSecondary} text-lg tracking-wide`}>
              {details.weddingDate ? new Date(details.weddingDate + "T12:00:00").toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" }) : "Date TBA"}
            </p>
            <p className={`${theme.bodyFont} ${theme.textSecondary} text-sm`}>
              {details.venue}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4, duration: 0.8 }}
            className="mt-8 flex flex-col items-center gap-3"
          >
            {details.googleMapsUrl && (
              <a href={details.googleMapsUrl} target="_blank" rel="noopener noreferrer" className={`inline-flex items-center gap-2 px-5 py-2 rounded-full ${theme.glass} ${theme.textSecondary} text-sm ${theme.bodyFont} tracking-wide`} data-testid="link-maps-hero">
                <MapPin className="w-3.5 h-3.5" /> View Location
              </a>
            )}
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          className="absolute bottom-8"
        >
          <ChevronDown className={`w-6 h-6 ${theme.textSecondary} animate-scroll-hint`} />
        </motion.div>
      </section>

      {/* 2. COUNTDOWN */}
      <Section className={`py-20 px-6 ${theme.bgSecondary}`}>
        <div className="max-w-lg mx-auto text-center">
          <p className={`${theme.scriptFont} ${theme.accent} text-sm tracking-[0.3em] uppercase mb-3`}>Save the Date</p>
          <h2 className={`${theme.headingFont} ${theme.text} text-3xl mb-2`}>The Forever Starts In...</h2>
          <div className={`w-12 h-px mx-auto mb-8 bg-gradient-to-r ${theme.gradient}`} />
          <Countdown targetDate={details.weddingDate || "2025-12-31"} theme={theme} />
          {content.welcomeMessage && (
            <p className={`${theme.bodyFont} ${theme.textSecondary} mt-8 text-sm leading-relaxed italic`}>
              "{typeof content.welcomeMessage === 'object' ? (content.welcomeMessage as any).title || (content.welcomeMessage as any).subtitle || '' : content.welcomeMessage}"
            </p>
          )}
        </div>
      </Section>

      {/* OUR STORY */}
      {content.ourStory && (
        <Section className={`py-20 px-6 ${theme.bg}`}>
          <div className="max-w-lg mx-auto">
            <SectionTitle title="Our Story" subtitle="Love" theme={theme} />
            <p className={`${theme.bodyFont} ${theme.textSecondary} text-base leading-relaxed text-center whitespace-pre-line`}>
              {content.ourStory}
            </p>
          </div>
        </Section>
      )}

      {/* 3. VENUE */}
      <Section className={`py-20 px-6 ${theme.bgSecondary}`}>
        <div className="max-w-lg mx-auto">
          <SectionTitle title={details.venue || "The Venue"} subtitle="Venue" theme={theme} />
          <div className={`${theme.glass} rounded-2xl overflow-hidden`}>
            <div className={`h-48 ${theme.bgSecondary} flex items-center justify-center`}>
              <MapPin className={`w-12 h-12 ${theme.textSecondary} opacity-30`} />
            </div>
            <div className="p-6 text-center space-y-3">
              {details.venueAddress && (
                <p className={`${theme.bodyFont} ${theme.textSecondary} text-sm`}>{details.venueAddress}</p>
              )}
              {content.venueDetails && (
                <p className={`${theme.bodyFont} ${theme.textSecondary} text-sm leading-relaxed`}>{content.venueDetails}</p>
              )}
              {details.googleMapsUrl && (
                <a href={details.googleMapsUrl} target="_blank" rel="noopener noreferrer" className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full ${theme.buttonBg} ${theme.buttonText} text-sm ${theme.bodyFont} tracking-wide`} data-testid="link-maps-venue">
                  <MapPin className="w-4 h-4" /> Get Directions
                </a>
              )}
            </div>
          </div>
        </div>
      </Section>

      {/* 4. THE DAY / TIMELINE */}
      {details.agenda && details.agenda.length > 0 && (
        <Section className={`py-20 px-6 ${theme.bg}`}>
          <div className="max-w-lg mx-auto">
            <SectionTitle title="The Day" subtitle="Schedule" theme={theme} />
            {content.agendaIntro && (
              <p className={`${theme.bodyFont} ${theme.textSecondary} text-center text-sm mb-8`}>{content.agendaIntro}</p>
            )}
            <div className="relative">
              <div className={`absolute left-6 top-0 bottom-0 w-px ${theme.timelineLine}`} />
              <div className="space-y-6">
                {details.agenda.map((item: { time: string; event: string }, i: number) => {
                  const Icon = getEventIcon(item.event);
                  return (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.15, duration: 0.5 }}
                      className="flex items-center gap-4 pl-0"
                    >
                      <div className={`relative z-10 w-12 h-12 rounded-full ${theme.glass} flex items-center justify-center flex-shrink-0`}>
                        <Icon className={`w-5 h-5 ${theme.accent}`} />
                      </div>
                      <div className={`flex-1 ${theme.glass} rounded-xl p-4`}>
                        <p className={`${theme.bodyFont} ${theme.accent} text-xs tracking-[0.2em] uppercase mb-1`}>{item.time}</p>
                        <p className={`${theme.headingFont} ${theme.text} text-base`}>{item.event}</p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>
        </Section>
      )}

      {/* 5. DETAILS */}
      <Section className={`py-20 px-6 ${theme.bgSecondary}`}>
        <div className="max-w-lg mx-auto">
          <SectionTitle title="Details" subtitle="Important" theme={theme} />
          {content.detailsIntro && (
            <p className={`${theme.bodyFont} ${theme.textSecondary} text-center text-sm mb-8`}>{content.detailsIntro}</p>
          )}
          <div className="grid grid-cols-2 gap-3">
            {details.dressCode && (
              <DetailCard icon={Shirt} title="Dress Code" value={details.dressCode} theme={theme} />
            )}
            {details.transportation && (
              <DetailCard icon={Bus} title="Transportation" value={details.transportation} theme={theme} />
            )}
            {details.accommodation && (
              <DetailCard icon={Hotel} title="Accommodation" value={details.accommodation} theme={theme} />
            )}
            {details.registryLinks && (
              <DetailCard icon={Gift} title="Registry" value="View Registry" link={details.registryLinks} theme={theme} />
            )}
          </div>
        </div>
      </Section>

      {/* 6. GALLERY */}
      <Section className={`py-20 px-6 ${theme.bg}`}>
        <div className="max-w-lg mx-auto">
          <SectionTitle title="Gallery" subtitle="Moments" theme={theme} />
          <div className="grid grid-cols-2 gap-3">
            {[1, 2, 3, 4].map((i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
                className={`aspect-square rounded-xl ${theme.glass} flex items-center justify-center`}
              >
                <Heart className={`w-8 h-8 ${theme.textSecondary} opacity-20`} />
              </motion.div>
            ))}
          </div>
          <p className={`${theme.bodyFont} ${theme.textSecondary} text-center text-xs mt-4`}>Photos will be added closer to the date</p>
        </div>
      </Section>

      {/* 7. RSVP */}
      <Section className={`py-20 px-6 ${theme.bgSecondary}`}>
        <div className="max-w-lg mx-auto text-center">
          <p className={`${theme.scriptFont} ${theme.accent} text-sm tracking-[0.3em] uppercase mb-3`}>Please</p>
          <h2 className={`${theme.headingFont} ${theme.text} text-5xl md:text-6xl mb-2`}>RSVP</h2>
          <div className={`w-12 h-px mx-auto mb-4 bg-gradient-to-r ${theme.gradient}`} />
          <p className={`${theme.bodyFont} ${theme.textSecondary} text-sm mb-8`}>
            {content.rsvpMessage || "We'd love for you to celebrate with us!"}
          </p>

          {rsvpSubmitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: "spring" }}
              className={`${theme.glass} rounded-2xl p-8`}
            >
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ repeat: Infinity, duration: 2 }}
              >
                <Heart className={`w-12 h-12 ${theme.accent} mx-auto mb-4`} />
              </motion.div>
              <h3 className={`${theme.headingFont} ${theme.text} text-2xl mb-2`}>Thank You!</h3>
              <p className={`${theme.bodyFont} ${theme.textSecondary} text-sm`}>We can't wait to celebrate with you</p>
            </motion.div>
          ) : (
            <div className={`${theme.glass} rounded-2xl p-6 text-left space-y-4`}>
              <div>
                <label className={`text-xs ${theme.textSecondary} ${theme.bodyFont} uppercase tracking-wider`}>Full Name</label>
                <Input data-testid="input-rsvp-name" className={`mt-1 bg-transparent ${theme.glassBorder} ${theme.text} ${theme.bodyFont}`} placeholder="Your name" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className={`text-xs ${theme.textSecondary} ${theme.bodyFont} uppercase tracking-wider`}>Guests</label>
                  <Input data-testid="input-rsvp-guests" type="number" min={1} max={5} defaultValue={1} className={`mt-1 bg-transparent ${theme.glassBorder} ${theme.text} ${theme.bodyFont}`} />
                </div>
                <div>
                  <label className={`text-xs ${theme.textSecondary} ${theme.bodyFont} uppercase tracking-wider`}>Meal</label>
                  <select data-testid="select-rsvp-meal" className={`mt-1 w-full rounded-md px-3 h-9 bg-transparent ${theme.text} ${theme.bodyFont} border ${theme.glassBorder} text-sm`}>
                    {(details.guestMealOptions || ["Beef", "Chicken", "Vegetarian"]).map((m: string) => (
                      <option key={m} value={m}>{m}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div>
                <label className={`text-xs ${theme.textSecondary} ${theme.bodyFont} uppercase tracking-wider`}>Song Request</label>
                <Input data-testid="input-rsvp-song" className={`mt-1 bg-transparent ${theme.glassBorder} ${theme.text} ${theme.bodyFont}`} placeholder="Your favourite song" />
              </div>
              <Button
                data-testid="button-rsvp-submit"
                onClick={() => setRsvpSubmitted(true)}
                className={`w-full ${theme.buttonBg} ${theme.buttonText} ${theme.bodyFont} tracking-wide gap-2`}
              >
                <Send className="w-4 h-4" /> Send RSVP
              </Button>
            </div>
          )}
        </div>
      </Section>

      {/* 8. CLOSING */}
      <section className={`py-24 px-6 ${theme.bg} text-center`}>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <div className={`w-20 h-px mx-auto mb-8 bg-gradient-to-r ${theme.gradient}`} />
          <p className={`${theme.scriptFont} ${theme.accent} text-sm tracking-[0.4em] uppercase mb-4`}>With Love</p>
          <h2 className={`${theme.headingFont} ${theme.text} text-4xl md:text-5xl mb-4`}>{names}</h2>
          <p className={`${theme.bodyFont} ${theme.textSecondary} text-sm leading-relaxed max-w-xs mx-auto`}>
            {content.closingMessage || "Thank you for being part of our journey. We can't wait to celebrate with you."}
          </p>
          <div className={`mt-8`}>
            <Heart className={`w-6 h-6 mx-auto ${theme.accent} animate-float`} />
          </div>
          <p className={`${theme.bodyFont} ${theme.textSecondary} text-xs mt-8 opacity-60`}>
            {details.weddingDate ? new Date(details.weddingDate + "T12:00:00").toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }) : ""}
          </p>
        </motion.div>
      </section>
    </div>
  );
}

function DetailCard({ icon: Icon, title, value, link, theme }: { icon: any; title: string; value: string; link?: string; theme: ThemeConfig }) {
  const content = (
    <div className={`${theme.glass} rounded-xl p-4 text-center h-full`}>
      <Icon className={`w-6 h-6 ${theme.accent} mx-auto mb-2`} />
      <p className={`${theme.bodyFont} ${theme.accent} text-[10px] tracking-[0.2em] uppercase mb-1`}>{title}</p>
      <p className={`${theme.bodyFont} ${theme.text} text-sm`}>{value}</p>
    </div>
  );

  if (link) {
    return <a href={link} target="_blank" rel="noopener noreferrer" data-testid={`link-${title.toLowerCase()}`}>{content}</a>;
  }
  return content;
}
