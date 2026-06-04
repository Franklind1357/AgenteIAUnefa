<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Dispositivos extends Model
{
    protected $fillable = [
        'name',
        'email',
        'password',
        'ubicacion',
        'tipo',
        'estado',
        'id_users',
    ];
}
