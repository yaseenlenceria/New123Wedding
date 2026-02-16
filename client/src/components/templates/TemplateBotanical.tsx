export function TemplateBotanical(props: any) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FFF0F5] text-[#556B2F] p-12">
      <div className="text-center p-12 max-w-2xl bg-white/80 backdrop-blur rounded-3xl shadow-xl">
        <h1 className="text-6xl font-serif mb-6">{props.details?.coupleNames}</h1>
        <p className="text-xl italic mb-4">Love is in bloom</p>
        <p className="text-gray-600">Template coming soon...</p>
      </div>
    </div>
  );
}
