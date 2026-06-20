import { Head, useForm, Link } from "@inertiajs/react";
import React from "react";
import {UserPlus, Camera, CameraOff, Save, User, GraduationCap, IdCard, Calendar, Zap, ArrowLeft} from "lucide-react";

type Option = {value: string | number; label:string};

interface CreateProps{
    carreras: Option[];
    semestres: Option[];
}
export default function RegistrarEstudiante({carreras, semestres}: CreateProps) {

    // Formulario rapido para elregistro de estudiantes
    const { data, setData, post, processing, errors, reset } = useForm({
        nombre: '',
        apellido: '',
        cedula: '',
        carrera: '',
        semestre: '',
    });

    const handleCedulaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setData('cedula', e.target.value.replace(/\D/g, ''));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        post('/estudiantes/store', {
            onSuccess: () => reset()
        });
    };

    return (
        <>
            <Head title="Registro Express - UNEFA AI" />

            {/*  Contenedor Premium SaaS */}
            <div className="relative flex h-full flex-1 flex-col gap-8 p-6 md:p-8 bg-[#f5f5f4] text-stone-800 overflow-y-auto bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-100/40 via-[#f5f5f4] to-[#f5f5f4]">
                
                {/* Luces de ambiente */}
                <div className="absolute top-0 right-1/4 h-[250px] w-[250px] rounded-full bg-sky-400/10 blur-[90px] pointer-events-none" />

                {/* Encabezado */}
                <div className="relative flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 px-2 border-b border-stone-200 pb-4">
                    <div className="space-y-1">
                        <div className="flex items-center gap-2 text-xs font-semibold text-sky-600 tracking-wider uppercase mb-1">
                            <Zap size={14} className="animate-pulse" />
                            Módulo Estudiantes
                        </div>
                        <h2 className="text-xl md:text-2xl font-black text-stone-800 tracking-tight">
                            Registro Express de Estudiante
                        </h2>
                    </div>
                </div>

                {/* Grid Principal: Formulario + Escáner */}
                <div className="relative max-w-4xl w-full mx-auto grid grid-cols-1 lg:grid-cols-1 gap-8">
                    
                    {/* Columna Izquierda/Central: Formulario de Datos (3/5) */}
                    <form 
                        onSubmit={handleSubmit}
                        className="lg:col-span-3 bg-white/70 backdrop-blur-md border border-stone-200/80 rounded-2xl p-6 shadow-xl space-y-5"
                    >
                        <div className="border-b border-stone-100 pb-2">
                            <h3 className="text-sm font-bold text-stone-900">Datos Personales y Académicos</h3>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="space-y-1">
                                <label className="text-xs font-bold text-stone-700 flex items-center gap-1.5"><User size={13}/> Nombres</label>
                                <input type="text" value={data.nombre} onChange={e => setData('nombre', e.target.value)} className="w-full px-3 py-2 text-sm bg-white/50 border border-stone-200 rounded-xl focus:ring-2 focus:ring-sky-400/50 focus:outline-none" placeholder="Ej: Nombres" />
                                {errors.nombre && <span className="text-xs text-rose-500">{errors.nombre}</span>}
                            </div>

                            <div className="space-y-1">
                                <label className="text-xs font-bold text-stone-700 flex items-center gap-1.5"><User size={13}/> Apellidos</label>
                                <input type="text" value={data.apellido} onChange={e => setData('apellido', e.target.value)} className="w-full px-3 py-2 text-sm bg-white/50 border border-stone-200 rounded-xl focus:ring-2 focus:ring-sky-400/50 focus:outline-none" placeholder="Ej: Apellidos" />
                                {errors.apellido && <span className="text-xs text-rose-500">{errors.apellido}</span>}
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="space-y-1">
                                <label className="text-xs font-bold text-stone-700 flex items-center gap-1.5"><IdCard size={13}/> Cédula de Identidad</label>
                                <input type="text" inputMode="numeric" pattern="[0-9]*" maxLength={9} value={data.cedula} onChange={handleCedulaChange} className="w-full px-3 py-2 text-sm bg-white/50 border border-stone-200 rounded-xl focus:ring-2 focus:ring-sky-400/50 focus:outline-none" placeholder="Ej: Cédula de Identidad" />
                                {errors.cedula && <span className="text-xs text-rose-500">{errors.cedula}</span>}
                            </div>

                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="space-y-1">
                                <label className="text-xs font-bold text-stone-700 flex items-center gap-1.5"><GraduationCap size={13}/> Carrera</label>
                                <select value={data.carrera} onChange={e => setData('carrera', e.target.value)} className="w-full px-3 py-2 text-sm bg-white/50 border border-stone-200 rounded-xl focus:ring-2 focus:ring-sky-400/50 focus:outline-none">
                                    <option value="">
                                        Seleccione la Carrera
                                    </option>
                                    {carreras.map(item=>(
                                        <option key={item.value} value={item.value}>
                                            {item.label}
                                        </option>
                                    ))}
                                </select>
                                {errors.carrera && <span className="text-xs text-rose-500">{errors.carrera}</span>}
                            </div>

                            <div className="space-y-1">
                                <label className="text-xs font-bold text-stone-700 flex items-center gap-1.5"><GraduationCap size={13}/> Semestre</label>
                                <select value={data.semestre} onChange={e => setData('semestre', e.target.value)} className="w-full px-3 py-2 text-sm bg-white/50 border border-stone-200 rounded-xl focus:ring-2 focus:ring-sky-400/50 focus:outline-none">
                                    <option value="">
                                        Seleccione el Semestre
                                    </option>
                                    {semestres.map(item=>(
                                        <option key={item.value} value={item.value} >
                                            {item.label}
                                        </option>
                                    ))}
                                </select>
                                {errors.semestre && <span className="text-xs text-rose-500">{errors.semestre}</span>}
                            </div>
                        </div>

                        <div className="pt-4 border-t border-stone-100 flex justify-end">
                            <Link className="mr-3 inline-flex items-center gap-2 px-5 py-2.5 text-xs font-bold text-white bg-stone-400 border border-stone-300 rounded-xl shadow-sm hover:bg-stone-500 transition-all"
                                href={'/estudiantes'}
                                >
                                <ArrowLeft size={14} />
                                Cancelar
                            </Link>
                            
                            <button type="submit" disabled={processing} className="cursor-pointer inline-flex items-center gap-2 px-5 py-2.5 text-xs font-bold text-white bg-sky-500 border border-sky-600 rounded-xl shadow-md hover:bg-sky-600 transition-all">
                                <Save size={14} />
                                {processing ? 'Registrando...' : 'Finalizar Registro'}
                            </button>
                        </div>
                    </form>

                </div>
            </div>
        </>
    );
}
