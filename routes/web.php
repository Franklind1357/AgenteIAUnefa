<?php

use Illuminate\Support\Facades\Route;
use Laravel\Fortify\Features;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\EstudiantesController;
use App\Http\Controllers\DispositivosController;

Route::inertia('/', 'welcome', [
    'canRegister' => Features::enabled(Features::registration()),
])->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::inertia('dashboard', 'dashboard')->name('dashboard');
    Route::get('dashboard', [DashboardController::class, 'index'])->name('dashboard');
    Route::get('/estudiantes',[EstudiantesController::class, 'index'])->name('estudiantes.index'); 
    Route::get('/dispositivos',[DispositivosController::class, 'index'])->name('dispositivos.index');
    Route::get('/dispositivos/create',[DispositivosController::class, 'create'])->name('dispositivos.create');
    Route::post('/dispositivos/store',[DispositivosController::class, 'store'])->name('dispositivos.store');
    
});

require __DIR__.'/settings.php';
