'use client';

import { useState, useEffect } from 'react';
import { Calendar, MapPin, Clock, Users, Search, Filter, Phone, Mail, Plus, Star, Heart } from 'lucide-react';
import { initTelegramApp } from '@/lib/telegram';
import BackButton from '@/components/BackButton';
import { useSearchParams } from 'next/navigation';

export default function EventsPage() {
  const searchParams = useSearchParams();
  const countryParam = searchParams.get('country');
  
  const [isInitialized, setIsInitialized] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [showAddEvent, setShowAddEvent] = useState(false);

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

  const categories = [
    'Barcha tadbirlar',
    'Madaniyat va san\'at',
    'Sport va dam olish',
    'Ta\'lim va seminarlar',
    'Biznes va networking',
    'Diniy tadbirlar',
    'Oshxona va taomlar',
    'Musiqa va raqs',
    'Boshqa'
  ];

  const events = [
    {
      id: 1,
      title: 'O\'zbek milliy taomlari festivali',
      description: 'O\'zbekistonning eng yaxshi taomlarini tatib ko\'ring va o\'rganing. Navruz taomlari va zamonaviy o\'zbek oshxonasi.',
      location: 'Moskva, Gorkiy Park',
      date: '2024-03-20',
      time: '14:00 - 20:00',
      city: 'Moskva',
      category: 'Oshxona va taomlar',
      organizer: 'O\'zbek Jamiyati',
      contact: {
        phone: '+7 (495) 123-45-67',
        email: 'festival@uzbek.ru'
      },
      price: 'Bepul',
      maxParticipants: 200,
      currentParticipants: 150,
      features: ['Milliy taomlar', 'Master-klass', 'Musiqa', 'Raqs', 'O\'yinlar'],
      image: '/api/placeholder/400/300',
      rating: 4.8,
      isFavorite: false
    },
    {
      id: 2,
      title: 'O\'zbek tili va madaniyati kursi',
      description: 'O\'zbek tilini o\'rganish va madaniyat haqida ma\'lumot olish uchun haftalik kurs.',
      location: 'Sankt-Peterburg, O\'zbek markazi',
      date: '2024-03-25',
      time: '18:00 - 20:00',
      city: 'Sankt-Peterburg',
      category: 'Ta\'lim va seminarlar',
      organizer: 'O\'zbek Ta\'lim Markazi',
      contact: {
        phone: '+7 (812) 234-56-78',
        email: 'education@uzbek.ru'
      },
      price: '5000 ₽/oy',
      maxParticipants: 30,
      currentParticipants: 25,
      features: ['O\'zbek tili', 'Madaniyat', 'Adabiyot', 'Tarix', 'Amaliy mashg\'ulotlar'],
      image: '/api/placeholder/400/300',
      rating: 4.6,
      isFavorite: true
    },
    {
      id: 3,
      title: 'O\'zbek futbol jamoasi o\'yinini tomosha qilish',
      description: 'O\'zbekiston terma jamoasining o\'yinini birgalikda tomosha qilamiz. Do\'stona muhit.',
      location: 'Kazan, Sport bar "Uzbek"',
      date: '2024-03-28',
      time: '19:00 - 22:00',
      city: 'Kazan',
      category: 'Sport va dam olish',
      organizer: 'O\'zbek Sport Klubi',
      contact: {
        phone: '+7 (843) 345-67-89',
        email: 'sport@uzbek.ru'
      },
      price: 'Bepul',
      maxParticipants: 50,
      currentParticipants: 35,
      features: ['Futbol', 'Tomosha', 'Oziq-ovqat', 'Ichimliklar', 'Do\'stona muhit'],
      image: '/api/placeholder/400/300',
      rating: 4.7,
      isFavorite: false
    },
    {
      id: 4,
      title: 'O\'zbek biznes networking',
      description: 'O\'zbek tadbirkorlari va mutaxassislari uchun networking tadbiri. Yangi hamkorliklar.',
      location: 'Novosibirsk, Biznes markaz',
      date: '2024-04-05',
      time: '17:00 - 21:00',
      city: 'Novosibirsk',
      category: 'Biznes va networking',
      organizer: 'O\'zbek Biznes Klubi',
      contact: {
        phone: '+7 (383) 456-78-90',
        email: 'business@uzbek.ru'
      },
      price: '2000 ₽',
      maxParticipants: 100,
      currentParticipants: 80,
      features: ['Networking', 'Biznes ma\'ruzalar', 'Hamkorlik', 'Coffee break', 'Presentatsiyalar'],
      image: '/api/placeholder/400/300',
      rating: 4.5,
      isFavorite: false
    },
    {
      id: 5,
      title: 'O\'zbek musiqasi va raqs kechasi',
      description: 'Zamonaviy va an\'anaviy o\'zbek musiqasi, raqs va madaniyat kechasi.',
      location: 'Yekaterinburg, Madaniyat saroyi',
      date: '2024-04-10',
      time: '19:00 - 23:00',
      city: 'Yekaterinburg',
      category: 'Musiqa va raqs',
      organizer: 'O\'zbek Madaniyat Markazi',
      contact: {
        phone: '+7 (343) 567-89-01',
        email: 'culture@uzbek.ru'
      },
      price: '1500 ₽',
      maxParticipants: 150,
      currentParticipants: 120,
      features: ['O\'zbek musiqasi', 'Raqs', 'Konsert', 'Madaniyat', 'Do\'stona muhit'],
      image: '/api/placeholder/400/300',
      rating: 4.9,
      isFavorite: true
    },
    {
      id: 6,
      title: 'Ramazon iftori',
      description: 'Ramazon oyida birgalikda iftor qilish va diniy tadbir.',
      location: 'Moskva, O\'zbek masjidi',
      date: '2024-04-15',
      time: '19:30 - 21:00',
      city: 'Moskva',
      category: 'Diniy tadbirlar',
      organizer: 'O\'zbek Diniy Jamiyati',
      contact: {
        phone: '+7 (495) 678-90-12',
        email: 'religious@uzbek.ru'
      },
      price: 'Bepul',
      maxParticipants: 300,
      currentParticipants: 250,
      features: ['Iftor', 'Diniy marosim', 'Do\'stona muhit', 'Oziq-ovqat', 'Hamjamiyat'],
      image: '/api/placeholder/400/300',
      rating: 4.8,
      isFavorite: false
    }
  ];

  const filteredEvents = events.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.organizer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCity = selectedCity === '' || selectedCity === 'Barcha shaharlar' || 
                       event.city === selectedCity;
    const matchesCategory = selectedCategory === '' || selectedCategory === 'Barcha tadbirlar' || 
                           event.category === selectedCategory;
    return matchesSearch && matchesCity && matchesCategory;
  });

  const handleCall = (phone: string) => {
    window.open(`tel:${phone}`, '_self');
  };

  const handleEmail = (email: string) => {
    window.open(`mailto:${email}`, '_self');
  };

  const handleRegister = (eventId: number) => {
    // Здесь будет логика регистрации
    alert('Tadbirga ro\'yxatdan o\'tish funksiyasi keyinchalik qo\'shiladi');
  };

  const toggleFavorite = (eventId: number) => {
    // Здесь будет логика добавления в избранное
    alert('Sevimlilar funksiyasi keyinchalik qo\'shiladi');
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('uz-UZ', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getDaysUntilEvent = (dateString: string) => {
    const eventDate = new Date(dateString);
    const today = new Date();
    const diffTime = eventDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
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

        <div className="bg-gradient-to-r from-red-500 to-orange-600 text-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <Calendar className="w-8 h-8" />
              <div>
                <h1 className="text-3xl font-bold">Tadbirlar va uchrashuvlar</h1>
                {countryParam && (
                  <p className="text-sm text-red-200">
                    {getCountryName(countryParam)}dagi tadbirlar
                  </p>
                )}
              </div>
            </div>
            <button
              onClick={() => setShowAddEvent(true)}
              className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>Tadbir qo'shish</span>
            </button>
          </div>
          <p className="text-red-100">
            O\'zbek jamiyatining eng yaxshi tadbirlari va uchrashuvlari
          </p>
        </div>

        {/* Поиск и фильтры */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Tadbir nomi yoki tashkilotchi..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              />
            </div>
            <select
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
            >
              {cities.map((city, index) => (
                <option key={index} value={city}>{city}</option>
              ))}
            </select>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
            >
              {categories.map((category, index) => (
                <option key={index} value={category}>{category}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Список событий */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map((event) => (
            <div key={event.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="relative">
                <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
                  <Calendar className="w-16 h-16 text-gray-400" />
                </div>
                <div className="absolute top-2 right-2 flex space-x-2">
                  <button
                    onClick={() => toggleFavorite(event.id)}
                    className={`p-2 rounded-full ${event.isFavorite ? 'bg-red-500 text-white' : 'bg-white/90 text-gray-600'}`}
                  >
                    <Heart className={`w-4 h-4 ${event.isFavorite ? 'fill-current' : ''}`} />
                  </button>
                  <div className="flex items-center space-x-1 bg-white/90 px-2 py-1 rounded-full">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-sm font-medium">{event.rating}</span>
                  </div>
                </div>
                {getDaysUntilEvent(event.date) <= 7 && getDaysUntilEvent(event.date) >= 0 && (
                  <div className="absolute top-2 left-2">
                    <span className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                      Tez orada
                    </span>
                  </div>
                )}
              </div>
              
              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-lg font-semibold text-gray-900">{event.title}</h3>
                </div>
                
                <p className="text-gray-600 text-sm mb-4">{event.description}</p>
                
                <div className="space-y-2 mb-4">
                  <div className="flex items-center space-x-2 text-sm text-gray-700">
                    <MapPin className="w-4 h-4 text-gray-400" />
                    <span>{event.location}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-700">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    <span>{formatDate(event.date)}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-700">
                    <Clock className="w-4 h-4 text-gray-400" />
                    <span>{event.time}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-700">
                    <Users className="w-4 h-4 text-gray-400" />
                    <span>{event.currentParticipants}/{event.maxParticipants} ishtirokchi</span>
                  </div>
                </div>

                <div className="mb-4">
                  <h4 className="text-sm font-medium text-gray-900 mb-2">Xususiyatlar:</h4>
                  <div className="flex flex-wrap gap-1">
                    {event.features.slice(0, 3).map((feature, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-red-100 text-red-700 text-xs rounded-full"
                      >
                        {feature}
                      </span>
                    ))}
                    {event.features.length > 3 && (
                      <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                        +{event.features.length - 3}
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex items-center justify-between mb-4">
                  <span className="text-lg font-semibold text-green-600">{event.price}</span>
                  <span className="text-sm text-gray-600">{event.organizer}</span>
                </div>

                <div className="flex space-x-2">
                  <button
                    onClick={() => handleRegister(event.id)}
                    className="flex-1 bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition-colors flex items-center justify-center space-x-2"
                  >
                    <Users className="w-4 h-4" />
                    <span>Ro'yxatdan o'tish</span>
                  </button>
                  <button
                    onClick={() => handleCall(event.contact.phone)}
                    className="flex-1 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors flex items-center justify-center space-x-2"
                  >
                    <Phone className="w-4 h-4" />
                    <span>Qo'ng'iroq</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredEvents.length === 0 && (
          <div className="text-center py-12">
            <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Tadbirlar topilmadi</h3>
            <p className="text-gray-600">Boshqa qidiruv so'zlari yoki filtrlarni sinab ko'ring</p>
          </div>
        )}
      </div>
    </div>
  );
} 