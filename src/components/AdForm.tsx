'use client';

import { useState } from 'react';
import { Save, X, AlertCircle } from 'lucide-react';

interface AdFormProps {
  type: 'job' | 'housing' | 'lawyer' | 'shop';
  country: string;
  onClose: () => void;
  onSuccess?: () => void;
}

interface AdFormData {
  title: string;
  description: string;
  city: string;
  contact: string;
  price?: string;
  category?: string;
}

export default function AdForm({ type, country, onClose, onSuccess }: AdFormProps) {
  const [formData, setFormData] = useState<AdFormData>({
    title: '',
    description: '',
    city: '',
    contact: '',
    price: '',
    category: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getTypeInfo = () => {
    switch (type) {
      case 'job':
        return {
          title: 'Ish e\'lonini yaratish',
          placeholder: 'Ish nomi',
          categories: [
            'Dasturlash',
            'Dizayn',
            'Marketing',
            'Sotuv',
            'O\'qituvchi',
            'Tarjimon',
            'Boshqa'
          ]
        };
      case 'housing':
        return {
          title: 'Uy-joy e\'lonini yaratish',
          placeholder: 'Uy-joy turi',
          categories: [
            'Kvartira',
            'Uy',
            'Xona',
            'Studiya',
            'Kottej'
          ]
        };
      case 'lawyer':
        return {
          title: 'Huquqshunos e\'lonini yaratish',
          placeholder: 'Ixtisoslik',
          categories: [
            'Viza va fuqarolik',
            'Ishlash ruxsatnomasi',
            'Biznes va kompaniya',
            'Oilaviy huquq',
            'Jinoyat huquqi',
            'Fuqarolik huquqi'
          ]
        };
      case 'shop':
        return {
          title: 'Do\'kon e\'lonini yaratish',
          placeholder: 'Do\'kon turi',
          categories: [
            'Oziq-ovqat',
            'Restoran',
            'Kafelar',
            'Halol go\'sht',
            'Boshqa'
          ]
        };
    }
  };

  const typeInfo = getTypeInfo();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch('/api/ads', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          type,
          country
        }),
      });

      if (!response.ok) {
        throw new Error('E\'lon yaratishda xatolik yuz berdi');
      }

      // Очищаем форму
      setFormData({
        title: '',
        description: '',
        city: '',
        contact: '',
        price: '',
        category: ''
      });

      onSuccess?.();
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Xatolik yuz berdi');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: keyof AdFormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* Заголовок */}
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-semibold text-gray-900">
            {typeInfo.title}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Форма */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {error && (
            <div className="flex items-center space-x-2 p-3 bg-red-50 border border-red-200 rounded-lg">
              <AlertCircle className="w-5 h-5 text-red-500" />
              <span className="text-red-700 text-sm">{error}</span>
            </div>
          )}

          {/* Заголовок */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Sarlavha
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => handleInputChange('title', e.target.value)}
              placeholder={typeInfo.placeholder}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>

          {/* Категория */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Kategoriya
            </label>
            <select
              value={formData.category}
              onChange={(e) => handleInputChange('category', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            >
              <option value="">Kategoriyani tanlang</option>
              {typeInfo.categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          {/* Город */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Shahar
            </label>
            <input
              type="text"
              value={formData.city}
              onChange={(e) => handleInputChange('city', e.target.value)}
              placeholder="Shahar nomi"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>

          {/* Описание */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tavsif
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              placeholder="Batafsil ma'lumot..."
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>

          {/* Цена (для жилья и магазинов) */}
          {(type === 'housing' || type === 'shop') && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Narx
              </label>
              <input
                type="text"
                value={formData.price}
                onChange={(e) => handleInputChange('price', e.target.value)}
                placeholder="Narx (masalan: 50000 so'm)"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          )}

          {/* Контакт */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Aloqa
            </label>
            <input
              type="text"
              value={formData.contact}
              onChange={(e) => handleInputChange('contact', e.target.value)}
              placeholder="Telefon yoki Telegram"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>

          {/* Кнопки */}
          <div className="flex space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Bekor qilish
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center space-x-2"
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Yuklanmoqda...</span>
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  <span>Saqlash</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 