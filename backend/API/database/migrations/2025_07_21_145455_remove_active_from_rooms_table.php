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
        // Odbacuje kolonu active u rooms
        Schema::table('rooms', function (Blueprint $table) {
            $table->dropColumn('active');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        // Vraća kolonu, i to na onu izmenjenu verziju, tj. na boolean uesto string kao tip podatka
        Schema::table('rooms', function (Blueprint $table) {
            $table->boolean('active')->default(false);
        });
    }
};
