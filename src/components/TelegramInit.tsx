'use client';

import { useEffect } from 'react';
import Script from 'next/script';

export default function TelegramInit() {
  useEffect(() => {
    const handleScriptLoad = () => {
      console.log('Telegram Web App script loaded');
    };

    const handleScriptError = (e: any) => {
      console.error('Failed to load Telegram Web App script:', e);
    };

    // Добавляем обработчики событий после загрузки компонента
    const script = document.querySelector('script[src="https://telegram.org/js/telegram-web-app.js"]');
    if (script) {
      script.addEventListener('load', handleScriptLoad);
      script.addEventListener('error', handleScriptError);
    }

    return () => {
      if (script) {
        script.removeEventListener('load', handleScriptLoad);
        script.removeEventListener('error', handleScriptError);
      }
    };
  }, []);

  return null;
} 