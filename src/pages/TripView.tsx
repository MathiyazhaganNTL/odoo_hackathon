import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { Button } from "@/components/ui/button";
import { 
  ArrowLeft, 
  Share2, 
  Edit, 
  Calendar,
  MapPin,
  DollarSign,
  Clock,
  ChevronDown,
  ChevronUp,
  Copy,
  ExternalLink,
  Plane,
  Hotel,
  Utensils,
  Ticket
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

// Mock data
const mockTrip = {
  id: "1",
  name: "European Adventure",
  description: "A three-week journey through the best of Europe, exploring historic cities, enjoying local cuisine, and experiencing diverse cultures.",
  startDate: "2024-06-15",
  endDate: "2024-07-06",
  isPublic: true,
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
  budget: {
    total: 4500,
    spent: 3200,
    transport: 450,
    accommodation: 1200,
    activities: 380,
    food: 520,
    other: 650,
  }
};

const activityIcons: Record<string, typeof Plane> = {
  transport: Plane,
  accommodation: Hotel,
  food: Utensils,
  activity: Ticket,
};

export default function TripView() {
  const { id } = useParams();
  const { toast } = useToast();
  const [expandedStops, setExpandedStops] = useState<string[]>(["s1"]);
  const [viewMode, setViewMode] = useState<"list" | "calendar">("list");

  const toggleStop = (stopId: string) => {
    setExpandedStops(prev => 
      prev.includes(stopId) 
        ? prev.filter(s => s !== stopId)
        : [...prev, stopId]
    );
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast({
      title: "Link copied!",
      description: "Share this link with friends to show them your trip.",
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
      <Header isAuthenticated userName="John" onLogout={() => {}} />

      <main className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6 mb-8">
          <div className="flex items-start gap-4">
            <Link to="/trips">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="w-5 h-5" />
              </Button>
            </Link>
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h1 className="font-display text-2xl md:text-3xl font-bold text-foreground">
                  {mockTrip.name}
                </h1>
                {mockTrip.isPublic && (
                  <span className="px-2 py-0.5 rounded-full bg-forest/20 text-forest text-xs font-medium">
                    Public
                  </span>
                )}
              </div>
              <p className="text-muted-foreground max-w-2xl">{mockTrip.description}</p>
              
              {/* Quick Stats */}
              <div className="flex flex-wrap items-center gap-4 mt-4">
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="w-4 h-4 text-ocean" />
                  <span className="text-foreground font-medium">
                    {formatDate(mockTrip.startDate)} - {formatDate(mockTrip.endDate)}
                  </span>
                  <span className="text-muted-foreground">({getDuration()} days)</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="w-4 h-4 text-coral" />
                  <span className="text-foreground font-medium">
                    {mockTrip.stops.length} destinations
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <DollarSign className="w-4 h-4 text-forest" />
                  <span className="text-foreground font-medium">
                    ${mockTrip.budget.total.toLocaleString()} budget
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" className="gap-2" onClick={handleShare}>
              <Share2 className="w-4 h-4" />
              Share
            </Button>
            <Link to={`/trips/${id}/edit`}>
              <Button variant="ocean" className="gap-2">
                <Edit className="w-4 h-4" />
                Edit Trip
              </Button>
            </Link>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content - Itinerary */}
          <div className="lg:col-span-2 space-y-6">
            {/* View Toggle */}
            <div className="flex items-center justify-between">
              <h2 className="font-display text-xl font-bold text-foreground">
                Itinerary
              </h2>
              <div className="flex p-1 bg-secondary rounded-lg">
                <button
                  className={cn(
                    "px-4 py-1.5 rounded text-sm font-medium transition-all",
                    viewMode === "list" ? "bg-card shadow-sm" : "text-muted-foreground"
                  )}
                  onClick={() => setViewMode("list")}
                >
                  List
                </button>
                <button
                  className={cn(
                    "px-4 py-1.5 rounded text-sm font-medium transition-all",
                    viewMode === "calendar" ? "bg-card shadow-sm" : "text-muted-foreground"
                  )}
                  onClick={() => setViewMode("calendar")}
                >
                  Calendar
                </button>
              </div>
            </div>

            {/* Stops */}
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
                                    className="flex items-start gap-3 p-3 rounded-lg bg-secondary/30 hover:bg-secondary/50 transition-colors"
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
                          <p className="text-muted-foreground">No activities planned yet</p>
                          <Link to={`/trips/${id}/edit`}>
                            <Button variant="secondary" size="sm" className="mt-2">
                              Add Activities
                            </Button>
                          </Link>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Sidebar - Budget */}
          <div className="space-y-6">
            {/* Budget Card */}
            <div className="card-elevated p-6">
              <h3 className="font-display text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                <DollarSign className="w-5 h-5 text-forest" />
                Budget Overview
              </h3>

              {/* Progress */}
              <div className="mb-6">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-muted-foreground">Spent</span>
                  <span className="font-semibold text-foreground">
                    ${mockTrip.budget.spent.toLocaleString()} / ${mockTrip.budget.total.toLocaleString()}
                  </span>
                </div>
                <div className="h-3 rounded-full bg-secondary overflow-hidden">
                  <div 
                    className="h-full bg-gradient-ocean rounded-full transition-all"
                    style={{ width: `${(mockTrip.budget.spent / mockTrip.budget.total) * 100}%` }}
                  />
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  ${(mockTrip.budget.total - mockTrip.budget.spent).toLocaleString()} remaining
                </p>
              </div>

              {/* Breakdown */}
              <div className="space-y-3">
                {[
                  { label: "Transport", value: mockTrip.budget.transport, color: "bg-sky" },
                  { label: "Accommodation", value: mockTrip.budget.accommodation, color: "bg-ocean" },
                  { label: "Activities", value: mockTrip.budget.activities, color: "bg-coral" },
                  { label: "Food & Dining", value: mockTrip.budget.food, color: "bg-sunset" },
                  { label: "Other", value: mockTrip.budget.other, color: "bg-forest" },
                ].map((item) => (
                  <div key={item.label} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className={cn("w-3 h-3 rounded-full", item.color)} />
                      <span className="text-sm text-foreground">{item.label}</span>
                    </div>
                    <span className="text-sm font-semibold text-foreground">
                      ${item.value.toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Share Card */}
            <div className="card-elevated p-6">
              <h3 className="font-display text-lg font-bold text-foreground mb-2">
                Share This Trip
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                Let others view or copy your itinerary
              </p>
              <div className="space-y-2">
                <Button variant="secondary" className="w-full gap-2" onClick={handleShare}>
                  <Copy className="w-4 h-4" />
                  Copy Link
                </Button>
                <Button variant="ghost" className="w-full gap-2">
                  <ExternalLink className="w-4 h-4" />
                  Open Public View
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
