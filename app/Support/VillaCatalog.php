<?php

namespace App\Support;

use App\Models\PoolSession;
use App\Models\Pricing;
use App\Models\VillaDailyPrice;

class VillaCatalog
{
    protected static ?array $data = null;

    protected static function data(): array
    {
        if (static::$data === null) {
            static::$data = json_decode(
                file_get_contents(resource_path('data/villa-catalog.json')),
                true
            );
        }

        return static::$data;
    }

    public static function rooms(): array
    {
        return static::data()['rooms'];
    }

    public static function room(string $code): ?array
    {
        foreach (static::rooms() as $room) {
            if ($room['code'] === $code) {
                return $room;
            }
        }

        return null;
    }

    public static function pool(): array
    {
        $sessions = PoolSession::orderBy('sort_order')->get();

        $format = fn ($session) => [
            'code' => $session->code,
            'time' => $session->time_label,
            'price' => $session->price,
        ];

        return [
            'weekday' => $sessions->where('day_type', 'weekday')->map($format)->values()->all(),
            'weekend' => $sessions->where('day_type', 'weekend')->map($format)->values()->all(),
        ];
    }

    public static function poolSessions(string $date): array
    {
        $isWeekend = in_array((int) date('N', strtotime($date)), [6, 7], true);

        return static::pool()[$isWeekend ? 'weekend' : 'weekday'];
    }

    public static function poolSession(string $date, string $sessionCode): ?array
    {
        foreach (static::poolSessions($date) as $session) {
            if ($session['code'] === $sessionCode) {
                return $session;
            }
        }

        return null;
    }

    public static function priceForDate(string $date, string $roomCode): int
    {
        $column = $roomCode . '_price';

        $daily = VillaDailyPrice::where('date', $date)->value($column);

        if ($daily !== null) {
            return (int) $daily;
        }

        return (int) Pricing::where('type', 'Villa')->where('code', $roomCode)->value('price');
    }

    public static function dailyPricesBetween(string $start, string $end): array
    {
        $rows = VillaDailyPrice::whereBetween('date', [$start, $end])->get()
            ->keyBy(fn ($row) => $row->date->format('Y-m-d'));

        $fallback = Pricing::where('type', 'Villa')->pluck('price', 'code');

        $result = [];
        $cursor = strtotime($start);
        $endTs = strtotime($end);

        while ($cursor <= $endTs) {
            $dateStr = date('Y-m-d', $cursor);
            $row = $rows->get($dateStr);

            $result[$dateStr] = [
                'standard' => $row ? (int) $row->standard_price : (int) ($fallback['standard'] ?? 0),
                'family' => $row ? (int) $row->family_price : (int) ($fallback['family'] ?? 0),
                'suite' => $row ? (int) $row->suite_price : (int) ($fallback['suite'] ?? 0),
            ];

            $cursor = strtotime('+1 day', $cursor);
        }

        return $result;
    }
}
