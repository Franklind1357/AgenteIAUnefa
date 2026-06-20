import React, { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import { ShieldAlert, Plus, Search, User, Calendar, Eye, AlertTriangle } from 'lucide-react';
import GenericList, { ColumnDef } from '@/components/ComponentesNuevos/GenericList';

interface Infraccion {
    id: number;
    nombre: string;
    descripcion: string;
    gravedad: string;
}

interface InfraccionEstudiantes {
    id: number;
    nombre: string;
    nombreInfraccion: string;
    gravedad: string;
    fecha: string;
}

interface Props {
    infracciones: Infraccion[];
    infraccionesEstudiantes: InfraccionEstudiantes[];
}

// Columnas para la primera lista (Se mantiene intacta)
const columnas: ColumnDef<Infraccion>[] = [
    { header: 'Nombre', accessor: (row) => row.nombre },
    { header: 'Descripción', accessor: (row) => row.descripcion },
    { header: 'Gravedad', accessor: (row) => row.gravedad },
    {
        header: 'Acciones',
        accessor: (row) => (
            <Link
                href={`/infracciones/show/${row.id}`}
                className="text-sky-500 hover:text-sky-600 text-[11px] font-bold uppercase tracking-wider transition-colors px-3 py-1.5 rounded-lg hover:bg-sky-50"
            >
                Detalles
            </Link>
        ),
    },
];

export default function Index({ infracciones, infraccionesEstudiantes }: Props) {
    // Estados para el control y filtrado del módulo de estudiantes
    const [busqueda, setBusqueda] = useState("");
    const [filtroGravedad, setFiltroGravedad] = useState("Todos");

    // Lógica de filtrado dinámico para las tarjetas de estudiantes
    const estudiantesFiltrados = infraccionesEstudiantes.filter(item => {
        const matchesBusqueda = `${item.nombre} ${item.nombreInfraccion} #${item.id}`.toLowerCase().includes(busqueda.toLowerCase());
        const matchesGravedad = filtroGravedad === "Todos" || item.gravedad.toLowerCase() === filtroGravedad.toLowerCase();
        return matchesBusqueda && matchesGravedad;
    });

    // Helper de estilos condicionales según gravedad para conservar el grid como te gusta
    const getSeverityStyles = (gravedad: string) => {
        switch (gravedad?.toLowerCase()) {
            case 'crítica': case 'critica':
                return {
                    border: 'border-t-red-500 border-l-red-100',
                    badge: 'bg-red-50 text-red-700 border-red-200/60',
                    light: 'from-red-50/30'
                };
            case 'grave':
                return {
                    border: 'border-t-amber-500 border-l-amber-100',
                    badge: 'bg-amber-50 text-amber-700 border-amber-200/60',
                    light: 'from-amber-50/30'
                };
            default: // Leve
                return {
                    border: 'border-t-sky-500 border-l-sky-100',
                    badge: 'bg-sky-50 text-sky-700 border-sky-200/60',
                    light: 'from-sky-50/30'
                };
        }
    };

    return (
        <div className="relative flex h-full flex-1 flex-col gap-8 p-6 md:p-8 bg-[#f5f5f4] text-stone-800 overflow-y-auto bg-[radial-gradient(ellipse_at_top,var(--tw-gradient-stops))] from-sky-100/40 via-[#f5f5f4] to-[#f5f5f4]">
            <Head title="Infracciones - UNEFA AI" />

            <div className="absolute top-0 right-1/4 h-64 w-64 rounded-full bg-sky-400/10 blur-[90px] pointer-events-none" />

            {/* Encabezado Principal del Módulo */}
            <div className="relative flex items-center justify-between px-2 border-b border-stone-200 pb-4">
                <div>
                    <h2 className="text-xl md:text-2xl font-black text-stone-800 tracking-tight flex items-center gap-2.5">
                        <ShieldAlert className="text-sky-500" size={24} />
                        Control Disciplinario Interno
                    </h2>
                    <p className="text-xs md:text-sm text-stone-500 mt-1 font-medium">
                        Registro, catálogo y monitoreo de incidencias del estudiantado.
                    </p>
                </div>
            </div>

            {/* 1. SECCIÓN SUPERIOR: Catálogo de Infracciones (GenericList original) */}
            <div className="relative">
                <GenericList<Infraccion>
                    title="Infracciones Registradas"
                    description="Catálogo general y definiciones de faltas al reglamento."
                    data={infracciones}
                    href="/infracciones/create"
                    columns={columnas}
                    itemsPerPage={8}
                    onAdd={() => {}}
                    addLabel="Registrar Infracción"
                    searchPlaceholder="Buscar por nombre, descripción o gravedad..."
                    searchFilter={(item, query) =>
                        item.nombre?.toLowerCase().includes(query) ||
                        item.descripcion?.toLowerCase().includes(query) ||
                        item.gravedad?.toLowerCase().includes(query)
                    }
                />          
            </div>

            {/* 2. SECCIÓN INFERIOR RESTRUCTURADA: Módulo de Estudiantes con Controles Sincronizados */}
            <div className="relative space-y-6">
                
                {/* Contenedor Control de Búsqueda y Filtros clonando exactamente la UI de GenericList */}
                <div className="w-full rounded-2xl border border-stone-200/80 bg-white/60 backdrop-blur-xl shadow-sm overflow-hidden">
                    <div className="p-5 md:p-6 bg-white/40 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                        
                        {/* Título interno equivalente */}
                        <div>
                            <h3 className="text-lg font-bold text-stone-800 tracking-tight">Historial de Estudiantes Infractores</h3>
                            <p className="text-sm text-stone-500 mt-0.5">Casos particulares aplicados individualmente al estudiantado.</p>
                        </div>

                        {/* Bloque de Controles unificado con la estética de arriba */}
                        <div className="flex flex-col sm:flex-row items-center gap-3 w-full lg:w-auto">
                            
                            {/* Selector de Gravedad por Pestañas estilizado a tono */}
                            <div className="flex items-center gap-1 bg-stone-100 p-1 rounded-xl w-full sm:w-auto overflow-x-auto">
                                {["Todos", "Leve", "Grave", "Crítica"].map((tab) => (
                                    <button
                                        key={tab}
                                        onClick={() => setFiltroGravedad(tab)}
                                        className={`px-3.5 cursor-pointer py-1.5 text-xs font-medium rounded-lg transition-all ${
                                            filtroGravedad === tab
                                                ? "bg-white text-sky-600 font-bold shadow-sm"
                                                : "text-stone-500 hover:text-stone-800 hover:bg-white/40"
                                        }`}
                                    >
                                        {tab}
                                    </button>
                                ))}
                            </div>

                            {/* El Buscador Identidad Exacta de GenericList */}
                            <div className="relative w-full sm:w-64 group">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-stone-400 group-focus-within:text-sky-500 transition-colors">
                                    <Search size={16} />
                                </div>
                                <input
                                    type="text"
                                    placeholder="Buscar por estudiante..."
                                    value={busqueda}
                                    onChange={(e) => setBusqueda(e.target.value)}
                                    className="w-full pl-9 pr-4 py-2 bg-stone-50 border border-stone-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-sky-100 focus:border-sky-400 transition-all text-stone-700 placeholder:text-stone-400"
                                />
                            </div>

                        </div>
                    </div>
                </div>

                {/* El Grid de Tarjetas Inferior (Se conserva intacto tal como te gustó, pero alineado en color) */}
                <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {estudiantesFiltrados.length > 0 ? (
                        estudiantesFiltrados.map((incidencia) => {
                            const styles = getSeverityStyles(incidencia.gravedad);
                            return (
                                <article
                                    key={incidencia.id}
                                    className={`group bg-white rounded-2xl p-5 border border-stone-200/80 border-t-4 ${styles.border} shadow-sm hover:shadow-md transition-all duration-200 flex flex-col justify-between bg-gradient-to-b ${styles.light} via-white to-white`}
                                >
                                    <div>
                                        <div className="flex items-center justify-between gap-2 mb-3">
                                            <span className="text-xs font-mono font-black text-stone-400">
                                                ID #{incidencia.id}
                                            </span>
                                            <span className={`px-2 py-0.5 text-[9px] font-black uppercase rounded-md border ${styles.badge}`}>
                                                {incidencia.gravedad}
                                            </span>
                                        </div>

                                        <h4 className="text-sm font-black text-stone-800 line-clamp-1 group-hover:text-sky-600 transition-colors">
                                            {incidencia.nombreInfraccion}
                                        </h4>

                                        <div className="mt-4 flex items-center gap-2.5 p-2.5 rounded-xl bg-stone-50/50 border border-stone-100/60">
                                            <div className="p-1.5 rounded-lg bg-white border border-stone-200 text-stone-500 shadow-sm shrink-0">
                                                <User size={14} />
                                            </div>
                                            <div className="space-y-0.5">
                                                <p className="text-[10px] font-semibold text-stone-400 uppercase tracking-wider">Estudiante</p>
                                                <p className="text-xs font-bold text-stone-700 line-clamp-1">{incidencia.nombre}</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mt-5 pt-3 border-t border-stone-100 flex items-center justify-between">
                                        <div className="flex items-center gap-1.5 text-[11px] text-stone-400 font-semibold">
                                            <Calendar size={13} className="text-stone-400" />
                                            <span>{incidencia.fecha}</span>
                                        </div>

                                        <Link
                                            href={`/infracciones/show/${incidencia.id}/estudiante`}
                                            className="inline-flex items-center gap-1 text-[11px] font-black text-stone-600 hover:text-sky-600 transition-colors bg-stone-100 group-hover:bg-sky-50 px-2.5 py-1.5 rounded-lg"
                                        >
                                            <Eye size={12} />
                                            <span>Detalles</span>
                                        </Link>
                                    </div>
                                </article>
                            );
                        })
                    ) : (
                        <div className="col-span-full text-center py-12 p-6 rounded-2xl border-2 border-dashed border-stone-200 bg-white/40">
                            <AlertTriangle className="text-stone-300 mx-auto mb-2" size={28} />
                            <p className="text-xs font-bold text-stone-400 uppercase tracking-widest">Sin Coincidencias</p>
                            <p className="text-sm text-stone-500 mt-1">Ningún registro disciplinario estudiantil cumple con los criterios indicados.</p>
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
}