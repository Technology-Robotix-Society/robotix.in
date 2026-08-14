"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    Users,
    Cpu,
    Trophy,
    Bot,
    Radio,
    BookOpen,
    HelpCircle,
    Send,
} from "lucide-react";

export default function Navbar() {
    const pathname = usePathname();
    const navLinks = [
        { href: "/about", label: "About", icon: Users },
        { href: "/workshops", label: "Workshops", icon: Cpu },
        { href: "/competitions", label: "Competitions", icon: Trophy },
        { href: "/makerspace", label: "Makerspace", icon: Bot },
        { href: "/updates", label: "Updates", icon: Radio },
        { href: "/tutorials", label: "Tutorials", icon: BookOpen },
        { href: "/faqs", label: "FAQs", icon: HelpCircle },
    ];

    return (
        <nav
            className="w-full fixed top-0 left-0 z-30 backdrop-blur-2xl bg-[#0b0b0e]/92 border-b border-[#282a3a]/80 flex justify-between items-center px-4 md:px-7 lg:px-10 py-2 md:py-2.5 shadow-[0_4px_30px_rgba(0,0,0,0.5)]"
            style={{
                WebkitTransform: "translate3d(0, 0, 0)",
                transform: "translate3d(0, 0, 0)",
                willChange: "transform, backdrop-filter",
            }}
        >
            {/* Logo with ambient back-glow */}
            <Link
                href="/"
                className="flex items-center group transition-transform duration-300 hover:scale-105 py-0.5"
            >
                <div className="relative">
                    <img
                        src="/logo_text.png"
                        alt="Robotix Logo"
                        className="h-10 md:h-11 lg:h-11 w-auto object-contain drop-shadow-[0_0_14px_rgba(57,183,242,0.4)] transition-all duration-300 group-hover:drop-shadow-[0_0_22px_rgba(57,183,242,0.7)]"
                    />
                </div>
            </Link>

            {/* THE NAV LIST - High-Tech Icon Button Boxes */}
            <ul className="hidden md:flex items-center gap-1.5 lg:gap-2.5 list-none">
                {navLinks.map((link) => {
                    const isActive = pathname === link.href;
                    const IconComponent = link.icon;

                    return (
                        <li key={link.href}>
                            <Link
                                href={link.href}
                                className={`group flex items-center gap-2 px-3.5 lg:px-4 py-2.5 rounded-lg text-xs lg:text-[14px] font-apk font-medium tracking-wider uppercase transition-all duration-300 border ${
                                    isActive
                                        ? "text-[#39b7f2] bg-[#39b7f2]/18 border-[#39b7f2] shadow-[0_0_18px_rgba(57,183,242,0.35)] font-bold"
                                        : "text-[#d6dae3] bg-[#141622]/90 border-[#303346] hover:text-white hover:border-[#39b7f2]/80 hover:bg-[#39b7f2]/10 hover:shadow-[0_0_15px_rgba(57,183,242,0.25)]"
                                }`}
                            >
                                <IconComponent
                                    className={`w-4 h-4 transition-all duration-300 ${
                                        isActive
                                            ? "text-[#39b7f2] drop-shadow-[0_0_8px_#39b7f2]"
                                            : "text-[#8e95a5] group-hover:text-[#39b7f2] group-hover:scale-110 group-hover:drop-shadow-[0_0_6px_rgba(57,183,242,0.5)]"
                                    }`}
                                />
                                <span>{link.label}</span>
                            </Link>
                        </li>
                    );
                })}
            </ul>

            {/* Contact Us - Glowing High-Tech Action Button */}
            <Link
                href="/contact"
                className={`group flex items-center gap-2 px-4.5 lg:px-5 py-2.5 rounded-lg text-xs lg:text-[14px] font-apk tracking-wider uppercase font-bold transition-all duration-300 border ${
                    pathname === "/contact"
                        ? "bg-[#39b7f2] text-[#0b0b0e] border-[#39b7f2] shadow-[0_0_24px_rgba(57,183,242,0.8)] scale-105"
                        : "bg-gradient-to-r from-[#39b7f2] to-[#1da5e2] text-[#0b0b0e] border-[#39b7f2] shadow-[0_0_18px_rgba(57,183,242,0.45)] hover:shadow-[0_0_26px_rgba(57,183,242,0.75)] hover:scale-105"
                }`}
            >
                <span>Contact Us</span>
                <Send className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
        </nav>
    );
}