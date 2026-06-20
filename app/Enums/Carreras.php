<?php

namespace App\Enums;

enum Carreras: string
{
    case SISTEMAS = "SISTEMAS";
    case NAVAL = "NAVAL";
    case PETROQUIMICA = "PETROQUIMICA";
    case ENFERMERIA = "ENFERMERIA";
    case TURISMO = "TURISMO";
    case ECONOMIASOCIAL = "ECONOMIASOCIAL";

    public function label(): string{

        return match($this){
            self::SISTEMAS => "Ingeniería de Sistemas",
            self::NAVAL => "Ingeniería Naval",
            self::PETROQUIMICA => "Ingeniería Petroquimica",
            self::ENFERMERIA => "TSU Enfermeria",
            self::TURISMO => "TSU Turismo",
            self::ECONOMIASOCIAL => "Licenciatura en Economia Social",
        };
    }

}





