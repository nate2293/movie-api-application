<?php

namespace App\Ai\Tools;

use Illuminate\Contracts\JsonSchema\JsonSchema;
use Laravel\Ai\Contracts\Tool;
use Laravel\Ai\Tools\Request;
use Stringable;
use App\Services\TmdbService;

class GetMovieDetails implements Tool
{
    /**
     * Get the description of the tool's purpose.
     */
    public function description(): Stringable|string
    {
        return 'Retrieve detailed information about a specific movie from TMDB using its movie ID. Use this tool when detailed movie information is required.';
    }

    /**
     * Execute the tool.
     */
    public function handle(Request $request): Stringable|string
    {
        $tmdbService = app(TmdbService::class);

        $movie = $tmdbService->getMovieDetails($request['movie_id']);

        return json_encode([
            'id' => $movie['id'] ?? null,
            'title' => $movie['title'] ?? null,
            'overview' => $movie['overview'] ?? null,
            'release_date' => $movie['release_date'] ?? null,
            'runtime' => $movie['runtime'] ?? null,
            'genres' => $movie['genres'] ?? [],
            'rating' => $movie['vote_average'] ?? null,
            'tagline' => $movie['tagline'] ?? null,
        ]);
    }

    /**
     * Get the tool's schema definition.
     */
    public function schema(JsonSchema $schema): array
    {
        return [
            'movie_id' => $schema
                ->integer()
                ->description('The TMDB ID of the movie to retrieve details for.')
                ->required(),
        ];
    }
}
