import { Head, Link, router } from "@inertiajs/react";
import { AlertTriangle, Edit, User, FileText, ArrowLeft, Activity, Trash2, ShieldAlert } from "lucide-react";

interface Infraccion {
    id: string | number;
    nombre: string;
    descripcion: string;
    gravedad: string; // Ej: 'Leve', 'Grave', 'Crítica'
}

interface ShowProps {
    infraccion: Infraccion;
}

export default function VerInfraccion({ infraccion }: ShowProps) {
    const handleEliminar = () => {
        const seguro = confirm(`¿Estás seguro de que deseas eliminar el registro de esta infracción? Esta acción no se puede deshacer.`);

        if (seguro) {
            router.delete(`/infracciones/show/${infraccion.id}/delete`, {
                onSuccess: () => {
                    alert("Infracción eliminada exitosamente.");
                },
                onError: (errors) => {
                    console.error("Error al eliminar la infracción:", errors);
                }
            });
        }
    };

    return (
        <>
            <Head title={`Infracción: ${infraccion.id} - Agente IA UNEFA`} />

            {/* 🎨 Contenedor Premium SaaS */}
            <div className="relative flex h-full flex-1 flex-col gap-8 p-6 md:p-8 bg-[#f5f5f4] text-stone-800 overflow-y-auto bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-100/40 via-[#f5f5f4] to-[#f5f5f4]">
                
                {/* Luces de ambiente */}
                <div className="absolute top-0 right-1/4 h-[250px] w-[250px] rounded-full bg-red-400/10 blur-[90px] pointer-events-none" />
                <div className="absolute top-1/2 left-10 h-[200px] w-[200px] rounded-full bg-amber-400/5 blur-[80px] pointer-events-none" />

                {/* Encabezado Principal */}
                <div className="relative px-2 border-b border-stone-200 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="space-y-1">
                        <Link 
                            href="/infracciones" 
                            className="inline-flex items-center gap-1.5 text-xs font-bold text-stone-500 hover:text-red-500 transition-colors mb-1 group"
                        >
                            <ArrowLeft size={14} className="group-hover:-translate-x-0.5 transition-transform" />
                            Volver al listado de infracciones
                        </Link>
                        <h2 className="text-xl md:text-2xl font-black text-stone-800 tracking-tight flex items-center gap-2.5">
                            <AlertTriangle className="text-red-500" size={24} />
                            Infracción #{infraccion.id}
                        </h2>
                    </div>

                    {/* Acciones */}
                    <div className="flex items-center gap-3 self-start sm:self-auto">
                        <button
                            onClick={handleEliminar}
                            className="inline-flex cursor-pointer items-center justify-center gap-1.5 px-3.5 py-2 text-xs font-bold text-stone-100 bg-red-600 border border-stone-200 rounded-xl shadow-sm hover:bg-red-500 transition-all active:scale-[0.98]"
                        >
                            <Trash2 size={14} />
                            <span>Eliminar Registro</span>
                        </button>
                        
                        <Link
                            href={`/infracciones/show/${infraccion.id}/edit`}
                            className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2 text-xs font-bold text-stone-600 bg-white border border-stone-200 rounded-xl shadow-sm hover:bg-stone-50 transition-all active:scale-[0.98]"
                        >
                            <Edit size={14} />
                            <span>Editar Perfil</span>
                        </Link>
                    </div>
                </div>

                {/* Grid del Contenido */}
                <div className="relative grid grid-cols-1 lg:grid-cols-3 gap-8">
                    
                    {/* Columna Principal */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="p-6 rounded-2xl border border-stone-200 bg-white/70 backdrop-blur-md shadow-sm space-y-6">
                            
                            <div className="pb-4 border-b border-stone-100">
                                <span className="text-[10px] font-bold text-red-400 uppercase tracking-widest">Detalle de la infracción</span>
                                <h3 className="text-base font-bold text-stone-800">Descripción de la infracción</h3>
                            </div>

                            {/* Descripción de la infracción */}
                            <div className="p-4 rounded-xl bg-stone-50 border border-stone-100 flex gap-4">
                                <FileText className="text-stone-400 shrink-0" size={20} />
                                <p className="text-sm text-slate-950 leading-relaxed italic">
                                    {infraccion.descripcion}
                                </p>
                            </div>

                            {/* Grid de Datos */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                
                                <div className="flex gap-3 items-start p-3 rounded-xl bg-stone-50/50 border border-stone-100">
                                    <div className="p-2 rounded-lg bg-sky-50 text-sky-500 border border-sky-100">
                                        <User size={18} />
                                    </div>
                                    <div className="space-y-0.5">
                                        <p className="text-[11px] font-semibold text-stone-400 uppercase tracking-wider">Nombre de la infracción</p>
                                        <p className="text-sm font-bold text-stone-700">{infraccion.nombre}</p>
                                    </div>
                                </div>

                                <div className="flex gap-3 items-start p-3 rounded-xl bg-stone-50/50 border border-stone-100">
                                    <div className="p-2 rounded-lg bg-amber-50 text-amber-500 border border-amber-100">
                                        <ShieldAlert size={18} />
                                    </div>
                                    <div className="space-y-0.5">
                                        <p className="text-[11px] font-semibold text-stone-400 uppercase tracking-wider">Nivel de Gravedad</p>
                                        <p className="text-sm font-bold text-stone-700">{infraccion.gravedad}</p>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>

                    {/* Panel Lateral */}
                    <div className="space-y-6">
                        <div className="p-6 rounded-2xl border border-stone-200 bg-white/70 backdrop-blur-md shadow-sm space-y-4">
                            <h3 className="text-xs font-black text-stone-400 uppercase tracking-widest flex items-center gap-1.5">
                                <Activity size={12} className="text-red-500" />
                                Metadatos del Sistema
                            </h3>

                            <div className="space-y-3.5 text-xs">
                                <div className="flex justify-between items-center py-2 border-b border-stone-100">
                                    <span className="text-stone-500 font-medium">ID de Infracción</span>
                                    <span className="font-mono font-bold text-stone-700">#{infraccion.id}</span>
                                </div>
                                <div className="flex justify-between items-center py-2 border-b border-stone-100">
                                    <span className="text-stone-500 font-medium">Estado</span>
                                    <span className="font-bold text-emerald-600">Registrado</span>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </>
    );
}