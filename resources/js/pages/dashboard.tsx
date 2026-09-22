import { Head, router } from "@inertiajs/react";
import { Beams } from "@/components/dark-grid-hero";
import SlideTabs from "@/components/slide-tabs";
import MovieGrid from "@/components/movie-grid";
import MovieCarousel from "@/components/movie-carousel";
import TVCarousel from "@/components/tv-carousel";
import Footer from "@/components/footer";
import FloatingBottomNav from "@/components/floating-bottom-nav";
import MovieAssistant from "@/components/movie-assistant";
import { motion } from "motion/react";
import { FiLogOut } from "react-icons/fi";

export default function Dashboard({
    movies,
    trendingMovies,
    trendingTV,
    topRatedMovies,
    discoverMovies,
    popularMovieList,
    discoverTv,
    horrorMovies,
    comedyMovies,
    actionMovies,
    animationMovies,
    dramaMovies,
    fantasyMovies,
    nowPlayingMovies,
    upcomingMovies,
    movieGenres,
    recommendations,
}: {
    movies: any[];
    trendingMovies: any[];
    trendingTV: any[];
    topRatedMovies: any[];
    discoverMovies: any[];
    popularMovieList: any[];
    discoverTv: any[];
    horrorMovies: any[];
    comedyMovies: any[];
    actionMovies: any[];
    animationMovies: any[];
    dramaMovies: any[];
    fantasyMovies: any[];
    nowPlayingMovies: any[];
    upcomingMovies: any[];
    movieGenres: any[];
    recommendations: any[];
}) {
    return (
        <>
            <Head title="Dashboard" />

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

                <MovieGrid movies={movies} />

                <MovieCarousel
                    title="Trending Movies"
                    movies={trendingMovies}
                />
                <MovieCarousel
                    title="Popular Movies"
                    movies={popularMovieList}
                />
                <TVCarousel title="Trending TV" shows={trendingTV} />
                <MovieCarousel
                    title="Top Rated Movies"
                    movies={topRatedMovies}
                />
                <MovieCarousel
                    title="Discover Movies"
                    movies={discoverMovies}
                />
                <MovieCarousel title="Discover TV" movies={discoverTv} />
                <MovieCarousel title="Horror" movies={horrorMovies} />
                <MovieCarousel title="Comedy" movies={comedyMovies} />
                <MovieCarousel title="Action" movies={actionMovies} />
                <MovieCarousel title="Animation" movies={animationMovies} />
                <MovieCarousel title="Drama" movies={dramaMovies} />
                <MovieCarousel title="Fantasy" movies={fantasyMovies} />

                <Footer />
                <FloatingBottomNav />
                <MovieAssistant />
            </main>
        </>
    );
}
