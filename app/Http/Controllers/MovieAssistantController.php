<?php

namespace App\Http\Controllers;

use App\Ai\Agents\MovieAssistant;
use Illuminate\Http\Request;

class MovieAssistantController extends Controller
{
    public function __invoke(Request $request)
    {
        $validated = $request->validate([
            'message' => ['required', 'string', 'max:1000'],
        ]);

        $response = MovieAssistant::make()->prompt(
            $validated['message']
        );

        return response()->json([
            'message' => $response->text,
        ]);
    }
}