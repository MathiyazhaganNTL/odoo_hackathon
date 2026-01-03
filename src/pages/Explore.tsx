import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { DestinationCard } from "@/components/trips/DestinationCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, Filter, Globe, TrendingUp } from "lucide-react";

const mockDestinations = [
  { id: "paris", name: "Paris", country: "France", rating: 4.8, priceLevel: 3 as const, description: "The City of Light, known for the Eiffel Tower, art, and cuisine." },
  { id: "tokyo", name: "Tokyo", country: "Japan", rating: 4.9, priceLevel: 4 as const, description: "A vibrant metropolis blending ultramodern and traditional temples." },
  { id: "rome", name: "Rome", country: "Italy", rating: 4.7, priceLevel: 2 as const, description: "Ancient ruins, art, and the best pasta you'll ever have." },
  { id: "barcelona", name: "Barcelona", country: "Spain", rating: 4.6, priceLevel: 2 as const, description: "Stunning architecture, beaches, and vibrant nightlife." },
  { id: "bali", name: "Bali", country: "Indonesia", rating: 4.7, priceLevel: 1 as const, description: "Tropical paradise with temples, rice terraces, and beaches." },
  { id: "amsterdam", name: "Amsterdam", country: "Netherlands", rating: 4.5, priceLevel: 3 as const, description: "Canals, museums, and a unique cycling culture." },
  { id: "nyc", name: "New York", country: "USA", rating: 4.6, priceLevel: 4 as const, description: "The city that never sleeps - culture, food, and iconic landmarks." },
  { id: "london", name: "London", country: "UK", rating: 4.5, priceLevel: 4 as const, description: "Historic landmarks, world-class museums, and British charm." },
  { id: "sydney", name: "Sydney", country: "Australia", rating: 4.6, priceLevel: 3 as const, description: "Iconic Opera House, beautiful beaches, and outdoor lifestyle." },
  { id: "dubai", name: "Dubai", country: "UAE", rating: 4.4, priceLevel: 4 as const, description: "Futuristic architecture, luxury shopping, and desert adventures." },
  { id: "santorini", name: "Santorini", country: "Greece", rating: 4.8, priceLevel: 3 as const, description: "Whitewashed buildings, stunning sunsets, and azure waters." },
  { id: "iceland", name: "Reykjavik", country: "Iceland", rating: 4.7, priceLevel: 4 as const, description: "Northern lights, geysers, and dramatic landscapes." },
];

const regions = ["All Regions", "Europe", "Asia", "Americas", "Oceania", "Middle East"];
const priceRanges = ["Any Price", "Budget ($)", "Moderate ($$)", "Expensive ($$$)", "Luxury ($$$$)"];

export default function Explore() {
  const [searchQuery, setSearchQuery] = useState("");
  const [regionFilter, setRegionFilter] = useState("All Regions");
  const [priceFilter, setPriceFilter] = useState("Any Price");
  const [savedDestinations, setSavedDestinations] = useState<string[]>([]);

  const filteredDestinations = mockDestinations.filter((dest) => {
    const matchesSearch = 
      dest.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dest.country.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  const toggleSave = (id: string) => {
    setSavedDestinations(prev => 
      prev.includes(id) ? prev.filter(d => d !== id) : [...prev, id]
    );
  };

  const trendingDestinations = mockDestinations.slice(0, 4);

  return (
    <div className="min-h-screen bg-background">
      <Header isAuthenticated userName="John" onLogout={() => {}} />

      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="relative rounded-3xl bg-gradient-adventure overflow-hidden p-8 md:p-12 mb-10">
          <div className="relative z-10 max-w-2xl">
            <h1 className="font-display text-3xl md:text-4xl font-bold text-white mb-4">
              Explore Destinations
            </h1>
            <p className="text-lg text-white/80 mb-6">
              Discover amazing places around the world and start planning your next adventure.
            </p>
            
            {/* Search Bar */}
            <div className="flex gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  placeholder="Search cities or countries..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 h-12 bg-card/95 border-0"
                />
              </div>
              <Button variant="coral" size="lg" className="gap-2">
                <Search className="w-5 h-5" />
                Search
              </Button>
            </div>
          </div>

          {/* Decorative Elements */}
          <div className="absolute top-8 right-8 w-32 h-32 rounded-full bg-white/10 blur-2xl" />
          <div className="absolute bottom-0 right-24 w-48 h-48 rounded-full bg-coral/20 blur-3xl" />
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-4 mb-8">
          <Select value={regionFilter} onValueChange={setRegionFilter}>
            <SelectTrigger className="w-[180px]">
              <Globe className="w-4 h-4 mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {regions.map((region) => (
                <SelectItem key={region} value={region}>{region}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={priceFilter} onValueChange={setPriceFilter}>
            <SelectTrigger className="w-[180px]">
              <Filter className="w-4 h-4 mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {priceRanges.map((price) => (
                <SelectItem key={price} value={price}>{price}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          <div className="flex-1" />

          <span className="text-muted-foreground self-center">
            {filteredDestinations.length} destinations found
          </span>
        </div>

        {/* Trending Section */}
        {!searchQuery && (
          <section className="mb-12">
            <div className="flex items-center gap-2 mb-6">
              <TrendingUp className="w-5 h-5 text-coral" />
              <h2 className="font-display text-2xl font-bold text-foreground">
                Trending Now
              </h2>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {trendingDestinations.map((dest, index) => (
                <div
                  key={dest.id}
                  className="animate-slide-up"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <DestinationCard
                    {...dest}
                    isSelected={savedDestinations.includes(dest.id)}
                    onAdd={toggleSave}
                    onRemove={toggleSave}
                  />
                </div>
              ))}
            </div>
          </section>
        )}

        {/* All Destinations */}
        <section>
          <h2 className="font-display text-2xl font-bold text-foreground mb-6">
            {searchQuery ? "Search Results" : "All Destinations"}
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredDestinations.map((dest, index) => (
              <div
                key={dest.id}
                className="animate-slide-up"
                style={{ animationDelay: `${index * 0.03}s` }}
              >
                <DestinationCard
                  {...dest}
                  isSelected={savedDestinations.includes(dest.id)}
                  onAdd={toggleSave}
                  onRemove={toggleSave}
                />
              </div>
            ))}
          </div>

          {filteredDestinations.length === 0 && (
            <div className="text-center py-12">
              <Globe className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="font-display text-lg font-bold text-foreground mb-2">
                No destinations found
              </h3>
              <p className="text-muted-foreground">
                Try adjusting your search or filters
              </p>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
