
import { Button } from "@/components/ui/button";
import { useState, useEffect, useContext } from "react";
import { Menu, X, BookOpen, UserCircle, LogOut } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";
import AuthModal from "./AuthModal";
import { AuthContext } from "../App";

const Navbar = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authType, setAuthType] = useState<"login" | "register">("login");
  const { user, setUser } = useContext(AuthContext);

  const openLoginModal = () => {
    setAuthType("login");
    setShowAuthModal(true);
  };

  const openRegisterModal = () => {
    setAuthType("register");
    setShowAuthModal(true);
  };

  const handleLogout = () => {
    sessionStorage.removeItem("user");
    setUser(null);
    navigate("/");
  };

  // Determine if we should show dashboard link
  const dashboardLink = user?.role === "admin" ? "/admin" : "/dashboard";

  return (
    <>
      <nav className="bg-white/80 backdrop-blur-md sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link to="/">
                <div className="flex items-center">
                  <BookOpen className="h-8 w-8 text-campus-purple mr-2" />
                  <span className="font-bold text-xl text-gradient">CampusPrep</span>
                </div>
              </Link>
            </div>
            <div className="hidden md:flex items-center space-x-4">
              {user ? (
                <>
                  <Link to={dashboardLink} className="text-gray-700 hover:text-campus-purple px-3 py-2 rounded-md hover-lift">
                    Dashboard
                  </Link>
                  <Button 
                    onClick={handleLogout} 
                    variant="outline" 
                    className="flex items-center gap-2"
                  >
                    <LogOut className="h-4 w-4" />
                    Logout
                  </Button>
                  <Button className="bg-campus-purple hover:bg-campus-purple/90 flex items-center gap-2">
                    <UserCircle className="h-4 w-4" />
                    {user.username || "Profile"}
                  </Button>
                </>
              ) : (
                <>
                  <a href="#companies" className="text-gray-700 hover:text-campus-purple px-3 py-2 rounded-md hover-lift">Companies</a>
                  <a href="#questions" className="text-gray-700 hover:text-campus-purple px-3 py-2 rounded-md hover-lift">Questions</a>
                  <a href="#updates" className="text-gray-700 hover:text-campus-purple px-3 py-2 rounded-md hover-lift">Updates</a>
                  <Button onClick={openLoginModal} variant="outline" className="ml-4">Log In</Button>
                  <Button onClick={openRegisterModal} className="bg-campus-purple hover:bg-campus-purple/90">Register</Button>
                </>
              )}
            </div>
            <div className="md:hidden flex items-center">
              <Button variant="ghost" onClick={() => setIsOpen(!isOpen)}>
                {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </Button>
            </div>
          </div>
        </div>
        
        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white shadow-lg">
              {user ? (
                <>
                  <Link to={dashboardLink} className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-campus-purple hover:bg-gray-50">
                    Dashboard
                  </Link>
                  <Button 
                    onClick={handleLogout} 
                    variant="outline" 
                    className="w-full mt-2 flex items-center justify-center gap-2"
                  >
                    <LogOut className="h-4 w-4" />
                    Logout
                  </Button>
                </>
              ) : (
                <>
                  <a href="#companies" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-campus-purple hover:bg-gray-50">Companies</a>
                  <a href="#questions" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-campus-purple hover:bg-gray-50">Questions</a>
                  <a href="#updates" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-campus-purple hover:bg-gray-50">Updates</a>
                  <Button onClick={openLoginModal} variant="outline" className="w-full mt-2">Log In</Button>
                  <Button onClick={openRegisterModal} className="w-full mt-2 bg-campus-purple hover:bg-campus-purple/90">Register</Button>
                </>
              )}
            </div>
          </div>
        )}
      </nav>

      {showAuthModal && (
        <AuthModal 
          isOpen={showAuthModal}
          onClose={() => setShowAuthModal(false)}
          type={authType}
          switchType={() => setAuthType(authType === "login" ? "register" : "login")}
        />
      )}
    </>
  );
};

export default Navbar;
