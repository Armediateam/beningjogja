import { Head } from '@inertiajs/react';
import { dashboard } from '@/routes';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BookingDataTable } from '@/components/booking-table';

import { useMemo } from 'react';

export default function BookingContent({ bookings = [] }: { bookings?: any[] }) {
    
    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(amount);
    };

    const villaData = useMemo(() => {
        return bookings.filter(b => b.type === 'villa').map(b => ({
            id: b.id,
            bookingId: b.booking_code || `BNG-OLD-${b.id}`,
            type: 'Villa',
            status: ucfirst(b.status),
            customer: b.customer_name,
            amount: formatCurrency(b.total_price),
            date: b.booking_date,
            paymentProof: b.payment_proof
        }));
    }, [bookings]);

    const poolData = useMemo(() => {
        return bookings.filter(b => b.type === 'pool').map(b => ({
            id: b.id,
            bookingId: b.booking_code || `BNG-OLD-${b.id}`,
            type: 'Private Pool',
            status: ucfirst(b.status),
            customer: b.customer_name,
            amount: formatCurrency(b.total_price),
            date: b.booking_date,
            paymentProof: b.payment_proof
        }));
    }, [bookings]);

    function ucfirst(str: string) {
        if (!str) return '';
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    return (
        <>
            <Head title="Booking List" />
            <div className="flex flex-1 flex-col">
                <div className="@container/main flex flex-1 flex-col gap-2">
                    <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6 p-6">
                        
                        <div>
                            <h1 className="text-2xl font-bold tracking-tight">Booking List</h1>
                            <p className="text-muted-foreground mt-1">
                                Manage reservations for Bening Villa and Bening Private Pool.
                            </p>
                        </div>

                        <Tabs defaultValue="villa" className="w-full mt-4">
                            {/* TAB: VILLA */}
                            <TabsContent value="villa" className="mt-0">
                                <BookingDataTable 
                                    data={villaData} 
                                    tabsList={
                                        <TabsList>
                                            <TabsTrigger value="villa">Villa</TabsTrigger>
                                            <TabsTrigger value="private-pool">Private Pool</TabsTrigger>
                                        </TabsList>
                                    }
                                />
                            </TabsContent>

                            {/* TAB: PRIVATE POOL */}
                            <TabsContent value="private-pool" className="mt-0">
                                <BookingDataTable 
                                    data={poolData} 
                                    tabsList={
                                        <TabsList>
                                            <TabsTrigger value="villa">Villa</TabsTrigger>
                                            <TabsTrigger value="private-pool">Private Pool</TabsTrigger>
                                        </TabsList>
                                    }
                                />
                            </TabsContent>
                        </Tabs>

                    </div>
                </div>
            </div>
        </>
    );
}

BookingContent.layout = {
    breadcrumbs: [
        {
            title: 'Dashboard',
            href: dashboard(),
        },
        {
            title: 'Booking',
            href: '/dashboard/booking',
        },
    ],
};
