<?php

namespace App\Http\Controllers;

use App\Models\Pricing;
use App\Models\VillaDailyPrice;
use Illuminate\Http\Request;

class VillaDailyPriceController extends Controller
{
    public function index(Request $request)
    {
        $month = (int) $request->integer('month', (int) date('n'));
        $year = (int) $request->integer('year', (int) date('Y'));

        return inertia('dashboard/pricing-kalender', [
            'month' => $month,
            'year' => $year,
            'days' => $this->monthData($month, $year),
        ]);
    }

    public function data(Request $request)
    {
        $month = (int) $request->integer('month', (int) date('n'));
        $year = (int) $request->integer('year', (int) date('Y'));

        return response()->json([
            'month' => $month,
            'year' => $year,
            'days' => $this->monthData($month, $year),
        ]);
    }

    public function update(Request $request)
    {
        $validated = $request->validate([
            'date' => 'required|date',
            'standard_price' => 'required|numeric|min:0',
            'family_price' => 'required|numeric|min:0',
            'suite_price' => 'required|numeric|min:0',
        ]);

        VillaDailyPrice::updateOrCreate(
            ['date' => $validated['date']],
            [
                'standard_price' => $validated['standard_price'],
                'family_price' => $validated['family_price'],
                'suite_price' => $validated['suite_price'],
            ]
        );

        return redirect()->back()->with('success', 'Harga tanggal ' . $validated['date'] . ' berhasil disimpan.');
    }

    public function bulkUpdate(Request $request)
    {
        $validated = $request->validate([
            'dates' => 'required|array|min:1',
            'dates.*' => 'required|date',
            'standard_price' => 'required|numeric|min:0',
            'family_price' => 'required|numeric|min:0',
            'suite_price' => 'required|numeric|min:0',
        ]);

        foreach ($validated['dates'] as $date) {
            VillaDailyPrice::updateOrCreate(
                ['date' => $date],
                [
                    'standard_price' => $validated['standard_price'],
                    'family_price' => $validated['family_price'],
                    'suite_price' => $validated['suite_price'],
                ]
            );
        }

        return redirect()->back()->with('success', count($validated['dates']) . ' tanggal berhasil diperbarui.');
    }

    protected function monthData(int $month, int $year): array
    {
        $daysInMonth = (int) date('t', mktime(0, 0, 0, $month, 1, $year));

        $fallback = Pricing::where('type', 'Villa')->pluck('price', 'code');

        $start = sprintf('%04d-%02d-01', $year, $month);
        $end = sprintf('%04d-%02d-%02d', $year, $month, $daysInMonth);

        $rows = VillaDailyPrice::whereBetween('date', [$start, $end])->get()
            ->keyBy(fn ($row) => $row->date->format('Y-m-d'));

        $days = [];

        for ($day = 1; $day <= $daysInMonth; $day++) {
            $dateStr = sprintf('%04d-%02d-%02d', $year, $month, $day);
            $row = $rows->get($dateStr);

            $days[] = [
                'date' => $dateStr,
                'is_custom' => (bool) $row,
                'standard_price' => $row ? (int) $row->standard_price : (int) ($fallback['standard'] ?? 0),
                'family_price' => $row ? (int) $row->family_price : (int) ($fallback['family'] ?? 0),
                'suite_price' => $row ? (int) $row->suite_price : (int) ($fallback['suite'] ?? 0),
            ];
        }

        return $days;
    }
}
