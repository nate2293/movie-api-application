import { type Dispatch, type SetStateAction, useRef, useState } from "react";
import { router } from "@inertiajs/react";
import { motion } from "motion/react";

export default function SlideTabs() {
    const [position, setPosition] = useState<Position>({
        left: 0,
        width: 0,
        opacity: 0,
    });

    const [search, setSearch] = useState("");

    return (
        <ul
            onMouseLeave={() => {
                setPosition((previousPosition) => ({
                    ...previousPosition,
                    opacity: 0,
                }));
            }}
            className="relative hidden w-fit rounded-full border border-zinc-700 bg-zinc-900 p-1 md:flex"
        >
            <Tab
                setPosition={setPosition}
                onClick={() => router.get("/dashboard")}
            >
                Home
            </Tab>

            <Tab
                setPosition={setPosition}
                onClick={() => router.get("/series")}
            >
                Series
            </Tab>

            <Tab setPosition={setPosition} onClick={() => router.get("/films")}>
                Films
            </Tab>

            <Tab
                setPosition={setPosition}
                onClick={() => router.get("/new-and-popular")}
            >
                New & Popular
            </Tab>

            <Tab
                setPosition={setPosition}
                onClick={() => router.post("/logout")}
            >
                Logout
            </Tab>

            <div className="relative z-20 flex items-center px-3">
                <input
                    type="search"
                    placeholder="Search..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === "Enter" && search.trim()) {
                            window.location.href = `/search?query=${encodeURIComponent(search.trim())}`;
                        }
                    }}
                    className="w-32 bg-transparent text-sm text-white placeholder:text-zinc-500 focus:outline-none"
                />
            </div>

            <Cursor position={position} />
        </ul>
    );
}

const Tab = ({
    children,
    setPosition,
    onClick,
}: {
    children: string;
    setPosition: Dispatch<SetStateAction<Position>>;
    onClick?: () => void;
}) => {
    const ref = useRef<HTMLLIElement | null>(null);

    return (
        <li
            ref={ref}
            onMouseEnter={() => {
                if (!ref.current) {
                    return;
                }

                const { width } = ref.current.getBoundingClientRect();

                setPosition({
                    left: ref.current.offsetLeft,
                    width,
                    opacity: 1,
                });
            }}
            onClick={onClick}
            className="relative z-10 block cursor-pointer px-3 py-1.5 text-xs text-white mix-blend-difference md:px-5 md:py-3 md:text-sm"
        >
            {children}
        </li>
    );
};

const Cursor = ({ position }: { position: Position }) => {
    return (
        <motion.li
            animate={position}
            className="absolute z-0 h-7 rounded-full bg-blue-600 md:h-11"
        />
    );
};

type Position = {
    left: number;
    width: number;
    opacity: number;
};
