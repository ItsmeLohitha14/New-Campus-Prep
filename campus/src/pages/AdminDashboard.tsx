import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { Building, Users, Bell, BookOpen, User, CircleCheck } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription, 
  DialogFooter 
} from "@/components/ui/dialog";
import CompanyDetail from "@/components/CompanyDetail";
import {
  addCompany,
  getCompanies,
  deleteCompany,
  addFaq,
  addUpdate,
  getAllUsers,
  deleteUser,
  getUserById,
  CompanyData,
  FAQData,
  UpdateData,
  UserData
} from "@/utils/dataStore";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [registeredUsers, setRegisteredUsers] = useState<UserData[]>([]);
  const [companies, setCompanies] = useState<CompanyData[]>([]);
  const [selectedCompanyId, setSelectedCompanyId] = useState<string | null>(null);
  const [isCompanyDetailOpen, setIsCompanyDetailOpen] = useState(false);
  const [viewingUser, setViewingUser] = useState<UserData | null>(null);
  const [isUserDialogOpen, setIsUserDialogOpen] = useState(false);
  const [userToDeleteId, setUserToDeleteId] = useState<string | null>(null);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  
  // New company form state
  const [companyName, setCompanyName] = useState("");
  const [companyLogo, setCompanyLogo] = useState("");
  const [companyDescription, setCompanyDescription] = useState("");
  const [companyEligibility, setCompanyEligibility] = useState("");
  const [companyVisitDate, setCompanyVisitDate] = useState("");
  const [companyRoles, setCompanyRoles] = useState("");
  
  // New FAQ form state
  const [faqQuestion, setFaqQuestion] = useState("");
  const [faqAnswer, setFaqAnswer] = useState("");
  const [faqCompany, setFaqCompany] = useState("");
  const [faqType, setFaqType] = useState<"technical" | "hr" | "aptitude">("technical");
  
  // New update form state
  const [updateTitle, setUpdateTitle] = useState("");
  const [updateContent, setUpdateContent] = useState("");
  const [updateDate, setUpdateDate] = useState("");
  const [updateIsNew, setUpdateIsNew] = useState(true);

  useEffect(() => {
    // Check if user is admin
    const userSession = sessionStorage.getItem("user");
    if (!userSession) {
      navigate("/");
      return;
    }
    
    const userData = JSON.parse(userSession);
    if (userData.role !== "admin") {
      toast.error("Unauthorized access");
      navigate("/");
      return;
    }
    
    // Get all users and companies
    loadUsers();
    loadCompanies();
    
    setLoading(false);
  }, [navigate]);
  
  const loadUsers = () => {
    setRegisteredUsers(getAllUsers());
  };
  
  const loadCompanies = () => {
    setCompanies(getCompanies());
  };

  const handleAddCompany = (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // Parse roles string into array
      const rolesArray = companyRoles.split(',').map(role => role.trim()).filter(Boolean);
      
      // Add company
      const newCompany = addCompany({
        name: companyName,
        logo: companyLogo,
        description: companyDescription,
        eligibility: companyEligibility,
        visitDate: companyVisitDate,
        roles: rolesArray
      });
      
      // Update local state
      setCompanies([...companies, newCompany]);
      
      toast.success(`Added company: ${companyName}`);
      
      // Reset form
      setCompanyName("");
      setCompanyLogo("");
      setCompanyDescription("");
      setCompanyEligibility("");
      setCompanyVisitDate("");
      setCompanyRoles("");
    } catch (error) {
      console.error("Error adding company:", error);
      toast.error("Failed to add company. Please try again.");
    }
  };

  const handleAddFAQ = (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // Add FAQ
      addFaq({
        question: faqQuestion,
        answer: faqAnswer,
        company: faqCompany,
        type: faqType
      });
      
      toast.success(`Added FAQ: ${faqQuestion}`);
      
      // Reset form
      setFaqQuestion("");
      setFaqAnswer("");
      setFaqCompany("");
      setFaqType("technical");
    } catch (error) {
      console.error("Error adding FAQ:", error);
      toast.error("Failed to add FAQ. Please try again.");
    }
  };

  const handleAddUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // Add update
      addUpdate({
        title: updateTitle,
        content: updateContent,
        date: updateDate,
        isNew: updateIsNew
      });
      
      toast.success(`Added update: ${updateTitle}`);
      
      // Reset form
      setUpdateTitle("");
      setUpdateContent("");
      setUpdateDate("");
      setUpdateIsNew(true);
    } catch (error) {
      console.error("Error adding update:", error);
      toast.error("Failed to add update. Please try again.");
    }
  };
  
  // Calculate profile completion percentage for a user
  const calculateProfileCompletion = (user: UserData) => {
    const requiredFields = ['username', 'email', 'department', 'year', 'rollNumber', 'phone', 'skills', 'bio', 'cgpa'];
    let completedFields = 0;
    
    requiredFields.forEach(field => {
      if (user[field as keyof UserData]) completedFields++;
    });
    
    return Math.floor((completedFields / requiredFields.length) * 100);
  };
  
  const handleViewUser = (userId: string | undefined) => {
    if (!userId) return;
    
    const user = getUserById(userId);
    if (user) {
      setViewingUser(user);
      setIsUserDialogOpen(true);
    } else {
      toast.error("User not found.");
    }
  };
  
  const handleDeleteUser = (userId: string | undefined) => {
    if (!userId) return;
    
    setUserToDeleteId(userId);
    setIsDeleteConfirmOpen(true);
  };
  
  const confirmDeleteUser = () => {
    if (!userToDeleteId) return;
    
    if (deleteUser(userToDeleteId)) {
      // Remove from local state
      setRegisteredUsers(registeredUsers.filter(user => user.id !== userToDeleteId));
      toast.success("User deleted successfully.");
    } else {
      toast.error("Failed to delete user.");
    }
    
    setIsDeleteConfirmOpen(false);
    setUserToDeleteId(null);
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
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-campus-navy">Admin Dashboard</h1>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card className="hover-lift card-shadow">
              <CardHeader className="flex flex-row items-center gap-4">
                <Building className="h-8 w-8 text-campus-purple" />
                <div>
                  <CardTitle>Companies</CardTitle>
                  <CardDescription>Manage company listings</CardDescription>
                </div>
              </CardHeader>
            </Card>
            
            <Card className="hover-lift card-shadow">
              <CardHeader className="flex flex-row items-center gap-4">
                <BookOpen className="h-8 w-8 text-campus-purple" />
                <div>
                  <CardTitle>FAQs</CardTitle>
                  <CardDescription>Manage interview questions</CardDescription>
                </div>
              </CardHeader>
            </Card>
            
            <Card className="hover-lift card-shadow">
              <CardHeader className="flex flex-row items-center gap-4">
                <Bell className="h-8 w-8 text-campus-purple" />
                <div>
                  <CardTitle>Updates</CardTitle>
                  <CardDescription>Manage placement updates</CardDescription>
                </div>
              </CardHeader>
            </Card>
            
            <Card className="hover-lift card-shadow">
              <CardHeader className="flex flex-row items-center gap-4">
                <Users className="h-8 w-8 text-campus-purple" />
                <div>
                  <CardTitle>Students</CardTitle>
                  <CardDescription>Manage student accounts</CardDescription>
                </div>
              </CardHeader>
            </Card>
          </div>
          
          <Tabs defaultValue="companies" className="space-y-4">
            <TabsList className="grid grid-cols-4 w-full max-w-2xl mx-auto">
              <TabsTrigger value="companies">Companies</TabsTrigger>
              <TabsTrigger value="faqs">FAQs</TabsTrigger>
              <TabsTrigger value="updates">Updates</TabsTrigger>
              <TabsTrigger value="students">Students</TabsTrigger>
            </TabsList>
            
            <TabsContent value="companies">
              <Card>
                <CardHeader>
                  <CardTitle>Add New Company</CardTitle>
                  <CardDescription>
                    Add company details for placement listings
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleAddCompany}>
                    <div className="grid gap-4">
                      <div className="grid gap-2">
                        <Label htmlFor="name">Company Name</Label>
                        <Input 
                          id="name" 
                          placeholder="e.g. Google" 
                          value={companyName}
                          onChange={(e) => setCompanyName(e.target.value)}
                          required
                        />
                      </div>
                      
                      <div className="grid gap-2">
                        <Label htmlFor="logo">Logo URL</Label>
                        <Input 
                          id="logo" 
                          placeholder="https://example.com/logo.png" 
                          value={companyLogo}
                          onChange={(e) => setCompanyLogo(e.target.value)}
                          required
                        />
                      </div>
                      
                      <div className="grid gap-2">
                        <Label htmlFor="description">Description</Label>
                        <Textarea 
                          id="description" 
                          placeholder="Company description..." 
                          value={companyDescription}
                          onChange={(e) => setCompanyDescription(e.target.value)}
                          required
                        />
                      </div>
                      
                      <div className="grid gap-2">
                        <Label htmlFor="eligibility">Eligibility</Label>
                        <Input 
                          id="eligibility" 
                          placeholder="e.g. CGPA ≥ 8.0, No backlogs" 
                          value={companyEligibility}
                          onChange={(e) => setCompanyEligibility(e.target.value)}
                          required
                        />
                      </div>
                      
                      <div className="grid gap-2">
                        <Label htmlFor="visitDate">Visit Date</Label>
                        <Input 
                          id="visitDate" 
                          placeholder="e.g. 15 Jun 2025" 
                          value={companyVisitDate}
                          onChange={(e) => setCompanyVisitDate(e.target.value)}
                          required
                        />
                      </div>
                      
                      <div className="grid gap-2">
                        <Label htmlFor="roles">Roles (comma separated)</Label>
                        <Input 
                          id="roles" 
                          placeholder="e.g. SDE, Data Scientist, Product Manager" 
                          value={companyRoles}
                          onChange={(e) => setCompanyRoles(e.target.value)}
                          required
                        />
                      </div>
                    </div>
                    <Button type="submit" className="mt-4 bg-campus-purple hover:bg-campus-purple/90">
                      Add Company
                    </Button>
                  </form>
                </CardContent>
                <CardFooter className="border-t pt-4">
                  <div className="w-full">
                    <h3 className="font-medium mb-2">Current Companies ({companies.length})</h3>
                    <div className="space-y-2 max-h-48 overflow-y-auto">
                      {companies.map(company => (
                        <div key={company.id} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                          <span className="font-medium">{company.name}</span>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => handleCompanyClick(company.id)}
                          >
                            View Details
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardFooter>
              </Card>
            </TabsContent>
            
            <TabsContent value="faqs">
              <Card>
                <CardHeader>
                  <CardTitle>Add New FAQ</CardTitle>
                  <CardDescription>
                    Add interview questions for companies
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleAddFAQ}>
                    <div className="grid gap-4">
                      <div className="grid gap-2">
                        <Label htmlFor="question">Question</Label>
                        <Input 
                          id="question" 
                          placeholder="e.g. What is the time complexity of QuickSort?" 
                          value={faqQuestion}
                          onChange={(e) => setFaqQuestion(e.target.value)}
                          required
                        />
                      </div>
                      
                      <div className="grid gap-2">
                        <Label htmlFor="answer">Answer</Label>
                        <Textarea 
                          id="answer" 
                          placeholder="Answer to the question..." 
                          value={faqAnswer}
                          onChange={(e) => setFaqAnswer(e.target.value)}
                          required
                        />
                      </div>
                      
                      <div className="grid gap-2">
                        <Label htmlFor="faqCompany">Company</Label>
                        <Input 
                          id="faqCompany" 
                          placeholder="e.g. Google" 
                          value={faqCompany}
                          onChange={(e) => setFaqCompany(e.target.value)}
                          required
                        />
                      </div>
                      
                      <div className="grid gap-2">
                        <Label htmlFor="type">Question Type</Label>
                        <Select 
                          value={faqType} 
                          onValueChange={(value) => setFaqType(value as "technical" | "hr" | "aptitude")}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="technical">Technical</SelectItem>
                            <SelectItem value="hr">HR</SelectItem>
                            <SelectItem value="aptitude">Aptitude</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <Button type="submit" className="mt-4 bg-campus-purple hover:bg-campus-purple/90">
                      Add FAQ
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="updates">
              <Card>
                <CardHeader>
                  <CardTitle>Add New Update</CardTitle>
                  <CardDescription>
                    Add placement announcements and updates
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleAddUpdate}>
                    <div className="grid gap-4">
                      <div className="grid gap-2">
                        <Label htmlFor="title">Title</Label>
                        <Input 
                          id="title" 
                          placeholder="e.g. Google Recruitment Drive Announced" 
                          value={updateTitle}
                          onChange={(e) => setUpdateTitle(e.target.value)}
                          required
                        />
                      </div>
                      
                      <div className="grid gap-2">
                        <Label htmlFor="content">Content</Label>
                        <Textarea 
                          id="content" 
                          placeholder="Update content..." 
                          value={updateContent}
                          onChange={(e) => setUpdateContent(e.target.value)}
                          required
                        />
                      </div>
                      
                      <div className="grid gap-2">
                        <Label htmlFor="date">Date</Label>
                        <Input 
                          id="date" 
                          placeholder="e.g. 15 May 2025" 
                          value={updateDate}
                          onChange={(e) => setUpdateDate(e.target.value)}
                          required
                        />
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <Label htmlFor="isNew" className="flex items-center gap-2 cursor-pointer">
                          <input 
                            type="checkbox" 
                            id="isNew" 
                            checked={updateIsNew} 
                            onChange={(e) => setUpdateIsNew(e.target.checked)}
                            className="h-4 w-4 rounded border-gray-300 text-campus-purple focus:ring-campus-purple"
                          />
                          Mark as New
                        </Label>
                      </div>
                    </div>
                    <Button type="submit" className="mt-4 bg-campus-purple hover:bg-campus-purple/90">
                      Add Update
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="students">
              <Card>
                <CardHeader>
                  <CardTitle>Registered Students</CardTitle>
                  <CardDescription>
                    View and manage all student accounts
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="border rounded-md overflow-hidden">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Username</TableHead>
                          <TableHead>Email</TableHead>
                          <TableHead>Department</TableHead>
                          <TableHead>Year</TableHead>
                          <TableHead>Roll Number</TableHead>
                          <TableHead>CGPA</TableHead>
                          <TableHead>Profile</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {registeredUsers.map((user, index) => (
                          <TableRow key={user.id || index}>
                            <TableCell>{user.username}</TableCell>
                            <TableCell>{user.email}</TableCell>
                            <TableCell>{user.department || '-'}</TableCell>
                            <TableCell>{user.year ? `${user.year}${user.year === "1" ? "st" : user.year === "2" ? "nd" : user.year === "3" ? "rd" : "th"} Year` : '-'}</TableCell>
                            <TableCell>{user.rollNumber || '-'}</TableCell>
                            <TableCell>{user.cgpa || '-'}</TableCell>
                            <TableCell>
                              <div className="flex items-center gap-2">
                                <span className="font-medium">{calculateProfileCompletion(user)}%</span>
                                {calculateProfileCompletion(user) === 100 && (
                                  <CircleCheck className="h-4 w-4 text-green-500" />
                                )}
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center gap-2">
                                <Button variant="outline" size="sm" onClick={() => handleViewUser(user.id)}>
                                  View
                                </Button>
                                <Button 
                                  variant="outline" 
                                  size="sm" 
                                  className="text-red-500 hover:text-red-700"
                                  onClick={() => handleDeleteUser(user.id)}
                                >
                                  Delete
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Footer />
      
      {/* User View Dialog */}
      <Dialog open={isUserDialogOpen} onOpenChange={setIsUserDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>User Profile Details</DialogTitle>
            <DialogDescription>
              View detailed profile information for {viewingUser?.username}
            </DialogDescription>
          </DialogHeader>
          
          <div className="py-4">
            {viewingUser ? (
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">Username</h4>
                    <p>{viewingUser.username}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">Email</h4>
                    <p>{viewingUser.email}</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">Department</h4>
                    <p>{viewingUser.department || "-"}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">Year</h4>
                    <p>{viewingUser.year ? `${viewingUser.year}${viewingUser.year === "1" ? "st" : viewingUser.year === "2" ? "nd" : viewingUser.year === "3" ? "rd" : "th"} Year` : "-"}</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">Roll Number</h4>
                    <p>{viewingUser.rollNumber || "-"}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">Phone</h4>
                    <p>{viewingUser.phone || "-"}</p>
                  </div>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium text-gray-500">CGPA</h4>
                  <p>{viewingUser.cgpa || "-"}</p>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Skills</h4>
                  <p>{viewingUser.skills || "-"}</p>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Bio</h4>
                  <p className="text-sm">{viewingUser.bio || "-"}</p>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Profile Completion</h4>
                  <p>{calculateProfileCompletion(viewingUser)}%</p>
                </div>
              </div>
            ) : (
              <p className="text-center text-red-500">User details not available</p>
            )}
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsUserDialogOpen(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteConfirmOpen} onOpenChange={setIsDeleteConfirmOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this user? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          
          <DialogFooter className="gap-2">
            <Button variant="outline" onClick={() => setIsDeleteConfirmOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={confirmDeleteUser}>
              Delete User
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Company Detail Dialog */}
      <CompanyDetail
        companyId={selectedCompanyId}
        open={isCompanyDetailOpen}
        onOpenChange={setIsCompanyDetailOpen}
      />
    </div>
  );
};

export default AdminDashboard;
