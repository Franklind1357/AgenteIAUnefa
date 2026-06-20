<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('alertas', function (Blueprint $table) {
            $table->id();
            $table->foreignId('id_infracciones')->constrained('infracciones')->onDelete('cascade');
            $table->text('mensaje');
            $table->string('nivel');
            $table->timestamp('leido_el')->nullable();
            $table->timestamps();
        });

        // TRIGGER en Español
        DB::unprepared('
            CREATE TRIGGER tr_alerta_automatica_infraccion
            AFTER INSERT ON infracciones
            FOR EACH ROW
            BEGIN
                INSERT INTO alertas (id_infracciones, mensaje, nivel, created_at, updated_at)
                VALUES (
                    NEW.id, 
                    CONCAT("Nueva infracción detectada con ID: ", NEW.id),
                    "urgente",
                    NOW(),
                    NOW()
                );
            END
        ');
    }

    public function down(): void {
        DB::unprepared('DROP TRIGGER IF EXISTS tr_alerta_automatica_infraccion');
        Schema::dropIfExists('alertas');
    }
};
