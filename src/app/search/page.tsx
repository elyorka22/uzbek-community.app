'use client';

import { useState } from 'react';
import { useProfiles } from '@/hooks/useProfiles';
import { UserProfile, UserStatus } from '@/types/user';
import { Search, MapPin, Users, Filter, User, GraduationCap, Briefcase, Home } from 'lucide-react';

export default function SearchPage() {
  const [filters, setFilters] = useState({
    country: '',
    city: '',
    status: '' as UserStatus | '',
    interests: [] as string[]
  });

  const [showFilters, setShowFilters] = useState(false);

  const { profiles, loading, error } = useProfiles({
    country: filters.country || undefined,
    city: filters.city || undefined,
    status: filters.status || undefined,
    interests: filters.interests.length > 0 ? filters.interests : undefined
  });

  const statusOptions = [
    { value: 'student', label: 'Студент', icon: GraduationCap },
    { value: 'working', label: 'Работаю', icon: Briefcase },
    { value: 'living', label: 'Живу', icon: Home }
  ];

  const availableInterests = [
    'Спорт', 'Музыка', 'Кино', 'Книги', 'Путешествия', 'Кулинария',
    'Технологии', 'Искусство', 'Наука', 'Бизнес', 'Образование',
    'Медицина', 'IT', 'Дизайн', 'Маркетинг', 'Финансы', 'Языки'
  ];

  const handleInterestToggle = (interest: string) => {
    setFilters(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest]
    }));
  };

  const clearFilters = () => {
    setFilters({
      country: '',
      city: '',
      status: '',
      interests: []
    });
  };

  const formatStatus = (status: UserStatus) => {
    const option = statusOptions.find(opt => opt.value === status);
    return option ? option.label : status;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Поиск пользователей...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600">Ошибка загрузки: {error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-6">
      <div className="max-w-6xl mx-auto px-4">
        {/* Заголовок */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex items-center space-x-3 mb-4">
            <Search className="w-6 h-6 text-blue-500" />
            <h1 className="text-2xl font-bold text-gray-900">Поиск узбеков</h1>
          </div>
          <p className="text-gray-600">
            Найдите других узбеков по локации, статусу и интересам
          </p>
        </div>

        {/* Фильтры */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Фильтры</h2>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center space-x-2 px-3 py-2 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
            >
              <Filter className="w-4 h-4" />
              <span>{showFilters ? 'Скрыть' : 'Показать'} фильтры</span>
            </button>
          </div>

          {showFilters && (
            <div className="space-y-4">
              {/* Локация */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Страна
                  </label>
                  <input
                    type="text"
                    value={filters.country}
                    onChange={(e) => setFilters(prev => ({ ...prev, country: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Введите страну"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Город
                  </label>
                  <input
                    type="text"
                    value={filters.city}
                    onChange={(e) => setFilters(prev => ({ ...prev, city: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Введите город"
                  />
                </div>
              </div>

              {/* Статус */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Статус
                </label>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => setFilters(prev => ({ ...prev, status: '' }))}
                    className={`px-3 py-1 rounded-full text-sm border transition-colors ${
                      filters.status === ''
                        ? 'bg-blue-500 text-white border-blue-500'
                        : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    Все
                  </button>
                  {statusOptions.map((option) => {
                    const Icon = option.icon;
                    return (
                      <button
                        key={option.value}
                        onClick={() => setFilters(prev => ({ ...prev, status: option.value as UserStatus }))}
                        className={`flex items-center space-x-1 px-3 py-1 rounded-full text-sm border transition-colors ${
                          filters.status === option.value
                            ? 'bg-blue-500 text-white border-blue-500'
                            : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                        }`}
                      >
                        <Icon className="w-3 h-3" />
                        <span>{option.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Интересы */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Интересы
                </label>
                <div className="flex flex-wrap gap-2">
                  {availableInterests.map((interest) => (
                    <button
                      key={interest}
                      onClick={() => handleInterestToggle(interest)}
                      className={`px-3 py-1 rounded-full text-sm border transition-colors ${
                        filters.interests.includes(interest)
                          ? 'bg-blue-500 text-white border-blue-500'
                          : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                      }`}
                    >
                      {interest}
                    </button>
                  ))}
                </div>
              </div>

              {/* Кнопка очистки */}
              <div className="flex justify-end">
                <button
                  onClick={clearFilters}
                  className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800 transition-colors"
                >
                  Очистить фильтры
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Результаты поиска */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-900">
              Найдено {profiles.length} пользователей
            </h2>
          </div>

          {profiles.length === 0 ? (
            <div className="text-center py-12">
              <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">Пользователи не найдены</p>
              <p className="text-gray-400 text-sm">Попробуйте изменить фильтры поиска</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {profiles.map((profile) => (
                <div key={profile.id} className="bg-gray-50 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-start space-x-3">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                      {profile.photoUrl ? (
                        <img
                          src={profile.photoUrl}
                          alt={profile.firstName}
                          className="w-12 h-12 rounded-full object-cover"
                        />
                      ) : (
                        <User className="w-6 h-6 text-blue-500" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-gray-900 truncate">
                        {profile.firstName} {profile.lastName}
                      </h3>
                      <p className="text-sm text-gray-500 truncate">
                        @{profile.username}
                      </p>
                      <div className="flex items-center space-x-1 mt-1">
                        <MapPin className="w-3 h-3 text-gray-400" />
                        <span className="text-xs text-gray-500">
                          {profile.location.city}, {profile.location.country}
                        </span>
                      </div>
                      <div className="mt-2">
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-800">
                          {formatStatus(profile.status)}
                        </span>
                      </div>
                      {profile.interests.length > 0 && (
                        <div className="mt-2">
                          <div className="flex flex-wrap gap-1">
                            {profile.interests.slice(0, 3).map((interest) => (
                              <span
                                key={interest}
                                className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-gray-100 text-gray-700"
                              >
                                {interest}
                              </span>
                            ))}
                            {profile.interests.length > 3 && (
                              <span className="text-xs text-gray-500">
                                +{profile.interests.length - 3}
                              </span>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 