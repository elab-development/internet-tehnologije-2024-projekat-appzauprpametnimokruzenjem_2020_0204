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
        // Prvo menjamo ime kolone iz info u active
        Schema::table('rooms', function (Blueprint $table) {
            $table->renameColumn('info', 'active');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        // Vraćamo na string info
        Schema::table('rooms', function (Blueprint $table) {
            $table->renameColumn('active', 'info');
        });
    }
};