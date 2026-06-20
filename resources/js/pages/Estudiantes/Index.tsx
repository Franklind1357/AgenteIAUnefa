import { Head, Link } from '@inertiajs/react';
import React, { useState } from 'react';
import GenericList, { ColumnDef } from '@/components/ComponentesNuevos/GenericList';
import { GraduationCap, X, UserPlus, Fingerprint } from 'lucide-react';

// 1. Interfaz de la estructura de un Estudiante (Asegúrate de que coincida con tus campos de la BD)
interface Estudiante {
    id: number;
    cedula: string;
    nombre: string;
    carrera: string;
    semestre: string;
    carrera_label: string;
    semestre_label: string;
    estado: 'Activo' | 'Inactivo' | 'Sancionado';
}

// 2. Definimos las Props que Inertia le inyectará a este componente desde Laravel
interface IndexProps {
    estudiantes: Estudiante[];
}

// 3. Recibimos 'estudiantes' directamente desestructurando las props
export default function IndexEstudiantes({ estudiantes }: IndexProps) {
    // Estado para controlar el Modal de Registro
    const [isModalOpen, setIsModalOpen] = useState(false);

    // 4. Definición de las Columnas para el GenericList
    const columnas: ColumnDef<Estudiante>[] = [
        {
            header: 'Cédula / ID',
            accessor: (row) => (
                <div className="flex items-center gap-2">
                    <Fingerprint size={16} className="text-stone-400" />
                    <span className="font-mono font-medium text-stone-700">{row.cedula}</span>
                </div>
            ),
            className: 'w-40'
        },
        {
            header: 'Estudiante',
            accessor: (row) => (
                <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-full bg-sky-100 flex items-center justify-center text-sky-600 font-bold text-xs border border-sky-200">
                        {row.nombre ? row.nombre.charAt(0) : '?'}
                    </div>
                    <span className="font-bold text-stone-800 tracking-tight">{row.nombre}</span>
                </div>
            )
        },
        {
            header: 'Programa Académico',
            accessor: (row) => (
                <div>
                    <div className="font-semibold text-stone-700">{row.carrera_label}</div>
                    <div className="text-xs text-stone-500 mt-0.5 flex items-center gap-1">
                        <GraduationCap size={12} /> {row.semestre_label}
                    </div>
                </div>
            )
        },
        {
            header: 'Estado',
            accessor: (row) => {
                const colores = {
                    'Activo': 'bg-emerald-50 text-emerald-600 border-emerald-200',
                    'Inactivo': 'bg-stone-100 text-stone-500 border-stone-200',
                    'Sancionado': 'bg-amber-50 text-amber-600 border-amber-200 animate-pulse'
                };
                return (
                    <span className={`px-2.5 py-1 text-[10px] font-black uppercase tracking-wider rounded-md border ${colores[row.estado] || colores['Activo']}`}>
                        {row.estado}
                    </span>
                );
            }
        },
        {
            header: 'Acciones',
            accessor: (row) => (
                <Link href={`/estudiantes/show/${row.id}`} className="text-sky-500 hover:text-sky-600 text-[11px] font-bold uppercase tracking-wider transition-colors px-3 py-1.5 rounded-lg hover:bg-sky-50">
                    Detalles
                </Link>
            ),
            className: 'text-right'
        }
    ];

    return (
        <>
            <Head title="Directorio de Estudiantes - UNEFA AI" />

            <div className="relative flex h-full flex-1 flex-col gap-8 p-6 md:p-8 bg-[#f5f5f4] text-stone-800 overflow-y-auto bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-100/40 via-[#f5f5f4] to-[#f5f5f4]">
                
                <div className="absolute top-0 right-1/4 h-[250px] w-[250px] rounded-full bg-sky-400/10 blur-[90px] pointer-events-none" />

                <div className="relative px-2 border-b border-stone-200 pb-4">
                    <h2 className="text-xl md:text-2xl font-black text-stone-800 tracking-tight flex items-center gap-2.5">
                        <UserPlus className="text-sky-500" size={24} />
                        Directorio de Estudiantes
                    </h2>
                    <p className="text-xs md:text-sm text-stone-500 mt-1 font-medium">
                        Administra el registro biométrico y perfil académico del estudiantado.
                    </p>
                </div>

                {/* ⚡ CAMBIO CLAVE: Pasamos la prop 'estudiantes' real que viene de la BD */}
                <div className="relative">
                    <GenericList<Estudiante>
                        title="Estudiantes Registrados"
                        description="Lista global del personal estudiantil para la verificación por visión artificial."
                        data={estudiantes} 
                        href="/estudiantes/create"
                        columns={columnas}
                        itemsPerPage={8}
                        onAdd={() => setIsModalOpen(true)}
                        addLabel="Registrar Estudiante"
                        searchPlaceholder="Buscar por nombre, cédula o carrera..."
                        searchFilter={(estudiante, query) => 
                            (estudiante.nombre?.toLowerCase().includes(query) || false) || 
                            (estudiante.cedula?.toLowerCase().includes(query) || false) ||
                            (estudiante.carrera_label?.toLowerCase().includes(query) || false)
                        }
                    />
                </div>
            </div>

        </>
    );
}