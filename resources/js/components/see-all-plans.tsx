import type { ButtonHTMLAttributes, CSSProperties, ReactNode } from "react";
import { FiCheck, FiX } from "react-icons/fi";
import { twMerge } from "tailwind-merge";
import { motion } from "motion/react";
import { Link } from "@inertiajs/react";
import { login } from "@/routes";
import DrawOutlineButton from "@/components/draw-outline-button";

export const DarkGradientPricing = () => {
    return (
        <section
            style={{
                backgroundImage:
                    "radial-gradient(100% 100% at 50% 0%, rgba(13,13,17,1), rgba(9,9,11,1))",
            }}
            className="relative min-h-screen overflow-hidden bg-zinc-950 text-zinc-200 selection:bg-zinc-600"
        >
            <div className="relative z-10 mx-auto max-w-5xl px-4 py-20 md:px-8">
                <div className="mb-12 space-y-3">
                    <h2 className="text-center text-3xl font-semibold leading-tight text-zinc-50 sm:text-4xl md:text-5xl">
                        Choose your plan
                    </h2>

                    <p className="text-center text-base text-zinc-400 md:text-lg">
                        Pick the plan that best suits how you watch.
                    </p>
                </div>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                    <PriceCard
                        tier="Basic"
                        price="£4.99/mo"
                        bestFor="Simple movie watching"
                        CTA={
                            <Link href={login()} className="block w-full">
                                <DrawOutlineButton className="w-full">
                                    Basic
                                </DrawOutlineButton>
                            </Link>
                        }
                        benefits={[
                            { text: "720p HD", checked: true },
                            { text: "Watch on 1 device", checked: true },
                            { text: "Movies and TV shows", checked: true },
                            { text: "Ad-free viewing", checked: false },
                            { text: "Downloads", checked: false },
                        ]}
                    />

                    <PriceCard
                        tier="Standard"
                        price="£9.99/mo"
                        bestFor="Our most popular plan"
                        CTA={
                            <Link href={login()} className="block w-full">
                                <DrawOutlineButton className="w-full">
                                    Standard
                                </DrawOutlineButton>
                            </Link>
                        }
                        benefits={[
                            { text: "1080p Full HD", checked: true },
                            { text: "Watch on 2 devices", checked: true },
                            { text: "Movies and TV shows", checked: true },
                            { text: "Ad-free viewing", checked: true },
                            { text: "Downloads included", checked: true },
                        ]}
                    />

                    <PriceCard
                        tier="Premium"
                        price="£14.99/mo"
                        bestFor="The ultimate experience"
                        CTA={
                            <Link href={login()} className="block w-full">
                                <DrawOutlineButton className="w-full">
                                    Premium
                                </DrawOutlineButton>
                            </Link>
                        }
                        benefits={[
                            { text: "4K Ultra HD", checked: true },
                            { text: "Watch on 4 devices", checked: true },
                            { text: "Movies and TV shows", checked: true },
                            { text: "Ad-free viewing", checked: true },
                            { text: "Downloads included", checked: true },
                        ]}
                    />
                </div>
            </div>
        </section>
    );
};

const PriceCard = ({ tier, price, bestFor, CTA, benefits }: PriceCardProps) => {
    return (
        <Card>
            <div className="flex flex-col items-center border-b border-zinc-700 pb-6">
                <span className="mb-6 inline-block text-zinc-50">{tier}</span>

                <span className="mb-3 inline-block text-4xl font-medium">
                    {price}
                </span>

                <span className="bg-gradient-to-br from-zinc-200 to-zinc-500 bg-clip-text text-center text-transparent">
                    {bestFor}
                </span>
            </div>

            <div className="space-y-4 py-9">
                {benefits.map((benefit, index) => (
                    <Benefit {...benefit} key={index} />
                ))}
            </div>

            {CTA}
        </Card>
    );
};

const Benefit = ({ text, checked }: BenefitType) => {
    return (
        <div className="flex items-center gap-3">
            {checked ? (
                <span className="grid size-5 place-content-center rounded-full bg-blue-600 text-sm text-zinc-50">
                    <FiCheck />
                </span>
            ) : (
                <span className="grid size-5 place-content-center rounded-full bg-zinc-800 text-sm text-zinc-400">
                    <FiX />
                </span>
            )}

            <span className="text-sm text-zinc-300">{text}</span>
        </div>
    );
};

const Card = ({ className, children, style = {} }: CardProps) => {
    return (
        <motion.div
            initial={{
                filter: "blur(2px)",
            }}
            whileInView={{
                filter: "blur(0px)",
            }}
            transition={{
                duration: 0.5,
                ease: "easeInOut",
                delay: 0.25,
            }}
            style={style}
            className={twMerge(
                "relative h-full w-full overflow-hidden rounded-2xl border border-zinc-700 bg-gradient-to-br from-zinc-950/50 to-zinc-900/80 p-6",
                className,
            )}
        >
            {children}
        </motion.div>
    );
};

const GhostButton = ({ children, className, ...rest }: GhostButtonProps) => {
    return (
        <button
            className={twMerge(
                "rounded-md px-4 py-2 text-lg text-zinc-100 transition-all hover:scale-[1.02] hover:bg-zinc-800 hover:text-zinc-50 active:scale-[0.98]",
                className,
            )}
            {...rest}
        >
            {children}
        </button>
    );
};

type PriceCardProps = {
    tier: string;
    price: string;
    bestFor: string;
    CTA: ReactNode;
    benefits: BenefitType[];
};

type CardProps = {
    className?: string;
    children?: ReactNode;
    style?: CSSProperties;
};

type BenefitType = {
    text: string;
    checked: boolean;
};

type GhostButtonProps = {
    children: ReactNode;
    className?: string;
} & ButtonHTMLAttributes<HTMLButtonElement>;
