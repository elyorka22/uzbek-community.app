import WebApp from '@twa-dev/sdk';

export const initTelegramApp = () => {
  // Проверяем, что мы на клиенте
  if (typeof window === 'undefined') {
    return null;
  }

  // Инициализация Telegram Web App
  WebApp.ready();
  
  // Настройка темы
  WebApp.setHeaderColor('#ffffff');
  WebApp.setBackgroundColor('#ffffff');
  
  return WebApp;
};

export const getTelegramUser = () => {
  // Проверяем, что мы на клиенте
  if (typeof window === 'undefined') {
    return null;
  }

  return WebApp.initDataUnsafe?.user;
};

export const getTelegramTheme = () => {
  // Проверяем, что мы на клиенте
  if (typeof window === 'undefined') {
    return 'light';
  }

  return WebApp.colorScheme; // 'light' | 'dark'
};

export const showTelegramAlert = (message: string) => {
  // Проверяем, что мы на клиенте
  if (typeof window === 'undefined') {
    return;
  }

  WebApp.showAlert(message);
};

export const showTelegramConfirm = (message: string, callback: (confirmed: boolean) => void) => {
  // Проверяем, что мы на клиенте
  if (typeof window === 'undefined') {
    return;
  }

  WebApp.showConfirm(message, callback);
}; 