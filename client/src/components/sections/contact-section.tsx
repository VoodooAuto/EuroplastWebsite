import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { insertContactInquirySchema } from "@shared/schema";

const contactSchema = insertContactInquirySchema.extend({
  industry: z.string().optional(),
});

export default function ContactSection() {
  const { toast } = useToast();
  const [isSubmitted, setIsSubmitted] = useState(false);

  const form = useForm<z.infer<typeof contactSchema>>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      company: "",
      industry: "",
      phone: "",
      subject: "",
      message: "",
    },
  });

  const mutation = useMutation({
    mutationFn: async (data: z.infer<typeof contactSchema>) => {
      await apiRequest("POST", "/api/contact", data);
    },
    onSuccess: () => {
      setIsSubmitted(true);
      form.reset();
      toast({
        title: "Message Sent Successfully",
        description: "Thank you for your inquiry. We'll get back to you within 24 hours.",
      });
    },
    onError: (error) => {
      toast({
        title: "Error Sending Message",
        description: error.message || "Please try again later.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: z.infer<typeof contactSchema>) => {
    mutation.mutate(data);
  };

  return (
    <section className="section-padding flex flex-1 justify-center py-5 europlast-light-bg">
      <div className="layout-content-container flex flex-col container-content flex-1">
        <h2 className="text-[#111418] text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">
          Contact Us
        </h2>
        <div className="flex flex-col lg:flex-row gap-8 p-4">
          {/* Contact Form */}
          <div className="flex-1">
            <Card className="bg-white shadow-sm">
              <CardContent className="p-6">
                <h3 className="text-[#111418] text-lg font-bold leading-tight mb-4">
                  Get in Touch
                </h3>
                
                {isSubmitted ? (
                  <div className="text-center py-8">
                    <div className="text-green-600 mb-4">
                      <svg className="h-16 w-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <h4 className="text-lg font-bold text-[#111418] mb-2">Message Sent!</h4>
                    <p className="text-[#637588]">Thank you for your inquiry. We'll get back to you within 24 hours.</p>
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
                        name="message"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Message</FormLabel>
                            <FormControl>
                              <Textarea 
                                rows={4} 
                                placeholder="Tell us about your packaging requirements..."
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <Button 
                        type="submit" 
                        className="w-full bg-[#1672ce] text-white hover:bg-blue-700 transition-colors"
                        disabled={mutation.isPending}
                      >
                        {mutation.isPending ? "Sending..." : "Send Message"}
                      </Button>
                    </form>
                  </Form>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Contact Information */}
          <div className="flex-1">
            <Card className="bg-white shadow-sm h-full">
              <CardContent className="p-6">
                <h3 className="text-[#111418] text-lg font-bold leading-tight mb-4">
                  Contact Information
                </h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <MapPin className="h-5 w-5 text-[#1672ce] mt-1 flex-shrink-0" />
                    <div>
                      <p className="text-[#111418] font-medium">Address</p>
                      <p className="text-[#637588] text-sm">
                        EuroPlast Manufacturing Park<br />
                        Industrial Zone 4, Sector B<br />
                        Hamburg, Germany 20537
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <Phone className="h-5 w-5 text-[#1672ce] mt-1 flex-shrink-0" />
                    <div>
                      <p className="text-[#111418] font-medium">Phone</p>
                      <p className="text-[#637588] text-sm">+49 40 1234 5678</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <Mail className="h-5 w-5 text-[#1672ce] mt-1 flex-shrink-0" />
                    <div>
                      <p className="text-[#111418] font-medium">Email</p>
                      <p className="text-[#637588] text-sm">
                        sales@europlast.com<br />
                        support@europlast.com
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <Clock className="h-5 w-5 text-[#1672ce] mt-1 flex-shrink-0" />
                    <div>
                      <p className="text-[#111418] font-medium">Business Hours</p>
                      <p className="text-[#637588] text-sm">
                        Monday - Friday: 8:00 - 18:00 CET<br />
                        Response within 24 hours
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
