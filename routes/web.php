<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\WelcomeController;
use Inertia\Inertia;
use App\Http\Controllers\MovieAssistantController;

Route::get('/', [WelcomeController::class, 'index'])->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', [DashboardController::class, 'index'])->name('dashboard');
    Route::get('series', [DashboardController::class, 'series'])->name('series');
    Route::get('films', [DashboardController::class, 'films'])->name('films');
    Route::get('new-and-popular', [DashboardController::class, 'newAndPopular'])->name('new-and-popular');
    Route::post('/movie-assistant', MovieAssistantController::class)
    ->name('movie-assistant');
    Route::get('search', [DashboardController::class, 'search'])
    ->name('search');



    Route::get('movie/{movieId}', [DashboardController::class, 'movieDetails'])->name('movie.details');
    Route::get('tv/{tvId}', [DashboardController::class, 'tvDetails'])->name('tv.details');
    Route::get('tv/{tvId}/season/{seasonNumber}', [DashboardController::class, 'tvSeason'])->name('tv.season');
    
});

Route::get('learn-more', function () {
    return Inertia::render('learn-more');
})->name('learn-more');

Route::get('see-all-plans', function () {
    return Inertia::render('see-all-plans');
})->name('see-all-plans');

require __DIR__ . '/settings.php';
