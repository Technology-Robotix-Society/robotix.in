"use client";
import { useRef, useEffect, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { teamData } from "@/data/team";
import { alumniData } from "@/data/alumni";
import { Users, Bot, Cpu, Sparkles, Rocket, Compass, BookOpen } from "lucide-react";
import TeamMemberCard from "@/components/TeamMemberCard";
import useScrambleText from "@/hooks/useScrambleText";

gsap.registerPlugin(ScrollTrigger);

function renderSmallCaps(
    text,
    largeSize = "text-5xl md:text-6xl lg:text-7xl",
    smallSize = "text-xl md:text-2xl lg:text-[34px]"
) {
    if (!text) return null;
    const words = text.split(" ");
    return words.map((word, wordIdx) => {
        if (!word) return null;

        if (/^[^a-zA-Z0-9]+$/.test(word)) {
            return (
                <span key={wordIdx} className="inline-block mr-[0.25em] last:mr-0">
                    <span className={largeSize}>{word}</span>
                </span>
            );
        }

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

export default function About() {
    const mainRef = useRef(null);
    const heroImageRef = useRef(null);
    const displayText1 = useScrambleText("We believe in sharing knowledge", { speed: 10 });
    const [activeTab, setActiveTab] = useState(parseInt(alumniData[0].title));

    const hardwareAccel = {
        transform: "translateZ(0)",
        willChange: "transform",
        WebkitBackfaceVisibility: "hidden",
        backfaceVisibility: "hidden",
    };

    useGSAP(
        () => {
            const ctx = gsap.context(() => {
                if (heroImageRef.current) {
                    gsap.from(heroImageRef.current, {
                        opacity: 0,
                        y: 30,
                        scale: 0.98,
                        duration: 1.2,
                        ease: "power3.out",
                    });
                }
            }, mainRef);

            return () => ctx.revert();
        },
        { scope: mainRef }
    );

    const handleCardMouseMove = (e) => {
        const card = e.currentTarget;
        const imageContainer = card.querySelector(".tilt-container");
        const overlay = card.querySelector(".shine-overlay");

        if (!imageContainer) return;

        const rect = imageContainer.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        if (overlay) {
            gsap.to(overlay, {
                "--x": `${x}px`,
                "--y": `${y}px`,
                duration: 0.2,
                ease: "power2.out",
            });
        }

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = ((y - centerY) / centerY) * -3;
        const rotateY = ((x - centerX) / centerX) * 3;

        gsap.to(imageContainer, {
            rotationX: rotateX,
            rotationY: rotateY,
            scale: 1.01,
            transformPerspective: 1000,
            transformStyle: "preserve-3d",
            duration: 0.4,
            ease: "power2.out",
        });
    };

    const handleCardMouseLeave = (e) => {
        const card = e.currentTarget;
        const imageContainer = card.querySelector(".tilt-container");

        if (!imageContainer) return;

        gsap.to(imageContainer, {
            rotationX: 0,
            rotationY: 0,
            scale: 1,
            duration: 0.6,
            ease: "elastic.out(1, 0.5)",
            clearProps: "transform",
        });
    };

    return (
        <>
            <main ref={mainRef} className="relative bg-[#0b0b0e] text-[#e9ede5] min-h-screen">
                {/* ── 1. Hero & Team Group Photo Showcase ── */}
                <div className="relative pt-28 pb-16 px-6 sm:px-10 md:px-14 lg:px-16 xl:px-20 overflow-hidden">
                    {/* Dark gradient ambient backdrop */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[500px] bg-gradient-to-b from-[#39b7f2]/10 via-[#39b7f2]/5 to-transparent blur-3xl pointer-events-none -z-10" />

                    <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
                        {/* Tag / Micro Badge */}
                        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#161926] border border-[#39b7f2]/30 text-[#39b7f2] text-xs font-family-grotesk-mono uppercase tracking-widest mb-6 shadow-[0_0_15px_rgba(57,183,242,0.15)]">
                            <span className="w-2 h-2 rounded-full bg-[#39b7f2] animate-pulse"></span>
                            Technology Robotix Society • IIT Kharagpur
                        </div>

                        {/* Hero Heading */}
                        <h1 className="font-family-grotesk font-extrabold tracking-tight leading-none text-white drop-shadow-[0_4px_20px_rgba(0,0,0,0.8)] mb-4">
                            {renderSmallCaps("About Us", "text-5xl sm:text-6xl md:text-7xl lg:text-8xl", "text-3xl sm:text-4xl md:text-5xl lg:text-6xl")}
                        </h1>

                        {/* Mission Quote with Scramble Text */}
                        <div className="max-w-3xl mx-auto mb-10">
                            <div className="uppercase text-[#39b7f2] text-xs sm:text-sm font-family-grotesk-mono tracking-widest font-semibold mb-2">
                                Our Mission
                            </div>
                            <div className="font-family-grotesk text-2xl sm:text-3xl md:text-4xl text-[#e9ede5] font-semibold leading-snug">
                                “{displayText1}”
                            </div>
                        </div>

                        {/* ── Featured Group Photo Showcase (us.jpeg) ── */}
                        <div
                            ref={heroImageRef}
                            className="group relative w-full aspect-[16/9] sm:aspect-[16/9] md:aspect-[16/9] lg:aspect-[1.8/1] rounded-2xl md:rounded-3xl overflow-hidden border border-[#2d3145] hover:border-[#39b7f2]/60 transition-all duration-500 shadow-[0_20px_60px_rgba(0,0,0,0.8),0_0_40px_rgba(57,183,242,0.15)] bg-[#161926]"
                            style={hardwareAccel}
                        >
                            <Image
                                src="/team/us.jpeg"
                                alt="Technology Robotix Society Team"
                                fill
                                priority
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 95vw, 1300px"
                                className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                            />

                            {/* Top subtle glow line */}
                            <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-[#39b7f2]/60 to-transparent" />

                            {/* Subtle dark gradient overlay at bottom for readability */}
                            <div className="absolute inset-0 bg-gradient-to-t from-[#0b0b0e]/85 via-transparent to-black/20 pointer-events-none" />

                            {/* Floating Team Badge at Bottom Left */}
                            <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 md:bottom-8 md:left-8 z-10 flex flex-wrap items-center gap-3">
                                <div className="px-4 py-2 rounded-full bg-[#0b0b0e]/85 border border-[#39b7f2]/40 backdrop-blur-md text-white text-xs sm:text-sm font-family-grotesk flex items-center gap-2.5 shadow-xl">
                                    <Users className="w-4 h-4 text-[#39b7f2]" />
                                    <span className="font-semibold tracking-wide">The TRS Family</span>
                                </div>
                                <div className="hidden sm:inline-flex px-3.5 py-2 rounded-full bg-[#161926]/80 border border-[#2c3044] backdrop-blur-md text-[#b7b9c5] text-xs font-family-grotesk-mono">
                                    IIT Kharagpur
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* ── 2. "Who are we?" & "What do we do?" Boxed Section ── */}
                <div className="w-full relative px-6 sm:px-10 md:px-14 lg:px-16 xl:px-20 py-16">
                    <div className="max-w-7xl mx-auto space-y-12">
                        {/* Section Header */}
                        <div className="text-center max-w-2xl mx-auto">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#39b7f2]/10 border border-[#39b7f2]/30 text-[#39b7f2] text-xs font-family-grotesk-mono uppercase tracking-widest mb-3">
                                Discover TRS
                            </div>
                            <h2 className="font-family-grotesk text-3xl sm:text-4xl md:text-5xl font-extrabold text-white">
                                {renderSmallCaps("Our Story & Mission", "text-3xl sm:text-4xl md:text-5xl", "text-2xl sm:text-3xl md:text-4xl")}
                            </h2>
                        </div>

                        {/* Two Main Cards: Who are we? and What do we do? */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            {/* Card 1: Who are we? */}
                            <div className="group relative border border-[#2d3145] hover:border-[#39b7f2]/60 bg-gradient-to-b from-[#161926]/90 to-[#0e1017]/95 rounded-2xl p-8 sm:p-10 flex flex-col justify-between backdrop-blur-xl transition-all duration-500 shadow-[0_15px_35px_rgba(0,0,0,0.5)] hover:shadow-[0_20px_50px_rgba(57,183,242,0.15)] overflow-hidden">
                                <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-[#39b7f2]/40 group-hover:via-[#39b7f2] to-transparent transition-all duration-500" />

                                <div>
                                    <div className="flex items-center justify-between mb-6">
                                        <div className="w-12 h-12 rounded-xl bg-[#39b7f2]/10 border border-[#39b7f2]/30 flex items-center justify-center text-[#39b7f2] group-hover:scale-110 transition-transform duration-300">
                                            <Compass className="w-6 h-6" />
                                        </div>
                                        <span className="px-3 py-1 rounded-full bg-[#161926] border border-[#2c3044] text-[#39b7f2] text-xs font-family-grotesk-mono uppercase tracking-wider">
                                            Foundation &amp; Identity
                                        </span>
                                    </div>

                                    <h3 className="font-family-grotesk text-3xl sm:text-4xl text-white font-bold mb-4 tracking-tight group-hover:text-[#39b7f2] transition-colors">
                                        Who are we?
                                    </h3>

                                    <div className="pl-4 border-l-2 border-[#39b7f2] my-4">
                                        <p className="font-family-grotesk text-lg sm:text-xl text-[#e9ede5] font-semibold leading-snug">
                                            Official society under the Technology Students&apos; Gymkhana, dedicated to the advancement of robotics and AI.
                                        </p>
                                    </div>

                                    <p className="font-family-apk text-base sm:text-lg text-[#b7b9c5] leading-relaxed mt-4">
                                        Technology Robotix Society (TRS) is an official
                                        society under the Technology Students&apos; Gymkhana, IIT
                                        Kharagpur, dedicated to the advancement of robotics
                                        and Artificial Intelligence in the campus and
                                        beyond. We are a society that boasts of a dedicated
                                        team which works extensively in these disciplines,
                                        channeling scores of young talented minds into this
                                        exciting field. With its reach expanding steadily
                                        each year, TRS has cemented its position as one of
                                        the nerve centres of amateur robotics in India,
                                        paving the way for world-class Robotics R&amp;D.
                                    </p>
                                </div>

                                <div className="flex flex-wrap gap-2.5 mt-8 pt-6 border-t border-[#242733]">
                                    <span className="px-3 py-1.5 rounded-md bg-[#161926] border border-[#2c3044] text-[#a0a6b8] text-xs font-family-grotesk-mono">
                                        🏛️ TSG, IIT Kharagpur
                                    </span>
                                    <span className="px-3 py-1.5 rounded-md bg-[#161926] border border-[#2c3044] text-[#a0a6b8] text-xs font-family-grotesk-mono">
                                        🤖 Robotics &amp; AI Hub
                                    </span>
                                    <span className="px-3 py-1.5 rounded-md bg-[#161926] border border-[#2c3044] text-[#a0a6b8] text-xs font-family-grotesk-mono">
                                        🔬 World-Class R&amp;D
                                    </span>
                                </div>
                            </div>

                            {/* Card 2: What do we do? */}
                            <div className="group relative border border-[#2d3145] hover:border-[#39b7f2]/60 bg-gradient-to-b from-[#161926]/90 to-[#0e1017]/95 rounded-2xl p-8 sm:p-10 flex flex-col justify-between backdrop-blur-xl transition-all duration-500 shadow-[0_15px_35px_rgba(0,0,0,0.5)] hover:shadow-[0_20px_50px_rgba(57,183,242,0.15)] overflow-hidden">
                                <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-[#39b7f2]/40 group-hover:via-[#39b7f2] to-transparent transition-all duration-500" />

                                <div>
                                    <div className="flex items-center justify-between mb-6">
                                        <div className="w-12 h-12 rounded-xl bg-[#39b7f2]/10 border border-[#39b7f2]/30 flex items-center justify-center text-[#39b7f2] group-hover:scale-110 transition-transform duration-300">
                                            <Rocket className="w-6 h-6" />
                                        </div>
                                        <span className="px-3 py-1 rounded-full bg-[#161926] border border-[#2c3044] text-[#39b7f2] text-xs font-family-grotesk-mono uppercase tracking-wider">
                                            Initiatives &amp; Impact
                                        </span>
                                    </div>

                                    <h3 className="font-family-grotesk text-3xl sm:text-4xl text-white font-bold mb-4 tracking-tight group-hover:text-[#39b7f2] transition-colors">
                                        What do we do?
                                    </h3>

                                    <div className="pl-4 border-l-2 border-[#39b7f2] my-4">
                                        <p className="font-family-grotesk text-lg sm:text-xl text-[#e9ede5] font-semibold leading-snug">
                                            Spreading the culture of robotics through hands-on workshops, hackathons, and flagship sessions.
                                        </p>
                                    </div>

                                    <p className="font-family-apk text-base sm:text-lg text-[#b7b9c5] leading-relaxed mt-4">
                                        We are involved in various initiatives throughout
                                        the year, spanning the fields of software, manually
                                        controlled machines, and autonomous robots. Our
                                        primary agenda is to spread the culture of robotics
                                        through intra and inter-collegiate workshops,
                                        hackathons, and events like KRAIG. We facilitate
                                        year-long theory and practical sessions where first
                                        years learn to build &ldquo;one-hour-robots,&rdquo; leading
                                        up to our flagship Winterschool—hands-on sessions
                                        christened as &ldquo;The most productive weeks in a
                                        fresher&apos;s life.&rdquo; Our senior members continue
                                        to take robotics to avenues hitherto thought
                                        unreachable, inspiring the community to better the
                                        best every year.
                                    </p>
                                </div>

                                <div className="flex flex-wrap gap-2.5 mt-8 pt-6 border-t border-[#242733]">
                                    <span className="px-3 py-1.5 rounded-md bg-[#161926] border border-[#2c3044] text-[#a0a6b8] text-xs font-family-grotesk-mono">
                                        🛠️ One-Hour Robots
                                    </span>
                                    <span className="px-3 py-1.5 rounded-md bg-[#161926] border border-[#2c3044] text-[#a0a6b8] text-xs font-family-grotesk-mono">
                                        ❄️ Flagship Winterschool
                                    </span>
                                    <span className="px-3 py-1.5 rounded-md bg-[#161926] border border-[#2c3044] text-[#a0a6b8] text-xs font-family-grotesk-mono">
                                        🏆 KRAIG &amp; Hackathons
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* 3 Pillars Summary Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
                            <div className="relative border border-[#242733] hover:border-[#39b7f2]/50 bg-[#12141e]/80 rounded-xl p-6 transition-all duration-300 hover:-translate-y-1 shadow-lg">
                                <div className="flex items-center gap-3 mb-3">
                                    <span className="p-2.5 rounded-lg bg-[#39b7f2]/10 text-[#39b7f2] border border-[#39b7f2]/20">
                                        <BookOpen className="w-5 h-5" />
                                    </span>
                                    <h4 className="font-family-grotesk text-lg text-white font-semibold">Hands-on Learning</h4>
                                </div>
                                <p className="font-family-apk text-sm text-[#a0a6b8] leading-relaxed">
                                    Comprehensive theory and practical workshops teaching first-years to build functional robots from scratch.
                                </p>
                            </div>

                            <div className="relative border border-[#242733] hover:border-[#39b7f2]/50 bg-[#12141e]/80 rounded-xl p-6 transition-all duration-300 hover:-translate-y-1 shadow-lg">
                                <div className="flex items-center gap-3 mb-3">
                                    <span className="p-2.5 rounded-lg bg-[#39b7f2]/10 text-[#39b7f2] border border-[#39b7f2]/20">
                                        <Sparkles className="w-5 h-5" />
                                    </span>
                                    <h4 className="font-family-grotesk text-lg text-white font-semibold">Flagship Winterschool</h4>
                                </div>
                                <p className="font-family-apk text-sm text-[#a0a6b8] leading-relaxed">
                                    Intensive winter sessions empowering freshers with autonomy, vision, and advanced embedded systems.
                                </p>
                            </div>

                            <div className="relative border border-[#242733] hover:border-[#39b7f2]/50 bg-[#12141e]/80 rounded-xl p-6 transition-all duration-300 hover:-translate-y-1 shadow-lg">
                                <div className="flex items-center gap-3 mb-3">
                                    <span className="p-2.5 rounded-lg bg-[#39b7f2]/10 text-[#39b7f2] border border-[#39b7f2]/20">
                                        <Bot className="w-5 h-5" />
                                    </span>
                                    <h4 className="font-family-grotesk text-lg text-white font-semibold">Pioneering R&amp;D</h4>
                                </div>
                                <p className="font-family-apk text-sm text-[#a0a6b8] leading-relaxed">
                                    Innovating across autonomous machines, multi-agent systems, and cutting-edge robotics competitions.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* ── 3. Meet the Team Section (Preserved) ── */}
                <div className="w-full relative px-6 sm:px-10 md:px-14 lg:px-16 xl:px-20 py-20 border-t border-[#1e2230]">
                    <div className="max-w-7xl mx-auto">
                        <h3 className="font-family-grotesk-mono uppercase font-bold text-base text-[#39b7f2] mb-3 tracking-wider">
                            Meet the team
                        </h3>
                        <h2 className="font-family-grotesk text-[#e9ede5] text-4xl sm:text-5xl font-bold">
                            Coordinators
                        </h2>
                        <div className="mt-12 grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-8 justify-items-center">
                            {teamData[0].team.map((member, index) => (
                                <TeamMemberCard
                                    key={index}
                                    member={member}
                                    imagePath={`/team/coordinators/${member.thumbnailUrl}`}
                                    onMouseMove={handleCardMouseMove}
                                    onMouseLeave={handleCardMouseLeave}
                                />
                            ))}
                        </div>
                        <h2 className="font-family-grotesk text-[#e9ede5] text-4xl sm:text-5xl font-bold mt-16">
                            Heads
                        </h2>
                        <div className="mt-12 grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-8 justify-items-center">
                            {teamData[1].team.map((member, index) => (
                                <TeamMemberCard
                                    key={index}
                                    member={member}
                                    imagePath={`/team/heads/${member.thumbnailUrl}`}
                                    onMouseMove={handleCardMouseMove}
                                    onMouseLeave={handleCardMouseLeave}
                                    showTag={true}
                                />
                            ))}
                        </div>
                        <h2 className="font-family-grotesk text-[#e9ede5] text-4xl sm:text-5xl font-bold mt-16">
                            Sub Heads
                        </h2>
                        <div className="mt-12 grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-8 justify-items-center">
                            {teamData[2].team.map((member, index) => (
                                <TeamMemberCard
                                    key={index}
                                    member={member}
                                    imagePath={`/team/subheads/${member.thumbnailUrl}`}
                                    onMouseMove={handleCardMouseMove}
                                    onMouseLeave={handleCardMouseLeave}
                                />
                            ))}
                        </div>
                        <h2 className="font-family-grotesk text-[#e9ede5] text-4xl sm:text-5xl font-bold mt-16">
                            Alumni
                        </h2>
                        <ul className="flex mx-auto w-fit my-8 flex-wrap justify-center gap-1">
                            {alumniData.map((alumnus, index) => (
                                <li
                                    key={index}
                                    className={`cursor-pointer border-2 ${index == 0 ? "rounded-l-lg" : ""} ${index == alumniData.length - 1 ? "rounded-r-lg" : ""} border-[#2d3145] px-4 py-2 text-[#838698] hover:text-[#f5f6f6] hover:border-[#39b7f2]/50 transition-colors duration-300 ease-in-out text-base sm:text-lg font-family-grotesk-mono`}
                                    style={alumnus.title == activeTab ? { color: "#39b7f2", borderColor: "#39b7f2", backgroundColor: "rgba(57, 183, 242, 0.1)" } : {}}
                                    onClick={() => { setActiveTab(parseInt(alumnus.title)); }}
                                >
                                    {alumnus.title}
                                </li>
                            ))}
                        </ul>
                        <div className="mt-12 grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-8 justify-items-center">
                            {(alumniData.find(alumnus => alumnus.title == activeTab)?.team || []).map((member, index) => (
                                <TeamMemberCard
                                    key={index}
                                    member={member}
                                    imagePath={`/alumni/${activeTab}/${member.thumbnailUrl}`}
                                    onMouseMove={handleCardMouseMove}
                                    onMouseLeave={handleCardMouseLeave}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
}

