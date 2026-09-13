import { AnimatePresence, motion } from "motion/react";
import { type Dispatch, type SetStateAction, useState } from "react";
import { FiPlus } from "react-icons/fi";
import useMeasure from "react-use-measure";

export const TabsFAQ = () => {
    const [selected, setSelected] = useState(TABS[0]);

    return (
        <section className="relative overflow-hidden bg-zinc-950 px-4 py-16 text-zinc-50">
            <Heading />

            <Tabs selected={selected} setSelected={setSelected} />

            <Questions selected={selected} />
        </section>
    );
};

const Heading = () => {
    return (
        <>
            <div className="relative z-10 flex flex-col items-center justify-center">
                <span className="mb-4 bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text font-medium text-transparent">
                    Got questions?
                </span>

                <h2 className="mb-8 text-4xl font-bold md:text-5xl">
                    Frequently Asked Questions
                </h2>
            </div>

            <span className="absolute -top-[350px] left-[50%] z-0 h-[500px] w-[600px] -translate-x-[50%] rounded-full bg-gradient-to-r from-blue-600/20 to-indigo-600/20 blur-3xl" />
        </>
    );
};

const Tabs = ({
    selected,
    setSelected,
}: {
    selected: string;
    setSelected: Dispatch<SetStateAction<string>>;
}) => {
    return (
        <div className="relative z-10 flex flex-wrap items-center justify-center gap-4">
            {TABS.map((tab) => (
                <button
                    onClick={() => setSelected(tab)}
                    className={`relative overflow-hidden whitespace-nowrap rounded-md border-[1px] px-3 py-1.5 text-sm font-medium transition-colors duration-500 ${
                        selected === tab
                            ? "border-blue-500 text-zinc-50"
                            : "border-zinc-700 bg-transparent text-zinc-400"
                    }`}
                    key={tab}
                >
                    <span className="relative z-10">{tab}</span>

                    <AnimatePresence>
                        {selected === tab && (
                            <motion.span
                                initial={{ y: "100%" }}
                                animate={{ y: "0%" }}
                                exit={{ y: "100%" }}
                                transition={{
                                    duration: 0.5,
                                    ease: "backIn",
                                }}
                                className="absolute inset-0 z-0 bg-gradient-to-r from-blue-600 to-blue-800"
                            />
                        )}
                    </AnimatePresence>
                </button>
            ))}
        </div>
    );
};

const Questions = ({ selected }: { selected: string }) => {
    return (
        <div className="relative z-10 mx-auto mt-12 max-w-3xl">
            <AnimatePresence mode="wait">
                {Object.entries(QUESTIONS).map(([tab, questions]) => {
                    return selected === tab ? (
                        <motion.div
                            initial={{
                                opacity: 0,
                                y: 20,
                            }}
                            animate={{
                                opacity: 1,
                                y: 0,
                            }}
                            exit={{
                                opacity: 0,
                                y: 20,
                            }}
                            transition={{
                                duration: 0.5,
                                ease: "backIn",
                            }}
                            className="space-y-4"
                            key={tab}
                        >
                            {questions.map((q, idx) => (
                                <Question key={idx} {...q} />
                            ))}
                        </motion.div>
                    ) : undefined;
                })}
            </AnimatePresence>
        </div>
    );
};

const Question = ({ question, answer }: QuestionType) => {
    const [ref, { height }] = useMeasure();
    const [open, setOpen] = useState(false);

    return (
        <motion.div
            animate={open ? "open" : "closed"}
            className={`rounded-xl border-[1px] border-zinc-800 px-4 transition-colors ${
                open ? "bg-zinc-900" : "bg-zinc-950"
            }`}
        >
            <button
                onClick={() => setOpen((previous) => !previous)}
                className="flex w-full items-center justify-between gap-4 py-4"
            >
                <span
                    className={`text-left text-lg font-medium transition-colors ${
                        open ? "text-zinc-50" : "text-zinc-400"
                    }`}
                >
                    {question}
                </span>

                <motion.span
                    variants={{
                        open: {
                            rotate: "45deg",
                        },
                        closed: {
                            rotate: "0deg",
                        },
                    }}
                >
                    <FiPlus
                        className={`text-2xl transition-colors ${
                            open ? "text-blue-400" : "text-zinc-400"
                        }`}
                    />
                </motion.span>
            </button>

            <motion.div
                initial={false}
                animate={{
                    height: open ? height : "0px",
                    marginBottom: open ? "24px" : "0px",
                }}
                className="overflow-hidden text-zinc-400"
            >
                <p ref={ref}>{answer}</p>
            </motion.div>
        </motion.div>
    );
};

type QuestionType = {
    question: string;
    answer: string;
};

const TABS = ["Movies", "TV Shows", "Watchlist", "Account"];

const QUESTIONS = {
    Movies: [
        {
            question: "How do I discover new movies?",
            answer: "Browse trending, popular and top-rated movies to discover something new to watch.",
        },
        {
            question: "Where does the movie information come from?",
            answer: "Movie information is retrieved using The Movie Database (TMDB) API.",
        },
        {
            question: "Can I view trending movies?",
            answer: "Yes. The app displays currently trending movies and makes it easy to explore popular titles.",
        },
        {
            question: "Can I search for a specific movie?",
            answer: "The movie search feature allows you to search for titles and quickly find the movie you are looking for.",
        },
    ],

    "TV Shows": [
        {
            question: "Can I discover TV shows too?",
            answer: "Yes. The app includes TV content alongside movies so you can discover trending series.",
        },
        {
            question: "Can I browse trending TV shows?",
            answer: "Yes. Trending TV data is retrieved from TMDB and displayed within the application.",
        },
        {
            question: "Are movies and TV shows separated?",
            answer: "Movies and TV shows can be explored separately, making it easier to browse the type of content you want.",
        },
        {
            question: "Can I view information about a series?",
            answer: "TV show information can include details provided by TMDB such as titles, artwork and other available information.",
        },
    ],

    Watchlist: [
        {
            question: "What is the watchlist?",
            answer: "The watchlist gives you a place to keep track of movies and TV shows you want to watch later.",
        },
        {
            question: "Do I need an account?",
            answer: "An account allows features such as your watchlist to be associated with you.",
        },
        {
            question: "Can I remove something from my watchlist?",
            answer: "Yes. Titles added to your watchlist can also be removed when you no longer want to keep them.",
        },
        {
            question: "Can I add both movies and TV shows?",
            answer: "The watchlist is designed to help you keep track of content you are interested in watching.",
        },
    ],

    Account: [
        {
            question: "Why should I sign in?",
            answer: "Signing in allows the application to provide features associated with your account.",
        },
        {
            question: "How do I create an account?",
            answer: "You can register for an account using the application's registration page.",
        },
        {
            question: "Can I sign out?",
            answer: "Yes. Once signed in, you can securely sign out of your account.",
        },
        {
            question: "Is my watchlist linked to my account?",
            answer: "Account-based watchlists can keep each user's saved titles separate.",
        },
    ],
};
