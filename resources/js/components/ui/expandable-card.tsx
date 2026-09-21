import * as React from "react";
import { AnimatePresence, motion } from "motion/react";

import { cn } from "@/lib/utils";
import { Vote } from "lucide-react";

interface ExpandableCardProps {
    title: string;
    src: string;
    description: string;
    adult: boolean | null;
    name: string | null;
    release_date: string | null;
    genres: { id: number; name: string }[] | null;
    runtime: number | null;
    tagline: string | null;
    origin_country: string[] | null;
    spoken_languages: { iso_639_1: string; name: string }[] | null;
    vote_average: number | null;
    vote_count: number | null;
    production_companies: { id: number; name: string }[] | null;

    children?: React.ReactNode;
    className?: string;
    classNameExpanded?: string;
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
    hideTrigger?: boolean;
    layoutId?: string;
    [key: string]: any;
}

export function ExpandableCard({
    title,
    src,
    description,
    adult,
    name,
    release_date,
    genres,
    runtime,
    tagline,
    origin_country,
    spoken_languages,
    vote_average,
    vote_count,
    production_companies,
    children,
    className,
    classNameExpanded,
    open,
    onOpenChange,
    hideTrigger = false,
    layoutId,
    ...props
}: ExpandableCardProps) {
    const [internalActive, setInternalActive] = React.useState(false);

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
                    <div
                        className={cn(
                            "fixed inset-0 z-[100] grid place-items-center before:pointer-events-none sm:mt-16",
                        )}
                    >
                        <motion.div
                            layoutId={`card-${sharedId}`}
                            ref={cardRef}
                            className={cn(
                                "relative flex h-full w-full max-w-[850px] flex-col overflow-auto bg-zinc-50 shadow-sm [-ms-overflow-style:none] [-webkit-overflow-scrolling:touch] [scrollbar-width:none] sm:rounded-t-3xl dark:bg-zinc-950 dark:shadow-none",
                                classNameExpanded,
                            )}
                            {...props}
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

                            <div className="relative h-full before:fixed before:inset-x-0 before:bottom-0 before:z-50 before:h-[70px] before:bg-gradient-to-t before:from-zinc-50 dark:before:from-zinc-950">
                                <div className="flex h-auto items-start justify-between p-8">
                                    <div>
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

                                        <div className="space-y-2">
                                            <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-2 text-lg text-zinc-600 dark:text-zinc-400">
                                                <span>
                                                    Adult:{" "}
                                                    <strong className="text-black dark:text-white">
                                                        {adult ? "Yes" : "No"}
                                                    </strong>
                                                </span>

                                                <span>
                                                    Vote Count:{" "}
                                                    <strong className="text-black dark:text-white">
                                                        {vote_count}
                                                    </strong>
                                                </span>

                                                <span>
                                                    Vote Average:{" "}
                                                    <strong className="text-black dark:text-white">
                                                        {vote_average}
                                                    </strong>
                                                </span>

                                                <span>
                                                    Languages:{" "}
                                                    <strong className="text-black dark:text-white">
                                                        {spoken_languages
                                                            ?.map(
                                                                (lang) =>
                                                                    lang.name,
                                                            )
                                                            .join(", ")}
                                                    </strong>
                                                </span>

                                                <span>
                                                    Runtime:{" "}
                                                    <strong className="text-black dark:text-white">
                                                        {runtime} minutes
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
                                                            .join(", ")}
                                                    </strong>
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <motion.button
                                        type="button"
                                        aria-label="Close card"
                                        layoutId={`button-${sharedId}`}
                                        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-gray-200/90 bg-zinc-50 text-neutral-700 transition-colors duration-300 hover:border-gray-300/90 hover:bg-neutral-50 hover:text-black focus:outline-none dark:border-zinc-900 dark:bg-zinc-950 dark:text-white/70 dark:hover:border-zinc-800 dark:hover:bg-neutral-950 dark:hover:text-white"
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

                                <div className="relative px-6 sm:px-8">
                                    <motion.div
                                        layout
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        className="flex flex-col items-start gap-4 overflow-auto pb-10 text-base text-zinc-500 dark:text-zinc-400"
                                    >
                                        {children}
                                    </motion.div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {!hideTrigger && (
                <motion.div
                    role="dialog"
                    aria-labelledby={`card-title-${id}`}
                    aria-modal="true"
                    layoutId={`card-${sharedId}`}
                    onClick={() => setActive(true)}
                    className={cn(
                        "flex cursor-pointer flex-col items-center justify-between rounded-2xl bg-zinc-950 p-3 shadow-none",
                        className,
                    )}
                >
                    <div className="flex flex-col gap-4">
                        <motion.div layoutId={`image-${sharedId}`}>
                            <img
                                src={src}
                                alt={title}
                                className="aspect-video w-[360px] rounded-lg object-cover object-center"
                            />
                        </motion.div>

                        <div className="flex items-center justify-between">
                            <div className="flex flex-col">
                                <motion.p
                                    layoutId={`description-${description}-${sharedId}`}
                                    className="text-sm font-medium text-zinc-400 md:text-left"
                                >
                                    {description}
                                </motion.p>

                                <motion.h3
                                    layoutId={`title-${title}-${sharedId}`}
                                    className="font-semibold text-white md:text-left"
                                >
                                    {title}
                                </motion.h3>
                            </div>

                            <motion.button
                                type="button"
                                aria-label="Open card"
                                layoutId={`button-${sharedId}`}
                                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-gray-200/90 bg-zinc-950 text-white transition-colors duration-300 hover:bg-zinc-800 focus:outline-none"
                            >
                                <motion.div
                                    animate={{
                                        rotate: active ? 45 : 0,
                                    }}
                                    transition={{ duration: 0.4 }}
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="16"
                                        height="16"
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
                    </div>
                </motion.div>
            )}
        </>
    );
}

export default ExpandableCard;
