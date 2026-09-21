import { Head } from "@inertiajs/react";

import { Beams } from "@/components/dark-grid-hero";
import MovieCarousel from "@/components/movie-carousel";
import SlideTabs from "@/components/slide-tabs";
import TVCarousel from "@/components/tv-carousel";
import Footer from "@/components/footer";

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

                <nav className="relative z-20 flex items-center gap-6 p-6">
                    <img
                        src="/images/movie-lover.png"
                        alt="Movie Lover"
                        className="h-12 w-auto"
                    />

                    <SlideTabs />
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
            </main>

            
        </>
    );
}
