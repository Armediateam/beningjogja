export function FacilityHeroSection() {
    return (
        <section className="relative w-full h-[60vh] min-h-[400px] flex items-center justify-center overflow-hidden">
            {/* Background Image */}
            <div 
                className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat"
                style={{ backgroundImage: "url('https://images.unsplash.com/photo-1571896349842-33c89424de2d?q=80&w=2080&auto=format&fit=crop')" }}
            />
            
            {/* Dark Overlay for better text legibility */}
            <div className="absolute inset-0 bg-black/50 bg-gradient-to-t from-black/80 via-black/40 to-black/30" />

            {/* Content Container */}
            <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center pt-16">
                
                {/* Decorative Badge */}
                <div className="inline-flex items-center rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-sm font-medium text-white backdrop-blur-sm mb-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
                    Eksklusif & Terlengkap
                </div>

                {/* Headline */}
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-6 max-w-4xl animate-in fade-in slide-in-from-bottom-6 duration-700 delay-150">
                    Fasilitas Premium <span className="text-blue-400 drop-shadow-lg">Bening Jogja</span>
                </h1>
                
                {/* Sub-headline */}
                <p className="text-lg md:text-xl text-gray-200 max-w-2xl leading-relaxed animate-in fade-in slide-in-from-bottom-8 duration-700 delay-300">
                    Manjakan diri Anda dengan serangkaian fasilitas kelas atas yang kami siapkan khusus untuk memastikan kenyamanan liburan Anda bersama orang tercinta.
                </p>
                
            </div>
            
            {/* Bottom Gradient for smooth transition to next section */}
            <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-[#FDFDFC] dark:from-[#0a0a0a] to-transparent" />
        </section>
    );
}
