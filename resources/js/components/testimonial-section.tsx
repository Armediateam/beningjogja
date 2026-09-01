import { IconStarFilled } from '@tabler/icons-react';

const testimonials = [
    {
        name: 'Budi Santoso',
        role: 'Keluarga, Jakarta',
        text: 'Menginap di Bening Villa adalah keputusan terbaik untuk liburan keluarga kami. Fasilitas lengkap, private pool sangat bersih, dan lokasinya strategis namun tetap tenang dari kebisingan kota.',
        rating: 5,
        avatar: 'B'
    },
    {
        name: 'Sarah & Dimas',
        role: 'Pasangan, Bandung',
        text: 'Kami menyewa villa beserta fasilitas private pool untuk anniversary. Suasananya sangat romantis, desain arsitekturnya indah, dan pelayanan staf luar biasa ramah 24 jam.',
        rating: 5,
        avatar: 'S'
    },
    {
        name: 'Rina Wijaya',
        role: 'Grup Teman, Surabaya',
        text: 'Sewa area kolam renangnya sangat worth it untuk pool party kecil-kecilan! Tempatnya sangat private, instagenic untuk foto-foto, dan fasilitas BBQ-nya sangat membantu.',
        rating: 5,
        avatar: 'R'
    },
];

export function TestimonialSection() {
    return (
        <section className="py-24 bg-white dark:bg-zinc-950 border-t border-border/50">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                
                {/* Section Header */}
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-sm font-semibold text-blue-500 uppercase tracking-widest mb-3">
                        Apa Kata Mereka
                    </h2>
                    <h3 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                        Cerita Tamu Bening Jogja
                    </h3>
                    <p className="text-lg text-muted-foreground">
                        Kebahagiaan dan kepuasan tamu adalah prioritas kami. Simak pengalaman berkesan mereka selama menginap dan bersantai di Bening Jogja.
                    </p>
                </div>

                {/* Testimonial Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {testimonials.map((testimonial, index) => (
                        <div 
                            key={index}
                            className="flex flex-col bg-zinc-50 dark:bg-zinc-900 rounded-3xl p-8 border border-border/50 hover:-translate-y-2 hover:shadow-xl transition-all duration-300 relative group"
                        >
                            {/* Decorative Quote Icon (Watermark) */}
                            <div className="absolute top-6 right-6 text-6xl font-serif text-blue-500/10 dark:text-blue-500/5 group-hover:scale-110 transition-transform duration-300 select-none pointer-events-none">
                                "
                            </div>

                            {/* Stars */}
                            <div className="flex items-center gap-1 mb-6">
                                {[...Array(testimonial.rating)].map((_, i) => (
                                    <IconStarFilled key={i} className="h-5 w-5 text-blue-400" />
                                ))}
                            </div>

                            {/* Review Text */}
                            <p className="text-muted-foreground leading-relaxed flex-grow italic mb-8 relative z-10">
                                "{testimonial.text}"
                            </p>

                            {/* Author Info */}
                            <div className="flex items-center gap-4 mt-auto">
                                <div className="h-12 w-12 rounded-full bg-gradient-to-br from-blue-200 to-blue-500 flex items-center justify-center text-blue-950 font-bold text-lg shadow-sm">
                                    {testimonial.avatar}
                                </div>
                                <div>
                                    <h4 className="text-foreground font-bold">{testimonial.name}</h4>
                                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Optional: Call to Action below testimonials */}
                <div className="mt-16 text-center">
                    <p className="text-foreground font-medium mb-2">Punya pengalaman luar biasa bersama kami?</p>
                    <a href="#" className="text-blue-500 hover:text-blue-600 font-semibold underline underline-offset-4 transition-colors">
                        Tinggalkan Ulasan di Google
                    </a>
                </div>

            </div>
        </section>
    );
}
