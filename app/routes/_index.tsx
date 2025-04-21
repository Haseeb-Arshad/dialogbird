import { useEffect, useRef } from "react";
import type { MetaFunction } from "@remix-run/node";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
import { MessageCircle, Phone, Calendar, ArrowRight } from "lucide-react";

import { Navbar } from "~/components/layout/Navbar";
import { Footer } from "~/components/layout/Footer";

export const meta: MetaFunction = () => {
  return [
    { title: "Omni-Assistant - AI-powered multi-channel communication" },
    { 
      name: "description", 
      content: "Seamlessly handle Phone Calls, WhatsApp, and SMS with one intelligent voice + text assistant powered by Twilio." 
    },
  ];
};

export default function Index() {
  // Refs for GSAP scroll animations
  const heroRef = useRef<HTMLDivElement>(null);
  const howItWorksSectionRef = useRef<HTMLDivElement>(null);
  const channelsSectionRef = useRef<HTMLDivElement>(null);
  const integrationsSectionRef = useRef<HTMLDivElement>(null);
  
  // Setup GSAP animations
  useEffect(() => {
    if (typeof window !== "undefined") {
      gsap.registerPlugin(ScrollTrigger);
      
      // Clear any existing ScrollTrigger instances
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      
      // Hero section parallax animation
      if (heroRef.current) {
        const phoneElement = heroRef.current.querySelector("#phone-element");
        const cloudElement = heroRef.current.querySelector("#cloud-element");
        const calendarElement = heroRef.current.querySelector("#calendar-element");
        
        if (phoneElement && cloudElement && calendarElement) {
          gsap.to(phoneElement, {
            y: -50,
            scrollTrigger: {
              trigger: heroRef.current,
              start: "top top",
              end: "bottom top",
              scrub: 1,
            },
          });
          
          gsap.to(cloudElement, {
            y: -30,
            scrollTrigger: {
              trigger: heroRef.current,
              start: "top top",
              end: "bottom top",
              scrub: 1,
            },
          });
          
          gsap.to(calendarElement, {
            y: -10,
            scrollTrigger: {
              trigger: heroRef.current,
              start: "top top",
              end: "bottom top",
              scrub: 1,
            },
          });
        }
      }
      
      // How It Works section (pinned)
      if (howItWorksSectionRef.current) {
        const steps = howItWorksSectionRef.current.querySelectorAll(".step");
        
        ScrollTrigger.create({
          trigger: howItWorksSectionRef.current,
          pin: true,
          pinSpacing: true,
          start: "top top",
          end: "+=150vh",
          id: "how-it-works",
          onUpdate: (self) => {
            const progress = self.progress;
            // Determine which step to show based on scroll progress
            const stepIndex = Math.min(Math.floor(progress * 3), 2);
            steps.forEach((step, i) => {
              gsap.to(step as HTMLElement, {
                opacity: i === stepIndex ? 1 : 0,
                y: i === stepIndex ? 0 : 20,
                duration: 0.5,
                ease: "power2.out",
              });
            });
          }
        });
      }
      
      // Channels section (pinned) - start after How It Works section
      if (channelsSectionRef.current) {
        const channels = channelsSectionRef.current.querySelectorAll(".channel");
        
        ScrollTrigger.create({
          trigger: channelsSectionRef.current,
          pin: true,
          pinSpacing: true,
          start: "top top",
          end: "+=150vh",
          id: "channels",
          onUpdate: (self) => {
            const progress = self.progress;
            // Determine which channel to show based on scroll progress
            const channelIndex = Math.min(Math.floor(progress * 3), 2);
            channels.forEach((channel, i) => {
              gsap.to(channel as HTMLElement, {
                opacity: i === channelIndex ? 1 : 0,
                x: i === channelIndex ? 0 : -20,
                duration: 0.5,
                ease: "power2.out",
              });
            });
          }
        });
      }
      
      // Integrations section (pinned) - start after Channels section
      if (integrationsSectionRef.current) {
        ScrollTrigger.create({
          trigger: integrationsSectionRef.current,
          pin: true,
          pinSpacing: true,
          start: "top top",
          end: "+=100vh",
          id: "integrations",
          onUpdate: (self) => {
            const progress = self.progress;
            // Animate the calendar integration visual based on scroll progress
            const calendarIntegration = integrationsSectionRef.current?.querySelector("#calendar-integration");
            if (calendarIntegration) {
              gsap.to(calendarIntegration, {
                scale: 1 + (progress * 0.2),
                opacity: Math.min(progress * 2, 1),
                duration: 0.3,
                ease: "power2.out",
              });
            }
          }
        });
      }
      
      return () => {
        // Clean up ScrollTrigger on unmount
        ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      };
    }
  }, []);
  
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <section 
        ref={heroRef}
        className="min-h-screen flex items-center justify-center py-20"
      >
        <div className="container mx-auto px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-12">
            {/* Hero Text Content */}
            <div className="flex-1 text-center md:text-left md:pl-4 lg:pl-8">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight font-heading text-gray-900">
                Your AI Assistant, <br/>Everywhere You Communicate
              </h1>
              <p className="text-xl text-gray-600 mb-8 max-w-xl font-body">
                Seamlessly handle Phone Calls, WhatsApp, and SMS with one intelligent voice + text assistant powered by Twilio.
              </p>
              <p className="text-gray-600 mb-10 max-w-xl font-body">
                Connect once, communicate everywhere. Our AI-powered assistant handles your conversations across multiple channels, saving you time and ensuring you never miss important messages.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                <a 
                  href="/auth/signup" 
                  className="px-8 py-3 bg-primary-600 text-white font-medium rounded-lg shadow-md hover:bg-primary-700 transition duration-300 text-center font-body"
                >
                  Get Started Free
                </a>
                <a 
                  href="#how-it-works" 
                  className="px-8 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-100 transition duration-300 text-center font-body"
                >
                  See How It Works
                </a>
              </div>
            </div>
            
            {/* Hero SVG Illustration */}
            <div className="flex-1 relative h-80 md:h-[500px]">
              <svg 
                viewBox="0 0 500 400" 
                className="w-full h-full"
                aria-hidden="true"
              >
                {/* Phone */}
                <g id="phone-element">
                  <rect x="80" y="100" width="70" height="140" rx="10" fill="#E0F2FE" stroke="#0EA5E9" strokeWidth="2" />
                  <circle cx="115" cy="210" r="10" fill="#0EA5E9" />
                  <rect x="100" y="120" width="30" height="60" rx="2" fill="#0EA5E9" opacity="0.3" />
                </g>
                
                {/* Cloud/AI */}
                <g id="cloud-element">
                  <path d="M220 140 Q250 100 280 140 Q310 100 340 140 Q360 140 360 160 Q360 180 340 180 H240 Q220 180 220 160 Q220 140 220 140" fill="#F0F9FF" stroke="#0EA5E9" strokeWidth="2" />
                  <circle cx="260" cy="150" r="5" fill="#0EA5E9" />
                  <circle cx="280" cy="150" r="5" fill="#0EA5E9" />
                  <circle cx="300" cy="150" r="5" fill="#0EA5E9" />
                </g>
                
                {/* Calendar */}
                <g id="calendar-element">
                  <rect x="350" y="130" width="100" height="110" rx="5" fill="#F0F9FF" stroke="#0EA5E9" strokeWidth="2" />
                  <rect x="350" y="130" width="100" height="25" rx="5" fill="#0EA5E9" opacity="0.3" />
                  <line x1="370" y1="180" x2="390" y2="180" stroke="#0EA5E9" strokeWidth="2" />
                  <line x1="410" y1="180" x2="430" y2="180" stroke="#0EA5E9" strokeWidth="2" />
                  <line x1="370" y1="200" x2="390" y2="200" stroke="#0EA5E9" strokeWidth="2" />
                  <line x1="410" y1="200" x2="430" y2="200" stroke="#0EA5E9" strokeWidth="2" />
                </g>
                
                {/* Connection Lines */}
                <path d="M150 160 C180 160 190 160 220 160" stroke="#0EA5E9" strokeWidth="2" strokeDasharray="5,5" />
                <path d="M360 160 C370 160 380 160 350 160" stroke="#0EA5E9" strokeWidth="2" strokeDasharray="5,5" />
              </svg>
            </div>
          </div>
        </div>
      </section>
      
      {/* How It Works Section (Pinned) */}
      <section 
        ref={howItWorksSectionRef}
        id="how-it-works" 
        className="py-24 bg-gray-50"
      >
        <div className="container mx-auto px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 font-heading text-gray-900">
            How Omni-Assistant Works
          </h2>
          
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            {/* Content Side */}
            <div className="flex-1 max-w-xl mx-auto md:mx-0 md:pl-4 lg:pl-8">
              <div className="step transition-all duration-500">
                <div className="flex items-start gap-4 mb-4">
                  <div className="h-10 w-10 rounded-full bg-primary-100 flex items-center justify-center text-primary-600 font-bold font-heading">1</div>
                  <h3 className="text-2xl font-bold font-heading text-gray-900">Connect your Twilio number & WhatsApp</h3>
                </div>
                <p className="text-gray-600 ml-14 font-body">
                  Easily integrate your existing Twilio accounts with our platform. Just a few clicks to connect your phone numbers and WhatsApp Business accounts.
                </p>
              </div>
              
              <div className="step mt-12 opacity-0 transform translate-y-20 transition-all duration-500">
                <div className="flex items-start gap-4 mb-4">
                  <div className="h-10 w-10 rounded-full bg-primary-100 flex items-center justify-center text-primary-600 font-bold font-heading">2</div>
                  <h3 className="text-2xl font-bold font-heading text-gray-900">AI handles inbound calls and messages</h3>
                </div>
                <p className="text-gray-600 ml-14 font-body">
                  Our advanced AI understands natural language to handle voice calls and text messages. It can answer questions, schedule appointments, and route important communications.
                </p>
              </div>
              
              <div className="step mt-12 opacity-0 transform translate-y-20 transition-all duration-500">
                <div className="flex items-start gap-4 mb-4">
                  <div className="h-10 w-10 rounded-full bg-primary-100 flex items-center justify-center text-primary-600 font-bold font-heading">3</div>
                  <h3 className="text-2xl font-bold font-heading text-gray-900">Integrates with your tools</h3>
                </div>
                <p className="text-gray-600 ml-14 font-body">
                  Seamlessly connect with the tools you already use. Google Calendar integration allows the assistant to check availability, schedule meetings, and manage your time.
                </p>
              </div>
            </div>
            
            {/* Visual Side */}
            <div className="flex-1 h-80 md:h-[400px] relative">
              <div className="w-full h-full flex items-center justify-center">
                <svg 
                  viewBox="0 0 400 400" 
                  className="w-full h-full max-w-md"
                  aria-hidden="true"
                >
                  <rect x="100" y="100" width="200" height="200" rx="20" fill="#F0F9FF" stroke="#0EA5E9" strokeWidth="2" />
                  <path d="M150 180 Q200 140 250 180" stroke="#0EA5E9" strokeWidth="3" fill="none" />
                  <circle cx="150" cy="180" r="10" fill="#0EA5E9" />
                  <circle cx="250" cy="180" r="10" fill="#0EA5E9" />
                  <rect x="175" y="200" width="50" height="10" rx="5" fill="#0EA5E9" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Multi-Channel Focus Section (Pinned) */}
      <section 
        ref={channelsSectionRef}
        id="features" 
        className="py-24"
      >
        <div className="container mx-auto px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 font-heading text-gray-900">
            One Assistant, Multiple Channels
          </h2>
          
          <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-12">
            {/* Visual Side */}
            <div className="flex-1 flex items-center justify-center">
              <div className="w-full max-w-md relative h-80">
                <motion.div 
                  whileHover={{ scale: 1.05 }}
                  className="absolute top-0 left-0 right-0 flex justify-center"
                >
                  <Phone className="h-20 w-20 text-primary-600" />
                </motion.div>
                <motion.div 
                  whileHover={{ scale: 1.05 }}
                  className="absolute bottom-0 left-0 flex justify-center"
                >
                  <svg className="h-20 w-20" viewBox="0 0 32 32" fill="none">
                    <path d="M16 2C8.28 2 2 8.28 2 16C2 23.72 8.28 30 16 30C23.72 30 30 23.72 30 16C30 8.28 23.72 2 16 2Z" fill="#25D366"/>
                    <path fillRule="evenodd" clipRule="evenodd" d="M22.2048 9.79472C20.3984 7.9872 17.9536 7 15.3632 7C10.0304 7 5.72639 11.304 5.72639 16.6368C5.72639 18.3616 6.1952 20.0416 7.0688 21.5088L5.6416 26.4384L10.6816 25.0352C12.0928 25.8288 13.7104 26.2464 15.3584 26.2464H15.3632C20.6944 26.2464 25 21.9424 25 16.6096C25 14.0192 24.0128 11.6032 22.2048 9.79472ZM15.3632 24.4672C13.9072 24.4672 12.4832 24.064 11.2512 23.308L10.9632 23.1408L8.11679 23.9392L8.92959 21.1664L8.74399 20.864C7.9072 19.5872 7.46559 18.1392 7.46559 16.6368C7.46559 12.284 11.0096 8.74 15.368 8.74C17.5056 8.74 19.5168 9.56 21.0128 11.0576C22.5088 12.5536 23.2656 14.5648 23.2608 16.6096C23.2608 20.9664 19.7168 24.4672 15.3632 24.4672ZM19.9376 18.2432C19.68 18.1136 18.2496 17.4016 18.0112 17.3168C17.7728 17.2288 17.6 17.1888 17.4272 17.4432C17.2544 17.7008 16.6896 18.3648 16.5376 18.5376C16.3856 18.7104 16.2336 18.7296 15.976 18.6C15.7184 18.4704 14.8128 18.16 13.7488 17.2128C12.9136 16.4688 12.3552 15.5616 12.2032 15.304C12.0512 15.0464 12.1872 14.9056 12.3168 14.776C12.4336 14.6592 12.5744 14.4672 12.7056 14.3152C12.84 14.1632 12.88 14.0544 12.968 13.8816C13.056 13.7088 13.0176 13.5568 12.948 13.4272C12.88 13.2976 12.3216 11.8672 12.108 11.3504C11.8992 10.8464 11.688 10.9184 11.5296 10.9088C11.3776 10.9024 11.2048 10.9024 11.032 10.9024C10.8592 10.9024 10.5808 10.9696 10.3424 11.2272C10.104 11.4848 9.3472 12.1968 9.3472 13.6272C9.3472 15.0576 10.3632 16.4448 10.4944 16.6176C10.6256 16.7904 12.3536 19.4864 15.0304 20.7616C15.7136 21.0608 16.2448 21.2432 16.656 21.3808C17.3328 21.6064 17.9504 21.5728 18.44 21.504C18.9856 21.4256 20.1936 20.7936 20.4064 20.1888C20.624 19.584 20.624 19.0672 20.5536 18.9376C20.4864 18.808 20.1952 18.7264 19.9376 18.2432Z" fill="white"/>
                  </svg>
                </motion.div>
                <motion.div 
                  whileHover={{ scale: 1.05 }}
                  className="absolute bottom-0 right-0 flex justify-center"
                >
                  <MessageCircle className="h-20 w-20 text-primary-600" />
                </motion.div>
              </div>
            </div>
            
            {/* Content Side */}
            <div className="flex-1 max-w-xl mx-auto md:mx-0 md:pr-4 lg:pr-8">
              <div className="channel transition-all duration-500">
                <h3 className="text-2xl font-bold mb-4 font-heading text-gray-900">Intelligent Voice Assistant</h3>
                <p className="text-gray-600 mb-6 font-body">
                  Handle phone calls with ease using our advanced voice AI. It can understand customer inquiries, provide information, and route calls when necessary.
                </p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-start gap-2 font-body">
                    <div className="mt-1 text-primary-600">
                      <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    Natural language understanding
                  </li>
                  <li className="flex items-start gap-2 font-body">
                    <div className="mt-1 text-primary-600">
                      <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    Customizable responses
                  </li>
                  <li className="flex items-start gap-2 font-body">
                    <div className="mt-1 text-primary-600">
                      <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    Appointment scheduling
                  </li>
                </ul>
              </div>
              
              <div className="channel opacity-0 transform -translate-x-20 transition-all duration-500">
                <h3 className="text-2xl font-bold mb-4 font-heading text-gray-900">WhatsApp Automation</h3>
                <p className="text-gray-600 mb-6 font-body">
                  Provide instant responses on WhatsApp. Keep your customers engaged with quick replies and personalized messaging.
                </p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-start gap-2 font-body">
                    <div className="mt-1 text-primary-600">
                      <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    Rich media support
                  </li>
                  <li className="flex items-start gap-2 font-body">
                    <div className="mt-1 text-primary-600">
                      <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    Automated workflows
                  </li>
                  <li className="flex items-start gap-2 font-body">
                    <div className="mt-1 text-primary-600">
                      <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    Instant notifications
                  </li>
                </ul>
              </div>
              
              <div className="channel opacity-0 transform -translate-x-20 transition-all duration-500">
                <h3 className="text-2xl font-bold mb-4 font-heading text-gray-900">Unified SMS Inbox</h3>
                <p className="text-gray-600 mb-6 font-body">
                  Manage all your text communications in one place. Our AI can respond to common queries, freeing up your time for more important tasks.
                </p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-start gap-2 font-body">
                    <div className="mt-1 text-primary-600">
                      <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    Automated responses
                  </li>
                  <li className="flex items-start gap-2 font-body">
                    <div className="mt-1 text-primary-600">
                      <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    Message tagging and sorting
                  </li>
                  <li className="flex items-start gap-2 font-body">
                    <div className="mt-1 text-primary-600">
                      <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    Priority filtering
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Integrations Focus Section (Pinned) */}
      <section 
        ref={integrationsSectionRef}
        id="integrations" 
        className="py-24 bg-gray-50"
      >
        <div className="container mx-auto px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 font-heading text-gray-900">
            Powerful Integrations
          </h2>
          
          <div className="flex flex-col md:flex-row items-center justify-between gap-12">
            {/* Content Side */}
            <div className="flex-1 max-w-xl mx-auto md:mx-0 md:pl-4 lg:pl-8">
              <h3 className="text-2xl font-bold mb-4 font-heading text-gray-900">Google Calendar Integration</h3>
              <p className="text-gray-600 mb-6 font-body">
                Seamlessly connect your Google Calendar to enable the assistant to check your availability, schedule meetings, and manage your time efficiently.
              </p>
              <ul className="space-y-4">
                <li className="flex items-start gap-3 font-body">
                  <div className="mt-1 h-5 w-5 text-primary-600">
                    <svg viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <strong className="font-medium">Schedule meetings via voice or text</strong>
                    <p className="text-gray-500">Your clients can book appointments simply by calling or messaging.</p>
                  </div>
                </li>
                <li className="flex items-start gap-3 font-body">
                  <div className="mt-1 h-5 w-5 text-primary-600">
                    <svg viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <strong className="font-medium">Sync availability automatically</strong>
                    <p className="text-gray-500">The assistant always knows your up-to-date schedule.</p>
                  </div>
                </li>
                <li className="flex items-start gap-3 font-body">
                  <div className="mt-1 h-5 w-5 text-primary-600">
                    <svg viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <strong className="font-medium">Reduce scheduling conflicts</strong>
                    <p className="text-gray-500">Avoid double-bookings and scheduling errors.</p>
                  </div>
                </li>
              </ul>
              
              <p className="mt-8 text-sm text-gray-500 font-body">
                More integrations coming soon!
              </p>
            </div>
            
            {/* Visual Side */}
            <div className="flex-1 flex items-center justify-center">
              <div 
                id="calendar-integration"
                className="transform scale-0 opacity-0 transition-all duration-500"
              >
                <div className="relative">
                  <Calendar className="h-40 w-40 text-primary-600" strokeWidth={1} />
                  <div className="absolute -right-4 -top-4 h-8 w-8 rounded-full bg-primary-100 flex items-center justify-center">
                    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="#0EA5E9" strokeWidth="2">
                      <path d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18z"></path>
                      <path d="M8.7 10.7l2.6 2.6 4-4"></path>
                    </svg>
                  </div>
                </div>
                <motion.div 
                  whileHover={{ y: -5 }}
                  className="mt-8 w-full max-w-md mx-auto bg-white rounded-lg shadow-md p-4 border border-gray-200"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-3 h-3 rounded-full bg-primary-500"></div>
                    <div className="font-medium">Meeting with Client</div>
                  </div>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    <div className="font-medium">Team Standup</div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="font-medium">Project Review</div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Call to Action Section */}
      <section id="cta" className="py-16 bg-primary-600 text-white">
        <div className="container mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 font-heading">
            Ready to Unify Your Communication?
          </h2>
          <p className="text-xl mb-8 max-w-xl mx-auto font-body text-white/90">
            Join thousands of businesses using Omni-Assistant to streamline their customer interactions.
          </p>
          <a 
            href="/auth/signup" 
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-primary-700 font-medium rounded-lg shadow-md hover:bg-gray-100 transition duration-300 text-lg font-body"
          >
            Start Now
            <ArrowRight className="h-5 w-5" />
          </a>
        </div>
      </section>
      
      <Footer />
    </div>
  );
}
