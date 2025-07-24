import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import type { Testimonial } from "@shared/schema";

export default function Testimonials() {
  const { data: testimonials, isLoading } = useQuery<Testimonial[]>({
    queryKey: ["/api/testimonials"],
  });

  if (isLoading) {
    return (
      <section className="section-padding flex flex-1 justify-center py-5">
        <div className="layout-content-container flex flex-col container-content flex-1">
          <h2 className="text-[#111418] text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">
            Customer Testimonials
          </h2>
          <div className="flex flex-col gap-8 p-4">
            {[...Array(2)].map((_, i) => (
              <Card key={i} className="animate-pulse">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
                    <div className="flex-1">
                      <div className="h-4 bg-gray-200 rounded mb-1"></div>
                      <div className="h-3 bg-gray-200 rounded w-3/4"></div>
                    </div>
                  </div>
                  <div className="h-3 bg-gray-200 rounded mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded w-2/3"></div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (!testimonials || testimonials.length === 0) {
    return null;
  }

  return (
    <section className="section-padding flex flex-1 justify-center py-5">
      <div className="layout-content-container flex flex-col container-content flex-1">
        <h2 className="text-[#111418] text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">
          Customer Testimonials
        </h2>
        <div className="flex flex-col gap-8 overflow-x-hidden bg-white p-4">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.id} className="bg-white border border-[#dce0e5] rounded-lg">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div 
                    className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-12"
                    style={{
                      backgroundImage: testimonial.imageUrl 
                        ? `url("${testimonial.imageUrl}")` 
                        : 'url("https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=200")'
                    }}
                  />
                  <div className="flex-1">
                    <p className="text-[#111418] text-base font-medium leading-normal">
                      {testimonial.customerName}
                    </p>
                    <p className="text-[#637588] text-sm font-normal leading-normal">
                      {testimonial.customerTitle && `${testimonial.customerTitle}, `}{testimonial.company}
                    </p>
                  </div>
                </div>
                {testimonial.rating && (
                  <div className="flex gap-0.5 mb-2">
                    <div className="text-[#1672ce]">
                      {"★".repeat(testimonial.rating)}
                    </div>
                  </div>
                )}
                <p className="text-[#111418] text-base font-normal leading-normal">
                  "{testimonial.quote}"
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
