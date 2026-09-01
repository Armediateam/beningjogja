import { IconMapPin, IconPhone, IconMail, IconBrandWhatsapp } from '@tabler/icons-react';
import { Button } from './ui/button';
import { useForm } from '@inertiajs/react';
import { useState } from 'react';

export function ContactSection() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        phone: '',
        message: ''
    });
    
    const [successMessage, setSuccessMessage] = useState('');

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/contact', {
            preserveScroll: true,
            onSuccess: () => {
                reset();
                setSuccessMessage('Pesan Anda berhasil dikirim! Kami akan segera menghubungi Anda.');
                setTimeout(() => setSuccessMessage(''), 5000);
            },
        });
    };

    return (
        <section className="relative py-24 bg-zinc-50 dark:bg-zinc-950 overflow-hidden">
            {/* Background Blob */}
            <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-blue-500/10 blur-[100px] pointer-events-none" />
            
            <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                
                {/* Section Header */}
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-sm font-semibold text-blue-500 uppercase tracking-widest mb-3">
                        Hubungi Kami
                    </h2>
                    <h3 className="text-3xl md:text-5xl font-bold text-foreground mb-6">
                        Mari Terhubung dengan Bening Jogja
                    </h3>
                    <p className="text-lg text-muted-foreground">
                        Kami selalu siap membantu Anda merencanakan liburan sempurna. Jangan ragu untuk menghubungi tim kami untuk pertanyaan atau reservasi.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
                    
                    {/* Contact Information */}
                    <div className="flex flex-col gap-8">
                        <div className="bg-white dark:bg-zinc-900 rounded-3xl p-8 border border-border/50 shadow-sm">
                            <h4 className="text-2xl font-bold text-foreground mb-6">Informasi Kontak</h4>
                            
                            <div className="space-y-6">
                                <div className="flex items-start gap-4">
                                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/40 text-blue-600">
                                        <IconMapPin className="h-6 w-6" />
                                    </div>
                                    <div>
                                        <p className="font-semibold text-foreground">Alamat Villa</p>
                                        <p className="text-muted-foreground mt-1">Jl. Kaliurang KM 10, Ngaglik, Sleman, Daerah Istimewa Yogyakarta 55581</p>
                                    </div>
                                </div>
                                
                                <div className="flex items-start gap-4">
                                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600">
                                        <IconBrandWhatsapp className="h-6 w-6" />
                                    </div>
                                    <div>
                                        <p className="font-semibold text-foreground">WhatsApp / Reservasi</p>
                                        <a href="https://wa.me/6287780656710" className="text-emerald-600 dark:text-emerald-400 hover:underline mt-1 block">
                                            +62 877-8065-6710
                                        </a>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600">
                                        <IconMail className="h-6 w-6" />
                                    </div>
                                    <div>
                                        <p className="font-semibold text-foreground">Email</p>
                                        <a href="mailto:info@beningjogja.com" className="text-blue-600 dark:text-blue-400 hover:underline mt-1 block">
                                            info@beningjogja.com
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Map Embed */}
                        <div className="bg-white dark:bg-zinc-900 rounded-3xl overflow-hidden border border-border/50 shadow-sm h-64 relative group">
                            <iframe 
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31633.2429402512!2d110.3741355!3d-7.6679549!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e7a5eb4089c25bb%3A0xc367b6058d927b5e!2sJl.%20Kaliurang%2C%20Kabupaten%20Sleman%2C%20Daerah%20Istimewa%20Yogyakarta!5e0!3m2!1sen!2sid!4v1700000000000!5m2!1sen!2sid" 
                                width="100%" 
                                height="100%" 
                                style={{ border: 0 }} 
                                allowFullScreen={true} 
                                loading="lazy" 
                                referrerPolicy="no-referrer-when-downgrade"
                                className="w-full h-full grayscale-[20%] hover:grayscale-0 transition-all duration-500"
                            ></iframe>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="bg-white dark:bg-zinc-900 rounded-3xl p-8 md:p-10 border border-border/50 shadow-xl relative">
                        <h4 className="text-2xl font-bold text-foreground mb-2">Kirim Pesan</h4>
                        <p className="text-muted-foreground mb-8">Isi formulir di bawah ini dan tim kami akan membalas secepatnya.</p>
                        
                        <form onSubmit={submit} className="space-y-6">
                            {successMessage && (
                                <div className="p-4 bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400 rounded-xl border border-emerald-200 dark:border-emerald-800 font-medium">
                                    {successMessage}
                                </div>
                            )}
                            <div className="space-y-2">
                                <label htmlFor="name" className="text-sm font-medium text-foreground">Nama Lengkap</label>
                                <input 
                                    type="text" 
                                    id="name" 
                                    value={data.name}
                                    onChange={e => setData('name', e.target.value)}
                                    className="w-full h-12 px-4 rounded-xl bg-zinc-50 dark:bg-zinc-950 border border-border focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
                                    placeholder="Masukkan nama Anda"
                                    required
                                />
                                {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label htmlFor="email" className="text-sm font-medium text-foreground">Email</label>
                                    <input 
                                        type="email" 
                                        id="email" 
                                        value={data.email}
                                        onChange={e => setData('email', e.target.value)}
                                        className="w-full h-12 px-4 rounded-xl bg-zinc-50 dark:bg-zinc-950 border border-border focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
                                        placeholder="nama@email.com"
                                        required
                                    />
                                    {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
                                </div>
                                <div className="space-y-2">
                                    <label htmlFor="phone" className="text-sm font-medium text-foreground">No. WhatsApp</label>
                                    <input 
                                        type="text" 
                                        id="phone" 
                                        value={data.phone}
                                        onChange={e => setData('phone', e.target.value)}
                                        className="w-full h-12 px-4 rounded-xl bg-zinc-50 dark:bg-zinc-950 border border-border focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
                                        placeholder="0812-xxxx-xxxx"
                                    />
                                    {errors.phone && <p className="text-sm text-red-500">{errors.phone}</p>}
                                </div>
                            </div>
                            
                            <div className="space-y-2">
                                <label htmlFor="message" className="text-sm font-medium text-foreground">Pesan Anda</label>
                                <textarea 
                                    id="message" 
                                    value={data.message}
                                    onChange={e => setData('message', e.target.value)}
                                    rows={5}
                                    className="w-full p-4 rounded-xl bg-zinc-50 dark:bg-zinc-950 border border-border focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all resize-none"
                                    placeholder="Apa yang bisa kami bantu?"
                                    required
                                />
                                {errors.message && <p className="text-sm text-red-500">{errors.message}</p>}
                            </div>
                            
                            <Button 
                                type="submit" 
                                disabled={processing}
                                className="w-full h-12 rounded-xl bg-blue-500 hover:bg-blue-600 text-white font-bold text-base shadow-md hover:shadow-lg transition-all"
                            >
                                {processing ? 'Mengirim...' : 'Kirim Pesan Sekarang'}
                            </Button>
                        </form>
                    </div>

                </div>
            </div>
        </section>
    );
}
