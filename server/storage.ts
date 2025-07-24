import {
  products,
  industries,
  blogPosts,
  quoteRequests,
  contactInquiries,
  resources,
  testimonials,
  type Product,
  type InsertProduct,
  type Industry,
  type InsertIndustry,
  type BlogPost,
  type InsertBlogPost,
  type QuoteRequest,
  type InsertQuoteRequest,
  type ContactInquiry,
  type InsertContactInquiry,
  type Resource,
  type InsertResource,
  type Testimonial,
  type InsertTestimonial,
} from "@shared/schema";

export interface IStorage {
  // Products
  getProducts(filters?: { category?: string; material?: string }): Promise<Product[]>;
  getProduct(id: number): Promise<Product | undefined>;
  createProduct(product: InsertProduct): Promise<Product>;
  
  // Industries
  getIndustries(): Promise<Industry[]>;
  getIndustry(slug: string): Promise<Industry | undefined>;
  createIndustry(industry: InsertIndustry): Promise<Industry>;
  
  // Blog posts
  getBlogPosts(published?: boolean): Promise<BlogPost[]>;
  getBlogPost(slug: string): Promise<BlogPost | undefined>;
  createBlogPost(post: InsertBlogPost): Promise<BlogPost>;
  
  // Quote requests
  createQuoteRequest(request: InsertQuoteRequest): Promise<QuoteRequest>;
  getQuoteRequests(): Promise<QuoteRequest[]>;
  
  // Contact inquiries
  createContactInquiry(inquiry: InsertContactInquiry): Promise<ContactInquiry>;
  getContactInquiries(): Promise<ContactInquiry[]>;
  
  // Resources
  getResources(type?: string): Promise<Resource[]>;
  createResource(resource: InsertResource): Promise<Resource>;
  
  // Testimonials
  getTestimonials(active?: boolean): Promise<Testimonial[]>;
  createTestimonial(testimonial: InsertTestimonial): Promise<Testimonial>;
}

export class MemStorage implements IStorage {
  private products: Map<number, Product> = new Map();
  private industries: Map<number, Industry> = new Map();
  private blogPosts: Map<number, BlogPost> = new Map();
  private quoteRequests: Map<number, QuoteRequest> = new Map();
  private contactInquiries: Map<number, ContactInquiry> = new Map();
  private resources: Map<number, Resource> = new Map();
  private testimonials: Map<number, Testimonial> = new Map();
  
  private currentProductId = 1;
  private currentIndustryId = 1;
  private currentBlogPostId = 1;
  private currentQuoteRequestId = 1;
  private currentContactInquiryId = 1;
  private currentResourceId = 1;
  private currentTestimonialId = 1;

  constructor() {
    this.initializeSampleData();
  }

  private initializeSampleData() {
    // Sample products
    const sampleProducts: InsertProduct[] = [
      {
        name: "Thermoformed Food Trays",
        description: "Precision-molded packaging for food applications with superior barrier properties.",
        category: "thermoformed-trays",
        material: "PET",
        dimensions: "Various sizes available",
        capacity: "50ml - 2L",
        minimumOrderQuantity: 10000,
        features: ["Tamper evident", "Microwave safe", "Recyclable"],
        applications: ["Ready meals", "Fresh produce", "Bakery items"],
        specifications: {
          "Material Thickness": "0.2-1.0mm",
          "Temperature Range": "-40°C to +70°C",
          "Barrier Properties": "Oxygen: <0.5 cc/m²/day"
        },
        imageUrl: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=800",
        isActive: true,
      },
      {
        name: "Pharmaceutical Blister Packs",
        description: "Secure, tamper-evident blister packs for pharmaceuticals with excellent visibility.",
        category: "blister-packaging",
        material: "PVC/PVDC",
        dimensions: "Custom tooling available",
        minimumOrderQuantity: 50000,
        features: ["Child resistant", "Tamper evident", "UV protection"],
        applications: ["Tablets", "Capsules", "Medical devices"],
        specifications: {
          "Material Thickness": "0.25mm",
          "Barrier Properties": "Moisture: <2g/m²/day",
          "Compliance": "FDA, EU regulations"
        },
        imageUrl: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=800",
        isActive: true,
      },
      {
        name: "Industrial Plastic Sheets",
        description: "High-quality plastic sheets for packaging fabrication and custom manufacturing.",
        category: "plastic-sheets",
        material: "PP",
        dimensions: "1000x2000mm standard",
        minimumOrderQuantity: 500,
        features: ["Chemical resistant", "Impact resistant", "Lightweight"],
        applications: ["Thermoforming", "Fabrication", "Protection"],
        specifications: {
          "Thickness Range": "0.5-10mm",
          "Density": "0.91 g/cm³",
          "Tensile Strength": ">25 MPa"
        },
        imageUrl: "https://images.unsplash.com/photo-1586075010923-2dd4570fb338?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=800",
        isActive: true,
      },
      {
        name: "Custom OEM Solutions",
        description: "Tailored packaging solutions with in-house tooling and prototyping capabilities.",
        category: "custom-solutions",
        material: "Various",
        dimensions: "Custom designed",
        minimumOrderQuantity: 1000,
        features: ["Design support", "Rapid prototyping", "Tooling included"],
        applications: ["Automotive parts", "Electronics", "Specialty packaging"],
        specifications: {
          "Lead Time": "4-8 weeks",
          "Prototyping": "3D printing available",
          "Materials": "PET, PP, PS, PC, ABS"
        },
        imageUrl: "https://images.unsplash.com/photo-1581092921461-eab62e97a780?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=800",
        isActive: true,
      },
    ];

    sampleProducts.forEach(product => {
      this.createProduct(product);
    });

    // Sample industries
    const sampleIndustries: InsertIndustry[] = [
      {
        name: "Pharmaceutical",
        slug: "pharmaceutical",
        description: "Tamper-evident packaging, sterile barrier solutions, and regulatory-compliant containers.",
        overview: "Our pharmaceutical packaging solutions meet the highest standards for safety, compliance, and product protection.",
        keyBenefits: [
          "FDA and EU regulatory compliance",
          "Tamper-evident security features",
          "Sterile barrier protection",
          "Child-resistant options",
          "Serialization compatibility"
        ],
        typicalProducts: ["Blister packs", "Thermoformed trays", "Bottle closures", "Medical device packaging"],
        caseStudies: [
          {
            title: "European Pharma Giant Reduces Packaging Costs by 25%",
            description: "Implementation of optimized blister packaging design",
            results: "25% cost reduction, 99.9% tamper evidence success rate"
          }
        ],
        iconName: "pharmaceutical",
        imageUrl: "https://images.unsplash.com/photo-1576671081837-49000212a370?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        isActive: true,
      },
      {
        name: "Food & Beverage",
        slug: "food-beverage",
        description: "Fresh produce packaging, ready meals, bakery containers with superior shelf life.",
        overview: "Extend shelf life and maintain freshness with our food-grade packaging solutions designed for the demanding food industry.",
        keyBenefits: [
          "Extended shelf life",
          "Food-grade materials",
          "Microwave and freezer safe",
          "Modified atmosphere compatibility",
          "Sustainable options available"
        ],
        typicalProducts: ["Food trays", "Clamshells", "Cups and containers", "Portion control packaging"],
        caseStudies: [
          {
            title: "Fresh Produce Chain Extends Shelf Life by 40%",
            description: "Custom thermoformed packaging with modified atmosphere",
            results: "40% shelf life extension, 15% reduction in food waste"
          }
        ],
        iconName: "food",
        imageUrl: "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        isActive: true,
      },
      {
        name: "Retail & Electronics",
        slug: "retail-electronics",
        description: "Custom blister packs, anti-static trays, and premium retail presentation packaging.",
        overview: "Enhance product presentation and protection with our retail and electronics packaging solutions.",
        keyBenefits: [
          "Premium presentation",
          "Anti-static protection",
          "Theft deterrent features",
          "Clear product visibility",
          "Cost-effective solutions"
        ],
        typicalProducts: ["Retail blisters", "Electronic component trays", "Display packaging", "Security packaging"],
        caseStudies: [
          {
            title: "Electronics Manufacturer Reduces Damage by 60%",
            description: "Anti-static thermoformed trays for sensitive components",
            results: "60% reduction in transport damage, improved assembly efficiency"
          }
        ],
        iconName: "electronics",
        imageUrl: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        isActive: true,
      },
      {
        name: "Automotive & Industrial",
        slug: "automotive-industrial",
        description: "Component trays, transport packaging, and specialized industrial solutions.",
        overview: "Robust packaging solutions designed to withstand the demanding requirements of automotive and industrial applications.",
        keyBenefits: [
          "Heavy-duty construction",
          "Chemical resistance",
          "Precise component organization",
          "Reusable options",
          "Supply chain optimization"
        ],
        typicalProducts: ["Component trays", "Transport packaging", "Protective covers", "Industrial containers"],
        caseStudies: [
          {
            title: "Automotive Supplier Streamlines Assembly Line",
            description: "Custom component trays improve assembly efficiency",
            results: "30% faster assembly, reduced component damage"
          }
        ],
        iconName: "automotive",
        imageUrl: "https://images.unsplash.com/photo-1565793298595-6a879b1d9492?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        isActive: true,
      },
    ];

    sampleIndustries.forEach(industry => {
      this.createIndustry(industry);
    });

    // Sample blog posts
    const sampleBlogPosts: InsertBlogPost[] = [
      {
        title: "Sustainable Packaging Trends in 2024",
        slug: "sustainable-packaging-trends-2024",
        excerpt: "Exploring the latest innovations in eco-friendly plastic packaging and how European manufacturers are adapting...",
        content: "The packaging industry is undergoing a significant transformation as sustainability becomes a primary concern for both manufacturers and consumers. In 2024, we're seeing unprecedented innovation in sustainable packaging solutions...",
        category: "sustainability",
        tags: ["sustainability", "innovation", "recycling", "circular economy"],
        imageUrl: "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=450",
        authorName: "Dr. Elena Richter",
        publishedAt: new Date("2024-03-15"),
        isPublished: true,
      },
      {
        title: "EU Packaging Regulations Update",
        slug: "eu-packaging-regulations-update",
        excerpt: "New compliance requirements for pharmaceutical and food packaging in the European market...",
        content: "The European Union has introduced new packaging regulations that significantly impact how pharmaceutical and food packaging must be designed, manufactured, and labeled...",
        category: "regulations",
        tags: ["regulations", "compliance", "EU", "pharmaceutical", "food safety"],
        imageUrl: "https://images.unsplash.com/photo-1576671081837-49000212a370?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=450",
        authorName: "Marcus Weber",
        publishedAt: new Date("2024-03-10"),
        isPublished: true,
      },
    ];

    sampleBlogPosts.forEach(post => {
      this.createBlogPost(post);
    });

    // Sample testimonials
    const sampleTestimonials: InsertTestimonial[] = [
      {
        customerName: "Dr. Marcus Weber",
        customerTitle: "Head of Procurement",
        company: "PharmaCorp Europe",
        industry: "Pharmaceutical",
        quote: "EuroPlast's thermoformed packaging solutions have transformed our pharmaceutical packaging operations. Their commitment to regulatory compliance and quality assurance is exceptional. We've seen a 30% reduction in packaging failures since switching to EuroPlast.",
        rating: 5,
        imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=200",
        isActive: true,
      },
      {
        customerName: "Sarah Mitchell",
        customerTitle: "Operations Director",
        company: "FreshFood Solutions",
        industry: "Food & Beverage",
        quote: "The custom food packaging solutions from EuroPlast have significantly extended our product shelf life. Their sustainable approach and rapid prototyping capabilities make them our preferred packaging partner across Europe.",
        rating: 5,
        imageUrl: "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=200",
        isActive: true,
      },
    ];

    sampleTestimonials.forEach(testimonial => {
      this.createTestimonial(testimonial);
    });

    // Sample resources
    const sampleResources: InsertResource[] = [
      {
        title: "Complete Product Catalog 2024",
        description: "Comprehensive catalog featuring all our thermoformed packaging solutions",
        type: "brochure",
        category: "general",
        fileUrl: "/downloads/europlast-catalog-2024.pdf",
        isActive: true,
      },
      {
        title: "ISO 9001:2015 Certificate",
        description: "Quality management system certification",
        type: "certificate",
        category: "compliance",
        fileUrl: "/downloads/iso-9001-certificate.pdf",
        isActive: true,
      },
      {
        title: "PET Sheet Technical Datasheet",
        description: "Detailed technical specifications for PET plastic sheets",
        type: "datasheet",
        category: "product-specific",
        fileUrl: "/downloads/pet-sheet-datasheet.pdf",
        isActive: true,
      },
    ];

    sampleResources.forEach(resource => {
      this.createResource(resource);
    });
  }

  // Products
  async getProducts(filters?: { category?: string; material?: string }): Promise<Product[]> {
    let products = Array.from(this.products.values()).filter(p => p.isActive);
    
    if (filters?.category) {
      products = products.filter(p => p.category === filters.category);
    }
    
    if (filters?.material) {
      products = products.filter(p => p.material === filters.material);
    }
    
    return products;
  }

  async getProduct(id: number): Promise<Product | undefined> {
    return this.products.get(id);
  }

  async createProduct(insertProduct: InsertProduct): Promise<Product> {
    const id = this.currentProductId++;
    const product: Product = {
      ...insertProduct,
      id,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.products.set(id, product);
    return product;
  }

  // Industries
  async getIndustries(): Promise<Industry[]> {
    return Array.from(this.industries.values()).filter(i => i.isActive);
  }

  async getIndustry(slug: string): Promise<Industry | undefined> {
    return Array.from(this.industries.values()).find(i => i.slug === slug && i.isActive);
  }

  async createIndustry(insertIndustry: InsertIndustry): Promise<Industry> {
    const id = this.currentIndustryId++;
    const industry: Industry = {
      ...insertIndustry,
      id,
      createdAt: new Date(),
    };
    this.industries.set(id, industry);
    return industry;
  }

  // Blog posts
  async getBlogPosts(published?: boolean): Promise<BlogPost[]> {
    let posts = Array.from(this.blogPosts.values());
    
    if (published !== undefined) {
      posts = posts.filter(p => p.isPublished === published);
    }
    
    return posts.sort((a, b) => (b.publishedAt?.getTime() || 0) - (a.publishedAt?.getTime() || 0));
  }

  async getBlogPost(slug: string): Promise<BlogPost | undefined> {
    return Array.from(this.blogPosts.values()).find(p => p.slug === slug && p.isPublished);
  }

  async createBlogPost(insertBlogPost: InsertBlogPost): Promise<BlogPost> {
    const id = this.currentBlogPostId++;
    const blogPost: BlogPost = {
      ...insertBlogPost,
      id,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.blogPosts.set(id, blogPost);
    return blogPost;
  }

  // Quote requests
  async createQuoteRequest(insertQuoteRequest: InsertQuoteRequest): Promise<QuoteRequest> {
    const id = this.currentQuoteRequestId++;
    const quoteRequest: QuoteRequest = {
      ...insertQuoteRequest,
      id,
      status: "new",
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.quoteRequests.set(id, quoteRequest);
    return quoteRequest;
  }

  async getQuoteRequests(): Promise<QuoteRequest[]> {
    return Array.from(this.quoteRequests.values());
  }

  // Contact inquiries
  async createContactInquiry(insertContactInquiry: InsertContactInquiry): Promise<ContactInquiry> {
    const id = this.currentContactInquiryId++;
    const contactInquiry: ContactInquiry = {
      ...insertContactInquiry,
      id,
      status: "new",
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.contactInquiries.set(id, contactInquiry);
    return contactInquiry;
  }

  async getContactInquiries(): Promise<ContactInquiry[]> {
    return Array.from(this.contactInquiries.values());
  }

  // Resources
  async getResources(type?: string): Promise<Resource[]> {
    let resources = Array.from(this.resources.values()).filter(r => r.isActive);
    
    if (type) {
      resources = resources.filter(r => r.type === type);
    }
    
    return resources;
  }

  async createResource(insertResource: InsertResource): Promise<Resource> {
    const id = this.currentResourceId++;
    const resource: Resource = {
      ...insertResource,
      id,
      downloadCount: 0,
      createdAt: new Date(),
    };
    this.resources.set(id, resource);
    return resource;
  }

  // Testimonials
  async getTestimonials(active?: boolean): Promise<Testimonial[]> {
    let testimonials = Array.from(this.testimonials.values());
    
    if (active !== undefined) {
      testimonials = testimonials.filter(t => t.isActive === active);
    }
    
    return testimonials;
  }

  async createTestimonial(insertTestimonial: InsertTestimonial): Promise<Testimonial> {
    const id = this.currentTestimonialId++;
    const testimonial: Testimonial = {
      ...insertTestimonial,
      id,
      createdAt: new Date(),
    };
    this.testimonials.set(id, testimonial);
    return testimonial;
  }
}

export const storage = new MemStorage();
