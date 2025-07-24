import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Shield, Award, Users, Factory, Leaf, CheckCircle } from "lucide-react";
import { Link } from "wouter";

const certifications = [
  {
    name: "ISO 9001:2015",
    description: "Quality Management System",
    icon: Shield,
  },
  {
    name: "RoHS Compliant",
    description: "Restriction of Hazardous Substances",
    icon: Leaf,
  },
  {
    name: "CE Marking",
    description: "European Conformity",
    icon: Award,
  },
  {
    name: "FDA Approved",
    description: "Food and Drug Administration",
    icon: CheckCircle,
  },
];

const values = [
  {
    title: "Quality Excellence",
    description: "We maintain the highest standards in manufacturing, ensuring every product meets stringent quality requirements.",
    icon: Award,
  },
  {
    title: "Innovation Focus",
    description: "Continuous investment in R&D and cutting-edge technology keeps us at the forefront of packaging solutions.",
    icon: Factory,
  },
  {
    title: "Customer Partnership",
    description: "We work closely with our clients to understand their unique needs and deliver tailored solutions.",
    icon: Users,
  },
  {
    title: "Sustainability",
    description: "Committed to environmental responsibility through sustainable materials and manufacturing processes.",
    icon: Leaf,
  },
];

const milestones = [
  {
    year: "2003",
    title: "Company Founded",
    description: "EuroPlast Ltd. established in Hamburg, Germany with focus on thermoformed packaging.",
  },
  {
    year: "2008",
    title: "ISO Certification",
    description: "Achieved ISO 9001:2008 certification for quality management systems.",
  },
  {
    year: "2012",
    title: "Facility Expansion",
    description: "Doubled manufacturing capacity with new state-of-the-art production lines.",
  },
  {
    year: "2016",
    title: "Pharmaceutical Focus",
    description: "Launched specialized pharmaceutical packaging division with cleanroom facilities.",
  },
  {
    year: "2020",
    title: "Sustainability Initiative",
    description: "Introduced bio-based and recycled materials into product portfolio.",
  },
  {
    year: "2024",
    title: "Digital Innovation",
    description: "Launched advanced online platform for custom packaging solutions and real-time tracking.",
  },
];

export default function About() {
  return (
    <div className="relative flex size-full min-h-screen flex-col bg-white">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="section-padding py-20 europlast-light-bg">
          <div className="container-content text-center">
            <h1 className="text-4xl font-bold europlast-dark mb-6">
              About EuroPlast Ltd.
            </h1>
            <p className="text-lg europlast-gray max-w-3xl mx-auto leading-relaxed">
              For over two decades, EuroPlast has been Europe's trusted partner for innovative 
              thermoformed packaging solutions. We combine advanced manufacturing capabilities 
              with deep industry expertise to deliver packaging that protects, preserves, and presents 
              your products with excellence.
            </p>
          </div>
        </section>

        {/* Company Overview */}
        <section className="section-padding py-16">
          <div className="container-content">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold europlast-dark mb-6">Our Story</h2>
                <div className="space-y-4 europlast-gray leading-relaxed">
                  <p>
                    Founded in 2003 in Hamburg, Germany, EuroPlast Ltd. began with a simple mission: 
                    to revolutionize the European packaging industry through precision thermoforming 
                    and unwavering commitment to quality.
                  </p>
                  <p>
                    What started as a small operation has grown into one of Europe's leading 
                    thermoformed packaging manufacturers, serving over 500 clients across 
                    pharmaceutical, food & beverage, retail, and automotive sectors.
                  </p>
                  <p>
                    Today, we operate from our modern 50,000 sq ft facility, equipped with 
                    state-of-the-art thermoforming lines, cleanroom capabilities, and in-house 
                    tooling services that enable us to deliver innovative packaging solutions 
                    with exceptional speed and precision.
                  </p>
                </div>
                
                {/* Stats */}
                <div className="grid grid-cols-3 gap-6 mt-8">
                  <div className="text-center">
                    <div className="text-2xl font-bold europlast-primary">20+</div>
                    <div className="text-sm europlast-gray">Years Experience</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold europlast-primary">500+</div>
                    <div className="text-sm europlast-gray">Happy Clients</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold europlast-primary">24/7</div>
                    <div className="text-sm europlast-gray">Support</div>
                  </div>
                </div>
              </div>
              
              <div className="space-y-6">
                <div 
                  className="w-full aspect-[4/3] bg-cover bg-center rounded-lg shadow-lg"
                  style={{
                    backgroundImage: 'url("https://images.unsplash.com/photo-1565793298595-6a879b1d9492?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600")'
                  }}
                />
                <div className="grid grid-cols-2 gap-4">
                  <div 
                    className="aspect-square bg-cover bg-center rounded-lg"
                    style={{
                      backgroundImage: 'url("https://images.unsplash.com/photo-1581094794329-c8112a89af12?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400")'
                    }}
                  />
                  <div 
                    className="aspect-square bg-cover bg-center rounded-lg"
                    style={{
                      backgroundImage: 'url("https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400")'
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Mission, Vision, Values */}
        <section className="section-padding py-16 europlast-light-bg">
          <div className="container-content">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold europlast-dark mb-4">Our Mission & Values</h2>
              <p className="europlast-gray max-w-2xl mx-auto">
                We're driven by a commitment to excellence, innovation, and sustainability 
                in everything we do.
              </p>
            </div>

            {/* Mission & Vision */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              <Card className="text-center">
                <CardContent className="p-8">
                  <h3 className="text-xl font-bold europlast-dark mb-4">Our Mission</h3>
                  <p className="europlast-gray leading-relaxed">
                    To deliver innovative, sustainable, and precise packaging solutions that 
                    protect products, enhance presentation, and drive our clients' success 
                    across Europe and beyond.
                  </p>
                </CardContent>
              </Card>
              <Card className="text-center">
                <CardContent className="p-8">
                  <h3 className="text-xl font-bold europlast-dark mb-4">Our Vision</h3>
                  <p className="europlast-gray leading-relaxed">
                    To be Europe's most trusted and innovative thermoformed packaging partner, 
                    leading the industry in sustainability, quality, and customer satisfaction.
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Values */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((value, index) => {
                const IconComponent = value.icon;
                return (
                  <Card key={index} className="text-center">
                    <CardContent className="p-6">
                      <div className="europlast-primary mb-4 flex justify-center">
                        <IconComponent className="h-8 w-8" />
                      </div>
                      <h4 className="font-bold europlast-dark mb-2">{value.title}</h4>
                      <p className="text-sm europlast-gray leading-relaxed">
                        {value.description}
                      </p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* Timeline */}
        <section className="section-padding py-16">
          <div className="container-content">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold europlast-dark mb-4">Our Journey</h2>
              <p className="europlast-gray max-w-2xl mx-auto">
                Two decades of innovation, growth, and commitment to excellence in packaging solutions.
              </p>
            </div>

            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-200 via-blue-400 to-blue-600"></div>
              
              <div className="space-y-8">
                {milestones.map((milestone, index) => (
                  <div key={index} className="relative flex items-start space-x-6">
                    {/* Timeline dot */}
                    <div className="flex-shrink-0 w-16 h-16 europlast-primary-bg rounded-full flex items-center justify-center text-white font-bold shadow-lg">
                      {milestone.year.slice(-2)}
                    </div>
                    
                    {/* Content */}
                    <Card className="flex-1">
                      <CardContent className="p-6">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                          <h3 className="text-lg font-bold europlast-dark">{milestone.title}</h3>
                          <Badge variant="outline">{milestone.year}</Badge>
                        </div>
                        <p className="europlast-gray">{milestone.description}</p>
                      </CardContent>
                    </Card>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Certifications */}
        <section className="section-padding py-16 europlast-light-bg">
          <div className="container-content">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold europlast-dark mb-4">Certifications & Quality</h2>
              <p className="europlast-gray max-w-2xl mx-auto">
                Our commitment to quality is validated by industry-leading certifications 
                and compliance standards.
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {certifications.map((cert, index) => {
                const IconComponent = cert.icon;
                return (
                  <Card key={index} className="text-center">
                    <CardContent className="p-6">
                      <div className="europlast-primary mb-4 flex justify-center">
                        <IconComponent className="h-8 w-8" />
                      </div>
                      <h4 className="font-bold europlast-dark mb-1">{cert.name}</h4>
                      <p className="text-xs europlast-gray">{cert.description}</p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* Manufacturing Capabilities */}
        <section className="section-padding py-16">
          <div className="container-content">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold europlast-dark mb-6">
                  Manufacturing Excellence
                </h2>
                <div className="space-y-4 europlast-gray leading-relaxed">
                  <p>
                    Our Hamburg facility features cutting-edge thermoforming technology, 
                    including multi-station forming lines capable of handling materials 
                    from 0.1mm to 10mm thickness.
                  </p>
                  <p>
                    With cleanroom capabilities meeting ISO 14644 standards, we serve 
                    the pharmaceutical and medical device industries with packaging 
                    that meets the most stringent regulatory requirements.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-6 mt-8">
                  <div>
                    <h4 className="font-bold europlast-dark mb-2">Capacity</h4>
                    <p className="text-sm europlast-gray">50,000 sq ft facility<br/>24/7 production capability</p>
                  </div>
                  <div>
                    <h4 className="font-bold europlast-dark mb-2">Materials</h4>
                    <p className="text-sm europlast-gray">PET, PP, PS, PC, ABS<br/>Bio-based alternatives</p>
                  </div>
                  <div>
                    <h4 className="font-bold europlast-dark mb-2">Tooling</h4>
                    <p className="text-sm europlast-gray">In-house tool design<br/>Rapid prototyping</p>
                  </div>
                  <div>
                    <h4 className="font-bold europlast-dark mb-2">Quality</h4>
                    <p className="text-sm europlast-gray">ISO 9001:2015<br/>Full traceability</p>
                  </div>
                </div>
              </div>

              <div 
                className="w-full aspect-[4/3] bg-cover bg-center rounded-lg shadow-lg"
                style={{
                  backgroundImage: 'url("https://images.unsplash.com/photo-1581092921461-eab62e97a780?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600")'
                }}
              />
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="section-padding py-16 europlast-primary-bg text-white">
          <div className="container-content text-center">
            <h2 className="text-3xl font-bold mb-4">
              Ready to Partner with EuroPlast?
            </h2>
            <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
              Discover how our expertise, quality, and innovation can transform 
              your packaging requirements into competitive advantages.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <Button size="lg" variant="secondary">
                  Contact Our Team
                </Button>
              </Link>
              <Link href="/products">
                <Button size="lg" variant="outline" className="text-white border-white hover:bg-white hover:text-blue-600">
                  Explore Our Products
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
