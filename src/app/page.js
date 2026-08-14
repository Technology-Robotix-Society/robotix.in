// app/page.js
"use client";
import { useRef, useEffect, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import Link from "next/link";
import WaveParticles from "../components/WaveParticles";
import GalleryCard from "../components/GalleryCard";
import LatestUpdate from "../components/LatestUpdate";
import { botsData } from "../data/bots";
import useScrambleText from "@/hooks/useScrambleText";

gsap.registerPlugin(ScrollTrigger);

const heroTexts = ["Technology Robotix Society", "Where Machines Dare !!"];

function renderSmallCaps(
    text,
    largeSize = "text-5xl md:text-6xl lg:text-7xl",
    smallSize = "text-xl md:text-2xl lg:text-[34px]"
) {
    if (!text) return null;
    const words = text.split(" ");
    return words.map((word, wordIdx) => {
        if (!word) return null;

        // If word is pure punctuation (like "!!"), render all characters in largeSize
        if (/^[^a-zA-Z0-9]+$/.test(word)) {
            return (
                <span key={wordIdx} className="inline-block mr-[0.25em] last:mr-0">
                    <span className={largeSize}>{word}</span>
                </span>
            );
        }

        // Match leading letters/numbers and trailing punctuation (e.g. "Dare!!")
        const match = word.match(/^([a-zA-Z0-9]+)(.*)$/);
        if (match) {
            const letters = match[1];
            const trailing = match[2];
            const first = letters.charAt(0).toUpperCase();
            const rest = letters.slice(1).toUpperCase();

            return (
                <span key={wordIdx} className="inline-block mr-[0.25em] last:mr-0">
                    <span className={largeSize}>{first}</span>
                    {rest && <span className={smallSize}>{rest}</span>}
                    {trailing && <span className={largeSize}>{trailing}</span>}
                </span>
            );
        }

        const first = word.charAt(0).toUpperCase();
        const rest = word.slice(1).toUpperCase();
        return (
            <span key={wordIdx} className="inline-block mr-[0.25em] last:mr-0">
                <span className={largeSize}>{first}</span>
                {rest && <span className={smallSize}>{rest}</span>}
            </span>
        );
    });
}

export default function Home() {
    const mainRef = useRef(null);
    const logoRef = useRef(null);
    const videoRef = useRef(null);
    const textRef = useRef(null);
    const card1Ref = useRef(null);
    const card2Ref = useRef(null);
    const card3Ref = useRef(null);
    const galleryRef = useRef(null);
    const galleryItemsRef = useRef([]);

    const [displayText1, displayText2] = useScrambleText(heroTexts, { speed: 10 });

    const hardwareAccel = {
        transform: "translateZ(0)",
        willChange: "transform",
        WebkitBackfaceVisibility: "hidden",
        backfaceVisibility: "hidden",
    };

    // --- GSAP Intro Animations ---
    useGSAP(
        () => {
            const ctx = gsap.context(() => {
                gsap.to(mainRef.current, { ease: "power3.out" });

                const timeline = gsap.timeline({ repeat: -1 });
                timeline.to(logoRef.current, {
                    rotation: 360,
                    duration: 20,
                    ease: "none",
                });

                // Glow via drop-shadow filter
                gsap.to(logoRef.current, {
                    filter: "drop-shadow(0 0 8px rgba(57, 183, 242, 0.3))",
                    duration: 2,
                    yoyo: true,
                    repeat: -1,
                    ease: "power1.inOut",
                });

                // Pulsing scale
                gsap.to(logoRef.current, {
                    scale: 1.05,
                    duration: 3,
                    yoyo: true,
                    repeat: -1,
                    ease: "sine.inOut",
                });

                // Subtle floating movement for hero video container
                gsap.to(videoRef.current, {
                    y: -10,
                    duration: 4,
                    yoyo: true,
                    repeat: -1,
                    ease: "sine.inOut",
                });
            }, mainRef);

            return () => ctx.revert();
        },
        { scope: mainRef }
    );

    // --- GSAP 3D Interactive Card Animations ---
    useEffect(() => {
        const cards = [card1Ref.current, card2Ref.current, card3Ref.current].filter(Boolean);

        cards.forEach((card) => {
            if (!card) return;

            const handleMouseEnter = () => {
                gsap.to(card, {
                    duration: 0.3,
                    ease: "power2.out",
                });
            };

            const handleMouseMove = (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;

                const centerX = rect.width / 2;
                const centerY = rect.height / 2;

                const rotateX = ((y - centerY) / centerY) * -12;
                const rotateY = ((x - centerX) / centerX) * 12;

                gsap.to(card, {
                    rotationY: rotateY,
                    rotationX: rotateX,
                    z: 30,
                    duration: 0.4,
                    ease: "power1.out",
                    boxShadow: "0 20px 40px rgba(57, 183, 242, 0.2)",
                    borderColor: "#39b7f2",
                });

                const img = card.querySelector("img");
                if (img) {
                    gsap.to(img, {
                        scale: 1.12,
                        rotation: rotateY * 0.4,
                        duration: 0.4,
                        ease: "power1.out",
                    });
                }

                const title = card.querySelector("h3");
                if (title) {
                    gsap.to(title, {
                        textShadow: "0 0 10px rgba(57, 183, 242, 0.6)",
                        duration: 0.3,
                    });
                }
            };

            const handleMouseLeave = () => {
                gsap.to(card, {
                    rotationY: 0,
                    rotationX: 0,
                    z: 0,
                    boxShadow: "none",
                    borderColor: "#424453",
                    duration: 0.6,
                    ease: "power2.inOut",
                });

                const img = card.querySelector("img");
                if (img) {
                    gsap.to(img, {
                        scale: 1,
                        rotation: 0,
                        duration: 0.6,
                        ease: "power2.inOut",
                    });
                }

                const title = card.querySelector("h3");
                if (title) {
                    gsap.to(title, {
                        textShadow: "none",
                        duration: 0.3,
                        ease: "power2.inOut",
                    });
                }
            };

            card.addEventListener("mouseenter", handleMouseEnter);
            card.addEventListener("mousemove", handleMouseMove);
            card.addEventListener("mouseleave", handleMouseLeave);

            // Cleanup
            return () => {
                card.removeEventListener("mouseenter", handleMouseEnter);
                card.removeEventListener("mousemove", handleMouseMove);
                card.removeEventListener("mouseleave", handleMouseLeave);
            };
        });
    }, []);

    // --- Gallery Hover Animations ---
    useEffect(() => {
        const items = galleryItemsRef.current.filter(Boolean);

        items.forEach((item) => {
            if (!item) return;

            const img = item.querySelector("img");
            if (!img) return;

            const handleMouseEnter = () => {
                gsap.to(img, {
                    scale: 1.1,
                    duration: 0.6,
                    ease: "power2.out",
                });
            };

            const handleMouseLeave = () => {
                gsap.to(img, {
                    scale: 1,
                    duration: 0.6,
                    ease: "power2.inOut",
                });
            };

            item.addEventListener("mouseenter", handleMouseEnter);
            item.addEventListener("mouseleave", handleMouseLeave);

            return () => {
                item.removeEventListener("mouseenter", handleMouseEnter);
                item.removeEventListener("mouseleave", handleMouseLeave);
            };
        });
    }, []);

    return (
        <>
            <main
                ref={mainRef}
                className="relative backface-hidden"
                style={{
                    WebkitFontSmoothing: "subpixel-antialiased",
                    MozOsxFontSmoothing: "grayscale",
                }}
            >
                <div className="h-screen w-full relative overflow-hidden flex items-end">
                    {/* Full Width Hero Video */}
                    <video
                        ref={videoRef}
                        className="w-full h-full object-cover absolute top-0 left-0 z-0"
                        src="/bg_video5.mp4"
                        autoPlay
                        loop
                        muted
                        playsInline
                        preload="metadata"
                    />

                    {/* Dark Gradient Overlay for Readability (like IIT KGP Hero) */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0b0b0e] via-[#0b0b0e]/50 to-black/40 z-10" />

                    {/* Hero Text & Content Overlay */}
                    <div className="z-20 w-full px-12 md:px-16 lg:px-24 pb-20 flex flex-col md:flex-row items-start md:items-end justify-between">
                        <div className="max-w-3xl">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#39b7f2]/10 border border-[#39b7f2]/30 text-[#39b7f2] text-xs font-grotesk-mono uppercase tracking-widest mb-4">
                                <span className="w-2 h-2 rounded-full bg-[#39b7f2] animate-pulse"></span>
                                Technology Robotix Society • IIT Kharagpur
                            </div>
                            <div
                                ref={textRef}
                                className="font-family-grotesk font-extrabold tracking-tight leading-none mb-4 drop-shadow-[0_4px_15px_rgba(0,0,0,0.8)]"
                                style={hardwareAccel}
                            >
                                <div className="text-white">
                                    {renderSmallCaps(displayText1, "text-5xl md:text-6xl lg:text-7xl", "text-4xl md:text-5xl lg:text-[50px]")}
                                </div>
                                <div className="text-[#39b7f2] drop-shadow-[0_0_20px_rgba(57,183,242,0.6)] mt-2">
                                    {renderSmallCaps(displayText2, "text-5xl md:text-6xl lg:text-7xl", "text-4xl md:text-5xl lg:text-[50px]")}
                                </div>
                            </div>
                            <p className="text-[#e0e3e8] font-grotesk text-lg md:text-xl max-w-2xl leading-relaxed drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)] pl-4 border-l-2 border-[#39b7f2]">
                                Official Robotics Club of IIT Kharagpur. Cultivating innovation, autonomous systems, and engineering excellence.
                            </p>
                        </div>

                        <Image
                            ref={logoRef}
                            src="/logo.png"
                            alt="Robotix Logo"
                            width={160}
                            height={160}
                            priority
                            sizes="160px"
                            className="hidden md:block drop-shadow-[0_0_20px_rgba(57,183,242,0.5)]"
                            style={hardwareAccel}
                        />
                    </div>
                </div>

                {/* ── Main Content Area: Left (Events + Our Bots) + Right (Latest Updates Side Panel) ── */}
                <div className="min-h-screen bg-[#0b0b0e] relative px-6 sm:px-10 md:px-14 lg:px-16 xl:px-20 py-16">
                    {/* Background Wave Particles */}
                    <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
                        <WaveParticles />
                    </div>

                    <div className="relative z-20 flex flex-col lg:flex-row gap-10 xl:gap-14 items-start justify-between">
                        {/* Left Side: Events + Our Bots */}
                        <div className="flex-1 min-w-0 space-y-28">
                            {/* ── 1. Events Section ── */}
                            <section aria-label="Events Section">
                                {/* Category Indicator Tag */}
                                <div className="flex items-center gap-2 mb-2">
                                    <span className="w-2 h-2 rounded-full bg-[#39b7f2] animate-pulse"></span>
                                    <span className="font-family-grotesk-mono text-[#39b7f2] text-xs uppercase tracking-widest font-semibold">
                                        Initiatives &amp; Workshops
                                    </span>
                                </div>

                                {/* Section Heading: EVENTS */}
                                <h2 className="font-family-grotesk text-white font-extrabold tracking-wider mb-2 drop-shadow-[0_2px_12px_rgba(0,0,0,0.8)]">
                                    <span className="text-4xl sm:text-5xl">E</span>
                                    <span className="text-xl sm:text-2xl tracking-wider">VENTS</span>
                                </h2>

                                {/* Quote & Content Line Below Heading */}
                                <div className="relative pl-5 border-l-[3px] border-[#39b7f2] my-5 max-w-3xl">
                                    <p className="font-family-grotesk text-2xl sm:text-3xl lg:text-[32px] text-[#e9ede5] font-semibold leading-snug">
                                        “We believe in <span className="text-[#39b7f2]">sharing our knowledge</span>.”
                                    </p>
                                    <p className="font-family-apk text-sm sm:text-base text-[#a3a6b6] mt-2 leading-relaxed">
                                        From hands-on beginner bootcamps to advanced ROS workshop series and round-the-clock prototyping in our makerspace — empowering the next wave of roboticists.
                                    </p>
                                </div>

                                {/* Feature Chips with Interactive Hover */}
                                <div className="flex items-center gap-3 flex-wrap mb-8">
                                    <span className="px-4 py-2 rounded-full bg-[#161926] border border-[#2c3044] text-[#a0a6b8] text-xs sm:text-[13px] font-family-grotesk-mono tracking-wider transition-all duration-300 hover:border-[#39b7f2] hover:text-[#39b7f2] hover:bg-[#39b7f2]/10 hover:shadow-[0_0_15px_rgba(57,183,242,0.25)] hover:scale-105 cursor-pointer">
                                        ⚡ Hands-on Bootcamps
                                    </span>
                                    <span className="px-4 py-2 rounded-full bg-[#161926] border border-[#2c3044] text-[#a0a6b8] text-xs sm:text-[13px] font-family-grotesk-mono tracking-wider transition-all duration-300 hover:border-[#39b7f2] hover:text-[#39b7f2] hover:bg-[#39b7f2]/10 hover:shadow-[0_0_15px_rgba(57,183,242,0.25)] hover:scale-105 cursor-pointer">
                                        🛠️ Open Prototyping Lab
                                    </span>
                                    <span className="px-4 py-2 rounded-full bg-[#161926] border border-[#2c3044] text-[#a0a6b8] text-xs sm:text-[13px] font-family-grotesk-mono tracking-wider transition-all duration-300 hover:border-[#39b7f2] hover:text-[#39b7f2] hover:bg-[#39b7f2]/10 hover:shadow-[0_0_15px_rgba(57,183,242,0.25)] hover:scale-105 cursor-pointer">
                                        🤖 Advanced Workshops
                                    </span>
                                </div>

                                {/* Event Cards Grid */}
                                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                                    {/* K.R.A.I.G. */}
                                    <div
                                        ref={card1Ref}
                                        className="group relative border border-[#2d3145] hover:border-[#39b7f2] bg-gradient-to-b from-[#161926]/90 to-[#0e1017]/95 rounded-2xl p-6 flex flex-col items-center cursor-pointer backdrop-blur-xl transition-all duration-500 shadow-[0_10px_35px_rgba(0,0,0,0.5)] hover:shadow-[0_15px_45px_rgba(57,183,242,0.2)] overflow-hidden pointer-events-auto"
                                        style={{
                                            transformStyle: "preserve-3d",
                                            perspective: "1000px",
                                            ...hardwareAccel,
                                        }}
                                    >
                                        <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-[#39b7f2]/40 group-hover:via-[#39b7f2] to-transparent transition-all duration-500" />
                                        
                                        <div className="relative w-full aspect-square max-w-[175px] flex items-center justify-center">
                                            <Image
                                                src="/kraig.png"
                                                alt="KRAIG"
                                                width={175}
                                                height={175}
                                                className="object-contain drop-shadow-[0_0_20px_rgba(57,183,242,0.2)] group-hover:scale-105 transition-transform duration-500"
                                            />
                                        </div>

                                        <h3 className="font-family-grotesk text-2xl text-[#e9ede5] group-hover:text-[#39b7f2] mt-6 mb-3 font-semibold text-center transition-colors">
                                            K.R.A.I.G.
                                        </h3>
                                        <p className="text-sm text-[#b7b9c5] text-center leading-relaxed font-family-apk">
                                            Kickstart your robotics journey with practical mechanical assemblies, microcontroller programming, and circuit fundamentals.
                                        </p>
                                    </div>

                                    {/* Winter School */}
                                    <div
                                        ref={card2Ref}
                                        className="group relative border border-[#2d3145] hover:border-[#39b7f2] bg-gradient-to-b from-[#161926]/90 to-[#0e1017]/95 rounded-2xl p-6 flex flex-col items-center cursor-pointer backdrop-blur-xl transition-all duration-500 shadow-[0_10px_35px_rgba(0,0,0,0.5)] hover:shadow-[0_15px_45px_rgba(57,183,242,0.2)] overflow-hidden pointer-events-auto"
                                        style={{
                                            transformStyle: "preserve-3d",
                                            perspective: "1000px",
                                            ...hardwareAccel,
                                        }}
                                    >
                                        <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-[#39b7f2]/40 group-hover:via-[#39b7f2] to-transparent transition-all duration-500" />
                                        
                                        <div className="relative w-full aspect-square max-w-[175px] flex items-center justify-center">
                                            <Image
                                                src="/winterschool.png"
                                                alt="Winter School"
                                                width={175}
                                                height={175}
                                                className="object-contain drop-shadow-[0_0_20px_rgba(57,183,242,0.2)] group-hover:scale-105 transition-transform duration-500"
                                            />
                                        </div>

                                        <h3 className="font-family-grotesk text-2xl text-[#e9ede5] group-hover:text-[#39b7f2] mt-6 mb-3 font-semibold text-center transition-colors">
                                            Winter School
                                        </h3>
                                        <p className="text-sm text-[#b7b9c5] text-center leading-relaxed font-family-apk">
                                            Comprehensive deep-dive workshop series covering autonomous navigation, computer vision, and ROS-powered robotics.
                                        </p>
                                    </div>

                                    {/* Makerspace */}
                                    <div
                                        ref={card3Ref}
                                        className="group relative border border-[#2d3145] hover:border-[#39b7f2] bg-gradient-to-b from-[#161926]/90 to-[#0e1017]/95 rounded-2xl p-6 flex flex-col items-center cursor-pointer backdrop-blur-xl transition-all duration-500 shadow-[0_10px_35px_rgba(0,0,0,0.5)] hover:shadow-[0_15px_45px_rgba(57,183,242,0.2)] overflow-hidden pointer-events-auto"
                                        style={{
                                            transformStyle: "preserve-3d",
                                            perspective: "1000px",
                                            ...hardwareAccel,
                                        }}
                                    >
                                        <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-[#39b7f2]/40 group-hover:via-[#39b7f2] to-transparent transition-all duration-500" />
                                        
                                        <div className="relative w-full aspect-square max-w-[175px] flex items-center justify-center">
                                            <Image
                                                src="/makerspace.png"
                                                alt="Makerspace"
                                                width={175}
                                                height={175}
                                                className="object-contain drop-shadow-[0_0_20px_rgba(57,183,242,0.2)] group-hover:scale-105 transition-transform duration-500"
                                            />
                                        </div>

                                        <h3 className="font-family-grotesk text-2xl text-[#e9ede5] group-hover:text-[#39b7f2] mt-6 mb-3 font-semibold text-center transition-colors">
                                            Makerspace
                                        </h3>
                                        <p className="text-sm text-[#b7b9c5] text-center leading-relaxed font-family-apk">
                                            Collaborative workspace equipped with testing arenas, 3D printing tools, and hardware resources for rapid prototyping.
                                        </p>
                                    </div>
                                </div>
                            </section>

                            {/* ── 2. Our Bots Section (Inside Left Column) ── */}
                            <section aria-label="Our Bots Section">
                                <div className="flex items-center gap-2 mb-2">
                                    <span className="w-2 h-2 rounded-full bg-[#39b7f2] animate-pulse"></span>
                                    <span className="font-family-grotesk-mono text-[#39b7f2] text-xs uppercase tracking-widest font-semibold">
                                        Software, Embedded and Mechanical Demonstrations
                                    </span>
                                </div>
                                <h2 className="font-family-grotesk text-white font-extrabold tracking-wider mb-8 drop-shadow-[0_2px_12px_rgba(0,0,0,0.8)]">
                                    <span className="inline-block mr-[0.25em]">
                                        <span className="text-4xl sm:text-5xl lg:text-6xl">O</span>
                                        <span className="text-xl sm:text-2xl lg:text-3xl tracking-wider">UR</span>
                                    </span>
                                    <span className="inline-block">
                                        <span className="text-4xl sm:text-5xl lg:text-6xl">B</span>
                                        <span className="text-xl sm:text-2xl lg:text-3xl tracking-wider">OTS</span>
                                    </span>
                                </h2>

                                {/* Uniform Bots Grid */}
                                <div
                                    ref={galleryRef}
                                    className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 w-full"
                                >
                                    {botsData.map((bot, index) => (
                                        <GalleryCard
                                            key={bot.id}
                                            bot={bot}
                                            index={index}
                                            galleryItemRef={(el) => (galleryItemsRef.current[index] = el)}
                                            hardwareAccel={hardwareAccel}
                                        />
                                    ))}
                                </div>
                            </section>
                        </div>

                        {/* Right Side: Latest Updates Side Panel (Sticky throughout the entire scroll) */}
                        <div className="w-full lg:w-[360px] xl:w-[400px] shrink-0 lg:sticky lg:top-24 z-20 self-start">
                            <LatestUpdate />
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
}
