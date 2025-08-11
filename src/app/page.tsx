'use client';

import { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { 
  Globe,
  ArrowRight
} from 'lucide-react';
import { initTelegramApp, getValidatedTelegramUser } from '@/lib/telegram';
import { useSearchParams } from 'next/navigation';

function HomePageContent() {
  const searchParams = useSearchParams();
  const countryParam = searchParams.get('country');
  
  const [telegramUser, setTelegramUser] = useState<{
    id: number;
    first_name?: string;
    last_name?: string;
    username?: string;
    photo_url?: string;
  } | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState<string | null>(countryParam);

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

  // Обновляем выбранную страну при изменении параметра URL
  useEffect(() => {
    if (countryParam) {
      setSelectedCountry(countryParam);
    }
  }, [countryParam]);

  const countries = [
    {
      id: 'russia',
      name: 'Rossiya',
      nameEn: 'Russia',
      flag: '🇷🇺',
      color: 'bg-red-500',
      gradient: 'from-red-500 to-red-600',
      description: 'O\'zbek jamiyati Rossiyada'
    },
    {
      id: 'turkey',
      name: 'Turkiya',
      nameEn: 'Turkey',
      flag: '🇹🇷',
      color: 'bg-red-600',
      gradient: 'from-red-600 to-red-700',
      description: 'O\'zbek jamiyati Turkiyada'
    },
    {
      id: 'usa',
      name: 'AQSh',
      nameEn: 'USA',
      flag: '🇺🇸',
      color: 'bg-blue-600',
      gradient: 'from-blue-600 to-blue-700',
      description: 'O\'zbek jamiyati AQShda'
    },
    {
      id: 'korea',
      name: 'Koreya',
      nameEn: 'South Korea',
      flag: '🇰🇷',
      color: 'bg-blue-500',
      gradient: 'from-blue-500 to-blue-600',
      description: 'O\'zbek jamiyati Koreyada'
    },
    {
      id: 'china',
      name: 'Xitoy',
      nameEn: 'China',
      flag: '🇨🇳',
      color: 'bg-red-500',
      gradient: 'from-red-500 to-red-600',
      description: 'O\'zbek jamiyati Xitoyda'
    },
    {
      id: 'uae',
      name: 'BAA',
      nameEn: 'UAE',
      flag: '🇦🇪',
      color: 'bg-green-600',
      gradient: 'from-green-600 to-green-700',
      description: 'O\'zbek jamiyati BAAda'
    },
    {
      id: 'poland',
      name: 'Polsha',
      nameEn: 'Poland',
      flag: '🇵🇱',
      color: 'bg-red-500',
      gradient: 'from-red-500 to-red-600',
      description: 'O\'zbek jamiyati Polshada'
    },
    {
      id: 'germany',
      name: 'Germaniya',
      nameEn: 'Germany',
      flag: '🇩🇪',
      color: 'bg-yellow-500',
      gradient: 'from-yellow-500 to-yellow-600',
      description: 'O\'zbek jamiyati Germaniyada'
    },
    {
      id: 'canada',
      name: 'Kanada',
      nameEn: 'Canada',
      flag: '🇨🇦',
      color: 'bg-red-500',
      gradient: 'from-red-500 to-red-600',
      description: 'O\'zbek jamiyati Kanadada'
    },
    {
      id: 'latvia',
      name: 'Latviya',
      nameEn: 'Latvia',
      flag: '🇱🇻',
      color: 'bg-red-500',
      gradient: 'from-red-500 to-red-600',
      description: 'O\'zbek jamiyati Latviyada'
    },
    {
      id: 'lithuania',
      name: 'Litva',
      nameEn: 'Lithuania',
      flag: '🇱🇹',
      color: 'bg-yellow-500',
      gradient: 'from-yellow-500 to-yellow-600',
      description: 'O\'zbek jamiyati Litvada'
    },
    {
      id: 'estonia',
      name: 'Estoniya',
      nameEn: 'Estonia',
      flag: '🇪🇪',
      color: 'bg-blue-500',
      gradient: 'from-blue-500 to-blue-600',
      description: 'O\'zbek jamiyati Estoniyada'
    },
    {
      id: 'kazakhstan',
      name: 'Qozog\'iston',
      nameEn: 'Kazakhstan',
      flag: '🇰🇿',
      color: 'bg-blue-500',
      gradient: 'from-blue-500 to-blue-600',
      description: 'O\'zbek jamiyati Qozog\'istonda'
    }
  ];

  const handleCountrySelect = (countryId: string) => {
    setSelectedCountry(countryId);
    // Сохраняем выбор в localStorage
    localStorage.setItem('selectedCountry', countryId);
  };

  const getCountryMenu = (countryId: string) => {
    const country = countries.find(c => c.id === countryId);
    if (!country) return null;

    const menuItems = [
      {
        title: 'Mening profilim',
        description: 'Profil yarating yoki yangilang',
        icon: '👤',
        color: 'bg-green-500',
        href: `/profile?country=${countryId}`
      },
      {
        title: 'Huquqshunoslar',
        description: 'O\'zbek huquqshunoslarini toping',
        icon: '⚖️',
        color: 'bg-orange-500',
        href: `/lawyers?country=${countryId}`
      },
      {
        title: 'Halol do\'konlar',
        description: 'Halol do\'konlar xaritasi',
        icon: '🛒',
        color: 'bg-emerald-500',
        href: `/halal-shops?country=${countryId}`
      },
      {
        title: 'Ish',
        description: 'Vakansiyalar va ish qidirish',
        icon: '💼',
        color: 'bg-indigo-500',
        href: `/jobs?country=${countryId}`
      },
      {
        title: 'Uy-joy',
        description: 'Kvartira va xonalar qidirish',
        icon: '🏠',
        color: 'bg-pink-500',
        href: `/housing?country=${countryId}`
      }
    ];

    return { country, menuItems };
  };

  if (!isInitialized) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Yuklanmoqda...</p>
        </div>
      </div>
    );
  }

  // Если страна выбрана, показываем меню
  if (selectedCountry) {
    const countryMenu = getCountryMenu(selectedCountry);
    if (!countryMenu) return null;

    return (
      <div className="min-h-screen bg-gray-50">
        {/* Заголовок */}
        <div className={`bg-gradient-to-r ${countryMenu.country.gradient} text-white`}>
          <div className="max-w-4xl mx-auto px-4 py-8">
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center text-3xl">
                  {countryMenu.country.flag}
                </div>
              </div>
              <h1 className="text-3xl font-bold mb-2">
                {countryMenu.country.name}
              </h1>
              <p className="text-blue-100">
                {countryMenu.country.description}
              </p>
              {telegramUser && (
                <p className="text-sm text-blue-200 mt-2">
                  Salom, {telegramUser.first_name}! 👋
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 py-6">
          {/* Кнопка назад */}
          <div className="mb-6">
            <button
              onClick={() => setSelectedCountry(null)}
              className="flex items-center space-x-2 text-blue-600 hover:text-blue-800 transition-colors"
            >
              <ArrowRight className="w-4 h-4 rotate-180" />
              <span>Boshqa mamlakat tanlash</span>
            </button>
          </div>

          {/* Меню функций */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {countryMenu.menuItems.map((item, index) => (
              <Link
                key={index}
                href={item.href}
                className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow group"
              >
                <div className="flex items-start space-x-4">
                  <div className={`w-12 h-12 ${item.color} rounded-lg flex items-center justify-center flex-shrink-0 text-2xl`}>
                    {item.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2 mb-1">
                      <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                        {item.title}
                      </h3>
                    </div>
                    <p className="text-gray-600 text-sm mb-2">
                      {item.description}
                    </p>
                    <div className="flex items-center text-blue-500 text-sm font-medium">
                      <span>Ochish</span>
                      <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Главная страница с выбором страны
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Заголовок */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                <Globe className="w-8 h-8" />
              </div>
            </div>
            <h1 className="text-3xl font-bold mb-2">
              O&apos;zbek Jamiyati
            </h1>
            <p className="text-blue-100">
              Chet eldagi o&apos;zbeklar uchun hamma narsa
            </p>
            {telegramUser && (
              <p className="text-sm text-blue-200 mt-2">
                Salom, {telegramUser.first_name}! 👋
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-6">
        {/* Выбор страны */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Qaysi mamlakatda yashaysiz?
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {countries.map((country) => (
              <button
                key={country.id}
                onClick={() => handleCountrySelect(country.id)}
                className="group flex flex-col items-center space-y-3 p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-200 hover:scale-105"
              >
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center text-3xl group-hover:bg-blue-50 transition-colors">
                  {country.flag}
                </div>
                <div className="text-center">
                  <h3 className="text-sm font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                    {country.name}
                  </h3>
                  <p className="text-xs text-gray-500">
                    {country.nameEn}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Информация */}
        <div className="text-center text-gray-500 text-sm">
          <p>&copy; 2024 O&apos;zbek Jamiyati. Barcha huquqlar himoyalangan.</p>
        </div>
      </div>
    </div>
  );
}

export default function HomePage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Yuklanmoqda...</p>
        </div>
      </div>
    }>
      <HomePageContent />
    </Suspense>
  );
}
