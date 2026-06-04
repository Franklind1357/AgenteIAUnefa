import { Head, useForm, Link } from '@inertiajs/react';
import React from 'react';
import { ArrowLeft, Save, HardDrive, LayoutGrid, MapPin, Activity, ShieldAlert } from 'lucide-react';

interface Dispositivo {
    id: number;
    name: string;
    email: string;
    ubicacion: string;
    tipo: string;
    estado: string;
}

interface EditProps {
    dispositivo: Dispositivo;
}

export default function EditDispositivo({ dispositivo }: EditProps) {
    // ⚡ Hook de Inertia precargado con la información actual que viene desde Laravel
    const { data, setData, put, processing, errors } = useForm({
        name: dispositivo.name || '',
        ubicacion: dispositivo.ubicacion || '',
        tipo: dispositivo.tipo || '',
        estado: dispositivo.estado || 'Activo',
        email: dispositivo.email || '',
        password: '',              // Se deja vacío para indicar que es opcional
        password_confirmation: '', // Se deja vacío
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        // Enviamos mediante PUT a la ruta fija apuntando al ID del dispositivo
        put(`/dispositivos/show/${dispositivo.id}/edit/update`, {
            preserveScroll: true,
        });
    };

    return (
        <>
            <Head title={`Editar: ${dispositivo.name} - UNEFA AI`} />

            {/* 🎨 Contenedor Premium SaaS (Fondo Stone + Destellos Sky heredados) */}
            <div className="relative flex h-full flex-1 flex-col gap-8 p-6 md:p-8 bg-[#f5f5f4] text-stone-800 overflow-y-auto bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-100/40 via-[#f5f5f4] to-[#f5f5f4]">
                
                {/* Luces de ambiente sutiles */}
                <div className="absolute top-0 right-1/4 h-[250px] w-[250px] rounded-full bg-sky-400/10 blur-[90px] pointer-events-none" />
                <div className="absolute top-1/2 left-10 h-[200px] w-[200px] rounded-full bg-indigo-400/5 blur-[80px] pointer-events-none" />

                {/* Encabezado con Botón de Regresar al Show */}
                <div className="relative flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 px-2 border-b border-stone-200 pb-4">
                    <div className="space-y-1">
                        <Link 
                            href={`/dispositivos/show/${dispositivo.id}`} 
                            className="inline-flex items-center gap-1.5 text-xs font-bold text-stone-500 hover:text-sky-500 transition-colors mb-1 group"
                        >
                            <ArrowLeft size={14} className="group-hover:-translate-x-0.5 transition-transform" />
                            Cancelar y volver al detalle
                        </Link>
                        <h2 className="text-xl md:text-2xl font-black text-stone-800 tracking-tight flex items-center gap-2">
                            <HardDrive className="text-sky-500" size={24} />
                            Modificar Parámetros: {dispositivo.name}
                        </h2>
                    </div>
                </div>

                {/* 📋 Formulario de Actualización */}
                <div className="relative max-w-5xl w-full mx-auto">
                    <form 
                        onSubmit={handleSubmit}
                        className="bg-white/70 backdrop-blur-md border border-stone-200/80 rounded-2xl p-6 md:p-8 shadow-xl shadow-stone-200/50 space-y-6"
                    >
                        <div className="border-b border-stone-100 pb-3">
                            <h3 className="text-sm font-bold text-stone-900">Actualizar Especificaciones</h3>
                            <p className="text-xs text-stone-700 mt-0.5">Modifica los campos necesarios. La identidad de red y el usuario se reconfigurarán automáticamente.</p>
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
                                    className="w-full px-4 py-2.5 text-sm bg-white/50 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-400/50 focus:border-sky-400 transition-all text-stone-700"
                                />
                                {errors.name && <span className="text-xs font-semibold text-rose-500 block pl-1">{errors.name}</span>}
                            </div>

                            {/* Campo: Email */}
                            <div className="space-y-1.5">
                                <label className="text-xs font-bold text-stone-700 tracking-wide flex items-center gap-1.5">
                                    <HardDrive size={13} className="text-stone-900" />
                                    Correo Electrónico
                                </label>
                                <input 
                                    type="email"
                                    value={data.email}
                                    onChange={e => setData('email', e.target.value)}
                                    className="w-full px-4 py-2.5 text-sm bg-white/50 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-400/50 focus:border-sky-400 transition-all text-stone-700"
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
                                    className="w-full px-4 py-2.5 text-sm bg-white/50 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-400/50 focus:border-sky-400 transition-all text-stone-700"
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
                                    className="w-full px-4 py-2.5 text-sm bg-white/50 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-400/50 focus:border-sky-400 transition-all text-stone-700"
                                />
                                {errors.ubicacion && <span className="text-xs font-semibold text-rose-500 block pl-1">{errors.ubicacion}</span>}
                            </div>
                        </div>

                        {/* Bloque Informativo de Seguridad para Contraseñas */}
                        <div className="p-4 rounded-xl border border-amber-200 bg-amber-50/40 text-stone-700 flex gap-3 items-start">
                            <ShieldAlert className="text-amber-500 mt-0.5 shrink-0" size={16} />
                            <p className="text-xs leading-relaxed">
                                <strong>Nota sobre autenticación:</strong> Deja los campos de contraseña en blanco si deseas mantener la clave de acceso actual del nodo periférico.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            {/* Campo: Nueva Contraseña */}
                            <div className="space-y-1.5">
                                <label className="text-xs font-bold text-stone-700 tracking-wide flex items-center gap-1.5">
                                    <MapPin size={13} className="text-stone-900" />
                                    Nueva Contraseña (Opcional)
                                </label>
                                <input 
                                    type="password"
                                    value={data.password}
                                    onChange={e => setData('password', e.target.value)}
                                    placeholder="Dejar vacío para no cambiar"
                                    className="w-full px-4 py-2.5 text-sm bg-white/50 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-400/50 focus:border-sky-400 transition-all placeholder:text-stone-400 text-stone-700"
                                />
                                {errors.password && <span className="text-xs font-semibold text-rose-500 block pl-1">{errors.password}</span>}
                            </div>

                            {/* Campo: Confirmar Contraseña */}
                            <div className="space-y-1.5">
                                <label className="text-xs font-bold text-stone-700 tracking-wide flex items-center gap-1.5">
                                    <MapPin size={13} className="text-stone-900" />
                                    Confirmar Nueva Contraseña
                                </label>
                                <input 
                                    type="password"
                                    value={data.password_confirmation}
                                    onChange={e => setData('password_confirmation', e.target.value)}
                                    placeholder="Dejar vacío para no cambiar"
                                    className="w-full px-4 py-2.5 text-sm bg-white/50 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-400/50 focus:border-sky-400 transition-all placeholder:text-stone-400 text-stone-700"
                                />
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

                        {/* Sección de Botones de Acción */}
                        <div className="pt-4 border-t border-stone-100 flex justify-end gap-3">
                            <button
                                type="submit"
                                disabled={processing}
                                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 text-xs font-bold text-white bg-sky-500 border border-sky-600 rounded-xl shadow-md shadow-sky-500/10 hover:bg-sky-600 transition-all active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none"
                            >
                                <Save size={14} />
                                {processing ? 'Actualizando Nodo...' : 'Guardar Cambios'}
                            </button>
                        </div>
                    </form>
                </div>

            </div>
        </>
    );
}