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
        Schema::table('bookings', function (Blueprint $table) {
            $table->string('booking_code')->unique()->after('id')->nullable();
            $table->string('customer_email')->nullable()->after('customer_name');
            $table->string('customer_phone')->nullable()->after('customer_email');
            $table->string('payment_proof')->nullable()->after('booking_date');
            // We can't easily change default value using Schema::table without doctrine/dbal, 
            // so we will just change the default status of existing records to pending if needed,
            // or just ensure we pass 'pending' when creating.
            // But we can alter the column if we really want to:
            // $table->string('status')->default('pending')->change();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('bookings', function (Blueprint $table) {
            $table->dropColumn(['booking_code', 'customer_email', 'customer_phone', 'payment_proof']);
        });
    }
};
