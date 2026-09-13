import CategoryCard from "@/components/category-card";
import ShimmerBorderCard from "@/components/shimmer-border-card";
import RoundedSlideButton from "@/components/rounded-slide-button";

type MovieDashboardGridProps = {
    trendingMovies: any[];
    trendingTV: any[];
    topRatedMovies: any[];
};

const MovieDashboardGrid = ({
    trendingMovies,
    trendingTV,
    topRatedMovies,
}: MovieDashboardGridProps) => {
    return (
        <div className="movie-dashboard-grid">
            <div className="lg:col-span-5 lg:row-span-4 lg:col-start-1 lg:row-start-1">
    <ShimmerBorderCard>
        <div className="relative">
            <img
                src={`https://image.tmdb.org/t/p/w500${topRatedMovies[0].backdrop_path}`}
                alt={topRatedMovies[0].title}
                className="w-full"
            />

            <div className="absolute top-4 left-4 z-20">
                <RoundedSlideButton />
            </div>
        </div>
    </ShimmerBorderCard>
</div>
            <div className="lg:col-span-2 lg:row-span-1 lg:col-start-6 lg:row-start-1">
                <CategoryCard
                    title="Action"
                    imgSrc="https://images.unsplash.com/photo-1506157786151-b8491531f063"
                />
            </div>

            <div className="lg:col-span-2 lg:row-span-1 lg:col-start-8 lg:row-start-1">
                <CategoryCard
                    title="Comedy"
                    imgSrc="https://images.unsplash.com/photo-1470225620780-dba8ba36b745"
                />
            </div>

            <div className="lg:col-span-2 lg:row-span-1 lg:col-start-6 lg:row-start-2">
                <CategoryCard
                    title="Fantasy"
                    imgSrc="https://images.unsplash.com/photo-1516450137517-162bfbeb8dba"
                />
            </div>

            <div className="lg:col-span-2 lg:row-span-1 lg:col-start-8 lg:row-start-2">
                <CategoryCard
                    title="Thriller"
                    imgSrc="https://images.unsplash.com/photo-1576328077645-2dd68934d2b7"
                />
            </div>

            <div className="lg:col-span-2 lg:row-span-1 lg:col-start-6 lg:row-start-3">
                <CategoryCard
                    title="Romance"
                    imgSrc="https://images.unsplash.com/photo-1506157786151-b8491531f063"
                />
            </div>

            <div className="lg:col-span-2 lg:row-span-1 lg:col-start-8 lg:row-start-3">
                <CategoryCard
                    title="Horror"
                    imgSrc="https://images.unsplash.com/photo-1470225620780-dba8ba36b745"
                />
            </div>

            <div className="lg:col-span-2 lg:row-span-1 lg:col-start-6 lg:row-start-4">
                <CategoryCard
                    title="Animation"
                    imgSrc="https://images.unsplash.com/photo-1516450137517-162bfbeb8dba"
                />
            </div>

            <div className="lg:col-span-2 lg:row-span-1 lg:col-start-8 lg:row-start-4">
                <CategoryCard
                    title="Drama"
                    imgSrc="https://images.unsplash.com/photo-1576328077645-2dd68934d2b7"
                />
            </div>

            <div className="lg:col-span-4 lg:row-span-4 lg:col-start-1 lg:row-start-5">
                <ShimmerBorderCard>
                    <div className="h-full w-full">11</div>
                </ShimmerBorderCard>
            </div>

            <div className="grid min-h-0 grid-cols-2 gap-4 lg:col-span-5 lg:row-span-4 lg:col-start-5 lg:row-start-5">
                <div className="min-h-0">
                    <ShimmerBorderCard>
                        <img
                            src={`https://image.tmdb.org/t/p/w500${trendingMovies[0].backdrop_path}`}
                            alt={trendingMovies[0].title}
                        />
                    </ShimmerBorderCard>
                </div>

                <div className="min-h-0">
                    <ShimmerBorderCard>
                        <img
                            src={`https://image.tmdb.org/t/p/w500${trendingTV[0].backdrop_path}`}
                            alt={trendingTV[0].name}
                        />
                    </ShimmerBorderCard>
                </div>
            </div>
        </div>
    );
};

export default MovieDashboardGrid;
