import { Head } from '@inertiajs/react';
import { dashboard } from '@/routes';
import { Activity, CheckCircle, AlertTriangle, Cpu, Fingerprint, ShieldAlert } from 'lucide-react';
import React from 'react';
import DashboardCard from '@/components/ComponentesNuevos/dasboard-cards';

type Props = {
    incumplimientos?: any[];
};

export default function Dashboard({ incumplimientos }: Props) {
    return (
        <>
            <Head title="Dashboard - UNEFA AI" />
            
            {/* 🎨 FONDO OPTIMIZADO: Base stone suave que descansa la vista con un sutil tinte sky superior */}
            <div className="relative flex h-full flex-1 flex-col gap-8 p-6 md:p-8 bg-[#f5f5f4] text-stone-800 overflow-y-auto bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-100/40 via-[#f5f5f4] to-[#f5f5f4]">
                
                {/* Luces de ambiente traseras ultra sutiles (baja opacidad para evitar encandilar) */}
                <div className="absolute top-0 right-1/4 h-64 w-64 rounded-full bg-sky-400/10 blur-[90px] pointer-events-none" />

                {/* Encabezado limpio y de alto contraste pero suave */}
                <div className="relative px-2 border-b border-stone-200 pb-4">
                    <h2 className="text-xl md:text-2xl font-black text-stone-800 tracking-tight flex items-center gap-2.5">
                        <span className="h-2.5 w-2.5 rounded-full bg-sky-500 shadow-[0_0_10px_rgba(14,165,233,0.4)] animate-pulse" />
                    </h2>
                    <p className="text-xs md:text-sm text-slate-800 mt-1 font-medium">
                        Monitoreo analítico del sistema de visión artificial y control disciplinario.
                    </p>
                </div>
                
                {/* 📊 Sección: Stats Superiores */}
                <div className="relative grid auto-rows-min gap-5 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
                    <DashboardCard 
                        type="stat"
                        title="Escaneos Hoy" 
                        value={incumplimientos?.length ? `${incumplimientos.length}` : '-'} 
                        icon={<Activity size={20} />} 
                    />
                    <DashboardCard 
                        type="stat"
                        title="Tasa de Cumplimiento" 
                        value="89.4%" 
                        icon={<CheckCircle size={20} />} 
                    />
                    <DashboardCard 
                        type="stat"
                        title="Infracciones Detectadas" 
                        value="15" 
                        icon={<AlertTriangle size={20} />} 
                        isAlert
                    />
                </div>

                {/* 🧩 Sección: Módulos Administrativos */}
                <div className="relative space-y-4">
                    <div className="px-2">
                        <h3 className="text-base font-bold text-stone-800 tracking-tight">Módulos Core del Sistema</h3>
                        <p className="text-xs text-stone-500 mt-0.5">Gestión operativa e integraciones de red inteligente.</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                        <DashboardCard 
                            type="module"
                            direction={'/dispositivos'}
                            title="Dispositivos y Flujos"
                            description="Configuración de flujos de cámaras y optimizacion de flujo."
                            status="Operacional"
                            icon={<Cpu size={20} />}
                            badgeColor="bg-sky-50 text-sky-600 border-sky-200"
                        />
                        <DashboardCard 
                            type="module"
                            title="Control Biométrico"
                            description="Administración de credenciales criptográficas, logs de accesos del personal administrativo y bedeles de guardia."
                            status="Activo"
                            icon={<Fingerprint size={20} />}
                            badgeColor="bg-emerald-50 text-emerald-600 border-emerald-200"
                        />
                        <DashboardCard 
                            type="module"
                            title="Reportes e Incidencias"
                            description="Historial automatizado de reportes PDF por sección académica y despacho de notificaciones directas."
                            status="1 Alerta"
                            icon={<ShieldAlert size={20} />}
                            badgeColor="bg-amber-50 text-amber-600 border-amber-200"
                            isAlert
                        />
                    </div>
                </div>

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