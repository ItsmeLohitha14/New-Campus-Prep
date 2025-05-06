
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState, createContext } from "react";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import AdminDashboard from "./pages/AdminDashboard";
import StudentDashboard from "./pages/StudentDashboard";

// Create a context for user authentication
export const AuthContext = createContext<{
  user: any;
  setUser: React.Dispatch<React.SetStateAction<any>>;
}>({
  user: null,
  setUser: () => {}
});

// Create default admin user if it doesn't exist
const setupAdminUser = () => {
  const adminKey = "user_admin";
  
  // Check if admin user exists
  if (!localStorage.getItem(adminKey)) {
    const adminUser = {
      id: "admin",
      username: "Admin",
      email: "admin@campusprep.com",
      password: "admin123", // In a real app, this would be hashed
      role: "admin"
    };
    
    localStorage.setItem(adminKey, JSON.stringify(adminUser));
    console.log("Admin user created");
  }
};

const queryClient = new QueryClient();

const App = () => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Setup default admin user
    setupAdminUser();

    // Check for active user session
    const userSession = sessionStorage.getItem("user");
    if (userSession) {
      setUser(JSON.parse(userSession));
    }
    setLoading(false);
  }, []);

  // Function to check authentication for routing
  const RequireAuth = ({ children, role }: { children: JSX.Element, role?: string }) => {
    if (loading) {
      return <div className="flex items-center justify-center h-screen">Loading...</div>;
    }
    
    // If no user or role doesn't match
    if (!user || (role && user.role !== role)) {
      return <Navigate to="/" replace />;
    }
    
    return children;
  };

  // Function for redirecting already authenticated users
  const RedirectIfAuth = ({ children }: { children: JSX.Element }) => {
    if (loading) {
      return <div className="flex items-center justify-center h-screen">Loading...</div>;
    }
    
    // If user is already logged in, redirect them to their dashboard
    if (user) {
      if (user.role === "admin") {
        return <Navigate to="/admin" replace />;
      } else {
        return <Navigate to="/dashboard" replace />;
      }
    }
    
    return children;
  };

  return (
    <QueryClientProvider client={queryClient}>
      <AuthContext.Provider value={{ user, setUser }}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route 
                path="/" 
                element={
                  <RedirectIfAuth>
                    <Index />
                  </RedirectIfAuth>
                } 
              />
              <Route 
                path="/admin" 
                element={
                  <RequireAuth role="admin">
                    <AdminDashboard />
                  </RequireAuth>
                } 
              />
              <Route 
                path="/dashboard" 
                element={
                  <RequireAuth role="student">
                    <StudentDashboard />
                  </RequireAuth>
                }
              />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AuthContext.Provider>
    </QueryClientProvider>
  );
};

export default App;
