<?php

namespace App\Ai\Tools;

use Illuminate\Contracts\JsonSchema\JsonSchema;
use Laravel\Ai\Contracts\Tool;
use Laravel\Ai\Tools\Request;
use Stringable;
use App\Services\TmdbService;

class SearchMovies implements Tool
{
    /**
     * Get the description of the tool's purpose.
     */
    public function description(): Stringable|string
    {
        return 'Search TMDB for movies using a movie title or search term. Use this tool when the user wants to find or search for movies.';
    }

    /**
     * Execute the tool.
     */
    public function handle(Request $request): Stringable|string
    {
        $tmdbService = app(TmdbService::class);

        $results = $tmdbService->search($request['query']);

        $movies = collect($results['results'] ?? [])
        ->filter(fn ($movie) => ($movie['media_type'] ?? null) === 'movie')
        ->take(5)
        ->map(fn ($movie) => [
            'id' => $movie['id'],
            'title' => $movie['title'],
            'release_date' => $movie['release_date'] ?? null,
            'overview' => $movie['overview'] ?? null,
            'rating' => $movie['vote_average'] ?? null,
        ])
        ->values();

        return $movies->toJson();
    }

    /**
     * Get the tool's schema definition.
     */
    public function schema(JsonSchema $schema): array
    {
        return [
            'query' => $schema
                ->string()
                ->description('The movie title or search term to search for.')
                ->required(),
        ];
    }
}
