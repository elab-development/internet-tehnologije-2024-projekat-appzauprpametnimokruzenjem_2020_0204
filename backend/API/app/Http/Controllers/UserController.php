<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Device;
use App\Http\Resources\DeviceResource;

class UserController extends Controller
{
    public function index()
    {
        return User::select('id', 'name')->get();
    }

    public function me(Request $request)
{
    $user = $request->user()->load('rooms.devices');

    return response()->json($user);
}

    // Vrati uređaje određenog korisnika
    public function devices($id)
    {
        $user = User::findOrFail($id);

        $devices = Device::whereHas('room', function ($q) use ($id) {
            $q->where('user_id', $id);
        })->with(['room'])->orderBy('room_id', 'desc')->get();

        return DeviceResource::collection($devices);
    }

    // Vrati logove određenog korisnika
    public function logs($id)
    {
        $user = User::findOrFail($id);

        $logs = $user->actionLogs()
            ->with('device.room')
            ->orderBy('performed_at', 'desc')
            ->get();

        return response()->json($logs);
    }
}
