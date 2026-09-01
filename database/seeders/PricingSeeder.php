<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class PricingSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        \App\Models\Pricing::create([
            'name' => 'Sewa Villa',
            'code' => 'villa',
            'type' => 'Villa',
            'price' => 1500000,
            'status' => 'Active',
        ]);

        \App\Models\Pricing::create([
            'name' => 'Sewa Kolam',
            'code' => 'pool',
            'type' => 'Private Pool',
            'price' => 500000,
            'status' => 'Active',
        ]);

        \App\Models\Pricing::create([
            'name' => 'Paket Lengkap',
            'code' => 'full',
            'type' => 'All Inclusive',
            'price' => 1850000,
            'status' => 'Active',
        ]);
    }
}
