import { useRef } from "react";

import {
    motion,
    useMotionTemplate,
    useMotionValue,
    useSpring,
    useTransform,
} from "motion/react";

const ROTATION_RANGE = 35;
const HALF_ROTATION_RANGE = ROTATION_RANGE / 2;

const PERSPECTIVE = "1500px";

type TiltShineCardProps = {
    posterPath: string;
    rank: number;
};

export default function TiltShineCard({
    posterPath,
    rank,
}: TiltShineCardProps) {
    const ref = useRef<HTMLDivElement | null>(null);

    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const xSpring = useSpring(x);
    const ySpring = useSpring(y);

    const transform = useMotionTemplate`rotateX(${xSpring}deg) rotateY(${ySpring}deg)`;

    const sheenOpacity = useTransform(
        ySpring,
        [-HALF_ROTATION_RANGE, 0, HALF_ROTATION_RANGE],
        [0.5, 0, 0.5],
    );

    const handleMouseMove = (
        e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    ) => {
        if (!ref.current) return;

        const rect = ref.current.getBoundingClientRect();

        const width = rect.width;
        const height = rect.height;

        const mouseX = (e.clientX - rect.left) * ROTATION_RANGE;
        const mouseY = (e.clientY - rect.top) * ROTATION_RANGE;

        const rX = (mouseY / height - HALF_ROTATION_RANGE) * -1;
        const rY = mouseX / width - HALF_ROTATION_RANGE;

        x.set(rX);
        y.set(rY);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <div
    style={{
        perspective: PERSPECTIVE,
    }}
    className="relative w-full overflow-visible"
>
    <motion.div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
            transform,
        }}
        className="relative"
    >
        {/* POSTER */}
        <div
            style={{
                backgroundImage: `url(https://image.tmdb.org/t/p/w500${posterPath})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
            }}
            className="relative z-10 aspect-[2/3] w-full overflow-hidden rounded-lg bg-zinc-950 shadow-2xl shadow-zinc-950"
        >
            <motion.div
                style={{
                    opacity: sheenOpacity,
                }}
                className="pointer-events-none absolute inset-0 bg-gradient-to-br from-zinc-300/50 via-zinc-300 to-zinc-300/50"
            />
        </div>

        {/* RANK NUMBER */}
        <span
            className="pointer-events-none absolute bottom-2 -left-3 z-50 text-[6rem] sm:text-[8rem] lg:text-[10rem] leading-none font-black text-black"
            style={{
                WebkitTextStroke: "1.5px white",
            }}
        >
            {rank}
        </span>
    </motion.div>
</div>
    );
}
