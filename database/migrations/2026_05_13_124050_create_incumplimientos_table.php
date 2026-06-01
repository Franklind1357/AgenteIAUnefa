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
        Schema::create('incumplimientos', function (Blueprint $table) {
            $table->id();
            $table->string('ruta_evidencia')->nullable();
            $table->enum('estado', ['pendiente', 'verificado', 'anulado'])->default('pendiente');
            $table->dateTime('fecha_incumplimiento');

            $table->foreignId('id_estudiante')->constrained('estudiantes');
            $table->foreignId('id_normas')->constrained('normas');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('incumplimientos');
    }
};
