'use client';

import { useState, useEffect } from 'react';
import { ShoppingBag, MapPin, Phone, Clock, Star, Search, Filter, Navigation } from 'lucide-react';
import { initTelegramApp } from '@/lib/telegram';
import BackButton from '@/components/BackButton';
import { useSearchParams } from 'next/navigation';

export default function HalalShopsPage() {
  const searchParams = useSearchParams();
  const countryParam = searchParams.get('country');
  
  const [isInitialized, setIsInitialized] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCity, setSelectedCity] = useState('');

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

  // Функция для получения названия страны
  const getCountryName = (countryId: string) => {
    const countries: { [key: string]: string } = {
      'russia': 'Rossiya',
      'turkey': 'Turkiya',
      'usa': 'AQSh',
      'korea': 'Koreya',
      'china': 'Xitoy',
      'uae': 'BAA',
      'poland': 'Polsha',
      'germany': 'Germaniya',
      'canada': 'Kanada',
      'latvia': 'Latviya',
      'lithuania': 'Litva',
      'estonia': 'Estoniya',
      'kazakhstan': 'Qozog\'iston'
    };
    return countries[countryId] || countryId;
  };

  const cities = [
    'Barcha shaharlar',
    'Moskva',
    'Sankt-Peterburg', 
    'Kazan',
    'Novosibirsk',
    'Yekaterinburg',
    'Nizhny Novgorod',
    'Chelyabinsk',
    'Samara',
    'Omsk',
    'Rostov-na-Donu'
  ];

  const halalShops = [
    {
      id: 1,
      name: 'Halal Market "Ummah"',
      description: 'Katta halal do\'kon, barcha turdagi mahsulotlar mavjud',
      address: 'Moskva, Tverskaya ko\'chasi, 15',
      phone: '+7 (495) 123-45-67',
      workingHours: '09:00 - 22:00',
      rating: 4.8,
      city: 'Moskva',
      features: ['Go\'sht', 'Sut mahsulotlari', 'Non', 'Sabzavotlar', 'Mevalar'],
      coordinates: { lat: 55.7558, lng: 37.6176 }
    },
    {
      id: 2,
      name: 'Halal Store "Al-Nur"',
      description: 'Halol go\'sht va mahsulotlar do\'koni',
      address: 'Moskva, Arbat ko\'chasi, 8',
      phone: '+7 (495) 234-56-78',
      workingHours: '08:00 - 21:00',
      rating: 4.6,
      city: 'Moskva',
      features: ['Go\'sht', 'Kolbasa', 'Sariyog\'', 'Pishiriq'],
      coordinates: { lat: 55.7494, lng: 37.5917 }
    },
    {
      id: 3,
      name: 'Halal Market "Ramadan"',
      description: 'Halol mahsulotlar va milliy taomlar',
      address: 'Sankt-Peterburg, Nevskiy prospekt, 25',
      phone: '+7 (812) 345-67-89',
      workingHours: '10:00 - 23:00',
      rating: 4.7,
      city: 'Sankt-Peterburg',
      features: ['Go\'sht', 'Balik', 'Non', 'Shirinliklar'],
      coordinates: { lat: 59.9311, lng: 30.3609 }
    },
    {
      id: 4,
      name: 'Halal Store "Bismillah"',
      description: 'Kichik halol do\'kon, sifatli mahsulotlar',
      address: 'Kazan, Bauman ko\'chasi, 12',
      phone: '+7 (843) 456-78-90',
      workingHours: '09:00 - 20:00',
      rating: 4.5,
      city: 'Kazan',
      features: ['Go\'sht', 'Sut', 'Non', 'Sabzavotlar'],
      coordinates: { lat: 55.7887, lng: 49.1221 }
    },
    {
      id: 5,
      name: 'Halal Market "Al-Huda"',
      description: 'Halol mahsulotlar va milliy taomlar do\'koni',
      address: 'Novosibirsk, Krasnyy prospekt, 18',
      phone: '+7 (383) 567-89-01',
      workingHours: '08:00 - 22:00',
      rating: 4.4,
      city: 'Novosibirsk',
      features: ['Go\'sht', 'Kolbasa', 'Sariyog\'', 'Mevalar'],
      coordinates: { lat: 55.0084, lng: 82.9357 }
    },
    {
      id: 6,
      name: 'Halal Store "Al-Amin"',
      description: 'Halol go\'sht va mahsulotlar',
      address: 'Yekaterinburg, Lenina ko\'chasi, 30',
      phone: '+7 (343) 678-90-12',
      workingHours: '09:00 - 21:00',
      rating: 4.3,
      city: 'Yekaterinburg',
      features: ['Go\'sht', 'Sut mahsulotlari', 'Non', 'Sabzavotlar'],
      coordinates: { lat: 56.8431, lng: 60.6454 }
    }
  ];

  const filteredShops = halalShops.filter(shop => {
    const matchesSearch = shop.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         shop.address.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCity = selectedCity === '' || selectedCity === 'Barcha shaharlar' || 
                       shop.city === selectedCity;
    return matchesSearch && matchesCity;
  });

  const handleCall = (phone: string) => {
    window.open(`tel:${phone}`, '_self');
  };

  const handleNavigate = (shop: any) => {
    const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(shop.address)}`;
    window.open(url, '_blank');
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

  return (
    <div className="min-h-screen bg-gray-50 py-6">
      <div className="max-w-6xl mx-auto px-4">
        <div className="mb-4">
          <BackButton href={countryParam ? `/?country=${countryParam}` : '/'} />
        </div>

        <div className="bg-gradient-to-r from-emerald-500 to-green-600 text-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex items-center space-x-3 mb-4">
            <ShoppingBag className="w-8 h-8" />
            <div>
              <h1 className="text-3xl font-bold">Halol do'konlar</h1>
              {countryParam && (
                <p className="text-sm text-emerald-200">
                  {getCountryName(countryParam)}dagi halol do'konlar
                </p>
              )}
            </div>
          </div>
          <p className="text-emerald-100">
            Shahringizdagi halol mahsulotlar do'konlari
          </p>
        </div>

        {/* Поиск и фильтры */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Do'kon nomi yoki manzilini qidiring..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                />
              </div>
            </div>
            <div className="md:w-64">
              <select
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              >
                {cities.map((city, index) => (
                  <option key={index} value={city}>{city}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Список магазинов */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredShops.map((shop) => (
            <div key={shop.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-lg font-semibold text-gray-900">{shop.name}</h3>
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-sm text-gray-600">{shop.rating}</span>
                  </div>
                </div>
                
                <p className="text-gray-600 text-sm mb-4">{shop.description}</p>
                
                <div className="space-y-2 mb-4">
                  <div className="flex items-center space-x-2 text-sm text-gray-700">
                    <MapPin className="w-4 h-4 text-gray-400" />
                    <span>{shop.address}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-700">
                    <Phone className="w-4 h-4 text-gray-400" />
                    <span>{shop.phone}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-700">
                    <Clock className="w-4 h-4 text-gray-400" />
                    <span>{shop.workingHours}</span>
                  </div>
                </div>

                <div className="mb-4">
                  <h4 className="text-sm font-medium text-gray-900 mb-2">Mavjud mahsulotlar:</h4>
                  <div className="flex flex-wrap gap-1">
                    {shop.features.map((feature, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-emerald-100 text-emerald-700 text-xs rounded-full"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex space-x-2">
                  <button
                    onClick={() => handleCall(shop.phone)}
                    className="flex-1 bg-emerald-500 text-white py-2 px-4 rounded-lg hover:bg-emerald-600 transition-colors flex items-center justify-center space-x-2"
                  >
                    <Phone className="w-4 h-4" />
                    <span>Qo'ng'iroq</span>
                  </button>
                  <button
                    onClick={() => handleNavigate(shop)}
                    className="flex-1 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors flex items-center justify-center space-x-2"
                  >
                    <Navigation className="w-4 h-4" />
                    <span>Yo'l</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredShops.length === 0 && (
          <div className="text-center py-12">
            <ShoppingBag className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Do'konlar topilmadi</h3>
            <p className="text-gray-600">Boshqa qidiruv so'zlari yoki shaharni sinab ko'ring</p>
          </div>
        )}
      </div>
    </div>
  );
} 