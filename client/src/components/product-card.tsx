import { Link } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import QuoteButton from "./quote-button";
import type { Product } from "@shared/schema";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <Card className="group hover:shadow-lg transition-shadow duration-300 bg-white">
      <CardContent className="p-0">
        <Link href={`/products/${product.id}`}>
          <div 
            className="w-full aspect-square bg-cover bg-center cursor-pointer"
            style={{
              backgroundImage: product.imageUrl 
                ? `url("${product.imageUrl}")` 
                : 'url("https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=800")'
            }}
          />
        </Link>
        
        <div className="p-6">
          <div className="flex items-center gap-2 mb-2">
            <Badge variant="secondary" className="capitalize text-xs">
              {product.category.replace('-', ' ')}
            </Badge>
            {product.material && (
              <Badge variant="outline" className="text-xs">
                {product.material}
              </Badge>
            )}
          </div>
          
          <Link href={`/products/${product.id}`}>
            <h3 className="text-[#111418] text-base font-bold leading-normal mb-2 group-hover:text-[#1672ce] transition-colors cursor-pointer">
              {product.name}
            </h3>
          </Link>
          
          <p className="text-[#637588] text-sm font-normal leading-normal mb-4 line-clamp-3">
            {product.description}
          </p>
          
          {/* Key specs */}
          <div className="space-y-1 mb-4">
            {product.capacity && (
              <div className="flex justify-between text-xs">
                <span className="text-[#637588]">Capacity:</span>
                <span className="text-[#111418] font-medium">{product.capacity}</span>
              </div>
            )}
            {product.minimumOrderQuantity && (
              <div className="flex justify-between text-xs">
                <span className="text-[#637588]">MOQ:</span>
                <span className="text-[#111418] font-medium">
                  {product.minimumOrderQuantity.toLocaleString()} units
                </span>
              </div>
            )}
          </div>
          
          <QuoteButton 
            productId={product.id} 
            productName={product.name}
            className="w-full"
            size="sm"
          />
        </div>
      </CardContent>
    </Card>
  );
}
