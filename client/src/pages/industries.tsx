import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, Building, Pill, ShoppingCart, Car } from "lucide-react";
import type { Industry } from "@shared/schema";

const industryIcons = {
  pharmaceutical: Pill,
  food: ShoppingCart,
  electronics: Building,
  automotive: Car,
};

export default function Industries() {
  const { data: industries, isLoading, error } = useQuery<Industry[]>({
    queryKey: ["/api/industries"],
  });

  if (error) {
    return (
      <div className="relative flex size-full min-h-screen flex-col bg-white">
        <Header />
        <main className="flex-1 section-padding py-20">
          <div className="container-content">
            <div className="text-center">
              <h1 className="text-3xl font-bold europlast-dark mb-4">Error Loading Industries</h1>
              <p className="europlast-gray">Unable to load industry information. Please try again later.</p>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="relative flex size-full min-h-screen flex-col bg-white">
      <Header />
      <main className="flex-1">
        {/* Page Header */}
        <section className="section-padding py-20 europlast-light-bg">
          <div className="container-content text-center">
            <h1 className="text-4xl font-bold europlast-dark mb-6">
              Industries We Serve
            </h1>
            <p className="text-lg europlast-gray max-w-3xl mx-auto">
              EuroPlast delivers specialized packaging solutions across diverse industries, 
              each with unique requirements for quality, compliance, and performance. 
              Discover how our expertise can benefit your sector.
            </p>
          </div>
        </section>

        {/* Industries Grid */}
        <section className="section-padding py-16">
          <div className="container-content">
            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {[...Array(4)].map((_, i) => (
                  <Card key={i} className="animate-pulse">
                    <CardContent className="p-8">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-12 h-12 bg-gray-200 rounded"></div>
                        <div className="h-6 bg-gray-200 rounded w-1/3"></div>
                      </div>
                      <div className="space-y-2 mb-4">
                        <div className="h-4 bg-gray-200 rounded w-full"></div>
                        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                      </div>
                      <div className="h-8 bg-gray-200 rounded w-1/4"></div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : industries && industries.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {industries.map((industry) => {
                  const IconComponent = industryIcons[industry.iconName as keyof typeof industryIcons] || Building;
                  
                  return (
                    <Card key={industry.id} className="group hover:shadow-lg transition-shadow duration-300">
                      <CardContent className="p-8">
                        {/* Header */}
                        <div className="flex items-center gap-4 mb-6">
                          <div className="europlast-primary p-3 rounded-lg europlast-light-bg">
                            <IconComponent className="h-6 w-6" />
                          </div>
                          <h2 className="text-xl font-bold europlast-dark">{industry.name}</h2>
                        </div>

                        {/* Description */}
                        <p className="europlast-gray mb-6 leading-relaxed">
                          {industry.description}
                        </p>

                        {/* Key Benefits Preview */}
                        {industry.keyBenefits && industry.keyBenefits.length > 0 && (
                          <div className="mb-6">
                            <h3 className="font-semibold europlast-dark mb-3">Key Benefits:</h3>
                            <div className="flex flex-wrap gap-2">
                              {industry.keyBenefits.slice(0, 3).map((benefit, index) => (
                                <Badge key={index} variant="secondary" className="text-xs">
                                  {benefit}
                                </Badge>
                              ))}
                              {industry.keyBenefits.length > 3 && (
                                <Badge variant="outline" className="text-xs">
                                  +{industry.keyBenefits.length - 3} more
                                </Badge>
                              )}
                            </div>
                          </div>
                        )}

                        {/* Typical Products */}
                        {industry.typicalProducts && industry.typicalProducts.length > 0 && (
                          <div className="mb-6">
                            <h3 className="font-semibold europlast-dark mb-3">Solutions:</h3>
                            <ul className="list-disc list-inside space-y-1 europlast-gray text-sm">
                              {industry.typicalProducts.slice(0, 3).map((product, index) => (
                                <li key={index}>{product}</li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {/* CTA */}
                        <Link href={`/industries/${industry.slug}`}>
                          <Button className="w-full group-hover:europlast-primary-bg group-hover:text-white transition-colors">
                            Learn More
                            <ArrowRight className="h-4 w-4 ml-2" />
                          </Button>
                        </Link>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-12">
                <h3 className="text-xl font-semibold europlast-dark mb-2">
                  No Industries Found
                </h3>
                <p className="europlast-gray">
                  Industry information is currently unavailable.
                </p>
              </div>
            )}
          </div>
        </section>

        {/* CTA Section */}
        <section className="section-padding py-16 europlast-light-bg">
          <div className="container-content text-center">
            <h2 className="text-2xl font-bold europlast-dark mb-4">
              Don't See Your Industry?
            </h2>
            <p className="europlast-gray mb-8 max-w-2xl mx-auto">
              We work with businesses across many sectors. Contact us to discuss 
              how our packaging solutions can be tailored to your specific industry requirements.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <Button size="lg">
                  Contact Our Experts
                </Button>
              </Link>
              <Link href="/products">
                <Button variant="outline" size="lg">
                  Browse All Products
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
