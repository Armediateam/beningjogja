import { Head, usePage, useForm } from '@inertiajs/react';
import { useState, useMemo } from 'react';
import { LandingHeader } from '@/components/landing-header';
import { LandingFooter } from '@/components/landing-footer';
import { Button } from '@/components/ui/button';
import { IconCalendarEvent, IconClock, IconCheck, IconBed, IconSwimming, IconChevronLeft, IconChevronRight, IconUpload, IconBuildingBank, IconArrowLeft } from '@tabler/icons-react';

export default function Reservation({ bookings, pricings = [] }: { bookings?: any[], pricings?: any[] }) {
    const { auth } = usePage<any>().props;

    const [step, setStep] = useState<number>(1);
    const [selectedPackage, setSelectedPackage] = useState<string>('full');
    const [selectedDate, setSelectedDate] = useState<string>('');
    const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [bookingCode, setBookingCode] = useState<string>('');

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0
        }).format(price);
    };

    const packages = pricings.map(p => ({
        id: p.code,
        name: p.name,
        icon: p.code === 'villa' ? <IconBed className="w-5 h-5" /> : p.code === 'pool' ? <IconSwimming className="w-5 h-5" /> : <IconCheck className="w-5 h-5" />,
        price: formatPrice(p.price),
        numericPrice: p.price,
        description: p.description
    }));

    const currentPackageInfo = packages.find(p => p.id === selectedPackage);

    const { data, setData, post, processing, errors } = useForm({
        customer_name: '',
        customer_email: '',
        customer_phone: '',
        payment_proof: null as File | null,
        type: 'full',
        total_price: 0,
        booking_date: '',
    });

    // Calendar Logic
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDay = new Date(year, month, 1).getDay();

    const days = useMemo(() => {
        const arr = [];
        for (let i = 0; i < firstDay; i++) {
            arr.push(null);
        }
        for (let i = 1; i <= daysInMonth; i++) {
            let status = 'available';
            
            const dateStr = `${year}-${String(month+1).padStart(2, '0')}-${String(i).padStart(2, '0')}`;
            
            const dbBookings = bookings || [];
            const dayBookings = dbBookings.filter(b => b.booking_date === dateStr && b.status !== 'cancelled');
            
            if (selectedPackage === 'villa') {
                if (dayBookings.some(b => b.type === 'villa')) status = 'full';
            } else if (selectedPackage === 'pool') {
                if (dayBookings.some(b => b.type === 'pool')) status = 'full';
            } else { // full package
                if (dayBookings.some(b => b.type === 'villa' || b.type === 'pool')) status = 'full';
            }
            
            // Mark past days
            if (new Date(year, month, i) < new Date(new Date().setHours(0,0,0,0))) {
                status = 'past';
            }

            arr.push({ date: i, status });
        }
        return arr;
    }, [year, month, selectedPackage, bookings]);

    const prevMonth = () => {
        setCurrentMonth(new Date(year, month - 1, 1));
        if(step === 1) setSelectedDate('');
    };

    const nextMonth = () => {
        setCurrentMonth(new Date(year, month + 1, 1));
        if(step === 1) setSelectedDate('');
    };

    const monthNames = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];

    const getSlots = () => {
        if (!selectedDate) return [];
        return [
            { id: 'fullday', time: 'Sewa 1 Hari Penuh', status: 'available' }
        ];
    };

    const slots = getSlots();

    const handleProceedToCheckout = () => {
        setData('type', selectedPackage);
        setData('booking_date', selectedDate);
        setData('total_price', currentPackageInfo?.numericPrice || 0);
        setStep(2);
    };

    const handleSubmitCheckout = (e: React.FormEvent) => {
        e.preventDefault();
        post('/reservasi', {
            preserveScroll: true,
            onSuccess: (page) => {
                const code = (page.props as any).flash?.booking_code;
                if (code) {
                    setBookingCode(code);
                    setStep(3);
                }
            },
        });
    };

    return (
        <>
            <Head title="Reservasi Bening Jogja" />
            <div className="flex min-h-screen flex-col bg-[#FDFDFC] dark:bg-[#0a0a0a]">
                <LandingHeader auth={auth} />
                
                <main className="flex-grow pt-28 pb-16">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        
                        <div className="mb-10 text-center">
                            <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold text-foreground mb-4">
                                {step === 1 ? 'Cek Ketersediaan & Reservasi' : step === 2 ? 'Checkout & Pembayaran' : 'Reservasi Berhasil'}
                            </h1>
                            <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
                                {step === 1 && 'Pilih paket, tentukan tanggal pada kalender, dan pilih slot yang masih kosong.'}
                                {step === 2 && 'Lengkapi data diri Anda dan unggah bukti transfer pembayaran.'}
                                {step === 3 && 'Terima kasih! Pemesanan Anda sedang kami proses.'}
                            </p>
                        </div>

                        {step === 3 ? (
                            <div className="max-w-2xl mx-auto bg-white dark:bg-zinc-900 rounded-3xl p-8 md:p-12 text-center border border-border/50 shadow-xl animate-in fade-in zoom-in duration-500">
                                <div className="w-24 h-24 bg-emerald-100 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <IconCheck className="w-12 h-12" />
                                </div>
                                <h2 className="text-3xl font-bold mb-2 text-foreground">Pesanan Terkirim!</h2>
                                <p className="text-muted-foreground mb-8 text-lg">Bukti pembayaran Anda telah kami terima dan sedang diverifikasi oleh tim kami.</p>
                                
                                <div className="bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900 rounded-2xl p-6 mb-8 inline-block">
                                    <p className="text-sm font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-widest mb-2">Kode Booking Anda</p>
                                    <p className="text-4xl md:text-5xl font-black text-blue-700 dark:text-blue-500 tracking-wider font-mono">{bookingCode}</p>
                                </div>

                                <p className="text-muted-foreground">
                                    Mohon simpan dan tunjukkan kode booking ini kepada petugas saat kedatangan.<br/>
                                    Kami juga akan menghubungi Anda melalui WhatsApp untuk konfirmasi lebih lanjut.
                                </p>

                                <div className="mt-10 pt-8 border-t border-border">
                                    <a href="/">
                                        <Button size="lg" className="rounded-full px-8 text-base shadow-md h-12 bg-blue-500 hover:bg-blue-600 text-white">
                                            Kembali ke Beranda
                                        </Button>
                                    </a>
                                </div>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                                
                                {/* Left Column */}
                                <div className="lg:col-span-8 space-y-8">
                                    
                                    {step === 1 && (
                                        <>
                                            {/* Package Selection */}
                                            <div className="bg-white dark:bg-zinc-900 rounded-3xl p-4 sm:p-6 md:p-8 border border-border/50 shadow-sm animate-in fade-in slide-in-from-bottom-4 duration-500">
                                                <h3 className="text-lg md:text-xl font-bold text-foreground mb-6">1. Pilih Layanan</h3>
                                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                                    {packages.map((pkg) => (
                                                        <div 
                                                            key={pkg.id}
                                                            onClick={() => {
                                                                setSelectedPackage(pkg.id);
                                                                setSelectedSlot(null);
                                                            }}
                                                            className={`flex flex-col items-center justify-center p-4 rounded-2xl border-2 cursor-pointer transition-all text-center ${
                                                                selectedPackage === pkg.id 
                                                                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-950/30 shadow-md transform scale-[1.02]' 
                                                                    : 'border-border bg-zinc-50 dark:bg-zinc-950 hover:border-blue-300 hover:shadow-sm'
                                                            }`}
                                                        >
                                                            <div className={`p-3 rounded-full mb-3 ${
                                                                selectedPackage === pkg.id ? 'bg-blue-500 text-white' : 'bg-zinc-200 dark:bg-zinc-800 text-muted-foreground'
                                                            }`}>
                                                                {pkg.icon}
                                                            </div>
                                                            <span className={`text-sm md:text-base font-semibold mb-1 ${selectedPackage === pkg.id ? 'text-blue-700 dark:text-blue-400' : 'text-foreground'}`}>
                                                                {pkg.name}
                                                            </span>
                                                            <span className="font-bold text-xs md:text-sm text-muted-foreground">{pkg.price}</span>
                                                            {pkg.description && (
                                                                <p className="text-xs text-muted-foreground mt-2 px-2 hidden sm:block">{pkg.description}</p>
                                                            )}
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>

                                            {/* Calendar Grid */}
                                            <div className="bg-white dark:bg-zinc-900 rounded-3xl p-4 sm:p-6 md:p-8 border border-border/50 shadow-sm animate-in fade-in slide-in-from-bottom-8 duration-500 delay-100">
                                                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 sm:mb-8 gap-4">
                                                    <h3 className="text-lg md:text-xl font-bold text-foreground">2. Pilih Tanggal</h3>
                                                    <div className="flex items-center gap-2 sm:gap-4 bg-zinc-100 dark:bg-zinc-950 rounded-full px-3 py-1.5 sm:px-4 sm:py-2 border border-border w-full sm:w-auto justify-between sm:justify-start">
                                                        <button onClick={prevMonth} className="p-1 hover:text-blue-500 transition-colors">
                                                            <IconChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
                                                        </button>
                                                        <span className="font-bold text-sm sm:text-base min-w-[100px] sm:min-w-[120px] text-center">{monthNames[month]} {year}</span>
                                                        <button onClick={nextMonth} className="p-1 hover:text-blue-500 transition-colors">
                                                            <IconChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
                                                        </button>
                                                    </div>
                                                </div>

                                                <div className="grid grid-cols-7 gap-2 md:gap-3">
                                                    {['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'].map(d => (
                                                        <div key={d} className="text-center font-bold text-xs sm:text-sm text-muted-foreground pb-2">{d}</div>
                                                    ))}
                                                    
                                                    {days.map((day, idx) => {
                                                        if (!day) return <div key={`empty-${idx}`} className="h-16 md:h-24" />;
                                                        
                                                        let bgClass = "bg-white dark:bg-zinc-950 border-border hover:border-blue-400";
                                                        let textClass = "text-foreground";
                                                        
                                                        if (day.status === 'full') {
                                                            bgClass = "bg-zinc-100 dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 opacity-50 cursor-not-allowed";
                                                            textClass = "text-muted-foreground";
                                                        }
                                                        if (day.status === 'past') {
                                                            bgClass = "bg-zinc-50 dark:bg-zinc-950/50 border-transparent opacity-30 cursor-not-allowed";
                                                            textClass = "text-muted-foreground";
                                                        }
                                                        
                                                        const dateStr = `${year}-${String(month+1).padStart(2, '0')}-${String(day.date).padStart(2, '0')}`;
                                                        const isSelected = selectedDate === dateStr;

                                                        if (isSelected) {
                                                            bgClass = "bg-blue-500 text-white border-blue-600 shadow-lg transform scale-[1.05] z-10 relative";
                                                            textClass = "text-white";
                                                        }

                                                        return (
                                                            <div 
                                                                key={idx} 
                                                                onClick={() => {
                                                                    if (day.status === 'available' || day.status === 'partial') {
                                                                        setSelectedDate(dateStr);
                                                                        setSelectedSlot(null);
                                                                    }
                                                                }}
                                                                className={`flex flex-col items-center justify-center p-1 sm:p-2 h-14 sm:h-20 md:h-24 rounded-xl md:rounded-2xl border-2 cursor-pointer transition-all ${bgClass}`}
                                                            >
                                                                <span className={`text-base sm:text-lg md:text-2xl font-black ${textClass}`}>{day.date}</span>
                                                                
                                                                {day.status === 'available' && !isSelected && (
                                                                    <span className="text-[9px] sm:text-[10px] md:text-xs text-emerald-500 font-bold mt-0.5 sm:mt-1 bg-emerald-100 dark:bg-emerald-950/50 px-1.5 sm:px-2 py-0.5 rounded-full leading-none">Kosong</span>
                                                                )}
                                                                {day.status === 'partial' && !isSelected && (
                                                                    <span className="text-[9px] sm:text-[10px] md:text-xs text-amber-500 font-bold mt-0.5 sm:mt-1 bg-amber-100 dark:bg-amber-950/50 px-1.5 sm:px-2 py-0.5 rounded-full leading-none">Sisa 1</span>
                                                                )}
                                                                {day.status === 'full' && (
                                                                    <span className="text-[9px] sm:text-[10px] md:text-xs text-zinc-500 font-bold mt-0.5 sm:mt-1 bg-zinc-200 dark:bg-zinc-800 px-1.5 sm:px-2 py-0.5 rounded-full leading-none">Penuh</span>
                                                                )}
                                                            </div>
                                                        );
                                                    })}
                                                </div>
                                                
                                                {/* Legend */}
                                                <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 mt-6 sm:mt-8 pt-6 border-t border-border/50">
                                                    <div className="flex items-center gap-2">
                                                        <div className="w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-emerald-100 border border-emerald-500"></div>
                                                        <span className="text-xs sm:text-sm text-muted-foreground font-medium">Kosong</span>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <div className="w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-amber-100 border border-amber-500"></div>
                                                        <span className="text-xs sm:text-sm text-muted-foreground font-medium">Sisa Sebagian</span>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <div className="w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-zinc-200 border border-zinc-400"></div>
                                                        <span className="text-xs sm:text-sm text-muted-foreground font-medium">Penuh</span>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <div className="w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-blue-500 border border-blue-600"></div>
                                                        <span className="text-xs sm:text-sm text-muted-foreground font-medium">Pilihan Anda</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </>
                                    )}

                                    {step === 2 && (
                                        <div className="bg-white dark:bg-zinc-900 rounded-3xl p-6 md:p-8 border border-border/50 shadow-sm animate-in fade-in slide-in-from-right-8 duration-500 space-y-8">
                                            <button 
                                                type="button" 
                                                onClick={() => setStep(1)}
                                                className="flex items-center text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                                            >
                                                <IconArrowLeft className="w-4 h-4 mr-2" />
                                                Kembali Pilih Jadwal
                                            </button>

                                            <form id="checkout-form" onSubmit={handleSubmitCheckout} className="space-y-8">
                                                
                                                {/* Data Diri */}
                                                <div>
                                                    <h3 className="text-lg md:text-xl font-bold text-foreground mb-4">Informasi Pemesan</h3>
                                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                        <div className="space-y-2">
                                                            <label className="text-sm font-medium text-foreground">Nama Lengkap</label>
                                                            <input 
                                                                type="text" 
                                                                required
                                                                value={data.customer_name}
                                                                onChange={e => setData('customer_name', e.target.value)}
                                                                className="w-full h-12 px-4 rounded-xl bg-zinc-50 dark:bg-zinc-950 border border-border focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
                                                                placeholder="Nama Sesuai KTP"
                                                            />
                                                            {errors.customer_name && <p className="text-sm text-red-500">{errors.customer_name}</p>}
                                                        </div>
                                                        <div className="space-y-2">
                                                            <label className="text-sm font-medium text-foreground">Email</label>
                                                            <input 
                                                                type="email" 
                                                                required
                                                                value={data.customer_email}
                                                                onChange={e => setData('customer_email', e.target.value)}
                                                                className="w-full h-12 px-4 rounded-xl bg-zinc-50 dark:bg-zinc-950 border border-border focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
                                                                placeholder="email@anda.com"
                                                            />
                                                            {errors.customer_email && <p className="text-sm text-red-500">{errors.customer_email}</p>}
                                                        </div>
                                                        <div className="space-y-2 md:col-span-2">
                                                            <label className="text-sm font-medium text-foreground">No. WhatsApp</label>
                                                            <input 
                                                                type="text" 
                                                                required
                                                                value={data.customer_phone}
                                                                onChange={e => setData('customer_phone', e.target.value)}
                                                                className="w-full h-12 px-4 rounded-xl bg-zinc-50 dark:bg-zinc-950 border border-border focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
                                                                placeholder="081234567890"
                                                            />
                                                            {errors.customer_phone && <p className="text-sm text-red-500">{errors.customer_phone}</p>}
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Pembayaran */}
                                                <div>
                                                    <h3 className="text-lg md:text-xl font-bold text-foreground mb-4">Transfer Pembayaran</h3>
                                                    <div className="bg-zinc-50 dark:bg-zinc-950 rounded-2xl p-6 border border-border flex flex-col md:flex-row gap-6 items-center">
                                                        <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-blue-100 text-blue-600 shrink-0">
                                                            <IconBuildingBank className="w-8 h-8" />
                                                        </div>
                                                        <div className="flex-grow text-center md:text-left">
                                                            <p className="text-sm text-muted-foreground uppercase tracking-widest font-semibold mb-1">Bank BCA</p>
                                                            <p className="text-2xl md:text-3xl font-black text-foreground mb-1 tracking-wider">123 456 7890</p>
                                                            <p className="text-base text-foreground font-medium">a.n. Bening Jogja Official</p>
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Upload Bukti */}
                                                <div>
                                                    <h3 className="text-lg md:text-xl font-bold text-foreground mb-4">Unggah Bukti Transfer</h3>
                                                    <label className="flex flex-col items-center justify-center w-full h-48 border-2 border-border border-dashed rounded-2xl cursor-pointer bg-zinc-50 dark:bg-zinc-950 hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors">
                                                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                                            <IconUpload className="w-10 h-10 text-muted-foreground mb-3" />
                                                            <p className="mb-2 text-sm text-muted-foreground font-semibold">
                                                                {data.payment_proof ? data.payment_proof.name : 'Klik untuk mengunggah gambar'}
                                                            </p>
                                                            <p className="text-xs text-muted-foreground">PNG, JPG atau JPEG (Maks. 5MB)</p>
                                                        </div>
                                                        <input 
                                                            type="file" 
                                                            className="hidden" 
                                                            accept="image/png, image/jpeg, image/jpg"
                                                            onChange={e => setData('payment_proof', e.target.files ? e.target.files[0] : null)}
                                                        />
                                                    </label>
                                                    {errors.payment_proof && <p className="text-sm text-red-500 mt-2">{errors.payment_proof}</p>}
                                                </div>
                                            </form>
                                        </div>
                                    )}

                                </div>

                                {/* Right Column: Summary (Sticky) */}
                                <div className="lg:col-span-4">
                                    <div className="bg-white dark:bg-zinc-900 rounded-3xl p-4 sm:p-6 md:p-8 border border-border/50 shadow-xl sticky top-24 flex flex-col min-h-[400px] sm:min-h-[500px]">
                                        <h3 className="text-lg md:text-xl font-bold text-foreground mb-6">Ringkasan Pesanan</h3>
                                        
                                        {!selectedDate ? (
                                            <div className="flex-grow flex flex-col items-center justify-center text-center p-6 border-2 border-dashed border-border rounded-2xl bg-zinc-50/50 dark:bg-zinc-950/50">
                                                <IconCalendarEvent className="w-16 h-16 text-muted-foreground/50 mb-4" />
                                                <h4 className="text-lg font-semibold text-foreground mb-2">Tanggal Belum Dipilih</h4>
                                                <p className="text-muted-foreground text-sm">Pilih salah satu tanggal yang berstatus "Kosong" atau "Sisa 1" di kalender.</p>
                                            </div>
                                        ) : (
                                            <div className="flex-grow flex flex-col">
                                                
                                                <div className="space-y-4 mb-8">
                                                    <div>
                                                        <p className="text-sm font-medium text-muted-foreground mb-1">Paket Pilihan</p>
                                                        <p className="text-lg font-bold text-foreground flex items-center gap-2">
                                                            {currentPackageInfo?.icon} {currentPackageInfo?.name}
                                                        </p>
                                                    </div>
                                                    
                                                    <div className="h-px bg-border/50 w-full" />
                                                    
                                                    <div>
                                                        <p className="text-sm font-medium text-muted-foreground mb-1">Tanggal Sewa</p>
                                                        <p className="text-lg font-bold text-foreground">
                                                            {new Date(selectedDate).toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                                                        </p>
                                                    </div>

                                                    <div className="h-px bg-border/50 w-full" />

                                                    <div>
                                                        <p className="text-sm font-medium text-muted-foreground mb-1">Slot Waktu</p>
                                                        <div className="flex items-center justify-between">
                                                            <p className="text-lg font-bold text-foreground">Sewa 1 Hari Penuh</p>
                                                            {selectedSlot && (
                                                                <div className="bg-blue-500 text-white rounded-full p-1 shadow-sm">
                                                                    <IconCheck className="w-4 h-4" />
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Summary & Checkout Action */}
                                                <div className="mt-auto pt-6 border-t border-border flex flex-col gap-4">
                                                    <div className="flex justify-between items-end">
                                                        <p className="text-muted-foreground text-sm font-medium">Total Tagihan</p>
                                                        <p className="text-2xl font-black text-foreground">
                                                            {currentPackageInfo?.price}
                                                        </p>
                                                    </div>
                                                    
                                                    {step === 1 ? (
                                                        <Button 
                                                            size="lg" 
                                                            onClick={() => {
                                                                setSelectedSlot('fullday');
                                                                handleProceedToCheckout();
                                                            }}
                                                            className="w-full h-14 text-base rounded-full shadow-lg transition-all bg-blue-500 hover:bg-blue-600 text-white"
                                                        >
                                                            Lanjut Pembayaran
                                                        </Button>
                                                    ) : (
                                                        <Button 
                                                            size="lg"
                                                            type="submit"
                                                            form="checkout-form"
                                                            disabled={processing || !data.payment_proof}
                                                            className="w-full h-14 text-base rounded-full shadow-lg transition-all bg-blue-500 hover:bg-blue-600 text-white"
                                                        >
                                                            {processing ? 'Memproses...' : 'Kirim Bukti Pembayaran'}
                                                        </Button>
                                                    )}
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
