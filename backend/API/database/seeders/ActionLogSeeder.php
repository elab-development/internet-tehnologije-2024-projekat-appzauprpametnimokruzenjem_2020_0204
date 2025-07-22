<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\ActionLog;
use App\Models\Device;
use App\Models\User;

class ActionLogSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $devices = Device::all();
        $users = User::all();

        foreach ($devices as $device) {
            ActionLog::factory(rand(10, 20))->create([
                'device_id' => $device->id,
                'user_id' => $users->random()->id,
            ]);
        }
    }
}
