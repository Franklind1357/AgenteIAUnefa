import { Head, Link, router } from "@inertiajs/react";
import React from "react";
import { User, GraduationCap, BookOpen, IdCard, Activity, ArrowLeft, Edit, AlertCircle, Trash2 } from "lucide-react";

interface Estudiante{
    id:string;
    nombre:string;
    apellido:string;
    cedula:string;
    carrera_label:string;
    semestre_label:string;
}

interface ShowProps{
    estudiante: Estudiante;
}

export default function VerEstudiante({estudiante}: ShowProps){
    const handleEliminar =() =>{
        const seguro = confirm(`¿Estás seguro de que deseas eliminar al estudiante ${estudiante.nombre}? Esta acción no se puede deshacer.`);

        if(seguro){
            router.delete(`/estudiantes/show/${estudiante.id}/delete`,{
                onSuccess:() =>{
                    alert("Estudiante eliminado exitosamente.")
                }, 
                onError:(errors) =>{
                    console.error("Error al elminiar al estudiante:", errors)
                }
            })
        }
    }

    return (
        <>
            <Head title={`Perfil: ${estudiante.nombre} - Agente IA UNEFA`} />

            {/* 🎨 Contenedor Premium SaaS (Idéntico a tu original) */}
            <div className="relative flex h-full flex-1 flex-col gap-8 p-6 md:p-8 bg-[#f5f5f4] text-stone-800 overflow-y-auto bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-100/40 via-[#f5f5f4] to-[#f5f5f4]">
                
                {/* Luces de ambiente sutiles heredadas */}
                <div className="absolute top-0 right-1/4 h-[250px] w-[250px] rounded-full bg-sky-400/10 blur-[90px] pointer-events-none" />
                <div className="absolute top-1/2 left-10 h-[200px] w-[200px] rounded-full bg-indigo-400/5 blur-[80px] pointer-events-none" />

                {/* Encabezado Principal con Botón de Regresar */}
                <div className="relative px-2 border-b border-stone-200 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="space-y-1">
                        <Link 
                            href="/estudiantes" 
                            className="inline-flex items-center gap-1.5 text-xs font-bold text-stone-500 hover:text-sky-500 transition-colors mb-1 group"
                        >
                            <ArrowLeft size={14} className="group-hover:-translate-x-0.5 transition-transform" />
                            Volver al listado general
                        </Link>
                        <h2 className="text-xl md:text-2xl font-black text-stone-800 tracking-tight flex items-center gap-2.5">
                            <User className="text-sky-500" size={24} />
                            {estudiante.nombre} {estudiante.apellido}
                        </h2>
                    </div>

                    {/* Acciones del Estudiante */}
                    <div className="flex items-center gap-3 self-start sm:self-auto">
                        <button
                            onClick={handleEliminar}
                            className="inline-flex cursor-pointer items-center justify-center gap-1.5 px-3.5 py-2 text-xs font-bold text-stone-100 bg-red-600 border border-stone-200 rounded-xl shadow-sm hover:bg-red-500 transition-all active:scale-[0.98]"
                        >
                            <Trash2 size={14} />
                            <span>Eliminar Registro</span>
                        </button>

                        <Link
                            href={`/estudiantes/show/${estudiante.id}/edit`}
                            className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2 text-xs font-bold text-stone-600 bg-white border border-stone-200 rounded-xl shadow-sm hover:bg-stone-50 transition-all active:scale-[0.98]"
                        >
                            <Edit size={14} />
                            <span>Editar Perfil</span>
                        </Link>
                    </div>
                    
                </div>

                {/* Grid del Contenido de la Ficha */}
                <div className="relative grid grid-cols-1 lg:grid-cols-3 gap-8">
                    
                    {/* Columna Izquierda y Central: Tarjeta Principal de Información */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="p-6 rounded-2xl border border-stone-200 bg-white/70 backdrop-blur-md shadow-sm space-y-6">
                            
                            <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-stone-100">
                                <div className="space-y-0.5">
                                    <span className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">Perfil Universitario</span>
                                    <h3 className="text-base font-bold text-stone-800">Información Académica y Personal</h3>
                                </div>
                            
                            </div>

                            {/* Fila de Datos Académicos en Grid Interno */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                
                                <div className="flex gap-3 items-start p-3 rounded-xl bg-stone-50/50 border border-stone-100">
                                    <div className="p-2 rounded-lg bg-sky-50 text-sky-500 border border-sky-100">
                                        <GraduationCap size={18} />
                                    </div>
                                    <div className="space-y-0.5">
                                        <p className="text-[11px] font-semibold text-stone-400 uppercase tracking-wider">Carrera Cursante</p>
                                        <p className="text-sm font-bold text-stone-700">{estudiante.carrera_label}</p>
                                    </div>
                                </div>

                                <div className="flex gap-3 items-start p-3 rounded-xl bg-stone-50/50 border border-stone-100">
                                    <div className="p-2 rounded-lg bg-indigo-50 text-indigo-500 border border-indigo-100">
                                        <BookOpen size={18} />
                                    </div>
                                    <div className="space-y-0.5">
                                        <p className="text-[11px] font-semibold text-stone-400 uppercase tracking-wider">Semestre Actual</p>
                                        <p className="text-sm font-bold text-stone-700">{estudiante.semestre_label}</p>
                                    </div>
                                </div>

                                <div className="flex gap-3 items-start p-3 rounded-xl bg-stone-50/50 border border-stone-100 sm:col-span-2">
                                    <div className="p-2 rounded-lg bg-stone-100 text-stone-500 border border-stone-200">
                                        <IdCard size={18} />
                                    </div>
                                    <div className="space-y-0.5 w-full">
                                        <p className="text-[11px] font-semibold text-stone-400 uppercase tracking-wider">Cédula de Identidad</p>
                                        <p className="text-sm font-mono font-medium text-stone-600">V-{estudiante.cedula}</p>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>

                    {/* Columna Derecha: Panel Lateral de Auditoría */}
                    <div className="space-y-6">
                        <div className="p-6 rounded-2xl border border-stone-200 bg-white/70 backdrop-blur-md shadow-sm space-y-4">
                            <h3 className="text-xs font-black text-stone-400 uppercase tracking-widest flex items-center gap-1.5">
                                <Activity size={12} className="text-sky-500" />
                                Historial de Registro
                            </h3>

                            <div className="space-y-3.5 text-xs">
                                <div className="flex justify-between items-center py-2 border-b border-stone-100">
                                    <span className="text-stone-500 font-medium">ID de Estudiante</span>
                                    <span className="font-mono font-bold text-stone-700">#{estudiante.id}</span>
                                </div>

                                <div className="flex justify-between items-center py-2 border-b border-stone-100">
                                    <span className="text-stone-500 font-medium">Escaneos en Sistema</span>
                                    <span className="font-mono font-bold text-emerald-600">--</span> {/* Puedes mapear aquí visitas u otros datos futuros */}
                                </div>

                            </div>
                        </div>
                    </div>

                </div>

            </div>
        </>
    );
}