
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Bell, Calendar, ChevronRight } from "lucide-react";
import { Button } from "./ui/button";

interface Update {
  id: string;
  title: string;
  content: string;
  date: string;
  isNew: boolean;
}

interface UpdatesProps {
  updates: Update[];
}

const Updates = ({ updates }: UpdatesProps) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Bell className="h-5 w-5 text-campus-purple" />
        <h3 className="text-xl font-semibold">Latest Updates</h3>
      </div>
      
      <div className="space-y-4">
        {updates.map((update) => (
          <Card key={update.id} className="relative overflow-hidden hover-lift card-shadow">
            {update.isNew && (
              <div className="absolute top-0 right-0">
                <Badge className="bg-campus-accent text-white rounded-bl-lg rounded-tr-lg rounded-br-none rounded-tl-none">
                  New
                </Badge>
              </div>
            )}
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <CardTitle className="text-lg">{update.title}</CardTitle>
                <Badge variant="outline" className="flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  {update.date}
                </Badge>
              </div>
              <CardDescription>{update.content}</CardDescription>
            </CardHeader>
            <CardContent className="pt-0">
              <Button variant="ghost" size="sm" className="text-campus-purple hover:text-campus-purple hover:bg-campus-purple/10 p-0 h-auto group">
                Read more 
                <ChevronRight className="h-4 w-4 ml-1 transition-transform group-hover:translate-x-1" />
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <div className="flex justify-center">
        <Button variant="outline" className="mt-4">
          View All Updates
        </Button>
      </div>
    </div>
  );
};

export default Updates;
