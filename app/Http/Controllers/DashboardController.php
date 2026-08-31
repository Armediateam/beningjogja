<?php

namespace App\Http\Controllers;

use App\Models\Booking;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class DashboardController extends Controller
{
    public function index()
    {
        $totalRevenue = Booking::where('status', 'completed')->sum('total_price');
        $totalReservations = Booking::count();
        $newCustomers = Booking::distinct('customer_name')->count('customer_name');
        
        $occupancy = $totalReservations > 0 ? 85 : 0;

        $ninetyDaysAgo = Carbon::now()->subDays(90)->toDateString();
        
        $bookings = Booking::where('booking_date', '>=', $ninetyDaysAgo)
            ->select('booking_date', 'type', DB::raw('count(*) as total'))
            ->groupBy('booking_date', 'type')
            ->get();

        $chartData = [];
        $grouped = $bookings->groupBy('booking_date');
        
        foreach ($grouped as $date => $dayBookings) {
            $villaCount = $dayBookings->where('type', 'villa')->first()->total ?? 0;
            $poolCount = $dayBookings->where('type', 'pool')->first()->total ?? 0;
            
            $chartData[] = [
                'date' => $date,
                'villa' => $villaCount,
                'pool' => $poolCount,
            ];
        }

        return Inertia::render('dashboard', [
            'stats' => [
                'revenue' => (float) $totalRevenue,
                'reservations' => $totalReservations,
                'newCustomers' => $newCustomers,
                'occupancy' => $occupancy,
            ],
            'chartData' => $chartData,
        ]);
    }
}
