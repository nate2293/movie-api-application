import {
    AnimatePresence,
    MotionValue,
    motion,
    useMotionValue,
    useSpring,
    useTransform,
} from "motion/react";
import { useEffect, useRef, useState } from "react";

/**
 * You may want to hide the scrollbar on the body element
 * of your page while using this navigation.
 * 
 * You can accomplish this using the following css:
    .no-scrollbar::-webkit-scrollbar {
        display: none;
    }
  
    .no-scrollbar {
        -ms-overflow-style: none;
        scrollbar-width: none; 
    }
  */


// Total number of lines on the side of the page
const NUM_LINES = 30;
// Position key will place the title on the Nth
// line of the sidebar
const navItems = [
    { position: 1, title: "Home" },
    { position: 8, title: "Movies" },
    { position: 20, title: "TV Shows" },
    { position: 25, title: "Watchlist" },
];

const SideStaggerNavigation = () => {
    const [isHovered, setIsHovered] = useState(false);
    const mouseY = useMotionValue(Infinity);

    return (
        <motion.nav
            onMouseMove={(e) => {
                mouseY.set(e.clientY);
                setIsHovered(true);
            }}
            onMouseLeave={() => {
                mouseY.set(Infinity);
                setIsHovered(false);
            }}
            className="fixed left-0 top-0 z-20 hidden h-screen flex-col items-end justify-between py-4 pl-8 lg:flex"
        >
            {Array.from(Array(NUM_LINES).keys()).map((i) => {
                const linkContent = navItems.find(
                    (item) => item.position === i + 1,
                );

                return (
                    <LinkLine
                        title={linkContent?.title}
                        isHovered={isHovered}
                        mouseY={mouseY}
                        key={i}
                    />
                );
            })}
        </motion.nav>
    );
};

const SPRING_OPTIONS = {
    mass: 1,
    stiffness: 200,
    damping: 15,
};

const LinkLine = ({
    mouseY,
    isHovered,
    title,
}: {
    mouseY: MotionValue;
    title: string | undefined;
    isHovered: boolean;
}) => {
    const ref = useRef<HTMLDivElement>(null);
    const distance = useTransform(mouseY, (val) => {
        const bounds = ref.current?.getBoundingClientRect();

        return val - (bounds?.y || 0) - (bounds?.height || 0) / 2;
    });

    // Styles for non-link lines
    const lineWidthRaw = useTransform(distance, [-80, 0, 80], [15, 100, 15]);
    const lineWidth = useSpring(lineWidthRaw, SPRING_OPTIONS);

    // Styles for link lines
    const linkWidth = useSpring(25, SPRING_OPTIONS);

    useEffect(() => {
        if (isHovered) {
            linkWidth.set(150);
        } else {
            linkWidth.set(25);
        }
    }, [isHovered]);

    if (title) {
        return (
            <a href="#">
                <motion.div
                    ref={ref}
                    className="group relative bg-neutral-500 transition-colors hover:bg-indigo-300"
                    style={{ width: linkWidth, height: 2 }}
                >
                    <AnimatePresence>
                        {isHovered && (
                            <motion.span
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="absolute left-0 top-0 z-10 w-full pt-2 font-bold uppercase text-neutral-500 transition-colors group-hover:text-indigo-300"
                            >
                                {title}
                            </motion.span>
                        )}
                    </AnimatePresence>
                </motion.div>
            </a>
        );
    } else {
        return (
            <motion.div
                ref={ref}
                className="relative bg-neutral-500"
                style={{ width: lineWidth, height: 2 }}
            />
        );
    }
};

export default SideStaggerNavigation;
