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
        $rooms = Room::all();
        $users = User::all();

        foreach ($rooms as $room) {
            Device::factory(rand(2, 7))->create([
                'room_id' => $room->id,
                'user_id' => $users->random()->id,
            ]);
        }
    }
}
