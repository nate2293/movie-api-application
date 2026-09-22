import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { FiMessageCircle, FiX } from "react-icons/fi";

import PromptBar from "@/components/prompt-bar";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function MovieAssistant() {
    const [isOpen, setIsOpen] = useState(false);
    const [response, setResponse] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        const openAssistant = () => {
            setIsOpen(true);
        };

        window.addEventListener("open-movie-assistant", openAssistant);

        return () => {
            window.removeEventListener("open-movie-assistant", openAssistant);
        };
    }, []);

    const askMovieAssistant = async (message: string) => {
        setLoading(true);
        setError("");

        try {
            const csrfToken = document
                .querySelector('meta[name="csrf-token"]')
                ?.getAttribute("content");

            const request = await fetch("/movie-assistant", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    "X-CSRF-TOKEN": csrfToken ?? "",
                },
                body: JSON.stringify({
                    message,
                }),
            });

            if (!request.ok) {
                throw new Error("Movie Assistant request failed.");
            }

            const data = await request.json();

            setResponse(data.message);
        } catch (error) {
            console.error(error);

            setError("Movie Assistant could not respond. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            {/* DESKTOP CLOSED BUTTON */}
            {!isOpen && (
                <motion.button
                    type="button"
                    aria-label="Open Movie Assistant"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    whileHover={{ scale: 1.08 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setIsOpen(true)}
                    className="fixed right-4 bottom-28 z-50 flex h-12 w-12 items-center justify-center rounded-full border border-indigo-300/30 bg-zinc-950 text-indigo-300 shadow-2xl shadow-indigo-500/20 backdrop-blur-md transition-colors hover:bg-zinc-900 md:right-6 md:bottom-6 md:h-14 md:w-14"
                >
                    <FiMessageCircle className="text-2xl" />
                </motion.button>
            )}

            {/* ASSISTANT */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{
                            opacity: 0,
                            y: 20,
                            scale: 0.97,
                        }}
                        animate={{
                            opacity: 1,
                            y: 0,
                            scale: 1,
                        }}
                        exit={{
                            opacity: 0,
                            y: 20,
                            scale: 0.97,
                        }}
                        transition={{
                            duration: 0.2,
                        }}
                        className="fixed right-4 bottom-24 left-4 z-[60] md:right-6 md:bottom-6 md:left-auto md:w-[620px]"
                    >
                        {/* RESPONSE PANEL */}
                        {(response || loading || error) && (
                            <div className="mb-3 overflow-hidden rounded-2xl border border-zinc-700 bg-zinc-950/95 text-white shadow-2xl backdrop-blur-md">
                                {/* HEADER */}
                                <div className="flex items-center justify-between border-b border-zinc-800 px-4 py-3">
                                    <div className="flex items-center gap-2">
                                        <FiMessageCircle className="text-indigo-300" />

                                        <p className="text-sm font-semibold text-indigo-300">
                                            Movie Assistant
                                        </p>
                                    </div>

                                    <button
                                        type="button"
                                        aria-label="Close Movie Assistant"
                                        onClick={() => setIsOpen(false)}
                                        className="flex h-8 w-8 items-center justify-center rounded-full text-zinc-400 transition hover:bg-zinc-800 hover:text-white"
                                    >
                                        <FiX size={18} />
                                    </button>
                                </div>

                                {/* RESPONSE */}
                                <div className="max-h-[400px] overflow-y-auto p-4 text-sm leading-relaxed text-zinc-200">
                                    {loading && (
                                        <p className="text-zinc-400">
                                            Movie Assistant is thinking...
                                        </p>
                                    )}

                                    {response && !loading && (
                                        <ReactMarkdown
                                            remarkPlugins={[remarkGfm]}
                                            components={{
                                                table: ({ children }) => (
                                                    <div className="my-4 overflow-x-auto">
                                                        <table className="w-full border-collapse text-left">
                                                            {children}
                                                        </table>
                                                    </div>
                                                ),

                                                th: ({ children }) => (
                                                    <th className="border-b border-zinc-700 px-3 py-2 font-semibold text-white">
                                                        {children}
                                                    </th>
                                                ),

                                                td: ({ children }) => (
                                                    <td className="border-b border-zinc-800 px-3 py-2">
                                                        {children}
                                                    </td>
                                                ),

                                                ul: ({ children }) => (
                                                    <ul className="my-3 list-disc space-y-1 pl-5">
                                                        {children}
                                                    </ul>
                                                ),

                                                ol: ({ children }) => (
                                                    <ol className="my-3 list-decimal space-y-1 pl-5">
                                                        {children}
                                                    </ol>
                                                ),

                                                p: ({ children }) => (
                                                    <p className="mb-3 last:mb-0">
                                                        {children}
                                                    </p>
                                                ),

                                                strong: ({ children }) => (
                                                    <strong className="font-semibold text-white">
                                                        {children}
                                                    </strong>
                                                ),
                                            }}
                                        >
                                            {response}
                                        </ReactMarkdown>
                                    )}

                                    {error && (
                                        <p className="text-red-400">{error}</p>
                                    )}
                                </div>
                            </div>
                        )}

                        {/* CLOSE BUTTON WHEN THERE IS NO RESPONSE YET */}
                        {!response && !loading && !error && (
                            <div className="mb-2 flex justify-end">
                                <button
                                    type="button"
                                    aria-label="Close Movie Assistant"
                                    onClick={() => setIsOpen(false)}
                                    className="flex h-9 w-9 items-center justify-center rounded-full border border-zinc-700 bg-zinc-950/95 text-zinc-400 shadow-lg backdrop-blur-md transition hover:bg-zinc-800 hover:text-white"
                                >
                                    <FiX size={18} />
                                </button>
                            </div>
                        )}

                        {/* PROMPT */}
                        <PromptBar
                            placeholder="Ask Movie Assistant anything..."
                            onSubmit={askMovieAssistant}
                        />
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
