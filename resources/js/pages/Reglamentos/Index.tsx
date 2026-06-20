import { Head } from "@inertiajs/react";
import React from "react";
import { CheckCircle2, XCircle, Shield } from "lucide-react";

// Tipado para las reglas (puedes recibirlas desde Laravel más adelante)
interface Regla {
    categoria: string;
    descripcion: string;
}

interface ReglamentoProps {
    reglasBase?: Regla[]; // Lo hacemos opcional por si decides pasarlo desde el Controlador
}

// Datos por defecto (tu base de datos simulada)
const datosSimuladosBD: Regla[] = [
    { categoria: 'Uniforme Diario', descripcion: 'Pantalón de vestir azul marino, corte recto (no ajustado).' },
    { categoria: 'Uniforme Diario', descripcion: 'Camisa o chemise blanca o azul con el logo de la UNEFA, siempre por dentro del pantalón.' },
    { categoria: 'Uniforme Diario', descripcion: 'Correa de color negro liso, sin hebillas extravagantes.' },
    { categoria: 'Uniforme Diario', descripcion: 'Zapatos negros cerrados, de corte tradicional y debidamente limpios/pulidos.' },
    
    { categoria: 'Uniforme de Deporte', descripcion: 'Mono deportivo color azul marino, sin estampados ajenos a la institución.' },
    { categoria: 'Uniforme de Deporte', descripcion: 'Franela blanca cuello redondo, preferiblemente con el logo de la UNEFA.' },
    { categoria: 'Uniforme de Deporte', descripcion: 'Zapatos deportivos blancos o negros.' },
    
    { categoria: 'Aspecto Personal', descripcion: 'Cabello recogido (femenino) o corte tradicional/corto (masculino).' },
    { categoria: 'Aspecto Personal', descripcion: 'Uñas limpias y cortas. En el caso femenino, usar colores discretos.' },
    { categoria: 'Aspecto Personal', descripcion: 'Maquillaje discreto y de tonos naturales.' },
    
    { categoria: 'Prohibiciones', descripcion: 'Uso de faldas, vestidos, shorts, bermudas o pantalones ajustados (tipo "tubito").' },
    { categoria: 'Prohibiciones', descripcion: 'Pantalones rotos, desgastados o de materiales como jean/denim.' },
    { categoria: 'Prohibiciones', descripcion: 'Uso de sandalias, suecos, zapatos abiertos o de colores llamativos.' },
    { categoria: 'Prohibiciones', descripcion: 'Uso de gorras, sombreros o lentes de sol dentro de las aulas y laboratorios.' },
    { categoria: 'Prohibiciones', descripcion: 'Piercings visibles, collares extravagantes o accesorios que desentonen.' },
    { categoria: 'Prohibiciones', descripcion: 'Tintes de cabello con colores extravagantes o no naturales.' }
];

export default function ReglamentoUniforme({ reglasBase = datosSimuladosBD }: ReglamentoProps) {
    
    // Función auxiliar para filtrar y renderizar las listas de reglas permitidas
    const renderizarListaPermitida = (categoria: string) => {
        const filtradas = reglasBase.filter(r => r.categoria === categoria);
        return (
            <ul className="space-y-3 flex-grow mt-4">
                {filtradas.map((regla, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-sm text-stone-600">
                        <CheckCircle2 className="text-sky-600 shrink-0 mt-0.5" size={16} />
                        <span className="leading-relaxed">{regla.descripcion}</span>
                    </li>
                ))}
            </ul>
        );
    };

    return (
        <>
            <Head title="Reglamento de Uniforme - Agente IA UNEFA" />

            <div className="min-h-screen bg-[#f5f5f4] text-stone-800 font-sans p-6 md:p-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-100/40 via-[#f5f5f4] to-[#f5f5f4]">
                
                <div className="max-w-6xl mx-auto">
                    
                    {/* Encabezado */}
                    <header className="text-center mb-12 border-b-2 border-blue-900/10 pb-8 relative">
                        <div className="inline-flex items-center justify-center p-3 bg-blue-900 text-white rounded-2xl mb-4 shadow-sm">
                            <Shield size={32} />
                        </div>
                        <h1 className="text-3xl md:text-4xl font-black text-blue-900 tracking-tight">
                            Normativas de Uniforme
                        </h1>
                        <p className="text-stone-500 font-medium mt-3 max-w-2xl mx-auto">
                            Universidad Nacional Experimental Politécnica de la Fuerza Armada Nacional Bolivariana
                        </p>
                    </header>

                    {/* Grid de Reglas Permitidas */}
                    <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                        
                        {/* Tarjeta: Uniforme Diario */}
                        <article className="bg-white rounded-2xl p-6 shadow-sm border border-stone-200 border-t-4 border-t-blue-800 hover:-translate-y-1 transition-transform duration-200 flex flex-col">
                            <h2 className="text-lg font-bold text-blue-900 mb-4">Uniforme Diario</h2>
                            
                            <div className="flex gap-3 mb-4">
                                <div className="flex-1 flex flex-col items-center">
                                    <img src="/img/estudiante-femenina.png" alt="Femenino" className="w-full h-48 object-cover object-top rounded-xl border border-stone-100 bg-stone-50" />
                                    <span className="mt-2 text-xs font-bold bg-stone-100 text-stone-600 px-3 py-1 rounded-full">Femenino</span>
                                </div>
                                <div className="flex-1 flex flex-col items-center">
                                    <img src="/img/estudiante-masculino.png" alt="Masculino" className="w-full h-48 object-cover object-top rounded-xl border border-stone-100 bg-stone-50" />
                                    <span className="mt-2 text-xs font-bold bg-stone-100 text-stone-600 px-3 py-1 rounded-full">Masculino</span>
                                </div>
                            </div>

                            {renderizarListaPermitida('Uniforme Diario')}
                        </article>

                        {/* Tarjeta: Uniforme de Deporte */}
                        <article className="bg-white rounded-2xl p-6 shadow-sm border border-stone-200 border-t-4 border-t-sky-600 hover:-translate-y-1 transition-transform duration-200 flex flex-col">
                            <h2 className="text-lg font-bold text-sky-700 mb-4">Uniforme de Deporte</h2>
                            
                            {renderizarListaPermitida('Uniforme de Deporte')}
                            
                            <div className="mt-6 flex flex-col items-center">
                                <img src="/img/deporte-femenino.png" alt="Deporte" className="w-full max-w-[200px] h-48 object-cover object-top rounded-xl border border-stone-100 bg-stone-50" />
                                <span className="mt-2 text-xs font-bold bg-stone-100 text-stone-600 px-3 py-1 rounded-full">Referencia Deportiva</span>
                            </div>
                        </article>

                        {/* Tarjeta: Aspecto Personal */}
                        <article className="bg-white rounded-2xl p-6 shadow-sm border border-stone-200 border-t-4 border-t-indigo-500 hover:-translate-y-1 transition-transform duration-200 flex flex-col">
                            <h2 className="text-lg font-bold text-indigo-700 mb-4">Aspecto Personal</h2>
                            
                            {renderizarListaPermitida('Aspecto Personal')}
                            
                            <div className="mt-6 flex flex-col items-center">
                                <img src="/img/aspecto-masculino.png" alt="Aspecto" className="w-full max-w-[200px] h-48 object-cover object-top rounded-xl border border-stone-100 bg-stone-50" />
                                <span className="mt-2 text-xs font-bold bg-stone-100 text-stone-600 px-3 py-1 rounded-full">Aspecto Ejemplar</span>
                            </div>
                        </article>

                    </main>

                    {/* Sección: Prohibiciones */}
                    <section className="bg-white rounded-2xl p-8 shadow-sm border border-red-100 border-l-4 border-l-red-600 relative overflow-hidden">
                        {/* Luz de fondo sutil roja */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-red-50 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>
                        
                        <div className="relative z-10">
                            <h2 className="text-xl font-black text-red-700 mb-6 flex items-center gap-2">
                                <XCircle size={24} />
                                Estrictamente Prohibido
                            </h2>
                            
                            <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                                {reglasBase.filter(r => r.categoria === 'Prohibiciones').map((regla, idx) => (
                                    <li key={idx} className="flex items-start gap-2.5 text-sm text-stone-700 font-medium">
                                        <XCircle className="text-red-500 shrink-0 mt-0.5" size={18} />
                                        <span className="leading-relaxed">{regla.descripcion}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </section>

                </div>
            </div>
        </>
    );
}