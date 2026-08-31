import { usePage } from '@inertiajs/react';

export default function AppLogo() {
    const { name } = usePage().props;

    return (
        <div className="flex items-center gap-2">
            <img src="/2.png" alt={name as string} className="h-8 block dark:hidden" />
            <img src="/1.png" alt={name as string} className="h-8 hidden dark:block" />
            <span className="font-semibold text-sm truncate">Bening Jogja</span>
        </div>
    );
}
