import { Head } from "@inertiajs/react";
import GlassNavigation from "@/components/glass-navigation";
import GradientGrid from "@/components/gradient-grid";
import SideStaggerNavigation from "@/components/side-stagger-navigation";
import MovieDashboardGrid from "@/components/movie-dashboard-grid";
import WaterDropGrid from "@/components/water-drop-grid";

export default function Dashboard({ movies, trendingMovies, trendingTV, topRatedMovies }: { movies: any[]; trendingMovies: any[]; trendingTV: any[]; topRatedMovies: any[]; }) {
    return (
        <>
            <Head title="Dashboard" />

            <main className="relative min-h-screen overflow-hidden bg-black">
                <GlassNavigation />
                <GradientGrid />
                <SideStaggerNavigation />
                <MovieDashboardGrid 
                trendingMovies={trendingMovies}
                trendingTV={trendingTV}
                topRatedMovies={topRatedMovies}
                />
            </main>
        </>
    );
}