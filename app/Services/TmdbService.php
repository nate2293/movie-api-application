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

    public function getDiscoverMovies()
    {
        $response = Http::withToken(config('services.tmdb.token'))
            ->acceptJson()
            ->get('https://api.themoviedb.org/3/discover/movie');

        return $response->json();
    }

    public function getDiscoverTv()
    {
        $response = Http::withToken(config('services.tmdb.token'))
            ->acceptJson()
            ->get('https://api.themoviedb.org/3/discover/tv');

        return $response->json();
    }

    public function getPopularMovieList()
    {
        $response = Http::withToken(config('services.tmdb.token'))
            ->acceptJson()
            ->get('https://api.themoviedb.org/3/movie/popular');

        return $response->json();
    }

    public function getNowPlayingMovies()
    {
        $response = Http::withToken(config('services.tmdb.token'))
            ->acceptJson()
            ->get('https://api.themoviedb.org/3/movie/now_playing');

        return $response->json();
    }

    public function getUpcomingMovies()
    {
        $response = Http::withToken(config('services.tmdb.token'))
            ->acceptJson()
            ->get('https://api.themoviedb.org/3/movie/upcoming');

        return $response->json();
    }

    public function getRecommendations($movieId)
    {
        $response = Http::withToken(config('services.tmdb.token'))
            ->acceptJson()
            ->get("https://api.themoviedb.org/3/movie/{$movieId}/recommendations");

        return $response->json();
    }

    public function getMoviesByGenre(int $genreId)
    {
        $response = Http::withToken(config('services.tmdb.token'))
            ->acceptJson()
            ->get('https://api.themoviedb.org/3/discover/movie', [
                'with_genres' => $genreId,
            ]);

        return $response->json();
    }

    public function getMovieDetails(int $movieId)
    {
        $response = Http::withToken(config('services.tmdb.token'))
            ->acceptJson()
            ->get("https://api.themoviedb.org/3/movie/{$movieId}");

        return $response->json();
    }

    public function getTvDetails(int $tvId)
    {
        $response = Http::withToken(config('services.tmdb.token'))
            ->acceptJson()
            ->get("https://api.themoviedb.org/3/tv/{$tvId}");

        return $response->json();
    }

    public function getTVSeason(int $tvId, int $seasonNumber)
    {
        $response = Http::withToken(config('services.tmdb.token'))
            ->acceptJson()
            ->get("https://api.themoviedb.org/3/tv/{$tvId}/season/{$seasonNumber}");

        return $response->json();
    }

    public function getPopularTV()
    {
        return Http::withToken(config('services.tmdb.token'))
            ->acceptJson()
            ->get('https://api.themoviedb.org/3/tv/popular')
            ->json();
    }

    public function getTopRatedTV()
    {
        return Http::withToken(config('services.tmdb.token'))
            ->acceptJson()
            ->get('https://api.themoviedb.org/3/tv/top_rated')
            ->json();
    }

    public function getAiringTodayTV()
    {
        return Http::withToken(config('services.tmdb.token'))
            ->acceptJson()
            ->get('https://api.themoviedb.org/3/tv/airing_today')
            ->json();
    }

    public function getOnTheAirTV()
    {
        return Http::withToken(config('services.tmdb.token'))
            ->acceptJson()
            ->get('https://api.themoviedb.org/3/tv/on_the_air')
            ->json();
    }

    public function getTVByGenre(int $genreId)
    {
        return Http::withToken(config('services.tmdb.token'))
            ->acceptJson()
            ->get('https://api.themoviedb.org/3/discover/tv', [
                'with_genres' => $genreId,
            ])
            ->json();
    }

    public function getMoviesByReleaseDate(string $startDate, string $endDate)
    {
        return Http::withToken(config('services.tmdb.token'))
            ->acceptJson()
            ->get('https://api.themoviedb.org/3/discover/movie', [
                'primary_release_date.gte' => $startDate,
                'primary_release_date.lte' => $endDate,
                'sort_by' => 'popularity.desc',
            ])
            ->json();
    }

    public function getTVByAirDate(string $startDate, string $endDate)
    {
        return Http::withToken(config('services.tmdb.token'))
            ->acceptJson()
            ->get('https://api.themoviedb.org/3/discover/tv', [
                'first_air_date.gte' => $startDate,
                'first_air_date.lte' => $endDate,
                'sort_by' => 'popularity.desc',
            ])
            ->json();
    }

    public function search(string $query)
    {
        return Http::withToken(config('services.tmdb.token'))
            ->acceptJson()
            ->get('https://api.themoviedb.org/3/search/multi', [
                'query' => $query,
                'include_adult' => false,
            ])
            ->json();
    }
}
