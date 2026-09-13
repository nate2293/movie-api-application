import { motion } from "motion/react";
import { FiArrowRight } from "react-icons/fi";

type CategoryCardProps = {
    title: string;
    imgSrc: string;
};

const CategoryCard = ({ title, imgSrc }: CategoryCardProps) => {
    return (
        <motion.div
            transition={{
                staggerChildren: 0.035,
            }}
            whileHover="hover"
            className="group relative h-full w-full cursor-pointer overflow-hidden rounded-xl bg-indigo-600"
        >
            <div
                className="absolute inset-0 saturate-100 transition-all duration-500 group-hover:scale-110 md:saturate-0 md:group-hover:saturate-100"
                style={{
                    backgroundImage: `url(${imgSrc})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                }}
            />

            <div className="relative z-20 flex h-full flex-col justify-between p-4 text-slate-300 transition-colors duration-500 group-hover:text-white">
                <FiArrowRight className="ml-auto text-2xl transition-transform duration-500 group-hover:-rotate-45" />

                <h4>
                    {title.split("").map((letter, index) => (
                        <ShiftLetter letter={letter} key={index} />
                    ))}
                </h4>
            </div>
        </motion.div>
    );
};

const ShiftLetter = ({ letter }: { letter: string }) => {
    return (
        <div className="inline-block h-[28px] overflow-hidden text-xl font-semibold">
            <motion.span
                className="flex min-w-[4px] flex-col"
                style={{
                    y: "0%",
                }}
                variants={{
                    hover: {
                        y: "-50%",
                    },
                }}
                transition={{
                    duration: 0.5,
                }}
            >
                <span>{letter}</span>
                <span>{letter}</span>
            </motion.span>
        </div>
    );
};

export default CategoryCard;
