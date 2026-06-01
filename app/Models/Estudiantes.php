<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Estudiantes extends Model
{

    protected $fillable = [
        'nombre',
        'apellido',
        'cedula',
        'correo',
        'carrera',
        'estado',
    ];

    public function registros() {

    return $this->hasMany(RegistroAcceso::class, 'id_estudiante');
}
}
