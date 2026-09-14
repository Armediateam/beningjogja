import { Head, router } from '@inertiajs/react';
import { useMemo, useState } from 'react';
import { dashboard } from '@/routes';
import { Button } from '@/components/ui/button';
import { IconChevronLeft, IconChevronRight, IconDeviceFloppy, IconX } from '@tabler/icons-react';

interface DayPrice {
    date: string;
    is_custom: boolean;
    standard_price: number;
    family_price: number;
    suite_price: number;
}

const monthNames = [
    'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
    'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember',
];
const dayNames = ['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'];

function formatPrice(price: number) {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(price);
}

export default function PricingKalender({ month, year, days }: { month: number; year: number; days: DayPrice[] }) {
    const [selected, setSelected] = useState<Set<string>>(new Set());
    const [editing, setEditing] = useState<{ dates: string[]; standard: string; family: string; suite: string } | null>(null);
    const [saving, setSaving] = useState(false);

    const firstDay = new Date(year, month - 1, 1).getDay();
    const byDate = useMemo(() => Object.fromEntries(days.map(d => [d.date, d])), [days]);

    const cells = useMemo(() => {
        const arr: Array<null | DayPrice> = [];
        for (let i = 0; i < firstDay; i++) arr.push(null);
        for (const d of days) arr.push(d);
        return arr;
    }, [days, firstDay]);

    const goToMonth = (m: number, y: number) => {
        let newMonth = m;
        let newYear = y;
        if (newMonth < 1) { newMonth = 12; newYear -= 1; }
        if (newMonth > 12) { newMonth = 1; newYear += 1; }
        setSelected(new Set());
        router.get('/dashboard/pricing/kalender', { month: newMonth, year: newYear }, { preserveState: true });
    };

    const toggleSelect = (date: string) => {
        setSelected(prev => {
            const next = new Set(prev);
            if (next.has(date)) next.delete(date); else next.add(date);
            return next;
        });
    };

    const openSingleEdit = (day: DayPrice) => {
        if (selected.size > 0) {
            toggleSelect(day.date);
            return;
        }
        setEditing({
            dates: [day.date],
            standard: String(day.standard_price),
            family: String(day.family_price),
            suite: String(day.suite_price),
        });
    };

    const openBulkEdit = () => {
        if (selected.size === 0) return;
        setEditing({ dates: Array.from(selected), standard: '', family: '', suite: '' });
    };

    const closeEdit = () => setEditing(null);

    const save = () => {
        if (!editing) return;
        setSaving(true);

        const payload = {
            standard_price: Number(editing.standard),
            family_price: Number(editing.family),
            suite_price: Number(editing.suite),
        };

        const isBulk = editing.dates.length > 1;
        const url = isBulk ? '/dashboard/pricing/kalender/bulk' : '/dashboard/pricing/kalender';
        const body = isBulk ? { dates: editing.dates, ...payload } : { date: editing.dates[0], ...payload };

        router.post(url, body, {
            preserveScroll: true,
            onSuccess: () => {
                setEditing(null);
                setSelected(new Set());
            },
            onFinish: () => setSaving(false),
        });
    };

    return (
        <>
            <Head title="Kalender Harga Villa">
                <meta name="robots" content="noindex, nofollow" />
            </Head>
            <div className="flex flex-1 flex-col">
                <div className="@container/main flex flex-1 flex-col gap-2">
                    <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6 p-6">
                        <div>
                            <h1 className="text-2xl font-bold tracking-tight">Kalender Harga Villa</h1>
                            <p className="text-muted-foreground mt-1">
                                Atur harga Standard, Family, dan Suite untuk setiap tanggal. Tanggal yang belum diatur khusus memakai harga dasar dari menu Pricing.
                            </p>
                        </div>

                        <div className="rounded-xl border border-border overflow-hidden bg-white dark:bg-zinc-900">
                            <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-zinc-50 dark:bg-zinc-950">
                                <button onClick={() => goToMonth(month - 1, year)} className="p-2 rounded-lg hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors">
                                    <IconChevronLeft className="w-5 h-5" />
                                </button>
                                <span className="font-bold text-base">{monthNames[month - 1]} {year}</span>
                                <button onClick={() => goToMonth(month + 1, year)} className="p-2 rounded-lg hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors">
                                    <IconChevronRight className="w-5 h-5" />
                                </button>
                            </div>

                            <div className="p-4">
                                <div className="grid grid-cols-7 gap-1.5 mb-2">
                                    {dayNames.map(d => (
                                        <div key={d} className="text-center text-xs font-bold text-muted-foreground py-1">{d}</div>
                                    ))}
                                </div>
                                <div className="grid grid-cols-7 gap-1.5">
                                    {cells.map((day, idx) => {
                                        if (!day) return <div key={`e-${idx}`} />;

                                        const isSelected = selected.has(day.date);
                                        const dateNum = Number(day.date.slice(-2));

                                        return (
                                            <button
                                                key={day.date}
                                                type="button"
                                                onClick={() => openSingleEdit(day)}
                                                onContextMenu={e => { e.preventDefault(); toggleSelect(day.date); }}
                                                className={`flex flex-col items-start p-1.5 sm:p-2 rounded-lg border-2 text-left transition-all min-h-[72px] sm:min-h-[84px] ${
                                                    isSelected
                                                        ? 'bg-blue-700 border-blue-800 text-white'
                                                        : day.is_custom
                                                            ? 'bg-blue-50 dark:bg-blue-950/30 border-blue-200 dark:border-blue-900 hover:border-blue-400'
                                                            : 'bg-zinc-50 dark:bg-zinc-950 border-border hover:border-blue-400'
                                                }`}
                                            >
                                                <span className={`text-xs sm:text-sm font-bold mb-1 ${isSelected ? 'text-white' : 'text-foreground'}`}>{dateNum}</span>
                                                <div className={`text-[9px] sm:text-[10px] leading-tight space-y-0.5 ${isSelected ? 'text-blue-100' : 'text-muted-foreground'}`}>
                                                    <div>S: {(day.standard_price / 1000).toFixed(0)}k</div>
                                                    <div>F: {(day.family_price / 1000).toFixed(0)}k</div>
                                                    <div>E: {(day.suite_price / 1000).toFixed(0)}k</div>
                                                </div>
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>

                            <div className="flex flex-wrap items-center gap-4 px-4 py-3 border-t border-border text-xs text-muted-foreground">
                                <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900" /> Harga khusus tanggal ini</div>
                                <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded bg-zinc-50 dark:bg-zinc-950 border border-border" /> Pakai harga dasar</div>
                                <div>Klik kanan (atau tekan lama) tanggal untuk memilih beberapa tanggal sekaligus.</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {selected.size > 0 && !editing && (
                <div className="fixed bottom-0 left-0 right-0 bg-blue-800 text-white px-6 py-4 flex items-center justify-between shadow-2xl z-40">
                    <span className="font-medium">{selected.size} tanggal dipilih</span>
                    <div className="flex gap-3">
                        <Button variant="outline" className="bg-transparent border-white text-white hover:bg-blue-700" onClick={() => setSelected(new Set())}>
                            Batal
                        </Button>
                        <Button className="bg-white text-blue-800 hover:bg-zinc-100" onClick={openBulkEdit}>
                            Terapkan Harga ke Tanggal Terpilih
                        </Button>
                    </div>
                </div>
            )}

            {editing && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white dark:bg-zinc-900 rounded-2xl p-6 w-full max-w-md shadow-2xl">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-bold">
                                {editing.dates.length > 1
                                    ? `Atur Harga untuk ${editing.dates.length} Tanggal`
                                    : `Atur Harga ${editing.dates[0]}`}
                            </h3>
                            <button onClick={closeEdit} className="p-1 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800">
                                <IconX className="w-5 h-5" />
                            </button>
                        </div>

                        <div className="space-y-3">
                            <div>
                                <label className="text-sm font-medium">Harga Standard Room</label>
                                <input type="number" value={editing.standard} onChange={e => setEditing({ ...editing, standard: e.target.value })}
                                    className="w-full h-11 mt-1 px-3 rounded-xl border border-border bg-zinc-50 dark:bg-zinc-950 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none" />
                            </div>
                            <div>
                                <label className="text-sm font-medium">Harga Family Room</label>
                                <input type="number" value={editing.family} onChange={e => setEditing({ ...editing, family: e.target.value })}
                                    className="w-full h-11 mt-1 px-3 rounded-xl border border-border bg-zinc-50 dark:bg-zinc-950 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none" />
                            </div>
                            <div>
                                <label className="text-sm font-medium">Harga Exclusive Suite / Honeymoon Room</label>
                                <input type="number" value={editing.suite} onChange={e => setEditing({ ...editing, suite: e.target.value })}
                                    className="w-full h-11 mt-1 px-3 rounded-xl border border-border bg-zinc-50 dark:bg-zinc-950 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none" />
                            </div>
                        </div>

                        <div className="flex gap-3 mt-6">
                            <Button variant="outline" className="flex-1" onClick={closeEdit}>Batal</Button>
                            <Button
                                className="flex-1 bg-blue-800 hover:bg-blue-900 text-white"
                                disabled={saving || !editing.standard || !editing.family || !editing.suite}
                                onClick={save}
                            >
                                <IconDeviceFloppy className="w-4 h-4 mr-2" /> Simpan
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

PricingKalender.layout = {
    breadcrumbs: [
        { title: 'Dashboard', href: dashboard() },
        { title: 'Pricing', href: '/dashboard/pricing' },
        { title: 'Kalender Harga Villa', href: '/dashboard/pricing/kalender' },
    ],
};
