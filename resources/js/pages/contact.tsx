import { Head, usePage } from '@inertiajs/react';
import { LandingHeader } from '@/components/landing-header';
import { LandingFooter } from '@/components/landing-footer';
import { ContactSection } from '@/components/contact-section';

export default function Contact() {
    const { auth } = usePage<any>().props;

    return (
        <>
            <Head title="Hubungi Kami" />
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
