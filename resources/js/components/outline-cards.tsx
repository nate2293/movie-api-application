import React, { MutableRefObject, useRef } from "react";
import { FiArrowRight } from "react-icons/fi";
import { motion } from "motion/react";

const CURSOR_WIDTH = 32;
const HOVER_PADDING = 24;

type Movie = {
    id: number;
    title: string;
    backdrop_path: string | null;
};

type OutlineCardsProps = {
    movies: Movie[];
};

export const OutlineCards = ({ movies }: OutlineCardsProps) => {
    const cursorRef = useRef<HTMLDivElement | null>(null);

    const handleMouseMove = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
        const el = e.target as HTMLElement;
        const cursorEl = cursorRef.current as HTMLElement;

        const isCardHover = el.classList.contains("outline-card");

        if (isCardHover) {
            const { width, height, top, left } = el.getBoundingClientRect();

            cursorEl.style.transition = "0.25s all";
            cursorEl.style.width = `${width + HOVER_PADDING}px`;
            cursorEl.style.height = `${height + HOVER_PADDING}px`;
            cursorEl.style.borderRadius = `${HOVER_PADDING / 2}px`;
            cursorEl.style.top = `${top + window.scrollY + height / 2}px`;
            cursorEl.style.left = `${left + width / 2}px`;
        } else {
            cursorEl.style.transition = "0s all";

            cursorEl.style.width = `${CURSOR_WIDTH}px`;
            cursorEl.style.height = `${CURSOR_WIDTH}px`;
            cursorEl.style.borderRadius = `${CURSOR_WIDTH}px`;
            cursorEl.style.top = `${e.clientY + window.scrollY}px`;
            cursorEl.style.left = `${e.clientX}px`;
        }
    };

    return (
        <section
            onMouseMove={handleMouseMove}
            className="relative overflow-hidden p-6"
        >
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-5">
                {movies
                    .filter((movie) => movie.backdrop_path)
                    .slice(0, 5)
                    .map((movie) => (
                        <Card
                            key={movie.id}
                            title={movie.title}
                            href="#"
                            bgUrl={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
                        />
                    ))}
            </div>

            <Cursor cursorRef={cursorRef} />
        </section>
    );
};

const Card = ({
    bgUrl,
    title,
    href,
}: {
    bgUrl: string;
    title: string;
    href: string;
}) => {
    return (
        <div className="group relative w-full overflow-hidden rounded-lg bg-slate-800 p-0.5 transition-all duration-500 hover:scale-[1.01] hover:bg-slate-800/50">
            <a
                href={href}
                style={{
                    backgroundImage: `url(${bgUrl})`,
                    backgroundPosition: "center",
                }}
                className="outline-card relative z-10 flex aspect-square w-full flex-col justify-end overflow-hidden rounded-[7px] bg-neutral-400 bg-[size:100%] transition-[background-size] duration-500 hover:bg-[size:110%]"
            >
                <div className="pointer-events-none flex items-center justify-between bg-gradient-to-t from-black to-black/0 p-6 pt-8 text-xl font-medium text-white">
                    <h3>{title}</h3>
                    <FiArrowRight />
                </div>
            </a>

            <motion.div
                initial={{ rotate: "0deg" }}
                animate={{ rotate: "360deg" }}
                style={{ scale: 1.75 }}
                transition={{
                    repeat: Infinity,
                    duration: 3.5,
                    ease: "linear",
                }}
                className="absolute inset-0 z-0 bg-gradient-to-br from-indigo-200 via-indigo-200/0 to-indigo-200 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            />
        </div>
    );
};

const Cursor = ({
    cursorRef,
}: {
    cursorRef: MutableRefObject<HTMLDivElement | null>;
}) => {
    return (
        <div
            ref={cursorRef}
            style={{
                width: 0,
                height: 0,
                borderRadius: CURSOR_WIDTH,
                top: 0,
                left: 0,
            }}
            className="hover-cursor pointer-events-none absolute -translate-x-1/2 -translate-y-1/2 border border-white"
        />
    );
};
