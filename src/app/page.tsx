'use client';

import { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { 
  Globe,
  ArrowRight
} from 'lucide-react';
import { initTelegramApp, getValidatedTelegramUser } from '@/lib/telegram';
import { useSearchParams } from 'next/navigation';
import ThemeToggle from '@/components/ThemeToggle';

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
    if (!country) return [];

    const menuItems = [
      {
        title: 'Ish va vakansiyalar',
        description: 'Ish qidirish yoki vakansiya joylashtirish',
        icon: '💼',
        color: 'bg-indigo-500',
        href: `/jobs?country=${countryId}`
      },
      {
        title: 'Uy-joy va kvartiralar',
        description: 'Uy-joy ijaraga berish yoki qidirish',
        icon: '🏠',
        color: 'bg-pink-500',
        href: `/housing?country=${countryId}`
      },
      {
        title: 'Yuridik xizmatlar',
        description: 'Advokat va yuridik maslahatlar',
        icon: '⚖️',
        color: 'bg-emerald-500',
        href: `/lawyers?country=${countryId}`
      },
      {
        title: 'Do\'konlar va xizmatlar',
        description: 'O\'zbek do\'konlari va xizmatlari',
        icon: '🛍️',
        color: 'bg-orange-500',
        href: `/halal-shops?country=${countryId}`
      },
      {
        title: 'Tadbirlar',
        description: 'O\'zbek tadbirlari va uchrashuvlar',
        icon: '🎉',
        color: 'bg-purple-500',
        href: `/events?country=${countryId}`
      },
      {
        title: 'Mening profilim',
        description: 'Shaxsiy ma\'lumotlar va sozlamalar',
        icon: '👤',
        color: 'bg-blue-500',
        href: `/profile?country=${countryId}`
      }
    ];

    return menuItems;
  };

  if (!isInitialized) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Yuklanmoqda...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header с переключателем темы */}
      <div className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Globe className="w-6 h-6 text-blue-500" />
              <h1 className="text-xl font-bold text-gray-900 dark:text-white">Uzbek Community</h1>
            </div>
            <ThemeToggle />
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {!selectedCountry ? (
          // Выбор страны
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Qaysi mamlakatda yashaysiz?
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-8">
              O&apos;zingiz yashayotgan mamlakatni tanlang
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {countries.map((country) => (
                <button
                  key={country.id}
                  onClick={() => handleCountrySelect(country.id)}
                  className="bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md transition-all duration-200 border border-gray-200 dark:border-gray-700 p-6 text-left group"
                >
                  <div className="flex items-center space-x-4 mb-3">
                    <span className="text-3xl">{country.flag}</span>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        {country.name}
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {country.nameEn}
                      </p>
                    </div>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                    {country.description}
                  </p>
                  <div className="flex items-center text-blue-500 group-hover:text-blue-600">
                    <span className="text-sm font-medium">Tanlash</span>
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </div>
                </button>
              ))}
            </div>
          </div>
        ) : (
          // Меню для выбранной страны
          <div>
            <div className="text-center mb-8">
              <div className="flex items-center justify-center space-x-3 mb-4">
                <span className="text-4xl">
                  {countries.find(c => c.id === selectedCountry)?.flag}
                </span>
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                  {countries.find(c => c.id === selectedCountry)?.name}
                </h2>
              </div>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                {countries.find(c => c.id === selectedCountry)?.description}
              </p>
              <button
                onClick={() => setSelectedCountry(null)}
                className="text-blue-500 hover:text-blue-600 text-sm font-medium"
              >
                Boshqa mamlakat tanlash
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {getCountryMenu(selectedCountry).map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md transition-all duration-200 border border-gray-200 dark:border-gray-700 p-6 text-left group"
                >
                  <div className="flex items-center space-x-4 mb-3">
                    <div className={`p-3 rounded-lg ${item.color} text-white`}>
                      <span className="text-2xl">{item.icon}</span>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        {item.title}
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {item.description}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center text-blue-500 group-hover:text-blue-600">
                    <span className="text-sm font-medium">O&apos;tish</span>
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function HomePage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Yuklanmoqda...</p>
        </div>
      </div>
    }>
      <HomePageContent />
    </Suspense>
  );
}
