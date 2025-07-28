<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class ActionLog extends Model
{
    use HasFactory;
    
    // 1-1 prema useru
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    // 1-1 prema device
    public function device()
    {
        return $this->belongsTo(Device::class);
    }
}
