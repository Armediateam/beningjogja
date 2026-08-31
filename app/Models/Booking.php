<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Booking extends Model
{
    protected $fillable = [
        'customer_name',
        'type',
        'total_price',
        'booking_date',
        'status',
    ];
}
