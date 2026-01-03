import { Clock, DollarSign, Plus, Check, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface ActivityCardProps {
  id: string;
  name: string;
  description?: string;
  image?: string;
  category: string;
  duration?: string;
  price?: number;
  location?: string;
  isSelected?: boolean;
  onAdd?: (id: string) => void;
  onRemove?: (id: string) => void;
}

const categoryColors: Record<string, string> = {
  "sightseeing": "bg-sky/20 text-sky border-sky/30",
  "food": "bg-coral/20 text-coral-dark border-coral/30",
  "adventure": "bg-sunset/20 text-sunset border-sunset/30",
  "culture": "bg-ocean/20 text-ocean border-ocean/30",
  "shopping": "bg-forest/20 text-forest border-forest/30",
  "relaxation": "bg-sand-dark/40 text-foreground border-sand-dark/60",
  "nightlife": "bg-primary/20 text-primary border-primary/30",
};

export function ActivityCard({
  id,
  name,
  description,
  image,
  category,
  duration,
  price,
  location,
  isSelected = false,
  onAdd,
  onRemove,
}: ActivityCardProps) {
  const handleClick = () => {
    if (isSelected) {
      onRemove?.(id);
    } else {
      onAdd?.(id);
    }
  };

  const categoryColor = categoryColors[category.toLowerCase()] || categoryColors["culture"];

  return (
    <div className={cn(
      "flex gap-4 p-4 rounded-xl border bg-card transition-all",
      isSelected 
        ? "border-ocean bg-ocean/5" 
        : "border-border hover:border-ocean/30 hover:shadow-md"
    )}>
      {/* Image */}
      <div className="w-20 h-20 rounded-lg overflow-hidden shrink-0">
        {image ? (
          <img src={image} alt={name} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full bg-gradient-sunset flex items-center justify-center">
            <MapPin className="w-6 h-6 text-accent-foreground" />
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0 space-y-2">
        <div className="flex items-start justify-between gap-2">
          <div>
            <h4 className="font-semibold text-foreground line-clamp-1">{name}</h4>
            {location && (
              <p className="text-xs text-muted-foreground flex items-center gap-1">
                <MapPin className="w-3 h-3" />
                {location}
              </p>
            )}
          </div>
          <Badge variant="outline" className={cn("shrink-0 capitalize", categoryColor)}>
            {category}
          </Badge>
        </div>

        {description && (
          <p className="text-sm text-muted-foreground line-clamp-2">{description}</p>
        )}

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 text-sm">
            {duration && (
              <span className="flex items-center gap-1 text-muted-foreground">
                <Clock className="w-3.5 h-3.5" />
                {duration}
              </span>
            )}
            {price !== undefined && (
              <span className="flex items-center gap-1 font-semibold text-forest">
                <DollarSign className="w-3.5 h-3.5" />
                {price}
              </span>
            )}
          </div>

          <Button
            variant={isSelected ? "ocean" : "secondary"}
            size="sm"
            onClick={handleClick}
            className="gap-1"
          >
            {isSelected ? (
              <>
                <Check className="w-4 h-4" />
                Added
              </>
            ) : (
              <>
                <Plus className="w-4 h-4" />
                Add
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
