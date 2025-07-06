import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../firebase";
import { collection, onSnapshot, query } from "firebase/firestore";
import { UserManagement } from "@/components/UserManagement";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { LogOut, Users, CheckCircle, Clock, CreditCard } from "lucide-react";

export const Dashboard = () => {
  const navigate = useNavigate();
  const [userStats, setUserStats] = useState({
    total: 0,
    active: 0,
    pending: 0
  });

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (!user) {
        navigate("/login");
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  useEffect(() => {
    const q = query(collection(db, "users"));
    
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const stats = {
        total: snapshot.size,
        active: 0,
        pending: 0
      };

      snapshot.forEach((doc) => {
        const userData = doc.data();
        if (userData.status === "active") stats.active++;
        if (userData.status === "pending") stats.pending++;
      });

      setUserStats(stats);
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await auth.signOut();
      navigate("/login");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  const StatCard = ({ icon: Icon, title, value, className = "" }: { 
    icon: any; 
    title: string; 
    value: number | string;
    className?: string;
  }) => (
    <Card className={`p-6 flex items-center space-x-4 transition-all hover:shadow-lg ${className}`}>
      <div className="p-3 rounded-full bg-primary/10">
        <Icon className="h-6 w-6 text-primary" />
      </div>
      <div>
        <p className="text-sm font-medium text-muted-foreground">{title}</p>
        <h3 className="text-2xl font-bold mt-1">{value}</h3>
      </div>
    </Card>
  );

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            Admin Dashboard
          </h1>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleLogout}
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            icon={Users}
            title="Total Users"
            value={userStats.total}
            className="bg-card/50 backdrop-blur-sm"
          />
          <StatCard
            icon={CheckCircle}
            title="Active Users"
            value={userStats.active}
            className="bg-card/50 backdrop-blur-sm"
          />
          <StatCard
            icon={Clock}
            title="Pending Users"
            value={userStats.pending}
            className="bg-card/50 backdrop-blur-sm"
          />
          <StatCard
            icon={CreditCard}
            title="Pending Payments"
            value="0"
            className="bg-card/50 backdrop-blur-sm"
          />
        </div>

        <div className="rounded-xl border bg-card shadow-sm overflow-hidden">
          <div className="p-6 border-b">
            <h2 className="text-lg font-semibold">User Management</h2>
            <p className="text-sm text-muted-foreground mt-1">
              Manage user accounts, status, and view detailed information.
            </p>
          </div>
          <UserManagement />
        </div>
      </main>
    </div>
  );
};