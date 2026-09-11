import { Head, Link, usePage } from '@inertiajs/react';
import { LandingHeader } from '@/components/landing-header';
import { LandingFooter } from '@/components/landing-footer';
import { Button } from '@/components/ui/button';
import { IconHome, IconSwimming } from '@tabler/icons-react';
import { ArrowRight } from 'lucide-react';
import { useTranslation } from '@/lib/language-context';

const copy = {
    id: {
        title: 'Reservasi',
        subtitle: 'Pilih layanan yang ingin Anda pesan.',
        villaTitle: 'Sewa Villa',
        villaDesc: 'Pilih tipe kamar, tentukan tanggal menginap, dan konfirmasi via WhatsApp.',
        villaCta: 'Lihat Villa',
        poolTitle: 'Sewa Kolam Renang',
        poolDesc: 'Pilih tanggal dan sesi yang tersedia, lalu konfirmasi via WhatsApp.',
        poolCta: 'Lihat Kolam Renang',
    },
    en: {
        title: 'Reservation',
        subtitle: 'Choose the service you would like to book.',
        villaTitle: 'Rent a Villa',
        villaDesc: 'Choose a room type, pick your stay dates, and confirm via WhatsApp.',
        villaCta: 'View Villas',
        poolTitle: 'Rent the Pool',
        poolDesc: 'Choose an available date and session, then confirm via WhatsApp.',
        poolCta: 'View Pool Rental',
    },
};

export default function Reservation() {
    const { auth } = usePage<any>().props;
    const t = useTranslation(copy);

    return (
        <>
            <Head title="Reservasi - Bening Jogja">
                <meta name="description" content="Pilih layanan Bening Jogja yang ingin Anda pesan: sewa villa atau sewa kolam renang privat." />
            </Head>
            <div className="flex min-h-screen flex-col bg-[#FDFDFC] dark:bg-[#0a0a0a]">
                <LandingHeader auth={auth} />

                <main className="flex-grow pt-28 pb-16 flex items-center">
                    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 w-full">
                        <div className="mb-10 text-center">
                            <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold text-foreground mb-4">{t.title}</h1>
                            <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">{t.subtitle}</p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div className="flex flex-col items-center bg-white dark:bg-zinc-900 rounded-3xl p-8 shadow-sm border border-border/50">
                                <div className="h-16 w-16 rounded-full bg-blue-50 dark:bg-blue-950/50 flex items-center justify-center mb-4 text-blue-700 dark:text-blue-400">
                                    <IconHome className="h-8 w-8" stroke={1.5} />
                                </div>
                                <h3 className="text-xl font-bold text-foreground mb-2">{t.villaTitle}</h3>
                                <p className="text-sm text-muted-foreground mb-6 text-center">{t.villaDesc}</p>
                                <Link href="/villa" className="w-full">
                                    <Button size="lg" className="w-full rounded-full h-12 bg-blue-800 hover:bg-blue-900 text-white">
                                        {t.villaCta}
                                        <ArrowRight className="ml-2 h-4 w-4" />
                                    </Button>
                                </Link>
                            </div>

                            <div className="flex flex-col items-center bg-white dark:bg-zinc-900 rounded-3xl p-8 shadow-sm border border-border/50">
                                <div className="h-16 w-16 rounded-full bg-blue-50 dark:bg-blue-950/50 flex items-center justify-center mb-4 text-blue-700 dark:text-blue-400">
                                    <IconSwimming className="h-8 w-8" stroke={1.5} />
                                </div>
                                <h3 className="text-xl font-bold text-foreground mb-2">{t.poolTitle}</h3>
                                <p className="text-sm text-muted-foreground mb-6 text-center">{t.poolDesc}</p>
                                <Link href="/kolam-renang" className="w-full">
                                    <Button size="lg" className="w-full rounded-full h-12 bg-blue-800 hover:bg-blue-900 text-white">
                                        {t.poolCta}
                                        <ArrowRight className="ml-2 h-4 w-4" />
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </main>

                <LandingFooter />
            </div>
        </>
    );
}
