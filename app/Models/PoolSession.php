<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PoolSession extends Model
{
    protected $fillable = [
        'code',
        'time_label',
        'day_type',
        'price',
        'sort_order',
    ];

    protected $casts = [
        'price' => 'integer',
        'sort_order' => 'integer',
    ];
}
