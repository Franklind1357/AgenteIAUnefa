import { Head, Link, router } from '@inertiajs/react';
import React, { useState, useMemo } from 'react';
import { HardDrive, ShieldCheck, MapPin, Cpu, Activity, ArrowLeft, Edit, AlertCircle, Trash2, Search, Calendar, Clock, User, GraduationCap, Inbox } from 'lucide-react';

interface Dispositivo {
    id: number;
    name: string;
    email: string;
    ubicacion: string;
    tipo: string;
    estado: string;
    id_users?: number;
    created_at?: string;
}

// Estructura para los ingresos del dispositivo
interface IngresoEstudiante {
    id: number;
    nombre: string;
    apellido: string;
    carrera: string;
    codigo_carnet: string;
    fecha: string; // Formato esperado: YYYY-MM-DD
    hora: string;
}

interface ShowProps {
    dispositivo: Dispositivo;
    ingresosBase?: IngresoEstudiante[];
}

// Datos simulados de ingresos adaptados al dispositivo (Usa fechas en formato ISO para el input date)
const ingresosSimulados: IngresoEstudiante[] = [
    { id: 1, nombre: "Franklin", apellido: "Arguello", carrera: "Ingeniería de Sistemas", codigo_carnet: "UNEFA-2026-094", fecha: "2026-06-19", hora: "07:15 AM" },
    { id: 2, nombre: "María", apellido: "Gómez", carrera: "Ingeniería de Sistemas", codigo_carnet: "UNEFA-2024-112", fecha: "2026-06-19", hora: "07:22 AM" },
    { id: 3, nombre: "Carlos", apellido: "Mendoza", carrera: "Licenciatura en Turismo", codigo_carnet: "UNEFA-2025-401", fecha: "2026-06-19", hora: "07:45 AM" },
    { id: 4, nombre: "Franchesca", apellido: "Silva", carrera: "Ingeniería Electrónica", codigo_carnet: "UNEFA-2023-884", fecha: "2026-06-18", hora: "08:02 AM" },
    { id: 5, nombre: "José", apellido: "Rodríguez", carrera: "Ingeniería Mecánica", codigo_carnet: "UNEFA-2026-302", fecha: "2026-06-18", hora: "08:10 AM" },
];

export default function VerDispositivo({ dispositivo, ingresosBase = ingresosSimulados }: ShowProps) {
    // Estados para los filtros avanzados de ingresos
    const [busqueda, setBusqueda] = useState("");
    const [fechaFiltro, setFechaFiltro] = useState(""); // Guarda el valor "YYYY-MM-DD"

    const estadoMinuscula = dispositivo.estado?.toLowerCase();
    const esActivo = estadoMinuscula === 'activo' || estadoMinuscula === 'en línea';
    const esInactivo = estadoMinuscula === 'inactivo';
    const esFalla = estadoMinuscula === 'falla' || estadoMinuscula === 'crítico';

    const colorEstado = esActivo 
        ? "bg-emerald-50 text-emerald-600 border-emerald-200" 
        : (esInactivo || esFalla)
            ? "bg-rose-50 text-rose-600 border-rose-200"
            : "bg-amber-50 text-amber-600 border-amber-200";

    const handleEliminar = () => {
        const seguro = confirm("¿Estás seguro de que deseas eliminar este Dispositivo? Esta acción no se puede deshacer.");
        if (seguro) {
            router.delete(`/dispositivos/show/${dispositivo.id}/delete`, {
                onSuccess: () => alert("Dispositivo desaparecido exitosamente."),
                onError: (errors) => console.error("Error al eliminar:", errors)
            });
        }
    };

    // Helper para generar iniciales
    const getIniciales = (nombre: string, apellido: string) => {
        return `${nombre.charAt(0)}${apellido.charAt(0)}`.toUpperCase();
    };

    // Filtrado lógico de alta eficiencia combinando texto y fecha exacta
    const ingresosFiltrados = useMemo(() => {
        return ingresosBase.filter(item => {
            const matchesTexto = `${item.nombre} ${item.apellido} ${item.carrera} ${item.codigo_carnet}`.toLowerCase().includes(busqueda.toLowerCase());
            const matchesFecha = fechaFiltro === "" || item.fecha === fechaFiltro;
            return matchesTexto && matchesFecha;
        });
    }, [ingresosBase, busqueda, fechaFiltro]);

    // Limpiador rápido de la fecha
    const limpiarFecha = () => setFechaFiltro("");

    return (
        <>
            <Head title={`Detalle: ${dispositivo.name} - UNEFA AI`} />

            <div className="relative flex h-full flex-1 flex-col gap-8 p-6 md:p-8 bg-[#f5f5f4] text-stone-800 overflow-y-auto bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-100/40 via-[#f5f5f4] to-[#f5f5f4]">
                
                <div className="absolute top-0 right-1/4 h-[250px] w-[250px] rounded-full bg-sky-400/10 blur-[90px] pointer-events-none" />
                <div className="absolute top-1/2 left-10 h-[200px] w-[200px] rounded-full bg-indigo-400/5 blur-[80px] pointer-events-none" />

                {/* 🏷️ Encabezado Principal */}
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

                    <div className="flex items-center gap-3 self-start sm:self-auto">
                        <button
                            onClick={handleEliminar}
                            className="inline-flex cursor-pointer items-center justify-center gap-1.5 px-3.5 py-2 text-xs font-bold text-stone-100 bg-red-600 border border-stone-200 rounded-xl shadow-sm hover:bg-red-500 transition-all active:scale-[0.98]"
                        >
                            <Trash2 size={14} />
                            <span>Eliminar Nodo</span>
                        </button>

                        <Link
                            href={`/dispositivos/show/${dispositivo.id}/edit`}
                            className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2 text-xs font-bold text-stone-600 bg-white border border-stone-200 rounded-xl shadow-sm hover:bg-stone-50 transition-all active:scale-[0.98]"
                        >
                            <Edit size={14} />
                            <span>Editar Nodo</span>
                        </Link>
                    </div>
                </div>

                {/* 📋 Grid Superior: Ficha Técnica */}
                <div className="relative grid grid-cols-1 lg:grid-cols-3 gap-8">
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
                    </div>

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
                                            day: 'numeric', month: 'short', year: 'numeric'
                                        }) : 'No disponible'}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 🚀 SECCIÓN INFERIOR: Monitor de ingresos masivos (Mismo ecosistema visual) */}
                <div className="w-full rounded-2xl border border-stone-200/80 bg-white/60 backdrop-blur-xl shadow-sm overflow-hidden flex flex-col">
                    
                    {/* Barra de Controles y Cabecera Sincronizada */}
                    <div className="p-5 md:p-6 border-b border-stone-200/80 bg-white/40 flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div>
                            <h3 className="text-lg font-bold text-stone-800 tracking-tight">Flujo de Accesos Registrados</h3>
                            <p className="text-sm text-stone-500 mt-0.5">Monitoreo en tiempo real de las solicitudes procesadas por este hardware.</p>
                        </div>

                        {/* Bloque de entradas alineadas */}
                        <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
                            
                            {/* Input de Fecha Nativo Sincronizado */}
                            <div className="relative w-full sm:w-48 group">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-stone-400 group-focus-within:text-sky-500 transition-colors">
                                    <Calendar size={16} />
                                </div>
                                <input 
                                    type="date" 
                                    value={fechaFiltro}
                                    onChange={(e) => setFechaFiltro(e.target.value)}
                                    className="w-full pl-9 pr-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-sky-100 focus:border-sky-400 transition-all text-stone-700 font-medium uppercase text-[11px]"
                                />
                                {fechaFiltro && (
                                    <button 
                                        onClick={limpiarFecha}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] bg-stone-200 hover:bg-stone-300 text-stone-600 px-1.5 py-0.5 rounded font-bold transition-colors"
                                    >
                                        Limpiar
                                    </button>
                                )}
                            </div>

                            {/* Buscador de Texto General */}
                            <div className="relative w-full sm:w-64 group">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-stone-400 group-focus-within:text-sky-500 transition-colors">
                                    <Search size={16} />
                                </div>
                                <input 
                                    type="text" 
                                    placeholder="Buscar por estudiante o carnet..."
                                    value={busqueda}
                                    onChange={(e) => setBusqueda(e.target.value)}
                                    className="w-full pl-9 pr-4 py-2 bg-stone-50 border border-stone-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-sky-100 focus:border-sky-400 transition-all text-stone-700 placeholder:text-stone-400"
                                />
                            </div>

                        </div>
                    </div>

                    {/* Tabla de Rendimiento para Altos Volúmenes */}
                    <div className="overflow-x-auto w-full">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-stone-50/50 border-b border-stone-200/80">
                                    <th className="px-6 py-4 text-[11px] font-bold text-stone-500 uppercase tracking-widest">Estudiante</th>
                                    <th className="px-6 py-4 text-[11px] font-bold text-stone-500 uppercase tracking-widest">Código Carnet</th>
                                    <th className="px-6 py-4 text-[11px] font-bold text-stone-500 uppercase tracking-widest">Carrera</th>
                                    <th className="px-6 py-4 text-[11px] font-bold text-stone-500 uppercase tracking-widest">Fecha</th>
                                    <th className="px-6 py-4 text-[11px] font-bold text-stone-500 uppercase tracking-widest text-right">Hora de Ingreso</th>
                                </tr>
                            </thead>
                            <tbody>
                                {ingresosFiltrados.length > 0 ? (
                                    ingresosFiltrados.map((registro) => (
                                        <tr key={registro.id} className="border-b border-stone-100 last:border-0 hover:bg-stone-50/50 transition-colors group">
                                            <td className="px-6 py-3.5 whitespace-nowrap">
                                                <div className="flex items-center gap-3">
                                                    <div className="h-8 w-8 rounded-lg bg-stone-100 text-stone-600 font-bold text-xs flex items-center justify-center border border-stone-200 group-hover:bg-sky-50 group-hover:text-sky-600 group-hover:border-sky-200 transition-colors">
                                                        {getIniciales(registro.nombre, registro.apellido)}
                                                    </div>
                                                    <span className="text-sm font-bold text-stone-700">{registro.nombre} {registro.apellido}</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-3.5 text-sm font-mono text-stone-500 whitespace-nowrap">
                                                {registro.codigo_carnet}
                                            </td>
                                            <td className="px-6 py-3.5 text-sm text-stone-600 whitespace-nowrap">
                                                <div className="flex items-center gap-1.5">
                                                    <GraduationCap size={14} className="text-stone-400" />
                                                    <span>{registro.carrera}</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-3.5 text-sm text-stone-600 whitespace-nowrap">
                                                <div className="flex items-center gap-1.5">
                                                    <Calendar size={14} className="text-stone-400" />
                                                    <span>{new Date(registro.fecha + 'T00:00:00').toLocaleDateString('es-VE', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-3.5 text-sm text-right whitespace-nowrap">
                                                <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-emerald-50 text-emerald-700 font-bold rounded-md border border-emerald-100 text-xs">
                                                    <Clock size={12} />
                                                    {registro.hora}
                                                </span>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={5} className="px-6 py-12 text-center text-stone-400">
                                            <div className="flex flex-col items-center justify-center">
                                                <Inbox size={36} className="text-stone-300 mb-2" />
                                                <p className="text-sm font-bold text-stone-600">No se encontraron registros de ingreso</p>
                                                <p className="text-xs text-stone-400 mt-0.5">Intenta cambiando los parámetros del buscador o de la fecha.</p>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

            </div>
        </>
    );
}