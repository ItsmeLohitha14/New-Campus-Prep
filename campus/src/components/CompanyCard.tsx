
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "./ui/button";
import { useState } from "react";
import CompanyDetail from "./CompanyDetail";

interface CompanyCardProps {
  id?: string;
  name: string;
  logo: string;
  description: string;
  eligibility: string;
  visitDate: string;
  roles: string[];
}

const CompanyCard = ({ 
  id = "",
  name, 
  logo, 
  description, 
  eligibility, 
  visitDate,
  roles 
}: CompanyCardProps) => {
  const [showDetails, setShowDetails] = useState(false);
  
  return (
    <>
      <Card className="overflow-hidden hover-lift card-shadow flex flex-col justify-between">
        <div className="h-2 campus-gradient" />
        <CardContent className="pt-6 pb-2 flex flex-col items-center justify-center space-y-4">
          <div className="h-20 w-20 flex items-center justify-center rounded-full bg-secondary p-2">
            <img 
              src={logo} 
              alt={`${name} logo`} 
              className="h-full w-full object-contain"
            />
          </div>
          <h3 className="font-semibold text-lg text-center">{name}</h3>
        </CardContent>
        <CardFooter className="pb-4">
          <Button 
            variant="ghost" 
            className="w-full justify-center group"
            onClick={() => setShowDetails(true)}
          >
            View Details
          </Button>
        </CardFooter>
      </Card>
      
      <CompanyDetail 
        companyId={id}
        open={showDetails} 
        onOpenChange={setShowDetails} 
        companyData={{
          id,
          name,
          logo,
          description,
          eligibility,
          visitDate,
          roles
        }}
      />
    </>
  );
};

export default CompanyCard;
