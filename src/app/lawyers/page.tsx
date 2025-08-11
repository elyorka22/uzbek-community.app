'use client';

import { useState, useEffect } from 'react';
import { Building2, Phone, Mail, MapPin, Star, Search, Filter } from 'lucide-react';
import { initTelegramApp } from '@/lib/telegram';
import BackButton from '@/components/BackButton';
import { useSearchParams } from 'next/navigation';

export default function LawyersPage() {
  const searchParams = useSearchParams();
  const countryParam = searchParams.get('country');
  
  const [isInitialized, setIsInitialized] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('');

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

  const specialties = [
    'Barcha sohalar',
    'Viza va fuqarolik',
    'Ishlash ruxsatnomasi',
    'Biznes va kompaniya',
    'Oilaviy huquq',
    'Jinoyat huquqi',
    'Fuqarolik huquqi'
  ];

  const lawyers = [
    {
      name: 'Aziz Karimov',
      specialty: 'Viza va fuqarolik',
      experience: '8 yil',
      rating: 4.8,
      phone: '+7 (999) 123-45-67',
      email: 'aziz.karimov@example.com',
      location: 'Moskva',
      description: 'Viza va fuqarolik bo\'yicha tajribali huquqshunos',
      price: '5000-15000 ₽'
    },
    {
      name: 'Malika Yusupova',
      specialty: 'Ishlash ruxsatnomasi',
      experience: '5 yil',
      rating: 4.6,
      phone: '+7 (999) 234-56-78',
      email: 'malika.yusupova@example.com',
      location: 'Sankt-Peterburg',
      description: 'Ishlash ruxsatnomasi va mehnat huquqi bo\'yicha mutaxassis',
      price: '3000-10000 ₽'
    },
    {
      name: 'Rustam Toshmatov',
      specialty: 'Biznes va kompaniya',
      experience: '12 yil',
      rating: 4.9,
      phone: '+7 (999) 345-67-89',
      email: 'rustam.toshmatov@example.com',
      location: 'Moskva',
      description: 'Biznes huquqi va kompaniya tuzish bo\'yicha ekspert',
      price: '10000-30000 ₽'
    },
    {
      name: 'Dilfuza Rahimova',
      specialty: 'Oilaviy huquq',
      experience: '6 yil',
      rating: 4.7,
      phone: '+7 (999) 456-78-90',
      email: 'dilfuza.rahimova@example.com',
      location: 'Kazan',
      description: 'Oilaviy huquq va ajrim bo\'yicha huquqshunos',
      price: '4000-12000 ₽'
    }
  ];

  const filteredLawyers = lawyers.filter(lawyer => {
    const matchesSearch = lawyer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         lawyer.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSpecialty = selectedSpecialty === '' || selectedSpecialty === 'Barcha sohalar' || 
                            lawyer.specialty === selectedSpecialty;
    return matchesSearch && matchesSpecialty;
  });

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
          <BackButton href={countryParam ? `/?country=${countryParam}` : '/'} />
        </div>

        <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex items-center space-x-3 mb-4">
            <Building2 className="w-8 h-8" />
            <div>
              <h1 className="text-3xl font-bold">Huquqshunoslar</h1>
              {countryParam && (
                <p className="text-sm text-orange-200">
                  {getCountryName(countryParam)}dagi huquqshunoslar
                </p>
              )}
            </div>
          </div>
          <p className="text-orange-100">
            O'zbek huquqshunoslarini toping va maslahat oling
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
                  placeholder="Huquqshunos yoki shahar qidirish..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
            </div>
            <div className="md:w-64">
              <select
                value={selectedSpecialty}
                onChange={(e) => setSelectedSpecialty(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              >
                {specialties.map((specialty) => (
                  <option key={specialty} value={specialty}>{specialty}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Список юристов */}
        <div className="space-y-4">
          {filteredLawyers.map((lawyer, index) => (
            <div key={index} className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="text-xl font-semibold text-gray-900">{lawyer.name}</h3>
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-sm text-gray-600">{lawyer.rating}</span>
                    </div>
                  </div>
                  <p className="text-orange-600 font-medium mb-1">{lawyer.specialty}</p>
                  <p className="text-gray-600 text-sm mb-2">{lawyer.description}</p>
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <div className="flex items-center space-x-1">
                      <MapPin className="w-4 h-4" />
                      <span>{lawyer.location}</span>
                    </div>
                    <span>Tajriba: {lawyer.experience}</span>
                    <span>Narx: {lawyer.price}</span>
                  </div>
                </div>
                <div className="mt-4 md:mt-0 md:ml-6">
                  <div className="space-y-2">
                    <button
                      onClick={() => window.open(`tel:${lawyer.phone}`)}
                      className="flex items-center space-x-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                    >
                      <Phone className="w-4 h-4" />
                      <span>Qo\'ng\'iroq</span>
                    </button>
                    <button
                      onClick={() => window.open(`mailto:${lawyer.email}`)}
                      className="flex items-center space-x-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                    >
                      <Mail className="w-4 h-4" />
                      <span>Xabar</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredLawyers.length === 0 && (
          <div className="text-center py-12">
            <Building2 className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">Huquqshunoslar topilmadi</p>
          </div>
        )}
      </div>
    </div>
  );
} 