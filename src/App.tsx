/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ServicesSection } from './components/ServicesSection';
import { CostEstimator } from './components/CostEstimator';
import { AboutVisionMission } from './components/AboutVisionMission';
import { PestIdentifierGuide } from './components/PestIdentifierGuide';
import { WhyChooseUs } from './components/WhyChooseUs';
import { TestimonialsFAQ } from './components/TestimonialsFAQ';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { QuickBookingModal } from './components/QuickBookingModal';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { AdminDashboard } from './components/AdminDashboard';
import { doc, getDoc, collection, getDocs } from 'firebase/firestore';
import { db } from './firebase';
import { COMPANY_CONFIG, SERVICES_LIST } from './data/hogoData';

export default function App() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [selectedServiceId, setSelectedServiceId] = useState<string | undefined>(undefined);
  
  // Dynamic Cloud State
  const [dynamicSettings, setDynamicSettings] = useState(COMPANY_CONFIG);
  const [dynamicServices, setDynamicServices] = useState(SERVICES_LIST);

  const fetchPublicContent = async () => {
    try {
      const settingsRef = doc(db, 'site_content', 'main_settings');
      const settingsSnap = await getDoc(settingsRef);
      if (settingsSnap.exists()) {
        const data = settingsSnap.data() as any;
        setDynamicSettings(prev => ({
          ...prev,
          name: data.companyName || prev.name,
          tagline: data.tagline || prev.tagline,
          displayPhone: data.phone || prev.displayPhone,
          whatsappNumber: data.whatsapp || prev.whatsappNumber,
          email: data.email || prev.email,
          headquarters: data.address || prev.headquarters,
          logoPath: data.logoUrl || prev.logoPath
        }));
      }

      const servicesSnap = await getDocs(collection(db, 'services'));
      if (!servicesSnap.empty) {
        const cloudServices: any[] = [];
        servicesSnap.forEach(d => {
          cloudServices.push({ id: d.id, ...d.data() });
        });
        setDynamicServices(cloudServices as any);
      }
    } catch (err) {
      console.error('Error fetching public content from Firestore:', err);
    }
  };

  useEffect(() => {
    fetchPublicContent();
  }, []);

  const handleOpenBooking = (serviceId?: string) => {
    setSelectedServiceId(serviceId);
    setIsBookingOpen(true);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans selection:bg-[#0E6B5A] selection:text-white">
      {/* Top Navigation Bar */}
      <Navbar 
        onOpenBooking={() => handleOpenBooking()} 
        onOpenAdmin={() => setIsAdminOpen(true)}
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* 1. Hero Section */}
        <Hero onOpenBooking={() => handleOpenBooking()} />

        {/* 2. Core Pest Control Services */}
        <ServicesSection onSelectServiceToBook={(sId) => handleOpenBooking(sId)} />

        {/* 3. Interactive Cost Estimator */}
        <CostEstimator onOpenBooking={() => handleOpenBooking()} />

        {/* 4. Company Profile & Vision Mission */}
        <AboutVisionMission />

        {/* 5. Pest Identifier Guide */}
        <PestIdentifierGuide onOpenBooking={() => handleOpenBooking()} />

        {/* 6. Why Choose Us */}
        <WhyChooseUs />

        {/* 7. Testimonials & FAQ */}
        <TestimonialsFAQ />

        {/* 8. Contact Section */}
        <ContactSection onOpenBooking={() => handleOpenBooking()} />
      </main>

      {/* Footer */}
      <Footer 
        onOpenBooking={() => handleOpenBooking()} 
        onOpenAdmin={() => setIsAdminOpen(true)}
      />

      {/* Interactive Booking Modal */}
      <QuickBookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        initialServiceId={selectedServiceId}
      />

      {/* Admin CMS Dashboard Modal */}
      <AdminDashboard
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        onContentUpdated={fetchPublicContent}
      />

      {/* Floating WhatsApp Quick Action */}
      <FloatingWhatsApp />
    </div>
  );
}
