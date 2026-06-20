<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class ReglamentoController extends Controller
{
    public function index(){
        
        return Inertia::render('Reglamentos/Index');
    }
}
