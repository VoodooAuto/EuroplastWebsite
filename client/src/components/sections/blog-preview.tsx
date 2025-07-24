import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, User } from "lucide-react";
import type { BlogPost } from "@shared/schema";

export default function BlogPreview() {
  const { data: blogPosts, isLoading } = useQuery<BlogPost[]>({
    queryKey: ["/api/blog"],
  });

  if (isLoading) {
    return (
      <section className="section-padding flex flex-1 justify-center py-5">
        <div className="layout-content-container flex flex-col container-content flex-1">
          <div className="flex justify-between items-center px-4 pb-3 pt-5">
            <h2 className="text-[#111418] text-[22px] font-bold leading-tight tracking-[-0.015em]">
              Latest Insights
            </h2>
            <div className="h-4 bg-gray-200 rounded w-24"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4">
            {[...Array(2)].map((_, i) => (
              <Card key={i} className="animate-pulse">
                <div className="w-full aspect-video bg-gray-200"></div>
                <CardContent className="p-6">
                  <div className="h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded mb-4 w-3/4"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    );
  }

  const latestPosts = blogPosts?.slice(0, 2) || [];

  if (latestPosts.length === 0) {
    return null;
  }

  return (
    <section className="section-padding flex flex-1 justify-center py-5">
      <div className="layout-content-container flex flex-col container-content flex-1">
        <div className="flex justify-between items-center px-4 pb-3 pt-5">
          <h2 className="text-[#111418] text-[22px] font-bold leading-tight tracking-[-0.015em]">
            Latest Insights
          </h2>
          <Link href="/blog">
            <Button 
              variant="link" 
              className="text-[#1672ce] hover:text-blue-700 transition-colors"
            >
              View All Articles →
            </Button>
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4">
          {latestPosts.map((post) => (
            <Card key={post.id} className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow group">
              <div 
                className="w-full bg-center bg-no-repeat aspect-video bg-cover"
                style={{
                  backgroundImage: post.imageUrl 
                    ? `url("${post.imageUrl}")` 
                    : 'url("https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=450")'
                }}
              />
              <CardContent className="p-6">
                <h3 className="text-[#111418] text-lg font-bold leading-tight mb-2 group-hover:text-[#1672ce] transition-colors">
                  {post.title}
                </h3>
                <p className="text-[#637588] text-sm font-normal leading-normal mb-4">
                  {post.excerpt}
                </p>
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-4 text-xs text-[#637588]">
                    {post.publishedAt && (
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {new Date(post.publishedAt).toLocaleDateString()}
                      </div>
                    )}
                    {post.authorName && (
                      <div className="flex items-center gap-1">
                        <User className="h-3 w-3" />
                        {post.authorName}
                      </div>
                    )}
                  </div>
                  <Link href={`/blog/${post.slug}`}>
                    <Button 
                      variant="link" 
                      size="sm"
                      className="text-[#1672ce] hover:text-blue-700 transition-colors"
                    >
                      Read More →
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
