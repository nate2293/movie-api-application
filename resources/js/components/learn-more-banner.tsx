import type { ButtonHTMLAttributes, ReactNode } from "react";
import { FiArrowRight, FiFilm } from "react-icons/fi";
import ShimmerBorderCard from "@/components/shimmer-border-card";
import { learnMore } from "@/routes";
import { Link } from "@inertiajs/react";

type DrawOutlineButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    children: ReactNode;
};

const DrawOutlineButton = ({ children, ...rest }: DrawOutlineButtonProps) => {
    return (
        <button
            {...rest}
            className="group relative flex items-center gap-2 px-5 py-3 font-medium text-slate-100 transition-colors duration-[400ms] hover:text-blue-300"
        >
            <span>{children}</span>

            <FiArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />

            {/* TOP */}
            <span className="absolute top-0 left-0 h-[2px] w-0 bg-blue-400 transition-all duration-100 group-hover:w-full" />

            {/* RIGHT */}
            <span className="absolute top-0 right-0 h-0 w-[2px] bg-blue-400 transition-all delay-100 duration-100 group-hover:h-full" />

            {/* BOTTOM */}
            <span className="absolute right-0 bottom-0 h-[2px] w-0 bg-blue-400 transition-all delay-200 duration-100 group-hover:w-full" />

            {/* LEFT */}
            <span className="absolute bottom-0 left-0 h-0 w-[2px] bg-blue-400 transition-all delay-300 duration-100 group-hover:h-full" />
        </button>
    );
};

export default function LearnMoreBanner() {
    return (
        <section className="bg-zinc-950 px-6 py-10">
            <div className="mx-auto max-w-7xl">
                <ShimmerBorderCard>
                    <div className="flex flex-col gap-6 bg-gradient-to-r from-blue-950/80 via-indigo-950/70 to-zinc-950 px-6 py-6 sm:px-8 md:flex-row md:items-center">
                        {/* ICON */}
                        <div className="flex size-16 shrink-0 items-center justify-center rounded-full bg-blue-500/10 text-blue-400">
                            <FiFilm className="text-3xl" />
                        </div>

                        {/* TEXT */}
                        <div className="flex-1">
                            <h2 className="text-xl font-bold text-white md:text-2xl">
                                Try Standard with adverts today.
                            </h2>

                            <p className="mt-1 text-sm text-zinc-400 md:text-base">
                                Change or cancel your plan at any time.
                            </p>
                        </div>

                        {/* BUTTON */}
                        {/* <div className="shrink-0">
                            <DrawOutlineButton>
                                
                            </DrawOutlineButton>
                        </div> */}

                        <div className="shrink-0">
                            <Link href="/see-all-plans">
                                <DrawOutlineButton className="flex items-center gap-2">
                                    Explore all plans
                                </DrawOutlineButton>
                            </Link>
                        </div>
                    </div>
                </ShimmerBorderCard>
            </div>
        </section>
    );
}
