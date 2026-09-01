import { Head, usePage } from '@inertiajs/react';
import { dashboard } from '@/routes';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PricingDataTable } from '@/components/pricing-table';

export default function PricingContent() {
    const { pricings = [] } = usePage<any>().props;

    // Separate prices based on type or just pass all. Let's filter by type.
    // E.g., 'Villa', 'Private Pool'. If it's 'All Inclusive', we can put it in 'villa' tab or a new tab.
    // For simplicity, let's put 'Villa' and 'All Inclusive' in the 'villa' tab, and 'Private Pool' in 'private-pool'.
    const villaPrices = pricings.filter((p: any) => p.type !== 'Private Pool');
    const poolPrices = pricings.filter((p: any) => p.type === 'Private Pool');

    return (
        <>
            <Head title="Pricelist Management" />
            <div className="flex flex-1 flex-col">
                <div className="@container/main flex flex-1 flex-col gap-2">
                    <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6 p-6">
                        
                        <div>
                            <h1 className="text-2xl font-bold tracking-tight">Pricelist</h1>
                            <p className="text-muted-foreground mt-1">
                                Atur harga sewa untuk Bening Villa dan Bening Private Pool.
                            </p>
                        </div>

                        <Tabs defaultValue="villa" className="w-full mt-4">
                            {/* TAB: VILLA */}
                            <TabsContent value="villa" className="mt-0">
                                <PricingDataTable 
                                    data={villaPrices} 
                                    tabsList={
                                        <TabsList>
                                            <TabsTrigger value="villa">Harga Villa</TabsTrigger>
                                            <TabsTrigger value="private-pool">Harga Private Pool</TabsTrigger>
                                        </TabsList>
                                    }
                                />
                            </TabsContent>

                            {/* TAB: PRIVATE POOL */}
                            <TabsContent value="private-pool" className="mt-0">
                                <PricingDataTable 
                                    data={poolPrices} 
                                    tabsList={
                                        <TabsList>
                                            <TabsTrigger value="villa">Harga Villa</TabsTrigger>
                                            <TabsTrigger value="private-pool">Harga Private Pool</TabsTrigger>
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

PricingContent.layout = {
    breadcrumbs: [
        {
            title: 'Dashboard',
            href: dashboard(),
        },
        {
            title: 'Pricing',
            href: '/dashboard/pricing',
        },
    ],
};
