import { dashboard, login, register } from '@/routes';
import { Head, Link, usePage } from '@inertiajs/react';
import { Cpu, ShieldAlert, Zap, BookOpen, Fingerprint } from 'lucide-react';

export default function Welcome() {
    const { auth } = usePage().props as any;

    return (
        <>
            <Head title="Bienvenido - Escáner IA UNEFA" />
            
            {/* Contenedor Base */}
            <div className="min-h-screen bg-stone-50 selection:bg-blue-500/30 overflow-x-hidden relative flex flex-col">
                
                {/* Navbar Superior - Padding dinámico para móviles */}
                <header className="absolute top-0 w-full p-4 sm:p-6 z-20">
                    <nav className="flex items-center justify-end gap-3 sm:gap-6 max-w-7xl mx-auto">
                        {auth.user ? (
                            <Link
                                href={dashboard()}
                                className="rounded-full bg-sky-500 px-5 py-2 sm:px-6 text-xs sm:text-sm font-bold text-slate-50 hover:bg-blue-500 transition-all shadow-lg shadow-blue-900/20"
                            >
                                Panel de Control
                            </Link>
                        ) : (
                            <>
                                <Link
                                    href={login()}
                                    className="text-xs sm:text-sm font-medium text-slate-950 hover:text-slate-700 transition-colors"
                                >
                                    Iniciar Sesión
                                </Link>
                                <Link
                                    href={register()}
                                    className="rounded-full border border-slate-700 px-4 py-1.5 sm:px-6 sm:py-2 text-xs sm:text-sm font-medium text-slate-950 hover:bg-slate-800 hover:text-slate-100 transition-all"
                                >
                                    Registro
                                </Link>
                            </>
                        )}
                    </nav>
                </header>

                {/* Hero Section - pt-24 evita que el contenido quede debajo del navbar en móviles */}
                <section className="flex-grow flex items-center justify-center p-4 sm:p-6 pt-24 sm:pt-6 relative z-10">
                    
                    <div className="max-w-4xl w-full text-center space-y-8 sm:space-y-12">
                        
                        {/* Tags e Intro */}
                        <div className="space-y-5 sm:space-y-6">
                            {/* Etiqueta Superior */}
                            <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1 sm:py-1.5 rounded-full bg-slate-200/40 border border-blue-500/20 text-blue-600 text-[10px] sm:text-xs font-bold uppercase tracking-[0.1em] sm:tracking-[0.2em] max-w-full text-center">
                                <Zap size={12} className="fill-current shrink-0" />
                                <span className="truncate">UNEFA Punto Fijo • Innovación</span>
                            </div>
                            
                            {/* 🔥 TÍTULO ESCALABLE: Se adapta desde móviles pequeños hasta 4K 🔥 */}
                            <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black leading-[1.1] tracking-tighter">
                                <span className="relative inline-block">
                                    
                                    {/* 🛡️ ESCUDO ADAPTATIVO MODIFICADO 🔥 */}
                                    {/* He aumentado significativamente el tamaño en todos los breakpoints: h-16 móvil, h-28 PC */}
                                    <img 
                                        src="/img/LogoEscudo.png" 
                                        alt="Escudo UNEFA" 
                                        // NUEVO TAMAÑO ESCALABLE: h-16 (64px móvil) -> h-20 (tablet) -> h-28 (desktop 112px)
                                        // NUEVO ESPACIADO: mr-3 (móvil) -> md:mr-6 (PC)
                                        className="absolute top-1/2 -translate-y-1/2 right-full mr-3 md:mr-6 h-16 md:h-20 lg:h-28 w-auto object-contain z-10 drop-shadow-sm"
                                    />
                                    
                                    <span className="bg-gradient-to-r from-sky-800 to-slate-950 bg-clip-text text-transparent">
                                        IA para el <br />
                                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-500 to-indigo-500">Reglamento.</span>
                                    </span>
                                </span>
                            </h1>
                            
                            {/* Párrafo con padding lateral de seguridad en móviles */}
                            <p className="text-slate-800 text-base sm:text-lg md:text-xl max-w-2xl mx-auto leading-relaxed px-2 sm:px-0">
                                Modernizamos la supervisión institucional mediante modelos de 
                                <b> visión artificial</b> entrenados para detectar el cumplimiento 
                                del uniforme y normativas de la UNEFA en tiempo real.
                            </p>
                        </div>

                        {/* Botones de Acción */}
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-4">
                            <a 
                                target='_blank' 
                                rel='noopener noreferrer' 
                                href='http://unefa.edu.ve/CMS/administrador/vistas/archivos/REGLAMENTO%20DISCIPLINARIO.pdf' 
                                className="w-full sm:w-auto px-6 sm:px-9 py-4 sm:py-5 rounded-xl sm:rounded-2xl bg-white border border-amber-600/30 hover:border-amber-600/60 hover:-translate-y-1 transition-all flex items-center justify-center gap-2 shadow-sm shadow-amber-500/5"
                            >
                                <BookOpen size={20} className='text-amber-500 shrink-0'/>
                                <span className="bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent font-bold text-base sm:text-lg">
                                    Ver Reglamento
                                </span>
                            </a>
                        </div>

                        {/* Grid de Características Detalladas - Espaciado adaptativo */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 sm:gap-6 pt-8 sm:pt-6 border-t border-red-200/60 mt-8 sm:mt-6 px-4 sm:px-0">
                            <div className="space-y-2 sm:space-y-3">
                                <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-xl bg-slate-900/5 flex items-center justify-center mx-auto">
                                    <Cpu className="text-sky-700" size={20} />
                                </div>
                                <h3 className="text-slate-950 font-bold text-sm sm:text-base">Visión Artificial</h3>
                                <p className="text-slate-700 text-xs px-4 sm:px-2">Detección de patrones en insignias y corrección de prendas.</p>
                            </div>
                            <div className="space-y-2 sm:space-y-3">
                                <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-xl bg-slate-900/5 flex items-center justify-center mx-auto">
                                    <Fingerprint className="text-sky-700" size={20} />
                                </div>
                                <h3 className="text-slate-950 font-bold text-sm sm:text-base">Acceso Seguro</h3>
                                <p className="text-slate-700 text-xs px-4 sm:px-2">Validación biométrica para el personal de supervisión.</p>
                            </div>
                            {/* Col span adjustment on last element on intermediate screens */}
                            <div className="space-y-2 sm:space-y-3 sm:col-span-2 md:col-span-1">
                                <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-xl bg-slate-900/5 flex items-center justify-center mx-auto">
                                    <ShieldAlert className="text-sky-700" size={20} />
                                </div>
                                <h3 className="text-slate-950 font-bold text-sm sm:text-base">Reportes IP</h3>
                                <p className="text-slate-700 text-xs px-4 sm:px-2 md:px-0 lg:px-2">Generación de incidencias automática por cada sección.</p>
                            </div>
                        </div>
                    </div>

                </section>

                {/* Decoración de fondo */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[80vh] w-[80vw] bg-sky-600/5 rounded-full blur-[80px] md:blur-[120px] pointer-events-none z-0"></div>
            </div>
        </>
    );
}