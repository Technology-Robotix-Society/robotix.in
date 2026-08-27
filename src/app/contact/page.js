"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
    Linkedin,
    Instagram,
    Facebook,
    Github,
    Mail,
    MapPin,
    ArrowUpRight,
    ArrowRight,
    Send,
    Copy,
    Check,
    HelpCircle,
    Bot,
} from "lucide-react";
import useScrambleText from "@/hooks/useScrambleText";

export default function Contact() {
    const displayText = useScrambleText("Get in touch");
    const [copied, setCopied] = useState(false);
    const [touchSrc, setTouchSrc] = useState("/touch.png");

    const handleCopyEmail = () => {
        if (typeof navigator !== "undefined" && navigator.clipboard) {
            navigator.clipboard.writeText("contact@robotix.in");
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    // Social Media handles first, followed by LinkedIn, GitHub, and direct Email at the end
    const handles = [
        {
            name: "Instagram",
            handle: "@robotix_iitkgp",
            href: "https://www.instagram.com/robotix_iitkgp",
            icon: Instagram,
            description: "Follow for stories, project reels, event updates & society life",
        },
        {
            name: "Facebook",
            handle: "@robotixiitkgp",
            href: "https://www.facebook.com/robotixiitkgp",
            icon: Facebook,
            description: "Official updates, event broadcasts, workshop schedules & announcements",
        },
        {
            name: "LinkedIn",
            handle: "Technology Robotix Society",
            href: "https://www.linkedin.com/company/technology-robotix-society",
            icon: Linkedin,
            description: "Professional networking, corporate relations, industry tie-ups & alumni",
        },
        {
            name: "GitHub",
            handle: "Technology-Robotix-Society",
            href: "https://github.com/Technology-Robotix-Society",
            icon: Github,
            description: "Open-source robotics codebases, hardware designs, ROS packages & firmware",
        },
        {
            name: "Email",
            handle: "contact@robotix.in",
            href: "mailto:contact@robotix.in",
            icon: Mail,
            description: "Official correspondence, collaboration proposals, partnerships & general inquiries",
        },
    ];

    return (
        <main className="bg-[#0b0b0e] min-h-screen relative pt-28 sm:pt-32 md:pt-36 pb-20 px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20 text-[#d6dae3]">
            {/* Ambient Background Glow */}
            <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#39b7f2]/10 blur-[140px] pointer-events-none -z-10 rounded-full" />

            {/* Subtle Desktop Vertical Guides */}
            <div className="hidden lg:block absolute left-8 xl:left-12 w-px top-0 h-full bg-[#424453]/20 pointer-events-none" />
            <div className="hidden lg:block absolute right-8 xl:right-12 w-px top-0 h-full bg-[#8b8fae]/20 pointer-events-none" />

            <div className="max-w-7xl mx-auto">
                {/* ──────────────────────────────────────────────────────────
                    HERO HEADER (Text on Left, Touch Media on Right)
                ────────────────────────────────────────────────────────── */}
                <div className="border-b border-[#23273a] pb-10 mb-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
                    {/* Left Text */}
                    <div className="flex-1 max-w-3xl">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#39b7f2]/10 border border-[#39b7f2]/30 text-[#39b7f2] text-xs font-family-grotesk-mono font-semibold uppercase tracking-widest mb-4">
                            <Send className="w-3.5 h-3.5" />
                            <span>Connect With Us</span>
                        </div>

                        <h1 className="text-[#f5f6f6] font-family-grotesk text-4xl sm:text-6xl md:text-7xl lg:text-[85px] xl:text-[95px] font-bold tracking-tight leading-none mb-6">
                            {displayText}
                        </h1>

                        <p className="font-family-apk text-base sm:text-lg md:text-xl text-[#9ba1b4] leading-relaxed">
                            Have questions about Technology Robotix Society, workshop enrollments, collaborations,
                            or inductions? Reach out to us through our social media handles, email us directly, or visit our makerspace at IIT Kharagpur.
                        </p>
                    </div>

                    {/* Right Media (Unboxed, bounded by text height) */}
                    <div className="lg:w-[260px] xl:w-[300px] shrink-0 flex items-center justify-center lg:justify-end self-center">
                        <Image
                            src={touchSrc}
                            alt="Get in touch visual"
                            width={280}
                            height={280}
                            unoptimized
                            onError={() => {
                                if (touchSrc === "/touch.png") setTouchSrc("/touch.gif");
                                else if (touchSrc === "/touch.gif") setTouchSrc("/touch.png");
                            }}
                            className="w-[200px] sm:w-[230px] lg:w-[250px] xl:w-[280px] h-auto object-contain"
                        />
                    </div>
                </div>

                {/* ──────────────────────────────────────────────────────────
                    MAIN CONTENT: 2-COLUMN GRID
                ────────────────────────────────────────────────────────── */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
                    {/* LEFT COLUMN: SOCIAL & CONNECT BOXES (7 COLS) */}
                    <div className="lg:col-span-7 flex flex-col gap-4">
                        <div className="flex items-center justify-between mb-1">
                            <span className="uppercase font-family-grotesk-mono text-xs font-bold text-[#8e95a5] tracking-wider">
                                Handles & Links
                            </span>
                            <span className="font-family-apk text-xs text-[#6e7488]">
                                Click to connect
                            </span>
                        </div>

                        {/* Solid, purposeful handle boxes */}
                        {handles.map((item) => {
                            const Icon = item.icon;
                            return (
                                <a
                                    key={item.name}
                                    href={item.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group flex items-center justify-between p-4 sm:p-4.5 rounded-xl bg-[#121420]/80 border border-[#23273a] hover:border-[#39b7f2]/70 hover:bg-[#39b7f2]/10 transition-all duration-300"
                                >
                                    <div className="flex items-center gap-3.5 sm:gap-4 min-w-0">
                                        <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-lg bg-[#181b2a] border border-[#2c3044] flex items-center justify-center text-[#8e95a5] group-hover:text-[#39b7f2] group-hover:border-[#39b7f2]/50 group-hover:bg-[#39b7f2]/10 transition-colors shrink-0">
                                            <Icon className="w-5 h-5" />
                                        </div>
                                        <div className="min-w-0">
                                            <div className="flex items-center gap-2 flex-wrap">
                                                <span className="font-family-grotesk text-base sm:text-lg font-bold text-[#f5f6f6] group-hover:text-white transition-colors">
                                                    {item.name}
                                                </span>
                                                <span className="font-family-grotesk-mono text-xs text-[#7e8499] group-hover:text-[#39b7f2] transition-colors">
                                                    {item.handle}
                                                </span>
                                            </div>
                                            <p className="font-family-apk text-xs sm:text-sm text-[#8e95a5] mt-0.5 truncate max-w-md">
                                                {item.description}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="w-8 h-8 rounded-lg flex items-center justify-center text-[#595f73] group-hover:text-[#39b7f2] transition-colors shrink-0 ml-2">
                                        <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                                    </div>
                                </a>
                            );
                        })}

                        {/* Quick Resource Shortcuts */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mt-2">
                            <Link
                                href="/faqs"
                                className="group flex items-center justify-between p-3.5 rounded-xl bg-[#121420]/60 border border-[#23273a] hover:border-[#39b7f2]/70 hover:bg-[#39b7f2]/10 transition-all duration-300"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-lg bg-[#181b2a] border border-[#2c3044] flex items-center justify-center text-[#8e95a5] group-hover:text-[#39b7f2] group-hover:border-[#39b7f2]/50 group-hover:bg-[#39b7f2]/10 transition-colors">
                                        <HelpCircle className="w-4 h-4" />
                                    </div>
                                    <span className="font-family-apk text-sm font-medium text-[#d6dae3] group-hover:text-white transition-colors">
                                        FAQs & Guide
                                    </span>
                                </div>
                                <ArrowRight className="w-4 h-4 text-[#595f73] group-hover:text-[#39b7f2] group-hover:translate-x-0.5 transition-all" />
                            </Link>

                            <Link
                                href="/makerspace"
                                className="group flex items-center justify-between p-3.5 rounded-xl bg-[#121420]/60 border border-[#23273a] hover:border-[#39b7f2]/70 hover:bg-[#39b7f2]/10 transition-all duration-300"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-lg bg-[#181b2a] border border-[#2c3044] flex items-center justify-center text-[#8e95a5] group-hover:text-[#39b7f2] group-hover:border-[#39b7f2]/50 group-hover:bg-[#39b7f2]/10 transition-colors">
                                        <Bot className="w-4 h-4" />
                                    </div>
                                    <span className="font-family-apk text-sm font-medium text-[#d6dae3] group-hover:text-white transition-colors">
                                        Makerspace & Lab
                                    </span>
                                </div>
                                <ArrowRight className="w-4 h-4 text-[#595f73] group-hover:text-[#39b7f2] group-hover:translate-x-0.5 transition-all" />
                            </Link>
                        </div>
                    </div>

                    {/* RIGHT COLUMN: DIRECT EMAIL & INTERACTIVE MAP (5 COLS) */}
                    <div className="lg:col-span-5 flex flex-col gap-4">
                        {/* Direct Email Action Box */}
                        <div className="p-4 sm:p-5 rounded-xl bg-[#121420]/80 border border-[#23273a] flex flex-col gap-3">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="w-9 h-9 rounded-lg bg-[#39b7f2]/10 border border-[#39b7f2]/30 flex items-center justify-center text-[#39b7f2]">
                                        <Mail className="w-4 h-4" />
                                    </div>
                                    <div>
                                        <span className="text-[11px] uppercase tracking-wider text-[#7e8499] block font-family-grotesk-mono font-semibold">
                                            Direct Inquiry
                                        </span>
                                        <span className="font-family-grotesk text-sm font-bold text-white">
                                            Official Email
                                        </span>
                                    </div>
                                </div>

                                <button
                                    onClick={handleCopyEmail}
                                    type="button"
                                    aria-label="Copy email address"
                                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#181b2a] border border-[#2c3044] text-xs font-family-grotesk-mono text-[#a0a6b8] hover:text-[#39b7f2] hover:border-[#39b7f2]/50 hover:bg-[#39b7f2]/10 transition-all duration-300 cursor-pointer"
                                >
                                    {copied ? (
                                        <>
                                            <Check className="w-3.5 h-3.5 text-emerald-400" />
                                            <span className="text-emerald-400">Copied!</span>
                                        </>
                                    ) : (
                                        <>
                                            <Copy className="w-3.5 h-3.5" />
                                            <span>Copy</span>
                                        </>
                                    )}
                                </button>
                            </div>

                            <a
                                href="mailto:contact@robotix.in"
                                className="group flex items-center justify-between p-3 rounded-lg bg-[#0e1019] border border-[#1f2334] hover:border-[#39b7f2]/70 hover:bg-[#39b7f2]/10 transition-all duration-300"
                            >
                                <span className="font-family-grotesk text-base font-bold text-[#39b7f2] tracking-wide">
                                    contact@robotix.in
                                </span>
                                <span className="inline-flex items-center gap-1 text-xs font-family-apk font-medium text-[#7e8499] group-hover:text-white transition-colors">
                                    Compose <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                                </span>
                            </a>
                        </div>

                        {/* Location Box & Map */}
                        <div className="p-4 sm:p-5 rounded-xl bg-[#121420]/80 border border-[#23273a] flex flex-col gap-3">
                            <div className="flex items-start justify-between gap-3">
                                <div className="flex items-start gap-3">
                                    <div className="w-9 h-9 rounded-lg bg-[#39b7f2]/10 border border-[#39b7f2]/30 flex items-center justify-center text-[#39b7f2] shrink-0 mt-0.5">
                                        <MapPin className="w-4 h-4" />
                                    </div>
                                    <div>
                                        <h3 className="font-family-grotesk text-base font-bold text-white leading-tight">
                                            Technology Students&apos; Gymkhana
                                        </h3>
                                        <p className="font-family-apk text-xs sm:text-sm text-[#8e95a5] mt-0.5">
                                            IIT Kharagpur, Kharagpur, West Bengal 721302
                                        </p>
                                    </div>
                                </div>

                                <a
                                    href="https://maps.google.com/?q=Technology+Robotix+Society+IIT+Kharagpur"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="shrink-0 p-2 rounded-lg bg-[#181b2a] border border-[#2c3044] text-[#a0a6b8] hover:text-[#39b7f2] hover:border-[#39b7f2]/50 hover:bg-[#39b7f2]/10 transition-all duration-300"
                                    title="Open directions in Google Maps"
                                >
                                    <ArrowUpRight className="w-4 h-4" />
                                </a>
                            </div>

                            {/* Map Container */}
                            <div className="relative w-full h-[240px] sm:h-[280px] rounded-lg overflow-hidden border border-[#23273a] group">
                                <iframe
                                    width="100%"
                                    height="100%"
                                    frameBorder="0"
                                    scrolling="no"
                                    marginHeight="0"
                                    marginWidth="0"
                                    id="gmap_canvas"
                                    title="Technology Robotix Society Location"
                                    src="https://maps.google.com/maps?width=520&amp;height=470&amp;hl=en&amp;q=Technology%20Robotix%20Society%20Kharagpur+()&amp;t=&amp;z=16&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
                                    className="w-full h-full filter contrast-[1.05] brightness-[0.9]"
                                ></iframe>

                                <div
                                    className="absolute inset-0 pointer-events-none"
                                    style={{ backgroundColor: "rgba(11, 11, 14, 0.15)" }}
                                />
                            </div>
                        </div>

                        {/* Society Live Badge (matching Footer) */}
                        <div className="p-3.5 rounded-xl bg-[#121420]/80 border border-[#23273a]">
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
            </div>
        </main>
    );
}
