import { ExpandableCard } from "@/components/ui/expandable-card";

type Movie = {
    id: number;
    title: string;
    backdrop_path: string | null;
};

type MovieCardGridProps = {
    movies: Movie[];
};

export default function MovieCardGrid({ movies }: MovieCardGridProps) {
    const movie = movies[0];
    return (
        <section className="relative z-20 px-6 py-8">
            <h2 className="mb-4 text-xl font-semibold text-white">
                Trending Movies ({movies.length})
            </h2>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {movies.map(
                    (movie) =>
                        movie.backdrop_path && (
                            <ExpandableCard
                                key={movie.id}
                                title={movie.title}
                                src={`https://image.tmdb.org/t/p/w780${movie.backdrop_path}`}
                                description="Trending Movie"
                                className="w-fit bg-zinc-950"
                            >
                                <p>{movie.title}</p>
                            </ExpandableCard>
                        ),
                )}
            </div>
        </section>
    );
}
