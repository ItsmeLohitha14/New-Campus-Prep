
import Navbar from "@/components/Navbar";
import Hero3D from "@/components/Hero3D";
import CompanyCard from "@/components/CompanyCard";
import FAQ from "@/components/FAQ";
import Updates from "@/components/Updates";
import Footer from "@/components/Footer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Building, UserCheck, Download, BookOpen } from "lucide-react";

const Index = () => {
  // Sample company data
  const companies = [
    {
      id: "google",
      name: "Google",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/1024px-Google_%22G%22_Logo.svg.png",
      description: "Leading technology company specializing in internet-related services and products.",
      eligibility: "CGPA ≥ 8.5, No backlogs",
      visitDate: "10 Jun 2025",
      roles: ["SDE", "Data Scientist", "Product Manager"]
    },
    {
      id: "microsoft",
      name: "Microsoft",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Microsoft_logo.svg/2048px-Microsoft_logo.svg.png",
      description: "Global technology corporation that develops, manufactures, licenses, and sells computer software.",
      eligibility: "CGPA ≥ 8.0, No backlogs",
      visitDate: "15 Jun 2025",
      roles: ["Software Engineer", "Cloud Engineer", "UX Designer"]
    },
    {
      id: "amazon",
      name: "Amazon",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/2560px-Amazon_logo.svg.png",
      description: "American multinational tech company focusing on e-commerce, cloud computing, and AI.",
      eligibility: "CGPA ≥ 7.5, Max 2 backlogs",
      visitDate: "22 Jun 2025",
      roles: ["SDE", "Business Analyst", "Operations"]
    },
    {
      id: "goldman",
      name: "Goldman Sachs",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/61/Goldman_Sachs.svg/1200px-Goldman_Sachs.svg.png",
      description: "Leading global investment banking, securities, and investment management firm.",
      eligibility: "CGPA ≥ 8.0, No backlogs",
      visitDate: "05 Jul 2025",
      roles: ["Financial Analyst", "Investment Banking", "Software Engineer"]
    }
  ];

  // Sample FAQ data with proper type annotations
  const faqs = [
    {
      id: "q1",
      question: "What is the time complexity of QuickSort algorithm?",
      answer: "The average time complexity of QuickSort is O(n log n), but in the worst case, it can be O(n²). The worst case occurs when the pivot selection leads to highly unbalanced partitions, like when the array is already sorted. Space complexity is O(log n) due to the recursive call stack.",
      company: "Google",
      type: "technical" as "technical"
    },
    {
      id: "q2",
      question: "Explain the difference between REST and GraphQL.",
      answer: "REST is an architectural style for designing networked applications using standard HTTP methods. It typically requires multiple endpoints for different resources. GraphQL is a query language and runtime that allows clients to request exactly the data they need from a single endpoint. REST may cause over-fetching or under-fetching of data, while GraphQL gives clients more control over what data is returned.",
      company: "Microsoft",
      type: "technical" as "technical"
    },
    {
      id: "q3",
      question: "Tell us about a time you faced a challenging situation in a team project.",
      answer: "During my last internship, our team was working on a critical feature with a tight deadline. Midway through, we discovered a fundamental flaw in our approach. I organized an emergency meeting, facilitated a brainstorming session, and helped divide tasks based on team strengths. We managed to pivot our strategy, worked extra hours, and delivered the feature one day early. This taught me the value of quick adaptation and leveraging each team member's strengths under pressure.",
      company: "Amazon",
      type: "hr" as "hr"
    },
    {
      id: "q4",
      question: "If 6 workers can complete a job in 12 days, how many days would it take 9 workers to complete the same job?",
      answer: "Let's use the work equation: Workers × Days = Constant amount of work\n\n6 workers × 12 days = 72 worker-days\n\nNow for 9 workers:\n9 workers × x days = 72 worker-days\nx days = 72 ÷ 9 = 8 days\n\nSo it would take 8 days for 9 workers to complete the same job.",
      company: "Goldman Sachs",
      type: "aptitude" as "aptitude"
    }
  ];

  // Sample updates data
  const updates = [
    {
      id: "u1",
      title: "Google Recruitment Drive Announced",
      content: "Google will be conducting an on-campus recruitment drive for 2025 batch students. Register before May 30.",
      date: "15 May 2025",
      isNew: true
    },
    {
      id: "u2",
      title: "Pre-Placement Talk: Microsoft",
      content: "Microsoft will be conducting a pre-placement talk on June 5. Mandatory for all registered students.",
      date: "01 Jun 2025",
      isNew: true
    },
    {
      id: "u3",
      title: "Resume Building Workshop",
      content: "Learn how to create an impressive resume that will catch the recruiter's eye. Register now to secure your spot!",
      date: "25 May 2025",
      isNew: false
    }
  ];

  const stats = [
    { count: "50+", label: "Companies", icon: Building },
    { count: "1200+", label: "Students Placed", icon: UserCheck },
    { count: "500+", label: "Interview Questions", icon: BookOpen },
    { count: "30+", label: "Resources", icon: Download },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        <Hero3D />
        
        {/* Stats Section */}
        <section className="py-12 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 text-center">
              {stats.map((stat, index) => (
                <div key={index} className="bg-white shadow-lg rounded-lg p-6 hover-lift card-shadow">
                  <div className="mx-auto rounded-full w-12 h-12 flex items-center justify-center bg-campus-purple/10 text-campus-purple mb-4">
                    <stat.icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-3xl font-bold text-campus-navy">{stat.count}</h3>
                  <p className="text-gray-600">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Companies Section */}
        <section id="companies" className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Companies</h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Explore top companies that recruit from our campus. View details, interview processes, and prepare accordingly.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {companies.map((company, index) => (
                <CompanyCard key={index} {...company} />
              ))}
            </div>
            
            <div className="text-center mt-10">
              <a 
                href="#" 
                className="inline-flex items-center text-campus-purple hover:text-campus-purple/80"
              >
                View all companies
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-5 w-5 ml-1" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M14 5l7 7m0 0l-7 7m7-7H3" 
                  />
                </svg>
              </a>
            </div>
          </div>
        </section>
        
        {/* Questions Section */}
        <section id="questions" className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Interview Questions</h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Prepare for your interviews with commonly asked questions from top companies.
              </p>
            </div>
            
            <Tabs defaultValue="all" className="max-w-5xl mx-auto">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="all">All Questions</TabsTrigger>
                <TabsTrigger value="technical">Technical</TabsTrigger>
                <TabsTrigger value="hr">HR</TabsTrigger>
                <TabsTrigger value="aptitude">Aptitude</TabsTrigger>
              </TabsList>
              <TabsContent value="all" className="mt-6">
                <FAQ faqs={faqs} />
              </TabsContent>
              <TabsContent value="technical" className="mt-6">
                <FAQ faqs={faqs.filter(q => q.type === 'technical')} />
              </TabsContent>
              <TabsContent value="hr" className="mt-6">
                <FAQ faqs={faqs.filter(q => q.type === 'hr')} />
              </TabsContent>
              <TabsContent value="aptitude" className="mt-6">
                <FAQ faqs={faqs.filter(q => q.type === 'aptitude')} />
              </TabsContent>
            </Tabs>
            
            <div className="text-center mt-10">
              <a 
                href="#" 
                className="inline-flex items-center text-campus-purple hover:text-campus-purple/80"
              >
                Browse all questions
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-5 w-5 ml-1" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M14 5l7 7m0 0l-7 7m7-7H3" 
                  />
                </svg>
              </a>
            </div>
          </div>
        </section>
        
        {/* Updates Section */}
        <section id="updates" className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Placement Updates</h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Stay informed with the latest placement announcements, events, and opportunities.
              </p>
            </div>
            
            <div className="max-w-4xl mx-auto">
              <Updates updates={updates} />
            </div>
          </div>
        </section>
        
        {/* Call to Action Section */}
        <section className="py-16 campus-gradient text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Ace Your Placements?</h2>
            <p className="text-xl max-w-3xl mx-auto mb-8 text-white/90">
              Join CampusPrep today and get access to all the resources you need to succeed in your campus placements.
            </p>
            <button className="bg-white text-campus-navy hover:bg-white/90 font-semibold py-3 px-6 rounded-lg shadow-lg hover-lift">
              Register Now
            </button>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
