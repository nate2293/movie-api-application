import { router } from "@inertiajs/react";
import { motion } from "motion/react";
import { useState } from "react";
import {
    FiFilm,
    FiHome,
    FiSearch,
    FiTrendingUp,
    FiTv,
    FiX,
} from "react-icons/fi";

const FloatingBottomNav = () => {
    const [searchOpen, setSearchOpen] = useState(false);
    const [search, setSearch] = useState("");

    // const openMovieAssistant = () => {
    //     window.dispatchEvent(new CustomEvent("open-movie-assistant"));
    // };

    const submitSearch = () => {
        const query = search.trim();

        if (!query) {
            return;
        }

        window.location.href = `/search?query=${encodeURIComponent(query)}`;
    };

    return (
        <>
            {/* Mobile search bar */}
            {searchOpen && (
                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 20, opacity: 0 }}
                    className="fixed right-4 bottom-24 left-4 z-50 md:hidden"
                >
                    <div className="flex items-center gap-3 rounded-2xl border border-zinc-700 bg-zinc-950/95 px-4 py-3 shadow-2xl backdrop-blur-md">
                        <FiSearch className="shrink-0 text-xl text-zinc-400" />

                        <input
                            type="search"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                    submitSearch();
                                }
                            }}
                            placeholder="Search movies and TV..."
                            autoFocus
                            className="min-w-0 flex-1 bg-transparent text-sm text-white placeholder:text-zinc-500 focus:outline-none"
                        />

                        <button
                            type="button"
                            onClick={() => setSearchOpen(false)}
                            aria-label="Close search"
                            className="text-zinc-400 transition hover:text-white"
                        >
                            <FiX className="text-xl" />
                        </button>
                    </div>
                </motion.div>
            )}

            {/* Existing mobile navigation */}
            <motion.nav
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="fixed right-4 bottom-4 left-4 z-50 flex items-center justify-around rounded-2xl border border-zinc-700 bg-zinc-950/90 px-2 py-3 text-white shadow-2xl backdrop-blur-md md:hidden"
            >
                <NavItem
                    label="Home"
                    icon={FiHome}
                    onClick={() => router.get("/dashboard")}
                />

                <NavItem
                    label="Films"
                    icon={FiFilm}
                    onClick={() => router.get("/films")}
                />

                <NavItem
                    label="Series"
                    icon={FiTv}
                    onClick={() => router.get("/series")}
                />

                <NavItem
                    label="Popular"
                    icon={FiTrendingUp}
                    onClick={() => router.get("/new-and-popular")}
                />

                {/* <NavItem
                    label="AI"
                    icon={FiMessageCircle}
                    onClick={openMovieAssistant}
                /> */}

                <NavItem
                    label="Search"
                    icon={FiSearch}
                    onClick={() => setSearchOpen((previous) => !previous)}
                />

                {/* <NavItem
                    label="Logout"
                    icon={FiLogOut}
                    onClick={() => router.post("/logout")}
                /> */}
            </motion.nav>
        </>
    );
};

type NavItemProps = {
    label: string;
    icon: React.ElementType;
    onClick: () => void;
};

const NavItem = ({ label, icon: Icon, onClick }: NavItemProps) => {
    return (
        <button
            type="button"
            onClick={onClick}
            className="flex min-w-0 flex-1 flex-col items-center gap-1 px-1 text-zinc-400 transition hover:text-white"
        >
            <Icon className="text-xl" />

            <span className="truncate text-[10px] font-medium">{label}</span>
        </button>
    );
};

export default FloatingBottomNav;
