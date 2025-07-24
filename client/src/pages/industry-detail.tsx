import { useParams, Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import ProductCard from "@/components/product-card";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, CheckCircle, Building, Pill, ShoppingCart, Car } from "lucide-react";
import type { Industry, Product } from "@shared/schema";

const industryIcons = {
  pharmaceutical: Pill,
  food: ShoppingCart,
  electronics: Building,
  automotive: Car,
};

export default function IndustryDetail() {
  const { slug } = useParams<{ slug: string }>();
  
  const { data: industry, isLoading: industryLoading, error: industryError } = useQuery<Industry>({
    queryKey: ["/api/industries", slug],
  });

  const { data: products, isLoading: productsLoading } = useQuery<Product[]>({
    queryKey: ["/api/products"],
  });

  // Filter products relevant to this industry (you might want to add industry field to products)
  const relevantProducts = products?.filter(product => 
    industry?.typicalProducts?.some(typicalProduct => 
      product.name.toLowerCase().includes(typicalProduct.toLowerCase()) ||
      product.description?.toLowerCase().includes(typicalProduct.toLowerCase())
    )
  ) || [];

  if (industryError) {
    return (
      <div className="relative flex size-full min-h-screen flex-col bg-white">
        <Header />
        <main className="flex-1 section-padding py-20">
          <div className="container-content text-center">
            <h1 className="text-3xl font-bold europlast-dark mb-4">Industry Not Found</h1>
            <p className="europlast-gray mb-6">The industry you're looking for doesn't exist.</p>
            <Link href="/industries">
              <Button>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Industries
              </Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (industryLoading) {
    return (
      <div className="relative flex size-full min-h-screen flex-col bg-white">
        <Header />
        <main className="flex-1 section-padding py-20">
          <div className="container-content">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-200 rounded mb-4 w-1/4"></div>
              <div className="h-12 bg-gray-200 rounded mb-6 w-1/2"></div>
              <div className="h-4 bg-gray-200 rounded mb-2 w-full"></div>
              <div className="h-4 bg-gray-200 rounded mb-8 w-3/4"></div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!industry) {
    return (
      <div className="relative flex size-full min-h-screen flex-col bg-white">
        <Header />
        <main className="flex-1 section-padding py-20">
          <div className="container-content text-center">
            <h1 className="text-3xl font-bold europlast-dark mb-4">Industry Not Found</h1>
            <p className="europlast-gray mb-6">The industry you're looking for doesn't exist.</p>
            <Link href="/industries">
              <Button>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Industries
              </Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const IconComponent = industryIcons[industry.iconName as keyof typeof industryIcons] || Building;

  return (
    <div className="relative flex size-full min-h-screen flex-col bg-white">
      <Header />
      <main className="flex-1">
        {/* Breadcrumb */}
        <section className="section-padding py-6 border-b border-gray-200">
          <div className="container-content">
            <div className="flex items-center space-x-2 text-sm europlast-gray">
              <Link href="/" className="hover:europlast-primary">Home</Link>
              <span>/</span>
              <Link href="/industries" className="hover:europlast-primary">Industries</Link>
              <span>/</span>
              <span className="europlast-dark">{industry.name}</span>
            </div>
          </div>
        </section>

        {/* Industry Header */}
        <section className="section-padding py-16 europlast-light-bg">
          <div className="container-content">
            <div className="flex items-center gap-6 mb-8">
              <div className="europlast-primary p-4 rounded-lg bg-white shadow-sm">
                <IconComponent className="h-8 w-8" />
              </div>
              <div>
                <h1 className="text-4xl font-bold europlast-dark mb-4">
                  {industry.name}
                </h1>
                <p className="text-lg europlast-gray">
                  {industry.description}
                </p>
              </div>
            </div>

            {industry.imageUrl && (
              <div 
                className="w-full h-64 bg-cover bg-center rounded-lg"
                style={{ backgroundImage: `url("${industry.imageUrl}")` }}
              />
            )}
          </div>
        </section>

        {/* Industry Overview */}
        <section className="section-padding py-16">
          <div className="container-content">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-8">
                {/* Overview */}
                <div>
                  <h2 className="text-2xl font-bold europlast-dark mb-4">Industry Overview</h2>
                  <p className="europlast-gray leading-relaxed">
                    {industry.overview || industry.description}
                  </p>
                </div>

                {/* Case Studies */}
                {industry.caseStudies && industry.caseStudies.length > 0 && (
                  <div>
                    <h2 className="text-2xl font-bold europlast-dark mb-6">Success Stories</h2>
                    <div className="space-y-6">
                      {industry.caseStudies.map((caseStudy, index) => (
                        <Card key={index}>
                          <CardHeader>
                            <CardTitle className="text-lg">{caseStudy.title}</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <p className="europlast-gray mb-4">{caseStudy.description}</p>
                            <div className="p-4 europlast-light-bg rounded-lg">
                              <h4 className="font-semibold europlast-dark mb-2">Results:</h4>
                              <p className="text-sm europlast-gray">{caseStudy.results}</p>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Key Benefits */}
                {industry.keyBenefits && industry.keyBenefits.length > 0 && (
                  <Card>
                    <CardHeader>
                      <CardTitle>Key Benefits</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-3">
                        {industry.keyBenefits.map((benefit, index) => (
                          <li key={index} className="flex items-start space-x-2">
                            <CheckCircle className="h-5 w-5 europlast-primary flex-shrink-0 mt-0.5" />
                            <span className="text-sm europlast-dark">{benefit}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                )}

                {/* Typical Products */}
                {industry.typicalProducts && industry.typicalProducts.length > 0 && (
                  <Card>
                    <CardHeader>
                      <CardTitle>Our Solutions</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2">
                        {industry.typicalProducts.map((product, index) => (
                          <Badge key={index} variant="secondary">
                            {product}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* CTA */}
                <Card className="europlast-primary-bg text-white">
                  <CardContent className="p-6 text-center">
                    <h3 className="font-bold mb-2">Need a Custom Solution?</h3>
                    <p className="text-blue-100 text-sm mb-4">
                      Our experts can help design the perfect packaging solution for your specific requirements.
                    </p>
                    <Link href="/contact">
                      <Button variant="secondary" className="w-full">
                        Contact Our Team
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Relevant Products */}
        {relevantProducts.length > 0 && (
          <section className="section-padding py-16 europlast-light-bg">
            <div className="container-content">
              <div className="text-center mb-12">
                <h2 className="text-2xl font-bold europlast-dark mb-4">
                  Recommended Products for {industry.name}
                </h2>
                <p className="europlast-gray">
                  Explore our specialized packaging solutions designed for the {industry.name.toLowerCase()} industry.
                </p>
              </div>

              {productsLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="bg-white rounded-lg shadow-sm p-6 animate-pulse">
                      <div className="w-full aspect-square bg-gray-200 rounded-lg mb-4"></div>
                      <div className="h-4 bg-gray-200 rounded mb-2"></div>
                      <div className="h-3 bg-gray-200 rounded mb-4 w-3/4"></div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {relevantProducts.slice(0, 6).map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              )}

              <div className="text-center mt-8">
                <Link href="/products">
                  <Button variant="outline" size="lg">
                    View All Products
                  </Button>
                </Link>
              </div>
            </div>
          </section>
        )}
      </main>
      <Footer />
    </div>
  );
}
