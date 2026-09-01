import { Head, usePage } from '@inertiajs/react';
import { LandingHeader } from '@/components/landing-header';
import { LandingFooter } from '@/components/landing-footer';
import { FacilityHeroSection } from '@/components/facility-hero-section';
import { FacilityListSection } from '@/components/facility-list-section';
import { CtaSection } from '@/components/cta-section';

export default function Facility() {
    const { auth } = usePage<any>().props;

    return (
        <>
            <Head title="Fasilitas" />
            <div className="flex min-h-screen flex-col bg-[#FDFDFC] dark:bg-[#0a0a0a]">
                <LandingHeader auth={auth} />
                
                <FacilityHeroSection />

                {/* Main Content Area */}
                <main className="flex-grow">
                    <FacilityListSection />
                    <CtaSection />
                </main>

                <LandingFooter />
            </div>
        </>
    );
}
