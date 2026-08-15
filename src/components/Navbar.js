"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

export default function Navbar() {
    const pathname = usePathname();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    // Close mobile menu on ESC key
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === "Escape") {
                setMobileMenuOpen(false);
            }
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, []);

    const navLinks = [
        { href: "/about", label: "ABOUT" },
        { href: "/workshops", label: "WORKSHOPS" },
        { href: "/competitions", label: "COMPETITIONS" },
        { href: "/makerspace", label: "MAKERSPACE" },
        { href: "/updates", label: "UPDATES" },
        { href: "/tutorials", label: "TUTORIALS" },
        { href: "/faqs", label: "FAQS" },
    ];

    return (
        <header className="w-full fixed top-0 left-0 z-40 bg-[#0b0b0e]/92 backdrop-blur-md border-b border-white/[0.08]">
            <div className="w-full max-w-[1700px] mx-auto px-4 sm:px-6 md:px-8 lg:px-10 xl:px-14 2xl:px-16 h-18 sm:h-20 flex items-center justify-between">
                {/* Logo */}
                <Link
                    href="/"
                    className="flex items-center shrink-0 transition-all duration-200 opacity-90 hover:opacity-100 group"
                >
                    <Image
                        src="/logo_text.png"
                        alt="Technology Robotix Society Logo"
                        width={240}
                        height={55}
                        priority
                        className="h-10 sm:h-11 md:h-12 w-auto object-contain transition-transform duration-200 group-hover:scale-[1.02]"
                    />
                </Link>

                {/* Desktop Navigation Links */}
                <nav className="hidden lg:flex items-center gap-5 lg:gap-6 xl:gap-8 2xl:gap-10">
                    {navLinks.map((link) => {
                        const isActive = pathname === link.href;

                        return (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={`group relative py-1 text-[13.5px] lg:text-[14.5px] xl:text-[15.5px] 2xl:text-[16px] font-apk tracking-wider xl:tracking-widest transition-colors duration-200 ${
                                    isActive
                                        ? "text-[#39b7f2] font-semibold"
                                        : "text-[#9ca3af] hover:text-[#39b7f2] font-medium"
                                }`}
                            >
                                {link.label}
                                {isActive ? (
                                    <span className="absolute -bottom-1.5 left-0 right-0 h-[2px] bg-[#39b7f2] rounded-full" />
                                ) : (
                                    <span className="absolute -bottom-1.5 left-0 right-0 h-[2px] bg-[#39b7f2]/70 scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-center rounded-full" />
                                )}
                            </Link>
                        );
                    })}
                </nav>

                {/* Right Area: Contact CTA + Mobile Menu Toggle */}
                <div className="flex items-center gap-3">
                    <Link
                        href="/contact"
                        className={`hidden sm:inline-flex items-center justify-center px-4.5 py-2 sm:px-5 sm:py-2.5 rounded-md text-xs sm:text-[13.5px] font-apk font-semibold tracking-wider transition-all duration-200 ${
                            pathname === "/contact"
                                ? "bg-[#39b7f2] text-[#0b0b0e] shadow-[0_0_16px_rgba(57,183,242,0.4)]"
                                : "bg-[#39b7f2] hover:bg-[#2ea1db] text-[#0b0b0e] hover:shadow-[0_0_16px_rgba(57,183,242,0.35)] active:scale-[0.98]"
                        }`}
                    >
                        <span>CONTACT US</span>
                    </Link>

                    {/* Mobile Hamburger Button */}
                    <button
                        type="button"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        aria-expanded={mobileMenuOpen}
                        aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
                        className="lg:hidden p-2 text-[#9ca3af] hover:text-white rounded-md hover:bg-white/[0.04] transition-colors duration-150"
                    >
                        {mobileMenuOpen ? (
                            <X className="w-6 h-6" />
                        ) : (
                            <Menu className="w-6 h-6" />
                        )}
                    </button>
                </div>
            </div>

            {/* Mobile Navigation Dropdown */}
            {mobileMenuOpen && (
                <div className="lg:hidden border-t border-white/[0.08] bg-[#0b0b0e]/98 backdrop-blur-xl px-5 py-5 space-y-2 shadow-2xl animate-in fade-in duration-150">
                    <nav className="flex flex-col space-y-1">
                        {navLinks.map((link) => {
                            const isActive = pathname === link.href;

                            return (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    onClick={() => setMobileMenuOpen(false)}
                                    className={`flex items-center justify-between py-3 px-4 rounded-lg text-sm sm:text-base font-apk tracking-wider transition-colors duration-150 ${
                                        isActive
                                            ? "text-[#39b7f2] font-semibold bg-[#39b7f2]/10"
                                            : "text-[#9ca3af] hover:text-[#39b7f2] hover:bg-[#39b7f2]/10 font-medium"
                                    }`}
                                >
                                    <span>{link.label}</span>
                                    {isActive && (
                                        <span className="w-2 h-2 rounded-full bg-[#39b7f2]" />
                                    )}
                                </Link>
                            );
                        })}
                    </nav>

                    {/* Mobile Contact CTA */}
                    <div className="pt-3 border-t border-white/[0.08]">
                        <Link
                            href="/contact"
                            onClick={() => setMobileMenuOpen(false)}
                            className="flex items-center justify-center w-full py-3 px-4 rounded-lg text-sm font-apk font-semibold tracking-wider bg-[#39b7f2] hover:bg-[#2ea1db] text-[#0b0b0e] transition-colors duration-150"
                        >
                            <span>CONTACT US</span>
                        </Link>
                    </div>
                </div>
            )}
        </header>
    );
}