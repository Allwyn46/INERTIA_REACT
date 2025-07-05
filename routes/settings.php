<?php

use App\Http\Controllers\Settings\PasswordController;
use App\Http\Controllers\Settings\ProfileController;
use App\Http\Controllers\Settings\UserController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::middleware('auth')->group(function () {
    Route::redirect('settings', 'settings/profile');

    Route::get('settings/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('settings/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('settings/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::get('settings/password', [PasswordController::class, 'edit'])->name('password.edit');
    Route::put('settings/password', [PasswordController::class, 'update'])->name('password.update');

    Route::get('settings/users', [UserController::class, 'edit'])->name('users.edit');
    Route::post('settings/users', [UserController::class, 'createuser'])->name('users.create');
    Route::patch('settings/users', [UserController::class, 'update'])->name('users.update');
    Route::delete('settings/users', [UserController::class, 'destroy'])->name('users.destroy');
    
    Route::get('settings/products', [UserController::class, 'edit'])->name('products.edit');
    Route::post('settings/products', [UserController::class, 'createuser'])->name('products.create');
    Route::patch('settings/products', [UserController::class, 'update'])->name('products.update');
    Route::delete('settings/products', [UserController::class, 'destroy'])->name('products.destroy');

    Route::get('settings/appearance', function () {
        return Inertia::render('settings/appearance');
    })->name('appearance');
});