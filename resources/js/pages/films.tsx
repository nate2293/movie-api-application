import { Head, router } from "@inertiajs/react";
import { motion } from "motion/react";
import { FiLogOut } from "react-icons/fi";
import { Beams } from "@/components/dark-grid-hero";
import MovieCarousel from "@/components/movie-carousel";
import MovieGrid from "@/components/movie-grid";
import SlideTabs from "@/components/slide-tabs";
import Footer from "@/components/footer";
import FloatingBottomNav from "@/components/floating-bottom-nav";
import MovieAssistant from "@/components/movie-assistant";

type FilmsProps = {
    trendingMovies: any[];
    popularMovies: any[];
    topRatedMovies: any[];
    discoverMovies: any[];
    nowPlayingMovies: any[];
    upcomingMovies: any[];
    actionMovies: any[];
    comedyMovies: any[];
    horrorMovies: any[];
    dramaMovies: any[];
    animationMovies: any[];
    fantasyMovies: any[];
};

export default function Films({
    trendingMovies,
    popularMovies,
    topRatedMovies,
    discoverMovies,
    nowPlayingMovies,
    upcomingMovies,
    actionMovies,
    comedyMovies,
    horrorMovies,
    dramaMovies,
    animationMovies,
    fantasyMovies,
}: FilmsProps) {
    return (
        <>
            <Head title="Films" />

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

                <MovieGrid movies={trendingMovies} />

                <MovieCarousel
                    title="Trending Movies"
                    movies={trendingMovies}
                />

                <MovieCarousel title="Popular Movies" movies={popularMovies} />

                <MovieCarousel title="Now Playing" movies={nowPlayingMovies} />

                <MovieCarousel
                    title="Upcoming Movies"
                    movies={upcomingMovies}
                />

                <MovieCarousel
                    title="Top Rated Movies"
                    movies={topRatedMovies}
                />

                <MovieCarousel
                    title="Discover Movies"
                    movies={discoverMovies}
                />

                <MovieCarousel title="Action" movies={actionMovies} />

                <MovieCarousel title="Comedy" movies={comedyMovies} />

                <MovieCarousel title="Horror" movies={horrorMovies} />

                <MovieCarousel title="Drama" movies={dramaMovies} />

                <MovieCarousel title="Animation" movies={animationMovies} />

                <MovieCarousel title="Fantasy" movies={fantasyMovies} />
            </main>

            <Footer />
            <FloatingBottomNav />
            <MovieAssistant />
        </>
    );
}
