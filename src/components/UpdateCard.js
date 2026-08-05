// components/UpdateCard.js
"use client";
import { useRef, useEffect, useState, useCallback } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import gsap from "gsap";
import { ArrowRight, X } from "lucide-react";
import { PortableText } from "next-sanity";

const hardwareAccel = {
    transform: "translateZ(0)",
    willChange: "transform",
    WebkitBackfaceVisibility: "hidden",
    backfaceVisibility: "hidden",
};

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });
}

function portableTextToPlainText(blocks = []) {
    return blocks
        .map((block) => {
            if (!Array.isArray(block?.children)) return "";
            const text = block.children.map((child) => child?.text || "").join("");
            return text.trim();
        })
        .filter(Boolean)
        .join("\n")
        .trim();
}

/* ─── Portable Text components ──────────────────────────────────── */
/*
 * All typography uses the site's own font tokens (font-family-apk,
 * font-family-grotesk, font-family-grotesk-mono) and the established
 * colour palette (#e9ede5 / #b7b9c5 / #838698 / #39b7f2 / #1e2028).
 */
const portableTextComponents = {
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
/*
 * Layout: Instagram-style on desktop — image fills the left column,
 * scrollable text fills the right column. On mobile it stacks vertically.
 */
function UpdateModal({ update, onClose }) {
    const backdropRef = useRef(null);
    const panelRef = useRef(null);

    // Entrance
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

    // Escape key
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

    const content = (
        <div
            ref={backdropRef}
            className="fixed inset-0 z-100 flex items-center justify-center overflow-y-auto p-4 sm:p-6"
            style={{ backgroundColor: "rgba(11,11,14,0.88)", backdropFilter: "blur(8px)" }}
            onClick={(e) => { if (e.target === e.currentTarget) handleClose(); }}
        >
            {/*
             * Panel — on md+ screens: side-by-side (image left, text right).
             * Max width is wider (5xl) to give both columns breathing room.
             */}
            <div
                ref={panelRef}
                className="relative w-full max-w-5xl flex flex-col md:flex-row border border-[#424453] bg-[#13151a] rounded-sm overflow-hidden md:h-[80vh]"
                style={hardwareAccel}
            >
                {/* ── Close button ── */}
                <button
                    onClick={handleClose}
                    className="absolute top-4 right-4 z-20 w-8 h-8 flex items-center justify-center bg-[#13151a]/80 border border-[#424453] rounded-sm text-[#838698] hover:text-[#e9ede5] hover:border-[#39b7f2] transition-all duration-200"
                    aria-label="Close"
                >
                    <X size={16} />
                </button>

                {/* ── Left: Image column ── */}
                {update.imageUrl && (
                    <div className="relative w-full aspect-4/3 md:aspect-auto md:w-1/2 md:h-full shrink-0 overflow-hidden">
                        <Image
                            src={update.imageUrl}
                            alt={update.title}
                            fill
                            sizes="(min-width: 768px) 50vw, 100vw"
                            className="object-cover"
                        />
                    </div>
                )}

                {/* ── Right: Scrollable text column ── */}
                <div
                    className="flex-1 min-w-0 px-7 py-7 md:px-9 md:py-8 md:h-full md:overflow-y-auto md:min-h-0 md:overscroll-contain"
                    onWheelCapture={(e) => e.stopPropagation()}
                >
                    {/* Date */}
                    <div className="font-family-grotesk-mono text-xs text-[#838698] uppercase tracking-widest mb-4">
                        {formatDate(update.publishedAt)}
                    </div>

                    {/* Title */}
                    <h2 className="font-family-grotesk text-2xl md:text-3xl text-[#e9ede5] leading-snug mb-5">
                        {update.title}
                    </h2>

                    {/* Accent divider */}
                    <div className="w-10 h-px bg-[#39b7f2] mb-6" />

                    {/* Body */}
                    {update.body ? (
                        <PortableText value={update.body} components={portableTextComponents} />
                    ) : (
                        <p className="font-family-apk text-[#838698] text-base">No content available.</p>
                    )}
                </div>
            </div>
        </div>
    );

    return createPortal(content, document.body);
}

/* ─── Card ──────────────────────────────────────────────────────── */
/*
 * Side-by-side layout: image column (fixed width) on the left, text on the
 * right. The image renders at its natural aspect ratio within that column —
 * no height is imposed, so it is never cropped vertically. The card height
 * adapts to whichever column is taller.
 */
export default function UpdateCard({ update }) {
    const cardRef = useRef(null);
    const imageRef = useRef(null);
    const arrowRef = useRef(null);
    const readMoreRef = useRef(null);
    const [modalOpen, setModalOpen] = useState(false);

    // Card hover animations
    useEffect(() => {
        const card = cardRef.current;
        const img = imageRef.current;
        const arrow = arrowRef.current;
        const readMore = readMoreRef.current;
        if (!card) return;

        const handleMouseEnter = () => {
            gsap.to(card, {
                borderColor: "#39b7f2",
                boxShadow: "0 0 20px rgba(57, 183, 242, 0.12), 0 8px 32px rgba(0,0,0,0.3)",
                duration: 0.4,
                ease: "power2.out",
            });
            if (img) gsap.to(img, { scale: 1.04, duration: 0.6, ease: "power2.out" });
            if (arrow) gsap.to(arrow, { x: 6, color: "#39b7f2", duration: 0.3, ease: "power2.out" });
            if (readMore) gsap.to(readMore, { color: "#39b7f2", duration: 0.3, ease: "power2.out" });
        };

        const handleMouseLeave = () => {
            gsap.to(card, {
                borderColor: "#424453",
                boxShadow: "none",
                duration: 0.4,
                ease: "power2.inOut",
            });
            if (img) gsap.to(img, { scale: 1, duration: 0.5, ease: "power2.inOut" });
            if (arrow) gsap.to(arrow, { x: 0, color: "#838698", duration: 0.3, ease: "power2.inOut" });
            if (readMore) gsap.to(readMore, { color: "#838698", duration: 0.3, ease: "power2.inOut" });
        };

        card.addEventListener("mouseenter", handleMouseEnter);
        card.addEventListener("mouseleave", handleMouseLeave);
        return () => {
            card.removeEventListener("mouseenter", handleMouseEnter);
            card.removeEventListener("mouseleave", handleMouseLeave);
        };
    }, []);

    return (
        <>
            <div
                ref={cardRef}
                className="group relative flex flex-col sm:flex-row border border-[#424453] bg-[#17192160] backdrop-blur-sm rounded-sm overflow-hidden cursor-pointer"
                style={{ ...hardwareAccel }}
                onClick={() => setModalOpen(true)}
            >
                {/* ── Image column — fixed width, natural height (no cropping) ── */}
                {update.imageUrl && (
                    <div className="sm:w-72 shrink-0 overflow-hidden">
                        {/*
                         * width={0} height={0} + w-full h-auto renders the image at
                         * its natural aspect ratio inside the fixed-width column.
                         * No height is imposed on the container, so nothing is ever
                         * cropped vertically. The card height grows to fit the image.
                         */}
                        <Image
                            ref={imageRef}
                            src={update.imageUrl}
                            alt={update.title}
                            width={0}
                            height={0}
                            sizes="288px"
                            className="w-full h-auto block"
                            style={{ ...hardwareAccel }}
                        />
                    </div>
                )}

                {/* ── Content ── */}
                <div
                    className={`flex flex-col justify-between p-8 flex-1 min-w-0 ${
                        update.imageUrl ? "sm:absolute sm:inset-y-0 sm:right-0 sm:left-72 sm:overflow-hidden" : ""
                    }`}
                >
                    <div>
                        {/* Date */}
                        <div className="font-family-grotesk-mono text-xs text-[#838698] uppercase tracking-widest mb-4">
                            {formatDate(update.publishedAt)}
                        </div>

                        {/* Title */}
                        <h2 className="font-family-grotesk text-2xl text-[#e9ede5] mb-4 leading-snug">
                            {update.title}
                        </h2>

                        {/* Preview — first block of body as plain text */}
                        {update.body && (
                            <p className="font-family-apk text-[#b7b9c5] text-sm leading-relaxed line-clamp-5 sm:line-clamp-6 whitespace-pre-line wrap-break-word">
                                {portableTextToPlainText(update.body)}
                            </p>
                        )}
                    </div>

                    {/* Read More */}
                    <div className="flex items-center gap-2 mt-6">
                        <span
                            ref={readMoreRef}
                            className="font-family-grotesk-mono text-xs text-[#838698] uppercase tracking-widest"
                        >
                            Read More
                        </span>
                        <span ref={arrowRef} className="text-[#838698]">
                            <ArrowRight size={14} />
                        </span>
                    </div>
                </div>
            </div>

            {modalOpen && (
                <UpdateModal update={update} onClose={() => setModalOpen(false)} />
            )}
        </>
    );
}
