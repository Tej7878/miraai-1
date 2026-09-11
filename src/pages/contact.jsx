import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Header from '../components/header';
import Footer from '../components/Footer';
import Form from '../components/form';

const COMPANY_DETAILS = {
  email: 'Info.renewtexaiworlds@gmail.com',
  phone: '+91 94290 67217',
  whatsappNumber: '919429067217',
  companyName: 'RenewTex AI Worlds'
};

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    subject: '',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const services = [
    'AI Video Modeling',
    'AI Photo Modeling',
    'Brand Video Development',
    'AD Marketing Creatives',
    'Catalog & Lookbook Design',
    'Movie Marketing & Posters',
    '3D Product Packaging Design',
    'Speech Video Avatars',
    'Book Development',
    'Concept Shoot & Other'
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const getEncodedSubjectAndBody = () => {
    const serviceText = formData.subject ? ` - ${formData.subject}` : '';
    const subject = encodeURIComponent(
      `New Visual Production Inquiry: ${formData.name || 'Client'}${serviceText}`
    );
    const body = encodeURIComponent(
      `Hello Renew Tex AI Worlds,\n\n` +
      `I would like to discuss commercial visual production for my business.\n\n` +
      `Client Inquiry Details:\n` +
      `• Full Name: ${formData.name}\n` +
      `• Work Email: ${formData.email}\n` +
      `• Phone Number: ${formData.phone || 'N/A'}\n` +
      `• Company / Brand: ${formData.company || 'N/A'}\n` +
      `• Interested Service: ${formData.subject || 'General Inquiry'}\n` +
      `• Project Requirement: ${formData.message || 'N/A'}\n\n` +
      `Sent via RenewTex AI Worlds Contact Portal`
    );
    return { subject, body };
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { subject, body } = getEncodedSubjectAndBody();
    const emailTo = COMPANY_DETAILS.email; // Info.renewtexaiworlds@gmail.com

    const mailtoUrl = `mailto:${emailTo}?subject=${subject}&body=${body}`;
    const gmailWebUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${emailTo}&su=${subject}&body=${body}`;

    const isMobile =
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
      window.innerWidth < 768;

    if (isMobile) {
      window.location.href = mailtoUrl;
    } else {
      window.open(gmailWebUrl, '_blank', 'noopener,noreferrer');
    }

    setSubmitted(true);
  };

  const handleWhatsApp = () => {
    const serviceText = formData.subject ? ` for "${formData.subject}"` : '';
    const text = encodeURIComponent(
      `Hello Renew Tex AI Worlds! My name is ${formData.name || 'Client'}. I would like to discuss commercial visual production${serviceText}.`
    );
    window.open(`https://wa.me/${COMPANY_DETAILS.whatsappNumber}?text=${text}`, '_blank');
  };

  return (
    <div style={{ paddingTop: '92px', width: '100%', minHeight: '100vh', overflowX: 'hidden', position: 'relative' }} className="bg-[#030308] text-white font-['Inter']">
      
      {/* Background Ambient Glows */}
      <div className="absolute top-[10%] left-[15%] w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-[20%] right-[15%] w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />

      {/* Header Navigation */}
      <Header openForm={() => setIsFormOpen(true)} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-12 md:py-20 relative z-10">
        
        {/* Page Heading */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-indigo-500/10 to-purple-500/10 border border-indigo-500/20 backdrop-blur-md shadow-[0_0_20px_rgba(99,102,241,0.15)]">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs font-bold uppercase tracking-widest text-indigo-300">Fast Response Within 2 Hours</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-white via-slate-100 to-slate-400">
            Let's Bring Your Vision To Life
          </h1>

          <p className="text-slate-400 text-base sm:text-lg leading-relaxed font-normal">
            Connect directly with the <span className="text-white font-semibold">{COMPANY_DETAILS.companyName}</span> production team. Choose between direct Email composition or instant WhatsApp chat below.
          </p>
        </div>

        {/* Contact Layout Grid: Info Cards + Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Side: Contact Information & Instant Channels */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* WhatsApp Card */}
            <div className="p-6 sm:p-7 rounded-3xl bg-slate-950/80 border border-emerald-500/30 backdrop-blur-xl shadow-2xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />
              
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-[#25D366]">
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.771-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86s.274.072.376-.043c.101-.116.433-.506.549-.68.116-.173.231-.145.39-.087s1.011.477 1.184.564.289.13.332.202c.045.072.045.419-.1.824zm-3.423-14.416c-6.627 0-12 5.373-12 12 0 2.112.551 4.095 1.516 5.823l-1.611 5.885 6.046-1.586c1.665.91 3.563 1.436 5.584 1.436 6.627 0 12-5.373 12-12s-5.373-12-12-12z"/>
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">Instant WhatsApp Chat</h3>
                  <span className="text-xs text-emerald-400 font-medium">Direct Line to Creative Director</span>
                </div>
              </div>

              <p className="text-sm text-slate-400 mb-5 leading-relaxed">
                Need urgent project timelines, sample quotations, or custom AI solutions? Message us directly on WhatsApp.
              </p>

              <button
                type="button"
                onClick={handleWhatsApp}
                className="w-full py-3.5 px-6 rounded-2xl bg-[#25D366] hover:bg-[#20bd5a] text-black font-extrabold text-sm flex items-center justify-center gap-2 transition-all shadow-[0_0_25px_rgba(37,211,102,0.35)] cursor-pointer"
              >
                <span>Chat on WhatsApp (+91 94290 67217)</span>
                <span>→</span>
              </button>
            </div>

            {/* Direct Email Card */}
            <div className="p-6 sm:p-7 rounded-3xl bg-slate-950/80 border border-indigo-500/30 backdrop-blur-xl shadow-2xl relative overflow-hidden">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-2xl bg-indigo-500/20 border border-indigo-500/40 flex items-center justify-center text-indigo-400">
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                    <polyline points="22,6 12,13 2,6"></polyline>
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">Official Email Inquiry</h3>
                  <span className="text-xs text-indigo-400 font-medium">{COMPANY_DETAILS.email}</span>
                </div>
              </div>

              <p className="text-sm text-slate-400 mb-5 leading-relaxed">
                Submit project RFPs, creative briefs, or commercial partnership queries straight to our management inbox.
              </p>

              <a
                href={`mailto:${COMPANY_DETAILS.email}?subject=Commercial Production Inquiry`}
                className="inline-flex w-full py-3.5 px-6 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm items-center justify-center gap-2 border border-slate-700 transition-all cursor-pointer"
              >
                <span>Write Direct Email</span>
                <span>✉</span>
              </a>
            </div>

            {/* Studio Details */}
            <div className="p-6 rounded-3xl bg-slate-950/50 border border-slate-800/80 space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-300 uppercase tracking-wider">
                <span className="w-2 h-2 rounded-full bg-indigo-400" />
                <span>Production Studio Capabilities</span>
              </div>
              <ul className="text-xs text-slate-400 space-y-2">
                <li>✦ 70% Production Cost Reduction vs Traditional Shoots</li>
                <li>✦ Turnaround: 24 to 72 Hours for Most Campaigns</li>
                <li>✦ Enterprise Confidentiality & Complete Commercial IP Ownership</li>
              </ul>
            </div>

          </div>

          {/* Right Side: Working Contact Form */}
          <div className="lg:col-span-7">
            <div className="p-6 sm:p-9 rounded-3xl bg-slate-950/90 border border-slate-800/90 backdrop-blur-2xl shadow-2xl relative">
              
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-12 text-center space-y-5"
                >
                  <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto text-2xl">
                    ✓
                  </div>
                  <h3 className="text-2xl font-bold text-white">Inquiry Initialized Successfully!</h3>
                  <p className="text-slate-400 text-sm max-w-md mx-auto leading-relaxed">
                    Your email client has been opened with your inquiry details addressed to <span className="text-white font-semibold">{COMPANY_DETAILS.email}</span>. Simply press "Send" in your email app.
                  </p>
                  <div className="pt-4 flex flex-wrap items-center justify-center gap-3">
                    <button
                      onClick={handleWhatsApp}
                      className="px-6 py-3 rounded-full bg-[#25D366] text-black font-bold text-xs flex items-center gap-2 shadow-lg cursor-pointer"
                    >
                      <span>Also Chat on WhatsApp</span>
                      <span>💬</span>
                    </button>
                    <button
                      onClick={() => setSubmitted(false)}
                      className="px-6 py-3 rounded-full bg-slate-900 text-slate-300 hover:text-white border border-slate-700 text-xs font-semibold cursor-pointer"
                    >
                      Send Another Request
                    </button>
                  </div>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="mb-2">
                    <h2 className="text-xl sm:text-2xl font-bold text-white">Send Your Project Details</h2>
                    <p className="text-xs text-slate-400 mt-1">
                      Fill out the details below. We'll automatically route this to our production team via Gmail/Mail.
                    </p>
                  </div>

                  {/* Name & Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                        Your Name <span className="text-indigo-400">*</span>
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        placeholder="John Doe"
                        className="w-full px-4 py-3 rounded-xl bg-slate-900/90 border border-slate-800 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-indigo-500 transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                        Work Email <span className="text-indigo-400">*</span>
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder="john@company.com"
                        className="w-full px-4 py-3 rounded-xl bg-slate-900/90 border border-slate-800 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-indigo-500 transition-colors"
                      />
                    </div>
                  </div>

                  {/* Phone & Company */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                        Phone / WhatsApp <span className="text-indigo-400">*</span>
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        placeholder="+91 98765 43210"
                        className="w-full px-4 py-3 rounded-xl bg-slate-900/90 border border-slate-800 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-indigo-500 transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                        Company / Brand Name
                      </label>
                      <input
                        type="text"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        placeholder="Your Brand or Studio"
                        className="w-full px-4 py-3 rounded-xl bg-slate-900/90 border border-slate-800 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-indigo-500 transition-colors"
                      />
                    </div>
                  </div>

                  {/* Service / Subject */}
                  <div>
                    <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                      Interested Service
                    </label>
                    <select
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl bg-slate-900/90 border border-slate-800 text-white text-sm focus:outline-none focus:border-indigo-500 transition-colors appearance-none cursor-pointer"
                    >
                      <option value="" className="bg-slate-950">Select A Production Service</option>
                      {services.map((srv, i) => (
                        <option key={i} value={srv} className="bg-slate-950">{srv}</option>
                      ))}
                    </select>
                  </div>

                  {/* Message / Project Requirement */}
                  <div>
                    <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                      Project Requirement & Scope
                    </label>
                    <textarea
                      name="message"
                      rows={4}
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tell us about your brand, SKU count, deadlines, or creative vision..."
                      className="w-full px-4 py-3 rounded-xl bg-slate-900/90 border border-slate-800 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-indigo-500 transition-colors resize-none"
                    />
                  </div>

                  {/* Submit Action Buttons */}
                  <div className="pt-3 space-y-3">
                    <button
                      type="submit"
                      className="w-full py-4 px-8 rounded-2xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:from-indigo-400 hover:to-pink-400 text-white font-extrabold text-sm tracking-wide shadow-[0_0_30px_rgba(99,102,241,0.4)] transition-all cursor-pointer flex items-center justify-center gap-2"
                    >
                      <span>Submit Inquiry Via Email (Gmail / Mailto)</span>
                      <span>✦</span>
                    </button>

                    <div className="text-center">
                      <span className="text-xs text-slate-500">or connect in 1-click:</span>
                    </div>

                    <button
                      type="button"
                      onClick={handleWhatsApp}
                      className="w-full py-3 px-6 rounded-2xl bg-[#25D366]/15 hover:bg-[#25D366]/25 border border-[#25D366]/40 text-[#25D366] font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer"
                    >
                      <span>Instant Chat on WhatsApp (+91 94290 67217)</span>
                      <span>💬</span>
                    </button>
                  </div>
                </form>
              )}

            </div>
          </div>

        </div>

      </main>

      {/* Modal Form fallback */}
      <Form isOpen={isFormOpen} onClose={() => setIsFormOpen(false)} />

      {/* Footer */}
      <Footer />

    </div>
  );
}
