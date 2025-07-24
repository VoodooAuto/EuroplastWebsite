import { Link } from "wouter";
import { Button } from "@/components/ui/button";

export default function Hero() {
  return (
    <section className="section-padding flex flex-1 justify-center py-5">
      <div className="layout-content-container flex flex-col container-content flex-1">
        <div className="@container">
          <div className="@[480px]:p-4">
            <div 
              className="flex min-h-[480px] flex-col gap-6 bg-cover bg-center bg-no-repeat @[480px]:gap-8 @[480px]:rounded-lg items-start justify-end px-4 pb-10 @[480px]:px-10 hero-gradient"
              style={{
                backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0.4) 100%), url("https://images.unsplash.com/photo-1581094794329-c8112a89af12?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1920&h=1080")'
              }}
            >
              <div className="flex flex-col gap-2 text-left">
                <h1 className="text-white text-4xl font-black leading-tight tracking-[-0.033em] @[480px]:text-5xl @[480px]:font-black @[480px]:leading-tight @[480px]:tracking-[-0.033em]">
                  Europe's Premier Plastic Packaging Solutions
                </h1>
                <h2 className="text-white text-sm font-normal leading-normal @[480px]:text-base @[480px]:font-normal @[480px]:leading-normal">
                  EuroPlast Ltd. delivers innovative thermoformed packaging, eco-friendly plastic sheets, 
                  and custom solutions for pharmaceutical, food & beverage, and retail industries across Europe.
                </h2>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/products">
                  <Button 
                    size="lg"
                    className="bg-[#1672ce] text-white hover:bg-blue-700 transition-colors"
                  >
                    Explore Products
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button 
                    variant="secondary"
                    size="lg"
                    className="bg-white text-[#111418] hover:bg-gray-50 transition-colors"
                  >
                    Contact Sales
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
