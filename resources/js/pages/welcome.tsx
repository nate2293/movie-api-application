import { Head } from "@inertiajs/react";
import { DarkGridHero } from "@/components/dark-grid-hero";
import GlowingDivider from "@/components/glowing-divider";
import TopTrending from "@/components/top-trending";
import MovieFeatureCards from "@/components/movie-feature-cards";
import LearnMoreBanner from "@/components/learn-more-banner";
import { TabsFAQ } from "@/components/tabs-faq";
import Footer from "@/components/footer"; 

export default function Welcome({ trendingMovies }: { trendingMovies: any[] }) {
    return (
        <>
            <Head title="Welcome" />

            <main className="relative min-h-screen bg-zinc-950">
                <div className="relative z-20">
                    <DarkGridHero />
                    <GlowingDivider />
                    <TopTrending movies={trendingMovies} /> 
                    <MovieFeatureCards />
                    <LearnMoreBanner />
                    <TabsFAQ />
                    <Footer />
                </div>
            </main>
        </>
    );
}
