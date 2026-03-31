<?php
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\ProductController;

Route::get('/products', [ProductController::class, 'index']);
Route::get('/product/{id}', [ProductController::class, 'show']);
Route::post('/products', [ProductController::class, 'store']);
Route::get('/product-categories', [ProductController::class, 'categories']);