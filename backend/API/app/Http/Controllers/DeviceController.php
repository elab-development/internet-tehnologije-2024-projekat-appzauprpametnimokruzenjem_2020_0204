<?php

namespace App\Http\Controllers;

use App\Models\Device;
use Illuminate\Http\Request;
use App\Http\Resources\DeviceResource;

class DeviceController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return DeviceResource::collection(Device::with('room.user')->get());
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'type' => 'required|string|in:sijalica,ventilator,brava,senzor,zvučnik',
            'status' => 'required|string|in:on,off',
            'room_id' => 'required|exists:rooms,id',
        ]);

        $device = Device::create([
            'name' => $validated['name'],
            'type' => $validated['type'],
            'status' => $validated['status'],
            'room_id' => $validated['room_id'],
        ]);

        return new DeviceResource($device);
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $device = Device::with('room')->find($id);

        if (!$device) {
            return response()->json([
                'message' => "Uređaj sa ID {$id} nije pronađen."
            ], 404);
        }

        return new DeviceResource($device);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
{
    $validated = $request->validate([
        'status' => 'required|string|in:on,off',
    ]);

    $device = Device::findOrFail($id);
    $device->update(['status' => $validated['status']]);

    return new DeviceResource($device);
}

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
{
    $device = Device::findOrFail($id);
    $device->delete();

    return response()->json(null, 204);
}

}
