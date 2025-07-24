import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import ProductCard from "@/components/product-card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search } from "lucide-react";
import type { Product } from "@shared/schema";

export default function Products() {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string>("");
  const [materialFilter, setMaterialFilter] = useState<string>("");

  const { data: products, isLoading, error } = useQuery<Product[]>({
    queryKey: ["/api/products", categoryFilter, materialFilter],
  });

  const filteredProducts = products?.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.description?.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  const categoryOptions = [
    { value: "", label: "All Categories" },
    { value: "thermoformed-trays", label: "Thermoformed Trays" },
    { value: "plastic-sheets", label: "Plastic Sheets" },
    { value: "blister-packaging", label: "Blister Packaging" },
    { value: "custom-solutions", label: "Custom Solutions" },
  ];

  const materialOptions = [
    { value: "", label: "All Materials" },
    { value: "PET", label: "PET" },
    { value: "PP", label: "PP" },
    { value: "PS", label: "PS" },
    { value: "PVC/PVDC", label: "PVC/PVDC" },
  ];

  const clearFilters = () => {
    setSearchTerm("");
    setCategoryFilter("");
    setMaterialFilter("");
  };

  if (error) {
    return (
      <div className="relative flex size-full min-h-screen flex-col bg-white">
        <Header />
        <main className="flex-1 section-padding py-20">
          <div className="container-content">
            <div className="text-center">
              <h1 className="text-3xl font-bold europlast-dark mb-4">Error Loading Products</h1>
              <p className="europlast-gray">Unable to load products. Please try again later.</p>
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
          <div className="container-content">
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold europlast-dark mb-4">
                Our Product Portfolio
              </h1>
              <p className="text-lg europlast-gray max-w-2xl mx-auto">
                Discover our comprehensive range of thermoformed packaging solutions, 
                designed to meet the demanding requirements of modern industries.
              </p>
            </div>

            {/* Search and Filters */}
            <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
              <div className="flex flex-col lg:flex-row gap-4 mb-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 europlast-gray h-4 w-4" />
                  <Input
                    placeholder="Search products..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                  <SelectTrigger className="w-full lg:w-48">
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categoryOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select value={materialFilter} onValueChange={setMaterialFilter}>
                  <SelectTrigger className="w-full lg:w-48">
                    <SelectValue placeholder="Material" />
                  </SelectTrigger>
                  <SelectContent>
                    {materialOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
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
              <div className="flex gap-2 flex-wrap">
                {categoryFilter && (
                  <Badge variant="secondary" className="flex items-center gap-1">
                    Category: {categoryOptions.find(o => o.value === categoryFilter)?.label}
                  </Badge>
                )}
                {materialFilter && (
                  <Badge variant="secondary" className="flex items-center gap-1">
                    Material: {materialFilter}
                  </Badge>
                )}
                {searchTerm && (
                  <Badge variant="secondary" className="flex items-center gap-1">
                    Search: "{searchTerm}"
                  </Badge>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Products Grid */}
        <section className="section-padding py-12">
          <div className="container-content">
            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="bg-white rounded-lg shadow-sm p-6 animate-pulse">
                    <div className="w-full aspect-square bg-gray-200 rounded-lg mb-4"></div>
                    <div className="h-4 bg-gray-200 rounded mb-2"></div>
                    <div className="h-3 bg-gray-200 rounded mb-4 w-3/4"></div>
                    <div className="h-8 bg-gray-200 rounded"></div>
                  </div>
                ))}
              </div>
            ) : filteredProducts.length > 0 ? (
              <>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold europlast-dark">
                    {filteredProducts.length} Products Found
                  </h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              </>
            ) : (
              <div className="text-center py-12">
                <h3 className="text-xl font-semibold europlast-dark mb-2">
                  No Products Found
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
      </main>
      <Footer />
    </div>
  );
}
