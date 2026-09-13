import { Link } from "@inertiajs/react";
import { FiFilm } from "react-icons/fi";
import { login, register } from "@/routes";

export default function Footer() {
    return (
        <footer className="w-full bg-zinc-950 px-6 pt-12 text-zinc-400 md:px-16 lg:px-36">
            <div className="flex w-full flex-col justify-between gap-10 border-b border-zinc-800 pb-10 md:flex-row">
                {/* LEFT */}
                <div className="md:max-w-96">
                    <div className="flex items-center gap-3">
                        {/* <div className="flex size-10 items-center justify-center rounded-lg bg-blue-500/10"> */}
                            {/* <FiFilm className="text-2xl text-blue-400" /> */}
                        {/* </div> */}

                        <span className="text-xl font-semibold text-zinc-50">
                            <img
                                src="/images/movie-lover.png"
                                alt="Movie Lover"
                                className="h-25 w-auto sm:h-16 md:h-20 lg:h-24"
                            />
                        </span>
                    </div>

                    <p className="mt-6 text-sm leading-relaxed">
                        Discover trending movies, popular TV shows and top-rated
                        titles all in one place.
                    </p>
                </div>

                {/* RIGHT */}
                <div className="flex flex-1 flex-wrap items-start gap-16 md:justify-end md:gap-24">
                    <div>
                        <h2 className="mb-5 font-semibold text-zinc-50">
                            Explore
                        </h2>

                        <ul className="space-y-3 text-sm">
                            <li>
                                <a
                                    href="#"
                                    className="transition-colors hover:text-blue-400"
                                >
                                    Movies
                                </a>
                            </li>

                            <li>
                                <a
                                    href="#"
                                    className="transition-colors hover:text-blue-400"
                                >
                                    TV Shows
                                </a>
                            </li>

                            <li>
                                <a
                                    href="#"
                                    className="transition-colors hover:text-blue-400"
                                >
                                    Trending
                                </a>
                            </li>

                            <li>
                                <a
                                    href="#"
                                    className="transition-colors hover:text-blue-400"
                                >
                                    Top Rated
                                </a>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h2 className="mb-5 font-semibold text-zinc-50">
                            Account
                        </h2>

                        <ul className="space-y-3 text-sm">
                            <li>
                                <Link
                                    href={login()}
                                    className="transition-colors hover:text-blue-400"
                                >
                                    Sign In
                                </Link>
                            </li>

                            <li>
                                <Link
                                    href={register()}
                                    className="transition-colors hover:text-blue-400"
                                >
                                    Register
                                </Link>
                            </li>

                            <li>
                                <a
                                    href="#"
                                    className="transition-colors hover:text-blue-400"
                                >
                                    Watchlist
                                </a>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h2 className="mb-5 font-semibold text-zinc-50">
                            Information
                        </h2>

                        <ul className="space-y-3 text-sm">
                            <li>
                                <a
                                    href="#"
                                    className="transition-colors hover:text-blue-400"
                                >
                                    FAQ
                                </a>
                            </li>

                            <li>
                                <a
                                    href="#"
                                    className="transition-colors hover:text-blue-400"
                                >
                                    About
                                </a>
                            </li>

                            <li>
                                <a
                                    href="#"
                                    className="transition-colors hover:text-blue-400"
                                >
                                    Privacy
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* BOTTOM */}
            <div className="flex flex-col items-center justify-between gap-3 py-5 text-sm sm:flex-row">
                <p>
                    © {new Date().getFullYear()} Movie App. All rights reserved.
                </p>

                <p className="text-zinc-500">Built for movie lovers.</p>
            </div>
        </footer>
    );
}
