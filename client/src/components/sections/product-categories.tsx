import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import type { Product } from "@shared/schema";

export default function ProductCategories() {
  const { data: products, isLoading } = useQuery<Product[]>({
    queryKey: ["/api/products"],
  });

  // Group products by category
  const productCategories = products?.reduce((acc, product) => {
    if (!acc[product.category]) {
      acc[product.category] = [];
    }
    acc[product.category].push(product);
    return acc;
  }, {} as Record<string, Product[]>) || {};

  const categoryInfo = {
    "thermoformed-trays": {
      title: "Thermoformed Trays & Clamshells",
      description: "Precision-molded packaging for food and pharmaceutical applications with superior barrier properties.",
    },
    "plastic-sheets": {
      title: "Plastic Sheets (PET, PP, PS)",
      description: "High-quality plastic sheets for packaging fabrication and custom manufacturing applications.",
    },
    "blister-packaging": {
      title: "Blister Packaging",
      description: "Secure, tamper-evident blister packs for pharmaceuticals and consumer goods with excellent visibility.",
    },
    "custom-solutions": {
      title: "Custom OEM Solutions",
      description: "Tailored packaging solutions with in-house tooling, prototyping, and fast turnaround capabilities.",
    },
  };

  if (isLoading) {
    return (
      <section className="section-padding flex flex-1 justify-center py-5 europlast-light-bg">
        <div className="layout-content-container flex flex-col container-content flex-1">
          <h2 className="text-[#111418] text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">
            Our Product Range
          </h2>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-6 p-4">
            {[...Array(4)].map((_, i) => (
              <Card key={i} className="animate-pulse">
                <CardContent className="p-6">
                  <div className="w-full aspect-square bg-gray-200 rounded-lg mb-4"></div>
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

  return (
    <section className="section-padding flex flex-1 justify-center py-5 europlast-light-bg">
      <div className="layout-content-container flex flex-col container-content flex-1">
        <h2 className="text-[#111418] text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">
          Our Product Range
        </h2>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-6 p-4">
          {Object.entries(categoryInfo).map(([categoryKey, info]) => {
            const categoryProducts = productCategories[categoryKey] || [];
            const representativeProduct = categoryProducts[0];
            
            return (
              <Card key={categoryKey} className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow group">
                <CardContent className="p-6">
                  <div 
                    className="w-full bg-center bg-no-repeat aspect-square bg-cover rounded-lg mb-4"
                    style={{
                      backgroundImage: representativeProduct?.imageUrl 
                        ? `url("${representativeProduct.imageUrl}")` 
                        : 'url("https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=800")'
                    }}
                  />
                  <div>
                    <p className="text-[#111418] text-base font-bold leading-normal mb-2">
                      {info.title}
                    </p>
                    <p className="text-[#637588] text-sm font-normal leading-normal mb-4">
                      {info.description}
                    </p>
                    <Link href={`/products?category=${categoryKey}`}>
                      <Button 
                        variant="link" 
                        className="p-0 h-auto text-[#1672ce] hover:text-blue-700 transition-colors"
                      >
                        Learn More →
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
