import { IconCheck } from '@tabler/icons-react';

const facilities = [
    {
        id: 1,
        title: 'Private Pool & Taman Tropis',
        description: 'Nikmati privasi berenang kapan saja di kolam renang pribadi dengan sirkulasi air jernih. Dikelilingi taman tropis yang rimbun, area ini menjadi tempat favorit untuk bersantai di sore hari atau menggelar acara kecil bersama keluarga.',
        image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=2070&auto=format&fit=crop',
        features: ['Kolam sedalam 1.5 meter', 'Area anak (wading pool)', 'Kursi santai pinggir kolam', 'Lampu taman eksotis malam hari'],
    },
    {
        id: 2,
        title: 'Kamar Tidur Utama Mewah',
        description: 'Setiap kamar dirancang dengan memperhatikan detail kenyamanan layaknya hotel bintang lima. Menggunakan kasur premium berukuran King-size, jendela besar dengan pencahayaan alami, dan sistem pendingin udara yang sejuk.',
        image: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?q=80&w=2070&auto=format&fit=crop',
        features: ['Kasur King Size Premium', 'Kamar Mandi Dalam (En-suite)', 'Smart TV & Wi-Fi', 'Balkon Pribadi'],
    },
    {
        id: 3,
        title: 'Dapur & Ruang Makan Terbuka',
        description: 'Fasilitas dapur kami dilengkapi dengan peralatan masak modern. Anda bisa memasak hidangan favorit keluarga dan menyantapnya di area ruang makan dengan konsep semi-terbuka yang menghadap langsung ke arah kolam renang.',
        image: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?q=80&w=2070&auto=format&fit=crop',
        features: ['Kulkas 2 Pintu & Microwave', 'Kompor Gas & Alat Masak Lengkap', 'Meja Makan Kapasitas 8 Orang', 'Dispenser Air Panas/Dingin'],
    },
    {
        id: 4,
        title: 'Area Hiburan & BBQ',
        description: 'Momen kebersamaan semakin hangat dengan fasilitas pemanggang BBQ yang telah kami sediakan. Tersedia juga ruang keluarga yang luas lengkap dengan sofa empuk, konsol permainan, dan sound system berkualitas.',
        image: 'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?q=80&w=2070&auto=format&fit=crop',
        features: ['Pemanggang BBQ Premium', 'Ruang Keluarga dengan Smart TV 65"', 'Sofa L-Shape Besar', 'Board Games & Karaoke'],
    }
];

export function FacilityListSection() {
    return (
        <section className="py-24 bg-white dark:bg-zinc-950">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                
                <div className="flex flex-col gap-24">
                    {facilities.map((facility, index) => {
                        const isEven = index % 2 !== 0;
                        
                        return (
                            <div key={facility.id} className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
                                
                                {/* Image Container */}
                                <div className={`w-full lg:w-1/2 ${isEven ? 'lg:order-2' : 'lg:order-1'}`}>
                                    <div className="relative rounded-3xl overflow-hidden shadow-2xl aspect-[4/3] group">
                                        <img 
                                            src={facility.image} 
                                            alt={facility.title}
                                            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                                        />
                                        <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500" />
                                    </div>
                                </div>

                                {/* Text Content */}
                                <div className={`w-full lg:w-1/2 ${isEven ? 'lg:order-1' : 'lg:order-2'}`}>
                                    <div className="flex items-center gap-4 mb-4">
                                        <span className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/40 text-blue-600 font-bold text-xl">
                                            0{facility.id}
                                        </span>
                                        <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                                            {facility.title}
                                        </h2>
                                    </div>
                                    
                                    <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                                        {facility.description}
                                    </p>

                                    {/* Features Grid */}
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        {facility.features.map((feature, idx) => (
                                            <div key={idx} className="flex items-start gap-3">
                                                <div className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600">
                                                    <IconCheck className="h-4 w-4" />
                                                </div>
                                                <span className="text-foreground font-medium">{feature}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                            </div>
                        );
                    })}
                </div>

            </div>
        </section>
    );
}
