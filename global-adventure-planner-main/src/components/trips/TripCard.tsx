import { Link } from "react-router-dom";
import { Calendar, MapPin, DollarSign, MoreVertical, Eye, Pencil, Trash2, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

interface TripCardProps {
  id: string;
  name: string;
  description?: string;
  coverImage?: string;
  startDate: string;
  endDate: string;
  destinations: string[];
  estimatedBudget?: number;
  status?: "upcoming" | "ongoing" | "completed";
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
  onShare?: (id: string) => void;
}

const statusColors = {
  upcoming: "bg-sky/20 text-sky border-sky/30",
  ongoing: "bg-coral/20 text-coral-dark border-coral/30",
  completed: "bg-forest/20 text-forest border-forest/30",
};

const statusLabels = {
  upcoming: "Upcoming",
  ongoing: "In Progress",
  completed: "Completed",
};

export function TripCard({
  id,
  name,
  description,
  coverImage,
  startDate,
  endDate,
  destinations,
  estimatedBudget,
  status = "upcoming",
  onEdit,
  onDelete,
  onShare,
}: TripCardProps) {
  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
  };

  const getDurationDays = () => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diff = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
    return diff + 1;
  };

  return (
    <div className="card-trip group">
      {/* Cover Image */}
      <div className="relative h-48 overflow-hidden">
        {coverImage ? (
          <img
            src={coverImage}
            alt={name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full bg-gradient-adventure" />
        )}
        
        {/* Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-transparent to-transparent" />
        
        {/* Status Badge */}
        <div className="absolute top-3 left-3">
          <span className={cn(
            "px-3 py-1 rounded-full text-xs font-semibold border backdrop-blur-sm",
            statusColors[status]
          )}>
            {statusLabels[status]}
          </span>
        </div>

        {/* Actions Menu */}
        <div className="absolute top-3 right-3">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="glass" size="icon-sm" className="opacity-0 group-hover:opacity-100 transition-opacity">
                <MoreVertical className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-40">
              <DropdownMenuItem asChild>
                <Link to={`/trips/${id}`} className="flex items-center gap-2">
                  <Eye className="w-4 h-4" />
                  View
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onEdit?.(id)} className="flex items-center gap-2">
                <Pencil className="w-4 h-4" />
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onShare?.(id)} className="flex items-center gap-2">
                <Share2 className="w-4 h-4" />
                Share
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem 
                onClick={() => onDelete?.(id)} 
                className="flex items-center gap-2 text-destructive focus:text-destructive"
              >
                <Trash2 className="w-4 h-4" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Trip Name on Image */}
        <div className="absolute bottom-3 left-3 right-3">
          <h3 className="font-display text-xl font-bold text-white line-clamp-1 drop-shadow-lg">
            {name}
          </h3>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-4 space-y-3">
        {description && (
          <p className="text-sm text-muted-foreground line-clamp-2">{description}</p>
        )}

        {/* Destinations */}
        <div className="flex items-center gap-2 text-sm">
          <MapPin className="w-4 h-4 text-coral shrink-0" />
          <span className="text-foreground font-medium truncate">
            {destinations.length > 2 
              ? `${destinations.slice(0, 2).join(", ")} +${destinations.length - 2} more`
              : destinations.join(", ") || "No destinations yet"
            }
          </span>
        </div>

        {/* Date & Duration */}
        <div className="flex items-center gap-2 text-sm">
          <Calendar className="w-4 h-4 text-ocean shrink-0" />
          <span className="text-muted-foreground">
            {formatDate(startDate)} - {formatDate(endDate)}
            <span className="text-foreground font-medium ml-1">
              ({getDurationDays()} days)
            </span>
          </span>
        </div>

        {/* Budget */}
        {estimatedBudget !== undefined && (
          <div className="flex items-center gap-2 text-sm">
            <DollarSign className="w-4 h-4 text-forest shrink-0" />
            <span className="text-foreground font-semibold">
              ${estimatedBudget.toLocaleString()}
            </span>
            <span className="text-muted-foreground">estimated</span>
          </div>
        )}

        {/* View Button */}
        <Link to={`/trips/${id}`} className="block pt-2">
          <Button variant="secondary" className="w-full">
            View Itinerary
          </Button>
        </Link>
      </div>
    </div>
  );
}
