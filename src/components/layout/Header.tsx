import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Compass,
  Map,
  User,
  Menu,
  X,
  Plus,
  LogOut
} from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface HeaderProps {
  isAuthenticated?: boolean;
  userName?: string;
  onLogout?: () => void;
}

export function Header({ isAuthenticated = false, userName, onLogout }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { href: "/dashboard", label: "Dashboard", icon: Compass },
    { href: "/trips", label: "My Trips", icon: Map },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 glass border-b border-border/50">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <img
              src="/logo.png"
              alt="GlobalTrotters Logo"
              className="w-10 h-10 object-contain group-hover:scale-105 transition-transform"
            />
            <span className="font-display text-xl font-bold text-foreground">
              Global<span className="text-ocean">Trotters</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          {isAuthenticated && (
            <nav className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link key={link.href} to={link.href}>
                  <Button
                    variant={isActive(link.href) ? "secondary" : "ghost"}
                    size="sm"
                    className={cn(
                      "gap-2",
                      isActive(link.href) && "bg-secondary font-semibold"
                    )}
                  >
                    <link.icon className="w-4 h-4" />
                    {link.label}
                  </Button>
                </Link>
              ))}
            </nav>
          )}

          {/* Right Side Actions */}
          <div className="flex items-center gap-3">
            {isAuthenticated ? (
              <>
                <Link to="/trips/new" className="hidden sm:block">
                  <Button variant="coral" size="sm" className="gap-2">
                    <Plus className="w-4 h-4" />
                    New Trip
                  </Button>
                </Link>
                <Link to="/profile">
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <div className="w-8 h-8 rounded-full bg-gradient-ocean flex items-center justify-center">
                      <span className="text-xs font-bold text-primary-foreground">
                        {userName?.charAt(0)?.toUpperCase() || "U"}
                      </span>
                    </div>
                  </Button>
                </Link>
                <Button
                  variant="ghost"
                  size="icon-sm"
                  onClick={onLogout}
                  className="text-muted-foreground hover:text-foreground"
                >
                  <LogOut className="w-4 h-4" />
                </Button>
              </>
            ) : (
              <>
                <Link to="/auth" className="hidden sm:block">
                  <Button variant="ghost" size="sm">
                    Sign In
                  </Button>
                </Link>
                <Link to="/auth?signup=true">
                  <Button variant="ocean" size="sm">
                    Get Started
                  </Button>
                </Link>
              </>
            )}

            {/* Mobile Menu Toggle */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && isAuthenticated && (
          <nav className="md:hidden py-4 border-t border-border/50 animate-slide-up">
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Button
                    variant={isActive(link.href) ? "secondary" : "ghost"}
                    className="w-full justify-start gap-3"
                  >
                    <link.icon className="w-5 h-5" />
                    {link.label}
                  </Button>
                </Link>
              ))}
              <Link to="/trips/new" onClick={() => setMobileMenuOpen(false)}>
                <Button variant="coral" className="w-full justify-start gap-3 mt-2">
                  <Plus className="w-5 h-5" />
                  New Trip
                </Button>
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
