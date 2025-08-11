'use client';

import { useState, useEffect } from 'react';
import { Home, MapPin, DollarSign, Users, Bed, Bath, Square, Search, Filter, Phone, Mail, Calendar, Star } from 'lucide-react';
import { initTelegramApp } from '@/lib/telegram';
import BackButton from '@/components/BackButton';

export default function HousingPage() {
  const [isInitialized, setIsInitialized] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [priceRange, setPriceRange] = useState('');

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

  const propertyTypes = [
    'Barcha turlar',
    'Kvartira',
    'Xona',
    'Studiya',
    'Uy',
    'Kottej'
  ];

  const priceRanges = [
    'Barcha narxlar',
    '30,000 ₽ gacha',
    '30,000 - 50,000 ₽',
    '50,000 - 80,000 ₽',
    '80,000 - 120,000 ₽',
    '120,000 ₽ dan yuqori'
  ];

  const housingListings = [
    {
      id: 1,
      title: 'Zamonaviy 2 xonali kvartira',
      description: 'Yangi qurilgan binoda, metro yaqinida, to\'liq jihozlangan kvartira. O\'zbek oilasi uchun ideal.',
      address: 'Moskva, Tverskaya ko\'chasi, 25',
      price: '85,000 ₽',
      type: 'Kvartira',
      city: 'Moskva',
      rooms: 2,
      area: 65,
      floor: 8,
      totalFloors: 12,
      contact: {
        name: 'Aziz Karimov',
        phone: '+7 (495) 123-45-67',
        email: 'aziz@housing.ru'
      },
      postedDate: '2024-01-15',
      features: ['Metro yaqinida', 'To\'liq jihozlangan', 'Internet', 'Konditsioner', 'Mebel'],
      images: ['/api/placeholder/400/300'],
      rating: 4.8
    },
    {
      id: 2,
      title: 'Katta xona, oila uchun',
      description: 'Katta va yorug\' xona, umumiy oshxona va hammom. O\'zbek oilasi uchun mos.',
      address: 'Sankt-Peterburg, Nevskiy prospekt, 15',
      price: '45,000 ₽',
      type: 'Xona',
      city: 'Sankt-Peterburg',
      rooms: 1,
      area: 25,
      floor: 3,
      totalFloors: 5,
      contact: {
        name: 'Malika Yusupova',
        phone: '+7 (812) 234-56-78',
        email: 'malika@housing.ru'
      },
      postedDate: '2024-01-14',
      features: ['Yorug\' xona', 'Umumiy oshxona', 'Hammom', 'Internet', 'Qizdirish'],
      images: ['/api/placeholder/400/300'],
      rating: 4.5
    },
    {
      id: 3,
      title: 'Studiya kvartira',
      description: 'Kichik va qulay studiya kvartira, yagona talaba yoki juftlik uchun.',
      address: 'Kazan, Bauman ko\'chasi, 8',
      price: '35,000 ₽',
      type: 'Studiya',
      city: 'Kazan',
      rooms: 1,
      area: 30,
      floor: 5,
      totalFloors: 9,
      contact: {
        name: 'Rustam Toshmatov',
        phone: '+7 (843) 345-67-89',
        email: 'rustam@housing.ru'
      },
      postedDate: '2024-01-13',
      features: ['Studiya', 'To\'liq jihozlangan', 'Internet', 'Konditsioner', 'Parking'],
      images: ['/api/placeholder/400/300'],
      rating: 4.6
    },
    {
      id: 4,
      title: '3 xonali kvartira, oila uchun',
      description: 'Katta oila uchun 3 xonali kvartira, bog\'cha va maktab yaqinida.',
      address: 'Novosibirsk, Krasnyy prospekt, 22',
      price: '65,000 ₽',
      type: 'Kvartira',
      city: 'Novosibirsk',
      rooms: 3,
      area: 85,
      floor: 4,
      totalFloors: 10,
      contact: {
        name: 'Dilfuza Rahimova',
        phone: '+7 (383) 456-78-90',
        email: 'dilfuza@housing.ru'
      },
      postedDate: '2024-01-12',
      features: ['3 xona', 'Bog\'cha yaqinida', 'Maktab yaqinida', 'Parking', 'Lift'],
      images: ['/api/placeholder/400/300'],
      rating: 4.7
    },
    {
      id: 5,
      title: 'Kottej, shahar chetida',
      description: 'Shahar chetidagi chiroyli kottej, tabiat yaqinida, o\'zbek oilasi uchun.',
      address: 'Yekaterinburg, Lenina ko\'chasi, 45',
      price: '120,000 ₽',
      type: 'Kottej',
      city: 'Yekaterinburg',
      rooms: 4,
      area: 150,
      floor: 2,
      totalFloors: 2,
      contact: {
        name: 'Alisher Karimov',
        phone: '+7 (343) 567-89-01',
        email: 'alisher@housing.ru'
      },
      postedDate: '2024-01-11',
      features: ['Kottej', 'Bog\'', 'Garaj', 'Oshxona', '4 xona'],
      images: ['/api/placeholder/400/300'],
      rating: 4.9
    },
    {
      id: 6,
      title: '1 xonali kvartira, markazda',
      description: 'Shahar markazida joylashgan 1 xonali kvartira, transport va do\'konlar yaqinida.',
      address: 'Moskva, Arbat ko\'chasi, 12',
      price: '75,000 ₽',
      type: 'Kvartira',
      city: 'Moskva',
      rooms: 1,
      area: 40,
      floor: 6,
      totalFloors: 8,
      contact: {
        name: 'Nodira Karimova',
        phone: '+7 (495) 678-90-12',
        email: 'nodira@housing.ru'
      },
      postedDate: '2024-01-10',
      features: ['Markazda', 'Transport yaqinida', 'Do\'konlar yaqinida', 'Internet', 'Mebel'],
      images: ['/api/placeholder/400/300'],
      rating: 4.4
    }
  ];

  const filteredListings = housingListings.filter(listing => {
    const matchesSearch = listing.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         listing.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         listing.address.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCity = selectedCity === '' || selectedCity === 'Barcha shaharlar' || 
                       listing.city === selectedCity;
    const matchesType = selectedType === '' || selectedType === 'Barcha turlar' || 
                       listing.type === selectedType;
    
    // Простая фильтрация по цене
    let matchesPrice = true;
    if (priceRange && priceRange !== 'Barcha narxlar') {
      const price = parseInt(listing.price.replace(/[^\d]/g, ''));
      if (priceRange.includes('gacha') && price > 30000) matchesPrice = false;
      else if (priceRange.includes('30,000 - 50,000') && (price < 30000 || price > 50000)) matchesPrice = false;
      else if (priceRange.includes('50,000 - 80,000') && (price < 50000 || price > 80000)) matchesPrice = false;
      else if (priceRange.includes('80,000 - 120,000') && (price < 80000 || price > 120000)) matchesPrice = false;
      else if (priceRange.includes('dan yuqori') && price < 120000) matchesPrice = false;
    }
    
    return matchesSearch && matchesCity && matchesType && matchesPrice;
  });

  const handleCall = (phone: string) => {
    window.open(`tel:${phone}`, '_self');
  };

  const handleEmail = (email: string) => {
    window.open(`mailto:${email}`, '_self');
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('uz-UZ');
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
          <BackButton href="/" />
        </div>

        <div className="bg-gradient-to-r from-pink-500 to-rose-600 text-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex items-center space-x-3 mb-4">
            <Home className="w-8 h-8" />
            <h1 className="text-3xl font-bold">Uy-joy va kvartiralar</h1>
          </div>
          <p className="text-pink-100">
            Shahringizdagi uy-joy va kvartira takliflari
          </p>
        </div>

        {/* Поиск и фильтры */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Qidirish..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              />
            </div>
            <select
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
            >
              {cities.map((city, index) => (
                <option key={index} value={city}>{city}</option>
              ))}
            </select>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
            >
              {propertyTypes.map((type, index) => (
                <option key={index} value={type}>{type}</option>
              ))}
            </select>
            <select
              value={priceRange}
              onChange={(e) => setPriceRange(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
            >
              {priceRanges.map((range, index) => (
                <option key={index} value={range}>{range}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Список объявлений */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredListings.map((listing) => (
            <div key={listing.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="relative">
                <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
                  <Home className="w-16 h-16 text-gray-400" />
                </div>
                <div className="absolute top-2 right-2">
                  <div className="flex items-center space-x-1 bg-white/90 px-2 py-1 rounded-full">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-sm font-medium">{listing.rating}</span>
                  </div>
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-lg font-semibold text-gray-900">{listing.title}</h3>
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Calendar className="w-4 h-4" />
                    <span>{formatDate(listing.postedDate)}</span>
                  </div>
                </div>
                
                <p className="text-gray-600 text-sm mb-4">{listing.description}</p>
                
                <div className="space-y-2 mb-4">
                  <div className="flex items-center space-x-2 text-sm text-gray-700">
                    <MapPin className="w-4 h-4 text-gray-400" />
                    <span>{listing.address}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-700">
                    <DollarSign className="w-4 h-4 text-green-500" />
                    <span className="font-semibold text-lg">{listing.price}</span>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4 mb-4">
                  <div className="flex items-center space-x-2 text-sm">
                    <Bed className="w-4 h-4 text-blue-500" />
                    <span>{listing.rooms} xona</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm">
                    <Square className="w-4 h-4 text-purple-500" />
                    <span>{listing.area} m²</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm">
                    <Users className="w-4 h-4 text-orange-500" />
                    <span>{listing.floor}/{listing.totalFloors}</span>
                  </div>
                </div>

                <div className="mb-4">
                  <h4 className="text-sm font-medium text-gray-900 mb-2">Xususiyatlar:</h4>
                  <div className="flex flex-wrap gap-1">
                    {listing.features.slice(0, 3).map((feature, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-pink-100 text-pink-700 text-xs rounded-full"
                      >
                        {feature}
                      </span>
                    ))}
                    {listing.features.length > 3 && (
                      <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                        +{listing.features.length - 3}
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex space-x-2">
                  <button
                    onClick={() => handleCall(listing.contact.phone)}
                    className="flex-1 bg-pink-500 text-white py-2 px-4 rounded-lg hover:bg-pink-600 transition-colors flex items-center justify-center space-x-2"
                  >
                    <Phone className="w-4 h-4" />
                    <span>Qo'ng'iroq</span>
                  </button>
                  <button
                    onClick={() => handleEmail(listing.contact.email)}
                    className="flex-1 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors flex items-center justify-center space-x-2"
                  >
                    <Mail className="w-4 h-4" />
                    <span>Email</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredListings.length === 0 && (
          <div className="text-center py-12">
            <Home className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Uy-joy topilmadi</h3>
            <p className="text-gray-600">Boshqa qidiruv so'zlari yoki filtrlarni sinab ko'ring</p>
          </div>
        )}
      </div>
    </div>
  );
} 