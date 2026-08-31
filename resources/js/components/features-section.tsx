import { IconPool, IconMapPin, IconLeaf, IconHeartHandshake } from '@tabler/icons-react';

const features = [
    {
        title: 'Private Pool Eksklusif',
        description: 'Nikmati privasi maksimal dengan kolam renang pribadi di setiap villa, dirancang khusus untuk kenyamanan Anda dan keluarga.',
        icon: <IconPool className="h-8 w-8 text-amber-500" stroke={1.5} />,
    },
    {
        title: 'Lokasi Strategis',
        description: 'Terletak di area yang tenang namun tetap mudah dijangkau dari pusat kota Yogyakarta dan berbagai destinasi wisata populer.',
        icon: <IconMapPin className="h-8 w-8 text-amber-500" stroke={1.5} />,
    },
    {
        title: 'Pelayanan 24/7',
        description: 'Tim kami berdedikasi untuk memberikan pelayanan kelas satu kapan pun Anda butuhkan, memastikan liburan Anda tanpa hambatan.',
        icon: <IconHeartHandshake className="h-8 w-8 text-amber-500" stroke={1.5} />,
    },
    {
        title: 'Desain Tropis Modern',
        description: 'Arsitektur villa yang memadukan keindahan alam tropis dengan fasilitas modern, menciptakan suasana rileks yang sempurna.',
        icon: <IconLeaf className="h-8 w-8 text-amber-500" stroke={1.5} />,
    },
];

export function FeaturesSection() {
    return (
        <section className="py-24 bg-zinc-50 dark:bg-zinc-900/50">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                
                {/* Section Header */}
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-sm font-semibold text-amber-500 uppercase tracking-widest mb-3">
                        Kenapa Bening Jogja?
                    </h2>
                    <h3 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                        Lebih dari Sekadar Tempat Menginap
                    </h3>
                    <p className="text-lg text-muted-foreground">
                        Kami menghadirkan standar baru dalam liburan Anda. Setiap detail dirancang untuk memberikan pengalaman bermalam yang mewah, nyaman, dan tak terlupakan.
                    </p>
                </div>

                {/* Features Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {features.map((feature, index) => (
                        <div 
                            key={index}
                            className="bg-white dark:bg-zinc-950 rounded-2xl p-8 shadow-sm border border-border/50 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group"
                        >
                            <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-xl bg-amber-50 dark:bg-amber-950/30 group-hover:scale-110 transition-transform duration-300">
                                {feature.icon}
                            </div>
                            <h4 className="text-xl font-bold text-foreground mb-3">
                                {feature.title}
                            </h4>
                            <p className="text-muted-foreground leading-relaxed">
                                {feature.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
