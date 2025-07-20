<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\RoomController;
use App\Http\Controllers\DeviceController;
use App\Http\Controllers\ActivityLogController;
use App\Http\Controllers\AuthController;

// UNPROTECTED ROUTES (javno dostupne bez login-a)

// Auth: Register & Login
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

// Read-only access (npr. za javni prikaz uređaja/soba/logova)
Route::get('/rooms', [RoomController::class, 'index']);
Route::get('/rooms/{id}', [RoomController::class, 'show']);
Route::get('/devices', [DeviceController::class, 'index']);
Route::get('/devices/{id}', [DeviceController::class, 'show']);
Route::get('/logs', [ActivityLogController::class, 'index']);
Route::get('/logs/{id}', [ActivityLogController::class, 'show']);

// PROTECTED ROUTES (zahtevaju login tj. autentifikaciju)

Route::middleware('auth:sanctum')->group(function () {

    // Auth: Logout
    Route::post('/logout', [AuthController::class, 'logout']);

    // Rooms (Create, Update, Delete)
    Route::post('/rooms', [RoomController::class, 'store']);
    Route::put('/rooms/{id}', [RoomController::class, 'update']);
    Route::delete('/rooms/{id}', [RoomController::class, 'destroy']);

    // Devices (Create, Update, Delete)
    Route::post('/devices', [DeviceController::class, 'store']);
    Route::put('/devices/{id}', [DeviceController::class, 'update']);
    Route::delete('/devices/{id}', [DeviceController::class, 'destroy']);

    // Logs (Create, Update, Delete)
    Route::post('/logs', [ActivityLogController::class, 'store']);
    Route::put('/logs/{id}', [ActivityLogController::class, 'update']);
    Route::delete('/logs/{id}', [ActivityLogController::class, 'destroy']);

    // Get za usera
    Route::get('/user', function (Request $request) {
        return $request->user();
    });
});