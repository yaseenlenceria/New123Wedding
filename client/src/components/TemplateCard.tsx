import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

interface TemplateCardProps {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  selected: boolean;
  onSelect: () => void;
}

export function TemplateCard({ id, name, description, imageUrl, selected, onSelect }: TemplateCardProps) {
  return (
    <div 
      onClick={onSelect}
      className={cn(
        "group relative cursor-pointer rounded-xl overflow-hidden border-2 transition-all duration-300",
        selected 
          ? "border-primary ring-4 ring-primary/10 shadow-lg scale-[1.02]" 
          : "border-transparent hover:border-primary/50 hover:shadow-md"
      )}
    >
      <div className="aspect-[3/4] w-full overflow-hidden bg-muted">
        {/* Unsplash image URL should be passed as imageUrl prop */}
        <div 
          className="w-full h-full bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
          style={{ backgroundImage: `url(${imageUrl})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60" />
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
        <h3 className="font-display text-xl font-bold">{name}</h3>
        <p className="text-white/80 text-sm mt-1">{description}</p>
      </div>

      {selected && (
        <div className="absolute top-3 right-3 bg-primary text-primary-foreground rounded-full p-1.5 shadow-lg animate-in zoom-in duration-200">
          <Check className="w-4 h-4" />
        </div>
      )}
    </div>
  );
}
