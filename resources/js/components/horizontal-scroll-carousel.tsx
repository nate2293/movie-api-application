import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

type Movie = {
    id: number;
    title: string;
    backdrop_path: string | null;
};

type HorizontalScrollCarouselProps = {
    movies: Movie[];
};

const HorizontalScrollCarousel = ({
    movies,
}: HorizontalScrollCarouselProps) => {
    const targetRef = useRef<HTMLDivElement | null>(null);

    const { scrollYProgress } = useScroll({
        target: targetRef,
    });

    const x = useTransform(
        scrollYProgress,
        [0, 1],
        ["1%", "-75%"]
    );

    const trendingMovies = movies
        .filter((movie) => movie.backdrop_path)
        .slice(0, 5);

    return (
        <section
            ref={targetRef}
            className="relative h-[300vh]"
        >
            <div className="sticky top-0 flex h-screen items-center overflow-hidden">
                <motion.div
                    style={{ x }}
                    className="flex gap-6 px-6"
                >
                    {trendingMovies.map((movie) => (
                        <Card
                            key={movie.id}
                            movie={movie}
                        />
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

const Card = ({ movie }: { movie: Movie }) => {
    return (
        <div className="group relative h-[450px] w-[450px] shrink-0 overflow-hidden rounded-xl">
            <div
                style={{
                    backgroundImage: `url(https://image.tmdb.org/t/p/w500${movie.backdrop_path})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                }}
                className="absolute inset-0 z-0 transition-transform duration-300 group-hover:scale-110"
            />

            <div className="absolute inset-0 z-10 grid place-content-center">
                <p className="bg-gradient-to-br from-white/20 to-white/0 p-8 text-center text-4xl font-black uppercase text-white backdrop-blur-lg">
                    {movie.title}
                </p>
            </div>
        </div>
    );
};

export default HorizontalScrollCarousel;