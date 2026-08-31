import { Link } from '@inertiajs/react';
import AppLogoIcon from './app-logo-icon';
import { IconBrandFacebook, IconBrandInstagram, IconBrandWhatsapp, IconMail, IconMapPin, IconPhone } from '@tabler/icons-react';

export function LandingFooter() {
    return (
        <footer className="bg-zinc-50 border-t border-border dark:bg-zinc-950">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
                    {/* Brand Section */}
                    <div className="flex flex-col gap-4 lg:col-span-1">
                        <div className="flex items-center gap-2">
                            <AppLogoIcon className="h-8 w-8" />
                            <span className="text-xl font-bold tracking-tight text-foreground">
                                Bening Jogja
                            </span>
                        </div>
                        <p className="text-sm text-muted-foreground leading-relaxed mt-2">
                            Penyedia layanan sewa villa dan private pool premium di Yogyakarta. Temukan pengalaman menginap tak terlupakan bersama kami.
                        </p>
                        <div className="flex items-center gap-4 mt-2">
                            <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                                <IconBrandInstagram className="h-5 w-5" />
                                <span className="sr-only">Instagram</span>
                            </a>
                            <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                                <IconBrandFacebook className="h-5 w-5" />
                                <span className="sr-only">Facebook</span>
                            </a>
                            <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                                <IconBrandWhatsapp className="h-5 w-5" />
                                <span className="sr-only">WhatsApp</span>
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="flex flex-col gap-4">
                        <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider">
                            Menu Navigasi
                        </h3>
                        <ul className="flex flex-col gap-3 mt-2">
                            <li>
                                <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Beranda</a>
                            </li>
                            <li>
                                <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Fasilitas</a>
                            </li>
                            <li>
                                <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Tentang Kami</a>
                            </li>
                            <li>
                                <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Katalog Harga</a>
                            </li>
                        </ul>
                    </div>

                    {/* Support / Legal */}
                    <div className="flex flex-col gap-4">
                        <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider">
                            Dukungan
                        </h3>
                        <ul className="flex flex-col gap-3 mt-2">
                            <li>
                                <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Cara Pesan</a>
                            </li>
                            <li>
                                <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">FAQ</a>
                            </li>
                            <li>
                                <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Syarat & Ketentuan</a>
                            </li>
                            <li>
                                <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Kebijakan Privasi</a>
                            </li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div className="flex flex-col gap-4">
                        <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider">
                            Hubungi Kami
                        </h3>
                        <ul className="flex flex-col gap-4 mt-2">
                            <li className="flex items-start gap-3">
                                <IconMapPin className="h-5 w-5 text-muted-foreground shrink-0" />
                                <span className="text-sm text-muted-foreground">
                                    Jl. Kaliurang KM 10, Sleman, Daerah Istimewa Yogyakarta 55581
                                </span>
                            </li>
                            <li className="flex items-center gap-3">
                                <IconPhone className="h-5 w-5 text-muted-foreground shrink-0" />
                                <span className="text-sm text-muted-foreground">
                                    +62 812-3456-7890
                                </span>
                            </li>
                            <li className="flex items-center gap-3">
                                <IconMail className="h-5 w-5 text-muted-foreground shrink-0" />
                                <span className="text-sm text-muted-foreground">
                                    hello@beningjogja.com
                                </span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-border mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-sm text-muted-foreground">
                        © {new Date().getFullYear()} Bening Jogja. All rights reserved.
                    </p>
                    <p className="text-xs text-muted-foreground">
                        Designed with ♥ in Yogyakarta
                    </p>
                </div>
            </div>
        </footer>
    );
}
