import { Link } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { TripCard } from "@/components/trips/TripCard";
import { Button } from "@/components/ui/button";
import {
  Plus,
  Compass,
  TrendingUp,
  Calendar,
  DollarSign,
  MapPin,
  ArrowRight
} from "lucide-react";
import { auth } from "@/lib/firebase";
import { signOut } from "firebase/auth";
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

// Mock data - In production, this would come from Supabase
const mockTrips = [
  {
    id: "1",
    name: "European Adventure",
    description: "A three-week journey through the best of Europe",
    startDate: "2024-06-15",
    endDate: "2024-07-06",
    destinations: ["Paris", "Rome", "Barcelona"],
    estimatedBudget: 4500,
    status: "upcoming" as const,
  },
  {
    id: "2",
    name: "Japan Cherry Blossoms",
    description: "Exploring ancient temples and modern cities",
    startDate: "2024-04-01",
    endDate: "2024-04-14",
    destinations: ["Tokyo", "Kyoto", "Osaka"],
    estimatedBudget: 3200,
    status: "ongoing" as const,
  },
  {
    id: "3",
    name: "Bali Retreat",
    description: "Wellness and adventure in paradise",
    startDate: "2024-02-10",
    endDate: "2024-02-20",
    destinations: ["Ubud", "Seminyak"],
    estimatedBudget: 2100,
    status: "completed" as const,
  },
];

const quickStats = [
  { label: "Total Trips", value: "12", icon: Compass, color: "bg-ocean" },
  { label: "Countries Visited", value: "8", icon: MapPin, color: "bg-coral" },
  { label: "Upcoming", value: "3", icon: Calendar, color: "bg-forest" },
  { label: "Total Spent", value: "$12.5k", icon: DollarSign, color: "bg-sunset" },
];

const recommendedDestinations = [
  { name: "Santorini", country: "Greece", image: "🇬🇷" },
  { name: "Maldives", country: "Indian Ocean", image: "🇲🇻" },
  { name: "Iceland", country: "Nordic", image: "🇮🇸" },
  { name: "Morocco", country: "Africa", image: "🇲🇦" },
];

export default function Dashboard() {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [userName, setUserName] = useState("Traveler");

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user?.displayName) {
        setUserName(user.displayName);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      toast({
        title: "Logged out",
        description: "You have been successfully logged out.",
      });
      navigate("/");
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to log out.",
      });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header
        isAuthenticated={!!auth.currentUser}
        userName={userName}
        onLogout={handleLogout}
      />

      <main className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-10">
          <div>
            <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-2">
              Welcome back, <span className="text-ocean">{userName}</span>! 👋
            </h1>
            <p className="text-muted-foreground text-lg">
              Ready to plan your next adventure?
            </p>
          </div>
          <Link to="/trips/new">
            <Button variant="coral" size="lg" className="gap-2 shadow-coral">
              <Plus className="w-5 h-5" />
              Plan New Trip
            </Button>
          </Link>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {quickStats.map((stat, index) => (
            <div
              key={stat.label}
              className="card-elevated p-5 flex items-center gap-4 animate-slide-up"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <div className={`w-12 h-12 rounded-xl ${stat.color} flex items-center justify-center`}>
                <stat.icon className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Recent Trips */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="font-display text-2xl font-bold text-foreground">
                Your Trips
              </h2>
              <Link to="/trips">
                <Button variant="ghost" className="gap-2">
                  View All
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>

            <div className="grid sm:grid-cols-2 gap-6">
              {mockTrips.slice(0, 4).map((trip, index) => (
                <div
                  key={trip.id}
                  className="animate-slide-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <TripCard {...trip} />
                </div>
              ))}
            </div>

            {mockTrips.length === 0 && (
              <div className="card-elevated p-12 text-center">
                <div className="w-16 h-16 rounded-2xl bg-secondary mx-auto mb-4 flex items-center justify-center">
                  <Compass className="w-8 h-8 text-muted-foreground" />
                </div>
                <h3 className="font-display text-xl font-bold text-foreground mb-2">
                  No trips yet
                </h3>
                <p className="text-muted-foreground mb-4">
                  Start planning your first adventure!
                </p>
                <Link to="/trips/new">
                  <Button variant="ocean" className="gap-2">
                    <Plus className="w-4 h-4" />
                    Create Your First Trip
                  </Button>
                </Link>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Recommended Destinations */}
            <div className="card-elevated p-6">
              <div className="flex items-center gap-2 mb-4">
                <TrendingUp className="w-5 h-5 text-coral" />
                <h3 className="font-display font-bold text-foreground">
                  Trending Destinations
                </h3>
              </div>
              <div className="space-y-3">
                {recommendedDestinations.map((dest) => (
                  <div
                    key={dest.name}
                    className="flex items-center gap-3 p-3 rounded-xl bg-secondary/50 hover:bg-secondary transition-colors cursor-pointer"
                  >
                    <span className="text-2xl">{dest.image}</span>
                    <div>
                      <p className="font-semibold text-foreground">{dest.name}</p>
                      <p className="text-sm text-muted-foreground">{dest.country}</p>
                    </div>
                  </div>
                ))}
              </div>
              <Link to="/explore" className="block mt-4">
                <Button variant="secondary" className="w-full">
                  Explore All Destinations
                </Button>
              </Link>
            </div>

            {/* Budget Overview */}
            <div className="card-elevated p-6">
              <div className="flex items-center gap-2 mb-4">
                <DollarSign className="w-5 h-5 text-forest" />
                <h3 className="font-display font-bold text-foreground">
                  Budget Overview
                </h3>
              </div>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-muted-foreground">This Month</span>
                    <span className="font-semibold text-foreground">$1,240 / $2,000</span>
                  </div>
                  <div className="h-2 rounded-full bg-secondary overflow-hidden">
                    <div className="h-full w-[62%] bg-gradient-ocean rounded-full" />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-muted-foreground">European Adventure</span>
                    <span className="font-semibold text-foreground">$3,200 / $4,500</span>
                  </div>
                  <div className="h-2 rounded-full bg-secondary overflow-hidden">
                    <div className="h-full w-[71%] bg-gradient-sunset rounded-full" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
