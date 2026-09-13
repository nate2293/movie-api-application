export default function GlowingDivider() {
    return (
        <div className="relative z-30 -mt-20 h-24 overflow-hidden bg-zinc-950">
            {/* Soft glow BELOW the curve */}
            <div className="absolute top-8 left-1/2 h-36 w-[120%] -translate-x-1/2 rounded-[50%] border-t-[12px] border-blue-500/20 blur-xl" />

            {/* Main curve */}
            <div className="absolute top-8 left-1/2 h-40 w-[120%] -translate-x-1/2 rounded-[50%] border-t-[3px] border-blue-500 shadow-[0_10px_30px_rgba(59,130,246,0.8)]" />
        </div>
    );
}