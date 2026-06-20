<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Estudiantes extends Model
{

    protected $fillable = [
        'nombre',
        'apellido',
        'cedula',
        'carrera',
        'semestre',
        'estado',
    ];

    public function registros() {

    return $this->hasMany(Acceso::class, 'id_estudiante');
}
}
