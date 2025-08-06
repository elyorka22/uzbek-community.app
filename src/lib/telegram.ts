// Динамический импорт для избежания ошибок на сервере
let WebApp: any = null;

const getWebApp = () => {
  if (typeof window === 'undefined') {
    return null;
  }
  
  if (!WebApp) {
    try {
      WebApp = require('@twa-dev/sdk');
    } catch (error) {
      console.warn('Telegram Web App SDK not available');
      return null;
    }
  }
  
  return WebApp;
};

export const initTelegramApp = () => {
  const webApp = getWebApp();
  if (!webApp) {
    return null;
  }

  // Инициализация Telegram Web App
  webApp.ready();
  
  // Настройка темы
  webApp.setHeaderColor('#ffffff');
  webApp.setBackgroundColor('#ffffff');
  
  return webApp;
};

export const getTelegramUser = () => {
  const webApp = getWebApp();
  if (!webApp) {
    return null;
  }

  return webApp.initDataUnsafe?.user;
};

export const getTelegramTheme = () => {
  const webApp = getWebApp();
  if (!webApp) {
    return 'light';
  }

  return webApp.colorScheme; // 'light' | 'dark'
};

export const showTelegramAlert = (message: string) => {
  const webApp = getWebApp();
  if (!webApp) {
    return;
  }

  webApp.showAlert(message);
};

export const showTelegramConfirm = (message: string, callback: (confirmed: boolean) => void) => {
  const webApp = getWebApp();
  if (!webApp) {
    return;
  }

  webApp.showConfirm(message, callback);
}; 