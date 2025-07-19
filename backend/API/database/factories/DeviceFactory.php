<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Device;
use App\Models\Room;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Device>
 */
class DeviceFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => $this->faker->randomElement(['Svetlana', 'Borko', 'Marijana', 'Časlav', 'Vesna']),
            'type' => $this->faker->randomElement(['sijalica', 'termostat', 'kamera', 'brava', 'senzor']),
            'status' => $this->faker->randomElement(['uključeno', 'isključeno']),
            'room_id' => Room::factory(),
        ];
    }
}
