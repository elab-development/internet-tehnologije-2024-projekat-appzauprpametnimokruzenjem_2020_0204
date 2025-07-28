<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Room;
use App\Models\User;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Room>
 */
class RoomFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    protected $model = Room::class;

    public function definition(): array
    {
        return [
            'name' => $this->faker->randomElement(['Kuhinja', 'Spavaća', 'Dnevna', 'Hodnik', 'Kupatilo']),
            'user_id' => User::inRandomOrder()->first()->id, // svaki room dodeljen nekom useru
        ];
    }
}
