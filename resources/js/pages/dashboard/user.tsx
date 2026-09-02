import { Head } from '@inertiajs/react';
import { dashboard } from '@/routes';
import { UserDataTable } from '@/components/user-table';

export default function UserContent({ users }: { users: any[] }) {
    return (
        <>
            <Head title="User Management" />
            <div className="flex flex-1 flex-col">
                <div className="@container/main flex flex-1 flex-col gap-2">
                    <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6 p-6">
                        
                        <div>
                            <h1 className="text-2xl font-bold tracking-tight">User Management</h1>
                            <p className="text-muted-foreground mt-1">
                                Manage staff and system administrator accounts for Bening Villa & Bening Private Pool.
                            </p>
                        </div>

                        <div className="mt-4">
                            <UserDataTable data={users} />
                        </div>

                    </div>
                </div>
            </div>
        </>
    );
}

UserContent.layout = {
    breadcrumbs: [
        {
            title: 'Dashboard',
            href: dashboard(),
        },
        {
            title: 'User',
            href: '/dashboard/user',
        },
    ],
};
