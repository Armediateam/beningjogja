import { Head, Link, usePage } from '@inertiajs/react';
import { dashboard, login } from '@/routes';
import { register } from '@/routes';
import { LandingHeader } from '@/components/landing-header';
import { LandingFooter } from '@/components/landing-footer';
import { HeroSection } from '@/components/hero-section';
import { FeaturesSection } from '@/components/features-section';
import { VillaCatalogSection } from '@/components/villa-catalog-section';
import { AboutSection } from '@/components/about-section';
import { GallerySection } from '@/components/gallery-section';
import { TestimonialSection } from '@/components/testimonial-section';
import { CtaSection } from '@/components/cta-section';

export default function Welcome({ pricings = [] }: { pricings?: any[] }) {
    const { auth } = usePage<any>().props;

    return (
        <>
            <Head title="Welcome" />
            <div className="flex min-h-screen flex-col bg-[#FDFDFC] dark:bg-[#0a0a0a]">
                <LandingHeader auth={auth} />
                <HeroSection />
                <FeaturesSection />
                <VillaCatalogSection pricings={pricings} />
                <AboutSection />
                <GallerySection />
                <TestimonialSection />
                <CtaSection />
                <LandingFooter />
            </div>
        </>
    );
}
