import { Head } from "@inertiajs/react";

import { Beams } from "@/components/dark-grid-hero";
import SlideTabs from "@/components/slide-tabs";
import TVCarousel from "@/components/tv-carousel";
import TVGrid from "@/components/tv-grid";
import Footer from "@/components/footer";

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

                <nav className="relative z-20 flex items-center gap-6 p-6">
                    <img
                        src="/images/movie-lover.png"
                        alt="Movie Lover"
                        className="h-12 w-auto"
                    />

                    <SlideTabs />
                </nav>

                <TVGrid shows={trendingTV} />

                <TVCarousel
                    title="Trending TV"
                    shows={trendingTV}
                />

                <TVCarousel
                    title="Popular Series"
                    shows={popularTV}
                />

                <TVCarousel
                    title="Top Rated Series"
                    shows={topRatedTV}
                />

                <TVCarousel
                    title="Airing Today"
                    shows={airingTodayTV}
                />

                <TVCarousel
                    title="On The Air"
                    shows={onTheAirTV}
                />

                <TVCarousel
                    title="Discover TV"
                    shows={discoverTV}
                />

                <TVCarousel
                    title="Drama"
                    shows={dramaTV}
                />

                <TVCarousel
                    title="Comedy"
                    shows={comedyTV}
                />

                <TVCarousel
                    title="Crime"
                    shows={crimeTV}
                />

                <TVCarousel
                    title="Sci-Fi & Fantasy"
                    shows={sciFiFantasyTV}
                />

                <Footer />
            </main>
        </>
    );
}