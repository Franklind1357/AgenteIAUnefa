import React from 'react';
import { ArrowUpRight } from 'lucide-react';

interface DashboardCardProps {
    type: 'stat' | 'module';
    title: string;
    value?: string;
    description?: string;
    status?: string;
    trend?: string;
    icon?: React.ReactNode;
    isAlert?: boolean;
    badgeColor?: string; // Puedes pasar clases como "bg-sky-50 text-sky-600 border-sky-200"
    direction?: string; // URL de destino para módulos
}

export default function DashboardCard({
    type,
    title,
    value,
    description,
    status,
    direction,
    trend,
    icon,
    isAlert = false,
    badgeColor
}: DashboardCardProps) {
    
    // 📊 DISEÑO: TARJETA DE ESTADÍSTICAS (Glassmorphism Claro)
    if (type === 'stat') {
        return (
            <div className="relative overflow-hidden rounded-2xl border cursor-pointer border-stone-200/80 bg-white/60 backdrop-blur-xl p-5 shadow-sm transition-all duration-300 hover:border-sky-300 hover:bg-white/90 hover:shadow-[0_10px_30px_rgba(14,165,233,0.08)] group">
                {/* Brillo ambiental sutil azul sky en hover */}
                <div className="absolute -right-10 -top-10 h-24 w-24 rounded-full bg-sky-400/10 blur-2xl transition-opacity opacity-0 group-hover:opacity-100" />
                
                <div className="flex items-center justify-between mb-4">
                    <div className="p-2.5 bg-stone-100 rounded-xl border border-stone-200/60 text-stone-600 transition-all duration-300 group-hover:bg-sky-50 group-hover:border-sky-200 group-hover:text-sky-600">
                        {icon}
                    </div>
                </div>
                <p className="text-stone-400 text-xs font-semibold uppercase tracking-widest">{title}</p>
                <h4 className="text-3xl font-black text-stone-800 mt-1 tracking-tight">
                    {value}
                </h4>
            </div>
        );
    }

    // 🧩 DISEÑO: TARJETA DE MÓDULOS (Estilo Feature de Landing Page Premium)
    if (type === 'module') {
        return (
            <a href={direction}>
                <div className="group relative rounded-2xl border border-stone-200/80  bg-gradient-to-b from-white/90 to-stone-50/40 backdrop-blur-xl p-6 flex flex-col justify-between shadow-sm hover:border-sky-300 hover:from-white hover:to-stone-50/80 transition-all duration-300 hover:shadow-[0_12px_40px_rgba(14,165,233,0.1)] cursor-pointer">
                {/* Línea superior brillante en azul sky que se expande en hover */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-gradient-to-r from-transparent via-sky-400 to-transparent transition-all duration-500 group-hover:w-2/3" />
                
                <div className="space-y-4">
                    <div className="flex items-start justify-between">
                        <div className="p-3 bg-stone-50 rounded-xl border border-stone-200/60 text-stone-400 group-hover:text-sky-600 group-hover:bg-sky-50 group-hover:border-sky-200 transition-all shadow-sm">
                            {icon}
                        </div>
                        <span className={`text-[9px] font-black uppercase px-2.5 py-0.5 rounded-md border tracking-wider shadow-xs transition-all ${
                            badgeColor || 'bg-sky-50 text-sky-600 border-sky-200'
                        } ${isAlert ? 'animate-pulse bg-amber-50 text-amber-600 border-amber-300' : ''}`}>
                            {status}
                        </span>
                    </div>
                    
                    <div className="space-y-1.5">
                        <h4 className="text-base font-bold text-stone-800 group-hover:text-sky-600 transition-colors flex items-center gap-1.5 tracking-tight">
                            {title}
                        </h4>
                        <p className="text-xs text-stone-500 leading-relaxed font-normal">
                            {description}
                        </p>
                    </div>
                </div>

                {/* Pie de tarjeta interactivo */}
                <div className="flex items-center justify-end text-stone-400 group-hover:text-sky-600 pt-5 mt-4 border-t border-stone-100">
                    <span className="text-[10px] font-bold uppercase tracking-widest opacity-0 transform translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 mr-1.5">
                        Ingresar Módulo
                    </span>
                    <ArrowUpRight size={15} className="transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
                </div>
            </div>
            </a>
        );
    }

    return null;
}