<?php

namespace App\Support;

use App\Models\PoolSession;

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
}
