<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Device;
use App\Models\Room;
use App\Models\ActionLog;

class AdminStatsController extends Controller
{
    public function stats()
    {
        $usersCount = User::count();
        $devicesCount = Device::count();
        $roomsCount = Room::count();
        $avgDevicesPerUser = $usersCount ? $devicesCount / $usersCount : 0;
        $avgDevicesPerRoom = $roomsCount ? $devicesCount / $roomsCount : 0;

        return response()->json([
            'users' => $usersCount,
            'avgDevicesPerUser' => round($avgDevicesPerUser, 2),
            'avgDevicesPerRoom' => round($avgDevicesPerRoom, 2),
        ]);
    }

    public function logsChart()
    {
        $logsByDay = ActionLog::selectRaw('DATE(performed_at) as date, COUNT(*) as count')
            ->groupBy('date')
            ->orderBy('date', 'asc')
            ->get();

        return response()->json($logsByDay);
    }

    public function devicesByType()
    {
        $devices = \App\Models\Device::selectRaw('type, COUNT(*) as count')
            ->groupBy('type')
            ->get();

        return response()->json($devices);
    }
}
