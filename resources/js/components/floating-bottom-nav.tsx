import { router } from "@inertiajs/react";
import { motion } from "motion/react";
import {
    FiFilm,
    FiHome,
    FiSearch,
    FiTrendingUp,
    FiTv,
    FiLogOut,
    FiMessageCircle,
} from "react-icons/fi";

const FloatingBottomNav = () => {
    const openMovieAssistant = () => {
        window.dispatchEvent(new CustomEvent("open-movie-assistant"));
    };

    return (
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

            <NavItem
                label="AI"
                icon={FiMessageCircle}
                onClick={openMovieAssistant}
            />

            <NavItem
                label="Search"
                icon={FiSearch}
                onClick={() => router.get("/search")}
            />

            <NavItem
                label="Logout"
                icon={FiLogOut}
                onClick={() => router.post("/logout")}
            />
        </motion.nav>
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
