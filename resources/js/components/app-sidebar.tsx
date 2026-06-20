import { Link, usePage } from '@inertiajs/react';
import { BookOpen, FolderGit2, LayoutGrid } from 'lucide-react';
import AppLogo from '@/components/app-logo';
import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import { dashboard } from '@/routes';
import type { NavItem } from '@/types';

const mainNavItems: NavItem[] = [
    {
        title: 'Menu Principal',
        href: dashboard(),
        icon: LayoutGrid,
    },
    {
        title: 'Dispositivos',
        href: '/dispositivos',
        icon: LayoutGrid,
    },
       {
        title: 'Estudiantes',
        href: '/estudiantes',
        icon: LayoutGrid,
    },
    {
        title: 'Asistencias',
        href: '/asistencias',
        icon: LayoutGrid,
    },
    {
        title: 'Infracciones',
        href: '/infracciones',
        icon: LayoutGrid,
    },
    {
        title: 'Reglamentos',
        href: '/reglamentos',
        icon: LayoutGrid,
    },
];

const footerNavItems: NavItem[] = [
 
];

export function AppSidebar() {
    const { canGestionAdministrativa } = usePage<{ canGestionAdministrativa: boolean }>().props;

    if (!canGestionAdministrativa) {
        return (
            <Sidebar collapsible="icon" variant="inset">

            <SidebarFooter>
                <NavFooter items={footerNavItems} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
        );
    }

    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href={dashboard()} prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems} />
            </SidebarContent>

            <SidebarFooter>
                <NavFooter items={footerNavItems} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
