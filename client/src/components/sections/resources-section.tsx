import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Shield, Download, Award } from "lucide-react";
import type { Resource } from "@shared/schema";

const resourceIcons = {
  brochure: FileText,
  certificate: Shield,
  datasheet: Download,
  "case-study": Award,
};

export default function ResourcesSection() {
  const { data: resources, isLoading } = useQuery<Resource[]>({
    queryKey: ["/api/resources"],
  });

  if (isLoading) {
    return (
      <section className="section-padding flex flex-1 justify-center py-5 europlast-light-bg">
        <div className="layout-content-container flex flex-col container-content flex-1">
          <h2 className="text-[#111418] text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">
            Resources & Downloads
          </h2>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-4 p-4">
            {[...Array(3)].map((_, i) => (
              <Card key={i} className="animate-pulse">
                <CardContent className="p-6">
                  <div className="w-8 h-8 bg-gray-200 rounded mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded mb-4 w-3/4"></div>
                  <div className="h-8 bg-gray-200 rounded"></div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    );
  }

  const featuredResources = resources?.slice(0, 4) || [];

  return (
    <section className="section-padding flex flex-1 justify-center py-5 europlast-light-bg">
      <div className="layout-content-container flex flex-col container-content flex-1">
        <h2 className="text-[#111418] text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">
          Resources & Downloads
        </h2>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-4 p-4">
          {featuredResources.map((resource) => {
            const IconComponent = resourceIcons[resource.type as keyof typeof resourceIcons] || FileText;
            
            return (
              <Card key={resource.id} className="bg-white shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="text-[#1672ce] mb-4">
                    <IconComponent className="h-8 w-8" />
                  </div>
                  <h3 className="text-[#111418] text-base font-bold leading-normal mb-2">
                    {resource.title}
                  </h3>
                  <p className="text-[#637588] text-sm font-normal leading-normal mb-4">
                    {resource.description}
                  </p>
                  <Button 
                    variant="link" 
                    className="p-0 h-auto text-[#1672ce] hover:text-blue-700 transition-colors"
                  >
                    Download PDF →
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
        
        {resources && resources.length > 4 && (
          <div className="text-center p-4">
            <Link href="/resources">
              <Button variant="outline">
                View All Resources
              </Button>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
