<?php

namespace App\Http\Controllers;

use App\Models\Room;
use Illuminate\Http\Request;
use App\Http\Resources\RoomResource;

class RoomController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return RoomResource::collection(Room::with('devices')
        ->orderBy('user_id','Desc')
        ->get());
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
    $validated = $request->validate([
        'name' => 'required|string|max:255',
    ]);

    $room = Room::create([
        'name' => $validated['name'],
        'user_id' => $request->user()->id,
    ]);

    return new RoomResource($room);
    }

    /**
     * Display the specified resource.
     */
    public function show($id){
        $room = Room::with('devices')->find($id);

        if (!$room) {
            return response()->json([
                'message' => "Soba sa ID {$id} nije pronađena."
            ], 404);
        }

        return new RoomResource($room);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $room->update($request->all());
        return new RoomResource($room);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
{
    $room = Room::findOrFail($id);
    $room->delete();

    return response()->json(null, 204);
}

    // nested rute
    public function devices($id)
    {
        $room = Room::with('devices')->findOrFail($id);
        return response()->json($room->devices);
    }

}
