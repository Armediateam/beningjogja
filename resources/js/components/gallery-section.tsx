import { IconZoomIn } from '@tabler/icons-react';

const galleryImages = [
    {
        src: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?q=80&w=2080&auto=format&fit=crop',
        alt: 'Kamar Tidur Utama',
        span: 'md:col-span-2 md:row-span-2',
    },
    {
        src: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2070&auto=format&fit=crop',
        alt: 'Fasilitas Gym',
        span: 'col-span-1 row-span-1',
    },
    {
        src: 'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?q=80&w=2070&auto=format&fit=crop',
        alt: 'Ruang Keluarga Mewah',
        span: 'col-span-1 row-span-1',
    },
    {
        src: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=2070&auto=format&fit=crop',
        alt: 'Kolam Renang Tropis',
        span: 'md:col-span-2 md:row-span-1',
    },
    {
        src: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2075&auto=format&fit=crop',
        alt: 'Area Eksterior',
        span: 'col-span-1 row-span-1',
    },
    {
        src: 'https://images.unsplash.com/photo-1600607687920-4e2a09be1587?q=80&w=2070&auto=format&fit=crop',
        alt: 'Taman Asri',
        span: 'col-span-1 row-span-1',
    },
];

export function GallerySection() {
    return (
        <section className="py-24 bg-zinc-50 dark:bg-zinc-950/30">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                
                {/* Section Header */}
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-sm font-semibold text-blue-500 uppercase tracking-widest mb-3">
                        Galeri Kami
                    </h2>
                    <h3 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                        Menjelajahi Keindahan Bening Jogja
                    </h3>
                    <p className="text-lg text-muted-foreground">
                        Lihat lebih dekat setiap sudut villa kami yang dirancang dengan dedikasi untuk memberikan kenyamanan berkelas.
                    </p>
                </div>

                {/* Gallery Grid */}
                <div className="grid grid-cols-1 md:grid-cols-4 auto-rows-[250px] gap-4">
                    {galleryImages.map((image, index) => (
                        <div 
                            key={index}
                            className={`group relative rounded-2xl overflow-hidden cursor-pointer bg-zinc-200 dark:bg-zinc-800 ${image.span}`}
                        >
                            <img 
                                src={image.src} 
                                alt={image.alt}
                                className="object-cover w-full h-full transition-transform duration-700 ease-out group-hover:scale-110"
                            />
                            
                            {/* Overlay */}
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-500" />
                            
                            {/* Hover Content */}
                            <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                <div className="bg-white/20 backdrop-blur-md p-3 rounded-full mb-3 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                                    <IconZoomIn className="text-white h-6 w-6" />
                                </div>
                                <span className="text-white font-semibold tracking-wide translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-75">
                                    {image.alt}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Optional Call to Action */}
                <div className="mt-12 text-center">
                    <button className="text-sm font-semibold text-foreground hover:text-blue-500 transition-colors uppercase tracking-wider underline underline-offset-8">
                        Lihat Semua Foto
                    </button>
                </div>

            </div>
        </section>
    );
}
