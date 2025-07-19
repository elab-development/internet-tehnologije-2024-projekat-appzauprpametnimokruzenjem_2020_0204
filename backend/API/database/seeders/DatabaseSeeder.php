<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
       
    // Napravi tačno 2 korisnika
    $users = \App\Models\User::factory()->count(2)->create();

    // Napravi 5 soba
    $rooms = \App\Models\Room::factory(5)->create();

    // Za svaku sobu, napravi po 2–4 uređaja
    $rooms->each(function ($room) use ($users) {
        $devices = \App\Models\Device::factory(rand(2, 4))->create([
            'room_id' => $room->id,
        ]);

        // Za svaki uređaj, napravi 3–5 akcija sa random user-om
        $devices->each(function ($device) use ($users) {
            \App\Models\ActionLog::factory(rand(3, 5))->create([
                'device_id' => $device->id,
                'user_id' => $users->random()->id,
            ]);
        });
    });
    }
}
