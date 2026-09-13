import { useState } from "react";

import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

import TiltShineCard from "@/components/tilt-shine-card";

import BubbleText from "./bubble-text";

type Movie = {
    id: number;
    title: string;
    poster_path: string | null;
};

type TopTrendingProps = {
    movies: Movie[];
};

export default function TopTrending({ movies }: TopTrendingProps) {
    const [page, setPage] = useState(0);

    const moviesPerPage = 5;

    const topTen = movies.filter((movie) => movie.poster_path).slice(0, 10);

    const visibleMovies = topTen.slice(
        page * moviesPerPage,
        page * moviesPerPage + moviesPerPage,
    );

    return (
        <section className="bg-zinc-950 px-6 py-12">
            <div className="relative mx-auto max-w-7xl">
                <div className="absolute -top-8 left-0 -translate-x-6">
                    <BubbleText />
                </div>

                <div className="relative py-8">
                    <button
                        onClick={() => setPage(0)}
                        disabled={page === 0}
                        className="absolute top-1/2 -left-6 z-20 -translate-y-1/2 rounded-full border border-blue-500/40 bg-zinc-950/90 p-3 text-blue-400 transition hover:bg-blue-500 hover:text-white disabled:pointer-events-none disabled:opacity-0"
                    >
                        <FiChevronLeft className="text-2xl" />
                    </button>

                    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-5 lg:grid-cols-5 lg:gap-6">
                        {visibleMovies.map((movie, index) => (
                            <TiltShineCard
                                key={movie.id}
                                title={movie.title}
                                posterPath={movie.poster_path!}
                                rank={page * moviesPerPage + index + 1}
                            />
                        ))}
                    </div>

                    <button
                        onClick={() => setPage(1)}
                        disabled={page === 1}
                        className="absolute top-1/2 -right-6 z-20 -translate-y-1/2 rounded-full border border-blue-500/40 bg-zinc-950/90 p-3 text-blue-400 transition hover:bg-blue-500 hover:text-white disabled:pointer-events-none disabled:opacity-0"
                    >
                        <FiChevronRight className="text-2xl" />
                    </button>
                </div>
            </div>
        </section>
    );
}
