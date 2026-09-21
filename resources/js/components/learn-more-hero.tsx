import { Link } from "@inertiajs/react";
import { Beams } from "@/components/dark-grid-hero";
import GlowingDivider from "@/components/glowing-divider";
import { login } from "@/routes";
import DrawOutlineButton from "@/components/draw-outline-button";
import ShimmerBorderCard from "@/components/shimmer-border-card";
import ShinySkeuButton from "@/components/shiny-skeu-button";

export default function LearnMoreHero() {
    return (

            <main className="relative min-h-screen overflow-hidden bg-zinc-950">
                {/* Logo */}
                <div className="absolute top-4 left-4 z-30 sm:top-6 sm:left-6">
                    <img
                        src="/images/movie-lover.png"
                        alt="Movie Lover"
                        className="h-14 w-auto sm:h-16 md:h-20 lg:h-24"
                    />
                </div>

                {/* Sign In */}
                <div className="absolute top-9 right-9 z-30">
                    <Link href={login()}>
                        <DrawOutlineButton>Sign In</DrawOutlineButton>
                    </Link>
                </div>

                <div className="relative z-20 mx-auto flex min-h-screen max-w-6xl items-center px-6">
                    <div className="grid w-full grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
                        {/* Left side */}
                        <div>
                            <h1 className="text-4xl font-bold text-zinc-50 md:text-5xl">
                                Choose a plan that works for you
                            </h1>

                            <p className="mt-6 max-w-lg text-lg text-zinc-400">
                                Enjoy movies and TV shows with a plan designed
                                around how you watch.
                            </p>

                            <div className="mt-10">
                                <ShinySkeuButton />
                                {/* Shiny Skeu Button */}
                            </div>
                        </div>

                        {/* Right side */}
                        <div>
                            <ShimmerBorderCard>
                                <div className="flex items-center justify-between border-b border-zinc-700 p-6 py-4">
                                    <span className="text-sm font-medium text-zinc-400">
                                        Monthly price
                                    </span>

                                    <span className="text-right font-semibold text-zinc-50">
                                        $9.99
                                    </span>
                                </div>

                                <div className="flex items-center justify-between border-b border-zinc-700 p-6 py-4">
                                    <span className="text-sm font-medium text-zinc-400">
                                        Adverts
                                    </span>

                                    <span className="text-right font-semibold text-zinc-50">
                                        No
                                    </span>
                                </div>

                                <div className="flex items-center justify-between border-b border-zinc-700 p-6 py-4">
                                    <span className="max-w-48 text-sm font-medium text-zinc-400">
                                        Resolution
                                    </span>

                                    <span className="font-semibold text-zinc-50">
                                        1080p (Full HD)
                                    </span>
                                </div>

                                <div className="flex items-center justify-between border-b border-zinc-700 p-6 py-4">
                                    <span className="text-sm font-medium text-zinc-400">
                                        Devices
                                    </span>

                                    <span className="font-semibold text-zinc-50">
                                        2
                                    </span>
                                </div>

                                <div className="flex items-center justify-between p-6 py-4">
                                    <span className="text-sm font-medium text-zinc-400">
                                        Download
                                    </span>

                                    <span className="font-semibold text-zinc-50">
                                        Included
                                    </span>
                                </div>
                            </ShimmerBorderCard>
                        </div>
                    </div>
                </div>

                <Beams />
            </main>
    );
}