import { useEffect, useState } from "react";

import ShimmerBorderCard from "@/components/shimmer-border-card";
import TVExpandableCard from "@/components/ui/tv-expandable-card";

type TVShow = {
    id: number;
    name: string;
    overview: string;
    backdrop_path: string | null;
    vote_average: number;
    first_air_date: string;
};

type Season = {
    id: number;
    name: string;
    season_number: number;
    episode_count: number;
};

type TVDetails = TVShow & {
    adult: boolean | null;
    genres: { id: number; name: string }[] | null;
    episode_run_time: number[] | null;
    tagline: string | null;
    origin_country: string[] | null;
    spoken_languages: { iso_639_1: string; name: string }[] | null;
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

type TVGridProps = {
    shows: TVShow[];
};

export default function TVGrid({ shows }: TVGridProps) {
    const show = shows[0];

    const [showDetails, setShowDetails] = useState<TVDetails | null>(null);

    const [selectedTV, setSelectedTV] = useState<TVDetails | null>(null);

    const [seasonDetails, setSeasonDetails] = useState<SeasonDetails | null>(
        null,
    );

    const [selectedSeason, setSelectedSeason] = useState(1);

    useEffect(() => {
        if (!show) {
            return;
        }

        const loadShowDetails = async () => {
            const response = await fetch(`/tv/${show.id}`);
            const details: TVDetails = await response.json();

            setShowDetails(details);
        };

        loadShowDetails();
    }, [show?.id]);

    if (!show) {
        return null;
    }

    const openTV = async () => {
        let details = showDetails;

        if (!details) {
            const response = await fetch(`/tv/${show.id}`);
            details = await response.json();
        }

        const firstSeason =
            details?.seasons?.find((season) => season.season_number > 0)
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

    const releaseYear = show.first_air_date
        ? new Date(show.first_air_date).getFullYear()
        : null;

    const rating = show.vote_average
        ? `${Math.round(show.vote_average * 10)}% Rating`
        : null;

    const genre = showDetails?.genres?.[0]?.name;

    return (
        <section className="relative z-20 px-6 pb-12">
            <div className="mx-auto w-[95%]">
                <ShimmerBorderCard>
                    <div className="relative aspect-[4/3] w-full overflow-hidden sm:aspect-video lg:aspect-[16/7]">
                        {show.backdrop_path && (
                            <img
                                src={`https://image.tmdb.org/t/p/original${show.backdrop_path}`}
                                alt={show.name}
                                className="h-full w-full object-cover"
                            />
                        )}

                        {/* Dark gradient */}
                        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/40 to-transparent" />

                        {/* Series information */}
                        <div className="absolute inset-x-4 bottom-4 z-10 sm:inset-x-auto sm:bottom-8 sm:left-8 sm:max-w-xl md:bottom-10 md:left-10">
                            <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-zinc-300 sm:text-sm">
                                Trending Series
                            </p>

                            <h1 className="text-2xl font-bold text-white sm:text-4xl lg:text-5xl">
                                {show.name}
                            </h1>

                            <div className="mt-3 flex flex-wrap items-center gap-2 text-xs font-medium text-zinc-200 sm:text-sm">
                                {rating && (
                                    <span className="text-green-400">
                                        {rating}
                                    </span>
                                )}

                                {releaseYear && (
                                    <>
                                        <span>•</span>
                                        <span>{releaseYear}</span>
                                    </>
                                )}

                                {showDetails?.number_of_seasons && (
                                    <>
                                        <span>•</span>

                                        <span>
                                            {showDetails.number_of_seasons}{" "}
                                            {showDetails.number_of_seasons === 1
                                                ? "Season"
                                                : "Seasons"}
                                        </span>
                                    </>
                                )}

                                {genre && (
                                    <>
                                        <span>•</span>
                                        <span>{genre}</span>
                                    </>
                                )}
                            </div>

                            <p className="mt-4 hidden max-w-lg text-sm leading-relaxed text-zinc-200 sm:line-clamp-3 sm:block lg:text-base">
                                {show.overview}
                            </p>

                            <div className="mt-5">
                                <button
                                    type="button"
                                    onClick={openTV}
                                    aria-label={`More information about ${show.name}`}
                                    className="rounded-full border border-white/40 bg-black/30 px-5 py-2.5 text-sm font-medium text-white backdrop-blur-sm transition hover:border-white hover:bg-black/50"
                                >
                                    More Info
                                </button>
                            </div>
                        </div>
                    </div>
                </ShimmerBorderCard>
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
