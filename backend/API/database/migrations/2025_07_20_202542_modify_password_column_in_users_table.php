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
        Schema::table('users', function (Blueprint $table) {
            // Postavljamo da password kolona ima max 40 karaktera i da nije null
            $table->string('password', 40)->nullable(false)->change();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            // Vraćamo kolonu na prethodno stanje (pretpostavimo 255 karaktera i nullable)
            $table->string('password', 255)->nullable()->change();
        });
    }
};
