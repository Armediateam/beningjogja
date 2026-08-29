import { Head } from '@inertiajs/react';
import { dashboard } from '@/routes';
import { UserDataTable } from '@/components/user-table';

const userData = [
    { id: 1, name: 'Dedy Raikhan', email: 'dedyraikhanarwan@gmail.com', role: 'Admin', status: 'Active', lastLogin: '10 mins ago' },
    { id: 2, name: 'Admin Bening', email: 'admin@beningjogja.com', role: 'Manager', status: 'Active', lastLogin: '2 hours ago' },
    { id: 3, name: 'Staf Lapangan', email: 'staff@beningjogja.com', role: 'Staff', status: 'Inactive', lastLogin: '3 days ago' },
];

export default function UserContent() {
    return (
        <>
            <Head title="User Management" />
            <div className="flex flex-1 flex-col">
                <div className="@container/main flex flex-1 flex-col gap-2">
                    <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6 p-6">
                        
                        <div>
                            <h1 className="text-2xl font-bold tracking-tight">User Management</h1>
                            <p className="text-muted-foreground mt-1">
                                Kelola akun staf dan pengelola sistem Bening Villa & Bening Private Pool.
                            </p>
                        </div>

                        <div className="mt-4">
                            <UserDataTable data={userData} />
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
