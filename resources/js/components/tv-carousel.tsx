import { motion } from "motion/react";
import { useState } from "react";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";
import useMeasure from "react-use-measure";

import TVExpandableCard from "@/components/ui/tv-expandable-card";

const CARD_WIDTH = 350;
const MARGIN = 20;
const CARD_SIZE = CARD_WIDTH + MARGIN;

const BREAKPOINTS = {
    sm: 640,
    lg: 1024,
};

type TVShow = {
    id: number;
    name: string;
    backdrop_path: string | null;
    overview: string;
};

type Season = {
    id: number;
    name: string;
    season_number: number;
    episode_count: number;
};

type TVDetails = TVShow & {
    adult: boolean | null;
    first_air_date: string | null;
    genres: { id: number; name: string }[] | null;
    episode_run_time: number[] | null;
    tagline: string | null;
    origin_country: string[] | null;
    spoken_languages: { iso_639_1: string; name: string }[] | null;
    vote_average: number | null;
    vote_count: number | null;
    production_companies: { id: number; name: string }[] | null;
    number_of_seasons: number | null;
    number_of_episodes: number | null;
    seasons: Season[];
};

type Episode = {
    id: number;
    episode_number: number;
    name: string;
    overview: string;
    runtime: number | null;
    still_path: string | null;
};

type SeasonDetails = {
    id: number;
    name: string;
    season_number: number;
    episodes: Episode[];
};

type TVCarouselProps = {
    shows: TVShow[];
    title: string;
};

export default function TVCarousel({ shows, title }: TVCarouselProps) {
    const [ref, { width }] = useMeasure();
    const [offset, setOffset] = useState(0);

    const [selectedTV, setSelectedTV] = useState<TVDetails | null>(null);

    const [seasonDetails, setSeasonDetails] = useState<SeasonDetails | null>(
        null,
    );

    const [selectedSeason, setSelectedSeason] = useState(1);

    const openTV = async (show: TVShow) => {
        const response = await fetch(`/tv/${show.id}`);
        const details: TVDetails = await response.json();

        const firstSeason =
            details.seasons?.find((season) => season.season_number > 0)
                ?.season_number ?? 1;

        const seasonResponse = await fetch(
            `/tv/${show.id}/season/${firstSeason}`,
        );

        const season: SeasonDetails = await seasonResponse.json();

        setSelectedSeason(firstSeason);
        setSeasonDetails(season);
        setSelectedTV(details);
    };

    const changeSeason = async (seasonNumber: number) => {
        if (!selectedTV) {
            return;
        }

        setSelectedSeason(seasonNumber);

        const response = await fetch(
            `/tv/${selectedTV.id}/season/${seasonNumber}`,
        );

        const season: SeasonDetails = await response.json();

        setSeasonDetails(season);
    };

    const CARD_BUFFER =
        width > BREAKPOINTS.lg ? 3 : width > BREAKPOINTS.sm ? 2 : 1;

    const CAN_SHIFT_LEFT = offset < 0;

    const CAN_SHIFT_RIGHT =
        Math.abs(offset) < CARD_SIZE * (shows.length - CARD_BUFFER);

    const shiftLeft = () => {
        if (!CAN_SHIFT_LEFT) {
            return;
        }

        setOffset((previousOffset) => previousOffset + CARD_SIZE);
    };

    const shiftRight = () => {
        if (!CAN_SHIFT_RIGHT) {
            return;
        }

        setOffset((previousOffset) => previousOffset - CARD_SIZE);
    };

    return (
        <section className="py-8" ref={ref}>
            <div className="relative overflow-hidden px-6">
                <div className="w-full">
                    <div className="flex items-center justify-between">
                        <h2 className="mb-4 text-2xl font-semibold text-white">
                            {title}
                        </h2>

                        <div className="flex items-center gap-2">
                            <button
                                type="button"
                                className={`rounded-lg border border-zinc-700 bg-zinc-900 p-1.5 text-2xl text-white transition-opacity ${
                                    CAN_SHIFT_LEFT ? "" : "opacity-30"
                                }`}
                                disabled={!CAN_SHIFT_LEFT}
                                onClick={shiftLeft}
                            >
                                <FiArrowLeft />
                            </button>

                            <button
                                type="button"
                                className={`rounded-lg border border-zinc-700 bg-zinc-900 p-1.5 text-2xl text-white transition-opacity ${
                                    CAN_SHIFT_RIGHT ? "" : "opacity-30"
                                }`}
                                disabled={!CAN_SHIFT_RIGHT}
                                onClick={shiftRight}
                            >
                                <FiArrowRight />
                            </button>
                        </div>
                    </div>

                    <motion.div
                        animate={{
                            x: offset,
                        }}
                        transition={{
                            ease: "easeInOut",
                        }}
                        className="flex"
                    >
                        {shows.map((show) => (
                            <TVCard
                                key={show.id}
                                show={show}
                                onOpen={() => openTV(show)}
                            />
                        ))}
                    </motion.div>
                </div>
            </div>

            {selectedTV && selectedTV.backdrop_path && seasonDetails && (
                <TVExpandableCard
                    title={selectedTV.name}
                    description={selectedTV.overview}
                    adult={selectedTV.adult}
                    first_air_date={selectedTV.first_air_date}
                    genres={selectedTV.genres}
                    number_of_seasons={selectedTV.number_of_seasons}
                    number_of_episodes={selectedTV.number_of_episodes}
                    spoken_languages={selectedTV.spoken_languages}
                    vote_average={selectedTV.vote_average}
                    vote_count={selectedTV.vote_count}
                    production_companies={selectedTV.production_companies}
                    seasons={selectedTV.seasons ?? []}
                    selectedSeason={selectedSeason}
                    episodes={seasonDetails.episodes ?? []}
                    onSeasonChange={changeSeason}
                    src={`https://image.tmdb.org/t/p/original${selectedTV.backdrop_path}`}
                    layoutId={selectedTV.id.toString()}
                    open={true}
                    onOpenChange={(open) => {
                        if (!open) {
                            setSelectedTV(null);
                            setSeasonDetails(null);
                        }
                    }}
                />
            )}
        </section>
    );
}

const TVCard = ({ show, onOpen }: { show: TVShow; onOpen: () => void }) => {
    if (!show.backdrop_path) {
        return null;
    }

    return (
        <motion.div
            layoutId={`card-${show.id}`}
            className="relative shrink-0 cursor-pointer transition-transform duration-300 hover:-translate-y-1"
            style={{
                width: CARD_WIDTH,
                marginRight: MARGIN,
            }}
        >
            <motion.img
                layoutId={`image-${show.id}`}
                src={`https://image.tmdb.org/t/p/w780${show.backdrop_path}`}
                alt={show.name}
                className="aspect-video w-full rounded-lg object-cover"
            />

            <motion.button
                layoutId={`button-${show.id}`}
                type="button"
                onClick={onOpen}
                aria-label={`More information about ${show.name}`}
                className="absolute right-3 bottom-3 flex h-8 w-8 items-center justify-center rounded-full border border-white/40 bg-black/20 text-lg font-light text-white backdrop-blur-sm transition hover:border-white hover:bg-black/40"
            >
                +
            </motion.button>
        </motion.div>
    );
};
