// src/app/updates/UpdatesClient.js
"use client";
import { useRef, useEffect, useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
    Search,
    SlidersHorizontal,
    LayoutGrid,
    List,
    Radio,
    Calendar,
    Clock,
    Sparkles,
    Cpu,
    Bot,
    Zap,
    Download,
    CheckCircle2,
    Terminal,
    ArrowRight,
    ExternalLink,
    FileText,
    Layers,
    X,
    Filter,
    Activity,
    Compass,
    BellRing,
    ChevronRight,
    MapPin
} from "lucide-react";
import useScrambleText from "@/hooks/useScrambleText";
import UpdateCard, { UpdateModal, formatDate, portableTextToPlainText, getCategoryBadgeStyles } from "@/components/UpdateCard";
import {
    upcomingEvents,
    researchHighlights,
    labChronicles,
    quickResources
} from "@/data/updates";

gsap.registerPlugin(ScrollTrigger);

const hardwareAccel = {
    transform: "translateZ(0)",
    willChange: "transform",
    WebkitBackfaceVisibility: "hidden",
    backfaceVisibility: "hidden",
};

const CATEGORIES = [
    "All",
    "Competitions",
    "Workshops & Talks",
    "Research & Labs",
    "Selections",
    "Announcements"
];

export default function UpdatesClient({ initialUpdates = [] }) {
    const mainRef = useRef(null);
    const searchInputRef = useRef(null);
    const heroRef = useRef(null);
    const cardsContainerRef = useRef(null);

    const [updates] = useState(initialUpdates);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [viewMode, setViewMode] = useState("grid"); // "grid" | "editorial"
    const [activeModalUpdate, setActiveModalUpdate] = useState(null);

    // Newsletter terminal states
    const [subscriberEmail, setSubscriberEmail] = useState("");
    const [subscribeStatus, setSubscribeStatus] = useState("idle"); // "idle" | "submitting" | "success"

    const displayText = useScrambleText("What's New at TRS // Transmissions", { speed: 8 });

    // Filter updates based on search query and category
    const filteredUpdates = useMemo(() => {
        return updates.filter((item) => {
            const matchesCategory =
                selectedCategory === "All" ||
                item.category === selectedCategory ||
                (selectedCategory === "Selections" && item.isLiveSanity);

            if (!matchesCategory) return false;

            if (!searchQuery.trim()) return true;

            const q = searchQuery.toLowerCase();
            const titleMatch = (item.title || "").toLowerCase().includes(q);
            const authorMatch = (item.author || "").toLowerCase().includes(q);
            const summaryMatch = (item.summary || "").toLowerCase().includes(q);
            const bodyMatch = portableTextToPlainText(item.body).toLowerCase().includes(q);
            const tagMatch = Array.isArray(item.tags) && item.tags.some(t => t.toLowerCase().includes(q));

            return titleMatch || authorMatch || summaryMatch || bodyMatch || tagMatch;
        });
    }, [updates, selectedCategory, searchQuery]);

    // Top featured update for the spotlight banner
    const spotlightUpdate = useMemo(() => {
        return updates.find(u => u.featured || u.isLiveSanity) || updates[0] || null;
    }, [updates]);

    // Handle newsletter subscription
    const handleSubscribe = (e) => {
        e.preventDefault();
        if (!subscriberEmail || !subscriberEmail.includes("@")) return;
        setSubscribeStatus("submitting");
        setTimeout(() => {
            setSubscribeStatus("success");
            setSubscriberEmail("");
            setTimeout(() => setSubscribeStatus("idle"), 4000);
        }, 800);
    };

    // Category counts helper
    const getCategoryCount = (cat) => {
        if (cat === "All") return updates.length;
        return updates.filter(u => u.category === cat || (cat === "Selections" && u.isLiveSanity)).length;
    };

    // GSAP Entrance Animations
    useEffect(() => {
        const ctx = gsap.context(() => {
            // Animate telemetry HUD cards
            gsap.from(".telemetry-hud-card", {
                opacity: 0,
                y: 30,
                stagger: 0.1,
                duration: 0.8,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: ".telemetry-hud-container",
                    start: "top 90%",
                }
            });

            // Animate spotlight card
            gsap.from(".spotlight-card", {
                opacity: 0,
                y: 40,
                duration: 0.9,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: ".spotlight-card",
                    start: "top 85%",
                }
            });

            // Animate timeline items
            gsap.from(".timeline-card", {
                opacity: 0,
                x: -30,
                stagger: 0.12,
                duration: 0.7,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: ".timeline-section",
                    start: "top 80%",
                }
            });

            // Animate research telemetry
            gsap.from(".research-card", {
                opacity: 0,
                y: 30,
                stagger: 0.1,
                duration: 0.8,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: ".research-section",
                    start: "top 80%",
                }
            });

            // Animate gallery chronicles
            gsap.from(".chronicle-item", {
                opacity: 0,
                scale: 0.95,
                stagger: 0.08,
                duration: 0.6,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: ".chronicles-section",
                    start: "top 80%",
                }
            });
        }, mainRef);

        return () => ctx.revert();
    }, [updates]);

    return (
        <>
            <main ref={mainRef} className="relative bg-[#0b0b0e] text-[#e9ede5] overflow-x-hidden min-h-screen">
                {/* ──────────────────────────────────────────────────────────
                    1. HERO SECTION & TELEMETRY HUD
                ────────────────────────────────────────────────────────── */}
                <section className="relative min-h-[90vh] flex flex-col justify-between overflow-hidden border-b border-[#282a3a]">
                    {/* Background Video with Cyber Overlay */}
                    <video
                        className="object-cover w-full h-full absolute top-0 left-0 -z-10 opacity-35"
                        src="/bg_video6.mp4"
                        autoPlay
                        loop
                        muted
                        playsInline
                        preload="metadata"
                    />

                    {/* Gradient & Mesh Overlays */}
                    <div className="absolute inset-0 bg-gradient-to-b from-[#0b0b0e]/80 via-[#0b0b0e]/60 to-[#0b0b0e] -z-10" />
                    <div className="absolute inset-0 bg-[radial-gradient(#39b7f2_1px,transparent_1px)] [background-size:32px_32px] opacity-10 -z-10" />

                    {/* Perimeter Tech Grid Lines */}
                    <div className="absolute left-6 md:left-12 w-px top-0 h-full bg-[#2a2d3d]/60 pointer-events-none" style={hardwareAccel} />
                    <div className="absolute right-6 md:right-12 w-px top-0 h-full bg-[#2a2d3d]/60 pointer-events-none" style={hardwareAccel} />

                    {/* Hero Content */}
                    <div className="flex-1 flex flex-col items-center justify-center text-center px-6 pt-32 pb-16 max-w-5xl mx-auto z-10">
                        {/* Live Transmissions Badge */}
                        <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#171924]/90 border border-[#39b7f2]/40 text-[#39b7f2] text-xs font-family-grotesk-mono font-bold tracking-widest uppercase mb-6 shadow-[0_0_20px_rgba(57,183,242,0.25)]">
                            <span className="w-2 h-2 rounded-full bg-[#39b7f2] animate-ping" />
                            <span>Official TRS Comms Feed</span>
                            <span className="text-[#838698]">•</span>
                            <span className="text-[#b7b9c5]">2025–2026</span>
                        </div>

                        {/* Scrambled Headline */}
                        <h1 className="font-family-grotesk text-4xl sm:text-5xl md:text-6xl text-[#e9ede5] tracking-tight leading-[1.1] mb-6 max-w-4xl">
                            {displayText}
                        </h1>

                        {/* Subtitle */}
                        <p className="font-family-apk text-base sm:text-lg text-[#8e95a5] max-w-2xl leading-relaxed mb-10">
                            Research breakthroughs, event announcements, competition blueprints, and lab chronicles from Technology Robotix Society at IIT Kharagpur.
                        </p>

                        {/* Quick Jump Anchors */}
                        <div className="flex items-center justify-center gap-3 flex-wrap text-xs font-family-grotesk-mono">
                            <a
                                href="#dispatches"
                                className="px-4 py-2 rounded-lg bg-[#39b7f2] hover:bg-[#5fd4ff] text-[#0b0b0e] font-bold transition-all shadow-[0_0_15px_rgba(57,183,242,0.3)] flex items-center gap-1.5"
                            >
                                <span>Browse Dispatches</span>
                                <ArrowRight size={13} />
                            </a>
                            <a
                                href="#events"
                                className="px-4 py-2 rounded-lg bg-[#181b28] hover:bg-[#202436] text-[#b7b9c5] hover:text-[#e9ede5] border border-[#2e3347] transition-all flex items-center gap-1.5"
                            >
                                <Calendar size={13} className="text-[#39b7f2]" />
                                <span>Upcoming Events</span>
                            </a>
                            <a
                                href="#research"
                                className="px-4 py-2 rounded-lg bg-[#181b28] hover:bg-[#202436] text-[#b7b9c5] hover:text-[#e9ede5] border border-[#2e3347] transition-all flex items-center gap-1.5"
                            >
                                <Cpu size={13} className="text-[#a855f7]" />
                                <span>Lab Telemetry</span>
                            </a>
                        </div>
                    </div>

                    {/* ── Telemetry HUD Strip ── */}
                    <div className="telemetry-hud-container w-full max-w-7xl mx-auto px-6 pb-8 z-10">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
                            {/* Card 1: Comms Status */}
                            <div className="telemetry-hud-card border border-[#2a2d3d] bg-[#12141c]/90 backdrop-blur-md rounded-xl p-3.5 sm:p-4 flex items-center gap-3.5 shadow-sm">
                                <div className="w-10 h-10 rounded-lg bg-[#39b7f2]/10 border border-[#39b7f2]/30 flex items-center justify-center text-[#39b7f2] shrink-0">
                                    <Activity className="w-5 h-5 animate-pulse" />
                                </div>
                                <div className="min-w-0">
                                    <div className="text-[10px] font-family-grotesk-mono text-[#838698] uppercase tracking-wider">Network Status</div>
                                    <div className="font-family-grotesk text-sm font-bold text-[#e9ede5] flex items-center gap-1.5 truncate">
                                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                                        <span>ONLINE // LIVE</span>
                                    </div>
                                </div>
                            </div>

                            {/* Card 2: Total Dispatches */}
                            <div className="telemetry-hud-card border border-[#2a2d3d] bg-[#12141c]/90 backdrop-blur-md rounded-xl p-3.5 sm:p-4 flex items-center gap-3.5 shadow-sm">
                                <div className="w-10 h-10 rounded-lg bg-sky-500/10 border border-sky-500/30 flex items-center justify-center text-sky-400 shrink-0">
                                    <Layers className="w-5 h-5" />
                                </div>
                                <div className="min-w-0">
                                    <div className="text-[10px] font-family-grotesk-mono text-[#838698] uppercase tracking-wider">Active Logs</div>
                                    <div className="font-family-grotesk text-sm font-bold text-[#e9ede5] truncate">
                                        {updates.length} Transmissions
                                    </div>
                                </div>
                            </div>

                            {/* Card 3: Active Lab Hub */}
                            <div className="telemetry-hud-card border border-[#2a2d3d] bg-[#12141c]/90 backdrop-blur-md rounded-xl p-3.5 sm:p-4 flex items-center gap-3.5 shadow-sm">
                                <div className="w-10 h-10 rounded-lg bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400 shrink-0">
                                    <MapPin className="w-5 h-5" />
                                </div>
                                <div className="min-w-0">
                                    <div className="text-[10px] font-family-grotesk-mono text-[#838698] uppercase tracking-wider">Primary Lab Node</div>
                                    <div className="font-family-grotesk text-sm font-bold text-[#e9ede5] truncate">
                                        Makerspace, IIT KGP
                                    </div>
                                </div>
                            </div>

                            {/* Card 4: Next Milestone */}
                            <div className="telemetry-hud-card border border-[#2a2d3d] bg-[#12141c]/90 backdrop-blur-md rounded-xl p-3.5 sm:p-4 flex items-center gap-3.5 shadow-sm">
                                <div className="w-10 h-10 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0">
                                    <Sparkles className="w-5 h-5" />
                                </div>
                                <div className="min-w-0">
                                    <div className="text-[10px] font-family-grotesk-mono text-[#838698] uppercase tracking-wider">Next Milestone</div>
                                    <div className="font-family-grotesk text-sm font-bold text-[#e9ede5] truncate">
                                        ROBOTIX 2026 Symposium
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ──────────────────────────────────────────────────────────
                    2. FEATURED SPOTLIGHT TRANSMISSION (HERO HIGHLIGHT)
                ────────────────────────────────────────────────────────── */}
                {spotlightUpdate && (
                    <section className="relative py-14 px-6 md:px-12 max-w-7xl mx-auto">
                        <div className="flex items-center justify-between gap-4 mb-6">
                            <div className="flex items-center gap-2 text-xs font-family-grotesk-mono uppercase tracking-widest text-[#838698]">
                                <Radio className="w-4 h-4 text-[#39b7f2] animate-pulse" />
                                <span>High Priority Transmission // Spotlight</span>
                            </div>
                            <span className="hidden sm:inline-block text-xs font-family-grotesk-mono text-[#39b7f2]">
                                PINNED DISPATCH
                            </span>
                        </div>

                        <div
                            onClick={() => setActiveModalUpdate(spotlightUpdate)}
                            className="spotlight-card group relative border border-[#39b7f2]/50 hover:border-[#39b7f2] bg-gradient-to-br from-[#161926] via-[#12141e] to-[#0d0f17] rounded-2xl overflow-hidden cursor-pointer shadow-[0_10px_40px_rgba(57,183,242,0.15)] transition-all duration-300 flex flex-col lg:flex-row"
                        >
                            {/* Visual Left/Top Banner */}
                            {spotlightUpdate.imageUrl && (
                                <div className="relative lg:w-1/2 aspect-16/10 lg:aspect-auto min-h-[300px] lg:min-h-[420px] overflow-hidden bg-[#0d0f16] shrink-0">
                                    <Image
                                        src={spotlightUpdate.imageUrl}
                                        alt={spotlightUpdate.title}
                                        fill
                                        sizes="(min-width: 1024px) 50vw, 100vw"
                                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#12141e] via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-[#12141e]" />

                                    {/* Spotlight Badge */}
                                    <div className="absolute top-4 left-4 flex items-center gap-2">
                                        <span className="bg-[#39b7f2] text-[#0b0b0e] font-family-grotesk-mono text-xs font-extrabold uppercase px-3 py-1 rounded-full shadow-lg tracking-wider flex items-center gap-1.5">
                                            <Sparkles size={12} />
                                            Featured Spotlight
                                        </span>
                                    </div>
                                </div>
                            )}

                            {/* Content Column */}
                            <div className="flex-1 p-8 sm:p-10 flex flex-col justify-between">
                                <div>
                                    {/* Category & Date */}
                                    <div className="flex items-center gap-3 flex-wrap mb-4">
                                        {(() => {
                                            const styles = getCategoryBadgeStyles(spotlightUpdate.category);
                                            return (
                                                <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-family-grotesk-mono font-bold tracking-wider border ${styles.bg} ${styles.border} ${styles.text}`}>
                                                    <span className={`w-1.5 h-1.5 rounded-full ${styles.dot}`} />
                                                    {spotlightUpdate.category || "Selections"}
                                                </span>
                                            );
                                        })()}

                                        <span className="text-xs font-family-grotesk-mono text-[#838698] flex items-center gap-1">
                                            <Calendar size={12} />
                                            {formatDate(spotlightUpdate.publishedAt)}
                                        </span>

                                        {spotlightUpdate.readTime && (
                                            <span className="text-xs font-family-grotesk-mono text-[#838698] flex items-center gap-1">
                                                <Clock size={12} />
                                                {spotlightUpdate.readTime}
                                            </span>
                                        )}
                                    </div>

                                    {/* Title */}
                                    <h2 className="font-family-grotesk text-2xl sm:text-3xl lg:text-4xl font-bold text-[#e9ede5] group-hover:text-[#39b7f2] transition-colors leading-tight mb-4">
                                        {spotlightUpdate.title}
                                    </h2>

                                    {/* Excerpt */}
                                    <p className="font-family-apk text-sm sm:text-base text-[#b7b9c5] leading-relaxed line-clamp-4 mb-6">
                                        {spotlightUpdate.summary || portableTextToPlainText(spotlightUpdate.body)}
                                    </p>
                                </div>

                                {/* Bottom Metadata & CTAs */}
                                <div className="pt-6 border-t border-[#25283a] flex items-center justify-between gap-4 flex-wrap">
                                    <div className="flex items-center gap-2 flex-wrap">
                                        {spotlightUpdate.tags && spotlightUpdate.tags.map((tag) => (
                                            <span
                                                key={tag}
                                                className="px-2.5 py-1 rounded bg-[#1c1f2e] border border-[#2e3347] text-xs font-family-grotesk-mono text-[#8e95a5]"
                                            >
                                                #{tag}
                                            </span>
                                        ))}
                                    </div>

                                    <div className="flex items-center gap-2 text-sm font-family-grotesk-mono font-bold text-[#39b7f2] group-hover:translate-x-1 transition-transform">
                                        <span>Read Full Transmission</span>
                                        <ArrowRight size={16} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                )}

                {/* ──────────────────────────────────────────────────────────
                    3. COMMAND BAR: SEARCH, CATEGORIES & VIEW SWITCHER
                ────────────────────────────────────────────────────────── */}
                <section id="dispatches" className="relative py-8 px-6 md:px-12 max-w-7xl mx-auto">
                    <div className="border border-[#282a3a] bg-[#12141c]/95 backdrop-blur-xl rounded-2xl p-4 sm:p-6 shadow-xl space-y-5">
                        {/* Top Row: Search Input + View Toggle */}
                        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3.5">
                            {/* Search Input Box */}
                            <div className="relative flex-1">
                                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#838698]" />
                                <input
                                    ref={searchInputRef}
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    placeholder="Search updates by keywords, ROS2, Selections, RoboWars, tags..."
                                    className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-[#181b28] border border-[#2e3347] focus:border-[#39b7f2] text-sm text-[#e9ede5] placeholder-[#6e7487] font-family-apk focus:outline-none focus:ring-1 focus:ring-[#39b7f2] transition-all"
                                />
                                {searchQuery && (
                                    <button
                                        onClick={() => setSearchQuery("")}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-[#838698] hover:text-[#e9ede5] p-1"
                                    >
                                        <X size={14} />
                                    </button>
                                )}
                            </div>

                            {/* View Switcher Buttons */}
                            <div className="flex items-center gap-1.5 self-end sm:self-auto bg-[#181b28] border border-[#2e3347] p-1 rounded-xl">
                                <button
                                    onClick={() => setViewMode("grid")}
                                    className={`p-2 rounded-lg text-xs font-family-grotesk-mono transition-all flex items-center gap-1.5 ${viewMode === "grid"
                                            ? "bg-[#39b7f2] text-[#0b0b0e] font-bold shadow-md"
                                            : "text-[#838698] hover:text-[#e9ede5]"
                                        }`}
                                    title="Grid View"
                                >
                                    <LayoutGrid size={15} />
                                    <span className="hidden sm:inline">Grid</span>
                                </button>
                                <button
                                    onClick={() => setViewMode("editorial")}
                                    className={`p-2 rounded-lg text-xs font-family-grotesk-mono transition-all flex items-center gap-1.5 ${viewMode === "editorial"
                                            ? "bg-[#39b7f2] text-[#0b0b0e] font-bold shadow-md"
                                            : "text-[#838698] hover:text-[#e9ede5]"
                                        }`}
                                    title="Magazine / Editorial View"
                                >
                                    <List size={15} />
                                    <span className="hidden sm:inline">Magazine</span>
                                </button>
                            </div>
                        </div>

                        {/* Bottom Row: Category Filter Chips */}
                        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pt-2 border-t border-[#232636]">
                            <span className="text-xs font-family-grotesk-mono text-[#838698] shrink-0 mr-1 flex items-center gap-1">
                                <Filter size={12} />
                                <span>Filter:</span>
                            </span>
                            {CATEGORIES.map((cat) => {
                                const isActive = selectedCategory === cat;
                                const count = getCategoryCount(cat);
                                return (
                                    <button
                                        key={cat}
                                        onClick={() => setSelectedCategory(cat)}
                                        className={`px-3.5 py-1.5 rounded-lg text-xs font-family-grotesk-mono tracking-wider transition-all cursor-pointer shrink-0 border flex items-center gap-2 ${isActive
                                                ? "bg-[#39b7f2] text-[#0b0b0e] border-[#39b7f2] font-bold shadow-[0_0_12px_rgba(57,183,242,0.3)]"
                                                : "bg-[#181b28] border-[#2e3347] text-[#8e95a5] hover:text-[#e9ede5] hover:border-[#39b7f2]/50"
                                            }`}
                                    >
                                        <span>{cat}</span>
                                        <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${isActive ? "bg-[#0b0b0e]/30 text-[#0b0b0e]" : "bg-[#25293d] text-[#838698]"}`}>
                                            {count}
                                        </span>
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                </section>

                {/* ──────────────────────────────────────────────────────────
                    4. DISPATCHES FEED (GRID / EDITORIAL)
                ────────────────────────────────────────────────────────── */}
                <section className="relative py-6 px-6 md:px-12 max-w-7xl mx-auto">
                    {/* Header Bar */}
                    <div className="flex items-center justify-between gap-4 mb-8">
                        <div>
                            <div className="font-family-grotesk-mono text-[#838698] text-xs uppercase tracking-widest mb-1">
                                Transmission Archive
                            </div>
                            <h2 className="font-family-grotesk text-3xl text-[#e9ede5] font-bold">
                                {selectedCategory === "All" ? "All Dispatches" : selectedCategory}
                            </h2>
                        </div>
                        <div className="text-xs font-family-grotesk-mono text-[#838698]">
                            Showing <span className="text-[#39b7f2] font-bold">{filteredUpdates.length}</span> results
                        </div>
                    </div>

                    {/* Zero Results State */}
                    {filteredUpdates.length === 0 ? (
                        <div className="py-20 px-6 text-center border border-[#282a3a] bg-[#12141c]/60 rounded-2xl space-y-4 max-w-2xl mx-auto">
                            <Bot className="w-12 h-12 text-[#838698] mx-auto opacity-50" />
                            <h3 className="font-family-grotesk text-xl text-[#e9ede5]">
                                No Dispatches Match Your Signal
                            </h3>
                            <p className="font-family-apk text-sm text-[#8e95a5]">
                                We couldn't find any updates matching &quot;{searchQuery}&quot; in {selectedCategory}. Try resetting your filters.
                            </p>
                            <button
                                onClick={() => {
                                    setSearchQuery("");
                                    setSelectedCategory("All");
                                }}
                                className="px-5 py-2.5 rounded-xl bg-[#39b7f2] text-[#0b0b0e] font-family-grotesk-mono text-xs font-bold uppercase tracking-wider transition-all"
                            >
                                Reset All Filters
                            </button>
                        </div>
                    ) : viewMode === "grid" ? (
                        /* Grid Layout */
                        <div ref={cardsContainerRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredUpdates.map((update) => (
                                <UpdateCard key={update._id} update={update} viewMode="grid" />
                            ))}
                        </div>
                    ) : (
                        /* Editorial Magazine List Layout */
                        <div ref={cardsContainerRef} className="flex flex-col gap-6">
                            {filteredUpdates.map((update) => (
                                <UpdateCard key={update._id} update={update} viewMode="editorial" />
                            ))}
                        </div>
                    )}
                </section>

                {/* ──────────────────────────────────────────────────────────
                    5. "EVENT HORIZON" – UPCOMING MILESTONES & DEADLINES
                ────────────────────────────────────────────────────────── */}
                <section id="events" className="timeline-section relative py-20 px-6 md:px-12 max-w-7xl mx-auto border-t border-[#25283a] mt-16">
                    <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
                        <div>
                            <div className="flex items-center gap-2 font-family-grotesk-mono text-[#39b7f2] text-xs uppercase tracking-widest mb-2">
                                <Calendar className="w-4 h-4" />
                                <span>Event Horizon // Key Milestones</span>
                            </div>
                            <h2 className="font-family-grotesk text-3xl sm:text-4xl text-[#e9ede5] font-bold">
                                Upcoming Events &amp; Timelines
                            </h2>
                        </div>
                        <p className="font-family-apk text-sm text-[#8e95a5] max-w-md">
                            Synchronize your schedule with upcoming workshops, competitions, and symposiums at IIT Kharagpur.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {upcomingEvents.map((evt) => (
                            <div
                                key={evt.id}
                                className="timeline-card group relative border border-[#2c3042] hover:border-[#39b7f2]/60 bg-[#141620]/90 backdrop-blur-md rounded-2xl p-6 transition-all duration-300 shadow-md hover:shadow-[0_8px_30px_rgba(57,183,242,0.15)] flex flex-col justify-between"
                            >
                                <div>
                                    {/* Top meta: Category + Status */}
                                    <div className="flex items-center justify-between gap-3 mb-4">
                                        <span className={`px-2.5 py-0.5 rounded-full text-xs font-family-grotesk-mono font-bold border ${evt.badgeColor}`}>
                                            {evt.status}
                                        </span>
                                        <span className="text-xs font-family-grotesk-mono text-[#838698] uppercase">
                                            {evt.category}
                                        </span>
                                    </div>

                                    {/* Title */}
                                    <h3 className="font-family-grotesk text-xl font-bold text-[#e9ede5] group-hover:text-[#39b7f2] transition-colors leading-snug mb-3">
                                        {evt.title}
                                    </h3>

                                    {/* Description */}
                                    <p className="font-family-apk text-sm text-[#b7b9c5] leading-relaxed mb-6">
                                        {evt.description}
                                    </p>
                                </div>

                                {/* Bottom Time & Venue details */}
                                <div className="pt-4 border-t border-[#232636] space-y-2 text-xs font-family-grotesk-mono text-[#8e95a5]">
                                    <div className="flex items-center gap-2 text-[#e9ede5]">
                                        <Calendar size={13} className="text-[#39b7f2]" />
                                        <span className="font-semibold">{evt.date}</span>
                                        <span className="text-[#838698]">|</span>
                                        <span>{evt.time}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-[#8e95a5]">
                                        <MapPin size={13} className="text-[#a855f7]" />
                                        <span>{evt.venue}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* ──────────────────────────────────────────────────────────
                    6. LAB TELEMETRY & RESEARCH SPOTLIGHTS
                ────────────────────────────────────────────────────────── */}
                <section id="research" className="research-section relative py-20 px-6 md:px-12 max-w-7xl mx-auto border-t border-[#25283a]">
                    <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
                        <div>
                            <div className="flex items-center gap-2 font-family-grotesk-mono text-[#a855f7] text-xs uppercase tracking-widest mb-2">
                                <Cpu className="w-4 h-4" />
                                <span>Hardware &amp; AI Division // R&amp;D Logs</span>
                            </div>
                            <h2 className="font-family-grotesk text-3xl sm:text-4xl text-[#e9ede5] font-bold">
                                Active Research Telemetry
                            </h2>
                        </div>
                        <p className="font-family-apk text-sm text-[#8e95a5] max-w-md">
                            Live development milestones, kinematic controllers, and vision models currently under test in the TRS labs.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {researchHighlights.map((res) => (
                            <div
                                key={res.id}
                                className="research-card border border-[#2c3042] hover:border-[#a855f7]/60 bg-[#141620]/90 backdrop-blur-md rounded-2xl p-6 transition-all duration-300 shadow-md flex flex-col justify-between"
                            >
                                <div>
                                    {/* Subsystem & Status */}
                                    <div className="flex items-center justify-between gap-2 mb-3">
                                        <span className="text-[11px] font-family-grotesk-mono text-[#a855f7] font-semibold uppercase">
                                            {res.subsystem}
                                        </span>
                                        <span className="text-[10px] font-family-grotesk-mono px-2 py-0.5 rounded bg-[#211832] text-[#c084fc] border border-[#a855f7]/30">
                                            {res.status}
                                        </span>
                                    </div>

                                    {/* Project Name */}
                                    <h3 className="font-family-grotesk text-xl font-bold text-[#e9ede5] mb-4 leading-snug">
                                        {res.name}
                                    </h3>

                                    {/* Progress Bar */}
                                    <div className="mb-6 space-y-1.5">
                                        <div className="flex items-center justify-between text-xs font-family-grotesk-mono text-[#838698]">
                                            <span>Hardware Phase</span>
                                            <span className="text-[#e9ede5] font-bold">{res.progress}%</span>
                                        </div>
                                        <div className="w-full h-1.5 bg-[#1f2233] rounded-full overflow-hidden">
                                            <div
                                                className="h-full bg-gradient-to-r from-[#a855f7] to-[#39b7f2] rounded-full transition-all duration-1000"
                                                style={{ width: `${res.progress}%` }}
                                            />
                                        </div>
                                    </div>

                                    {/* Metrics Grid */}
                                    <div className="space-y-2 mb-6">
                                        {res.metrics.map((m, idx) => (
                                            <div key={idx} className="flex items-center justify-between text-xs p-2 rounded-lg bg-[#181b28] border border-[#26293b]">
                                                <span className="font-family-apk text-[#8e95a5]">{m.label}</span>
                                                <span className="font-family-grotesk-mono font-bold text-[#39b7f2]">{m.value}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Tags */}
                                <div className="flex items-center gap-1.5 flex-wrap pt-4 border-t border-[#232636]">
                                    {res.tags.map((tag) => (
                                        <span key={tag} className="text-[10px] font-family-grotesk-mono text-[#7a8194] bg-[#1c1f2e] px-2 py-0.5 rounded">
                                            #{tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* ──────────────────────────────────────────────────────────
                    7. MULTIMEDIA LAB CHRONICLES (PHOTO & ACTION SHOWCASE)
                ────────────────────────────────────────────────────────── */}
                <section className="chronicles-section relative py-20 px-6 md:px-12 max-w-7xl mx-auto border-t border-[#25283a]">
                    <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
                        <div>
                            <div className="flex items-center gap-2 font-family-grotesk-mono text-[#39b7f2] text-xs uppercase tracking-widest mb-2">
                                <Sparkles className="w-4 h-4" />
                                <span>Visual Logs // Behind the Bots</span>
                            </div>
                            <h2 className="font-family-grotesk text-3xl sm:text-4xl text-[#e9ede5] font-bold">
                                Multimedia Lab Chronicles
                            </h2>
                        </div>
                        <p className="font-family-apk text-sm text-[#8e95a5] max-w-md">
                            Snapshots from our fabrication marathons, testing arenas, and late-night debugging sessions.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {labChronicles.map((item) => (
                            <div
                                key={item.id}
                                className="chronicle-item group relative border border-[#2c3042] hover:border-[#39b7f2] bg-[#141620] rounded-2xl overflow-hidden shadow-lg transition-all duration-300 flex flex-col"
                            >
                                <div className={`relative w-full ${item.aspect} overflow-hidden bg-[#0d0f16]`}>
                                    <Image
                                        src={item.image}
                                        alt={item.title}
                                        fill
                                        sizes="(min-width: 1024px) 380px, (min-width: 640px) 50vw, 100vw"
                                        className="object-cover group-hover:scale-108 transition-transform duration-700"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#141620] via-transparent to-transparent opacity-80" />

                                    <span className="absolute top-3 left-3 bg-[#0b0b0e]/80 backdrop-blur-md text-[#39b7f2] border border-[#39b7f2]/30 text-[10px] font-family-grotesk-mono font-bold uppercase px-2.5 py-0.5 rounded-full">
                                        {item.category}
                                    </span>
                                </div>

                                <div className="p-5 flex-1 flex flex-col justify-between">
                                    <h3 className="font-family-grotesk text-base font-bold text-[#e9ede5] group-hover:text-[#39b7f2] transition-colors leading-snug mb-2">
                                        {item.title}
                                    </h3>
                                    <p className="font-family-apk text-xs text-[#8e95a5] leading-relaxed">
                                        {item.caption}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* ──────────────────────────────────────────────────────────
                    8. COMMS DISPATCH TERMINAL (NEWSLETTER / ALERTS)
                ────────────────────────────────────────────────────────── */}
                <section className="relative py-20 px-6 md:px-12 max-w-7xl mx-auto border-t border-[#25283a]">
                    <div className="border border-[#39b7f2]/40 bg-gradient-to-br from-[#121522] via-[#0f111a] to-[#0a0c12] rounded-3xl p-8 sm:p-12 shadow-[0_20px_50px_rgba(57,183,242,0.15)] relative overflow-hidden">
                        {/* Background Grid Accent */}
                        <div className="absolute inset-0 bg-[radial-gradient(#39b7f2_1px,transparent_1px)] [background-size:24px_24px] opacity-10 pointer-events-none" />

                        <div className="relative z-10 max-w-3xl mx-auto text-center space-y-6">
                            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#39b7f2]/10 border border-[#39b7f2]/30 text-[#39b7f2] text-xs font-family-grotesk-mono font-bold uppercase">
                                <Terminal size={14} />
                                <span>Signal Dispatch Channel</span>
                            </div>

                            <h2 className="font-family-grotesk text-3xl sm:text-4xl text-[#e9ede5] font-bold">
                                Subscribe to TRS Transmission Broadcasts
                            </h2>

                            <p className="font-family-apk text-base text-[#8e95a5] leading-relaxed max-w-xl mx-auto">
                                Receive instant email and broadcast alerts for upcoming workshops, winter bootcamps, RoboWars problem statements, and selection rounds.
                            </p>

                            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto pt-2">
                                <input
                                    type="email"
                                    required
                                    value={subscriberEmail}
                                    onChange={(e) => setSubscriberEmail(e.target.value)}
                                    placeholder="Enter your student email (e.g. roll@kgpian.iitkgp.ac.in)..."
                                    className="flex-1 px-4 py-3.5 rounded-xl bg-[#181b28] border border-[#2e3347] focus:border-[#39b7f2] text-sm text-[#e9ede5] placeholder-[#6e7487] font-family-apk focus:outline-none focus:ring-1 focus:ring-[#39b7f2]"
                                />
                                <button
                                    type="submit"
                                    disabled={subscribeStatus === "submitting"}
                                    className="px-6 py-3.5 rounded-xl bg-[#39b7f2] hover:bg-[#5fd4ff] text-[#0b0b0e] font-family-grotesk-mono font-bold text-xs uppercase tracking-wider transition-all shadow-[0_0_20px_rgba(57,183,242,0.3)] shrink-0 flex items-center justify-center gap-2"
                                >
                                    {subscribeStatus === "submitting" ? (
                                        <span>Transmitting...</span>
                                    ) : subscribeStatus === "success" ? (
                                        <span className="flex items-center gap-1.5 text-emerald-950 font-extrabold">
                                            <CheckCircle2 size={16} /> Signal Active!
                                        </span>
                                    ) : (
                                        <span className="flex items-center gap-1.5">
                                            <span>Subscribe Signal</span>
                                            <ArrowRight size={14} />
                                        </span>
                                    )}
                                </button>
                            </form>

                            <div className="flex items-center justify-center gap-6 text-xs font-family-grotesk-mono text-[#838698] pt-2 flex-wrap">
                                <span className="flex items-center gap-1">
                                    <CheckCircle2 size={13} className="text-[#39b7f2]" /> Zero Spam
                                </span>
                                <span className="flex items-center gap-1">
                                    <CheckCircle2 size={13} className="text-[#39b7f2]" /> Official IIT KGP Updates
                                </span>
                                <span className="flex items-center gap-1">
                                    <CheckCircle2 size={13} className="text-[#39b7f2]" /> Unsubscribe Anytime
                                </span>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ──────────────────────────────────────────────────────────
                    9. KNOWLEDGE BASE & QUICK DOWNLOADS
                ────────────────────────────────────────────────────────── */}
                <section className="relative py-16 px-6 md:px-12 max-w-7xl mx-auto border-t border-[#25283a] mb-12">
                    <div className="flex items-center justify-between gap-4 mb-8">
                        <div>
                            <div className="font-family-grotesk-mono text-[#838698] text-xs uppercase tracking-widest mb-1">
                                Quick Repositories
                            </div>
                            <h2 className="font-family-grotesk text-2xl sm:text-3xl text-[#e9ede5] font-bold">
                                Knowledge Base &amp; Resource Hub
                            </h2>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {quickResources.map((res) => (
                            <a
                                key={res.id}
                                href={res.link}
                                target={res.link.startsWith("http") ? "_blank" : "_self"}
                                rel="noopener noreferrer"
                                className="group border border-[#2c3042] hover:border-[#39b7f2] bg-[#141620]/80 rounded-xl p-5 transition-all duration-300 flex flex-col justify-between shadow-sm hover:shadow-[0_4px_20px_rgba(57,183,242,0.12)]"
                            >
                                <div>
                                    <div className="flex items-center justify-between gap-2 mb-3">
                                        <span className="text-[10px] font-family-grotesk-mono text-[#39b7f2] bg-[#39b7f2]/10 px-2 py-0.5 rounded border border-[#39b7f2]/20">
                                            {res.category}
                                        </span>
                                        <span className="text-[10px] font-family-grotesk-mono text-[#838698]">
                                            {res.size}
                                        </span>
                                    </div>
                                    <h4 className="font-family-grotesk text-base font-bold text-[#e9ede5] group-hover:text-[#39b7f2] transition-colors leading-snug mb-2">
                                        {res.title}
                                    </h4>
                                    <p className="font-family-apk text-xs text-[#8e95a5] leading-relaxed mb-4">
                                        {res.description}
                                    </p>
                                </div>

                                <div className="flex items-center gap-1.5 text-xs font-family-grotesk-mono text-[#39b7f2] pt-3 border-t border-[#232636]">
                                    <FileText size={13} />
                                    <span>Access Resource</span>
                                    <ExternalLink size={12} className="ml-auto opacity-70 group-hover:opacity-100" />
                                </div>
                            </a>
                        ))}
                    </div>
                </section>
            </main>

            {/* ── Detail Reader Modal ── */}
            {activeModalUpdate && (
                <UpdateModal
                    update={activeModalUpdate}
                    onClose={() => setActiveModalUpdate(null)}
                />
            )}
        </>
    );
}
