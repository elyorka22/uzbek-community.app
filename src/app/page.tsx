import Link from 'next/link';
import { User, Users, MapPin, Heart, Search } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Заголовок */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 bg-blue-500 rounded-full flex items-center justify-center">
              <Users className="w-10 h-10 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Uzbek Community
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Находите и общайтесь с узбеками по всему миру. 
            Создавайте связи, делитесь опытом и поддерживайте друг друга.
          </p>
        </div>

        {/* Основные функции */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="bg-white rounded-lg shadow-sm p-6 text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Search className="w-6 h-6 text-blue-500" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Найти узбеков
            </h3>
            <p className="text-gray-600">
              Ищите узбеков по локации, статусу и интересам
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6 text-center">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Heart className="w-6 h-6 text-green-500" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Общие интересы
            </h3>
            <p className="text-gray-600">
              Общайтесь с людьми, разделяющими ваши интересы
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6 text-center">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Users className="w-6 h-6 text-purple-500" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Создавайте сообщества
            </h3>
            <p className="text-gray-600">
              Создавайте группы по интересам и локациям
            </p>
          </div>
        </div>

        {/* Статистика */}
        <div className="bg-white rounded-lg shadow-sm p-8 mb-12">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">
            Наша статистика
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-3xl font-bold text-blue-500 mb-2">1000+</div>
              <div className="text-gray-600">Пользователей</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-green-500 mb-2">50+</div>
              <div className="text-gray-600">Стран</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-purple-500 mb-2">100+</div>
              <div className="text-gray-600">Групп</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-orange-500 mb-2">5000+</div>
              <div className="text-gray-600">Связей</div>
            </div>
          </div>
        </div>

        {/* Призыв к действию */}
        <div className="text-center">
          <div className="bg-white rounded-lg shadow-sm p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Присоединяйтесь к сообществу
            </h2>
            <p className="text-gray-600 mb-6">
              Создайте свой профиль и начните общаться с узбеками по всему миру
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/profile"
                className="inline-flex items-center space-x-2 px-8 py-3 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition-colors"
              >
                <User className="w-5 h-5" />
                <span>Создать профиль</span>
              </Link>
              <Link
                href="/search"
                className="inline-flex items-center space-x-2 px-8 py-3 bg-green-500 text-white rounded-lg font-medium hover:bg-green-600 transition-colors"
              >
                <Search className="w-5 h-5" />
                <span>Найти узбеков</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Футер */}
        <div className="text-center mt-12 text-gray-500">
          <p>&copy; 2024 Uzbek Community. Все права защищены.</p>
        </div>
      </div>
    </div>
  );
}
