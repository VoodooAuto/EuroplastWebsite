import type { 
  Product, 
  Industry, 
  BlogPost, 
  Resource, 
  Testimonial, 
  QuoteRequest, 
  ContactInquiry,
  InsertQuoteRequest,
  InsertContactInquiry
} from "@shared/schema";

// Demo data for Netlify deployment (no database required)
const demoProducts: Product[] = [
  {
    id: 1,
    name: "Premium PET Thermoformed Trays",
    description: "High-quality transparent PET trays perfect for food packaging",
    category: "thermoformed-trays",
    subcategory: "food-grade",
    material: "PET",
    dimensions: "200x150x50mm",
    capacity: "500ml",
    minimumOrderQuantity: 1000,
    features: ["Food-safe", "Microwave safe", "Recyclable", "Crystal clear"],
    applications: ["Ready meals", "Fresh produce", "Deli items"],
    specifications: {
      "Temperature Range": "-40°C to +70°C",
      "Thickness": "0.5mm",
      "Weight": "15g"
    },
    imageUrl: "/images/pet-trays.jpg",
    dataSheetUrl: "/docs/pet-trays-datasheet.pdf",
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 2,
    name: "Rigid Plastic Sheets - PP",
    description: "Durable polypropylene sheets for various industrial applications",
    category: "plastic-sheets",
    subcategory: "industrial",
    material: "PP",
    dimensions: "1000x2000mm",
    capacity: null,
    minimumOrderQuantity: 50,
    features: ["Chemical resistant", "Impact resistant", "Lightweight"],
    applications: ["Automotive", "Construction", "Signage"],
    specifications: {
      "Thickness": "2-10mm",
      "Density": "0.9 g/cm³",
      "Tensile Strength": "25 MPa"
    },
    imageUrl: "/images/pp-sheets.jpg",
    dataSheetUrl: "/docs/pp-sheets-datasheet.pdf",
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

const demoIndustries: Industry[] = [
  {
    id: 1,
    name: "Food & Beverage",
    slug: "food-beverage",
    description: "Comprehensive packaging solutions for the food and beverage industry",
    overview: "Our food-grade packaging solutions ensure product safety and extend shelf life while maintaining visual appeal.",
    keyBenefits: ["FDA approved materials", "Extended shelf life", "Tamper-evident designs", "Sustainable options"],
    typicalProducts: ["Thermoformed trays", "Blister packs", "Rigid containers"],
    caseStudies: [
      {
        title: "Fresh Produce Packaging",
        description: "Developed custom PET trays for a major retailer",
        results: "30% reduction in food waste, improved product visibility"
      }
    ],
    iconName: "utensils",
    imageUrl: "/images/food-industry.jpg",
    isActive: true,
    createdAt: new Date()
  }
];

const demoBlogPosts: BlogPost[] = [
  {
    id: 1,
    title: "Sustainable Packaging Trends in 2024",
    slug: "sustainable-packaging-trends-2024",
    excerpt: "Exploring the latest developments in eco-friendly packaging solutions",
    content: "The packaging industry is undergoing a significant transformation...",
    category: "sustainability",
    tags: ["sustainability", "trends", "packaging"],
    imageUrl: "/images/sustainable-packaging.jpg",
    authorName: "EuroPlast Team",
    publishedAt: new Date(),
    isPublished: true,
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

const demoResources: Resource[] = [
  {
    id: 1,
    title: "Product Catalog 2024",
    description: "Complete overview of our product range",
    type: "brochure",
    category: "general",
    fileUrl: "/downloads/catalog-2024.pdf",
    downloadCount: 245,
    isActive: true,
    createdAt: new Date()
  }
];

const demoTestimonials: Testimonial[] = [
  {
    id: 1,
    customerName: "John Smith",
    customerTitle: "Packaging Manager",
    company: "Fresh Foods Ltd",
    industry: "Food & Beverage",
    quote: "EuroPlast's packaging solutions have significantly improved our product presentation and reduced waste.",
    rating: 5,
    imageUrl: "/images/testimonial-1.jpg",
    isActive: true,
    createdAt: new Date()
  }
];

// Demo storage class
export class DemoStorage {
  async getProducts(filters?: { category?: string; material?: string }): Promise<Product[]> {
    let products = [...demoProducts];
    
    if (filters?.category) {
      products = products.filter(p => p.category === filters.category);
    }
    
    if (filters?.material) {
      products = products.filter(p => p.material === filters.material);
    }
    
    return products;
  }

  async getProduct(id: number): Promise<Product | null> {
    return demoProducts.find(p => p.id === id) || null;
  }

  async getIndustries(): Promise<Industry[]> {
    return [...demoIndustries];
  }

  async getIndustry(slug: string): Promise<Industry | null> {
    return demoIndustries.find(i => i.slug === slug) || null;
  }

  async getBlogPosts(publishedOnly = false): Promise<BlogPost[]> {
    let posts = [...demoBlogPosts];
    
    if (publishedOnly) {
      posts = posts.filter(p => p.isPublished);
    }
    
    return posts;
  }

  async getBlogPost(slug: string): Promise<BlogPost | null> {
    return demoBlogPosts.find(p => p.slug === slug) || null;
  }

  async getResources(type?: string): Promise<Resource[]> {
    let resources = [...demoResources];
    
    if (type) {
      resources = resources.filter(r => r.type === type);
    }
    
    return resources;
  }

  async getTestimonials(activeOnly = false): Promise<Testimonial[]> {
    let testimonials = [...demoTestimonials];
    
    if (activeOnly) {
      testimonials = testimonials.filter(t => t.isActive);
    }
    
    return testimonials;
  }

  async createQuoteRequest(data: InsertQuoteRequest): Promise<QuoteRequest> {
    const quoteRequest: QuoteRequest = {
      id: Date.now(),
      ...data,
      status: "new",
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    // In a real app, this would be saved to the database
    console.log("Quote request created:", quoteRequest);
    
    return quoteRequest;
  }

  async createContactInquiry(data: InsertContactInquiry): Promise<ContactInquiry> {
    const contactInquiry: ContactInquiry = {
      id: Date.now(),
      ...data,
      status: "new",
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    // In a real app, this would be saved to the database
    console.log("Contact inquiry created:", contactInquiry);
    
    return contactInquiry;
  }
}

export const demoStorage = new DemoStorage();