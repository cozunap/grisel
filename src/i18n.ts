import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// These resources will eventually be dynamically loaded or imported from Decap CMS JSONs
// For now, we stub them.
import enHome from './content/pages/home.en.json';
import esHome from './content/pages/home.es.json';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: enHome
      },
      es: {
        translation: esHome
      }
    },
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false, // react already safes from xss
    }
  });

export default i18n;
