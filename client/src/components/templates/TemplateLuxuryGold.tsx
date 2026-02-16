export function TemplateLuxuryGold(props: any) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white p-12">
      <div className="text-center border border-[#D4AF37] p-12 max-w-2xl">
        <h1 className="text-6xl font-script text-[#D4AF37] mb-6">{props.details?.coupleNames}</h1>
        <p className="text-xl uppercase tracking-widest mb-4">Cordially Invite You</p>
        <p className="text-gray-400">Template coming soon...</p>
      </div>
    </div>
  );
}
