// Динамический импорт для избежания ошибок на сервере
let WebApp: any = null;

const getWebApp = () => {
  if (typeof window === 'undefined') {
    return null;
  }
  
  if (!WebApp) {
    try {
      // Используем стандартный Telegram Web App API
      WebApp = (window as any).Telegram?.WebApp;
      if (!WebApp) {
        console.warn('Telegram Web App not available');
        return null;
      }
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
    console.warn('Telegram Web App not initialized');
    return null;
  }

  try {
    // Инициализация Telegram Web App
    webApp.ready();
    
    // Настройка темы
    webApp.setHeaderColor('#3B82F6'); // Синий цвет
    webApp.setBackgroundColor('#ffffff');
    
    // Расширяем на всю высоту
    webApp.expand();
    
    console.log('Telegram Web App initialized successfully');
    return webApp;
  } catch (error) {
    console.error('Error initializing Telegram Web App:', error);
    return null;
  }
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

// Новая функция для автоматической регистрации
export const autoRegisterUser = async () => {
  const webApp = getWebApp();
  if (!webApp) {
    return null;
  }

  const user = webApp.initDataUnsafe?.user;
  if (!user) {
    return null;
  }

  try {
    // Автоматически создаем профиль пользователя
    const response = await fetch('/api/profiles', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        telegram_id: user.id,
        first_name: user.first_name,
        last_name: user.last_name || null,
        username: user.username || null,
        photo_url: user.photo_url || null,
        country: 'Не указано',
        city: 'Не указано',
        status: 'other',
        interests: [],
        bio: null
      }),
    });

    if (response.ok) {
      const data = await response.json();
      return data.profile;
    } else if (response.status === 409) {
      // Профиль уже существует
      return null;
    } else {
      console.error('Failed to auto-register user');
      return null;
    }
  } catch (error) {
    console.error('Error auto-registering user:', error);
    return null;
  }
};

// Функция для получения данных пользователя с валидацией
export const getValidatedTelegramUser = () => {
  const webApp = getWebApp();
  if (!webApp) {
    console.warn('Telegram Web App not available');
    return null;
  }

  const user = webApp.initDataUnsafe?.user;
  if (!user || !user.id) {
    console.warn('Telegram user data not available');
    return null;
  }

  console.log('Telegram user found:', user);
  return user;
}; 