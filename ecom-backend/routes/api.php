<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ProductController;

Route::post('register', [AuthController::class, 'register']);
Route::post('login', [AuthController::class, 'login']);

Route::group([
    'middleware' => ['auth:sanctum']
], function(){
    Route::get('profile', [AuthController::class, 'profile']);
    Route::put('/profile/update', [AuthController::class, 'updateProfile']);
    Route::get('logout', [AuthController::class, 'logout']);

    Route::post('products', [ProductController::class, 'store']); 
    Route::put('products/{id}', [ProductController::class, 'update']); 
    Route::delete('products/{id}', [ProductController::class, 'destroy']); 
    Route::put('products/{id}/toggle', [ProductController::class, 'toggleActive']); 
});

Route::get('products', [ProductController::class, 'index']);
Route::get('products/{id}', [ProductController::class, 'show']);