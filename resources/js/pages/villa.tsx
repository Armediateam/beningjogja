import { Head, Link, usePage, useForm } from '@inertiajs/react';
import { useState, useMemo } from 'react';
import { LandingHeader } from '@/components/landing-header';
import { LandingFooter } from '@/components/landing-footer';
import { Button } from '@/components/ui/button';
import {
    IconBed, IconCheck, IconChevronLeft, IconChevronRight,
    IconArrowLeft, IconBrandWhatsapp, IconRuler2, IconMoon,
} from '@tabler/icons-react';
import { useTranslation } from '@/lib/language-context';

interface Room {
    code: string;
    name: string;
    facilities: string[];
    bed: string;
    size: string;
    price: number;
}

interface BookingRow {
    room_type: string;
    booking_date: string;
    check_out: string;
}

const copy = {
    id: {
        title: 'Sewa Villa',
        subtitle: 'Pilih tipe kamar, tentukan tanggal check-in & check-out, lalu konfirmasi melalui WhatsApp.',
        stepRoomTitle: 'Pilih Tipe Kamar',
        chooseRoom: 'Pilih Kamar Ini',
        bed: 'Tipe Kasur',
        size: 'Luas Kamar',
        facilities: 'Fasilitas',
        back: 'Ganti Tipe Kamar',
        stepDateTitle: 'Pilih Tanggal Menginap',
        checkin: 'Check-in',
        checkout: 'Check-out',
        legendAvailable: 'Tersedia',
        legendBooked: 'Penuh',
        legendPast: 'Lewat',
        legendSelected: 'Pilihan Anda',
        guestInfo: 'Informasi Pemesan',
        name: 'Nama Lengkap',
        email: 'Email',
        phone: 'No. WhatsApp',
        summary: 'Ringkasan Pesanan',
        room: 'Tipe Kamar',
        nights: 'malam',
        total: 'Total Tagihan',
        submit: 'Booking & Konfirmasi WhatsApp',
        submitting: 'Memproses...',
        selectDatesHint: 'Pilih tanggal check-in dan check-out pada kalender.',
        successTitle: 'Booking Diterima!',
        successDesc: 'Silakan lanjutkan konfirmasi ke WhatsApp admin kami agar reservasi Anda segera diproses.',
        code: 'Kode Booking',
        waButton: 'Konfirmasi via WhatsApp',
        home: 'Kembali ke Beranda',
        monthNames: ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'],
        dayNames: ['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'],
        night: '/malam',
    },
    en: {
        title: 'Rent a Villa',
        subtitle: 'Choose a room type, pick your check-in & check-out dates, then confirm via WhatsApp.',
        stepRoomTitle: 'Choose a Room Type',
        chooseRoom: 'Select This Room',
        bed: 'Bed Type',
        size: 'Room Size',
        facilities: 'Facilities',
        back: 'Change Room Type',
        stepDateTitle: 'Choose Your Stay Dates',
        checkin: 'Check-in',
        checkout: 'Check-out',
        legendAvailable: 'Available',
        legendBooked: 'Booked',
        legendPast: 'Past',
        legendSelected: 'Your Selection',
        guestInfo: 'Guest Information',
        name: 'Full Name',
        email: 'Email',
        phone: 'WhatsApp Number',
        summary: 'Order Summary',
        room: 'Room Type',
        nights: 'night(s)',
        total: 'Total',
        submit: 'Book & Confirm on WhatsApp',
        submitting: 'Processing...',
        selectDatesHint: 'Select a check-in and check-out date on the calendar.',
        successTitle: 'Booking Received!',
        successDesc: 'Please continue the confirmation on WhatsApp with our admin so your reservation can be processed.',
        code: 'Booking Code',
        waButton: 'Confirm via WhatsApp',
        home: 'Back to Home',
        monthNames: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        dayNames: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
        night: '/night',
    },
};

export default function Villa({ rooms, bookings = [] }: { rooms: Room[]; bookings?: BookingRow[] }) {
    const { auth } = usePage<any>().props;
    const t = useTranslation(copy);

    const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
    const [checkIn, setCheckIn] = useState<string>('');
    const [checkOut, setCheckOut] = useState<string>('');
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
        type: 'villa',
        room_type: '',
        booking_date: '',
        check_out: '',
    });

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
            } else if (selectedRoom) {
                const overlap = bookings.some(b => (
                    b.room_type === selectedRoom.code &&
                    dateStr >= b.booking_date &&
                    dateStr < b.check_out
                ));
                if (overlap) status = 'booked';
            }

            arr.push({ date: i, dateStr, status });
        }
        return arr;
    }, [year, month, selectedRoom, bookings]);

    const prevMonth = () => setCurrentMonth(new Date(year, month - 1, 1));
    const nextMonth = () => setCurrentMonth(new Date(year, month + 1, 1));

    const handleDayClick = (day: { dateStr: string; status: string }) => {
        if (day.status !== 'available') return;
        if (!checkIn || (checkIn && checkOut) || day.dateStr <= checkIn) {
            setCheckIn(day.dateStr);
            setCheckOut('');
        } else {
            setCheckOut(day.dateStr);
        }
    };

    const nights = useMemo(() => {
        if (!checkIn || !checkOut) return 0;
        return Math.round((new Date(checkOut).getTime() - new Date(checkIn).getTime()) / 86400000);
    }, [checkIn, checkOut]);

    const totalPrice = useMemo(() => {
        if (!selectedRoom || !nights) return 0;
        return selectedRoom.price * nights;
    }, [selectedRoom, nights]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedRoom || !checkIn || !checkOut) return;
        setData('room_type', selectedRoom.code);
        setData('booking_date', checkIn);
        setData('check_out', checkOut);

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
            <Head title="Sewa Villa - Bening Jogja">
                <meta name="description" content="Pilih tipe kamar villa Bening Jogja - Standard, Family, atau Exclusive Suite - lengkap dengan fasilitas dan harga per tanggal." />
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
                        ) : !selectedRoom ? (
                            <div>
                                <h3 className="text-lg md:text-xl font-bold text-foreground mb-6">{t.stepRoomTitle}</h3>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    {rooms.map(room => (
                                        <div key={room.code} className="bg-white dark:bg-zinc-900 rounded-3xl p-6 border border-border/50 shadow-sm flex flex-col">
                                            <div className="h-12 w-12 rounded-full bg-blue-50 dark:bg-blue-950/50 flex items-center justify-center mb-4 text-blue-700 dark:text-blue-400">
                                                <IconBed className="w-6 h-6" />
                                            </div>
                                            <h4 className="text-lg font-bold text-foreground mb-1">{room.name}</h4>
                                            <p className="text-lg font-black text-blue-700 dark:text-blue-400 mb-3">
                                                {formatPrice(room.price)}<span className="text-xs font-medium text-muted-foreground">{t.night}</span>
                                            </p>

                                            <div className="space-y-1.5 mb-4 text-sm text-muted-foreground">
                                                <p className="flex items-center gap-2"><IconMoon className="w-4 h-4 shrink-0" /> {t.bed}: {room.bed}</p>
                                                <p className="flex items-center gap-2"><IconRuler2 className="w-4 h-4 shrink-0" /> {t.size}: {room.size}</p>
                                            </div>

                                            <p className="text-xs font-semibold text-foreground uppercase tracking-wide mb-2">{t.facilities}</p>
                                            <ul className="text-xs text-muted-foreground space-y-1 mb-6 flex-grow">
                                                {room.facilities.map((f, i) => (
                                                    <li key={i} className="flex gap-1.5">
                                                        <span className="text-blue-500">•</span>
                                                        <span>{f}</span>
                                                    </li>
                                                ))}
                                            </ul>

                                            <Button onClick={() => setSelectedRoom(room)} className="w-full rounded-full h-11 bg-blue-800 hover:bg-blue-900 text-white">
                                                {t.chooseRoom}
                                            </Button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                                <div className="lg:col-span-8 space-y-8">
                                    <button
                                        type="button"
                                        onClick={() => { setSelectedRoom(null); setCheckIn(''); setCheckOut(''); }}
                                        className="flex items-center text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                                    >
                                        <IconArrowLeft className="w-4 h-4 mr-2" />
                                        {t.back}
                                    </button>

                                    <div className="bg-white dark:bg-zinc-900 rounded-3xl p-4 sm:p-6 md:p-8 border border-border/50 shadow-sm">
                                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 sm:mb-8 gap-4">
                                            <h3 className="text-lg md:text-xl font-bold text-foreground">{selectedRoom.name} — {t.stepDateTitle}</h3>
                                            <div className="flex items-center gap-2 sm:gap-4 bg-zinc-100 dark:bg-zinc-950 rounded-full px-3 py-1.5 sm:px-4 sm:py-2 border border-border w-full sm:w-auto justify-between sm:justify-start">
                                                <button onClick={prevMonth} className="p-1 hover:text-blue-600 transition-colors">
                                                    <IconChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
                                                </button>
                                                <span className="font-bold text-sm sm:text-base min-w-[100px] sm:min-w-[120px] text-center">{t.monthNames[month]} {year}</span>
                                                <button onClick={nextMonth} className="p-1 hover:text-blue-600 transition-colors">
                                                    <IconChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
                                                </button>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-7 gap-1.5 md:gap-2">
                                            {t.dayNames.map(d => (
                                                <div key={d} className="text-center font-bold text-xs sm:text-sm text-muted-foreground pb-2">{d}</div>
                                            ))}

                                            {days.map((day, idx) => {
                                                if (!day) return <div key={`empty-${idx}`} className="h-16 md:h-24" />;

                                                let bgClass = "bg-white dark:bg-zinc-950 border-border hover:border-blue-400";
                                                let textClass = "text-foreground";

                                                if (day.status === 'booked') {
                                                    bgClass = "bg-zinc-100 dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 opacity-50 cursor-not-allowed";
                                                    textClass = "text-muted-foreground";
                                                }
                                                if (day.status === 'past') {
                                                    bgClass = "bg-zinc-50 dark:bg-zinc-950/50 border-transparent opacity-30 cursor-not-allowed";
                                                    textClass = "text-muted-foreground";
                                                }

                                                const inRange = checkIn && checkOut && day.dateStr > checkIn && day.dateStr < checkOut;
                                                const isEdge = day.dateStr === checkIn || day.dateStr === checkOut;

                                                if (inRange) {
                                                    bgClass = "bg-blue-100 dark:bg-blue-950/40 border-blue-300";
                                                }
                                                if (isEdge) {
                                                    bgClass = "bg-blue-700 text-white border-blue-800 shadow-lg transform scale-[1.05] z-10 relative";
                                                    textClass = "text-white";
                                                }

                                                return (
                                                    <div
                                                        key={idx}
                                                        onClick={() => handleDayClick(day)}
                                                        className={`flex flex-col items-center justify-center p-1 h-16 sm:h-20 md:h-24 rounded-xl md:rounded-2xl border-2 cursor-pointer transition-all ${bgClass}`}
                                                    >
                                                        <span className={`text-sm sm:text-base md:text-xl font-black ${textClass}`}>{day.date}</span>
                                                        {day.status === 'booked' && (
                                                            <span className="text-[8px] sm:text-[9px] md:text-[10px] text-zinc-500 font-bold mt-0.5 leading-none">{t.legendBooked}</span>
                                                        )}
                                                    </div>
                                                );
                                            })}
                                        </div>

                                        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 mt-6 sm:mt-8 pt-6 border-t border-border/50">
                                            <div className="flex items-center gap-2">
                                                <div className="w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-white border border-border"></div>
                                                <span className="text-xs sm:text-sm text-muted-foreground font-medium">{t.legendAvailable}</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <div className="w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-zinc-200 border border-zinc-400"></div>
                                                <span className="text-xs sm:text-sm text-muted-foreground font-medium">{t.legendBooked}</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <div className="w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-blue-700 border border-blue-800"></div>
                                                <span className="text-xs sm:text-sm text-muted-foreground font-medium">{t.legendSelected}</span>
                                            </div>
                                        </div>
                                    </div>

                                    {checkIn && checkOut && (
                                        <form id="villa-checkout-form" onSubmit={handleSubmit} className="bg-white dark:bg-zinc-900 rounded-3xl p-6 md:p-8 border border-border/50 shadow-sm space-y-6">
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

                                        {!checkIn || !checkOut ? (
                                            <div className="flex-grow flex flex-col items-center justify-center text-center p-6 border-2 border-dashed border-border rounded-2xl bg-zinc-50/50 dark:bg-zinc-950/50">
                                                <p className="text-muted-foreground text-sm">{t.selectDatesHint}</p>
                                            </div>
                                        ) : (
                                            <div className="flex-grow flex flex-col">
                                                <div className="space-y-4 mb-8">
                                                    <div>
                                                        <p className="text-sm font-medium text-muted-foreground mb-1">{t.room}</p>
                                                        <p className="text-lg font-bold text-foreground">{selectedRoom.name}</p>
                                                    </div>
                                                    <div className="h-px bg-border/50 w-full" />
                                                    <div>
                                                        <p className="text-sm font-medium text-muted-foreground mb-1">{t.checkin}</p>
                                                        <p className="text-base font-bold text-foreground">
                                                            {new Date(checkIn).toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                                                        </p>
                                                    </div>
                                                    <div>
                                                        <p className="text-sm font-medium text-muted-foreground mb-1">{t.checkout}</p>
                                                        <p className="text-base font-bold text-foreground">
                                                            {new Date(checkOut).toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                                                        </p>
                                                    </div>
                                                    <div className="h-px bg-border/50 w-full" />
                                                    <div>
                                                        <p className="text-sm font-medium text-muted-foreground mb-1">{nights} {t.nights}</p>
                                                    </div>
                                                </div>

                                                <div className="mt-auto pt-6 border-t border-border flex flex-col gap-4">
                                                    <div className="flex justify-between items-end">
                                                        <p className="text-muted-foreground text-sm font-medium">{t.total}</p>
                                                        <p className="text-2xl font-black text-foreground">{formatPrice(totalPrice)}</p>
                                                    </div>
                                                    <Button
                                                        size="lg"
                                                        type="submit"
                                                        form="villa-checkout-form"
                                                        disabled={processing}
                                                        className="w-full h-14 text-base rounded-full shadow-lg transition-all bg-blue-800 hover:bg-blue-900 text-white"
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
