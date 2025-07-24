import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { ShoppingCart } from "lucide-react";
import { insertQuoteRequestSchema } from "@shared/schema";

interface QuoteButtonProps {
  productId: number;
  productName: string;
  className?: string;
  size?: "default" | "sm" | "lg";
  variant?: "default" | "outline" | "secondary";
}

const quoteSchema = insertQuoteRequestSchema.extend({
  quantity: z.number().min(1).optional(),
  specifications: z.string().optional(),
});

export default function QuoteButton({ 
  productId, 
  productName, 
  className, 
  size = "default",
  variant = "default" 
}: QuoteButtonProps) {
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const form = useForm<z.infer<typeof quoteSchema>>({
    resolver: zodResolver(quoteSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      company: "",
      industry: "",
      phone: "",
      message: "",
      quantity: undefined,
      specifications: "",
    },
  });

  const mutation = useMutation({
    mutationFn: async (data: z.infer<typeof quoteSchema>) => {
      const { quantity, specifications, ...formData } = data;
      
      const requestedProducts = [{
        productId,
        quantity: quantity || undefined,
        specifications: specifications || undefined,
      }];

      await apiRequest("POST", "/api/quote-request", {
        ...formData,
        requestedProducts,
      });
    },
    onSuccess: () => {
      setIsSubmitted(true);
      form.reset();
      toast({
        title: "Quote Request Submitted",
        description: "Thank you! We'll prepare your quote and get back to you within 24 hours.",
      });
      setTimeout(() => {
        setIsOpen(false);
        setIsSubmitted(false);
      }, 2000);
    },
    onError: (error) => {
      toast({
        title: "Error Submitting Quote Request",
        description: error.message || "Please try again later.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: z.infer<typeof quoteSchema>) => {
    mutation.mutate(data);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant={variant} size={size} className={className}>
          <ShoppingCart className="h-4 w-4 mr-2" />
          Add to Quote
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Request Quote for {productName}</DialogTitle>
        </DialogHeader>

        {isSubmitted ? (
          <div className="text-center py-8">
            <div className="text-green-600 mb-4">
              <svg className="h-16 w-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h4 className="text-lg font-bold text-[#111418] mb-2">Quote Request Submitted!</h4>
            <p className="text-[#637588]">We'll prepare your quote and get back to you within 24 hours.</p>
          </div>
        ) : (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>First Name</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Last Name</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type="email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="company"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Company</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone (Optional)</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="industry"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Industry</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value || ""}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select Industry" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="pharmaceutical">Pharmaceutical</SelectItem>
                        <SelectItem value="food-beverage">Food & Beverage</SelectItem>
                        <SelectItem value="retail">Retail</SelectItem>
                        <SelectItem value="automotive">Automotive</SelectItem>
                        <SelectItem value="electronics">Electronics</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="quantity"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Estimated Quantity (Optional)</FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        placeholder="e.g. 10000"
                        {...field}
                        onChange={(e) => field.onChange(e.target.value ? parseInt(e.target.value) : undefined)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="specifications"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Special Requirements (Optional)</FormLabel>
                    <FormControl>
                      <Textarea 
                        rows={2}
                        placeholder="Any specific dimensions, materials, or customizations..."
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Additional Information</FormLabel>
                    <FormControl>
                      <Textarea 
                        rows={3}
                        placeholder="Tell us about your project, timeline, or any other details..."
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button 
                type="submit" 
                className="w-full bg-[#1672ce] text-white hover:bg-blue-700"
                disabled={mutation.isPending}
              >
                {mutation.isPending ? "Submitting..." : "Request Quote"}
              </Button>
            </form>
          </Form>
        )}
      </DialogContent>
    </Dialog>
  );
}
