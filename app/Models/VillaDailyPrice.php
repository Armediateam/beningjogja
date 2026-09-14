<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class VillaDailyPrice extends Model
{
    protected $fillable = [
        'date',
        'standard_price',
        'family_price',
        'suite_price',
    ];

    protected $casts = [
        'date' => 'date:Y-m-d',
    ];
}
