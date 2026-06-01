import React, { useState, useMemo, useEffect } from 'react';
import { Search, Plus, ChevronLeft, ChevronRight, Inbox } from 'lucide-react';

// Definimos la estructura de las columnas
export interface ColumnDef<T> {
    header: string;
    accessor: (row: T) => React.ReactNode;
    className?: string; // Para anchos personalizados o alineaciones
}

interface GenericListProps<T> {
    title: string;
    description?: string;
    data: T[];
    columns: ColumnDef<T>[];
    onAdd?: () => void;
    addLabel?: string;
    searchPlaceholder?: string;
    itemsPerPage?: number;
    // Función opcional para decirle al buscador cómo leer el objeto
    searchFilter?: (item: T, query: string) => boolean; 
}

export default function GenericList<T>({
    title,
    description,
    data,
    columns,
    onAdd,
    addLabel = "Nuevo Registro",
    searchPlaceholder = "Buscar...",
    itemsPerPage = 10,
    searchFilter
}: GenericListProps<T>) {
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);

    // 1. Filtrar Datos
    const filteredData = useMemo(() => {
        if (!searchTerm) return data;
        return data.filter((item) => {
            if (searchFilter) return searchFilter(item, searchTerm.toLowerCase());
            // Búsqueda por defecto: convierte todo el objeto a string y busca
            return JSON.stringify(item).toLowerCase().includes(searchTerm.toLowerCase());
        });
    }, [data, searchTerm, searchFilter]);

    // 2. Resetear página si cambia la búsqueda
    useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm]);

    // 3. Paginación
    const totalPages = Math.ceil(filteredData.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedData = filteredData.slice(startIndex, startIndex + itemsPerPage);

    return (
        <div className="flex flex-col w-full rounded-2xl border border-stone-200/80 bg-white/60 backdrop-blur-xl shadow-sm overflow-hidden">
            
            {/* 🏷️ CABECERA: Títulos y Controles */}
            <div className="p-5 md:p-6 border-b border-stone-200/80 bg-white/40 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h3 className="text-lg font-bold text-stone-800 tracking-tight">{title}</h3>
                    {description && <p className="text-sm text-stone-500 mt-0.5">{description}</p>}
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
                    {/* Buscador */}
                    <div className="relative w-full sm:w-64 group">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-stone-400 group-focus-within:text-sky-500 transition-colors">
                            <Search size={16} />
                        </div>
                        <input
                            type="text"
                            placeholder={searchPlaceholder}
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-9 pr-4 py-2 bg-stone-50 border border-stone-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-sky-100 focus:border-sky-400 transition-all text-stone-700 placeholder:text-stone-400"
                        />
                    </div>

                    {/* Botón Agregar */}
                    {onAdd && (
                        <a 
                            href='#'
                            className="w-full sm:w-auto flex cursor-pointer items-center justify-center gap-2 px-4 py-2 bg-sky-500 hover:bg-sky-600 text-white text-sm font-medium rounded-xl transition-all shadow-sm shadow-sky-500/20 active:scale-95"
                        >
                            <Plus size={16} />
                            <span>{addLabel}</span>
                        </a>
                    )}
                </div>
            </div>

            {/* 📋 CUERPO: Tabla Responsive */}
            <div className="overflow-x-auto w-full">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-stone-50/50 border-b border-stone-200/80">
                            {columns.map((col, idx) => (
                                <th key={idx} className={`px-6 py-4 text-[11px] font-bold text-stone-500 uppercase tracking-widest ${col.className || ''}`}>
                                    {col.header}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {paginatedData.length > 0 ? (
                            paginatedData.map((row, rowIndex) => (
                                <tr key={rowIndex} className="border-b border-stone-100 last:border-0 hover:bg-stone-50/50 transition-colors group">
                                    {columns.map((col, colIndex) => (
                                        <td key={colIndex} className="px-6 py-3.5 text-sm text-stone-700 whitespace-nowrap">
                                            {col.accessor(row)}
                                        </td>
                                    ))}
                                </tr>
                            ))
                        ) : (
                            /* Estado Vacío */
                            <tr>
                                <td colSpan={columns.length} className="px-6 py-12 text-center text-stone-400">
                                    <div className="flex flex-col items-center justify-center">
                                        <Inbox size={40} className="text-stone-300 mb-3" />
                                        <p className="text-sm font-medium text-stone-600">No se encontraron registros</p>
                                        <p className="text-xs mt-1">Intenta ajustando tu búsqueda.</p>
                                    </div>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* ⬅️ FOOTER: Paginación ➡️ */}
            {filteredData.length > 0 && (
                <div className="p-4 border-t border-stone-200/80 bg-stone-50/30 flex items-center justify-between text-sm text-stone-500">
                    <div>
                        Mostrando <span className="font-semibold text-stone-800">{startIndex + 1}</span> a <span className="font-semibold text-stone-800">{Math.min(startIndex + itemsPerPage, filteredData.length)}</span> de <span className="font-semibold text-stone-800">{filteredData.length}</span> registros
                    </div>
                    
                    <div className="flex items-center gap-1.5">
                        <button 
                            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                            disabled={currentPage === 1}
                            className="p-1.5 rounded-lg border border-stone-200 bg-white text-stone-600 hover:bg-stone-50 hover:text-sky-600 disabled:opacity-50 disabled:pointer-events-none transition-all shadow-sm"
                        >
                            <ChevronLeft size={16} />
                        </button>
                        <div className="px-2 font-medium text-stone-700">
                            {currentPage} / {totalPages}
                        </div>
                        <button 
                            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                            disabled={currentPage === totalPages}
                            className="p-1.5 rounded-lg border border-stone-200 bg-white text-stone-600 hover:bg-stone-50 hover:text-sky-600 disabled:opacity-50 disabled:pointer-events-none transition-all shadow-sm"
                        >
                            <ChevronRight size={16} />
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}