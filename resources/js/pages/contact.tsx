import { Head, usePage } from '@inertiajs/react';
import { LandingHeader } from '@/components/landing-header';
import { LandingFooter } from '@/components/landing-footer';
import { ContactSection } from '@/components/contact-section';

export default function Contact() {
    const { auth } = usePage<any>().props;

    return (
        <>
            <Head title="Hubungi Kami - Bening Jogja">
                <meta name="description" content="Hubungi Bening Jogja untuk informasi reservasi villa dan private pool, pertanyaan fasilitas, atau kerja sama. Tim kami siap membantu Anda merencanakan liburan terbaik di Yogyakarta." />
            </Head>
            <div className="flex min-h-screen flex-col bg-[#FDFDFC] dark:bg-[#0a0a0a]">
                <LandingHeader auth={auth} />
                
                {/* Main Content Area */}
                <main className="flex-grow pt-16">
                    <ContactSection />
                </main>

                <LandingFooter />
            </div>
        </>
    );
}
