import { Head, router } from "@inertiajs/react";

import { Beams } from "@/components/dark-grid-hero";
import MovieCarousel from "@/components/movie-carousel";
import SlideTabs from "@/components/slide-tabs";
import TVCarousel from "@/components/tv-carousel";
import Footer from "@/components/footer";
import TVGrid from "@/components/tv-grid";
import FloatingBottomNav from "@/components/floating-bottom-nav";
import { FiLogOut } from "react-icons/fi";
import { motion } from "motion/react";
import MovieAssistant from "@/components/movie-assistant";

type NewAndPopularProps = {
    trendingMovies: any[];
    trendingTV: any[];
    popularMovies: any[];
    popularTV: any[];
    thisWeekMovies: any[];
    thisWeekTV: any[];
    nextWeekMovies: any[];
    nextWeekTV: any[];
};

export default function NewAndPopular({
    trendingMovies,
    trendingTV,
    popularMovies,
    popularTV,
    thisWeekMovies,
    thisWeekTV,
    nextWeekMovies,
    nextWeekTV,
}: NewAndPopularProps) {
    return (
        <>
            <Head title="New & Popular" />

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

                <MovieCarousel title="New Movies" movies={trendingMovies} />

                <TVCarousel title="New Series" shows={trendingTV} />

                <MovieCarousel title="Top 10 Films" movies={popularMovies} />

                <MovieCarousel
                    title="New Films This Week"
                    movies={thisWeekMovies}
                />

                <TVCarousel
                    title="New Series This Week"
                    shows={thisWeekTV}
                />

                <MovieCarousel
                    title="New Films Incoming"
                    movies={nextWeekMovies}
                />

                <TVCarousel
                    title="New Series Incoming"
                    shows={nextWeekTV}
                />

                <TVCarousel title="Top 10 Series" shows={popularTV} />

                <Footer />
                <FloatingBottomNav />
                <MovieAssistant />
            </main>
        </>
    );
}
