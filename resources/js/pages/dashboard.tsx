import { Head, Link } from '@inertiajs/react';
import { dashboard } from '@/routes';
import { Activity, CheckCircle, AlertTriangle, GraduationCap, Cpu, FileText, QrCode, Scan, ShieldAlert } from 'lucide-react';
import DashboardCard from '@/components/ComponentesNuevos/dasboard-cards';

type Props = {
    puedeEscanear: boolean;
    noPuedeEscanear: boolean;
    dispositivoActual?: any;
};

export default function Dashboard({ noPuedeEscanear, puedeEscanear, dispositivoActual }: Props) {
    const dispositivo = dispositivoActual || { id: 1, name: "Estación de Acceso Principal", ubicacion: "Puerta A" };

    return (
        <>
            <Head title="Dashboard - UNEFA AI" />
            
            
            <div className="relative flex h-full flex-1 flex-col gap-8 p-6 md:p-8 bg-[#f5f5f4] text-stone-800 overflow-y-auto bg-[radial-gradient(ellipse_at_top,var(--tw-gradient-stops))] from-sky-100/40 via-[#f5f5f4] to-[#f5f5f4]">
                

            {noPuedeEscanear && (
                <>
                    <div className="absolute top-0 right-1/4 h-64 w-64 rounded-full bg-sky-400/10 blur-[90px] pointer-events-none" />
                    <div className="absolute bottom-10 left-10 h-64 w-64 rounded-full bg-emerald-400/5 blur-[100px] pointer-events-none" />

                    <div className="relative px-2 border-b border-stone-200 pb-4">
                        <h2 className="text-xl md:text-2xl font-black text-stone-800 tracking-tight flex items-center gap-2.5">
                            <span className="h-2.5 w-2.5 rounded-full bg-sky-500 shadow-[0_0_10px_rgba(14,165,233,0.4)] animate-pulse" />
                            Panel del Administrador
                        </h2>
                        <p className="text-xs md:text-sm text-slate-800 mt-1 font-medium">
                            Monitoreo analítico del sistema de visión artificial y control disciplinario.
                        </p>
                    </div>

                    <div className="relative grid auto-rows-min gap-5 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
                        <DashboardCard type="stat" title="Escaneos Hoy" value="-" icon={<Activity size={20} />} />
                        <DashboardCard type="stat" title="Tasa de Cumplimiento" value="-" icon={<CheckCircle size={20} />} />
                        <DashboardCard type="stat" title="Infracciones Detectadas" value="-" icon={<AlertTriangle size={20} />} isAlert />
                    </div>

                    <div className="relative space-y-4">
                        <div className="px-2">
                            <h3 className="text-base font-bold text-stone-800 tracking-tight">Módulos Core del Sistema</h3>
                            <p className="text-xs text-stone-500 mt-0.5">Gestión operativa e integraciones de red inteligente.</p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                            <DashboardCard type="module" direction={'/dispositivos'} title="Dispositivos y Flujos" description="Configuración de flujos de cámaras y optimizacion de flujo." status="Operacional" icon={<Cpu size={20} />} badgeColor="bg-sky-50 text-sky-600 border-sky-200" />
                            <DashboardCard type="module" direction={'/estudiantes'} title="Estudiantes" description="Administración de datos estudiantiles y logs de accesos." status="Activo" icon={<GraduationCap size={20} />} badgeColor="bg-emerald-50 text-emerald-600 border-emerald-200" />
                            <DashboardCard type="module" direction={'/infracciones'} title="Infracciones" description="Historial automatizado de reportes PDF por sección académica y despacho de notificaciones directas." status="1 Alerta" icon={<ShieldAlert size={20} />} badgeColor="bg-amber-50 text-amber-600 border-amber-200" isAlert />
                        </div>
                    </div>
                </>
            )}

            {puedeEscanear && (

                <div className="relative mt-8 rounded-4xl border-4 border-sky-400 bg-linear-to-br from-white via-stone-50 to-sky-100/50 shadow-2xl overflow-hidden p-8 md:p-14 flex flex-col gap-10 min-h-115 justify-between group/totem">
                    
                    {/* Efecto de escaneo láser de fondo parpadeante sutil */}
                    <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_49%,rgba(14,165,233,0.1)_50%,transparent_51%)] bg-size-[100%_20px] animate-[pulse_3s_infinite] pointer-events-none" />
                    
                    {/* Escudo U gigante en el fondo */}
                    <div className="absolute -right-16 -bottom-16 opacity-[0.04] pointer-events-none text-sky-950 transition-transform duration-700 group-hover/totem:scale-110">
                        <svg className="w-96 h-96" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M6 4V16C6 22.6274 10.4772 28 16 28C21.5228 28 26 22.6274 26 16V4" stroke="currentColor" strokeWidth="2.5" />
                        </svg>
                    </div>

                    {/* Fila Superior: Status de Red y Dispositivo */}
                    <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6 border-b-2 border-stone-200 pb-8">
                        <div className="space-y-2">
                            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-sky-500/10 border border-sky-300 text-sky-700">
                                <span className="relative flex h-3 w-3">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-3 w-3 bg-sky-500"></span>
                                </span>
                                <span className="text-xs font-black uppercase tracking-widest font-mono">
                                    Módulo Autorizado
                                </span>
                            </div>
                            <h3 className="text-2xl md:text-4xl font-black text-stone-900 tracking-tighter uppercase flex items-center gap-4">
                                <QrCode className="text-sky-500 animate-pulse" size={36} />
                                {dispositivo.name}
                            </h3>
                        </div>

                        {/* Tag de ubicación de alta visibilidad */}
                        <div className="self-start md:self-auto text-left md:text-right">
                            <p className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">Zona de Escaneo</p>
                            <span className="inline-block mt-1 text-sm font-black text-sky-700 bg-sky-50 border-2 border-sky-200 px-4 py-1.5 rounded-xl uppercase tracking-wider shadow-sm">
                                {dispositivo.ubicacion}
                            </span>
                        </div>
                    </div>

                    {/* Mensaje Central Gigante Instructivo */}
                    <div className="relative z-10 max-w-3xl space-y-3">
                        <h4 className="text-xl md:text-3xl font-black text-stone-800 tracking-tight">
                            ¿Listo para ingresar al campus?
                        </h4>
                        <p className="text-sm md:text-base text-stone-600 font-bold leading-relaxed">
                            Asegúrate de portar correctamente el <span className="text-indigo-600 underline decoration-2">uniforme reglamentario de la UNEFA</span> antes de iniciar. El sistema de visión artificial validará tu vestimenta y registrará tu asistencia de manera automatizada.
                        </p>
                    </div>

                    {/* Controles de Acción Masivos de Extremo a Extremo */}
                    <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6 pt-4">
                        
                        {/* Botón Izquierdo: Ver Reglamento (Limpio pero formal) */}
                        <Link
                            href={`#`}
                            className="w-full md:w-auto inline-flex items-center justify-center gap-3 px-8 py-5 bg-white hover:bg-stone-100 text-stone-700 hover:text-stone-900 text-base font-bold rounded-2xl border-2 border-stone-300 shadow-md active:scale-95 transition-all group shrink-0"
                        >
                            <FileText size={20} className="text-stone-400 group-hover:text-stone-600 transition-colors" />
                            <span>Ver Reglamento de Vestimenta</span>
                        </Link>

                        {/* Botón Derecho: EMPEZAR ESCANEO (Gigante, llamativo y Ultra Estético) */}
                        <Link
                            href={`/dashboard/biometrico/${dispositivo.id}`}
                            className="w-full md:w-auto inline-flex items-center justify-center gap-4 px-14 py-7 bg-linear-to-r from-sky-500 via-sky-600 to-indigo-600 hover:from-sky-600 hover:to-indigo-700 text-white text-lg md:text-xl font-black rounded-2xl shadow-[0_20px_40px_rgba(14,165,233,0.3)] hover:shadow-[0_20px_50px_rgba(14,165,233,0.4)] active:scale-[0.96] transition-all group shrink-0 uppercase tracking-widest border-b-8 border-indigo-800"
                        >
                            <Scan size={26} className="animate-[spin_4s_linear_infinite] group-hover:text-emerald-300 transition-colors" />
                            <span>Empezar Autoescaneo</span>
                        </Link>

                    </div>
                </div>
            )}

            </div>
        </>
    );
}

Dashboard.layout = {
    breadcrumbs: [
        {
            title: 'Panel de Control General',
            href: dashboard(),
        },
    ],
};