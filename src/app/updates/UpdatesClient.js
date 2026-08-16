// src/app/updates/UpdatesClient.js
"use client";
import { useRef, useEffect, useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
    Search,
    LayoutGrid,
    List,
    Radio,
    Calendar,
    Clock,
    Sparkles,
    Bot,
    CheckCircle2,
    Terminal,
    ArrowRight,
    ExternalLink,
    FileText,
    Layers,
    X,
    Filter,
    MapPin
} from "lucide-react";
import UpdateCard, { UpdateModal, formatDate, portableTextToPlainText, getCategoryBadgeStyles } from "@/components/UpdateCard";
import {
    quickResources
} from "@/data/updates";

gsap.registerPlugin(ScrollTrigger);

const CATEGORIES = [
    "All",
    "Bots",
    "Workshops",
    "Selections",
    "Blogs",
    "Announcements"
];

function checkCategoryMatch(itemCategory, filterCat, isLiveSanity) {
    if (!filterCat || filterCat === "All") return true;
    const itemCat = (itemCategory || "").toLowerCase();
    const targetCat = filterCat.toLowerCase();
    if (itemCat === targetCat) return true;
    if (targetCat === "bots" && (itemCat === "research & labs" || itemCat === "bots")) return true;
    if (targetCat === "workshops" && (itemCat === "workshops & talks" || itemCat === "workshops")) return true;
    if (targetCat === "selections" && (itemCat === "selections" || isLiveSanity)) return true;
    if (targetCat === "announcements" && (itemCat === "announcements" || itemCat === "competitions")) return true;
    if (targetCat === "blogs" && itemCat === "blogs") return true;
    return false;
}

export default function UpdatesClient({ initialUpdates = [] }) {
    const mainRef = useRef(null);
    const searchInputRef = useRef(null);
    const cardsContainerRef = useRef(null);

    const [updates] = useState(initialUpdates);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [viewMode, setViewMode] = useState("grid"); // "grid" | "editorial"
    const [activeModalUpdate, setActiveModalUpdate] = useState(null);

    // Newsletter terminal states
    const [subscriberEmail, setSubscriberEmail] = useState("");
    const [subscribeStatus, setSubscribeStatus] = useState("idle"); // "idle" | "submitting" | "success"

    // Filter updates based on search query and category
    const filteredUpdates = useMemo(() => {
        return updates.filter((item) => {
            const matchesCategory = checkCategoryMatch(item.category, selectedCategory, item.isLiveSanity);

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
        return updates.filter(item => checkCategoryMatch(item.category, cat, item.isLiveSanity)).length;
    };

    // GSAP Entrance Animations
    useEffect(() => {
        const ctx = gsap.context(() => {
            // Animate spotlight card
            gsap.from(".spotlight-card", {
                opacity: 0,
                y: 30,
                duration: 0.8,
                ease: "power3.out",
            });
        }, mainRef);

        return () => ctx.revert();
    }, [updates]);

    return (
        <>
            <main ref={mainRef} className="relative bg-[#0b0b0e] text-[#e9ede5] overflow-x-hidden min-h-screen">
                {/* ──────────────────────────────────────────────────────────
                    ANNOUNCEMENTS // SPOTLIGHT
                ────────────────────────────────────────────────────────── */}
                {spotlightUpdate && (
                    <section className="relative pt-28 sm:pt-32 pb-8 px-6 md:px-12 max-w-7xl mx-auto">
                        <div className="flex items-center justify-between gap-4 mb-6">
                            <div className="flex items-center gap-2 text-xs font-family-grotesk-mono uppercase tracking-widest text-[#838698]">
                                <Radio className="w-4 h-4 text-[#39b7f2] animate-pulse" />
                                <span>Announcements</span>
                            </div>
                            <span className="hidden sm:inline-block text-xs font-family-grotesk-mono text-[#39b7f2]">
                                PINNED DISPATCH
                            </span>
                        </div>

                        <div
                            onClick={() => setActiveModalUpdate(spotlightUpdate)}
                            className="spotlight-card group relative border border-[#39b7f2]/50 hover:border-[#39b7f2] bg-gradient-to-br from-[#161926] via-[#12141e] to-[#0d0f17] rounded-2xl overflow-hidden cursor-pointer shadow-[0_10px_40px_rgba(57,183,242,0.15)] transition-all duration-300 flex flex-col lg:flex-row items-stretch"
                        >
                            {/* Visual Left/Top Banner */}
                            {spotlightUpdate.imageUrl && (
                                <div className="relative lg:w-1/2 min-h-[300px] sm:min-h-[380px] lg:min-h-[420px] bg-[#07080e] p-4 sm:p-6 flex items-center justify-center shrink-0 overflow-hidden">
                                    <div className="relative w-full h-full min-h-[280px] sm:min-h-[340px] lg:min-h-[380px] flex items-center justify-center">
                                        <Image
                                            src={spotlightUpdate.imageUrl}
                                            alt={spotlightUpdate.title}
                                            fill
                                            sizes="(min-width: 1024px) 50vw, 100vw"
                                            className="object-contain group-hover:scale-[1.02] transition-transform duration-500"
                                        />
                                    </div>

                                    {/* Spotlight Badge */}
                                    <div className="absolute top-4 left-4 flex items-center gap-2 z-10">
                                        <span className="bg-[#39b7f2] text-[#0b0b0e] font-family-grotesk-mono text-xs font-extrabold uppercase px-3 py-1 rounded-full shadow-lg tracking-wider flex items-center gap-1.5">
                                            <Sparkles size={12} />
                                            Featured Spotlight
                                        </span>
                                    </div>
                                </div>
                            )}

                            {/* Content Column */}
                            <div className="flex-1 p-6 sm:p-8 lg:p-10 flex flex-col justify-between min-w-0">
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
                                    <p className="font-family-apk text-sm sm:text-base text-[#b7b9c5] leading-relaxed mb-6">
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
                                        <span>View Full Update</span>
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
                                    placeholder="Search updates by keywords, bots, components ..."
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
                                Update Archive
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
                                We couldn&apos;t find any updates matching &quot;{searchQuery}&quot; in {selectedCategory}. Try resetting your filters.
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
                                <span>Event Horizon</span>
                            </div>
                            <h2 className="font-family-grotesk text-3xl sm:text-4xl text-[#e9ede5] font-bold">
                                Upcoming Events &amp; Timelines
                            </h2>
                        </div>
                        <p className="font-family-apk text-sm text-[#8e95a5] max-w-md">
                            Synchronize your schedule with upcoming workshops, competitions, and symposiums at IIT Kharagpur.
                        </p>
                    </div>

                    <div className="py-16 px-6 text-center border border-[#282a3a] bg-[#12141c]/60 backdrop-blur-md rounded-2xl space-y-3 max-w-2xl mx-auto shadow-sm">
                        <Calendar className="w-10 h-10 text-[#39b7f2] mx-auto opacity-70 animate-pulse" />
                        <h3 className="font-family-grotesk text-xl sm:text-2xl text-[#e9ede5] font-bold">
                            No Upcoming Events, Stay Tuned!
                        </h3>
                        <p className="font-family-apk text-sm text-[#8e95a5] max-w-md mx-auto">
                            Follow our WhatsApp Channel or check back soon for workshop dates, important events, and symposium schedules.
                        </p>
                    </div>
                </section>

                {/* ──────────────────────────────────────────────────────────
                    6. COMMS DISPATCH TERMINAL (NEWSLETTER / ALERTS)
                ────────────────────────────────────────────────────────── */}
                <section className="relative py-20 px-6 md:px-12 max-w-7xl mx-auto border-t border-[#25283a]">
                    <div className="group border border-[#282a3a] hover:border-[#39b7f2]/50 bg-gradient-to-br from-[#121522] via-[#0f111a] to-[#0a0c12] rounded-3xl p-8 sm:p-12 transition-all duration-500 hover:shadow-[0_20px_50px_rgba(57,183,242,0.18)] relative overflow-hidden">
                        {/* Background Grid Accent */}
                        <div className="absolute inset-0 bg-[radial-gradient(#39b7f2_1px,transparent_1px)] [background-size:24px_24px] opacity-10 group-hover:opacity-15 pointer-events-none transition-opacity duration-500" />

                        <div className="relative z-10 max-w-3xl mx-auto text-center space-y-6">
                            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#39b7f2]/10 border border-[#39b7f2]/30 text-[#39b7f2] text-xs font-family-grotesk-mono font-bold uppercase">
                                <Terminal size={14} />
                                <span>Signal Dispatch Channel</span>
                            </div>

                            <h2 className="font-family-grotesk text-3xl sm:text-4xl text-[#e9ede5] font-bold">
                                Want more Robotix updates on your phone?
                            </h2>

                            <p className="font-family-apk text-base text-[#8e95a5] leading-relaxed max-w-xl mx-auto">
                                Share your Email-ID for exclusive updates on ongoing projects, event announcements.
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
                                    <CheckCircle2 size={13} className="text-[#39b7f2]" /> Events?
                                </span>
                                <span className="flex items-center gap-1">
                                    <CheckCircle2 size={13} className="text-[#39b7f2]" /> Workshops?
                                </span>
                                <span className="flex items-center gap-1">
                                    <CheckCircle2 size={13} className="text-[#39b7f2]" /> Resources?
                                </span>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ──────────────────────────────────────────────────────────
                    7. KNOWLEDGE BASE & QUICK DOWNLOADS
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
