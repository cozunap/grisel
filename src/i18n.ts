import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Home
import enHome from './content/pages/home.en.json';
import esHome from './content/pages/home.es.json';
import frHome from './content/pages/home.fr.json';

// Services
import enServices from './content/pages/services.en.json';
import esServices from './content/pages/services.es.json';
import frServices from './content/pages/services.fr.json';

// About
import enAbout from './content/pages/about.en.json';
import esAbout from './content/pages/about.es.json';
import frAbout from './content/pages/about.fr.json';

// Membership
import enMembership from './content/pages/membership.en.json';
import esMembership from './content/pages/membership.es.json';
import frMembership from './content/pages/membership.fr.json';

// Gift Cards
import enGiftCards from './content/pages/giftcards.en.json';
import esGiftCards from './content/pages/giftcards.es.json';
import frGiftCards from './content/pages/giftcards.fr.json';

// Contact
import enContact from './content/pages/contact.en.json';
import esContact from './content/pages/contact.es.json';
import frContact from './content/pages/contact.fr.json';

// Booking
import enBooking from './content/pages/booking.en.json';
import esBooking from './content/pages/booking.es.json';
import frBooking from './content/pages/booking.fr.json';

// Catalogue
import enCatalogue from './content/pages/catalogue.en.json';
import esCatalogue from './content/pages/catalogue.es.json';
import frCatalogue from './content/pages/catalogue.fr.json';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        home: enHome,
        services: enServices,
        about: enAbout,
        membership: enMembership,
        giftcards: enGiftCards,
        contact: enContact,
        catalogue: enCatalogue,
        booking: enBooking,
      },
      es: {
        home: esHome,
        services: esServices,
        about: esAbout,
        membership: esMembership,
        giftcards: esGiftCards,
        contact: esContact,
        catalogue: esCatalogue,
        booking: esBooking,
      },
      fr: {
        home: frHome,
        services: frServices,
        about: frAbout,
        membership: frMembership,
        giftcards: frGiftCards,
        contact: frContact,
        catalogue: frCatalogue,
        booking: frBooking,
      }
    },
    ns: ['home', 'services', 'about', 'membership', 'giftcards', 'contact', 'catalogue', 'booking'],
    defaultNS: 'home',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false, // react already safes from xss
    }
  });

export default i18n;
