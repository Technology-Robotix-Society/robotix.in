import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

const BOT_TYPES = {
    1: "Autonomous Quadruped",
    2: "Multi-Terrain Hexapod",
    3: "Robotic Manipulator",
    4: "Holonomic Drive",
    5: "Remote Telepresence",
    6: "Adaptive Mechanism",
};

export default function GalleryCard({ bot, index = 0, galleryItemRef, hardwareAccel }) {
    const botType = BOT_TYPES[bot.id] || "Robotics Platform";
    const botIndex = String(bot.id || index + 1).padStart(2, "0");

    return (
        <div
            ref={galleryItemRef}
            className="group relative border border-[#26293a] hover:border-[#39b7f2] bg-gradient-to-b from-[#151722]/90 via-[#0f1118]/95 to-[#0a0b10]/95 rounded-2xl p-4 flex flex-col justify-between cursor-pointer backdrop-blur-xl transition-all duration-500 shadow-[0_8px_30px_rgba(0,0,0,0.4)] hover:shadow-[0_12px_40px_rgba(57,183,242,0.2)] hover:-translate-y-1.5 overflow-hidden"
            style={{
                transformStyle: "preserve-3d",
                ...hardwareAccel,
            }}
        >
            {/* Top Glowing Laser Accent */}
            <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-[#39b7f2]/30 group-hover:via-[#39b7f2] to-transparent transition-all duration-500" />

            {/* Image Chamber with Uniform Aspect Ratio */}
            <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden bg-[#07080d] border border-[#1e2232] group-hover:border-[#39b7f2]/40 transition-all duration-500 mb-4">
                <Image
                    src={bot.image}
                    alt={bot.name}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    quality={85}
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                />

                {/* Gradient vignette on image */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0b10]/80 via-transparent to-black/20" />

                {/* Index / Identifier Badge */}
                <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#0b0c12]/80 backdrop-blur-md border border-[#23273a] text-[#8e95a5] group-hover:text-[#39b7f2] group-hover:border-[#39b7f2]/40 text-[10px] font-family-grotesk-mono tracking-wider transition-colors">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#39b7f2] animate-pulse" />
                    <span>BOT // {botIndex}</span>
                </div>
            </div>

            {/* Info Section */}
            <div className="flex items-end justify-between gap-3 pt-1">
                <div className="min-w-0">
                    <span className="text-[11px] font-family-grotesk-mono uppercase text-[#73788b] group-hover:text-[#39b7f2] transition-colors tracking-wider block mb-1">
                        {botType}
                    </span>
                    <h3 className="font-family-grotesk text-lg sm:text-xl font-bold text-[#e9ede5] group-hover:text-white transition-colors truncate">
                        {bot.name}
                    </h3>
                </div>

                <div className="w-8 h-8 rounded-lg bg-[#161824] border border-[#26293a] group-hover:border-[#39b7f2] group-hover:bg-[#39b7f2] group-hover:text-[#0b0b0e] text-[#8e95a5] flex items-center justify-center shrink-0 transition-all duration-300 shadow-sm">
                    <ArrowUpRight size={15} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
            </div>
        </div>
    );
}
