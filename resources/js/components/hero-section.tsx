import { Button } from './ui/button';
import { ArrowRight } from 'lucide-react';

export function HeroSection() {
    return (
        <section className="relative w-full h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
            {/* Background Image */}
            <div 
                className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat transition-transform duration-1000 hover:scale-105"
                style={{ backgroundImage: "url('/hero-bg.jpg')" }}
            />
            
            {/* Dark Overlay for better text legibility */}
            <div className="absolute inset-0 bg-black/40 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />

            {/* Content Container */}
            <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
                
                {/* Decorative Badge */}
                <div className="inline-flex items-center rounded-full border border-white/20 bg-white/10 px-3 py-1 text-sm font-medium text-white backdrop-blur-sm mb-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
                    <span className="flex h-2 w-2 rounded-full bg-green-400 mr-2 animate-pulse"></span>
                    Tersedia Private Pool Villa
                </div>

                {/* Headline */}
                <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold tracking-tight text-white mb-6 max-w-4xl animate-in fade-in slide-in-from-bottom-6 duration-700 delay-150">
                    Kemewahan dan Ketenangan di <span className="text-blue-400 drop-shadow-lg">Jantung Yogyakarta</span>
                </h1>
                
                {/* Sub-headline */}
                <p className="text-lg md:text-xl text-gray-200 mb-10 max-w-2xl leading-relaxed animate-in fade-in slide-in-from-bottom-8 duration-700 delay-300">
                    Temukan pengalaman menginap terbaik dengan fasilitas premium, desain arsitektur tropis modern, dan pelayanan profesional kelas satu bersama Bening Jogja.
                </p>

                {/* Call to Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto animate-in fade-in slide-in-from-bottom-10 duration-700 delay-500">
                    <a href="/reservasi">
                        <Button size="lg" className="h-12 px-8 text-base rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all">
                            Pesan Sekarang
                            <ArrowRight className="ml-2 h-5 w-5" />
                        </Button>
                    </a>
                    <Button size="lg" variant="outline" className="h-12 px-8 text-base rounded-full bg-white/10 text-white border-white/30 hover:bg-white/20 backdrop-blur-sm transition-all">
                        Pelajari Lebih Lanjut
                    </Button>
                </div>
            </div>
        </section>
    );
}
