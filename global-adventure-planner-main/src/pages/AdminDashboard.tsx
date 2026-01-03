import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { 
  Users, 
  Map, 
  TrendingUp, 
  DollarSign,
  Search,
  MoreVertical,
  Eye,
  Trash2,
  BarChart3,
  Globe,
  Activity
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const stats = [
  { label: "Total Users", value: "2,847", change: "+12%", icon: Users, color: "bg-ocean" },
  { label: "Trips Created", value: "8,432", change: "+23%", icon: Map, color: "bg-coral" },
  { label: "Active Sessions", value: "342", change: "+5%", icon: Activity, color: "bg-forest" },
  { label: "Revenue", value: "$24.5k", change: "+18%", icon: DollarSign, color: "bg-sunset" },
];

const topCities = [
  { name: "Paris", trips: 1247, percentage: 85 },
  { name: "Tokyo", trips: 1089, percentage: 74 },
  { name: "Rome", trips: 956, percentage: 65 },
  { name: "Barcelona", trips: 834, percentage: 57 },
  { name: "Bali", trips: 721, percentage: 49 },
];

const recentUsers = [
  { id: "1", name: "Sarah Johnson", email: "sarah@example.com", trips: 5, joined: "2024-01-15", status: "active" },
  { id: "2", name: "Mike Chen", email: "mike@example.com", trips: 3, joined: "2024-01-14", status: "active" },
  { id: "3", name: "Emma Wilson", email: "emma@example.com", trips: 8, joined: "2024-01-13", status: "active" },
  { id: "4", name: "James Brown", email: "james@example.com", trips: 2, joined: "2024-01-12", status: "inactive" },
  { id: "5", name: "Lisa Davis", email: "lisa@example.com", trips: 6, joined: "2024-01-11", status: "active" },
];

export default function AdminDashboard() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredUsers = recentUsers.filter(user => 
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background">
      <Header isAuthenticated userName="Admin" onLogout={() => {}} />

      <main className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-display text-3xl font-bold text-foreground">
              Admin Dashboard
            </h1>
            <p className="text-muted-foreground">
              Monitor platform activity and manage users
            </p>
          </div>
          <Button variant="ocean" className="gap-2">
            <BarChart3 className="w-4 h-4" />
            Export Report
          </Button>
        </div>

        {/* Stats Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div 
              key={stat.label}
              className="card-elevated p-6 animate-slide-up"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 rounded-xl ${stat.color} flex items-center justify-center`}>
                  <stat.icon className="w-6 h-6 text-primary-foreground" />
                </div>
                <span className="text-sm font-medium text-forest">{stat.change}</span>
              </div>
              <p className="text-2xl font-bold text-foreground">{stat.value}</p>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Users Table */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="font-display text-xl font-bold text-foreground">
                Recent Users
              </h2>
              <div className="relative w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search users..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 h-9"
                />
              </div>
            </div>

            <div className="card-elevated overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>User</TableHead>
                    <TableHead>Trips</TableHead>
                    <TableHead>Joined</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="w-12"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredUsers.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-gradient-ocean flex items-center justify-center">
                            <span className="text-xs font-bold text-primary-foreground">
                              {user.name.charAt(0)}
                            </span>
                          </div>
                          <div>
                            <p className="font-medium text-foreground">{user.name}</p>
                            <p className="text-sm text-muted-foreground">{user.email}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{user.trips}</TableCell>
                      <TableCell className="text-muted-foreground">
                        {new Date(user.joined).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          user.status === "active" 
                            ? "bg-forest/20 text-forest" 
                            : "bg-muted text-muted-foreground"
                        }`}>
                          {user.status}
                        </span>
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon-sm">
                              <MoreVertical className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem className="gap-2">
                              <Eye className="w-4 h-4" />
                              View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem className="gap-2 text-destructive">
                              <Trash2 className="w-4 h-4" />
                              Delete User
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>

          {/* Sidebar - Top Cities */}
          <div className="space-y-6">
            <div className="card-elevated p-6">
              <div className="flex items-center gap-2 mb-6">
                <Globe className="w-5 h-5 text-ocean" />
                <h3 className="font-display font-bold text-foreground">
                  Top Destinations
                </h3>
              </div>
              <div className="space-y-4">
                {topCities.map((city, index) => (
                  <div key={city.name}>
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-foreground">
                          {index + 1}. {city.name}
                        </span>
                      </div>
                      <span className="text-sm text-muted-foreground">
                        {city.trips.toLocaleString()} trips
                      </span>
                    </div>
                    <div className="h-2 rounded-full bg-secondary overflow-hidden">
                      <div 
                        className="h-full bg-gradient-ocean rounded-full transition-all"
                        style={{ width: `${city.percentage}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Stats */}
            <div className="card-elevated p-6">
              <div className="flex items-center gap-2 mb-6">
                <TrendingUp className="w-5 h-5 text-coral" />
                <h3 className="font-display font-bold text-foreground">
                  Platform Activity
                </h3>
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 rounded-lg bg-secondary/50">
                  <span className="text-sm text-muted-foreground">Trips This Week</span>
                  <span className="font-bold text-foreground">234</span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg bg-secondary/50">
                  <span className="text-sm text-muted-foreground">New Signups</span>
                  <span className="font-bold text-foreground">89</span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg bg-secondary/50">
                  <span className="text-sm text-muted-foreground">Shared Trips</span>
                  <span className="font-bold text-foreground">156</span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg bg-secondary/50">
                  <span className="text-sm text-muted-foreground">Avg. Trip Duration</span>
                  <span className="font-bold text-foreground">8.5 days</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
