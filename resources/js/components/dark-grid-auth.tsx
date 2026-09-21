import React, { ReactNode } from "react";
import { FiArrowLeft } from "react-icons/fi";
import { motion } from "motion/react";
import { twMerge } from "tailwind-merge";
import { Link } from "@inertiajs/react";
import { home, register } from "@/routes";
import DrawOutlineButton from "./draw-outline-button";

type DarkGridAuthProps = {
    children: ReactNode;
};

export const DarkGridAuth = ({ children }: DarkGridAuthProps) => {
    return (
        <div className="relative min-h-screen overflow-hidden bg-zinc-950 py-20 text-zinc-200 selection:bg-zinc-600">
            
            <div className="absolute right-6 top-6 z-50 mt-6 px-4">
                <Link href={home()}>
                    <DrawOutlineButton className="flex items-center justify-center gap-2 text-md">
                        <FiArrowLeft />
                        <span>Go back</span>
                    </DrawOutlineButton>
                </Link>
            </div>
            <motion.div
                initial={{
                    opacity: 0,
                    y: 25,
                }}
                animate={{
                    opacity: 1,
                    y: 0,
                }}
                transition={{
                    duration: 1.25,
                    ease: "easeInOut",
                }}
                className="relative z-10 mx-auto flex min-h-[calc(100vh-10rem)] w-full max-w-xl flex-col justify-center p-4"
            >
                <Heading />

                {children}
                <Terms />
            </motion.div>
            <CornerGrid />
        </div>
    );
};

const Heading = () => (
    <div>
        <NavLogo />
        <div className="mb-9 mt-6 space-y-1.5">
            <h1 className="text-2xl font-semibold">Sign in to your account</h1>
            <p className="text-zinc-400">
                Don't have an account?{" "}
                <Link href={register()} className="text-blue-400">
                    Create one.
                </Link>
            </p>
        </div>
    </div>
);

// const SocialOptions = () => (
//     <div>
//         <div className="mb-3 flex gap-3">
//             <BubbleButton className="flex w-full justify-center py-3">
//                 <SiTwitter />
//             </BubbleButton>
//             <BubbleButton className="flex w-full justify-center py-3">
//                 <SiGithub />
//             </BubbleButton>
//         </div>
//         <BubbleButton className="flex w-full justify-center py-3">
//             Sign in with SSO
//         </BubbleButton>
//     </div>
// );

const Or = () => {
    return (
        <div className="my-6 flex items-center gap-3">
            <div className="h-[1px] w-full bg-zinc-700" />
            <span className="text-zinc-400">OR</span>
            <div className="h-[1px] w-full bg-zinc-700" />
        </div>
    );
};

const Email = () => {
    return (
        <form onSubmit={(e) => e.preventDefault()}>
            <div className="mb-3">
                <label
                    htmlFor="email-input"
                    className="mb-1.5 block text-zinc-400"
                >
                    Email
                </label>
                <input
                    id="email-input"
                    type="email"
                    placeholder="your.email@provider.com"
                    className="w-full rounded-md border border-zinc-700 bg-zinc-900 px-3 py-2 placeholder-zinc-500 ring-1 ring-transparent transition-shadow focus:outline-0 focus:ring-blue-700"
                />
            </div>
            <div className="mb-6">
                <div className="mb-1.5 flex items-end justify-between">
                    <label
                        htmlFor="password-input"
                        className="block text-zinc-400"
                    >
                        Password
                    </label>
                    <a href="#" className="text-sm text-blue-400">
                        Forgot?
                    </a>
                </div>
                <input
                    id="password-input"
                    type="password"
                    placeholder="••••••••••••"
                    className="w-full rounded-md border border-zinc-700 bg-zinc-900 px-3 py-2 placeholder-zinc-500 ring-1 ring-transparent transition-shadow focus:outline-0 focus:ring-blue-700"
                />
            </div>
            <SplashButton type="submit" className="w-full">
                Sign in
            </SplashButton>
        </form>
    );
};

const Terms = () => (
    <p className="mt-9 text-xs text-zinc-400">
        By signing in, you agree to our{" "}
        <a href="#" className="text-blue-400">
            Terms & Conditions
        </a>{" "}
        and{" "}
        <a href="#" className="text-blue-400">
            Privacy Policy.
        </a>
    </p>
);

const SplashButton = ({ children, className, ...rest }: ButtonProps) => {
    return (
        <button
            className={twMerge(
                "rounded-md bg-gradient-to-br from-blue-400 to-blue-700 px-4 py-2 text-lg text-zinc-50 ring-2 ring-blue-500/50 ring-offset-2 ring-offset-zinc-950 transition-all hover:scale-[1.02] hover:ring-transparent active:scale-[0.98] active:ring-blue-500/70",
                className,
            )}
            {...rest}
        >
            {children}
        </button>
    );
};

const BubbleButton = ({ children, className, ...rest }: ButtonProps) => {
    return (
        <button
            className={twMerge(
                `
        relative z-0 flex items-center gap-2 overflow-hidden whitespace-nowrap rounded-md 
        border border-zinc-700 bg-gradient-to-br from-zinc-800 to-zinc-950
        px-3 py-1.5
        text-zinc-50 transition-all duration-300
        
        before:absolute before:inset-0
        before:-z-10 before:translate-y-[200%]
        before:scale-[2.5]
        before:rounded-[100%] before:bg-zinc-100
        before:transition-transform before:duration-500
        before:content-[""]

        hover:scale-105 hover:text-zinc-900
        hover:before:translate-y-[0%]
        active:scale-100`,
                className,
            )}
            {...rest}
        >
            {children}
        </button>
    );
};

const CornerGrid = () => {
    return (
        <div
            style={{
                backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' width='32' height='32' fill='none' stroke-width='2' stroke='rgb(30 58 138 / 0.5)'%3e%3cpath d='M0 .5H31.5V32'/%3e%3c/svg%3e")`,
            }}
            className="absolute right-0 top-0 z-0 size-[50vw]"
        >
            <div
                style={{
                    backgroundImage:
                        "radial-gradient(100% 100% at 100% 0%, rgba(9,9,11,0), rgba(9,9,11,1))",
                }}
                className="absolute inset-0"
            />
        </div>
    );
};

const NavLogo = () => {
    return (
        <img
            src="/images/movie-lover.png"
            alt="Movie Lover"
            className="h-16 w-auto"
        />
    );
};

type ButtonProps = {
    children: ReactNode;
    className?: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;
