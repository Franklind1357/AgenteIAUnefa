import React, { useState, useEffect, useRef } from 'react';
import { Head } from '@inertiajs/react';
import { Fingerprint, UserCheck, UserX, Scan, ShieldCheck, ShieldAlert, ArrowLeft, Loader2 } from 'lucide-react';
import axios from 'axios';

export default function IngresoDispositivo() {
    const [paso, setPaso] = useState<'dispositivo-inicio' | 'registro' | 'escaneo' | 'resultado'>('dispositivo-inicio');
    const [cedula, setCedula] = useState('');
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [carrera, setCarrera] = useState('');
    const [procesando, setProcesando] = useState(false);
    const [resultadoIA, setResultadoIA] = useState<{ aprobado: boolean; mensaje: string } | null>(null);
    const [videoStream, setVideoStream] = useState<MediaStream | null>(null);
    const [cameraError, setCameraError] = useState<string | null>(null);
    const [mensajeError, setMensajeError] = useState<string | null>(null);

    const videoRef = useRef<HTMLVideoElement | null>(null);
    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    const carrerasUnefa = [
        "Ingeniería de Sistemas",
        "Ingeniería Petroquímica",
        "Ingeniería Naval"
    ];

    const verificarCedulaEnLaravel = async (cedulaAEnviar: string) => {
        if (!cedulaAEnviar.trim()) {
            setMensajeError('Debe ingresar una cédula válida.');
            return;
        }

        setMensajeError(null);
        setProcesando(true);

        try {
            const respuesta = await axios.post('/estudiantes/verificar-cedula', {
                cedula: cedulaAEnviar,
            });

            if (respuesta.data.existe) {
                setNombre(respuesta.data.estudiante.nombre);
                setApellido(respuesta.data.estudiante.apellido || '');
                setCarrera(respuesta.data.estudiante.carrera);
                setPaso('escaneo');
            } else {
                setNombre('');
                setApellido('');
                setCarrera('');
                setPaso('registro');
                setMensajeError('Cédula no encontrada. Complete el registro del estudiante.');
            }
        } catch (error) {
            console.error('Error al consultar la base de datos en Laravel:', error);
            setMensajeError('Error al consultar el servidor. Intente de nuevo.');
        } finally {
            setProcesando(false);
        }
    };

    const manejarRegistroLaravel = async (e: React.FormEvent) => {
        e.preventDefault();
        setProcesando(true);
        setMensajeError(null);

        try {
            await axios.post('/estudiantes/registrar', {
                cedula,
                nombre,
                apellido,
                carrera,
            });
            
            setPaso('escaneo');
        } catch (error) {
            console.error('Error al registrar el estudiante:', error);
            setMensajeError('No se pudo registrar el estudiante en la base de datos.');
        } finally {
            setProcesando(false);
        }
    };

    const iniciarCamara = async () => {
        if (videoStream) {
            return;
        }

        if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
            setCameraError('El navegador bloqueó la cámara. Debes usar localhost puro o una conexión HTTPS.');
            return; 
        }

        try {
            const stream = await navigator.mediaDevices.getUserMedia({
                video: { facingMode: 'environment' },
                audio: false,
            });

            setVideoStream(stream);
            setCameraError(null);
        } catch (error: any) {
            if (error.name === 'NotFoundError' || error.name === 'OverconstrainedError') {
                try {
                    const fallbackStream = await navigator.mediaDevices.getUserMedia({
                        video: true, 
                        audio: false,
                    });
                    
                    setVideoStream(fallbackStream);
                    setCameraError(null);
                    return;
                } catch (fallbackError) {
                    console.error('Error en la cámara de respaldo:', fallbackError);
                }
            }

            console.error('Error general al acceder a la cámara:', error);
            setCameraError('Permiso denegado o cámara ocupada por otra aplicación.');
        }
    };

    const detenerCamara = () => {
        if (!videoStream) {
            return;
        }

        videoStream.getTracks().forEach((track) => track.stop());
        setVideoStream(null);
    };

    useEffect(() => {
        if (videoRef.current && videoStream) {
            videoRef.current.srcObject = videoStream;
            videoRef.current
                .play()
                .catch((error) => console.warn('No se pudo reproducir el video automáticamente:', error));
        }
    }, [videoStream]);

    useEffect(() => {
        if (paso === 'escaneo') {
            iniciarCamara();
        } else {
            detenerCamara();
        }

        return () => {
            detenerCamara();
        };
    }, [paso]);

    const capturarYEnviarFoto = async () => {
        if (!videoRef.current || !canvasRef.current) {
            throw new Error('La cámara no se ha inicializado correctamente');
        }

        const video = videoRef.current;
        const canvas = canvasRef.current;
        canvas.width = video.videoWidth || 640;
        canvas.height = video.videoHeight || 480;
        const context = canvas.getContext('2d');

        if (!context) {
            throw new Error('No se pudo obtener el contexto del canvas');
        }

        context.drawImage(video, 0, 0, canvas.width, canvas.height);

        return new Promise<Blob>((resolve, reject) => {
            canvas.toBlob((blob) => {
                if (!blob) {
                    reject(new Error('No se pudo generar la imagen')); 
                    return;
                }
                resolve(blob);
            }, 'image/jpeg', 0.9);
        });
    };

    const iniciarEscaneoDispositivo = async () => {
        setProcesando(true);

        try {
            const fotoBlob = await capturarYEnviarFoto();
            const formData = new FormData();
            formData.append('cedula', cedula);
            formData.append('foto', fotoBlob, `${cedula || 'usuario'}.jpg`);

            const respuestaIA = await axios.post('/dashboard/biometrico/scan', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            setResultadoIA({
                aprobado: respuestaIA.data.aprobado,
                mensaje: respuestaIA.data.mensaje || 'Resultado recibido del servicio de IA.',
            });

            setPaso('resultado');
        } catch (error) {
            console.error('Error en el servicio de visión artificial:', error);
            setResultadoIA({
                aprobado: false,
                mensaje: 'Error al capturar o procesar la imagen. Revisar cámara o servicio de IA.',
            });
            setPaso('resultado');
        } finally {
            setProcesando(false);
        }
    };

    const resetearDispositivo = () => {
        detenerCamara();
        setCedula('');
        setNombre('');
        setApellido('');
        setCarrera('');
        setResultadoIA(null);
        setCameraError(null);
        setMensajeError(null);
        setPaso('dispositivo-inicio');
    };

    return (
        <>
            <Head title="Terminal de Acceso - ScannerAI UNEFA" />

            <div className="relative min-h-screen w-screen bg-[#f5f5f4] text-stone-800 flex flex-col items-center justify-center p-4 md:p-8 overflow-hidden bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-100/50 via-[#f5f5f4] to-[#e7e5e4] select-none">
                
                {/* Escudo de Fondo */}
                <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none z-0">
                    <svg className="w-[65vh] h-[65vh]" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M6 4V16C6 22.6274 10.4772 28 16 28C21.5228 28 26 22.6274 26 16V4" stroke="currentColor" strokeWidth="2.5" />
                        <circle cx="16" cy="17" r="2.5" fill="currentColor" />
                    </svg>
                </div>

                {/* Tarjeta del Dispositivo */}
                <div className="relative z-10 w-full max-w-lg min-h-[500px] bg-white/80 backdrop-blur-xl border-2 border-stone-200 rounded-[2.5rem] shadow-xl p-8 md:p-12 flex flex-col justify-center transition-all duration-300">
                    
                    {/* Barra de Progreso */}
                    <div className="absolute top-0 left-0 right-0 h-2 bg-stone-100 rounded-t-[2.5rem] overflow-hidden">
                        <div 
                            className="h-full bg-gradient-to-r from-sky-500 to-indigo-500 transition-all duration-500"
                            style={{ 
                                width: paso === 'dispositivo-inicio' ? '25%' : paso === 'registro' ? '50%' : paso === 'escaneo' ? '75%' : '100%' 
                            }}
                        />
                    </div>

                    {/* ================= PASO 1: CONSULTAR CÉDULA A LARAVEL ================= */}
                    {paso === 'dispositivo-inicio' && (
                        <form onSubmit={(e) => { e.preventDefault(); verificarCedulaEnLaravel(cedula); }} className="space-y-6 my-auto">
                            <div className="text-center space-y-2">
                                <div className="mx-auto w-14 h-14 bg-sky-50 text-sky-500 rounded-2xl flex items-center justify-center border border-sky-200">
                                    <Fingerprint size={28} />
                                </div>
                                <h2 className="text-2xl font-black tracking-tight text-stone-950 uppercase">Interfaz del Dispositivo</h2>
                                <p className="text-sm text-stone-500 font-medium">Ingrese la cédula del estudiante. El sistema validará con la base de datos de Laravel.</p>
                            </div>

                            <div className="space-y-2">
                                <div className="flex justify-between items-center">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-stone-400">Documento de Identidad</label>
                                    {procesando && (
                                        <span className="text-xs text-sky-500 font-bold flex items-center gap-1">
                                            <Loader2 className="animate-spin" size={12} /> Consultando DB...
                                        </span>
                                    )}
                                </div>
                                <input 
                                    type="number" 
                                    required
                                    disabled={procesando}
                                    placeholder="Ej: 28123456"
                                    value={cedula}
                                    onChange={(e) => setCedula(e.target.value)}
                                    className="w-full px-5 py-4 bg-stone-50 border-2 border-stone-200 focus:border-sky-500 rounded-2xl text-lg font-bold outline-none transition-all disabled:opacity-50"
                                />
                            </div>

                            <button 
                                type="submit"
                                disabled={procesando || cedula.trim().length < 6}
                                className="w-full py-4 bg-gradient-to-r from-sky-500 to-sky-600 hover:from-sky-600 hover:to-sky-700 text-white font-black rounded-2xl transition-all shadow-md flex items-center justify-center gap-2 uppercase tracking-wider text-sm disabled:opacity-40"
                            >
                                {procesando ? <Loader2 className="animate-spin" size={18} /> : 'Consultar Base de Datos'}
                            </button>

                            {mensajeError && (
                                <p className="text-xs text-rose-500 font-semibold pt-3">{mensajeError}</p>
                            )}
                        </form>
                    )}

                    {/* ================= PASO REGISTRO: MANDAR NUEVO ALUMNO A LARAVEL ================= */}
                    {paso === 'registro' && (
                        <form onSubmit={manejarRegistroLaravel} className="space-y-5 my-auto">
                            <div className="text-center space-y-1.5">
                                <div className="mx-auto w-12 h-12 bg-amber-50 text-amber-500 rounded-2xl flex items-center justify-center border border-amber-200">
                                    <UserX size={24} />
                                </div>
                                <h2 className="text-xl font-black tracking-tight text-stone-950 uppercase">Registro en Base de Datos</h2>
                                <p className="text-xs text-stone-500 font-medium">Estudiante no localizado. Registre los datos en el servidor local Laravel.</p>
                            </div>

                            <div className="space-y-3">
                                <div className="space-y-1">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-stone-400">Nombre Completo</label>
                                    <input 
                                        type="text" 
                                        required
                                        placeholder="Nombres"
                                        value={nombre}
                                        onChange={(e) => setNombre(e.target.value)}
                                        className="w-full px-5 py-3 bg-stone-50 border-2 border-stone-200 focus:border-sky-500 rounded-xl text-sm font-semibold outline-none transition-all"
                                    />
                                </div>

                                <div className="space-y-1">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-stone-400">Apellidos</label>
                                    <input 
                                        type="text" 
                                        required
                                        placeholder="Apellidos"
                                        value={apellido}
                                        onChange={(e) => setApellido(e.target.value)}
                                        className="w-full px-5 py-3 bg-stone-50 border-2 border-stone-200 focus:border-sky-500 rounded-xl text-sm font-semibold outline-none transition-all"
                                    />
                                </div>

                                <div className="space-y-1">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-stone-400">Carrera Asignada</label>
                                    <select 
                                        required
                                        value={carrera}
                                        onChange={(e) => setCarrera(e.target.value)}
                                        className="w-full px-5 py-3 bg-stone-50 border-2 border-stone-200 focus:border-sky-500 rounded-xl text-sm font-semibold outline-none transition-all appearance-none"
                                    >
                                        <option value="">Seleccione carrera...</option>
                                        {carrerasUnefa.map((c, i) => (
                                            <option key={i} value={c}>{c}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <div className="flex flex-col gap-2 pt-1">
                                <button 
                                    type="submit"
                                    disabled={procesando}
                                    className="w-full py-3.5 bg-stone-900 hover:bg-stone-800 text-white font-black rounded-xl transition-all shadow-md uppercase tracking-wider text-xs flex items-center justify-center gap-1"
                                >
                                    {procesando ? <Loader2 className="animate-spin" size={14} /> : 'Guardar en Base de Datos'}
                                </button>
                                <button 
                                    type="button"
                                    onClick={resetearDispositivo}
                                    className="w-full py-2 bg-transparent text-stone-400 hover:text-stone-600 text-xs font-bold transition-all flex items-center justify-center gap-1"
                                >
                                    <ArrowLeft size={14} /> Cancelar Registro
                                </button>
                            </div>
                            
                            {mensajeError && (
                                <p className="text-xs text-rose-500 font-semibold text-center mt-2">{mensajeError}</p>
                            )}
                        </form>
                    )}

                    {/* ================= PASO 2: CONEXIÓN CON LA API DE LA IA ================= */}
                    {paso === 'escaneo' && (
                        <div className="space-y-6 text-center my-auto">
                            <div className="space-y-1">
                                <div className="mx-auto w-12 h-12 bg-emerald-50 text-emerald-500 rounded-2xl flex items-center justify-center border border-emerald-200">
                                    <UserCheck size={24} />
                                </div>
                                <h2 className="text-xl font-black tracking-tight text-stone-950 uppercase">{nombre}</h2>
                                <p className="text-xs text-stone-400 font-bold uppercase tracking-wider bg-stone-100 inline-block px-3 py-1 rounded-md border border-stone-200">{carrera}</p>
                            </div>

                            {/* Visor Óptico */}
                            <div className="relative w-full h-72 bg-stone-900 border-4 border-sky-400 rounded-3xl overflow-hidden shadow-inner shadow-black/40">
                                {videoStream ? (
                                    <video
                                        ref={videoRef}
                                        autoPlay
                                        playsInline
                                        muted
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <div className="h-full flex flex-col items-center justify-center gap-3 px-4 text-center">
                                        <Scan size={38} className="text-sky-400/40" />
                                        <p className="text-xs font-mono tracking-widest text-stone-400 uppercase font-bold">
                                            {cameraError ?? 'Esperando permiso de cámara o cargando el dispositivo...' }
                                        </p>
                                    </div>
                                )}
                                {procesando && (
                                    <div className="absolute top-0 left-0 w-full h-1 bg-sky-400 shadow-[0_0_15px_#0ea5e9] animate-[scanAnim_2s_infinite_linear]" />
                                )}
                            </div>

                            {cameraError && (
                                <div className="text-center px-4">
                                    <p className="text-xs text-rose-500 font-semibold">{cameraError}</p>
                                    <button
                                        type="button"
                                        onClick={iniciarCamara}
                                        disabled={procesando}
                                        className="mt-3 px-4 py-2 bg-sky-500 hover:bg-sky-600 text-white rounded-full text-xs font-bold"
                                    >
                                        Reintentar cámara
                                    </button>
                                </div>
                            )}

                            <button 
                                type="button"
                                onClick={iniciarEscaneoDispositivo}
                                disabled={procesando || !!cameraError || !videoStream}
                                className="w-full py-4 bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-600 hover:to-indigo-700 text-white font-black rounded-2xl transition-all shadow-lg uppercase tracking-widest text-xs flex items-center justify-center gap-2 disabled:opacity-40"
                            >
                                {procesando ? <Loader2 className="animate-spin" size={14} /> : 'Disparar Captura e Inferencia IA'}
                            </button>
                            <canvas ref={canvasRef} className="hidden" />
                        </div>
                    )}

                    {/* ================= PASO 3: VERDICTO FINAL DE LA IA ================= */}
                    {paso === 'resultado' && resultadoIA && (
                        <div className="space-y-6 text-center my-auto">
                            <div className="space-y-4">
                                <div className={`mx-auto w-20 h-20 rounded-full flex items-center justify-center border-4 shadow-md ${
                                    resultadoIA.aprobado 
                                        ? 'bg-emerald-50 text-emerald-500 border-emerald-400 shadow-emerald-200/50' 
                                        : 'bg-rose-50 text-rose-500 border-rose-400 shadow-rose-200/50'
                                }`}>
                                    {resultadoIA.aprobado ? <ShieldCheck size={40} /> : <ShieldAlert size={40} />}
                                </div>
                                <h2 className={`text-2xl font-black tracking-tighter uppercase ${
                                    resultadoIA.aprobado ? 'text-emerald-600' : 'text-rose-600'
                                }`}>
                                    {resultadoIA.aprobado ? 'Verificación Exitosa' : 'Acceso Denegado'}
                                </h2>
                                <p className="text-sm font-semibold text-stone-600 px-4 leading-relaxed">
                                    {resultadoIA.mensaje}
                                </p>
                            </div>

                            <button 
                                type="button"
                                onClick={resetearDispositivo}
                                className="w-full py-4 bg-stone-900 hover:bg-stone-800 text-white font-black rounded-2xl transition-all shadow-md uppercase tracking-wider text-sm mt-4"
                            >
                                Liberar Terminal
                            </button>
                        </div>
                    )}

                </div>
            </div>
        </>
    );
}