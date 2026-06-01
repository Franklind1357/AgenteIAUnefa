<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('accesos', function (Blueprint $table) {
            $table->id();
            $table->enum('tipo_acceso', ['entrada', 'salida']);
            $table->string('resultado');
            $table->timestamps();

            // Index: Optimiza la búsqueda de reportes por estudiante y fecha
            $table->index(['id_estudiante', 'created_at']);
            $table->foreignId('id_estudiante')->constrained('estudiantes');
            $table->foreignId('id_dispositivo')->constrained('dispositivos');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('accesos');
    }
};
