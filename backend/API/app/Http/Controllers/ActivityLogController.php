<?php

namespace App\Http\Controllers;

use App\Models\ActionLog;
use Illuminate\Http\Request;
use App\Http\Resources\ActionLogResource;
use Illuminate\Support\Facades\Response;
use Barryvdh\DomPDF\Facade\Pdf;

class ActivityLogController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return ActionLogResource::collection(
            ActionLog::with(['user', 'device.room'])
                ->orderBy('performed_at', 'desc') // uvek da se najnoviji pišu na vrhu
                ->get()
        );
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

    public function exportCsv()
{
    $logs = \App\Models\ActionLog::with(['user', 'device'])->get();

    $csvData = [];

    // Header
    $csvData[] = ['ID', 'Korisnik', 'Uređaj', 'Tip', 'Akcija', 'Vreme izvršavanja'];

    // Podaci
    foreach ($logs as $log) {
        $csvData[] = [
            $log->id,
            $log->user?->name ?? '?',
            $log->device?->name ?? '?',
            $log->device?->type ?? '?',
            $log->action,
            $log->performed_at,
        ];
    }

    // Pretvaranje u CSV string
    $filename = 'izveštaj_' . now()->format('Y_m_d_His') . '.csv';

    $handle = fopen('php://temp', 'r+');
    foreach ($csvData as $row) {
        fputcsv($handle, $row);
    }
    rewind($handle);
    $csv = stream_get_contents($handle);
    fclose($handle);

    return Response::make($csv, 200, [
        'Content-Type' => 'text/csv',
        'Content-Disposition' => "attachment; filename=\"$filename\"",
    ]);
   
}
 // Pretvaranje u PDF
    public function exportPdf()
    {
        ini_set('memory_limit', '500M');// za vecu bazu

        $logs = \App\Models\ActionLog::with(['user', 'device'])->get();
        $pdf = Pdf::loadView('logs.pdf', compact('logs'));
        $filename = 'izveštaj_' . now()->format('Y_m_d_His') . '.pdf';

        return $pdf->download($filename);
    }

}
