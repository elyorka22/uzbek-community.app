'use client';

import { useState, useEffect } from 'react';
import { GraduationCap, FileText, MapPin, Phone, Globe, Users, Building2, ShoppingBag, CheckCircle, AlertCircle, Info } from 'lucide-react';
import { initTelegramApp } from '@/lib/telegram';
import BackButton from '@/components/BackButton';

export default function NewcomersPage() {
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const initializeApp = async () => {
      try {
        initTelegramApp();
        setIsInitialized(true);
      } catch (error) {
        console.error('Error initializing Telegram Web App:', error);
        setIsInitialized(true);
      }
    };

    initializeApp();
  }, []);

  const guides = [
    {
      title: 'Hujjatlarni tayyorlash',
      description: 'Yangi mamlakatda yashash uchun kerakli hujjatlar',
      icon: FileText,
      color: 'bg-blue-500',
      items: [
        'Pasport va vizalar',
        'Ishlash ruxsatnomasi',
        'Tibbiy sug\'urta',
        'Bank hisob raqami',
        'Telefon raqami'
      ]
    },
    {
      title: 'Manzil va transport',
      description: 'Shaharda harakatlanish va yashash joyi',
      icon: MapPin,
      color: 'bg-green-500',
      items: [
        'Metro va avtobuslar',
        'Uy-joy qidirish',
        'Mahalla xaritasi',
        'Taksi xizmatlari',
        'Velosiped yo\'llari'
      ]
    },
    {
      title: 'Ish va ta\'lim',
      description: 'Ish topish va ta\'lim olish imkoniyatlari',
      icon: GraduationCap,
      color: 'bg-purple-500',
      items: [
        'Ish qidirish platformalari',
        'Til o\'rganish markazlari',
        'Kasb-hunar maktablari',
        'Universitetlar',
        'Stajirovka imkoniyatlari'
      ]
    },
    {
      title: 'Sog\'liq va tibbiyot',
      description: 'Sog\'liqni saqlash va tibbiy yordam',
      icon: Building2,
      color: 'bg-red-500',
      items: [
        'Shifoxonalar va klinikalar',
        'Dori-darmonlar',
        'Stomatologiya xizmatlari',
        'Shoshilinch yordam',
        'Sog\'liqni saqlash markazlari'
      ]
    },
    {
      title: 'Oziq-ovqat va do\'konlar',
      description: 'Halol oziq-ovqat va kerakli mahsulotlar',
      icon: ShoppingBag,
      color: 'bg-orange-500',
      items: [
        'Halol do\'konlar',
        'Oziq-ovqat bozorlari',
        'Restoranlar va kafelar',
        'Milliy taomlar',
        'Oziq-ovqat yetkazib berish'
      ]
    },
    {
      title: 'Jamiyat va aloqa',
      description: 'O\'zbek jamiyati va yangi do\'stlar',
      icon: Users,
      color: 'bg-indigo-500',
      items: [
        'O\'zbek jamiyati guruhlari',
        'Tadbirlar va uchrashuvlar',
        'Chat va ijtimoiy tarmoqlar',
        'Madaniy tadbirlar',
        'Sport va dam olish'
      ]
    }
  ];

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

  return (
    <div className="min-h-screen bg-gray-50 py-6">
      <div className="max-w-4xl mx-auto px-4">
        <div className="mb-4">
          <BackButton href="/" />
        </div>

        <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex items-center space-x-3 mb-4">
            <GraduationCap className="w-8 h-8" />
            <h1 className="text-3xl font-bold">Yangi kelganlar uchun</h1>
          </div>
          <p className="text-purple-100">
            Yangi mamlakatda moslashish bo'yicha to'liq yo'riqnoma
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {guides.map((guide, index) => {
            const Icon = guide.icon;
            return (
              <div key={index} className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <div className={`w-12 h-12 ${guide.color} rounded-lg flex items-center justify-center`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{guide.title}</h3>
                    <p className="text-sm text-gray-600">{guide.description}</p>
                  </div>
                </div>
                <ul className="space-y-2">
                  {guide.items.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-center space-x-2 text-sm text-gray-700">
                      <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
} 