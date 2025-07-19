<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class ActionLog extends Model
{
    use HasFactory;
    
    public function device()
{
    return $this->belongsTo(Device::class);
}

public function user()
{
    return $this->belongsTo(User::class);
}
}
