<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class WeatherController extends Controller
{
    public function index(Request $request)
    {
        // Test IP iz Yettela // $request->ip()
        $ip = '109.245.192.15'; 

        // 1. Geolokacija po IP
        $geo = Http::get("http://ip-api.com/json/{$ip}");

        if (!$geo->successful() || $geo['status'] !== 'success') {
            return response()->json(['message' => 'Geolokacija nije uspela.'], 400);
        }

        $lat = $geo['lat'];
        $lon = $geo['lon'];

        // 2. Vremenska prognoza po koordinatama
        $weather = Http::get("https://api.openweathermap.org/data/2.5/weather", [
            'lat' => $lat,
            'lon' => $lon,
            'appid' => '58bf9ec7253c7c287341f0eae8e16d10', // moj ključ
            'units' => 'metric'
        ]);

        if (!$weather->successful()) {
            return response()->json(['message' => 'Neuspešan poziv vremenske prognoze.'], 400);
        }

        return response()->json([
            'location' => [
                'city' => $geo['city'],
                'lat' => $lat,
                'lon' => $lon,
                'country' => $geo['country']
            ],
            'weather' => $weather->json()
        ]);
    }
}
