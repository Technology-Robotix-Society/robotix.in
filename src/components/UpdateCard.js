// components/UpdateCard.js
"use client";
import { useRef, useEffect, useState, useCallback } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ArrowRight, X, Calendar, Clock, Tag, ExternalLink, Sparkles, User, Share2 } from "lucide-react";
import { PortableText } from "next-sanity";

const hardwareAccel = {
    transform: "translateZ(0)",
    willChange: "transform",
    WebkitBackfaceVisibility: "hidden",
    backfaceVisibility: "hidden",
};

export function formatDate(dateString) {
    if (!dateString) return "Recent Transmission";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
    });
}

export function portableTextToPlainText(blocks = []) {
    if (!blocks) return "";
    if (typeof blocks === "string") return blocks;
    if (!Array.isArray(blocks)) return "";

    return blocks
        .map((block) => {
            if (typeof block === "string") return block;
            if (!Array.isArray(block?.children)) return block?.text || "";
            const text = block.children.map((child) => child?.text || "").join("");
            return text.trim();
        })
        .filter(Boolean)
        .join("\n")
        .trim();
}

export function getCategoryBadgeStyles(category = "Announcements") {
    const cat = (category || "").toLowerCase();
    switch (cat) {
        case "bots":
        case "research & labs":
            return {
                bg: "bg-purple-500/10",
                border: "border-purple-500/30",
                text: "text-purple-400",
                dot: "bg-purple-400",
                shadow: "shadow-[0_0_12px_rgba(168,85,247,0.2)]"
            };
        case "workshops":
        case "workshops & talks":
            return {
                bg: "bg-sky-500/10",
                border: "border-sky-500/30",
                text: "text-[#39b7f2]",
                dot: "bg-[#39b7f2]",
                shadow: "shadow-[0_0_12px_rgba(57,183,242,0.2)]"
            };
        case "selections":
            return {
                bg: "bg-emerald-500/10",
                border: "border-emerald-500/30",
                text: "text-emerald-400",
                dot: "bg-emerald-400",
                shadow: "shadow-[0_0_12px_rgba(52,211,153,0.2)]"
            };
        case "blogs":
            return {
                bg: "bg-amber-500/10",
                border: "border-amber-500/30",
                text: "text-amber-400",
                dot: "bg-amber-400",
                shadow: "shadow-[0_0_12px_rgba(245,158,11,0.2)]"
            };
        case "competitions":
            return {
                bg: "bg-rose-500/10",
                border: "border-rose-500/30",
                text: "text-rose-400",
                dot: "bg-rose-400",
                shadow: "shadow-[0_0_12px_rgba(244,63,94,0.2)]"
            };
        case "announcements":
        default:
            return {
                bg: "bg-cyan-500/10",
                border: "border-cyan-500/30",
                text: "text-cyan-400",
                dot: "bg-cyan-400",
                shadow: "shadow-[0_0_12px_rgba(34,211,238,0.2)]"
            };
    }
}

/* ─── Portable Text components ──────────────────────────────────── */
export const portableTextComponents = {
    block: {
        normal: ({ children }) => (
            <p className="font-family-apk text-[#b7b9c5] text-base leading-relaxed mb-4 last:mb-0">
                {children}
            </p>
        ),
        h2: ({ children }) => (
            <h2 className="font-family-grotesk text-2xl text-[#e9ede5] font-medium mt-8 mb-3 leading-snug">
                {children}
            </h2>
        ),
        h3: ({ children }) => (
            <h3 className="font-family-grotesk text-xl text-[#e9ede5] font-medium mt-6 mb-2 leading-snug">
                {children}
            </h3>
        ),
        blockquote: ({ children }) => (
            <blockquote className="border-l-2 border-[#39b7f2] pl-5 my-5 text-[#838698] italic font-family-apk text-base leading-relaxed">
                {children}
            </blockquote>
        ),
    },
    marks: {
        strong: ({ children }) => (
            <strong className="text-[#e9ede5] font-semibold">{children}</strong>
        ),
        em: ({ children }) => (
            <em className="italic text-[#c8ccd8]">{children}</em>
        ),
        code: ({ children }) => (
            <code className="bg-[#1e2028] text-[#39b7f2] px-1.5 py-0.5 rounded text-sm font-family-grotesk-mono">
                {children}
            </code>
        ),
        link: ({ value, children }) => (
            <a
                href={value?.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#39b7f2] underline underline-offset-2 hover:text-[#5fd4ff] transition-colors duration-200 font-family-apk"
            >
                {children}
            </a>
        ),
    },
    list: {
        bullet: ({ children }) => (
            <ul className="list-disc list-outside pl-5 space-y-1.5 mb-4 text-[#b7b9c5] font-family-apk text-base leading-relaxed">
                {children}
            </ul>
        ),
        number: ({ children }) => (
            <ol className="list-decimal list-outside pl-5 space-y-1.5 mb-4 text-[#b7b9c5] font-family-apk text-base leading-relaxed">
                {children}
            </ol>
        ),
    },
    listItem: {
        bullet: ({ children }) => <li>{children}</li>,
        number: ({ children }) => <li>{children}</li>,
    },
};

/* ─── Modal ─────────────────────────────────────────────────────── */
export function UpdateModal({ update, onClose }) {
    const backdropRef = useRef(null);
    const panelRef = useRef(null);
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        const bd = backdropRef.current;
        const panel = panelRef.current;
        if (!bd || !panel) return;

        gsap.fromTo(bd, { opacity: 0 }, { opacity: 1, duration: 0.3, ease: "power2.out" });
        gsap.fromTo(
            panel,
            { opacity: 0, y: 32, scale: 0.97 },
            { opacity: 1, y: 0, scale: 1, duration: 0.4, ease: "power3.out", delay: 0.05 }
        );

        document.body.style.overflow = "hidden";
        document.documentElement.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = "";
            document.documentElement.style.overflow = "";
        };
    }, []);

    useEffect(() => {
        const onKey = (e) => { if (e.key === "Escape") handleClose(); };
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, []);

    const handleClose = useCallback(() => {
        const bd = backdropRef.current;
        const panel = panelRef.current;
        if (!bd || !panel) { onClose(); return; }

        gsap.to(panel, { opacity: 0, y: 24, scale: 0.97, duration: 0.25, ease: "power2.in" });
        gsap.to(bd, {
            opacity: 0,
            duration: 0.3,
            ease: "power2.in",
            delay: 0.05,
            onComplete: onClose,
        });
    }, [onClose]);

    const handleShare = () => {
        if (navigator.clipboard) {
            navigator.clipboard.writeText(window.location.href);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    const categoryStyles = getCategoryBadgeStyles(update.category);

    const content = (
        <div
            ref={backdropRef}
            className="fixed inset-0 z-100 flex items-center justify-center overflow-y-auto p-4 sm:p-6"
            style={{ backgroundColor: "rgba(11,11,14,0.92)", backdropFilter: "blur(12px)" }}
            onClick={(e) => { if (e.target === e.currentTarget) handleClose(); }}
        >
            <div
                ref={panelRef}
                className="relative w-full max-w-5xl flex flex-col md:flex-row border border-[#373a4d] bg-[#12141c] rounded-xl overflow-hidden md:max-h-[85vh] shadow-[0_25px_60px_rgba(0,0,0,0.8)]"
                style={hardwareAccel}
            >
                {/* ── Top Controls Bar ── */}
                <div className="absolute top-4 right-4 z-30 flex items-center gap-2">
                    <button
                        onClick={handleShare}
                        className="px-3 py-1.5 flex items-center gap-1.5 bg-[#171924]/90 border border-[#424453] rounded-lg text-xs font-family-grotesk-mono text-[#838698] hover:text-[#39b7f2] hover:border-[#39b7f2] transition-all"
                        title="Copy Page Link"
                    >
                        <Share2 size={13} />
                        <span>{copied ? "Link Copied!" : "Share"}</span>
                    </button>
                    <button
                        onClick={handleClose}
                        className="w-8 h-8 flex items-center justify-center bg-[#171924]/90 border border-[#424453] rounded-lg text-[#838698] hover:text-[#e9ede5] hover:border-[#39b7f2] transition-all duration-200"
                        aria-label="Close modal"
                    >
                        <X size={16} />
                    </button>
                </div>

                {/* ── Left: Image Column ── */}
                {update.imageUrl && (
                    <div className="relative w-full aspect-4/3 md:aspect-auto md:w-1/2 md:h-full shrink-0 overflow-hidden bg-[#07080e] p-3 md:p-6 flex items-center justify-center">
                        <div className="relative w-full h-full min-h-[220px] flex items-center justify-center">
                            <Image
                                src={update.imageUrl}
                                alt={update.title}
                                fill
                                sizes="(min-width: 768px) 50vw, 100vw"
                                className="object-contain"
                            />
                        </div>
                    </div>
                )}

                {/* ── Right: Scrollable Content Column ── */}
                <div
                    className="flex-1 min-w-0 px-6 py-6 md:px-9 md:py-8 md:h-full md:overflow-y-auto md:min-h-0 overscroll-contain flex flex-col justify-between"
                    onWheelCapture={(e) => e.stopPropagation()}
                >
                    <div>
                        {/* Header Badges */}
                        <div className="flex items-center gap-2.5 flex-wrap mb-4">
                            <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-family-grotesk-mono font-bold tracking-wider border ${categoryStyles.bg} ${categoryStyles.border} ${categoryStyles.text} ${categoryStyles.shadow}`}>
                                <span className={`w-1.5 h-1.5 rounded-full ${categoryStyles.dot}`} />
                                {update.category || "General Update"}
                            </span>

                            {update.readTime && (
                                <span className="inline-flex items-center gap-1 text-xs font-family-grotesk-mono text-[#838698]">
                                    <Clock size={12} />
                                    {update.readTime}
                                </span>
                            )}

                            <span className="inline-flex items-center gap-1 text-xs font-family-grotesk-mono text-[#838698]">
                                <Calendar size={12} />
                                {formatDate(update.publishedAt)}
                            </span>
                        </div>

                        {/* Title */}
                        <h2 className="font-family-grotesk text-2xl md:text-3xl text-[#e9ede5] leading-snug mb-4">
                            {update.title}
                        </h2>

                        {/* Author / Subsystem metadata */}
                        {update.author && (
                            <div className="flex items-center gap-2 text-xs font-family-grotesk-mono text-[#39b7f2]/90 mb-5">
                                <User size={13} />
                                <span>{update.author}</span>
                            </div>
                        )}

                        {/* Accent Divider */}
                        <div className="w-12 h-0.5 bg-gradient-to-r from-[#39b7f2] to-transparent mb-6" />

                        {/* Body content */}
                        <div className="space-y-4 mb-6">
                            {update.body && Array.isArray(update.body) ? (
                                update.body.some(b => b?._type === "block") ? (
                                    <PortableText value={update.body} components={portableTextComponents} />
                                ) : (
                                    update.body.map((para, i) => (
                                        <p key={i} className="font-family-apk text-[#b7b9c5] text-base leading-relaxed">
                                            {typeof para === "string" ? para : para.children?.[0]?.text || ""}
                                        </p>
                                    ))
                                )
                            ) : update.summary ? (
                                <p className="font-family-apk text-[#b7b9c5] text-base leading-relaxed">
                                    {update.summary}
                                </p>
                            ) : (
                                <p className="font-family-apk text-[#838698] text-base">No content available.</p>
                            )}
                        </div>

                        {/* Tags */}
                        {update.tags && update.tags.length > 0 && (
                            <div className="pt-4 border-t border-[#232636] mb-6">
                                <div className="flex items-center gap-2 flex-wrap">
                                    <Tag size={13} className="text-[#838698]" />
                                    {update.tags.map((t) => (
                                        <span
                                            key={t}
                                            className="px-2.5 py-0.5 rounded-md bg-[#181b28] border border-[#2c3042] text-[11px] font-family-grotesk-mono text-[#8e95a5]"
                                        >
                                            #{t}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Action CTA link if exists */}
                    {update.actionLink && (
                        <div className="pt-4 border-t border-[#232636]">
                            <a
                                href={update.actionLink.url}
                                target={update.actionLink.url.startsWith("http") ? "_blank" : "_self"}
                                rel="noopener noreferrer"
                                className="inline-flex items-center justify-center gap-2 w-full py-3 px-5 rounded-lg bg-[#39b7f2] hover:bg-[#5fd4ff] text-[#0b0b0e] font-family-grotesk-mono font-bold text-sm uppercase tracking-wider transition-all duration-200 shadow-[0_0_20px_rgba(57,183,242,0.3)]"
                            >
                                <span>{update.actionLink.text || "Learn More"}</span>
                                <ExternalLink size={15} />
                            </a>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );

    return createPortal(content, document.body);
}

/* ─── Card Component ────────────────────────────────────────────── */
export default function UpdateCard({ update, viewMode = "grid" }) {
    const cardRef = useRef(null);
    const imageRef = useRef(null);
    const arrowRef = useRef(null);
    const [modalOpen, setModalOpen] = useState(false);

    const categoryStyles = getCategoryBadgeStyles(update.category);

    useEffect(() => {
        const card = cardRef.current;
        const img = imageRef.current;
        const arrow = arrowRef.current;
        if (!card) return;

        const handleMouseEnter = () => {
            gsap.to(card, {
                borderColor: "#39b7f2",
                boxShadow: "0 0 24px rgba(57, 183, 242, 0.15), 0 12px 36px rgba(0,0,0,0.5)",
                duration: 0.35,
                ease: "power2.out",
            });
            if (img) gsap.to(img, { scale: 1.05, duration: 0.5, ease: "power2.out" });
            if (arrow) gsap.to(arrow, { x: 5, color: "#39b7f2", duration: 0.3, ease: "power2.out" });
        };

        const handleMouseLeave = () => {
            gsap.to(card, {
                borderColor: "#2c3042",
                boxShadow: "none",
                duration: 0.35,
                ease: "power2.inOut",
            });
            if (img) gsap.to(img, { scale: 1, duration: 0.4, ease: "power2.inOut" });
            if (arrow) gsap.to(arrow, { x: 0, color: "#838698", duration: 0.3, ease: "power2.inOut" });
        };

        card.addEventListener("mouseenter", handleMouseEnter);
        card.addEventListener("mouseleave", handleMouseLeave);
        return () => {
            card.removeEventListener("mouseenter", handleMouseEnter);
            card.removeEventListener("mouseleave", handleMouseLeave);
        };
    }, []);

    // ── Editorial / Magazine Row View Mode ──
    if (viewMode === "editorial") {
        return (
            <>
                <article
                    ref={cardRef}
                    className="group relative flex flex-col md:flex-row border border-[#2c3042] bg-[#141620]/80 backdrop-blur-md rounded-xl overflow-hidden cursor-pointer transition-all duration-300"
                    style={{ ...hardwareAccel }}
                    onClick={() => setModalOpen(true)}
                >
                    {/* Image Column */}
                    {update.imageUrl && (
                        <div className="relative md:w-80 md:min-h-[220px] aspect-16/10 md:aspect-auto shrink-0 overflow-hidden bg-[#0d0f16]">
                            <Image
                                ref={imageRef}
                                src={update.imageUrl}
                                alt={update.title}
                                fill
                                sizes="(min-width: 768px) 320px, 100vw"
                                className="object-cover"
                                style={{ ...hardwareAccel }}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#141620] via-transparent to-transparent md:bg-gradient-to-r md:from-transparent md:to-[#141620]/80" />
                            
                            {/* Live Sanity indicator if applicable */}
                            {update.isLiveSanity && (
                                <span className="absolute top-3 left-3 bg-[#39b7f2] text-[#0b0b0e] font-family-grotesk-mono text-[10px] font-extrabold uppercase px-2 py-0.5 rounded shadow-lg flex items-center gap-1">
                                    <span className="w-1.5 h-1.5 rounded-full bg-[#0b0b0e] animate-ping" />
                                    Live Dispatch
                                </span>
                            )}
                        </div>
                    )}

                    {/* Content Column */}
                    <div className="flex flex-col justify-between p-6 md:p-7 flex-1 min-w-0">
                        <div>
                            {/* Meta & Category Bar */}
                            <div className="flex items-center justify-between gap-3 flex-wrap mb-3">
                                <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-family-grotesk-mono font-bold tracking-wider border ${categoryStyles.bg} ${categoryStyles.border} ${categoryStyles.text}`}>
                                    <span className={`w-1.5 h-1.5 rounded-full ${categoryStyles.dot}`} />
                                    {update.category || "Announcement"}
                                </span>

                                <div className="flex items-center gap-3 text-xs font-family-grotesk-mono text-[#838698]">
                                    <span className="flex items-center gap-1">
                                        <Calendar size={11} />
                                        {formatDate(update.publishedAt)}
                                    </span>
                                    {update.readTime && (
                                        <span className="flex items-center gap-1">
                                            <Clock size={11} />
                                            {update.readTime}
                                        </span>
                                    )}
                                </div>
                            </div>

                            {/* Title */}
                            <h3 className="font-family-grotesk text-xl md:text-2xl text-[#e9ede5] group-hover:text-[#39b7f2] transition-colors leading-snug mb-3">
                                {update.title}
                            </h3>

                            {/* Excerpt */}
                            <p className="font-family-apk text-[#b7b9c5] text-sm leading-relaxed line-clamp-3 mb-4">
                                {update.summary || portableTextToPlainText(update.body)}
                            </p>
                        </div>

                        {/* Footer Bar: Tags + Read Transmission Action */}
                        <div className="flex items-center justify-between gap-4 pt-3 border-t border-[#232636] flex-wrap">
                            <div className="flex items-center gap-1.5 flex-wrap">
                                {update.tags && update.tags.slice(0, 3).map((tag) => (
                                    <span key={tag} className="text-[11px] font-family-grotesk-mono text-[#7a8194] bg-[#1a1d2c] px-2 py-0.5 rounded">
                                        #{tag}
                                    </span>
                                ))}
                            </div>

                            <div className="flex items-center gap-1.5 text-xs font-family-grotesk-mono text-[#39b7f2] group-hover:underline">
                                <span>Read Transmission</span>
                                <span ref={arrowRef} className="text-[#838698]">
                                    <ArrowRight size={13} />
                                </span>
                            </div>
                        </div>
                    </div>
                </article>

                {modalOpen && (
                    <UpdateModal update={update} onClose={() => setModalOpen(false)} />
                )}
            </>
        );
    }

    // ── Modern Grid Card View Mode (Default) ──
    return (
        <>
            <article
                ref={cardRef}
                className="group relative flex flex-col h-full border border-[#2c3042] bg-[#141620]/90 backdrop-blur-md rounded-xl overflow-hidden cursor-pointer transition-all duration-300"
                style={{ ...hardwareAccel }}
                onClick={() => setModalOpen(true)}
            >
                {/* Image Container */}
                {update.imageUrl && (
                    <div className="relative w-full aspect-16/10 shrink-0 overflow-hidden bg-[#0e1017]">
                        <Image
                            ref={imageRef}
                            src={update.imageUrl}
                            alt={update.title}
                            fill
                            sizes="(min-width: 1024px) 380px, (min-width: 640px) 50vw, 100vw"
                            className="object-cover"
                            style={{ ...hardwareAccel }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#141620] via-transparent to-transparent opacity-80" />

                        {/* Top Category Badge */}
                        <div className="absolute top-3 left-3 flex items-center gap-2">
                            <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-family-grotesk-mono font-bold tracking-wider backdrop-blur-md border ${categoryStyles.bg} ${categoryStyles.border} ${categoryStyles.text} ${categoryStyles.shadow}`}>
                                <span className={`w-1.5 h-1.5 rounded-full ${categoryStyles.dot}`} />
                                {update.category || "Update"}
                            </span>
                        </div>

                        {/* Live Sanity badge */}
                        {update.isLiveSanity && (
                            <span className="absolute top-3 right-3 bg-[#39b7f2] text-[#0b0b0e] font-family-grotesk-mono text-[10px] font-extrabold uppercase px-2 py-0.5 rounded shadow-lg flex items-center gap-1">
                                <span className="w-1.5 h-1.5 rounded-full bg-[#0b0b0e] animate-ping" />
                                Live
                            </span>
                        )}
                    </div>
                )}

                {/* Content */}
                <div className="flex flex-col justify-between p-5 flex-1 min-w-0">
                    <div>
                        {/* Meta info */}
                        <div className="flex items-center gap-2.5 text-xs font-family-grotesk-mono text-[#838698] mb-2.5">
                            <span className="flex items-center gap-1">
                                <Calendar size={11} />
                                {formatDate(update.publishedAt)}
                            </span>
                            <span>•</span>
                            <span>{update.readTime || "3 min read"}</span>
                        </div>

                        {/* Title */}
                        <h3 className="font-family-grotesk text-lg font-bold text-[#e9ede5] group-hover:text-[#39b7f2] transition-colors leading-snug mb-2.5 line-clamp-2">
                            {update.title}
                        </h3>

                        {/* Excerpt */}
                        <p className="font-family-apk text-xs text-[#b7b9c5] leading-relaxed line-clamp-3 mb-4">
                            {update.summary || portableTextToPlainText(update.body)}
                        </p>
                    </div>

                    {/* Footer / Read More */}
                    <div>
                        {/* Tags */}
                        {update.tags && update.tags.length > 0 && (
                            <div className="flex items-center gap-1.5 flex-wrap mb-3.5">
                                {update.tags.slice(0, 2).map((tag) => (
                                    <span key={tag} className="text-[10px] font-family-grotesk-mono text-[#7a8194] bg-[#1a1d2c] px-2 py-0.5 rounded">
                                        #{tag}
                                    </span>
                                ))}
                            </div>
                        )}

                        <div className="flex items-center justify-between pt-3 border-t border-[#232636]">
                            <span className="font-family-grotesk-mono text-xs text-[#39b7f2] font-semibold tracking-wider uppercase flex items-center gap-1">
                                <span>Read Log</span>
                            </span>
                            <span ref={arrowRef} className="text-[#838698]">
                                <ArrowRight size={14} />
                            </span>
                        </div>
                    </div>
                </div>
            </article>

            {modalOpen && (
                <UpdateModal update={update} onClose={() => setModalOpen(false)} />
            )}
        </>
    );
}
