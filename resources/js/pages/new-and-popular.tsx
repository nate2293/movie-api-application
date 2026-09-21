import { Head } from "@inertiajs/react";

import { Beams } from "@/components/dark-grid-hero";
import MovieCarousel from "@/components/movie-carousel";
import SlideTabs from "@/components/slide-tabs";
import TVCarousel from "@/components/tv-carousel";
import Footer from "@/components/footer";
import TVGrid from "@/components/tv-grid";

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

                <nav className="relative z-20 flex items-center gap-6 p-6">
                    <img
                        src="/images/movie-lover.png"
                        alt="Movie Lover"
                        className="h-12 w-auto"
                    />

                    <SlideTabs />
                </nav>
                
                <TVGrid shows={trendingTV} />

                <MovieCarousel title="New Movies" movies={trendingMovies} />

                <TVCarousel title="New Series" shows={trendingTV} />

                <MovieCarousel title="Top 10 Films" movies={popularMovies} />

                <MovieCarousel
                    title="Coming This Week - Films"
                    movies={thisWeekMovies}
                />

                <TVCarousel
                    title="Coming This Week - Series"
                    shows={thisWeekTV}
                />

                <MovieCarousel
                    title="Coming Next Week - Films"
                    movies={nextWeekMovies}
                />

                <TVCarousel
                    title="Coming Next Week - Series"
                    shows={nextWeekTV}
                />

                <TVCarousel title="Top 10 Series" shows={popularTV} />

                <Footer />
            </main>
        </>
    );
}
