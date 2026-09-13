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

        return Inertia::render('dashboard', [
            'movies' => $movies['results'],
            'trendingMovies' => $trendingMovies['results'],
            'trendingTV' => $trendingTV['results'],
            'topRatedMovies' => $topRatedMovies['results'],
        ]);
    }
}
