import { motion } from "framer-motion";

interface Props {
  details: any;
  content: any;
}

export function TemplateOldMoney({ details, content }: Props) {
  return (
    <div className="font-serif text-[#1A237E] bg-[#F5F5F0]">
      {/* Hero */}
      <section className="min-h-screen flex flex-col justify-center items-center text-center p-8 border-[20px] border-white">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl w-full border border-[#1A237E] p-12 md:p-24 relative"
        >
          <div className="absolute top-4 left-4 w-16 h-16 border-t border-l border-[#1A237E]" />
          <div className="absolute top-4 right-4 w-16 h-16 border-t border-r border-[#1A237E]" />
          <div className="absolute bottom-4 left-4 w-16 h-16 border-b border-l border-[#1A237E]" />
          <div className="absolute bottom-4 right-4 w-16 h-16 border-b border-r border-[#1A237E]" />
          
          <h2 className="text-sm md:text-base uppercase tracking-[0.3em] mb-8">The Wedding Of</h2>
          <h1 className="text-5xl md:text-7xl font-display mb-8 text-[#1A237E]">{details?.coupleNames}</h1>
          <p className="text-xl md:text-2xl italic font-light mb-8">
            {new Date(details?.weddingDate).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
          </p>
          <p className="text-sm uppercase tracking-widest">{details?.venue}</p>
        </motion.div>
      </section>

      {/* Content */}
      <section className="py-24 px-8 bg-white text-center">
        <div className="max-w-2xl mx-auto space-y-8">
          <h2 className="text-3xl font-display italic">Our Story</h2>
          <div className="w-12 h-0.5 bg-[#1A237E] mx-auto" />
          <div className="prose prose-lg text-[#333] leading-relaxed">
            {content?.ourStory}
          </div>
        </div>
      </section>

       {/* Unsplash: Classic car or elegant venue */}
      <div className="h-[60vh] bg-fixed bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1511285560982-1351cdeb9821?auto=format&fit=crop&q=80&w=1600')" }}>
        <div className="h-full w-full bg-black/30 flex items-center justify-center">
          <p className="text-white text-4xl md:text-6xl font-display italic">Forever Begins Now</p>
        </div>
      </div>
    </div>
  );
}
