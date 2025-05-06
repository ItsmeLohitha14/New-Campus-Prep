
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { ArrowRight, Building, Users, BookOpen, Award } from 'lucide-react';

const Hero3D = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-campus-navy to-campus-purple text-white">
      {/* 3D objects that float and rotate */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-[20%] left-[10%] w-16 h-16 md:w-24 md:h-24 rounded-lg bg-white/10 backdrop-blur-lg border border-white/20 animate-float delay-100"></div>
        <div className="absolute top-[40%] right-[10%] w-20 h-20 md:w-32 md:h-32 rounded-full bg-white/10 backdrop-blur-lg border border-white/20 animate-float delay-300"></div>
        <div className="absolute top-[60%] left-[20%] w-14 h-14 md:w-20 md:h-20 rounded-lg bg-white/10 backdrop-blur-lg border border-white/20 animate-float"></div>
        <div className="absolute bottom-[10%] right-[20%] w-16 h-16 md:w-24 md:h-24 rounded-xl rotate-45 bg-white/10 backdrop-blur-lg border border-white/20 animate-float delay-200"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-24 relative">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              Prepare for <span className="text-campus-accent">Campus Placements</span> Like Never Before
            </h1>
            <p className="text-lg md:text-xl text-white/80">
              Your one-stop platform for company details, interview patterns, practice questions, and real-time placement updates.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button className="bg-white text-campus-navy hover:bg-white/90 hover:text-campus-purple text-lg px-6 py-6">
                Get Started <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button 
                variant="outline" 
                className="border-white text-white bg-transparent hover:bg-transparent text-lg px-6 py-6"
              >
                Explore Companies
              </Button>
            </div>
          </div>
          <div className="relative h-[300px] md:h-[400px]">
            <div className={`transition-opacity duration-1000 ${mounted ? 'opacity-100' : 'opacity-0'}`}>
              {/* 3D-looking dashboard mockup */}
              <div className="absolute inset-0 bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 shadow-xl transform rotate-3 md:scale-90 hover:rotate-1 transition-transform duration-500"></div>
              <div className="absolute inset-0 bg-white/15 backdrop-blur-lg rounded-2xl border border-white/20 shadow-xl transform -rotate-2 md:scale-95 hover:rotate-0 transition-transform duration-500"></div>
              <div className="absolute inset-0 bg-white/20 backdrop-blur-lg rounded-2xl border border-white/20 shadow-xl p-6">
                <div className="h-6 w-24 bg-white/30 rounded-full mb-4"></div>
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="h-24 bg-white/20 rounded-lg flex items-center justify-center">
                    <Building className="h-8 w-8 text-white/70" />
                  </div>
                  <div className="h-24 bg-white/20 rounded-lg flex items-center justify-center">
                    <Users className="h-8 w-8 text-white/70" />
                  </div>
                  <div className="h-24 bg-white/20 rounded-lg flex items-center justify-center">
                    <BookOpen className="h-8 w-8 text-white/70" />
                  </div>
                  <div className="h-24 bg-white/20 rounded-lg flex items-center justify-center">
                    <Award className="h-8 w-8 text-white/70" />
                  </div>
                </div>
                <div className="h-6 w-full bg-white/30 rounded-full mb-4"></div>
                <div className="h-6 w-3/4 bg-white/30 rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent"></div>
    </div>
  );
};

export default Hero3D;
