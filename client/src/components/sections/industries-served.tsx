import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Pill, ShoppingCart, Building, Car } from "lucide-react";
import type { Industry } from "@shared/schema";

const industryIcons = {
  pharmaceutical: Pill,
  food: ShoppingCart,
  electronics: Building,
  automotive: Car,
};

export default function IndustriesServed() {
  const { data: industries, isLoading } = useQuery<Industry[]>({
    queryKey: ["/api/industries"],
  });

  if (isLoading) {
    return (
      <section className="section-padding flex flex-1 justify-center py-5">
        <div className="layout-content-container flex flex-col container-content flex-1">
          <h2 className="text-[#111418] text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">
            Industries We Serve
          </h2>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-4 p-4">
            {[...Array(4)].map((_, i) => (
              <Card key={i} className="animate-pulse">
                <CardContent className="p-4">
                  <div className="w-8 h-8 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded mb-2 w-3/4"></div>
                  <div className="h-3 bg-gray-200 rounded w-full"></div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="section-padding flex flex-1 justify-center py-5">
      <div className="layout-content-container flex flex-col container-content flex-1">
        <h2 className="text-[#111418] text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">
          Industries We Serve
        </h2>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-4 p-4">
          {industries?.map((industry) => {
            const IconComponent = industryIcons[industry.iconName as keyof typeof industryIcons] || Building;
            
            return (
              <Link key={industry.id} href={`/industries/${industry.slug}`}>
                <Card className="border border-[#dce0e5] bg-white hover:shadow-md transition-shadow cursor-pointer group">
                  <CardContent className="p-4">
                    <div className="text-[#1672ce] mb-2">
                      <IconComponent className="h-8 w-8" />
                    </div>
                    <div className="flex flex-col gap-1">
                      <h3 className="text-[#111418] text-base font-bold leading-tight group-hover:text-[#1672ce] transition-colors">
                        {industry.name}
                      </h3>
                      <p className="text-[#637588] text-sm font-normal leading-normal">
                        {industry.description}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
