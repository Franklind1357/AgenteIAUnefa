<?php

namespace App\Http\Controllers;

use App\Models\Dispositivos;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DispositivosController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $dispositivos = Dispositivos::all();

        return Inertia::render('Dispositivos/Index', [
            'dispositivos' => $dispositivos,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Dispositivos/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name'    => 'required',
            'email'   => 'required|email|unique:dispositivos,email',
            'ubicacion' => 'required',
            'tipo'      => 'required',
            'estado'    => 'required',
            'password'    => 'required',

        ]);

        Dispositivos::create($validated);

        return redirect()->route('dispositivos.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(Dispositivos $dispositivos)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Dispositivos $dispositivos)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Dispositivos $dispositivos)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Dispositivos $dispositivos)
    {
        //
    }
}
