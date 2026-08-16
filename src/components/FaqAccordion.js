"use client";
import { ChevronDown } from "lucide-react";

export default function FaqAccordion({ item, index, isOpen, onToggle }) {
    return (
        <div
            className={`rounded-2xl transition-all duration-300 border ${
                isOpen
                    ? "border-[#39b7f2]/60 bg-[#121624] shadow-[0_8px_32px_rgba(57,183,242,0.08)]"
                    : "border-[#222536] hover:border-[#39b7f2]/40 bg-[#10121b]/80 hover:bg-[#121522]"
            } backdrop-blur-sm group overflow-hidden`}
        >
            <button
                type="button"
                onClick={() => onToggle(index)}
                aria-expanded={isOpen}
                className="w-full flex items-center justify-between p-5 sm:p-6 text-left cursor-pointer transition-colors"
            >
                <div className="flex items-start sm:items-center gap-3.5 sm:gap-4 pr-4">
                    <span
                        className={`font-family-grotesk-mono text-xs font-semibold px-2.5 py-1 rounded-md border transition-colors shrink-0 mt-0.5 sm:mt-0 ${
                            isOpen
                                ? "text-[#39b7f2] bg-[#39b7f2]/15 border-[#39b7f2]/40"
                                : "text-[#80869a] bg-[#1a1d2b] border-[#292d40] group-hover:text-[#39b7f2] group-hover:border-[#39b7f2]/30"
                        }`}
                    >
                        {String(index + 1).padStart(2, "0")}
                    </span>
                    <span
                        className={`font-family-apk text-base sm:text-lg md:text-xl font-medium transition-colors leading-snug ${
                            isOpen
                                ? "text-[#ffffff]"
                                : "text-[#e2e6df] group-hover:text-white"
                        }`}
                    >
                        {item.question}
                    </span>
                </div>

                <div
                    className={`shrink-0 w-8 h-8 sm:w-9 sm:h-9 rounded-xl border flex items-center justify-center transition-all duration-300 ${
                        isOpen
                            ? "bg-[#39b7f2] border-[#39b7f2] text-[#0b0b0e] shadow-[0_0_15px_rgba(57,183,242,0.4)]"
                            : "bg-[#181b28] border-[#2c3044] text-[#8e95a5] group-hover:text-[#39b7f2] group-hover:border-[#39b7f2]/40"
                    }`}
                >
                    <ChevronDown
                        className={`w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-300 ${
                            isOpen ? "rotate-180 text-[#0b0b0e]" : ""
                        }`}
                    />
                </div>
            </button>

            <div
                className={`grid transition-[grid-template-rows] duration-300 ease-out ${
                    isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                }`}
            >
                <div className="overflow-hidden">
                    <div className="px-5 pb-5 sm:px-6 sm:pb-6 pt-0">
                        <div className="border-t border-[#23273a] pt-4 text-[#a3a9be] font-family-apk text-sm sm:text-base leading-relaxed tracking-normal">
                            {item.answer}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

