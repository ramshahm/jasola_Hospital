import { useMemo, useState, type ReactNode } from 'react';
import { copy, type Language } from '@/i18n/copy';
import { LanguageContext, type LanguageContextValue } from '@/i18n/languageContext';

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('en');

  const value = useMemo<LanguageContextValue>(
    () => ({ language, setLanguage, copy: copy[language] }),
    [language],
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}
