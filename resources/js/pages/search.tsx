import { Head, router } from "@inertiajs/react";
import { motion } from "motion/react";
import { FiLogOut } from "react-icons/fi";

import { Beams } from "@/components/dark-grid-hero";
import MovieCarousel from "@/components/movie-carousel";
import SlideTabs from "@/components/slide-tabs";
import TVCarousel from "@/components/tv-carousel";
import Footer from "@/components/footer";
import FloatingBottomNav from "@/components/floating-bottom-nav";
import MovieAssistant from "@/components/movie-assistant";

type SearchResult = {
    id: number;
    media_type: "movie" | "tv";
    title?: string;
    name?: string;
    overview?: string;
    backdrop_path?: string | null;
    poster_path?: string | null;
};

type SearchProps = {
    query: string;
    results: SearchResult[];
};

export default function Search({ query, results }: SearchProps) {
    const movies = results.filter((result) => result.media_type === "movie");

    const tvShows = results.filter((result) => result.media_type === "tv");

    return (
        <>
            <Head title={`Search - ${query}`} />

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

                {movies.length > 0 && (
                    <MovieCarousel title="Films" movies={movies} />
                )}

                {tvShows.length > 0 && (
                    <TVCarousel title="Series" shows={tvShows} />
                )}

                {results.length === 0 && (
                    <section className="relative z-20 px-6">
                        <p className="text-zinc-400">
                            No movies or series found for "{query}".
                        </p>
                    </section>
                )}

                <Footer />
                <FloatingBottomNav />
                <MovieAssistant />
            </main>
        </>
    );
}
