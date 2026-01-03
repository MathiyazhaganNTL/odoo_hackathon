import { MapPin, Plus, Star, DollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface DestinationCardProps {
  id: string;
  name: string;
  country: string;
  image?: string;
  rating?: number;
  priceLevel?: 1 | 2 | 3 | 4;
  description?: string;
  isSelected?: boolean;
  onAdd?: (id: string) => void;
  onRemove?: (id: string) => void;
  compact?: boolean;
}

export function DestinationCard({
  id,
  name,
  country,
  image,
  rating,
  priceLevel = 2,
  description,
  isSelected = false,
  onAdd,
  onRemove,
  compact = false,
}: DestinationCardProps) {
  const handleClick = () => {
    if (isSelected) {
      onRemove?.(id);
    } else {
      onAdd?.(id);
    }
  };

  if (compact) {
    return (
      <div 
        className={cn(
          "flex items-center gap-3 p-3 rounded-xl border transition-all cursor-pointer",
          isSelected 
            ? "bg-ocean/10 border-ocean/30" 
            : "bg-card border-border hover:border-ocean/30 hover:bg-secondary"
        )}
        onClick={handleClick}
      >
        <div className="w-12 h-12 rounded-lg overflow-hidden shrink-0">
          {image ? (
            <img src={image} alt={name} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full bg-gradient-ocean flex items-center justify-center">
              <MapPin className="w-5 h-5 text-primary-foreground" />
            </div>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="font-semibold text-foreground truncate">{name}</h4>
          <p className="text-sm text-muted-foreground">{country}</p>
        </div>
        {isSelected ? (
          <div className="w-6 h-6 rounded-full bg-ocean flex items-center justify-center">
            <svg className="w-4 h-4 text-primary-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
        ) : (
          <Plus className="w-5 h-5 text-muted-foreground" />
        )}
      </div>
    );
  }

  return (
    <div className={cn(
      "card-elevated overflow-hidden group",
      isSelected && "ring-2 ring-ocean ring-offset-2"
    )}>
      {/* Image */}
      <div className="relative h-36 overflow-hidden">
        {image ? (
          <img 
            src={image} 
            alt={name} 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
          />
        ) : (
          <div className="w-full h-full bg-gradient-adventure" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/40 to-transparent" />
        
        {/* Rating Badge */}
        {rating && (
          <div className="absolute top-2 right-2 flex items-center gap-1 px-2 py-1 rounded-full bg-card/90 backdrop-blur-sm">
            <Star className="w-3 h-3 text-sunset fill-sunset" />
            <span className="text-xs font-semibold">{rating.toFixed(1)}</span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4 space-y-2">
        <div className="flex items-start justify-between gap-2">
          <div>
            <h4 className="font-display font-bold text-foreground">{name}</h4>
            <p className="text-sm text-muted-foreground">{country}</p>
          </div>
          <div className="flex items-center text-forest">
            {[...Array(priceLevel)].map((_, i) => (
              <DollarSign key={i} className="w-3 h-3" />
            ))}
            {[...Array(4 - priceLevel)].map((_, i) => (
              <DollarSign key={i} className="w-3 h-3 opacity-20" />
            ))}
          </div>
        </div>

        {description && (
          <p className="text-sm text-muted-foreground line-clamp-2">{description}</p>
        )}

        <Button 
          variant={isSelected ? "ocean" : "secondary"} 
          size="sm" 
          className="w-full mt-2"
          onClick={handleClick}
        >
          {isSelected ? "Added to Trip" : "Add to Trip"}
        </Button>
      </div>
    </div>
  );
}
