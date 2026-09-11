<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Booking;
use App\Models\Pricing;
use App\Support\VillaCatalog;
use Illuminate\Support\Str;
use Illuminate\Validation\Rule;
use Illuminate\Validation\ValidationException;

class ReservationController extends Controller
{
    protected const ADMIN_WHATSAPP = '6287830225789';

    public function store(Request $request)
    {
        $validated = $request->validate([
            'customer_name' => 'required|string|max:255',
            'customer_email' => 'required|email|max:255',
            'customer_phone' => 'required|string|max:20',
            'type' => ['required', Rule::in(['villa', 'pool'])],
            'room_type' => 'required_if:type,villa|nullable|string|in:standard,family,suite',
            'booking_date' => 'required|date',
            'check_out' => 'required_if:type,villa|nullable|date|after:booking_date',
            'session' => 'required_if:type,pool|nullable|string',
        ]);

        if ($validated['type'] === 'villa') {
            [$totalPrice, $nights] = $this->calculateVillaTotal(
                $validated['room_type'],
                $validated['booking_date'],
                $validated['check_out']
            );

            $room = VillaCatalog::room($validated['room_type']);
            $summary = sprintf(
                '%s (%d malam)',
                $room['name'] ?? $validated['room_type'],
                $nights
            );
        } else {
            $session = VillaCatalog::poolSession($validated['booking_date'], $validated['session']);

            if (!$session) {
                throw ValidationException::withMessages([
                    'session' => 'Sesi yang dipilih tidak tersedia.',
                ]);
            }

            $totalPrice = $session['price'];
            $summary = $session['time'];
        }

        do {
            $bookingCode = 'BNG-' . strtoupper(Str::random(6));
        } while (Booking::where('booking_code', $bookingCode)->exists());

        $booking = Booking::create([
            'booking_code' => $bookingCode,
            'customer_name' => $validated['customer_name'],
            'customer_email' => $validated['customer_email'],
            'customer_phone' => $validated['customer_phone'],
            'type' => $validated['type'],
            'room_type' => $validated['room_type'] ?? null,
            'total_price' => $totalPrice,
            'booking_date' => $validated['booking_date'],
            'check_out' => $validated['check_out'] ?? null,
            'session' => $validated['session'] ?? null,
            'status' => 'pending',
        ]);

        $waMessage = $this->buildWhatsappMessage($booking, $summary);
        $waLink = 'https://wa.me/' . self::ADMIN_WHATSAPP . '?text=' . rawurlencode($waMessage);

        return redirect()->back()
            ->with('success', 'Booking berhasil!')
            ->with('booking_code', $bookingCode)
            ->with('whatsapp_link', $waLink);
    }

    protected function calculateVillaTotal(string $roomType, string $checkIn, string $checkOut): array
    {
        $pricePerNight = Pricing::where('type', 'Villa')->where('code', $roomType)->value('price');

        if ($pricePerNight === null) {
            throw ValidationException::withMessages([
                'room_type' => 'Harga untuk tipe kamar ini belum tersedia.',
            ]);
        }

        $nights = (int) ((strtotime($checkOut) - strtotime($checkIn)) / 86400);

        return [$pricePerNight * $nights, $nights];
    }

    protected function buildWhatsappMessage(Booking $booking, string $summary): string
    {
        $lines = [
            'Halo Bening Jogja, saya ingin konfirmasi reservasi:',
            '',
            'Kode Booking: ' . $booking->booking_code,
            'Nama: ' . $booking->customer_name,
            'Layanan: ' . ($booking->type === 'villa' ? 'Sewa Villa' : 'Sewa Kolam Renang'),
            'Detail: ' . $summary,
        ];

        if ($booking->type === 'villa') {
            $lines[] = 'Check-in: ' . $booking->booking_date;
            $lines[] = 'Check-out: ' . $booking->check_out;
        } else {
            $lines[] = 'Tanggal: ' . $booking->booking_date;
        }

        $lines[] = 'Total: Rp ' . number_format((float) $booking->total_price, 0, ',', '.');
        $lines[] = '';
        $lines[] = 'Mohon informasi selanjutnya untuk pembayaran. Terima kasih.';

        return implode("\n", $lines);
    }
}
