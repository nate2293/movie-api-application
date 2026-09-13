import { Link } from "@inertiajs/react";
import { motion, type Transition } from "motion/react";
import { FiArrowRight } from "react-icons/fi";
import { twMerge } from "tailwind-merge";
import { login } from "@/routes";
import React, {
    useEffect,
    useState,
    type ReactNode,
    type ButtonHTMLAttributes,
} from "react";
import DrawOutlineButton from "@/components/draw-outline-button";

export const DarkGridHero = () => {
    return (
            <section className="relative min-h-screen overflow-hidden bg-zinc-950">
                <div className="absolute top-6 left-6 z-30">
                    <img
                        src="/images/movie-lover.png"
                        alt="Movie Lover"
                        className="h-25 w-auto sm:h-16 md:h-20 lg:h-24"
                    />
                </div>

                
            <Content />
            <Beams />
        </section>
    );
};

const Content = () => {
    return (
        <div className="relative z-20 mx-auto flex min-h-screen max-w-6xl flex-col items-center justify-center px-4 md:px-8">
            <motion.div
                initial={{
                    y: 25,
                    opacity: 0,
                }}
                animate={{
                    y: 0,
                    opacity: 1,
                }}
                transition={{
                    duration: 1.25,
                    ease: "easeInOut",
                }}
                className="relative"
            >
                <DrawOutlineButton>Movie Lover 🎉</DrawOutlineButton>
            </motion.div>

            <motion.h1
                initial={{
                    y: 25,
                    opacity: 0,
                }}
                animate={{
                    y: 0,
                    opacity: 1,
                }}
                transition={{
                    duration: 1.25,
                    delay: 0.25,
                    ease: "easeInOut",
                }}
                className="mb-3 text-center text-3xl font-bold leading-tight text-zinc-50 sm:text-4xl sm:leading-tight md:text-5xl md:leading-tight lg:text-7xl lg:leading-tight"
            >
                Unlimited films, series and more
            </motion.h1>

            <motion.p
                initial={{
                    y: 25,
                    opacity: 0,
                }}
                animate={{
                    y: 0,
                    opacity: 1,
                }}
                transition={{
                    duration: 1.25,
                    delay: 0.5,
                    ease: "easeInOut",
                }}
                className="mb-9 max-w-2xl text-center text-base leading-relaxed text-zinc-400 sm:text-lg md:text-lg md:leading-relaxed"
            >
                Starts at just $9.99/month. Cancel at any time.
            </motion.p>

            <motion.div
                initial={{
                    y: 25,
                    opacity: 0,
                }}
                animate={{
                    y: 0,
                    opacity: 1,
                }}
                transition={{
                    duration: 1.25,
                    delay: 0.75,
                    ease: "easeInOut",
                }}
                className="flex flex-col items-center gap-6 sm:flex-row"
            >
                <Link href={login()}>
                    <DrawOutlineButton className="flex items-center gap-2">
                        Sign In
                        <FiArrowRight />
                    </DrawOutlineButton>
                </Link>

                {/* <DrawOutlineButton className="flex items-center gap-2">
                    Learn more
                    <FiArrowRight />
                </DrawOutlineButton> */}
            </motion.div>
        </div>
    );
};

type GlowingChipProps = {
    children: ReactNode;
};

const GlowingChip = ({ children }: GlowingChipProps) => {
    return (
        <span className="relative z-10 mb-4 inline-block rounded-full border border-zinc-700 bg-zinc-900/20 px-3 py-1.5 text-xs text-zinc-50 md:mb-0">
            {children}

            <span className="absolute right-3 bottom-0 left-3 h-[1px] bg-gradient-to-r from-zinc-500/0 via-zinc-300 to-zinc-500/0" />
        </span>
    );
};

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    children: ReactNode;
    className?: string;
};

const GhostButton = ({ children, className, ...rest }: ButtonProps) => {
    return (
        <button
            className={twMerge(
                "rounded-md px-4 py-2 text-zinc-100 transition-all hover:scale-[1.02] hover:bg-zinc-800 hover:text-zinc-50 active:scale-[0.98]",
                className,
            )}
            {...rest}
        >
            {children}
        </button>
    );
};

export const Beams = () => {
    const { width } = useWindowSize();

    const numColumns = width ? Math.floor(width / GRID_BOX_SIZE) : 0;

    const placements = [
        {
            top: GRID_BOX_SIZE * 0,
            left: Math.floor(numColumns * 0.05) * GRID_BOX_SIZE,
            transition: {
                duration: 3.5,
                repeatDelay: 5,
                delay: 2,
            },
        },
        {
            top: GRID_BOX_SIZE * 12,
            left: Math.floor(numColumns * 0.15) * GRID_BOX_SIZE,
            transition: {
                duration: 3.5,
                repeatDelay: 10,
                delay: 4,
            },
        },
        {
            top: GRID_BOX_SIZE * 3,
            left: Math.floor(numColumns * 0.25) * GRID_BOX_SIZE,
        },
        {
            top: GRID_BOX_SIZE * 9,
            left: Math.floor(numColumns * 0.75) * GRID_BOX_SIZE,
            transition: {
                duration: 2,
                repeatDelay: 7.5,
                delay: 3.5,
            },
        },
        {
            top: 0,
            left: Math.floor(numColumns * 0.7) * GRID_BOX_SIZE,
            transition: {
                duration: 3,
                repeatDelay: 2,
                delay: 1,
            },
        },
        {
            top: GRID_BOX_SIZE * 2,
            left: Math.floor(numColumns * 1) * GRID_BOX_SIZE - GRID_BOX_SIZE,
            transition: {
                duration: 5,
                repeatDelay: 5,
                delay: 5,
            },
        },
    ];

    return (
        <>
            {placements.map((p, i) => (
                <Beam
                    key={i}
                    top={p.top}
                    left={p.left - BEAM_WIDTH_OFFSET}
                    transition={p.transition || {}}
                />
            ))}
        </>
    );
};

type WindowSize = {
    width: number | undefined;
    height: number | undefined;
};

const useWindowSize = () => {
    const [windowSize, setWindowSize] = useState<WindowSize>({
        width: undefined,
        height: undefined,
    });

    useEffect(() => {
        const handleResize = () =>
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight,
            });

        window.addEventListener("resize", handleResize);

        handleResize();

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    return windowSize;
};

type BeamProps = {
    top: number;
    left: number;
    transition?: Transition;
};

const Beam = ({ top, left, transition = {} }: BeamProps) => {
    return (
        <motion.div
            initial={{
                y: 0,
                opacity: 0,
            }}
            animate={{
                opacity: [0, 1, 0],
                y: 32 * 8,
            }}
            transition={{
                ease: "easeInOut",
                duration: 3,
                repeat: Infinity,
                repeatDelay: 1.5,
                ...transition,
            }}
            style={{
                top,
                left,
            }}
            className="absolute z-10 h-[64px] w-[1px] bg-gradient-to-b from-blue-500/0 to-blue-500"
        />
    );
};

const GRID_BOX_SIZE = 32;

const BEAM_WIDTH_OFFSET = 1;
