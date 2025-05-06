import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Building, Bell, User } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import CompanyDetail from "@/components/CompanyDetail";
import { getCompanies, getUpdates, addUser, CompanyData, UpdateData, UserData } from "@/utils/dataStore";

const StudentDashboard = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [isProfileDialogOpen, setIsProfileDialogOpen] = useState(false);
  const [companies, setCompanies] = useState<CompanyData[]>([]);
  const [updates, setUpdates] = useState<UpdateData[]>([]);
  const [selectedCompanyId, setSelectedCompanyId] = useState<string | null>(null);
  const [isCompanyDetailOpen, setIsCompanyDetailOpen] = useState(false);
  
  // Profile form states
  const [department, setDepartment] = useState("");
  const [year, setYear] = useState("");
  const [rollNumber, setRollNumber] = useState("");
  const [phone, setPhone] = useState("");
  const [skills, setSkills] = useState("");
  const [bio, setBio] = useState("");
  const [cgpa, setCgpa] = useState("");
  
  useEffect(() => {
    // Check if user is logged in
    const userSession = sessionStorage.getItem("user");
    if (!userSession) {
      navigate("/");
      return;
    }
    
    const parsedUser = JSON.parse(userSession);
    
    // Check if user has student role
    if (parsedUser.role !== "student") {
      navigate("/");
      return;
    }
    
    setUserData(parsedUser);
    
    // Populate form fields if data exists
    if (parsedUser.department) setDepartment(parsedUser.department);
    if (parsedUser.year) setYear(parsedUser.year);
    if (parsedUser.rollNumber) setRollNumber(parsedUser.rollNumber);
    if (parsedUser.phone) setPhone(parsedUser.phone);
    if (parsedUser.skills) setSkills(parsedUser.skills);
    if (parsedUser.bio) setBio(parsedUser.bio);
    if (parsedUser.cgpa) setCgpa(parsedUser.cgpa);
    
    // Get companies and updates
    setCompanies(getCompanies());
    setUpdates(getUpdates().filter(u => u.isNew).slice(0, 3));
    
    setLoading(false);
  }, [navigate]);

  // Calculate profile completion percentage
  const calculateProfileCompletion = () => {
    if (!userData) return 0;
    
    const requiredFields = ['username', 'email', 'department', 'year', 'rollNumber', 'phone', 'skills', 'bio', 'cgpa'];
    let completedFields = 0;
    
    requiredFields.forEach(field => {
      if (userData[field as keyof UserData]) completedFields++;
    });
    
    return Math.floor((completedFields / requiredFields.length) * 100);
  };
  
  const handleProfileUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Update user data
    const updatedUserData = {
      ...userData,
      department,
      year,
      rollNumber,
      phone,
      skills,
      bio,
      cgpa
    };
    
    // Save to session storage
    sessionStorage.setItem("user", JSON.stringify(updatedUserData));
    
    // Also update in the users collection
    if (updatedUserData.id) {
      // Save to local storage
      const userKey = `user_${updatedUserData.email.replace(/[^a-zA-Z0-9]/g, '_')}`;
      localStorage.setItem(userKey, JSON.stringify(updatedUserData));
      
      // Add to datastore
      addUser(updatedUserData);
    }
    
    setUserData(updatedUserData);
    setIsProfileDialogOpen(false);
    
    toast.success("Profile updated successfully!");
  };
  
  const handleCompanyClick = (id: string) => {
    setSelectedCompanyId(id);
    setIsCompanyDetailOpen(true);
  };

  if (loading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <div>
              <h1 className="text-3xl font-bold text-campus-navy">Welcome, {userData?.username || "Student"}</h1>
              <p className="text-gray-600 mt-1">
                {userData?.department && `${userData.department.toUpperCase()} • `}
                {userData?.year && `${userData.year}${userData.year === "1" ? "st" : userData.year === "2" ? "nd" : userData.year === "3" ? "rd" : "th"} Year`}
              </p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card className="hover-lift card-shadow">
              <CardHeader className="flex flex-row items-center gap-4">
                <div className="rounded-full bg-campus-purple/10 p-3">
                  <Building className="h-6 w-6 text-campus-purple" />
                </div>
                <div>
                  <CardTitle>Eligible Companies</CardTitle>
                  <CardDescription className="text-2xl font-bold">{companies.length}</CardDescription>
                </div>
              </CardHeader>
            </Card>
            
            <Card className="hover-lift card-shadow">
              <CardHeader className="flex flex-row items-center gap-4">
                <div className="rounded-full bg-green-100 p-3">
                  <Bell className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <CardTitle>New Updates</CardTitle>
                  <CardDescription className="text-2xl font-bold">{updates.length}</CardDescription>
                </div>
              </CardHeader>
            </Card>
            
            <Card className="hover-lift card-shadow">
              <CardHeader className="flex flex-row items-center gap-4">
                <div className="rounded-full bg-amber-100 p-3">
                  <User className="h-6 w-6 text-amber-600" />
                </div>
                <div>
                  <CardTitle>Profile Completion</CardTitle>
                  <CardDescription className="text-2xl font-bold">
                    {calculateProfileCompletion()}%
                    <Dialog open={isProfileDialogOpen} onOpenChange={setIsProfileDialogOpen}>
                      <DialogTrigger asChild>
                        <Button variant="link" size="sm" className="ml-2 text-campus-purple p-0">
                          Update Profile
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[525px] max-h-[90vh] overflow-y-auto">
                        <DialogHeader>
                          <DialogTitle>Update Your Profile</DialogTitle>
                          <DialogDescription>
                            Complete your profile to increase your profile completion percentage.
                          </DialogDescription>
                        </DialogHeader>
                        <form onSubmit={handleProfileUpdate}>
                          <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-2 gap-4">
                              <div className="grid gap-2">
                                <Label htmlFor="department">Department</Label>
                                <Select value={department} onValueChange={setDepartment}>
                                  <SelectTrigger id="department">
                                    <SelectValue placeholder="Select" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="cse">Computer Science</SelectItem>
                                    <SelectItem value="ece">Electronics</SelectItem>
                                    <SelectItem value="mech">Mechanical</SelectItem>
                                    <SelectItem value="civil">Civil</SelectItem>
                                    <SelectItem value="other">Other</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                              
                              <div className="grid gap-2">
                                <Label htmlFor="year">Year</Label>
                                <Select value={year} onValueChange={setYear}>
                                  <SelectTrigger id="year">
                                    <SelectValue placeholder="Select" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="1">1st Year</SelectItem>
                                    <SelectItem value="2">2nd Year</SelectItem>
                                    <SelectItem value="3">3rd Year</SelectItem>
                                    <SelectItem value="4">4th Year</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                            </div>
                            
                            <div className="grid grid-cols-2 gap-4">
                              <div className="grid gap-2">
                                <Label htmlFor="rollNumber">Roll Number</Label>
                                <Input 
                                  id="rollNumber" 
                                  value={rollNumber} 
                                  onChange={(e) => setRollNumber(e.target.value)} 
                                  placeholder="e.g. CS21B001"
                                />
                              </div>
                              
                              <div className="grid gap-2">
                                <Label htmlFor="cgpa">CGPA</Label>
                                <Input 
                                  id="cgpa" 
                                  value={cgpa} 
                                  onChange={(e) => setCgpa(e.target.value)} 
                                  placeholder="e.g. 8.5"
                                  type="number" 
                                  min="0" 
                                  max="10" 
                                  step="0.01"
                                />
                              </div>
                            </div>
                            
                            <div className="grid gap-2">
                              <Label htmlFor="phone">Phone Number</Label>
                              <Input 
                                id="phone" 
                                value={phone} 
                                onChange={(e) => setPhone(e.target.value)} 
                                placeholder="e.g. +91 9876543210"
                              />
                            </div>
                            
                            <div className="grid gap-2">
                              <Label htmlFor="skills">Skills (comma separated)</Label>
                              <Input 
                                id="skills" 
                                value={skills} 
                                onChange={(e) => setSkills(e.target.value)} 
                                placeholder="e.g. Python, React, Machine Learning"
                              />
                            </div>
                            
                            <div className="grid gap-2">
                              <Label htmlFor="bio">Brief Bio</Label>
                              <Textarea 
                                id="bio" 
                                value={bio} 
                                onChange={(e) => setBio(e.target.value)} 
                                placeholder="Write a short bio about yourself..."
                                rows={3}
                              />
                            </div>
                          </div>
                          <DialogFooter>
                            <Button type="submit" className="bg-campus-purple hover:bg-campus-purple/90">Save Changes</Button>
                          </DialogFooter>
                        </form>
                      </DialogContent>
                    </Dialog>
                  </CardDescription>
                </div>
              </CardHeader>
            </Card>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <Card className="lg:col-span-2 hover-lift card-shadow">
              <CardHeader>
                <CardTitle>Upcoming Companies</CardTitle>
                <CardDescription>Companies visiting campus soon</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {companies.map((company) => (
                    <div key={company.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-white rounded-md flex items-center justify-center">
                          <img 
                            src={company.logo} 
                            alt={company.name} 
                            className="w-6 h-6 object-contain"
                          />
                        </div>
                        <div>
                          <h4 className="font-semibold">{company.name}</h4>
                          <p className="text-sm text-gray-500">{company.visitDate}</p>
                        </div>
                      </div>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => handleCompanyClick(company.id)}
                      >
                        View Details
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            <Card className="hover-lift card-shadow">
              <CardHeader>
                <CardTitle>Recent Updates</CardTitle>
                <CardDescription>Latest placement news</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {updates.map((update) => (
                    <div key={update.id} className="border-l-4 border-campus-purple pl-4 py-2">
                      <h4 className="font-medium">{update.title}</h4>
                      <p className="text-sm text-gray-500">{update.date}</p>
                    </div>
                  ))}
                </div>
                
                <Button variant="link" className="mt-4 p-0 h-auto text-campus-purple">
                  View all updates
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      
      <Footer />
      
      {/* Company details dialog */}
      <CompanyDetail
        companyId={selectedCompanyId}
        open={isCompanyDetailOpen}
        onOpenChange={setIsCompanyDetailOpen}
      />
    </div>
  );
};

export default StudentDashboard;
