<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\User;
use App\Models\Device;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\ActionLog>
 */
class ActionLogFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'user_id' => User::inRandomOrder()->first()->id,
            'device_id' => Device::inRandomOrder()->first()->id,
            'action' => $this->faker->randomElement(['uključeno', 'isključeno']),
            'performed_at' => $this->faker->dateTimeBetween('-1 month', 'now'),
        ];
    }
}
