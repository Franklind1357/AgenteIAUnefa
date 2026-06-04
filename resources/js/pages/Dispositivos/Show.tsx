import { Head, Link } from '@inertiajs/react';
import React from 'react';
import { HardDrive, ShieldCheck, MapPin, Cpu, Activity, ArrowLeft, Edit, AlertCircle } from 'lucide-react';

// Reutilizamos tu interfaz expandiendo los campos reales que tiene tu tabla
interface Dispositivo {
    id: number;
    name: string; // Cambiado a 'name' según tu validador del store
    email: string;
    ubicacion: string;
    tipo: string;
    estado: string;
    id_users?: number;
    created_at?: string;
}

interface ShowProps {
    dispositivo: Dispositivo;
}

export default function VerDispositivo({ dispositivo }: ShowProps) {
    // Normalizamos el estado exacto como lo hiciste en el Index
    const estadoMinuscula = dispositivo.estado?.toLowerCase();
    const esActivo = estadoMinuscula === 'activo' || estadoMinuscula === 'en línea';
    const esInactivo = estadoMinuscula === 'inactivo';
    const esFalla = estadoMinuscula === 'falla' || estadoMinuscula === 'crítico';

    // Manejo de colores dinámicos del estado para la cabecera e indicadores
    const colorEstado = esActivo 
        ? "bg-emerald-50 text-emerald-600 border-emerald-200" 
        : (esInactivo || esFalla)
            ? "bg-rose-50 text-rose-600 border-rose-200"
            : "bg-amber-50 text-amber-600 border-amber-200";

    return (
        <>
            <Head title={`Detalle: ${dispositivo.name} - UNEFA AI`} />

            {/* 🎨 Contenedor Premium SaaS (Idéntico a tu Index) */}
            <div className="relative flex h-full flex-1 flex-col gap-8 p-6 md:p-8 bg-[#f5f5f4] text-stone-800 overflow-y-auto bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-100/40 via-[#f5f5f4] to-[#f5f5f4]">
                
                {/* Luces de ambiente sutiles heredadas */}
                <div className="absolute top-0 right-1/4 h-[250px] w-[250px] rounded-full bg-sky-400/10 blur-[90px] pointer-events-none" />
                <div className="absolute top-1/2 left-10 h-[200px] w-[200px] rounded-full bg-indigo-400/5 blur-[80px] pointer-events-none" />

                {/* Encabezado Principal con Botón de Regresar */}
                <div className="relative px-2 border-b border-stone-200 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="space-y-1">
                        <Link 
                            href="/dispositivos" 
                            className="inline-flex items-center gap-1.5 text-xs font-bold text-stone-500 hover:text-sky-500 transition-colors mb-1 group"
                        >
                            <ArrowLeft size={14} className="group-hover:-translate-x-0.5 transition-transform" />
                            Volver a la infraestructura
                        </Link>
                        <h2 className="text-xl md:text-2xl font-black text-stone-800 tracking-tight flex items-center gap-2.5">
                            <HardDrive className="text-sky-500" size={24} />
                            {dispositivo.name}
                        </h2>
                    </div>

                    {/* Acciones del Dispositivo */}
                    <div className="flex items-center gap-3 self-start sm:self-auto">
                        <Link
                            href={`/dispositivos/show/${dispositivo.id}/edit`}
                            className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2 text-xs font-bold text-stone-600 bg-white border border-stone-200 rounded-xl shadow-sm hover:bg-stone-50 transition-all active:scale-[0.98]"
                        >
                            <Edit size={14} />
                            <span>Editar Nodo</span>
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
                                    <span className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">Especificaciones del Nodo</span>
                                    <h3 className="text-base font-bold text-stone-800">Metadatos del Hardware</h3>
                                </div>
                                <div className={`flex items-center gap-1.5 text-xs font-bold border px-3 py-1.5 rounded-xl ${colorEstado}`}>
                                    <span className={`h-1.5 w-1.5 rounded-full ${esActivo ? 'bg-emerald-500 animate-pulse' : esFalla ? 'bg-amber-500' :  'bg-rose-500' }`} />
                                    {dispositivo.estado}
                                </div>
                            </div>

                            {/* Fila de Datos Técnicos en Grid Interno */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                
                                <div className="flex gap-3 items-start p-3 rounded-xl bg-stone-50/50 border border-stone-100">
                                    <div className="p-2 rounded-lg bg-sky-50 text-sky-500 border border-sky-100">
                                        <Cpu size={18} />
                                    </div>
                                    <div className="space-y-0.5">
                                        <p className="text-[11px] font-semibold text-stone-400 uppercase tracking-wider">Tipo / Rol del Sistema</p>
                                        <p className="text-sm font-bold text-stone-700">{dispositivo.tipo}</p>
                                    </div>
                                </div>

                                <div className="flex gap-3 items-start p-3 rounded-xl bg-stone-50/50 border border-stone-100">
                                    <div className="p-2 rounded-lg bg-indigo-50 text-indigo-500 border border-indigo-100">
                                        <MapPin size={18} />
                                    </div>
                                    <div className="space-y-0.5">
                                        <p className="text-[11px] font-semibold text-stone-400 uppercase tracking-wider">Ubicación Física</p>
                                        <p className="text-sm font-bold text-stone-700">{dispositivo.ubicacion}</p>
                                    </div>
                                </div>

                                <div className="flex gap-3 items-start p-3 rounded-xl bg-stone-50/50 border border-stone-100 sm:col-span-2">
                                    <div className="p-2 rounded-lg bg-stone-100 text-stone-500 border border-stone-200">
                                        <ShieldCheck size={18} />
                                    </div>
                                    <div className="space-y-0.5 w-full">
                                        <p className="text-[11px] font-semibold text-stone-400 uppercase tracking-wider">Identidad de Red (Email/Token)</p>
                                        <p className="text-sm font-mono font-medium text-stone-600 break-all">{dispositivo.email}</p>
                                    </div>
                                </div>

                            </div>
                        </div>

                        {/* Subtarjeta: Estado de Seguridad */}
                        <div className="p-5 rounded-2xl border border-stone-200 bg-white/40 backdrop-blur-sm flex gap-4 items-start">
                            <AlertCircle className="text-stone-400 mt-0.5 shrink-0" size={18} />
                            <div className="space-y-1">
                                <h4 className="text-xs font-bold text-stone-700">Políticas de Capa Periférica</h4>
                                <p className="text-xs text-stone-500 leading-relaxed">
                                    Este nodo está securizado bajo el protocolo del módulo **AgenteIA**. Las credenciales locales de encriptación están vinculadas directamente al núcleo del servidor.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Columna Derecha: Panel Lateral de Auditoría */}
                    <div className="space-y-6">
                        <div className="p-6 rounded-2xl border border-stone-200 bg-white/70 backdrop-blur-md shadow-sm space-y-4">
                            <h3 className="text-xs font-black text-stone-400 uppercase tracking-widest flex items-center gap-1.5">
                                <Activity size={12} className="text-sky-500" />
                                Historial de Enlace
                            </h3>

                            <div className="space-y-3.5 text-xs">
                                <div className="flex justify-between items-center py-2 border-b border-stone-100">
                                    <span className="text-stone-500 font-medium">ID del Dispositivo</span>
                                    <span className="font-mono font-bold text-stone-700">#{dispositivo.id}</span>
                                </div>

                                <div className="flex justify-between items-center py-2 border-b border-stone-100">
                                    <span className="text-stone-500 font-medium">Asignado al Usuario ID</span>
                                    <span className="font-mono font-bold text-stone-700">#{dispositivo.id_users || 'Sistema'}</span>
                                </div>

                                <div className="flex justify-between items-center py-2">
                                    <span className="text-stone-500 font-medium">Fecha de Registro</span>
                                    <span className="font-semibold text-stone-600">
                                        {dispositivo.created_at ? new Date(dispositivo.created_at).toLocaleDateString('es-VE', {
                                            day: 'numeric',
                                            month: 'short',
                                            year: 'numeric'
                                        }) : 'No disponible'}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

            </div>
        </>
    );
}