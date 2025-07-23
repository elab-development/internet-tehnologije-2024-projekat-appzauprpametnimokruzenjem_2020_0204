<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\ActionLog;
use App\Models\Device;
use App\Models\User;
use App\Models\Room;

class ActionLogSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Room::with('devices')->get()->each(function ($room) {
            $user = $room->user;
            foreach ($room->devices as $device) {
                ActionLog::factory()
                    ->count(rand(30, 60))
                    ->create([
                        'user_id' => $user->id,
                        'device_id' => $device->id,
                    ]);
            }
        });
    }
}
