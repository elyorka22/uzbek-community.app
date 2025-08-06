'use client';

import { useState, useEffect } from 'react';
import { UserProfile, UserStatus } from '@/types/user';
import { useProfile } from '@/hooks/useProfiles';
import ImageUpload from '@/components/ImageUpload';
import InterestsSelector from '@/components/InterestsSelector';
import { Save, User, MapPin, GraduationCap, Briefcase, Home, Users, AlertCircle } from 'lucide-react';
import { initTelegramApp, getValidatedTelegramUser, autoRegisterUser } from '@/lib/telegram';

export default function ProfilePage() {
  const [telegramUser, setTelegramUser] = useState<{
    id: number;
    first_name?: string;
    last_name?: string;
    username?: string;
    photo_url?: string;
  } | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  // Инициализация Telegram Web App
  useEffect(() => {
    const initializeApp = async () => {
      try {
        // Инициализируем Telegram Web App
        initTelegramApp();
        
        // Получаем пользователя
        const user = getValidatedTelegramUser();
        if (user) {
          setTelegramUser(user);
          
          // Автоматически регистрируем пользователя
          await autoRegisterUser();
        }
        
        setIsInitialized(true);
      } catch (error) {
        console.error('Error initializing Telegram Web App:', error);
        setIsInitialized(true);
      }
    };

    initializeApp();
  }, []);

  // Использование хука для работы с профилем
  const { profile, loading, error, updateProfile } = useProfile(telegramUser?.id || 0);

  // Локальное состояние формы
  const [formData, setFormData] = useState<UserProfile>({
    id: '',
    telegramId: 0,
    firstName: '',
    lastName: '',
    username: '',
    photoUrl: '',
    location: {
      country: '',
      city: ''
    },
    status: 'student',
    interests: [],
    bio: '',
    createdAt: new Date(),
    updatedAt: new Date()
  });

  // Обновление формы при загрузке профиля
  useEffect(() => {
    if (profile) {
      setFormData(profile);
    } else if (telegramUser) {
      // Если профиль не найден, заполняем данными из Telegram
      setFormData(prev => ({
        ...prev,
        telegramId: telegramUser.id,
        firstName: telegramUser.first_name || '',
        lastName: telegramUser.last_name || '',
        username: telegramUser.username || '',
        photoUrl: telegramUser.photo_url || ''
      }));
    }
  }, [profile, telegramUser]);

  const handleSave = async () => {
    if (!telegramUser) {
      setSaveError('Telegram user not found');
      return;
    }

    setIsLoading(true);
    setSaveError(null);
    
    try {
      if (profile) {
        // Обновление существующего профиля
        await updateProfile({
          firstName: formData.firstName,
          lastName: formData.lastName,
          username: formData.username,
          photoUrl: formData.photoUrl,
          location: formData.location,
          status: formData.status,
          interests: formData.interests,
          bio: formData.bio
        });
      } else {
        // Создание нового профиля
        const response = await fetch('/api/profiles', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            telegram_id: formData.telegramId,
            first_name: formData.firstName,
            last_name: formData.lastName,
            username: formData.username,
            photo_url: formData.photoUrl,
            country: formData.location.country,
            city: formData.location.city,
            status: formData.status,
            interests: formData.interests,
            bio: formData.bio
          }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Failed to create profile');
        }
      }
      
      setIsSaved(true);
      setTimeout(() => setIsSaved(false), 3000);
    } catch (error) {
      setSaveError(error instanceof Error ? error.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const statusOptions = [
    { value: 'student', label: 'Студент', icon: GraduationCap },
    { value: 'working', label: 'Работаю', icon: Briefcase },
    { value: 'living', label: 'Живу', icon: Home },
    { value: 'other', label: 'Другое', icon: Users }
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Загрузка профиля...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <p className="text-red-600">Ошибка загрузки профиля: {error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-6">
      <div className="max-w-2xl mx-auto px-4">
        {/* Заголовок */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex items-center space-x-3 mb-4">
            <User className="w-6 h-6 text-blue-500" />
            <h1 className="text-2xl font-bold text-gray-900">Мой профиль</h1>
          </div>
          <p className="text-gray-600">
            Расскажите о себе, чтобы другие узбеки могли вас найти
          </p>
        </div>

        {/* Форма профиля */}
        <div className="bg-white rounded-lg shadow-sm p-6 space-y-6">
          {/* Фото профиля */}
          <div className="flex justify-center">
            <ImageUpload
              currentImage={formData.photoUrl}
              onImageChange={(photoUrl) => setFormData(prev => ({ ...prev, photoUrl }))}
            />
          </div>

          {/* Основная информация */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Имя *
              </label>
              <input
                type="text"
                value={formData.firstName}
                onChange={(e) => setFormData(prev => ({ ...prev, firstName: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Ваше имя"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Фамилия
              </label>
              <input
                type="text"
                value={formData.lastName || ''}
                onChange={(e) => setFormData(prev => ({ ...prev, lastName: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Ваша фамилия"
              />
            </div>
          </div>

          {/* Локация */}
          <div className="flex items-center space-x-3 mb-4">
            <MapPin className="w-5 h-5 text-gray-400" />
            <h3 className="text-lg font-medium text-gray-900">Локация</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Страна *
              </label>
              <input
                type="text"
                value={formData.location.country}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  location: { ...prev.location, country: e.target.value }
                }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Страна"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Город *
              </label>
              <input
                type="text"
                value={formData.location.city}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  location: { ...prev.location, city: e.target.value }
                }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Город"
                required
              />
            </div>
          </div>

          {/* Статус */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Ваш статус *
            </label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {statusOptions.map((option) => {
                const Icon = option.icon;
                return (
                  <button
                    key={option.value}
                    onClick={() => setFormData(prev => ({ ...prev, status: option.value as UserStatus }))}
                    className={`flex flex-col items-center p-4 rounded-lg border transition-colors ${
                      formData.status === option.value
                        ? 'bg-blue-50 border-blue-500 text-blue-700'
                        : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <Icon className="w-6 h-6 mb-2" />
                    <span className="text-sm font-medium">{option.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* О себе */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              О себе
            </label>
            <textarea
              value={formData.bio || ''}
              onChange={(e) => setFormData(prev => ({ ...prev, bio: e.target.value }))}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Расскажите немного о себе..."
            />
          </div>

          {/* Интересы */}
          <InterestsSelector
            selectedInterests={formData.interests}
            onInterestsChange={(interests) => setFormData(prev => ({ ...prev, interests }))}
          />

          {/* Ошибка сохранения */}
          {saveError && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <div className="flex items-center space-x-2">
                <AlertCircle className="w-5 h-5 text-red-500" />
                <span className="text-red-700">{saveError}</span>
              </div>
            </div>
          )}

          {/* Кнопка сохранения */}
          <div className="flex justify-center pt-6">
            <button
              onClick={handleSave}
              disabled={isLoading || !formData.firstName || !formData.location.country || !formData.location.city}
              className={`flex items-center space-x-2 px-8 py-3 rounded-lg font-medium transition-colors ${
                isLoading || !formData.firstName || !formData.location.country || !formData.location.city
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-blue-500 text-white hover:bg-blue-600'
              }`}
            >
              <Save className="w-5 h-5" />
              <span>{isLoading ? 'Сохранение...' : profile ? 'Обновить профиль' : 'Создать профиль'}</span>
            </button>
          </div>

          {/* Уведомление о сохранении */}
          {isSaved && (
            <div className="text-center text-green-600 font-medium">
              Профиль успешно {profile ? 'обновлен' : 'создан'}!
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 