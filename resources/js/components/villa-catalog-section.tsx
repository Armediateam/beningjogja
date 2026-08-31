import { Button } from './ui/button';
import { IconBed, IconUsers, IconSwimming, IconChecklist } from '@tabler/icons-react';

const services = [
    {
        id: 1,
        title: 'Sewa Villa',
        description: 'Nikmati privasi menginap di vila mewah dengan fasilitas lengkap untuk kenyamanan maksimal Anda.',
        image: '/villa-1.jpg',
        price: 'Rp 1.500.000',
        amenities: [
            { icon: <IconUsers className="h-4 w-4" />, label: 'Kapasitas 2-6 Tamu' },
            { icon: <IconBed className="h-4 w-4" />, label: 'Kamar Premium' },
            { icon: <IconChecklist className="h-4 w-4" />, label: 'Tanpa Akses Kolam' },
        ]
    },
    {
        id: 2,
        title: 'Sewa Kolam Renang',
        description: 'Pesan area kolam renang eksklusif untuk bersantai, berjemur, atau mengadakan pool party kecil bersama teman.',
        image: '/pool.jpg',
        price: 'Rp 500.000',
        amenities: [
            { icon: <IconUsers className="h-4 w-4" />, label: 'Maks. 10 Orang' },
            { icon: <IconSwimming className="h-4 w-4" />, label: 'Kolam Pribadi' },
            { icon: <IconChecklist className="h-4 w-4" />, label: 'Hanya Akses Area Luar' },
        ]
    },
    {
        id: 3,
        title: 'Paket Lengkap (Villa + Kolam)',
        description: 'Pengalaman liburan tanpa batas. Sewa seluruh area vila beserta kolam renang eksklusif untuk Anda dan keluarga.',
        image: '/villa-2.jpg',
        price: 'Rp 1.850.000',
        amenities: [
            { icon: <IconUsers className="h-4 w-4" />, label: 'Kapasitas Penuh' },
            { icon: <IconBed className="h-4 w-4" />, label: 'Akses Seluruh Vila' },
            { icon: <IconSwimming className="h-4 w-4" />, label: 'Private Pool Eksklusif' },
        ]
    }
];

export function VillaCatalogSection() {
    return (
        <section className="py-24 bg-white dark:bg-zinc-950 border-t border-border/50">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                
                {/* Section Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
                    <div className="max-w-2xl">
                        <h2 className="text-sm font-semibold text-amber-500 uppercase tracking-widest mb-3">
                            Pilihan Reservasi
                        </h2>
                        <h3 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                            Sesuaikan dengan Kebutuhan Anda
                        </h3>
                        <p className="text-lg text-muted-foreground">
                            Kami menyediakan berbagai pilihan sewa, mulai dari sekadar bersantai di kolam renang hingga pengalaman menginap mewah di vila secara penuh.
                        </p>
                    </div>
                </div>

                {/* Services Cards Grid (3 Columns) */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {services.map((service) => (
                        <div 
                            key={service.id}
                            className="group flex flex-col bg-zinc-50 dark:bg-zinc-900 rounded-3xl overflow-hidden border border-border/50 hover:shadow-2xl transition-all duration-500"
                        >
                            {/* Image */}
                            <div className="relative aspect-[4/3] overflow-hidden">
                                <img 
                                    src={service.image} 
                                    alt={service.title}
                                    className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-700 ease-out"
                                />
                                <div className="absolute top-4 right-4 bg-white/90 dark:bg-black/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg">
                                    <span className="text-sm font-bold text-foreground">
                                        {service.price}
                                        <span className="text-xs font-normal text-muted-foreground"> / sesi</span>
                                    </span>
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-8 flex flex-col grow">
                                <h4 className="text-2xl font-bold text-foreground mb-3 group-hover:text-amber-600 transition-colors">
                                    {service.title}
                                </h4>
                                
                                {/* Amenities */}
                                <div className="flex flex-col gap-3 mb-6 border-b border-border/50 pb-6">
                                    {service.amenities.map((amenity, idx) => (
                                        <div key={idx} className="flex items-center text-sm text-muted-foreground font-medium">
                                            <span className="mr-3 text-amber-500">{amenity.icon}</span>
                                            {amenity.label}
                                        </div>
                                    ))}
                                </div>

                                <p className="text-muted-foreground leading-relaxed mb-8 grow">
                                    {service.description}
                                </p>

                                {/* Actions */}
                                <div className="flex flex-col xl:flex-row gap-3 mt-auto">
                                    <Button className="w-full rounded-full text-sm h-11 shadow-md hover:shadow-lg transition-shadow">
                                        Pesan Sekarang
                                    </Button>
                                    <Button variant="outline" className="w-full xl:w-auto rounded-full px-6 h-11">
                                        Detail
                                    </Button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
