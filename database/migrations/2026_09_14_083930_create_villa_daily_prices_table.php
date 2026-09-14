<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('villa_daily_prices', function (Blueprint $table) {
            $table->id();
            $table->date('date')->unique();
            $table->unsignedBigInteger('standard_price');
            $table->unsignedBigInteger('family_price');
            $table->unsignedBigInteger('suite_price');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('villa_daily_prices');
    }
};
