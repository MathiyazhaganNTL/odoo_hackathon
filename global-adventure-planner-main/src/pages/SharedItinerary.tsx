import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  Compass,
  Calendar,
  MapPin,
  DollarSign,
  Clock,
  ChevronDown,
  ChevronUp,
  Copy,
  Share2,
  Plane,
  Hotel,
  Utensils,
  Ticket,
  Heart
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

// Mock data - same as TripView but for public access
const mockTrip = {
  id: "1",
  name: "European Adventure",
  description: "A three-week journey through the best of Europe, exploring historic cities, enjoying local cuisine, and experiencing diverse cultures.",
  startDate: "2024-06-15",
  endDate: "2024-07-06",
  author: "John D.",
  likes: 142,
  stops: [
    {
      id: "s1",
      cityName: "Paris",
      country: "France",
      startDate: "2024-06-15",
      endDate: "2024-06-20",
      days: [
        {
          date: "2024-06-15",
          activities: [
            { name: "Arrive at CDG Airport", time: "10:00 AM", type: "transport", cost: 0 },
            { name: "Check in at Hotel Le Marais", time: "2:00 PM", type: "accommodation", cost: 180 },
            { name: "Evening Seine River Cruise", time: "7:00 PM", type: "activity", cost: 15 },
          ]
        },
        {
          date: "2024-06-16",
          activities: [
            { name: "Eiffel Tower Visit", time: "9:00 AM", type: "activity", cost: 28 },
            { name: "Lunch at Café de Flore", time: "1:00 PM", type: "food", cost: 35 },
            { name: "Louvre Museum Tour", time: "3:00 PM", type: "activity", cost: 17 },
          ]
        },
      ]
    },
    {
      id: "s2",
      cityName: "Rome",
      country: "Italy",
      startDate: "2024-06-21",
      endDate: "2024-06-27",
      days: [
        {
          date: "2024-06-21",
          activities: [
            { name: "Train to Rome", time: "8:00 AM", type: "transport", cost: 95 },
            { name: "Check in at Hotel Roma", time: "2:00 PM", type: "accommodation", cost: 150 },
            { name: "Explore Trastevere", time: "5:00 PM", type: "activity", cost: 0 },
          ]
        },
      ]
    },
    {
      id: "s3",
      cityName: "Barcelona",
      country: "Spain",
      startDate: "2024-06-28",
      endDate: "2024-07-06",
      days: []
    },
  ],
  estimatedCost: 4500,
};

const activityIcons: Record<string, typeof Plane> = {
  transport: Plane,
  accommodation: Hotel,
  food: Utensils,
  activity: Ticket,
};

export default function SharedItinerary() {
  const { id } = useParams();
  const { toast } = useToast();
  const [expandedStops, setExpandedStops] = useState<string[]>(["s1", "s2"]);
  const [isLiked, setIsLiked] = useState(false);

  const toggleStop = (stopId: string) => {
    setExpandedStops(prev => 
      prev.includes(stopId) 
        ? prev.filter(s => s !== stopId)
        : [...prev, stopId]
    );
  };

  const handleCopyTrip = () => {
    toast({
      title: "Trip copied!",
      description: "This itinerary has been added to your trips.",
    });
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast({
      title: "Link copied!",
      description: "Share this link with friends.",
    });
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    });
  };

  const getDuration = () => {
    const start = new Date(mockTrip.startDate);
    const end = new Date(mockTrip.endDate);
    return Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) + 1;
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Public Header */}
      <header className="sticky top-0 z-50 glass border-b border-border/50">
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-ocean flex items-center justify-center shadow-glow group-hover:scale-105 transition-transform">
                <Compass className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="font-display text-xl font-bold text-foreground">
                Global<span className="text-ocean">Trotters</span>
              </span>
            </Link>

            <div className="flex gap-3">
              <Link to="/auth">
                <Button variant="ghost" size="sm">Sign In</Button>
              </Link>
              <Link to="/auth?signup=true">
                <Button variant="ocean" size="sm">Get Started</Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Trip Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-ocean/10 text-ocean text-sm font-medium mb-4">
            <MapPin className="w-4 h-4" />
            Shared Itinerary
          </div>
          
          <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
            {mockTrip.name}
          </h1>
          
          <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
            {mockTrip.description}
          </p>

          {/* Author & Stats */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm">
            <span className="text-muted-foreground">
              Created by <span className="font-semibold text-foreground">{mockTrip.author}</span>
            </span>
            <div className="flex items-center gap-1">
              <Heart className={cn("w-4 h-4", isLiked ? "fill-coral text-coral" : "text-muted-foreground")} />
              <span className="text-foreground font-medium">{mockTrip.likes + (isLiked ? 1 : 0)}</span>
            </div>
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4 text-ocean" />
              <span>{getDuration()} days</span>
            </div>
            <div className="flex items-center gap-1">
              <MapPin className="w-4 h-4 text-coral" />
              <span>{mockTrip.stops.length} destinations</span>
            </div>
            <div className="flex items-center gap-1">
              <DollarSign className="w-4 h-4 text-forest" />
              <span>${mockTrip.estimatedCost.toLocaleString()}</span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-wrap justify-center gap-3 mt-8">
            <Button 
              variant={isLiked ? "coral" : "outline"} 
              className="gap-2"
              onClick={() => setIsLiked(!isLiked)}
            >
              <Heart className={cn("w-4 h-4", isLiked && "fill-current")} />
              {isLiked ? "Liked" : "Like"}
            </Button>
            <Button variant="secondary" className="gap-2" onClick={handleShare}>
              <Share2 className="w-4 h-4" />
              Share
            </Button>
            <Button variant="ocean" className="gap-2" onClick={handleCopyTrip}>
              <Copy className="w-4 h-4" />
              Copy This Trip
            </Button>
          </div>
        </div>

        {/* Timeline */}
        <div className="space-y-4">
          {mockTrip.stops.map((stop, index) => (
            <div key={stop.id} className="card-elevated overflow-hidden">
              {/* Stop Header */}
              <button
                className="w-full flex items-center gap-4 p-4 hover:bg-secondary/50 transition-colors"
                onClick={() => toggleStop(stop.id)}
              >
                <div className="w-10 h-10 rounded-full bg-gradient-ocean flex items-center justify-center text-primary-foreground font-bold">
                  {index + 1}
                </div>
                <div className="flex-1 text-left">
                  <h3 className="font-display text-lg font-bold text-foreground">
                    {stop.cityName}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {stop.country} • {formatDate(stop.startDate)} - {formatDate(stop.endDate)}
                  </p>
                </div>
                {expandedStops.includes(stop.id) ? (
                  <ChevronUp className="w-5 h-5 text-muted-foreground" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-muted-foreground" />
                )}
              </button>

              {/* Days & Activities */}
              {expandedStops.includes(stop.id) && (
                <div className="border-t border-border">
                  {stop.days.length > 0 ? (
                    stop.days.map((day, dayIndex) => (
                      <div key={day.date} className="p-4 border-b border-border last:border-b-0">
                        <div className="flex items-center gap-2 mb-3">
                          <span className="px-2 py-0.5 rounded bg-secondary text-xs font-medium text-foreground">
                            Day {dayIndex + 1}
                          </span>
                          <span className="text-sm text-muted-foreground">
                            {formatDate(day.date)}
                          </span>
                        </div>
                        <div className="space-y-2 pl-4 border-l-2 border-ocean/30">
                          {day.activities.map((activity, actIndex) => {
                            const Icon = activityIcons[activity.type] || Ticket;
                            return (
                              <div 
                                key={actIndex}
                                className="flex items-start gap-3 p-3 rounded-lg bg-secondary/30"
                              >
                                <div className="w-8 h-8 rounded-lg bg-ocean/10 flex items-center justify-center shrink-0">
                                  <Icon className="w-4 h-4 text-ocean" />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <p className="font-medium text-foreground">{activity.name}</p>
                                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
                                    <span className="flex items-center gap-1">
                                      <Clock className="w-3 h-3" />
                                      {activity.time}
                                    </span>
                                    {activity.cost > 0 && (
                                      <span className="flex items-center gap-1 text-forest font-medium">
                                        <DollarSign className="w-3 h-3" />
                                        {activity.cost}
                                      </span>
                                    )}
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="p-8 text-center">
                      <p className="text-muted-foreground">Activities not detailed for this stop</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-12 text-center p-8 rounded-2xl bg-gradient-ocean">
          <h2 className="font-display text-2xl font-bold text-white mb-2">
            Want to create your own trip?
          </h2>
          <p className="text-white/80 mb-6">
            Sign up for free and start planning your adventure today.
          </p>
          <Link to="/auth?signup=true">
            <Button variant="hero" size="lg">
              Get Started Free
            </Button>
          </Link>
        </div>
      </main>
    </div>
  );
}
