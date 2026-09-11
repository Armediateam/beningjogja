<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('pool_sessions', function (Blueprint $table) {
            $table->id();
            $table->string('code');
            $table->string('time_label');
            $table->enum('day_type', ['weekday', 'weekend']);
            $table->unsignedBigInteger('price');
            $table->integer('sort_order')->default(0);
            $table->timestamps();

            $table->unique(['code', 'day_type']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pool_sessions');
    }
};
