import { Head } from '@inertiajs/react';
import { dashboard } from '@/routes';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PricingDataTable } from '@/components/pricing-table';

const villaPrices: any[] = [];

const poolPrices: any[] = [];

export default function PricingContent() {
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
