import { Head, useForm, Link } from '@inertiajs/react';
import React from 'react';
import { ArrowLeft, Save, User, GraduationCap, BookOpen, IdCard, Activity, ShieldAlert } from 'lucide-react';

interface Estudiante {
    id: number;
    nombre: string;
    apellido: string;
    cedula: string;
    carrera: string;
    semestre: string | number;
    carrera_label: string;     
    semestre_label: number;    
}

interface EditProps {
    estudiante: Estudiante;
}

export default function EditarEstudiante({ estudiante }: EditProps) {
    // ⚡ Hook de Inertia precargado
    const { data, setData, put, processing, errors } = useForm({
        nombre: estudiante.nombre || '',
        apellido: estudiante.apellido || '',
        cedula: estudiante.cedula || '',
        carrera: estudiante.carrera || '',
        semestre: String(estudiante.semestre || ''),
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        // Enviamos mediante PUT a tu ruta de actualización
        put(`/estudiantes/show/${estudiante.id}/edit/update`, {
            preserveScroll: true,
            onSuccess: () => alert("Estudiante actualizado correctamente."),
        });
    };

    return (
        <>
            <Head title={`Editar: ${estudiante.nombre} - UNEFA AI`} />

            {/* 🎨 Contenedor Premium SaaS */}
            <div className="relative flex h-full flex-1 flex-col gap-8 p-6 md:p-8 bg-[#f5f5f4] text-stone-800 overflow-y-auto bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-100/40 via-[#f5f5f4] to-[#f5f5f4]">
                
                {/* Luces de ambiente */}
                <div className="absolute top-0 right-1/4 h-[250px] w-[250px] rounded-full bg-sky-400/10 blur-[90px] pointer-events-none" />
                <div className="absolute top-1/2 left-10 h-[200px] w-[200px] rounded-full bg-indigo-400/5 blur-[80px] pointer-events-none" />

                {/* Encabezado */}
                <div className="relative flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 px-2 border-b border-stone-200 pb-4">
                    <div className="space-y-1">
                        <Link 
                            href={`/estudiantes/show/${estudiante.id}`} 
                            className="inline-flex items-center gap-1.5 text-xs font-bold text-stone-500 hover:text-sky-500 transition-colors mb-1 group"
                        >
                            <ArrowLeft size={14} className="group-hover:-translate-x-0.5 transition-transform" />
                            Cancelar y volver al perfil
                        </Link>
                        <h2 className="text-xl md:text-2xl font-black text-stone-800 tracking-tight flex items-center gap-2">
                            <User className="text-sky-500" size={24} />
                            Editar: {estudiante.nombre} {estudiante.apellido}
                        </h2>
                    </div>
                </div>

                {/* 📋 Formulario */}
                <div className="relative max-w-5xl w-full mx-auto">
                    <form 
                        onSubmit={handleSubmit}
                        className="bg-white/70 backdrop-blur-md border border-stone-200/80 rounded-2xl p-6 md:p-8 shadow-xl shadow-stone-200/50 space-y-6"
                    >
                        <div className="border-b border-stone-100 pb-3">
                            <h3 className="text-sm font-bold text-stone-900">Actualizar Información Académica</h3>
                            <p className="text-xs text-stone-700 mt-0.5">Modifica los datos del estudiante. Asegúrate de que los cambios sean correctos para el sistema de escaneo.</p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            {/* Nombre */}
                            <div className="space-y-1.5">
                                <label className="text-xs font-bold text-stone-700 tracking-wide">Nombres</label>
                                <input 
                                    type="text"
                                    value={data.nombre}
                                    onChange={e => setData('nombre', e.target.value)}
                                    className="w-full px-4 py-2.5 text-sm bg-white/50 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-400/50 focus:border-sky-400 transition-all text-stone-700"
                                />
                                {errors.nombre && <span className="text-xs font-semibold text-rose-500 block pl-1">{errors.nombre}</span>}
                            </div>

                            {/* Apellido */}
                            <div className="space-y-1.5">
                                <label className="text-xs font-bold text-stone-700 tracking-wide">Apellidos</label>
                                <input 
                                    type="text"
                                    value={data.apellido}
                                    onChange={e => setData('apellido', e.target.value)}
                                    className="w-full px-4 py-2.5 text-sm bg-white/50 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-400/50 focus:border-sky-400 transition-all text-stone-700"
                                />
                                {errors.apellido && <span className="text-xs font-semibold text-rose-500 block pl-1">{errors.apellido}</span>}
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            {/* Carrera */}
                            <div className="space-y-1.5">
                                <label className="text-xs font-bold text-stone-700 tracking-wide flex items-center gap-1.5">
                                    <GraduationCap size={13} className="text-stone-900" />
                                    Carrera
                                </label>
                                <select 
                                    value={data.carrera}
                                    onChange={e => setData('carrera', e.target.value)}
                                    className="w-full px-4 py-2.5 text-sm bg-white/50 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-400/50 focus:border-sky-400 transition-all text-stone-700"
                                >
                                    <option value="SISTEMAS">Ingeniería de Sistemas</option>
                                    <option value="NAVAL">Ingeniería Naval</option>
                                    <option value="PETROQUIMICA">Ingeniería Petroquímica</option>
                                    <option value="ENFERMERIA">TSU Enfermería</option>
                                    <option value="TURISMO">TSU Turismo</option>
                                    <option value="ECONOMIASOCIAL">Licenciatura en Economía Social</option>
                                </select>
                            </div>

                            {/* Semestre */}
                            <div className="space-y-1.5">
                                <label className="text-xs font-bold text-stone-700 tracking-wide flex items-center gap-1.5">
                                    <BookOpen size={13} className="text-stone-900" />
                                    Semestre
                                </label>
                                <select 
                                    value={data.semestre}
                                    onChange={e => setData('semestre', e.target.value)}
                                    className="w-full px-4 py-2.5 text-sm bg-white/50 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-400/50 focus:border-sky-400 transition-all text-stone-700"
                                >
                                    {[1,2,3,4,5,6,7,8].map(n => <option key={n} value={String(n)}>{n}° Semestre</option>)}
                                </select>
                            </div>
                        </div>

                        {/* Cédula */}
                        <div className="space-y-1.5">
                            <label className="text-xs font-bold text-stone-700 tracking-wide flex items-center gap-1.5">
                                <IdCard size={13} className="text-stone-900" />
                                Cédula de Identidad
                            </label>
                            <input 
                                type="text"
                                value={data.cedula}
                                onChange={e => setData('cedula', e.target.value)}
                                className="w-full px-4 py-2.5 text-sm bg-white/50 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-400/50 focus:border-sky-400 transition-all text-stone-700"
                            />
                        </div>

                        {/* Aviso de Seguridad */}
                        <div className="p-4 rounded-xl border border-amber-200 bg-amber-50/40 text-stone-700 flex gap-3 items-start">
                            <ShieldAlert className="text-amber-500 mt-0.5 shrink-0" size={16} />
                            <p className="text-xs leading-relaxed">
                                <strong>Nota importante:</strong> Los cambios realizados impactarán directamente en los reportes de asistencia y en el reconocimiento facial del Agente IA.
                            </p>
                        </div>

                        {/* Acciones */}
                        <div className="pt-4 border-t border-stone-100 flex justify-end gap-3">
                            <Link
                                href={`/estudiantes/show/${estudiante.id}`}
                                className="px-5 py-2.5 text-xs font-bold text-stone-600 bg-stone-100 rounded-xl hover:bg-stone-200 transition-all"
                            >
                                Cancelar
                            </Link>
                            <button
                                type="submit"
                                disabled={processing}
                                className="inline-flex cursor-pointer items-center justify-center gap-2 px-5 py-2.5 text-xs font-bold text-white bg-sky-500 border border-sky-600 rounded-xl shadow-md shadow-sky-500/10 hover:bg-sky-600 transition-all active:scale-[0.98] disabled:opacity-50"
                            >
                                <Save size={14} />
                                {processing ? 'Guardando...' : 'Guardar Cambios'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}