import { useState } from "react";
import { Link } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { TripCard } from "@/components/trips/TripCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  Plus, 
  Search,
  Filter,
  Grid3X3,
  List,
  Compass
} from "lucide-react";
import { cn } from "@/lib/utils";

// Mock data
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
  {
    id: "4",
    name: "Iceland Northern Lights",
    description: "Chase the aurora borealis across Iceland",
    startDate: "2024-12-01",
    endDate: "2024-12-10",
    destinations: ["Reykjavik", "Akureyri"],
    estimatedBudget: 3800,
    status: "upcoming" as const,
  },
  {
    id: "5",
    name: "Thailand Beach Hopping",
    description: "Island paradise adventure",
    startDate: "2024-01-15",
    endDate: "2024-01-28",
    destinations: ["Phuket", "Krabi", "Koh Samui"],
    estimatedBudget: 2500,
    status: "completed" as const,
  },
];

export default function MyTrips() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const filteredTrips = mockTrips.filter((trip) => {
    const matchesSearch = trip.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      trip.destinations.some(d => d.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesStatus = statusFilter === "all" || trip.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-background">
      <Header isAuthenticated userName="John" onLogout={() => {}} />

      <main className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-8">
          <div>
            <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-2">
              My Trips
            </h1>
            <p className="text-muted-foreground">
              Manage and view all your travel plans
            </p>
          </div>
          <Link to="/trips/new">
            <Button variant="coral" size="lg" className="gap-2">
              <Plus className="w-5 h-5" />
              New Trip
            </Button>
          </Link>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              placeholder="Search trips or destinations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <Filter className="w-4 h-4 mr-2" />
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Trips</SelectItem>
              <SelectItem value="upcoming">Upcoming</SelectItem>
              <SelectItem value="ongoing">In Progress</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
            </SelectContent>
          </Select>
          <div className="flex items-center gap-1 p-1 bg-secondary rounded-lg">
            <Button
              variant={viewMode === "grid" ? "secondary" : "ghost"}
              size="icon-sm"
              onClick={() => setViewMode("grid")}
              className={cn(viewMode === "grid" && "bg-card shadow-sm")}
            >
              <Grid3X3 className="w-4 h-4" />
            </Button>
            <Button
              variant={viewMode === "list" ? "secondary" : "ghost"}
              size="icon-sm"
              onClick={() => setViewMode("list")}
              className={cn(viewMode === "list" && "bg-card shadow-sm")}
            >
              <List className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Results */}
        {filteredTrips.length > 0 ? (
          <div className={cn(
            viewMode === "grid" 
              ? "grid sm:grid-cols-2 lg:grid-cols-3 gap-6" 
              : "space-y-4"
          )}>
            {filteredTrips.map((trip, index) => (
              <div 
                key={trip.id}
                className="animate-slide-up"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <TripCard {...trip} />
              </div>
            ))}
          </div>
        ) : (
          <div className="card-elevated p-12 text-center">
            <div className="w-16 h-16 rounded-2xl bg-secondary mx-auto mb-4 flex items-center justify-center">
              <Compass className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="font-display text-xl font-bold text-foreground mb-2">
              No trips found
            </h3>
            <p className="text-muted-foreground mb-4">
              {searchQuery || statusFilter !== "all" 
                ? "Try adjusting your filters"
                : "Start planning your first adventure!"}
            </p>
            <Link to="/trips/new">
              <Button variant="ocean" className="gap-2">
                <Plus className="w-4 h-4" />
                Create New Trip
              </Button>
            </Link>
          </div>
        )}
      </main>
    </div>
  );
}
