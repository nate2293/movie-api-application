<?php

namespace App\Http\Controllers;

use App\Services\TmdbService;
use Inertia\Inertia;

class WelcomeController extends Controller
{
    public function index(TmdbService $tmdbService)
    {
        $trendingMovies = $tmdbService->getTrendingMovies();

        // dd($trendingMovies);

        return Inertia::render('welcome', [
            'trendingMovies' => $trendingMovies['results'],
        ]);
    }
}
