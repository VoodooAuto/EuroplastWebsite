import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Search, Download, FileText, Shield, Award, BookOpen } from "lucide-react";
import type { Resource } from "@shared/schema";

const resourceIcons = {
  brochure: FileText,
  certificate: Shield,
  datasheet: Download,
  "case-study": BookOpen,
};

const resourceCategories = {
  "all": "All Categories",
  "general": "General",
  "product-specific": "Product Specific",
  "compliance": "Compliance & Certifications",
};

const resourceTypes = {
  "all": "All Types",
  "brochure": "Brochures",
  "certificate": "Certificates", 
  "datasheet": "Data Sheets",
  "case-study": "Case Studies",
};

export default function Resources() {
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");

  // Build query parameters
  const queryParams = new URLSearchParams();
  if (typeFilter && typeFilter !== "all") {
    queryParams.set("type", typeFilter);
  }
  const queryString = queryParams.toString();
  const apiUrl = `/api/resources${queryString ? `?${queryString}` : ''}`;

  const { data: resources, isLoading, error } = useQuery<Resource[]>({
    queryKey: [apiUrl],
  });

  const filteredResources = resources?.filter(resource => {
    const matchesSearch = resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         resource.description?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === "all" || resource.category === categoryFilter;
    return matchesSearch && matchesCategory;
  }) || [];

  const clearFilters = () => {
    setSearchTerm("");
    setTypeFilter("all");
    setCategoryFilter("all");
  };

  if (error) {
    return (
      <div className="relative flex size-full min-h-screen flex-col bg-white">
        <Header />
        <main className="flex-1 section-padding py-20">
          <div className="container-content">
            <div className="text-center">
              <h1 className="text-3xl font-bold europlast-dark mb-4">Error Loading Resources</h1>
              <p className="europlast-gray">Unable to load resources. Please try again later.</p>
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
              Resources & Downloads
            </h1>
            <p className="text-lg europlast-gray max-w-3xl mx-auto">
              Access our comprehensive library of technical documentation, product catalogs, 
              certifications, and industry insights. All resources are available for immediate download.
            </p>
          </div>
        </section>

        {/* Search and Filters */}
        <section className="section-padding py-8 bg-white border-b border-gray-200">
          <div className="container-content">
            <div className="flex flex-col lg:flex-row gap-4 mb-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 europlast-gray h-4 w-4" />
                <Input
                  placeholder="Search resources..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger className="w-full lg:w-48">
                  <SelectValue placeholder="All Types" />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(resourceTypes).map(([value, label]) => (
                    <SelectItem key={value} value={value}>
                      {label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-full lg:w-48">
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(resourceCategories).map(([value, label]) => (
                    <SelectItem key={value} value={value}>
                      {label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button 
                variant="outline" 
                onClick={clearFilters}
                className="whitespace-nowrap"
              >
                Clear Filters
              </Button>
            </div>

            {/* Active Filters */}
            {(typeFilter !== "all" || categoryFilter !== "all" || searchTerm) && (
              <div className="flex gap-2 flex-wrap">
                {typeFilter && typeFilter !== "all" && (
                  <Badge variant="secondary">
                    Type: {resourceTypes[typeFilter as keyof typeof resourceTypes]}
                  </Badge>
                )}
                {categoryFilter && categoryFilter !== "all" && (
                  <Badge variant="secondary">
                    Category: {resourceCategories[categoryFilter as keyof typeof resourceCategories]}
                  </Badge>
                )}
                {searchTerm && (
                  <Badge variant="secondary">
                    Search: "{searchTerm}"
                  </Badge>
                )}
              </div>
            )}
          </div>
        </section>

        {/* Resources Grid */}
        <section className="section-padding py-16">
          <div className="container-content">
            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
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
            ) : filteredResources.length > 0 ? (
              <>
                <div className="flex justify-between items-center mb-8">
                  <h2 className="text-2xl font-bold europlast-dark">
                    {filteredResources.length} Resource{filteredResources.length !== 1 ? 's' : ''} Found
                  </h2>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredResources.map((resource) => {
                    const IconComponent = resourceIcons[resource.type as keyof typeof resourceIcons] || FileText;
                    
                    return (
                      <Card key={resource.id} className="group hover:shadow-lg transition-shadow duration-300">
                        <CardHeader className="pb-4">
                          <div className="flex items-start justify-between">
                            <div className="europlast-primary p-3 rounded-lg europlast-light-bg">
                              <IconComponent className="h-6 w-6" />
                            </div>
                            <div className="flex flex-col gap-1">
                              <Badge variant="secondary" className="capitalize text-xs">
                                {resource.type.replace('-', ' ')}
                              </Badge>
                              {resource.category && (
                                <Badge variant="outline" className="text-xs">
                                  {resource.category.replace('-', ' ')}
                                </Badge>
                              )}
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <CardTitle className="text-lg mb-2 group-hover:europlast-primary transition-colors">
                            {resource.title}
                          </CardTitle>
                          <p className="europlast-gray text-sm mb-4 leading-relaxed">
                            {resource.description}
                          </p>
                          
                          <div className="flex items-center justify-between">
                            {resource.downloadCount !== undefined && (
                              <span className="text-xs europlast-gray">
                                {resource.downloadCount} downloads
                              </span>
                            )}
                            <Button 
                              size="sm"
                              className="europlast-primary-bg text-white hover:bg-blue-700 transition-colors"
                            >
                              <Download className="h-4 w-4 mr-2" />
                              Download
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </>
            ) : (
              <div className="text-center py-12">
                <FileText className="h-16 w-16 europlast-gray mx-auto mb-4" />
                <h3 className="text-xl font-semibold europlast-dark mb-2">
                  No Resources Found
                </h3>
                <p className="europlast-gray mb-4">
                  Try adjusting your search criteria or clearing the filters.
                </p>
                <Button onClick={clearFilters} variant="outline">
                  Clear All Filters
                </Button>
              </div>
            )}
          </div>
        </section>

        {/* Featured Categories */}
        <section className="section-padding py-16 europlast-light-bg">
          <div className="container-content">
            <h2 className="text-2xl font-bold europlast-dark mb-8 text-center">
              Browse by Category
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="text-center hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="p-6">
                  <FileText className="h-12 w-12 europlast-primary mx-auto mb-4" />
                  <h3 className="font-bold europlast-dark mb-2">Product Catalogs</h3>
                  <p className="text-sm europlast-gray">Complete product specifications and application guides</p>
                </CardContent>
              </Card>
              
              <Card className="text-center hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="p-6">
                  <Shield className="h-12 w-12 europlast-primary mx-auto mb-4" />
                  <h3 className="font-bold europlast-dark mb-2">Certifications</h3>
                  <p className="text-sm europlast-gray">ISO, RoHS, FDA certificates and compliance documents</p>
                </CardContent>
              </Card>
              
              <Card className="text-center hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="p-6">
                  <Download className="h-12 w-12 europlast-primary mx-auto mb-4" />
                  <h3 className="font-bold europlast-dark mb-2">Technical Data</h3>
                  <p className="text-sm europlast-gray">Detailed material properties and performance specifications</p>
                </CardContent>
              </Card>
              
              <Card className="text-center hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="p-6">
                  <BookOpen className="h-12 w-12 europlast-primary mx-auto mb-4" />
                  <h3 className="font-bold europlast-dark mb-2">Case Studies</h3>
                  <p className="text-sm europlast-gray">Real-world applications and success stories</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="section-padding py-16">
          <div className="container-content">
            <Card className="europlast-primary-bg text-white">
              <CardContent className="p-8 text-center">
                <h2 className="text-2xl font-bold mb-4">
                  Need Custom Documentation?
                </h2>
                <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
                  Can't find the specific technical information you need? Our team can provide 
                  custom documentation and technical support for your unique requirements.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button variant="secondary" size="lg">
                    Request Custom Documentation
                  </Button>
                  <Button variant="outline" size="lg" className="text-white border-white hover:bg-white hover:text-blue-600">
                    Contact Technical Support
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
