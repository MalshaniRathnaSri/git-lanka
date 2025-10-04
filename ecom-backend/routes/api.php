<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\AdminController;

Route::post('register', [AuthController::class, 'register']);
Route::post('login', [AuthController::class, 'login']);

Route::post('admin/login', [AuthController::class, 'adminLogin']);
Route::post('admin/register', [AuthController::class, 'adminRegister']);

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

    Route::get('admin/stats', [AdminController::class, 'stats']);

    Route::get('admin/users', [UserController::class, 'index']);
    Route::post('admin/users', [UserController::class, 'store']);
    Route::put('admin/users/{id}', [UserController::class, 'update']);
    Route::delete('admin/users/{id}', [UserController::class, 'destroy']);
    Route::put('admin/users/{id}/status', [UserController::class, 'toggleStatus']);
    Route::put('admin/users/{id}/privileges', [UserController::class, 'updatePrivileges']);

});

Route::get('products', [ProductController::class, 'index']);
Route::get('products/{id}', [ProductController::class, 'show']);