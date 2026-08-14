"use client";

import Link from "next/link";
import Image from "next/image";
import {
    Linkedin,
    Instagram,
    Facebook,
    Github,
    Mail,
    MapPin,
    ArrowUp,
    Send,
} from "lucide-react";

export default function Footer() {
    const scrollToTop = () => {
        if (typeof window !== "undefined") {
            window.scrollTo({ top: 0, behavior: "smooth" });
        }
    };

    const initiatives = [
        { label: "Workshops", href: "/workshops" },
        { label: "Makerspace", href: "/makerspace" },
        { label: "Competitions", href: "/competitions" },
        { label: "Tutorials", href: "/tutorials" },
        { label: "Latest Updates", href: "/updates" },
    ];

    const society = [
        { label: "About TRS", href: "/about" },
        { label: "Team & Leadership", href: "/about#team" },
        { label: "Frequently Asked Questions", href: "/faqs" },
        { label: "Contact Us", href: "/contact" },
    ];

    const socials = [
        {
            label: "LinkedIn",
            href: "https://www.linkedin.com/company/technology-robotix-society",
            icon: Linkedin,
        },
        {
            label: "Instagram",
            href: "https://www.instagram.com/robotix_iitkgp",
            icon: Instagram,
        },
        {
            label: "Facebook",
            href: "https://www.facebook.com/robotixiitkgp",
            icon: Facebook,
        },
        {
            label: "GitHub",
            href: "https://github.com/Technology-Robotix-Society",
            icon: Github,
        },
        {
            label: "Email",
            href: "mailto:contact@robotix.in",
            icon: Mail,
        },
    ];

    return (
        <footer className="w-full bg-[#08090c] border-t border-[#1a1d29] text-[#b7b9c5] relative overflow-hidden">
            {/* Soft Ambient Top Glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 max-w-4xl h-24 bg-[radial-gradient(ellipse_at_top,rgba(57,183,242,0.12),transparent_70%)] pointer-events-none" />

            <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pt-16 pb-12">
                {/* Main Content Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-14">
                    {/* Brand & Mission Column (5 cols) */}
                    <div className="lg:col-span-5 flex flex-col justify-between pr-0 lg:pr-8">
                        <div>
                            <Link href="/" className="inline-flex items-center gap-3 group">
                                <Image
                                    src="/logo.png"
                                    alt="Technology Robotix Society Logo"
                                    width={44}
                                    height={44}
                                    className="object-contain drop-shadow-[0_0_12px_rgba(57,183,242,0.35)] transition-transform duration-300 group-hover:scale-105"
                                />
                                <div>
                                    <h3 className="font-family-grotesk text-[#f5f6f6] text-xl font-bold tracking-tight group-hover:text-[#39b7f2] transition-colors">
                                        Technology Robotix Society
                                    </h3>
                                    <p className="font-family-apk text-xs text-[#71768b] tracking-wider uppercase">
                                        IIT Kharagpur
                                    </p>
                                </div>
                            </Link>

                            <p className="mt-5 font-family-apk text-sm text-[#8e95a5] leading-relaxed max-w-md">
                                The official robotics society of IIT Kharagpur, under the Technology Students&apos; Gymkhana. Dedicated to fostering innovation, cutting-edge hardware development, and robotics education since 2001.
                            </p>
                        </div>

                        {/* Social Links */}
                        <div className="mt-8">
                            <p className="font-family-grotesk-mono text-xs text-[#71768b] uppercase tracking-widest mb-3">
                                Connect With Us
                            </p>
                            <div className="flex items-center gap-2.5 flex-wrap">
                                {socials.map((social) => {
                                    const Icon = social.icon;
                                    return (
                                        <Link
                                            key={social.label}
                                            href={social.href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            aria-label={social.label}
                                            className="w-10 h-10 rounded-lg bg-[#12141d] border border-[#232738] flex items-center justify-center text-[#a0a6b8] hover:text-[#39b7f2] hover:border-[#39b7f2]/60 hover:bg-[#39b7f2]/10 hover:shadow-[0_0_14px_rgba(57,183,242,0.25)] transition-all duration-300 group"
                                        >
                                            <Icon className="w-4 h-4 transition-transform duration-300 group-hover:scale-110" />
                                        </Link>
                                    );
                                })}
                            </div>
                        </div>
                    </div>

                    {/* Column: Initiatives (2.5 cols) */}
                    <div className="lg:col-span-2 sm:col-span-1">
                        <h4 className="font-family-grotesk-mono text-xs font-semibold uppercase tracking-widest text-[#f5f6f6] mb-5 flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#39b7f2]" />
                            Initiatives
                        </h4>
                        <ul className="space-y-3 font-family-apk text-sm">
                            {initiatives.map((item) => (
                                <li key={item.label}>
                                    <Link
                                        href={item.href}
                                        className="text-[#8e95a5] hover:text-[#39b7f2] transition-colors duration-200 inline-flex items-center group"
                                    >
                                        <span className="group-hover:translate-x-1 transition-transform duration-200">
                                            {item.label}
                                        </span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Column: Society (2.5 cols) */}
                    <div className="lg:col-span-2 sm:col-span-1">
                        <h4 className="font-family-grotesk-mono text-xs font-semibold uppercase tracking-widest text-[#f5f6f6] mb-5 flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#39b7f2]" />
                            Society
                        </h4>
                        <ul className="space-y-3 font-family-apk text-sm">
                            {society.map((item) => (
                                <li key={item.label}>
                                    <Link
                                        href={item.href}
                                        className="text-[#8e95a5] hover:text-[#39b7f2] transition-colors duration-200 inline-flex items-center group"
                                    >
                                        <span className="group-hover:translate-x-1 transition-transform duration-200">
                                            {item.label}
                                        </span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Column: Campus & Contact (3 cols) */}
                    <div className="lg:col-span-3 flex flex-col justify-between">
                        <div>
                            <h4 className="font-family-grotesk-mono text-xs font-semibold uppercase tracking-widest text-[#f5f6f6] mb-5 flex items-center gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-[#39b7f2]" />
                                Campus &amp; Lab
                            </h4>
                            
                            <div className="space-y-3.5 font-family-apk text-sm">
                                <div className="flex items-start gap-2.5 text-[#8e95a5]">
                                    <MapPin className="w-4 h-4 text-[#39b7f2] shrink-0 mt-0.5" />
                                    <span>
                                        Technology Students&apos; Gymkhana,<br />
                                        IIT Kharagpur, West Bengal 721302
                                    </span>
                                </div>

                                <div className="flex items-center gap-2.5 text-[#8e95a5]">
                                    <Mail className="w-4 h-4 text-[#39b7f2] shrink-0" />
                                    <a
                                        href="mailto:contact@robotix.in"
                                        className="hover:text-[#39b7f2] transition-colors"
                                    >
                                        contact@robotix.in
                                    </a>
                                </div>
                            </div>
                        </div>

                        {/* Live Society Badge */}
                        <div className="mt-8 p-3.5 rounded-xl bg-[#12141d]/80 border border-[#232738] backdrop-blur-sm">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <span className="relative flex h-2 w-2">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#39b7f2] opacity-75"></span>
                                        <span className="relative inline-flex rounded-full h-2 w-2 bg-[#39b7f2]"></span>
                                    </span>
                                    <span className="font-family-grotesk-mono text-xs font-medium text-[#e2e5eb]">
                                        #robotixiitkgp
                                    </span>
                                </div>
                                <span className="font-family-apk text-[11px] text-[#71768b]">
                                    Where Machines Dare
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Sub-Footer / Bottom Bar */}
                <div className="border-t border-[#1a1d29] pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 font-family-apk text-xs text-[#71768b]">
                    <p className="text-center sm:text-left">
                        © {new Date().getFullYear()} Technology Robotix Society, IIT Kharagpur. All rights reserved.
                    </p>

                    <div className="flex items-center gap-6">
                        <Link
                            href="/contact"
                            className="hover:text-[#39b7f2] transition-colors inline-flex items-center gap-1.5"
                        >
                            <Send className="w-3.5 h-3.5" />
                            <span>Get in touch</span>
                        </Link>

                        <button
                            onClick={scrollToTop}
                            type="button"
                            aria-label="Back to top"
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#12141d] border border-[#232738] text-[#8e95a5] hover:text-[#39b7f2] hover:border-[#39b7f2]/50 hover:bg-[#39b7f2]/10 transition-all duration-300 cursor-pointer"
                        >
                            <span>Back to top</span>
                            <ArrowUp className="w-3.5 h-3.5" />
                        </button>
                    </div>
                </div>
            </div>
        </footer>
    );
}
