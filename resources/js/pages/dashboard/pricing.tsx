import { Head, router, usePage } from '@inertiajs/react';
import { useState } from 'react';
import { dashboard } from '@/routes';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { PricingDataTable } from '@/components/pricing-table';
import { IconDeviceFloppy } from '@tabler/icons-react';

interface PoolSessionRow {
    id: number;
    code: string;
    time_label: string;
    day_type: 'weekday' | 'weekend';
    price: number;
}

function SessionPriceRow({ session }: { session: PoolSessionRow }) {
    const [price, setPrice] = useState(String(session.price));
    const [saving, setSaving] = useState(false);
    const dirty = Number(price) !== session.price;

    const save = () => {
        setSaving(true);
        router.put(`/dashboard/pool-sessions/${session.id}`, { price: Number(price) }, {
            preserveScroll: true,
            onFinish: () => setSaving(false),
        });
    };

    return (
        <tr className="border-t border-border/50">
            <td className="px-4 py-2">{session.time_label}</td>
            <td className="px-4 py-2 text-right">
                <div className="flex items-center justify-end gap-2">
                    <span className="text-muted-foreground text-xs">Rp</span>
                    <input
                        type="number"
                        value={price}
                        onChange={e => setPrice(e.target.value)}
                        className="w-28 h-9 px-2 rounded-lg border border-border bg-zinc-50 dark:bg-zinc-950 text-right focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none"
                    />
                    <Button
                        size="icon"
                        variant={dirty ? 'default' : 'outline'}
                        disabled={!dirty || saving}
                        onClick={save}
                        className="h-9 w-9 shrink-0"
                    >
                        <IconDeviceFloppy className="w-4 h-4" />
                    </Button>
                </div>
            </td>
        </tr>
    );
}

function SessionPriceTable({ title, sessions }: { title: string; sessions: PoolSessionRow[] }) {
    return (
        <div className="rounded-xl border border-border overflow-hidden">
            <div className="px-4 py-3 border-b border-border bg-zinc-50 dark:bg-zinc-950 font-semibold text-sm">
                {title}
            </div>
            <table className="w-full text-sm">
                <thead className="bg-zinc-100 dark:bg-zinc-900">
                    <tr>
                        <th className="px-4 py-2 text-left font-semibold">Sesi</th>
                        <th className="px-4 py-2 text-right font-semibold">Harga</th>
                    </tr>
                </thead>
                <tbody>
                    {sessions.map(s => <SessionPriceRow key={s.id} session={s} />)}
                </tbody>
            </table>
        </div>
    );
}

export default function PricingContent() {
    const { pricings = [], poolSessions = [] } = usePage<any>().props;

    const villaPrices = pricings.filter((p: any) => p.type !== 'Private Pool');

    const weekdaySessions = poolSessions.filter((s: PoolSessionRow) => s.day_type === 'weekday');
    const weekendSessions = poolSessions.filter((s: PoolSessionRow) => s.day_type === 'weekend');

    const tabsList = (
        <TabsList>
            <TabsTrigger value="villa">Villa Pricing</TabsTrigger>
            <TabsTrigger value="pool-sessions">Sesi Kolam Renang (per Jam)</TabsTrigger>
        </TabsList>
    );

    return (
        <>
            <Head title="Pricelist Management">
                <meta name="robots" content="noindex, nofollow" />
            </Head>
            <div className="flex flex-1 flex-col">
                <div className="@container/main flex flex-1 flex-col gap-2">
                    <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6 p-6">

                        <div>
                            <h1 className="text-2xl font-bold tracking-tight">Pricelist</h1>
                            <p className="text-muted-foreground mt-1">
                                Manage rental prices for Bening Villa and Bening Private Pool.
                            </p>
                        </div>

                        <Tabs defaultValue="villa" className="w-full mt-4">
                            {/* TAB: VILLA */}
                            <TabsContent value="villa" className="mt-0">
                                <PricingDataTable data={villaPrices} tabsList={tabsList} />
                            </TabsContent>

                            {/* TAB: SESI KOLAM RENANG (harga asli per jam, dipakai di halaman booking) */}
                            <TabsContent value="pool-sessions" className="mt-0 space-y-4">
                                {tabsList}
                                <p className="text-sm text-muted-foreground">
                                    Ini harga per sesi (1 jam) yang benar-benar dipakai saat tamu booking di halaman Sewa Kolam Renang. Ubah dan simpan harga di sini akan langsung berlaku.
                                </p>
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                                    <SessionPriceTable title="Hari Biasa (Senin - Jumat)" sessions={weekdaySessions} />
                                    <SessionPriceTable title="Akhir Pekan & Libur Nasional (Sabtu - Minggu)" sessions={weekendSessions} />
                                </div>
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
