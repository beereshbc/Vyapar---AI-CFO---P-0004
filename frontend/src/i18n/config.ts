import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      "app_name": "Vyapar AI CFO",
      "slogan": "Apni Dukan Ka Smart CFO",
      "dashboard": "Dashboard",
      "udhaar": "Udhaar",
      "inventory": "Inventory",
      "gst": "GST Billing",
      "ai_chat": "Ask Munafa",
      "settings": "Settings"
    }
  },
  hi: {
    translation: {
      "app_name": "व्यापार AI CFO",
      "slogan": "अपनी दुकान का स्मार्ट CFO",
      "dashboard": "डैशबोर्ड",
      "udhaar": "उधार",
      "inventory": "इन्वेंट्री",
      "gst": "GST बिलिंग",
      "ai_chat": "मुनाफा से पूछें",
      "settings": "सेटिंग्स"
    }
  },
  kn: {
    translation: {
      "app_name": "ವ್ಯಾಪಾರ್ AI CFO",
      "slogan": "ನಿಮ್ಮ ಅಂಗಡಿಯ ಸ್ಮಾರ್ಟ್ CFO",
      "dashboard": "ಡ್ಯಾಶ್‌ಬೋರ್ಡ್",
      "udhaar": "ಉದ್ರಿ",
      "inventory": "ಇನ್ವೆಂಟರಿ",
      "gst": "GST ಬಿಲ್ಲಿಂಗ್",
      "ai_chat": "ಮುನಾಫಾ ಅವರನ್ನು ಕೇಳಿ",
      "settings": "ಸೆಟ್ಟಿಂಗ್‌ಗಳು"
    }
  },
  mr: {
    translation: {
      "app_name": "व्यापार AI CFO",
      "slogan": "तुमच्या दुकानाचे स्मार्ट CFO",
      "dashboard": "डॅशबोर्ड",
      "udhaar": "उधार",
      "inventory": "इन्व्हेंटरी",
      "gst": "GST बिलिंग",
      "ai_chat": "मुनाफाला विचारा",
      "settings": "सेटिंग्ज"
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
