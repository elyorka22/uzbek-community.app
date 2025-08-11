'use client';

import { useState, useEffect, Suspense } from 'react';
import { Home, MapPin, Users, Square, Search, Phone, Mail, Calendar, Star } from 'lucide-react';
import { initTelegramApp } from '@/lib/telegram';
import BackButton from '@/components/BackButton';
import { useSearchParams } from 'next/navigation';

function HousingPageContent() {
  const searchParams = useSearchParams();
  const countryParam = searchParams.get('country');
  
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

  const propertyTypes = [
    'Barcha turlar',
    'Kvartira',
    'Uy',
    'Xona',
    'Studiya',
    'Kottej'
  ];

  const priceRanges = [
    'Barcha narxlar',
    '30,000 - 50,000 ₽',
    '50,000 - 80,000 ₽',
    '80,000 - 120,000 ₽',
    '120,000 - 200,000 ₽',
    '200,000+ ₽'
  ];

  const housingListings = [
    {
      id: 1,
      title: 'Yangi kvartira, markaziy rayon',
      description: 'Yangi qurilgan binoda, yaxshi jihozlangan kvartira. Metro yaqinida, transport aloqasi yaxshi.',
      address: 'Moskva, markaziy rayon, Tverskaya ko\'chasi, 25',
      price: '120,000 ₽',
      type: 'Kvartira',
      rooms: 2,
      area: 65,
      city: 'Moskva',
      contact: {
        phone: '+7 (495) 123-45-67',
        email: 'housing@example.com'
      },
      postedDate: '2024-01-15',
      rating: 4.8,
      features: ['Metro yaqinida', 'Yangi qurilgan', 'Parking', 'Lift']
    },
    {
      id: 2,
      title: 'Kichik uy, tich joyda',
      description: 'Tich va hovuzli joyda joylashgan kichik uy. Bog\' va hovuz mavjud.',
      address: 'Moskva, Podmoskovye, Lesnaya ko\'chasi, 15',
      price: '180,000 ₽',
      type: 'Uy',
      rooms: 3,
      area: 120,
      city: 'Moskva',
      contact: {
        phone: '+7 (495) 234-56-78',
        email: 'house@example.com'
      },
      postedDate: '2024-01-14',
      rating: 4.6,
      features: ['Bog\'', 'Hovuz', 'Parking', 'Tich joy']
    },
    {
      id: 3,
      title: 'Studiya kvartira, talabalar uchun',
      description: 'Talabalar uchun qulay studiya kvartira. Universitet yaqinida, arzon narxda.',
      address: 'Sankt-Peterburg, Nevskiy prospekt, 45',
      price: '45,000 ₽',
      type: 'Studiya',
      rooms: 1,
      area: 35,
      city: 'Sankt-Peterburg',
      contact: {
        phone: '+7 (812) 345-67-89',
        email: 'student@example.com'
      },
      postedDate: '2024-01-13',
      rating: 4.4,
      features: ['Universitet yaqinida', 'Arzon', 'Yangi jihozlar', 'Internet']
    },
    {
      id: 4,
      title: 'Katta kvartira, oila uchun',
      description: 'Katta oila uchun qulay kvartira. 3 xona, katta oshxona, balkon.',
      address: 'Kazan, markaziy rayon, Bauman ko\'chasi, 12',
      price: '85,000 ₽',
      type: 'Kvartira',
      rooms: 3,
      area: 85,
      city: 'Kazan',
      contact: {
        phone: '+7 (843) 456-78-90',
        email: 'family@example.com'
      },
      postedDate: '2024-01-12',
      rating: 4.7,
      features: ['Katta oshxona', 'Balkon', 'Lift', 'Xavfsizlik']
    },
    {
      id: 5,
      title: 'Kottej, shahar chetida',
      description: 'Shahar chetida joylashgan qulay kottej. Bog\' va hovuz mavjud.',
      address: 'Novosibirsk, shahar cheti, Sadovaya ko\'chasi, 8',
      price: '150,000 ₽',
      type: 'Kottej',
      rooms: 4,
      area: 150,
      city: 'Novosibirsk',
      contact: {
        phone: '+7 (383) 567-89-01',
        email: 'cottage@example.com'
      },
      postedDate: '2024-01-11',
      rating: 4.9,
      features: ['Bog\'', 'Hovuz', 'Garaj', 'Tich joy']
    },
    {
      id: 6,
      title: 'Xona, umumiy kvartira',
      description: 'Umumiy kvartira ichida xona. Talabalar yoki ishlayotgan odamlar uchun.',
      address: 'Yekaterinburg, markaziy rayon, Lenina ko\'chasi, 30',
      price: '25,000 ₽',
      type: 'Xona',
      rooms: 1,
      area: 20,
      city: 'Yekaterinburg',
      contact: {
        phone: '+7 (343) 678-90-12',
        email: 'room@example.com'
      },
      postedDate: '2024-01-10',
      rating: 4.2,
      features: ['Arzon', 'Markazda', 'Internet', 'Oshxona']
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
    let matchesPrice = true;
    if (priceRange && priceRange !== 'Barcha narxlar') {
      const price = parseInt(listing.price.replace(/[^\d]/g, ''));
      if (priceRange.includes('30,000 - 50,000')) {
        matchesPrice = price >= 30000 && price <= 50000;
      } else if (priceRange.includes('50,000 - 80,000')) {
        matchesPrice = price >= 50000 && price <= 80000;
      } else if (priceRange.includes('80,000 - 120,000')) {
        matchesPrice = price >= 80000 && price <= 120000;
      } else if (priceRange.includes('120,000 - 200,000')) {
        matchesPrice = price >= 120000 && price <= 200000;
      } else if (priceRange.includes('200,000+')) {
        matchesPrice = price >= 200000;
      }
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
          <BackButton href={countryParam ? `/?country=${countryParam}` : '/'} />
        </div>

        <div className="bg-gradient-to-r from-pink-500 to-rose-600 text-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex items-center space-x-3 mb-4">
            <Home className="w-8 h-8" />
            <div>
              <h1 className="text-3xl font-bold">Uy-joy va kvartiralar</h1>
              {countryParam && (
                <p className="text-sm text-pink-200">
                  {getCountryName(countryParam)}dagi uy-joy takliflari
                </p>
              )}
            </div>
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
                  <div className="text-right">
                    <p className="text-2xl font-bold text-pink-600">{listing.price}</p>
                    <p className="text-sm text-gray-500">oyiga</p>
                  </div>
                </div>
                
                <p className="text-gray-600 text-sm mb-4">{listing.description}</p>
                
                <div className="space-y-2 mb-4">
                  <div className="flex items-center space-x-2 text-sm text-gray-700">
                    <MapPin className="w-4 h-4 text-gray-400" />
                    <span>{listing.address}</span>
                  </div>
                  <div className="flex items-center space-x-4 text-sm text-gray-600">
                    <div className="flex items-center space-x-1">
                      <Users className="w-4 h-4" />
                      <span>{listing.rooms} xona</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Square className="w-4 h-4" />
                      <span>{listing.area} m²</span>
                    </div>
                  </div>
                </div>

                <div className="mb-4">
                  <h4 className="text-sm font-medium text-gray-900 mb-2">Xususiyatlar:</h4>
                  <div className="flex flex-wrap gap-1">
                    {listing.features.map((feature, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-pink-100 text-pink-700 text-xs rounded-full"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <div className="flex items-center space-x-1">
                    <Calendar className="w-4 h-4" />
                    <span>{formatDate(listing.postedDate)}</span>
                  </div>
                  <span className="px-2 py-1 bg-gray-100 rounded-full text-xs">
                    {listing.type}
                  </span>
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

export default function HousingPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Yuklanmoqda...</p>
        </div>
      </div>
    }>
      <HousingPageContent />
    </Suspense>
  );
} 