<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasApiTokens,HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'role', // dodato zbog pristupa - admin, standard, guest
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    public function actionLogs()
    {
        return $this->hasMany(ActionLog::class);
    }

    // helper metode

    public function isAdmin(): bool
    {
        return $this->role === 'admin';
    }

    public function isStandard(): bool
    {
        return $this->role === 'standard';
    }

    public function isGuest(): bool
    {
        return $this->role === 'guest';
    }

    // za ugnježdene rute
    public function devices()
    {
        return $this->hasMany(Device::class);
    }

}
