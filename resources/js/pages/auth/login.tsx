import { Form, Head, Link } from '@inertiajs/react';
import InputError from '@/components/input-error';
import PasswordInput from '@/components/password-input';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import { register } from '@/routes';
import { store } from '@/routes/login';
import { request } from '@/routes/password';
import { Zap } from 'lucide-react';

type Props = {
    status?: string;
    canResetPassword: boolean;
    canRegister: boolean;
};

export default function Login({
    status,
    canResetPassword,
    canRegister,
}: Props) {
    return (
        <>
            <Head title="Iniciar Sesión - Escáner IA" />

            {/* Contenedor principal con la misma estética Stone + Blur de la Landing */}
            <div className="min-h-screen bg-stone-50 flex flex-col justify-center items-center p-4 sm:p-6 relative overflow-hidden selection:bg-blue-500/30">
                
                {/* Tarjeta de Login Adaptativa */}
                <div className="w-full max-w-md bg-white border border-slate-200/80 rounded-2xl p-6 sm:p-8 shadow-xl shadow-slate-900/5 relative z-10 space-y-8">
                    
                    {/* Encabezado e Identidad de la Marca */}
                    <div className="text-center space-y-4">

                        <Link href={'/'}>
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-200/40 border border-blue-500/10 text-blue-600 text-[10px] font-bold uppercase tracking-wider mx-auto">
                                <Zap size={12} className="fill-current shrink-0" />
                                UNEFA Punto Fijo
                            </div>
                        
                            <div className="flex items-center justify-center gap-3 pt-1">
                                <img 
                                    src="/img/LogoEscudo.png" 
                                    alt="Escudo UNEFA" 
                                    className="h-10 w-auto object-contain drop-shadow-sm"
                                />
                                <h2 className="text-2xl font-black tracking-tight text-slate-950">
                                    Escáner <span className="bg-gradient-to-r from-sky-500 to-indigo-600 bg-clip-text text-transparent">IA</span>
                                </h2>
                            </div>
                        </Link>

                        <p className="text-xs text-slate-600 max-w-xs mx-auto">
                            Ingresa tus credenciales para acceder al sistema de supervisión institucional.
                        </p>
                    </div>

                    {/* Estado de sesión (ej. Enlaces de recuperación enviados) */}
                    {status && (
                        <div className="p-3 bg-green-50 border border-green-200 rounded-xl text-center text-xs font-medium text-green-700">
                            {status}
                        </div>
                    )}

                    {/* Formulario de Inertia */}
                    <Form
                        {...store.form()}
                        resetOnSuccess={['password']}
                        className="flex flex-col gap-5"
                    >
                        {({ processing, errors }) => (
                            <>
                                <div className="grid gap-6">
                                    {/* Campo: Correo Electrónico */}
                                    <div className="grid gap-1.5">
                                        <Label htmlFor="email" className="text-xs font-semibold text-slate-700">
                                            Correo Electrónico
                                        </Label>
                                        <Input
                                            id="email"
                                            type="email"
                                            name="email"
                                            required
                                            autoFocus
                                            tabIndex={1}
                                            autoComplete="email"
                                            placeholder="ejemplo@unefa.edu.ve"
                                            className="h-10 rounded-xl border-slate-200 focus-visible:ring-blue-500/20 text-sm"
                                        />
                                        <InputError message={errors.email} />
                                    </div>

                                    {/* Campo: Contraseña */}
                                    <div className="grid gap-1.5">
                                        <Label htmlFor="password" className="text-xs font-semibold text-slate-700">
                                            Contraseña
                                        </Label>
                                        <PasswordInput
                                            id="password"
                                            name="password"
                                            required
                                            tabIndex={2}
                                            autoComplete="current-password"
                                            placeholder="••••••••"
                                            className="h-10 rounded-xl border-slate-200 focus-visible:ring-blue-500/20 text-sm"
                                        />
                                        <InputError message={errors.password} />
                                    </div>

                                    {/* Recordarme */}
                                    <div className="flex items-center space-x-2.5 pt-1">
                                        <Checkbox
                                            id="remember"
                                            name="remember"
                                            tabIndex={3}
                                            className="rounded-md border-slate-300 text-blue-600 focus:ring-blue-500/20"
                                        />
                                        <Label htmlFor="remember" className="text-xs font-medium text-slate-600 select-none cursor-pointer">
                                            Recordar sesión en este dispositivo
                                        </Label>
                                    </div>

                                    {/* Botón de Envío con estilo similar al Panel de Control */}
                                    <Button
                                        type="submit"
                                        className="mt-2 w-full h-11 rounded-full bg-blue-600 cursor-pointer text-slate-50 hover:bg-blue-500 font-bold text-sm tracking-wide shadow-lg shadow-blue-900/10 transition-all gap-2"
                                        tabIndex={4}
                                        disabled={processing}
                                        data-test="login-button"
                                    >
                                        {processing && <Spinner className="w-4 h-4 border-slate-950/20 border-t-slate-950" />}
                                        Iniciar Sesión
                                    </Button>
                                </div>

                                {/* Enlace de registro si está habilitado */}
                                
                            </>
                        )}
                    </Form>
                </div>

                {/* Esferas decorativas de fondo para mantener continuidad visual */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[70vh] w-[70vw] bg-sky-600/5 rounded-full blur-[100px] pointer-events-none z-0"></div>
            </div>
        </>
    );
}
