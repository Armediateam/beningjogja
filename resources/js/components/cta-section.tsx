import { Button } from './ui/button';
import { IconBrandWhatsapp, IconCalendarEvent } from '@tabler/icons-react';

export function CtaSection() {
    const waLink = "https://wa.me/6287780656710";

    return (
        <section className="relative py-24 overflow-hidden" id="hubungi-kami">
            {/* Background Map/Image */}
            <div 
                className="absolute inset-0 bg-cover bg-center bg-no-repeat w-full h-full"
                style={{ backgroundImage: "url('https://images.unsplash.com/photo-1540541338287-41700207dee6?q=80&w=2070&auto=format&fit=crop')" }}
            />
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-zinc-900/80 dark:bg-black/90 backdrop-blur-sm" />

            <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
                
                {/* Content */}
                <div className="bg-white/10 dark:bg-white/5 border border-white/20 backdrop-blur-md rounded-3xl p-10 md:p-16 shadow-2xl">
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
                        Siap untuk Liburan Impian Anda?
                    </h2>
                    <p className="text-lg md:text-xl text-zinc-300 mb-10 max-w-2xl mx-auto leading-relaxed">
                        Jangan biarkan momen berharga Anda berlalu begitu saja. Amankan tanggal liburan Anda di Bening Jogja sekarang juga dan nikmati pengalaman tak terlupakan.
                    </p>
                    
                    {/* Buttons */}
                    <div className="flex flex-col sm:flex-row gap-5 justify-center items-center">
                        <a href="/reservasi" className="w-full sm:w-auto">
                            <Button 
                                size="lg" 
                                className="w-full h-14 px-8 text-base rounded-full bg-blue-500 hover:bg-blue-600 text-white font-bold shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                            >
                                <IconCalendarEvent className="mr-2 h-5 w-5" stroke={2} />
                                Cek Ketersediaan
                            </Button>
                        </a>
                        
                        <a 
                            href={waLink} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="w-full sm:w-auto"
                        >
                            <Button 
                                size="lg" 
                                variant="outline" 
                                className="w-full h-14 px-8 text-base rounded-full bg-transparent border-white/30 text-white hover:bg-white/10 hover:border-white/50 backdrop-blur-sm transition-all duration-300"
                            >
                                <IconBrandWhatsapp className="mr-2 h-5 w-5 text-emerald-400" stroke={2} />
                                Hubungi via WhatsApp
                            </Button>
                        </a>
                    </div>
                </div>

            </div>
        </section>
    );
}
