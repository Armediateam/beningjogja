import { Head } from '@inertiajs/react';
import { dashboard } from '@/routes';
import { CustomerDataTable } from '@/components/customer-table';

const customerData = [
    { id: 1, name: 'John Doe', email: 'john.doe@example.com', phone: '+62 812-3456-7890', totalBookings: 5, status: 'VIP' },
    { id: 2, name: 'Jane Smith', email: 'jane.smith@example.com', phone: '+62 813-4567-8901', totalBookings: 2, status: 'Regular' },
    { id: 3, name: 'Budi Santoso', email: 'budi.santoso@example.com', phone: '+62 814-5678-9012', totalBookings: 1, status: 'New' },
    { id: 4, name: 'Siti Aminah', email: 'siti.aminah@example.com', phone: '+62 815-6789-0123', totalBookings: 8, status: 'VIP' },
    { id: 5, name: 'Ahmad Faisal', email: 'ahmad.faisal@example.com', phone: '+62 816-7890-1234', totalBookings: 3, status: 'Regular' },
];

export default function CustomerContent() {
    return (
        <>
            <Head title="Customer Database" />
            <div className="flex flex-1 flex-col">
                <div className="@container/main flex flex-1 flex-col gap-2">
                    <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6 p-6">
                        
                        <div>
                            <h1 className="text-2xl font-bold tracking-tight">Customer Database</h1>
                            <p className="text-muted-foreground mt-1">
                                Kelola basis data pelanggan yang pernah memesan Bening Villa dan Bening Private Pool.
                            </p>
                        </div>

                        <div className="mt-4">
                            <CustomerDataTable data={customerData} />
                        </div>

                    </div>
                </div>
            </div>
        </>
    );
}

CustomerContent.layout = {
    breadcrumbs: [
        {
            title: 'Dashboard',
            href: dashboard(),
        },
        {
            title: 'Customer',
            href: '/dashboard/customer',
        },
    ],
};
