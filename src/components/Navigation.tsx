'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Home, 
  User, 
  Search, 
  GraduationCap, 
  Building2, 
  ShoppingBag, 
  Briefcase, 
  Calendar,
  Menu,
  X
} from 'lucide-react';

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const navigationItems = [
    {
      title: 'Главная',
      href: '/',
      icon: Home
    },
    {
      title: 'Профиль',
      href: '/profile',
      icon: User
    },
    {
      title: 'Поиск',
      href: '/search',
      icon: Search
    },
    {
      title: 'Новичкам',
      href: '/newcomers',
      icon: GraduationCap
    },
    {
      title: 'Юристы',
      href: '/lawyers',
      icon: Building2
    },
    {
      title: 'Халял магазины',
      href: '/halal-shops',
      icon: ShoppingBag
    },
    {
      title: 'Работа',
      href: '/jobs',
      icon: Briefcase
    },
    {
      title: 'События',
      href: '/events',
      icon: Calendar
    }
  ];

  const isActive = (href: string) => {
    if (href === '/') {
      return pathname === '/';
    }
    return pathname.startsWith(href);
  };

  return (
    <>
      {/* Мобильное меню кнопка */}
      <button
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="fixed top-4 right-4 z-50 p-2 bg-blue-500 text-white rounded-lg shadow-lg md:hidden"
      >
        {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Мобильное меню */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-40 bg-black bg-opacity-50 md:hidden">
          <div className="fixed top-0 right-0 h-full w-64 bg-white shadow-xl">
            <div className="p-4">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-bold text-gray-900">Меню</h2>
                <button
                  onClick={() => setIsMenuOpen(false)}
                  className="p-1 text-gray-500 hover:text-gray-700"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <nav className="space-y-2">
                {navigationItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setIsMenuOpen(false)}
                      className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                        isActive(item.href)
                          ? 'bg-blue-50 text-blue-700 border-l-4 border-blue-500'
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      <span className="font-medium">{item.title}</span>
                    </Link>
                  );
                })}
              </nav>
            </div>
          </div>
        </div>
      )}

      {/* Десктопное меню */}
      <nav className="hidden md:block fixed top-0 left-0 h-full w-64 bg-white shadow-lg border-r border-gray-200">
        <div className="p-6">
          <div className="mb-8">
            <h1 className="text-xl font-bold text-gray-900">Uzbek Community</h1>
            <p className="text-sm text-gray-600">Все для узбеков за границей</p>
          </div>
          
          <div className="space-y-2">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                    isActive(item.href)
                      ? 'bg-blue-50 text-blue-700 border-l-4 border-blue-500'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{item.title}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Отступ для десктопного меню */}
      <div className="hidden md:block w-64"></div>
    </>
  );
} 