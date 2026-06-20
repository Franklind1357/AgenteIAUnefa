import AppLogoIcon from '@/components/app-logo-icon';

export default function AppLogo() {
    return (
        <>
            <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground shadow-sm">
                {/* Cambié "fill-current" por "stroke-current" para heredar las líneas del escudo, 
                  y mantuve las clases de color de texto para asegurar el contraste.
                */}
                <AppLogoIcon className="size-5 stroke-current text-white dark:text-black" />
            </div>
            <div className="ml-2 grid flex-1 text-left text-sm">
                <span className="truncate leading-none font-black text-stone-800 dark:text-stone-200 tracking-tight">
                    AIScannerUNEFA
                </span>
                <span className="truncate text-[10px] font-bold text-stone-400 uppercase tracking-widest mt-0.5">
                    Control de Acceso
                </span>
            </div>
        </>
    );
}