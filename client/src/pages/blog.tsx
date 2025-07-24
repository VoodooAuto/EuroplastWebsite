import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Calendar, User, ArrowRight } from "lucide-react";
import type { BlogPost } from "@shared/schema";

export default function Blog() {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string>("");

  const { data: blogPosts, isLoading, error } = useQuery<BlogPost[]>({
    queryKey: ["/api/blog"],
  });

  const filteredPosts = blogPosts?.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !categoryFilter || post.category === categoryFilter;
    return matchesSearch && matchesCategory;
  }) || [];

  const categories = Array.from(new Set(blogPosts?.map(post => post.category).filter(Boolean))) || [];

  const clearFilters = () => {
    setSearchTerm("");
    setCategoryFilter("");
  };

  if (error) {
    return (
      <div className="relative flex size-full min-h-screen flex-col bg-white">
        <Header />
        <main className="flex-1 section-padding py-20">
          <div className="container-content">
            <div className="text-center">
              <h1 className="text-3xl font-bold europlast-dark mb-4">Error Loading Blog</h1>
              <p className="europlast-gray">Unable to load blog posts. Please try again later.</p>
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
              Industry Insights & News
            </h1>
            <p className="text-lg europlast-gray max-w-3xl mx-auto">
              Stay informed with the latest trends, innovations, and regulatory updates 
              in the packaging industry. Our experts share insights on sustainability, 
              technology, and best practices.
            </p>
          </div>
        </section>

        {/* Search and Filters */}
        <section className="section-padding py-8 bg-white border-b border-gray-200">
          <div className="container-content">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 europlast-gray h-4 w-4" />
                <Input
                  placeholder="Search articles..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-full lg:w-48">
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Categories</SelectItem>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category.charAt(0).toUpperCase() + category.slice(1).replace('-', ' ')}
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
            {(categoryFilter || searchTerm) && (
              <div className="flex gap-2 flex-wrap mt-4">
                {categoryFilter && (
                  <Badge variant="secondary">
                    Category: {categoryFilter.charAt(0).toUpperCase() + categoryFilter.slice(1).replace('-', ' ')}
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

        {/* Blog Posts */}
        <section className="section-padding py-16">
          <div className="container-content">
            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[...Array(6)].map((_, i) => (
                  <Card key={i} className="animate-pulse">
                    <div className="w-full aspect-video bg-gray-200 rounded-t-lg"></div>
                    <CardContent className="p-6">
                      <div className="h-4 bg-gray-200 rounded mb-2"></div>
                      <div className="h-6 bg-gray-200 rounded mb-4"></div>
                      <div className="h-3 bg-gray-200 rounded mb-2 w-3/4"></div>
                      <div className="h-3 bg-gray-200 rounded mb-4 w-1/2"></div>
                      <div className="h-8 bg-gray-200 rounded"></div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : filteredPosts.length > 0 ? (
              <>
                <div className="flex justify-between items-center mb-8">
                  <h2 className="text-2xl font-bold europlast-dark">
                    {filteredPosts.length} Article{filteredPosts.length !== 1 ? 's' : ''} Found
                  </h2>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filteredPosts.map((post) => (
                    <Card key={post.id} className="group hover:shadow-lg transition-shadow duration-300">
                      {post.imageUrl && (
                        <div 
                          className="w-full aspect-video bg-cover bg-center rounded-t-lg"
                          style={{ backgroundImage: `url("${post.imageUrl}")` }}
                        />
                      )}
                      <CardContent className="p-6">
                        <div className="flex items-center gap-2 mb-3">
                          {post.category && (
                            <Badge variant="secondary" className="capitalize">
                              {post.category.replace('-', ' ')}
                            </Badge>
                          )}
                          {post.publishedAt && (
                            <div className="flex items-center text-xs europlast-gray">
                              <Calendar className="h-3 w-3 mr-1" />
                              {new Date(post.publishedAt).toLocaleDateString()}
                            </div>
                          )}
                        </div>
                        
                        <h3 className="text-lg font-bold europlast-dark mb-3 group-hover:europlast-primary transition-colors">
                          {post.title}
                        </h3>
                        
                        <p className="europlast-gray text-sm mb-4 line-clamp-3">
                          {post.excerpt}
                        </p>
                        
                        <div className="flex items-center justify-between">
                          {post.authorName && (
                            <div className="flex items-center text-xs europlast-gray">
                              <User className="h-3 w-3 mr-1" />
                              {post.authorName}
                            </div>
                          )}
                          
                          <Link href={`/blog/${post.slug}`}>
                            <Button 
                              variant="ghost" 
                              size="sm"
                              className="group-hover:europlast-primary group-hover:bg-blue-50 transition-colors"
                            >
                              Read More
                              <ArrowRight className="h-4 w-4 ml-1" />
                            </Button>
                          </Link>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </>
            ) : (
              <div className="text-center py-12">
                <h3 className="text-xl font-semibold europlast-dark mb-2">
                  No Articles Found
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

        {/* Newsletter Signup */}
        <section className="section-padding py-16 europlast-light-bg">
          <div className="container-content">
            <Card className="europlast-primary-bg text-white">
              <CardContent className="p-8 text-center">
                <h2 className="text-2xl font-bold mb-4">Stay Updated</h2>
                <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
                  Subscribe to our newsletter for the latest industry insights, product updates, 
                  and packaging innovations delivered to your inbox.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                  <Input 
                    placeholder="Enter your email" 
                    className="bg-white text-gray-900"
                  />
                  <Button variant="secondary" className="whitespace-nowrap">
                    Subscribe
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
