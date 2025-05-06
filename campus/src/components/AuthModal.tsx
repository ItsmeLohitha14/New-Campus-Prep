import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState, useContext } from "react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../App";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: "login" | "register";
  switchType: () => void;
}

// Admin credentials
const ADMIN_EMAIL = "admin@campusprep.com";
const ADMIN_PASSWORD = "admin123";

const AuthModal = ({ isOpen, onClose, type, switchType }: AuthModalProps) => {
  const navigate = useNavigate();
  const { setUser } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [department, setDepartment] = useState("");
  const [year, setYear] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      if (type === "login") {
        // Check for admin credentials
        if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
          // Store admin session
          const adminData = { 
            id: "admin",
            role: "admin", 
            email, 
            username: "Admin"
          };
          
          sessionStorage.setItem("user", JSON.stringify(adminData));
          setUser(adminData); // Update auth context
          
          // Close modal and show success message
          onClose();
          toast.success("Admin login successful!");
          
          // Navigate to admin route
          navigate("/admin");
        } else {
          // Handle regular user login
          // First check if user exists in localStorage
          let foundUser = false;
          let userData;
          
          // Search all user keys in localStorage
          Object.keys(localStorage).forEach(key => {
            if (key.startsWith('user_') && key !== 'user_admin') {
              const storedUser = JSON.parse(localStorage.getItem(key) || '{}');
              if (storedUser.email === email && storedUser.password === password) {
                foundUser = true;
                userData = storedUser;
              }
            }
          });
          
          if (foundUser && userData) {
            sessionStorage.setItem("user", JSON.stringify(userData));
            setUser(userData); // Update auth context
            
            onClose();
            toast.success("Login successful!");
            
            // Navigate to dashboard route
            navigate("/dashboard");
          } else {
            toast.error("Invalid email or password. Please try again or register.");
          }
        }
      } else {
        // Handle registration - generate a unique ID for the user
        const userId = `user_${Date.now()}`;
        
        const userData = { 
          id: userId,
          role: "student", 
          email,
          password, // In a real app, this should be hashed
          username,
          department,
          year,
          profileComplete: false
        };
        
        // Store in session storage for current session
        sessionStorage.setItem("user", JSON.stringify(userData));
        setUser(userData); // Update auth context
        
        // Add user to localStorage for admin to view
        const userKey = `user_${email.replace(/[^a-zA-Z0-9]/g, '_')}`;
        localStorage.setItem(userKey, JSON.stringify(userData));
        
        onClose();
        toast.success("Registration successful!");
        
        // Navigate to dashboard route
        navigate("/dashboard");
      }
    } catch (error) {
      console.error("Authentication error:", error);
      toast.error("An error occurred during authentication. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {type === "login" ? "Welcome Back" : "Create an Account"}
          </DialogTitle>
          <DialogDescription>
            {type === "login" 
              ? "Enter your credentials to access your account." 
              : "Join CampusPrep to ace your campus placement interviews."}
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          {type === "register" && (
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="johndoe"
                required
              />
            </div>
          )}
          
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="johndoe@example.com"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              showPasswordToggle={true}
              required
            />
          </div>
          
          {type === "register" && (
            <>
              <div className="space-y-2">
                <Label htmlFor="department">Department</Label>
                <Select onValueChange={setDepartment} required>
                  <SelectTrigger>
                    <SelectValue placeholder="Select department" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="cse">Computer Science</SelectItem>
                    <SelectItem value="ece">Electronics & Communication</SelectItem>
                    <SelectItem value="mechanical">Mechanical</SelectItem>
                    <SelectItem value="civil">Civil</SelectItem>
                    <SelectItem value="electrical">Electrical</SelectItem>
                    <SelectItem value="it">Information Technology</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="year">Year of Study</Label>
                <Select onValueChange={setYear} required>
                  <SelectTrigger>
                    <SelectValue placeholder="Select year" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1st Year</SelectItem>
                    <SelectItem value="2">2nd Year</SelectItem>
                    <SelectItem value="3">3rd Year</SelectItem>
                    <SelectItem value="4">4th Year</SelectItem>
                    <SelectItem value="5">5th Year</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </>
          )}
          
          <Button 
            type="submit" 
            className="w-full bg-campus-purple hover:bg-campus-purple/90"
            disabled={isSubmitting}
          >
            {isSubmitting 
              ? "Processing..." 
              : type === "login" ? "Log In" : "Register"
            }
          </Button>
        </form>
        
        <div className="mt-4 text-center text-sm">
          {type === "login" ? (
            <p>
              Don't have an account?{" "}
              <Button variant="link" onClick={switchType} className="p-0 h-auto text-campus-purple">
                Register
              </Button>
            </p>
          ) : (
            <p>
              Already have an account?{" "}
              <Button variant="link" onClick={switchType} className="p-0 h-auto text-campus-purple">
                Log In
              </Button>
            </p>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AuthModal;
