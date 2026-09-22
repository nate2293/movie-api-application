import { Head, router } from "@inertiajs/react";

import { Beams } from "@/components/dark-grid-hero";
import SlideTabs from "@/components/slide-tabs";
import TVCarousel from "@/components/tv-carousel";
import TVGrid from "@/components/tv-grid";
import Footer from "@/components/footer";
import FloatingBottomNav from "@/components/floating-bottom-nav";
import MovieAssistant from "@/components/movie-assistant";
import { FiLogOut } from "react-icons/fi";
import { motion } from "motion/react";

type SeriesProps = {
    trendingTV: any[];
    discoverTV: any[];
    popularTV: any[];
    topRatedTV: any[];
    airingTodayTV: any[];
    onTheAirTV: any[];
    dramaTV: any[];
    comedyTV: any[];
    crimeTV: any[];
    sciFiFantasyTV: any[];
};

export default function Series({
    trendingTV,
    discoverTV,
    popularTV,
    topRatedTV,
    airingTodayTV,
    onTheAirTV,
    dramaTV,
    comedyTV,
    crimeTV,
    sciFiFantasyTV,
}: SeriesProps) {
    return (
        <>
            <Head title="Series" />

            <main className="relative min-h-screen overflow-hidden bg-zinc-950">
                <Beams />

                <nav className="relative z-20 flex items-center justify-between p-6">
                    <div className="flex items-center gap-6">
                        <img
                            src="/images/movie-lover.png"
                            alt="Movie Lover"
                            className="h-12 w-auto"
                        />

                        <SlideTabs />
                    </div>

                    <motion.button
                        type="button"
                        onClick={() => router.post("/logout")}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex items-center gap-2 rounded-full border border-zinc-700 bg-zinc-900 px-4 py-2 text-sm font-medium text-zinc-300 shadow-lg transition-colors hover:border-zinc-600 hover:bg-zinc-800 hover:text-white md:hidden"
                    >
                        <FiLogOut className="text-base" />
                        <span>Logout</span>
                    </motion.button>
                </nav>

                <TVGrid shows={trendingTV} />

                <TVCarousel title="Trending TV" shows={trendingTV} />

                <TVCarousel title="Popular Series" shows={popularTV} />

                <TVCarousel title="Top Rated Series" shows={topRatedTV} />

                <TVCarousel title="Airing Today" shows={airingTodayTV} />

                <TVCarousel title="On The Air" shows={onTheAirTV} />

                <TVCarousel title="Discover TV" shows={discoverTV} />

                <TVCarousel title="Drama" shows={dramaTV} />

                <TVCarousel title="Comedy" shows={comedyTV} />

                <TVCarousel title="Crime" shows={crimeTV} />

                <TVCarousel title="Sci-Fi & Fantasy" shows={sciFiFantasyTV} />

                <Footer />
                <FloatingBottomNav />
                <MovieAssistant />
            </main>
        </>
    );
}
