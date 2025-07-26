<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Room extends Model
{
    use HasFactory;
    
    // 1-1 veza prema user
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    // 0-M veza prema devices
    public function devices()
    {
        return $this->hasMany(Device::class);
    }


}
