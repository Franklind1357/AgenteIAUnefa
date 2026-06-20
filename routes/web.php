<?php

use App\Http\Controllers\AccesoController;
use App\Http\Controllers\BiometriaController;
use Illuminate\Support\Facades\Route;
use Laravel\Fortify\Features;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\EstudiantesController;
use App\Http\Controllers\DispositivosController;
use App\Http\Controllers\InfraccionesController;
use App\Http\Controllers\InfraccionesEstudiantesController;
use App\Http\Controllers\ReglamentoController;
use App\Models\Infracciones;

Route::inertia('/', 'welcome', [
    'canRegister' => Features::enabled(Features::registration()),
])->name('home');

Route::middleware(['auth', 'verified', 'can:gestion administrativa'])->group(function () {

    //Rutas para los Estudiantes
    Route::get('/estudiantes',[EstudiantesController::class, 'index'])->name('estudiantes.index');
    Route::get('/estudiantes/create',[EstudiantesController::class, 'create'])->name('estudiantes.create');
    Route::post('/estudiantes/store',[EstudiantesController::class, 'store'])->name('estudiantes.store');
    Route::get('/estudiantes/show/{estudiante}', [EstudiantesController::class, 'show'])->name('estudiantes.show');
    Route::get('/estudiantes/show/{estudiante}/edit', [EstudiantesController::class, 'edit'])->name('estudiantes.edit');
    Route::put('/estudiantes/show/{estudiante}/edit/update', [EstudiantesController::class, 'update'])->name('estudiantes.update');
    Route::delete('/estudiantes/show/{estudiante}/delete',[EstudiantesController::class, 'destroy'])->name('estudiantes.destroy');

    //Rutas para los Dispositivos
    Route::get('/dispositivos',[DispositivosController::class, 'index'])->name('dispositivos.index');
    Route::get('/dispositivos/create',[DispositivosController::class, 'create'])->name('dispositivos.create');
    Route::post('/dispositivos/store',[DispositivosController::class, 'store'])->name('dispositivos.store');
    Route::get('/dispositivos/show/{dispositivos}',[DispositivosController::class, 'show'])->name('dispositivos.show');
    Route::get('/dispositivos/show/{dispositivos}/edit',[DispositivosController::class, 'edit'])->name('dispositivos.edit');
    Route::put('/dispositivos/show/{dispositivos}/edit/update',[DispositivosController::class, 'update'])->name('dispositivos.update');
    Route::delete('dispositivos/show/{dispositivos}/delete',[DispositivosController::class, 'destroy'])->name('dispositivos.destroy');

    //Rutas para las Infracciones
    Route::get('/infracciones',[ InfraccionesController::class, 'index'])->name('infracciones.index');
    Route::get('/infracciones/create', [InfraccionesController::class, 'create'])->name('infracciones.create');
    Route::post('/infracciones/store', [InfraccionesController::class, 'store'])->name('infracciones.store');
    Route::get('/infracciones/show/{infracciones}', [InfraccionesController::class, 'show'])->name('infracciones.show');
    Route::delete('/infracciones/show/{infracciones}/delete', [InfraccionesController::class, 'destroy'])->name('infracciones.destroy');

    //Rutas para las InfraccionesEstudiantes
    Route::get('infracciones/show/{infracionesEstudiantes}/estudiantes', [InfraccionesController::class, 'show_estudiantes'])->name('infracciones.estudiantes.show');
    

    //Rutas para los Reglamentos
    Route::get('/reglamentos', [ReglamentoController::class, 'index'])->name('reglamento.index');

    //Rutas para Asistencias
    Route::get('/asistencias', [AccesoController::class, 'index'])->name('asistencia.index');
});

Route::middleware(['auth', 'verified'])->group(function () {

    //Rutas para el Dashboard
    Route::get('dashboard', [DashboardController::class, 'index'])->name('dashboard');

        // Rutas AJAX / API para el módulo de estudiantes
    Route::post('/estudiantes/verificar-cedula', [EstudiantesController::class, 'verificarCedula'])->name('estudiantes.verificarCedula');
    Route::post('/estudiantes/registro-dispositivo', [EstudiantesController::class, 'registroDispositivo'])->name('estudiantes.registroDispositivo');

});

Route::middleware(['auth', 'verified', 'can:gestion dispositivos'])->group(function () {

    //Rutas Interfaz Dispositivo
    Route::get('/dashboard/biometrico/{dispositivos}', [BiometriaController::class, 'index'])->name('biometrico.index');
    Route::post('/dashboard/biometrico/scan', [BiometriaController::class, 'scan'])->name('biometrico.scan');

});

require __DIR__.'/settings.php';
