import { createInertiaApp } from '@inertiajs/react';
import { Toaster } from '@/components/ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';
import { initializeTheme } from '@/hooks/use-appearance';
import { LanguageProvider } from '@/lib/language-context';
import AppLayout from '@/layouts/app-layout';
import AuthLayout from '@/layouts/auth-layout';
import SettingsLayout from '@/layouts/settings/layout';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

const PUBLIC_PAGES = ['welcome', 'facility', 'about', 'contact', 'reservation', 'villa', 'kolam-renang'];

createInertiaApp({
    title: (title) => (title ? `${title} - ${appName}` : appName),
    layout: (name) => {
        switch (true) {
            case PUBLIC_PAGES.includes(name):
                return null;
            case name.startsWith('auth/'):
                return AuthLayout;
            case name.startsWith('settings/'):
                return [AppLayout, SettingsLayout];
            default:
                return AppLayout;
        }
    },
    strictMode: true,
    withApp(app) {
        return (
            <LanguageProvider>
                <TooltipProvider delayDuration={0}>
                    {app}
                    <Toaster position="top-right" />
                </TooltipProvider>
            </LanguageProvider>
        );
    },
    progress: {
        color: '#0ea5e9',
        showSpinner: true,
    },
});

// This will set light / dark mode on load...
initializeTheme();
