import { Head } from '@inertiajs/react';
import { dashboard } from '@/routes';
import { CustomerDataTable } from '@/components/customer-table';

export default function CustomerContent({ customers }: { customers: any[] }) {
    return (
        <>
            <Head title="Customer Database" />
            <div className="flex flex-1 flex-col">
                <div className="@container/main flex flex-1 flex-col gap-2">
                    <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6 p-6">
                        
                        <div>
                            <h1 className="text-2xl font-bold tracking-tight">Customer Database</h1>
                            <p className="text-muted-foreground mt-1">
                                Manage the customer database for Bening Villa and Bening Private Pool.
                            </p>
                        </div>

                        <div className="mt-4">
                            <CustomerDataTable data={customers} />
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
