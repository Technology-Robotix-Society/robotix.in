"use client";
import { useState, useMemo } from "react";
import Link from "next/link";
import {
    Search,
    X,
    HelpCircle,
    SlidersHorizontal,
    ChevronsUpDown,
    ArrowRight,
    MessageCircleQuestion,
    Sparkles,
    Send,
} from "lucide-react";
import faq from "@/data/faq";
import FaqAccordion from "@/components/FaqAccordion";
import useScrambleText from "@/hooks/useScrambleText";

const CATEGORIES = [
    { id: "all", label: "All Questions" },
    { id: "about", label: "About TRS" },
    { id: "selections", label: "Selections & Induction" },
    { id: "workshops", label: "KRAIG Workshops" },
    { id: "winterschool", label: "Winter School" },
    { id: "support", label: "Support & Help" },
];

function getCategory(index) {
    if (index >= 0 && index <= 2) return "about";
    if (index >= 3 && index <= 14) return "selections";
    if (index === 15) return "about";
    if (index >= 16 && index <= 20) return "workshops";
    if (index >= 21 && index <= 23) return "winterschool";
    if (index === 24) return "about";
    if (index === 25) return "support";
    return "about";
}

export default function Faqs() {
    const displayText = useScrambleText("FAQs");
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [openIndices, setOpenIndices] = useState(new Set());

    // Filter FAQs based on search and category
    const filteredFaqs = useMemo(() => {
        return faq
            .map((item, originalIndex) => ({
                ...item,
                originalIndex,
                category: getCategory(originalIndex),
            }))
            .filter((item) => {
                const matchesCategory =
                    selectedCategory === "all" || item.category === selectedCategory;

                const q = searchQuery.toLowerCase().trim();
                const matchesSearch =
                    !q ||
                    item.question.toLowerCase().includes(q) ||
                    item.answer.toLowerCase().includes(q);

                return matchesCategory && matchesSearch;
            });
    }, [searchQuery, selectedCategory]);

    const toggleAccordion = (index) => {
        setOpenIndices((prev) => {
            const next = new Set(prev);
            if (next.has(index)) {
                next.delete(index);
            } else {
                next.add(index);
            }
            return next;
        });
    };

    const isAllExpanded =
        filteredFaqs.length > 0 &&
        filteredFaqs.every((item) => openIndices.has(item.originalIndex));

    const toggleExpandAll = () => {
        if (isAllExpanded) {
            setOpenIndices(new Set());
        } else {
            const allCurrent = new Set(filteredFaqs.map((item) => item.originalIndex));
            setOpenIndices(allCurrent);
        }
    };

    return (
        <main className="bg-[#0b0b0e] min-h-screen relative pt-28 sm:pt-32 md:pt-36 pb-16 sm:pb-20 px-4 sm:px-8 md:px-16 lg:px-24 overflow-hidden">
            {/* Ambient Background Glow */}
            <div className="absolute top-24 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#39b7f2]/10 blur-[140px] pointer-events-none -z-10 rounded-full" />
            <div className="absolute top-[600px] right-10 w-[400px] h-[400px] bg-[#22446a]/15 blur-[150px] pointer-events-none -z-10 rounded-full" />

            {/* Subtle Desktop Vertical Guides */}
            <div className="hidden lg:block absolute left-9 w-px top-0 h-full bg-[#424453]/30 pointer-events-none" />
            <div className="hidden lg:block absolute right-9 w-px top-0 h-full bg-[#8b8fae]/30 pointer-events-none" />

            <div className="max-w-5xl mx-auto">
                {/* ──────────────────────────────────────────────────────────
                    HERO / HEADER SECTION
                ────────────────────────────────────────────────────────── */}
                <div className="border-b border-[#26293b] pb-10 mb-10">
                    <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#39b7f2]/10 border border-[#39b7f2]/25 text-[#39b7f2] text-xs font-family-grotesk-mono font-bold uppercase tracking-widest mb-4">
                        <HelpCircle className="w-3.5 h-3.5" />
                        <span>Frequently asked questions</span>
                    </div>

                    <h1 className="text-[#e9ede5] font-family-grotesk text-5xl sm:text-7xl md:text-8xl lg:text-[120px] font-bold tracking-tight leading-none mb-6">
                        {displayText}
                    </h1>

                    <p className="font-family-apk text-sm sm:text-base md:text-lg text-[#8e95a5] max-w-2xl leading-relaxed">
                        Answers to the most frequently asked questions regarding Technology Robotix
                        Society, fresher inductions, K.R.A.I.G. workshops, and the Winter School.
                    </p>
                </div>

                {/* ──────────────────────────────────────────────────────────
                    SEARCH & CATEGORY CONTROLS
                ────────────────────────────────────────────────────────── */}
                <div className="space-y-5 mb-10">
                    {/* Live Search Bar */}
                    <div className="relative group">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#6e7487] group-focus-within:text-[#39b7f2] transition-colors" />
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search questions or keywords (e.g. selections, workshops, beginners, mentor)..."
                            className="w-full pl-12 pr-10 py-3.5 sm:py-4 rounded-xl bg-[#12141e]/90 border border-[#262a3d] focus:border-[#39b7f2] text-sm sm:text-base text-[#e9ede5] placeholder-[#6e7487] font-family-apk focus:outline-none focus:ring-1 focus:ring-[#39b7f2] transition-all shadow-sm"
                        />
                        {searchQuery && (
                            <button
                                type="button"
                                onClick={() => setSearchQuery("")}
                                className="absolute right-3.5 top-1/2 -translate-y-1/2 p-1 rounded-md text-[#8e95a5] hover:text-white hover:bg-[#1f2334] transition-all"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        )}
                    </div>

                    {/* Category Filter Pills */}
                    <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
                        {CATEGORIES.map((cat) => {
                            const isActive = selectedCategory === cat.id;
                            const count =
                                cat.id === "all"
                                    ? faq.length
                                    : faq.filter((_, i) => getCategory(i) === cat.id).length;

                            return (
                                <button
                                    key={cat.id}
                                    type="button"
                                    onClick={() => setSelectedCategory(cat.id)}
                                    className={`px-3.5 py-1.5 rounded-lg text-xs font-family-grotesk-mono font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 border cursor-pointer ${isActive
                                        ? "bg-[#39b7f2] text-[#0b0b0e] border-[#39b7f2] shadow-[0_0_15px_rgba(57,183,242,0.3)]"
                                        : "bg-[#131622] text-[#8e95a5] border-[#25283b] hover:border-[#39b7f2]/50 hover:text-[#e9ede5]"
                                        }`}
                                >
                                    <span>{cat.label}</span>
                                    <span
                                        className={`px-1.5 py-0.2 rounded text-[10px] ${isActive
                                            ? "bg-[#0b0b0e]/20 text-[#0b0b0e]"
                                            : "bg-[#1c2030] text-[#6b7285]"
                                            }`}
                                    >
                                        {count}
                                    </span>
                                </button>
                            );
                        })}
                    </div>

                    {/* Summary Bar: Results Count & Expand/Collapse Toggle */}
                    <div className="flex items-center justify-between text-xs font-family-grotesk-mono text-[#838698] pt-1">
                        <div className="flex items-center gap-2">
                            <span>
                                Showing <strong className="text-[#39b7f2] font-bold">{filteredFaqs.length}</strong> of {faq.length} questions
                            </span>
                            {searchQuery && (
                                <span className="text-[#646a7d]">
                                    (filtered by &ldquo;{searchQuery}&rdquo;)
                                </span>
                            )}
                        </div>

                        {filteredFaqs.length > 0 && (
                            <button
                                type="button"
                                onClick={toggleExpandAll}
                                className="inline-flex items-center gap-1.5 hover:text-[#39b7f2] transition-colors cursor-pointer"
                            >
                                <ChevronsUpDown className="w-3.5 h-3.5" />
                                <span>{isAllExpanded ? "Collapse All" : "Expand All"}</span>
                            </button>
                        )}
                    </div>
                </div>

                {/* ──────────────────────────────────────────────────────────
                    FAQ ACCORDION LIST
                ────────────────────────────────────────────────────────── */}
                <div className="space-y-3.5">
                    {filteredFaqs.length > 0 ? (
                        filteredFaqs.map((item) => (
                            <FaqAccordion
                                key={item.originalIndex}
                                item={item}
                                index={item.originalIndex}
                                isOpen={openIndices.has(item.originalIndex)}
                                onToggle={toggleAccordion}
                            />
                        ))
                    ) : (
                        <div className="text-center py-16 px-6 border border-[#25283c] bg-[#12141e]/60 rounded-2xl space-y-4">
                            <MessageCircleQuestion className="w-10 h-10 text-[#39b7f2] mx-auto opacity-60" />
                            <h3 className="font-family-grotesk text-xl text-[#e9ede5] font-bold">
                                No questions matched your search
                            </h3>
                            <p className="font-family-apk text-sm text-[#8e95a5] max-w-md mx-auto">
                                We couldn&apos;t find any query matching &ldquo;{searchQuery}&rdquo;. Try using different keywords or resetting filters.
                            </p>
                            <button
                                type="button"
                                onClick={() => {
                                    setSearchQuery("");
                                    setSelectedCategory("all");
                                }}
                                className="px-4 py-2 rounded-lg bg-[#1c2030] hover:bg-[#282e45] text-[#39b7f2] text-xs font-family-grotesk-mono font-semibold transition-colors border border-[#2e344e]"
                            >
                                Reset all filters
                            </button>
                        </div>
                    )}
                </div>

                {/* ──────────────────────────────────────────────────────────
                    BOTTOM SUPPORT DISPATCH CARD
                ────────────────────────────────────────────────────────── */}
                <div className="mt-16 pt-12 border-t border-[#25283a]">
                    <div className="border border-[#282c40] bg-gradient-to-br from-[#121524] via-[#0f111c] to-[#090b10] rounded-3xl p-8 sm:p-10 relative overflow-hidden shadow-sm">
                        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                            <div className="space-y-2 max-w-xl">
                                <div className="inline-flex items-center gap-1.5 text-xs font-family-grotesk-mono text-[#39b7f2] font-semibold uppercase tracking-wider">
                                    <Sparkles className="w-3.5 h-3.5" />
                                    <span>Still have questions?</span>
                                </div>
                                <h3 className="font-family-grotesk text-2xl sm:text-3xl text-[#e9ede5] font-bold">
                                    Get in touch with the TRS team
                                </h3>
                                <p className="font-family-apk text-sm sm:text-base text-[#8e95a5] leading-relaxed">
                                    Have a unique inquiry about projects, collaborations, or events? We&apos;re here to help you get started.
                                </p>
                            </div>

                            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
                                <Link
                                    href="/contact"
                                    className="px-6 py-3 rounded-xl bg-[#39b7f2] hover:bg-[#5fd4ff] text-[#0b0b0e] font-family-grotesk-mono font-bold text-xs uppercase tracking-wider transition-all shadow-[0_0_20px_rgba(57,183,242,0.25)] flex items-center justify-center gap-2"
                                >
                                    <span>Contact Us</span>
                                    <ArrowRight className="w-4 h-4" />
                                </Link>
                                <Link
                                    href="/updates"
                                    className="px-6 py-3 rounded-xl bg-[#181b28] hover:bg-[#222638] text-[#e9ede5] font-family-grotesk-mono font-semibold text-xs uppercase tracking-wider transition-all border border-[#2c3044] flex items-center justify-center gap-2"
                                >
                                    <span>Latest Updates</span>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}

