<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Booking;

class BookingController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'customer_name' => 'required|string|max:255',
            'type' => 'required|string|exists:pricings,code',
            'status' => 'required|string|in:pending,confirmed,cancelled',
            'booking_date' => 'required|date',
        ]);

        $pricing = \App\Models\Pricing::where('code', $validated['type'])->firstOrFail();

        $bookingCode = '';
        do {
            $bookingCode = strtoupper(substr(md5(uniqid()), 0, 8));
        } while (Booking::where('booking_code', $bookingCode)->exists());

        Booking::create([
            'booking_code' => $bookingCode,
            'customer_name' => $validated['customer_name'],
            'type' => $validated['type'],
            'status' => $validated['status'],
            'total_price' => $pricing->price,
            'booking_date' => $validated['booking_date'],
        ]);

        if ($validated['status'] === 'confirmed') {
            $customer = \App\Models\Customer::where('name', $validated['customer_name'])->first();
            if ($customer) {
                $customer->increment('total_bookings');
                if ($customer->total_bookings >= 3) {
                    $customer->update(['status' => 'VIP']);
                }
            } else {
                \App\Models\Customer::create([
                    'name' => $validated['customer_name'],
                ]);
            }
        }

        return redirect()->back()->with('success', 'Pemesanan berhasil ditambahkan.');
    }

    public function updateStatus(Request $request, Booking $booking)
    {
        $validated = $request->validate([
            'status' => 'required|string|in:pending,confirmed,cancelled'
        ]);

        $oldStatus = $booking->status;
        $booking->update(['status' => $validated['status']]);

        if ($oldStatus !== 'confirmed' && $validated['status'] === 'confirmed') {
            $customer = \App\Models\Customer::where('name', $booking->customer_name)->first();
            if ($customer) {
                $customer->increment('total_bookings');
                if ($customer->total_bookings >= 3) {
                    $customer->update(['status' => 'VIP']);
                }
            } else {
                \App\Models\Customer::create([
                    'name' => $booking->customer_name,
                ]);
            }
        }

        return redirect()->back()->with('success', 'Status pemesanan berhasil diperbarui.');
    }

    public function reschedule(Request $request, Booking $booking)
    {
        $validated = $request->validate([
            'booking_date' => 'required|date'
        ]);

        $booking->update(['booking_date' => $validated['booking_date']]);

        return redirect()->back()->with('success', 'Jadwal pemesanan berhasil diubah.');
    }

    public function destroy(Booking $booking)
    {
        $booking->delete();

        return redirect()->back()->with('success', 'Pemesanan berhasil dihapus.');
    }
}
