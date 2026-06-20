<?php

namespace App\Http\Controllers;

use App\Models\Infracciones;
use App\Models\InfraccionesEstudiantes;
use Inertia\Inertia;
use Illuminate\Http\Request;

class InfraccionesController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $infracciones = Infracciones::all();
        $infraccionesEstudiantes = InfraccionesEstudiantes::with(['estudiante', 'infraccion', 'dispositivo'])
            ->orderByDesc('created_at')
            ->get();

        return Inertia::render('Infracciones/Index',[
            'infracciones' => $infracciones,
            'infraccionesEstudiantes' => $infraccionesEstudiantes,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Infracciones/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'nombre' => 'required|string|max:255',
            'descripcion' => 'required|string',
            'gravedad' => 'required|string',
        ]);

        Infracciones::create($validated);

        return redirect('/infracciones');
    }

    /**
     * Display the specified resource.
     */
    public function show(Infracciones $infracciones)
    {
        return Inertia::render('Infracciones/Show', [
            'infraccion' => $infracciones,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Infracciones $infracciones)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Infracciones $infracciones)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Infracciones $infracciones)
    {
        $infracciones->delete();

        return redirect()->route('infracciones.index');
    }
}
