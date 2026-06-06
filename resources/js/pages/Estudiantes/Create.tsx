import {Head, useForm} from "@inertiajs/react";
import React, { useRef, useState } from "react";
import {UserPlus, Camera, CameraOff, Save, User, GraduationCap, IdCard,  Calendar, Zap} from "lucide-react";

export default function RegistrarEstudiante() {

    // Estado para controlar la camara en la interfaz
    const [camaraActiva, setCameraActiva] = useState(false);

    // Referencia al elemento de html para el video
    const videoRef = useRef<HTMLVideoElement | null>(null);

    // Referencia al stream de la camara para apagarla
    const streamRef = useRef<MediaStream | null>(null);

    // Formulario rapido para elregistro de estudiantes
    const { data, setData, post, processing, errors, reset } = useForm({
        nombre: '',
        apellido: '',
        cedula: '',
        carrera: '',
        semestre: '',
    });

    // Encender la camara y mostrar el video
    const encenderCamara = async () => {
        try{
            // Se solicita acceso a la camara
            const stream = await navigator.mediaDevices.getUserMedia({
                video: {
                    width: { ideal: 1280 },
                    height: { ideal: 720 },
                    facingMode: "user"
                }
             });

            // Se asigna el stream al video para mostrar la camara
            setCameraActiva(true);
            streamRef.current = stream;

            // Se asigna el flujo de video al elemento
            setTimeout(() => {
                if(videoRef.current){
                    videoRef.current.srcObject = stream;
                }else{
                    console.error("Referencia al video no encontrada.");
                }
            })

        }catch(error){
            console.error("Error al acceder a la cámara:", error);
            alert("No se pudo acceder a la cámara. Por favor, verifica los permisos y el dispositivo.");
            setCameraActiva(false);
        }   
    };

    // Apagar la camara y detener el video
    const apagarCamara = () =>{
        if(streamRef.current){
            // Apagamos cada psita de hardware
            streamRef.current.getTracks().forEach(track => track.stop());  
        }
        streamRef.current = null;
        setCameraActiva(false);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/estudiantes/store-rapido', {
            onSuccess: () => {
                reset();
                apagarCamara();
            }
        });
    };

    return (
        <>
            <Head title="Registro Express - UNEFA AI" />

            {/* 🎨 Contenedor Premium SaaS */}
            <div className="relative flex h-full flex-1 flex-col gap-8 p-6 md:p-8 bg-[#f5f5f4] text-stone-800 overflow-y-auto bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-100/40 via-[#f5f5f4] to-[#f5f5f4]">
                
                {/* Luces de ambiente */}
                <div className="absolute top-0 right-1/4 h-[250px] w-[250px] rounded-full bg-sky-400/10 blur-[90px] pointer-events-none" />

                {/* Encabezado */}
                <div className="relative flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 px-2 border-b border-stone-200 pb-4">
                    <div className="space-y-1">
                        <div className="flex items-center gap-2 text-xs font-semibold text-sky-600 tracking-wider uppercase mb-1">
                            <Zap size={14} className="animate-pulse" />
                            Módulo UNEFAScann
                        </div>
                        <h2 className="text-xl md:text-2xl font-black text-stone-800 tracking-tight">
                            Registro Express de Estudiante
                        </h2>
                    </div>
                </div>

                {/* Grid Principal: Formulario + Escáner */}
                <div className="relative max-w-6xl w-full mx-auto grid grid-cols-1 lg:grid-cols-5 gap-8">
                    
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
                                <input type="text" value={data.cedula} onChange={e => setData('cedula', e.target.value)} className="w-full px-3 py-2 text-sm bg-white/50 border border-stone-200 rounded-xl focus:ring-2 focus:ring-sky-400/50 focus:outline-none" placeholder="Ej: Cédula de Identidad" />
                                {errors.cedula && <span className="text-xs text-rose-500">{errors.cedula}</span>}
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="space-y-1">
                                <label className="text-xs font-bold text-stone-700 flex items-center gap-1.5"><GraduationCap size={13}/> Carrera</label>
                                <select value={data.carrera} onChange={e => setData('carrera', e.target.value)} className="w-full px-3 py-2 text-sm bg-white/50 border border-stone-200 rounded-xl focus:ring-2 focus:ring-sky-400/50 focus:outline-none">
                                    <option>
                                        Seleccione la Carrera
                                    </option>
                                    <option value="1">Ingeniería de Sistemas</option>
                                    <option value="2">Ingeniería Naval</option>
                                    <option value="3">Ingeniería Petroquímica</option>
                                    <option value="4">TSU Enfermería</option>
                                    <option value="5">TSU Turismo</option>
                                    <option value="6">Licenciatura en Economía Social</option>
                                </select>
                                {errors.carrera && <span className="text-xs text-rose-500">{errors.carrera}</span>}
                            </div>

                            <div className="space-y-1">
                                <label className="text-xs font-bold text-stone-700 flex items-center gap-1.5"><GraduationCap size={13}/> Semestre</label>
                                <select value={data.semestre} onChange={e => setData('semestre', e.target.value)} className="w-full px-3 py-2 text-sm bg-white/50 border border-stone-200 rounded-xl focus:ring-2 focus:ring-sky-400/50 focus:outline-none">
                                    <option>
                                        Seleccione el Semestre
                                    </option>
                                    <option value="1">1er Semestre</option>
                                    <option value="2">2do Semestre</option>
                                    <option value="3">3er Semestre</option>
                                    <option value="4">4to Semestre</option>
                                    <option value="5">5to Semestre</option>
                                    <option value="6">6to Semestre</option>
                                    <option value="7">7mo Semestre</option>
                                    <option value="8">8vo Semestre</option>
                                </select>
                                {errors.semestre && <span className="text-xs text-rose-500">{errors.semestre}</span>}
                            </div>
                        </div>

                        <div className="pt-4 border-t border-stone-100 flex justify-end">
                            <button type="submit" disabled={processing} className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-bold text-white bg-sky-500 border border-sky-600 rounded-xl shadow-md hover:bg-sky-600 transition-all">
                                <Save size={14} />
                                {processing ? 'Registrando...' : 'Finalizar Registro'}
                            </button>
                        </div>
                    </form>

                    {/* Columna Derecha: Interfaz de la Cámara / Escáner (2/5) */}
                    <div className="lg:col-span-2 flex flex-col gap-4">
                        <div className="bg-stone-900 border border-stone-800 rounded-2xl overflow-hidden aspect-video lg:h-[280px] w-full relative flex flex-col items-center justify-center shadow-lg shadow-stone-900/20">
                            
                            {camaraActiva ? (
                                /* Stream de Video Activo */
                                <video 
                                    ref={videoRef} 
                                    autoPlay 
                                    playsInline 
                                    className="w-full h-full object-cover scale-x-[-1]" // Efecto espejo para comodidad del usuario
                                />
                            ) : (
                                /* Interfaz Apagada / Standby */
                                <div className="text-center p-6 space-y-2">
                                    <div className="mx-auto w-12 h-12 rounded-full bg-stone-800 flex items-center justify-center text-stone-500">
                                        <CameraOff size={20} />
                                    </div>
                                    <p className="text-xs font-bold text-stone-400">Escáner en Espera</p>
                                    <p className="text-[11px] text-stone-500 max-w-[200px]">Presiona el botón de abajo para inicializar el reconocimiento óptico.</p>
                                </div>
                            )}

                            {/* Indicador visual tipo escáner (Solo sale si está activa) */}
                            {camaraActiva && (
                                <div className="absolute inset-x-0 top-0 h-0.5 bg-sky-400 shadow-[0_0_10px_#38bdf8] animate-[bounce_2s_infinite]" />
                            )}
                        </div>

                        {/* Botón de Control del Hardware */}
                        {!camaraActiva ? (
                            <button
                                type="button"
                                onClick={encenderCamara}
                                className="inline-flex items-center justify-center gap-2 w-full py-3 text-xs font-bold text-sky-600 bg-sky-50 border border-sky-200 rounded-xl hover:bg-sky-100 transition-all active:scale-[0.99]"
                            >
                                <Camera size={14} />
                                Encienda la Cámara para Escanear
                            </button>
                        ) : (
                            <button
                                type="button"
                                onClick={apagarCamara}
                                className="inline-flex items-center justify-center gap-2 w-full py-3 text-xs font-bold text-rose-600 bg-rose-50 border border-rose-200 rounded-xl hover:bg-rose-100 transition-all active:scale-[0.99]"
                            >
                                <CameraOff size={14} />
                                Apagar Cámara / Detener Captura
                            </button>
                        )}
                    </div>

                </div>
            </div>
        </>
    );
}
