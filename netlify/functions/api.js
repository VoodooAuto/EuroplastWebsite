// Netlify serverless function for EuroPlast API
// Using plain JavaScript to avoid TypeScript compilation issues in serverless environment

const { z } = require("zod");

// Demo data - no database required
const demoProducts = [
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
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
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
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];

const demoIndustries = [
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
    createdAt: new Date().toISOString()
  }
];

const demoBlogPosts = [
  {
    id: 1,
    title: "Sustainable Packaging Trends in 2024",
    slug: "sustainable-packaging-trends-2024",
    excerpt: "Exploring the latest developments in eco-friendly packaging solutions",
    content: "The packaging industry is undergoing a significant transformation towards sustainability...",
    category: "sustainability",
    tags: ["sustainability", "trends", "packaging"],
    imageUrl: "/images/sustainable-packaging.jpg",
    authorName: "EuroPlast Team",
    publishedAt: new Date().toISOString(),
    isPublished: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];

const demoResources = [
  {
    id: 1,
    title: "Product Catalog 2024",
    description: "Complete overview of our product range",
    type: "brochure",
    category: "general",
    fileUrl: "/downloads/catalog-2024.pdf",
    downloadCount: 245,
    isActive: true,
    createdAt: new Date().toISOString()
  }
];

const demoTestimonials = [
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
    createdAt: new Date().toISOString()
  }
];

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "Content-Type",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
};

exports.handler = async (event, context) => {
  // Handle CORS preflight requests
  if (event.httpMethod === "OPTIONS") {
    return {
      statusCode: 200,
      headers: corsHeaders,
      body: "",
    };
  }

  const path = event.path.replace("/.netlify/functions/api", "");
  const method = event.httpMethod;

  try {
    // Products routes
    if (path === "/products" && method === "GET") {
      const { category, material } = event.queryStringParameters || {};
      let products = [...demoProducts];
      
      if (category) {
        products = products.filter(p => p.category === category);
      }
      
      if (material) {
        products = products.filter(p => p.material === material);
      }
      
      return {
        statusCode: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        body: JSON.stringify(products),
      };
    }

    if (path.startsWith("/products/") && method === "GET") {
      const id = parseInt(path.split("/")[2]);
      const product = demoProducts.find(p => p.id === id);
      
      if (!product) {
        return {
          statusCode: 404,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          body: JSON.stringify({ message: "Product not found" }),
        };
      }
      
      return {
        statusCode: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        body: JSON.stringify(product),
      };
    }

    // Industries routes
    if (path === "/industries" && method === "GET") {
      return {
        statusCode: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        body: JSON.stringify(demoIndustries),
      };
    }

    if (path.startsWith("/industries/") && method === "GET") {
      const slug = path.split("/")[2];
      const industry = demoIndustries.find(i => i.slug === slug);
      
      if (!industry) {
        return {
          statusCode: 404,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          body: JSON.stringify({ message: "Industry not found" }),
        };
      }
      
      return {
        statusCode: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        body: JSON.stringify(industry),
      };
    }

    // Blog routes
    if (path === "/blog" && method === "GET") {
      const blogPosts = demoBlogPosts.filter(p => p.isPublished);
      return {
        statusCode: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        body: JSON.stringify(blogPosts),
      };
    }

    if (path.startsWith("/blog/") && method === "GET") {
      const slug = path.split("/")[2];
      const blogPost = demoBlogPosts.find(p => p.slug === slug);
      
      if (!blogPost) {
        return {
          statusCode: 404,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          body: JSON.stringify({ message: "Blog post not found" }),
        };
      }
      
      return {
        statusCode: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        body: JSON.stringify(blogPost),
      };
    }

    // Resources routes
    if (path === "/resources" && method === "GET") {
      const { type } = event.queryStringParameters || {};
      let resources = [...demoResources];
      
      if (type) {
        resources = resources.filter(r => r.type === type);
      }
      
      return {
        statusCode: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        body: JSON.stringify(resources),
      };
    }

    // Testimonials routes
    if (path === "/testimonials" && method === "GET") {
      const testimonials = demoTestimonials.filter(t => t.isActive);
      return {
        statusCode: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        body: JSON.stringify(testimonials),
      };
    }

    // Quote request route
    if (path === "/quote-request" && method === "POST") {
      const body = JSON.parse(event.body || "{}");
      
      // Basic validation
      if (!body.firstName || !body.lastName || !body.email || !body.company) {
        return {
          statusCode: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          body: JSON.stringify({ message: "Missing required fields" }),
        };
      }
      
      const quoteRequest = {
        id: Date.now(),
        ...body,
        status: "new",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      
      console.log("Quote request created:", quoteRequest);
      
      return {
        statusCode: 201,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        body: JSON.stringify(quoteRequest),
      };
    }

    // Contact inquiry route
    if (path === "/contact" && method === "POST") {
      const body = JSON.parse(event.body || "{}");
      
      // Basic validation
      if (!body.firstName || !body.lastName || !body.email || !body.message) {
        return {
          statusCode: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          body: JSON.stringify({ message: "Missing required fields" }),
        };
      }
      
      const contactInquiry = {
        id: Date.now(),
        ...body,
        status: "new",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      
      console.log("Contact inquiry created:", contactInquiry);
      
      return {
        statusCode: 201,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        body: JSON.stringify(contactInquiry),
      };
    }

    // Route not found
    return {
      statusCode: 404,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      body: JSON.stringify({ message: "Route not found" }),
    };

  } catch (error) {
    console.error("Function error:", error);
    
    return {
      statusCode: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      body: JSON.stringify({ message: "Internal server error" }),
    };
  }
};