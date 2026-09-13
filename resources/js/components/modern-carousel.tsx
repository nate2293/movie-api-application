import { useState } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { AnimatePresence, motion } from "motion/react";

type Movie = {
    id: number;
    title: string;
    backdrop_path: string | null;
};

type ModernCarouselProps = {
    movies: Movie[];
};

export default function ModernCarousel({
    movies,
}: ModernCarouselProps) {
    const [idx, setIdx] = useState(0);
    const [prevIdx, setPrevIdx] = useState(idx);

    const trend = idx > prevIdx ? 1 : -1;

    const carouselMovies = movies
        .filter((movie) => movie.backdrop_path)
        .slice(0, 5);

    const imageIndex = Math.abs(idx % carouselMovies.length);

    const currentMovie = carouselMovies[imageIndex];

    return (
        <div className="relative h-[50vw] min-h-[400px] max-h-[600px] overflow-hidden bg-black">
            <button
                onClick={() => {
                    setPrevIdx(idx);
                    setIdx((previous) => previous - 1);
                }}
                className="absolute top-0 bottom-0 left-0 z-10 bg-black/50 p-2 text-white transition-colors hover:bg-black/60"
            >
                <FiChevronLeft />
            </button>

            <div className="absolute inset-0 z-[5] backdrop-blur-xl">
                <AnimatePresence initial={false} custom={trend}>
                    <motion.img
                        variants={imgVariants}
                        custom={trend}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        key={currentMovie.id}
                        src={`https://image.tmdb.org/t/p/w500${currentMovie.backdrop_path}`}
                        alt={currentMovie.title}
                        style={{
                            y: "-50%",
                            x: "-50%",
                        }}
                        className="absolute top-1/2 left-1/2 mx-auto aspect-square max-h-[90%] max-w-[calc(100%_-_80px)] bg-black object-cover shadow-2xl"
                    />
                </AnimatePresence>
            </div>

            <button
                onClick={() => {
                    setPrevIdx(idx);
                    setIdx((previous) => previous + 1);
                }}
                className="absolute top-0 right-0 bottom-0 z-10 bg-black/50 p-2 text-white transition-colors hover:bg-black/60"
            >
                <FiChevronRight />
            </button>

            <AnimatePresence initial={false} custom={trend}>
                <motion.span
                    custom={trend}
                    variants={titleVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    key={currentMovie.id}
                    className="absolute bottom-4 left-10 z-20 rounded-lg bg-white/10 p-2 text-xl font-semibold text-white shadow-lg backdrop-blur-lg md:text-2xl"
                >
                    {currentMovie.title}
                </motion.span>
            </AnimatePresence>

            <AnimatePresence initial={false}>
                <motion.div
                    key={currentMovie.id + carouselMovies.length}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.5 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 z-0"
                    style={{
                        backgroundImage: `url(https://image.tmdb.org/t/p/w500${currentMovie.backdrop_path})`,
                        backgroundPosition: "center",
                        backgroundRepeat: "no-repeat",
                        backgroundSize: "cover",
                    }}
                />
            </AnimatePresence>
        </div>
    );
}

const imgVariants = {
    initial: (trend: number) => ({
        x: trend === 1 ? "200%" : "-200%",
        opacity: 0,
    }),
    animate: {
        x: "-50%",
        opacity: 1,
    },
    exit: (trend: number) => ({
        x: trend === 1 ? "-200%" : "200%",
        opacity: 0,
    }),
};

const titleVariants = {
    initial: (trend: number) => ({
        y: trend === 1 ? 20 : -20,
        opacity: 0,
    }),
    animate: {
        y: 0,
        opacity: 1,
    },
    exit: (trend: number) => ({
        y: trend === 1 ? -20 : 20,
        opacity: 0,
    }),
};