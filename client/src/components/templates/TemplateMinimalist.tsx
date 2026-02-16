import { motion } from "framer-motion";

interface Props {
  details: any;
  content: any;
}

export function TemplateMinimalist({ details, content }: Props) {
  return (
    <div className="font-sans text-black bg-white">
      {/* Hero */}
      <section className="h-screen flex flex-col justify-end pb-24 px-6 md:px-24">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-2"
        >
          <h1 className="text-6xl md:text-9xl font-bold tracking-tighter leading-[0.9]">{details?.coupleNames}</h1>
          <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-12 text-lg md:text-xl pt-8">
            <p>{new Date(details?.weddingDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
            <span className="hidden md:block w-2 h-2 bg-black rounded-full" />
            <p>{details?.venue}</p>
          </div>
        </motion.div>
      </section>

      {/* Large Image */}
       {/* Unsplash: Minimal architecture or couple */}
      <div className="w-full h-[80vh] bg-gray-100">
        <img 
          src="https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&q=80&w=1600" 
          className="w-full h-full object-cover grayscale"
          alt="Minimalist wedding"
        />
      </div>

      {/* Story */}
      <section className="py-32 px-6 md:px-24 grid md:grid-cols-12 gap-12">
        <div className="md:col-span-4">
          <h2 className="text-xs font-bold uppercase tracking-widest sticky top-32">Our Story</h2>
        </div>
        <div className="md:col-span-8 text-xl md:text-3xl leading-relaxed font-light">
          {content?.ourStory}
        </div>
      </section>

      {/* Details Grid */}
      <section className="border-t border-black">
        <div className="grid md:grid-cols-2">
          <div className="p-12 md:p-24 border-b md:border-b-0 md:border-r border-black">
             <h3 className="text-4xl font-bold mb-6">When & Where</h3>
             <p className="text-xl">{details?.venue}</p>
             <p className="text-gray-500 mt-2">123 Wedding Lane, City, State</p>
             <p className="text-xl mt-8">Ceremony begins at 4:00 PM</p>
          </div>
          <div className="p-12 md:p-24 flex items-center justify-center bg-black text-white">
            <div className="text-center space-y-6">
              <h3 className="text-4xl font-bold">RSVP</h3>
              <p className="text-gray-400">Kindly reply by August 1st</p>
              <button className="border border-white px-8 py-3 hover:bg-white hover:text-black transition-colors">
                Confirm Attendance
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
