import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


const Form = ({ isOpen, onClose }) => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        fullName: '',
        companyName: '',
        workEmail: '',
        phoneNumber: '',
        role: '',
        industry: '',
        city: '',
        projectRequirement: ''
    });

    const roles = [
        'Creative Director',
        'Head of Production',
        'Marketing Leader',
        'Studio Owner',
        'CEO / Founder',
        'Brand Manager',
        'Other'
    ];

    const industries = [
        'Textile & Garments',
        'Jewellery & Diamonds',
        'Lifestyle & Fashion Brands',
        'Real Estate & Construction',
        'Hospitality & Travel',
        'E-Commerce & Retail',
        'Media & Entertainment',
        'Healthcare & Wellness',
        'Other'
    ];

    const [isSubmitting, setIsSubmitting] = useState(false);



    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const COMPANY_DETAILS = {
        email: 'Info.renewtexaiworlds@gmail.com',
        phone: '+91 81410 80001',
        whatsappNumber: '918141080001',
        companyName: 'RenewTex AI Worlds'
    };

    const getEncodedSubjectAndBody = () => {
        const subject = encodeURIComponent(
            `New Project Inquiry: ${formData.fullName || 'Client'} - ${formData.companyName || 'Brand'}`
        );
        const body = encodeURIComponent(
            `Hello Renew Tex AI Worlds,\n\n` +
            `I would like to discuss commercial visual production for my business.\n\n` +
            `Client Inquiry Details:\n` +
            `• Full Name: ${formData.fullName}\n` +
            `• Company: ${formData.companyName}\n` +
            `• Work Email: ${formData.workEmail}\n` +
            `• Phone: ${formData.phoneNumber}\n` +
            `• Role: ${formData.role || 'N/A'}\n` +
            `• Industry: ${formData.industry || 'N/A'}\n` +
            `• City: ${formData.city || 'N/A'}\n` +
            `• Project Requirement: ${formData.projectRequirement || 'N/A'}\n\n` +
            `Sent via RenewTex AI Worlds Web Portal`
        );
        return { subject, body };
    };

    const handleWhatsApp = () => {
        const text = encodeURIComponent(
            `Hello Renew Tex AI Worlds! My name is ${formData.fullName || 'Client'}${formData.companyName ? ` from ${formData.companyName}` : ''}. I would like to discuss commercial visual production.`
        );
        window.open(`https://wa.me/${COMPANY_DETAILS.whatsappNumber}?text=${text}`, '_blank');
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitting(true);

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

        // Silent best-effort submission to backend (never block or error)
        try {
            fetch('https://miraai.inaiverse.com/submit_form.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    full_name: formData.fullName,
                    company_name: formData.companyName,
                    work_email: formData.workEmail,
                    phone_number: formData.phoneNumber,
                    role: formData.role,
                    industry: formData.industry,
                    city: formData.city,
                    project_requirement: formData.projectRequirement,
                }),
            }).catch(() => {});
        } catch (_) {}

        setIsSubmitting(false);
        if (onClose) onClose();
        navigate('/thank-you');
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center tracking-[0.5px]">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/70 backdrop-blur-sm"
                onClick={onClose}
            />

            {/* Modal */}
            <div className="relative w-[95%] max-w-[700px] max-h-[95vh] overflow-y-auto bg-[#000004] border border-[#22D3EE1A] backdrop-blur-md rounded-2xl p-5 md:p-6 shadow-[0_0_60px_rgba(34,211,238,0.1)] hide-scrollbar font-['Inter']">

                <style>{`
                    .hide-scrollbar::-webkit-scrollbar {
                        display: none;
                    }
                    .hide-scrollbar {
                        -ms-overflow-style: none;
                        scrollbar-width: none;
                    }
                `}</style>


                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors text-2xl"
                >
                    ✕
                </button>

                {/* Title */}
                <h2 className="text-xl md:text-2xl font-bold text-white mb-4 pr-8 tracking-[0.5px]">
                    Get Your Personalized Demo
                </h2>

                {/* Form */}
                <form onSubmit={handleSubmit}>
                    {/* Row 1: Full Name & Company Name */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                        <div>
                            <label className="block text-gray-300 font-bold text-sm mb-1 tracking-[0.5px]">
                                Full Name <span className="text-gray-400 tracking-[0.5px]">*</span>
                            </label>
                            <input
                                type="text"
                                name="fullName"
                                value={formData.fullName}
                                onChange={handleChange}
                                placeholder="Enter your full name"
                                required
                                className="w-full bg-[#000004] border border-[#22D3EE1A] rounded-lg px-4 py-3 text-white text-sm placeholder-gray-500 focus:outline-none focus:border-[#22D3EE] transition-colors"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-300 font-bold text-sm mb-1 tracking-[0.5px]">
                                Company Name <span className="text-gray-400 tracking-[0.5px]">*</span>
                            </label>
                            <input
                                type="text"
                                name="companyName"
                                value={formData.companyName}
                                onChange={handleChange}
                                placeholder="Enter Your Company Name"
                                required
                                className="w-full bg-[#000004] border border-[#22D3EE1A] rounded-lg px-4 py-3 text-white text-sm placeholder-gray-500 focus:outline-none focus:border-[#22D3EE] transition-colors"
                            />
                        </div>
                    </div>

                    {/* Row 2: Work Email & Phone Number */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                        <div>
                            <label className="block text-gray-300 font-bold text-sm mb-1 tracking-[0.5px]">
                                Work Email <span className="text-gray-400 tracking-[0.5px]">*</span>
                            </label>
                            <input
                                type="email"
                                name="workEmail"
                                value={formData.workEmail}
                                onChange={handleChange}
                                placeholder="you@company.com"
                                required
                                className="w-full bg-[#000004] border border-[#22D3EE1A] rounded-lg px-4 py-3 text-white text-sm placeholder-gray-500 focus:outline-none focus:border-[#22D3EE] transition-colors"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-300 font-bold text-sm mb-1 tracking-[0.5px]">
                                Phone Number <span className="text-gray-400 tracking-[0.5px]">*</span>
                            </label>
                            <input
                                type="tel"
                                name="phoneNumber"
                                value={formData.phoneNumber}
                                onChange={handleChange}
                                placeholder="+91 (555) 000-0000"
                                required
                                className="w-full bg-[#000004] border border-[#22D3EE1A] rounded-lg px-4 py-3 text-white text-sm placeholder-gray-500 focus:outline-none focus:border-[#22D3EE] transition-colors"
                            />
                        </div>
                    </div>

                    {/* Row 3: Role & Industry */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                        <div>
                            <label className="block text-gray-300 font-bold text-sm mb-1 tracking-[0.5px]">
                                Role <span className="text-gray-400 tracking-[0.5px]">*</span>
                            </label>
                            <select
                                name="role"
                                value={formData.role}
                                onChange={handleChange}
                                required
                                className="w-full bg-[#000004] border border-[#22D3EE1A] rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-[#22D3EE] transition-colors appearance-none cursor-pointer"
                                style={{
                                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%239CA3AF'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
                                    backgroundRepeat: 'no-repeat',
                                    backgroundPosition: 'right 12px center',
                                    backgroundSize: '20px'
                                }}
                            >
                                <option value="" disabled className="bg-[#0A0A0A]">Your Role</option>
                                {roles.map((role, index) => (
                                    <option key={index} value={role} className="bg-[#0A0A0A]">{role}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="block text-gray-300 font-bold text-sm mb-1 tracking-[0.5px]">
                                Industry / Business Type <span className="text-gray-400 tracking-[0.5px]">*</span>
                            </label>
                            <select
                                name="industry"
                                value={formData.industry}
                                onChange={handleChange}
                                required
                                className="w-full bg-[#000004] border border-[#22D3EE1A] rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-[#22D3EE] transition-colors appearance-none cursor-pointer"
                                style={{
                                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%239CA3AF'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
                                    backgroundRepeat: 'no-repeat',
                                    backgroundPosition: 'right 12px center',
                                    backgroundSize: '20px'
                                }}
                            >
                                <option value="" disabled className="bg-[#0A0A0A]">Select your industry</option>
                                {industries.map((industry, index) => (
                                    <option key={index} value={industry} className="bg-[#0A0A0A]">{industry}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* Row 4: City */}
                    <div className="mb-3">
                        <label className="block text-gray-300 font-bold text-sm mb-1 tracking-[0.5px]">
                            City <span className="text-gray-400 tracking-[0.5px]">*</span>
                        </label>
                        <input
                            type="text"
                            name="city"
                            value={formData.city}
                            onChange={handleChange}
                            placeholder="Enter your city"
                            required
                            className="w-full bg-[#000004] border border-[#22D3EE1A] rounded-lg px-4 py-3 text-white text-sm placeholder-gray-500 focus:outline-none focus:border-[#22D3EE] transition-colors"
                        />
                    </div>

                    {/* Row 5: Project Requirement */}
                    <div className="mb-4">
                        <label className="block text-gray-300 font-bold text-sm mb-1 tracking-[0.5px]">
                            Project Requirement
                        </label>
                        <textarea
                            name="projectRequirement"
                            value={formData.projectRequirement}
                            onChange={handleChange}
                            placeholder='Example: "We need product videos for 50 SKUs in 5 languages"'
                            rows={4}
                            className="w-full bg-[#000004] border border-[#22D3EE1A] rounded-lg px-4 py-3 text-white text-sm placeholder-gray-500 focus:outline-none focus:border-[#22D3EE] transition-colors resize-none"
                        />
                    </div>

                    {/* Submit Button & Direct Channels */}
                    <div className="flex flex-col items-center gap-3 pt-1">
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className={`w-full sm:w-auto group relative bg-white text-black font-bold py-3 px-8 rounded-full flex items-center justify-center gap-2 overflow-hidden transition-all shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:shadow-[0_0_25px_rgba(139,92,246,0.5)] tracking-[0.5px] cursor-pointer ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                        >
                            <span className="relative z-10">✦</span>
                            <span className="relative z-10 block overflow-hidden">
                                <span className="block transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:-translate-y-full">
                                    {isSubmitting ? 'Opening Mail...' : 'Submit Inquiry via Email'}
                                </span>
                                <span className="absolute inset-0 block transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] translate-y-full group-hover:translate-y-0">
                                    {isSubmitting ? 'Opening Mail...' : 'Submit Inquiry via Email'}
                                </span>
                            </span>
                            <span className="relative z-10">✦</span>
                        </button>

                        <button
                            type="button"
                            onClick={handleWhatsApp}
                            className="w-full sm:w-auto py-2.5 px-6 rounded-full bg-[#25D366]/15 hover:bg-[#25D366]/25 border border-[#25D366]/40 text-[#25D366] font-semibold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer"
                        >
                            <span>Chat directly on WhatsApp (+91 81410 80001)</span>
                            <span>💬</span>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Form;