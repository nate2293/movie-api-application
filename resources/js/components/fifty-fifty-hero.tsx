import {
    animate,
    useMotionTemplate,
    useMotionValue,
    motion,
    MotionConfig,
} from "motion/react";
import React, {
    Dispatch,
    SetStateAction,
    useState,
    useEffect,
    MouseEventHandler,
} from "react";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";
import { SiShopify } from "react-icons/si";
import { twMerge } from "tailwind-merge";

export const FiftyFiftyHero = () => {
    return (
        <section className="grid min-h-screen w-full grid-cols-12 bg-neutral-900 text-neutral-50">
            {" "}
            <Left />
            <Right />
        </section>
    );
};

const Left = () => (
    <div className="col-span-12 flex flex-col justify-between border-r border-neutral-700 md:col-span-6">
        <div className="px-6 py-20 md:px-12 md:py-24">
            <h1 className="text-4xl uppercase leading-tight md:text-5xl md:leading-tight">
                <span className="text-emerald-300">Zero stress </span>
                funnels for Ecommerce
            </h1>
        </div>
        <BeamInput />
    </div>
);

/**
   IMPORTANT!!

   This component requires the following class for cross browser masking support

  .mask-with-browser-support {
    mask:
      linear-gradient(#fff 0 0) padding-box,
      linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
  }
   */

const BeamInput = () => {
    const turn = useMotionValue(0);

    useEffect(() => {
        animate(turn, 1, {
            ease: "linear",
            duration: 5,
            repeat: Infinity,
        });
    }, []);

    const backgroundImage = useMotionTemplate`conic-gradient(from ${turn}turn, #6EE7B700 75%, #6EE7B7 100%)`;

    return (
        <form
            onSubmit={(e) => {
                e.preventDefault();
            }}
            className="relative z-30 flex w-full items-center gap-2 border-t border-neutral-700 bg-neutral-950 py-1.5 pl-6 pr-1.5"
        >
            <input
                type="email"
                placeholder="Enter your email for a launch discount 🚀"
                className="w-full bg-transparent text-sm text-white placeholder-neutral-500 focus:outline-0"
            />

            <button
                onClick={(e) => e.stopPropagation()}
                type="submit"
                className="group flex shrink-0 items-center gap-1.5 bg-emerald-300 px-4 py-3 text-sm font-medium text-neutral-900 transition-transform active:scale-[0.985]"
            >
                <span>Join Waitlist</span>
                <FiArrowRight className="-mr-4 opacity-0 transition-all group-hover:-mr-0 group-hover:opacity-100" />
            </button>

            <div className="pointer-events-none absolute inset-0 z-10">
                <motion.div
                    style={{
                        backgroundImage,
                    }}
                    className="mask-with-browser-support absolute -inset-[1px] border border-transparent bg-origin-border"
                />
            </div>
        </form>
    );
};

const Right = () => {
    const [idx, setIdx] = useState(0);

    return (
        <div className="col-span-12 flex flex-col justify-between md:col-span-6">
            <div className="relative h-[276px] overflow-hidden md:h-[372px]">
                {CONTENT.map((c, itemIdx) => {
                    return (
                        <motion.div
                            initial={false}
                            animate={{
                                opacity: idx === itemIdx ? 1 : 0,
                                y: idx === itemIdx ? 0 : 24,
                                filter:
                                    idx === itemIdx ? "blur(0px)" : "blur(2px)",
                            }}
                            transition={{
                                ease: "easeInOut",
                                duration: 0.3,
                            }}
                            style={{
                                pointerEvents: idx === itemIdx ? "all" : "none",
                            }}
                            className="absolute inset-0 z-10 grid place-content-center space-y-3 px-6 text-base font-light leading-relaxed text-neutral-400 md:px-12 md:text-lg"
                            key={itemIdx}
                        >
                            {c.content}
                        </motion.div>
                    );
                })}

                <span className="pointer-events-none absolute -right-0 bottom-0 z-0 text-7xl text-neutral-800">
                    {idx + 1}/{CONTENT.length}
                </span>
            </div>

            <Buttons idx={idx} setIdx={setIdx} />
        </div>
    );
};

const Buttons = ({
    idx,
    setIdx,
}: {
    idx: number;
    setIdx: Dispatch<SetStateAction<number>>;
}) => {
    return (
        <div className="relative grid h-[57px] grid-cols-2 border-t border-neutral-700">
            <ShiftButton
                onClick={() => {
                    setIdx((pv) => {
                        if (pv === 0) {
                            return CONTENT.length - 1;
                        } else {
                            return pv - 1;
                        }
                    });
                }}
                topDivClasses="bg-neutral-900"
                bottomDivClasses="bg-neutral-950"
            >
                <FiArrowLeft className="mx-auto text-xl" />
            </ShiftButton>
            <ShiftButton
                topDivClasses="bg-neutral-900"
                btnClasses="border-neutral-700 border-l"
                bottomDivClasses="bg-neutral-950"
                onClick={() => {
                    setIdx((pv) => {
                        if (pv === CONTENT.length - 1) {
                            return 0;
                        } else {
                            return pv + 1;
                        }
                    });
                }}
            >
                <FiArrowRight className="mx-auto text-xl" />
            </ShiftButton>

            <motion.span
                key={idx}
                initial={{
                    width: "0%",
                }}
                animate={{
                    width: "100%",
                }}
                transition={{
                    duration: 12,
                    ease: "linear",
                }}
                onAnimationComplete={() => {
                    setIdx((pv) => {
                        if (pv === CONTENT.length - 1) {
                            return 0;
                        } else {
                            return pv + 1;
                        }
                    });
                }}
                className="pointer-events-none absolute -top-[1px] bottom-0 z-20 bg-neutral-600/10"
            />
        </div>
    );
};

const ShiftButton = ({
    onClick,
    children,
    btnClasses,
    topDivClasses,
    bottomDivClasses,
}: {
    onClick?: MouseEventHandler<HTMLButtonElement>;
    children: React.ReactNode;
    btnClasses?: string;
    topDivClasses?: string;
    bottomDivClasses?: string;
}) => {
    return (
        <MotionConfig
            transition={{
                ease: "circOut",
                duration: 0.25,
            }}
        >
            <motion.button
                initial="initial"
                whileHover="hovered"
                className={twMerge(
                    "relative overflow-hidden transition-colors",
                    btnClasses,
                )}
                onClick={onClick}
            >
                <motion.div
                    variants={{
                        initial: {
                            y: "0%",
                        },
                        hovered: {
                            y: "-100%",
                        },
                    }}
                    className={twMerge(
                        "grid h-full place-content-center bg-neutral-950",
                        topDivClasses,
                    )}
                >
                    {children}
                </motion.div>
                <motion.div
                    variants={{
                        initial: {
                            y: "100%",
                        },
                        hovered: {
                            y: "0%",
                        },
                    }}
                    className={twMerge(
                        "absolute inset-0 grid h-full place-content-center",
                        bottomDivClasses,
                    )}
                >
                    {children}
                </motion.div>
            </motion.button>
        </MotionConfig>
    );
};

const CONTENT = [
    {
        content: (
            <>
                <p>
                    <span className="text-white">Hey, we're ABC 👋</span>{" "}
                    <a href="#" className="text-emerald-300 hover:underline">
                        We do XYZ{" "}
                    </a>
                    for small ecomm businesses.
                </p>
            </>
        ),
    },
    {
        content: (
            <>
                <p>
                    We're working on building out our{" "}
                    <span className="text-white">revolutionary</span> new
                    platform.
                </p>
                <p>
                    We'd love to hear from you to make sure what we're building
                    will fix your problems.
                </p>
            </>
        ),
    },
    {
        content: (
            <>
                <p>
                    We integrate directly with{" "}
                    <span className="text-white">Shopify</span>{" "}
                    <SiShopify className="inline text-green-400" /> in a single
                    click. No crazy setup in walkthrough needed.
                </p>
            </>
        ),
    },
    {
        content: (
            <>
                <p>
                    <span className="text-white">Sound cool?</span> Join the
                    waitlist{" "}
                    <span className="hidden md:inline">to your left</span>
                    <span className="inline md:hidden">above</span> for updates
                    and a discount when we launch 🚀
                </p>
            </>
        ),
    },
];
