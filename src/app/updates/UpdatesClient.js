// app/updates/UpdatesClient.js
"use client";
import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import useScrambleText from "@/hooks/useScrambleText";
import UpdateCard from "@/components/UpdateCard";

gsap.registerPlugin(ScrollTrigger);

export default function UpdatesClient({ updates }) {
    const mainRef = useRef(null);
    const cardsRef = useRef([]);

    const displayText = useScrambleText("What's New at TRS", { speed: 10 });

    const hardwareAccel = {
        transform: "translateZ(0)",
        willChange: "transform",
        WebkitBackfaceVisibility: "hidden",
        backfaceVisibility: "hidden",
    };

    // Cards scroll-triggered entrance
    useEffect(() => {
        const cards = cardsRef.current.filter(Boolean);
        cards.forEach((card, i) => {
            gsap.fromTo(
                card,
                { opacity: 0, y: 40 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.7,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: card,
                        start: "top 85%",
                        toggleActions: "play none none none",
                    },
                    delay: i * 0.06,
                }
            );
        });
        return () => { ScrollTrigger.getAll().forEach((t) => t.kill()); };
    }, [updates]);

    return (
        <>
            <main ref={mainRef} className="relative">
                {/* ── Hero Section ── */}
                <div className="h-screen relative">
                    <video
                        className="object-cover w-full h-full absolute top-0 left-0 -z-10"
                        src="/bg_video6.mp4"
                        autoPlay
                        loop
                        muted
                        playsInline
                        preload="metadata"
                    />

                    <div className="z-20 h-screen absolute top-0 left-0 w-full p-16 flex items-center justify-center flex-col bg-black/60">
                        {/* Decorative lines */}
                        <div className="absolute left-9 w-px top-0 h-full bg-[rgb(66,68,83)]" style={hardwareAccel} />
                        <div className="absolute right-9 w-px top-0 h-full bg-[rgb(66,68,83)]" style={hardwareAccel} />
                        <div className="absolute bottom-9 left-0 right-0 h-px bg-[rgb(66,68,83)]" style={hardwareAccel} />
                        <div className="absolute bottom-0 left-0 right-0 h-px bg-[rgb(66,68,83)]" style={hardwareAccel} />
                        {/* Corner ticks */}
                        <div className="absolute bottom-9 left-9 h-0.5 w-3 bg-[#b7b9c5] -translate-x-1/2" />
                        <div className="absolute bottom-9 left-9 h-3 w-0.5 bg-[#b7b9c5] -translate-x-1/2 translate-y-1/2" />
                        <div className="absolute bottom-9 right-9 h-0.5 w-3 bg-[#b7b9c5] translate-x-1/2" />
                        <div className="absolute bottom-9 right-9 h-3 w-0.5 bg-[#b7b9c5] translate-x-1/2 translate-y-1/2" />

                        <div className="uppercase text-[#838698] mb-6 text-sm font-family-grotesk-mono tracking-widest">
                            Latest from TRS
                        </div>
                        <div className="font-family-grotesk text-5xl text-[#e9ede5] text-center leading-tight">
                            {displayText}
                        </div>
                        <div className="mt-6 font-family-apk text-[#838698] text-base text-center max-w-xl leading-relaxed">
                            Stay up to date with research breakthroughs, event announcements, and milestones from the Technology Robotix Society at IIT Kharagpur.
                        </div>
                    </div>

                </div>

                {/* ── Updates List Section ── */}
                <div className="bg-[#0b0b0e] relative px-24 py-20">
                    <div className="absolute left-9 top-0 h-full w-px bg-[rgb(66,68,83)]" />
                    <div className="absolute right-9 top-0 h-full w-px bg-[rgb(66,68,83)]" />

                    <div className="font-family-grotesk-mono text-[#838698] text-xs uppercase tracking-widest mb-3">
                        All Updates
                    </div>
                    <div className="font-family-grotesk text-4xl text-[#e9ede5] mb-16">
                        Explore everything new
                    </div>

                    <div className="w-full h-px bg-[rgb(66,68,83)] mb-12" />

                    {updates.length === 0 ? (
                        <p className="font-family-apk text-[#838698] text-center py-20">
                            No updates published yet. Check back soon.
                        </p>
                    ) : (
                        <div className="flex flex-col gap-6 max-w-5xl mx-auto">
                            {updates.map((update, index) => (
                                <div
                                    key={update._id}
                                    ref={(el) => (cardsRef.current[index] = el)}
                                    style={{ opacity: 0 }}
                                >
                                    <UpdateCard update={update} />
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </main>
        </>
    );
}
