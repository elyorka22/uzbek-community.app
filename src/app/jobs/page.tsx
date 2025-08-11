'use client';

import { useState, useEffect, Suspense } from 'react';
import { Briefcase, MapPin, DollarSign, Clock, Search, Phone, Mail, Calendar, Building } from 'lucide-react';
import { initTelegramApp } from '@/lib/telegram';
import BackButton from '@/components/BackButton';
import { useSearchParams } from 'next/navigation';

function JobsPageContent() {
  const searchParams = useSearchParams();
  const countryParam = searchParams.get('country');
  
  const [isInitialized, setIsInitialized] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

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
    'Barcha sohalar',
    'IT va dasturlash',
    'Moliya va buxgalteriya',
    'Savdo va marketing',
    'Ta\'lim va o\'qituvchilik',
    'Tibbiyot va sog\'liqni saqlash',
    'Transport va logistika',
    'Qurilish va arxitektura',
    'Oziq-ovqat va restoranlar',
    'Xizmat ko\'rsatish',
    'Boshqa'
  ];

  const jobs = [
    {
      id: 1,
      title: 'Frontend Developer',
      company: 'Tech Solutions LLC',
      description: 'React va TypeScript bo&apos;yicha tajribali dasturchi kerak. 2+ yillik tajriba talab qilinadi.',
      location: 'Moskva',
      salary: '150,000 - 250,000 ₽',
      type: 'To\'liq kunlik',
      experience: '2+ yil',
      category: 'IT va dasturlash',
      contact: {
        phone: '+7 (495) 123-45-67',
        email: 'hr@techsolutions.ru'
      },
      postedDate: '2024-01-15',
      requirements: ['React', 'TypeScript', 'HTML/CSS', 'Git']
    },
    {
      id: 2,
      title: 'Buxgalter',
      company: 'Finance Group',
      description: 'Katta kompaniya uchun tajribali buxgalter kerak. 1C dasturi bilan ishlashni bilishi kerak.',
      location: 'Sankt-Peterburg',
      salary: '80,000 - 120,000 ₽',
      type: 'To\'liq kunlik',
      experience: '3+ yil',
      category: 'Moliya va buxgalteriya',
      contact: {
        phone: '+7 (812) 234-56-78',
        email: 'finance@financegroup.ru'
      },
      postedDate: '2024-01-14',
      requirements: ['1C', 'Buxgalteriya', 'Excel', 'Rossiya qonunlari']
    },
    {
      id: 3,
      title: 'O\'qituvchi (O\'zbek tili)',
      company: 'Education Center',
      description: 'O\'zbek tili va adabiyoti bo\'yicha o\'qituvchi kerak. Bolalar va kattalar bilan ishlash tajribasi.',
      location: 'Kazan',
      salary: '60,000 - 90,000 ₽',
      type: 'Qisman kunlik',
      experience: '1+ yil',
      category: 'Ta\'lim va o\'qituvchilik',
      contact: {
        phone: '+7 (843) 345-67-89',
        email: 'education@center.ru'
      },
      postedDate: '2024-01-13',
      requirements: ['O\'zbek tili', 'Pedagogika', 'Bolalar bilan ishlash', 'Kompyuter']
    },
    {
      id: 4,
      title: 'Sotuvchi-konsultant',
      company: 'Retail Store',
      description: 'Do\'konda mahsulotlarni sotish va mijozlarga maslahat berish. O\'zbek tilini bilish afzallik.',
      location: 'Novosibirsk',
      salary: '45,000 - 70,000 ₽',
      type: 'To\'liq kunlik',
      experience: 'Tajriba talab qilinmaydi',
      category: 'Savdo va marketing',
      contact: {
        phone: '+7 (383) 456-78-90',
        email: 'retail@store.ru'
      },
      postedDate: '2024-01-12',
      requirements: ['Aloqa qobiliyati', 'O\'zbek tili', 'Kompyuter', 'Jismoniy faollik']
    },
    {
      id: 5,
      title: 'Shofyor',
      company: 'Transport Company',
      description: 'Yuk tashish uchun tajribali shofyor kerak. B kategoridagi huquq bo\'lishi shart.',
      location: 'Yekaterinburg',
      salary: '70,000 - 100,000 ₽',
      type: 'To\'liq kunlik',
      experience: '2+ yil',
      category: 'Transport va logistika',
      contact: {
        phone: '+7 (343) 567-89-01',
        email: 'transport@company.ru'
      },
      postedDate: '2024-01-11',
      requirements: ['B kategoridagi huquq', 'Tajriba', 'Jismoniy sog\'lomlik', 'Punctual']
    },
    {
      id: 6,
      title: 'Oshpaz',
      company: 'Uzbek Restaurant',
      description: 'O\'zbek milliy taomlarini tayyorlash bo\'yicha tajribali oshpaz kerak.',
      location: 'Moskva',
      salary: '80,000 - 120,000 ₽',
      type: 'To\'liq kunlik',
      experience: '3+ yil',
      category: 'Oziq-ovqat va restoranlar',
      contact: {
        phone: '+7 (495) 678-90-12',
        email: 'uzbek@restaurant.ru'
      },
      postedDate: '2024-01-10',
      requirements: ['O\'zbek taomlari', 'Sanitariya', 'Tajriba', 'Jismoniy sog\'lomlik']
    }
  ];

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCity = selectedCity === '' || selectedCity === 'Barcha shaharlar' || 
                       job.location === selectedCity;
    const matchesCategory = selectedCategory === '' || selectedCategory === 'Barcha sohalar' || 
                           job.category === selectedCategory;
    return matchesSearch && matchesCity && matchesCategory;
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

        <div className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex items-center space-x-3 mb-4">
            <Briefcase className="w-8 h-8" />
            <div>
              <h1 className="text-3xl font-bold">Ish va vakansiyalar</h1>
              {countryParam && (
                <p className="text-sm text-indigo-200">
                  {getCountryName(countryParam)}dagi ish imkoniyatlari
                </p>
              )}
            </div>
          </div>
          <p className="text-indigo-100">
            Shahringizdagi ish imkoniyatlari va vakansiyalar
          </p>
        </div>

        {/* Поиск и фильтры */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Ish nomi yoki kompaniya..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>
            <select
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            >
              {cities.map((city, index) => (
                <option key={index} value={city}>{city}</option>
              ))}
            </select>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            >
              {categories.map((category, index) => (
                <option key={index} value={category}>{category}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Список вакансий */}
        <div className="space-y-4">
          {filteredJobs.map((job) => (
            <div key={job.id} className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-xl font-semibold text-gray-900">{job.title}</h3>
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <Calendar className="w-4 h-4" />
                      <span>{formatDate(job.postedDate)}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4 mb-3">
                    <div className="flex items-center space-x-1 text-gray-600">
                      <Building className="w-4 h-4" />
                      <span className="font-medium">{job.company}</span>
                    </div>
                    <div className="flex items-center space-x-1 text-gray-600">
                      <MapPin className="w-4 h-4" />
                      <span>{job.location}</span>
                    </div>
                  </div>
                  
                  <p className="text-gray-700 mb-4">{job.description}</p>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                    <div className="flex items-center space-x-2 text-sm">
                      <DollarSign className="w-4 h-4 text-green-500" />
                      <span className="font-medium">{job.salary}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm">
                      <Clock className="w-4 h-4 text-blue-500" />
                      <span>{job.type}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm">
                      <Briefcase className="w-4 h-4 text-purple-500" />
                      <span>{job.experience}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm">
                      <span className="px-2 py-1 bg-indigo-100 text-indigo-700 rounded-full text-xs">
                        {job.category}
                      </span>
                    </div>
                  </div>

                  <div className="mb-4">
                    <h4 className="text-sm font-medium text-gray-900 mb-2">Talablar:</h4>
                    <div className="flex flex-wrap gap-1">
                      {job.requirements.map((req, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
                        >
                          {req}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-2">
                <button
                  onClick={() => handleCall(job.contact.phone)}
                  className="flex-1 bg-indigo-500 text-white py-2 px-4 rounded-lg hover:bg-indigo-600 transition-colors flex items-center justify-center space-x-2"
                >
                  <Phone className="w-4 h-4" />
                  <span>Qo'ng'iroq</span>
                </button>
                <button
                  onClick={() => handleEmail(job.contact.email)}
                  className="flex-1 bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition-colors flex items-center justify-center space-x-2"
                >
                  <Mail className="w-4 h-4" />
                  <span>Email</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredJobs.length === 0 && (
          <div className="text-center py-12">
            <Briefcase className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Vakansiyalar topilmadi</h3>
            <p className="text-gray-600">Boshqa qidiruv so'zlari yoki filtrlarni sinab ko'ring</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default function JobsPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Yuklanmoqda...</p>
        </div>
      </div>
    }>
      <JobsPageContent />
    </Suspense>
  );
} 