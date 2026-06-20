<?php

namespace App\Http\Controllers;

use App\Enums\Carreras;
use App\Enums\Semestres;
use App\Models\Estudiantes;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

class EstudiantesController extends Controller
{
    public function index()
    {
        $estudiantes = Estudiantes::all()->map(function (Estudiantes $estudiante) {
            return array_merge($estudiante->toArray(), [
                'carrera_label' => Carreras::tryFrom($estudiante->carrera)?->label() ?? $estudiante->carrera,
                'semestre_label' => Semestres::tryFrom((int) $estudiante->semestre)?->label() ?? $estudiante->semestre,
            ]);
        });

        return Inertia::render('Estudiantes/Index', [
            'estudiantes' => $estudiantes,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Estudiantes/Create',[
            'carreras' => array_map(fn(Carreras $c) =>[
                'value' => $c->value,
                'label' => $c->label(),
            ], Carreras::cases()),
            'semestres' => array_map(fn(Semestres $c) =>[
                'value' => $c->value,
                'label' => $c->label(),
            ], Semestres::cases()),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $carreras = array_map(fn(Carreras $c) => $c->value, Carreras::cases());
        $semestres = array_map(fn(Semestres $s) => (string) $s->value, Semestres::cases());

        $validated = $request->validate([
            'nombre' => 'required|string|max:250',
            'apellido' => 'required|string|max:250',
            'cedula' => 'required|string|max:20|unique:estudiantes,cedula',
            'carrera' => ['required', Rule::in($carreras)],
            'semestre' => ['required', Rule::in($semestres)],
        ]);

        Estudiantes::create($validated);

        return redirect('/estudiantes');
    }

    public function verificarCedula(Request $request)
    {
        $request->validate([
            'cedula' => 'required|string|max:20',
        ]);

        $estudiante = Estudiantes::where('cedula', $request->input('cedula'))->first();

        return response()->json([
            'existe' => (bool) $estudiante,
            'estudiante' => $estudiante
                ? [
                    'id' => $estudiante->id,
                    'nombre' => $estudiante->nombre,
                    'apellido' => $estudiante->apellido,
                    'cedula' => $estudiante->cedula,
                    'carrera' => $estudiante->carrera,
                    'semestre' => $estudiante->semestre,
                ]
                : null,
        ]);
    }

    public function registroDispositivo(Request $request)
    {
        $validated = $request->validate([
            'cedula' => 'required|string|max:20|unique:estudiantes,cedula',
            'nombre' => 'required|string|max:250',
            'carrera' => 'required|string|max:100',
        ]);

        $estudiante = Estudiantes::create([
            'nombre' => $validated['nombre'],
            'apellido' => '',
            'cedula' => $validated['cedula'],
            'carrera' => $validated['carrera'],
            'semestre' => 'N/A',
            'estado' => 'activo',
        ]);

        return response()->json([
            'exito' => true,
            'estudiante' => [
                'id' => $estudiante->id,
                'nombre' => $estudiante->nombre,
                'cedula' => $estudiante->cedula,
                'carrera' => $estudiante->carrera,
            ],
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Estudiantes $estudiante)
    {
        return Inertia::render('Estudiantes/Show', [
            'estudiante' => array_merge($estudiante->toArray(), [
                'carrera_label' => Carreras::tryFrom($estudiante->carrera)?->label() ?? $estudiante->carrera,
                'semestre_label' => Semestres::tryFrom((int) $estudiante->semestre)?->label() ?? $estudiante->semestre, 
            ]),
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Estudiantes $estudiante)
    {
        return Inertia::render('Estudiantes/Edit', [
            'estudiante' => array_merge($estudiante->toArray(), [
                'carrera_label' => Carreras::tryFrom($estudiante->carrera)?->label() ?? $estudiante->carrera,
                'semestre_label' => Semestres::tryFrom((int) $estudiante->semestre)?->label() ?? $estudiante->semestre, 
            ]),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Estudiantes $estudiante)
    {
        $carreras = array_map(fn(Carreras $c) => $c->value, Carreras::cases());
        $semestres = array_map(fn(Semestres $s) => (string) $s->value, Semestres::cases());

        $validated = $request->validate([
            'nombre' => 'required|string|max:250',
            'apellido' => 'required|string|max:250',
            'cedula' => ['required','string','max:20', Rule::unique('estudiantes','cedula')->ignore($estudiante->id)],
            'carrera' => ['required', Rule::in($carreras)],
            'semestre' => ['required', Rule::in($semestres)],
        ]);

        $estudiante->update($validated);

        return redirect()->route('estudiantes.show', $estudiante->id);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Estudiantes $estudiante)
    {
        $estudiante->delete();

        return redirect()->route('estudiantes.index');
    }
}
