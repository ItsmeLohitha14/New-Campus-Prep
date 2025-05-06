
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  company: string;
  type: "technical" | "hr" | "aptitude";
}

interface FAQProps {
  faqs: FAQItem[];
}

const FAQ = ({ faqs }: FAQProps) => {
  const getTypeColor = (type: string) => {
    switch(type) {
      case "technical":
        return "bg-blue-100 text-blue-800";
      case "hr":
        return "bg-green-100 text-green-800";
      case "aptitude":
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <Accordion type="single" collapsible className="w-full">
      {faqs.map((faq) => (
        <AccordionItem key={faq.id} value={faq.id} className="border rounded-lg mb-3 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
          <AccordionTrigger className="px-4 py-3 hover:bg-muted/40 group">
            <div className="flex flex-col sm:flex-row w-full items-start sm:items-center gap-2 text-left">
              <span className="font-medium">{faq.question}</span>
              <div className="flex gap-2 ml-auto">
                <Badge variant="outline" className="text-xs">{faq.company}</Badge>
                <Badge className={`text-xs ${getTypeColor(faq.type)}`}>{faq.type}</Badge>
              </div>
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-4 py-3 bg-muted/20">
            <p className="text-muted-foreground whitespace-pre-line">{faq.answer}</p>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
};

export default FAQ;
