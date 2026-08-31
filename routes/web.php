<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\DashboardController;

Route::inertia('/', 'welcome')->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', [DashboardController::class, 'index'])->name('dashboard');
    Route::inertia('dashboard/booking', 'dashboard/booking')->name('dashboard.booking');
    Route::inertia('dashboard/customer', 'dashboard/customer')->name('dashboard.customer');
    Route::inertia('dashboard/pricing', 'dashboard/pricing')->name('dashboard.pricing');
    Route::inertia('dashboard/analytic', 'dashboard/analytic')->name('dashboard.analytic');
    Route::inertia('dashboard/user', 'dashboard/user')->name('dashboard.user');
});

require __DIR__.'/settings.php';
