import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  User,
  Mail,
  Camera,
  Globe,
  Bell,
  Shield,
  Trash2,
  Save,
  MapPin
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Switch } from "@/components/ui/switch";
import { auth } from "@/lib/firebase";
import { updateProfile, signOut } from "firebase/auth";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

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

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    bio: "",
    location: "",
    avatar: "",
  });

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setFormData(prev => ({
          ...prev,
          name: user.displayName || "",
          email: user.email || "",
          // Don't overwrite other fields as they aren't in standard auth profile yet
        }));
      }
    });

    return () => unsubscribe();
  }, []);

  const [preferences, setPreferences] = useState({
    emailNotifications: true,
    tripReminders: true,
    publicProfile: false,
    shareTrips: true,
  });

  const handleSave = async () => {
    setIsLoading(true);
    try {
      if (auth.currentUser) {
        await updateProfile(auth.currentUser, {
          displayName: formData.name,
          // photoURL: formData.avatar // If we were handling file uploads
        });

        toast({
          title: "Profile updated",
          description: "Your changes have been saved successfully.",
        });
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to update profile.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const savedDestinations = [
    { name: "Tokyo", country: "Japan" },
    { name: "Paris", country: "France" },
    { name: "Bali", country: "Indonesia" },
    { name: "Iceland", country: "Nordic" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header
        isAuthenticated={!!auth.currentUser}
        userName={auth.currentUser?.displayName || "User"}
        onLogout={handleLogout}
      />

      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <h1 className="font-display text-3xl font-bold text-foreground mb-8">
          Profile Settings
        </h1>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Settings */}
          <div className="lg:col-span-2 space-y-6">
            {/* Profile Info */}
            <div className="card-elevated p-6 space-y-6">
              <h2 className="font-display text-lg font-bold text-foreground flex items-center gap-2">
                <User className="w-5 h-5 text-ocean" />
                Profile Information
              </h2>

              {/* Avatar */}
              <div className="flex items-center gap-4">
                <div className="w-20 h-20 rounded-full bg-gradient-ocean flex items-center justify-center">
                  <span className="text-2xl font-bold text-primary-foreground">
                    {formData.name.charAt(0)}
                  </span>
                </div>
                <div>
                  <Button variant="secondary" size="sm" className="gap-2">
                    <Camera className="w-4 h-4" />
                    Change Photo
                  </Button>
                  <p className="text-sm text-muted-foreground mt-1">
                    JPG, PNG up to 5MB
                  </p>
                </div>
              </div>

              {/* Name */}
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="pl-10"
                  />
                </div>
              </div>

              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="pl-10"
                  />
                </div>
              </div>

              {/* Location */}
              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    id="location"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="pl-10"
                    placeholder="City, Country"
                  />
                </div>
              </div>

              {/* Bio */}
              <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                <Textarea
                  id="bio"
                  value={formData.bio}
                  onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                  rows={3}
                  placeholder="Tell us about yourself..."
                />
              </div>
            </div>

            {/* Preferences */}
            <div className="card-elevated p-6 space-y-6">
              <h2 className="font-display text-lg font-bold text-foreground flex items-center gap-2">
                <Bell className="w-5 h-5 text-coral" />
                Preferences
              </h2>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-foreground">Email Notifications</p>
                    <p className="text-sm text-muted-foreground">
                      Receive updates about your trips
                    </p>
                  </div>
                  <Switch
                    checked={preferences.emailNotifications}
                    onCheckedChange={(checked) =>
                      setPreferences({ ...preferences, emailNotifications: checked })
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-foreground">Trip Reminders</p>
                    <p className="text-sm text-muted-foreground">
                      Get reminded before your trips
                    </p>
                  </div>
                  <Switch
                    checked={preferences.tripReminders}
                    onCheckedChange={(checked) =>
                      setPreferences({ ...preferences, tripReminders: checked })
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-foreground">Public Profile</p>
                    <p className="text-sm text-muted-foreground">
                      Allow others to view your profile
                    </p>
                  </div>
                  <Switch
                    checked={preferences.publicProfile}
                    onCheckedChange={(checked) =>
                      setPreferences({ ...preferences, publicProfile: checked })
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-foreground">Share Trips by Default</p>
                    <p className="text-sm text-muted-foreground">
                      New trips will be shareable
                    </p>
                  </div>
                  <Switch
                    checked={preferences.shareTrips}
                    onCheckedChange={(checked) =>
                      setPreferences({ ...preferences, shareTrips: checked })
                    }
                  />
                </div>
              </div>
            </div>

            {/* Danger Zone */}
            <div className="card-elevated p-6 border-destructive/30">
              <h2 className="font-display text-lg font-bold text-foreground flex items-center gap-2 mb-4">
                <Shield className="w-5 h-5 text-destructive" />
                Danger Zone
              </h2>
              <p className="text-sm text-muted-foreground mb-4">
                Once you delete your account, there is no going back. Please be certain.
              </p>
              <Button variant="destructive" className="gap-2">
                <Trash2 className="w-4 h-4" />
                Delete Account
              </Button>
            </div>

            {/* Save Button */}
            <Button
              variant="ocean"
              size="lg"
              className="w-full gap-2"
              onClick={handleSave}
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
              ) : (
                <>
                  <Save className="w-5 h-5" />
                  Save Changes
                </>
              )}
            </Button>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Saved Destinations */}
            <div className="card-elevated p-6">
              <h3 className="font-display font-bold text-foreground mb-4 flex items-center gap-2">
                <Globe className="w-5 h-5 text-forest" />
                Saved Destinations
              </h3>
              <div className="space-y-2">
                {savedDestinations.map((dest) => (
                  <div
                    key={dest.name}
                    className="flex items-center gap-3 p-2 rounded-lg hover:bg-secondary transition-colors"
                  >
                    <MapPin className="w-4 h-4 text-coral" />
                    <div>
                      <p className="font-medium text-foreground text-sm">{dest.name}</p>
                      <p className="text-xs text-muted-foreground">{dest.country}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Stats */}
            <div className="card-elevated p-6">
              <h3 className="font-display font-bold text-foreground mb-4">
                Travel Stats
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Trips Planned</span>
                  <span className="font-bold text-foreground">12</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Countries</span>
                  <span className="font-bold text-foreground">8</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Cities Visited</span>
                  <span className="font-bold text-foreground">24</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Member Since</span>
                  <span className="font-bold text-foreground">Jan 2024</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
