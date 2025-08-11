'use client';

import { useState } from 'react';
import { X, Briefcase, Home, Scale, Store, Plus } from 'lucide-react';

interface AdCategorySelectorProps {
  onClose: () => void;
  onSelectCategory: (type: 'job' | 'housing' | 'lawyer' | 'shop') => void;
  country: string;
}

const adCategories = [
  {
    type: 'job',
    title: 'Ish va vakansiyalar',
    description: 'Ish qidirish yoki vakansiya joylashtirish',
    icon: Briefcase,
    color: 'indigo',
    gradient: 'from-indigo-500 to-purple-600'
  },
  {
    type: 'housing',
    title: 'Uy-joy va kvartiralar',
    description: 'Uy-joy ijaraga berish yoki qidirish',
    icon: Home,
    color: 'pink',
    gradient: 'from-pink-500 to-rose-600'
  },
  {
    type: 'lawyer',
    title: 'Yuridik xizmatlar',
    description: 'Advokat va yuridik maslahatlar',
    icon: Scale,
    color: 'emerald',
    gradient: 'from-emerald-500 to-teal-600'
  },
  {
    type: 'shop',
    title: 'Do\'konlar va xizmatlar',
    description: 'O\'zbek do\'konlari va xizmatlari',
    icon: Store,
    color: 'orange',
    gradient: 'from-orange-500 to-red-600'
  }
];

export default function AdCategorySelector({ onClose, onSelectCategory, country }: AdCategorySelectorProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const handleCategorySelect = (type: string) => {
    setSelectedCategory(type);
    onSelectCategory(type as 'job' | 'housing' | 'lawyer' | 'shop');
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl border max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="border-b border-gray-200 bg-gray-50 rounded-t-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <Plus className="w-6 h-6 text-blue-500" />
              <h2 className="text-xl font-bold text-gray-900">E&apos;lon qo&apos;shish</h2>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors p-2 hover:bg-gray-100 rounded-lg"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          <p className="text-gray-600 text-sm">
            Qanday turdagi e&apos;lon qo&apos;shmoqchisiz?
          </p>
        </div>

        {/* Categories */}
        <div className="p-6 space-y-4">
          {adCategories.map((category) => {
            const Icon = category.icon;
            return (
              <button
                key={category.type}
                onClick={() => handleCategorySelect(category.type)}
                className={`w-full p-4 rounded-lg border-2 transition-all duration-200 hover:shadow-md ${
                  selectedCategory === category.type
                    ? `border-${category.color}-500 bg-${category.color}-50`
                    : 'border-gray-200 bg-white hover:border-gray-300'
                }`}
              >
                <div className="flex items-center space-x-4">
                  <div className={`p-3 rounded-lg bg-gradient-to-r ${category.gradient} text-white`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <div className="flex-1 text-left">
                    <h3 className="font-semibold text-gray-900">{category.title}</h3>
                    <p className="text-sm text-gray-600">{category.description}</p>
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Footer */}
        <div className="border-t border-gray-200 p-6">
          <button
            onClick={onClose}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium text-gray-700"
          >
            Bekor qilish
          </button>
        </div>
      </div>
    </div>
  );
} 