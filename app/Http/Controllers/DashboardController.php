<?php

namespace App\Http\Controllers;

use App\Services\TmdbService;
use Inertia\Inertia;


class DashboardController extends Controller
{
    public function index(TmdbService $tmdbService)
    {
        $movies = $tmdbService->getPopularMovies();
        $trendingMovies = $tmdbService->getTrendingMovies();
        $trendingTV = $tmdbService->getTrendingTV();
        $topRatedMovies = $tmdbService->getTopRatedMovies();
        $discoverMovies = $tmdbService->getDiscoverMovies();
        $discoverTv = $tmdbService->getDiscoverTv();
        $popularMovieList = $tmdbService->getPopularMovieList();
        $nowPlayingMovies = $tmdbService->getNowPlayingMovies();
        $upcomingMovies = $tmdbService->getUpcomingMovies();
        $recommendations = $tmdbService->getRecommendations($movies['results'][0]['id'] ?? null);

        $horrorMovies = $tmdbService->getMoviesByGenre(27);
        $comedyMovies = $tmdbService->getMoviesByGenre(35);
        $actionMovies = $tmdbService->getMoviesByGenre(28);
        $animationMovies = $tmdbService->getMoviesByGenre(16);
        $dramaMovies = $tmdbService->getMoviesByGenre(18);
        $fantasyMovies = $tmdbService->getMoviesByGenre(14);

        return Inertia::render('dashboard', [
            'movies' => $movies['results'],
            'trendingMovies' => $trendingMovies['results'],
            'trendingTV' => $trendingTV['results'],
            'topRatedMovies' => $topRatedMovies['results'],
            'discoverMovies' => $discoverMovies['results'],
            'popularMovieList' => $popularMovieList['results'],
            'nowPlayingMovies' => $nowPlayingMovies['results'],
            'upcomingMovies' => $upcomingMovies['results'],
            'recommendations' => $recommendations['results'],
            'discoverTv' => $discoverTv['results'],
            'horrorMovies' => $horrorMovies['results'],
            'comedyMovies' => $comedyMovies['results'],
            'actionMovies' => $actionMovies['results'],
            'animationMovies' => $animationMovies['results'],
            'dramaMovies' => $dramaMovies['results'],
            'fantasyMovies' => $fantasyMovies['results'],
        ]);
    }

    public function movieDetails(TmdbService $tmdbService, int $movieId)
    {
        $movie = $tmdbService->getMovieDetails($movieId);

        return response()->json($movie);
    }

    public function tvDetails(TmdbService $tmdbService, int $tvId)
    {
        $tv = $tmdbService->getTvDetails($tvId);

        return response()->json($tv);
    }

    public function tvSeason(TmdbService $tmdbService, int $tvId, int $seasonNumber)
    {
        $season = $tmdbService->getTVSeason($tvId, $seasonNumber);

        return response()->json($season);
    }

    public function series(TmdbService $tmdbService)
    {
        $trendingTV = $tmdbService->getTrendingTV();
        $discoverTV = $tmdbService->getDiscoverTv();

        $popularTV = $tmdbService->getPopularTV();
        $topRatedTV = $tmdbService->getTopRatedTV();
        $airingTodayTV = $tmdbService->getAiringTodayTV();
        $onTheAirTV = $tmdbService->getOnTheAirTV();

        $dramaTV = $tmdbService->getTVByGenre(18);
        $comedyTV = $tmdbService->getTVByGenre(35);
        $crimeTV = $tmdbService->getTVByGenre(80);
        $sciFiFantasyTV = $tmdbService->getTVByGenre(10765);

        return Inertia::render('series', [
            'trendingTV' => $trendingTV['results'],
            'discoverTV' => $discoverTV['results'],
            'popularTV' => $popularTV['results'],
            'topRatedTV' => $topRatedTV['results'],
            'airingTodayTV' => $airingTodayTV['results'],
            'onTheAirTV' => $onTheAirTV['results'],
            'dramaTV' => $dramaTV['results'],
            'comedyTV' => $comedyTV['results'],
            'crimeTV' => $crimeTV['results'],
            'sciFiFantasyTV' => $sciFiFantasyTV['results'],
        ]);
    }

    // ADD THE NEW METHOD HERE
    public function films(TmdbService $tmdbService)
    {
        $trendingMovies = $tmdbService->getTrendingMovies();
        $popularMovies = $tmdbService->getPopularMovies();
        $topRatedMovies = $tmdbService->getTopRatedMovies();
        $discoverMovies = $tmdbService->getDiscoverMovies();
        $nowPlayingMovies = $tmdbService->getNowPlayingMovies();
        $upcomingMovies = $tmdbService->getUpcomingMovies();

        $actionMovies = $tmdbService->getMoviesByGenre(28);
        $comedyMovies = $tmdbService->getMoviesByGenre(35);
        $horrorMovies = $tmdbService->getMoviesByGenre(27);
        $dramaMovies = $tmdbService->getMoviesByGenre(18);
        $animationMovies = $tmdbService->getMoviesByGenre(16);
        $fantasyMovies = $tmdbService->getMoviesByGenre(14);

        return Inertia::render('films', [
            'trendingMovies' => $trendingMovies['results'],
            'popularMovies' => $popularMovies['results'],
            'topRatedMovies' => $topRatedMovies['results'],
            'discoverMovies' => $discoverMovies['results'],
            'nowPlayingMovies' => $nowPlayingMovies['results'],
            'upcomingMovies' => $upcomingMovies['results'],
            'actionMovies' => $actionMovies['results'],
            'comedyMovies' => $comedyMovies['results'],
            'horrorMovies' => $horrorMovies['results'],
            'dramaMovies' => $dramaMovies['results'],
            'animationMovies' => $animationMovies['results'],
            'fantasyMovies' => $fantasyMovies['results'],
        ]);
    }

    public function newAndPopular(TmdbService $tmdbService)
    {
        $thisWeekStart = now()->startOfWeek();
        $thisWeekEnd = now()->endOfWeek();

        $nextWeekStart = now()->addWeek()->startOfWeek();
        $nextWeekEnd = now()->addWeek()->endOfWeek();

        $trendingMovies = $tmdbService->getTrendingMovies();
        $trendingTV = $tmdbService->getTrendingTV();

        $popularMovies = $tmdbService->getPopularMovies();
        $popularTV = $tmdbService->getPopularTV();

        $thisWeekMovies = $tmdbService->getMoviesByReleaseDate(
            $thisWeekStart->toDateString(),
            $thisWeekEnd->toDateString()
        );

        $thisWeekTV = $tmdbService->getTVByAirDate(
            $thisWeekStart->toDateString(),
            $thisWeekEnd->toDateString()
        );

        $nextWeekMovies = $tmdbService->getMoviesByReleaseDate(
            $nextWeekStart->toDateString(),
            $nextWeekEnd->toDateString()
        );

        $nextWeekTV = $tmdbService->getTVByAirDate(
            $nextWeekStart->toDateString(),
            $nextWeekEnd->toDateString()
        );

        return Inertia::render('new-and-popular', [
            'trendingMovies' => $trendingMovies['results'],
            'trendingTV' => $trendingTV['results'],

            'popularMovies' => array_slice($popularMovies['results'], 0, 10),
            'popularTV' => array_slice($popularTV['results'], 0, 10),

            'thisWeekMovies' => $thisWeekMovies['results'],
            'thisWeekTV' => $thisWeekTV['results'],

            'nextWeekMovies' => $nextWeekMovies['results'],
            'nextWeekTV' => $nextWeekTV['results'],
        ]);
    }

    public function search(TmdbService $tmdbService)
    {
        $query = request('query', '');

        $results = $tmdbService->search($query);

        $results = collect($results['results'] ?? [])
            ->filter(fn($item) => in_array(
                $item['media_type'] ?? null,
                ['movie', 'tv']
            ))
            ->values();

        return Inertia::render('search', [
            'query' => $query,
            'results' => $results,
        ]);
    }
}
