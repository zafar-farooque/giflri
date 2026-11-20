import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import en from '@/locales/en.json';
import ar from '@/locales/ar.json';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      ar: { translation: ar },
    },
    fallbackLng: 'en',
    supportedLngs: ['en', 'ar'],
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage'],
    },
    react: {
      useSuspense: false,
    },
  });

export const updateDocumentDirection = (lng: string) => {
  if (typeof document !== 'undefined') {
    const isRtl = lng === 'ar' || lng?.startsWith('ar');
    document.documentElement.dir = isRtl ? 'rtl' : 'ltr';
    document.documentElement.lang = isRtl ? 'ar' : 'en';
    if (isRtl) {
      document.body.classList.add('rtl');
    } else {
      document.body.classList.remove('rtl');
    }
  }
};

i18n.on('languageChanged', (lng) => {
  updateDocumentDirection(lng);
});

// Initialize on first load
if (typeof window !== 'undefined') {
  updateDocumentDirection(i18n.language || 'en');
}

export default i18n;