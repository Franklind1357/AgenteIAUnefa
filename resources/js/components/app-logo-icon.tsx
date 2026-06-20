import type { SVGAttributes } from 'react';

export default function AppLogoIcon(props: SVGAttributes<SVGElement>) {
    return (
        <svg 
            {...props} 
            viewBox="0 0 32 32" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
        >
            {/* Usamos "currentColor" en el fill/stroke para que el logo cambie de color 
                automáticamente según la clase de Tailwind que le pases en el componente 
                padre (ej: className="h-8 w-8 text-sky-600 hover:text-emerald-600")
            */}
            
            {/* 🛡️ Estructura de la "U" Institucional (Líneas suavizadas y modernas) */}
            <path 
                d="M6 4V16C6 22.6274 10.4772 28 16 28C21.5228 28 26 22.6274 26 16V4" 
                stroke="currentColor" 
                strokeWidth="3.5" 
                strokeLinecap="round" 
                strokeLinejoin="round"
            />

            {/* 🧠 Nodos de Inteligencia Artificial / Conectividad Central */}
            {/* Nodo Izquierdo */}
            <circle cx="11" cy="11" r="2.25" fill="currentColor" />
            
            {/* Nodo Derecho */}
            <circle cx="21" cy="11" r="2.25" fill="currentColor" />
            
            {/* Nodo Central Superior (El núcleo que procesa) */}
            <circle cx="16" cy="17" r="3" fill="currentColor" />

            {/* Líneas sutiles de interconexión neuronal */}
            <line x1="11" y1="11" x2="16" y2="17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            <line x1="21" y1="11" x2="16" y2="17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
    );
}