'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  User, 
  Users, 
  Search, 
  MapPin, 
  GraduationCap, 
  Briefcase, 
  Home, 
  Building2, 
  ShoppingBag, 
  FileText, 
  Heart,
  MessageCircle,
  Calendar,
  Star,
  ArrowRight
} from 'lucide-react';
import { initTelegramApp, getValidatedTelegramUser } from '@/lib/telegram';

export default function HomePage() {
  const [telegramUser, setTelegramUser] = useState<any>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  // Инициализация Telegram Web App
  useEffect(() => {
    const initializeApp = async () => {
      try {
        initTelegramApp();
        const user = getValidatedTelegramUser();
        if (user) {
          setTelegramUser(user);
        }
        setIsInitialized(true);
      } catch (error) {
        console.error('Error initializing Telegram Web App:', error);
        setIsInitialized(true);
      }
    };

    initializeApp();
  }, []);

  const mainFeatures = [
    {
      title: 'Поиск друзей',
      description: 'Найдите узбеков в вашем городе',
      icon: Users,
      color: 'bg-blue-500',
      href: '/search',
      badge: 'Популярно'
    },
    {
      title: 'Мой профиль',
      description: 'Создайте или обновите профиль',
      icon: User,
      color: 'bg-green-500',
      href: '/profile'
    },
    {
      title: 'Новичкам',
      description: 'Гид по адаптации в новой стране',
      icon: GraduationCap,
      color: 'bg-purple-500',
      href: '/newcomers',
      badge: 'Новое'
    },
    {
      title: 'Юристы',
      description: 'Найдите юристов-узбеков',
      icon: Building2,
      color: 'bg-orange-500',
      href: '/lawyers'
    },
    {
      title: 'Халял магазины',
      description: 'Карта халял магазинов',
      icon: ShoppingBag,
      color: 'bg-emerald-500',
      href: '/halal-shops'
    },
    {
      title: 'Работа',
      description: 'Вакансии и поиск работы',
      icon: Briefcase,
      color: 'bg-indigo-500',
      href: '/jobs'
    },
    {
      title: 'Жилье',
      description: 'Поиск квартир и комнат',
      icon: Home,
      color: 'bg-pink-500',
      href: '/housing'
    },
    {
      title: 'События',
      description: 'Мероприятия сообщества',
      icon: Calendar,
      color: 'bg-red-500',
      href: '/events'
    }
  ];

  const quickActions = [
    {
      title: 'Определить местоположение',
      description: 'Автоматически заполнить город',
      icon: MapPin,
      action: 'location'
    },
    {
      title: 'Написать в чат',
      description: 'Общий чат сообщества',
      icon: MessageCircle,
      action: 'chat'
    },
    {
      title: 'Помощь',
      description: 'FAQ и поддержка',
      icon: FileText,
      action: 'help'
    }
  ];

  if (!isInitialized) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Загрузка...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Заголовок */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
        <div className="max-w-4xl mx-auto px-4 py-8 md:ml-64">
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                <Users className="w-8 h-8" />
              </div>
            </div>
            <h1 className="text-3xl font-bold mb-2">
              Uzbek Community
            </h1>
            <p className="text-blue-100">
              Все необходимое для узбеков за границей
            </p>
            {telegramUser && (
              <p className="text-sm text-blue-200 mt-2">
                Привет, {telegramUser.first_name}! 👋
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-6 md:ml-64">
        {/* Основные функции */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Основные функции
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {mainFeatures.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Link
                  key={index}
                  href={feature.href}
                  className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow group"
                >
                  <div className="flex items-start space-x-4">
                    <div className={`w-12 h-12 ${feature.color} rounded-lg flex items-center justify-center flex-shrink-0`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2 mb-1">
                        <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                          {feature.title}
                        </h3>
                        {feature.badge && (
                          <span className="px-2 py-1 text-xs bg-blue-100 text-blue-700 rounded-full">
                            {feature.badge}
                          </span>
                        )}
                      </div>
                      <p className="text-gray-600 text-sm mb-2">
                        {feature.description}
                      </p>
                      <div className="flex items-center text-blue-500 text-sm font-medium">
                        <span>Открыть</span>
                        <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Быстрые действия */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Быстрые действия
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {quickActions.map((action, index) => {
              const Icon = action.icon;
              return (
                <button
                  key={index}
                  onClick={() => {
                    if (action.action === 'location') {
                      // Показать уведомление о геолокации
                      alert('Функция определения местоположения доступна в профиле');
                    } else if (action.action === 'chat') {
                      // Открыть чат
                      window.open('https://t.me/uzbek_community_chat', '_blank');
                    } else if (action.action === 'help') {
                      // Открыть помощь
                      window.open('https://t.me/uzbek_community_support', '_blank');
                    }
                  }}
                  className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow text-left group"
                >
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Icon className="w-6 h-6 text-gray-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                        {action.title}
                      </h3>
                      <p className="text-gray-600 text-sm">
                        {action.description}
                      </p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Статистика */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-6">
            Наша статистика
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-2xl font-bold text-blue-500 mb-1">1000+</div>
              <div className="text-gray-600 text-sm">Пользователей</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-green-500 mb-1">50+</div>
              <div className="text-gray-600 text-sm">Стран</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-purple-500 mb-1">100+</div>
              <div className="text-gray-600 text-sm">Групп</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-orange-500 mb-1">5000+</div>
              <div className="text-gray-600 text-sm">Связей</div>
            </div>
          </div>
        </div>

        {/* Футер */}
        <div className="text-center text-gray-500 text-sm">
          <p>&copy; 2024 Uzbek Community. Все права защищены.</p>
        </div>
      </div>
    </div>
  );
}
