import { Head, usePage } from '@inertiajs/react';
import { LandingHeader } from '@/components/landing-header';
import { LandingFooter } from '@/components/landing-footer';
import { AboutHeroSection } from '@/components/about-hero-section';
import { AboutSection } from '@/components/about-section';
import { GallerySection } from '@/components/gallery-section';
import { TestimonialSection } from '@/components/testimonial-section';
import { CtaSection } from '@/components/cta-section';

export default function About() {
    const { auth } = usePage<any>().props;

    return (
        <>
            <Head title="Tentang Kami" />
            <div className="flex min-h-screen flex-col bg-[#FDFDFC] dark:bg-[#0a0a0a]">
                <LandingHeader auth={auth} />
                
                <AboutHeroSection />

                {/* Main Content Area */}
                <main className="flex-grow pb-16">
                    {/* We reuse the rich AboutSection here. It already has great glassmorphism and stats. */}
                    <AboutSection />
                    
                    {/* Vision & Mission Section */}
                    <section className="py-24 bg-white dark:bg-zinc-950">
                        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center">
                            <h2 className="text-3xl font-bold text-foreground mb-8">Visi & Misi Kami</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-left">
                                <div className="bg-zinc-50 dark:bg-zinc-900 p-8 rounded-3xl border border-border/50 shadow-sm hover:shadow-md transition-shadow">
                                    <h3 className="text-xl font-bold text-amber-500 mb-4">Visi</h3>
                                    <p className="text-muted-foreground leading-relaxed">
                                        Menjadi penyedia layanan akomodasi villa terkemuka di Yogyakarta yang dikenal karena inovasi fasilitas, desain yang selaras dengan alam, dan pelayanan pelanggan yang tak tertandingi.
                                    </p>
                                </div>
                                <div className="bg-zinc-50 dark:bg-zinc-900 p-8 rounded-3xl border border-border/50 shadow-sm hover:shadow-md transition-shadow">
                                    <h3 className="text-xl font-bold text-amber-500 mb-4">Misi</h3>
                                    <ul className="text-muted-foreground leading-relaxed space-y-2 list-disc list-inside">
                                        <li>Memberikan pengalaman menginap yang nyaman, aman, dan privat.</li>
                                        <li>Menjaga standar kebersihan dan pemeliharaan fasilitas pada tingkat tertinggi.</li>
                                        <li>Turut mempromosikan pariwisata Yogyakarta melalui keramahtamahan lokal.</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </section>

                    <GallerySection />
                    <TestimonialSection />
                    <CtaSection />
                </main>

                <LandingFooter />
            </div>
        </>
    );
}
