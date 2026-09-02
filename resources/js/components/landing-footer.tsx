import { IconBrandFacebook, IconBrandInstagram, IconBrandWhatsapp } from '@tabler/icons-react';

export function LandingFooter() {
    return (
        <footer className="bg-zinc-50 border-t border-border dark:bg-zinc-950">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row justify-between items-center gap-4">
                <p className="text-sm text-muted-foreground text-center sm:text-left">
                    © {new Date().getFullYear()} Bening Jogja. All rights reserved.
                </p>
                <div className="flex items-center gap-4">
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
        </footer>
    );
}
