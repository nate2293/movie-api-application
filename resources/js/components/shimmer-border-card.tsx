import { motion } from "motion/react";
import type { ReactNode } from "react";

type ShimmerBorderCardProps = {
    children: ReactNode;
};

const ShimmerBorderCard = ({ children }: ShimmerBorderCardProps) => {
    return (
        <div className="group relative h-full w-full overflow-hidden rounded-lg bg-slate-800 p-0.5 transition-all duration-500 hover:scale-[1.01] hover:bg-slate-800/50">
            <div className="relative z-10 h-full w-full overflow-hidden rounded-[7px] bg-slate-900 transition-colors duration-500 group-hover:bg-slate-800">
                {children}
            </div>

            <motion.div
                initial={{ rotate: "0deg" }}
                animate={{ rotate: "360deg" }}
                style={{ scale: 1.75 }}
                transition={{
                    repeat: Infinity,
                    duration: 3.5,
                    ease: "linear",
                }}
                className="absolute inset-0 z-0 bg-gradient-to-br from-indigo-200 via-indigo-200/0 to-indigo-200 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            />
        </div>
    );
};

export default ShimmerBorderCard;