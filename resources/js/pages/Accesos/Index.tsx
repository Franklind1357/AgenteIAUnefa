import { Head, router } from "@inertiajs/react";
import React, { useState } from "react";
import { UserCheck, Clock, Calendar, GraduationCap, Search, CheckCircle, Activity, Users, ShieldCheck } from "lucide-react";

interface Asistencia {
    id: string | number;
    nombre: string;
    apellido: string;
    carrera: string;
    fecha: string;
    hora: string;
    codigo_carnet: string; // Un toque extra de simulación de campus inteligente
}

interface AsistenciaProps {
    asistenciasBase?: Asistencia[];
}

// Datos de prueba con formato limpio desde Laravel
const asistenciasSimuladas: Asistencia[] = [
    { id: 1, nombre: "Franklin", apellido: "Arguello", carrera: "Ingeniería de Sistemas", fecha: "18 de Junio, 2026", hora: "07:15 AM", codigo_carnet: "UNEFA-2026-094" },
    { id: 2, nombre: "María", apellido: "Gómez", carrera: "Ingeniería de Sistemas", fecha: "18 de Junio, 2026", hora: "07:22 AM", codigo_carnet: "UNEFA-2024-112" },
    { id: 3, nombre: "Carlos", apellido: "Mendoza", carrera: "Licenciatura en Turismo", fecha: "18 de Junio, 2026", hora: "07:45 AM", codigo_carnet: "UNEFA-2025-401" },
    { id: 4, nombre: "Franchesca", apellido: "Silva", carrera: "Ingeniería Electrónica", fecha: "18 de Junio, 2026", hora: "08:02 AM", codigo_carnet: "UNEFA-2023-884" },
    { id: 5, nombre: "José", apellido: "Rodríguez", carrera: "Ingeniería Mecánica", fecha: "18 de Junio, 2026", hora: "08:10 AM", codigo_carnet: "UNEFA-2026-302" },
    { id: 6, nombre: "Ana", apellido: "Martínez", carrera: "Licenciatura en Enfermería", fecha: "17 de Junio, 2026", hora: "01:30 PM", codigo_carnet: "UNEFA-2024-551" },
];

export default function RegistroAsistencia({ asistenciasBase = asistenciasSimuladas }: AsistenciaProps) {
    const [busqueda, setBusqueda] = useState("");

    // Filtro dinámico en tiempo real
    const asistenciasFiltradas = asistenciasBase.filter(item => 
        `${item.nombre} ${item.apellido} ${item.carrera}`.toLowerCase().includes(busqueda.toLowerCase())
    );

    // Helper para generar iniciales del estudiante
    const getIniciales = (nombre: string, apellido: string) => {
        return `${nombre.charAt(0)}${apellido.charAt(0)}`.toUpperCase();
    };

    return (
        <>
            <Head title="Control de Acceso Diario - Sistema UNEFA" />

            {/* 🎨 Contenedor Premium SaaS */}
            <div className="relative flex h-full flex-1 flex-col gap-8 p-6 md:p-8 bg-[#f5f5f4] text-stone-800 overflow-y-auto bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-emerald-100/30 via-[#f5f5f4] to-[#f5f5f4]">
                
                {/* Luces de ambiente sutiles */}
                <div className="absolute top-0 right-1/4 h-[250px] w-[250px] rounded-full bg-emerald-400/10 blur-[90px] pointer-events-none" />
                <div className="absolute bottom-10 left-10 h-[200px] w-[200px] rounded-full bg-sky-400/5 blur-[80px] pointer-events-none" />

                {/* Encabezado Principal */}
                <div className="relative px-2 border-b border-stone-200 pb-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="space-y-1">
                        <div className="flex items-center gap-2">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                            </span>
                            <span className="text-[10px] font-black text-emerald-600 uppercase tracking-widest">Punto de Acceso Activo</span>
                        </div>
                        <h2 className="text-xl md:text-2xl font-black text-stone-800 tracking-tight flex items-center gap-2.5">
                            <ShieldCheck className="text-emerald-600" size={26} />
                            Ingresos Autorizados
                        </h2>
                    </div>

                    {/* Barra de Búsqueda Innovadora */}
                    <div className="relative w-full md:w-80 group">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-stone-400 group-focus-within:text-sky-500 transition-colors">
                            <Search size={16} />
                        </div>
                        <input 
                            type="text" 
                            placeholder="Buscar estudiante o carrera..."
                            value={busqueda}
                            onChange={(e) => setBusqueda(e.target.value)}
                            className="w-full pl-9 pr-4 py-2 bg-stone-50 border border-stone-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-sky-100 focus:border-sky-400 transition-all text-stone-700 placeholder:text-stone-400"
                        />
                    </div>
                </div>

                {/* Métrica de Resumen Rápido */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="p-4 rounded-xl bg-white border border-stone-200 shadow-sm flex items-center gap-4">
                        <div className="p-3 rounded-lg bg-emerald-50 text-emerald-600 border border-emerald-100">
                            <UserCheck size={20} />
                        </div>
                        <div>
                            <p className="text-[10px] font-bold text-stone-400 uppercase tracking-wider">Ingresos de Hoy</p>
                            <p className="text-xl font-black text-stone-800">{asistenciasBase.length}</p>
                        </div>
                    </div>
                    <div className="p-4 rounded-xl bg-white border border-stone-200 shadow-sm flex items-center gap-4">
                        <div className="p-3 rounded-lg bg-sky-50 text-sky-600 border border-sky-100">
                            <Activity size={20} />
                        </div>
                        <div>
                            <p className="text-[10px] font-bold text-stone-400 uppercase tracking-wider">Estado de Puerta</p>
                            <p className="text-sm font-bold text-emerald-600">Normal / Despejado</p>
                        </div>
                    </div>
                    <div className="p-4 rounded-xl bg-white border border-stone-200 shadow-sm flex items-center gap-4">
                        <div className="p-3 rounded-lg bg-stone-100 text-stone-600 border border-stone-200">
                            <Users size={20} />
                        </div>
                        <div>
                            <p className="text-[10px] font-bold text-stone-400 uppercase tracking-wider">Resultados Filtro</p>
                            <p className="text-xl font-black text-stone-800">{asistenciasFiltradas.length}</p>
                        </div>
                    </div>
                </div>

                {/* 🚀 Grid Innovador de Tarjetas de Asistencia */}
                <main className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {asistenciasFiltradas.length > 0 ? (
                        asistenciasFiltradas.map((registro) => (
                            <article 
                                key={registro.id} 
                                className="group relative cursor-pointer bg-white/80 backdrop-blur-md rounded-2xl p-5 border border-stone-200 shadow-sm hover:shadow-md hover:border-emerald-300 transition-all duration-200 flex flex-col justify-between overflow-hidden"
                            >
                                {/* Sello lateral decorativo de verificación exitosa */}
                                <div className="absolute top-0 right-0 w-16 h-16 bg-emerald-50 rounded-bl-full flex items-start justify-end p-2.5 text-emerald-500 opacity-60 group-hover:opacity-100 transition-opacity">
                                    <CheckCircle size={16} />
                                </div>

                                <div className="space-y-4">
                                    {/* Bloque Identificación Superior */}
                                    <div className="flex items-center gap-3.5">
                                        {/* Avatar con iniciales */}
                                        <div className="h-11 w-11 rounded-xl bg-gradient-to-br from-stone-100 to-stone-200 text-stone-700 font-bold text-sm flex items-center justify-center border border-stone-300/60 shadow-inner group-hover:from-emerald-50 group-hover:to-emerald-100 group-hover:text-emerald-700 group-hover:border-emerald-200 transition-all shrink-0">
                                            {getIniciales(registro.nombre, registro.apellido)}
                                        </div>
                                        
                                        <div className="space-y-0.5 max-w-[70%]">
                                            <p className="text-xs font-bold text-stone-400 font-mono tracking-tight">{registro.codigo_carnet}</p>
                                            <h3 className="text-sm font-black text-stone-800 truncate group-hover:text-emerald-900 transition-colors">
                                                {registro.nombre} {registro.apellido}
                                            </h3>
                                        </div>
                                    </div>

                                    {/* Badge de la Carrera */}
                                    <div className="flex items-center gap-2 p-2 rounded-xl bg-stone-50 border border-stone-100/80">
                                        <GraduationCap size={15} className="text-stone-400 shrink-0" />
                                        <span className="text-[11px] font-bold text-stone-600 truncate">
                                            {registro.carrera}
                                        </span>
                                    </div>
                                </div>

                                {/* Divisor Estilizado */}
                                <div className="my-3 border-t border-dashed border-stone-200" />

                                {/* Bloque de Tiempo y Fecha Inferior */}
                                <div className="flex items-center justify-between text-[11px] text-stone-500 font-medium">
                                    <div className="flex items-center gap-1">
                                        <Calendar size={13} className="text-stone-400" />
                                        <span>{registro.fecha}</span>
                                    </div>
                                    <div className="flex items-center gap-1 px-2 py-0.5 bg-emerald-50 text-emerald-700 font-bold rounded-md border border-emerald-100">
                                        <Clock size={12} className="text-emerald-600" />
                                        <span>{registro.hora}</span>
                                    </div>
                                </div>
                            </article>
                        ))
                    ) : (
                        <div className="col-span-full text-center py-12 p-6 rounded-2xl border-2 border-dashed border-stone-200 bg-white/40">
                            <p className="text-xs font-bold text-stone-400 uppercase tracking-widest">Sin resultados</p>
                            <p className="text-sm text-stone-500 mt-1">Ningún estudiante coincide con los criterios de búsqueda actuales.</p>
                        </div>
                    )}
                </main>
            </div>
        </>
    );
}