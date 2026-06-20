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
        Schema::create('infracciones_estudiantes', function (Blueprint $table) {
            $table->id();
            $table->foreignId('id_estudiante')->constrained('estudiantes')->cascadeOnDelete();
            $table->foreignId('id_infraccion')->constrained('infracciones')->cascadeOnDelete();
            $table->foreignId('id_dispositivo')->constrained('dispositivos')->cascadeOnDelete();
            $table->string('fecha');
            $table->string('hora');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('infracciones_estudiantes');
    }
};
