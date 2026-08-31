import type { ImgHTMLAttributes } from 'react';

export default function AppLogoIcon({ className = '', ...props }: ImgHTMLAttributes<HTMLImageElement>) {
    return (
        <>
            <img {...props} src="/2.png" alt="Logo" className={`block dark:hidden object-contain ${className}`} />
            <img {...props} src="/1.png" alt="Logo" className={`hidden dark:block object-contain ${className}`} />
        </>
    );
}
