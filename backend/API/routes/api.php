<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\RoomController;
use App\Http\Controllers\DeviceController;
use App\Http\Controllers\ActivityLogController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserController; // možda posle za GET users
use Illuminate\Support\Facades\Http; // za spoljašne APIs


// UNPROTECTED ROUTES (javno dostupne bez login-a)

// Auth: Register & Login
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

// Public GET access (Rooms i Devices)
Route::get('/rooms', [RoomController::class, 'index']);
Route::get('/rooms/{id}', [RoomController::class, 'show']);
Route::get('/devices', [DeviceController::class, 'index']);
Route::get('/devices/{id}', [DeviceController::class, 'show']);

// VREME RUTA
Route::get('/weather', [App\Http\Controllers\WeatherController::class, 'index']);

// Ugnježdene rute (nested)

// GET svi uređaji iz jedne sobe
Route::get('/rooms/{room}/devices', [RoomController::class, 'devices']);
// GET svi uređaji koje je kreirao korisnik
Route::get('/users/{user}/devices', [UserController::class, 'devices']);
// GET svih logova jednog korisnika
Route::get('/users/{user}/logs', [UserController::class, 'logs']);

// PROTECTED ROUTES (za sve ulogovane korisnike)
Route::middleware('auth:sanctum')->group(function () {

    // Logout
    Route::post('/logout', [AuthController::class, 'logout']);

    // Rooms (CREATE, UPDATE, DELETE)
    Route::post('/rooms', [RoomController::class, 'store']);
    Route::put('/rooms/{id}', [RoomController::class, 'update']);
    Route::delete('/rooms/{id}', [RoomController::class, 'destroy']);

    // Devices (CREATE, UPDATE, DELETE)
    Route::post('/devices', [DeviceController::class, 'store']);
    Route::put('/devices/{id}', [DeviceController::class, 'update']);
    Route::delete('/devices/{id}', [DeviceController::class, 'destroy']);

    // Dohvatanje sopstvenog profila
    Route::get('/user', function (Request $request) {
        return $request->user();
    });

    // PROTECTED ADMIN ROUTES
    Route::middleware('role:admin')->group(function () {

        // Users GET
        Route::get('/users', [UserController::class, 'index']);

        // Logs (GET, CREATE, UPDATE, DELETE)
        Route::get('/logs', [ActivityLogController::class, 'index']);
        Route::get('/logs/{id}', [ActivityLogController::class, 'show']);
        Route::post('/logs', [ActivityLogController::class, 'store']);
        Route::put('/logs/{id}', [ActivityLogController::class, 'update']);
        Route::delete('/logs/{id}', [ActivityLogController::class, 'destroy']);

        // export rute za poverljive podatke
        Route::get('/logs/export/pdf', [ActivityLogController::class, 'exportPdf']);
        Route::get('/logs/export/csv', [ActivityLogController::class, 'exportCsv']);

    });

});

Route::get('/logs/export/csv', [ActivityLogController::class, 'exportCsv']);
Route::get('/logs/export/pdf', [ActivityLogController::class, 'exportPdf']);
Route::get('/logs', [ActivityLogController::class, 'index']);
Route::get('/users', [UserController::class, 'index']);

// test za uvezivanje UI i API
Route::get('/ping', function () {
    return response()->json(['message' => 'API radi!']);
});