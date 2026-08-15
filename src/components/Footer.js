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
    ArrowRight,
    Send,
    Cpu,
    Bot,
    Trophy,
    BookOpen,
    Radio,
    Users,
    Sparkles,
    HelpCircle,
} from "lucide-react";

export default function Footer() {
    const scrollToTop = () => {
        if (typeof window !== "undefined") {
            window.scrollTo({ top: 0, behavior: "smooth" });
        }
    };

    const initiatives = [
        { label: "Workshops", href: "/workshops", icon: Cpu },
        { label: "Makerspace", href: "/makerspace", icon: Bot },
        { label: "Competitions", href: "/competitions", icon: Trophy },
        { label: "Tutorials", href: "/tutorials", icon: BookOpen },
        { label: "Latest Updates", href: "/updates", icon: Radio },
    ];

    const society = [
        { label: "About TRS", href: "/about", icon: Users },
        { label: "Team & Leadership", href: "/about#team", icon: Sparkles },
        { label: "FAQs & Guide", href: "/faqs", icon: HelpCircle },
        { label: "Contact Us", href: "/contact", icon: Send },
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
            {/* Full-width Ambient Top Glow */}
            <div className="absolute top-0 inset-x-0 h-44 bg-[radial-gradient(ellipse_80%_100%_at_50%_0%,rgba(57,183,242,0.14),transparent_75%)] pointer-events-none" />

            {/* Fluid Container matching website layout */}
            <div className="w-full px-6 sm:px-10 md:px-14 lg:px-16 xl:px-20 2xl:px-24 pt-16 lg:pt-20 pb-12">
                {/* Main Content Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 xl:gap-12 2xl:gap-16 pb-16">
                    {/* 1. Brand & Mission Column (4 cols) */}
                    <div className="lg:col-span-4 flex flex-col justify-between">
                        <div>
                            <Link href="/" className="inline-flex items-center gap-3.5 group">
                                <Image
                                    src="/logo.png"
                                    alt="Technology Robotix Society Logo"
                                    width={50}
                                    height={50}
                                    className="object-contain drop-shadow-[0_0_16px_rgba(57,183,242,0.45)] transition-transform duration-300 group-hover:scale-105"
                                />
                                <div>
                                    <h3 className="font-family-grotesk text-[#f5f6f6] text-2xl lg:text-[25px] font-bold tracking-tight group-hover:text-[#39b7f2] transition-colors leading-tight">
                                        Technology Robotix Society
                                    </h3>
                                    <p className="font-family-apk text-xs sm:text-sm text-[#7e8499] tracking-wider uppercase font-medium mt-0.5">
                                        IIT Kharagpur
                                    </p>
                                </div>
                            </Link>

                            <p className="mt-5 font-family-apk text-sm sm:text-base text-[#9ba1b4] leading-relaxed">
                                The official robotics society of IIT Kharagpur, under the Technology Students&apos; Gymkhana. Dedicated to fostering innovation, cutting-edge hardware development, and robotics education since 2001.
                            </p>
                        </div>

                        {/* Social Links */}
                        <div className="mt-8 lg:mt-10">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#39b7f2]/10 border border-[#39b7f2]/30 mb-3.5">
                                <span className="w-2 h-2 rounded-full bg-[#39b7f2] animate-pulse" />
                                <span className="font-family-grotesk-mono text-[#39b7f2] text-xs uppercase tracking-widest font-semibold">
                                    Connect With Us
                                </span>
                            </div>
                            <div className="flex items-center gap-3 flex-wrap">
                                {socials.map((social) => {
                                    const Icon = social.icon;
                                    return (
                                        <Link
                                            key={social.label}
                                            href={social.href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            aria-label={social.label}
                                            className="w-11 h-11 rounded-xl bg-[#121420]/90 border border-[#23273a] flex items-center justify-center text-[#a0a6b8] hover:text-[#39b7f2] hover:border-[#39b7f2]/70 hover:bg-[#39b7f2]/10 hover:shadow-[0_0_16px_rgba(57,183,242,0.3)] transition-all duration-300 group"
                                        >
                                            <Icon className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" />
                                        </Link>
                                    );
                                })}
                            </div>
                        </div>
                    </div>

                    {/* 2. Column: Initiatives (3 cols) */}
                    <div className="lg:col-span-3">
                        <div className="flex flex-col gap-2.5">
                            {initiatives.map((item) => {
                                const Icon = item.icon;
                                return (
                                    <Link
                                        key={item.label}
                                        href={item.href}
                                        className="group flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-[#121420]/80 border border-[#23273a] hover:border-[#39b7f2]/70 hover:bg-[#39b7f2]/10 hover:shadow-[0_0_16px_rgba(57,183,242,0.22)] transition-all duration-300"
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className="w-7 h-7 rounded-lg bg-[#181b2a] border border-[#2c3044] flex items-center justify-center text-[#8e95a5] group-hover:text-[#39b7f2] group-hover:border-[#39b7f2]/50 group-hover:bg-[#39b7f2]/10 transition-colors">
                                                <Icon className="w-3.5 h-3.5" />
                                            </div>
                                            <span className="font-family-apk text-sm lg:text-[15px] font-medium text-[#d6dae3] group-hover:text-white transition-colors">
                                                {item.label}
                                            </span>
                                        </div>
                                        <ArrowRight className="w-4 h-4 text-[#595f73] group-hover:text-[#39b7f2] group-hover:translate-x-0.5 transition-all duration-300 opacity-60 group-hover:opacity-100" />
                                    </Link>
                                );
                            })}
                        </div>
                    </div>

                    {/* 3. Column: Society (2 cols) */}
                    <div className="lg:col-span-2">
                        <div className="flex flex-col gap-2.5">
                            {society.map((item) => {
                                const Icon = item.icon;
                                return (
                                    <Link
                                        key={item.label}
                                        href={item.href}
                                        className="group flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-[#121420]/80 border border-[#23273a] hover:border-[#39b7f2]/70 hover:bg-[#39b7f2]/10 hover:shadow-[0_0_16px_rgba(57,183,242,0.22)] transition-all duration-300"
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className="w-7 h-7 rounded-lg bg-[#181b2a] border border-[#2c3044] flex items-center justify-center text-[#8e95a5] group-hover:text-[#39b7f2] group-hover:border-[#39b7f2]/50 group-hover:bg-[#39b7f2]/10 transition-colors">
                                                <Icon className="w-3.5 h-3.5" />
                                            </div>
                                            <span className="font-family-apk text-sm lg:text-[15px] font-medium text-[#d6dae3] group-hover:text-white transition-colors">
                                                {item.label}
                                            </span>
                                        </div>
                                        <ArrowRight className="w-4 h-4 text-[#595f73] group-hover:text-[#39b7f2] group-hover:translate-x-0.5 transition-all duration-300 opacity-60 group-hover:opacity-100" />
                                    </Link>
                                );
                            })}
                        </div>
                    </div>

                    {/* 4. Column: Campus & Lab (3 cols) */}
                    <div className="lg:col-span-3 flex flex-col justify-between">
                        <div>
                            <div className="space-y-3">
                                {/* Location Card */}
                                <div className="p-3.5 rounded-xl bg-[#121420]/80 border border-[#23273a] flex items-start gap-3">
                                    <div className="w-8 h-8 rounded-lg bg-[#39b7f2]/10 border border-[#39b7f2]/30 flex items-center justify-center text-[#39b7f2] shrink-0 mt-0.5">
                                        <MapPin className="w-4 h-4" />
                                    </div>
                                    <div className="font-family-apk text-sm leading-snug">
                                        <span className="font-semibold text-white block mb-0.5">
                                            Technology Students&apos; Gymkhana
                                        </span>
                                        <span className="text-[#8e95a5] text-xs sm:text-sm">
                                            IIT Kharagpur, West Bengal 721302
                                        </span>
                                    </div>
                                </div>

                                {/* Email Action Card */}
                                <a
                                    href="mailto:contact@robotix.in"
                                    className="group flex items-center justify-between p-3.5 rounded-xl bg-[#121420]/80 border border-[#23273a] hover:border-[#39b7f2]/70 hover:bg-[#39b7f2]/10 hover:shadow-[0_0_16px_rgba(57,183,242,0.22)] transition-all duration-300"
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-lg bg-[#39b7f2]/10 border border-[#39b7f2]/30 flex items-center justify-center text-[#39b7f2] shrink-0 group-hover:bg-[#39b7f2] group-hover:text-[#0b0b0e] transition-colors">
                                            <Mail className="w-4 h-4" />
                                        </div>
                                        <div>
                                            <span className="text-[11px] text-[#7e8499] uppercase tracking-wider block font-family-grotesk-mono">
                                                Direct Inquiry
                                            </span>
                                            <span className="font-family-apk text-sm lg:text-[15px] font-medium text-[#d6dae3] group-hover:text-white transition-colors">
                                                contact@robotix.in
                                            </span>
                                        </div>
                                    </div>
                                    <ArrowRight className="w-4 h-4 text-[#595f73] group-hover:text-[#39b7f2] group-hover:translate-x-1 transition-all duration-300" />
                                </a>
                            </div>
                        </div>

                        {/* Live Society Badge */}
                        <div className="mt-6 p-3.5 rounded-xl bg-[#121420]/90 border border-[#23273a] backdrop-blur-sm shadow-[0_4px_20px_rgba(0,0,0,0.3)]">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2.5">
                                    <span className="relative flex h-2.5 w-2.5">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#39b7f2] opacity-75"></span>
                                        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#39b7f2]"></span>
                                    </span>
                                    <span className="font-family-grotesk-mono text-xs sm:text-sm font-semibold text-[#e2e5eb]">
                                        #robotixiitkgp
                                    </span>
                                </div>
                                <span className="font-family-apk text-xs text-[#39b7f2] bg-[#39b7f2]/10 px-2.5 py-1 rounded-md border border-[#39b7f2]/20 font-medium">
                                    Where Machines Dare
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Sub-Footer / Bottom Bar */}
                <div className="border-t border-[#1a1d29] pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 font-family-apk text-sm text-[#7e8499]">
                    <p className="text-center sm:text-left">
                        © {new Date().getFullYear()} Technology Robotix Society, IIT Kharagpur. All rights reserved.
                    </p>

                    <div className="flex items-center gap-6">
                        <Link
                            href="/contact"
                            className="hover:text-[#39b7f2] transition-colors inline-flex items-center gap-2 group font-medium"
                        >
                            <Send className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                            <span>Get in touch</span>
                        </Link>

                        <button
                            onClick={scrollToTop}
                            type="button"
                            aria-label="Back to top"
                            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-[#121420] border border-[#23273a] text-[#9ba1b4] hover:text-[#39b7f2] hover:border-[#39b7f2]/50 hover:bg-[#39b7f2]/10 transition-all duration-300 cursor-pointer group font-medium"
                        >
                            <span>Back to top</span>
                            <ArrowUp className="w-4 h-4 transition-transform duration-200 group-hover:-translate-y-0.5" />
                        </button>
                    </div>
                </div>
            </div>
        </footer>
    );
}
