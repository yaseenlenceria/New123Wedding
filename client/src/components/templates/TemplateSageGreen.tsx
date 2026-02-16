import { motion } from "framer-motion";

interface Props {
  details: any;
  content: any;
}

export function TemplateSageGreen({ details, content }: Props) {
  return (
    <div className="font-serif text-[#2C3E2D] bg-[#F7F9F7]">
      {/* Hero Section */}
      <section className="min-h-screen flex flex-col items-center justify-center text-center p-8 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-64 h-64 opacity-20 bg-[url('https://pixabay.com/get/g3ab22e5ab9f84983e7710874ca8e404b0845b68c3f43ae9b0491d23c32f3fb190c759e25262319bad1a10a0de7f0e29550ecb9ff0e177d3c15ba167a15a24aef_1280.png')] bg-no-repeat bg-contain" />
        <div className="absolute bottom-0 right-0 w-64 h-64 opacity-20 bg-[url('https://pixabay.com/get/g3ab22e5ab9f84983e7710874ca8e404b0845b68c3f43ae9b0491d23c32f3fb190c759e25262319bad1a10a0de7f0e29550ecb9ff0e177d3c15ba167a15a24aef_1280.png')] bg-no-repeat bg-contain rotate-180" />
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="z-10 space-y-6"
        >
          <p className="text-lg tracking-[0.2em] uppercase text-[#6B8E6D]">We are getting married</p>
          <h1 className="text-6xl md:text-8xl font-display text-[#2C3E2D]">{details?.coupleNames}</h1>
          <div className="h-px w-24 bg-[#6B8E6D] mx-auto my-6" />
          <p className="text-xl md:text-2xl">{new Date(details?.weddingDate).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
          <p className="text-lg uppercase tracking-widest">{details?.venue}</p>
        </motion.div>
      </section>

      {/* Our Story */}
      <section className="py-24 px-6 md:px-12 bg-white">
        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
             {/* Unsplash: Couple hands */}
            <img 
              src="https://images.unsplash.com/photo-1621621667797-e06afc217fb0?auto=format&fit=crop&q=80&w=800" 
              alt="Couple" 
              className="rounded-t-full w-full object-cover h-[500px]"
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6"
          >
            <h2 className="text-4xl font-display text-[#2C3E2D]">Our Story</h2>
            <div className="prose prose-lg text-[#4A5D4B]">
              {content?.ourStory ? (
                content.ourStory.split('\n').map((p: string, i: number) => <p key={i}>{p}</p>)
              ) : (
                <p>Loading our story...</p>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Schedule/Details */}
      <section className="py-24 px-6 bg-[#6B8E6D] text-white text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="max-w-3xl mx-auto space-y-8"
        >
          <h2 className="text-4xl font-display">The Details</h2>
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="p-6 border border-white/20 rounded-lg backdrop-blur-sm">
              <h3 className="text-xl font-bold mb-2">Ceremony</h3>
              <p>4:00 PM</p>
              <p className="text-sm opacity-80 mt-2">{details?.venue}</p>
            </div>
            <div className="p-6 border border-white/20 rounded-lg backdrop-blur-sm">
              <h3 className="text-xl font-bold mb-2">Cocktails</h3>
              <p>5:00 PM</p>
              <p className="text-sm opacity-80 mt-2">Garden Terrace</p>
            </div>
            <div className="p-6 border border-white/20 rounded-lg backdrop-blur-sm">
              <h3 className="text-xl font-bold mb-2">Reception</h3>
              <p>6:30 PM</p>
              <p className="text-sm opacity-80 mt-2">Grand Ballroom</p>
            </div>
          </div>
          {details?.dressCode && (
            <div className="mt-8">
              <p className="uppercase tracking-widest text-sm">Dress Code</p>
              <p className="text-xl mt-2">{details.dressCode}</p>
            </div>
          )}
        </motion.div>
      </section>

      {/* RSVP */}
      <section className="py-24 px-6 text-center">
        <h2 className="text-4xl font-display mb-8">RSVP</h2>
        <p className="text-lg text-[#4A5D4B] max-w-2xl mx-auto mb-12">
          {content?.rsvpMessage || "We can't wait to celebrate with you! Please let us know if you can make it."}
        </p>
        <button className="bg-[#2C3E2D] text-white px-12 py-4 rounded-full text-lg tracking-widest hover:bg-[#1A251B] transition-colors duration-300">
          RSVP ONLINE
        </button>
      </section>
    </div>
  );
}
