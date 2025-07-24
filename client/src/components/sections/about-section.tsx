import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Shield, Leaf, Award, CheckCircle } from "lucide-react";

const certifications = [
  {
    name: "ISO 9001:2015",
    icon: Shield,
  },
  {
    name: "RoHS Compliant",
    icon: Leaf,
  },
  {
    name: "CE Marking",
    icon: Award,
  },
  {
    name: "FDA Approved",
    icon: CheckCircle,
  },
];

export default function AboutSection() {
  return (
    <section className="section-padding flex flex-1 justify-center py-5 europlast-light-bg">
      <div className="layout-content-container flex flex-col container-content flex-1">
        <h2 className="text-[#111418] text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">
          About EuroPlast Ltd.
        </h2>
        <div className="flex flex-col lg:flex-row gap-8 p-4">
          <div className="flex-1">
            <p className="text-[#111418] text-base font-normal leading-normal pb-4">
              EuroPlast Ltd. is a leading manufacturer of thermoformed plastic packaging solutions, 
              serving clients across Europe for over two decades. Our mission is to deliver innovative, 
              sustainable, and precise packaging that meets the highest industry standards.
            </p>
            <p className="text-[#111418] text-base font-normal leading-normal pb-4">
              With state-of-the-art manufacturing capabilities and a commitment to sustainability, 
              EuroPlast is ISO-certified and RoHS compliant, ensuring quality and environmental 
              responsibility in every product we deliver.
            </p>
            <div className="flex gap-4 mt-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-[#1672ce]">20+</div>
                <div className="text-sm text-[#637588]">Years Experience</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-[#1672ce]">500+</div>
                <div className="text-sm text-[#637588]">Happy Clients</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-[#1672ce]">ISO</div>
                <div className="text-sm text-[#637588]">Certified</div>
              </div>
            </div>
            <div className="mt-6">
              <Link href="/about">
                <Button variant="outline">
                  Learn More About Us
                </Button>
              </Link>
            </div>
          </div>
          <div className="w-full lg:w-1/2">
            <div 
              className="w-full bg-center bg-no-repeat aspect-[4/3] bg-cover rounded-lg mb-4"
              style={{
                backgroundImage: 'url("https://images.unsplash.com/photo-1565793298595-6a879b1d9492?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600")'
              }}
            />
          </div>
        </div>

        {/* Certifications */}
        <div className="px-4 pt-8">
          <h3 className="text-[#111418] text-lg font-bold leading-tight tracking-[-0.015em] pb-4">
            Certifications & Quality Assurance
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {certifications.map((cert, index) => {
              const IconComponent = cert.icon;
              return (
                <Card key={index} className="bg-white rounded-lg shadow-sm">
                  <CardContent className="flex flex-col items-center p-4">
                    <div className="text-[#1672ce] mb-2">
                      <IconComponent className="h-6 w-6" />
                    </div>
                    <div className="text-xs font-medium text-center">{cert.name}</div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
