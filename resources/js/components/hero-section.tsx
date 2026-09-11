import { Link } from '@inertiajs/react';
import { Button } from './ui/button';
import { ArrowRight, ShieldCheck, Users, Sparkles, MapPin } from 'lucide-react';
import { IconHome, IconSwimming } from '@tabler/icons-react';
import { useTranslation } from '@/lib/language-context';

const copy = {
    id: {
        greeting: 'Selamat datang di',
        brand: 'Bening',
        subtitle: 'Pengalaman menginap / berenang bersama keluarga atau pasangan dengan fasilitas premium, desain bohemian modern, dan pelayanan profesional kelas satu bersama Bening Jogja.',
        villaTitle: 'Sewa Villa',
        villaDesc: 'Nikmati kenyamanan menginap di villa privat dengan fasilitas lengkap.',
        villaCta: 'Lihat Villa',
        poolTitle: 'Sewa Kolam Renang',
        poolDesc: 'Sewa kolam renang privat per jam untuk bersantai dan bermain bersama.',
        poolCta: 'Lihat Kolam Renang',
        features: [
            { title: 'Privat & Nyaman', desc: 'Hanya untuk Anda dan orang terdekat' },
            { title: 'Cocok untuk Semua', desc: 'Keluarga, pasangan, teman, hingga acara kecil' },
            { title: 'Fasilitas Lengkap', desc: 'Semua yang Anda butuhkan tersedia di sini' },
            { title: 'Lokasi Strategis', desc: 'Mudah dijangkau di Bantul, Yogyakarta' },
        ],
    },
    en: {
        greeting: 'Welcome to',
        brand: 'Bening',
        subtitle: 'A memorable stay / swim experience with family or partner, featuring premium facilities, modern bohemian design, and first-class professional service by Bening Jogja.',
        villaTitle: 'Rent a Villa',
        villaDesc: 'Enjoy a comfortable stay in a private villa with complete facilities.',
        villaCta: 'View Villas',
        poolTitle: 'Rent the Pool',
        poolDesc: 'Rent a private pool by the hour to relax and play together.',
        poolCta: 'View Pool Rental',
        features: [
            { title: 'Private & Comfortable', desc: 'Just for you and your loved ones' },
            { title: 'Great for Everyone', desc: 'Families, couples, friends, small events' },
            { title: 'Complete Facilities', desc: 'Everything you need is available here' },
            { title: 'Strategic Location', desc: 'Easy to reach in Bantul, Yogyakarta' },
        ],
    },
};

export function HeroSection() {
    const t = useTranslation(copy);
    const featureIcons = [ShieldCheck, Users, Sparkles, MapPin];

    return (
        <section className="relative w-full min-h-[900px] flex items-start justify-center overflow-hidden pt-28 pb-32 md:pt-36 md:pb-40">
            {/* Background Image */}
            <div
                className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat"
                style={{ backgroundImage: "url('/hero-bg.jpg')" }}
            />

            {/* Light overlay so the light-toned card content stays legible */}
            <div className="absolute inset-0 bg-gradient-to-b from-white/70 via-white/40 to-white/80 dark:from-black/60 dark:via-black/40 dark:to-black/70" />

            {/* Content Container */}
            <div className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
                <p
                    className="text-2xl md:text-3xl text-blue-800 dark:text-blue-300 mb-1 animate-in fade-in slide-in-from-bottom-4 duration-700"
                    style={{ fontFamily: "'Dancing Script', cursive" }}
                >
                    {t.greeting}
                </p>
                <h1 className="text-6xl md:text-8xl font-bold tracking-tight text-blue-900 dark:text-blue-200 mb-6 animate-in fade-in slide-in-from-bottom-6 duration-700 delay-150">
                    {t.brand}
                </h1>

                <p className="text-base md:text-lg text-zinc-700 dark:text-zinc-200 mb-10 max-w-2xl leading-relaxed animate-in fade-in slide-in-from-bottom-8 duration-700 delay-300">
                    {t.subtitle}
                </p>

                {/* Service Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full max-w-3xl mb-12 animate-in fade-in slide-in-from-bottom-10 duration-700 delay-500">
                    <div className="flex flex-col items-center bg-white/90 dark:bg-zinc-950/90 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/50">
                        <div className="h-16 w-16 rounded-full bg-blue-50 dark:bg-blue-950/50 flex items-center justify-center mb-4 text-blue-700 dark:text-blue-400">
                            <IconHome className="h-8 w-8" stroke={1.5} />
                        </div>
                        <h3 className="text-xl font-bold text-foreground mb-2">{t.villaTitle}</h3>
                        <p className="text-sm text-muted-foreground mb-6">{t.villaDesc}</p>
                        <Link href="/villa" className="w-full">
                            <Button size="lg" className="w-full rounded-full h-12 bg-blue-800 hover:bg-blue-900 text-white">
                                {t.villaCta}
                                <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                        </Link>
                    </div>

                    <div className="flex flex-col items-center bg-white/90 dark:bg-zinc-950/90 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/50">
                        <div className="h-16 w-16 rounded-full bg-blue-50 dark:bg-blue-950/50 flex items-center justify-center mb-4 text-blue-700 dark:text-blue-400">
                            <IconSwimming className="h-8 w-8" stroke={1.5} />
                        </div>
                        <h3 className="text-xl font-bold text-foreground mb-2">{t.poolTitle}</h3>
                        <p className="text-sm text-muted-foreground mb-6">{t.poolDesc}</p>
                        <Link href="/kolam-renang" className="w-full">
                            <Button size="lg" className="w-full rounded-full h-12 bg-blue-800 hover:bg-blue-900 text-white">
                                {t.poolCta}
                                <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                        </Link>
                    </div>
                </div>

                {/* Quick Facts */}
                <div className="w-full bg-white/95 dark:bg-zinc-950/95 backdrop-blur-sm rounded-3xl shadow-lg border border-white/50 px-6 py-8 grid grid-cols-2 md:grid-cols-4 gap-6 animate-in fade-in slide-in-from-bottom-12 duration-700 delay-700">
                    {t.features.map((feature, idx) => {
                        const Icon = featureIcons[idx];
                        return (
                            <div key={feature.title} className="flex items-start gap-3 text-left">
                                <Icon className="h-6 w-6 text-blue-700 dark:text-blue-400 shrink-0 mt-0.5" />
                                <div>
                                    <p className="text-sm font-bold text-foreground leading-tight">{feature.title}</p>
                                    <p className="text-xs text-muted-foreground leading-snug mt-0.5">{feature.desc}</p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
