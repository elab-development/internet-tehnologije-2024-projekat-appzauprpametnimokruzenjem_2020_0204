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
        return DeviceResource::collection(Device::all());
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
        'name' => 'required|string|max:255',
        'room_id' => 'required|exists:rooms,id',
    ]);

    $device = Device::create([
        'name' => $validated['name'],
        'room_id' => $validated['room_id'],
        'user_id' => $request->user()->id, // ovo dodeljuje aktivnog korisnika
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
    public function update(Request $request, string $id)
    {
        $device->update($request->all());
        return new DeviceResource($device);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $device->delete();
        return response()->json(null, 204);
    }

    // nested rute
    public function byUser($userId)
    {
        $devices = Device::where('user_id', $userId)->get();
        return response()->json($devices);
    }

}
