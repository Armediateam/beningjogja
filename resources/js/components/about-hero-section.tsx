export function AboutHeroSection() {
    return (
        <section className="relative w-full h-[50vh] min-h-[350px] flex items-center justify-center overflow-hidden">
            {/* Background Image */}
            <div 
                className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat"
                style={{ backgroundImage: "url('https://images.unsplash.com/photo-1542718147-5d2540700d07?q=80&w=2074&auto=format&fit=crop')" }}
            />
            
            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-black/60 bg-gradient-to-b from-black/80 via-black/40 to-black/80" />

            {/* Content Container */}
            <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center pt-16">
                
                {/* Headline */}
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
                    Cerita <span className="text-blue-400 drop-shadow-lg">Bening Jogja</span>
                </h1>
                
                {/* Sub-headline */}
                <p className="text-lg md:text-xl text-gray-300 max-w-2xl leading-relaxed animate-in fade-in slide-in-from-bottom-6 duration-700 delay-150">
                    Menjadi bagian dari perjalanan liburan Anda di Yogyakarta adalah kehormatan terbesar kami. Temukan visi, misi, dan nilai-nilai yang kami pegang.
                </p>
                
            </div>
            
            {/* Bottom Gradient for smooth transition */}
            <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-[#FDFDFC] dark:from-[#0a0a0a] to-transparent" />
        </section>
    );
}
