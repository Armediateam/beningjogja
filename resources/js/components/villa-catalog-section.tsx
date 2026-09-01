import { Button } from './ui/button';
import { 
    IconBed, IconUsers, IconSwimming, IconChecklist, 
    IconWifi, IconCar, IconCoffee, IconDeviceTv, IconSnowflake 
} from '@tabler/icons-react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';

const getIcon = (iconName: string) => {
    switch (iconName) {
        case 'users': return <IconUsers className="h-4 w-4" />;
        case 'bed': return <IconBed className="h-4 w-4" />;
        case 'swimming': return <IconSwimming className="h-4 w-4" />;
        case 'wifi': return <IconWifi className="h-4 w-4" />;
        case 'car': return <IconCar className="h-4 w-4" />;
        case 'coffee': return <IconCoffee className="h-4 w-4" />;
        case 'tv': return <IconDeviceTv className="h-4 w-4" />;
        case 'ac': return <IconSnowflake className="h-4 w-4" />;
        default: return <IconChecklist className="h-4 w-4" />;
    }
}

const defaultServices = [
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

export function VillaCatalogSection({ pricings = [] }: { pricings?: any[] }) {
    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0
        }).format(price);
    };

    const displayServices = pricings && pricings.length > 0 ? pricings.map((p) => ({
        id: p.id,
        title: p.name,
        description: p.description || 'Nikmati fasilitas terbaik kami untuk pengalaman tidak terlupakan.',
        image: p.image ? `/storage/${p.image}` : (p.code === 'villa' ? '/villa-1.jpg' : p.code === 'pool' ? '/pool.jpg' : '/villa-2.jpg'),
        price: formatPrice(p.price),
        amenities: p.facilities && p.facilities.length > 0 ? p.facilities.map((f: any) => {
            if (typeof f === 'string') {
                return { icon: <IconChecklist className="h-4 w-4" />, label: f };
            }
            return {
                icon: getIcon(f.icon),
                label: f.name
            };
        }) : (p.code === 'villa' ? [
            { icon: <IconUsers className="h-4 w-4" />, label: 'Kapasitas 2-6 Tamu' },
            { icon: <IconBed className="h-4 w-4" />, label: 'Kamar Premium' },
            { icon: <IconChecklist className="h-4 w-4" />, label: 'Tanpa Akses Kolam' },
        ] : p.code === 'pool' ? [
            { icon: <IconUsers className="h-4 w-4" />, label: 'Maks. 10 Orang' },
            { icon: <IconSwimming className="h-4 w-4" />, label: 'Kolam Pribadi' },
            { icon: <IconChecklist className="h-4 w-4" />, label: 'Hanya Akses Area Luar' },
        ] : [
            { icon: <IconUsers className="h-4 w-4" />, label: 'Kapasitas Penuh' },
            { icon: <IconBed className="h-4 w-4" />, label: 'Akses Seluruh Fasilitas' },
            { icon: <IconChecklist className="h-4 w-4" />, label: 'Privasi Terjamin' },
        ])
    })) : defaultServices;

    return (
        <section className="py-24 bg-white dark:bg-zinc-950 border-t border-border/50">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                
                {/* Section Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
                    <div className="max-w-2xl">
                        <h2 className="text-sm font-semibold text-blue-500 uppercase tracking-widest mb-3">
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
                    {displayServices.map((service) => (
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
                                <h4 className="text-2xl font-bold text-foreground mb-3 group-hover:text-blue-600 transition-colors">
                                    {service.title}
                                </h4>
                                
                                {/* Amenities */}
                                <div className="flex flex-col gap-3 mb-6 border-b border-border/50 pb-6">
                                    {service.amenities.map((amenity, idx) => (
                                        <div key={idx} className="flex items-center text-sm text-muted-foreground font-medium">
                                            <span className="mr-3 text-blue-500">{amenity.icon}</span>
                                            {amenity.label}
                                        </div>
                                    ))}
                                </div>

                                <p className="text-muted-foreground leading-relaxed mb-8 grow">
                                    {service.description}
                                </p>

                                {/* Actions */}
                                <div className="flex flex-col xl:flex-row gap-3 mt-auto">
                                    <a href="/reservasi" className="w-full">
                                        <Button className="w-full rounded-full text-sm h-11 shadow-md hover:shadow-lg transition-shadow">
                                            Pesan Sekarang
                                        </Button>
                                    </a>
                                    <Dialog>
                                        <DialogTrigger asChild>
                                            <Button variant="outline" className="w-full xl:w-auto rounded-full px-6 h-11">
                                                Detail
                                            </Button>
                                        </DialogTrigger>
                                        <DialogContent className="sm:max-w-[500px]">
                                            <DialogHeader>
                                                <DialogTitle className="text-2xl font-bold">{service.title}</DialogTitle>
                                                <DialogDescription>
                                                    Informasi detail mengenai paket {service.title} kami.
                                                </DialogDescription>
                                            </DialogHeader>
                                            <div className="grid gap-4 py-4">
                                                <div className="w-full aspect-video rounded-xl overflow-hidden mb-2">
                                                    <img src={service.image} alt={service.title} className="w-full h-full object-cover" />
                                                </div>
                                                <p className="text-muted-foreground leading-relaxed">
                                                    {service.description}
                                                </p>
                                                <div className="flex flex-col gap-2 mt-2">
                                                    <h4 className="font-semibold text-foreground">Fasilitas Termasuk:</h4>
                                                    {service.amenities.map((amenity, idx) => (
                                                        <div key={idx} className="flex items-center text-sm text-muted-foreground font-medium bg-zinc-50 dark:bg-zinc-900 p-2 rounded-lg">
                                                            <span className="mr-3 text-blue-500">{amenity.icon}</span>
                                                            {amenity.label}
                                                        </div>
                                                    ))}
                                                </div>
                                                <div className="flex items-center justify-between mt-4 p-4 bg-blue-50 dark:bg-blue-950/30 rounded-xl border border-blue-100 dark:border-blue-900">
                                                    <span className="text-sm font-semibold text-muted-foreground">Harga per sesi</span>
                                                    <span className="text-xl font-bold text-blue-600 dark:text-blue-400">{service.price}</span>
                                                </div>
                                            </div>
                                            <div className="flex justify-end mt-2">
                                                <a href="/reservasi" className="w-full sm:w-auto">
                                                    <Button className="w-full rounded-full">Pesan Sekarang</Button>
                                                </a>
                                            </div>
                                        </DialogContent>
                                    </Dialog>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
