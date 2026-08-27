import Link from "next/link";

export default function NotFound() {
    return (
        <main className="min-h-screen bg-[#0b0b0e] text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(57,183,242,0.16),transparent_42%),radial-gradient(circle_at_bottom_right,rgba(183,185,197,0.08),transparent_30%)]" />
            <div className="absolute left-9 top-0 h-full w-px bg-[#424453]" />
            <div className="absolute right-9 top-0 h-full w-px bg-[#424453]" />
            <div className="absolute top-9 left-0 right-0 h-px bg-[#424453]" />
            <div className="absolute bottom-9 left-0 right-0 h-px bg-[#424453]" />

            <section className="relative z-10 min-h-screen flex items-center justify-center px-6 py-16">
                <div className="max-w-2xl w-full text-center border border-[#424453] bg-[#17192160] backdrop-blur-sm rounded-sm px-8 py-14 shadow-[0_0_40px_rgba(0,0,0,0.28)]">
                    <div className="font-family-grotesk-mono text-[#838698] text-sm uppercase tracking-[0.35em] mb-5">
                        404
                    </div>
                    <h1 className="font-family-grotesk text-5xl md:text-7xl text-[#e9ede5] uppercase leading-none mb-6">
                        Coming Soon
                    </h1>
                    {/* <p className="font-family-apk text-lg md:text-xl text-[#b7b9c5] max-w-xl mx-auto leading-relaxed mb-10">
                        This page is not ready yet, but it will match the same
                        look and feel as the rest of Robotix when it lands.
                    </p> */}
                    <Link
                        href="/"
                        className="inline-flex items-center justify-center rounded-sm border border-[#39b7f2] px-6 py-3 font-family-grotesk-mono text-sm uppercase tracking-[0.2em] text-[#e9ede5] transition-colors duration-300 hover:bg-[#39b7f2] hover:text-[#0b0b0e]"
                    >
                        Back to Home
                    </Link>
                </div>
            </section>
        </main>
    );
}