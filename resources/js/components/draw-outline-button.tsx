import type { ButtonHTMLAttributes, ReactNode } from "react";

type DrawOutlineButtonProps =
    ButtonHTMLAttributes<HTMLButtonElement> & {
        children: ReactNode;
    };

export default function DrawOutlineButton({
    children,
    className = "",
    ...rest
}: DrawOutlineButtonProps) {
    return (
        <button
            {...rest}
            className={`group relative px-4 py-2 font-medium text-slate-100 transition-colors duration-[400ms] hover:text-blue-300 ${className}`}
        >
            {children}

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
}