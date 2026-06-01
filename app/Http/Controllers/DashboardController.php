<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Incumplimientos;
use Carbon\Carbon;

class DashboardController extends Controller
{
    public function index()
    {
        $fecha = Carbon::now()->format('Y-m-d');
        $incumplimientos = Incumplimientos::whereDate('fecha_incumplimiento', $fecha)->get();
        return Inertia::render('dashboard', [
            'incumplimientos' => $incumplimientos,
        ]);
    }
}
