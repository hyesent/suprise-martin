import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import en from './locales/en.json';
import da from './locales/da.json';

i18n.use(LanguageDetector).use(initReactI18next).init({
  resources: { en: { translation: en }, da: { translation: da } },
  lng: 'da', fallbackLng: 'da', supportedLngs: ['da','en'],
  detection: { order: ['localStorage'], caches: ['localStorage'] },
  interpolation: { escapeValue: false },
});
i18n.on('languageChanged', lng => { document.documentElement.lang = lng; });
document.documentElement.lang = 'da';
export default i18n;
