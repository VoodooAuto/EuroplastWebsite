import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import Hero from "@/components/sections/hero";
import ProductCategories from "@/components/sections/product-categories";
import IndustriesServed from "@/components/sections/industries-served";
import AboutSection from "@/components/sections/about-section";
import Testimonials from "@/components/sections/testimonials";
import ResourcesSection from "@/components/sections/resources-section";
import BlogPreview from "@/components/sections/blog-preview";
import ContactSection from "@/components/sections/contact-section";

export default function Home() {
  return (
    <div className="relative flex size-full min-h-screen flex-col bg-white group/design-root overflow-x-hidden font-sans">
      <div className="layout-container flex h-full grow flex-col">
        <Header />
        <main className="flex-1">
          <Hero />
          <ProductCategories />
          <IndustriesServed />
          <AboutSection />
          <Testimonials />
          <ResourcesSection />
          <BlogPreview />
          <ContactSection />
        </main>
        <Footer />
      </div>
    </div>
  );
}
