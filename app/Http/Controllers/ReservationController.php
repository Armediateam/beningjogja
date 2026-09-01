<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Booking;
use Illuminate\Support\Str;

class ReservationController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'customer_name' => 'required|string|max:255',
            'customer_email' => 'required|email|max:255',
            'customer_phone' => 'required|string|max:20',
            'type' => 'required|string|exists:pricings,code',
            'booking_date' => 'required|date',
            'payment_proof' => 'required|image|max:5120', // max 5MB
        ]);

        $pricing = \App\Models\Pricing::where('code', $validated['type'])->firstOrFail();
        $type = $validated['type'];

        // Handle file upload
        $path = $request->file('payment_proof')->store('payments', 'public');

        // Generate unique Booking Code
        do {
            $bookingCode = 'BNG-' . strtoupper(Str::random(6));
        } while (Booking::where('booking_code', $bookingCode)->exists());

        $booking = Booking::create([
            'booking_code' => $bookingCode,
            'customer_name' => $validated['customer_name'],
            'customer_email' => $validated['customer_email'],
            'customer_phone' => $validated['customer_phone'],
            'type' => $type,
            'total_price' => $pricing->price,
            'booking_date' => $validated['booking_date'],
            'status' => 'pending',
            'payment_proof' => $path,
        ]);

        return redirect()->back()->with('success', 'Booking berhasil!')->with('booking_code', $bookingCode);
    }
}
