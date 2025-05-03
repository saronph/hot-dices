import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as Localization from 'expo-localization';
import { phrases } from '../constants/Phrases';

i18n
  .use(initReactI18next)
  .init({
    resources: phrases,
    lng: Localization.getLocales()[0]?.languageCode || 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n; 