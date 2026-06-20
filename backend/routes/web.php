<?php

use App\Http\Controllers\StripeController;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});

// Stripe API routes — exclude CSRF since called from separate frontend
Route::prefix('api')
    ->withoutMiddleware([\Illuminate\Foundation\Http\Middleware\VerifyCsrfToken::class])
    ->group(function () {
        Route::post('/checkout', [StripeController::class, 'createCheckoutSession']);
        Route::get('/order', [StripeController::class, 'getOrder']);
        Route::post('/stripe/webhook', [StripeController::class, 'handleWebhook']);
    });

