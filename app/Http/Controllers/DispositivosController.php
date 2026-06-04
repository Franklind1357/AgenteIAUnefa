<?php

namespace App\Http\Controllers;

use App\Models\Dispositivos;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;
use Illuminate\Validation\Rule;

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
            'password'    => 'required|confirmed',
        ]);

        $claveHasheada = Hash::make($validated['password']); // Se encripta la contraseña antes de guardarla

        $nuevoUsuario = User::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'password' => $claveHasheada,
        ]);
        
        $dispositivo = Dispositivos::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'password' => $claveHasheada,
            'ubicacion' => $validated['ubicacion'],
            'tipo' => $validated['tipo'],
            'estado' => $validated['estado'],
            'id_users' => $nuevoUsuario->id, // Se asigna el ID del nuevo usuario al dispositivo
        ]);

        return redirect()->route('dispositivos.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(Dispositivos $dispositivos)
    {
        $dispotivo = Dispositivos::find($dispositivos->id);

        return Inertia::render('Dispositivos/Show', [
            'dispositivo' => $dispotivo,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Dispositivos $dispositivos)
    {
        $dispositivo = Dispositivos::findOrFail($dispositivos->id);

        return Inertia::render('Dispositivos/Edit', [
            'dispositivo' => $dispositivo,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Dispositivos $dispositivos)
    {
        $validated = $request->validate([
            'name'      => 'required',
            'email'     => [
                'required',
                'email',
                Rule::unique('users', 'email')->ignore($dispositivos->id_users),
                Rule::unique('dispositivos', 'email')->ignore($dispositivos->id),
            ],
            'ubicacion' => 'required',
            'tipo'      => 'required',
            'estado'    => 'required',
            'password'  => 'nullable|confirmed',
        ]);

        $usuario = User::find($dispositivos->id_users);

        $datosUsuario = [
            'name'  => $validated['name'],
            'email' => $validated['email'],
        ];

        $datosDispositivo = [
            'name'      => $validated['name'],
            'email'     => $validated['email'],
            'ubicacion' => $validated['ubicacion'],
            'tipo'      => $validated['tipo'],
            'estado'    => $validated['estado'],
        ];

        if (!empty($validated['password'])) {
            $passwordHasheada = Hash::make($validated['password']);
            $datosUsuario['password'] = $passwordHasheada;
            $datosDispositivo['password'] = $passwordHasheada;
        }

        if ($usuario) {
            $usuario->update($datosUsuario);
        }

        $dispositivos->update($datosDispositivo);

        Inertia::flash('toast', [
            'type' => 'success',
            'message' => 'Dispositivo actualizado.',
        ]);

        return redirect()->route('dispositivos.show', $dispositivos->id);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Dispositivos $dispositivos)
    {
        //
    }
}
