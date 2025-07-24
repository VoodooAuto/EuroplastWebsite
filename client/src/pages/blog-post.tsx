import { useParams, Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Calendar, User, Share2 } from "lucide-react";
import type { BlogPost } from "@shared/schema";

export default function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>();
  
  const { data: blogPost, isLoading, error } = useQuery<BlogPost>({
    queryKey: ["/api/blog", slug],
  });

  if (error) {
    return (
      <div className="relative flex size-full min-h-screen flex-col bg-white">
        <Header />
        <main className="flex-1 section-padding py-20">
          <div className="container-content text-center">
            <h1 className="text-3xl font-bold europlast-dark mb-4">Article Not Found</h1>
            <p className="europlast-gray mb-6">The article you're looking for doesn't exist.</p>
            <Link href="/blog">
              <Button>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Blog
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
              <div className="h-12 bg-gray-200 rounded mb-6 w-3/4"></div>
              <div className="aspect-video bg-gray-200 rounded-lg mb-8"></div>
              <div className="space-y-4">
                <div className="h-4 bg-gray-200 rounded w-full"></div>
                <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                <div className="h-4 bg-gray-200 rounded w-4/5"></div>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!blogPost) {
    return (
      <div className="relative flex size-full min-h-screen flex-col bg-white">
        <Header />
        <main className="flex-1 section-padding py-20">
          <div className="container-content text-center">
            <h1 className="text-3xl font-bold europlast-dark mb-4">Article Not Found</h1>
            <p className="europlast-gray mb-6">The article you're looking for doesn't exist.</p>
            <Link href="/blog">
              <Button>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Blog
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
              <Link href="/blog" className="hover:europlast-primary">Blog</Link>
              <span>/</span>
              <span className="europlast-dark">{blogPost.title}</span>
            </div>
          </div>
        </section>

        {/* Article Header */}
        <section className="section-padding py-12">
          <div className="container-content max-w-4xl">
            <div className="mb-8">
              <Link href="/blog">
                <Button variant="ghost" size="sm" className="mb-6">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Blog
                </Button>
              </Link>

              <div className="flex items-center gap-2 mb-4">
                {blogPost.category && (
                  <Badge variant="secondary" className="capitalize">
                    {blogPost.category.replace('-', ' ')}
                  </Badge>
                )}
                {blogPost.tags && blogPost.tags.map((tag) => (
                  <Badge key={tag} variant="outline" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>

              <h1 className="text-4xl font-bold europlast-dark mb-6">
                {blogPost.title}
              </h1>

              <div className="flex items-center justify-between flex-wrap gap-4 mb-8">
                <div className="flex items-center gap-6 text-sm europlast-gray">
                  {blogPost.authorName && (
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4" />
                      {blogPost.authorName}
                    </div>
                  )}
                  {blogPost.publishedAt && (
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      {new Date(blogPost.publishedAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </div>
                  )}
                </div>
                
                <Button variant="outline" size="sm">
                  <Share2 className="h-4 w-4 mr-2" />
                  Share
                </Button>
              </div>

              {blogPost.excerpt && (
                <p className="text-lg europlast-gray leading-relaxed mb-8">
                  {blogPost.excerpt}
                </p>
              )}
            </div>

            {/* Featured Image */}
            {blogPost.imageUrl && (
              <div 
                className="w-full aspect-video bg-cover bg-center rounded-lg mb-12"
                style={{ backgroundImage: `url("${blogPost.imageUrl}")` }}
              />
            )}

            {/* Article Content */}
            <div className="prose prose-lg max-w-none">
              <div className="europlast-dark leading-relaxed whitespace-pre-wrap">
                {blogPost.content}
              </div>
            </div>

            {/* Tags */}
            {blogPost.tags && blogPost.tags.length > 0 && (
              <div className="mt-12 pt-8 border-t border-gray-200">
                <h3 className="font-semibold europlast-dark mb-4">Tags:</h3>
                <div className="flex flex-wrap gap-2">
                  {blogPost.tags.map((tag) => (
                    <Badge key={tag} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>

        {/* CTA Section */}
        <section className="section-padding py-16 europlast-light-bg">
          <div className="container-content">
            <Card className="europlast-primary-bg text-white">
              <CardContent className="p-8 text-center">
                <h2 className="text-2xl font-bold mb-4">
                  Interested in Our Packaging Solutions?
                </h2>
                <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
                  Learn more about how EuroPlast can help with your specific packaging requirements.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link href="/products">
                    <Button variant="secondary" size="lg">
                      Explore Products
                    </Button>
                  </Link>
                  <Link href="/contact">
                    <Button variant="outline" size="lg" className="text-white border-white hover:bg-white hover:text-blue-600">
                      Contact Us
                    </Button>
                  </Link>
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
