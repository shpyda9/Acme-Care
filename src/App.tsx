/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Shield, 
  UserCheck, 
  ChevronRight, 
  Menu, 
  X, 
  CheckCircle2, 
  ArrowRight,
  Accessibility,
  Ambulance,
  Truck,
  Calendar,
  MessageSquare,
  Building2,
  Plus,
  Minus
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Utility for Tailwind class merging
 */
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// --- Shared Components ---

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/services' },
    { name: 'How It Works', path: '/how-it-works' },
    { name: 'About', path: '/about' },
    { name: 'Service Areas', path: '/service-areas' },
    { name: 'FAQ', path: '/faq' },
    { name: 'Facilities', path: '/facilities' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <nav className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
      scrolled ? "bg-white shadow-md py-2" : "bg-white/90 backdrop-blur-sm py-4"
    )}>
      <div className="container-custom flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="bg-primary p-1.5 rounded-lg">
            <Ambulance className="text-white w-6 h-6" />
          </div>
          <span className="font-bold text-xl tracking-tight text-primary">Acme Care</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-8">
          <div className="flex items-center gap-6">
            {navLinks.map((link) => (
              <Link 
                key={link.path} 
                to={link.path}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary",
                  location.pathname === link.path ? "text-primary" : "text-slate-600"
                )}
              >
                {link.name}
              </Link>
            ))}
          </div>
          <div className="flex items-center gap-4">
            <a href="tel:4349443312" className="flex items-center gap-2 text-primary font-bold">
              <Phone className="w-4 h-4" />
              <span>(434) 944-3312</span>
            </a>
            <Link to="/contact" className="btn-primary py-2 px-4 text-sm">
              Book a Ride
            </Link>
          </div>
        </div>

        {/* Mobile Toggle */}
        <button className="lg:hidden p-2 text-slate-600" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white border-t border-slate-100 overflow-hidden"
          >
            <div className="container-custom py-6 flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link 
                  key={link.path} 
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "text-lg font-medium py-2",
                    location.pathname === link.path ? "text-primary" : "text-slate-600"
                  )}
                >
                  {link.name}
                </Link>
              ))}
              <hr className="border-slate-100" />
              <a href="tel:4349443312" className="flex items-center gap-3 text-primary font-bold text-xl py-2">
                <Phone className="w-5 h-5" />
                <span>(434) 944-3312</span>
              </a>
              <Link to="/contact" onClick={() => setIsOpen(false)} className="btn-primary w-full py-4">
                Book a Ride
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-8">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-6">
              <div className="bg-primary p-1.5 rounded-lg">
                <Ambulance className="text-white w-5 h-5" />
              </div>
              <span className="font-bold text-xl text-white">Acme Care</span>
            </div>
            <p className="text-sm leading-relaxed">
              Providing compassionate, reliable, and professional non-emergency medical transportation across the entire state of Virginia.
            </p>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-6">Quick Links</h4>
            <ul className="space-y-3 text-sm">
              <li><Link to="/" className="hover:text-primary transition-colors">Home</Link></li>
              <li><Link to="/services" className="hover:text-primary transition-colors">Services</Link></li>
              <li><Link to="/about" className="hover:text-primary transition-colors">About Us</Link></li>
              <li><Link to="/service-areas" className="hover:text-primary transition-colors">Service Areas</Link></li>
              <li><Link to="/faq" className="hover:text-primary transition-colors">FAQ</Link></li>
              <li><Link to="/contact" className="hover:text-primary transition-colors">Contact Us</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-6">Our Services</h4>
            <ul className="space-y-3 text-sm">
              <li><Link to="/services" className="hover:text-primary transition-colors">Ambulatory Transport</Link></li>
              <li><Link to="/services" className="hover:text-primary transition-colors">Wheelchair Transport</Link></li>
              <li><Link to="/services" className="hover:text-primary transition-colors">Stretcher Transport</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-6">Contact Info</h4>
            <ul className="space-y-4 text-sm">
              <li className="flex gap-3">
                <Phone className="w-5 h-5 text-primary shrink-0" />
                <a href="tel:4349443312" className="hover:text-white transition-colors">(434) 944-3312</a>
              </li>
              <li className="flex gap-3">
                <Mail className="w-5 h-5 text-primary shrink-0" />
                <a href="mailto:acmecarellc@outlook.com" className="hover:text-white transition-colors">acmecarellc@outlook.com</a>
              </li>
              <li className="flex gap-3">
                <MapPin className="w-5 h-5 text-primary shrink-0" />
                <span>98 Laverne Loop, Lynchburg, VA 24502</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs">
          <p>© 2024 Acme Care. All Rights Reserved.</p>
          <div className="flex gap-6">
            <Link to="#" className="hover:text-white">Privacy Policy</Link>
            <Link to="#" className="hover:text-white">Accessibility Statement</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

const PageTransition = ({ children }: { children: React.ReactNode }) => {
  const { pathname } = useLocation();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <motion.div
      key={pathname}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
    >
      {children}
    </motion.div>
  );
};

// --- Page Components ---

const Home = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center pt-20">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=2000" 
            alt="Medical Transport" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-[2px]"></div>
        </div>
        
        <div className="container-custom relative z-10 text-white">
          <div className="max-w-3xl">
            <motion.span 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="inline-block bg-primary px-4 py-1 rounded-full text-sm font-bold mb-6"
            >
              Available Across Virginia
            </motion.span>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-6xl font-bold leading-tight mb-6"
            >
              Safe, Reliable Medical Transportation Across All of Virginia
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-lg md:text-xl text-slate-200 mb-10 leading-relaxed"
            >
              Whether it’s a doctor’s visit, dialysis, or hospital discharge, Acme Care provides compassionate door-to-door transport for ambulatory, wheelchair, and stretcher patients.
            </motion.p>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <a href="tel:4349443312" className="btn-primary text-lg px-8 py-4">
                <Phone className="w-5 h-5" />
                Call (434) 944-3312 Now
              </a>
              <Link to="/contact" className="btn-secondary border-white text-white hover:bg-white/10 text-lg px-8 py-4">
                Schedule Your Ride
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Trust Signals */}
      <section className="bg-slate-50 py-12 border-b border-slate-200">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { icon: Shield, text: "Licensed & Fully Insured" },
              { icon: Clock, text: "Guaranteed On-Time Arrival" },
              { icon: UserCheck, text: "CPR/First Aid Certified Drivers" },
              { icon: MapPin, text: "Serving Every County in VA" },
            ].map((item, i) => (
              <div key={i} className="flex flex-col items-center text-center gap-3">
                <div className="bg-white p-3 rounded-full shadow-sm">
                  <item.icon className="w-6 h-6 text-primary" />
                </div>
                <span className="text-sm font-semibold text-slate-700">{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Specialized Services</h2>
            <p className="text-slate-600">Tailored transportation solutions designed for safety, comfort, and peace of mind.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { 
                title: "Ambulatory Transport", 
                desc: "For patients who can walk but need assistance getting to and from their appointments safely.",
                icon: UserCheck
              },
              { 
                title: "Wheelchair Transport", 
                desc: "Our vehicles feature hydraulic lifts and secure tie-downs to ensure a smooth, safe journey for wheelchair users.",
                icon: Accessibility
              },
              { 
                title: "Stretcher Transport", 
                desc: "Professional bed-to-bed transport for patients who must remain prone during travel.",
                icon: Truck
              }
            ].map((service, i) => (
              <div key={i} className="glass-card p-8 rounded-2xl flex flex-col h-full">
                <div className="bg-secondary w-14 h-14 rounded-xl flex items-center justify-center mb-6">
                  <service.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-4">{service.title}</h3>
                <p className="text-slate-600 mb-8 flex-grow">{service.desc}</p>
                <Link to="/services" className="text-primary font-bold inline-flex items-center gap-2 group">
                  Book This Service <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-primary text-white section-padding overflow-hidden relative">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-white/5 skew-x-12 translate-x-1/2"></div>
        <div className="container-custom relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">The Simple Path to Peace of Mind</h2>
            <p className="text-teal-100">Booking your medical transport has never been easier.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { step: "01", title: "Book Your Ride", desc: "Call us or fill out our simple online form." },
              { step: "02", title: "Get Confirmation", desc: "We'll confirm your pickup time and specialized needs." },
              { step: "03", title: "Professional Pickup", desc: "Our trained driver arrives on time to assist you." },
              { step: "04", title: "Safe Arrival", desc: "We ensure you are safely inside your destination." }
            ].map((item, i) => (
              <div key={i} className="relative">
                <div className="text-5xl font-black text-white/20 mb-4">{item.step}</div>
                <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                <p className="text-teal-50 text-sm leading-relaxed">{item.desc}</p>
                {i < 3 && <ArrowRight className="hidden md:block absolute top-1/2 -right-4 text-white/30 w-6 h-6" />}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="section-padding">
        <div className="container-custom grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <img 
              src="https://images.unsplash.com/photo-1581056771107-24ca5f033842?auto=format&fit=crop&q=80&w=1000" 
              alt="Caring Driver" 
              className="rounded-3xl shadow-2xl"
              referrerPolicy="no-referrer"
            />
          </div>
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">More Than Just a Ride—We Care for Your Loved Ones.</h2>
            <div className="space-y-6">
              {[
                { title: "Compassion First", desc: "We treat every patient with the dignity and respect they deserve." },
                { title: "Statewide Coverage", desc: "From Lynchburg to Richmond, we go wherever you need to be." },
                { title: "Modern Fleet", desc: "Our vehicles are meticulously cleaned and equipped with safety tech." },
                { title: "Hospital Preferred", desc: "Trusted by Virginia's leading facilities for reliable discharges." }
              ].map((item, i) => (
                <div key={i} className="flex gap-4">
                  <div className="bg-secondary p-2 rounded-lg h-fit">
                    <CheckCircle2 className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-1">{item.title}</h4>
                    <p className="text-slate-600 text-sm">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <Link to="/about" className="btn-primary mt-10">
              Learn More About Us
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-slate-50 section-padding">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Families Say</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              { 
                quote: "Acme Care was a lifesaver when my father needed transport for his dialysis. The driver was so patient and kind. Highly recommend!", 
                author: "Sarah M.", 
                location: "Lynchburg" 
              },
              { 
                quote: "Professional, on-time, and very clean vehicles. They made my mother's hospital discharge completely stress-free.", 
                author: "David R.", 
                location: "Richmond" 
              }
            ].map((t, i) => (
              <div key={i} className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 italic">
                <p className="text-lg text-slate-700 mb-6">"{t.quote}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-primary font-bold">
                    {t.author[0]}
                  </div>
                  <div>
                    <div className="font-bold text-slate-900">{t.author}</div>
                    <div className="text-xs text-slate-500 uppercase tracking-wider">{t.location}, VA</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="bg-primary rounded-[2rem] p-8 md:p-16 text-center text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/10 to-transparent"></div>
            <div className="relative z-10 max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-5xl font-bold mb-6">Need a Reliable Ride Today?</h2>
              <p className="text-teal-50 text-lg mb-10">Our team is standing by to assist you. Don't miss your next appointment.</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href="tel:4349443312" className="bg-accent text-white px-8 py-4 rounded-xl font-bold text-xl shadow-lg hover:bg-amber-600 transition-all flex items-center justify-center gap-3">
                  <Phone className="w-6 h-6" />
                  Call (434) 944-3312 Now
                </a>
                <Link to="/contact" className="bg-white text-primary px-8 py-4 rounded-xl font-bold text-xl shadow-lg hover:bg-teal-50 transition-all">
                  Schedule a Ride
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

const Services = () => {
  const services = [
    {
      title: "Ambulatory Transportation",
      who: "Seniors, post-surgery patients, and individuals with limited mobility.",
      benefits: ["Door-to-through-door service", "Assistance with bags", "Friendly companion for the trip"],
      useCases: ["General check-ups", "Physical therapy", "Social outings"],
      img: "https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&q=80&w=1000"
    },
    {
      title: "Wheelchair Transportation",
      who: "Permanent or temporary wheelchair users.",
      benefits: ["Industry-standard 4-point securement", "Extra-wide hydraulic ramps", "Room for one companion free"],
      useCases: ["Dialysis appointments", "Specialist visits", "Family events"],
      img: "https://images.unsplash.com/photo-1534723328310-e82dad3ee43f?auto=format&fit=crop&q=80&w=1000"
    },
    {
      title: "Stretcher Transportation",
      who: "Bed-bound patients or those requiring spinal stabilization.",
      benefits: ["Two-person crews for safe lifting", "Soft-ride suspension", "Constant monitoring"],
      useCases: ["Hospital-to-nursing home transfers", "Rehab center admissions", "Long-distance medical moves"],
      img: "https://images.unsplash.com/photo-1587350846662-3cd065b38611?auto=format&fit=crop&q=80&w=1000"
    }
  ];

  return (
    <div className="pt-24">
      <section className="bg-slate-50 py-16">
        <div className="container-custom text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Our Specialized Services</h1>
          <p className="text-slate-600 max-w-2xl mx-auto">We provide safe, professional transport tailored to your specific mobility needs across the entire state of Virginia.</p>
        </div>
      </section>

      {services.map((s, i) => (
        <section key={i} className={cn("section-padding", i % 2 === 1 ? "bg-slate-50" : "bg-white")}>
          <div className="container-custom grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className={cn(i % 2 === 1 ? "lg:order-2" : "")}>
              <h2 className="text-3xl font-bold mb-6 text-primary">{s.title}</h2>
              <p className="text-lg text-slate-700 mb-8 font-medium">Who it's for: <span className="font-normal text-slate-600">{s.who}</span></p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
                <div>
                  <h4 className="font-bold mb-4 flex items-center gap-2"><CheckCircle2 className="w-5 h-5 text-primary" /> Key Benefits</h4>
                  <ul className="space-y-2 text-slate-600 text-sm">
                    {s.benefits.map((b, j) => <li key={j}>• {b}</li>)}
                  </ul>
                </div>
                <div>
                  <h4 className="font-bold mb-4 flex items-center gap-2"><Calendar className="w-5 h-5 text-primary" /> Use Cases</h4>
                  <ul className="space-y-2 text-slate-600 text-sm">
                    {s.useCases.map((u, j) => <li key={j}>• {u}</li>)}
                  </ul>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <a href="tel:4349443312" className="btn-primary">Call (434) 944-3312</a>
                <Link to="/contact" className="btn-secondary">Schedule a Ride</Link>
              </div>
            </div>
            <div className={cn(i % 2 === 1 ? "lg:order-1" : "")}>
              <img src={s.img} alt={s.title} className="rounded-3xl shadow-xl w-full aspect-video object-cover" referrerPolicy="no-referrer" />
            </div>
          </div>
        </section>
      ))}
    </div>
  );
};

const HowItWorks = () => {
  return (
    <div className="pt-24">
      <section className="bg-slate-50 py-16">
        <div className="container-custom text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">How It Works</h1>
          <p className="text-slate-600 max-w-2xl mx-auto">We've made booking a ride as easy as possible so you can focus on your health.</p>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-custom max-w-4xl">
          <div className="space-y-12">
            {[
              { 
                title: "Request Your Ride", 
                desc: "Call (434) 944-3312 or use our online booking tool. Provide the date, time, and type of assistance needed (Ambulatory, Wheelchair, or Stretcher).",
                icon: MessageSquare
              },
              { 
                title: "Quote & Confirm", 
                desc: "We provide a transparent price and confirm your driver’s arrival window. No hidden fees, ever.",
                icon: CheckCircle2
              },
              { 
                title: "The Journey", 
                desc: "Our driver assists you from your door into the vehicle, ensuring you are comfortable and secure throughout the trip.",
                icon: Truck
              },
              { 
                title: "Safe Hand-off", 
                desc: "We don't just drop you at the curb. We ensure you are checked in at your appointment or safely inside your home before we leave.",
                icon: UserCheck
              }
            ].map((step, i) => (
              <div key={i} className="flex gap-8 items-start">
                <div className="bg-primary text-white w-12 h-12 rounded-full shrink-0 flex items-center justify-center font-bold text-xl">
                  {i + 1}
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-3">{step.title}</h3>
                  <p className="text-slate-600 leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-20 bg-secondary p-8 rounded-3xl text-center">
            <h3 className="text-2xl font-bold mb-4">Ready to get started?</h3>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="tel:4349443312" className="btn-primary">Call Now</a>
              <Link to="/contact" className="btn-secondary">Book Online</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

const About = () => {
  return (
    <div className="pt-24">
      <section className="bg-slate-50 py-16">
        <div className="container-custom text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Our Mission</h1>
          <p className="text-slate-600 max-w-2xl mx-auto">To provide the highest standard of non-emergency medical transportation in Virginia, rooted in dignity, safety, and reliability.</p>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-custom grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-6">Our Story</h2>
            <p className="text-slate-600 mb-6 leading-relaxed">
              Founded in Lynchburg, Acme Care was born out of a need for more compassionate transport options for our community's seniors and disabled residents. We realized that for many, getting to a doctor's appointment was the most stressful part of their day.
            </p>
            <p className="text-slate-600 mb-8 leading-relaxed">
              We decided to change that by building a company that prioritizes the patient's comfort and dignity above all else. Today, we serve the entire state of Virginia with that same local heart.
            </p>
            <div className="bg-slate-50 p-6 rounded-2xl border-l-4 border-primary">
              <p className="italic text-slate-700">"We don't just move people; we care for them as if they were our own family."</p>
            </div>
          </div>
          <div>
            <img 
              src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=1000" 
              alt="Healthcare Team" 
              className="rounded-3xl shadow-xl"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>
      </section>

      <section className="bg-slate-900 text-white section-padding">
        <div className="container-custom text-center">
          <h2 className="text-3xl font-bold mb-12">Our Core Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { title: "Dignity", desc: "Respecting every individual's independence and humanity." },
              { title: "Safety", desc: "Rigorous training and vehicle maintenance for zero-compromise security." },
              { title: "Reliability", desc: "Being there when we say we will, every single time." }
            ].map((v, i) => (
              <div key={i}>
                <h4 className="text-primary text-xl font-bold mb-4">{v.title}</h4>
                <p className="text-slate-400">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

const ServiceAreas = () => {
  const regions = [
    { name: "Central Virginia", cities: ["Lynchburg (HQ)", "Charlottesville", "Roanoke", "Bedford", "Campbell County"] },
    { name: "Richmond Metro", cities: ["Richmond", "Henrico", "Chesterfield", "Hanover", "Petersburg"] },
    { name: "Hampton Roads", cities: ["Virginia Beach", "Norfolk", "Chesapeake", "Newport News", "Portsmouth"] },
    { name: "Northern Virginia", cities: ["Arlington", "Alexandria", "Fairfax", "Loudoun", "Prince William"] }
  ];

  return (
    <div className="pt-24">
      <section className="bg-slate-50 py-16">
        <div className="container-custom text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Statewide Coverage. Local Heart.</h1>
          <p className="text-slate-600 max-w-2xl mx-auto">While we are based in Lynchburg, our fleet travels daily to serve patients in every corner of the Commonwealth.</p>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {regions.map((r, i) => (
              <div key={i} className="glass-card p-8 rounded-2xl">
                <h3 className="text-xl font-bold mb-6 text-primary border-b border-slate-100 pb-4">{r.name}</h3>
                <ul className="space-y-3">
                  {r.cities.map((c, j) => (
                    <li key={j} className="flex items-center gap-2 text-slate-600">
                      <MapPin className="w-4 h-4 text-primary shrink-0" />
                      {c}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          
          <div className="mt-16 text-center max-w-3xl mx-auto">
            <div className="bg-secondary p-8 rounded-3xl">
              <h3 className="text-2xl font-bold mb-4">Don't see your city?</h3>
              <p className="text-slate-600 mb-6">We serve <span className="font-bold text-primary">every zip code in Virginia</span>. Whether you're in a major city or a rural county, we will get you to your appointment.</p>
              <a href="tel:4349443312" className="btn-primary">Call for a Custom Quote</a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    { q: "Do you accept insurance?", a: "We work with various insurance providers, Medicaid brokers, and private pay. Please call us to verify your specific coverage." },
    { q: "How far in advance should I book?", a: "We recommend 24-48 hours notice, but we always try to accommodate same-day 'urgent' requests whenever possible." },
    { q: "Are your drivers trained?", a: "Yes, all drivers undergo rigorous background checks, drug testing, and are CPR/First Aid certified." },
    { q: "Can a family member ride with me?", a: "Yes, one companion may ride free of charge with any patient to provide additional support." },
    { q: "Do you provide door-to-door service?", a: "Absolutely. We assist you from inside your home to inside your destination, ensuring a safe hand-off." },
    { q: "What are your hours of operation?", a: "We provide transport 24/7 by appointment. Our scheduling office is available Monday-Friday, 8 AM - 6 PM." },
    { q: "Are your vehicles ADA-compliant?", a: "Yes, our entire fleet meets or exceeds ADA safety standards for wheelchair and stretcher transport." },
    { q: "Do you do long-distance trips?", a: "Yes, we provide transportation to any destination within Virginia and even to neighboring states for specialized care." }
  ];

  return (
    <div className="pt-24">
      <section className="bg-slate-50 py-16">
        <div className="container-custom text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Frequently Asked Questions</h1>
          <p className="text-slate-600 max-w-2xl mx-auto">Find answers to common questions about our services and booking process.</p>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-custom max-w-3xl">
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div key={i} className="border border-slate-200 rounded-xl overflow-hidden">
                <button 
                  className="w-full p-5 text-left flex justify-between items-center bg-white hover:bg-slate-50 transition-colors"
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                >
                  <span className="font-bold text-slate-800">{faq.q}</span>
                  {openIndex === i ? <Minus className="w-5 h-5 text-primary" /> : <Plus className="w-5 h-5 text-primary" />}
                </button>
                <AnimatePresence>
                  {openIndex === i && (
                    <motion.div 
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="bg-slate-50 overflow-hidden"
                    >
                      <div className="p-5 text-slate-600 leading-relaxed border-t border-slate-200">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
          
          <div className="mt-16 text-center">
            <p className="text-slate-600 mb-6">Still have questions?</p>
            <a href="tel:4349443312" className="btn-primary">
              <Phone className="w-5 h-5" />
              Call (434) 944-3312
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

const Facilities = () => {
  return (
    <div className="pt-24">
      <section className="bg-slate-50 py-16">
        <div className="container-custom text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Facility Partnerships</h1>
          <p className="text-slate-600 max-w-2xl mx-auto">Reliable transportation solutions for hospitals, nursing homes, and rehab centers.</p>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-custom grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-6">Partner with Virginia’s Most Reliable NEMT Provider</h2>
            <p className="text-slate-600 mb-8 leading-relaxed">
              We understand the challenges of patient discharge and appointment scheduling. Acme Care works as an extension of your facility, ensuring that your patients get where they need to be safely and on time.
            </p>
            <div className="space-y-6 mb-10">
              {[
                { title: "Reduced Wait Times", desc: "We prioritize facility discharges to keep your beds turning and your flow efficient." },
                { title: "Seamless Scheduling", desc: "Dedicated direct lines for facility partners to ensure rapid response." },
                { title: "Professional Hand-offs", desc: "Our drivers are trained to handle medical paperwork and ensure safe room-to-room transfers." }
              ].map((item, i) => (
                <div key={i} className="flex gap-4">
                  <div className="bg-secondary p-2 rounded-lg h-fit">
                    <Building2 className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-1">{item.title}</h4>
                    <p className="text-slate-600 text-sm">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <a href="tel:4349443312" className="btn-primary">
              Call to Set Up a Facility Account
            </a>
          </div>
          <div>
            <img 
              src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=1000" 
              alt="Hospital Facility" 
              className="rounded-3xl shadow-xl"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

const Contact = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="pt-24">
      <section className="bg-slate-50 py-16">
        <div className="container-custom text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Book Your Ride</h1>
          <p className="text-slate-600 max-w-2xl mx-auto">Our team is ready to assist you. Call us directly or fill out the form below.</p>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-1 space-y-8">
              <div className="bg-primary text-white p-8 rounded-3xl shadow-xl">
                <h3 className="text-2xl font-bold mb-6">Contact Us Directly</h3>
                <div className="space-y-6">
                  <a href="tel:4349443312" className="flex items-center gap-4 group">
                    <div className="bg-white/10 p-3 rounded-xl group-hover:bg-white/20 transition-colors">
                      <Phone className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="text-teal-100 text-sm">Call Now</div>
                      <div className="font-bold text-xl">(434) 944-3312</div>
                    </div>
                  </a>
                  <a href="mailto:acmecarellc@outlook.com" className="flex items-center gap-4 group">
                    <div className="bg-white/10 p-3 rounded-xl group-hover:bg-white/20 transition-colors">
                      <Mail className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="text-teal-100 text-sm">Email Us</div>
                      <div className="font-bold text-lg">acmecarellc@outlook.com</div>
                    </div>
                  </a>
                  <div className="flex items-center gap-4">
                    <div className="bg-white/10 p-3 rounded-xl">
                      <MapPin className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="text-teal-100 text-sm">Our Location</div>
                      <div className="font-bold">98 Laverne Loop, Lynchburg, VA 24502</div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-slate-50 p-8 rounded-3xl border border-slate-200">
                <h4 className="font-bold mb-4">Quick Reassurance</h4>
                <p className="text-sm text-slate-600 leading-relaxed">
                  "We respond quickly to all ride requests. Your safety and comfort are our top priorities. All information is kept strictly confidential."
                </p>
              </div>
            </div>

            <div className="lg:col-span-2">
              {submitted ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-secondary p-12 rounded-3xl text-center border-2 border-primary/20"
                >
                  <div className="bg-primary w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 text-white">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <h3 className="text-3xl font-bold mb-4 text-primary">Request Received!</h3>
                  <p className="text-slate-600 text-lg mb-8">Thank you for choosing Acme Care. A member of our team will contact you within 60 minutes to confirm your ride details.</p>
                  <button onClick={() => setSubmitted(false)} className="btn-primary">Send Another Request</button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="glass-card p-8 md:p-12 rounded-3xl space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-700">Full Name</label>
                      <input required type="text" className="w-full p-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all" placeholder="John Doe" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-700">Phone Number</label>
                      <input required type="tel" className="w-full p-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all" placeholder="(555) 000-0000" />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700">Email Address</label>
                    <input required type="email" className="w-full p-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all" placeholder="john@example.com" />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-700">Pickup Location</label>
                      <input required type="text" className="w-full p-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all" placeholder="Street Address, City" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-700">Drop-off Location</label>
                      <input required type="text" className="w-full p-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all" placeholder="Street Address, City" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-700">Transport Type</label>
                      <select className="w-full p-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all bg-white">
                        <option>Ambulatory</option>
                        <option>Wheelchair</option>
                        <option>Stretcher</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-700">Date</label>
                      <input required type="date" className="w-full p-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-700">Time</label>
                      <input required type="time" className="w-full p-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700">Additional Notes</label>
                    <textarea className="w-full p-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all h-32" placeholder="Any special requirements? (e.g. Oxygen, stairs at pickup)"></textarea>
                  </div>

                  <button type="submit" className="btn-primary w-full py-4 text-lg">
                    Submit Booking Request
                  </button>
                  <p className="text-center text-xs text-slate-500">By submitting, you agree to be contacted by Acme Care regarding your request.</p>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

// --- Main App ---

export default function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow">
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/" element={<PageTransition><Home /></PageTransition>} />
              <Route path="/services" element={<PageTransition><Services /></PageTransition>} />
              <Route path="/how-it-works" element={<PageTransition><HowItWorks /></PageTransition>} />
              <Route path="/about" element={<PageTransition><About /></PageTransition>} />
              <Route path="/service-areas" element={<PageTransition><ServiceAreas /></PageTransition>} />
              <Route path="/faq" element={<PageTransition><FAQ /></PageTransition>} />
              <Route path="/facilities" element={<PageTransition><Facilities /></PageTransition>} />
              <Route path="/contact" element={<PageTransition><Contact /></PageTransition>} />
            </Routes>
          </AnimatePresence>
        </main>
        <Footer />
      </div>
    </Router>
  );
}
