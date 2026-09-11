import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

export type Language = 'id' | 'en';

interface LanguageContextValue {
    lang: Language;
    setLang: (lang: Language) => void;
    toggleLang: () => void;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
    const [lang, setLangState] = useState<Language>('id');

    useEffect(() => {
        try {
            const stored = localStorage.getItem('lang');
            if (stored === 'id' || stored === 'en') {
                setLangState(stored);
            }
        } catch {
            // ignore
        }
    }, []);

    const setLang = (value: Language) => {
        setLangState(value);
        try {
            localStorage.setItem('lang', value);
        } catch {
            // ignore
        }
    };

    const toggleLang = () => setLang(lang === 'id' ? 'en' : 'id');

    return (
        <LanguageContext.Provider value={{ lang, setLang, toggleLang }}>
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    const ctx = useContext(LanguageContext);
    if (!ctx) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return ctx;
}

export function useTranslation<T extends Record<Language, any>>(dict: T): T['id'] {
    const { lang } = useLanguage();
    return dict[lang];
}
