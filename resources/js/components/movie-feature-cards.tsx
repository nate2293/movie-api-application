import {
    animate,
    motion,
    useMotionTemplate,
    useMotionValue,
} from "motion/react";
import { useEffect } from "react";
import {
    FiDownload,
    FiMonitor,
    FiSmartphone,
    FiUsers,
} from "react-icons/fi";
import { twMerge } from "tailwind-merge";
import type { ReactNode } from "react";

type GradientBorderProps = {
    children: ReactNode;
    className?: string;
    duration?: number;
};

const GradientBorder = ({
    children,
    className,
    duration = 5,
}: GradientBorderProps) => {
    const turn = useMotionValue(0);

    useEffect(() => {
        const controls = animate(turn, 1, {
            ease: "linear",
            duration,
            repeat: Infinity,
        });

        return () => controls.stop();
    }, [duration, turn]);

    const gradient = useMotionTemplate`
        conic-gradient(
            from ${turn}turn,
            transparent 0%,
            #3b82f600 10%,
            #3b82f6 20%,
            #60a5fa 30%,
            #1d4ed8 40%,
            #3b82f600 52%,
            transparent 60%
        )
    `;

    return (
        <div className={twMerge("relative p-px", className)}>
            <motion.div
                style={{ backgroundImage: gradient }}
                className="absolute inset-0 rounded-[inherit]"
            />

            <div className="relative h-full overflow-hidden rounded-[inherit]">
                <div className="relative h-full">
                    {children}
                </div>

                <motion.div
                    style={{ backgroundImage: gradient }}
                    className="ai-glow-spill-mask pointer-events-none absolute inset-[-40%] z-10 opacity-40 blur-2xl"
                />
            </div>
        </div>
    );
};

type FeatureCardProps = {
    title: string;
    description: string;
    icon: ReactNode;
};

const FeatureCard = ({
    title,
    description,
    icon,
}: FeatureCardProps) => {
    return (
        <GradientBorder className="h-full rounded-2xl">
            <div className="relative flex min-h-52 h-full flex-col bg-gradient-to-br from-blue-950/70 to-zinc-950 p-6">
                <h3 className="text-xl font-semibold text-white">
                    {title}
                </h3>

                <p className="mt-3 max-w-lg text-sm leading-relaxed text-zinc-400 sm:text-base">
                    {description}
                </p>

                <div className="mt-auto flex justify-end pt-8">
                    <div className="text-4xl text-blue-400">
                        {icon}
                    </div>
                </div>
            </div>
        </GradientBorder>
    );
};

export default function MovieFeatureCards() {
    return (
        <section className="bg-zinc-950 px-6 py-16">
            <div className="mx-auto max-w-7xl">
                <h2 className="mb-8 text-2xl font-bold text-white md:text-3xl">
                    More reasons to explore
                </h2>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <FeatureCard
                        title="Discover new favourites"
                        description="Explore trending movies and TV shows and find something new to watch."
                        icon={<FiMonitor />}
                    />

                    <FeatureCard
                        title="Build your watchlist"
                        description="Keep track of movies and series you want to come back to later."
                        icon={<FiDownload />}
                    />

                    <FeatureCard
                        title="Browse anywhere"
                        description="Explore movies and TV shows across desktop, tablet and mobile."
                        icon={<FiSmartphone />}
                    />

                    <FeatureCard
                        title="Made for movie lovers"
                        description="Discover popular releases, top-rated titles and recommendations in one place."
                        icon={<FiUsers />}
                    />
                </div>
            </div>
        </section>
    );
}