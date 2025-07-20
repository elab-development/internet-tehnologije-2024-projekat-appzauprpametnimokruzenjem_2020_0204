<?php

namespace App\Http\Controllers;

use App\Models\ActionLog;
use Illuminate\Http\Request;
use App\Http\Resources\ActionLogResource;

class ActivityLogController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return ActionLogResource::collection(ActionLog::with(['user', 'device'])->get());
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $log = ActionLog::create($request->all());
        return new ActionLogResource($log);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        return new ActionLogResource($activityLog->load(['user', 'device']));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $activityLog->update($request->all());
        return new ActionLogResource($activityLog);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $activityLog->delete();
        return response()->json(null, 204);
    }
}
