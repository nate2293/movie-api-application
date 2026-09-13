<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;

class TmdbService
{
    public function getPopularMovies()
    {
        $response = Http::withToken(config('services.tmdb.token'))
            ->acceptJson()
            ->get('https://api.themoviedb.org/3/movie/popular');

        return $response->json();
    }

    public function getTrendingMovies()
    {
        $response = Http::withToken(config('services.tmdb.token'))
            ->acceptJson()
            ->get('https://api.themoviedb.org/3/trending/movie/week');

        return $response->json();
    }

    public function getTrendingTV()
    {
        $response = Http::withToken(config('services.tmdb.token'))
            ->acceptJson()
            ->get('https://api.themoviedb.org/3/trending/tv/week');

        return $response->json();
    }

    public function getTopRatedMovies()
    {
        $response = Http::withToken(config('services.tmdb.token'))
            ->acceptJson()
            ->get('https://api.themoviedb.org/3/movie/top_rated');

        return $response->json();
    }
}


