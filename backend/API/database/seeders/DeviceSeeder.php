<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Device;
use App\Models\Room;
use App\Models\User;

class DeviceSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Room::all()->each(function ($room) {
            Device::factory()
                ->count(rand(2, 5))
                ->create(['room_id' => $room->id]);
        });
    }
}
