import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DestinationCard } from "@/components/trips/DestinationCard";
import { ActivityCard } from "@/components/trips/ActivityCard";
import { 
  ArrowLeft, 
  Plus, 
  Search, 
  MapPin, 
  Calendar,
  GripVertical,
  Trash2,
  ChevronDown,
  ChevronUp,
  Eye
} from "lucide-react";
import { cn } from "@/lib/utils";

// Mock data
const mockCities = [
  { id: "paris", name: "Paris", country: "France", rating: 4.8, priceLevel: 3 as const },
  { id: "rome", name: "Rome", country: "Italy", rating: 4.7, priceLevel: 2 as const },
  { id: "barcelona", name: "Barcelona", country: "Spain", rating: 4.6, priceLevel: 2 as const },
  { id: "amsterdam", name: "Amsterdam", country: "Netherlands", rating: 4.5, priceLevel: 3 as const },
  { id: "berlin", name: "Berlin", country: "Germany", rating: 4.4, priceLevel: 2 as const },
];

const mockActivities = [
  { id: "a1", name: "Eiffel Tower Visit", category: "Sightseeing", duration: "3 hours", price: 28, location: "Paris" },
  { id: "a2", name: "Louvre Museum Tour", category: "Culture", duration: "4 hours", price: 17, location: "Paris" },
  { id: "a3", name: "Seine River Cruise", category: "Sightseeing", duration: "1.5 hours", price: 15, location: "Paris" },
  { id: "a4", name: "Montmartre Food Tour", category: "Food", duration: "3 hours", price: 65, location: "Paris" },
  { id: "a5", name: "Colosseum Tour", category: "Sightseeing", duration: "3 hours", price: 22, location: "Rome" },
  { id: "a6", name: "Vatican Museums", category: "Culture", duration: "4 hours", price: 29, location: "Rome" },
];

interface Stop {
  id: string;
  cityId: string;
  cityName: string;
  country: string;
  startDate: string;
  endDate: string;
  activities: string[];
  isExpanded: boolean;
}

export default function ItineraryBuilder() {
  const { id } = useParams();
  const [citySearch, setcitySearch] = useState("");
  const [activitySearch, setActivitySearch] = useState("");
  const [activeTab, setActiveTab] = useState<"cities" | "activities">("cities");
  const [selectedStop, setSelectedStop] = useState<string | null>(null);

  const [stops, setStops] = useState<Stop[]>([
    {
      id: "s1",
      cityId: "paris",
      cityName: "Paris",
      country: "France",
      startDate: "2024-06-15",
      endDate: "2024-06-20",
      activities: ["a1", "a2"],
      isExpanded: true,
    },
  ]);

  const addCity = (cityId: string) => {
    const city = mockCities.find(c => c.id === cityId);
    if (city && !stops.find(s => s.cityId === cityId)) {
      const newStop: Stop = {
        id: `s${Date.now()}`,
        cityId: city.id,
        cityName: city.name,
        country: city.country,
        startDate: "",
        endDate: "",
        activities: [],
        isExpanded: true,
      };
      setStops([...stops, newStop]);
    }
  };

  const removeStop = (stopId: string) => {
    setStops(stops.filter(s => s.id !== stopId));
  };

  const toggleStopExpand = (stopId: string) => {
    setStops(stops.map(s => 
      s.id === stopId ? { ...s, isExpanded: !s.isExpanded } : s
    ));
  };

  const addActivityToStop = (activityId: string) => {
    if (selectedStop) {
      setStops(stops.map(s => 
        s.id === selectedStop && !s.activities.includes(activityId)
          ? { ...s, activities: [...s.activities, activityId] }
          : s
      ));
    }
  };

  const removeActivityFromStop = (stopId: string, activityId: string) => {
    setStops(stops.map(s => 
      s.id === stopId 
        ? { ...s, activities: s.activities.filter(a => a !== activityId) }
        : s
    ));
  };

  const filteredCities = mockCities.filter(c => 
    c.name.toLowerCase().includes(citySearch.toLowerCase()) ||
    c.country.toLowerCase().includes(citySearch.toLowerCase())
  );

  const filteredActivities = mockActivities.filter(a => 
    a.name.toLowerCase().includes(activitySearch.toLowerCase()) ||
    a.category.toLowerCase().includes(activitySearch.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background">
      <Header isAuthenticated userName="John" onLogout={() => {}} />

      <main className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Link to="/trips">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="w-5 h-5" />
              </Button>
            </Link>
            <div>
              <h1 className="font-display text-2xl md:text-3xl font-bold text-foreground">
                European Adventure
              </h1>
              <p className="text-muted-foreground">Build your perfect itinerary</p>
            </div>
          </div>
          <div className="flex gap-3">
            <Link to={`/trips/${id}`}>
              <Button variant="secondary" className="gap-2">
                <Eye className="w-4 h-4" />
                Preview
              </Button>
            </Link>
            <Button variant="ocean" className="gap-2">
              Save Changes
            </Button>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left: Itinerary */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="font-display text-xl font-bold text-foreground">
                Your Stops
              </h2>
              <span className="text-sm text-muted-foreground">
                {stops.length} destination{stops.length !== 1 ? "s" : ""}
              </span>
            </div>

            {stops.length === 0 ? (
              <div className="card-elevated p-12 text-center">
                <MapPin className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="font-display text-lg font-bold text-foreground mb-2">
                  No destinations yet
                </h3>
                <p className="text-muted-foreground">
                  Search for cities on the right to add your first stop
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {stops.map((stop, index) => (
                  <div 
                    key={stop.id}
                    className={cn(
                      "card-elevated overflow-hidden transition-all",
                      selectedStop === stop.id && "ring-2 ring-ocean"
                    )}
                  >
                    {/* Stop Header */}
                    <div 
                      className="flex items-center gap-3 p-4 cursor-pointer hover:bg-secondary/50"
                      onClick={() => {
                        toggleStopExpand(stop.id);
                        setSelectedStop(stop.id);
                      }}
                    >
                      <GripVertical className="w-5 h-5 text-muted-foreground cursor-grab" />
                      <div className="w-8 h-8 rounded-full bg-gradient-ocean flex items-center justify-center text-primary-foreground font-bold text-sm">
                        {index + 1}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-foreground">{stop.cityName}</h3>
                        <p className="text-sm text-muted-foreground">{stop.country}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-muted-foreground">
                          {stop.activities.length} activities
                        </span>
                        <Button
                          variant="ghost"
                          size="icon-sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            removeStop(stop.id);
                          }}
                        >
                          <Trash2 className="w-4 h-4 text-destructive" />
                        </Button>
                        {stop.isExpanded ? (
                          <ChevronUp className="w-5 h-5 text-muted-foreground" />
                        ) : (
                          <ChevronDown className="w-5 h-5 text-muted-foreground" />
                        )}
                      </div>
                    </div>

                    {/* Stop Content */}
                    {stop.isExpanded && (
                      <div className="p-4 pt-0 space-y-4 border-t border-border">
                        {/* Dates */}
                        <div className="grid sm:grid-cols-2 gap-4">
                          <div className="space-y-1">
                            <label className="text-sm font-medium text-foreground">
                              Arrival
                            </label>
                            <Input
                              type="date"
                              value={stop.startDate}
                              onChange={(e) => {
                                setStops(stops.map(s => 
                                  s.id === stop.id ? { ...s, startDate: e.target.value } : s
                                ));
                              }}
                            />
                          </div>
                          <div className="space-y-1">
                            <label className="text-sm font-medium text-foreground">
                              Departure
                            </label>
                            <Input
                              type="date"
                              value={stop.endDate}
                              onChange={(e) => {
                                setStops(stops.map(s => 
                                  s.id === stop.id ? { ...s, endDate: e.target.value } : s
                                ));
                              }}
                            />
                          </div>
                        </div>

                        {/* Activities */}
                        <div>
                          <h4 className="text-sm font-medium text-foreground mb-2">
                            Activities
                          </h4>
                          {stop.activities.length > 0 ? (
                            <div className="space-y-2">
                              {stop.activities.map(actId => {
                                const activity = mockActivities.find(a => a.id === actId);
                                if (!activity) return null;
                                return (
                                  <div 
                                    key={actId}
                                    className="flex items-center justify-between p-3 rounded-lg bg-secondary/50"
                                  >
                                    <div>
                                      <p className="font-medium text-foreground">{activity.name}</p>
                                      <p className="text-sm text-muted-foreground">
                                        {activity.duration} • ${activity.price}
                                      </p>
                                    </div>
                                    <Button
                                      variant="ghost"
                                      size="icon-sm"
                                      onClick={() => removeActivityFromStop(stop.id, actId)}
                                    >
                                      <Trash2 className="w-4 h-4 text-muted-foreground" />
                                    </Button>
                                  </div>
                                );
                              })}
                            </div>
                          ) : (
                            <p className="text-sm text-muted-foreground py-4 text-center bg-secondary/30 rounded-lg">
                              No activities added. Browse activities on the right panel.
                            </p>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Right: Search Panel */}
          <div className="space-y-4">
            {/* Tabs */}
            <div className="flex p-1 bg-secondary rounded-xl">
              <button
                className={cn(
                  "flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all",
                  activeTab === "cities" 
                    ? "bg-card shadow-sm text-foreground" 
                    : "text-muted-foreground hover:text-foreground"
                )}
                onClick={() => setActiveTab("cities")}
              >
                <MapPin className="w-4 h-4 inline-block mr-2" />
                Cities
              </button>
              <button
                className={cn(
                  "flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all",
                  activeTab === "activities" 
                    ? "bg-card shadow-sm text-foreground" 
                    : "text-muted-foreground hover:text-foreground"
                )}
                onClick={() => setActiveTab("activities")}
              >
                <Calendar className="w-4 h-4 inline-block mr-2" />
                Activities
              </button>
            </div>

            {activeTab === "cities" ? (
              <>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    placeholder="Search cities..."
                    value={citySearch}
                    onChange={(e) => setcitySearch(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <div className="space-y-3 max-h-[500px] overflow-y-auto">
                  {filteredCities.map(city => (
                    <DestinationCard
                      key={city.id}
                      {...city}
                      compact
                      isSelected={stops.some(s => s.cityId === city.id)}
                      onAdd={addCity}
                    />
                  ))}
                </div>
              </>
            ) : (
              <>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    placeholder="Search activities..."
                    value={activitySearch}
                    onChange={(e) => setActivitySearch(e.target.value)}
                    className="pl-10"
                  />
                </div>
                {selectedStop ? (
                  <div className="space-y-3 max-h-[500px] overflow-y-auto">
                    {filteredActivities.map(activity => {
                      const stop = stops.find(s => s.id === selectedStop);
                      const isSelected = stop?.activities.includes(activity.id) || false;
                      return (
                        <ActivityCard
                          key={activity.id}
                          {...activity}
                          isSelected={isSelected}
                          onAdd={addActivityToStop}
                          onRemove={(id) => removeActivityFromStop(selectedStop, id)}
                        />
                      );
                    })}
                  </div>
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    <p>Select a stop to add activities</p>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
