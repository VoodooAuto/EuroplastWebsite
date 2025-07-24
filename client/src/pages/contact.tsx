import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
  subject: z.string().optional(),
});

export default function Contact() {
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
    <div className="relative flex size-full min-h-screen flex-col bg-white">
      <Header />
      <main className="flex-1">
        {/* Page Header */}
        <section className="section-padding py-20 europlast-light-bg">
          <div className="container-content text-center">
            <h1 className="text-4xl font-bold europlast-dark mb-6">
              Contact Us
            </h1>
            <p className="text-lg europlast-gray max-w-3xl mx-auto">
              Ready to discuss your packaging requirements? Our team of experts is here to help 
              you find the perfect solution. Get in touch today for personalized service and 
              rapid response to your inquiries.
            </p>
          </div>
        </section>

        {/* Contact Form & Info */}
        <section className="section-padding py-16">
          <div className="container-content">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Contact Form */}
              <div>
                <Card className="bg-white shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-2xl">Send us a Message</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {isSubmitted ? (
                      <div className="text-center py-12">
                        <div className="text-green-600 mb-4">
                          <svg className="h-20 w-20 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <h3 className="text-xl font-bold europlast-dark mb-2">Message Sent!</h3>
                        <p className="europlast-gray">Thank you for contacting us. We'll get back to you within 24 hours.</p>
                        <Button 
                          variant="outline" 
                          className="mt-4"
                          onClick={() => setIsSubmitted(false)}
                        >
                          Send Another Message
                        </Button>
                      </div>
                    ) : (
                      <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
                                <FormLabel>Email Address</FormLabel>
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
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                              name="subject"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Subject (Optional)</FormLabel>
                                  <FormControl>
                                    <Input placeholder="e.g. Quote Request" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                          
                          <FormField
                            control={form.control}
                            name="message"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Message</FormLabel>
                                <FormControl>
                                  <Textarea 
                                    rows={6} 
                                    placeholder="Tell us about your packaging requirements, project details, or any questions you have..."
                                    {...field} 
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <Button 
                            type="submit" 
                            size="lg"
                            className="w-full bg-[#1672ce] text-white hover:bg-blue-700 transition-colors"
                            disabled={mutation.isPending}
                          >
                            {mutation.isPending ? "Sending Message..." : "Send Message"}
                          </Button>
                        </form>
                      </Form>
                    )}
                  </CardContent>
                </Card>
              </div>

              {/* Contact Information */}
              <div className="space-y-8">
                <Card className="bg-white shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-2xl">Get in Touch</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex items-start gap-4">
                      <div className="europlast-primary-bg p-3 rounded-lg">
                        <MapPin className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold europlast-dark mb-1">Our Location</h3>
                        <p className="europlast-gray">
                          EuroPlast Manufacturing Park<br />
                          Industrial Zone 4, Sector B<br />
                          Hamburg, Germany 20537
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-4">
                      <div className="europlast-primary-bg p-3 rounded-lg">
                        <Phone className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold europlast-dark mb-1">Phone</h3>
                        <p className="europlast-gray">+49 40 1234 5678</p>
                        <p className="text-xs europlast-gray mt-1">Direct line to sales team</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-4">
                      <div className="europlast-primary-bg p-3 rounded-lg">
                        <Mail className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold europlast-dark mb-1">Email</h3>
                        <p className="europlast-gray">
                          sales@europlast.com<br />
                          support@europlast.com
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-4">
                      <div className="europlast-primary-bg p-3 rounded-lg">
                        <Clock className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold europlast-dark mb-1">Business Hours</h3>
                        <p className="europlast-gray">
                          Monday - Friday: 8:00 - 18:00 CET<br />
                          Emergency contact: 24/7 support line
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Quick Actions */}
                <Card className="europlast-primary-bg text-white">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-bold mb-4">Need Immediate Assistance?</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-blue-100">Quote Request</span>
                        <Button variant="secondary" size="sm">
                          Get Quote
                        </Button>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-blue-100">Technical Support</span>
                        <Button variant="outline" size="sm" className="text-white border-white hover:bg-white hover:text-blue-600">
                          Contact Support
                        </Button>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-blue-100">Download Resources</span>
                        <Button variant="secondary" size="sm">
                          View Downloads
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Map Section */}
        <section className="section-padding py-16 europlast-light-bg">
          <div className="container-content">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold europlast-dark mb-4">Visit Our Facility</h2>
              <p className="europlast-gray">
                Located in Hamburg's industrial district, our modern facility welcomes visitors for 
                facility tours and technical consultations.
              </p>
            </div>
            
            {/* Placeholder for map - in a real implementation, you'd use Google Maps or similar */}
            <div className="bg-gray-200 rounded-lg h-96 flex items-center justify-center">
              <div className="text-center europlast-gray">
                <MapPin className="h-12 w-12 mx-auto mb-2" />
                <p>Interactive map would be displayed here</p>
                <p className="text-sm">Hamburg, Germany - Industrial Zone 4</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
