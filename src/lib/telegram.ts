interface TelegramUser {
  id: number;
  first_name?: string;
  last_name?: string;
  username?: string;
  photo_url?: string;
}

interface TelegramWebApp {
  initData: string;
  initDataUnsafe: {
    user?: TelegramUser;
    query_id?: string;
  };
  ready(): void;
  expand(): void;
  close(): void;
  MainButton: {
    text: string;
    color: string;
    textColor: string;
    isVisible: boolean;
    isActive: boolean;
    show(): void;
    hide(): void;
    enable(): void;
    disable(): void;
    onClick(callback: () => void): void;
    offClick(callback: () => void): void;
  };
  BackButton: {
    isVisible: boolean;
    show(): void;
    hide(): void;
    onClick(callback: () => void): void;
    offClick(callback: () => void): void;
  };
}

declare global {
  interface Window {
    Telegram?: {
      WebApp: TelegramWebApp;
    };
  }
}

export function initTelegramApp(): void {
  try {
    if (typeof window !== 'undefined' && window.Telegram?.WebApp) {
      window.Telegram.WebApp.ready();
      window.Telegram.WebApp.expand();
    }
  } catch (error) {
    console.error('Error initializing Telegram Web App:', error);
  }
}

export function getValidatedTelegramUser(): TelegramUser | null {
  try {
    if (typeof window !== 'undefined' && window.Telegram?.WebApp?.initDataUnsafe?.user) {
      return window.Telegram.WebApp.initDataUnsafe.user;
    }
    return null;
  } catch (error) {
    console.error('Error getting Telegram user:', error);
    return null;
  }
}

export async function autoRegisterUser(user: TelegramUser): Promise<boolean> {
  try {
    const response = await fetch('/api/profiles', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        telegram_id: user.id,
        first_name: user.first_name || '',
        last_name: user.last_name || '',
        username: user.username || '',
        photo_url: user.photo_url || '',
        country: '',
        city: '',
        status: 'other',
        interests: [],
        bio: ''
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to register user');
    }

    return true;
  } catch (error) {
    console.error('Error auto-registering user:', error);
    return false;
  }
}

// Функция для автоматического определения местоположения
export async function autoDetectLocation(): Promise<{
  city: string;
  country: string;
  coordinates?: { latitude: number; longitude: number };
} | null> {
  try {
    // Проверяем доступность геолокации
    if (!navigator.geolocation) {
      console.warn('Geolocation not supported');
      return null;
    }

    // Получаем текущую позицию
    const position = await new Promise<GeolocationPosition>((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject, {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 60000
      });
    });

    const { latitude, longitude } = position.coords;

    // Получаем город и страну по координатам через Nominatim API
    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=10`
    );
    
    if (!response.ok) {
      throw new Error('Failed to fetch location data');
    }

    const data = await response.json();
    
    return {
      city: data.address?.city || data.address?.town || data.address?.village || 'Неизвестно',
      country: data.address?.country || 'Неизвестно',
      coordinates: {
        latitude,
        longitude
      }
    };
  } catch (error) {
    console.error('Error in auto location detection:', error);
    return null;
  }
} 