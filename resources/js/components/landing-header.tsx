import { Link } from '@inertiajs/react';
import { dashboard, login, register } from '@/routes';
import AppLogoIcon from './app-logo-icon';
import { Button } from './ui/button';
import { useIsMobile } from '@/hooks/use-mobile';
import { useState, useEffect } from 'react';
import { IconMenu2, IconX } from '@tabler/icons-react';

interface LandingHeaderProps {
    auth: {
        user: any;
    };
}

export function LandingHeader({ auth }: LandingHeaderProps) {
    const isMobile = useIsMobile();
    const [isScrolled, setIsScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'Beranda', href: '#' },
        { name: 'Fasilitas', href: '#' },
        { name: 'Tentang Kami', href: '#' },
        { name: 'Hubungi Kami', href: '#' },
    ];

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out ${
                isScrolled
                    ? 'bg-white/70 backdrop-blur-md shadow-sm border-b border-border/50 dark:bg-background/70'
                    : 'bg-transparent'
            }`}
        >
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 md:h-20 items-center justify-between">
                    {/* Logo */}
                    <div className="flex items-center gap-2">
                        <AppLogoIcon className="h-8 w-8" />
                        <span className="text-xl font-bold tracking-tight text-foreground">
                            Bening Jogja
                        </span>
                    </div>

                    {/* Desktop Navigation */}
                    {!isMobile && (
                        <nav className="hidden md:flex items-center gap-8">
                            {navLinks.map((link) => (
                                <a
                                    key={link.name}
                                    href={link.href}
                                    className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
                                >
                                    {link.name}
                                </a>
                            ))}
                        </nav>
                    )}

                    {/* Desktop CTA */}
                    {!isMobile && (
                        <div className="hidden md:flex items-center gap-4">
                            {auth.user ? (
                                <Link href={dashboard()}>
                                    <Button className="rounded-full px-6 shadow-sm hover:shadow-md transition-all">
                                        Dashboard
                                    </Button>
                                </Link>
                            ) : (
                                <>
                                    <Link href={login()}>
                                        <Button variant="ghost" className="rounded-full px-6 font-medium">
                                            Log in
                                        </Button>
                                    </Link>
                                    <Link href={register()}>
                                        <Button className="rounded-full px-6 shadow-sm hover:shadow-md transition-all">
                                            Daftar
                                        </Button>
                                    </Link>
                                </>
                            )}
                        </div>
                    )}

                    {/* Mobile Menu Button */}
                    {isMobile && (
                        <div className="flex items-center">
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                                className="text-foreground"
                            >
                                {mobileMenuOpen ? <IconX /> : <IconMenu2 />}
                            </Button>
                        </div>
                    )}
                </div>
            </div>

            {/* Mobile Navigation Menu */}
            {isMobile && mobileMenuOpen && (
                <div className="md:hidden bg-background border-b border-border shadow-lg absolute top-full left-0 right-0 animate-in slide-in-from-top-2">
                    <div className="px-4 pt-2 pb-6 space-y-4">
                        {navLinks.map((link) => (
                            <a
                                key={link.name}
                                href={link.href}
                                className="block px-3 py-2 text-base font-medium text-foreground hover:bg-muted rounded-md"
                            >
                                {link.name}
                            </a>
                        ))}
                        <div className="pt-4 border-t border-border flex flex-col gap-3">
                            {auth.user ? (
                                <Link href={dashboard()} className="w-full">
                                    <Button className="w-full rounded-full">Dashboard</Button>
                                </Link>
                            ) : (
                                <>
                                    <Link href={login()} className="w-full">
                                        <Button variant="outline" className="w-full rounded-full">Log in</Button>
                                    </Link>
                                    <Link href={register()} className="w-full">
                                        <Button className="w-full rounded-full">Daftar</Button>
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </header>
    );
}
