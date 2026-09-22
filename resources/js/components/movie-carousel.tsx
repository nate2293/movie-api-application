import { motion } from "motion/react";
import { useState } from "react";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";
import useMeasure from "react-use-measure";

import ExpandableCard from "@/components/ui/expandable-card";

const CARD_WIDTH = 350;
const MARGIN = 20;
const CARD_SIZE = CARD_WIDTH + MARGIN;

const BREAKPOINTS = {
    sm: 640,
    lg: 1024,
};

type Movie = {
    id: number;
    title: string;
    backdrop_path: string | null;
    overview: string;
};

type MovieDetails = Movie & {
    adult: boolean | null;
    name: string | null;
    release_date: string | null;
    genres: { id: number; name: string }[] | null;
    runtime: number | null;
    tagline: string | null;
    origin_country: string[] | null;
    spoken_languages:
        | {
              iso_639_1: string;
              name: string;
          }[]
        | null;
    vote_average: number | null;
    vote_count: number | null;
    production_companies:
        | {
              id: number;
              name: string;
          }[]
        | null;
};

type MovieCarouselProps = {
    movies: Movie[];
    title: string;
};

export default function MovieCarousel({ movies, title }: MovieCarouselProps) {
    const [ref, { width }] = useMeasure();

    const [offset, setOffset] = useState(0);

    const [selectedMovie, setSelectedMovie] = useState<MovieDetails | null>(
        null,
    );

    const openMovie = async (movie: Movie) => {
        const response = await fetch(`/movie/${movie.id}`);

        const details: MovieDetails = await response.json();

        setSelectedMovie(details);
    };

    const CARD_BUFFER =
        width > BREAKPOINTS.lg ? 3 : width > BREAKPOINTS.sm ? 2 : 1;

    const CAN_SHIFT_LEFT = offset < 0;

    const CAN_SHIFT_RIGHT =
        Math.abs(offset) < CARD_SIZE * (movies.length - CARD_BUFFER);

    const shiftLeft = () => {
        if (!CAN_SHIFT_LEFT) {
            return;
        }

        setOffset((previousOffset) => previousOffset + CARD_SIZE);
    };

    const shiftRight = () => {
        if (!CAN_SHIFT_RIGHT) {
            return;
        }

        setOffset((previousOffset) => previousOffset - CARD_SIZE);
    };

    return (
        <section className="py-8" ref={ref}>
            <div className="relative overflow-hidden px-6">
                <div className="w-full">
                    <div className="flex items-center justify-between">
                        <h2 className="mb-4 text-2xl font-semibold text-white">
                            {title}
                        </h2>

                        <div className="flex items-center gap-2">
                            <button
                                type="button"
                                className={`rounded-lg border border-zinc-700 bg-zinc-900 p-1.5 text-2xl text-white transition-opacity ${
                                    CAN_SHIFT_LEFT ? "" : "opacity-30"
                                }`}
                                disabled={!CAN_SHIFT_LEFT}
                                onClick={shiftLeft}
                            >
                                <FiArrowLeft />
                            </button>

                            <button
                                type="button"
                                className={`rounded-lg border border-zinc-700 bg-zinc-900 p-1.5 text-2xl text-white transition-opacity ${
                                    CAN_SHIFT_RIGHT ? "" : "opacity-30"
                                }`}
                                disabled={!CAN_SHIFT_RIGHT}
                                onClick={shiftRight}
                            >
                                <FiArrowRight />
                            </button>
                        </div>
                    </div>

                    <motion.div
                        animate={{
                            x: offset,
                        }}
                        transition={{
                            ease: "easeInOut",
                        }}
                        className="flex"
                    >
                        {movies.map((movie) => (
                            <MovieCard
                                key={movie.id}
                                movie={movie}
                                onOpen={() => openMovie(movie)}
                            />
                        ))}
                    </motion.div>
                </div>
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

const MovieCard = ({ movie, onOpen }: { movie: Movie; onOpen: () => void }) => {
    if (!movie.backdrop_path) {
        return null;
    }

    return (
        <motion.div
            layoutId={`card-${movie.id}`}
            className="relative shrink-0 cursor-pointer transition-transform duration-300 hover:-translate-y-1"
            style={{
                width: CARD_WIDTH,
                marginRight: MARGIN,
            }}
        >
            <motion.img
                layoutId={`image-${movie.id}`}
                src={`https://image.tmdb.org/t/p/w780${movie.backdrop_path}`}
                alt={movie.title}
                className="aspect-video w-full rounded-lg object-cover"
            />

            <motion.button
                layoutId={`button-${movie.id}`}
                type="button"
                onClick={onOpen}
                aria-label={`More information about ${movie.title}`}
                className="absolute right-3 bottom-3 flex h-8 w-8 items-center justify-center rounded-full border border-white/40 bg-black/20 text-lg font-light text-white backdrop-blur-sm transition hover:border-white hover:bg-black/40"
            >
                +
            </motion.button>
        </motion.div>
    );
};
