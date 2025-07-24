import { useParams, Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import QuoteButton from "@/components/quote-button";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Download, CheckCircle } from "lucide-react";
import type { Product } from "@shared/schema";

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  
  const { data: product, isLoading, error } = useQuery<Product>({
    queryKey: [`/api/products/${id}`],
  });

  if (error) {
    return (
      <div className="relative flex size-full min-h-screen flex-col bg-white">
        <Header />
        <main className="flex-1 section-padding py-20">
          <div className="container-content text-center">
            <h1 className="text-3xl font-bold europlast-dark mb-4">Product Not Found</h1>
            <p className="europlast-gray mb-6">The product you're looking for doesn't exist.</p>
            <Link href="/products">
              <Button>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Products
              </Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="relative flex size-full min-h-screen flex-col bg-white">
        <Header />
        <main className="flex-1 section-padding py-20">
          <div className="container-content">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-200 rounded mb-4 w-1/4"></div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                <div className="aspect-square bg-gray-200 rounded-lg"></div>
                <div className="space-y-4">
                  <div className="h-8 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-200 rounded w-full"></div>
                  <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                </div>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="relative flex size-full min-h-screen flex-col bg-white">
        <Header />
        <main className="flex-1 section-padding py-20">
          <div className="container-content text-center">
            <h1 className="text-3xl font-bold europlast-dark mb-4">Product Not Found</h1>
            <p className="europlast-gray mb-6">The product you're looking for doesn't exist.</p>
            <Link href="/products">
              <Button>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Products
              </Button>
            </Link>
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
        {/* Breadcrumb */}
        <section className="section-padding py-6 border-b border-gray-200">
          <div className="container-content">
            <div className="flex items-center space-x-2 text-sm europlast-gray">
              <Link href="/" className="hover:europlast-primary">Home</Link>
              <span>/</span>
              <Link href="/products" className="hover:europlast-primary">Products</Link>
              <span>/</span>
              <span className="europlast-dark">{product.name}</span>
            </div>
          </div>
        </section>

        {/* Product Header */}
        <section className="section-padding py-12">
          <div className="container-content">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Product Image */}
              <div className="space-y-4">
                <div 
                  className="w-full aspect-square bg-cover bg-center rounded-lg"
                  style={{ backgroundImage: `url("${product.imageUrl}")` }}
                />
              </div>

              {/* Product Info */}
              <div className="space-y-6">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="secondary" className="capitalize">
                      {product.category.replace('-', ' ')}
                    </Badge>
                    {product.material && (
                      <Badge variant="outline">{product.material}</Badge>
                    )}
                  </div>
                  <h1 className="text-3xl font-bold europlast-dark mb-4">
                    {product.name}
                  </h1>
                  <p className="text-lg europlast-gray leading-relaxed">
                    {product.description}
                  </p>
                </div>

                {/* Key Specifications */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {product.dimensions && (
                    <div className="p-4 europlast-light-bg rounded-lg">
                      <h4 className="font-medium europlast-dark mb-1">Dimensions</h4>
                      <p className="text-sm europlast-gray">{product.dimensions}</p>
                    </div>
                  )}
                  {product.capacity && (
                    <div className="p-4 europlast-light-bg rounded-lg">
                      <h4 className="font-medium europlast-dark mb-1">Capacity</h4>
                      <p className="text-sm europlast-gray">{product.capacity}</p>
                    </div>
                  )}
                  {product.minimumOrderQuantity && (
                    <div className="p-4 europlast-light-bg rounded-lg">
                      <h4 className="font-medium europlast-dark mb-1">MOQ</h4>
                      <p className="text-sm europlast-gray">{product.minimumOrderQuantity.toLocaleString()} units</p>
                    </div>
                  )}
                  {product.material && (
                    <div className="p-4 europlast-light-bg rounded-lg">
                      <h4 className="font-medium europlast-dark mb-1">Material</h4>
                      <p className="text-sm europlast-gray">{product.material}</p>
                    </div>
                  )}
                </div>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <QuoteButton 
                    productId={product.id} 
                    productName={product.name}
                    className="flex-1"
                  />
                  {product.dataSheetUrl && (
                    <Button variant="outline" className="flex-1">
                      <Download className="h-4 w-4 mr-2" />
                      Download Datasheet
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Product Details Tabs */}
        <section className="section-padding py-12 europlast-light-bg">
          <div className="container-content">
            <Tabs defaultValue="features" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="features">Features & Benefits</TabsTrigger>
                <TabsTrigger value="applications">Applications</TabsTrigger>
                <TabsTrigger value="specifications">Technical Specs</TabsTrigger>
              </TabsList>
              
              <TabsContent value="features" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Key Features</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {product.features && product.features.length > 0 ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {product.features.map((feature, index) => (
                          <div key={index} className="flex items-center space-x-2">
                            <CheckCircle className="h-5 w-5 europlast-primary flex-shrink-0" />
                            <span className="europlast-dark">{feature}</span>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="europlast-gray">No features listed for this product.</p>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="applications" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Typical Applications</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {product.applications && product.applications.length > 0 ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                        {product.applications.map((application, index) => (
                          <Badge key={index} variant="secondary" className="justify-center py-2">
                            {application}
                          </Badge>
                        ))}
                      </div>
                    ) : (
                      <p className="europlast-gray">No applications listed for this product.</p>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="specifications" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Technical Specifications</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {product.specifications && Object.keys(product.specifications).length > 0 ? (
                      <div className="overflow-x-auto">
                        <table className="w-full">
                          <tbody className="divide-y divide-gray-200">
                            {Object.entries(product.specifications).map(([key, value]) => (
                              <tr key={key}>
                                <td className="py-3 pr-6 font-medium europlast-dark">{key}</td>
                                <td className="py-3 europlast-gray">{value}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    ) : (
                      <p className="europlast-gray">No technical specifications available for this product.</p>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </section>

        {/* CTA Section */}
        <section className="section-padding py-16">
          <div className="container-content">
            <div className="text-center bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg p-8">
              <h2 className="text-2xl font-bold europlast-dark mb-4">
                Ready to Get Started?
              </h2>
              <p className="europlast-gray mb-6 max-w-2xl mx-auto">
                Contact our technical sales team to discuss your specific requirements 
                and get a customized quote for {product.name}.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <QuoteButton 
                  productId={product.id} 
                  productName={product.name}
                />
                <Link href="/contact">
                  <Button variant="outline">
                    Contact Sales Team
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
