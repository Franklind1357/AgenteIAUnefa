import { Head, Link } from '@inertiajs/react';
import React from 'react';
import { HardDrive, Settings, Plus } from 'lucide-react';
import CardsDispositivos from '@/components/ComponentesNuevos/CardsDispositivos';

interface Dispositivo {
    id: number;
    name: string;
    estado: string; // Ej: 'Activo', 'Inactivo', 'Falla'
    ubicacion: string;
    tipo: string; // Actúa como la función del dispositivo
}

interface IndexProps {
    dispositivos: Dispositivo[];
}

export default function GestionSistema({ dispositivos }: IndexProps) {
    return (
        <>
            <Head title="Infraestructura de Red - UNEFA AI" />

            {/* 🎨 Contenedor Premium SaaS */}
            <div className="relative flex h-full flex-1 flex-col gap-8 p-6 md:p-8 bg-[#f5f5f4] text-stone-800 overflow-y-auto bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-100/40 via-[#f5f5f4] to-[#f5f5f4]">
                
                {/* Luces de ambiente sutiles */}
                <div className="absolute top-0 right-1/4 h-[250px] w-[250px] rounded-full bg-sky-400/10 blur-[90px] pointer-events-none" />
                <div className="absolute top-1/2 left-10 h-[200px] w-[200px] rounded-full bg-indigo-400/5 blur-[80px] pointer-events-none" />

                {/* Encabezado Principal */}
                <div className="relative px-2 border-b border-stone-200 pb-4">
                    <h2 className="text-xl md:text-2xl font-black text-stone-800 tracking-tight flex items-center gap-2.5">
                        <Settings className="text-sky-500 animate-[spin_4s_linear_infinite]" size={24} />
                        Infraestructura de Red y Hardware
                    </h2>
                    <p className="text-xs md:text-sm text-stone-500 mt-1 font-medium">
                        Monitoreo en tiempo real de los nodos periféricos, enrutadores y cámaras asignadas al sistema del campus.
                    </p>
                </div>

                {/* 🧩 Fila / Grid Dinámico */}
                <div className="relative space-y-4">
                    
                    {/* 🛠️ Barra de herramientas alineada al estilo GenericList */}
                    <div className="px-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div className="space-y-0.5">
                            <h3 className="text-base font-bold text-stone-800 tracking-tight">Nodos Periféricos Registrados</h3>
                            <p className="text-xs text-stone-500">Lista autogenerada desde la base de datos.</p>
                        </div>

                        {/* ➕ Botón clonado exactamente de la estética de tus listas interactivas */}
                        <Link
                            href={'/dispositivos/create'}
                            className="inline-flex items-center justify-center gap-2 px-4 py-2 text-xs font-bold text-white bg-sky-500 border border-sky-600 rounded-xl shadow-md shadow-sky-500/20 hover:bg-sky-600 transition-all active:scale-[0.98] self-start sm:self-auto"
                        >
                            <Plus size={14} className="stroke-[3]" />
                            <span>Registrar Dispositivo</span>
                        </Link>
                    </div>

                    {/* Ajuste de columnas dinámicas */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pt-2">
                        {dispositivos.length > 0 ? (
                            dispositivos.map((dispositivo) => {
                                const esActivo = dispositivo.estado?.toLowerCase() === 'activo' || dispositivo.estado?.toLowerCase() === 'en línea';

                                return (
                                    <CardsDispositivos 
                                        direction={`/dispositivos/show/${dispositivo.id}`} 
                                        key={dispositivo.id}
                                        type="module"
                                        title={dispositivo.name}
                                        description={`Área: ${dispositivo.ubicacion} • Rol: ${dispositivo.tipo}`}
                                        status={dispositivo.estado}
                                        icon={<HardDrive size={20} />}
                                        badgeColor={esActivo ? "bg-emerald-50 text-emerald-600 border-emerald-200" : "bg-rose-50 text-rose-600 border-rose-200"}
                                    />
                                );
                            })
                        ) : (
                            /* Estado Vacío Estilizado */
                            <div className="col-span-full p-8 text-center bg-white/40 border border-dashed border-stone-200 rounded-2xl backdrop-blur-sm">
                                <p className="text-sm text-stone-500 font-medium">
                                    No hay dispositivos vinculados en este momento.
                                </p>
                            </div>
                        )}
                    </div>
                </div>

                {/* 📌 Banner Informativo de Rendimiento */}
                <div className="relative p-5 rounded-2xl border border-stone-200 bg-white/50 backdrop-blur-md flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="space-y-0.5">
                        <h4 className="text-sm font-bold text-stone-800">Sincronización Periférica Activa</h4>
                        <p className="text-xs text-stone-500">El mapeo de sockets lee el estado físico de los dispositivos concurrentemente.</p>
                    </div>
                    <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-600 bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-xl self-start sm:self-auto">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        Red Operacional
                    </div>
                </div>

            </div>
        </>
    );
}