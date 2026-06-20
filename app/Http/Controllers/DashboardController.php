<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index(Request $request)
    {
        return Inertia::render('dashboard', [
            'puedeEscanear' => $request->user()?->can('gestion dispositivos') ?? false,
            'noPuedeEscanear' => $request->user()?->can('gestion administrativa') ?? false,
            'dispositivoActual' => [
                'id' => $request->user()->id,
                'name' => $request->user()->name,
                'ubicacion' => 'Acceso Principal',
            ],
        ]);
    }
}
