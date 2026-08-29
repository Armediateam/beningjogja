import { Link } from '@inertiajs/react';

export default function Navbar() {
    const waLink = "https://wa.me/6287780656710";

    const navLinks = [
        { name: 'Home', href: '/' },
        { name: 'About Us', href: '/about' },
        { name: 'Villa', href: '/villa' },
        { name: 'Private Pool', href: '/private-pool' },
        { name: 'Contact', href: '/contact' },
    ];

    return (
        <header className="sticky top-0 z-50 w-full bg-white">
            {/* Centered layout constrained with max-w-5xl, compact padding */}
            <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-4 sm:px-6 lg:px-8">
                {/* Logo Section */}
                <div className="flex-shrink-0">
                    <Link href="/" className="flex items-center gap-2">
                        {/* 
                          Aset logo bisa ditambahkan di sini nantinya (ID GDrive: 1ibpLMmDEdWJqB8m3o8KbTsNHwNnQluVe)
                        */}
                        <span className="text-lg font-bold tracking-tight text-zinc-900">
                            Bening<span className="text-blue-600">Villa</span>
                        </span>
                    </Link>
                </div>

                {/* Centered Navigation */}
                <nav className="hidden md:flex flex-1 items-center justify-center space-x-6">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className="text-sm font-medium text-zinc-600 transition-colors hover:text-zinc-900"
                        >
                            {link.name}
                        </Link>
                    ))}
                </nav>

                {/* Booking Button (Direct to WhatsApp) */}
                <div className="flex items-center justify-end">
                    <a
                        href={waLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex h-9 items-center justify-center rounded-md bg-zinc-900 px-4 py-2 text-sm font-medium text-white shadow transition-colors hover:bg-zinc-800 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-zinc-950"
                    >
                        Book Now
                    </a>
                </div>
            </div>
        </header>
    );
}
