<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Device extends Model
{
    use HasFactory;
    
    // 1-1 veza prema room
    public function room()
    {
        return $this->belongsTo(Room::class);
    }

    // 0-M veza prema logs
    public function actionLogs()
    {
        return $this->hasMany(ActionLog::class);
    }

    // zbog ugježdavanja
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    protected $fillable = ['name', 'type', 'status', 'room_id', 'user_id'];

}
