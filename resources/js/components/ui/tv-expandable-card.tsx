import * as React from "react";
import { AnimatePresence, motion } from "motion/react";
import { FiChevronDown } from "react-icons/fi";

import { cn } from "@/lib/utils";

type Episode = {
    id: number;
    episode_number: number;
    name: string;
    overview: string;
    runtime: number | null;
    still_path: string | null;
};

type Season = {
    id: number;
    name: string;
    season_number: number;
    episode_count: number;
};

interface TVExpandableCardProps {
    title: string;
    src: string;
    description: string;
    adult: boolean | null;
    genres: { id: number; name: string }[] | null;
    first_air_date: string | null;
    number_of_seasons: number | null;
    number_of_episodes: number | null;
    vote_average: number | null;
    vote_count: number | null;
    production_companies: { id: number; name: string }[] | null;
    spoken_languages: { iso_639_1: string; name: string }[] | null;

    seasons: Season[];
    selectedSeason: number;
    episodes: Episode[];
    onSeasonChange: (seasonNumber: number) => void;

    classNameExpanded?: string;
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
    layoutId?: string;
}

export default function TVExpandableCard({
    title,
    src,
    description,
    adult,
    genres,
    first_air_date,
    number_of_seasons,
    number_of_episodes,
    vote_average,
    vote_count,
    production_companies,
    spoken_languages,
    seasons,
    selectedSeason,
    episodes,
    onSeasonChange,
    classNameExpanded,
    open,
    onOpenChange,
    layoutId,
}: TVExpandableCardProps) {
    const [internalActive, setInternalActive] = React.useState(false);
    const [seasonMenuOpen, setSeasonMenuOpen] = React.useState(false);

    const active = open ?? internalActive;

    const setActive = (value: boolean) => {
        if (onOpenChange) {
            onOpenChange(value);
        } else {
            setInternalActive(value);
        }
    };

    const cardRef = React.useRef<HTMLDivElement>(null);
    const id = React.useId();
    const sharedId = layoutId ?? id;

    React.useEffect(() => {
        const onKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                setActive(false);
            }
        };

        const handleClickOutside = (event: MouseEvent | TouchEvent) => {
            if (
                cardRef.current &&
                !cardRef.current.contains(event.target as Node)
            ) {
                setActive(false);
            }
        };

        window.addEventListener("keydown", onKeyDown);
        document.addEventListener("mousedown", handleClickOutside);
        document.addEventListener("touchstart", handleClickOutside);

        return () => {
            window.removeEventListener("keydown", onKeyDown);
            document.removeEventListener("mousedown", handleClickOutside);
            document.removeEventListener("touchstart", handleClickOutside);
        };
    }, []);

    return (
        <>
            <AnimatePresence>
                {active && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 h-full w-full bg-black/70 backdrop-blur-sm"
                    />
                )}
            </AnimatePresence>

            <AnimatePresence>
                {active && (
                    <div className="fixed inset-0 z-[100] grid place-items-center sm:mt-16">
                        <motion.div
                            layoutId={`card-${sharedId}`}
                            ref={cardRef}
                            className={cn(
                                "relative flex h-full w-full max-w-[850px] flex-col overflow-auto bg-zinc-50 shadow-sm [-ms-overflow-style:none] [-webkit-overflow-scrolling:touch] [scrollbar-width:none] sm:rounded-t-3xl dark:bg-zinc-950 dark:shadow-none",
                                classNameExpanded,
                            )}
                        >
                            <motion.div layoutId={`image-${sharedId}`}>
                                <div className="relative before:absolute before:inset-x-0 before:bottom-[-1px] before:z-50 before:h-[70px] before:bg-gradient-to-t before:from-zinc-50 dark:before:from-zinc-950">
                                    <img
                                        src={src}
                                        alt={title}
                                        className="h-80 w-full object-cover object-center"
                                    />
                                </div>
                            </motion.div>

                            <div className="relative h-full">
                                <div className="flex h-auto items-start justify-between p-8">
                                    <div className="min-w-0 flex-1">
                                        <motion.h3
                                            layoutId={`title-${title}-${sharedId}`}
                                            className="mt-4 text-4xl font-semibold text-black dark:text-white"
                                        >
                                            {title}
                                        </motion.h3>

                                        <p className="mt-5 text-2xl font-bold text-black dark:text-white">
                                            Overview
                                        </p>

                                        <motion.p
                                            layoutId={`description-${title}-${sharedId}`}
                                            className="mt-5 text-2xl text-zinc-600 dark:text-zinc-400"
                                        >
                                            {description}
                                        </motion.p>

                                        <p className="mt-5 text-2xl font-bold text-black dark:text-white">
                                            Additional Information
                                        </p>

                                        <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-2 text-lg text-zinc-600 dark:text-zinc-400">
                                            <span>
                                                Adult:{" "}
                                                <strong className="text-black dark:text-white">
                                                    {adult ? "Yes" : "No"}
                                                </strong>
                                            </span>

                                            <span>
                                                First Air Date:{" "}
                                                <strong className="text-black dark:text-white">
                                                    {first_air_date ?? "N/A"}
                                                </strong>
                                            </span>

                                            <span>
                                                Seasons:{" "}
                                                <strong className="text-black dark:text-white">
                                                    {number_of_seasons ?? "N/A"}
                                                </strong>
                                            </span>

                                            <span>
                                                Episodes:{" "}
                                                <strong className="text-black dark:text-white">
                                                    {number_of_episodes ??
                                                        "N/A"}
                                                </strong>
                                            </span>

                                            <span>
                                                Vote Count:{" "}
                                                <strong className="text-black dark:text-white">
                                                    {vote_count ?? "N/A"}
                                                </strong>
                                            </span>

                                            <span>
                                                Vote Average:{" "}
                                                <strong className="text-black dark:text-white">
                                                    {vote_average?.toFixed(1) ??
                                                        "N/A"}
                                                </strong>
                                            </span>

                                            <span>
                                                Genres:{" "}
                                                <strong className="text-black dark:text-white">
                                                    {genres
                                                        ?.map(
                                                            (genre) =>
                                                                genre.name,
                                                        )
                                                        .join(", ") || "N/A"}
                                                </strong>
                                            </span>

                                            <span>
                                                Languages:{" "}
                                                <strong className="text-black dark:text-white">
                                                    {spoken_languages
                                                        ?.map(
                                                            (language) =>
                                                                language.name,
                                                        )
                                                        .join(", ") || "N/A"}
                                                </strong>
                                            </span>

                                            <span>
                                                Production Companies:{" "}
                                                <strong className="text-black dark:text-white">
                                                    {production_companies
                                                        ?.map(
                                                            (company) =>
                                                                company.name,
                                                        )
                                                        .join(", ") || "N/A"}
                                                </strong>
                                            </span>
                                        </div>
                                    </div>

                                    <motion.button
                                        type="button"
                                        aria-label="Close card"
                                        layoutId={`button-${sharedId}`}
                                        className="ml-6 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-gray-200/90 bg-zinc-50 text-neutral-700 transition-colors duration-300 hover:border-gray-300/90 hover:bg-neutral-50 hover:text-black focus:outline-none dark:border-zinc-900 dark:bg-zinc-950 dark:text-white/70 dark:hover:border-zinc-800 dark:hover:bg-neutral-950 dark:hover:text-white"
                                        onClick={() => setActive(false)}
                                    >
                                        <motion.div
                                            animate={{
                                                rotate: active ? 45 : 0,
                                            }}
                                            transition={{ duration: 0.4 }}
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="20"
                                                height="20"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            >
                                                <path d="M5 12h14" />
                                                <path d="M12 5v14" />
                                            </svg>
                                        </motion.div>
                                    </motion.button>
                                </div>

                                <div className="px-8 pb-12">
                                    <div className="mb-6 flex items-center justify-between">
                                        <h4 className="text-2xl font-bold text-black dark:text-white">
                                            Episodes
                                        </h4>

                                        <div className="relative">
                                            <motion.button
                                                type="button"
                                                onClick={() =>
                                                    setSeasonMenuOpen(
                                                        (previous) => !previous,
                                                    )
                                                }
                                                className="flex min-w-36 items-center justify-between gap-3 rounded-md border border-zinc-700 bg-zinc-900 px-4 py-2 text-sm font-medium text-white"
                                            >
                                                Season {selectedSeason}
                                                <motion.span
                                                    animate={{
                                                        rotate: seasonMenuOpen
                                                            ? 180
                                                            : 0,
                                                    }}
                                                >
                                                    <FiChevronDown />
                                                </motion.span>
                                            </motion.button>

                                            <AnimatePresence>
                                                {seasonMenuOpen && (
                                                    <motion.div
                                                        initial={{
                                                            opacity: 0,
                                                            scaleY: 0,
                                                        }}
                                                        animate={{
                                                            opacity: 1,
                                                            scaleY: 1,
                                                        }}
                                                        exit={{
                                                            opacity: 0,
                                                            scaleY: 0,
                                                        }}
                                                        transition={{
                                                            duration: 0.2,
                                                        }}
                                                        style={{
                                                            transformOrigin:
                                                                "top",
                                                        }}
                                                        className="absolute right-0 z-50 mt-2 max-h-60 w-48 overflow-auto rounded-lg border border-zinc-700 bg-zinc-900 p-2 shadow-xl"
                                                    >
                                                        {seasons
                                                            .filter(
                                                                (season) =>
                                                                    season.season_number >
                                                                    0,
                                                            )
                                                            .map((season) => (
                                                                <button
                                                                    key={
                                                                        season.id
                                                                    }
                                                                    type="button"
                                                                    onClick={() => {
                                                                        onSeasonChange(
                                                                            season.season_number,
                                                                        );
                                                                        setSeasonMenuOpen(
                                                                            false,
                                                                        );
                                                                    }}
                                                                    className="block w-full rounded-md px-3 py-2 text-left text-sm text-zinc-300 transition hover:bg-zinc-800 hover:text-white"
                                                                >
                                                                    {
                                                                        season.name
                                                                    }
                                                                </button>
                                                            ))}
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </div>
                                    </div>

                                    <div className="divide-y divide-zinc-200 dark:divide-zinc-800">
                                        {episodes.map((episode) => (
                                            <div
                                                key={episode.id}
                                                className="flex gap-4 py-5"
                                            >
                                                <div className="flex w-8 shrink-0 items-center justify-center text-lg font-medium text-zinc-500 dark:text-zinc-400">
                                                    {episode.episode_number}
                                                </div>

                                                {episode.still_path ? (
                                                    <img
                                                        src={`https://image.tmdb.org/t/p/w300${episode.still_path}`}
                                                        alt={episode.name}
                                                        className="h-24 w-40 shrink-0 rounded-md object-cover"
                                                    />
                                                ) : (
                                                    <div className="h-24 w-40 shrink-0 rounded-md bg-zinc-200 dark:bg-zinc-800" />
                                                )}

                                                <div className="min-w-0 flex-1">
                                                    <div className="flex items-start justify-between gap-4">
                                                        <h5 className="font-semibold text-black dark:text-white">
                                                            {episode.name}
                                                        </h5>

                                                        {episode.runtime && (
                                                            <span className="shrink-0 text-sm text-zinc-500 dark:text-zinc-400">
                                                                {
                                                                    episode.runtime
                                                                }
                                                                m
                                                            </span>
                                                        )}
                                                    </div>

                                                    <p className="mt-2 line-clamp-3 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
                                                        {episode.overview ||
                                                            "No episode overview available."}
                                                    </p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </>
    );
}
