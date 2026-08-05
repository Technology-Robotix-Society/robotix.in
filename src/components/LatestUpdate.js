// components/LatestUpdate.js
// Client Component — fetches the single most-recent update from Sanity.
"use client";

import { useEffect, useState } from "react";
import UpdateCard from "@/components/UpdateCard";
import Link from "next/link";

function PlaceholderUpdateCard({ title, message }) {
    return (
        <div className="border border-[#424453] bg-[#17192160] backdrop-blur-sm rounded-sm p-8 md:p-10">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
                <div className="max-w-2xl">
                    <div className="font-family-grotesk-mono text-xs text-[#838698] uppercase tracking-widest mb-3">
                        What&apos;s New
                    </div>
                    <h3 className="font-family-grotesk text-3xl text-[#e9ede5] mb-4">
                        {title}
                    </h3>
                    <p className="font-family-apk text-[#b7b9c5] text-base leading-relaxed">
                        {message}
                    </p>
                </div>

                <Link
                    href="/updates"
                    className="group flex items-center gap-2 border border-[#424453] hover:border-[#39b7f2] text-[#838698] hover:text-[#39b7f2] font-family-grotesk-mono text-xs uppercase tracking-widest px-5 py-3 transition-all duration-300 rounded-sm shrink-0"
                >
                    <span>View All Updates</span>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="transition-transform duration-300 group-hover:translate-x-1"
                    >
                        <path d="M5 12h14" />
                        <path d="m12 5 7 7-7 7" />
                    </svg>
                </Link>
            </div>
        </div>
    );
}

export default function LatestUpdate() {
    const [update, setUpdate] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        let isActive = true;

        async function loadLatestUpdate() {
            try {
                const response = await fetch("/api/latest-update");

                if (!response.ok) {
                    throw new Error("Failed to load latest update");
                }

                const raw = await response.json();

                if (!isActive) return;

                if (!raw) {
                    setUpdate(null);
                    return;
                }

                setUpdate(raw);
            } catch {
                if (isActive) {
                    setUpdate(null);
                }
            } finally {
                if (isActive) {
                    setIsLoading(false);
                }
            }
        }

        loadLatestUpdate();

        return () => {
            isActive = false;
        };
    }, []);

    if (isLoading) {
        return (
            <div className="bg-[#0b0b0e] relative px-24 py-20">
                <div className="absolute left-9 top-0 h-full w-px bg-[rgb(66,68,83)]" />
                <div className="absolute right-9 top-0 h-full w-px bg-[rgb(66,68,83)]" />
                <div className="absolute bottom-0 left-0 right-0 h-px bg-[rgb(66,68,83)]" />

                <div className="flex items-end justify-between mb-12">
                    <div>
                        <div className="font-family-grotesk-mono text-[#838698] text-xs uppercase tracking-widest mb-3">
                            What&apos;s New
                        </div>
                        <div className="font-family-grotesk text-4xl text-[#e9ede5]">
                            Latest Update
                        </div>
                    </div>
                </div>

                <div className="mx-auto w-full max-w-4xl">
                    <PlaceholderUpdateCard
                        title="Loading latest update"
                        message="We are fetching the newest TRS update. Check back in a moment or visit the full updates page to browse everything we have published."
                    />
                </div>
            </div>
        );
    }

    if (!update) {
        return (
            <div className="bg-[#0b0b0e] relative px-24 py-20">
                <div className="absolute left-9 top-0 h-full w-px bg-[rgb(66,68,83)]" />
                <div className="absolute right-9 top-0 h-full w-px bg-[rgb(66,68,83)]" />
                <div className="absolute bottom-0 left-0 right-0 h-px bg-[rgb(66,68,83)]" />

                <div className="flex items-end justify-between mb-12">
                    <div>
                        <div className="font-family-grotesk-mono text-[#838698] text-xs uppercase tracking-widest mb-3">
                            What&apos;s New
                        </div>
                        <div className="font-family-grotesk text-4xl text-[#e9ede5]">
                            Latest Update
                        </div>
                    </div>
                </div>

                <div className="mx-auto w-full max-w-4xl">
                    <PlaceholderUpdateCard
                        title="No update available"
                        message="There is no published update to show right now. Visit the updates page to see recent posts when they become available."
                    />
                </div>
            </div>
        );
    }

    return (
        <div className="bg-[#0b0b0e] relative px-24 py-20">
            {/* Decorative lines */}
            <div className="absolute left-9 top-0 h-full w-px bg-[rgb(66,68,83)]" />
            <div className="absolute right-9 top-0 h-full w-px bg-[rgb(66,68,83)]" />
            <div className="absolute bottom-0 left-0 right-0 h-px bg-[rgb(66,68,83)]" />

            {/* Header row */}
            <div className="flex items-end justify-between mb-12">
                <div>
                    <div className="font-family-grotesk-mono text-[#838698] text-xs uppercase tracking-widest mb-3">
                        What&apos;s New
                    </div>
                    <div className="font-family-grotesk text-4xl text-[#e9ede5]">
                        Latest Update
                    </div>
                </div>
                <Link
                    href="/updates"
                    className="group flex items-center gap-2 border border-[#424453] hover:border-[#39b7f2] text-[#838698] hover:text-[#39b7f2] font-family-grotesk-mono text-xs uppercase tracking-widest px-5 py-3 transition-all duration-300 rounded-sm"
                >
                    <span>View All Updates</span>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="transition-transform duration-300 group-hover:translate-x-1"
                    >
                        <path d="M5 12h14" />
                        <path d="m12 5 7 7-7 7" />
                    </svg>
                </Link>
            </div>

            <div className="mx-auto w-full max-w-4xl">
                <UpdateCard update={update} />
            </div>
        </div>
    );
}
