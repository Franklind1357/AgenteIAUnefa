import { Head, useForm, Link } from '@inertiajs/react';
import React from 'react';
import { ArrowLeft, Save, HardDrive, LayoutGrid, MapPin, Activity } from 'lucide-react';

export default function CreateDispositivo() {
    // ⚡ Hook de Inertia para gestionar el estado, errores y envío del formulario
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        ubicacion: '',
        tipo: '',
        estado: 'Activo',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        // En este proyecto no hay helper Ziggy cargado en JS, así que usamos ruta fija.
        post('/dispositivos/store', {
            onSuccess: () => reset(),
        });
    };

    return (
        <>
            <Head title="Registrar Dispositivo - UNEFA AI" />

            {/* 🎨 Contenedor Premium SaaS (Fondo Stone + Destellos Sky) */}
            <div className="relative flex h-full flex-1 flex-col gap-8 p-6 md:p-8 bg-[#f5f5f4] text-stone-800 overflow-y-auto bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-100/40 via-[#f5f5f4] to-[#f5f5f4]">
                
                {/* Luces de ambiente sutiles */}
                <div className="absolute top-0 right-1/4 h-[250px] w-[250px] rounded-full bg-sky-400/10 blur-[90px] pointer-events-none" />
                <div className="absolute top-1/2 left-10 h-[200px] w-[200px] rounded-full bg-indigo-400/5 blur-[80px] pointer-events-none" />

                {/* Encabezado con Botón de Regresar */}
                <div className="relative flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 px-2 border-b border-stone-200 pb-4">
                    <div className="space-y-1">
                        <div className="flex items-center gap-2 text-xs font-semibold text-sky-600 tracking-wider uppercase mb-1">
                            <HardDrive size={14} />
                            Gestión de Infraestructura
                        </div>
                        <h2 className="text-xl md:text-2xl font-black text-stone-800 tracking-tight">
                            Registrar Nuevo Periférico
                        </h2>
                    </div>
                </div>

                {/* 📋 Formulario de Registro */}
                <div className="relative max-w-5xl w-full mx-auto">
                    <form 
                        onSubmit={handleSubmit}
                        className="bg-white/70 backdrop-blur-md border border-stone-200/80 rounded-2xl p-6 md:p-8 shadow-xl shadow-stone-200/50 space-y-6"
                    >
                        <div className="border-b border-stone-100 pb-3">
                            <h3 className="text-sm font-bold text-stone-900">Especificaciones del Dispositivo</h3>
                            <p className="text-xs text-stone-700 mt-0.5">Ingresa los parámetros requeridos para la integración con los módulos del sistema.</p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            {/* Campo: Nombre */}
                            <div className="space-y-1.5">
                                <label className="text-xs font-bold text-stone-700 tracking-wide flex items-center gap-1.5">
                                    <HardDrive size={13} className="text-stone-900" />
                                    Nombre del Dispositivo
                                </label>
                                <input 
                                    type="text"
                                    value={data.name}
                                    onChange={e => setData('name', e.target.value)}
                                    placeholder="Ej: Escaner V1"
                                    className="w-full px-4 py-2.5 text-sm bg-white/50 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-400/50 focus:border-sky-400 transition-all placeholder:text-stone-400 text-stone-700"
                                />
                                {errors.name && <span className="text-xs font-semibold text-rose-500 block pl-1">{errors.name}</span>}
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-xs font-bold text-stone-700 tracking-wide flex items-center gap-1.5">
                                    <HardDrive size={13} className="text-stone-900" />
                                    Correo Electronico
                                </label>
                                <input 
                                    type="email"
                                    value={data.email}
                                    onChange={e => setData('email', e.target.value)}
                                    placeholder="Correo Electronico del Dispositivo"
                                    className="w-full px-4 py-2.5 text-sm bg-white/50 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-400/50 focus:border-sky-400 transition-all placeholder:text-stone-400 text-stone-700"
                                />
                                {errors.email && <span className="text-xs font-semibold text-rose-500 block pl-1">{errors.email}</span>}
                            </div>
                        </div>
            

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            {/* Campo: Tipo */}
                            <div className="space-y-1.5">
                                <label className="text-xs font-bold text-stone-700 tracking-wide flex items-center gap-1.5">
                                    <LayoutGrid size={13} className="text-stone-900" />
                                    Tipo de Dispositivo
                                </label>
                                <input 
                                    type="text"
                                    value={data.tipo}
                                    onChange={e => setData('tipo', e.target.value)}
                                    placeholder="Ej: Camara, Laptop, Computador"
                                    className="w-full px-4 py-2.5 text-sm bg-white/50 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-400/50 focus:border-sky-400 transition-all placeholder:text-stone-400 text-stone-700"
                                />
                                {errors.tipo && <span className="text-xs font-semibold text-rose-500 block pl-1">{errors.tipo}</span>}
                            </div>

                            {/* Campo: Ubicación */}
                            <div className="space-y-1.5">
                                <label className="text-xs font-bold text-stone-700 tracking-wide flex items-center gap-1.5">
                                    <MapPin size={13} className="text-stone-900" />
                                    Ubicación Física
                                </label>
                                <input 
                                    type="text"
                                    value={data.ubicacion}
                                    onChange={e => setData('ubicacion', e.target.value)}
                                    placeholder="Ej: Laboratorio 1, Planta Alta"
                                    className="w-full px-4 py-2.5 text-sm bg-white/50 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-400/50 focus:border-sky-400 transition-all placeholder:text-stone-400 text-stone-700"
                                />
                                {errors.ubicacion && <span className="text-xs font-semibold text-rose-500 block pl-1">{errors.ubicacion}</span>}
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-xs font-bold text-stone-700 tracking-wide flex items-center gap-1.5">
                                    <MapPin size={13} className="text-stone-900" />
                                    Contrasena
                                </label>
                                    <input 
                                        type="password"
                                        value={data.password}
                                        onChange={e => setData('password', e.target.value)}
                                        placeholder="************"
                                        className="w-full px-4 py-2.5 text-sm bg-white/50 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-400/50 focus:border-sky-400 transition-all placeholder:text-stone-400 text-stone-700"
                                    />
                                    {errors.password && <span className="text-xs font-semibold text-rose-500 block pl-1">{errors.password}</span>}
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-xs font-bold text-stone-700 tracking-wide flex items-center gap-1.5">
                                    <MapPin size={13} className="text-stone-900" />
                                    Confirmar Contrasena
                                </label>
                                <input 
                                    type="password"
                                    value={data.password_confirmation}
                                    onChange={e => setData('password_confirmation', e.target.value)}
                                    placeholder="************"
                                    className="w-full px-4 py-2.5 text-sm bg-white/50 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-400/50 focus:border-sky-400 transition-all placeholder:text-stone-400 text-stone-700"
                                />
                                {errors.password_confirmation && <span className="text-xs font-semibold text-rose-500 block pl-1">{errors.password_confirmation}</span>}
                            </div>
                        </div>

                        {/* Campo: Estado */}
                        <div className="space-y-1.5">
                            <label className="text-xs font-bold text-stone-700 tracking-wide flex items-center gap-1.5">
                                <Activity size={13} className="text-stone-900" />
                                Estado del Dispositivo
                            </label>
                            <div className="relative">
                                <select 
                                    value={data.estado}
                                    onChange={e => setData('estado', e.target.value)}
                                    className="w-full px-4 py-2.5 text-sm bg-white/50 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-400/50 focus:border-sky-400 transition-all text-stone-700 cursor-pointer appearance-none"
                                >
                                    <option value="Activo">Activo / En Línea</option>
                                    <option value="Inactivo">Inactivo / Fuera de Servicio</option>
                                    <option value="Falla">Falla / Mantenimiento</option>
                                </select>
                                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-stone-400">
                                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                                    </svg>
                                </div>
                            </div>
                            {errors.estado && <span className="text-xs font-semibold text-rose-500 block pl-1">{errors.estado}</span>}
                        </div>

                        {/* Sección del Botón de Enviar */}
                        <div className="pt-4 border-t border-stone-100 flex justify-end">
                            
                            <Link
                                href={'/dispositivos'}
                                className="mr-3 inline-flex items-center justify-center gap-2 px-5 py-2.5 text-xs font-bold text-white bg-stone-400 border border-stone-300 rounded-xl shadow-md shadow-sky-500/10 hover:bg-stone-500 transition-all"
                            >
                                <ArrowLeft size={14} />
                                Cancelar
                            </Link>
                            
                            <button
                                type="submit"
                                disabled={processing}
                                className="inline-flex items-center cursor-pointer justify-center gap-2 px-5 py-2.5 text-xs font-bold text-white bg-sky-500 border border-sky-600 rounded-xl shadow-md shadow-sky-500/10 hover:bg-sky-600 transition-all active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none"
                            >
                                <Save size={14} />
                                {processing ? 'Guardando Nodo...' : 'Guardar Dispositivo'}
                            </button>
                        </div>
                    </form>
                </div>

            </div>
        </>
    );
}