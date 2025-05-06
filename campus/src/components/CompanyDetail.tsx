
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription,
  DialogFooter
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Briefcase, Users } from "lucide-react";

export interface CompanyData {
  id: string;
  name: string;
  logo: string;
  description: string;
  eligibility: string;
  visitDate: string;
  roles: string[];
}

interface CompanyDetailProps {
  companyId: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  companyData: CompanyData;
}

const CompanyDetail = ({ companyId, open, onOpenChange, companyData }: CompanyDetailProps) => {
  if (!open) return null;
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <div className="w-8 h-8 bg-white rounded-md flex items-center justify-center overflow-hidden">
              <img
                src={companyData.logo}
                alt={companyData.name}
                className="max-w-full max-h-full object-contain"
              />
            </div>
            {companyData.name}
          </DialogTitle>
          <DialogDescription>
            Company details
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-sm">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span className="text-muted-foreground">Visit Date:</span>
            <span>{companyData.visitDate}</span>
          </div>
          
          <div>
            <h4 className="font-medium text-gray-700 mb-1">Description</h4>
            <p className="text-sm">{companyData.description}</p>
          </div>
          
          <div className="flex items-center gap-2 text-sm">
            <Users className="h-4 w-4 text-muted-foreground" />
            <span className="text-muted-foreground">Eligibility:</span>
            <span>{companyData.eligibility}</span>
          </div>
          
          <div>
            <h4 className="font-medium text-gray-700 mb-1 flex items-center gap-2">
              <Briefcase className="h-4 w-4" /> Open Roles
            </h4>
            <div className="flex flex-wrap gap-2 mt-1">
              {companyData.roles.map((role, index) => (
                <Badge key={index} variant="outline">{role}</Badge>
              ))}
            </div>
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Close
          </Button>
          <Button onClick={() => onOpenChange(false)}>
            Apply
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CompanyDetail;
