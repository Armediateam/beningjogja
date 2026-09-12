import { Head, Link, usePage, useForm } from '@inertiajs/react';
import { useState, useMemo } from 'react';
import { LandingHeader } from '@/components/landing-header';
import { LandingFooter } from '@/components/landing-footer';
import { Button } from '@/components/ui/button';
import {
    IconCheck, IconChevronLeft, IconChevronRight,
    IconArrowLeft, IconBrandWhatsapp, IconClock,
} from '@tabler/icons-react';
import { useTranslation } from '@/lib/language-context';

interface Session {
    code: string;
    time: string;
    price: number;
}

interface BookingRow {
    booking_date: string;
    session: string;
}

const copy = {
    id: {
        title: 'Sewa Kolam Renang',
        subtitle: 'Pilih tanggal dan sesi yang tersedia, lalu konfirmasi melalui WhatsApp.',
        stepDateTitle: '1. Pilih Tanggal',
        stepSessionTitle: '2. Pilih Sesi',
        legendAvailable: 'Kosong',
        legendBooked: 'Penuh',
        legendPast: 'Lewat',
        legendSelected: 'Pilihan Anda',
        capacityNote: 'Harga yang tercantum berlaku untuk kapasitas maksimal 5 orang. Apabila jumlah member melebihi kapasitas tersebut, akan dikenakan additional charge sebesar Rp15.000/orang.',
        guestInfo: 'Informasi Pemesan',
        name: 'Nama Lengkap',
        memberCount: 'Jumlah Member',
        email: 'Email',
        phone: 'No. WhatsApp',
        summary: 'Ringkasan Pesanan',
        date: 'Tanggal',
        session: 'Sesi',
        extraCharge: 'Biaya Tambahan',
        total: 'Total Tagihan',
        submit: 'Booking & Konfirmasi WhatsApp',
        submitting: 'Memproses...',
        selectHint: 'Pilih tanggal dan sesi terlebih dahulu.',
        successTitle: 'Booking Diterima!',
        successDesc: 'Silakan lanjutkan konfirmasi ke WhatsApp admin kami agar reservasi Anda segera diproses.',
        code: 'Kode Booking',
        waButton: 'Konfirmasi via WhatsApp',
        home: 'Kembali ke Beranda',
        monthNames: ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'],
        dayNames: ['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'],
        back: 'Ganti Tanggal',
    },
    en: {
        title: 'Rent the Pool',
        subtitle: 'Pick an available date and session, then confirm via WhatsApp.',
        stepDateTitle: '1. Choose a Date',
        stepSessionTitle: '2. Choose a Session',
        legendAvailable: 'Available',
        legendBooked: 'Booked',
        legendPast: 'Past',
        legendSelected: 'Your Selection',
        capacityNote: 'The listed price applies to a maximum capacity of 5 people. If the number of members exceeds that capacity, an additional charge of Rp15,000/person will apply.',
        guestInfo: 'Guest Information',
        name: 'Full Name',
        memberCount: 'Number of Members',
        email: 'Email',
        phone: 'WhatsApp Number',
        summary: 'Order Summary',
        date: 'Date',
        session: 'Session',
        extraCharge: 'Additional Charge',
        total: 'Total',
        submit: 'Book & Confirm on WhatsApp',
        submitting: 'Processing...',
        selectHint: 'Pick a date and a session first.',
        successTitle: 'Booking Received!',
        successDesc: 'Please continue the confirmation on WhatsApp with our admin so your reservation can be processed.',
        code: 'Booking Code',
        waButton: 'Confirm via WhatsApp',
        home: 'Back to Home',
        monthNames: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        dayNames: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
        back: 'Change Date',
    },
};

export default function KolamRenang({ pool, bookings = [] }: { pool: { weekday: Session[]; weekend: Session[] }; bookings?: BookingRow[] }) {
    const { auth } = usePage<any>().props;
    const t = useTranslation(copy);

    const [selectedDate, setSelectedDate] = useState('');
    const [selectedSession, setSelectedSession] = useState<Session | null>(null);
    const [currentMonth, setCurrentMonth] = useState(() => new Date(2026, 9, 1));
    const [step, setStep] = useState<'select' | 'success'>('select');
    const [bookingCode, setBookingCode] = useState('');
    const [waLink, setWaLink] = useState('');

    const formatPrice = (price: number) => new Intl.NumberFormat('id-ID', {
        style: 'currency', currency: 'IDR', minimumFractionDigits: 0,
    }).format(price);

    const { data, setData, post, processing, errors } = useForm({
        customer_name: '',
        customer_email: '',
        customer_phone: '',
        member_count: '1',
        type: 'pool',
        booking_date: '',
        session: '',
    });

    const POOL_MAX_CAPACITY = 5;
    const POOL_EXTRA_CHARGE_PER_PERSON = 15000;
    const memberCount = parseInt(data.member_count, 10) || 0;
    const extraMembers = Math.max(0, memberCount - POOL_MAX_CAPACITY);
    const extraCharge = extraMembers * POOL_EXTRA_CHARGE_PER_PERSON;

    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDay = new Date(year, month, 1).getDay();

    const days = useMemo(() => {
        const arr: Array<null | { date: number; dateStr: string; status: string }> = [];
        for (let i = 0; i < firstDay; i++) arr.push(null);
        for (let i = 1; i <= daysInMonth; i++) {
            const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(i).padStart(2, '0')}`;
            let status = 'available';
            if (new Date(year, month, i) < new Date(new Date().setHours(0, 0, 0, 0))) {
                status = 'past';
            } else {
                const dayBookings = bookings.filter(b => b.booking_date === dateStr);
                const sessionsForDay = isWeekend(dateStr) ? pool.weekend : pool.weekday;
                if (dayBookings.length >= sessionsForDay.length) status = 'booked';
            }
            arr.push({ date: i, dateStr, status });
        }
        return arr;
    }, [year, month, bookings]);

    function isWeekend(dateStr: string) {
        const day = new Date(dateStr).getDay();
        return day === 0 || day === 6;
    }

    const sessionsForSelectedDate = useMemo(() => {
        if (!selectedDate) return [];
        const list = isWeekend(selectedDate) ? pool.weekend : pool.weekday;
        const bookedCodes = bookings.filter(b => b.booking_date === selectedDate).map(b => b.session);
        return list.map(s => ({ ...s, booked: bookedCodes.includes(s.code) }));
    }, [selectedDate, bookings]);

    const prevMonth = () => setCurrentMonth(new Date(year, month - 1, 1));
    const nextMonth = () => setCurrentMonth(new Date(year, month + 1, 1));

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedDate || !selectedSession) return;
        setData('booking_date', selectedDate);
        setData('session', selectedSession.code);

        post('/reservasi', {
            preserveScroll: true,
            onSuccess: (page) => {
                const flash = (page.props as any).flash;
                if (flash?.booking_code) {
                    setBookingCode(flash.booking_code);
                    setWaLink(flash.whatsapp_link || '');
                    setStep('success');
                }
            },
        });
    };

    return (
        <>
            <Head title="Sewa Kolam Renang - Bening Jogja">
                <meta name="description" content="Sewa kolam renang privat Bening Jogja per jam. Pilih tanggal dan sesi yang tersedia untuk bersantai bersama keluarga atau teman." />
            </Head>
            <div className="flex min-h-screen flex-col bg-[#FDFDFC] dark:bg-[#0a0a0a]">
                <LandingHeader auth={auth} />

                <main className="flex-grow pt-28 pb-16">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="mb-10 text-center">
                            <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold text-foreground mb-4">
                                {step === 'success' ? t.successTitle : t.title}
                            </h1>
                            <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
                                {step === 'success' ? t.successDesc : t.subtitle}
                            </p>
                        </div>

                        {step === 'success' ? (
                            <div className="max-w-2xl mx-auto bg-white dark:bg-zinc-900 rounded-3xl p-8 md:p-12 text-center border border-border/50 shadow-xl animate-in fade-in zoom-in duration-500">
                                <div className="w-24 h-24 bg-blue-100 text-blue-500 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <IconCheck className="w-12 h-12" />
                                </div>
                                <div className="bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900 rounded-2xl p-6 mb-8 inline-block">
                                    <p className="text-sm font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-widest mb-2">{t.code}</p>
                                    <p className="text-4xl md:text-5xl font-black text-blue-700 dark:text-blue-500 tracking-wider font-mono">{bookingCode}</p>
                                </div>
                                <div className="flex flex-col sm:flex-row gap-4 justify-center mt-4">
                                    <a href={waLink} target="_blank" rel="noopener noreferrer">
                                        <Button size="lg" className="rounded-full px-8 h-12 bg-blue-600 hover:bg-blue-700 text-white">
                                            <IconBrandWhatsapp className="mr-2 w-5 h-5" />
                                            {t.waButton}
                                        </Button>
                                    </a>
                                    <Link href="/">
                                        <Button size="lg" variant="outline" className="rounded-full px-8 h-12">
                                            {t.home}
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                                <div className="lg:col-span-8 space-y-8">
                                    <div className="bg-white dark:bg-zinc-900 rounded-3xl p-4 sm:p-6 md:p-8 border border-border/50 shadow-sm">
                                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 sm:mb-8 gap-4">
                                            <h3 className="text-lg md:text-xl font-bold text-foreground">{t.stepDateTitle}</h3>
                                            <div className="flex items-center gap-2 sm:gap-4 bg-zinc-100 dark:bg-zinc-950 rounded-full px-3 py-1.5 sm:px-4 sm:py-2 border border-border w-full sm:w-auto justify-between sm:justify-start">
                                                <button onClick={prevMonth} className="p-1 hover:text-blue-500 transition-colors">
                                                    <IconChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
                                                </button>
                                                <span className="font-bold text-sm sm:text-base min-w-[100px] sm:min-w-[120px] text-center">{t.monthNames[month]} {year}</span>
                                                <button onClick={nextMonth} className="p-1 hover:text-blue-500 transition-colors">
                                                    <IconChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
                                                </button>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-7 gap-2 md:gap-3">
                                            {t.dayNames.map(d => (
                                                <div key={d} className="text-center font-bold text-xs sm:text-sm text-muted-foreground pb-2">{d}</div>
                                            ))}

                                            {days.map((day, idx) => {
                                                if (!day) return <div key={`empty-${idx}`} className="h-14 md:h-20" />;

                                                let bgClass = "bg-white dark:bg-zinc-950 border-border hover:border-blue-400";
                                                let textClass = "text-foreground";

                                                if (day.status === 'booked') {
                                                    bgClass = "bg-zinc-100 dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 opacity-50 cursor-not-allowed";
                                                }
                                                if (day.status === 'past') {
                                                    bgClass = "bg-zinc-50 dark:bg-zinc-950/50 border-transparent opacity-30 cursor-not-allowed";
                                                }
                                                if (day.dateStr === selectedDate) {
                                                    bgClass = "bg-blue-500 text-white border-blue-600 shadow-lg transform scale-[1.05] z-10 relative";
                                                    textClass = "text-white";
                                                }

                                                return (
                                                    <div
                                                        key={idx}
                                                        onClick={() => {
                                                            if (day.status === 'available') {
                                                                setSelectedDate(day.dateStr);
                                                                setSelectedSession(null);
                                                            }
                                                        }}
                                                        className={`flex flex-col items-center justify-center p-1 sm:p-2 h-14 sm:h-16 md:h-20 rounded-xl md:rounded-2xl border-2 cursor-pointer transition-all ${bgClass}`}
                                                    >
                                                        <span className={`text-base sm:text-lg md:text-xl font-black ${textClass}`}>{day.date}</span>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>

                                    {selectedDate && (
                                        <div className="bg-white dark:bg-zinc-900 rounded-3xl p-4 sm:p-6 md:p-8 border border-border/50 shadow-sm">
                                            <h3 className="text-lg md:text-xl font-bold text-foreground mb-6">{t.stepSessionTitle}</h3>
                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                                {sessionsForSelectedDate.map(session => (
                                                    <button
                                                        key={session.code}
                                                        type="button"
                                                        disabled={session.booked}
                                                        onClick={() => setSelectedSession(session)}
                                                        className={`flex items-center justify-between p-4 rounded-2xl border-2 text-left transition-all ${
                                                            session.booked
                                                                ? 'opacity-40 cursor-not-allowed border-border bg-zinc-50 dark:bg-zinc-950'
                                                                : selectedSession?.code === session.code
                                                                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-950/30 shadow-md'
                                                                    : 'border-border hover:border-blue-300 hover:shadow-sm'
                                                        }`}
                                                    >
                                                        <div className="flex items-center gap-3">
                                                            <IconClock className="w-5 h-5 text-muted-foreground shrink-0" />
                                                            <span className="font-semibold text-sm text-foreground">{session.time}</span>
                                                        </div>
                                                        <span className="font-bold text-sm text-foreground">{formatPrice(session.price)}</span>
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {selectedDate && selectedSession && (
                                        <p className="text-sm text-muted-foreground bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/50 rounded-2xl px-4 py-3">
                                            {t.capacityNote}
                                        </p>
                                    )}

                                    {selectedDate && selectedSession && (
                                        <form id="pool-checkout-form" onSubmit={handleSubmit} className="bg-white dark:bg-zinc-900 rounded-3xl p-6 md:p-8 border border-border/50 shadow-sm space-y-6">
                                            <h3 className="text-lg md:text-xl font-bold text-foreground">{t.guestInfo}</h3>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <div className="space-y-2">
                                                    <label className="text-sm font-medium text-foreground">{t.name}</label>
                                                    <input
                                                        type="text" required value={data.customer_name}
                                                        onChange={e => setData('customer_name', e.target.value)}
                                                        className="w-full h-12 px-4 rounded-xl bg-zinc-50 dark:bg-zinc-950 border border-border focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
                                                    />
                                                    {errors.customer_name && <p className="text-sm text-red-500">{errors.customer_name}</p>}
                                                </div>
                                                <div className="space-y-2">
                                                    <label className="text-sm font-medium text-foreground">{t.memberCount}</label>
                                                    <input
                                                        type="number" min={1} required value={data.member_count}
                                                        onChange={e => setData('member_count', e.target.value)}
                                                        className="w-full h-12 px-4 rounded-xl bg-zinc-50 dark:bg-zinc-950 border border-border focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
                                                    />
                                                    {errors.member_count && <p className="text-sm text-red-500">{errors.member_count}</p>}
                                                </div>
                                                <div className="space-y-2">
                                                    <label className="text-sm font-medium text-foreground">{t.email}</label>
                                                    <input
                                                        type="email" required value={data.customer_email}
                                                        onChange={e => setData('customer_email', e.target.value)}
                                                        className="w-full h-12 px-4 rounded-xl bg-zinc-50 dark:bg-zinc-950 border border-border focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
                                                    />
                                                    {errors.customer_email && <p className="text-sm text-red-500">{errors.customer_email}</p>}
                                                </div>
                                                <div className="space-y-2 md:col-span-2">
                                                    <label className="text-sm font-medium text-foreground">{t.phone}</label>
                                                    <input
                                                        type="text" required value={data.customer_phone}
                                                        onChange={e => setData('customer_phone', e.target.value)}
                                                        placeholder="081234567890"
                                                        className="w-full h-12 px-4 rounded-xl bg-zinc-50 dark:bg-zinc-950 border border-border focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
                                                    />
                                                    {errors.customer_phone && <p className="text-sm text-red-500">{errors.customer_phone}</p>}
                                                </div>
                                            </div>
                                        </form>
                                    )}
                                </div>

                                <div className="lg:col-span-4">
                                    <div className="bg-white dark:bg-zinc-900 rounded-3xl p-4 sm:p-6 md:p-8 border border-border/50 shadow-xl sticky top-24 flex flex-col min-h-[400px]">
                                        <h3 className="text-lg md:text-xl font-bold text-foreground mb-6">{t.summary}</h3>

                                        {!selectedDate || !selectedSession ? (
                                            <div className="flex-grow flex flex-col items-center justify-center text-center p-6 border-2 border-dashed border-border rounded-2xl bg-zinc-50/50 dark:bg-zinc-950/50">
                                                <p className="text-muted-foreground text-sm">{t.selectHint}</p>
                                            </div>
                                        ) : (
                                            <div className="flex-grow flex flex-col">
                                                <div className="space-y-4 mb-8">
                                                    <div>
                                                        <p className="text-sm font-medium text-muted-foreground mb-1">{t.date}</p>
                                                        <p className="text-lg font-bold text-foreground">
                                                            {new Date(selectedDate).toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                                                        </p>
                                                    </div>
                                                    <div className="h-px bg-border/50 w-full" />
                                                    <div>
                                                        <p className="text-sm font-medium text-muted-foreground mb-1">{t.session}</p>
                                                        <p className="text-lg font-bold text-foreground">{selectedSession.time}</p>
                                                    </div>
                                                    {extraCharge > 0 && (
                                                        <>
                                                            <div className="h-px bg-border/50 w-full" />
                                                            <div>
                                                                <p className="text-sm font-medium text-muted-foreground mb-1">{t.extraCharge}</p>
                                                                <p className="text-lg font-bold text-foreground">{formatPrice(extraCharge)}</p>
                                                            </div>
                                                        </>
                                                    )}
                                                </div>

                                                <div className="mt-auto pt-6 border-t border-border flex flex-col gap-4">
                                                    <div className="flex justify-between items-end">
                                                        <p className="text-muted-foreground text-sm font-medium">{t.total}</p>
                                                        <p className="text-2xl font-black text-foreground">{formatPrice(selectedSession.price + extraCharge)}</p>
                                                    </div>
                                                    <Button
                                                        size="lg"
                                                        type="submit"
                                                        form="pool-checkout-form"
                                                        disabled={processing}
                                                        className="w-full h-14 text-base rounded-full shadow-lg transition-all bg-blue-500 hover:bg-blue-600 text-white"
                                                    >
                                                        {processing ? t.submitting : t.submit}
                                                    </Button>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </main>

                <LandingFooter />
            </div>
        </>
    );
}
