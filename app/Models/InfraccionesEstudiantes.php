<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class InfraccionesEstudiantes extends Model
{
    protected $fillable = [
        'id_estudiante',
        'id_dispositivo',
        'id_infraccion',
        'fecha',
        'hora',
    ];
    
    public function estudiante(){
        return $this->belongsTo(Estudiantes::class, 'id_estudiante');
    }

    public function infraccion(){
        return $this->belongsTo(Infracciones::class, 'id_infraccion');
    }

    public function dispositivo(){
        return $this->belongsTo(Dispositivos::class, 'id_dispositivo');
    }
}
