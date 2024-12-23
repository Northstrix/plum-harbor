// i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: require('./public/locales/en/translation.json'), // English translation
      },
      he: {
        translation: require('./public/locales/he/translation.json'), // Hebrew translation
      },
      es: {
        translation: require('./public/locales/es/translation.json'), // Spanish translations
      },
      gsw: {
        translation: require('./public/locales/gsw/translation.json'), // Swiss German translations
      },
      bar: {
        translation: require('./public/locales/bar/translation.json'), // Austrian German translations
      },
      de: {
        translation: require('./public/locales/de/translation.json'), // High German translations
      },
    },
    lng: 'en', // Default language
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false, // React already does escaping
    },
  });

export default i18n;
