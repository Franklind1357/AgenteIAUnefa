<?php

namespace App\Http\Controllers;

use App\Models\Biometria;
use App\Models\Dispositivos;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Inertia\Inertia;

class BiometriaController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Dispositivos $dispositivo)
    {
        return Inertia::render('Biometrico/Create', [
            'dispositivos' => $dispositivo,
        ]);
    }

    public function scan(Request $request)
    {
        $validated = $request->validate([
            'cedula' => 'required|string|max:20',
            'foto' => 'required|image|max:10240',
        ]);

        $foto = $request->file('foto');
        if (! $foto->isValid()) {
            return response()->json(['error' => 'La imagen subida no es válida.'], 422);
        }

        $serviceUrl = config('services.ia.url', env('IA_SERVICE_URL', 'http://127.0.0.1:8001'));
        $response = Http::attach(
            'file',
            file_get_contents($foto->path()),
            $foto->getClientOriginalName()
        )
        ->timeout(30)
        ->post($serviceUrl . '/predict');

        if ($response->failed()) {
            return response()->json([
                'error' => 'No se pudo comunicar con el servicio de IA.',
                'details' => $response->body(),
            ], 500);
        }

        $payload = $response->json();
        $className = $payload['class_name'] ?? null;
        $confidence = $payload['confidence'] ?? null;

        return response()->json([
            'aprobado' => $className === 'correcta',
            'mensaje' => $className === 'correcta'
                ? 'Uniforme correcto y carnet visible.'
                : 'Uniforme o carnet inválido. Verifique al usuario.',
            'confidence' => $confidence,
            'raw' => $payload,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Biometria $biometria)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Biometria $biometria)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Biometria $biometria)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Biometria $biometria)
    {
        //
    }
}
