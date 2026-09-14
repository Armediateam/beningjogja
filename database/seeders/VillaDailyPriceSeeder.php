<?php

namespace Database\Seeders;

use App\Models\VillaDailyPrice;
use Illuminate\Database\Seeder;

class VillaDailyPriceSeeder extends Seeder
{
    /**
     * Seeds per-date villa prices from the client's real pricelist
     * (see resources/data/villa-catalog.json for the source calendar).
     */
    public function run(): void
    {
        $catalog = json_decode(
            file_get_contents(resource_path('data/villa-catalog.json')),
            true
        );

        foreach ($catalog['villaCalendar'] as $date => $prices) {
            VillaDailyPrice::updateOrCreate(
                ['date' => $date],
                [
                    'standard_price' => $prices['standard'],
                    'family_price' => $prices['family'],
                    'suite_price' => $prices['suite'],
                ]
            );
        }
    }
}
