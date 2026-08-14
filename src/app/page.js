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

const heroTexts = ["Technology Robotix Society", "Where machines dare !!"];

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

                gsap.to(logoRef.current, {
                    filter: "drop-shadow(0 0 8px rgba(57, 183, 242, 0.3))",
                    duration: 2,
                    yoyo: true,
                    repeat: -1,
                    ease: "power1.inOut",
                });

                gsap.to(logoRef.current, {
                    scale: 1.05,
                    duration: 3,
                    yoyo: true,
                    repeat: -1,
                    ease: "sine.inOut",
                });
            }, mainRef);
            return () => ctx.revert();
        },
        { scope: mainRef },
    );

    // --- Video Setup ---
    useEffect(() => {
        if (videoRef.current) videoRef.current.playbackRate = 0.5;
    }, []);

    // --- Card Hover Animations ---
    useEffect(() => {
        const cards = [card1Ref.current, card2Ref.current, card3Ref.current];

        cards.forEach((card, index) => {
            if (!card) return;

            const handleMouseEnter = (e) => {
                const cardRect = card.getBoundingClientRect();
                const cardCenterX = cardRect.left + cardRect.width / 2;
                const cardCenterY = cardRect.top + cardRect.height / 2;

                // Lift and tilt effect based on position
                gsap.to(card, {
                    scale: 1.03,
                    rotationY: (e.clientX - cardCenterX) * 0.02,
                    rotationX: (cardCenterY - e.clientY) * 0.02,
                    z: 50,
                    duration: 0.6,
                    ease: "power2.out",
                });

                // Glow effect
                gsap.to(card, {
                    boxShadow:
                        "0 0 15px rgba(57, 183, 242, 0.2), 0 10px 25px rgba(0, 0, 0, 0.2)",
                    borderColor: "#39b7f2",
                    duration: 0.6,
                    ease: "power2.out",
                });

                // Animate image with slight rotation
                const img = card.querySelector("img");
                if (img) {
                    gsap.to(img, {
                        scale: 1.05,
                        rotation: index % 2 === 0 ? 5 : -5,
                        duration: 0.6,
                        ease: "power2.out",
                    });
                }

                // Text glitch effect on title
                const title = card.querySelector("h3");
                if (title) {
                    gsap.to(title, {
                        textShadow: "0 0 5px rgba(57, 183, 242, 0.5)",
                        duration: 0.3,
                        ease: "power2.out",
                    });
                }
            };

            const handleMouseMove = (e) => {
                const cardRect = card.getBoundingClientRect();
                const cardCenterX = cardRect.left + cardRect.width / 2;
                const cardCenterY = cardRect.top + cardRect.height / 2;

                // Dynamic tilt based on mouse position
                gsap.to(card, {
                    rotationY: (e.clientX - cardCenterX) * 0.02,
                    rotationX: (cardCenterY - e.clientY) * 0.02,
                    duration: 0.3,
                    ease: "power1.out",
                });
            };

            const handleMouseLeave = () => {
                // Reset all animations
                gsap.to(card, {
                    scale: 1,
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
                                className="font-family-grotesk text-5xl md:text-6xl lg:text-7xl text-white font-extrabold tracking-tight leading-none mb-4 drop-shadow-[0_4px_15px_rgba(0,0,0,0.8)]"
                                style={hardwareAccel}
                            >
                                {displayText1}
                                <br />
                                <span className="text-[#39b7f2] drop-shadow-[0_0_20px_rgba(57,183,242,0.6)]">
                                    {displayText2}
                                </span>
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

                <LatestUpdate />

                <div className="min-h-screen bg-[#0b0b0e] relative">
                    <div className="pt-14 pl-14 mb-6 font-family-grotesk-mono text-[#838698] text-sm uppercase">
                        Events
                    </div>
                    <div className="font-family-grotesk text-4xl pl-14 max-w-1/3 text-white">
                        We believe in sharing our knowledge
                    </div>
                    <div className="flex justify-center px-10 py-20 relative z-20 pointer-events-none">
                        <div
                            ref={card1Ref}
                            className="border-[#424453] border-[1.5px] bg-[#17192160] rounded-sm p-6 flex flex-col items-center w-[250px] cursor-pointer backdrop-blur-xs pointer-events-auto"
                            style={{
                                transformStyle: "preserve-3d",
                                perspective: "1000px",
                                ...hardwareAccel,
                            }}
                        >
                            <Image
                                src="/kraig.png"
                                alt="KRAIG"
                                width={175}
                                height={175}
                            />
                            <h3 className="font-family-grotesk text-2xl text-[#e9ede5] mt-6 mb-3">
                                K.R.A.I.G.
                            </h3>
                            <p className="text-sm text-[#b7b9c5] text-center leading-relaxed">
                                Kickstart your robotics journey with hands-on
                                fundamentals
                            </p>
                        </div>
                        <div
                            ref={card2Ref}
                            className="mx-10 border-[#424453] border-[1.5px] bg-[#17192160] rounded-sm p-6 flex flex-col items-center w-[250px] cursor-pointer backdrop-blur-xs pointer-events-auto"
                            style={{
                                transformStyle: "preserve-3d",
                                perspective: "1000px",
                                ...hardwareAccel,
                            }}
                        >
                            <Image
                                src="/winterschool.png"
                                alt="Winter School"
                                width={175}
                                height={175}
                            />
                            <h3 className="font-family-grotesk text-2xl text-[#e9ede5] mt-6 mb-3">
                                Winter School
                            </h3>
                            <p className="text-sm text-[#b7b9c5] text-center leading-relaxed">
                                Comprehensive workshop series for advanced
                                robotics projects
                            </p>
                        </div>
                        <div
                            ref={card3Ref}
                            className="border-[#424453] border-[1.5px] bg-[#17192160] rounded-sm p-6 flex flex-col items-center w-[250px] cursor-pointer backdrop-blur-xs pointer-events-auto"
                            style={{
                                transformStyle: "preserve-3d",
                                perspective: "1000px",
                                ...hardwareAccel,
                            }}
                        >
                            <Image
                                src="/makerspace.png"
                                alt="Makerspace"
                                width={175}
                                height={175}
                            />
                            <h3 className="font-family-grotesk text-2xl text-[#e9ede5] mt-6 mb-3">
                                Makerspace
                            </h3>
                            <p className="text-sm text-[#b7b9c5] text-center leading-relaxed">
                                Collaborative workspace for prototyping and
                                innovation
                            </p>
                        </div>
                    </div>
                    <WaveParticles />
                </div>
                <div className="min-h-screen bg-[#0b0b0e] relative px-24 py-16">
                    <div className="uppercase font-family-grotesk-mono text-[#838698] text-md text-center mb-4">
                        Our
                    </div>
                    <div className="font-family-grotesk text-8xl text-center text-white uppercase mb-20">
                        B<span className="font-family-grotesk-screen">o</span>ts
                    </div>

                    {/* Masonry Gallery */}
                    <div
                        ref={galleryRef}
                        className="masonry-gallery max-w-6xl mx-auto"
                        style={{ perspective: "1000px" }}
                    >
                        {botsData.map((bot, index) => (
                            <GalleryCard
                                key={bot.id}
                                bot={bot}
                                galleryItemRef={(el) => (galleryItemsRef.current[index] = el)}
                                hardwareAccel={hardwareAccel}
                            />
                        ))}
                    </div>
                </div>
            </main>
        </>
    );
}
