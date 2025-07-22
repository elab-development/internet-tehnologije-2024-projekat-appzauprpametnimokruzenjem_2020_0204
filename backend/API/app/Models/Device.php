<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Device extends Model
{
    use HasFactory;
    
    public function room()
    {
        return $this->belongsTo(Room::class);
    }

    public function actionLogs()
    {
        return $this->hasMany(ActionLog::class);
    }

    // zbog ugježdavanja
    public function user()
    {
        return $this->belongsTo(User::class);
    }

}
