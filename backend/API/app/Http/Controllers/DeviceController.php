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
        $device = Device::create($request->all());
        return new DeviceResource($device);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
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
}
