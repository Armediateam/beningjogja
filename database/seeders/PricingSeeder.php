<?php

namespace Database\Seeders;

use App\Models\Pricing;
use Illuminate\Database\Seeder;

class PricingSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * Prices reflect the real October 2026 rates from the villa & pool pricelist
     * (see resources/data/villa-catalog.json for the full per-date/per-session data
     * used on the actual booking pages).
     */
    public function run(): void
    {
        Pricing::updateOrCreate(['code' => 'standard'], [
            'name' => 'Standard Room',
            'type' => 'Villa',
            'price' => 550000,
            'status' => 'Active',
            'description' => 'Harga mulai Oktober 2026 per malam. Tarif berbeda tiap tanggal, lihat kalender lengkap di halaman Sewa Villa.',
            'facilities' => [
                ['icon' => 'ac', 'name' => 'AC & Smart Android TV'],
                ['icon' => 'wifi', 'name' => 'Free WiFi'],
                ['icon' => 'bed', 'name' => 'King Size 200x200'],
                ['icon' => 'checklist', 'name' => 'Luas 33 sqm'],
            ],
        ]);

        Pricing::updateOrCreate(['code' => 'family'], [
            'name' => 'Family Room',
            'type' => 'Villa',
            'price' => 890000,
            'status' => 'Active',
            'description' => 'Harga mulai Oktober 2026 per malam. Tarif berbeda tiap tanggal, lihat kalender lengkap di halaman Sewa Villa.',
            'facilities' => [
                ['icon' => 'ac', 'name' => 'AC & Smart Android TV'],
                ['icon' => 'swimming', 'name' => 'Private Pool'],
                ['icon' => 'bed', 'name' => 'Twin Bed 160x200'],
                ['icon' => 'checklist', 'name' => 'Luas 33 sqm'],
            ],
        ]);

        Pricing::updateOrCreate(['code' => 'suite'], [
            'name' => 'Exclusive Suite Room',
            'type' => 'Villa',
            'price' => 950000,
            'status' => 'Active',
            'description' => 'Harga mulai Oktober 2026 per malam. Tarif berbeda tiap tanggal, lihat kalender lengkap di halaman Sewa Villa.',
            'facilities' => [
                ['icon' => 'ac', 'name' => 'AC & Smart Android TV'],
                ['icon' => 'swimming', 'name' => 'Private Pool'],
                ['icon' => 'bed', 'name' => 'King Size 200x200'],
                ['icon' => 'checklist', 'name' => 'Bathtub Mewah'],
            ],
        ]);

        Pricing::updateOrCreate(['code' => 'pool'], [
            'name' => 'Sewa Kolam Renang',
            'type' => 'Private Pool',
            'price' => 100000,
            'status' => 'Active',
            'description' => 'Harga mulai per sesi (1 jam) hari biasa. Harga akhir pekan/libur berbeda, lihat jadwal lengkap di halaman Sewa Kolam Renang.',
            'facilities' => [
                ['icon' => 'swimming', 'name' => 'Kolam Renang Privat'],
                ['icon' => 'users', 'name' => '11 Sesi per Hari'],
                ['icon' => 'checklist', 'name' => 'Harga Weekday & Weekend Berbeda'],
            ],
        ]);
    }
}
