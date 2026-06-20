import React from 'react';
import { Head, useForm, Link } from '@inertiajs/react';
import { ShieldAlert, Save, ArrowLeft } from 'lucide-react';

export default function Create() {
    const { data, setData, post, processing, errors } = useForm({
        nombre: '',
        descripcion: '',
        gravedad: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/infracciones/store');
    };

    return (
        <div className="relative flex h-full flex-1 flex-col gap-8 p-6 md:p-8 bg-[#f5f5f4] text-stone-800 overflow-y-auto bg-[radial-gradient(ellipse_at_top,var(--tw-gradient-stops))] from-sky-100/40 via-[#f5f5f4] to-[#f5f5f4]">
            <Head title="Registrar Infracción - UNEFA AI" />

            <div className="absolute top-0 right-1/4 h-64 w-64 rounded-full bg-sky-400/10 blur-[90px] pointer-events-none" />

            <div className="relative flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 px-2 border-b border-stone-200 pb-4">
                <div className="space-y-1">
                    <div className="flex items-center gap-2 text-xs font-semibold text-sky-600 tracking-wider uppercase mb-1">
                        <ShieldAlert size={14} />
                        Gestión Disciplinaria
                    </div>
                    <h2 className="text-xl md:text-2xl font-black text-stone-800 tracking-tight">
                        Registrar Nueva Infracción
                    </h2>
                </div>
            </div>

            <div className="relative max-w-3xl w-full mx-auto">
                <form onSubmit={handleSubmit} className="bg-white/70 backdrop-blur-md border border-stone-200/80 rounded-2xl p-6 md:p-8 shadow-xl shadow-stone-200/50 space-y-6">
                    <div className="border-b border-stone-100 pb-3">
                        <h3 className="text-sm font-bold text-stone-900">Datos de la Falta</h3>
                        <p className="text-xs text-stone-700 mt-0.5">Ingresa manualmente los datos del estudiante y la infracción cometida.</p>
                    </div>

                    <div className="space-y-1.5">
                        <label className="text-xs font-bold text-stone-700 tracking-wide flex items-center gap-1.5">
                            Nombre asignado a la infracción
                        </label>
                        <input
                            type="text"
                            value={data.nombre}
                            onChange={e => setData('nombre', e.target.value)}
                            placeholder="Ej: Cabello Largo"
                            className="w-full px-4 py-2.5 text-sm bg-white/50 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-400/50 focus:border-sky-400 transition-all placeholder:text-stone-400 text-stone-700"
                        />
                        {errors.nombre && <span className="text-xs font-semibold text-rose-500 block pl-1">{errors.nombre}</span>}
                    </div>

                    <div className="space-y-1.5">
                        <label className="text-xs font-bold text-stone-700 tracking-wide flex items-center gap-1.5">
                            Descripción de la infracción
                        </label>
                        <textarea
                            value={data.descripcion}
                            onChange={e => setData('descripcion', e.target.value)}
                            placeholder="Ej: El estudiante debe tener el cabello corto"
                            rows={4}
                            className="w-full px-4 py-3 text-sm min-h-30 bg-white/50 border border-stone-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-sky-400/50 focus:border-sky-400 transition-all placeholder:text-stone-400 text-stone-700 resize-y"
                        />
                        <p className="text-[11px] text-stone-500">Describe la infracción con claridad; este campo admite texto largo.</p>
                        {errors.descripcion && <span className="text-xs font-semibold text-rose-500 block pl-1">{errors.descripcion}</span>}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div className="space-y-1.5">
                            <label className="text-xs font-bold text-stone-700 tracking-wide flex items-center gap-1.5">
                                Gravedad
                            </label>
                            <select
                                value={data.gravedad}
                                onChange={e => setData('gravedad', e.target.value)}
                                className="w-full px-4 py-2.5 pr-10 text-sm bg-white/50 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-400/50 focus:border-sky-400 transition-all text-stone-700 cursor-pointer"
                            >
                                <option value="">Seleccionar gravedad...</option>
                                <option value="Leve">Leve</option>
                                <option value="Grave">Grave</option>
                                <option value="Crítica">Crítica</option>
                            </select>
                            {errors.gravedad && <span className="text-xs font-semibold text-rose-500 block pl-1">{errors.gravedad}</span>}
                        </div>

            
                    </div>

                    <div className="pt-4 border-t border-stone-100 flex justify-end">

                        <Link
                            className="mr-3 inline-flex items-center gap-2 px-5 py-2.5 text-xs font-bold text-white bg-stone-400 border border-stone-300 rounded-xl shadow-sm hover:bg-stone-500 transition-all"
                            href="/infracciones"
                        >
                            <ArrowLeft size={14} />
                            Cancelar
                        </Link>

                        <button
                            type="submit"
                            disabled={processing}
                            className="inline-flex cursor-pointer tems-center justify-center gap-2 px-5 py-2.5 text-xs font-bold text-white bg-sky-500 border border-sky-600 rounded-xl shadow-md shadow-sky-500/10 hover:bg-sky-600 transition-all active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none"
                        >
                            <Save size={14} />
                            {processing ? 'Guardando...' : 'Registrar Infracción'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
