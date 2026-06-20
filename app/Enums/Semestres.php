<?php

namespace App\Enums;

enum Semestres: int
{
    
    case PRIMER = 1;
    case SEGUNDO = 2;
    case TERCERO = 3;
    case CUARTO = 4;
    case QUINTO = 5;
    case SEXTO = 6;
    case SEPTIMO = 7;
    case OCTAVO = 8;

    public function label(): string{

        return match($this){
            self::PRIMER => "Primer Semestre",
            self::SEGUNDO => "Segundo Semestre",
            self::TERCERO => "Tercero Semestre",
            self::CUARTO => "Cuarto Semestre",
            self::QUINTO => "Quinto Semestre",
            self::SEXTO => "Sexto Semestre",
            self::SEPTIMO => "Septimo Semestre",
            self::OCTAVO => "Octavo Semestre",
        };
    }

}

