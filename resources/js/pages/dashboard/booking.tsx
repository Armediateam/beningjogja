import { Head } from '@inertiajs/react';
import { dashboard } from '@/routes';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BookingDataTable } from '@/components/booking-table';

const villaData = [
  { id: 1, bookingId: 'VIL-001', customer: 'John Doe', type: 'Villa', status: 'Confirmed', amount: 'Rp 2.500.000', date: '01 Sep - 03 Sep 2026' },
  { id: 2, bookingId: 'VIL-002', customer: 'Jane Smith', type: 'Villa', status: 'Pending', amount: 'Rp 2.500.000', date: '10 Sep - 12 Sep 2026' },
];

const poolData = [
  { id: 3, bookingId: 'POOL-001', customer: 'Budi Santoso', type: 'Private Pool', status: 'Confirmed', amount: 'Rp 150.000', date: '05 Sep 2026 (14:00 - 16:00)' },
  { id: 4, bookingId: 'POOL-002', customer: 'Siti Aminah', type: 'Private Pool', status: 'Completed', amount: 'Rp 200.000', date: '06 Sep 2026 (09:00 - 12:00)' },
];

export default function BookingContent() {
    return (
        <>
            <Head title="Booking List" />
            <div className="flex flex-1 flex-col">
                <div className="@container/main flex flex-1 flex-col gap-2">
                    <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6 p-6">
                        
                        <div>
                            <h1 className="text-2xl font-bold tracking-tight">Booking List</h1>
                            <p className="text-muted-foreground mt-1">
                                Kelola reservasi Bening Villa dan Bening Private Pool.
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
