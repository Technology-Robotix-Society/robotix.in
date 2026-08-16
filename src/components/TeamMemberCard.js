"use client";
import Image from "next/image";
import { Github, Linkedin, Facebook, Mail, Twitter, Instagram, Globe } from "lucide-react";

function getSocialIcon(name) {
    const key = (name || "").toLowerCase().trim();
    switch (key) {
        case "github":
            return Github;
        case "linkedin":
            return Linkedin;
        case "facebook":
            return Facebook;
        case "email":
        case "mail":
            return Mail;
        case "twitter":
        case "x":
            return Twitter;
        case "instagram":
            return Instagram;
        default:
            return Globe;
    }
}

function formatSocialLink(social) {
    const name = (social.name || "").toLowerCase().trim();
    const link = (social.link || "").trim();
    if (!link) return "#";
    if (name === "email" || name === "mail") {
        return link.startsWith("mailto:") ? link : `mailto:${link}`;
    }
    if (!link.startsWith("http://") && !link.startsWith("https://") && !link.startsWith("mailto:")) {
        if (link.includes("@")) {
            return `mailto:${link}`;
        }
        return `https://${link}`;
    }
    return link;
}

function getSocialLabel(name) {
    if (!name) return "Social Link";
    const lower = name.toLowerCase().trim();
    if (lower === "github") return "GitHub";
    if (lower === "linkedin") return "LinkedIn";
    if (lower === "facebook") return "Facebook";
    if (lower === "email" || lower === "mail") return "Email";
    if (lower === "twitter" || lower === "x") return "Twitter";
    if (lower === "instagram") return "Instagram";
    return name.charAt(0).toUpperCase() + name.slice(1);
}

export default function TeamMemberCard({
    member,
    imagePath,
    onMouseMove,
    onMouseLeave,
    showTag = false,
}) {
    const fullName = `${member.name || ""}${member.surname ? ` ${member.surname}` : ""}`.trim();
    const validSocials = (member.social || []).filter((s) => s && s.link);

    return (
        <div
            onMouseMove={onMouseMove}
            onMouseLeave={onMouseLeave}
            className="w-full max-w-[280px] sm:max-w-[290px] flex flex-col items-center group relative rounded-2xl bg-gradient-to-b from-[#141724]/85 via-[#10121c]/90 to-[#0b0c13]/95 border border-[#1f2436] hover:border-[#39b7f2]/50 p-4 transition-all duration-300 hover:shadow-[0_16px_38px_rgba(0,0,0,0.6),0_0_24px_rgba(57,183,242,0.14)] hover:-translate-y-1.5 backdrop-blur-md overflow-hidden cursor-default"
        >
            {/* Top Subtle Cyber Glow Accent Line */}
            <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-[#39b7f2]/0 group-hover:via-[#39b7f2]/80 to-transparent transition-all duration-500 rounded-t-2xl pointer-events-none" />

            {/* Image Container with 3D Tilt & Spotlight */}
            <div className="tilt-container relative w-full aspect-square rounded-xl overflow-hidden bg-[#181b28] border border-[#23283c] group-hover:border-[#39b7f2]/40 transition-colors duration-300 will-change-transform shadow-inner">
                <Image
                    src={imagePath}
                    alt={fullName}
                    fill
                    className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 290px"
                    quality={85}
                />

                {/* Spotlight Overlay */}
                <div
                    className="shine-overlay absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{
                        background:
                            "radial-gradient(300px circle at var(--x, 50%) var(--y, 50%), rgba(57, 183, 242, 0.2), transparent 50%)",
                    }}
                />

                {/* Bottom subtle shadow overlay inside image for better depth */}
                <div className="absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-[#0b0c13]/60 to-transparent pointer-events-none opacity-60 group-hover:opacity-20 transition-opacity duration-300" />
            </div>

            {/* Member Details */}
            <div className="flex flex-col items-center text-center w-full mt-4 flex-1 justify-between">
                {/* Centered Name */}
                <div className="flex flex-col items-center text-center w-full px-1">
                    <h3 className="font-family-grotesk font-bold text-lg sm:text-xl text-[#eef1f6] group-hover:text-white transition-colors duration-200 tracking-tight leading-snug">
                        {fullName}
                    </h3>

                    {/* Tag / Role Badge */}
                    {showTag && member.tag && (
                        <div className="mt-1.5 inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-family-grotesk-mono uppercase tracking-wider bg-[#39b7f2]/10 text-[#39b7f2] border border-[#39b7f2]/25 font-semibold">
                            {member.tag}
                        </div>
                    )}
                </div>

                {/* Social Icons Row (Centered, No text, with hover glow) */}
                {validSocials.length > 0 && (
                    <div className="flex items-center justify-center gap-2 mt-4 pt-3 border-t border-[#1e2336]/80 w-full">
                        {validSocials.map((socialLink, idx) => {
                            const Icon = getSocialIcon(socialLink.name);
                            const href = formatSocialLink(socialLink);
                            const label = getSocialLabel(socialLink.name);

                            return (
                                <a
                                    key={idx}
                                    href={href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    title={label}
                                    aria-label={`${fullName} - ${label}`}
                                    className="group/btn relative w-8.5 h-8.5 rounded-lg flex items-center justify-center bg-[#171a27] border border-[#262b3d] text-[#8e95a7] hover:text-[#39b7f2] hover:border-[#39b7f2]/60 hover:bg-[#39b7f2]/15 hover:shadow-[0_0_12px_rgba(57,183,242,0.35)] hover:-translate-y-0.5 active:translate-y-0 active:scale-95 transition-all duration-200"
                                >
                                    <Icon className="w-4 h-4 transition-transform duration-200 group-hover/btn:scale-110" />
                                </a>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
}
