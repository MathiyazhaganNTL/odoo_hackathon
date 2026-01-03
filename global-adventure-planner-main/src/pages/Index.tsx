import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/layout/Header";
import { 
  Compass, 
  Map, 
  Calendar, 
  DollarSign, 
  Users, 
  ArrowRight,
  Plane,
  Mountain,
  Palmtree,
  Building2
} from "lucide-react";

const features = [
  {
    icon: Map,
    title: "Multi-City Itineraries",
    description: "Plan complex trips with multiple destinations, seamlessly organized in one place."
  },
  {
    icon: Calendar,
    title: "Visual Timeline",
    description: "See your entire journey on an interactive calendar with day-by-day breakdowns."
  },
  {
    icon: DollarSign,
    title: "Budget Tracking",
    description: "Track estimated costs for transport, accommodation, activities, and meals."
  },
  {
    icon: Users,
    title: "Share & Collaborate",
    description: "Share your itineraries publicly or invite friends to plan together."
  }
];

const popularDestinations = [
  { name: "Paris", country: "France", icon: Building2, color: "bg-ocean" },
  { name: "Tokyo", country: "Japan", icon: Mountain, color: "bg-coral" },
  { name: "Bali", country: "Indonesia", icon: Palmtree, color: "bg-forest" },
  { name: "New York", country: "USA", icon: Building2, color: "bg-sunset" },
];

export default function Index() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-hero" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMxLjY1NyAwIDMgMS4zNDMgMyAzcy0xLjM0MyAzLTMgMy0zLTEuMzQzLTMtMyAxLjM0My0zIDMtM3oiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4wNSkiLz48L2c+PC9zdmc+')] opacity-50" />
        
        <div className="relative container mx-auto px-4 py-24 lg:py-32">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm text-white text-sm font-medium mb-6 animate-fade-in">
              <Plane className="w-4 h-4" />
              Your adventure starts here
            </div>
            
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 animate-slide-up">
              Plan Your Perfect
              <span className="block text-coral-light">World Adventure</span>
            </h1>
            
            <p className="text-lg md:text-xl text-white/80 mb-8 animate-slide-up" style={{ animationDelay: "0.1s" }}>
              Create stunning multi-city itineraries, discover amazing activities, 
              track your budget, and share your travel plans with the world.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-slide-up" style={{ animationDelay: "0.2s" }}>
              <Link to="/auth?signup=true">
                <Button variant="hero" size="xl" className="gap-2">
                  Start Planning Free
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
              <Link to="/explore">
                <Button variant="glass" size="xl" className="text-white border-white/30 hover:bg-white/10">
                  Explore Destinations
                </Button>
              </Link>
            </div>
          </div>

          {/* Floating Icons */}
          <div className="hidden lg:block absolute top-20 left-20 animate-float">
            <div className="w-16 h-16 rounded-2xl bg-coral/20 backdrop-blur-sm flex items-center justify-center">
              <Palmtree className="w-8 h-8 text-coral-light" />
            </div>
          </div>
          <div className="hidden lg:block absolute bottom-32 right-24 animate-float" style={{ animationDelay: "2s" }}>
            <div className="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-sm flex items-center justify-center">
              <Mountain className="w-8 h-8 text-white" />
            </div>
          </div>
        </div>

        {/* Wave Bottom */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="hsl(var(--background))"/>
          </svg>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 lg:py-28">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              Everything You Need to
              <span className="text-ocean"> Plan & Travel</span>
            </h2>
            <p className="text-lg text-muted-foreground">
              Powerful tools to create, organize, and share your dream trips with ease.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div 
                key={feature.title}
                className="card-elevated p-6 text-center group animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-14 h-14 rounded-2xl bg-gradient-ocean mx-auto mb-4 flex items-center justify-center shadow-glow group-hover:scale-110 transition-transform">
                  <feature.icon className="w-7 h-7 text-primary-foreground" />
                </div>
                <h3 className="font-display text-lg font-bold text-foreground mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Destinations */}
      <section className="py-20 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="font-display text-3xl font-bold text-foreground mb-2">
                Popular Destinations
              </h2>
              <p className="text-muted-foreground">
                Get inspired by trending travel spots
              </p>
            </div>
            <Link to="/explore">
              <Button variant="ghost" className="gap-2">
                View All
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {popularDestinations.map((dest, index) => (
              <div 
                key={dest.name}
                className="card-trip cursor-pointer animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className={`h-40 ${dest.color} relative overflow-hidden`}>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <dest.icon className="w-16 h-16 text-white/30" />
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-display text-xl font-bold text-foreground">
                    {dest.name}
                  </h3>
                  <p className="text-sm text-muted-foreground">{dest.country}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 lg:py-28">
        <div className="container mx-auto px-4">
          <div className="relative rounded-3xl bg-gradient-adventure overflow-hidden p-8 md:p-12 lg:p-16">
            <div className="relative z-10 max-w-2xl">
              <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-4">
                Ready to Start Your Journey?
              </h2>
              <p className="text-lg text-white/80 mb-8">
                Join thousands of travelers who plan their adventures with GlobalTrotters. 
                It's free to get started!
              </p>
              <Link to="/auth?signup=true">
                <Button variant="hero" size="xl" className="gap-2">
                  Create Your First Trip
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
            </div>

            {/* Decorative */}
            <div className="absolute top-8 right-8 w-32 h-32 rounded-full bg-white/10 blur-2xl" />
            <div className="absolute bottom-8 right-24 w-48 h-48 rounded-full bg-coral/20 blur-3xl" />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 border-t border-border">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-ocean flex items-center justify-center">
                <Compass className="w-4 h-4 text-primary-foreground" />
              </div>
              <span className="font-display font-bold text-foreground">GlobalTrotters</span>
            </div>
            <p className="text-sm text-muted-foreground">
              © 2024 GlobalTrotters. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
