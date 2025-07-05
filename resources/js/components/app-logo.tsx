import { User } from '@/types';
import { usePage } from '@inertiajs/react';
import AppLogoIcon from './app-logo-icon';

interface PageProps {
    auth: {
        user: User | null;
    };
    [key: string]: any;
}

export default function AppLogo() {
    const { auth } = usePage<PageProps>().props;
    return (
        <>
            <div className="flex aspect-square size-8 items-center justify-center rounded-md bg-sidebar-primary text-sidebar-primary-foreground">
                <AppLogoIcon className="size-5 fill-current text-white dark:text-black" />
            </div>
            <div className="ml-1 grid flex-1 text-left text-sm">
                <span className="mb-0.5 truncate leading-tight font-semibold">Hello {auth.user ? auth.user.name : 'Guest'}!</span>
            </div>
        </>
    );
}
