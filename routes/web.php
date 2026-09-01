<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\DashboardController;

Route::get('/', function () {
    return inertia('welcome', [
        'pricings' => \App\Models\Pricing::where('status', 'Active')->get()
    ]);
})->name('home');
Route::inertia('/fasilitas', 'facility')->name('facility');
Route::inertia('/tentang-kami', 'about')->name('about');
Route::inertia('/hubungi-kami', 'contact')->name('contact');
Route::post('/contact', [\App\Http\Controllers\ContactMessageController::class, 'store'])->name('contact.store');
Route::get('/reservasi', function () {
    return inertia('reservation', [
        'bookings' => \App\Models\Booking::select('booking_date', 'type', 'status')->get(),
        'pricings' => \App\Models\Pricing::where('status', 'Active')->get()
    ]);
})->name('reservation');
Route::post('/reservasi', [\App\Http\Controllers\ReservationController::class, 'store'])->name('reservation.store');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', [DashboardController::class, 'index'])->name('dashboard');
    
    // Messages
    Route::get('dashboard/messages', [\App\Http\Controllers\ContactMessageController::class, 'index'])->name('dashboard.messages');
    Route::put('dashboard/messages/{contact_message}', [\App\Http\Controllers\ContactMessageController::class, 'update'])->name('dashboard.messages.update');
    Route::delete('dashboard/messages/{contact_message}', [\App\Http\Controllers\ContactMessageController::class, 'destroy'])->name('dashboard.messages.destroy');

    // Booking
    Route::get('dashboard/booking', function () {
        return inertia('dashboard/booking', [
            'bookings' => \App\Models\Booking::orderBy('created_at', 'desc')->get()
        ]);
    })->name('dashboard.booking');
    Route::post('dashboard/booking', [\App\Http\Controllers\BookingController::class, 'store'])->name('dashboard.booking.store');
    Route::put('dashboard/booking/{booking}/status', [\App\Http\Controllers\BookingController::class, 'updateStatus'])->name('dashboard.booking.status');
    Route::put('dashboard/booking/{booking}/reschedule', [\App\Http\Controllers\BookingController::class, 'reschedule'])->name('dashboard.booking.reschedule');
    Route::delete('dashboard/booking/{booking}', [\App\Http\Controllers\BookingController::class, 'destroy'])->name('dashboard.booking.destroy');

    // User
    Route::get('dashboard/user', [\App\Http\Controllers\UserController::class, 'index'])->name('dashboard.user');
    Route::post('dashboard/user', [\App\Http\Controllers\UserController::class, 'store'])->name('dashboard.user.store');
    Route::put('dashboard/user/{user}', [\App\Http\Controllers\UserController::class, 'update'])->name('dashboard.user.update');
    Route::put('dashboard/user/{user}/password', [\App\Http\Controllers\UserController::class, 'resetPassword'])->name('dashboard.user.password');
    Route::delete('dashboard/user/{user}', [\App\Http\Controllers\UserController::class, 'destroy'])->name('dashboard.user.destroy');

    // Customer
    Route::get('dashboard/customer', [\App\Http\Controllers\CustomerController::class, 'index'])->name('dashboard.customer');
    Route::post('dashboard/customer', [\App\Http\Controllers\CustomerController::class, 'store'])->name('dashboard.customer.store');
    Route::put('dashboard/customer/{customer}', [\App\Http\Controllers\CustomerController::class, 'update'])->name('dashboard.customer.update');
    Route::delete('dashboard/customer/{customer}', [\App\Http\Controllers\CustomerController::class, 'destroy'])->name('dashboard.customer.destroy');

    // Pricing
    Route::get('dashboard/pricing', [\App\Http\Controllers\PricingController::class, 'index'])->name('dashboard.pricing');
    Route::post('dashboard/pricing', [\App\Http\Controllers\PricingController::class, 'store'])->name('dashboard.pricing.store');
    Route::put('dashboard/pricing/{pricing}', [\App\Http\Controllers\PricingController::class, 'update'])->name('dashboard.pricing.update');
    Route::delete('dashboard/pricing/{pricing}', [\App\Http\Controllers\PricingController::class, 'destroy'])->name('dashboard.pricing.destroy');

    Route::inertia('dashboard/analytic', 'dashboard/analytic')->name('dashboard.analytic');
});

require __DIR__.'/settings.php';
