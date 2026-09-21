import { FiDownload, FiFilm, FiMonitor, FiSmartphone } from "react-icons/fi";

export default function PlanFeatures() {
    return (
        <section className="bg-zinc-950 px-6 py-20">
            <div className="mx-auto max-w-6xl">
                <h2 className="text-center text-3xl font-bold text-zinc-50 md:text-4xl">
                    Why you'll love this plan
                </h2>

                <div className="mt-16 grid grid-cols-1 gap-x-12 gap-y-16 md:grid-cols-2">
                    <div className="text-center">
                        <div className="mx-auto flex size-14 items-center justify-center rounded-xl bg-blue-500/10">
                            <FiFilm className="text-3xl text-blue-400" />
                        </div>

                        <h3 className="mt-5 text-lg font-semibold text-zinc-50">
                            No adverts
                        </h3>

                        <p className="mx-auto mt-2 max-w-sm text-zinc-400">
                            Enjoy your movies without interruptions.
                        </p>
                    </div>

                    <div className="text-center">
                        <div className="mx-auto flex size-14 items-center justify-center rounded-xl bg-blue-500/10">
                            <FiMonitor className="text-3xl text-blue-400" />
                        </div>

                        <h3 className="mt-5 text-lg font-semibold text-zinc-50">
                            Full HD quality
                        </h3>

                        <p className="mx-auto mt-2 max-w-sm text-zinc-400">
                            Enjoy movies and TV shows in 1080p Full HD.
                        </p>
                    </div>

                    <div className="text-center">
                        <div className="mx-auto flex size-14 items-center justify-center rounded-xl bg-blue-500/10">
                            <FiSmartphone className="text-3xl text-blue-400" />
                        </div>

                        <h3 className="mt-5 text-lg font-semibold text-zinc-50">
                            Watch on 2 devices
                        </h3>

                        <p className="mx-auto mt-2 max-w-sm text-zinc-400">
                            Watch your favourite movies and shows across
                            multiple devices.
                        </p>
                    </div>

                    <div className="text-center">
                        <div className="mx-auto flex size-14 items-center justify-center rounded-xl bg-blue-500/10">
                            <FiDownload className="text-3xl text-blue-400" />
                        </div>

                        <h3 className="mt-5 text-lg font-semibold text-zinc-50">
                            Download included
                        </h3>

                        <p className="mx-auto mt-2 max-w-sm text-zinc-400">
                            Download your favourites and enjoy them wherever you
                            go.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
