import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import { resources } from '../content/siteContent';

export const LANGUAGE_STORAGE_KEY = 'portfolio-language';
export const supportedLanguages = ['ru', 'en'];
export const fallbackLanguage = 'en';

export const getInitialLanguage = () => {
  if (typeof window === 'undefined') return fallbackLanguage;

  const saved = window.localStorage.getItem(LANGUAGE_STORAGE_KEY);
  if (supportedLanguages.includes(saved)) return saved;

  return fallbackLanguage;
};

i18n.use(initReactI18next).init({
  resources,
  lng: getInitialLanguage(),
  fallbackLng: fallbackLanguage,
  supportedLngs: supportedLanguages,
  ns: ['common', 'home', 'work', 'about', 'projects'],
  defaultNS: 'common',
  interpolation: {
    escapeValue: false,
  },
  react: {
    useSuspense: false,
  },
});

export default i18n;
