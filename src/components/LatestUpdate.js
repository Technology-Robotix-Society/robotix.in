// components/LatestUpdate.js
// Client Component — renders a structured side panel for News & Announcements / Latest Updates
"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Radio, ArrowRight, Calendar, Globe, Sparkles, Newspaper } from "lucide-react";
import { formatDate, portableTextToPlainText, UpdateModal } from "@/components/UpdateCard";

const hardwareAccel = {
    transform: "translateZ(0)",
    willChange: "transform",
    WebkitBackfaceVisibility: "hidden",
    backfaceVisibility: "hidden",
};

const CATEGORIES = ["All", "Events", "Selections", "Workshops"];

export default function LatestUpdate() {
    const [updates, setUpdates] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [isLoading, setIsLoading] = useState(true);
    const [activeModalUpdate, setActiveModalUpdate] = useState(null);
    const scrollContainerRef = useRef(null);

    useEffect(() => {
        let isActive = true;

        async function loadUpdates() {
            try {
                const response = await fetch("/api/latest-update");
                if (!response.ok) throw new Error("Failed to load updates");
                const data = await response.json();
                if (!isActive) return;

                if (Array.isArray(data.updates) && data.updates.length > 0) {
                    setUpdates(data.updates);
                } else if (data._id || data.title) {
                    setUpdates([data]);
                } else {
                    setUpdates([]);
                }
            } catch {
                if (isActive) setUpdates([]);
            } finally {
                if (isActive) setIsLoading(false);
            }
        }

        loadUpdates();
        return () => {
            isActive = false;
        };
    }, []);

    // Wheel event isolation: when hovering over the panel, only scroll the panel and prevent parent page scroll
    useEffect(() => {
        const el = scrollContainerRef.current;
        if (!el) return;

        const handleWheel = (e) => {
            const { scrollTop, scrollHeight, clientHeight } = el;
            const delta = e.deltaY;
            const isScrollingDown = delta > 0;
            const isScrollingUp = delta < 0;

            // Stop propagation to prevent window / page scroll
            e.stopPropagation();

            // If at bottom and trying to scroll down, or at top and trying to scroll up, prevent window chaining
            if (isScrollingDown && scrollTop + clientHeight >= scrollHeight - 1) {
                e.preventDefault();
            } else if (isScrollingUp && scrollTop <= 0) {
                e.preventDefault();
            }
        };

        el.addEventListener("wheel", handleWheel, { passive: false });
        return () => {
            el.removeEventListener("wheel", handleWheel);
        };
    }, [updates, selectedCategory]);

    // Simple filter simulation (all updates shown for "All", or filtered by keyword in title/body)
    const filteredUpdates = updates.filter((u) => {
        if (selectedCategory === "All") return true;
        const text = `${u.title || ""} ${portableTextToPlainText(u.body)}`.toLowerCase();
        return text.includes(selectedCategory.toLowerCase());
    });

    // Fallback: if filter returns 0 but we have updates, show all
    const displayList = filteredUpdates.length > 0 ? filteredUpdates : updates;

    return (
        <>
            {/* ── Side Panel Container ── */}
            <aside
                aria-label="Latest Updates Side Panel"
                className="w-full border border-[#282a3a] bg-[#12141e]/95 backdrop-blur-xl rounded-2xl overflow-hidden shadow-[0_12px_40px_rgba(0,0,0,0.5)] transition-all duration-300 hover:border-[#39b7f2]/40 flex flex-col max-h-[calc(100vh-130px)]"
                style={hardwareAccel}
            >
                {/* ── Header Banner (Styled like News & Announcements) ── */}
                <div className="bg-gradient-to-r from-[#39b7f2] via-[#2ba8e5] to-[#1992cb] px-5 py-3.5 flex items-center justify-between shadow-sm shrink-0">
                    <div className="flex items-center gap-2.5 text-[#0b0b0e]">
                        <Newspaper className="w-5 h-5 shrink-0" />
                        <h3 className="font-family-grotesk font-extrabold text-base tracking-wide uppercase">
                            News &amp; Updates
                        </h3>
                    </div>

                    <div className="flex items-center gap-1.5 bg-[#0b0b0e]/25 backdrop-blur-xs text-[#0b0b0e] px-2.5 py-0.5 rounded-full text-xs font-family-grotesk-mono font-bold">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#0b0b0e] animate-ping" />
                        <span>{isLoading ? "..." : updates.length || "0"}</span>
                    </div>
                </div>

                {/* ── Filter / Category Chips Bar ── */}
                <div className="px-4 pt-3.5 pb-2.5 border-b border-[#232636] bg-[#0e1018]/60 flex items-center gap-1.5 overflow-x-auto no-scrollbar shrink-0">
                    {CATEGORIES.map((cat) => {
                        const isActive = selectedCategory === cat;
                        return (
                            <button
                                key={cat}
                                onClick={() => setSelectedCategory(cat)}
                                className={`px-3 py-1 rounded-lg text-xs font-family-grotesk-mono tracking-wider transition-all duration-200 cursor-pointer shrink-0 border ${isActive
                                        ? "bg-[#39b7f2] text-[#0b0b0e] border-[#39b7f2] font-bold shadow-[0_0_12px_rgba(57,183,242,0.4)]"
                                        : "bg-[#181b28] border-[#2c3042] text-[#8e95a5] hover:text-[#e0e3e8] hover:border-[#39b7f2]/50"
                                    }`}
                            >
                                {cat}
                            </button>
                        );
                    })}
                </div>

                {/* ── Updates List ── */}
                <div
                    ref={scrollContainerRef}
                    className="p-4 space-y-3.5 flex-1 overflow-y-auto overscroll-contain"
                    style={{
                        scrollbarWidth: "thin",
                        scrollbarColor: "#282a3a transparent",
                    }}
                >
                    {isLoading ? (
                        /* Loading Skeleton */
                        <div className="space-y-4 animate-pulse">
                            <div className="border border-[#282a3a] bg-[#171924]/60 rounded-xl p-3.5 space-y-3">
                                <div className="w-full aspect-video bg-[#202334] rounded-lg" />
                                <div className="h-4 w-3/4 bg-[#202334] rounded" />
                                <div className="h-3 w-1/2 bg-[#202334] rounded" />
                                <div className="h-3 w-full bg-[#202334] rounded" />
                            </div>
                        </div>
                    ) : displayList.length === 0 ? (
                        /* Empty State */
                        <div className="py-10 px-4 text-center space-y-3">
                            <Sparkles className="w-8 h-8 text-[#838698] mx-auto opacity-50" />
                            <p className="font-family-grotesk text-sm text-[#e9ede5]">
                                No updates published yet
                            </p>
                            <p className="font-family-apk text-xs text-[#838698]">
                                Check back soon for announcements and news from TRS.
                            </p>
                        </div>
                    ) : (
                        /* Render Update Cards */
                        displayList.map((item) => (
                            <article
                                key={item._id}
                                onClick={() => setActiveModalUpdate(item)}
                                className="group border border-[#282a3a] hover:border-[#39b7f2]/60 bg-[#161824]/90 hover:bg-[#1a1d2c] rounded-xl p-3.5 transition-all duration-300 cursor-pointer shadow-sm hover:shadow-[0_4px_20px_rgba(57,183,242,0.15)] flex flex-col"
                            >
                                {/* Thumbnail with Category Badge Overlay */}
                                {item.imageUrl && (
                                    <div className="relative w-full aspect-video rounded-lg overflow-hidden border border-[#282a3a] mb-3 shrink-0">
                                        <Image
                                            src={item.imageUrl}
                                            alt={item.title}
                                            fill
                                            sizes="(min-width: 1024px) 380px, 100vw"
                                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                                        />
                                        <span className="absolute top-2 right-2 bg-[#39b7f2] text-[#0b0b0e] font-family-grotesk-mono font-bold text-[10px] uppercase px-2 py-0.5 rounded shadow-md tracking-wider">
                                            Update
                                        </span>
                                    </div>
                                )}

                                {/* Title */}
                                <h4 className="font-family-grotesk text-base font-bold text-[#e9ede5] group-hover:text-[#39b7f2] transition-colors leading-snug line-clamp-2 mb-1.5">
                                    {item.title}
                                </h4>

                                {/* Meta Info (Source & Date) */}
                                <div className="flex items-center gap-2 text-[11px] font-family-grotesk-mono text-[#838698] mb-2 flex-wrap">
                                    <span className="flex items-center gap-1 text-[#39b7f2]/90">
                                        <Globe size={11} />
                                        <span>robotix.in</span>
                                    </span>
                                    <span>•</span>
                                    <span className="flex items-center gap-1">
                                        <Calendar size={11} />
                                        <span>{formatDate(item.publishedAt)}</span>
                                    </span>
                                </div>

                                {/* Excerpt */}
                                {item.body && (
                                    <p className="font-family-apk text-xs text-[#b7b9c5] line-clamp-2 leading-relaxed">
                                        {portableTextToPlainText(item.body)}
                                    </p>
                                )}
                            </article>
                        ))
                    )}
                </div>

                {/* ── Footer Link: View All Updates ── */}
                <div className="border-t border-[#232636] bg-[#0e1018]/80 p-3 shrink-0">
                    <Link
                        href="/updates"
                        className="group flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-xl bg-[#181b28] hover:bg-[#39b7f2] text-[#39b7f2] hover:text-[#0b0b0e] border border-[#2e3347] hover:border-[#39b7f2] font-family-grotesk-mono text-xs uppercase tracking-wider font-bold transition-all duration-300 shadow-sm"
                    >
                        <span>View All Updates</span>
                        <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>
            </aside>

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
