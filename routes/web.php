<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\DashboardController;
use App\Support\VillaCatalog;

Route::get('/', function () {
    $villaPricings = \App\Models\Pricing::where('status', 'Active')->where('type', 'Villa')->get();

    $cheapestWeekdaySession = \App\Models\PoolSession::where('day_type', 'weekday')->min('price');

    $poolCard = (object) [
        'id' => 'pool-summary',
        'name' => 'Sewa Kolam Renang',
        'code' => 'pool',
        'type' => 'Private Pool',
        'price' => $cheapestWeekdaySession ?? 0,
        'status' => 'Active',
        'description' => 'Harga mulai per sesi (1 jam) hari biasa. Harga akhir pekan/libur berbeda, lihat jadwal lengkap di halaman Sewa Kolam Renang.',
        'image' => null,
        'facilities' => [
            ['icon' => 'swimming', 'name' => 'Kolam Renang Privat'],
            ['icon' => 'users', 'name' => '11 Sesi per Hari'],
            ['icon' => 'checklist', 'name' => 'Harga Weekday & Weekend Berbeda'],
        ],
    ];

    return inertia('welcome', [
        'pricings' => $villaPricings->push($poolCard)
    ]);
})->name('home');
Route::inertia('/fasilitas', 'facility')->name('facility');
Route::inertia('/tentang-kami', 'about')->name('about');
Route::inertia('/hubungi-kami', 'contact')->name('contact');
Route::post('/contact', [\App\Http\Controllers\ContactMessageController::class, 'store'])->name('contact.store');
Route::inertia('/reservasi', 'reservation')->name('reservation');
Route::post('/reservasi', [\App\Http\Controllers\ReservationController::class, 'store'])->name('reservation.store');

Route::get('/villa', function () {
    $prices = \App\Models\Pricing::where('type', 'Villa')->pluck('price', 'code');

    $rooms = collect(VillaCatalog::rooms())->map(function ($room) use ($prices) {
        $room['price'] = (int) ($prices[$room['code']] ?? 0);

        return $room;
    })->values();

    return inertia('villa', [
        'rooms' => $rooms,
        'bookings' => \App\Models\Booking::where('type', 'villa')
            ->where('status', '!=', 'cancelled')
            ->select('room_type', 'booking_date', 'check_out')
            ->get(),
    ]);
})->name('villa');

Route::get('/kolam-renang', function () {
    return inertia('kolam-renang', [
        'pool' => VillaCatalog::pool(),
        'bookings' => \App\Models\Booking::where('type', 'pool')
            ->where('status', '!=', 'cancelled')
            ->select('booking_date', 'session')
            ->get(),
    ]);
})->name('pool');

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

    Route::put('dashboard/pool-sessions/{poolSession}', [\App\Http\Controllers\PoolSessionController::class, 'update'])->name('dashboard.pool-sessions.update');
});

require __DIR__.'/settings.php';
