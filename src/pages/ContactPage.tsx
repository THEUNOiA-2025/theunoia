import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

const ContactPage = () => {
  return (
    <div className="bg-white overflow-hidden min-h-screen">
      <Header />
      <main className="pt-8">
        <section className="flex w-full flex-col items-center py-20 px-5 md:px-20">
          <div className="flex w-full max-w-6xl flex-col items-center">
            <div className="bg-green flex items-center text-[13px] text-green-foreground font-medium w-fit px-6 py-2 rounded-full mb-6">
              Contact Us
            </div>
            <h2 className="text-foreground text-5xl font-bold tracking-tight text-center max-md:text-4xl">
              Get in Touch
            </h2>
            <p className="text-muted-foreground text-base font-normal text-center mt-8 max-w-3xl">
              Have questions or need assistance? We're here to help. Reach out to us through any of the channels below.
            </p>

            <div className="w-full mt-16 max-md:mt-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                {/* Contact Info */}
                <div className="flex flex-col gap-8">
                  <div className="bg-[#F8F4F1] p-8 rounded-3xl hover-lift">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="bg-primary p-3 rounded-2xl">
                        <Mail className="h-6 w-6 text-primary-foreground" />
                      </div>
                      <div>
                        <h3 className="text-foreground text-lg font-bold">Email Us</h3>
                        <p className="text-muted-foreground">support@theunoia.com</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-[#F8F4F1] p-8 rounded-3xl hover-lift">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="bg-[#B8A3FF] p-3 rounded-2xl">
                        <Phone className="h-6 w-6 text-foreground" />
                      </div>
                      <div>
                        <h3 className="text-foreground text-lg font-bold">Call Us</h3>
                        <p className="text-muted-foreground">+91 98765 43210</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-[#F8F4F1] p-8 rounded-3xl hover-lift">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="bg-[#FFD86F] p-3 rounded-2xl">
                        <MapPin className="h-6 w-6 text-foreground" />
                      </div>
                      <div>
                        <h3 className="text-foreground text-lg font-bold">Visit Us</h3>
                        <p className="text-muted-foreground">Bangalore, India</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Contact Form */}
                <div className="bg-[#C8F070] p-10 rounded-3xl">
                  <h3 className="text-foreground text-2xl font-bold mb-6">Send us a message</h3>
                  <form className="flex flex-col gap-5">
                    <Input 
                      placeholder="Your Name" 
                      className="bg-background border-none py-6 px-5 rounded-2xl"
                    />
                    <Input 
                      type="email"
                      placeholder="Your Email" 
                      className="bg-background border-none py-6 px-5 rounded-2xl"
                    />
                    <Input 
                      placeholder="Subject" 
                      className="bg-background border-none py-6 px-5 rounded-2xl"
                    />
                    <Textarea 
                      placeholder="Your Message" 
                      rows={5}
                      className="bg-background border-none py-4 px-5 rounded-2xl resize-none"
                    />
                    <Button className="bg-primary text-primary-foreground font-bold py-6 rounded-full hover:opacity-90 transition-opacity flex items-center gap-2">
                      <Send className="h-5 w-5" />
                      Send Message
                    </Button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default ContactPage;
