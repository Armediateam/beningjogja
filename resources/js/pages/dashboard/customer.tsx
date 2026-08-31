import { Head } from '@inertiajs/react';
import { dashboard } from '@/routes';
import { CustomerDataTable } from '@/components/customer-table';

const customerData: any[] = [];

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
