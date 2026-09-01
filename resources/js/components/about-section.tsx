import { IconCheck } from '@tabler/icons-react';

const stats = [
    { label: 'Tamu Bahagia', value: '1.200+' },
    { label: 'Ulasan Positif', value: '4.9/5' },
    { label: 'Lokasi Strategis', value: '15 Mnt' },
];

export function AboutSection() {
    return (
        <section className="relative py-24 bg-zinc-50 dark:bg-zinc-900/50 overflow-hidden" id="tentang-kami">
            {/* Background Decorations */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute -top-[20%] -right-[10%] w-[50%] h-[50%] rounded-full bg-blue-500/5 blur-[120px] mix-blend-multiply dark:mix-blend-screen" />
                <div className="absolute -bottom-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-blue-500/5 blur-[120px] mix-blend-multiply dark:mix-blend-screen" />
            </div>

            <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    
                    {/* Image/Visual Column */}
                    <div className="relative order-2 lg:order-1">
                        <div className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl">
                            <img 
                                src="https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?q=80&w=2070&auto=format&fit=crop" 
                                alt="Fasilitas Bening Jogja" 
                                className="object-cover w-full h-full hover:scale-105 transition-transform duration-1000"
                            />
                            {/* Glassmorphism Badge */}
                            <div className="absolute bottom-6 left-6 right-6 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md rounded-2xl p-6 border border-white/20 shadow-lg">
                                <p className="text-lg font-bold text-foreground mb-1">
                                    "Pengalaman menginap terbaik di Jogja!"
                                </p>
                                <div className="flex items-center gap-3 mt-4">
                                    <div className="h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center text-blue-600 font-bold">
                                        A
                                    </div>
                                    <div>
                                        <p className="text-sm font-semibold text-foreground">Ahmad S.</p>
                                        <p className="text-xs text-muted-foreground">Google Review</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* Decorative Blob */}
                        <div className="absolute -z-10 -top-8 -left-8 w-64 h-64 bg-blue-200/40 dark:bg-blue-900/20 rounded-full blur-3xl" />
                    </div>

                    {/* Content Column */}
                    <div className="order-1 lg:order-2 flex flex-col justify-center">
                        <h2 className="text-sm font-semibold text-blue-500 uppercase tracking-widest mb-3">
                            Tentang Kami
                        </h2>
                        <h3 className="text-3xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
                            Mendefinisikan Ulang Ketenangan di Jogja
                        </h3>
                        <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                            Bening Jogja bermula dari sebuah visi sederhana: menciptakan oase ketenangan di tengah dinamisnya kota Yogyakarta. Kami memadukan keramahtamahan lokal dengan standar fasilitas premium untuk memastikan setiap tamu merasa seperti berada di rumah kedua.
                        </p>
                        
                        <div className="space-y-4 mb-10">
                            {[
                                'Privasi terjamin untuk liburan keluarga atau pasangan',
                                'Kebersihan dan kenyamanan adalah prioritas utama kami',
                                'Akses mudah ke berbagai destinasi wisata ikonik Jogja'
                            ].map((item, index) => (
                                <div key={index} className="flex items-start gap-4 group">
                                    <div className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/40 text-blue-600 group-hover:bg-blue-500 group-hover:text-white transition-colors">
                                        <IconCheck className="h-4 w-4" />
                                    </div>
                                    <p className="text-foreground">{item}</p>
                                </div>
                            ))}
                        </div>

                        {/* Stats */}
                        <div className="grid grid-cols-3 gap-6 pt-8 border-t border-border/50">
                            {stats.map((stat, index) => (
                                <div key={index} className="flex flex-col gap-1">
                                    <span className="text-3xl font-black text-foreground">
                                        {stat.value}
                                    </span>
                                    <span className="text-sm text-muted-foreground font-medium">
                                        {stat.label}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
