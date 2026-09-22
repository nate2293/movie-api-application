import { useEffect, useState } from "react";

import ShimmerBorderCard from "@/components/shimmer-border-card";
import ExpandableCard from "@/components/ui/expandable-card";

type Movie = {
    id: number;
    title: string;
    overview: string;
    backdrop_path: string | null;
    vote_average: number;
    release_date: string;
};

type MovieDetails = Movie & {
    adult: boolean | null;
    name: string | null;
    genres: { id: number; name: string }[] | null;
    runtime: number | null;
    tagline: string | null;
    origin_country: string[] | null;
    spoken_languages: { iso_639_1: string; name: string }[] | null;
    vote_count: number | null;
    production_companies: { id: number; name: string }[] | null;
};

type MovieGridProps = {
    movies: Movie[];
};

export default function MovieGrid({ movies }: MovieGridProps) {
    const movie = movies[0];

    const [movieDetails, setMovieDetails] = useState<MovieDetails | null>(null);

    const [selectedMovie, setSelectedMovie] = useState<MovieDetails | null>(
        null,
    );

    useEffect(() => {
        if (!movie) {
            return;
        }

        const loadMovieDetails = async () => {
            const response = await fetch(`/movie/${movie.id}`);
            const details: MovieDetails = await response.json();

            setMovieDetails(details);
        };

        loadMovieDetails();
    }, [movie?.id]);

    if (!movie) {
        return null;
    }

    const openMovie = async () => {
        if (movieDetails) {
            setSelectedMovie(movieDetails);
            return;
        }

        const response = await fetch(`/movie/${movie.id}`);
        const details: MovieDetails = await response.json();

        setSelectedMovie(details);
    };

    const releaseYear = movieDetails?.release_date
        ? new Date(movieDetails.release_date).getFullYear()
        : null;

    const runtime = movieDetails?.runtime
        ? `${Math.floor(movieDetails.runtime / 60)}h ${movieDetails.runtime % 60}m`
        : null;

    const rating = movieDetails?.vote_average
        ? `${Math.round(movieDetails.vote_average * 10)}% Rating`
        : null;

    const genre = movieDetails?.genres?.[0]?.name;

    return (
        <section className="relative z-20 px-6 pb-12">
            <div className="mx-auto w-[95%]">
                <ShimmerBorderCard>
                    <div className="relative aspect-[4/3] w-full overflow-hidden sm:aspect-video lg:aspect-[16/7]">
                        {movie.backdrop_path && (
                            <img
                                src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
                                alt={movie.title}
                                className="h-full w-full object-cover"
                            />
                        )}

                        {/* Dark gradient */}
                        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/40 to-transparent" />

                        {/* Movie information */}
                        <div className="absolute inset-x-4 bottom-4 z-10 sm:inset-x-auto sm:bottom-8 sm:left-8 sm:max-w-xl md:bottom-10 md:left-10">
                            <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-zinc-300 sm:text-sm">
                                Trending
                            </p>

                            <h1 className="text-2xl font-bold text-white sm:text-3xl md:text-4xl lg:text-5xl">
                                {movie.title}
                            </h1>

                            <div className="mt-3 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-white sm:gap-x-3 sm:text-base md:text-lg">
                                {rating && (
                                    <span className="text-green-400">
                                        {rating}
                                    </span>
                                )}

                                {releaseYear && (
                                    <>
                                        <span>•</span>
                                        <span>{releaseYear}</span>
                                    </>
                                )}

                                {runtime && (
                                    <>
                                        <span>•</span>
                                        <span>{runtime}</span>
                                    </>
                                )}

                                {genre && (
                                    <>
                                        <span>•</span>
                                        <span>{genre}</span>
                                    </>
                                )}

                                {movieDetails?.adult && (
                                    <>
                                        <span>•</span>
                                        <span className="rounded border border-zinc-400 px-1.5 py-0.5">
                                            18+
                                        </span>
                                    </>
                                )}
                            </div>

                            <p className="mt-4 hidden max-w-lg text-sm leading-relaxed text-zinc-200 sm:line-clamp-3 sm:block lg:text-base">
                                {movie.overview}
                            </p>

                            <div className="mt-5 flex items-center gap-3">
                                <button
                                    type="button"
                                    onClick={openMovie}
                                    aria-label={`More information about ${movie.title}`}
                                    className="rounded-full border border-white/40 bg-black/30 px-5 py-2.5 text-sm font-medium text-white backdrop-blur-sm transition hover:border-white hover:bg-black/50"
                                >
                                    More Info
                                </button>
                            </div>
                        </div>
                    </div>
                </ShimmerBorderCard>
            </div>

            {selectedMovie && selectedMovie.backdrop_path && (
                <ExpandableCard
                    title={selectedMovie.title}
                    description={selectedMovie.overview}
                    adult={selectedMovie.adult}
                    name={selectedMovie.name}
                    release_date={selectedMovie.release_date}
                    genres={selectedMovie.genres}
                    runtime={selectedMovie.runtime}
                    tagline={selectedMovie.tagline}
                    origin_country={selectedMovie.origin_country}
                    spoken_languages={selectedMovie.spoken_languages}
                    vote_average={selectedMovie.vote_average}
                    vote_count={selectedMovie.vote_count}
                    production_companies={selectedMovie.production_companies}
                    src={`https://image.tmdb.org/t/p/original${selectedMovie.backdrop_path}`}
                    layoutId={selectedMovie.id.toString()}
                    open={true}
                    onOpenChange={(open) => {
                        if (!open) {
                            setSelectedMovie(null);
                        }
                    }}
                    hideTrigger
                />
            )}
        </section>
    );
}
